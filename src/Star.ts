declare interface Math {
    log10(x: number): number;
}

export default class Star {
    id: string;
    x: number = 0;
    y: number = 0;
    speedX: number = 0;
    speedY: number = 0;
    radius: number = 2;
    m: number = 0;
    color: string = 'white';
    constructor() {
        this.id = Math.random().toString(16).slice(2);
    }
    newPos(): void {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    update(canvas: HTMLCanvasElement): void {
        const zeta =  Math.atan2(this.speedY, this.speedX) * 180 / Math.PI;
        const ctx : CanvasRenderingContext2D | any = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.fill();
        ctx.fillText(`${Math.log10(this.m)}`, this.x + this.radius, this.y + this.radius);
        // ctx.stroke();
        ctx.lineCap = "round";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + (Math.cos(zeta) * (this.radius + 8)), this.y + (Math.sin(zeta) * (this.radius + 8)));
        ctx.stroke();
    }
}
