export class InputManager {
  constructor() {
    this.keysDown = new Map();
    this.keysPressed = new Map();
    window.addEventListener("keydown", (e) => {
      const key = e.key;
      if (!this.keysDown.get(key)) this.keysPressed.set(key, true);
      this.keysDown.set(key, true);
    });
    window.addEventListener("keyup", (e) => {
      this.keysDown.set(e.key, false);
    });
  }
  isKeyDown(key) { return this.keysDown.get(key) ?? false; }
  isKeyPressed(key) { return this.keysPressed.get(key) ?? false; }
  update() { this.keysPressed.clear(); }
}
