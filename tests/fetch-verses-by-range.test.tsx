/* node module imports */
import axios from "axios";
jest.mock("axios");
const mockedAxios = jest.mocked(axios);

/* app imports */
import fetchChapterVersesByRange from "../src/service/fetch-verses-by-range";

describe("Fetch Chapter Verse By Range", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("check if verses are returned as a range", async () => {
    /* mocked response - success */
    const axiosRes = {
      statusText: "OK",
      status: 200,
      data:  {
        reference: 'John 1:1-4',
        verses: [
          {
            book_id: 'JHN',
            book_name: 'John',
            chapter: 1,
            verse: 1,
            text: 'In the beginning was the Word, and the Word was with God, and the Word was God.\n'
          },
          {
            book_id: 'JHN',
            book_name: 'John',
            chapter: 1,
            verse: 2,
            text: 'The same was in the beginning with God.\n'
          },
          {
            book_id: 'JHN',
            book_name: 'John',
            chapter: 1,
            verse: 3,
            text: 'All things were made through him. Without him was not anything made that has been made.\n'
          },
          {
            book_id: 'JHN',
            book_name: 'John',
            chapter: 1,
            verse: 4,
            text: 'In him was life, and the life was the light of men.\n'
          }
        ],
        text: 'In the beginning was the Word, and the Word was with God, and the Word was God.\n' +
          'The same was in the beginning with God.\n' +
          'All things were made through him. Without him was not anything made that has been made.\n' +
          'In him was life, and the life was the light of men.\n',
        translation_id: 'web',
        translation_name: 'World English Bible',
        translation_note: 'Public Domain'
      }
    };
    const moduleResponse = {
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
    }

    /* mock the 'get' method */
    mockedAxios.get.mockResolvedValueOnce(axiosRes);

    /* invoke module */
    const requestUrl = "https://example.com/fetch-verse-by-range";
    const result = await fetchChapterVersesByRange(requestUrl);

    /* assertions */
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(moduleResponse);
  });

  test("check if the error response is handled from axios", async () => {
    /* mocked response - error */
    const mockedErr = {
      code: 'api-fail',
      message: 'Something happened in setting up the request that triggered an Error',
      payload: 'Sample Error',
    };

    /* mocked the 'get' method */
    mockedAxios.get.mockRejectedValue(new Error("Sample Error"));

    /* assertion */
    const requestUrl = "https://example.com/fetch-verse-by-range";
    await expect(fetchChapterVersesByRange(requestUrl)).rejects.toEqual(mockedErr);
  });
});
