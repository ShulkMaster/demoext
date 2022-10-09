import * as vs from 'vscode';

export class CasingManager {

    private static apply(transform: (s: string) => string): void {
        const editor = vs.window.activeTextEditor!;
        console.log(editor);
        
		editor.selections.forEach(s => {
			const ss = editor.document.getText(s);
			const ssNew = transform(ss);
			editor.edit(e => e.replace(s, ssNew));
		});
    }


    public static toUpper(): void {
        this.apply(ss => ss.toLocaleUpperCase());
    }

    public static toLower(): void {
        this.apply(ss => ss.toLocaleLowerCase());
    }

    public static toCapital(): void {
        this.apply(ss => {
            return ss.split(' ')
            .map(s => {
                switch (s.length) {
                    case undefined:
                    case 0: return '';
                    case 1: return s.toLocaleUpperCase();
                    default:
                        return s[0].toLocaleUpperCase() + s.substring(1);
                }
            }).join(' ');
        });
    }
}