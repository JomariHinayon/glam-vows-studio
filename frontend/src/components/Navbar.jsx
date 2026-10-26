import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import site from "../data/site";
import { useCart } from "../context/CartContext";
import CartPanel from "./CartPanel";
import { UserIcon, SearchIcon, BagIcon, ChevronDown, MenuIcon, CloseIcon } from "./icons";

// "#cart" opens the cart panel instead of navigating
const CART_URL = "#cart";

// Pages use <Link>; "#..." links stay plain anchors on the current page
function NavLink({ url, ...props }) {
  return url.startsWith("/") ? <Link to={url} {...props} /> : <a href={url} {...props} />;
}

/**
 * variant: "overlay" (white, over a hero photo) | "solid" (cream bar) |
 *          "auth" (logo + log-in/sign-up prompt, as on the Figma Login page)
 */
export default function Navbar({ variant = "overlay" }) {
  const [openMenu, setOpenMenu] = useState(null); // label of the open dropdown
  const [mobileOpen, setMobileOpen] = useState(false);
  const cart = useCart();
  const headerRef = useRef(null);
  const location = useLocation();

  const closeAll = () => {
    setOpenMenu(null);
    cart.setOpen(false);
    setMobileOpen(false);
  };

  // Close menus when the page changes
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  // Close menus on outside click or Escape
  useEffect(() => {
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
        cart.setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
        cart.setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
    // cart.setOpen is a stable state setter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLink = (e, url) => {
    if (url === CART_URL) {
      e.preventDefault();
      setOpenMenu(null);
      setMobileOpen(false);
      cart.setOpen(!cart.isOpen);
      return;
    }
    closeAll();
  };

  // Click/tap/Enter always opens (a tap also fires mouseenter, so toggling
  // would close it again). It closes on leave, Escape, outside click or a pick.
  const openDropdown = (e, label) => {
    e.preventDefault();
    cart.setOpen(false);
    setOpenMenu(label);
  };

  const logo = (
    <Link className="navbar__logo" to="/" onClick={closeAll}>
      {site.logo_text} <em>{site.logo_accent}</em>
    </Link>
  );

  if (variant === "auth") {
    const onLogin = location.pathname === "/login";
    return (
      <header className="navbar navbar--solid" data-reveal="fade">
        <div className="container navbar__inner navbar__inner--auth">
          {logo}
          <p className="navbar__auth">
            {onLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link to={onLogin ? "/signup" : "/login"}>{onLogin ? "Sign Up" : "Log In"}</Link>
          </p>
        </div>
      </header>
    );
  }

  return (
    <header ref={headerRef} className={`navbar navbar--${variant}`} data-reveal="fade">
      <div className="container navbar__inner">
        {logo}

        <nav className="navbar__links" aria-label="Main">
          {site.nav_links.map((link) =>
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
                      <NavLink
                        key={child.label}
                        url={child.url}
                        role="menuitem"
                        className="nav-menu__item"
                        onClick={closeAll}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.label}
                url={link.url}
                className="navbar__link"
                onClick={(e) => handleLink(e, link.url)}
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="navbar__icons">
          <Link to="/signup" aria-label="Account" onClick={closeAll}>
            <UserIcon />
          </Link>
          <Link to="/collection" aria-label="Browse collections" onClick={closeAll}>
            <SearchIcon />
          </Link>
          <button
            className="navbar__bag"
            aria-label={`Cart, ${cart.count} item${cart.count === 1 ? "" : "s"}`}
            aria-expanded={cart.isOpen}
            onClick={(e) => handleLink(e, CART_URL)}
          >
            <BagIcon />
            {cart.count > 0 && <span className="navbar__badge">{cart.count}</span>}
          </button>
          <button
            className="navbar__burger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              cart.setOpen(false);
              setMobileOpen((o) => !o);
            }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {cart.isOpen && <CartPanel onNavigate={closeAll} />}

      {mobileOpen && (
        <nav className="mobile-menu" aria-label="Mobile">
          {site.nav_links.map((link) => (
            <div key={link.label} className="mobile-menu__group">
              <NavLink
                url={link.url}
                className="mobile-menu__link"
                onClick={(e) => handleLink(e, link.url)}
              >
                {link.label}
              </NavLink>
              {link.children.map((child) => (
                <NavLink
                  key={child.label}
                  url={child.url}
                  className="mobile-menu__sub"
                  onClick={closeAll}
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
