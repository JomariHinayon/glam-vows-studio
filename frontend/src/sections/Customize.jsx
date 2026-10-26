import { Link } from "react-router-dom";
import RichText from "../components/RichText";
import { Check } from "../components/icons";

export default function Customize({ data }) {
  return (
    <section className="section customize">
      <div className="container customize__inner">
        <p className="eyebrow" data-reveal>{data.customize_eyebrow}</p>
        <RichText as="h2" className="display customize__title" data-reveal text={data.customize_heading} />
        <p className="lead customize__body" data-reveal>{data.customize_body}</p>

        <p className="customize__list-title" data-reveal>{data.customize_list_title}</p>
        <ul className="customize__list">
          {data.customize_items.map((item) => (
            <li key={item.label} className="customize__item" data-reveal>
              <Check className="customize__check" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <Link to="/collection" className="btn btn--solid customize__cta" data-reveal>
          {data.customize_cta_label}
        </Link>
      </div>
    </section>
  );
}
