// types/day.ts

import {
  NotionDateProperty,
  NotionTitleProperty,
  NotionRelationProperty,
} from "./notion";

export interface DayProperties {
  Posts: NotionRelationProperty;
  date: NotionDateProperty;
  title: NotionTitleProperty;
}

export interface DayPage {
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
  properties: DayProperties;
  url: string;
  public_url: string | null;
}
