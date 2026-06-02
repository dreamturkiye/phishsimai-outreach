export const TRIAL_DAYS: number[] = [0,1,3,7,14,21,28,30];

export interface EmailTemplate {
  subject: string;
  htmlBody: string;
}

export const TRIAL_ONBOARD_SEQUENCE: EmailTemplate[] = [
  { subject: 'Welcome to PhishSim AI Trial', htmlBody: '<p>Thank you for starting your PhishSim AI trial.</p><p><a href="https://www.phishsimai.com/dashboard">Access Dashboard</a></p>' },
  { subject: 'Quick Setup Guide for PhishSim AI', htmlBody: '<p>Follow these steps to set up your account.</p><p><a href="https://www.phishsimai.com/dashboard">Go to Dashboard</a></p>' },
  { subject: 'Launch Your First Campaign', htmlBody: '<p>It is time to create your first phishing simulation.</p><p><a href="https://www.phishsimai.com/dashboard">Start Campaign</a></p>' },
  { subject: 'Check Your Progress', htmlBody: '<p>See how your team is performing so far.</p><p><a href="https://www.phishsimai.com/dashboard">View Progress</a></p>' },
  { subject: 'Your Two-Week Results', htmlBody: '<p>Review your results after two weeks of use.</p><p><a href="https://www.phishsimai.com/dashboard">See Results</a></p>' },
  { subject: 'Upgrade Your PhishSim AI Plan', htmlBody: '<p>Consider upgrading for full features. Pricing starts at $49 per month.</p><p><a href="https://www.phishsimai.com/dashboard">Upgrade Now</a></p>' },
  { subject: 'Your Trial Ends in 2 Days', htmlBody: '<p>Only 2 days remain in your trial period.</p><p><a href="https://www.phishsimai.com/dashboard">Upgrade Now</a></p>' },
  { subject: 'Special Offer for PhishSim AI', htmlBody: '<p>Exclusive offer: 20 percent off your first year.</p><p><a href="https://www.phishsimai.com/dashboard">Claim Offer</a></p>' }
];