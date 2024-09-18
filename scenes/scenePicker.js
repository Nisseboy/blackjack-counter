class ScenePicker extends Scene {
  constructor() {
    super("picker");
  }

  start() {
    super.start();
    if (!this.elem) return;

    this.elem.replaceChildren();


    for (let g of games) {
      let elem = document.createElement("div");
      elem.className = "game";

      let elemName = document.createElement("button");
      elemName.className = "name";
      elemName.innerText = g.name;

      elemName.addEventListener("click", e => {
        game = g;
        setScene(scenes.count);
      });

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