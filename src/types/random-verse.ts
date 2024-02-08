export interface RandomVerseReturn {
  book: {
    id: string;
    name: string;
  }
  chapter: number;
  verse: number;
  text: string;
  translation: {
    id: string;
    name: string;
    note: string;
  }
}

export type RandomVerseProps = undefined | {
  langId: string;
};
