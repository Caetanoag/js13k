import { Entity } from "./Entity.js";

export class Player extends Entity {
  constructor(position, width, height, velocity, renderer, hp) {
    super(position, width, height, velocity, renderer);
    this.hp = hp;
  }
  collide() {

  }
  move() {
    super.move();
  }
  draw() {
    this.renderer.fillRectangle(this, "red");
  }
  update() {
    this.move();
    if (!this.isInside(this.renderer.rect)) {
      this.position.subtract(this.velocity);
      this.velocity.negate();
      console.log(this.position);
    }
  }
}
