"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/service/random-verse/index.ts
var import_axios = __toESM(require("axios"));
function fetchRandomVerse(props) {
  return new Promise((resolve, reject) => {
    const { requestUrl } = props;
    import_axios.default.get(requestUrl).then((response) => {
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
var import_axios2 = __toESM(require("axios"));
function fetchASingleVerse(requestUrl) {
  return new Promise((resolve, reject) => {
    import_axios2.default.get(requestUrl).then((response) => {
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
var import_axios3 = __toESM(require("axios"));
function fetchChapterVersesByRange(requestUrl) {
  return new Promise((resolve, reject) => {
    import_axios3.default.get(requestUrl).then((response) => {
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
//# sourceMappingURL=index.js.map