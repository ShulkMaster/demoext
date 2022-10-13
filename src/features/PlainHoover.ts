import { DictionaryApi, DictionaryResponse, Meaning, Definition, Word } from '../api';
import { CancellationToken, Hover, HoverProvider, Position, ProviderResult, TextDocument, languages, Disposable } from 'vscode';

const getDefinitionString = (def: Definition, index: number): string =>{
    if(index > 2) { return '';}
    const { definition, example, synonyms } = def;
    if(!example) {
        return `  ${index + 1}. ${definition}\n`;
    }
    return `  ${index + 1}. ${definition}\n  example: \n> ${example}\n`;
};



const getMeaningStrign = (mean: Meaning): string => {
    console.log(mean);
    
    //if(index > 3) { return '';}
    const { definitions, partOfSpeech, synonyms } = mean;
    const defText = definitions.map(getDefinitionString).join('\n');
    return `- ${partOfSpeech}:\n${defText}`;
};


export class PlainHoover implements HoverProvider {

    private readonly client: DictionaryApi;
    private lastWord: Promise<DictionaryResponse | undefined> | undefined = undefined;

    private constructor() {
        this.client = new DictionaryApi();
    }

    public static register(): Disposable {
       return languages.registerHoverProvider('plaintext', new PlainHoover);
    }

    private getWord(w: Word): string {
        const meanings = w.meanings.map(getMeaningStrign).join('\n');
        return meanings;
    }

    private getWords(words: DictionaryResponse): string {
        return words.map(this.getWord).join('\n');
    }

    provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
        const range = document.getWordRangeAtPosition(position);
        if(!range) { return; }
        const word = document.getText(range);
        const definition = this.client.getWord(word);
        token.onCancellationRequested(() => {
            Promise.reject(this.lastWord);
            this.lastWord = undefined;
        });
        return definition.then(d => {
            if(!d || d.length < 1) { return new Hover('Could not find a meaing', range); };
            const definitions = this.getWords(d);
            console.log(definitions);
            
            return new Hover(`## ${word.toUpperCase()}\n### Meanings:\n${definitions}`, range);
        });
    }



}