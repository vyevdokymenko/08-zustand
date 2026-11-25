import { fetchNoteById } from "@/lib/api";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

async function NotePreviewContent({ params }: NotePreviewProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}

export default function NotePreview({ params }: NotePreviewProps) {
  return (
    <Suspense fallback={<Loader />}>
      <NotePreviewContent params={params} />
    </Suspense>
  );
}
