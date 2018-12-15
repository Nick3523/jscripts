function CopyLinks() {

	var allowed = ["uptobox","1fichier"]
	var array = [];
	var links = document.links;

	for(var i=0; i<links.length; i++) {
	var element = links[i].href;
		for(var j=0; j<allowed.length; j++) {
			if(element.includes(allowed[j])) {
			  array.push(element+"\n");
			   break;
			}
		}
	}

  array = array.sort();	
  var el = document.createElement('textarea');
  el.value = array.toString().replace(/,/g, "");
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert("Liens copiés dans le presse-papier !");
}


//Création du bouton
var footer = document.getElementsByClassName("actionBar-set actionBar-set--external")[0]
var btn = document.createElement("BUTTON");
var t = document.createTextNode("Copy Links");
btn.addEventListener('click', CopyLinks);
btn.appendChild(t);
footer.appendChild(btn);