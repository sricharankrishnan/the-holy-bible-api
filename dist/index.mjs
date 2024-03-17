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
      if (error.response) {
        reject({
          code: "api-fail",
          message: "The request was made and the server responded with a status code",
          payload: error.response
        });
      } else if (error.request) {
        reject({
          code: "api-fail",
          message: "The request was made but no response was received",
          payload: error.request
        });
      } else {
        reject({
          code: "api-fail",
          message: "Something happened in setting up the request that triggered an Error",
          payload: error.message
        });
      }
    });
  });
}
var random_verse_default = fetchRandomVerse;

// src/service/fetch-single-verse/index.ts
import axios2 from "axios";
function fetchASingleVerse(requestUrl) {
  return new Promise((resolve, reject) => {
    axios2.get(requestUrl).then((response) => {
      if (response.statusText.toLowerCase() === "ok" || response.status === 200) {
        const { data } = response;
        const verse = {
          book: {
            id: data.verses[0].book_id,
            name: data.verses[0].book_name
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
        resolve({
          code: "api-ok",
          message: "API Success: Fetch Single Verse",
          payload: verse
        });
      } else {
        throw new Error("Sorry. Fetching A Single Verse: - something went wrong");
        return;
      }
    }).catch((error) => {
      if (error.response) {
        reject({
          code: "api-fail",
          message: "The request was made and the server responded with a status code",
          payload: error.response
        });
      } else if (error.request) {
        reject({
          code: "api-fail",
          message: "The request was made but no response was received",
          payload: error.request
        });
      } else {
        reject({
          code: "api-fail",
          message: "Something happened in setting up the request that triggered an Error",
          payload: error.message
        });
      }
    });
  });
}
var fetch_single_verse_default = fetchASingleVerse;

// src/service/fetch-verses-by-range/index.ts
import axios3 from "axios";
function fetchChapterVersesByRange(requestUrl) {
  return new Promise((resolve, reject) => {
    axios3.get(requestUrl).then((response) => {
      if (response.statusText.toLowerCase() === "ok" || response.status === 200) {
        const { data } = response;
        const verses = data.verses.reduce((composed, aVerse) => {
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
        const translation = {
          id: data.translation_id,
          name: data.translation_name,
          note: data.translation_note
        };
        resolve({
          code: "api-ok",
          message: "API Success - Fetch Chapter Verses By Range",
          payload: {
            verses,
            translation
          }
        });
      } else {
        throw new Error("Sorry. Fetching A Single Verse: - something went wrong");
        return;
      }
    }).catch((error) => {
      if (error.response) {
        reject({
          code: "api-fail",
          message: "The request was made and the server responded with a status code",
          payload: error.response
        });
      } else if (error.request) {
        reject({
          code: "api-fail",
          message: "The request was made but no response was received",
          payload: error.request
        });
      } else {
        reject({
          code: "api-fail",
          message: "Something happened in setting up the request that triggered an Error",
          payload: error.message
        });
      }
    });
  });
}
var fetch_verses_by_range_default = fetchChapterVersesByRange;

// src/service/help/index.ts
function systemHelp() {
  const helpObject = {
    name: "https://bible-api.com/",
    about: "This is a tiny little web app that provides a JSON API for grabbing bible verses and passages.",
    translations: {
      "1": {
        language: "Cherokee",
        name: "Cherokee New Testament",
        identifier: "cherokee"
      },
      "2": {
        language: "Czech",
        name: "Bible kralick\xE1",
        identifier: "bkr"
      },
      "3": {
        language: "English",
        name: "American Standard Version (1901)",
        identifier: "asv"
      },
      "4": {
        language: "English",
        name: "Bible in Basic English",
        identifier: "bbv"
      },
      "5": {
        language: "English",
        name: "Darby Bible",
        identifier: "darby"
      },
      "6": {
        language: "English",
        name: "Douay-Rheims 1899 American Edition",
        identifier: "dra"
      },
      "7": {
        language: "English",
        name: "King James Version",
        identifier: "kjv"
      },
      "8": {
        language: "English (Default)",
        name: "World English Bible",
        identifier: "web"
      },
      "9": {
        language: "English",
        name: "Young's Literal Translation",
        identifier: "ylt"
      },
      "10": {
        language: "English (UK)",
        name: "Open English Bible, Commonwealth Edition",
        identifier: "	oeb-cw"
      },
      "11": {
        language: "English (UK)",
        name: "World English Bible, British Edition",
        identifier: "webbe"
      },
      "12": {
        language: "English (US)",
        name: "Open English Bible, US Edition",
        identifier: "oeb-us"
      },
      "13": {
        language: "Latin",
        name: "Clementine Latin Vulgate",
        identifier: "clementine"
      },
      "14": {
        language: "Portuguese",
        name: "Jo\xE3o Ferreira de Almeida",
        identifier: "almeida"
      },
      "15": {
        language: "Romanian",
        name: "Protestant Romanian Corrected Cornilescu Version",
        identifier: "rccv"
      }
    }
  };
  return helpObject;
}
var help_default = systemHelp;

// src/index.ts
var HolyBible = class {
  /* @constructor */
  constructor() {
    this.baseUrl = "https://bible-api.com/";
  }
  /**
   * @props:
   * - name: string - name of the book
   * - range: Array<{chapter: number, verses: string[]}>: chapter number with the verse ranges
   */
  fetchChapterVersesByMultiRange(props) {
    return __async(this, null, function* () {
      const $this = this;
      const { name, range, langId } = props;
      let requestUrl = range.reduce((composed, data, index) => {
        const { chapter, verses } = data;
        const versesJoin = verses.join(",");
        const chapVerJoined = index === range.length - 1 ? `${chapter}:${versesJoin}` : `${chapter}:${versesJoin},`;
        composed = `${composed}${chapVerJoined}`;
        return composed;
      }, `${$this.baseUrl}${name}+`);
      requestUrl = !langId ? `${requestUrl}?translation=web` : `${requestUrl}?translation=${langId}`;
      try {
        const data = yield fetch_verses_by_range_default(requestUrl);
        return data;
      } catch (error) {
        return error;
      }
    });
  }
  /**
   * @props:
   * - name: string - name of the book
   * - chapter: number - chapter number
   * - start: number - staring verse number
   * - end: number - ending verse number
   */
  fetchChapterVersesByRange(props) {
    return __async(this, null, function* () {
      if (props.end < props.start) {
        return {
          code: "api-fail",
          message: "Something has gone wrong",
          payload: "The 'end' value cannot be less than the 'start' value"
        };
      }
      const $this = this;
      const { name, chapter, start, end, langId } = props;
      const translation = !langId ? "web" : langId;
      const requestUrl = `${this.baseUrl}${name}+${chapter}:${start}-${end}?translation=${translation}`;
      try {
        const data = yield fetch_verses_by_range_default(requestUrl);
        return data;
      } catch (error) {
        return error;
      }
    });
  }
  /**
   * @props:
   * - name: string - name of the book
   * - chapter: number - chapter number
   * - verse: number - verse number
   */
  fetchASingleVerse(props) {
    return __async(this, null, function* () {
      const $this = this;
      const { name, chapter, verse, langId } = props;
      const translation = !langId ? "web" : langId;
      const requestUrl = `${this.baseUrl}${name}+${chapter}:${verse}?translation=${translation}`;
      try {
        const data = yield fetch_single_verse_default(requestUrl);
        return data;
      } catch (error) {
        return error;
      }
    });
  }
  /**
   * @props:
   * {langId?: string;}
   */
  fetchRandomVerse(props) {
    return __async(this, null, function* () {
      const $this = this;
      const { langId } = props;
      const translation = !langId ? "web" : langId;
      const requestUrl = `${$this.baseUrl}?random=verse&translation=${translation}`;
      try {
        const data = yield random_verse_default({ requestUrl });
        return data;
      } catch (error) {
        return error;
      }
    });
  }
  /**
   * fetches data about the api and allowed languages for translation
   */
  fetchSystemHelp() {
    return {
      code: "api-ok",
      message: "API System Help",
      payload: help_default()
    };
  }
};
var src_default = HolyBible;
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map