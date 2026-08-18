import { Vector2 } from "../math/Vector2.js";
import { Entity } from "./Entity.js";
import { Projectile } from "./Projectile.js";

export class Player extends Entity {
  constructor(
    position,
    width,
    height,
    velocity,
    renderer,
    entities,
    hp,
    inputManager,
  ) {
    super(position, width, height, velocity, renderer, entities);
    this.hp = hp;
    this.inputManager = inputManager;
    this.projectiles = [];

    this.projectileSpeed = this.width * 1.2;
    this.lastDirection = this.velocity.clone();
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
    if (this.velocity.length !== 0) this.lastDirection = this.velocity.clone();
    if (
      this.inputManager.isKeyPressed("e") ||
      this.inputManager.isKeyPressed("E")
    ) {
      const direction = this.lastDirection.normalized();

      const bulletVelocity = direction.scale(
        this.projectileSpeed,
        this.projectileSpeed,
      );
      this.projectiles.push(
        new Projectile(
          this.center,
          this.width * 0.4,
          this.height * 0.4,
          bulletVelocity,
          this.renderer,
          this.entities,
          10,
          this,
        ),
      );
    }
  }
  move() {
    super.move();
  }
  draw() {
    this.renderer.fillRectangle(this, "red");
    for (const p of this.projectiles) p.draw();
  }
  updateProjectiles(worldRect) {
    for (let i = 0; i < this.projectiles.length; i++) {
      const p = this.projectiles[i];
      if (!p.active) {
        this.projectiles.splice(i, 1);
        i--;
        continue;
      }
      p.update(worldRect);
    }
  }
  update(worldRect) {
    this.handleInputs();
    this.updateProjectiles(worldRect);
    this.move();

  }
}
