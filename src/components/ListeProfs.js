import React, { useState, useEffect } from "react";
import axios from "axios";

const ListeProfs = ({ onSelectProf }) => {
  const [profs, setProfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfs = async () => {
      try {
        const res = await axios.get("http://localhost:8989/api/profs"); // attention: /profs, pas /prof
        setProfs(res.data.profs); // ton backend renvoie { success, message, profs }
      } catch (err) {
        console.error("Erreur lors du chargement des profs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfs();
  }, []);

  if (loading) return <p>Chargement des profs...</p>;
  if (!profs || profs.length === 0) return <p>Aucun prof disponible.</p>;

  return (
    <div className="liste-profs">
      <h1>Liste des enseignants disponibles</h1>
      <ul>
        {profs.map((prof) => (
          <li
            key={prof._id}
            onClick={() => {
              console.log("✅ Prof cliqué :", prof);
              onSelectProf && onSelectProf(prof);
            }}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "5px",
              backgroundColor: "#e8ffe8",
              listStyleType: "none",
            }}
          >
            {prof.prenom} {prof.nom} ({prof.matiere})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListeProfs;


