// Backend disabled for now — content lives in src/data/.
// The old single-page fetch from the Django API is kept below for later.
// import { useEffect, useState } from "react";
// import { fetchHomepage } from "./api";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/sections.css";
import "./styles/pages.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Motion from "./components/Motion";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";

// --- Backend (Django API) — disabled for now ---
// const [data, setData] = useState(null);
// const [error, setError] = useState(null);
// useEffect(() => {
//   fetchHomepage().then(setData).catch((e) => setError(e.message));
// }, []);
// if (error) return <div className="state">Couldn’t load the page — {error}</div>;
// if (!data) return <div className="state">Loading…</div>;

// Navbar style per page, as in the Figma frames
const navVariant = (path) => {
  if (path === "/" || path === "/about") return "overlay";
  if (path === "/signup" || path === "/login") return "auth";
  return "solid";
};

// New page -> start at the top; "/#section" -> scroll to that section
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const variant = navVariant(pathname);

  return (
    <>
      <ScrollManager />
      <Motion />
      <Navbar variant={variant} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collection/:slug" element={<ProductPage />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {/* The Figma sign-up page has no footer */}
      {variant !== "auth" && <Footer />}
    </>
  );
}
