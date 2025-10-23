import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginProf = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8989/api/profs/login", formData);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("profId", res.data.prof._id);
        localStorage.setItem("email", res.data.prof.email);
        setMessage("Connexion réussie !");
        navigate("/espace-prof"); // redirection vers espace prof
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error("Erreur loginProf:", err.response ? err.response.data : err.message);
      setMessage("Erreur lors de la connexion");
    }
  };
  return (
    <div className="signup">
      <form className="formulaire" onSubmit={handleSubmit}>
      <h2>Connexion Professeur</h2>
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
        <button className="button" type="submit" id="button">Se connecter</button>
        <br/>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginProf;
