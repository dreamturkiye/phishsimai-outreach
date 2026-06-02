import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { migrate } from './migrate';
import { startAllCrons } from './cron/index';
import { sql } from './db';
import { sendTelegram } from './monitor/janet';

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/unsubscribe', async (req, res) => {
  const email = req.query.email as string;
  if (!email) return res.status(400).send('Email required');
  await sql`INSERT INTO suppression (email) VALUES (${email}) ON CONFLICT DO NOTHING`;
  await sql`UPDATE lead SET unsubscribed = true WHERE email = ${email}`;
  res.send('<html><body>You have been unsubscribed.</body></html>');
});

app.get('/t/:trackingId', async (req, res) => {
  const { trackingId } = req.params;
  await sql`
    UPDATE outreach_sends
    SET opened_at = NOW(), open_count = open_count + 1
    WHERE tracking_id = ${trackingId}
  `;
  const gif = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
  );
  res.setHeader('Content-Type', 'image/gif');
  res.send(gif);
});

async function main() {
  await migrate();
  app.listen(PORT);
  startAllCrons();
  sendTelegram('rocket engine started');
}

main().catch(() => process.exit(1));