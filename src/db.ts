import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

export const sql = neon(DATABASE_URL);

export async function query(text: string, params?: any[]): Promise<any[]> {
  const result = await sql(text, params);
  return result;
}