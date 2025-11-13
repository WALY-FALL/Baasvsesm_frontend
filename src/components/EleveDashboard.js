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

/*useEffect(() => {
  const eleveId = localStorage.getItem("eleveId");
  if (!eleveId) return;

  axios.get(`http://localhost:8989/api/eleves/${eleveId}`)
    .then(res => {
      if (res.data.classeId) {
        localStorage.setItem("classeId", res.data.classeId);
      }
    })
    .catch(err => console.log(err));
}, []);*/


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
      // 🆕 On mémorise le prof sélectionné
  localStorage.setItem("profId", prof._id);
  };

  // ✅ Retour à la liste des profs
  const handleBackToProfs = () => {
    setProfSelectionne(null); // désélectionne le prof
    localStorage.removeItem("profId"); // facultatif mais propre
  };


  // ✅ Quand l'élève choisit une classe
  const handleChoisirClasse = async (classeIdChoisie) => {
    const eleveId = localStorage.getItem("eleveId");
    const profId = localStorage.getItem("profId"); // <--- On récupère le bon prof
    //const profId = profSelectionne?._id;
  
    if (!eleveId || !profId || !classeIdChoisie) {
      console.log("❌ Données manquantes :", { eleveId, profId, classeIdChoisie });
      alert("Erreur : informations manquantes. Reconnecte-toi.");
      return;
    }
  
    try {
      // ✅ 1) Vérifier si l'accès a déjà été accepté
      const verif = await axios.get(`http://localhost:8989/api/demandes/eleve/${eleveId}`);
      //const verif = await axios.get(`http://localhost:8989/api/demandes/eleve/${eleveId}/prof/${profId}`);

      if (verif.data?.statut === "accepte") {
        // ✅ L'élève est déjà autorisé → On active l'accès directement
        localStorage.setItem("classeId", verif.data.classeId);
        setClasseId(verif.data.classeId);
        setHasChosen(true);
        return;
      }
  
      // ❗ Sinon → envoyer une nouvelle demande d'accès
      const res = await axios.post("http://localhost:8989/api/demandes/demande", {
        eleveId,
        profId,
        classeId: classeIdChoisie,
      });
  
      if (res.data.success) {
        localStorage.setItem(`classe_${profId}`, classeIdChoisie);
        alert("✅ Demande envoyée. En attente de validation du professeur.");
      } else {
        alert(res.data.message || "Erreur lors de l’envoi de la demande.");
      }
  
    } catch (err) {
      console.error("Erreur lors de la demande d'accès :", err);
      alert("Erreur serveur lors de la demande d'accès.");
    }
  };
  
  /*const handleChoisirClasse = async (classeIdChoisie) => {
    const eleveId = localStorage.getItem("eleveId");
    const profId = profSelectionne._id;

    if (!eleveId || !profId || !classeIdChoisie) {
      console.log("❌ Données manquantes :", { eleveId, profId, classeIdChoisie });
      alert("Erreur : informations manquantes. Reconnecte-toi.");
      return;
    }
  
    try {
      
      // ✅ On ne lie pas encore l'élève à la classe
      // On envoie simplement une demande d'accès
      const res = await axios.post("http://localhost:8989/api/demandes/demande", {
        eleveId,
        profId,
        classeId: classeIdChoisie,
      });
  
      if (res.data.success) {
        alert("✅ Demande d'accès envoyée au professeur. En attente de validation.");
      } else {
        alert(res.data.message || "Erreur lors de l’envoi de la demande.");
      }
    } catch (err) {
      console.error("Erreur lors de la demande d'accès :", err);
      alert("Erreur serveur lors de la demande d'accès.");
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
        {/*<h3>📚 Cours de la classe sélectionnée</h3>*/}
        <ListeCoursEleve classeId={classeId} />
      </div>
    )}

        </div>
      )}
    </div>
  );
};

export default EleveDashboard;

