import { RequestOptions, request } from 'https';

export class SimpleClient {
   private readonly url: URL;

    constructor(base: string) {
        this.url = new URL(base);
    }


    public async get<T>(path: string): Promise<T> {
        const options: RequestOptions = {
            method: 'GET',
            path,
            hostname: this.url.hostname,
        };
        return new Promise((resolve, reject) => {
            request(options, message => {
                let data = '';
                message.on('data', (chunk) => {
                    data += chunk;
                });
                
                message.on('end', () => {
                    resolve(JSON.parse(data));
                });
            })
            .on('error', error => reject(error))
            .end();
        });
    }

}