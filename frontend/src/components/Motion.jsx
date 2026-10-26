// Scroll reveals + background parallax, modeled on the Studio Blanche site
// (see "Design references" in the README).
//   data-reveal    -> fades up 15px the first time it scrolls into view;
//                     items that appear together are staggered 150ms apart
//   data-reveal="fade" -> same, but opacity only (used on the navbar)
//   data-parallax  -> its background image scrolls slower than the page
// Styles live in styles/global.css. Nothing runs if the visitor has
// "reduce motion" turned on.
import { useEffect } from "react";

const STAGGER_MS = 150;
const MAX_STAGGER_STEPS = 6;
const PARALLAX_PX = 92; // must stay below the 100px inset on [data-parallax]::before

export default function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("motion-ready");

    // --- Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left
          );
        // The stagger restarts for each section, as on the reference site
        const counts = new Map();
        visible.forEach((e) => {
          const group = e.target.closest("section") || e.target.parentElement;
          const i = counts.get(group) || 0;
          counts.set(group, i + 1);
          const step = Math.min(i, MAX_STAGGER_STEPS);
          e.target.style.setProperty("--reveal-delay", `${step * STAGGER_MS}ms`);
          e.target.setAttribute("data-revealed", "");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    const watch = (node) => {
      if (!(node instanceof Element)) return;
      if (node.matches("[data-reveal]:not([data-revealed])")) io.observe(node);
      node.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => io.observe(el));
    };
    watch(document.body);

    // --- Parallax
    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const vh = window.innerHeight;
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        // 1 when the element's centre is at the bottom of the screen, -1 at the top
        const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        el.style.setProperty("--parallax-y", `${(-progress * PARALLAX_PX).toFixed(1)}px`);
      });
    };
    const requestParallax = () => {
      if (!frame) frame = requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);

    // New pages and re-rendered lists add elements after the first pass
    const mo = new MutationObserver((records) => {
      records.forEach((r) => r.addedNodes.forEach(watch));
      requestParallax();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
