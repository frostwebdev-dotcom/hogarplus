/**
 * Renders a JSON-LD block. Values come from `lib/structured-data.ts`, which is
 * deliberately conservative about what it claims about the business.
 */
export function JsonLd({ id, data }: { id: string; data: Record<string, unknown> }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Content is generated from our own typed objects, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
