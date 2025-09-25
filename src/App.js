
import { BrowserRouter, Routes, Route } from "react-router-dom";//BrowserRouter: conteneur principal qui active la navigation. Il gére les URL du navigateur
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Espaceprofs from "./pages/Espaceprofs";
import Entete from "./components/Entete";
import "./App.css";

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
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicLayout>
              <Signup />
            </PublicLayout>
          }
        />

        {/* Page privée sans Entete ni Navbar */}
        <Route path="/espaceprofs" element={<Espaceprofs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


