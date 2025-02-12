import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import AppRoutes from "./config/routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="container">
          <Header />
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
