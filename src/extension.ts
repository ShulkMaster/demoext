import * as vs from 'vscode';
import { CasingManager } from './casing';


function register(context: vs.ExtensionContext, name: string, fn: (...args: any[]) => any): void {
	const disposable = vs.commands.registerCommand(name, fn);
	context.subscriptions.push(disposable);
}

export function activate(context: vs.ExtensionContext) {
	console.log('demoext is now active!');
	register(context, 'demoext.toUpper', CasingManager.toUpper);
	register(context, 'demoext.toLower', CasingManager.toLower);
	register(context, 'demoext.toCapital', CasingManager.toCapital);
}

// this method is called when your extension is deactivated
export function deactivate() {}
