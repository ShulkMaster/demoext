import { SimpleClient } from './SimpleClient';

export type DictionaryResponse = Word[];

export type Word = {
    word: string;
    phonetic: string;
    meanings: Meaning[];
    sourceUrls: string[];
};

export interface Meaning {
    partOfSpeech: string
    definitions: Definition[]
    synonyms: string[]
    antonyms: string[]
}

export interface Definition {
    definition: string
    synonyms: string[]
    antonyms: string[]
    example?: string
  }

export class DictionaryApi {
    private static readonly baseUrl = 'https://api.dictionaryapi.dev';

    private readonly client = new SimpleClient(DictionaryApi.baseUrl);

    public async getWord(word: string): Promise<DictionaryResponse | undefined> {        
        try {
            const res = await this.client.get<DictionaryResponse>(`/api/v2/entries/en/${word}`);
            console.log(res[0].meanings);
            return res;
        } catch (e) {
            console.log(e);
            return;
        }
    }
}