class SceneHistory extends Scene {
  constructor() {
    super("history");
  }

  start() {
    super.start();
    if (!this.elem) return;

    this.elem.replaceChildren();

    let titleElem = document.createElement("div");
    titleElem.className = "title";
    titleElem.innerText = game.name;


    let dealerElem = document.createElement("div");
    dealerElem.className = "person dealer";
    let dealerElemName = document.createElement("div");
    dealerElemName.className = "name";
    dealerElemName.innerText = game.dealer.name;
    let dealerElemScore = document.createElement("div");
    dealerElemScore.className = `score${game.dealer.score == 0 ? "" : (game.dealer.score > 0 ? " positive" : " negative")}`;
    dealerElemScore.innerText = displayScore(game.dealer.score);
    dealerElem.appendChild(dealerElemName);
    dealerElem.appendChild(dealerElemScore);


    this.elem.appendChild(titleElem);
    this.elem.appendChild(dealerElem);


    let players = game.players;
    for (let pi = 0; pi < players.length; pi++) {
      let p = players[pi];

      let elem = document.createElement("div");
      elem.className = "person";

      let elemName = document.createElement("div");
      elemName.className = "name";
      elemName.innerText = p.name;

      elem.appendChild(elemName);
      for (let i = 0; i < p.history.length; i++) {
        let s = parseFloat(p.history[i]);
        
        let elemScore = document.createElement("div");
        elemScore.className = `score${s == 0 ? "" : (s > 0 ? " positive" : " negative")}`;
        elemScore.innerText = displayScore(s);
        elem.appendChild(elemScore);
      }


  
  
      this.elem.appendChild(elem);
    }
  }
}