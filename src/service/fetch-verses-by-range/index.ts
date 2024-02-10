/* node module imports */
import axios, { AxiosResponse } from "axios";

/* app imports */
import { FetchChapterVerseByRangeReturn } from "../../types/index";
import { Verse } from "../../types/verse";

/* module */
function fetchChapterVersesByRange(requestUrl: string): Promise<FetchChapterVerseByRangeReturn> {
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
            message: "Api Success - Fetch Chapter Verses By Range",
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
        reject({
          code: "api-fail",
          message: "Something went wrong",
          payload: error
        });
      });
  });
}

/* exports */
export default fetchChapterVersesByRange;
