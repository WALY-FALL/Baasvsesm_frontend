

import React, {useState } from "react";
//import axios from "axios";
import Classe from "./Classe"; // ⚡ on importe ton composant Classe

const Espaceprofs = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container-espaceprofs">
      <div className="menu-vertical">{/* menu si besoin */}</div>

      <div className="container-classes">
        <nav className="navbar-classes">
          <li>
            <button
              className="li-link-classes"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Fermer le formulaire" : "Créer une classe"}
            </button>
          </li>
         {/*<li>
            <button className="li-link-classes">Sign up</button>
          </li>
          <li>
            <button className="li-link-classes">Log in</button>
  </li>*/}
        </nav>

        {/* Ici on affiche ton composant Classe */}
        {showForm && (
          <div className="mt-4 p-4 border rounded shadow">
          <Classe onClassCreated={() => setShowForm(false)} />
          
          </div>
        )}
      </div>
    </div>
  );
};

export default Espaceprofs;
