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

interface Verse {
    book: {
        id: string;
        name: string;
    };
    chapter: number;
    verse: number;
    text: string;
}

interface Translation {
    id: string;
    name: string;
    note: string;
}

interface FetchRandomVerseReturn {
    code: string;
    message: string;
    payload: RandomVerse | string;
}
interface FetchSingleVerseProps {
    name: string;
    chapter: number;
    verse: number;
}
interface SingleVerse extends Verse {
    translation: Translation;
}
interface HolyBibleInt {
    baseUrl: string;
    fetchRandomVerse: (props: RandomVerseProps) => Promise<FetchRandomVerseReturn>;
    fetchASingleVerse: (props: FetchSingleVerseProps) => Promise<SingleVerse>;
}

declare class HolyBible implements HolyBibleInt {
    baseUrl: string;
    constructor();
    /**
     * @props:
     * - @name: string - name of the book
     * - @chapter: number - chapter number
     * - @verse: number - verse number
     */
    fetchASingleVerse(props: FetchSingleVerseProps): Promise<SingleVerse>;
    /**
     * gets a random verse through the api
     * @arg: RandomVerseProps
     */
    fetchRandomVerse(props: RandomVerseProps): Promise<FetchRandomVerseReturn>;
}

export { HolyBible as default };
