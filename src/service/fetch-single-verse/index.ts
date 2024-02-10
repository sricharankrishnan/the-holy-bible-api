/* node module imports */
import axios, { AxiosResponse } from "axios";

/* app imports */
import { SingleVerse } from "../../types/index";

/* module */
function fetchASingleVerse(requestUrl: string): Promise<SingleVerse> {
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
          resolve(verse);
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
export default fetchASingleVerse;
