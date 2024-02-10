export interface Verse {
  book: {
    id: string;
    name: string;
  },
  chapter: number;
  verse: number;
  text: string;
}

export interface SingleVerse extends Verse {
  translation: Translation;
}

export interface VersesByRange {
  verses: Verse[];
  translation: Translation;
}
