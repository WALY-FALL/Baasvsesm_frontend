import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ClasseDetail = () => {
  const { id } = useParams();
  const [classe, setClasse] = useState(null);

  useEffect(() => {
    const fetchClasse = async () => {
      try {
        const res = await axios.get(`http://localhost:8989/api/classes/${id}`);
        setClasse(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement de la classe :", err);
      }
    };
    fetchClasse();
  }, [id]);

  if (!classe) return <p>Chargement contenu classe...</p>;

  

  return (
    <div style={{ padding: "20px" }}>
      <h2>{classe.niveau} - {classe.serie}</h2>
      <p>{classe.description}</p>
    </div>
  );
};

export default ClasseDetail;
