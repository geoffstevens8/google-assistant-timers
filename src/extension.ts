import * as vscode from 'vscode';
import * as WebRequest from 'web-request';
import { IP_ADDRESS } from "./constants";
let myStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	console.log('Google Assistant Timers  active');

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = 'extension.helloWorld';
	context.subscriptions.push(myStatusBarItem);

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {

		(async function () {
			var url = "http://" + IP_ADDRESS + ":8008/setup/assistant/alarms";
			var result = await WebRequest.json<any>(url);
			console.log(result.timer);

			var remaining = result.timer[0].fire_time - Date.now();
			var hours = Math.floor(remaining / (60 * 60 * 1000));
    		var minutes = Math.floor(
      			(remaining % (60 * 60 * 1000)) / (60 * 1000)
    		);
    		var sec = Math.floor(
      			((remaining % (60 * 60 * 1000)) % (60 * 1000)) / 1000
			);
			console.log(hours);
			console.log(minutes);
			console.log(sec);
			
			myStatusBarItem.text = `${hours} ${minutes} ${sec} left`;
			myStatusBarItem.show();
		
		})();

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
