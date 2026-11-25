import css from "@/app/Home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "Page that are you looking for is not exists",
  openGraph: {
    title: "NoteHub",
    description: "Page that are you looking for is not exists",
    url: "https://08-zustand-rho-topaz.vercel.app",
    images: {
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      secureUrl: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 860,
      height: 573,
      alt: "NoteHub logo",
    },
  },
};

function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
