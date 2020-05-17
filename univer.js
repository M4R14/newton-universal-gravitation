var Star = /** @class */ (function () {
    function Star() {
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.radius = 2;
        this.m = 0;
        this.color = 'white';
        this.id = Math.random().toString(16).slice(2);
    }
    Star.prototype.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    Star.prototype.update = function (canvas) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.fillText("" + Math.log10(this.m), this.x + this.radius, this.y + this.radius);
        // ctx.stroke();
    };
    return Star;
}());
var Unit = /** @class */ (function () {
    function Unit(x, y) {
        this.x = 0;
        this.y = 0;
        this.foce = 0.75;
        this.zeta = -45;
        this.x = x;
        this.y = y;
    }
    Unit.prototype.update = function (canvas) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, 0.5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        // ctx.fill = 'red';
        ctx.stroke();
    };
    return Unit;
}());
