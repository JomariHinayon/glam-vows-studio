/**
 * Shop content (Figma: "GlamVowsStudio Collection" and "GlamVowsStudio Checkout").
 *
 * The Figma file only has full details for "Aurelia". The other two products
 * use the titles and prices from the collection grid; their descriptions are
 * placeholders to replace with real copy.
 */

import tabletImg from "../assets/images/collection-2.jpg";
import stationeryImg from "../assets/images/collection-3.jpg";
import pedestalImg from "../assets/images/laptop-pedestal.jpg";
import stoneImg from "../assets/images/laptop-stone.jpg";
import lampImg from "../assets/images/laptop-lamp.jpg";

export const collectionPage = {
  heading: "*Our Collections*",
  subtitle:
    "Wedding websites, save-the-dates, invitation suites, and signage, each designed as one considered collection.",
};

export const categories = [
  { slug: "all", label: "All" },
  { slug: "wedding-websites", label: "Wedding Websites" },
  { slug: "save-the-dates", label: "Save the Dates" },
  { slug: "invitation-suites", label: "Invitation Suites" },
  { slug: "signage-stationery", label: "Signage & Stationery" },
  { slug: "bundles", label: "Bundles" },
];

// Shared by every product page (accordion under the buttons).
// Only "What can I customise?" has text in Figma; the other answers are placeholders.
const customiseText = `Since every site is set up by our team rather than a self-editing tool, just tell us what you'd like and we'll take care of it — including:

Wording, font style, and font color throughout the site
Background colors and overall palette
Your own photos — send them over, or we'll help source placeholders
Text placement — move, edit, or add text boxes
Page order — add, duplicate, hide, or remove pages
Extras like a countdown, music playlist, maps, or a prenup video`;

const details = [
  { title: "What can I customise?", text: customiseText },
  {
    title: "What's included",
    text: "Your full wedding website set up by our team, a matching save-the-date and thank-you suite, mobile-friendly pages, and live RSVP tracking.",
  },
  {
    title: "License",
    text: "Your design is licensed for your own wedding website and invitations. It can't be resold or reused for another event.",
  },
  {
    title: "FAQ",
    text: "Not sure which design fits your day? Message us through the Contact link and we'll help you choose.",
  },
];

// Swatch colors from the Figma product page
const palettes = [
  { name: "Linen", color: "#ece4d8" },
  { name: "Taupe", color: "#8a7a63" },
  { name: "Sage", color: "#a6977a" },
];

export const products = [
  {
    slug: "aurelia",
    number: "No. 01",
    type: "Wedding website",
    name: "Aurelia",
    card_title: "Wedding website — garden & vineyard",
    category: "wedding-websites",
    price: 58,
    compare_at: 82,
    rating: 3.5,
    reviews: 10,
    description:
      "A warm, serif-led design built for garden and vineyard weddings, pressed-linen texture, considered whitespace, and a matching save-the-date and thank-you suite.",
    image: tabletImg,
    gallery: [lampImg, tabletImg, stationeryImg, pedestalImg],
    palettes,
    details,
  },
  {
    slug: "black-tie-city",
    number: "No. 02",
    type: "Wedding website",
    name: "Black-Tie, City",
    card_title: "Wedding website — black-tie, city",
    category: "wedding-websites",
    price: 58,
    compare_at: 82,
    rating: 4.5,
    reviews: 8,
    // Placeholder copy — not in the Figma file
    description:
      "A crisp, formal design for black-tie celebrations in the city, with clean lines, elegant type, and a matching save-the-date and thank-you suite.",
    image: pedestalImg,
    gallery: [pedestalImg, stoneImg, tabletImg, stationeryImg],
    palettes,
    details,
  },
  {
    slug: "destination-coastal",
    number: "No. 03",
    type: "Wedding website",
    name: "Destination & Coastal",
    card_title: "Wedding website — destination & coastal",
    category: "wedding-websites",
    price: 54,
    compare_at: 77,
    rating: 4,
    reviews: 6,
    // Placeholder copy — not in the Figma file
    description:
      "A light, airy design for destination and coastal weddings, with travel details front and center and a matching save-the-date and thank-you suite.",
    image: stoneImg,
    gallery: [stoneImg, pedestalImg, tabletImg, stationeryImg],
    palettes,
    details,
  },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
