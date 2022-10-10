import { SimpleClient } from './SimpleClient';

type YoMamaJoke = {
    joke: string;
};

export class YomamaApi {
    private static readonly baseUrl = 'https://yomomma-api.herokuapp.com';

    private static readonly enpoints = {
        jokes: '/jokes',
    } as const;

    private readonly client = new SimpleClient(YomamaApi.baseUrl);

    public async getJoke(): Promise<string> {
        try {
            const res = await this.client.get<YoMamaJoke>(YomamaApi.enpoints.jokes);
            return res.joke;
        } catch (e) {
            console.log(e);
            return 'error';
        }
    }
}