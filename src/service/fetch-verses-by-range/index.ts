/* node module imports */
import axios, { AxiosResponse } from "axios";

/* app imports */
import { VerseByRangeReturn } from "../../types/index";
import { Verse } from "../../types/verse";

/* module */
function fetchChapterVersesByRange(requestUrl: string): Promise<VerseByRangeReturn> {
  return new Promise((resolve, reject) => {
    axios.get(requestUrl)
      .then((response: AxiosResponse) => {
        if (response.statusText.toLowerCase() === "ok" || response.status === 200) {
          /* extract */
          const { data } = response;

          /* format verses data */
          const verses = data.verses.reduce((composed: Verse[], aVerse: Record<string, any>) => {
            const obj = {
              book: {
                id: aVerse.book_id,
                name: aVerse.book_name
              },
              chapter: aVerse.chapter,
              verse: aVerse.verse,
              text: aVerse.text
            };
            composed.push(obj);
            return composed;
          }, []);

          /* format translation data */
          const translation = {
            id: data.translation_id,
            name: data.translation_name,
            note: data.translation_note
          };

          /* return to client */
          resolve({
            code: "api-ok",
            message: "API Success - Fetch Chapter Verses By Range",
            payload: {
              verses,
              translation
            }
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
export default fetchChapterVersesByRange;
