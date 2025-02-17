"use server";

import { notion } from "@/lib/notion";
import { DayPage } from "../../../../types/day";
import { GetPostBySlugResponse, PostPage } from "../../../../types/post";
import { NotionToMarkdown } from "notion-to-md";
import { env } from "../../env";

export async function getDays() {
  const response = await notion.databases.query({
    database_id: env.NOTION_DAYS_DATABASE_ID!,
    sorts: [{ property: "date", direction: "ascending" }],
  });
  return response.results as DayPage[];
}

export async function getPostsByDay(
  dayId: string,
  competionsFilter?: string[]
): Promise<PostPage[]> {
  const dayFilter = {
    property: "day",
    relation: { contains: dayId },
  };

  let filter;
  if (competionsFilter && competionsFilter.length > 0) {
    // Cria um array de filtros para cada competição selecionada
    const competionFilters = competionsFilter.map((value) => ({
      property: "competion",
      select: { equals: value },
    }));
    filter = {
      and: [
        dayFilter,
        {
          or: competionFilters,
        },
      ],
    };
  } else {
    filter = dayFilter;
  }

  const response = await notion.databases.query({
    database_id: env.NOTION_POSTS_DATABASE_ID!,
    filter,
    sorts: [{ property: "title", direction: "ascending" }],
  });
  return response.results as PostPage[];
}

export async function getPostBySlug(
  slug: string
): Promise<GetPostBySlugResponse> {
  const response = await notion.databases.query({
    database_id: env.NOTION_POSTS_DATABASE_ID!,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  const pageId = response.results[0].id;

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    content: mdString.parent,
  };
}
