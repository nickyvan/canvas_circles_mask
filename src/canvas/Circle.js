import Point from './Point'
export default class Circle {
  constructor(radius, x, y) {
    this._radius = radius;
    this.radius = radius;
    this.growthValue = 0;
    this.position = new Point(x, y);
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @param {number} ease
   */
  draw(context, ease) {
    this.radius += (this._radius + this.growthValue - this.radius) * ease;
    context.moveTo(this.position.x, this.position.y);
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
  }

  addRadius(value) {
    this.growthValue = value;
  }

  get x() {
    return this.position.x;
  }

  set x(value) {
    this.position.x = value;
  }

  get y() {
    return this.position.y;
  }

  set y(value) {
    this.position.y = value;
  }
}
