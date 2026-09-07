import RichText from "../components/RichText";

export default function FinalCta({ data }) {
  return (
    <section className="final-cta">
      <div
        className="final-cta__band"
        style={{ backgroundImage: `url(${data.final_bg_image})` }}
      >
        <div className="container final-cta__content">
          <p className="eyebrow">{data.final_eyebrow}</p>
          <RichText as="h2" className="display final-cta__title" text={data.final_heading} />
          <p className="lead final-cta__sub">{data.final_subtitle}</p>
          <div className="final-cta__buttons">
            <button className="btn btn--solid">{data.final_primary_cta}</button>
            <button className="btn btn--ghost">{data.final_secondary_cta}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
