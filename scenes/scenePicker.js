class ScenePicker extends Scene {
  constructor() {
    super("picker");
  }

  start() {
    super.start();
    if (!this.elem) return;

    this.elem.replaceChildren();


    for (let gi = 0; gi < games.length; gi++) {
      let g = games[gi];
      
      let elem = document.createElement("div");
      elem.className = "game";

      
      let elemRemove = document.createElement("button");
      elemRemove.className = "name negative";
      elemRemove.innerText = "X";
      elemRemove.addEventListener("click", e => {
        games.splice(gi, 1);
        this.start();

        save();
      });

      let elemName = document.createElement("button");
      elemName.className = "name";
      elemName.innerText = g.name;

      elemName.addEventListener("click", e => {
        game = g;
        setScene(scenes.count);
      });

      elem.appendChild(elemRemove);
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