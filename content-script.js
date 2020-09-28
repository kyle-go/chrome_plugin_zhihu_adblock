(function () {
    // 加载jquery
    const jq = document.createElement("script");
    jq.src = chrome.extension.getURL("jquery.min.js");
    jq.onload = function () {
        this.remove();

        // 加载main.js
        const s = document.createElement("script");
        s.src = chrome.extension.getURL("main.js");
        s.onload = function () {
            this.remove();
        };
        (document.head || document.documentElement).appendChild(s);
    };
    (document.head || document.documentElement).appendChild(jq);
})();
