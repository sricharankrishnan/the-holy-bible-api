/* node module imports */
import axios from "axios";
jest.mock("axios");
const mockedAxios = jest.mocked(axios);

/* app imports */
import fetchRandomVerse from "../src/service/random-verse/index";

describe("Fetch Random Verse", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("check if a random verse is generated", async () => {
    /* mocked response - success */
    const axiosRes = {
      statusText: "OK",
      status: 200,
      data: {
        reference: 'Jude 1:17',
        verses: [
          {
            book_id: 'JUD',
            book_name: 'Jude',
            chapter: 1,
            verse: 17,
            text: 'But you, beloved, remember the words which have been spoken before by the apostles of our Lord Jesus Christ.\n'
          }
        ],
        text: 'But you, beloved, remember the words which have been spoken before by the apostles of our Lord Jesus Christ.\n',
        translation_id: 'web',
        translation_name: 'World English Bible',
        translation_note: 'Public Domain'
      }
    };

    /* mock the 'get' method */
    mockedAxios.get.mockResolvedValueOnce(axiosRes);

    /* invoke module */
    const result = await fetchRandomVerse({requestUrl: "https://example.com/random-verse"});

    /* assertions */
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      code: 'api-ok',
      message: 'Api success - Fetch Random Verse',
      payload: {
        book: { id: 'JUD', name: 'Jude' },
        chapter: 1,
        verse: 17,
        text: 'But you, beloved, remember the words which have been spoken before by the apostles of our Lord Jesus Christ.\n',
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
    await expect(fetchRandomVerse({ requestUrl: 'http://example.com/randomverse' })).rejects.toEqual(mockedErr);
  });
});
