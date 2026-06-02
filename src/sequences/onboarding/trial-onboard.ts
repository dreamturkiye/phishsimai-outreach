export const TRIAL_DAYS = [0, 1, 3, 7, 14, 21, 28, 30];

export interface EmailTemplate {
  day: number;
  subject: string;
  preheader: string;
  body: string;
}

export const TRIAL_ONBOARD_SEQUENCE: EmailTemplate[] = [
  {
    day: 0,
    subject: "Welcome to PhishSim AI, [FirstName] — let's get started",
    preheader: "Your PhishSim AI trial is active. Complete your first setup in under 5 minutes.",
    body: `Hi [FirstName],

Welcome to PhishSim AI. Your 30-day trial for [Company] is now active.

To get immediate value, complete your first action:
1. Connect your email provider (takes 2 minutes)
2. Create your first phishing simulation campaign

Our AI will generate realistic scenarios tailored to your industry.

Ready to begin? Click here to launch your first campaign.

The PhishSim AI Team`,
  },
  {
    day: 1,
    subject: "How to set up your first campaign in PhishSim AI",
    preheader: "Step-by-step guide to launch your initial simulation today.",
    body: `Hi [FirstName],

Here's a quick guide to launch your first campaign:

1. Go to Campaigns → New Campaign
2. Select "AI-Generated" and choose your target department
3. Pick difficulty level (we recommend starting with Medium)
4. Review the AI-generated templates and click Launch

Your first results will appear within 24 hours.

Need help? Reply to this email — our team monitors trial accounts closely.

Best regards,
The PhishSim AI Team`,
  },
  {
    day: 3,
    subject: "[FirstName], run your first campaign today using our template",
    preheader: "Use our proven "New Employee" template to get instant results.",
    body: `Hi [FirstName],

Many [Company] users see strong engagement with the "New Employee Onboarding" template.

To launch it now:
- Select Templates → Industry → "New Employee"
- Target 10–25 users
- Schedule for today at 10:00 AM local time

This template typically achieves 35–45% click rates in the first 48 hours.

Launch it now and check your dashboard this afternoon.

The PhishSim AI Team`,
  },
  {
    day: 7,
    subject: "Your PhishSim AI progress check — week one results",
    preheader: "See how [Company] performed in the first week.",
    body: `Hi [FirstName],

You've completed week one of your PhishSim AI trial.

Key stats for [Company]:
- Campaigns launched: [CampaignCount]
- Users simulated: [UserCount]
- Click rate: [ClickRate]%
- Reported phishing: [ReportRate]%

Your weakest area appears to be [WeakArea]. Would you like us to generate a targeted follow-up campaign?

View full report in your dashboard.

The PhishSim AI Team`,
  },
  {
    day: 14,
    subject: "Two-week PhishSim AI results for [Company]",
    preheader: "See your team's improvement and next recommended actions.",
    body: `Hi [FirstName],

Two weeks into your trial. Here's how [Company] is performing:

- Overall click rate reduced by [Improvement]%
- Top risk department: [RiskDept]
- Most effective simulation type: [BestType]

Recommendation: Run a "Credential Harvesting" simulation this week targeting [RiskDept].

Would you like us to auto-generate this campaign for you?

The PhishSim AI Team`,
  },
  {
    day: 21,
    subject: "9 days remaining in your PhishSim AI trial",
    preheader: "Here's what happens when your trial ends and how to continue.",
    body: `Hi [FirstName],

You have 9 days left in your PhishSim AI trial for [Company].

Current plan comparison:

Starter — $99/mo
- 3 campaigns/month
- Basic reporting
- Email support

Professional — $249/mo
- Unlimited campaigns
- Advanced AI scenarios
- Priority support + SSO

Enterprise — Custom
- Everything in Professional + API access, custom branding, dedicated success manager

Reply with "PRO" if you'd like to discuss upgrading.

The PhishSim AI Team`,
  },
  {
    day: 28,
    subject: "2 days left — upgrade before your trial ends",
    preheader: "Lock in your results and continue protecting [Company].",
    body: `Hi [FirstName],

Your PhishSim AI trial ends in 2 days.

To keep your campaigns, results, and AI models active, upgrade before the trial expires.

Use code TRIAL30 for 30% off your first 3 months on any paid plan.

Upgrade now → [Link]

Questions? Book a quick call with our team.

The PhishSim AI Team`,
  },
  {
    day: 30,
    subject: "Your PhishSim AI trial has ended — special offer inside",
    preheader: "Reactivate your account with an exclusive trial extension.",
    body: `Hi [FirstName],

Your PhishSim AI trial for [Company] has now ended.

All campaign data remains saved for the next 14 days.

As a thank you for testing PhishSim AI, we're offering a special one-time extension:

- 14 extra days of full Professional access
- No card required to start the extension

Claim your extension here → [Link]

We hope to see you back soon.

The PhishSim AI Team`,
  },
];