import { createContext, useContext, useEffect, useState } from "react";
import { getProduct } from "../data/products";

/**
 * Simple cart kept in the browser (localStorage), so it survives a refresh.
 * Each line is { slug, palette, qty }.
 */

const STORAGE_KEY = "gvs-cart";
const CartContext = createContext(null);

const load = () => {
  try {
    const lines = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return lines.filter((l) => getProduct(l.slug));
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [lines, setLines] = useState(load);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable (private mode) — cart still works for this visit
    }
  }, [lines]);

  const add = (slug, palette, qty = 1) =>
    setLines((ls) => {
      const found = ls.find((l) => l.slug === slug && l.palette === palette);
      if (found) {
        return ls.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l));
      }
      return [...ls, { slug, palette, qty }];
    });

  const setQty = (index, qty) =>
    setLines((ls) =>
      qty < 1 ? ls.filter((_, i) => i !== index) : ls.map((l, i) => (i === index ? { ...l, qty } : l))
    );

  const remove = (index) => setLines((ls) => ls.filter((_, i) => i !== index));

  const items = lines.map((l) => ({ ...l, product: getProduct(l.slug) }));
  const count = items.reduce((n, l) => n + l.qty, 0);
  const subtotal = items.reduce((n, l) => n + l.qty * l.product.price, 0);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, add, setQty, remove, isOpen, setOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
