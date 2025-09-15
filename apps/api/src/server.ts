import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { RecipeCreateRequestSchema } from "@me-cook/api-contracts";

const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

app.post("/recipes", async (c) => {
  const body = await c.req.json();
  const parsed = RecipeCreateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400);
  }
  return c.json({ id: crypto.randomUUID(), slug: parsed.data.slug });
});

const port = Number(process.env.PORT ?? 3001);
console.log(`[api] listening on http://localhost:${port}`);
serve({ fetch: app.fetch, port });

