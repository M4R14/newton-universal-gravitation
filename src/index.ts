import Unit from "./Unit";
import Star from "./Star";

declare interface Math {
    log10(x: number): number;
}

function _parseInt(value:number) {
    return parseInt(value.toString())
}

var canvas: HTMLCanvasElement
const width = Number(window.innerWidth) - 300
const height = Number(window.innerHeight)

var units = [];
const createUnit = () => {
    const _unit = []
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (x % 5 == 0 && y % 5 == 0) {
                _unit.push(new Unit(x,y))
            }
        }
    }
    return _unit
};

const createStart = () => {
    const _start = []

    for (let index = 0; index < 200; index++) {
        const star = new Star()
        star.x = _parseInt(Math.random() * width)
        star.y = _parseInt(Math.random() * height)
        star.m = _parseInt(Math.random() * (1000 - 100) + 100)
        // star.speedX = 0.05
        // star.speedY = 0.05
        
        _start.push(star)
    }
    
    return _start
};

const createSun = (number: number, min: number, max: number) => {
    const _suns = []
    const colors = [ 'lightskyblue', 'green', 'blue', 'red' ]
    for (let index = 0; index < number; index++) {
        const star = new Star()
        star.x = _parseInt(Math.random() * width)
        star.y = _parseInt(Math.random() * height)
        star.radius = _parseInt(Math.random() * (max - min) + min)
        star.m = Math.pow(10, star.radius)
        star.color = colors[_parseInt(Math.random() * colors.length)]
        // star.speedX = 0.5
        // star.speedY = 0
        _suns.push(star)
    }
    
    return _suns
}

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

window.onload = () => {
    const starInfo = document.getElementById('star-info');
    canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.style.backgroundColor = "black"
    const main = document.getElementById('main');
    if (main) {
        main.appendChild(canvas)
    }
    
    units = createUnit();

    units.forEach(nu => {
        nu.update(canvas)
    })

    const sun = new Star();
    sun.x = width/2
    sun.y = height/2
    sun.m = Math.pow(10, 10)
    sun.radius = 10

    const stars = createStart()

    let suns = ([
        sun,
        ...createSun(20, 3, 2),
        ...createSun(20, 5, 4),
        ...createSun(100, 9, 2),
    ])
    console.log(suns)

    let target_sun : Star;

    canvas.addEventListener("click", function (evt) {
        var mousePos = getMousePos(canvas, evt);
        console.log('mousemove', mousePos)
        let my : number = (sun.y - mousePos.y)
        let mx : number = (sun.x - mousePos.x)

        const dist =  Math.sqrt(Math.pow(mx, 2) + Math.pow(my, 2))
        const zeta =  Math.atan2(my, mx) * 180 / Math.PI;

        const G = 6.674 * Math.pow(10, 11 * -1)
        const foce = G * (sun.m * Math.pow(10, 5)) / Math.pow(dist, 2) 

        const vy = Math.sin(zeta) * foce
        const vx = Math.cos(zeta) * foce

        console.log({
            my,
            vy,
            mx,
            vx,
            // dist,
            zeta,
        })

        target_sun = suns.filter(s => mousePos.x >= s.x && mousePos.x <=  s.x + s.radius && mousePos.y >= s.y &&  mousePos.y <= s.y + s.radius)[0]
        console.log('target_sun', target_sun)
    }, false);

   

    const render = () => {
        
        const canvas_2d = canvas.getContext("2d");
        if (canvas_2d) {
            canvas_2d.clearRect(0, 0, canvas.width, canvas.height);
        }

        // if (sun.x == 100 || sun.x == width - 100) {
        //     sun.speedX *= -1
        // }

        // if (sun.y <= 100 || sun.y >= height - 100) {
        //     sun.speedY *= -1
        // }

        suns.forEach(xsun => {
            // console.log(sun)
            suns.filter(s => s.id !== xsun.id).forEach(asun => {
                if (xsun.y == xsun.y && xsun.x == asun.x) { 
                    return;
                }
                let y = (xsun.y - asun.y)
                let x =  (xsun.x - asun.x)
                // if (asun.m > xsun.m) {
                //     y = (asun.y - xsun.y)
                //     x =  (asun.x - xsun.x)
                // }
                const dist =  Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
                const zeta =  Math.atan2(y, x) * 180 / Math.PI;

                const G = 6.674 * Math.pow(10, 11 * -1)
                const foce = G * (xsun.m * asun.m) / Math.pow(dist, 2) 
                
                const vy = Math.sin(zeta) * foce 
                const vx = Math.cos(zeta) * foce

                const pow = Math.pow(10, 4)
                const c =  Math.sqrt(Math.pow(asun.speedX, 2) + (Math.pow(asun.speedY, 2)))
                // asun.speedX += vx * pow / asun.m 
                // asun.speedY += vy * pow / asun.m
                if (asun.m < xsun.m) {
                    asun.speedX += vx 
                    asun.speedY += vy 
                } else {
                    xsun.speedX += vx 
                    xsun.speedY += vy 
                }
            })
        })

        if (target_sun) {
            starInfo.innerHTML = ''
            
            let px = document.createElement('p') 
            px.innerText = 'speedX: ' + target_sun.speedX.toString()
            starInfo.appendChild(px);

            let py = document.createElement('p') 
            py.innerText = 'speedY: ' + target_sun.speedY.toString()
            starInfo.appendChild(py);

            const zeta =  Math.atan2(target_sun.speedY, target_sun.speedX) * 180 / Math.PI;
            let pzeta = document.createElement('p') 
            pzeta.innerText = 'zeta: ' + zeta.toString()
            starInfo.appendChild(pzeta);

            const ctx : CanvasRenderingContext2D | any = canvas.getContext("2d");
            const magin = 2
            ctx.beginPath();
            ctx.rect(target_sun.x - target_sun.radius - magin, target_sun.y -  target_sun.radius - magin, target_sun.radius * 2 + magin * 2, target_sun.radius * 2 + magin * 2);
            ctx.strokeStyle = "yellow";
            
            ctx.lineCap = "round";
            ctx.moveTo(target_sun.x, target_sun.y);
            ctx.lineTo(target_sun.x + (target_sun.speedX * 100), target_sun.y + (target_sun.speedY * 100));
            
            ctx.stroke();
        }
        
        suns.forEach(asun => {
            asun.newPos();
            asun.update(canvas);
            asun.speedX = 0;  asun.speedY = 0;
        })
        // stars.forEach(s => { s.newPos(canvas); s.update(canvas); })
        // stars.forEach(s => { s.speedX = 0;  s.speedY = 0; })
        requestAnimationFrame(render);    
    }
    render()
};