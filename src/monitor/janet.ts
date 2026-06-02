import * as https from 'https';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function sendTelegram(message: string): Promise<void> {
  const data = JSON.stringify({
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'HTML',
  });
  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${BOT_TOKEN}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  };
  return new Promise((resolve) => {
    const req = https.request(options, () => resolve());
    req.on('error', () => resolve());
    req.write(data);
    req.end();
  });
}

export interface DailyStats {
  date: string;
  repliesSent: number;
  newCustomers: number;
  bounceRate: number;
  blacklisted: number;
  trialsStarted: number;
}

export async function sendDailyReport(stats: DailyStats): Promise<void> {
  const report = `📈 <b>Daily Report - ${stats.date}</b>\n💬 Replies: ${stats.repliesSent}\n👥 New Customers: ${stats.newCustomers}\n📉 Bounce Rate: ${stats.bounceRate}%\n🚫 Blacklisted: ${stats.blacklisted}\n🆓 Trials: ${stats.trialsStarted}`;
  await sendTelegram(report);
}

export async function alertReply(user: string, message: string): Promise<void> {
  await sendTelegram(`💬 <b>Reply Alert</b>\nUser: ${user}\n${message}`);
}

export async function alertNewCustomer(name: string, email: string): Promise<void> {
  await sendTelegram(`🆕 <b>New Customer</b>\n${name} (${email})`);
}

export async function alertBounceRate(rate: number): Promise<void> {
  await sendTelegram(`⚠️ <b>High Bounce Rate</b>: ${rate}%`);
}

export async function alertBlacklisted(email: string): Promise<void> {
  await sendTelegram(`🚫 <b>Blacklisted</b>: ${email}`);
}

export async function alertTrialStart(company: string): Promise<void> {
  await sendTelegram(`🎉 <b>Trial Started</b>: ${company}`);
}