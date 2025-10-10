

import React, { useState, useEffect } from "react";
import axios from "axios";

const ListeProfs = ({ onSelectProf }) => {
  const [profs, setProfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfs = async () => {
      try {
        const res = await axios.get("http://localhost:8989/api/prof");
        console.log("Réponse du backend :", res.data); // pour debug
        setProfs(res.data);
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
    <>
    <h1>Liste des enseignants disponibles</h1>
    <ul>
      {profs.map((prof) => (
        <li
          key={prof._id}
          //onClick={() => onSelectProf && onSelectProf(prof)}
          onClick={() => {
            console.log("✅ Prof cliqué :", prof);
            if (onSelectProf) {
              onSelectProf(prof);
            } else {
              console.warn("⚠️ onSelectProf n'est pas défini !");
            }
          }}
          style={{
            cursor: "pointer",
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "5px",
          }}
        >
        {prof.prenom}  {prof.nom} ({prof.matiere})
        </li>
      ))}
    </ul>
    </>
  );
};

export default ListeProfs;


