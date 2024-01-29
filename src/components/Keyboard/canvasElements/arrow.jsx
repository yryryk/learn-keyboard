export default class Arrow {
  constructor({
    xStart,
    yStart,
    xEnd,
    yEnd,
    isArrowVisible,
    background,
    lineThickness,
  }) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.isArrowVisible = isArrowVisible;
    this.background = background;
    this.lineThickness = lineThickness;
    this.xLength = (this.xEnd - this.xStart);
    this.yLength = (this.yEnd - this.yStart);
    this.length = Math.sqrt(this.xLength ** 2 + this.yLength ** 2);
    this.xLength1 = Math.round(this.yLength * this.lineThickness / this.length);
    this.yLength1 = Math.round(this.xLength * this.lineThickness / this.length);
  }
  draw(ctx) {
    if (this.isArrowVisible) {
      this.xLength = (this.xEnd - this.xStart);
      this.yLength = (this.yEnd - this.yStart);
      this.length = Math.sqrt(this.xLength ** 2 + this.yLength ** 2);
      this.xLength1 = Math.round(this.yLength * this.lineThickness / this.length);
      this.yLength1 = Math.round(this.xLength * this.lineThickness / this.length);
      ctx.fillStyle = this.background;
      ctx.beginPath();
      ctx.moveTo(this.xStart, this.yStart);
      ctx.lineTo(this.xStart - this.xLength1, this.yStart + this.yLength1);
      ctx.lineTo(this.xEnd, this.yEnd);
      ctx.lineTo(this.xStart + this.xLength1, this.yStart - this.yLength1);
      ctx.closePath();
      ctx.fill();
    }
  }
}
