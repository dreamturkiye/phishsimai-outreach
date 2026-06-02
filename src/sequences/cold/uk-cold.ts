export const UK_COLD_DAYS = [0, 3, 7, 12, 17, 23, 30];

interface EmailTemplate {
  subject: string;
  html: string;
}

export const UK_COLD_SEQUENCE: EmailTemplate[] = [
  {
    subject: "Preparing [Company] for the CSR Bill 2026",
    html: `<html><body style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#222;margin:0;padding:20px;max-width:620px;"><p>Dear [FirstName],</p><p>As a leading MSP, [Company] will soon need to demonstrate robust cyber resilience under the CSR Bill 2026. Boards are already requesting evidence of regular phishing simulation and staff awareness programmes.</p><p>PhishSimAI delivers targeted, NCSC-aligned simulations from £499 per year for up to 250 users. Our platform provides the audit-ready reporting your clients now expect.</p><p><a href="https://www.phishsimai.com/compliance" style="background-color:#005EB8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;">Book your compliance review</a></p><p>Kind regards,<br>The PhishSimAI Team</p></body></html>`
  },
  {
    subject: "Cyber Essentials Plus – are your live tests truly realistic?",
    html: `<html><body style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#222;margin:0;padding:20px;max-width:620px;"><p>Dear [FirstName],</p><p>Many MSPs are discovering that static Cyber Essentials Plus assessments no longer satisfy assessors. Live, adaptive phishing tests are now expected.</p><p>PhishSimAI provides unlimited UK-based simulations with detailed click and credential metrics from just £1.80 per user per month. All results map directly to Cyber Essentials Plus controls.</p><p><a href="https://www.phishsimai.com/compliance" style="background-color:#005EB8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;">See live test examples</a></p><p>Kind regards,<br>The PhishSimAI Team</p></body></html>`
  },
  {
    subject: "UK GDPR Article 32 – protecting [Company] clients from ICO fines",
    html: `<html><body style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#222;margin:0;padding:20px;max-width:620px;"><p>Dear [FirstName],</p><p>The ICO continues to issue significant fines where organisations cannot evidence appropriate technical measures under Article 32. Phishing remains the leading cause of breaches.</p><p>PhishSimAI helps MSPs demonstrate ongoing staff testing and improvement, with full audit trails. Packages start at £499 per annum for MSPs managing up to 250 users.</p><p><a href="https://www.phishsimai.com/compliance" style="background-color:#005EB8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;">Download our Article 32 evidence pack</a></p><p>Kind regards,<br>The PhishSimAI Team</p></body></html>`
  },
  {
    subject: "NCSC CAF – meeting the new assessment expectations",
    html: `<html><body style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#222;margin:0;padding:20px;max-width:620px;"><p>Dear [FirstName],</p><p>The NCSC Cyber Assessment Framework now places greater emphasis on people and awareness controls. CAF assessors are specifically asking for evidence of regular phishing simulations.</p><p>PhishSimAI is mapped to the latest CAF objectives and provides the required metrics in a single dashboard. Pricing for UK MSPs begins at £499 per year.</p><p><a href="https://www.phishsimai.com/compliance" style="background-color:#005EB8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;">Align your CAF evidence today</a></p><p>Kind regards,<br>The PhishSimAI Team</p></body></html>`
  },
  {
    subject: "Supporting [Company] clients on their ISO 27001 journey",
    html: `<html><body style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#222;margin:0;padding:20px;max-width:620px;"><p>Dear [FirstName],</p><p>ISO 27001 Annex A 8.1.2 requires organisations to ensure staff are aware of information security threats. Many certification bodies now request proof of ongoing phishing simulation.</p><p>PhishSimAI delivers ISO-aligned campaigns with role-based reporting from £499 annually. Our platform integrates cleanly into your existing ISO programme.</p><p><a href="https://www.phishsimai.com/compliance" style="background-color:#005EB8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;">View our ISO 27001 mapping</a></p><p>Kind regards,<br>The PhishSimAI Team</p></body></html>`
  },
  {
    subject: "NIS2 and board liability – what [Company] clients need to know",
    html: `<html><body style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#222;margin:0;padding:20px;max-width:620px;"><p>Dear [FirstName],</p><p>Under the incoming NIS2 regime, senior management can be held personally liable for inadequate risk management. Phishing simulation is now viewed as a core control.</p><p>PhishSimAI provides board-level reports that demonstrate due diligence. MSP packages start at £499 per year and include unlimited simulations.</p><p><a href="https://www.phishsimai.com/compliance" style="background-color:#005EB8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;">Request board liability briefing</a></p><p>Kind regards,<br>The PhishSimAI Team</p></body></html>`
  },
  {
    subject: "A final note for [FirstName] at [Company]",
    html: `<html><body style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#222;margin:0;padding:20px;max-width:620px;"><p>Dear [FirstName],</p><p>We have reached out several times regarding PhishSimAI’s compliance-focused phishing simulations for UK MSPs. If this is not a priority for [Company] at present, we will not contact you again.</p><p>Should your clients’ regulatory requirements change, our platform remains available from £499 per year with a direct link to https://www.phishsimai.com/compliance.</p><p>Kind regards,<br>The PhishSimAI Team</p></body></html>`
  }
];