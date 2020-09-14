const fs = require('fs');
const path = require('path');
var Grid = document.getElementById('Grid');
var CardHolder = document.getElementById("heldCards");
var CardHolderContainer = document.getElementById("cardHolder");
var Cards = JSON.parse(fs.readFileSync(__dirname + "/cards.json"));
var cardPreviewHidden = false;

CardHolderContainer.addEventListener("dragover", dragOver)
CardHolderContainer.addEventListener("drop", drop)
CardHolderContainer.addEventListener("dragenter", dragEnter)
CardHolderContainer.addEventListener("dragleave", dragLeave)
Grid.addEventListener("dragover", dragOver)
Grid.addEventListener("drop", drop)
Grid.addEventListener("dragenter", dragEnter)
Grid.addEventListener("dragleave", dragLeave)

function generateShownCard(cardData) {
  var output = document.createElement("div");
  output.setAttribute("class", "Card");
  output.setAttribute("data-UUID", cardData.UUID);
  var cardContent = document.createElement("div");
  cardContent.setAttribute("class", "cardContent");
  var cardHeader = document.createElement("div");
  cardHeader.setAttribute("class", "cardHeader")
  var cardName = document.createElement("div");
  cardName.setAttribute("class", "cardName");
  output.appendChild(cardContent);
  output.appendChild(cardHeader);
  output.appendChild(cardName);
  cardName.innerHTML = cardData.FName + " " + cardData.LName;
  output.setAttribute("draggable", true)
  //drag and drop stuff
  output.addEventListener("dragstart", dragStart);
  Grid.appendChild(output)
}


function generateHeldCard(cardData) {
  var output = document.createElement("div");
  output.setAttribute("class", "HeldCard");
  output.setAttribute("data-UUID", cardData.UUID);
  var cardPreview = document.createElement("div");
  cardPreview.setAttribute("class", "cardPreview");
  var cardName = document.createElement("div");
  cardName.setAttribute("class", "cardName");
  output.appendChild(cardPreview);
  output.appendChild(cardName);
  cardName.innerHTML = cardData.FName + " " + cardData.LName;
  output.setAttribute("draggable", true)
  //drag and drop stuff
  output.addEventListener("dragstart", dragStart);
  CardHolder.appendChild(output)
}

function dragStart(e) {
  event.dataTransfer.setData("text", e.target.getAttribute("data-UUID"))
}

function dragOver(e) {
  event.preventDefault();
}

function drop(e) {
  e.target.classList.remove("droppable-hover");
  event.preventDefault();

  if (e.target.getAttribute("id") == "Grid") {
    var card = filterValue(Cards.held, "UUID", e.dataTransfer.getData("text"))
    removeHeldCard(card.UUID)
    removeShownCard(card.UUID)
    Cards.shown.push(card)
    generateShownCard(card)
  } else {
    var card = filterValue(Cards.shown, "UUID", e.dataTransfer.getData("text"));
    removeHeldCard(card.UUID)
    removeShownCard(card.UUID)
    Cards.held.push(card);
    generateHeldCard(card);
  }
}

for (i in Cards.held) {
  generateHeldCard(Cards.held[i])
}

for (i in Cards.shown) {
  generateShownCard(Cards.shown[i])
}

function removeHeldCard(UUID) {
  var heldCards = document.getElementsByClassName("HeldCard");
  Array.prototype.forEach.call(heldCards, card => {
    if (card.getAttribute("data-UUID") == UUID) {
      card.remove();
    }
  })
}

function removeShownCard(UUID) {
  shownCards = document.getElementsByClassName("Card");
  Array.prototype.forEach.call(shownCards, card => {
    if (card.getAttribute("data-UUID") == UUID) {
      card.remove();
    }
  })
}

function dragEnter(e) {
  e.target.classList.add("droppable-hover");
}

function dragLeave(e) {
  e.target.classList.remove("droppable-hover");
}


function filterValue(obj, key, value) {
  return obj.find(function(v) {
    return v[key] === value
  });
}

function toggleCardPreviews() {
  if (cardPreviewHidden) {
    CardHolder.className = "";
  } else {
    CardHolder.className = "hidden";
  }

  console.log(CardHolderContainer.className)
  cardPreviewHidden = !cardPreviewHidden;

}