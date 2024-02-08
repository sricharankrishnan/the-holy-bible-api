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
//# sourceMappingURL=index.js.map