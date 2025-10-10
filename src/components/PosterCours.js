import React, { useState } from "react";
import axios from "axios";

const PosterCours = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

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
    formData.append("cours", selectedFile);

    try {
      setUploading(true);
      const res = await axios.post(
        "http://localhost:8989/api/cours/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
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
    >
      {/* Bouton fermer */}
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

export default PosterCours;


