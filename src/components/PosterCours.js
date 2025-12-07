import React, { useState, useEffect } from "react";
import axios from "axios";

  const PosterCours = ({ onClose, selectedClasseId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [titre, setTitre] = useState(""); 
  const [contenu, setContenu] = useState("");
  //const [profId, setProfId] = useState("");
  //const [classeId, setSelectClasseId] = useState("");

  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL;

 /* useEffect(() => {
    // Récupérer le profId depuis le localStorage au chargement
    const storedProfId = localStorage.getItem("profId");
    if (storedProfId) setProfId(storedProfId);

    // ClasseId passé depuis le parent
    //if (selectedClasseId) setClasseId(selectedClasseId);
  }, [selectedClasseId])*/

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    console.log("🔹 handleUpload appelé");
    e.preventDefault();

    const profId = localStorage.getItem("profId"); // ✅ récupère l’ID réel
    console.log("✅ ProfId récupéré :", profId);
   
    if (!profId || !selectedClasseId) {
      setMessage("Impossible de récupérer le professeur ou la classe.");
      return;
    }

   /* if (!titre || !contenu) {
      setMessage("Veuillez renseigner le titre et le contenu du cours.");
      return;
    }*/

    if (!selectedFile) {
      setMessage("Veuillez sélectionner un fichier avant de poster.");
      return;
    }

    if (!profId || !selectedClasseId) {
      setMessage("Impossible de récupérer le professeur ou la classe.");
      return;
    }

    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("contenu", contenu);
    formData.append("classeId", selectedClasseId);
    formData.append("profId", profId);
    formData.append("fichiers", selectedFile);
   

    try {
      setUploading(true);
      //const res = await axios.post("http://localhost:8989/api/cours",formData,
      const res = await axios.post(`${API_URL}/cours`,formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Cours uploadé avec succès !");
      setSelectedFile(null);
      setTitre("");
      setContenu("");
      // Optionnel : afficher un lien vers le fichier
      if (res.data.fichiers && res.data.fichiers.length > 0) {
        //const fichierUrl = `http://localhost:8989/uploads/${res.data.fichiers[0]}`;
        const fichierUrl = `${API_URL}/uploads/${res.data.fichiers[0]}`;
        setMessage(
          `✅ Cours uploadé ! Fichier disponible ici : ` +
          `<a href="${fichierUrl}" target="_blank" rel="noopener noreferrer">${res.data.fichiers[0]}</a>`
        );
      }

    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l'importation du cours.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        marginTop: "50px",
        position: "relative",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        ❌
      </button>

      <h3>📤 Poster un cours</h3>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Titre du cours"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          style={{ marginBottom: "10px", display: "block" }}
          required
        />
        <textarea
          placeholder="Contenu du cours"
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          style={{ marginBottom: "10px", display: "block", width: "100%", height: "100px" }}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginBottom: "10px", display: "block" }}
          required
        />
        <button
          type="submit"
          disabled={uploading}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {uploading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
      {message && <p style={{ marginTop: "10px" }} dangerouslySetInnerHTML={{ __html: message }} />}
    </div>
  );
};

export default PosterCours;


/*import React, { useState } from "react";
import axios from "axios";

const PosterCours = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [titre, setTitre] = useState(""); 
  const [contenu, setContenu] = useState("");
  const [profId, setProfId] = useState("");
  const [classeId, setClasseId] = useState("");

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage("Veuillez sélectionner un fichier avant de poster.");
      return;
    }

    const formData = new FormData();
    formData.append("titre", titre); // string, champ texte
    formData.append("contenu", contenu); // string, champ texte
    formData.append("classeId", classeId); // id de la classe
    formData.append("profId", profId); // id du prof (depuis localStorage ou contexte)
    formData.append("fichiers", selectedFile); // ou boucle si plusieurs fichiers
  

    try {
      setUploading(true);
      const res = await axios.post(
        "http://localhost:8989/api/cours",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
             },
        }
      );

      setMessage("✅ " + res.data.message);
      setSelectedFile(null); // réinitialise le fichier pour un nouvel upload

      // ⚡ formulaire reste ouvert
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l'importation du cours.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        marginTop: "200px",
        position: "relative",
      }}
    >*/
      {/* Bouton fermer */}
     /* <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        ❌
      </button>

      <h3>📤 Poster un cours</h3>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginBottom: "10px", display: "block" }}
        />
        <button
          type="submit"
          disabled={uploading}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {uploading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default PosterCours;*/


