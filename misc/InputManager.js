import { Vector2 } from "../math/Vector2.js";

export class InputManager {
  constructor(target) {
    this.target = target;
    this.keysDown = new Map();
    this.keysPressed = new Map();
    this.mouse = {
      position: Vector2.zero(),
      buttons: new Map(), // <int, bool>
    };
    window.addEventListener("keydown", (e) => {
      const key = e.key;
      if (!this.keysDown.get(key)) this.keysPressed.set(key, true);
      this.keysDown.set(key, true);
    });
    window.addEventListener("keyup", (e) => {
      this.keysDown.set(e.key, false);
    });
    this.target.addEventListener("mousemove", (e) => {
      const rect = this.target.getBoundingClientRect();
      this.mouse.position = new Vector2(
        e.clientX - rect.left,
        e.clientY - rect.top,
      );
    });
    this.target.addEventListener("mousedown", (e) => {
      this.mouse.buttons.set(e.button, true);
      e.preventDefault();
    });
    this.target.addEventListener("mouseup", (e) => {
      this.mouse.buttons.set(e.button, false);
      e.preventDefault();
    });
  }
  isKeyDown(key) {
    return this.keysDown.get(key) ?? false;
  }
  isKeyPressed(key) {
    return this.keysPressed.get(key) ?? false;
  }
  update() {
    this.keysPressed.clear();
  }
}
