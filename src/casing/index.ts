import * as vs from 'vscode';

const applyTransform = (transform: (s: string) => string): void => {
    const editor = vs.window.activeTextEditor!;
    editor.edit(e => {
        editor.selections.forEach(s => {
            const ss = editor.document.getText(s);
            const ssNew = transform(ss);
            console.log(ssNew);
            e.replace(s, ssNew);
        });
    });
    
};


export const toUpper = (): void => {
    applyTransform(ss => ss.toLocaleUpperCase());
};

export const toLower = (): void => {
    applyTransform(ss => ss.toLocaleLowerCase());
};

export const toCapital = (): void => {
    applyTransform(ss => {
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
};