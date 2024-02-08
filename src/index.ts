/* node module imports */
import axios, { AxiosResponse } from "axios";

/* app imports */
import { HolyBibleInt, FetchRandomVerseReturn } from "./types";
import { RandomVerseProps } from "./types/random-verse";
import randomVerseHandler from "./service/random-verse/index";

/* class */
class HolyBible implements HolyBibleInt {
  baseUrl: string;

  /* @constructor */
  constructor() {
    this.baseUrl = "https://bible-api.com/";
  };

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
