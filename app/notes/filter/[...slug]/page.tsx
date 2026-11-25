import { Suspense } from "react";
import { connection } from "next/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import { fetchNotes } from "@/lib/api";
import Loader from "@/components/Loader/Loader";

const NOTES_QUERY_KEY = "notes";

interface NotesFilterProps {
  params: Promise<{ slug: string[] }>;
}

async function NotesContent({ params }: NotesFilterProps) {
  await connection();

  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [NOTES_QUERY_KEY, "", 1, tag],
    queryFn: () => fetchNotes({ searchText: "", page: 1, tag: tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export default function Notes({ params }: NotesFilterProps) {
  return (
    <Suspense fallback={<Loader />}>
      <NotesContent params={params} />
    </Suspense>
  );
}
