//factions = {"idona":{id, name, short, long, [spread]}}
//deck = [{suit, card, meaning, reversed}]; drawCard() returns obj
const positions = {
  "idona":[{"x":"180","y":"155"}],"asmus":[{"x":"180","y":"49"},{"x":"272","y":"221"},{"x":"88","y":"221"}],"stel":[{"x":"332","y":"155"},{"x":"230","y":"155"},{"x":"128","y":"155"},{"x":"26","y":"155"}],"nizari":[{"x":"156","y":"69"},{"x":"218","y":"155"},{"x":"176","y":"241"},{"x":"114","y":"155"}],"veras":[{"x":"262","y":"16"},{"x":"344","y":"155"},{"x":"262","y":"294"},{"x":"98","y":"294"},{"x":"16","y":"155"},{"x":"98","y":"16"},{"x":"180","y":"155"}],"attra":[{"x":"344","y":"109"},{"x":"324","y":"201"},{"x":"231","y":"59"},{"x":"231","y":"251"},{"x":"129","y":"59"},{"x":"129","y":"251"},{"x":"26","y":"59"},{"x":"26","y":"251"}],"ralis":[{"x":"180","y":"155"},{"x":"155","y":"262"},{"x":"311","y":"49"},{"x":"311","y":"261"},{"x":"49","y":"261"},{"x":"49","y":"49"}]
} //{ "asmus": [ {x,y}, {x,y}, {x,y} ] }

let spread = "asmus"; //TODO: URL encode
let cardsDrawn = 0;

const drawIntoSpread = function () {
  console.log("Drawing into: "+spread);
  for( i = 0; i < positions[spread].length; i++ ) {
    let draw = drawCard();
    if( Math.random() > 0.5 ) draw.flip = true;
    console.log(draw.card + ((draw.flip) ? " (REVERSED)" : ""));
    let offset = positions[spread][i];
    $("#spread").append(`<img id="draw${(i+1)}" class="unflipped" src="./images/cards/${draw.suit}.png" style="position: absolute; left: ${offset.x}px; top: ${offset.y}px${ (draw.flip) ? "; rotate: 180deg" : "" }">`);
    $("#reading").append(`<li id="question${(i+1)}">${factions[spread]["spread"][i]}
    <ul><li id="meaning${(i+1)}" class="unflipped"><b>${draw.card} ${(draw.flip) ? "(REVERSED)" : ""}</b><br>${(draw.flip) ? draw.reversed : draw.meaning}</li></ul></li><br>`);
  }
}

//combine this & spread instead of generating all at once and then revealing
const placeCard = function () {
  if(cardsDrawn < positions[spread].length) {
    cardsDrawn++;
    console.log("Drawing card "+cardsDrawn);
    $("#draw"+cardsDrawn).removeClass("unflipped");
    $("#meaning"+cardsDrawn).removeClass("unflipped");  
  } else console.log("All cards drawn.");

}

const hoverCard = function (drawEvent) {
  $("#question"+drawEvent.target.id.substring(4,5)).toggleClass("currentCard");
}

$("#faction").prepend(factions[spread]["name"]+" ");

drawIntoSpread();
$("#drawButton").on("click", placeCard)
$("#spread > img").on( "mouseenter mouseleave", function(e) {hoverCard(e)});