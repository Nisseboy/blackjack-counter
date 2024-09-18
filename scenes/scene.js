class Scene {
  constructor(className) {
    this.className = className;
  }
  start() { 
    this.elem = document.getElementsByClassName(`scene ${this.className}`)[0];
    if (!this.elem) return;
    
    this.elem.classList.toggle("hidden", false);
  }
  stop() {    
    if (!this.elem) return;

    this.elem.classList.toggle("hidden", true);
  }
}