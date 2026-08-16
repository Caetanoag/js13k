export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static zero() {
    return new Vector2(0, 0);
  }
  add(v) {
    this.x += v.x;
    this.y += v.y;
  }
  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
  }
}
