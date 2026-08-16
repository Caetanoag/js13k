import { Vector2 } from "./Vector2.js";

export class Rectangle {
  constructor(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
  }
  get left() {
    return this.position.x;
  }
  get right() {
    return this.position.x + this.width;
  }
  get top() {
    return this.position.y;
  }
  get bottom() {
    return this.position.y + this.height;
  }
  get center() {
    return new Vector2(
      this.right - this.width / 2,
      this.bottom - this.height / 2,
    );
  }
  scale(sx, sy) {
    return new Rectangle(this.position, this.width * sx, this.height * sy);
  }
  intersects(other) {
    return (
      this.left <= other.right &&
      other.left <= this.right &&
      this.top <= other.bottom &&
      other.top <= this.bottom
    );
  }
  isInside(other) {
    return (
      this.left >= other.left &&
      this.right <= other.right &&
      this.top >= other.top &&
      this.bottom <= other.bottom
    );
  }
}
