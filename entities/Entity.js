import { Rectangle } from "../math/Rectangle.js";
import { Vector2 } from "../math/Vector2.js";

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
  drawHpBar() {
    const barCenter = this.center.add(new Vector2(0, -this.height/1.2));
    const bar = Rectangle.fromCenter(barCenter, this.width*1.3, this.height * 0.2);
    this.renderer.fillRectangle(bar, "black");
    this.renderer.fillRectangle(bar.scale(Math.max(0, this.hp.actual / this.hp.max), 1), "green");

  }
  draw() {
    if (this.hp) this.drawHpBar();
  }
  update() {}
}
