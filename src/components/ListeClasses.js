// ✅ ListeClasses.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ListeClasses = ({ profId, onChoisirClasse }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(`http://localhost:8989/api/classes/profs/${profId}`);
        setClasses(res.data.classes);
      } catch (err) {
        console.error("Erreur lors du chargement des classes:", err);
        setError("Impossible de charger les classes");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, [profId]);

  if (loading) return <p>Chargement des classes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!classes || classes.length === 0) return <p>Aucune classe disponible.</p>;

  return (
    <ul>
      {classes.map((classe) => (
        <li
          key={classe._id}
          onClick={() => onChoisirClasse(classe._id)} // ✅ on envoie la classe choisie au parent
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "5px",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
            listStyleType: "none",
          }}
        >
          <strong>{classe.niveau} - {classe.serie}</strong> <br />
          <small>{classe.description}</small>
        </li>
      ))}
    </ul>
  );
};

export default ListeClasses;


