class Scene {
  constructor() {

  }
  start() { 
    this.elem = document.getElementsByClassName(`scene normal`)[0];
    if (!this.elem) return;

    this.elem.classList.toggle("hidden", false);
  }
  stop() {    
    if (!this.elem) return;
    this.elem.classList.toggle("hidden", true);
  }
}