/**
 * Renders text where *segments* wrapped in asterisks become <em> (display
 * italics). This mirrors how the Figma headings mix roman + italic serif.
 *   "Every love story deserves a beautiful *prologue.*"
 */
export default function RichText({ text, as: Tag = "span", ...rest }) {
  if (!text) return null;
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <Tag {...rest}>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </Tag>
  );
}
