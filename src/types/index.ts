/* app imports */
import { RandomVerseProps, RandomVerse } from "./random-verse";

export interface FetchRandomVerseReturn {
  code: string;
  message: string;
  payload: RandomVerse | string;
}

export interface HolyBibleInt {
  baseUrl: string;
  fetchRandomVerse: (props: RandomVerseProps) => Promise<FetchRandomVerseReturn>;
}

