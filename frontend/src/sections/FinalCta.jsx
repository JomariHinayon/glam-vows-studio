import { Link } from "react-router-dom";
import RichText from "../components/RichText";

export default function FinalCta({ data }) {
  return (
    <section className="final-cta">
      <div
        className="final-cta__band"
        data-parallax
        style={{ backgroundImage: `url(${data.final_bg_image})` }}
      >
        <div className="container final-cta__content">
          <p className="eyebrow" data-reveal>{data.final_eyebrow}</p>
          <RichText as="h2" className="display final-cta__title" data-reveal text={data.final_heading} />
          <p className="lead final-cta__sub" data-reveal>{data.final_subtitle}</p>
          <div className="final-cta__buttons" data-reveal>
            <Link to="/collection" className="btn btn--solid">
              {data.final_primary_cta}
            </Link>
            <Link to="/#chapters" className="btn btn--ghost">
              {data.final_secondary_cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
