"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TablesPage() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    async function fetchTables() {
      const response = await fetch('/api/tables');
      const data = await response.json();
      setTables(data);
    }

    fetchTables();
  }, []);

  return (
    <div>
      <h1>Tables de la Base de Données</h1>
      <ul>
        {tables.map((table, index) => (
          <li key={index}>
            <Link href={`/tables/${table.name}`}>
              {table.schema}.{table.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
