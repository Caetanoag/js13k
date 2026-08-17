export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static zero() {
    return new Vector2(0, 0);
  }
  get length() {
    return Math.hypot(this.x, this.y);
  }
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  scale(sx, sy) {
    this.x *= sx;
    this.y *= sy;
    return this;
  }
  normalized() {
    if (this.length === 0) return Vector2.zero();
    return new Vector2(this.x / this.length, this.y / this.length);
  }
  clone() {
    return new Vector2(this.x, this.y);
  }
  equals(v) {
    return this.x === v.x && this.y === v.y;
  }
}
