/* app imports */
import {
  HolyBibleInt,
  FetchRandomVerseReturn,
  FetchSingleVerseProps,
  FetchChapterVerseByRangeProps,
  FetchChapterVerseByRangeReturn
} from "./types";
import { RandomVerseProps } from "./types/random-verse";
import { SingleVerse } from "./types/verse";
import randomVerseHandler from "./service/random-verse/index";
import fetchASingleVerse from "./service/fetch-single-verse/index";
import fetchVersesByRange from "./service/fetch-verses-by-range/index";

/* class */
class HolyBible implements HolyBibleInt {
  baseUrl: string;

  /* @constructor */
  constructor() {
    this.baseUrl = "https://bible-api.com/";
  };

  /**
   * @props:
   * - name: string - name of the book
   * - chapter: number - chapter number
   * - start: number - staring verse number
   * - end: number - ending verse number
   */
  async fetchChapterVersesByRange(props: FetchChapterVerseByRangeProps): Promise<FetchChapterVerseByRangeReturn> {
    const $this = this;
    const { name, chapter, start, end } = props;

    if (end < start) {
      return {
        code: "api-fail",
        message: "Something has gone wrong",
        payload: "The 'end' value cannot be less than the 'start' value"
      };
    }
    const requestUrl = `${this.baseUrl}${name}+${chapter}:${start}-${end}`;
    const data = await fetchVersesByRange(requestUrl);
    return data;
  }

  /**
   * @props:
   * - name: string - name of the book
   * - chapter: number - chapter number
   * - verse: number - verse number
   */
  async fetchASingleVerse(props: FetchSingleVerseProps): Promise<SingleVerse> {
    const $this = this;
    const { name, chapter, verse } = props;
    const requestUrl = `${this.baseUrl}${name}+${chapter}:${verse}`;

    /* fetch and return to client */
    const data = await fetchASingleVerse(requestUrl);
    return data;
  }

  /**
   * gets a random verse through the api
   * @arg: RandomVerseProps
   */
  async fetchRandomVerse(props: RandomVerseProps): Promise<FetchRandomVerseReturn> {
    const $this = this;
    const { langId } = props;
    const translation = !langId ? "web" : langId;
    const requestUrl = `${$this.baseUrl}?random=verse&translation=${translation}`;

    /* fetch and return to client */
    const data = await randomVerseHandler({requestUrl});
    return data;
  }
}

/* exports */
export default HolyBible;
