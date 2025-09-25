import React, { useState } from "react";
import axios from "axios";



const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Classe=({ onClassCreated })=>{

     //definition initialisation des etats
  const [serie, setSerie] = useState("");
  const [niveau, setNiveau] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => { //e represente l'evenement (event) declanché.
    e.preventDefault();

    try { 

      await axios.post(`${API_URL}/classe/create`, {
        serie,
        niveau,
        description,
      });

      // 👉 Fermer le formulaire
      if (onClassCreated) onClassCreated();
  
    } catch (err) {
      console.error("Erreur:", err.response ? err.response.data : err.message);
      setMessage("Erreur lors de la crèation de la classe");
    }
  };

    return(
    
        <div >
      <form className="formulaire" onSubmit={handleSubmit}>
        <h1>Classe</h1>
        <input
          type="text"
          placeholder="Série"
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Niveau"
          value={niveau}
          onChange={(e) => setNiveau(e.target.value)}
          required
        />
        <input
          className="text"
          placeholder="Descriptipn"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button className="button" type="submit"><strong>Create your class</strong></button>
        <br/>
      </form>
      {message && <p>{message}</p>}
    </div> 
    );
}

export default Classe;

