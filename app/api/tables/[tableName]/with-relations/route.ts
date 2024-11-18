import db from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { tableName: string } }
) {
  const { tableName } = context.params;

  try {
    const relations = await db.query(
      `
      SELECT
        kcu.column_name AS local_column,
        ccu.table_name AS foreign_table,
        ccu.column_name AS foreign_column
      FROM
        information_schema.table_constraints AS tc
      JOIN
        information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN
        information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
      WHERE
        tc.table_name = $1
        AND tc.constraint_type = 'FOREIGN KEY';
    `,
      [tableName]
    );

    const joins = relations.rows
      .map(
        (relation: any) =>
          `LEFT JOIN ${relation.foreign_table} ON ${tableName}.${relation.local_column} = ${relation.foreign_table}.${relation.foreign_column}`
      )
      .join(" ");

    const result = await db.query(
      `
      SELECT *
      FROM ${tableName}
      ${joins};
    `
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
