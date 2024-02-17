/* app imports */
import HolyBible from "../src/index";
import { HolyBibleInt } from "../src/types";
import fetchRandomVerse from "../src/service/random-verse";
import fetchASingleVerse from "../src/service/fetch-single-verse";
import fetchChapterVersesByRange from "../src/service/fetch-verses-by-range";

/* mocks */
jest.mock("../src/service/random-verse");
jest.mock("../src/service/fetch-single-verse");
jest.mock("../src/service/fetch-verses-by-range");

/* t-suite */
describe("Class HolyBible", () => {
  let testBible: HolyBibleInt | null = null;

  beforeEach(() => {
    testBible = new HolyBible();
  });

  afterEach(() => {
    testBible = null;
    jest.clearAllMocks();
  });

  test("HolyBible.fetchChapterVersesByMultiRange - returns proper value", async () => {
    if (testBible) {
      /* mock - setup */
      const mockedFetchChapterVersesByRange = jest.mocked(fetchChapterVersesByRange);
      const mockedReturn = {
        "code": "api-ok",
        "message": "API Success - Fetch Chapter Verses By Range",
        "payload": {
          "verses": [
            {
              "book": {
                "id": "JHN",
                "name": "John"
              },
              "chapter": 1,
              "verse": 1,
              "text": "In the beginning was the Word, and the Word was with God, and the Word was God.\n"
            },
            {
              "book": {
                "id": "JHN",
                "name": "John"
              },
              "chapter": 1,
              "verse": 2,
              "text": "The same was in the beginning with God.\n"
            },
            {
              "book": {
                "id": "JHN",
                "name": "John"
              },
              "chapter": 1,
              "verse": 3,
              "text": "All things were made through him. Without him was not anything made that has been made.\n"
            },
            {
              "book": {
                "id": "JHN",
                "name": "John"
              },
              "chapter": 1,
              "verse": 4,
              "text": "In him was life, and the life was the light of men.\n"
            }
          ],
          "translation": {
            "id": "web",
            "name": "World English Bible",
            "note": "Public Domain"
          }
        }
      };

      /* mock - the return value */
      mockedFetchChapterVersesByRange.mockResolvedValue(mockedReturn);

      /* execute */
      const result = await testBible.fetchChapterVersesByMultiRange({
        name: "Chapter Test Name",
        range: [
          {chapter: 1, verses: ["1-2", "3"]},
          {chapter: 3, verses: ["1-2", "3"]},
        ]
      });

      /* assertions */
      expect(mockedFetchChapterVersesByRange).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockedReturn);
    }
  });

  test("HolyBible.fetchChapterVersesByRange - return proper value", async () => {
    if (testBible) {
      /* mock - setup */
      const mockedFetchChapterVersesByRange = jest.mocked(fetchChapterVersesByRange);
      const mockedReturn = {
        "code": "api-ok",
        "message": "API Success - Fetch Chapter Verses By Range",
        "payload": {
          "verses": [
            {
              "book": {
                "id": "JHN",
                "name": "John"
              },
              "chapter": 1,
              "verse": 1,
              "text": "In the beginning was the Word, and the Word was with God, and the Word was God.\n"
            },
            {
              "book": {
                "id": "JHN",
                "name": "John"
              },
              "chapter": 1,
              "verse": 2,
              "text": "The same was in the beginning with God.\n"
            },
            {
              "book": {
                "id": "JHN",
                "name": "John"
              },
              "chapter": 1,
              "verse": 3,
              "text": "All things were made through him. Without him was not anything made that has been made.\n"
            },
            {
              "book": {
                "id": "JHN",
                "name": "John"
              },
              "chapter": 1,
              "verse": 4,
              "text": "In him was life, and the life was the light of men.\n"
            }
          ],
          "translation": {
            "id": "web",
            "name": "World English Bible",
            "note": "Public Domain"
          }
        }
      };

      /* mock - the return value */
      mockedFetchChapterVersesByRange.mockResolvedValue(mockedReturn);

      /* execute */
      const result = await testBible.fetchChapterVersesByRange({
        name: "Chapter Test Name",
        chapter: 1,
        start: 1,
        end: 4
      });

      /* assertions */
      expect(mockedFetchChapterVersesByRange).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockedReturn);
    }
  });

  test("HolyBible.fetchASingleVerse - returns proper value", async() => {
    if (testBible) {
      /* mock - setup */
      const mockedFetchSingleVerse = jest.mocked(fetchASingleVerse);
      const mockedReturn = {
        code: 'api-ok',
        message: 'Api success - Fetch Random Verse',
        payload: {
          book: { id: 'JUD', name: 'Jude' },
          chapter: 1,
          verse: 17,
          text: 'But you, beloved, remember the words which have been spoken before by the apostles of our Lord Jesus Christ.\n',
          translation: { id: 'web', name: 'World English Bible', note: 'Public Domain' }
        }
      };

      /* mock - the return value */
      mockedFetchSingleVerse.mockResolvedValue(mockedReturn);

      /* execute */
      const result = await testBible.fetchASingleVerse({name: "example", chapter: 1, verse: 1});

      /* assertions */
      expect(mockedFetchSingleVerse).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockedReturn);
    }
  });

  test("HolyBible.fetchRandomVerse - returns proper value", async () => {
    if (testBible) {
      /* mock - setup */
      const mockedFetchRandomVerse = jest.mocked(fetchRandomVerse);
      const mockedReturn = {
        code: 'api-ok',
        message: 'Api success - Fetch Random Verse',
        payload: {
          book: { id: 'JUD', name: 'Jude' },
          chapter: 1,
          verse: 17,
          text: 'But you, beloved, remember the words which have been spoken before by the apostles of our Lord Jesus Christ.\n',
          translation: { id: 'web', name: 'World English Bible', note: 'Public Domain' }
        }
      };

      /* mock - the return value */
      mockedFetchRandomVerse.mockResolvedValue(mockedReturn);

      /* execute */
      const result = await testBible.fetchRandomVerse({});

      /* assertions */
      expect(mockedFetchRandomVerse).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockedReturn);
    }
  });
});
