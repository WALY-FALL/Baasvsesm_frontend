
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";//useNavigate est un Hook de React V6. Il sert à changer de page sans charger tout le site(SPA)
import { signup } from "../services/authService";//La ffonction qui envoit les données vers le backend

const Signup = () => {

  //definition initialisation des etats
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matiere, setMatiere] = useState("");
  const [message, setMessage] = useState("");

  //Instance de useNavigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => { //e represente l'evenement (event) declanché.
    e.preventDefault();

    try {
      const res = await signup({ username, email, password, matiere });//res est la reponse avaoyé par axios apres la requete Post
  

      if (res.data.success) {
        setMessage("Compte créé avec succès !");
        navigate("/login"); // redirection après inscription
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error("Erreur frontend signup:", err.response ? err.response.data : err.message);
      setMessage("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="signup">
      <form className="formulaire" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input
          className="input"
          type="text"
          placeholder="Nom d’utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="input"
          type="email"
          placeholder="Entrer votre Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Entrer votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          <input
          className="input"
          type="text"
          placeholder="Matière"
          value={matiere}
          onChange={(e) => setMatiere(e.target.value)}
          required
        />
        <button className="button" type="submit"><strong>Create your SVS account</strong></button>
        <br/>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
