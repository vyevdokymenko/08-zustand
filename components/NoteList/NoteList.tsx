import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";

interface NoteListProps {
  queryKey: string;
  notes: Note[];
}

function NoteList({ notes, queryKey }: NoteListProps) {
  const queryClient = useQueryClient();
  const deleteNoteM = useMutation({
    mutationFn: deleteNote,
    onMutate: (noteId) => setDeletingId(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onSettled: () => setDeletingId(null),
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (noteId: Note["id"]) => {
    deleteNoteM.mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map((note: Note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          {deletingId === note.id && <Loader />}
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
              disabled={deletingId === note.id}
            >
              {deletingId === note.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
