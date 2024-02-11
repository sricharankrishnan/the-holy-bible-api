/* app imports */
import {
  HolyBibleInt,
  RandomVerseReturn,
  SingleVerseProps,
  SingleVerseReturn,
  VerseByRangeProps,
  VerseByRangeReturn,
  VerseByMultiRangeProps
} from "./types";
import { RandomVerseProps } from "./types/random-verse";
import { SingleVerse } from "./types/verse";
import randomVerseHandler from "./service/random-verse/index";
import fetchASingleVerse from "./service/fetch-single-verse/index";
import fetchVersesByRange from "./service/fetch-verses-by-range/index";
import systemHelp from "./service/help/index";

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
   * - range: Array<{chapter: number, verses: string[]}>: chapter number with the verse ranges
   */
  async fetchChapterVersesByMultiRange(props: VerseByMultiRangeProps): Promise<VerseByRangeReturn | unknown> {
    const $this = this;
    const { name, range, langId } = props;

    /* composed the request url based on the received params */
    let requestUrl = range.reduce((composed, data, index) => {
      /* extract */
      const { chapter, verses } = data;

      /* create the join */
      const versesJoin = verses.join(",");
      const chapVerJoined = (index === range.length - 1) ? `${chapter}:${versesJoin}` : `${chapter}:${versesJoin},`;

      /* compose */
      composed = `${composed}${chapVerJoined}`;
      return composed;
    }, `${$this.baseUrl}${name}+`);

    /* add the translation */
    requestUrl = !langId ? `${requestUrl}?translation=web` : `${requestUrl}?translation=${langId}`;

    /* fetch and return to client */
    try {
      const data = await fetchVersesByRange(requestUrl);
      return data;
    } catch(error) {
      return error;
    }
  };

  /**
   * @props:
   * - name: string - name of the book
   * - chapter: number - chapter number
   * - start: number - staring verse number
   * - end: number - ending verse number
   */
  async fetchChapterVersesByRange(props: VerseByRangeProps): Promise<VerseByRangeReturn | unknown> {
    /* not ok... */
    if (props.end < props.start) {
      return {
        code: "api-fail",
        message: "Something has gone wrong",
        payload: "The 'end' value cannot be less than the 'start' value"
      };
    }

    /* ok... */
    const $this = this;
    const { name, chapter, start, end, langId } = props;
    const translation = !langId ? "web" : langId;
    const requestUrl = `${this.baseUrl}${name}+${chapter}:${start}-${end}?translation=${translation}`;

    /* fetch and return to client */
    try {
      const data = await fetchVersesByRange(requestUrl);
      return data;
    } catch (error) {
      return error;
    }
  }

  /**
   * @props:
   * - name: string - name of the book
   * - chapter: number - chapter number
   * - verse: number - verse number
   */
  async fetchASingleVerse(props: SingleVerseProps): Promise<SingleVerseReturn | unknown> {
    const $this = this;
    const { name, chapter, verse, langId } = props;
    const translation = !langId ? "web" : langId;
    const requestUrl = `${this.baseUrl}${name}+${chapter}:${verse}?translation=${translation}`;

    /* fetch and return to client */
    try {
      const data = await fetchASingleVerse(requestUrl);
      return data;
    } catch (error) {
      return error;
    }
  }

  /**
   * @props:
   * {langId?: string;}
   */
  async fetchRandomVerse(props: RandomVerseProps): Promise<RandomVerseReturn | unknown> {
    const $this = this;
    const { langId } = props;
    const translation = !langId ? "web" : langId;
    const requestUrl = `${$this.baseUrl}?random=verse&translation=${translation}`;

    /* fetch and return to client */
    try {
      const data = await randomVerseHandler({requestUrl});
      return data;
    } catch (error) {
      return error;
    }
  }

  /**
   * fetches data about the api and allowed languages for translation
   */
  fetchSystemHelp(): Record<string, any> {
    return {
      code: "api-ok",
      message: "API System Help",
      payload: systemHelp()
    };
  }
}

/* exports */
export default HolyBible;
