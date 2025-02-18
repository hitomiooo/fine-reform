const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// 接続しているクライアントとドキュメントの状態を管理
const clients = new Map();
let documentState = {
    content: {},  // 各ファイルの内容
    cursors: {}   // カーソル位置
};

wss.on('connection', (ws) => {
    const clientId = generateUniqueId();
    clients.set(ws, clientId);

    // 初期状態を送信
    ws.send(JSON.stringify({
        type: 'init',
        clientId: clientId,
        state: documentState
    }));

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        switch(data.type) {
            case 'edit':
                // 編集内容を保存して他のクライアントに送信
                documentState.content[data.file] = data.content;
                broadcast(ws, {
                    type: 'edit',
                    file: data.file,
                    content: data.content,
                    clientId: clientId
                });
                break;

            case 'cursor-update':
                documentState.cursors[clientId] = {
                    file: data.file,
                    position: data.position
                };
                broadcast(ws, {
                    type: 'cursor-update',
                    clientId: clientId,
                    file: data.file,
                    position: data.position
                });
                break;
        }
    });

    ws.on('close', () => {
        delete documentState.cursors[clientId];
        broadcast(ws, {
            type: 'client-disconnected',
            clientId: clientId
        });
        clients.delete(ws);
    });
});

// 他のクライアントにメッセージをブロードキャスト
function broadcast(sender, data) {
    wss.clients.forEach((client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
} 