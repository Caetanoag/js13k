import { Renderer } from "./canvas/Renderer.js";
import { Player } from "./entities/Player.js";
import { Vector2 } from "./math/Vector2.js";
import { InputManager } from "./misc/InputManager.js";

/**@type {CanvasRenderingContext2D} */
const ctx = document.getElementById("canvas1").getContext('2d');
const renderer = new Renderer(ctx);
renderer.setSize(window.innerWidth, window.innerHeight);
const inputManager = new InputManager();

const entities = [];

const playerInitialPosition = renderer.rect.center;
const playerVelocity = new Vector2(20, 20);
const player1 = new Player(playerInitialPosition, 50, 50, playerVelocity, renderer, entities, {max: 10, actual:10}, inputManager);

entities.push(player1);
function loop() {
  renderer.clear();
  player1.update();
  player1.draw();
  inputManager.update();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop)
