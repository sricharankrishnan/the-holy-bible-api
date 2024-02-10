/* app imports */
import { HolyBibleInt, FetchRandomVerseReturn, FetchSingleVerseProps } from "./types";
import { RandomVerseProps } from "./types/random-verse";
import { SingleVerse } from "./types/index";
import randomVerseHandler from "./service/random-verse/index";
import fetchASingleVerse from "./service/fetch-single-verse/index";

/* class */
class HolyBible implements HolyBibleInt {
  baseUrl: string;

  /* @constructor */
  constructor() {
    this.baseUrl = "https://bible-api.com/";
  };

  /**
   * @props:
   * - @name: string - name of the book
   * - @chapter: number - chapter number
   * - @verse: number - verse number
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
