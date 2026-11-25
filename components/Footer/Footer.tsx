import css from "@/components/Footer/Footer.module.css";
import { cacheLife } from "next/cache";

async function getYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

async function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {await getYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Vladyslav Yevdokymenko</p>
          <p>
            Contact us:
            <a href="mailto:student@notehub.app">student@notehub.app</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
