/*import axios from "axios";
const API_URL= process.env.REACT_APP_API_URL|| "http://localhost:5000/api";//URL de l'api backend


//Envoyer les données de l'èlève vers le backend lors de l'inscription.
export const signupEleve = async (eleveData) => {
  return await axios.post(`${API_URL}/eleves/signup`, eleveData); //${API_URL}/signup=http://localhost:8989/api/signup
};


//Envoyer les données de l'utilisateur vers le backend lors de la connexion
export const loginEleve = async (eleveData) => {
  return await axios.post(`${API_URL}/eleves/login`, eleveData);
};*/

/*import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const profId = localStorage.getItem("profIdProfQuiInscrit"); // ou celui du prof connecté

// 🔹 Signup élève
export const signupEleve = async (eleveData) => {
  const res = await axios.post(`${API_URL}/eleves/signup`, eleveData);

  if (res.data.success) {
    // Stocker token et informations nécessaires
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("email", res.data.eleve.email);
    localStorage.setItem("profId", res.data.eleve.profId); // ⚡ ici
    localStorage.setItem("classeId", res.data.eleve.classeId); // ⚡ si tu veux aussi
  }

  return res;
};

// 🔹 Login élève
export const loginEleve = async (eleveData) => {
  const res = await axios.post(`${API_URL}/eleves/login`, eleveData);

  if (res.data.success) {
    // Stocker token et informations nécessaires
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("email", res.data.eleve.email);
    localStorage.setItem("profId", res.data.eleve.profId);
    localStorage.setItem("classeId", res.data.eleve.classeId);
  }

  return res;
};*/



