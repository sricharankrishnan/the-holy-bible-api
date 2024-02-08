import axios from 'axios';
import HolyBible from '../src/';

jest.mock('axios');

describe('HolyBible', () => {
  let holyBible: HolyBible;

  beforeEach(() => {
    holyBible = new HolyBible();
  });

  it('fetches random verse successfully', async () => {
    const mockedData = {
      verses: [{ book_id: 1, book_name: 'Genesis', chapter: 1, verse: 1 }],
      text: 'In the beginning...',
      translation_id: 1,
      translation_name: 'English',
      translation_note: 'Some note'
    };

    const mockedResponse = { statusText: 'OK', data: mockedData };

    (axios.get as jest.Mock).mockResolvedValueOnce(mockedResponse);

    const response = await holyBible.fetchRandomVerse({ langId: 'en' });

    expect(response.code).toBe('api-ok');
    expect(response.message).toBe('Api success - Fetch Random Verse');
    expect(response.payload).toEqual({
      book: { id: 1, name: 'Genesis' },
      chapter: 1,
      verse: 1,
      text: 'In the beginning...',
      translation: { id: 1, name: 'English', note: 'Some note' }
    });
  });

  it('handles error when fetching random verse', async () => {
    const mockedError = new Error('Network Error');

    (axios.get as jest.Mock).mockRejectedValueOnce(mockedError);

    const response = await holyBible.fetchRandomVerse({ langId: 'en' });

    expect(response.code).toBe('api-fail');
    expect(response.message).toBe('Something went wrong');
    expect(response.payload).toBe(mockedError);
  });
});

