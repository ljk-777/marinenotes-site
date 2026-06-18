import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import NoteCard from "@/components/NoteCard";
import { notes } from "@/data/notes";
export default function Home() {
  return (
    <main>
      <SiteNav />

      <section className="hero">
        <p className="eyebrow">Personal blog</p>
        <h1>Marine Notes</h1>
        <p className="intro">
          A quiet place for notes on life, learning, and code.
        </p>
        <a className="button" href="https://github.com/ljk-777">
          Visit my GitHub
        </a>
      </section>

      <section id="writing">
        <h2>What I Write</h2>
        <div className="cards">
          <article className="card">
            <h3>Life</h3>
            <p>
              Small moments, everyday reflections, and things I want to
              remember.
            </p>
          </article>

          <article className="card">
            <h3>Learning</h3>
            <p>
              Course notes, ideas, questions, and the process of figuring things
              out.
            </p>
          </article>

          <article className="card">
            <h3>Code</h3>
            <p>
              Technical experiments, projects, and what I learn while building.
            </p>
          </article>
        </div>
      </section>

      <section className="notes-preview">
        <h2>Recent Notes</h2>
        <div className="notes-list">
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
      </section>

      <section id="about">
        <h2>About</h2>
        <p>
          I&apos;m Marine, a student learning by building. This website is my
          small corner of the internet for writing, thinking, and documenting
          growth.
        </p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>
          GitHub: <a href="https://github.com/ljk-777">ljk-777</a>
        </p>
        <p>
          Email: <a href="mailto:ljk21202@gmail.com">ljk21202@gmail.com</a>
        </p>
      </section>

      <Footer />
    </main>
  );
}
