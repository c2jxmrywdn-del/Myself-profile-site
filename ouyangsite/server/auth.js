import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

const SESSION_COOKIE = 'webdev_app_session';
const STATE_COOKIE = 'ouyang_oauth_state';

function secret() {
  if (!process.env.MANUS_JWT_SECRET) throw new Error('MANUS_JWT_SECRET is not configured');
  return process.env.MANUS_JWT_SECRET;
}

function secureCookie() {
  return Boolean(process.env.MANUS_PROJECT_ID) || process.env.NODE_ENV === 'production';
}

function cookieHeader(name, value, maxAge) {
  const parts = [`${name}=${encodeURIComponent(value)}`, 'Path=/', `Max-Age=${maxAge}`, 'HttpOnly', `SameSite=${secureCookie() ? 'None' : 'Lax'}`];
  if (secureCookie()) parts.push('Secure');
  return parts.join('; ');
}

function readCookies(req) {
  return Object.fromEntries((req.headers.cookie || '').split(';').filter(Boolean).map((item) => {
    const index = item.indexOf('=');
    return [item.slice(0, index).trim(), decodeURIComponent(item.slice(index + 1).trim())];
  }));
}

function signState(payload) {
  const raw = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret()).update(raw).digest('base64url');
  return `${raw}.${signature}`;
}

function verifyState(value) {
  const [raw, signature] = String(value || '').split('.');
  const expected = crypto.createHmac('sha256', secret()).update(raw || '').digest('base64url');
  if (!raw || !signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw new Error('Invalid OAuth state');
  const payload = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8'));
  if (Date.now() - payload.createdAt > 10 * 60 * 1000) throw new Error('Expired OAuth state');
  return payload;
}

export function currentUser(req) {
  const token = readCookies(req)[SESSION_COOKIE];
  if (!token) return null;
  try {
    const claims = jwt.verify(token, secret(), { algorithms: ['HS256'] });
    if (claims.appId && process.env.MANUS_PROJECT_ID && claims.appId !== process.env.MANUS_PROJECT_ID) return null;
    return claims;
  } catch {
    return null;
  }
}

export function requireAdmin(req, res, next) {
  const user = currentUser(req);
  const isOwner = user && (user.isOwner === true || user.role === 'owner' || user.projectRole === 'owner');
  if (!user || !isOwner) return res.status(401).json({ error: 'admin_auth_required' });
  req.user = user;
  next();
}

export function registerAuthRoutes(app) {
  app.get('/api/auth/me', (req, res) => {
    const user = currentUser(req);
    res.json({ authenticated: Boolean(user), user: user ? { openId: user.openId, name: user.name, email: user.email, isOwner: Boolean(user.isOwner || user.role === 'owner' || user.projectRole === 'owner') } : null });
  });

  app.get('/api/auth/login', (req, res) => {
    const origin = String(req.query.origin || '').trim();
    const redirectUri = `${origin || `${req.protocol}://${req.get('host')}`}/api/auth/callback`;
    const state = signState({ redirectUri, returnTo: String(req.query.returnTo || '/admin'), createdAt: Date.now() });
    res.setHeader('Set-Cookie', cookieHeader(STATE_COOKIE, state, 600));
    const url = new URL(`${process.env.MANUS_OAUTH_PORTAL_URL}/app-auth`);
    url.searchParams.set('appId', process.env.MANUS_PROJECT_ID);
    url.searchParams.set('redirectUri', redirectUri);
    url.searchParams.set('state', state);
    url.searchParams.set('responseType', 'code');
    res.redirect(url.toString());
  });

  app.get('/api/auth/callback', async (req, res) => {
    try {
      const state = verifyState(readCookies(req)[STATE_COOKIE]);
      const response = await fetch(`${process.env.MANUS_OAUTH_API_URL}/webdev.v1.WebDevAuthPublicService/ExchangeToken`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ clientId: process.env.MANUS_PROJECT_ID, grantType: 'authorization_code', code: req.query.code, redirectUri: state.redirectUri }) });
      if (!response.ok) throw new Error(`OAuth exchange failed: ${response.status}`);
      const token = await response.json();
      const identityResponse = await fetch(`${process.env.MANUS_OAUTH_API_URL}/webdev.v1.WebDevAuthPublicService/GetUserInfo`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token.accessToken}` }, body: JSON.stringify({ accessToken: token.accessToken }) });
      if (!identityResponse.ok) throw new Error(`Identity lookup failed: ${identityResponse.status}`);
      const identity = await identityResponse.json();
      const claims = { appId: process.env.MANUS_PROJECT_ID, openId: identity.openId, sub: identity.openId, name: identity.name, email: identity.email, role: identity.role, projectRole: identity.projectRole, isOwner: identity.isOwner === true };
      const session = jwt.sign(claims, secret(), { algorithm: 'HS256', expiresIn: '7d' });
      res.setHeader('Set-Cookie', [cookieHeader(SESSION_COOKIE, session, 7 * 24 * 60 * 60), cookieHeader(STATE_COOKIE, '', 0)]);
      res.redirect(new URL(state.returnTo, state.redirectUri).toString());
    } catch (error) {
      res.status(400).send(`OAuth login failed: ${error.message}`);
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    res.setHeader('Set-Cookie', cookieHeader(SESSION_COOKIE, '', 0));
    res.status(204).end();
  });
}
