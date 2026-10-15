/**
 * Content shared by every page: logo, navbar and footer.
 * Links starting with "/" are pages; "#cart" opens the cart panel and
 * "#contact" jumps to the footer.
 */

const site = {
  logo_text: "GLAM VOWS",
  logo_accent: "STUDIO",

  nav_links: [
    { label: "HOME", url: "/", has_dropdown: false, children: [] },
    {
      label: "SHOP",
      url: "/collection",
      has_dropdown: true,
      children: [
        { label: "All Templates", url: "/collection" },
        { label: "Wedding Websites", url: "/collection?category=wedding-websites" },
        { label: "Save the Date", url: "/collection?category=save-the-dates" },
        { label: "Invitation Suites", url: "/collection?category=invitation-suites" },
        { label: "Signage and Stationery", url: "/collection?category=signage-stationery" },
        { label: "Bundles", url: "/collection?category=bundles" },
      ],
    },
    { label: "CART", url: "#cart", has_dropdown: false, children: [] },
    { label: "ABOUT", url: "/about", has_dropdown: false, children: [] },
    { label: "CONTACT", url: "#contact", has_dropdown: false, children: [] },
  ],

  footer_copyright: "© 2026 GLAM VOWS STUDIO",
  footer_tagline: "WEDDING WEBSITES & DIGITAL INVITATIONS",
  footer_links: [
    { label: "The Site", url: "/" },
    { label: "Shop", url: "/collection" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "#contact" },
    { label: "Account", url: "/signup" },
  ],
  social_links: [
    { icon: "facebook", url: "#" },
    { icon: "instagram", url: "#" },
    { icon: "linkedin", url: "#" },
    { icon: "youtube", url: "#" },
  ],
};

export default site;
