import { Rectangle } from "../math/Rectangle.js";

export class Entity extends Rectangle {
  constructor(position, width, height, velocity, renderer) {
    super(position, width, height);
    this.velocity = velocity;
    this.baseVelocity = velocity;
    this.renderer = renderer;
  }
  move() {
    this.position.add(this.velocity);
  }
  draw() {}
  update() {}
}
