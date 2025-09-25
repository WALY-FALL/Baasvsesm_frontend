

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService"; // Assure-toi d'avoir ce service

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook pour redirection

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await login({ email, password });
      console.log("Réponse backend :", res.data); // 👈 Ajoute ça
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/espaceprofs");
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

export default Login;