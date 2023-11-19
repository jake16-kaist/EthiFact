let scrapeURLs = document.getElementById('scrapeURL');


scrapeURLs.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeURLFromPage
    });
});



function scrapeURLFromPage() {
    // Regular Expression of url
    const urlRE = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gim;

    const links = document.getElementsByTagName('a');
    const BaseURL = new URL(window.location.href);

    const urls = [];

    for (let i=0 ; i<links.length ; i++) {
        const href = links[i].getAttribute('href');
        if (href) {
            const absoulte_url = new URL(href, BaseURL);
            urls.push(absoulte_url);
        }
    }

    alert(urls);


}

