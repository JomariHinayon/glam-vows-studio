import RichText from "../components/RichText";

export default function Chapters({ data }) {
  return (
    <section id="chapters" className="section chapters">
      <div className="container">
        <div className="chapters__head">
          <p className="eyebrow">{data.chapters_eyebrow}</p>
          <RichText as="h2" className="display chapters__title" text={data.chapters_heading} />
        </div>

        <ul className="chapters__list">
          {data.chapters.map((ch) => (
            <li key={ch.numeral + ch.title} className="chapter-row">
              <span className="chapter-row__num">{ch.numeral}.</span>
              <h3 className="chapter-row__title">{ch.title}</h3>
              <p className="chapter-row__desc">{ch.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
