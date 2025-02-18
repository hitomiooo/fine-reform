class SharedEditor {
    constructor() {
        this.ws = new WebSocket('ws://localhost:8080');
        this.clientId = null;
        this.editors = new Map();
        this.init();
    }

    init() {
        this.setupWebSocket();
        this.setupEditors();
    }

    setupWebSocket() {
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case 'init':
                    this.clientId = data.clientId;
                    this.updateAllContent(data.state.content);
                    break;

                case 'edit':
                    if (data.clientId !== this.clientId) {
                        this.updateContent(data.file, data.content);
                    }
                    break;

                case 'cursor-update':
                    if (data.clientId !== this.clientId) {
                        this.updateCursor(data.clientId, data.file, data.position);
                    }
                    break;

                case 'client-disconnected':
                    this.removeCursor(data.clientId);
                    break;
            }
        };
    }

    setupEditors() {
        // 編集可能な要素にイベントリスナーを追加
        document.querySelectorAll('[contenteditable="true"]').forEach(element => {
            element.addEventListener('input', () => {
                const file = element.dataset.file;
                const content = element.innerHTML;
                
                this.ws.send(JSON.stringify({
                    type: 'edit',
                    file: file,
                    content: content
                }));
            });

            element.addEventListener('keyup', (e) => {
                const file = element.dataset.file;
                const selection = window.getSelection();
                const position = {
                    offset: selection.focusOffset,
                    node: selection.focusNode?.textContent
                };

                this.ws.send(JSON.stringify({
                    type: 'cursor-update',
                    file: file,
                    position: position
                }));
            });
        });
    }

    updateContent(file, content) {
        const element = document.querySelector(`[data-file="${file}"]`);
        if (element) {
            element.innerHTML = content;
        }
    }

    updateAllContent(content) {
        Object.entries(content).forEach(([file, html]) => {
            this.updateContent(file, html);
        });
    }

    updateCursor(clientId, file, position) {
        let cursor = this.editors.get(clientId);
        if (!cursor) {
            cursor = this.createCursor(clientId);
            this.editors.set(clientId, cursor);
        }

        // カーソル位置を更新
        const element = document.querySelector(`[data-file="${file}"]`);
        if (element) {
            // カーソル位置の計算と表示の更新
            this.positionCursor(cursor, element, position);
        }
    }

    createCursor(clientId) {
        const cursor = document.createElement('div');
        cursor.className = 'shared-cursor';
        cursor.style.backgroundColor = this.generateColor(clientId);
        document.body.appendChild(cursor);
        return cursor;
    }

    positionCursor(cursor, element, position) {
        // テキストノードとオフセットから実際の画面位置を計算
        const range = document.createRange();
        const textNodes = this.getTextNodes(element);
        const targetNode = textNodes.find(node => 
            node.textContent === position.node
        );

        if (targetNode) {
            range.setStart(targetNode, position.offset);
            range.collapse(true);
            const rect = range.getBoundingClientRect();
            
            cursor.style.left = `${rect.left}px`;
            cursor.style.top = `${rect.top}px`;
        }
    }

    getTextNodes(element) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        const nodes = [];
        let node;
        while (node = walker.nextNode()) {
            nodes.push(node);
        }
        return nodes;
    }

    removeCursor(clientId) {
        const cursor = this.editors.get(clientId);
        if (cursor) {
            cursor.remove();
            this.editors.delete(clientId);
        }
    }

    generateColor(clientId) {
        let hash = 0;
        for (let i = 0; i < clientId.length; i++) {
            hash = clientId.charCodeAt(i) + ((hash << 5) - hash);
        }
        return `hsl(${hash % 360}, 70%, 50%)`;
    }
} 