export interface MarkdownConfig {
  autoSave: boolean;
  autoSaveDelay: number;
  enableHistory: boolean;
  maxHistoryEntries: number;
}

export const DEFAULT_MARKDOWN_CONFIG: MarkdownConfig = {
  autoSave: true,
  autoSaveDelay: 1000,
  enableHistory: true,
  maxHistoryEntries: 20
};

export interface MarkdownStats {
  characters: number;
  words: number;
  lines: number;
  readingTime: number;
  headings: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
  links: number;
  images: number;
  codeBlocks: number;
}

export interface MarkdownHistoryEntry {
  id: string;
  content: string;
  timestamp: number;
}
