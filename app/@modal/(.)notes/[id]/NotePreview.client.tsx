"use client";

import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";

function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      {isLoading && <Loader />}
      {isError && <p>Could not fetch note details. {error.message}</p>}
      {isSuccess && note && (
        <main className={css.main}>
          <div className={css.container}>
            <div className={css.item}>
              <button onClick={handleClose} className={css.backBtn}>
                Back to notes
              </button>
              <div className={css.header}>
                <h2>{note.title}</h2>
              </div>
              <p className={css.tag}>{note.tag}</p>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>{note.createdAt}</p>
            </div>
          </div>
        </main>
      )}
    </Modal>
  );
}

export default NotePreviewClient;
