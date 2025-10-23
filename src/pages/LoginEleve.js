
/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEleve } from "../services/authServiceEleve";

const LoginEleve = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginEleve({ email, password });

      if (res.data.success) {
        // ✅ Stocker le token et les IDs pour filtrage futur
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.eleve.email);
        localStorage.setItem("profId", res.data.eleve.profId);       // ID du prof qui a ajouté l'élève
        localStorage.setItem("eleveId", res.data.eleve._id);
        localStorage.setItem("classeId", res.data.eleve.classeId);   // ID de la classe de l'élève

        //console.log("🔎 Reçu côté frontend:", JSON.stringify(res.data, null, 2));
        console.log("👨‍🏫 Prof associé :", res.data.eleve.profId);
        navigate("/eleve"); // redirection vers la page élève
      } else {
        setMessage(res.data.message || "Email ou mot de passe incorrect");
      }
    } catch (err) {
      console.error("Erreur Axios :", err.response ? err.response.data : err.message);
      setMessage("Erreur lors de la connexion");
    }
  };

  return (
    <div className="signup">
      <form className="formulaire" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <input
          className="input"
          type="text"
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
        <button className="button" type="submit">
          Se connecter
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginEleve;

/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEleve } from "../services/authServiceEleve"; // Assure-toi d'avoir ce service

const LoginEleve = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook pour redirection

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await loginEleve({ email, password });
      
      if (res.data.success) {

      
        localStorage.setItem("token", res.data.token);
        //localStorage.setItem("name", res.data.user.name);  // ⚡ stocker le nom
        localStorage.setItem("email", res.data.eleve.email);
        console.log("🔎 Reçu côté frontend:", JSON.stringify(res.data, null, 2));
        navigate("/eleve"); // redirection après connexion
      } else {
        setMessage(res.data.message || "Email ou mot de passe incorrect");
      }
     
    } catch (err) {
      console.error("Erreur Axios :", err.response ? err.response.data : err.message);
      setMessage("Erreur lors de la connexion");
    }
    
  };

  

  return (
    <div className="signup">
      <form className="formulaire" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <input
          className="input"
          type="text"
          id="email"
          placeholder="Entrer votre Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          id="password"
          placeholder="Entrer votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="button" type="submit" id="button">Se connecter</button>
        <br/>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginEleve;*/

