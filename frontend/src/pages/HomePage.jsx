import homepage from "../data/homepage";
import Hero from "../sections/Hero";
import Why from "../sections/Why";
import Collections from "../sections/Collections";
import Chapters from "../sections/Chapters";
import Showcase from "../sections/Showcase";
import Customize from "../sections/Customize";
import FinalCta from "../sections/FinalCta";

export default function HomePage() {
  const data = homepage;
  return (
    <>
      <Hero data={data} />
      <Why data={data} />
      <Collections data={data} />
      <Chapters data={data} />
      <Showcase data={data} />
      <Customize data={data} />
      <FinalCta data={data} />
    </>
  );
}
