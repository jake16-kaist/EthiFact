const toggle = document.getElementById('toggle');

document.addEventListener('DOMContentLoaded', function () {
    var checked = false;

    toggle.addEventListener('click', function () {
        checked = !checked;

        if (checked) {
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

        } else {
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
        }
    });
});
