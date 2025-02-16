// types/notion.ts

// Representação de um bloco de texto
export interface NotionText {
  type: "text";
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

// Propriedade do tipo Date
export interface NotionDateProperty {
  id: string;
  type: "date";
  date: {
    start: string;
    end: string | null;
    time_zone: string | null;
  } | null;
}

// Propriedade do tipo Title
export interface NotionTitleProperty {
  id: string;
  type: "title";
  title: NotionText[];
}

// Representa um item de uma relação
export interface NotionRelationItem {
  id: string;
}

// Propriedade do tipo Relation
export interface NotionRelationProperty {
  id: string;
  type: "relation";
  relation: NotionRelationItem[];
  has_more?: boolean;
}
