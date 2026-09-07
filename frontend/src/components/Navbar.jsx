import { UserIcon, SearchIcon, BagIcon, ChevronDown } from "./icons";

export default function Navbar({ data, overlay = true }) {
  return (
    <header className={`navbar ${overlay ? "navbar--overlay" : ""}`}>
      <div className="container navbar__inner">
        <a className="navbar__logo" href="#">
          {data.logo_text} <em>{data.logo_accent}</em>
        </a>

        <nav className="navbar__links">
          {data.nav_links.map((link) => (
            <a key={link.label} href={link.url} className="navbar__link">
              {link.label}
              {link.has_dropdown && <ChevronDown className="navbar__chev" />}
            </a>
          ))}
        </nav>

        <div className="navbar__icons">
          <UserIcon />
          <SearchIcon />
          <BagIcon />
        </div>
      </div>
    </header>
  );
}
