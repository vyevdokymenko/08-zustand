"use client";

import { ChangeEvent, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import css from "@/app/notes/filter/[...slug]/NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import NoteList from "@/components/NoteList/NoteList";

const QUERY_KEY = "notes";

interface NotesClientProps {
  tag?: string;
}

function NotesClient({ tag }: NotesClientProps) {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isSuccess, isFetching } = useQuery({
    queryKey: [QUERY_KEY, searchText, page, tag],
    queryFn: () => fetchNotes({ searchText, page, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    throwOnError: true,
  });

  const updateSearchText = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      setPage(1);
    },
    300,
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={updateSearchText} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={({ selected }: { selected: number }) =>
              setPage(selected + 1)
            }
            forcePage={page - 1}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpened(true)}>
          Create note +
        </button>
        {isModalOpened && (
          <Modal onClose={() => setIsModalOpened(false)}>
            <NoteForm
              queryKey={QUERY_KEY}
              onClose={() => setIsModalOpened(false)}
            />
          </Modal>
        )}
      </header>
      {isFetching && <Loader />}
      {isSuccess && data.notes.length > 0 && (
        <section>
          <NoteList queryKey={QUERY_KEY} notes={data.notes} />
        </section>
      )}
    </div>
  );
}

export default NotesClient;
