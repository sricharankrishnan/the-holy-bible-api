/* node module imports */
import axios, { AxiosResponse } from "axios";

/* app imports */
import { HolyBibleInt, FetchRandomVerseReturn } from "./types";
import { RandomVerseProps } from "./types/random-verse";

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
  fetchRandomVerse(props: RandomVerseProps): Promise<FetchRandomVerseReturn> {
    const $this = this;
    return new Promise((resolve, reject) => {
      /* url */
      const translation = !props ? "web" : props.langId;
      const requestUrl = `${$this.baseUrl}?random=verse&translation=${translation}`;

      axios.get(requestUrl).then((response) => {
        if (response.statusText.toLowerCase() !== "ok") {
          throw new Error("Api Request Error - Random Verse Fetch");
          return;
        }

        /* format */
        const { data } = response;
        const payload = {
          book: {
            id: data.verses[0].book_id,
            name: data.verses[0].book_name
          },
          chapter: data.verses[0].chapter,
          verse: data.verses[0].verse,
          text: data.text,
          translation: {
            id: data.translation_id,
            name: data.translation_name,
            note: data.translation_note
          }
        };

        /* return to client */
        resolve({
          code: "api-ok",
          message: "Api success - Fetch Random Verse",
          payload
        });
      })
      .catch((error) => {
        reject({
          code: "api-fail",
          message: "Something went wrong",
          payload: error
        });
      });
    });
  }
}

async function sample() {
  const bible: any = new HolyBible();
  const response = await bible.fetchRandomVerse();
  console.log(response);
}
sample();

export default HolyBible;
