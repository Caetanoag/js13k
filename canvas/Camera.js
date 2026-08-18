import { Rectangle } from "../math/Rectangle.js";
import { Vector2 } from "../math/Vector2.js";
export class Camera {
  constructor(player, screenWidth, screenHeight) {
    this.player = player;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    const cx = player.position.x + player.width / 2;
    const cy = player.position.y + player.height / 2;

    this.position = new Vector2(cx - screenWidth / 2, cy - screenHeight / 2);
    this.target = this.position.clone();
    this.smoothness = 0.05;
  }
  get worldRect() {
    return new Rectangle(
      this.position.clone(),
      this.screenWidth,
      this.screenHeight,
    );
  }
  follow() {
    const cx = this.player.position.x + this.player.width / 2;
    const cy = this.player.position.y + this.player.height / 2;
    this.target.x = cx - this.screenWidth / 2;
    this.target.y = cy - this.screenHeight / 2;
  }
  update() {
    this.position.x += (this.target.x - this.position.x) * this.smoothness;
    this.position.y += (this.target.y - this.position.y) * this.smoothness;
  }
  apply(renderer) {
    renderer.ctx.save();
    renderer.ctx.translate(-this.position.x, -this.position.y);
  }
  restore(renderer) {
    renderer.ctx.restore();
  }
}
