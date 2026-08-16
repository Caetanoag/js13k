import { Vector2 } from "../math/Vector2.js";
import { Entity } from "./Entity.js";

export class Player extends Entity {
  constructor(position, width, height, velocity, renderer, hp, inputManager) {
    super(position, width, height, velocity, renderer);
    this.hp = hp;
    this.inputManager = inputManager;
  }
  collide() {

  }
  handleInputs() {
    this.velocity = Vector2.zero();
    if (this.inputManager.isKeyDown("ArrowRight")) {
      this.velocity.x = this.baseVelocity.x;
    }
    if (this.inputManager.isKeyDown("ArrowLeft")) {
      this.velocity.x = -this.baseVelocity.x;
    }
    if (this.inputManager.isKeyDown("ArrowUp")) {
      this.velocity.y = -this.baseVelocity.y;
    }
    if (this.inputManager.isKeyDown("ArrowDown")) {
      this.velocity.y = this.baseVelocity.y;
    }
  }
  move() {
    super.move();
  }
  draw() {
    this.renderer.fillRectangle(this, "red");
  }
  update() {
    this.handleInputs()
    this.move();
    if (!this.isInside(this.renderer.rect)) {
      this.position.subtract(this.velocity);
      this.velocity.negate();
      console.log(this.position);
    }
  }
}
