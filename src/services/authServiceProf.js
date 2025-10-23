import axios from "axios";
const API_URL= process.env.REACT_APP_API_URL|| "http://localhost:5000/api";//URL de l'api backend

//const API_URL_USERS= process.env.REACT_APP_API_URL_USERS|| "http://localhost:5000/api";//URL de l'api backend
const API_URL_CLASSE= process.env.REACT_APP_API_URL_CLASSE|| "http://localhost:5000/api";
//console.log(API_URL);

//Envoyer les données de l'utilisateur vers le backend lors de l'inscription.
export const signupProf = async (userData) => {
  return await axios.post(`${API_URL}/profs/signup`, userData); //${API_URL}/signup=http://localhost:8989/api/signup
};


//Envoyer les données de l'utilisateur vers le backend lors de la connexion
export const loginProf = async (userData) => {
  return await axios.post(`${API_URL}/profs/login`, userData);
};

export const classe = async (userData) => {
  return await axios.post(`${API_URL_CLASSE}/create`, userData); //${API_URL}/signup=http://localhost:8989/api/signup
};
