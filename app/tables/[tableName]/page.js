"use client"
// app/tables/[tableName]/page.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TablePage({ params }) {
  const [columns, setColumns] = useState([]);
  const { tableName } = params;

  useEffect(() => {
    async function fetchColumns() {
      try {
        const response = await fetch(`/api/tables/${tableName}`);
        const data = await response.json();

        // Vérifiez si data est bien un tableau
        if (Array.isArray(data)) {
          setColumns(data);
        } else {
          console.error("Les données récupérées ne sont pas un tableau :", data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des colonnes :", error);
      }
    }

    fetchColumns();
  }, [tableName]);

  return (
    <div>
      <h1>Colonnes de la Table : {tableName}</h1>
      <ul>
        {columns.map((column, index) => (
          <li key={index}>
            <Link href={`/tables/${tableName}/columns/${column.column_name}`}>
              {column.column_name} ({column.data_type})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
