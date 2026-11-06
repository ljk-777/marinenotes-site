import Image from "next/image";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

type BodyImage = { src?: string; alt?: string; width?: number; height?: number };

export default function NoteBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <PortableText
      value={body}
      components={{
        types: {
          image: ({ value }: { value: BodyImage }) => value.src && value.alt ? (
            <figure className="note-body-image">
              <Image src={value.src} alt={value.alt} width={value.width || 1200} height={value.height || 900} sizes="(max-width: 760px) 100vw, 720px" />
              <figcaption>{value.alt}</figcaption>
            </figure>
          ) : null,
        },
      }}
    />
  );
}
