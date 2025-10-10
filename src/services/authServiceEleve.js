import axios from "axios";
const API_URL= process.env.REACT_APP_API_URL|| "http://localhost:5000/api";//URL de l'api backend


//Envoyer les données de l'èlève vers le backend lors de l'inscription.
export const signupEleve = async (userData) => {
  return await axios.post(`${API_URL}/eleves/signup`, userData); //${API_URL}/signup=http://localhost:8989/api/signup
};


//Envoyer les données de l'utilisateur vers le backend lors de la connexion
export const loginEleve = async (userData) => {
  return await axios.post(`${API_URL}/eleves/login`, userData);
};


