import { FC } from "hono/jsx";
import { createRoute } from "honox/factory";
import { Article, getArticles } from "../../lib/db";
import { css } from "hono/css";
import DeleteButton from "../../islands/deleteButton";

type Props = {
  articles: Article[];
};

const titleClass = css`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const cards = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const card = css`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 1rem;
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Page: FC<Props> = ({ articles }) => {
  return (
    <div>
      <h1 class={titleClass}>Articles</h1>
      <ul class={cards}>
        {articles.map((article) => (
          <li class={card}>
            <a
              class={css`
                margin-bottom: 1rem;
                display: block;
              `}
              href={`/articles/${article.id}`}
            >
              {article.title}
            </a>
            <DeleteButton articleId={article.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default createRoute(async (c) => {
  const articles = await getArticles();
  return c.render(<Page articles={articles} />, { title: "Articles" });
});
