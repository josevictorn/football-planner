import { z } from "zod";

const envSchema = z.object({
  NOTION_API_KEY: z.string(),
  NOTION_DAYS_DATABASE_ID: z.string(),
  NOTION_POSTS_DATABASE_ID: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables",
    parsedEnv.error.flatten().fieldErrors
  );

  throw new Error("Invalid environment variables.");
}

export const env = parsedEnv.data;
