import { Entity } from "./Entity.js";
export class Projectile extends Entity {
  constructor(position, width, height, velocity, renderer, entities, damage, owner) {
    super(position, width, height, velocity, renderer, entities);
    this.damage = damage;
    this.owner = owner;
    this.active = true;
  }
  move() {
    super.move();
  }
  updateStatus() {
    if (!this.isInside(this.renderer.rect)) {
      this.active = false;
      return;
    }
    this.active = !this.entities.find((e) => e !== this.owner && e.intersects(this));
  }
  draw() {
    if (!this.active) return;
    this.renderer.fillRectangle(this, "blue");
  }
  update() {
    if (!this.active) return;
    this.move();
    this.updateStatus();
  }
}
