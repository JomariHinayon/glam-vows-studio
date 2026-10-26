import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../data/products";
import { useCart } from "../context/CartContext";
import { ChevronDown, Star } from "../components/icons";
import NotFoundPage from "./NotFoundPage";

function Stars({ rating }) {
  return (
    <span className="stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} fill={Math.max(0, Math.min(1, rating - i))} />
      ))}
    </span>
  );
}

function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div key={item.title} className="accordion__item">
          <button
            className="accordion__head"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            {item.title}
            <ChevronDown className={`accordion__chev ${open === i ? "accordion__chev--up" : ""}`} />
          </button>
          {open === i && <p className="accordion__body">{item.text}</p>}
        </div>
      ))}
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug);
  // key resets the page state when moving between products
  return product ? <Product key={slug} product={product} /> : <NotFoundPage />;
}

function Product({ product }) {
  const cart = useCart();
  const navigate = useNavigate();
  const [image, setImage] = useState(0);
  const [palette, setPalette] = useState(product.palettes[0].name);
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    cart.add(product.slug, palette, qty);
    cart.setOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // No payment step yet: buying asks the customer to create an account
  const buyNow = () => {
    cart.add(product.slug, palette, qty);
    navigate("/signup");
  };

  return (
    <section className="page-top product">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/collection">Collection</Link>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="product__layout">
          <div className="product__gallery" data-reveal>
            <div className="product__main">
              <img src={product.gallery[image]} alt={product.name} />
            </div>
            <div className="product__thumbs">
              {product.gallery.map((src, i) => (
                <button
                  key={i}
                  className={`product__thumb ${i === image ? "product__thumb--on" : ""}`}
                  aria-label={`Show image ${i + 1}`}
                  onClick={() => setImage(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="product__info" data-reveal>
            <p className="eyebrow product__eyebrow">
              {product.number} — {product.type}
            </p>
            <p className="product__rating">
              <Stars rating={product.rating} />
              <span>
                ({product.rating} stars) • {product.reviews} reviews
              </span>
            </p>
            <h1 className="display product__name">{product.name}</h1>
            <p className="product__desc">{product.description}</p>

            <div className="swatches" role="radiogroup" aria-label="Color palette">
              {product.palettes.map((p) => (
                <button
                  key={p.name}
                  role="radio"
                  aria-checked={palette === p.name}
                  aria-label={p.name}
                  title={p.name}
                  className={`swatch ${palette === p.name ? "swatch--on" : ""}`}
                  style={{ background: p.color }}
                  onClick={() => setPalette(p.name)}
                />
              ))}
            </div>

            <p className="price price--lg">
              ${product.price}
              {product.compare_at && <s className="price__was">${product.compare_at}</s>}
            </p>

            <label className="qty">
              <span>Quantity</span>
              <input
                type="number"
                min="1"
                max="99"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
              />
            </label>

            <button className="btn btn--solid btn--block" onClick={addToCart}>
              Add To Cart
            </button>
            <button className="btn btn--outline btn--block" onClick={buyNow}>
              Buy Now
            </button>
            <p className="product__shipping">Free shipping over $50</p>

            <Accordion items={product.details} />
          </div>
        </div>
      </div>
    </section>
  );
}
