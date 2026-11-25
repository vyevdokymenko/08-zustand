import css from "@/app/notes/filter/LayoutNotes.module.css";

interface NotesFilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

function NotesFilterLayout({ children, sidebar }: NotesFilterLayoutProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}

export default NotesFilterLayout;
