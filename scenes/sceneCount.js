class SceneCount extends Scene {
  constructor() {
    super();
  }

  start() {
    super.start();
    if (!this.elem) return;

    this.elem.replaceChildren();

    if (!game) return;

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

      let elemScore = document.createElement("div");
      elemScore.className = `score${p.score == 0 ? "" : (p.score > 0 ? " positive" : " negative")}`;
      elemScore.innerText = displayScore(p.score);

      let elemBet = document.createElement("input");
      elemBet.className = "bet";
      elemBet.type = "number";
      elemBet.value = p.bet || 0;
      let elemBetFunc = e => {
        p.bet = parseFloat(elemBet.value);

        save();
        let other = this.elem?.getElementsByClassName("bet");
        if (!other || other.length == pi + 1) return;
        

        other[pi + 1].focus();
        other[pi + 1].select();
      }
      elemBet.addEventListener("change", elemBetFunc);

      let elemDouble = document.createElement("button");
      elemDouble.className = "mult";
      elemDouble.innerText = "x2";
      elemDouble.addEventListener("click", e => {
        elemBet.value = "" + (parseFloat(elemBet.value) * 2);
        p.bet *= 2;

        save();
      })
      let elemBJ = document.createElement("button");
      elemBJ.className = "mult";
      elemBJ.innerText = "x1.5";
      elemBJ.addEventListener("click", e => {
        elemBet.value = "" + (parseFloat(elemBet.value) * 1.5);
        p.bet *= 1.5;

        save();
      })
      
      let elemWin = document.createElement("button");
      elemWin.className = "outcome positive";
      elemWin.innerText = "win";
      elemWin.addEventListener("click", e => {
        p.score += p.bet || 0;
        game.dealer.score = game.players.reduce((partialSum, a) => partialSum - a.score, 0);
        p.history.push(displayScore(p.bet));
        p.bet = 0;
        this.start();

        save();
      })
      let elemPush = document.createElement("button");
      elemPush.className = "outcome";
      elemPush.innerText = "push";
      elemPush.addEventListener("click", e => {
        p.bet = 0;
        this.start();

        save();
      })
      let elemLose = document.createElement("button");
      elemLose.className = "outcome negative";
      elemLose.innerText = "lose";
      elemLose.addEventListener("click", e => {
        p.score -= p.bet || 0;
        game.dealer.score = game.players.reduce((partialSum, a) => partialSum - a.score, 0);
        p.history.push(displayScore(p.bet * -1));
        p.bet = 0;
        this.start();
        

        save();
      })


      elem.appendChild(elemName);
      elem.appendChild(elemScore);
      elem.appendChild(elemBet);
      elem.appendChild(elemDouble);
      elem.appendChild(elemBJ);
      elem.appendChild(elemWin);
      elem.appendChild(elemPush);
      elem.appendChild(elemLose);
  
  
      this.elem.appendChild(elem);
    }

    let elem = document.createElement("div");
    elem.className = "person";

    let elemName = document.createElement("button");
    elemName.className = "name";
    elemName.innerText = "✎";

    elemName.addEventListener("click", e => {
      setScene(scenes.countEdit);
    });

    elem.appendChild(elemName);
  
    this.elem.appendChild(elem);
  }
}