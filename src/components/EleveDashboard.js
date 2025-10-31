import React, { useState, useEffect } from "react";
import axios from "axios";
import ListeProfs from "./ListeProfs";
import ListeClasses from "./ListeClasses";
import ListeCoursEleve from "./ListeCoursEleve";
//import ListeEleves from "./ListeEleves";

const EleveDashboard = () => {
  const [profs, setProfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profSelectionne, setProfSelectionne] = useState(null);
  const [eleveId, setEleveId] = useState(null);
  const [profId, setProfId] = useState(null);
  const [classeId, setClasseId] = useState(null); // ✅ manquant
  const [hasChosen, setHasChosen] = useState(false); // ✅ manquant

  useEffect(() => {
    const fetchProfs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8989/api/profs");
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

 
  

useEffect(() => {
  const id = localStorage.getItem("eleveId");
  if (!id) {
    console.warn("⚠️ eleveId introuvable dans le localStorage");
    // tu peux rediriger vers le login ici si tu veux
  } else {
    setEleveId(id);
    console.log("🔍 eleveId récupéré :", id);
  }
}, []);

useEffect(() => {
  const storedEleveId = localStorage.getItem("eleveId");
  const storedProfId = localStorage.getItem("profId");
  const storedClasseId = localStorage.getItem("classeId");

  if (storedEleveId) {
    setEleveId(storedEleveId);
    setProfId(storedProfId);
    setClasseId(storedClasseId);
    if (storedProfId && storedClasseId) {
      setHasChosen(true);
    }
  } else {
    console.warn("⚠️ Aucun eleveId trouvé dans le localStorage");
  }
}, []);



  // ✅ Quand on clique sur un prof
  const handleSelectProf = (prof) => {
    setProfSelectionne(prof); // sélectionne le prof
  };

  // ✅ Retour à la liste des profs
  const handleBackToProfs = () => {
    setProfSelectionne(null); // désélectionne le prof
  };

  // ✅ Quand l'élève choisit une classe

  // ✅ Quand l'élève choisit une classe
const handleChoisirClasse = async (classeIdChoisie) => {
  const eleveId = localStorage.getItem("eleveId");
  const profId = profSelectionne._id;

  console.log("🔍 Données envoyées à l'API :", {
    eleveId,
    profId,
    classeId: classeIdChoisie,
  });

  try {
    const res = await axios.put("http://localhost:8989/api/eleves/choisir", {
      eleveId,
      profId,
      classeId: classeIdChoisie,
    });

    if (res.data.success) {
      alert("Classe choisie avec succès !");

      // ✅ Enregistre la classe dans le localStorage
      localStorage.setItem("classeId", classeIdChoisie);

      // ✅ Met à jour le state local (pour affichage direct)
      setClasseId(classeIdChoisie);
      setHasChosen(true);
    } else {
      alert(res.data.message);
    }

    console.log("✅ Lien créé :", res.data);
  } catch (err) {
    console.error("Erreur lors du choix de la classe :", err);
    alert("Erreur serveur lors du choix de la classe");
  }
};

/*const handleChoisirClasse = async (classeIdChoisie) => {
  //const eleveId = localStorage.getItem("eleveId"); // tu peux le stocker après login
  const profId = profSelectionne._id;
  //console.log("🔍 Données envoyées :", { eleveId, profId, classeId });
 // console.log("🔍 eleveId:", eleveId); // doit afficher un ID valide
 console.log("🔍 Données envoyées à l'API :", {
  eleveId,
  profId,
  classeId,
});
  try {
    const res = await axios.put("http://localhost:8989/api/eleves/choisir", {
      eleveId,
      //profId: profSelectionne._id,
      //classeId: classe._id
      profId,
      classeId: classeIdChoisie,
    });

    if (res.data.success) {
      alert("Classe choisie avec succès !");
       // ⚡ Mettre à jour l’état local pour afficher les cours
       setClasseId(classeIdChoisie);
       setHasChosen(true);
    } else {
      alert(res.data.message);
    }
    console.log("✅ Lien créé :", res.data);
  } catch (err) {
    console.error("Erreur lors du choix de la classe :", err);
    alert("Erreur serveur lors du choix de la classe");
  }
};*/


  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Tableau de bord de l'élève:</h1>

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
          {/*<ListeClasses profId={profSelectionne._id} />*/}
          <ListeClasses 
  profId={profSelectionne._id}
  onChoisirClasse={handleChoisirClasse}  // ✅ ajout important
/>

          {/*{profSelectionne && (
  <div>
   <h2>Élèves de {profSelectionne.nom} {profSelectionne.prenom}</h2>
    <ListeEleves profId={profSelectionne._id} /> */}{/* 👈 ICI on envoie le profId */}
 {/*</div>
)} */} 
          {/* ✅ Affichage des cours uniquement si une classe est choisie */}
    {hasChosen && classeId && (
      <div style={{ marginTop: "20px" }}>
        <h3>📚 Cours de la classe sélectionnée</h3>
        <ListeCoursEleve classeId={classeId} />
      </div>
    )}

        </div>
      )}
    </div>
  );
};

export default EleveDashboard;

