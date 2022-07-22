
export class Explain{
    constructor(canvas){
        this.canvas=canvas;
        this.slide_number=1;
    }

    displayText(){
        let ctx=this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        if(this.slide_number>7 || this.slide_number<1){
            ctx.font = "20px Georgia";
            this.wrapText(ctx,document.getElementById('e0').textContent,15,75,300,60);
            ctx.font = "15px Georgia";
        }
        else if(this.slide_number===1){
            ctx.font = "20px Georgia";
            this.wrapText(ctx,document.getElementById('e1').textContent,15,75,300,60)
            ctx.font = "15px Georgia";
            this.wrapText(ctx,document.getElementById('e11').textContent,15,100,200,20)
        }
        else if(this.slide_number===3){
            this.wrapText(ctx,document.getElementById('e'+this.slide_number.toString()).textContent,45,50,200,20);
            grid.slide3();
        }
        else if(this.slide_number===5){
            this.wrapText(ctx,document.getElementById('e'+this.slide_number.toString()).textContent,45,25,200,20)
            grid.slide3();
            grid.slide5();
        }
        else{
            this.wrapText(ctx,document.getElementById('e'+this.slide_number.toString()).textContent,45,50,200,20)
        }
        
    }

    wrapText(context, text, x, y, maxWidth, lineHeight) {
        text=text.toString();
        let words = text.split(' ');
        let line = '';
    
        for(var n = 0; n < words.length; n++) {
          let testLine = line + words[n] + ' ';
          let metrics = context.measureText(testLine);
          let testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
    }
}
