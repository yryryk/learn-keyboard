export default class Arrow {
  constructor({
    xStart,
    yStart,
    xEnd,
    yEnd,
    isArrowVisible,
    background,
    lineThickness,
    endGap,
  }) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.isArrowVisible = isArrowVisible;
    this.background = background;
    this.lineThickness = lineThickness;
    this.endGap = endGap;
  }
  draw(ctx) {
    if (this.isArrowVisible) {
      this.xLength = (this.xEnd - this.xStart);
      this.yLength = (this.yEnd - this.yStart);
      this.length = Math.sqrt(this.xLength ** 2 + this.yLength ** 2);
      this.xLength1 = Math.round(this.yLength * this.lineThickness / this.length);
      this.yLength1 = Math.round(this.xLength * this.lineThickness / this.length);
      this.xLength2 = Math.round(this.xLength * this.endGap / this.length);
      this.yLength2 = Math.round(this.yLength * this.endGap / this.length);
      ctx.fillStyle = this.background;
      ctx.beginPath();
      ctx.moveTo(this.xStart, this.yStart);
      ctx.lineTo(this.xStart - this.xLength1, this.yStart + this.yLength1);
      ctx.lineTo(this.xEnd - this.xLength2, this.yEnd - this.yLength2);
      ctx.lineTo(this.xStart + this.xLength1, this.yStart - this.yLength1);
      ctx.closePath();
      ctx.fill();
    }
  }
}
