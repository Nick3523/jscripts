//Un petit script permettant de scroller jusqu'à bas d'une chaine youtube, pour avoir accès aux vidéos trop anciennes très rapidement !
//Fonctionnel, mais beaucoup d'améliorations à venir (Bouton + fonction)

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
 }

var i = 0

while(i < 50) {
	window.scrollBy(0, window.innerHeight);
	await sleep(1500);
	i = i +1;
}
