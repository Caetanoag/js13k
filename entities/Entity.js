import { Rectangle } from "../math/Rectangle.js";

export class Entity extends Rectangle {
  constructor(position, width, height, velocity, renderer, entities) {
    super(position, width, height);
    this.velocity = velocity;
    this.baseVelocity = velocity.clone();
    this.renderer = renderer;
    this.entities = entities;
  }
  move() {
    this.position.add(this.velocity);
  }
  draw() {}
  update() {}
}
