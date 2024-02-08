var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/service/random-verse/index.ts
import axios from "axios";
function fetchRandomVerse(props) {
  return new Promise((resolve, reject) => {
    const { requestUrl } = props;
    axios.get(requestUrl).then((response) => {
      if (response.statusText.toLowerCase() !== "ok") {
        throw new Error("Api Request Error - Random Verse Fetch");
        return;
      }
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
      resolve({
        code: "api-ok",
        message: "Api success - Fetch Random Verse",
        payload
      });
    }).catch((error) => {
      reject({
        code: "api-fail",
        message: "Something went wrong",
        payload: error
      });
    });
  });
}
var random_verse_default = fetchRandomVerse;

// src/index.ts
var HolyBible = class {
  /* @constructor */
  constructor() {
    this.baseUrl = "https://bible-api.com/";
  }
  /**
   * gets a random verse through the api
   * @arg: RandomVerseProps
   */
  fetchRandomVerse(props) {
    return __async(this, null, function* () {
      const $this = this;
      const { langId } = props;
      const translation = !langId ? "web" : langId;
      const requestUrl = `${$this.baseUrl}?random=verse&translation=${translation}`;
      const data = yield random_verse_default({ requestUrl });
      return data;
    });
  }
};
var src_default = HolyBible;
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map