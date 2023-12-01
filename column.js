class Column {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue = [];
        this.color = {
            r: 0,
            g: 51,
            b: 102,
            a: 0.6
        }; // Initial color
    }

    moveTo(loc, yOffset = 1, frameCount = 70) {
        for (let i = 0; i <= frameCount; i++) {
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            this.queue.push({
                x: lerp(this.x, loc.x, t),
                y: lerp(this.y, loc.y, t) + u * this.width / 2 * yOffset
            });
        }
  
        this.color = {
            r: 955,
            g: 0,
            b: 0,
            a: 1
        };
    }

    jump(frameCount = 70) {
        for (let i = 0; i <= frameCount; i++) {
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            this.queue.push({
                x: this.x,
                y: this.y - u * this.width
            });
        }
    
        this.color = {
            r: 0,
            g: 955,
            b: 0,
            a: 1
        }; 
    }

    draw(ctx) {
        let changed = false;
        if (this.queue.length > 0) {
            const { x, y } = this.queue.shift();
            this.x = x;
            this.y = y;
            changed = true;
        }
        const left = this.x - this.width / 2;
        const top = this.y - this.height;
        const right = this.x + this.width / 2;

        const gradient = ctx.createLinearGradient(left, this.y, right, top);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`);
        gradient.addColorStop(1, 'rgba(51, 153, 255, 1)');

        ctx.beginPath();
        ctx.fillStyle = gradient;

        ctx.moveTo(left, top);
        ctx.lineTo(left, this.y);
        ctx.ellipse(this.x, this.y, this.width / 2, this.width / 4, 0, 0, Math.PI * 2, true);
        ctx.lineTo(right, top);
        ctx.ellipse(this.x, top, this.width / 2, this.width / 4, 0, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.strokeStyle = "black";
        ctx.stroke();
        return changed;
    }
}
