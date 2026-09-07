// Minimal inline SVG icons (stroke-based to match the delicate design)

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const UserIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

export const SearchIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const BagIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M6 8h12l-1 12H7L6 8z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </svg>
);

export const ChevronDown = (p) => (
  <svg {...base} width="12" height="12" {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const ArrowLeft = (p) => (
  <svg {...base} {...p}>
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

export const ArrowRight = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

export const Check = (p) => (
  <svg {...base} width="16" height="16" {...p}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const social = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "currentColor",
};

export const SocialIcon = ({ name, ...p }) => {
  switch (name) {
    case "facebook":
      return (
        <svg {...social} {...p}>
          <path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.7.2 15.8.1 14.8.1 12.6.1 11 1.5 11 4.1V6H8v3h3v9h3V9z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...social} fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...social} {...p}>
          <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21H21v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H13z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...social} {...p}>
          <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7C23 15.2 23 12 23 12zM10 15.3V8.7l5.7 3.3z" />
        </svg>
      );
    default:
      return null;
  }
};
