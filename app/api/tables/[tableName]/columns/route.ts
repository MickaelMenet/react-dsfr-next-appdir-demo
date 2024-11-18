import db from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { tableName: string } }
) {
  const { tableName } = context.params;

  try {
    const result = await db.query(
      `
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = $1;
    `,
      [tableName]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
