
import {Line} from './line.js'

export class Grid{
    constructor(canvas) {
        this.canvas = canvas;
        this.lastClick = [0, 0];
        this.clicks = 0;
        this.start = () => canvas.getBoundingClientRect();
        this.event=undefined;
        this.line=new Line(0,0,0,0);
    }

    makeGrid() {
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let i = 25; i < this.canvas.height; i = i + 25) {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 0.5;
            if (i == 250) {
                ctx.lineWidth = 2
                for (let j = 25; j < 500; j = j + 25) {
                    ctx.fillText((j / 25) - 10, j + 2, i - 2)
                    ctx.fillText(10 - (j / 25), i + 2, j - 2)
                }
            }
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(this.canvas.width, i);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, this.canvas.height);
            ctx.stroke();
        }
    }

    makeLine() {
        this.makeGrid();
        let ctx = this.canvas.getContext("2d");
        let arr = this.line.getPoints();
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1
        let x1 = arr[-10].x;
        let y1 = arr[-10].y;
        let x2 = arr[10].x;
        let y2 = arr[10].y
        ctx.moveTo(250 + (25 * x1), 250 + (-25 * y1));
        ctx.lineTo(250 + (25 * x2), 250 + (-25 * y2));
        ctx.stroke();
    }

    async clickLine(board){
        let e=this.event;
        this.line.x = e.x - this.start().x;
        this.line.x=(this.line.x - 250) / 25;
        this.line.y = e.y - this.start().y;
        this.line.y=(250-this.line.y)/25;
        if (this.clicks != 1) {
            this.clicks++;
        } else {
            this.line.makeSlope(this.lastClick[0],this.lastClick[1]);
            this.line.makeY(this.lastClick[0],this.lastClick[1]);
            this.makeLine();
            this.clicks = 0;
            document.getElementById("testerS").value = this.line.m.toFixed(2);
            document.getElementById("testerY").value = this.line.b.toFixed(2);

            await board.saveLine(this.line.m.toFixed(2),this.line.b.toFixed(2));
            board.render(document.getElementById("Points"))
        }
        this.lastClick = [this.line.x, this.line.y];
    };

    canvas_arrow(fromx, fromy, tox, toy) {
        let ctx = this.canvas.getContext('2d');
        var headlen = 10;
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }

    slide3(){
        let ctx = this.canvas.getContext('2d');
        this.line.x=2;
        this.line.y=3;
        this.line.m=2;
        this.line.b=-1;    
        document.getElementById("testerS").value = this.line.m;
        document.getElementById("testerY").value = this.line.b;
        document.getElementById("slopeRange").value = this.line.m;
        document.getElementById("yRange").value = this.line.b;
        this.makeLine();
        ctx.beginPath();
        this.canvas_arrow(250 + (25 * 2), 250 + (-25 * 3),250 + (25 * 3), 250 + (-25 * 3))
        this.canvas_arrow(250 + (25 * 3), 250 + (-25 * 3),250 + (25 * 3), 250 + (-25 * 5))
        ctx.font = "15px Times";
        ctx.fillText("x increase by 1",(250 + (25 * 2)),250 + (-25 * 3)+18);
        ctx.fillText("when",250 + (25 * 3)+5, 250 + (-25 * 3.2));
        ctx.fillText("y increase by 2",250 + (25 * 3)+5, 250 + (-25 * 4.1));
        ctx.font = "10px sans-seri";
    }

    slide5(){
        this.canvas_arrow((250 + (25 * 2)),250 + (-25 * -2)+15,250 + (25 * 0.3)+5, 250 + (-25 * -1.2))
        let ctx = this.canvas.getContext('2d');
        ctx.font = "15px Times";
        ctx.fillText("line hits the y-axis at -1",(250 + (25 * 2)+2),250 + (-25 * -2)+15);
        ctx.font = "10px sans-seri";
    }
}