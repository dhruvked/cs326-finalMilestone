export class Line{
    constructor(x, y, m, b) {
        this.x = x;
        this.y = y;
        this.m = m;
        this.b = b;
    }

    makeSlope(x, y) {
        this.m = (y - this.y) / (x - this.x);
    }

    makeY(x, y) {
        this.b = this.y - (this.m * this.x);
    }

    getPoints() {
        let arr = [];
        let i = -10;
        while (i <= 10) {
            arr[i] = { x: i, y: (this.m * i) + this.b }
            document.getElementById("x"+(i+10).toString()).value=arr[i].x.toFixed(2);
            document.getElementById("y"+(i+10).toString()).value=arr[i].y.toFixed(2);
            i++;
        }
        return arr;
    }
}