import { YomamaApi } from './api';
import * as vs from 'vscode';
import { PlainHoover, toCapital, toLower, toUpper } from './features';

const contextList = {
	yomama: 'yomamaContext',
};


function register(context: vs.ExtensionContext, name: string, fn: (...args: any[]) => any): void {
	const disposable = vs.commands.registerCommand(name, fn);
	context.subscriptions.push(disposable);
}

export function activate(context: vs.ExtensionContext) {
	console.log('demoext is now active!');
	register(context, 'demoext.toUpper', toUpper);
	register(context, 'demoext.toLower', toLower);
	register(context, 'demoext.toCapital', toCapital);
	const output = vs.window.createOutputChannel("Demoext");
	vs.commands.executeCommand('setContext', contextList.yomama, false);
	register(context, 'demoext.enableYoMama', () => vs.commands.executeCommand('setContext', contextList.yomama, true));
	register(context, 'demoext.disableYoMama', () => vs.commands.executeCommand('setContext', contextList.yomama, false));
	register(context, 'demoext.yoMama', async () => {
		const editor = vs.window.activeTextEditor;
		if (!editor) { return; }
		const joke = await new YomamaApi().getJoke();
		editor.edit(edition => edition.insert(editor.selection.active, joke));
	});
	context.subscriptions.push(PlainHoover.register());

}

// this method is called when your extension is deactivated
export function deactivate() { }
