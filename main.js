import { Camera } from "./canvas/Camera.js";
import { Renderer } from "./canvas/Renderer.js";
import { Player } from "./entities/Player.js";
import { Vector2 } from "./math/Vector2.js";
import { InputManager } from "./misc/InputManager.js";

/**@type {CanvasRenderingContext2D} */
const ctx = document.getElementById("canvas1").getContext("2d");
const renderer = new Renderer(ctx);
renderer.setSize(window.innerWidth, window.innerHeight);
const inputManager = new InputManager();

const entities = [];

const playerInitialPosition = renderer.rect.center;
const playerVelocity = new Vector2(20, 20);
const player1 = new Player(
  playerInitialPosition,
  50,
  50,
  playerVelocity,
  renderer,
  entities,
  { max: 10, actual: 10 },
  inputManager,
);
const camera = new Camera(player1, renderer.width, renderer.height);
entities.push(player1);

function loop() {
  camera.follow();
  camera.update();
  const worldRect = camera.worldRect;
  player1.update(worldRect);
  renderer.clear();
  camera.apply(renderer);
  player1.draw();
  camera.restore(renderer);
  inputManager.update();

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
