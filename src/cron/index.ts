import cron from 'node-cron';
import sql from '../db';
import { sendTelegram, sendDailyReport, alertBounceRate } from '../monitor/janet';
import sendEmail from '../sender/resend-sender';
import { US_COLD_SEQUENCE, US_COLD_DAYS } from '../sequences/cold/us-cold';
import { UK_COLD_SEQUENCE, UK_COLD_DAYS } from '../sequences/cold/uk-cold';
import { TRIAL_ONBOARD_SEQUENCE, TRIAL_DAYS } from '../sequences/onboarding/trial-onboard';

export function startAllCrons(): void {
  cron.schedule('0 9 * * *', async () => {
    const stats = await sql`SELECT * FROM stats`;
    await sendDailyReport(stats);
  });

  cron.schedule('0 0 * * *', async () => {
    await sql`UPDATE senders SET sent_today = 0, bounces_today = 0`;
  });

  cron.schedule('*/30 * * * *', async () => {
    const aliases = await sql`SELECT * FROM aliases WHERE bounce_rate > 4`;
    for (const alias of aliases) {
      await sql`UPDATE aliases SET status = 'paused' WHERE id = ${alias.id}`;
      await alertBounceRate(alias);
    }
  });

  cron.schedule('*/30 * * * *', async () => {
    const expiring = await sql`SELECT * FROM trials WHERE expires_at BETWEEN NOW() AND NOW() + INTERVAL '${TRIAL_DAYS} days'`;
    const expired = await sql`SELECT * FROM trials WHERE expires_at < NOW()`;
    for (const t of [...expiring, ...expired]) {
      await sendTelegram(TRIAL_ONBOARD_SEQUENCE(t));
    }
  });

  cron.schedule('0 0 1 * *', async () => {
    await sql`UPDATE leads SET status = 'queued' WHERE status = 'cold' AND last_touch_at < NOW() - INTERVAL '90 days'`;
  });

  cron.schedule('0,8,16,24,32,40,48,56 7-22 * * *', async () => {
    const [lead] = await sql`
      SELECT * FROM leads 
      WHERE status = 'queued' AND verified = true 
      ORDER BY score DESC LIMIT 1
    `;
    if (!lead) return;

    const sequence = lead.country === 'US' ? US_COLD_SEQUENCE : UK_COLD_SEQUENCE;
    const days = lead.country === 'US' ? US_COLD_DAYS : UK_COLD_DAYS;
    const template = sequence(lead);

    await sendEmail(lead, template);
    await sql`
      UPDATE leads 
      SET status = 'sent', next_touch_at = NOW() + INTERVAL '${days} days' 
      WHERE id = ${lead.id}
    `;
  });
}