class Column {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue=[];
    }

    moveTo(loc,frameCount=100){
        for(let i=1; i<=frameCount;i++){
            const t= i/frameCount;
            this.queue.push({
                x:lerp(this.x,loc.x,t),
                y:lerp(this.y,loc.y,t)
            });
        }
    }

    draw(ctx) {
        const left = this.x - this.width / 2;
        const top = this.y - this.height;
        const right = this.x + this.width / 2;

        const gradient = ctx.createLinearGradient(left, this.y, right, top);
        gradient.addColorStop(0, 'rgba(0, 51, 102, 0.6)'); // Darker shade at the bottom
        gradient.addColorStop(1, 'rgba(51, 153, 255, 1)'); // Lighter shade at the top

        ctx.beginPath();
        ctx.fillStyle = gradient;

        ctx.moveTo(left, top);
        ctx.lineTo(left, this.y);
        ctx.ellipse(this.x, this.y, this.width / 2, this.width / 4, 0, 0, Math.PI * 2, true);
        ctx.lineTo(right, top);
        ctx.ellipse(this.x, top, this.width / 2, this.width / 4, 0, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.strokeStyle = "black"; // Change the color as needed
        ctx.stroke();
    }
}

// Your canvas creation and array generation code remains the same...

// Drawing the columns with a blue gradient on a black background
for (let i = 0; i < array.length; i++) {
    const x = i * spacing + spacing / 2 + margin;
    const y = myCanvas.height - margin;
    const width = spacing - 4;
    const height = maxColumnHeight * array[i];

    const newColumn = new Column(x, y, width, height);
    newColumn.draw(ctx);
}
