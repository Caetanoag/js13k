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
  }
  handleInputs(worldRect) {
    const isKeyDown = (key) => this.inputManager.isKeyDown(key);
    this.velocity = Vector2.zero();
    if (isKeyDown("ArrowRight") || isKeyDown("D") || isKeyDown("d")) {
      this.velocity.x = this.baseVelocity.x;
    }
    if (isKeyDown("ArrowLeft")  || isKeyDown("A") || isKeyDown("a")) {
      this.velocity.x = -this.baseVelocity.x;
    }
    if (isKeyDown("ArrowUp")  || isKeyDown("W") || isKeyDown("w")) {
      this.velocity.y = -this.baseVelocity.y;
    }
    if (isKeyDown("ArrowDown")  || isKeyDown("S") || isKeyDown("s")) {
      this.velocity.y = this.baseVelocity.y;
    }
    if (this.velocity.length !== 0) this.lastDirection = this.velocity.clone();
    if (
      this.inputManager.isKeyPressed("e") ||
      this.inputManager.isKeyPressed("E")
    ) {
      const mouseScreen = this.inputManager.mouse.position;

      const mouseWorld = new Vector2(
        mouseScreen.x + worldRect.position.x,
        mouseScreen.y + worldRect.position.y,
      );
      const direction = mouseWorld.subtract(this.center).normalized();
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
    this.handleInputs(worldRect);
    this.updateProjectiles(worldRect);
    this.move();
  }
}
