class ScenePicker extends Scene {
  constructor() {
    super();
  }

  start() {
    super.start();
    if (!this.elem) return;


    for (let gi = 0; gi < games.length; gi++) {
      let g = games[gi];
      
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
    elemName.innerText = "✎";

    elemName.addEventListener("click", e => {
      setScene(scenes.pickerEdit);
    });

    elem.appendChild(elemName);
  
    this.elem.appendChild(elem);
  }
}