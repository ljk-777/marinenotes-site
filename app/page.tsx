import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import NoteCard from "@/components/NoteCard";
import { notes } from "@/data/notes";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <SiteNav />

      <section className="hero hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Personal blog</p>
          <h1>Marine Notes</h1>
          <p className="intro">
            A quiet place for notes on life, learning, and code.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/notes">
              Read Notes
            </Link>
            <a
              className="button button-secondary"
              href="https://github.com/ljk-777"
            >
              Visit my GitHub
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="glass-card">
            <p className="glass-label">Current mood</p>
            <p className="glass-title">soft focus, slow growth</p>
            <p className="glass-text">
              Building a space that feels thoughtful, clear, and quietly alive.
            </p>
          </div>
        </div>
      </section>

      <section id="writing">
        <h2>Notebook Themes</h2>
        <div className="cards cards-four">
          <article className="card">
            <h3>Life</h3>
            <p>Moments, reflections, and the ordinary things worth keeping.</p>
          </article>
          <article className="card">
            <h3>Learning</h3>
            <p>Course notes, questions, and traces of understanding.</p>
          </article>

          <article className="card">
            <h3>Code</h3>
            <p>
              Technical experiments, front-end practice, and building notes.
            </p>
          </article>

          <article className="card">
            <h3>Fragments</h3>
            <p>Small ideas, unfinished thoughts, and pieces between pages.</p>
          </article>
        </div>
      </section>

      <section className="notes-showcase">
        <div className="featured-note">
          <div className="section-heading">
            <div>
              <h2>Featured Note</h2>
              <p className="section-copy">
                A highlighted page from this evolving notebook.
              </p>
            </div>
          </div>

          <article className="feature-card">
            <p className="note-date">{notes[0].date}</p>
            <h3>
              <a href={`/notes/${notes[0].slug}`}>{notes[0].title}</a>
            </h3>
            <p>{notes[0].summary}</p>
            <a className="text-link" href={`/notes/${notes[0].slug}`}>
              Open note
            </a>
          </article>
        </div>

        <div className="notes-preview">
          <div className="section-heading">
            <div>
              <h2>Recent Notes</h2>
              <p className="section-copy">
                Recent entries from life, learning, and small technical paths.
              </p>
            </div>
          </div>

          <div className="notes-list compact-notes">
            {notes.slice(0, 2).map((note) => (
              <NoteCard
                key={note.slug}
                slug={note.slug}
                date={note.date}
                title={note.title}
                summary={note.summary}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="split-grid">
        <article className="info-panel">
          <p className="eyebrow">Currently learning</p>
          <h2>What I am exploring now</h2>
          <p>
            I am moving deeper into front-end structure, interface design, and
            the small systems behind thoughtful digital experiences.
          </p>
        </article>

        <article className="info-panel">
          <p className="eyebrow">Small fragments</p>
          <h2>What this space is for</h2>
          <p>
            Not only polished results, but drafts, notes, experiments, and the
            quiet process of becoming clearer over time.
          </p>
        </article>
      </section>

      <section className="bottom-info">
        <article className="info-panel">
          <p className="eyebrow">About</p>
          <h2>A calm place to keep growing</h2>
          <p>
            I&apos;m Marine, a student learning by building. Marine Notes is my
            corner of the internet for writing, thinking, and documenting growth
            in a way that feels personal and calm.
          </p>
        </article>

        <article className="info-panel">
          <p className="eyebrow">Contact</p>
          <h2>Elsewhere</h2>
          <p>
            GitHub: <a href="https://github.com/ljk-777">ljk-777</a>
          </p>
          <p>
            Email: <a href="mailto:ljk21202@gmail.com">ljk21202@gmail.com</a>
          </p>
        </article>
      </section>

      <Footer />
    </main>
  );
}
