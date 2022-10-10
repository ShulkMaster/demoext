import * as vs from 'vscode';
import { toCapital, toLower, toUpper } from './casing';


function register(context: vs.ExtensionContext, name: string, fn: (...args: any[]) => any): void {
	const disposable = vs.commands.registerCommand(name, fn);
	context.subscriptions.push(disposable);
}

export function activate(context: vs.ExtensionContext) {
	console.log('demoext is now active!');
	register(context, 'demoext.toUpper', toUpper);
	register(context, 'demoext.toLower', toLower);
	register(context, 'demoext.toCapital', toCapital);
}

// this method is called when your extension is deactivated
export function deactivate() {}
