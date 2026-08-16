export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static zero() {
    return new Vector2(0, 0);
  }
}
