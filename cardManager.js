var Grid = document.getElementById('Grid');
var Cards = document.getElementsByClassName('Card');
var heldCards = [];
var testCards = [{
  FName: "TEST",
  LName: "TEST"
}]
for (var i in Cards) {
  i.setAttribute(draggable, true);
}

function generateNewCard() {

}