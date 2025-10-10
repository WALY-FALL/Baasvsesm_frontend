
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";//useNavigate est un Hook de React V6. Il sert à changer de page sans charger tout le site(SPA)
import { signupEleve } from "../services/authServiceEleve";//La ffonction qui envoit les données vers le backend

const SignupEleve = () => {

  //definition initialisation des etats
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //Instance de useNavigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => { //e represente l'evenement (event) declanché.
    e.preventDefault();

  // ✅ Déclare et récupère l'ID du professeur connecté
  //const profId = localStorage.getItem("profId");
 
    try {
      const res = await signupEleve({nom, prenom, email, password});//res est la reponse avaoyé par axios apres la requete Post
     
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        //localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("email", res.data.eleve.email);
        setMessage("Compte créé avec succès !");
        navigate("/login-eleve"); // redirection après inscription
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error("Erreur frontend signup:", err.response ? err.response.data : err.message);
      setMessage("Erreur lors de l'inscription");
    }
    //console.log("ProfId:", profId);
  };

  return (
    <div className="signup">
      <form className="formulaire" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input
          className="input"
          type="text"
          placeholder="Nom de l'élève"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
          <input
          className="input"
          type="text"
          placeholder="Prénom de l'èléve"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
        <input
          className="input"
          type="email"
          placeholder="Email de l'élève"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
       
        <button className="button" type="submit"><strong>Create your SEV space</strong></button>
        <br/>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupEleve;
