/**
 * Homepage content, kept in the frontend for now so the site can be deployed
 * on its own (e.g. Vercel) without the Django backend.
 *
 * Same shape as the backend's /api/homepage/ response, so switching back is
 * just re-enabling the fetch in App.jsx.
 *
 * Collection cards link to the collection page (see `link`).
 *
 * Text wrapped in *asterisks* renders as italic (see components/RichText.jsx).
 */

// The laptop photo is used for the hero, the showcase and the first card
import laptopImg from "../assets/images/hero.jpg";
import tabletImg from "../assets/images/collection-2.jpg";
import stationeryImg from "../assets/images/collection-3.jpg";
import paperTexture from "../assets/images/cta-texture.jpg";
import site from "./site";

const homepage = {
  // Logo, navbar and footer are shared by every page
  ...site,

  // --- Hero ---
  hero_eyebrow: "WEDDING WEBSITES & DIGITAL INVITATIONS",
  hero_heading: "Every love story deserves\na beautiful *prologue.*",
  hero_subtitle:
    "Glam Vows Studio designs the first chapter of your wedding journey, a website as personal, elegant, and timeless as the day it's leading to.",
  hero_cta_label: "Begin Your Story",
  hero_image: laptopImg,

  // --- Our Why ---
  why_eyebrow: "OUR WHY",
  why_paragraphs: [
    "Glam Vows Studio was created to make the beginning of a couple's wedding journey feel just as beautiful as the celebration itself.",
    "We create thoughtfully designed wedding websites and digital invitations that allow couples to share their love story, wedding details, and special moments in one beautiful digital experience.",
    "Every design is made to feel personal, elegant, modern, and timeless — because your wedding should feel uniquely yours.",
  ],

  // --- Our Collections ---
  collections_eyebrow: "SAMPLE WORKS",
  collections_heading: "Our Collections",
  collections_subtitle: "Discover our collections and find the one that fits your story.",
  collections_cta_label: "View the full collection",
  collection_items: [
    { title: "Wedding Websites", image: laptopImg, link: "/collection?category=wedding-websites" },
    { title: "Invitation Suites", image: tabletImg, link: "/collection?category=invitation-suites" },
    { title: "Signage & Stationery", image: stationeryImg, link: "/collection?category=signage-stationery" },
  ],

  // --- Five Chapters (numerals as shown in the Figma design) ---
  chapters_eyebrow: "YOUR WEBSITE, IN FIVE CHAPTERS",
  chapters_heading: "Told the way a *love story* should be.",
  chapters: [
    { numeral: "I", title: "Our Story", description: "How you met, the proposal, and the moments that led here." },
    { numeral: "II", title: "The Details", description: "Date, venue, timeline, and everything guests need to know." },
    { numeral: "III", title: "RSVP", description: "A reply as effortless as a nod across the room." },
    { numeral: "VI", title: "Registry", description: "Gifts and gestures, gathered in one considered place." },
    { numeral: "V", title: "Gallery", description: "The photos before, during, and long after the vows." },
  ],

  // --- Showcase ---
  showcase_image: laptopImg,

  // --- Done For You ---
  customize_eyebrow: "DONE FOR YOU, NOT DIY",
  customize_heading: "We build it with you, *not you alone.*",
  customize_body:
    "Right now, every Glam Vows Studio site is set up by our team, not a self-editing tool. You won't touch a website builder, just tell us what you'd like changed, and we take care of it.",
  customize_list_title: "TELL US WHAT TO CUSTOMIZE",
  customize_cta_label: "Get my wedding site",
  customize_items: [
    { label: "Wording (text)" },
    { label: "Font style" },
    { label: "Font color" },
    { label: "Text placement" },
    { label: "Background color" },
    { label: "Your own photos, uploaded for you" },
    { label: "Countdown, music playlist, maps, prenup video & more" },
    { label: "Page order — add, duplicate, hide, or remove" },
  ],

  // --- Final CTA ---
  final_eyebrow: "YOUR FIRST CHAPTER STARTS HERE",
  final_heading: 'Say *"I do"* to a website that feels like you.',
  final_subtitle:
    "From first message to live site, our team handles every detail, so the only thing you have to plan is the wedding.",
  final_primary_cta: "Begin your story",
  final_secondary_cta: "Explore chapters",
  final_bg_image: paperTexture,
};

export default homepage;
