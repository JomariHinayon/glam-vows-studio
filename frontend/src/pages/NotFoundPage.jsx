import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="page-top not-found">
      <div className="container">
        <h1 className="display not-found__title">
          This page <em>isn't here.</em>
        </h1>
        <p className="lead">The link may be old, or the page may have moved.</p>
        <Link to="/" className="btn btn--solid">
          Back to home
        </Link>
      </div>
    </section>
  );
}
