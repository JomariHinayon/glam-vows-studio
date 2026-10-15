import { useState } from "react";
import { Link } from "react-router-dom";
import RichText from "../components/RichText";
import { ArrowLeft, ArrowRight } from "../components/icons";

export default function Collections({ data }) {
  const items = data.collection_items;
  const [active, setActive] = useState(0);

  return (
    <section id="collections" className="section collections">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{data.collections_eyebrow}</p>
          <RichText as="h2" className="display section-head__title" text={data.collections_heading} />
          <p className="lead section-head__sub">{data.collections_subtitle}</p>
        </div>

        <div className="collections__grid">
          {items.map((item) => (
            <Link key={item.title} to={item.link} className="collection-card">
              <div className="collection-card__media">
                <img src={item.image} alt={item.title} />
              </div>
              <p className="collection-card__title">{item.title}</p>
            </Link>
          ))}
        </div>

        <div className="collections__controls">
          <div className="dots">
            {[0, 1, 2, 3, 4, 5].map((d) => (
              <span
                key={d}
                className={`dot ${d === active ? "dot--on" : ""}`}
                onClick={() => setActive(d)}
              />
            ))}
          </div>
          <div className="arrows">
            <button
              className="arrow"
              aria-label="Previous"
              onClick={() => setActive((a) => Math.max(0, a - 1))}
            >
              <ArrowLeft />
            </button>
            <button
              className="arrow"
              aria-label="Next"
              onClick={() => setActive((a) => Math.min(5, a + 1))}
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className="collections__cta">
          <Link to="/collection" className="btn btn--solid">
            {data.collections_cta_label}
          </Link>
        </div>
      </div>
    </section>
  );
}
