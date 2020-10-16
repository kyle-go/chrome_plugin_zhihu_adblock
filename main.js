(function () {
    console.log("【屏蔽知乎广告】插件加载成功!");
    fuckTimelineAd();

    // 屏蔽右侧广告（这个偶尔不管用，可能还没加载）
    $(".Pc-card").css("display", "none");
    console.log("已屏蔽右侧知乎广告");

    // hook fetch
    const fetch_helper = {
        originalFetch: window.fetch.bind(window),
        myFetch: function (...args) {
            return fetch_helper.originalFetch(...args).then((response) => {
                //console.log(response.url)
                if (response.url.startsWith("https://www.zhihu.com/api/v3/feed/topstory/recommend?")) {
                    setTimeout(fuckTimelineAd, 188);
                }
                if (response.url.startsWith("https://www.zhihu.com/api/v4/questions/")
                    && response.url.indexOf('answers?include') !== -1) {
                    setTimeout(fuckAnswersAd, 288);
                }
                return response;
            });
        },
    }
    window.fetch = fetch_helper.myFetch;
})();

function fuckTimelineAd() {
    // 首页timeline广告
    const ads = $(".Pc-feedAd-container");
    if (ads.length > 0) {
        const text = $(".Pc-feedAd-card-brand--bold").text();
        if (text) {
            console.log("已屏蔽广告:" + text);
        }
        ads.remove();
    }
}

function fuckAnswersAd() {
    // 答案列表广告
    const ads = $(".Pc-word-card");
    if (ads.length > 0) {
        const text = $(".Pc-word-card-brand-wrapper > span").text();
        if (text) {
            console.log("已屏蔽广告:" + text);
        }
        ads.remove();
    }
}
