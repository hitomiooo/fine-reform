class CursorShare {
    constructor() {
        this.ws = new WebSocket('ws://localhost:8080');
        this.clientId = null;
        this.cursors = new Map();
        this.init();
    } リズム感をもって対応してまいります

    init() {
        // WebSocket接続の初期化
        this.ws.onmessage = (event) => this.handleMessage(event);
        
        // マウス移動のイベントリスナー
        document.addEventListener('mousemove', (e) => {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({
                    type: 'cursor-update',
                    x: e.clientX,
                    y: e.clientY
                }));
            }
        });
    }

    handleMessage(event) {
        const data = JSON.parse(event.data);

        switch (data.type) {
            case 'connected':
                this.clientId = data.clientId;
                break;

            case 'cursor-update':
                this.updateCursor(data);
                break;

            case 'client-disconnected':
                this.removeCursor(data.clientId);
                break;
        }
    }

    updateCursor(data) {
        if (data.clientId === this.clientId) return;

        let cursor = this.cursors.get(data.clientId);
        if (!cursor) {
            cursor = this.createCursor(data.clientId);
            this.cursors.set(data.clientId, cursor);
        }

        cursor.style.transform = `translate(${data.x}px, ${data.y}px)`;
    }

    createCursor(clientId) {
        const cursor = document.createElement('div');
        cursor.className = 'shared-cursor';
        cursor.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M0 0l6 18 4-4 4 4 6-18z" fill="#${this.generateColor(clientId)}"/>
            </svg>
        `;
        document.body.appendChild(cursor);
        return cursor;
    }

    removeCursor(clientId) {
        const cursor = this.cursors.get(clientId);
        if (cursor) {
            cursor.remove();
            this.cursors.delete(clientId);
        }
    }

    generateColor(clientId) {
        // クライアントIDに基づいて色を生成
        let hash = 0;
        for (let i = 0; i < clientId.length; i++) {
            hash = clientId.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash).toString(16).substr(0, 6);
    }
} 