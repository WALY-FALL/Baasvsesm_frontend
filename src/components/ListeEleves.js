import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function ListeEleves({ profId }) {
  const [eleves, setEleves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nom: "", prenom: "", email: "" });

  // ✅ Définir fetchEleves avec useCallback pour qu'il soit stable
  const fetchEleves = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8989/api/eleves/prof/${profId}`);
      setEleves(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des élèves :", err);
    }
  }, [profId]); // dépend de profId uniquement

  // ✅ Appeler fetchEleves une seule fois au montage (et quand profId change)
  useEffect(() => {
    fetchEleves();
  }, [fetchEleves]); // plus d’avertissement ESLint 🎉

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await axios.post("http://localhost:8989/api/eleves/add", { ...formData, profId });
      setFormData({ nom: "", prenom: "", email: "" });
      setShowForm(false);
      fetchEleves(); // recharge la liste après ajout
      console.log("📦 formData envoyé :", formData);
      console.log("🧠 profId envoyé :", profId);
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'élève :", err);
    }
  };

  return (
    <div>
      <h2>Liste des élèves</h2>

      <ul>
        {eleves.length > 0 ? (
          eleves.map((el) => (
            <li key={el._id}>
              {el.prenom} {el.nom} ({el.email})
            </li>
          ))
        ) : (
          <p>Aucun élève pour le moment.</p>
        )}
      </ul>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Annuler" : "Ajouter un élève"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <button type="submit">Enregistrer</button>
        </form>
      )}
    </div>
  );
}

export default ListeEleves;
