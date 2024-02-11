/* node module imports */
import axios, { AxiosResponse } from "axios";

/* app imports */
import { SingleVerse } from "../../types/verse";
import { SingleVerseReturn } from "../../types/index";

/* module */
function fetchASingleVerse(requestUrl: string): Promise<SingleVerseReturn> {
  return new Promise((resolve, reject) => {
    axios.get(requestUrl)
      .then((response: AxiosResponse) => {
        if (response.statusText.toLowerCase() === "ok" || response.status === 200) {
          /* extract */
          const { data } = response;

          /* format */
          const verse: SingleVerse = {
            book: {
              id: data.verses[0].book_id,
              name: data.verses[0].book_name,
            },
            chapter: data.verses[0].chapter,
            verse: data.verses[0].verse,
            text: data.verses[0].text,
            translation: {
              id: data.translation_id,
              name: data.translation_name,
              note: data.translation_note
            }
          };

          /* return to client */
          resolve({
            code: "api-ok",
            message: "API Success: Fetch Single Verse",
            payload: verse
          });
        }
        else {
          throw new Error("Sorry. Fetching A Single Verse: - something went wrong");
          return;
        }
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

/* exports */
export default fetchASingleVerse;
