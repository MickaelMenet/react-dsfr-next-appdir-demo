import db from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { tableName: string } }
) {
  const { tableName } = context.params;
  const url = new URL(request.url);

  // Récupérer les paramètres pour les options dynamiques
  const limit = Number(url.searchParams.get("limit")) || 100;
  const offset = Number(url.searchParams.get("offset")) || 0;
  const sortBy = url.searchParams.get("sortBy") || null;
  const sortOrder = url.searchParams.get("sortOrder") || "ASC";
  const filters = url.searchParams.get("filters")
    ? JSON.parse(url.searchParams.get("filters")!)
    : {};
  const includeRelations = url.searchParams.get("includeRelations") === "true";

  try {
    let baseQuery = `SELECT * FROM ${tableName}`;
    const params: any[] = [];
    let whereClause = "";
    let orderClause = "";
    let joinClause = "";

    // Gestion des filtres
    if (Object.keys(filters).length > 0) {
      const conditions = Object.keys(filters).map((key, index) => {
        params.push(filters[key]);
        return `${key} = $${params.length}`;
      });
      whereClause = `WHERE ${conditions.join(" AND ")}`;
    }

    // Gestion des relations dynamiques
    if (includeRelations) {
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

      joinClause = relations.rows
        .map(
          (relation: any) =>
            `LEFT JOIN ${relation.foreign_table} ON ${tableName}.${relation.local_column} = ${relation.foreign_table}.${relation.foreign_column}`
        )
        .join(" ");
    }

    // Gestion du tri
    if (sortBy) {
      orderClause = `ORDER BY ${sortBy} ${
        sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC"
      }`;
    }

    // Combiner la requête
    const finalQuery = `
      ${baseQuery}
      ${joinClause}
      ${whereClause}
      ${orderClause}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2};
    `;

    params.push(limit, offset);

    const result = await db.query(finalQuery, params);

    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
