import db from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { tableName: string } }
) {
  const { tableName } = context.params;
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit")) || 100;
  const offset = Number(url.searchParams.get("offset")) || 0;

  try {
    const result = await db.query(
      `
      SELECT *
      FROM ${tableName}
      LIMIT $1 OFFSET $2;
    `,
      [limit, offset]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
