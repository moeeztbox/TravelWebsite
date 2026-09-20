export interface FaqCategory {
  id: string;
  label: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/** categoryId -> sidebar item labels shown for that category. */
export type FaqSidebarItems = Record<string, string[]>;

/** categoryId -> sidebar label -> the questions/answers shown for it. */
export type FaqData = Record<string, Record<string, FaqEntry[]>>;
