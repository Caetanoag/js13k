import { Renderer } from "./canvas/Renderer.js";
import { Rectangle } from "./math/Rectangle.js";

/**@type {CanvasRenderingContext2D} */
const ctx = document.getElementById("canvas1").getContext('2d');
const renderer = new Renderer(ctx);
renderer.setSize(window.innerWidth, window.innerHeight);

const rect1 = new Rectangle(renderer.rect.scale(0.8, 0.8).center, 20, 20);
renderer.fillRectangle(rect1, "black");
renderer.strokeRectangle(renderer.rect.scale(0.8, 0.8), "black");
