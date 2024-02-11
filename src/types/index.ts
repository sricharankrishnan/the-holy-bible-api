/* app imports */
import { RandomVerseProps, RandomVerse } from "./random-verse";
import { SingleVerse, VersesByRange } from "./verse";

export interface RandomVerseReturn {
  code: string;
  message: string;
  payload: RandomVerse | Record<string, any>;
}

export interface SingleVerseProps {
  name: string;
  chapter: number;
  verse: number;
}

export interface SingleVerseReturn {
  code: string;
  message: string;
  payload: SingleVerse | Record<string, any>;
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
  payload: VersesByRange | Record<string, any>;
}

export interface VerseByMultiRangeProps {
  name: string;
  range: {chapter: number, verses: string[]}[];
}

export interface HolyBibleInt {
  baseUrl: string;
  fetchRandomVerse: (props: RandomVerseProps) => Promise<RandomVerseReturn | unknown>;
  fetchASingleVerse: (props: SingleVerseProps) => Promise<SingleVerseReturn | unknown>;
  fetchChapterVersesByRange: (props: VerseByRangeProps) => Promise<VerseByRangeReturn | unknown>;
  fetchChapterVersesByMultiRange: (props: VerseByMultiRangeProps) =>  Promise<VerseByRangeReturn | unknown>;
}
