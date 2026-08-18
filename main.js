import { Camera } from "./canvas/Camera.js";
import { Renderer } from "./canvas/Renderer.js";
import { Player } from "./entities/Player.js";
import { Vector2 } from "./math/Vector2.js";
import { InputManager } from "./misc/InputManager.js";

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d");
const renderer = new Renderer(ctx);
renderer.setSize(window.innerWidth, window.innerHeight);
const inputManager = new InputManager(canvas);

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
  player1.update(camera.worldRect);
  renderer.clear();
  camera.apply(renderer);
  drawGrid(renderer, camera.worldRect);
  player1.draw();
  camera.restore(renderer);
  inputManager.update();

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

function drawGrid(renderer, worldRect, tileSize = 1000) {
  const startCol = Math.floor(worldRect.position.x / tileSize);
  const startRow = Math.floor(worldRect.position.y / tileSize);
  const cols = Math.ceil(worldRect.width / tileSize) + 1;
  const rows = Math.ceil(worldRect.height / tileSize) + 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const worldX = (startCol + col) * tileSize;
      const worldY = (startRow + row) * tileSize;

      const isBlack = (startCol + col + startRow + row) % 2 === 0;
      const color = isBlack ? "black" : "white";

      renderer.fillRectangle(
        {
          position: { x: worldX, y: worldY },
          width: tileSize,
          height: tileSize,
        },
        color,
      );
    }
  }
}
