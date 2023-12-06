const color_red = "rgb(252,217,217)";
const color_grey = "rgb(230,230,230)";
const color_green = "rgb(217, 250, 220)";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "highlight text") {
        const editbox = document.getElementsByClassName("jodit-wysiwyg")[0];
        const links = editbox.getElementsByTagName("a");

        for (let i = 0; i < links.length; i++) {
            if (links.item(i).childElementCount === 0) {
                if (links.item(i).href.includes("youtu.be") || links.item(i).href.includes("wiki")) {
                    links.item(i).style.backgroundColor = color_red;
                } else if (links.item(i).href.includes("gutenberg")) {
                    links.item(i).style.backgroundColor = color_grey;
                } else {
                    links.item(i).style.backgroundColor = color_green;
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
