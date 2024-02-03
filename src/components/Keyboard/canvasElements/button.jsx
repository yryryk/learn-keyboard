export default class Button {
  constructor({
    x,
    y,
    height,
    width,
    fontFamily,
    fontSize,
    letter,
    shiftedLetter,
    isLetterVisible,
    background,
    color,
    outlineColor,
    gap,
  }) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.letter = letter;
    this.shiftedLetter = shiftedLetter;
    this.isLetterVisible = isLetterVisible;
    this.background = background;
    this.color = color;
    this.outlineColor = outlineColor;
    this.gap = gap;
  }
  drawLowerLayer(ctx) {
    ctx.lineWidth = this.gap;
    ctx.strokeStyle = this.outlineColor;
    ctx.strokeRect(
      this.x + this.gap - 1,
      this.y + this.gap - 1,
      this.width - this.gap * 2 + 2,
      this.height - this.gap * 2 + 2
    );
    ctx.fillStyle = this.background;
    ctx.fillRect(
      this.x + this.gap,
      this.y + this.gap,
      this.width - this.gap * 2,
      this.height - this.gap * 2
    );
  }
  drawUpperLayer(ctx) {
    if (this.isLetterVisible) {
      ctx.fillStyle = this.background;
      ctx.beginPath();
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.fontSize * 1.25,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();
      ctx.fillStyle = this.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = this.fontSize + "px" + " " + this.fontFamily;
      ctx.fillText(
        this.shiftedLetter,
        this.x + this.width / 2 - this.fontSize / 3,
        this.y + this.height / 2 - 2 - this.fontSize / 3
      );
      ctx.fillText(
        this.letter,
        this.x + this.width / 2 + this.fontSize / 3,
        this.y + this.height / 2 + 2 + this.fontSize / 3
      );
    }
  }
}
