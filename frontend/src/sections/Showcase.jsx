export default function Showcase({ data }) {
  return (
    <section className="showcase">
      <div className="container">
        <div className="showcase__frame">
          <img src={data.showcase_image} alt="Wedding website showcase" />
        </div>
      </div>
    </section>
  );
}
