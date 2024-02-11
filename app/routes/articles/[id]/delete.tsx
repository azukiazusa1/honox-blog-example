import { createRoute } from "honox/factory";
import { deleteArticle } from "../../../lib/db";

export const POST = createRoute(async (c) => {
  const { id } = c.req.param();
  await deleteArticle(id);

  return c.redirect("/articles");
});
