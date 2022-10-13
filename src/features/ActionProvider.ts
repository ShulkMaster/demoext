import { DictionaryApi } from '../api';
import { languages, window, CodeActionProvider, Disposable, CodeAction, CancellationToken, CodeActionContext, Command, ProviderResult, Range, Selection, TextDocument, CodeActionKind } from 'vscode';

export class PlainAction implements CodeActionProvider<CodeAction> {

    private readonly client: DictionaryApi;

    private constructor() {
        this.client = new DictionaryApi();
    }

    public static register(): Disposable {
        return languages.registerCodeActionsProvider('plaintext', new PlainAction());
    }

       
    provideCodeActions(document: TextDocument, range: Selection | Range, context: CodeActionContext, token: CancellationToken): ProviderResult<(CodeAction | Command)[]> {
        const text = document.getText(range);
        if(!text) { return []; }
        const definition = this.client.getWord(text);
             
        return definition.then(d => {
            if(!d) { return []; }
            const synonyms = d.flatMap(w => w.meanings)
            .flatMap(m => m.synonyms)
            .map(s => new CodeAction(s, CodeActionKind.RefactorInline));
            console.log(synonyms);
            
            return synonyms;
        });
    }

    resolveCodeAction?(codeAction: CodeAction, token: CancellationToken): ProviderResult<CodeAction> {
        const editor = window.activeTextEditor;
        const selection = editor?.selection;
        if(!selection) { return; }
        editor!.edit(e => e.replace(selection, codeAction.title));
        return;
    }

}