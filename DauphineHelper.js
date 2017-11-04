// ==UserScript==
// @name         Dauphine Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Pourquoi attendre ?
// @author       You
// @match        https://passeport.dauphine.fr/*
// @grant        none
// ==/UserScript==


if ( window.location.href.substring(0,35).indexOf("passeport.dauphine.fr") > 0  ) {

setTimeout(function(){ document.querySelector("#fm1 > section.row.btn-row > input.btn-submit").click();
 }, 1000);
}

