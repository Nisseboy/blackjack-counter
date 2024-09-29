class SceneCountEdit extends Scene {
  constructor() {
    super();
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
    let dealerElemName = document.createElement("input");
    dealerElemName.className = "name";
    dealerElemName.value = game.dealer.name;
    dealerElemName.addEventListener("change", e => {
      game.dealer.name = dealerElemName.value;

      save();
    });
    dealerElem.appendChild(dealerElemName);


    this.elem.appendChild(titleElem);
    this.elem.appendChild(dealerElem);


    let players = game.players;
    for (let pi = 0; pi < players.length; pi++) {
      let p = players[pi];

      let elem = document.createElement("div");
      elem.className = "person";

      let elemRemove = document.createElement("button");
      elemRemove.className = "negative";
      elemRemove.innerText = "X";
      elemRemove.addEventListener("click", e => {
        players.splice(pi, 1);
        this.start();

        save();
      });
      
      let elemUp = document.createElement("button");
      elemUp.innerText = "↑";
      elemUp.addEventListener("click", e => {
        if (pi == 0) return;

        players[pi] = players[pi - 1];
        players[pi - 1] = p;

        this.start();

        save();
      });
      
      let elemDown = document.createElement("button");
      elemDown.innerText = "↓";
      elemDown.addEventListener("click", e => {
        if (pi == players.length - 1) return;

        players[pi] = players[pi + 1];
        players[pi + 1] = p;

        this.start();

        save();
      });

      let elemName = document.createElement("input");
      elemName.className = "name";
      elemName.value = p.name;
      
      elemName.addEventListener("change", e => {
        p.name = elemName.value;
        save();
      });


      elem.appendChild(elemRemove);
      elem.appendChild(elemUp);
      elem.appendChild(elemDown);
      elem.appendChild(elemName);
  
  
      this.elem.appendChild(elem);
    }

    let elem = document.createElement("div");
    elem.className = "person";

    let elemName = document.createElement("button");
    elemName.className = "name";
    elemName.innerText = "+";

    elemName.addEventListener("click", e => {
      let name = prompt("name?");
      if (!name) return;
      
      let p = {
        name: name,
        score: 0,
        bet: 0,
        history: [],
      }
      game.players.push(p);
      
      save();

      this.start();
    });

    elem.appendChild(elemName);
  
    this.elem.appendChild(elem);
  }
}