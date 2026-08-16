import { Rectangle } from "../math/Rectangle.js";
import { Vector2 } from "../math/Vector2.js";

export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
    this.setSize(this.canvas.width, this.canvas.height);
  }
  setSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.height = height;
    this.width = width;

    this.rect = new Rectangle(Vector2.zero(), this.width, this.height);
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  fillRectangle(rect, color) {
    const { x, y } = rect.position;
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, rect.width, rect.height);
    this.ctx.restore();
  }
  strokeRectangle(rect, color) {
    const { x, y } = rect.position;
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(x, y, rect.width, rect.height);
    this.ctx.restore();
  }
}
