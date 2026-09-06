import { Rectangle } from "../math/Rectangle.js";
import { Vector2 } from "../math/Vector2.js";

export function drawHud(renderer, player) {
  const ctx = renderer.ctx;
  drawBar(renderer, new Vector2(120, 20), 200, 18, player.hp.actual / player.hp.max, "green");
  drawBar(renderer, new Vector2(120, 44), 200, 18, player.ammo.actual / player.ammo.max, "blue");
  ctx.fillStyle = "white";
  ctx.font = "12px sans-serif";
  ctx.fillText(`${player.hp.actual}/${player.hp.max}`, 230, 34);
  ctx.fillText(`${player.ammo.actual}/${player.ammo.max}`, 230, 58);
}
function drawBar(renderer, center, w, h, pct, color) {
  const bar = Rectangle.fromCenter(center, w, h);
  renderer.fillRectangle(bar, "black");
  renderer.fillRectangle(bar.scale(Math.max(0, pct), 1), color);
}