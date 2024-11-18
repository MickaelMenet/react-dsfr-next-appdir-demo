import db from '../../lib/db.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await db.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');
    `);

    const tables = result.rows.map(row => ({
      schema: row.table_schema,
      name: row.table_name
    }));

    return NextResponse.json(tables);
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
