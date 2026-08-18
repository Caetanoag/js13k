import { Entity } from "./Entity.js";

export class Enemy extends Entity {
  constructor(position, width, height, velocity, renderer, entities, hp) {
    super(position, width, height, velocity, renderer, entities);
    this.hp = hp;
  }
  followPlayer(player) {
    this.target = player;
    const direction = player.position
      .clone()
      .subtract(this.position)
      .normalized();
    this.velocity = direction.scale(this.baseVelocity.x, this.baseVelocity.y);
  }
  draw() {
    this.renderer.fillRectangle(this, "blue");
  }
  move() {
    super.move();
  }
  update() {
    this.move();
    if (this.intersects(this.target)) {
      this.target.hp.actual -= 1;
    }
  }
}
