import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { defaultProfile, ensureSchema, query } from './db.js';
import { currentUser, registerAuthRoutes, requireAdmin } from './auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '32kb' }));
app.use((req, res, next) => { res.setHeader('Cache-Control', req.path.startsWith('/api/') ? 'no-store' : 'no-cache'); next(); });

function cleanText(value, max) { return String(value || '').trim().slice(0, max); }
function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
function parseJson(value, fallback) { try { return typeof value === 'string' ? JSON.parse(value) : value; } catch { return fallback; } }
function handleError(res, error) { console.error(error); res.status(500).json({ error: 'server_error' }); }

app.get('/api/health', async (req, res) => {
  try { await query('SELECT 1 AS ok'); res.json({ ok: true, database: 'ready' }); }
  catch (error) { handleError(res, error); }
});

registerAuthRoutes(app);

app.get('/api/profile', async (req, res) => {
  try {
    const rows = await query('SELECT content, updated_at FROM profile_content WHERE id = 1 LIMIT 1');
    const row = rows[0];
    res.json({ profile: row ? parseJson(row.content, defaultProfile) : defaultProfile, updatedAt: row?.updated_at || null });
  } catch (error) { handleError(res, error); }
});

app.post('/api/contact', async (req, res) => {
  const name = cleanText(req.body.name, 120);
  const email = cleanText(req.body.email, 254);
  const message = cleanText(req.body.message, 5000);
  if (!name || !validEmail(email) || !message) return res.status(422).json({ error: 'invalid_contact', fields: { name: !name, email: !validEmail(email), message: !message } });
  try { const result = await query('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]); res.status(201).json({ ok: true, id: result.insertId }); }
  catch (error) { handleError(res, error); }
});

app.get('/api/guestbook', async (req, res) => {
  try { const rows = await query("SELECT id, name, message, created_at AS createdAt FROM guestbook_messages WHERE status = 'approved' ORDER BY created_at DESC LIMIT 50"); res.json({ messages: rows }); }
  catch (error) { handleError(res, error); }
});

app.post('/api/guestbook', async (req, res) => {
  const name = cleanText(req.body.name, 120);
  const email = cleanText(req.body.email, 254) || null;
  const message = cleanText(req.body.message, 1000);
  if (!name || message.length < 2 || (email && !validEmail(email))) return res.status(422).json({ error: 'invalid_guestbook' });
  try { const result = await query('INSERT INTO guestbook_messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]); res.status(201).json({ ok: true, id: result.insertId, status: 'pending' }); }
  catch (error) { handleError(res, error); }
});

app.get('/api/admin/contact-messages', requireAdmin, async (req, res) => {
  try { res.json({ messages: await query('SELECT id, name, email, message, status, created_at AS createdAt FROM contact_messages ORDER BY created_at DESC LIMIT 200') }); }
  catch (error) { handleError(res, error); }
});

app.patch('/api/admin/contact-messages/:id', requireAdmin, async (req, res) => {
  const status = ['new', 'read', 'archived'].includes(req.body.status) ? req.body.status : null;
  if (!status) return res.status(422).json({ error: 'invalid_status' });
  try { await query('UPDATE contact_messages SET status = ? WHERE id = ?', [status, req.params.id]); res.json({ ok: true }); }
  catch (error) { handleError(res, error); }
});

app.get('/api/admin/guestbook', requireAdmin, async (req, res) => {
  try { res.json({ messages: await query('SELECT id, name, email, message, status, created_at AS createdAt FROM guestbook_messages ORDER BY created_at DESC LIMIT 200') }); }
  catch (error) { handleError(res, error); }
});

app.patch('/api/admin/guestbook/:id', requireAdmin, async (req, res) => {
  const status = ['pending', 'approved', 'rejected'].includes(req.body.status) ? req.body.status : null;
  if (!status) return res.status(422).json({ error: 'invalid_status' });
  try { await query('UPDATE guestbook_messages SET status = ?, moderated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, req.params.id]); res.json({ ok: true }); }
  catch (error) { handleError(res, error); }
});

app.get('/api/admin/profile', requireAdmin, async (req, res) => {
  try { const rows = await query('SELECT content, updated_at AS updatedAt FROM profile_content WHERE id = 1 LIMIT 1'); res.json({ profile: parseJson(rows[0]?.content, defaultProfile), updatedAt: rows[0]?.updatedAt || null }); }
  catch (error) { handleError(res, error); }
});

app.put('/api/admin/profile', requireAdmin, async (req, res) => {
  const content = req.body.profile;
  if (!content || typeof content !== 'object' || Array.isArray(content)) return res.status(422).json({ error: 'invalid_profile' });
  try { await query('UPDATE profile_content SET content = ? WHERE id = 1', [JSON.stringify(content)]); res.json({ ok: true }); }
  catch (error) { handleError(res, error); }
});

async function start() {
  await ensureSchema();
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(root, 'dist')));
    app.use((req, res) => res.sendFile(path.join(root, 'dist', 'index.html')));
  } else {
    const vite = await createViteServer({ root, server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
    app.use(async (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      try { const template = await vite.transformIndexHtml(req.originalUrl, await import('node:fs/promises').then(({ readFile }) => readFile(path.join(root, 'index.html'), 'utf8'))); res.status(200).set({ 'Content-Type': 'text/html' }).end(template); }
      catch (error) { vite.ssrFixStacktrace(error); next(error); }
    });
  }
  app.listen(port, '0.0.0.0', () => console.log(`Ouyang backend listening on ${port}`));
}

start().catch((error) => { console.error(error); process.exit(1); });
