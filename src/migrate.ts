import { sql } from './db';

export async function migrate(): Promise<void> {
  console.log('Starting migration...');

  // outreach_leads
  try {
    console.log('Creating outreach_leads table...');
    await sql`
      CREATE TABLE IF NOT EXISTS outreach_leads (
        id SERIAL PRIMARY KEY,
        country VARCHAR NOT NULL,
        segment VARCHAR DEFAULT 'msp',
        company VARCHAR,
        email VARCHAR NOT NULL UNIQUE,
        first_name VARCHAR,
        last_name VARCHAR,
        title VARCHAR,
        domain VARCHAR,
        employees INT,
        source VARCHAR,
        verified BOOLEAN DEFAULT false,
        score INT DEFAULT 0,
        status VARCHAR DEFAULT 'new',
        touch_count INT DEFAULT 0,
        last_touched_at TIMESTAMP,
        next_touch_at TIMESTAMP,
        replied_at TIMESTAMP,
        converted_at TIMESTAMP,
        mrr INT DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('outreach_leads table created');
  } catch (err) {
    console.error('Error creating outreach_leads:', err);
  }

  // outreach_sends
  try {
    console.log('Creating outreach_sends table...');
    await sql`
      CREATE TABLE IF NOT EXISTS outreach_sends (
        id SERIAL PRIMARY KEY,
        lead_id INT REFERENCES outreach_leads(id),
        touch_num INT,
        sequence_name VARCHAR,
        subject TEXT,
        sender_email VARCHAR,
        sent_at TIMESTAMP DEFAULT NOW(),
        opened_at TIMESTAMP,
        open_count INT DEFAULT 0,
        clicked_at TIMESTAMP,
        bounced BOOLEAN DEFAULT false,
        bounce_type VARCHAR,
        resend_id VARCHAR UNIQUE
      )
    `;
    console.log('outreach_sends table created');
  } catch (err) {
    console.error('Error creating outreach_sends:', err);
  }

  // customers
  try {
    console.log('Creating customers table...');
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        lead_id INT REFERENCES outreach_leads(id),
        email VARCHAR NOT NULL UNIQUE,
        company VARCHAR,
        first_name VARCHAR,
        plan VARCHAR,
        mrr_cents INT DEFAULT 0,
        trial_ends_at TIMESTAMP,
        stripe_customer_id VARCHAR,
        stripe_sub_id VARCHAR,
        status VARCHAR DEFAULT 'trial',
        health_score INT DEFAULT 100,
        last_login_at TIMESTAMP,
        clients_added INT DEFAULT 0,
        campaigns_run INT DEFAULT 0,
        nps_score INT,
        churn_reason TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('customers table created');
  } catch (err) {
    console.error('Error creating customers:', err);
  }

  // suppression
  try {
    console.log('Creating suppression table...');
    await sql`
      CREATE TABLE IF NOT EXISTS suppression (
        id SERIAL PRIMARY KEY,
        email VARCHAR UNIQUE,
        domain VARCHAR,
        reason VARCHAR,
        added_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('suppression table created');
  } catch (err) {
    console.error('Error creating suppression:', err);
  }

  // sender_health
  try {
    console.log('Creating sender_health table...');
    await sql`
      CREATE TABLE IF NOT EXISTS sender_health (
        id SERIAL PRIMARY KEY,
        sender_email VARCHAR UNIQUE,
        sent_today INT DEFAULT 0,
        bounces_today INT DEFAULT 0,
        complaints_today INT DEFAULT 0,
        paused BOOLEAN DEFAULT false,
        pause_reason TEXT,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('sender_health table created');
  } catch (err) {
    console.error('Error creating sender_health:', err);
  }

  // Indexes
  try {
    console.log('Creating indexes...');
    await sql`CREATE INDEX IF NOT EXISTS idx_outreach_leads_email ON outreach_leads(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_outreach_leads_status ON outreach_leads(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_outreach_sends_lead_id ON outreach_sends(lead_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_customers_lead_id ON customers(lead_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_suppression_email ON suppression(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sender_health_sender_email ON sender_health(sender_email)`;
    console.log('Indexes created');
  } catch (err) {
    console.error('Error creating indexes:', err);
  }

  // Seed sender aliases
  try {
    console.log('Seeding sender_health aliases...');
    await sql`
      INSERT INTO sender_health (sender_email)
      VALUES 
        ('kyle@phishsimai.com'),
        ('hello@phishsimai.com'),
        ('team@phishsimai.com'),
        ('info@phishsimai.com')
      ON CONFLICT DO NOTHING
    `;
    console.log('Sender aliases seeded');
  } catch (err) {
    console.error('Error seeding sender aliases:', err);
  }

  console.log('Migration completed');
}