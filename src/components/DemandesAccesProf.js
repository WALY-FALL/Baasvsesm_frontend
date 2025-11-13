/*import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8989/api";

const DemandesAccesProf = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // token du prof

  // Récupérer les demandes à l'ouverture
  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const res = await axios.get(`${API_URL}/demandes/demandes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDemandes(res.data.demandes);
      } catch (err) {
        console.error("Erreur récupération demandes :", err);
        setError("Impossible de récupérer les demandes.");
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, []);

  // Répondre à une demande
  const repondreDemande = async (demandeId, decision) => {
    try {
      const res = await axios.put(
        `${API_URL}/demande/${demandeId}`,
        { decision },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Mettre à jour la liste localement
      setDemandes((prev) =>
        prev.map((d) =>
          d._id === demandeId ? { ...d, statut: decision } : d
        )
      );

      alert(`Demande ${decision}`);
    } catch (err) {
      console.error("Erreur réponse demande :", err);
      alert("Erreur serveur");
    }
  };

  if (loading) return <p>Chargement des demandes...</p>;
  if (error) return <p>{error}</p>;
  if (demandes.length === 0) return <p>Aucune demande pour le moment.</p>;

  return (
    <div>
      <h3>📬 Demandes d'accès à cette classe</h3>
      {demandes.map((demande) => (
        <div
          key={demande._id}
          style={{
            marginBottom: "15px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <p>
            Élève : <strong>{demande.eleveId?.prenom} {demande.eleveId?.nom}</strong> {" "} souhaite accéder à la  {" "} 
            classe <strong>{demande.classeId?.niveau} {demande.classeId?.serie}</strong>
          </p>
          <p>Statut : {demande.statut}</p>

          {demande.statut === "en attente" && (
            <div>
              <button
                 onClick={() => repondreDemande(demande._id, "accepte")}
                 style={{
                   marginRight: "10px",
                   backgroundColor: "green",
                   color: "white",
                   padding: "5px 10px",
                   border: "none",
                   borderRadius: "5px",
                   cursor: "pointer",
                 }}
               >
                Accepter
              </button>
              <button 
                 onClick={() => repondreDemande(demande._id, "refuse")}
                 style={{
                   backgroundColor: "red",
                   color: "white",
                   padding: "5px 10px",
                   border: "none",
                   borderRadius: "5px",
                   cursor: "pointer",
                 }}
             
              >
                Refuser
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DemandesAccesProf;*/

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8989/api";

  const DemandesAccesProf = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/demandes/demandes`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setDemandes(res.data.demandes || []);
        } else {
          setError("Impossible de récupérer les demandes.");
        }
      } catch (err) {
        console.error("Erreur récupération demandes :", err);
        setError("Erreur récupération demandes.");
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, []);

  const repondreDemande = async (demandeId, decision) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/demandes/demande/${demandeId}`,
        { decision },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Met à jour localement la liste
      setDemandes((prev) =>
        prev.filter((d) => d._id !== demandeId)
      );
    } catch (err) {
      console.error("Erreur réponse demande :", err);
      alert("Erreur lors de la réponse.");
    }
  };

  if (loading) return <p>Chargement des demandes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!demandes.length) return <p>Aucune demande pour le moment.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📥 Demandes d’accès aux classes</h2>

      {demandes.map((demande) => (
        <div
          key={demande._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <p>
            Élève :{" "}
            <strong>
              {demande.eleveId?.prenom} {demande.eleveId?.nom}
            </strong>{" "}
            souhaite accéder à la classe{" "}
            <strong>
              {demande.classeId?.niveau} {demande.classeId?.serie}
            </strong>
          </p>

          <p>Statut : {demande.statut}</p>

          {/* ✅ Afficher les boutons si la demande est en attente */}
          {demande.statut === "en_attente" && (
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => repondreDemande(demande._id, "accepte")}
                style={{
                  marginRight: "10px",
                  backgroundColor: "green",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ✅ Accepter
              </button>
              <button
                onClick={() => repondreDemande(demande._id, "refuse")}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                ❌ Refuser
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DemandesAccesProf;

