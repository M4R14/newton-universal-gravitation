export default class Unit {
    x = 0;
    y = 0;
    foce = 0.75;
    zeta = -45;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    update(canvas: HTMLCanvasElement): void {
        var ctx : any = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, 0.5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        // ctx.fill = 'red';
        ctx.stroke();
    }
}
