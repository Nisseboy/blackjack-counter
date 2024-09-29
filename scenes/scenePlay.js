class ScenePlay extends Scene {
  constructor() {
    super();
    
    this.elem = document.getElementsByClassName("scene play")[0];

    let elemShuffle = document.createElement("button");
    elemShuffle.innerText = "Shuffle";
    elemShuffle.addEventListener("click", e => {
      this.shuffle();
    })
    this.elem.appendChild(elemShuffle);

    let elemClear = document.createElement("button");
    elemClear.innerText = "Clear";
    elemClear.addEventListener("click", e => {
      this.clear();
    })
    this.elem.appendChild(elemClear);

    this.elemCount = document.createElement("button");
    this.elemCount.innerText = "52";
    this.elem.appendChild(this.elemCount);

    this.deckCard = this.createCard("5S");
    this.deckCard.elem.classList.add("deck");

    this.deck = [];
    this.shuffleCards();


  }

  start() {
    if (!this.elem) return;
    this.elem.classList.toggle("hidden", false);
  }

  createCard(value, x = 10, y = 60) {
    let card = {};

    let elem = document.createElement("img");
    elem.className = "card";
    elem.src = `https://deckofcardsapi.com/static/img/${value}.png`;
    elem.draggable = false;

    let relx = 0;
    let rely = 0;
    let dragstart = e => {
      relx = e.clientX - card.x;
      rely = e.clientY - card.y;

      document.addEventListener("mousemove", dragover);
      document.addEventListener("mouseup", dragend);
      document.addEventListener("touchmove", dragover);
      document.addEventListener("touchend", dragend);

      if (elem.classList.contains("deck")) {
        card = this.createCard(this.pickCard(), card.x, card.y);
        relx = e.clientX - x;
        rely = e.clientY - y;
        this.elemCount.innerText = this.cards?.length + "";
        if (this.cards.length == 12) alert("12 cards left");
      }
    }
    let dragover = e => {
      this.setPos(card, e.clientX - relx, e.clientY - rely);
    }
    let dragend = e => {
      document.removeEventListener("mousemove", dragover);
      document.removeEventListener("mouseup", dragend);
      document.removeEventListener("touchmove", dragover);
      document.removeEventListener("touchend", dragend);
    }

    elem.addEventListener("mousedown", dragstart);
    elem.addEventListener("touchstart", dragstart);

    card.elem = elem;
    card.x = 0;
    card.y = 0;

    this.setPos(card, x, y);

    this.elem.appendChild(elem);

    return card;
  }

  setPos(card, x, y) {
    card.x = x;
    card.y = y;
    card.elem.style.left = card.x + "px";
    card.elem.style.top = card.y + "px";
  }


  pickCard() {
    if (!this.cards) this.cards = ["asf"]
    if (this.cards.length == 0) this.shuffle();

    let i = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(i, 1)[0];
  }
  shuffleCards() {
    this.cards = [];
    for (let i = 0; i < 4; i++) {
      let color = ["S","H","D","C"][i]
      for (let j = 0; j < 13; j++) {
        let val = [2,3,4,5,6,7,8,9,0,"J","Q","K","A"][j]
        this.cards.push(val + color);
      }
    }
    this.elemCount.innerText = this.cards?.length + "";
  }

  clear() {
    let cards = this.elem.getElementsByClassName("card");
    for (let i = 0; i < cards.length;) {
      if (!cards[i].classList.contains("deck")) cards[i].remove();
      else i++;
    }

    console.log(this.cards?.length);
  }

  shuffle() {
    this.clear();
    this.shuffleCards();
  }
}