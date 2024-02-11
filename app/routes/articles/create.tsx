import { css } from "hono/css";
import { createRoute } from "honox/factory";
import type { FC } from "hono/jsx";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { createArticle } from "../../lib/db";

const titleClass = css`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const formClass = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const labelClass = css`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 0.5rem;
`;

const inputClass = css`
  width: 100%;
  padding: 0.5rem 0.25em;
  border-radius: 3px;
  border: 2px solid #ddd;
`;

const textareaClass = css`
  width: 100%;
  border: 2px solid #ddd;
  border-radius: 3px;
  padding: 0.5rem;
  min-height: 10rem;
  resize: vertical;
`;

const buttonClass = css`
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 999px;
`;

const errorClass = css`
  color: red;
  font-size: 0.75rem;
`;

type Data = {
  title: {
    value: string;
    error: string[] | undefined;
  };
  content: {
    value: string;
    error: string[] | undefined;
  };
};

type Props = {
  data?: Data;
};

const Page: FC<Props> = ({ data }) => {
  return (
    <div>
      <h1 class={titleClass}>Create an article</h1>
      <form class={formClass} method="post">
        <label class={labelClass}>
          Title
          <input
            name="title"
            class={inputClass}
            type="text"
            value={data?.title.value}
          />
        </label>
        {data?.title.error &&
          data.title.error.map((error) => <p class={errorClass}>{error}</p>)}
        <label class={labelClass}>
          Content
          <textarea
            name="content"
            class={textareaClass}
            value={data?.content.value}
          />
        </label>
        {data?.content.error &&
          data.content.error.map((error) => <p class={errorClass}>{error}</p>)}

        <button class={buttonClass} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default createRoute((c) => {
  return c.render(<Page />, {
    title: "Create an article",
  });
});

const Article = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
});
export const POST = createRoute(
  zValidator("form", Article, async (result, c) => {
    if (result.success) {
      const { title, content } = result.data;
      await createArticle({ title, content });

      return c.redirect("/articles");
    }

    const { title, content } = result.data;
    const data: Data = {
      title: {
        value: title,
        error: result.error.flatten().fieldErrors.title,
      },
      content: {
        value: content,
        error: result.error.flatten().fieldErrors.content,
      },
    };

    return c.render(<Page data={data} />, {
      title: "Create an article",
    });
  })
);
