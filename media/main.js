// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.

(function () {
    const vscode = acquireVsCodeApi();

    // const oldState = /** @type {{ count: number} | undefined} */ (vscode.getState());

    const submitBtn = /** @type {HTMLButtonElement} */ (document.getElementById('submit-button'));
    const messageInput = /** @type {HTMLTextAreaElement} */ (document.getElementById('message'));
    const conversationBox = /** @type {HTMLElement} */ (document.getElementById('conversation'));
    const submit = () => {    
        const message = messageInput.value;
        const chatLine = document.createElement("div");
        const chat = document.createElement("div");
        chat.classList.add("sent");
        chatLine.appendChild(chat)
        chat.appendChild(document.createTextNode(message));
        conversationBox.appendChild(chatLine);
        // Send a message back to the extension
        vscode.postMessage({
            command: 'ask',
            text: message
        });
        messageInput.value = "";
    };
    const receive = (/** @type {string} */ message) => {
        const chatLine = document.createElement("div");
        const chat = document.createElement("div");
        chat.classList.add("reveived");
        chatLine.appendChild(chat)
        chat.appendChild(document.createTextNode(message));
        conversationBox.appendChild(chatLine);
    }
    
    submitBtn.addEventListener("click", () => {
        submit();
    });

    messageInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter") { 
            e.preventDefault();
            messageInput.value.length > 0 && submit();
        }
    });
    messageInput.focus();

    window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case 'respond':
                receive(message.data);
                break;
        }
    });

    // console.log('Initial state', oldState);

    // let currentCount = (oldState && oldState.count) || 0;
    // // counter.textContent = `${currentCount}`;

    // setInterval(() => {
    //     counter.textContent = `${currentCount++} `;

    //     // Update state
    //     vscode.setState({ count: currentCount });

    //     // Alert the extension when the cat introduces a bug
    //     if (Math.random() < Math.min(0.001 * currentCount, 0.05)) {
    //         // Send a message back to the extension
    //         vscode.postMessage({
    //             command: 'alert',
    //             text: '🐛  on line ' + currentCount
    //         });
    //     }
    // }, 100);

    // // Handle messages sent from the extension to the webview
    // window.addEventListener('message', event => {
    //     const message = event.data; // The json data that the extension sent
    //     switch (message.command) {
    //         case 'refactor':
    //             currentCount = Math.ceil(currentCount * 0.5);
    //             counter.textContent = `${currentCount}`;
    //             break;
    //     }
    // });
}());
