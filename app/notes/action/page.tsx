import { redirect } from "next/navigation";

function NoteAction() {
  redirect("/notes/filter/all");
  return null;
}

export default NoteAction;
