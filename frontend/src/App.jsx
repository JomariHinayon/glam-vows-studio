import { useEffect, useState } from "react";
import { fetchHomepage } from "./api";
import "./styles/sections.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Why from "./sections/Why";
import Collections from "./sections/Collections";
import Chapters from "./sections/Chapters";
import Showcase from "./sections/Showcase";
import Customize from "./sections/Customize";
import FinalCta from "./sections/FinalCta";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomepage().then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="state">Couldn’t load the page — {error}</div>;
  if (!data) return <div className="state">Loading…</div>;

  return (
    <>
      <Navbar data={data} />
      <main>
        <Hero data={data} />
        <Why data={data} />
        <Collections data={data} />
        <Chapters data={data} />
        <Showcase data={data} />
        <Customize data={data} />
        <FinalCta data={data} />
      </main>
      <Footer data={data} />
    </>
  );
}
