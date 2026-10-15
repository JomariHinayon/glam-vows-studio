import { SocialIcon } from "./icons";
import monogram from "../assets/monogram.png";

export default function Footer({ data }) {
  return (
    <footer id="contact" className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img className="footer__monogram" src={monogram} alt="Glam Vows Studio" />
          <p className="footer__copyright">{data.footer_copyright}</p>
          <p className="footer__tagline">{data.footer_tagline}</p>
        </div>

        <nav className="footer__links">
          {data.footer_links.map((link) => (
            <a key={link.label} href={link.url}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__socials">
          {data.social_links.map((s) => (
            <a key={s.icon} href={s.url} aria-label={s.icon}>
              <SocialIcon name={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
