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

interface Translation {
    id: string;
    name: string;
    note: string;
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
interface SingleVerse extends Verse {
    translation: Translation;
}
interface VersesByRange {
    verses: Verse[];
    translation: Translation;
}

interface RandomVerseReturn {
    code: string;
    message: string;
    payload: RandomVerse | Record<string, any>;
}
interface SingleVerseProps {
    name: string;
    chapter: number;
    verse: number;
    langId?: string;
}
interface SingleVerseReturn {
    code: string;
    message: string;
    payload: SingleVerse | Record<string, any>;
}
interface VerseByRangeProps {
    name: string;
    chapter: number;
    start: number;
    end: number;
    langId?: string;
}
interface VerseByRangeReturn {
    code: string;
    message: string;
    payload: VersesByRange | Record<string, any>;
}
interface VerseByMultiRangeProps {
    name: string;
    range: {
        chapter: number;
        verses: string[];
    }[];
    langId?: string;
}
interface HolyBibleInt {
    baseUrl: string;
    fetchRandomVerse: (props: RandomVerseProps) => Promise<RandomVerseReturn | unknown>;
    fetchASingleVerse: (props: SingleVerseProps) => Promise<SingleVerseReturn | unknown>;
    fetchChapterVersesByRange: (props: VerseByRangeProps) => Promise<VerseByRangeReturn | unknown>;
    fetchChapterVersesByMultiRange: (props: VerseByMultiRangeProps) => Promise<VerseByRangeReturn | unknown>;
}

declare class HolyBible implements HolyBibleInt {
    baseUrl: string;
    constructor();
    /**
     * @props:
     * - name: string - name of the book
     * - range: Array<{chapter: number, verses: string[]}>: chapter number with the verse ranges
     */
    fetchChapterVersesByMultiRange(props: VerseByMultiRangeProps): Promise<VerseByRangeReturn | unknown>;
    /**
     * @props:
     * - name: string - name of the book
     * - chapter: number - chapter number
     * - start: number - staring verse number
     * - end: number - ending verse number
     */
    fetchChapterVersesByRange(props: VerseByRangeProps): Promise<VerseByRangeReturn | unknown>;
    /**
     * @props:
     * - name: string - name of the book
     * - chapter: number - chapter number
     * - verse: number - verse number
     */
    fetchASingleVerse(props: SingleVerseProps): Promise<SingleVerseReturn | unknown>;
    /**
     * @props:
     * {langId?: string;}
     */
    fetchRandomVerse(props: RandomVerseProps): Promise<RandomVerseReturn | unknown>;
    /**
     * fetches data about the api and allowed languages for translation
     */
    fetchSystemHelp(): Record<string, any>;
}

export { HolyBible as default };
