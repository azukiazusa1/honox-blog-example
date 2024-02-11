import { css } from "hono/css";
import { FC, useRef } from "hono/jsx";

const dialogClass = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 3px;
  background-color: white;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const dialogButtons = css`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const cancelButton = css`
  padding: 0.5rem;
  background-color: #ddd;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const buttonClass = css`
  background-color: red;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

export default function DeleteButton({ articleId }: { articleId: string }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleClickDelete = () => {
    dialogRef.current?.showModal();
  };

  return (
    <div>
      <dialog class={dialogClass} ref={dialogRef}>
        <form method="POST" action={`/articles/${articleId}/delete`}>
          <p>Are you sure you want to delete this article?</p>
          <div class={dialogButtons}>
            <button value="cancel" formmethod="dialog" class={cancelButton}>
              Cancel
            </button>
            <button type="submit" class={buttonClass}>
              OK
            </button>
          </div>
        </form>
      </dialog>
      <button type="button" class={buttonClass} onClick={handleClickDelete}>
        Delete
      </button>
    </div>
  );
}
