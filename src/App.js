
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";//BrowserRouter: conteneur principal qui active la navigation. Il gére les URL du navigateur
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Espaceprofs from "./pages/Espaceprofs";
import Entete from "./components/Entete";
import { SignupEleve, LoginEleve } from "./pages/AuthEleve";
//import SignupEleve from "./pages/SignupEleve";
import SignupProf from "./pages/SignupProf";
//import LoginEleve from "./pages/LoginEleve";
import LoginProf from "./pages/LoginProf";
//import ListeProfs from "./components/ListeProfs";
import ListeEleves from "./components/ListeEleves";
import "./App.css";
import ClasseDetail from "./pages/ClasseDetail"; // ⚡ à créer
import EleveDashboard from "./components/EleveDashboard";


// Layout public (avec Entete + Navbar)
function PublicLayout({ children }) {
  return (
    <>
      <Entete />
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages publiques avec layout */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route path="/signup-eleve" element={  <PublicLayout><SignupEleve /></PublicLayout>} />
        <Route path="/signup-prof" element={ <PublicLayout><SignupProf /></PublicLayout>} />
        <Route path="/login-eleve" element={ <PublicLayout><LoginEleve /> </PublicLayout>} />
        <Route path="/login-prof" element={<PublicLayout><LoginProf /></PublicLayout>} />
        {/*<Route path="/prof" element={<PublicLayout><ListeProfs /></PublicLayout>} />*/}
        <Route path="/espace-eleve" element={<PublicLayout><EleveDashboard /></PublicLayout>} />
        <Route path="/eleves/:profId" element={<PublicLayout><ListeElevesWrapper /></PublicLayout>}/>

        {/* Page privée sans Entete ni Navbar */}
        <Route
         path="/espace-prof" 
         element={<PublicLayout><Espaceprofs /></PublicLayout>} />

        <Route 
        path="/classe/:id" 
        element={<ClasseDetail />} /> {/* nouvelle route */}
      </Routes>
    </BrowserRouter>
  );
}

// ⚙️ Petit wrapper pour extraire l’ID du prof depuis l’URL

function ListeElevesWrapper() {
  const { profId } = useParams();
  return <ListeEleves profId={profId} />;
}
export default App;


