export default class Point {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r || 5;
        this.lineWidth = 1;
        this.strokeStyle = 'red';
        this.fillStyle = 'rgba(0,0,0,0.5)';
    }

    _set(option = {}) {
        for(const key in option){
            this[key] = option[key];
        }
    }

    _clear(ctx){
        let offect = this.r + this.lineWidth;
        ctx.clearRect(this.x - offect,this.y - offect, offect * 2, offect * 2);
    }
    _renderArc(ctx) {
        ctx.save();

        ctx.beginPath();

        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;

        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();
        // ctx.stroke();

        ctx.restore();
    }
}