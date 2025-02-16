// types/post.ts

import {
  NotionDateProperty,
  NotionTitleProperty,
  NotionRelationProperty,
  NotionText,
} from "./notion";

export interface GetPostBySlugResponse {
  content: string;
}

export interface PostProperties {
  competition: {
    id: string;
    type: "select";
    select: { id: string; name: string; color: string } | null;
  };
  slug: {
    id: string;
    type: "rich_text";
    rich_text: NotionText[];
  };
  day: NotionRelationProperty;
  hour: NotionDateProperty;
  title: NotionTitleProperty;
}

export interface PostPage {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: { object: "user"; id: string };
  last_edited_by: { object: "user"; id: string };
  cover: unknown;
  icon: unknown;
  parent: { type: string; database_id: string };
  archived: boolean;
  in_trash: boolean;
  properties: PostProperties;
  url: string;
  public_url: string | null;
}
