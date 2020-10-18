(function () {
    console.log("【屏蔽知乎广告】插件加载成功!");

    // fuckAd
    const createFuckAd = (adSelector, textSelector) => () => {
        // 广告
        const ads = document.querySelectorAll(adSelector);

        if (ads.length > 0) {
            const cardBrand = document.querySelector(textSelector);

            if (cardBrand) {
                console.log("已屏蔽广告:" + cardBrand.innerText);
            }

            // 删掉广告
            [...ads].forEach(item => item.parentNode.removeChild(item));
        }
    }

    // hook fetch
    const fetch_helper = {
        originalFetch: window.fetch.bind(window),
        myFetch: function (...args) {
            return fetch_helper.originalFetch(...args).then((response) => {
                //console.log(response.url)
                if (response.url.startsWith("https://www.zhihu.com/api/v3/feed/topstory/recommend?")) {
                    setTimeout(createFuckAd('.Pc-feedAd-container', '.Pc-feedAd-card-brand--bold'), 188);
                }
                if (response.url.startsWith("https://www.zhihu.com/api/v4/questions/")
                    && response.url.indexOf('answers?include') !== -1) {
                    setTimeout(createFuckAd('.Pc-word-card', '.Pc-word-card-brand-wrapper > span'), 288);
                }
                return response;
            });
        },
    }

    window.fetch = fetch_helper.myFetch;
    window.onload = () => {
        createFuckAd('.Pc-card')();
        createFuckAd('.Pc-feedAd-container', '.Pc-feedAd-card-brand--bold')();
        createFuckAd('.Pc-word-card', '.Pc-word-card-brand-wrapper > span')();
    }
})();
