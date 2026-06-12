import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import CalmCash from "./pages/CalmCash";
import Faucek from "./pages/Faucek";
import Layout from "./components/Layout";
import "./index.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <Layout>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/calmcash" element={<CalmCash />} />
        <Route path="/faucek" element={<Faucek />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
