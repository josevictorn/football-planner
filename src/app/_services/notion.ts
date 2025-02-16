"use server";

import { notion } from "@/lib/notion";
import { DayPage } from "../../../types/day";
import { PostPage } from "../../../types/post";

export async function getDays() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DAYS_DATABASE_ID!,
    sorts: [{ property: "date", direction: "descending" }],
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
    database_id: process.env.NOTION_POSTS_DATABASE_ID!,
    filter,
    sorts: [{ property: "title", direction: "ascending" }],
  });
  return response.results as PostPage[];
}

export async function getPostContent(pageId: string) {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  return response.results;
}
