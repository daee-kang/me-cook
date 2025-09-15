import { Hono } from "hono";
import { RecipeCreateRequestSchema } from "@me-cook/api-contracts";

const app = new Hono();

app.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = RecipeCreateRequestSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  return c.json({ id: crypto.randomUUID(), slug: parsed.data.slug });
});

export default app;

