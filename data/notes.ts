export type Note = {
  slug: string;
  date: string;
  title: string;
  summary: string;
  content?: string[];
};
export const notes: Note[] = [
  {
    slug: "first-note",
    date: "June 2026",
    title: "Starting this small corner of the internet",
    summary:
      "The first version of Marine Notes is live. This is where I begin collecting small thoughts, study traces, and project notes.",
  },
  {
    slug: "coming-soon",
    date: "Soon",
    title: "More notes are on the way",
    summary:
      "More writing will arrive here gradually, one note at a time, as this site grows with me.",
    content: [
      "This note is still being written.",
      "Soon this page will hold a new piece of writing from Marine Notes.",
    ],
  },
];
