const scoreInput = document.getElementById("score");

document.getElementById("highlightButton").onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id, {
            message: "highlight text",
            score: scoreInput.value
        },
            (response) => {
                console.log(response);
            }
        );
    });
};

document.getElementById("undoButton").onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id, {
            message: "undo highlight"
        },
            (response) => {
                console.log(response);
            }
        );
    });
};