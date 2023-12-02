const highlighter = document.createElement("ethifact-highlighter");
document.body.appendChild(highlighter);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "highlight text") {
        alert("OK!");
        highlighter.setAttribute();
    }
});