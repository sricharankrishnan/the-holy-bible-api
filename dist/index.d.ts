interface RandomVerse {
    book: {
        id: string;
        name: string;
    };
    chapter: number;
    verse: number;
    text: string;
    translation: {
        id: string;
        name: string;
        note: string;
    };
}
interface RandomVerseProps {
    langId?: string;
}

interface FetchRandomVerseReturn {
    code: string;
    message: string;
    payload: RandomVerse | string;
}
interface HolyBibleInt {
    baseUrl: string;
    fetchRandomVerse: (props: RandomVerseProps) => Promise<FetchRandomVerseReturn>;
}

declare class HolyBible implements HolyBibleInt {
    baseUrl: string;
    constructor();
    /**
     * gets a random verse through the api
     * @arg: RandomVerseProps
     */
    fetchRandomVerse(props: RandomVerseProps): Promise<FetchRandomVerseReturn>;
}

export { HolyBible as default };
