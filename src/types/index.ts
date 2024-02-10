/* app imports */
import { RandomVerseProps, RandomVerse } from "./random-verse";
import { SingleVerse, VersesByRange } from "./verse";

export interface RandomVerseReturn {
  code: string;
  message: string;
  payload: RandomVerse | string;
}

export interface SingleVerseProps {
  name: string;
  chapter: number;
  verse: number;
}

export interface VerseByRangeProps {
  name: string;
  chapter: number;
  start: number;
  end: number;
}

export interface VerseByRangeReturn {
  code: string;
  message: string;
  payload: VersesByRange | string;
}

export interface VerseByMultiRangeProps {
  name: string;
  range: {chapter: number, verses: string[]}[];
}

export interface HolyBibleInt {
  baseUrl: string;
  fetchRandomVerse: (props: RandomVerseProps) => Promise<RandomVerseReturn>;
  fetchASingleVerse: (props: SingleVerseProps) => Promise<SingleVerse>;
  fetchChapterVersesByRange: (props: VerseByRangeProps) => Promise<VerseByRangeReturn>;
  fetchChapterVersesByMultiRange: (props: VerseByMultiRangeProps) =>  Promise<VerseByRangeReturn>;
}

