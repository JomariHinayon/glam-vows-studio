import { SocialIcon } from "./icons";

export default function Footer({ data }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__monogram">GVS</span>
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
