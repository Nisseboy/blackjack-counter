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

    this.deckCard = this.createCard("back");
    this.deckCard.elem.classList.add("deck");

    this.deck = [];
    this.count = 0;
    this.shuffleCards();

    this.counter = {elem: document.createElement("div"), x: 0, y: 0};
    this.counter.elem.className = "card counter";
    this.setPos(this.counter, 0, 0);
    this.testProb = true;

    this.elem.appendChild(this.counter.elem);
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
      let pos = e;
      if (e.targetTouches && e.targetTouches[0]) pos = e.targetTouches[0];

      relx = pos.pageX - card.x;
      rely = pos.pageY - card.y;

      document.addEventListener("mousemove", dragover);
      document.addEventListener("mouseup", dragend);
      document.addEventListener("touchmove", dragover);
      document.addEventListener("touchend", dragend);

      if (elem.classList.contains("deck")) {
        card = this.createCard(this.pickCard(), card.x, card.y);
        relx = pos.pageX - 10;
        rely = pos.pageY - 60;
        this.elemCount.innerText = this.cards?.length + "";
      }

      dragover(e);
    }
    let dragover = e => {
      let pos = e;
      if (e.targetTouches && e.targetTouches[0]) pos = e.targetTouches[0];

      this.setPos(card, pos.pageX - relx, pos.pageY - rely);

      if (card.x < this.deckCard.x && card.y < this.deckCard.y) this.testProb = true;
      
      
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

    if (this.testProb) { let i2 = this.cards.findIndex(e => e[0] == "0" || e[0] == "J" || e[0] == "Q" || e[0] == "K" || e[0] == "A"); if (i2 != -1) i = i2; }
    this.testProb = false;
    let card = this.cards.splice(i, 1)[0];

    let v = card[0];
    if (v == "2" || v == "3" || v == "4" || v == "5" || v == "6") this.count++;
    if (v == "0" || v == "J" || v == "Q" || v == "K" || v == "A") this.count--; 

    this.setPos(this.counter, Math.max(this.count, 0) * 10, Math.max(-this.count, 0) * 10);

    return card;
  }
  shuffleCards() {
    this.cards = [];
    this.count = 0;
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
      if (!cards[i].classList.contains("deck") && !cards[i].classList.contains("counter")) cards[i].remove();
      else i++;
    }
  }

  shuffle() {
    this.clear();
    this.shuffleCards();
  }
}