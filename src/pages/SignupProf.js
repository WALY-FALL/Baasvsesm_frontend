
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupProf = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    matiere: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8989/api/profs/signup", formData);
      if (res.data.success) {
        // Stocker token et info dans localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("profId", res.data.prof._id);
        localStorage.setItem("email", res.data.prof.email);
        setMessage("Compte créé avec succès !");
        navigate("/login-prof"); // redirection vers login si souhaité
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error("Erreur signupProf:", err.response ? err.response.data : err.message);
      setMessage("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="signup">
      <form className="formulaire" onSubmit={handleSubmit}>
      <h2>Inscription Professeur</h2>
        <input
          className="input"
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
          <input
          className="input"
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
          <input
          className="input"
          type="text"
          name="matiere"
          placeholder="Matière"
          value={formData.matiere}
          onChange={handleChange}
          required
       
        />
        <button className="button" type="submit"><strong>Créer votre espace SEV</strong></button>
        <br/>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupProf;

