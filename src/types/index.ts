/* app imports */
import { RandomVerseProps, RandomVerse } from "./random-verse";
import { Verse } from "./verse";
import { Translation } from "./translation";

export interface FetchRandomVerseReturn {
  code: string;
  message: string;
  payload: RandomVerse | string;
}

export interface FetchSingleVerseProps {
  name: string;
  chapter: number;
  verse: number;
}

export interface SingleVerse extends Verse {
  translation: Translation;
}

export interface HolyBibleInt {
  baseUrl: string;
  fetchRandomVerse: (props: RandomVerseProps) => Promise<FetchRandomVerseReturn>;
  fetchASingleVerse: (props: FetchSingleVerseProps) => Promise<SingleVerse>;
}

