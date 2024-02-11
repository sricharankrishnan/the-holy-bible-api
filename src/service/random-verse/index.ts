/* node module imports */
import axios, { AxiosResponse } from "axios";

/* app imports */
import { RandomVerseReturn } from "../../types";

/* interface */
type ModuleProps = {requestUrl: string};
type ModuleReturns = Promise<RandomVerseReturn>;

/* module */
function fetchRandomVerse(props: ModuleProps): ModuleReturns {
  return new Promise((resolve, reject) => {
    const { requestUrl } = props;

    /* fetch data */
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
      if (error.response) {
        reject({
          code: "api-fail",
          message: "The request was made and the server responded with a status code",
          payload: error.response
        });
      }
      else if (error.request) {
        reject({
          code: "api-fail",
          message: "The request was made but no response was received",
          payload: error.request
        });
      }
      else {
        reject({
          code: "api-fail",
          message: "Something happened in setting up the request that triggered an Error",
          payload: error.message
        });
      }
    });
  });
}
export default fetchRandomVerse;
