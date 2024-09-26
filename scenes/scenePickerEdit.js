class ScenePickerEdit extends Scene {
  constructor() {
    super();
  }

  start() {
    super.start();
    if (!this.elem) return;

    let elemBack = document.createElement("button");
    elemBack.className = "name back";
    elemBack.innerText = "<";
    elemBack.addEventListener("click", e => {
      setScene(scenes.picker);
    });
    this.elem.appendChild(elemBack);

    for (let gi = 0; gi < games.length; gi++) {
      let g = games[gi];
      
      let elem = document.createElement("div");
      elem.className = "game";

      
      let elemRemove = document.createElement("button");
      elemRemove.className = "edit-action negative";
      elemRemove.innerText = "X";
      elemRemove.addEventListener("click", e => {
        games.splice(gi, 1);
        this.start();

        save();
      });
      
      let elemUp = document.createElement("button");
      elemUp.className = "edit-action";
      elemUp.innerText = "↑";
      elemUp.addEventListener("click", e => {
        if (gi == 0) return;

        games[gi] = games[gi - 1];
        games[gi - 1] = g;

        this.start();

        save();
      });
      
      let elemDown = document.createElement("button");
      elemDown.className = "edit-action";
      elemDown.innerText = "↓";
      elemDown.addEventListener("click", e => {
        if (gi == games.length - 1) return;

        games[gi] = games[gi + 1];
        games[gi + 1] = g;

        this.start();

        save();
      });

      let elemName = document.createElement("input");
      elemName.className = "name";
      elemName.value = g.name;

      elemName.addEventListener("change", e => {
        g.name = elemName.value;
        save();
      });

      elem.appendChild(elemRemove);
      elem.appendChild(elemUp);
      elem.appendChild(elemDown);
      elem.appendChild(elemName);
  
  
      this.elem.appendChild(elem);
      
    }

    let elem = document.createElement("div");
    elem.className = "game";

    let elemName = document.createElement("button");
    elemName.className = "name";
    elemName.innerText = "+";

    elemName.addEventListener("click", e => {
      let dealer = {name: prompt("dealer name?"), score: 0}
      if (!dealer.name) return;
      
      let g = {
        name: new Date().getDate() + "/" + (new Date().getMonth() + 1) + " " + new Date().getHours() + ":" + new Date().getMinutes() + " " + dealer.name,
        dealer: dealer,
        players: [],
      }
      games.push(g);
      save();
    
      game = g;
      setScene(scenes.count);
    });

    elem.appendChild(elemName);
  
    this.elem.appendChild(elem);
  }
}