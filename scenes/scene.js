class Scene {
  constructor() {

  }
  start() { 
    this.elem = document.getElementsByClassName(`scene`)[0];
    if (!this.elem) return;

    this.elem.replaceChildren();
  }
  stop() {    
    if (!this.elem) return;
  }
}