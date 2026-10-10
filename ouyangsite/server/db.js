import mysql from 'mysql2/promise';

let pool;

const defaultProfile = {
  name: 'Ouyang Jason',
  role: { zh: '在读大学生 · 生活观察者', en: 'College student · Life observer' },
  intro: { zh: '2006 年 10 月出生，目前在读大学，也在认真认识这个世界。', en: 'Born in October 2006, currently in college and taking time to understand the world.' },
  bio: { zh: '我叫 Ouyang Jason，目前还是一名大学生。喜欢旅行，也喜欢和聪明、善良、有好奇心的人聊天。', en: 'I’m Ouyang Jason, currently a college student. I love traveling and talking with thoughtful, kind, curious people.' },
};

export function getPool() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
  if (!pool) pool = mysql.createPool({ uri: process.env.DATABASE_URL, waitForConnections: true, connectionLimit: 5, charset: 'utf8mb4' });
  return pool;
}

export async function query(sql, params = []) {
  const [rows] = await getPool().execute(sql, params);
  return rows;
}

export async function ensureSchema() {
  const db = getPool();
  const connection = await db.getConnection();
  try {
    await connection.query(`CREATE TABLE IF NOT EXISTS profile_content (
      id TINYINT PRIMARY KEY,
      content JSON NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    await connection.query(`CREATE TABLE IF NOT EXISTS contact_messages (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(254) NOT NULL,
      message TEXT NOT NULL,
      status ENUM('new','read','archived') NOT NULL DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_contact_status_created (status, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    await connection.query(`CREATE TABLE IF NOT EXISTS guestbook_messages (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(254) NULL,
      message TEXT NOT NULL,
      status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      moderated_at TIMESTAMP NULL,
      INDEX idx_guestbook_status_created (status, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    await connection.query('INSERT IGNORE INTO profile_content (id, content) VALUES (1, ?)', [JSON.stringify(defaultProfile)]);
  } finally {
    connection.release();
  }
}

export { defaultProfile };
