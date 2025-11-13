import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8989/api";

const ListeCoursEleve = () => {
  const [coursListe, setCoursListe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  
 

  // Récupération du classeId depuis le localStorage
  //const classeId = localStorage.getItem("classeId");
  const profId = localStorage.getItem("profId");
  const classeId = profId ? localStorage.getItem(`classe_${profId}`) : null;

  /*useEffect(() => {
    const fetchCours = async () => {
      if (!classeId) {
        setError("Classe non sélectionnée.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token"); // si tu protèges les routes
        const res = await axios.get(`${API_URL}/cours/classe/${classeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCoursListe(res.data);
      } catch (err) {
        console.error("Erreur récupération cours élève :", err);
        setError("Impossible de récupérer les cours.");
      } finally {
        setLoading(false);
      }
    };

    fetchCours();
  }, [classeId]);*/

  useEffect(() => {
    const fetchCours = async () => {
      if (!profId) {
        setError("Aucun professeur sélectionné.");
        setLoading(false);
        return;
      }
  
      const storedClasse = localStorage.getItem(`classe_${profId}`);
  
      if (!storedClasse) {
        setError("⏳ En attente de validation du professeur pour cette classe.");
        setLoading(false);
        return;
      }
  
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/cours/classe/${storedClasse}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setCoursListe(res.data);
      } catch (err) {
        console.error("Erreur récupération cours élève :", err);
        setError("Impossible de récupérer les cours.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCours();
  }, [profId]);
  

  if (loading) return <p>Chargement des cours...</p>;
  if (error) return <p>{error}</p>;
  if (coursListe.length === 0) return <p>Aucun cours pour cette classe.</p>;

  return (
    <div>
      <h3>📚 Cours de la classe </h3>
      {coursListe.map((c) => (
        <div
          key={c._id}
          style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ddd", width:"160px" }}
        >
          <h4>{c.titre}</h4>
          <p>{c.contenu}</p>
          {c.fichiers && c.fichiers.length > 0 && (
            <a
              href={`http://localhost:8989/${c.fichiers[0].url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.fichiers[0].nom}
            </a>
          )}
          <p style={{ fontSize: "0.9em", color: "#555" }}>
            Professeur : {c.profId?.nom} {c.profId?.prenom}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListeCoursEleve;
