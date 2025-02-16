import { env } from "@/app/env";
import { Client } from "@notionhq/client";

export const notion = new Client({ auth: env.NOTION_API_KEY });
