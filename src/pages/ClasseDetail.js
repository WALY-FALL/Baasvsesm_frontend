import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL_CLASSE = process.env.REACT_APP_API_URL_CLASSE || "http://localhost:5000/api";

function ClasseDetail() {
  const { id } = useParams(); // récupère l’ID depuis l’URL
  const [classe, setClasse] = useState(null);

  useEffect(() => {
    const fetchClasse = async () => {
      try {
        const res = await axios.get(`${API_URL_CLASSE}/classe/${id}`);
        setClasse(res.data.classe);
        
      } catch (err) {
        console.error("Erreur:", err.response ? err.response.data : err.message);
      }
    };
    fetchClasse();
  }, [id]);

  if (!classe) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {classe.niveau}  {classe.serie} 
      </h2>
      <p>{classe.description}</p>
    </div>
  );
}

export default ClasseDetail;
