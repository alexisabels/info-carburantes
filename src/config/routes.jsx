import { Routes, Route } from "react-router-dom";

import MainContent from "../components/MainContent";
import About from "../pages/About";
import Gasolinera from "../pages/Gasolinera";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route
        path="/gasolinera/:idMunicipio/:idGasolinera"
        element={<Gasolinera />}
      />
      {/*    <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
