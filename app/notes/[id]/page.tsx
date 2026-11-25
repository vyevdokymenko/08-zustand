import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import type { Metadata } from "next";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  const title = `${note.title} | NoteHub`;
  const suffix = " | NoteHub";
  const description = `${note.content.slice(0, 160 - suffix.length)}${suffix}`;
  const selfHost = process.env.SELF_HOST ?? "http://localhost:3000";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${selfHost}/notes/${id}`,
      images: {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        secureUrl: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 860,
        height: 573,
        alt: "NoteHub logo",
      },
    },
  };
}

async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default NoteDetails;
