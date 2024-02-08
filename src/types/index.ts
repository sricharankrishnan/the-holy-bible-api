/* app imports */
import { RandomVerseProps, RandomVerseReturn } from "./random-verse";

export interface FetchRandomVerseReturn {
  code: string;
  message: string;
  payload: RandomVerseReturn | string;
}

export interface HolyBibleInt {
  baseUrl: string;
  fetchRandomVerse: (props?: RandomVerseProps) => Promise<FetchRandomVerseReturn>;
}

