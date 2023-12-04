const color_red = "rgb(252,217,217)";
const color_grey = "rgb(240,240,240)";
const color_green = "rgb(217, 250, 220)";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "highlight text") {
        const links = document.getElementsByTagName("a");

        for (let i = 0; i < links.length; i++) {
            if (links.item(i).childElementCount === 0) {
                if (Number(request.score) >= 80) {
                    links.item(i).style.backgroundColor = color_green;
                } else if (Number(request.score) >= 50) {
                    links.item(i).style.backgroundColor = color_grey;
                } else {
                    links.item(i).style.backgroundColor = color_red;
                }
            }
        }
    }

    if (request.message === "undo highlight") {
        const links = document.getElementsByTagName("a");

        for (let i = 0; i < links.length; i++) {
            if (links.item(i).childElementCount === 0) {
                links.item(i).style.backgroundColor = "initial";
            }
        }
    }
});