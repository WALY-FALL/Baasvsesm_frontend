
import { BrowserRouter, Routes, Route } from "react-router-dom";//BrowserRouter: conteneur principal qui active la navigation. Il gére les URL du navigateur
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Espaceprofs from "./pages/Espaceprofs";
import Entete from "./components/Entete";
import SignupEleve from "./pages/SignupEleve";
import SignupProf from "./pages/SignupProf";
import LoginEleve from "./pages/LoginEleve";
import LoginProf from "./pages/LoginProf";
import "./App.css";
import ClasseDetail from "./pages/ClasseDetail"; // ⚡ à créer


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

        {/* Page privée sans Entete ni Navbar */}
        <Route
         path="/espaceprofs" 
         element={<Espaceprofs />} />

        <Route 
        path="/classe/:id" 
        element={<ClasseDetail />} /> {/* nouvelle route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;


