(function () {
    // 加载main.js
    const s = document.createElement("script");
    s.src = chrome.runtime.getURL("main.js");
    s.onload = function () {
        s.parentNode.removeChild(s);
    };
    (document.head || document.documentElement).appendChild(s);
})();
