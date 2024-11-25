"use client"

// app/tables/[tableName]/columns/[columnName]/page.js
import { useEffect, useState } from 'react';

export default function ColumnPage({ params }) {
  const [data, setData] = useState([]);
  const { tableName, columnName } = params; // Assurez-vous que cela correspond bien

  console.log("Params reçus :", params); // Vérifiez si les params sont bien passés

  useEffect(() => {
    console.log("useEffect déclenché"); // Vérifiez si l'effet est déclenché
    if (tableName && columnName) {
      async function fetchColumnData() {
        try {
          console.log("Fetching data for column:", columnName); // Log avant la requête
          const response = await fetch(`/api/tables/${tableName}/columns/${columnName}`);
          const data = await response.json();
          console.log("Données récupérées :", data); // Vérifier la structure des données
          setData(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      }

      fetchColumnData();
    }
  }, [tableName, columnName]);

  return (
    <div>
      <h1>Valeurs de la Colonne : {columnName}</h1>
      <ul>
        {data.length > 0 ? (
          data.map((row, index) => (
            <li key={index}>{row[columnName]}</li>
          ))
        ) : (
          <p>Aucune donnée trouvée pour cette colonne.</p>
        )}
      </ul>
    </div>
  );
}
