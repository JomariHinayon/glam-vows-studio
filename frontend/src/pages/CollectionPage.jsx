import { Link, useSearchParams } from "react-router-dom";
import RichText from "../components/RichText";
import { categories, collectionPage, products } from "../data/products";

// The Figma grid shows three rows of the same three designs; repeat them the
// same way until there are more products.
const GRID_ROWS = 3;

export function ProductCard({ product }) {
  return (
    <Link to={`/collection/${product.slug}`} className="product-card" data-reveal>
      <div className="product-card__media">
        <img src={product.image} alt={product.card_title} loading="lazy" />
      </div>
      <p className="product-card__title">{product.card_title}</p>
      <p className="price">
        ${product.price}
        {product.compare_at && <s className="price__was">${product.compare_at}</s>}
      </p>
    </Link>
  );
}

export default function CollectionPage() {
  const [params, setParams] = useSearchParams();
  const active = categories.some((c) => c.slug === params.get("category"))
    ? params.get("category")
    : "all";

  const matching = products.filter((p) => active === "all" || p.category === active);
  const grid = Array.from({ length: GRID_ROWS }, () => matching).flat();

  const choose = (slug) => setParams(slug === "all" ? {} : { category: slug });

  return (
    <section className="page-top collection-page">
      <div className="container collection-page__head">
        <RichText as="h1" className="display collection-page__title" data-reveal text={collectionPage.heading} />
        <p className="lead collection-page__sub" data-reveal>{collectionPage.subtitle}</p>

        <div className="tabs" data-reveal role="tablist" aria-label="Filter collections">
          {categories.map((c) => (
            <button
              key={c.slug}
              role="tab"
              aria-selected={active === c.slug}
              className={`tab ${active === c.slug ? "tab--on" : ""}`}
              onClick={() => choose(c.slug)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container product-grid-wrap">
        {grid.length ? (
          <div className="product-grid">
            {grid.map((p, i) => (
              <ProductCard key={`${p.slug}-${i}`} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="display empty-state__title">
              Coming <em>soon.</em>
            </p>
            <p className="lead">
              New designs for this collection are on the way. Message us and we'll let you know
              when they're ready.
            </p>
            <a href="#contact" className="btn btn--solid">
              Contact us
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
