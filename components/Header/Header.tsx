import css from "@/components/Header/Header.module.css";
import Link from "next/link";

function Header() {
  return (
    <header className={css.header}>
      <Link href="/" className={css.navigationLink} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/notes/filter/all" className={css.navigationLink}>
              Notes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
