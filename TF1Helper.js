// ==UserScript==
// @name         TF1HELPER
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Meghly
// @match        https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
// @grant        none
// @include      http*://*.tf1.fr/*
// @include      http*://tf1.fr/*
// @include      http*://*.lcp.fr/*
// @include      http*://lcp.fr/*
// ==/UserScript==




//Vérifier que je suis bien dans une bonne URL

if ( window.location.href.substring(0,25).indexOf("tf1.fr") > 0 || window.location.href.substring(0,25).indexOf("lcp.fr") > 0 ) {


//Obtention ID

var id = document.getElementById("content_video").getAttribute("data-watid").toString();

var id_first =  id.slice(4,6); //Pemière partie de l'id qui se répète

var id_second = id.slice(-2); //

//Fin btention ID

//Début traitement de text :

var base ="http://dnl.adv.tf1.fr/2/USP-0x0/";

var best1 = base.concat(id_first).concat("/").concat(id_second).concat("/").concat(id).concat("/ssm/").concat(id).concat("-2500-64k.mp4");


var best2 = base.concat(id_first).concat("/").concat(id_second).concat("/").concat(id).concat("/ssm/").concat(id).concat("-1800-64k.mp4");

var best3 = base.concat(id_first).concat("/").concat(id_second).concat("/").concat(id).concat("/ssm/").concat(id).concat("-1200-64k.mp4");


var best4 = base.concat(id_first).concat("/").concat(id_second).concat("/").concat(id).concat("/ssm/").concat(id).concat("-600-64k.mp4");


var best5 = base.concat(id_first).concat("/").concat(id_second).concat("/").concat(id).concat("/ssm/").concat(id).concat("-400-64k.mp4");

//Ajout du bouton :


var parentButton = document.createElement("div");

        parentButton.className = "yt-uix-button yt-uix-button-default";
        parentButton.id = "parentButton";

        parentButton.style.height = "23px";
        parentButton.style.marginLeft = "120px";
        parentButton.style.paddingBottom = "1px";


        document.querySelector("#program_nav > nav").appendChild(parentButton);

        var childButton = document.createElement("a");
        childButton.appendChild(document.createTextNode("Votre Lien BG"));



        var att = document.createAttribute("href");        // Create a "href" attribute
		att.value = best1;            // Set the value of the href attribute




        childButton.setAttributeNode(att);
        childButton.className = "yt-uix-button-content";

        childButton.style.lineHeight = "75px";
        childButton.style.fontSize = "25px";
        childButton.style.color = "#0f0";
		childButton.style.textAlign = "center";
        parentButton.appendChild(childButton);
}