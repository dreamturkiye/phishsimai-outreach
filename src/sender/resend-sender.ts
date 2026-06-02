import { Resend } from 'resend';
import { sql } from '../db';
import {
  checkAntiSpam,
  buildPlainText,
  personalizeEmail,
  addRequiredHeaders,
} from '../infrastructure/anti-spam';

const DAILY_LIMIT = parseInt(process.env.DAILY_LIMIT || '50', 10);
const resend = new Resend(process.env.RESEND_API_KEY!);

interface SendEmailParams {
  leadId: string;
  toEmail: string;
  firstName: string;
  company: string;
  country: string;
  subject: string;
  htmlBody: string;
  touchNum: number;
  sequenceName: string;
}

export async function sendEmail(params: SendEmailParams): Promise<boolean> {
  await checkAntiSpam(params.toEmail);

  const personalizedHtml = personalizeEmail(params.htmlBody, {
    firstName: params.firstName,
    company: params.company,
    country: params.country,
  });
  const plainText = buildPlainText(personalizedHtml);

  const [sender] = await sql`
    SELECT email, id FROM sender_health
    WHERE sent_today < ${DAILY_LIMIT}
    ORDER BY last_sent_at ASC NULLS FIRST
    LIMIT 1
  `;

  if (!sender) {
    throw new Error('No available sending alias');
  }

  const trackingPixel = `<img src="https://api.yourdomain.com/track/open/${params.leadId}" width="1" height="1" />`;
  const htmlWithPixel = personalizedHtml.replace('</body>', `${trackingPixel}</body>`);

  const headers = addRequiredHeaders({
    'List-Unsubscribe': `<mailto:unsubscribe@yourdomain.com?subject=${params.leadId}>`,
  });

  const { data, error } = await resend.emails.send({
    from: sender.email,
    to: params.toEmail,
    subject: params.subject,
    html: htmlWithPixel,
    text: plainText,
    headers,
  });

  if (error || !data) {
    throw new Error(error?.message || 'Resend send failed');
  }

  const resendId = data.id;

  await sql`
    INSERT INTO outreach_sends (
      lead_id, resend_id, alias, subject, touch_num, sequence_name, sent_at
    ) VALUES (
      ${params.leadId}, ${resendId}, ${sender.email}, ${params.subject},
      ${params.touchNum}, ${params.sequenceName}, NOW()
    )
  `;

  await sql`
    UPDATE sender_health
    SET sent_today = sent_today + 1, last_sent_at = NOW()
    WHERE id = ${sender.id}
  `;

  await sql`
    UPDATE leads
    SET last_touched_at = NOW(), status = 'contacted'
    WHERE id = ${params.leadId}
  `;

  const delay = 60000 + Math.random() * 120000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  return true;
}

export async function markOpened(resendId: string): Promise<void> {
  await sql`
    UPDATE outreach_sends
    SET opened_at = NOW()
    WHERE resend_id = ${resendId} AND opened_at IS NULL
  `;
}

export async function markBounced(
  resendId: string,
  bounceType: string
): Promise<void> {
  await sql`
    UPDATE outreach_sends
    SET bounced_at = NOW(), bounce_type = ${bounceType}
    WHERE resend_id = ${resendId}
  `;

  if (bounceType === 'hard') {
    const [row] = await sql`
      SELECT lead_id FROM outreach_sends WHERE resend_id = ${resendId}
    `;
    if (row) {
      await sql`
        UPDATE leads SET status = 'bounced' WHERE id = ${row.lead_id}
      `;
      await sql`
        INSERT INTO suppression (email, reason, created_at)
        SELECT email, 'hard_bounce', NOW()
        FROM leads WHERE id = ${row.lead_id}
        ON CONFLICT (email) DO NOTHING
      `;
    }
  }
}