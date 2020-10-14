(function () {
    console.log("屏蔽知乎广告 v1.0加载成功!");

    fuckAd();

    // 屏蔽右侧广告（这个偶尔不管用，可能还没加载）
    $(".Pc-card").css("display", "none");
    console.log("已屏蔽右侧知乎广告");

    // hook fetch
    let fetch_helper = {
        originalFetch: window.fetch.bind(window),
        myFetch: function (...args) {
            return fetch_helper.originalFetch(...args).then((response) => {
                if (response.url.startsWith("https://www.zhihu.com/api/v3/feed/topstory/recommend?")) {
                    setTimeout(fuckAd, 180);
                }
                return response;
            });
        },
    }
    window.fetch = fetch_helper.myFetch;
})();

function fuckAd() {
    var ads = $(".Pc-feedAd-container");
    if (ads.length >= 0) {
        var text = $(".Pc-feedAd-card-brand--bold").text();
        if (text) {
            console.log("已屏蔽广告:" + text);
        }
        ads.remove();
    }
}
