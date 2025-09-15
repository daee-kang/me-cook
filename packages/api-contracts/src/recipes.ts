import { z } from "zod";

export const RecipeCreateRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  slug: z.string().min(1),
});

export const RecipeCreateResponseSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
});

export type RecipeCreateRequest = z.infer<typeof RecipeCreateRequestSchema>;
export type RecipeCreateResponse = z.infer<typeof RecipeCreateResponseSchema>;

