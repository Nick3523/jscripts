// ==UserScript==
// @name         OmxPlayerHelper
// @version      1
// @description  Permet de copier coller sans se fatiguer !
// @author       Lyes
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @icon https://cdn6.aptoide.com/imgs/a/3/5/a3536b3a09656d18e0bc5d0f47fab25c_icon.png?w=240
// ==/UserScript==

function go() {
    start();
    removeframe();
}

window.addEventListener('spfdone', go, false);
window.addEventListener('DOMContentLoaded', go, false);
window.addEventListener('yt-navigate-finish', go, false);

function start() {
    function isMaterial() {
        var temp;
        temp = document.querySelector("ytd-app, [src*='polymer'],link[href*='polymer']");
        if (!temp) { // old UI
            temp = document.createElement("template");
            temp.innerHTML = //
                `<div id='material-notice' style='border-radius:2px;color:#FFF;padding:10px;background-color:#ff0000;box-shadow:0 0 3px rgba(0,0,0,.5);font-size:18px;position:fixed;bottom:20px;right:50px;z-index:99999'>
				<strong><ins>WARNING : </ins></strong>Best Video Downloader 2 is <B>Only compatible with the new YouTube Material Layout</B><br>
				<a href='https://youtube.com/new' target='_blank' style='font-weight:bold;'>Click here</a> to activate the new YouTube Material Layout.<br>
				<br/><br/>
				<span id='close' onclick='document.getElementById("material-notice").remove(); return false;' align='center' STYLE='display:block;width:100px;height: 100%;margin: 0 auto;'><strong><ins><a href=""> [X] CLOSE </a></ins></strong></span>
				</div>`;
            document.documentElement.appendChild(temp.content.firstChild);
            document.documentElement.removeAttribute("data-user_settings");
            return true;
        }
    }
    isMaterial();
    var lasturl = "";

    function check() {
        if (location.href == lasturl) return;
        lasturl = location.href;
        if (lasturl.indexOf("watch?v=")) removeframe();
    }
    setInterval(check, 1000);

    function removeframe() {
        var frm_div = document.getElementById('EXT_DIV');
        if (frm_div) {
            frm_div.parentElement.removeChild(frm_div);
        }
    }

    bvd2_btn_onclick = function() {

        var textArea = document.createElement("textarea");
        textArea.value = "omxplayer $(youtube-dl -g -f best " + window.location+")";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("Copy");
        //alert("Copied the text: " + textArea.value);

    };

    getSpan = function(text, className) {
        var _tn = document.createTextNode(text);
        var span = document.createElement("span");
        span.className = className;
        span.appendChild(_tn);
        return span;
    };

    createButton = function() {
        var obj = document.querySelector('#top-row>#subscribe-button');
        if (obj !== null) {
            // check if the button has already been created
            var btnRow = document.getElementById('bestvd2');
            if (btnRow === null) {
                var bestvd2 = document.createElement("div");
                bestvd2.id = "bestvd2";
                bestvd2.className = "style-scope";

                var bvd2_btn = document.createElement("div");
                bvd2_btn.className = "style-scope bvd2_btn";

                bvd2_btn.style = "background-color: red; border: 2px solid red; border-radius: 2px; color: white; padding: 0px 15px; font-size: 14px; cursor: pointer; height: 33px; margin-right: 7px; margin-top: -1px; line-height: 32px; font-weight: 500; display: inline-block;";

                bvd2_btn.appendChild(getSpan("OMXMe!", ""));
                bvd2_btn.onclick = bvd2_btn_onclick;

                obj.parentNode.insertBefore(bestvd2, obj);
                bestvd2.appendChild(bvd2_btn);
            }
        }
    };

    function addiframe(src, height) {
        try {
            var pegPlace = document.getElementById('watch-description');
            if (pegPlace === null) {
                pegPlace = document.getElementById('playnav-video-details');
                if (pegPlace === null)
                    pegPlace = document.getElementById('watch7-action-panels');
                if (pegPlace === null)
                    pegPlace = document.getElementById('watch8-secondary-actions');
            }
            var iframe = document.getElementById('EXT_FRAME');
            if (iframe === null) {
                div = CreateIframeDiv(height);
                iframe = CreateIframe(height);
                div.appendChild(iframe);
                ele = document.querySelector('#main>#info');
                ele.parentNode.insertBefore(div, ele.nextSibling);
            }
            src += '&type=Download';
            src += '';
            iframe.setAttribute("src", src);
        } catch (err) {
            console.log(err);
        }
    }

    function CreateIframe(height) {
        iframe = document.createElement('iframe');
        iframe.setAttribute("id", "EXT_FRAME");
        iframe.setAttribute("width", "640px");
        iframe.setAttribute("height", height);
        iframe.setAttribute("border", "0");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("style", "border: 0 none;");
        iframe.setAttribute("sandbox", "allow-scripts allow-popups allow-same-origin");
        return iframe;
    }

    function CreateIframeDiv(height) {
        var div = document.createElement('div');
        div.setAttribute("id", "EXT_DIV");
        div.style.width = '640px';
        div.style.margin = '50px 0px 5px 0px';
        div.style.padding = '0px';
        div.style.height = '90px';
        div.style.overflow = 'visible';
        return div;
    }
    var intervalCheck = setInterval(function() {
        createButton();
    }, 250);
}
