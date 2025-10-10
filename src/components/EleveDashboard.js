import React, { useState, useEffect } from "react";
import axios from "axios";
import ListeProfs from "./ListeProfs";
import ListeClasses from "./ListeClasses";
//import ListeEleves from "./ListeEleves";

const EleveDashboard = () => {
  const [profs, setProfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profSelectionne, setProfSelectionne] = useState(null);

  useEffect(() => {
    const fetchProfs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8989/api/prof");
        setProfs(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des profs :", err);
        setError("Impossible de charger les profs");
      } finally {
        setLoading(false);
      }
    };
    fetchProfs();
  }, []);

  // ✅ Quand on clique sur un prof
  const handleSelectProf = (prof) => {
    setProfSelectionne(prof); // sélectionne le prof
  };

  // ✅ Retour à la liste des profs
  const handleBackToProfs = () => {
    setProfSelectionne(null); // désélectionne le prof
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Tableau de bord Élève:</h1>

      {loading && <p>Chargement des profs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Liste des profs */}
      {!loading && !error && !profSelectionne && (
        <ListeProfs
          profs={profs}
          onSelectProf={handleSelectProf} // ← ici le clic passe le prof sélectionné
        />
      )}

      {/* Classes du prof sélectionné */}
      {profSelectionne && (
        <div>
          <button
            onClick={handleBackToProfs}
            style={{
              marginBottom: "10px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            ← Retour à la liste des profs
          </button>

          <h2>
            Classes de {profSelectionne.prenom}  {profSelectionne.nom}
          </h2>
          <ListeClasses profId={profSelectionne._id} />

          {/*{profSelectionne && (
  <div>
   <h2>Élèves de {profSelectionne.nom} {profSelectionne.prenom}</h2>
    <ListeEleves profId={profSelectionne._id} /> */}{/* 👈 ICI on envoie le profId */}
{/* </div>
)}*/}


         
        </div>
      )}
    </div>
  );
};

export default EleveDashboard;

