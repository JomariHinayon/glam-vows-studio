/**
 * About page content (Figma: "GlamVowsStudio About").
 * Text wrapped in *asterisks* renders as italic.
 */

import heroImg from "../assets/images/about-hero.jpg";
import gladysImg from "../assets/images/gladys.jpg";
import homepage from "./homepage";

const about = {
  hero_heading: "Your *love story* deserves to be seen",
  hero_subtitle:
    "Your wedding site should feel like part of the celebration, building excitement, welcoming guests, and giving your story somewhere beautiful to live.",
  hero_cta_label: "Let's Build Your First Chapter",
  hero_cta_url: "/collection",
  hero_image: heroImg,

  why_eyebrow: "OUR WHY",
  why_paragraphs: homepage.why_paragraphs,

  founder_eyebrow: "YOUR STORY INSPIRES EVERYTHING WE DO",
  founder_heading: "Hi, I'm *Gladys.*",
  founder_image: gladysImg,
  founder_paragraphs: [
    "I started Glam Vows Studio with one goal in mind: to give every couple a wedding website that feels as considered as the wedding itself. Every day, I'm inspired by couples like you — the ones spending months getting the flowers right, the seating chart right, the first-dance song right — while the website falls to the bottom of the list. It's more than filling in a template; it's about telling your story in a way that feels warm and true to the two of you, carrying the same care as your invitations.",
    "Whether your wedding is a year away or just weeks out, I'm here to help. Together, we'll take your photos, your details, and your love story and turn them into a site that's polished, personal, and unmistakably yours — from the save-the-date to the very last RSVP. You'll feel proud to send it to everyone you love, not just relieved it's done. So let me take care of the setup, so you can spend your time on the parts of wedding planning you actually enjoy.",
  ],
  founder_cta_label: "LET'S BUILD YOUR FIRST CHAPTER",
  founder_cta_url: "/collection",

  values_eyebrow: "WHAT WE BUILD TOWARD",
  values_heading: "Four words *we design by.*",
  values: [
    {
      icon: "laptop",
      title: "Personal",
      text: "Your names, your story, your timeline, never a generic fill-in-the-blank site.",
    },
    {
      icon: "sparkle",
      title: "Elegant",
      text: "Engraved-style type and restrained color, styled like real stationery.",
    },
    {
      icon: "phone",
      title: "Modern",
      text: "Live RSVP tracking and mobile-first design, the conveniences today's weddings need.",
    },
    {
      icon: "diamond",
      title: "Timeless",
      text: "Built to be revisited on your anniversary, not just clicked through once.",
    },
  ],

  // Same call-to-action band as the homepage
  final_eyebrow: homepage.final_eyebrow,
  final_heading: homepage.final_heading,
  final_subtitle: homepage.final_subtitle,
  final_primary_cta: homepage.final_primary_cta,
  final_secondary_cta: homepage.final_secondary_cta,
  final_bg_image: homepage.final_bg_image,
};

export default about;
