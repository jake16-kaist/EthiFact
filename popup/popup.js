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

document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('toggle');

    chrome.storage.sync.get('enabled', function(data) {
        toggle.checked = data.enabled;
    });

    toggle.addEventListener('change', function() {
        chrome.storage.sync.set({enabled: toggle.checked});
    });

    function updateInjectionState(enabled){
        if(enabled){
            console.log("Injecting");
            injectScript("scripts/inject.js");
        }
        else{
            console.log("Removing");
            removeScript("scripts/inject.js");
        }
    }

    function injectScript(file_path) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id,{file:file_path});
        });
    }

    function removeScript(file_path) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id,{code:"var elem = document.getElementById('ethifact'); elem.parentNode.removeChild(elem);"});
        });
    }
});

