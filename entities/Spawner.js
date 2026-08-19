import { FastEnemy } from "./Enemy.js";
import { Vector2 } from "../math/Vector2.js";
import { TankEnemy } from "./Enemy.js";

const enemyTypes = [FastEnemy, TankEnemy];

export class Spawner {
  constructor(renderer, entities, target, spawnRate = 120) {
    this.renderer = renderer;
    this.entities = entities;
    this.target = target;
    this.enemies = [];

    this.spawnRate = spawnRate;
    this.frameCount = 0;
  }

  spawnEnemy(x, y) {
    const position = new Vector2(x, y);
    const enemyClass =
      enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

    const enemy = new enemyClass(
      position,
      40,
      40,
      this.renderer,
      this.entities,
    );

    this.enemies.push(enemy);
    this.entities.push(enemy);
  }

  spawnAroundPlayer(worldRect) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.max(worldRect.width, worldRect.height) / 2 + 50;

    const center = this.target.center;
    const x = center.x + Math.cos(angle) * radius;
    const y = center.y + Math.sin(angle) * radius;

    this.spawnEnemy(x, y);
  }

  update(worldRect) {
    this.frameCount++;
    if (this.frameCount >= this.spawnRate) {
      this.frameCount = 0;
      this.spawnAroundPlayer(worldRect);
    }

    this.enemies.forEach((enemy) => {
      enemy.followPlayer(this.target);
      enemy.update();
    });

    this.removeDeadEnemies();
  }

  removeDeadEnemies() {
    this.enemies = this.enemies.filter((enemy) => {
      const isDead = enemy.hp.actual <= 0;
      if (isDead) {
        const index = this.entities.indexOf(enemy);
        if (index !== -1) this.entities.splice(index, 1);
      }
      return !isDead;
    });
  }

  draw(worldRect) {
    this.enemies.forEach((enemy) => {
      if (enemy.intersects(worldRect)) enemy.draw();
    });
  }
}
