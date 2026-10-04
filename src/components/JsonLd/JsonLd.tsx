// Renders schema.org JSON-LD as a plain <script> tag (server-rendered, so it
// is in the initial HTML). `<` is escaped to keep the payload inert.
type JsonLdProps = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
