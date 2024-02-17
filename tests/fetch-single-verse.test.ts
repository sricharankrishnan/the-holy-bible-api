/* node module imports */
import axios from "axios";
jest.mock("axios");
const mockedAxios = jest.mocked(axios);

/* app imports */
import fetchASingleVerse from "../src/service/fetch-single-verse";

describe("Fetch A Single Verse", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("check if a single verse is generated", async () => {
    /* mocked response - success */
    const axiosRes = {
      statusText: "OK",
      status: 200,
        data: {
        reference: 'John 1:1',
        verses: [
          {
            book_id: 'JHN',
            book_name: 'John',
            chapter: 1,
            verse: 1,
            text: 'In the beginning was the Word, and the Word was with God, and the Word was God.\n'
          }
        ],
        text: 'In the beginning was the Word, and the Word was with God, and the Word was God.\n',
        translation_id: 'web',
        translation_name: 'World English Bible',
        translation_note: 'Public Domain'
      }
    };

    /* mock the 'get' method */
    mockedAxios.get.mockResolvedValueOnce(axiosRes);

    /* invoke the module */
    const requestUrl = "https://example.com/get-single-verse";
    const result = await fetchASingleVerse(requestUrl);

    /* assertions */
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      code: 'api-ok',
      message: 'API Success: Fetch Single Verse',
      payload: {
        book: { id: "JHN", name: "John" },
        chapter: 1,
        verse: 1,
        text: 'In the beginning was the Word, and the Word was with God, and the Word was God.\n',
        translation: { id: 'web', name: 'World English Bible', note: 'Public Domain' }
      }
    });
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
    await expect(fetchASingleVerse('http://example.com/randomverse')).rejects.toEqual(mockedErr);
  });
});
