let games = JSON.parse(localStorage.getItem("blackjack-games") || "[]");

let game;



let scenes = {
  count: new SceneCount(),
  countEdit: new SceneCountEdit(),
  history: new SceneHistory(),
  picker: new ScenePicker(),
  pickerEdit: new ScenePickerEdit(),
  play: new ScenePlay(),
}
let scene;
setScene(scenes.picker);


function displayScore(score) {
  return score < 0 ? score : ("+" + score)
}

function setScene(newScene) {
  if (scene) scene.stop();
  scene = newScene;
  scene.start();
}

function save() {
  localStorage.setItem("blackjack-games", JSON.stringify(games));
}