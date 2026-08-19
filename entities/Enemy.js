import { Entity } from "./Entity.js";
import { Vector2 } from "../math/Vector2.js";

export class Enemy extends Entity {
  constructor(
    position,
    width,
    height,
    velocity,
    renderer,
    entities,
    hp,
    damage,
    color,
  ) {
    super(position, width, height, velocity, renderer, entities);
    this.hp = hp;
    this.damage = damage;
    this.color = color;
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
    this.renderer.fillRectangle(this, this.color);
  }
  move() {
    super.move();
  }
  update() {
    this.move();
    if (this.intersects(this.target)) {
      this.target.hp.actual -= this.damage;
    }
  }
}
export class TankEnemy extends Enemy {
  constructor(position, width, height, renderer, entities) {
    const velocity = new Vector2(3, 3);
    const hp = { max: 5, actual: 5 };
    super(
      position,
      width,
      height,
      velocity,
      renderer,
      entities,
      hp,
      2,
      "green",
    );
  }
}

export class FastEnemy extends Enemy {
  constructor(position, width, height, renderer, entities) {
    const velocity = new Vector2(8, 8);
    const hp = { max: 2, actual: 2 };
    super(
      position,
      width,
      height,
      velocity,
      renderer,
      entities,
      hp,
      1,
      "yellow",
    );
  }
}
