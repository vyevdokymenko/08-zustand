"use client";

import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";

function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const noteQ = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (noteQ.isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (noteQ.isError || !noteQ.data) {
    return <p>Something went wrong.</p>;
  }

  if (noteQ.isSuccess) {
    const note = noteQ.data;

    return (
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      </main>
    );
  }
}

export default NoteDetailsClient;
