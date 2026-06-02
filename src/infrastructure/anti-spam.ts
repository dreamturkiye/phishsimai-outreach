export const SPAM_WORDS = ['free','win','winner','prize','click here','limited time','act now','buy now','special offer','discount','money back','guarantee','risk free','casino','viagra','crypto','bitcoin','investment','loan','credit','debt'];
export interface AntiSpamResult { passed: boolean; reason?: string; }
export function checkAntiSpam(subject: string): AntiSpamResult {
  const len = subject.trim().length;
  if (len < 20 || len > 80) return { passed: false, reason: 'Subject length must be 20-80 characters' };
  const lower = subject.toLowerCase();
  for (const w of SPAM_WORDS) if (lower.includes(w)) return { passed: false, reason: `Contains spam word: ${w}` };
  return { passed: true };
}
export function buildPlainText(html: string): string {
  let t = html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ');
  return t.replace(/\s+/g,' ').trim();
}
export function personalizeEmail(template: string, firstName: string, company: string, country: string): string {
  return template.replace(/\[FirstName\]/g, firstName || 'there').replace(/\[Company\]/g, company || 'your company').replace(/\[Country\]/g, country || 'your country');
}
export function addRequiredHeaders(headers: Record<string,string>, email: string): Record<string,string> {
  return { ...headers, 'List-Unsubscribe': `<mailto:unsubscribe@example.com?subject=unsub-${encodeURIComponent(email)}>` };
}