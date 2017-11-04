// ==UserScript==
// @name         GoogleHelper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Selectionner avec les touches du clavier, par un flémmard pour les flémmards !
// @author       Meghly
// @include         https://*.google.*
// @include         http://*.google.*
// @grant        none
// ==/UserScript==



var i = 1;
var save = i;
var oldone = null;
//i Pointe vers le prochain élément à séléctionner si on descends, save pointe vers l'élément actuel

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow

    document.querySelector("#rso > div > div > div:nth-child("+i+") > div > div > h3 > a").style.color = "red";
        oldone = document.querySelector("#rso > div > div > div:nth-child("+save+") > div > div > h3 > a").style.color = "blue";;

    if (i >= 2) { save=i; i--; }

    }

    else if (e.keyCode == '40') {
        // down arrow
    document.querySelector("#rso > div > div > div:nth-child("+i+") > div > div > h3 > a").style.color = "red";
    oldone = document.querySelector("#rso > div > div > div:nth-child("+save+") > div > div > h3 > a").style.color = "blue";;
    save=i;
    i++;



    }

    else if (e.keyCode == '13') {

    //Ouvrir le lien, touche entrée

    document.querySelector("#rso > div > div > div:nth-child("+save+") > div > div > h3 > a").click();

    }


}

document.onkeydown = checkKey;
