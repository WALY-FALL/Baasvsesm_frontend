import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";//URL de l'api backend
//console.log(API_URL);

//Envoyer les données de l'utilisateur vers le backend lors de l'inscription.
export const signup = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData); //${API_URL}/signup=http://localhost:8989/api/signup
};


//Envoyer les données de l'utilisateur vers le backend lors de la connexion
export const login = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

export const classe = async (userData) => {
  return await axios.post(`${API_URL}/classe/create`, userData); //${API_URL}/signup=http://localhost:8989/api/signup
};
