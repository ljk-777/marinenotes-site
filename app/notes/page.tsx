import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import { notes } from "@/data/notes";
import NoteCard from "@/components/NoteCard";
export default function NotesPage() {
  return (
    <main>
      <SiteNav />
      <section className="hero">
        <p className="eyebrow">Notes archive</p>
        <h1>Notes</h1>
        <p className="intro">
          A growing collection of writing on life, learning, and code.
        </p>
      </section>

      <section>
        <h2>Latest</h2>
        <div className="notes-list">
          {notes.map((note) => (
            <NoteCard
              key={note.slug}
              slug={note.slug}
              date={note.date}
              title={note.title}
              summary={note.summary}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
