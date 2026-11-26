import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create note | NoteHub',
  description: 'Create a new note in your personal NoteHub using a title, content, and tag.',
  openGraph: {
    title: 'Create note | NoteHub',
    description: 'Create a new note in your personal NoteHub using a title, content, and tag.',
    url: process.env.SELF_HOST ?? 'http://localhost:3000',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        secureUrl: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 860,
        height: 573,
        alt: 'NoteHub logo',
      },
    ],
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
