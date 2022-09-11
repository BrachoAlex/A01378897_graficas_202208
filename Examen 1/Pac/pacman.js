let ctx = null, canvas = null;
let startAngle = 0.2;
let endAngle = 1.8;
class Pacman {
    constructor(xPos, yPos, radius) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;


        this.open = false;

        this.color = "yellow"
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius, startAngle * Math.PI, endAngle * Math.PI)
        ctx.lineTo(this.xPos, this.yPos);
        ctx.closePath()
        ctx.stroke()
        ctx.fill();

    }

    update() {
        if (this.xPos > canvas.width + this.radius) {
            this.xPos = 0 - this.radius;
        } else {
            this.xPos += 5
        }
        if (this.open) {
            {
                if (startAngle <= 0.2) {
                    startAngle += 0.01
                    endAngle -= 0.01

                } else {
                    this.open = false
                }
            }
        } else {
            if (startAngle >= 0) {
                startAngle -= 0.01
                endAngle += 0.01
            } else {
                this.open = true
            }
        }
    }
}

function update(pacman) {
    requestAnimationFrame(() => update(pacman))
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pacman.draw()
    pacman.update()

}

function main() {
    canvas = document.getElementById("2dCanvas")
    ctx = canvas.getContext("2d")

    const pacman = new Pacman(300, 150, 50)

    update(pacman, ctx)
}

main()