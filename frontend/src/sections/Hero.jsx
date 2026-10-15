import { Link } from "react-router-dom";
import RichText from "../components/RichText";

export default function Hero({ data }) {
  return (
    <section
      id="top"
      className="hero"
      style={{ backgroundImage: `url(${data.hero_image})` }}
    >
      <div className="hero__overlay" />
      <div className="container hero__content">
        <p className="eyebrow hero__eyebrow">{data.hero_eyebrow}</p>
        <RichText as="h1" className="display hero__heading" text={data.hero_heading} />
        <p className="hero__subtitle">{data.hero_subtitle}</p>
        <Link to={data.hero_cta_url || "/collection"} className="btn hero__cta">
          {data.hero_cta_label}
        </Link>
      </div>
    </section>
  );
}
