'use client';

import css from './NoteForm.module.css';
import { useId } from 'react';
import { NoteTag, noteTags } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Loader from '@/components/Loader/Loader';
import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useDraftStore } from '@/lib/store/noteStore';

function NoteForm() {
  const id = useId();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useDraftStore();

  const createNoteM = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push('/notes/filter/all');
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as NoteTag;

    createNoteM.mutate({ title, content, tag });
  };

  const handleCancel = () => {
    router.back();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDraft({ ...draft, [name]: value });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          type="text"
          id={`${id}-title`}
          name="title"
          className={css.input}
          onChange={handleChange}
          defaultValue={draft.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          id={`${id}-content`}
          name="content"
          className={css.textarea}
          rows={8}
          onChange={handleChange}
          defaultValue={draft.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        <select
          id={`${id}-tag`}
          name="tag"
          className={css.select}
          onChange={handleChange}
          defaultValue={draft.tag}
        >
          {noteTags.map(tag => (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={createNoteM.isPending}>
          {createNoteM.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
      {createNoteM.isPending && <Loader />}
    </form>
  );
}

export default NoteForm;
