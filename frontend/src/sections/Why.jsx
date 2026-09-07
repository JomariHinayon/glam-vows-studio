export default function Why({ data }) {
  return (
    <>
      <section className="section why">
        <div className="container why__inner">
          <p className="eyebrow why__eyebrow">{data.why_eyebrow}</p>
          {data.why_paragraphs.map((p, i) => (
            <p key={i} className="lead why__para">
              {p}
            </p>
          ))}
        </div>
      </section>
      <div className="divider-band" />
    </>
  );
}
