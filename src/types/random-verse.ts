export interface RandomVerse {
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

export interface RandomVerseProps {
  langId?: string;
}
