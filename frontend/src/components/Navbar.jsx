import { useEffect, useRef, useState } from "react";
import { UserIcon, SearchIcon, BagIcon, ChevronDown, MenuIcon, CloseIcon } from "./icons";

// "#cart" opens the cart panel instead of jumping to a section
const CART_URL = "#cart";

export default function Navbar({ data, overlay = true }) {
  const [openMenu, setOpenMenu] = useState(null); // label of the open dropdown
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);

  const closeAll = () => {
    setOpenMenu(null);
    setCartOpen(false);
    setMobileOpen(false);
  };

  // Close menus on outside click or Escape
  useEffect(() => {
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) closeAll();
    };
    const onKey = (e) => e.key === "Escape" && closeAll();
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLink = (e, url) => {
    if (url === CART_URL) {
      e.preventDefault();
      setOpenMenu(null);
      setMobileOpen(false);
      setCartOpen((o) => !o);
      return;
    }
    closeAll();
  };

  // Click/tap/Enter always opens (a tap also fires mouseenter, so toggling
  // would close it again). It closes on leave, Escape, outside click or a pick.
  const openDropdown = (e, label) => {
    e.preventDefault();
    setCartOpen(false);
    setOpenMenu(label);
  };

  return (
    <header ref={headerRef} className={`navbar ${overlay ? "navbar--overlay" : ""}`}>
      <div className="container navbar__inner">
        <a className="navbar__logo" href="#top" onClick={closeAll}>
          {data.logo_text} <em>{data.logo_accent}</em>
        </a>

        <nav className="navbar__links" aria-label="Main">
          {data.nav_links.map((link) =>
            link.has_dropdown && link.children.length ? (
              <div
                key={link.label}
                className="navbar__dropdown"
                onMouseEnter={() => setOpenMenu(link.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <a
                  href={link.url}
                  className="navbar__link"
                  aria-haspopup="true"
                  aria-expanded={openMenu === link.label}
                  onClick={(e) => openDropdown(e, link.label)}
                >
                  {link.label}
                  <ChevronDown
                    className={`navbar__chev ${openMenu === link.label ? "navbar__chev--up" : ""}`}
                  />
                </a>
                {openMenu === link.label && (
                  <div className="nav-menu" role="menu">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.url}
                        role="menuitem"
                        className="nav-menu__item"
                        onClick={closeAll}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.label}
                href={link.url}
                className="navbar__link"
                onClick={(e) => handleLink(e, link.url)}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="navbar__icons">
          <a href="#contact" aria-label="Account" onClick={closeAll}>
            <UserIcon />
          </a>
          <a href="#collections" aria-label="Search collections" onClick={closeAll}>
            <SearchIcon />
          </a>
          <button
            aria-label="Cart"
            aria-expanded={cartOpen}
            onClick={(e) => handleLink(e, CART_URL)}
          >
            <BagIcon />
          </button>
          <button
            className="navbar__burger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setCartOpen(false);
              setMobileOpen((o) => !o);
            }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {cartOpen && (
        <div className="container cart-panel-wrap">
          <div className="cart-panel" role="dialog" aria-label="Cart">
            <p className="cart-panel__title">Your cart</p>
            <p className="cart-panel__empty">Your cart is empty.</p>
            <a href="#collections" className="btn btn--solid" onClick={closeAll}>
              Browse collections
            </a>
          </div>
        </div>
      )}

      {mobileOpen && (
        <nav className="mobile-menu" aria-label="Mobile">
          {data.nav_links.map((link) => (
            <div key={link.label} className="mobile-menu__group">
              <a
                href={link.url}
                className="mobile-menu__link"
                onClick={(e) => handleLink(e, link.url)}
              >
                {link.label}
              </a>
              {link.children.map((child) => (
                <a
                  key={child.label}
                  href={child.url}
                  className="mobile-menu__sub"
                  onClick={closeAll}
                >
                  {child.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
