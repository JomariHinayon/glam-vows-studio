import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPanel({ onNavigate }) {
  const { items, subtotal, setQty, remove } = useCart();

  return (
    <div className="container cart-panel-wrap">
      <div className="cart-panel" role="dialog" aria-label="Cart">
        <p className="cart-panel__title">Your cart</p>

        {items.length === 0 ? (
          <>
            <p className="cart-panel__empty">Your cart is empty.</p>
            <Link to="/collection" className="btn btn--solid" onClick={onNavigate}>
              Browse collections
            </Link>
          </>
        ) : (
          <>
            <ul className="cart-lines">
              {items.map((line, i) => (
                <li key={line.slug + line.palette} className="cart-line">
                  <img src={line.product.image} alt="" className="cart-line__img" />
                  <div className="cart-line__info">
                    <Link
                      to={`/collection/${line.slug}`}
                      className="cart-line__name"
                      onClick={onNavigate}
                    >
                      {line.product.name}
                    </Link>
                    <span className="cart-line__meta">{line.palette}</span>
                    <div className="cart-line__qty">
                      <button aria-label="Decrease quantity" onClick={() => setQty(i, line.qty - 1)}>
                        −
                      </button>
                      <span>{line.qty}</span>
                      <button aria-label="Increase quantity" onClick={() => setQty(i, line.qty + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-line__end">
                    <span>${line.product.price * line.qty}</span>
                    <button className="cart-line__remove" onClick={() => remove(i)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-panel__total">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            {/* No payment step yet: checkout asks the customer to create an account */}
            <Link to="/signup" className="btn btn--solid" onClick={onNavigate}>
              Checkout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
