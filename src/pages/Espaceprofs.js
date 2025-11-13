import React, { useState, useEffect } from "react";
import FormulaireClasse from "./FormulaireClasse";
import axios from "axios";
import PosterCours from "../components/PosterCours";
import ListeCours from "../components/ListeCours";
import DemandesAccesProf from "../components/DemandesAccesProf";
//import ListeEleves from "../components/ListeEleves";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const API_URL_CLASSE = process.env.REACT_APP_API_URL_CLASSE || "http://localhost:5000/api";

const Espaceprofs = () => {
  const [showForm, setShowForm] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [profId, setProfId] = useState(null); // ✅ ajouté
  const [selectedClasse, setSelectedClasse] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  

  // Charger les classes du prof
  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/classes/my-classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data.classes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Charger infos du prof depuis localStorage

  useEffect(() => {
    fetchClasses();
    const storedEmail = localStorage.getItem("email");
    const storedProfId = localStorage.getItem("profId");
    if (storedEmail) setEmail(storedEmail);
    if (storedProfId) setProfId(storedProfId);
  }, []);
  /*useEffect(() => {
    fetchClasses();

    const storedEmail = localStorage.getItem("email");
    const storedProfId = localStorage.getItem("profId"); // ✅ récupéré au login
    if (storedEmail) setEmail(storedEmail);
    if (storedProfId) setProfId(storedProfId);
  }, []);

  useEffect(() => {
    const storedProfId = localStorage.getItem("profId");
    if (storedProfId) setProfId(storedProfId);
  }, []);*/

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL_CLASSE}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(classes.filter((c) => c._id !== id));
      if (selectedClasse && selectedClasse._id === id) setSelectedClasse(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression de la classe");
    }
  };

  const handleSelectClasse = async (classe) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/classes/${classe._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedClasse(res.data.classe);
    } catch (err) {
      console.error("Erreur de chargement de la classe:", err);
    }
  };

  const handleBackToList = () => setSelectedClasse(null);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* 🧭 Menu latéral */}
      <div
        className="menu-vertical-espaceprofs"
        style={{
          width: "220px",
          background: "#f5f5f5",
          padding: "20px",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <h3>📋 Menu</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>🏠 Tableau de bord</li>
          <li>📚 Mes Classes</li>
          <li>👩‍🏫 Profil</li>
          <li>⚙️ Paramètres</li>
        </ul>
      </div>

      {/* 🌟 Zone principale */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px" }}>
        {/* En-tête */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Bienvenue, {email} 👋</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {showForm ? "Fermer le formulaire" : "Créer une classe"}
          </button>
        </div>

        {/* Formulaire création classe */}
        {showForm && (
          <div className="mt-4 p-4 border rounded shadow" style={{ marginBottom: "20px" }}>
            <FormulaireClasse
              onClassCreated={() => {
                setShowForm(false);
                fetchClasses();
              }}
            />
          </div>
        )}

            {/* 3️⃣ Menu horizontal pour la classe */}
            {selectedClasse && (
              <nav style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>

                <button onClick={handleBackToList}>Retour à mes classes</button>

                <button>Liste des élèves</button>

                <button onClick={() => setShowUploadForm(!showUploadForm)}>
                  {showUploadForm ? "Fermer le formulaire" : "Poster un cours"}
                </button>

                <button>Poster des exercices</button>
                <button>Poster un devoir</button>
                <button>Poster un Quiz</button>
              </nav>
            )}


        {/* Formulaire upload */}
        {/* Formulaire upload {showUploadForm && selectedClasse && (*/}
        {/*{showUploadForm && (
          <div style={{ marginBottom: "20px" }}>
            <PosterCours onClose={() => setShowUploadForm(false)} />
          </div>
        )}*/}

        {/* 🌍 Détail d’une classe sélectionnée */}
        <div>
          {selectedClasse ? (
            <div>
              <div className="conteneur-classe-cours">
                <div className="titre-classe">
                  <h2>📘 Classe</h2>
                  <div className="titre">
                    <h2><strong>{selectedClasse.niveau}</strong> </h2>
                    <h2> <strong>{selectedClasse.serie}</strong> </h2>
                    <h2>  <strong>Créée le :</strong>{" "} {new Date(selectedClasse.createdAt).toLocaleString()}</h2>
                  </div>
                </div>

                <div>
                  {/* ...autres composants */}
                  <DemandesAccesProf />
                </div>

                <div>
                 {/* Liste des cours */}
                <ListeCours classeId={selectedClasse._id} />
                </div>

              </div>

              {/* ✅ Liste des élèves avec profId */}
             {/*{profId ? (
                <ListeEleves profId={profId} />
              ) : (
                <p style={{ color: "red" }}>⚠️ profId introuvable — vérifie le login.</p>
              )}*/}

              {/* Formulaire upload */}
             {showUploadForm && selectedClasse && (
                <div style={{ marginBottom: "20px" }}>
                  <PosterCours onClose={() => setShowUploadForm(false)} 
                  selectedClasseId={selectedClasse._id}
                  />
                </div>
              )}
            </div>
          ) : (
            <>
              <h3>📚 Mes Classes</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : classes.length === 0 ? (
                <p>Aucune classe pour le moment.</p>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  {classes.map((classe) => (
                    <div
                      key={classe._id}
                      onClick={() => handleSelectClasse(classe)}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "16px",
                        width: "1 1 200px",
                        height: "150px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <h4 style={{ display: "flex", gap: "15px" }}>
                        <p>{classe.niveau}</p> <p>{classe.serie}</p>
                      </h4>
                      <p>{classe.description}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(classe._id);
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Espaceprofs;








