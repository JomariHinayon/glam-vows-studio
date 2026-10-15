import { Link } from "react-router-dom";
import about from "../data/about";
import RichText from "../components/RichText";
import { ValueIcon } from "../components/icons";
import Why from "../sections/Why";
import FinalCta from "../sections/FinalCta";

export default function AboutPage() {
  const data = about;

  return (
    <>
      {/* Hero */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${data.hero_image})` }}
      >
        <div className="about-hero__overlay" />
        <div className="container about-hero__content">
          <RichText as="h1" className="display about-hero__heading" text={data.hero_heading} />
          <p className="about-hero__subtitle">{data.hero_subtitle}</p>
          <Link to={data.hero_cta_url} className="link-underline link-underline--light">
            {data.hero_cta_label}
          </Link>
        </div>
      </section>

      {/* Our why (same copy as the homepage, no divider band) */}
      <Why data={data} band={false} className="about-why" />

      {/* Founder */}
      <section className="founder">
        <div className="container founder__inner">
          <img className="founder__img" src={data.founder_image} alt="Gladys, founder of Glam Vows Studio" />
          <div className="founder__text">
            <p className="eyebrow">{data.founder_eyebrow}</p>
            <RichText as="h2" className="display founder__heading" text={data.founder_heading} />
            {data.founder_paragraphs.map((p, i) => (
              <p key={i} className="founder__para">
                {p}
              </p>
            ))}
            <Link to={data.founder_cta_url} className="link-underline founder__cta">
              {data.founder_cta_label}
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <div className="container">
          <div className="values__head">
            <p className="eyebrow">{data.values_eyebrow}</p>
            <RichText as="h2" className="display values__heading" text={data.values_heading} />
          </div>
          <div className="values__grid">
            {data.values.map((v) => (
              <div key={v.title} className="value">
                <ValueIcon name={v.icon} className="value__icon" />
                <h3 className="value__title">{v.title}</h3>
                <p className="value__text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta data={data} />
    </>
  );
}
