import { Link } from "react-router-dom";
import RichText from "../components/RichText";

export default function Hero({ data }) {
  return (
    <section
      id="top"
      className="hero"
      data-parallax
      style={{ backgroundImage: `url(${data.hero_image})` }}
    >
      <div className="hero__overlay" />
      <div className="container hero__content">
        <p className="eyebrow hero__eyebrow" data-reveal>{data.hero_eyebrow}</p>
        <RichText as="h1" className="display hero__heading" data-reveal text={data.hero_heading} />
        <p className="hero__subtitle" data-reveal>{data.hero_subtitle}</p>
        <Link to={data.hero_cta_url || "/collection"} className="btn hero__cta" data-reveal>
          {data.hero_cta_label}
        </Link>
      </div>
    </section>
  );
}
