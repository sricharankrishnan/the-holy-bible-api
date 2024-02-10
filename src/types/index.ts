/* app imports */
import { RandomVerseProps, RandomVerse } from "./random-verse";
import { SingleVerse, VersesByRange } from "./verse";

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

export interface FetchChapterVerseByRangeProps {
  name: string;
  chapter: number;
  start: number;
  end: number;
}

export interface FetchChapterVerseByRangeReturn {
  code: string;
  message: string;
  payload: VersesByRange | string;
}

export interface HolyBibleInt {
  baseUrl: string;
  fetchRandomVerse: (props: RandomVerseProps) => Promise<FetchRandomVerseReturn>;
  fetchASingleVerse: (props: FetchSingleVerseProps) => Promise<SingleVerse>;
  fetchChapterVersesByRange: (props: FetchChapterVerseByRangeProps) => Promise<FetchChapterVerseByRangeReturn>;
}

