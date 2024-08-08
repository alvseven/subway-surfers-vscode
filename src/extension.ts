import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let panel: vscode.WebviewPanel | undefined = undefined;

  let disposable = vscode.commands.registerCommand("extension.showGif", () => {
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

      const webpPath = vscode.Uri.file(
        path.join(context.extensionPath, "src", "media", "subway-surfers.webp")
      );

      const webviewUri = panel.webview.asWebviewUri(webpPath);

      panel.webview.html = getWebviewContent(webviewUri);

      panel.iconPath = vscode.Uri.file(
        path.join(context.extensionPath, "src", "media", "transparent-icon.png")
      );

      panel.onDidDispose(() => {
        panel = undefined;
      });
    } else {
      panel.reveal(vscode.ViewColumn.Beside);
    }
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent(webpUri: vscode.Uri): string {
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
              <img src="${webpUri}" />
          </body>
          </html>
      `;
}

export function deactivate() {}
