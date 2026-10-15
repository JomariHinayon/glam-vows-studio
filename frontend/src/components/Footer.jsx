import { Link } from "react-router-dom";
import { SocialIcon } from "./icons";
import site from "../data/site";
import monogram from "../assets/monogram.png";

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/">
            <img className="footer__monogram" src={monogram} alt="Glam Vows Studio" />
          </Link>
          <p className="footer__copyright">{site.footer_copyright}</p>
          <p className="footer__tagline">{site.footer_tagline}</p>
        </div>

        <nav className="footer__links">
          {site.footer_links.map((link) =>
            link.url.startsWith("/") ? (
              <Link key={link.label} to={link.url}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.url}>
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="footer__socials">
          {site.social_links.map((s) => (
            <a key={s.icon} href={s.url} aria-label={s.icon}>
              <SocialIcon name={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
