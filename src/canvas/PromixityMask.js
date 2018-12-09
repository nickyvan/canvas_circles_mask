import Circle from './Circle';
import { map, findPreferredRatio } from './utils';

let parameters = {
  size: 30,
  radius: 1,
  proximity: 125,
  growth: 60,
  ease: 0.075,
  stats: false
};

export default class PromixityMask {
  constructor() {
    this.imageLoaded = false;
    this.canvas = document.getElementsByClassName('canvas')[0];
    this.image = new Image();
    this.circles = [];
    this.context = this.canvas.getContext('2d');
    window.addEventListener('resize', () => this.resizeHandler(), false);
    window.addEventListener(
      'mousemove',
      (e) => this.mouseMoveHandler(e),
      false
    );
    window.addEventListener(
      'touchmove',
      (e) => this.touchMoveHandler(e),
      false
    );
    this.resizeHandler();
    this.loadImage();
    this.build();
    this.animate();
  }
  build = () => {
    const { size, radius } = parameters;
    const columns = Math.ceil(window.innerWidth / size) + 1;
    const rows = Math.ceil(window.innerHeight / size) + 1;
    const amount = Math.ceil(columns * rows);
    for (let i = 0; i < amount; i++) {
      const column = i % columns;
      const row = ~~(i / columns);
      this.circles.push(new Circle(radius, size * column, size * row));
    }
  };
  mouseMoveHandler = (event) => {
    this.proximityHandler(event);
  };

  touchMoveHandler = (event) => {
    this.proximityHandler(event.touches[0]);
  };
  proximityHandler = (event) => {
    const { proximity, growth } = parameters;
    for (let c of this.circles) {
      let distance = Math.sqrt(
        Math.pow(c.x - event.clientX, 2) + Math.pow(c.y - event.clientY, 2)
      );
      let d = map(distance, c._radius, c._radius + proximity, growth, 0);
      if (d < 0) d = 0;
      c.addRadius(d);
    }
  };

  animate = () => {
    // stats.begin();
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = '#000000';
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let circle of this.circles) {
      circle.draw(this.context, parameters.ease);
    }
    if (this.imageLoaded) {
      this.drawImage();
    } else {
      this.context.fill();
    }
    this.context.restore();
    // stats.end();
    requestAnimationFrame(() => this.animate());
  };
  resizeHandler = () => {
    this.resizeCanvas();
    this.build();
  };
  resizeCanvas = (canvas) => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };
  drawImage = () => {
    this.context.clip();
    const { naturalHeight, naturalWidth } = this.image;
    
    const ratio = findPreferredRatio(
      naturalWidth,
      naturalHeight,
      window.innerWidth,
      window.innerHeight
    );
    const w = naturalWidth * ratio;
    const h = naturalHeight * ratio;
    const x = window.innerWidth / 2 - w / 2;
    const y = window.innerHeight / 2 - h / 2;
    this.context.drawImage(
      this.image,
      0,
      0,
      naturalWidth,
      naturalHeight,
      x,
      y,
      w,
      h
    );
  };
  loadImage = () => {
    this.image.onload = () => {
      this.imageLoaded = true;
    };
    this.image.src =
      'https://cdn.pixabay.com/photo/2018/12/03/19/33/lake-3854093_960_720.jpg';
  };
}
