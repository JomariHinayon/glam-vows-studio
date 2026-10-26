export default function Why({ data, band = true, className = "" }) {
  return (
    <>
      <section id="about" className={`section why ${className}`}>
        <div className="container why__inner">
          <p className="eyebrow why__eyebrow" data-reveal>{data.why_eyebrow}</p>
          {data.why_paragraphs.map((p, i) => (
            <p key={i} className="lead why__para" data-reveal>
              {p}
            </p>
          ))}
        </div>
      </section>
      {band && <div className="divider-band" />}
    </>
  );
}
