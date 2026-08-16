import { Vector2 } from "./Vector2.js";

export class Rectangle {
  constructor(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
  }
  get center() {
    const { x, y } = this.position;
    return new Vector2(x + this.width / 2, y + this.height / 2);
  }
  scale(sx, sy) {
    return new Rectangle(this.position, this.width * sx, this.height * sy);
  }
}
