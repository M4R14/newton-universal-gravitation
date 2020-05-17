declare interface Math {
    log10(x: number): number;
}

class Star {
    id: string;
    x:number = 0;
    y:number = 0;
    speedX:number = 0
    speedY:number = 0
    radius:number = 2
    m:number = 0
    color : string = 'white'

    constructor() {
        this.id = Math.random().toString(16).slice(2)
    }

    newPos() : void {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    update (canvas) : void {
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.fillText(`${Math.log10(this.m)}`, this.x + this.radius, this.y + this.radius);
        // ctx.stroke();
    }
}

class Unit {
    x = 0
    y = 0
    foce = 0.75
    zeta = -45

    constructor(x , y) {
        this.x = x
        this.y = y
    }

    update(canvas) : void {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, 0.5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        // ctx.fill = 'red';
        ctx.stroke();
    }
}