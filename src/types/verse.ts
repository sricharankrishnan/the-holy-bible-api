export interface Verse {
  book: {
    id: string;
    name: string;
  },
  chapter: number;
  verse: number;
  text: string;
}
