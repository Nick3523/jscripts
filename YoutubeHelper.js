// ==UserScript==
// @name            YouTubeHelper
// @description     Ajuster le son d'une vidéo Youtube avec la molette de la souris !
// @match           *://www.youtube.com/*
// ==/UserScript==

function getVideo() {
    return document.getElementsByTagName("video")[0];
}

function getPlayer() {
    var ytd_player = document.getElementsByTagName("ytd-player")[0];
    if (ytd_player) {
        return ytd_player.getPlayer();
    }
}

function run() {
    var player = getPlayer();
    var timer = 0;

    // detect available wheel event
    var support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
        document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
            "DOMMouseScroll"; // let"s assume that remaining browsers are older Firefox

    getVideo().addEventListener(support, function (event) {
        var volume = player.getVolume();
        var volumeDelta = 5;
        var deltaY = support == "mousewheel" ? event.wheelDelta : (event.deltaY || event.detail);
        
        // Optimize volume change for touchpad
        if (Math.abs(deltaY) < 5) {
            volumeDelta = Math.max(Math.floor(Math.abs(deltaY)), 1);
        }

        volume += (deltaY > 0 ? -volumeDelta : volumeDelta);

        // Limit the volume between 0 and 100
        volume = Math.max(0, Math.min(100, volume));

        if (volume > 0) {
            player.unMute(true);
        }
        player.setVolume(volume, true);

        timer = showSlider(timer, volume);

        // Prevent the page to scroll
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
    });
}

function showSlider(timer, volume) {
    if (timer) {
        clearTimeout(timer);
    }

    var sliderBar = appendSlideBar();

    sliderBar.style.display = "block";
    timer = setTimeout(function () {
        sliderBar.style.display = "none";
    }, 1000);

    sliderBar.innerText = volume;

    return timer;
}

function appendSlideBar() {
    var sliderBar = document.getElementById("sliderBar");
    if (!sliderBar) {
        var sliderBarElement = document.createElement("div");
        sliderBarElement.id = "sliderBar";

        document.getElementsByClassName("html5-video-container")[0].appendChild(sliderBarElement);

        sliderBar = document.getElementById("sliderBar");
        addCss(sliderBar, {
            "width": "100%",
            "height": "60px",
            "position": "relative",
            "z-index": "9999",
            "text-align": "left",
            "color": "red",
            "font-size": "50px",
            "opacity": "0.9",
            "background-color": "rgba(0,0,0,0)",
        });
    }

    addCss(sliderBar, {"top": getSliderBarTopProp() + "px"});

    return sliderBar;
}

function addCss(element, css) {
    for (var cssAttr in css) {
        element.style[cssAttr] = css[cssAttr];
    }
}

function getSliderBarTopProp() {
    var fullScreenTitleHeight = 0;

    var fullScreenTitle = document.getElementsByClassName("ytp-title")[0];
    if (fullScreenTitle && fullScreenTitle.offsetParent) {
        fullScreenTitleHeight = fullScreenTitle.offsetHeight;
    }

    var videoTop = getVideo().getBoundingClientRect().top;
    var headerBoundingBox = 
        (document.getElementById("masthead-positioner") || document.getElementById("masthead-container")).getBoundingClientRect();
    var headerTop = headerBoundingBox.top;
    var headerHeight = headerBoundingBox.height;

    var overlap = (headerHeight + headerTop > 0) ? Math.max(0, headerHeight - videoTop) : 0;

    return Math.max(fullScreenTitleHeight, overlap);
}


// trigger when navigating to new material design page
window.addEventListener("yt-navigate-finish", function () {
    if (window.location.href.includes("/watch?v=")) {
        run();
    }
});

// trigger when navigating to the old page
window.addEventListener("spfdone", function () {
    if (window.location.href.includes("/watch?v=")) {
        run();
    }
});

// trigger when directly loading the page
window.addEventListener("DOMContentLoaded", function () {
    if (window.location.href.includes("/watch?v=")) {
        run();
    }
});

/**
 * Use MutationObserver to cover all edge cases.
 * https://stackoverflow.com/a/39803618
 * 
 * This is to handle the use case where navigation happens but <video> has not been loaded yet. 
 * (In YouTube the contents are loaded asynchronously.)
 */
var observer = new MutationObserver(function() {
    if (getVideo() && getPlayer()) {
        observer.disconnect();
        run();
    }
});

observer.observe(document.body, /* config */ {childList: true, subtree: true});
