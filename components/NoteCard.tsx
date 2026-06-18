type NoteCardProps = {
  slug: string;
  date: string;
  title: string;
  summary: string;
};

export default function NoteCard({
  slug,
  date,
  title,
  summary,
}: NoteCardProps) {
  return (
    <article className="note-item">
      <p className="note-date">{date}</p>
      <h3>
        <a href={`/notes/${slug}`}>{title}</a>
      </h3>
      <p>{summary}</p>
    </article>
  );
}
