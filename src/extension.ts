import * as vscode from "vscode";
import * as path from "path";

const gifUrl =
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmMza2Q3MjQxY204MngzdHl2dHhlbmVka3RtdzB3aWV2aWZyaWZ4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Fr5LA2RCQbnVp74CxH/giphy.webp";

export function activate(context: vscode.ExtensionContext) {
  let panel: vscode.WebviewPanel | undefined = undefined;

  const disposable = vscode.commands.registerCommand(
    "extension.showGif",
    () => {
      if (!panel) {
        panel = vscode.window.createWebviewPanel(
          "subwaySurfersGif",
          "",
          vscode.ViewColumn.Beside,
          {
            enableScripts: true,
            retainContextWhenHidden: true,
            enableFindWidget: false,
            enableCommandUris: false,
          }
        );

        panel.webview.html = getWebviewContent(gifUrl);

        panel.iconPath = vscode.Uri.file(
          path.join(
            context.extensionPath,
            "src",
            "media",
            "transparent-icon.png"
          )
        );

        panel.onDidDispose(() => {
          panel = undefined;
        });
      } else {
        panel.reveal(vscode.ViewColumn.Beside);
      }
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(imageUrl: string): string {
  return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <style>
                  body {
                      margin: 0;
                      padding: 0;
                      overflow: hidden;
                      display: flex;
                      justify-content: flex-end;
                      align-items: flex-end;
                      height: 100vh;
                      background-color: transparent;
                  }
                  img {
                      max-width: 400px;
                      height: 60%;
                      position: fixed;
                      top: 0;
                      right: 0;
                      z-index: 1000;
                  }
                  ::-webkit-scrollbar {
                      display: none;
                  }
              </style>
          </head>
          <body>
              <img src="${imageUrl}" />
          </body>
          </html>
      `;
}

export function deactivate() {}
