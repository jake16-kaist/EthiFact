document.getElementById("highlightButton").onclick = function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id, {
                message: "highlight text"
            },
            (response) => {
                console.log(response);
            }
        );
    });
};