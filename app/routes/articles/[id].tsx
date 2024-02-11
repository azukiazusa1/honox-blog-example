import { FC } from "hono/jsx";
import { Article, getArticleById } from "../../lib/db";
import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { parseMarkdown } from "../../lib/markdown";

const cardClass = css`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 1rem;
  width: 100%;
`;

const titleClass = css`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const contentClass = css`
  margin-top: 2rem;

  p + p {
    margin-top: 1rem;
  }

  ul {
    margin-top: 1rem;
  }

  ul li {
    list-style: disc;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
  }
`;

type Props = {
  article: Article;
  content: string;
};

const Page: FC<Props> = ({ article, content }) => {
  return (
    <article class={cardClass}>
      <header>
        <h1 class={titleClass}>{article.title}</h1>
      </header>
      <div
        class={contentClass}
        id="contents"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
};

export default createRoute(async (c) => {
  const { id } = c.req.param();
  const article = await getArticleById(id);
  if (!article) {
    return c.notFound();
  }

  const content = parseMarkdown(article.content);

  return c.render(<Page article={article} content={content} />, {
    title: article.title,
  });
});
