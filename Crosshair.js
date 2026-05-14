class Crosshair{
        constructor(){
           this.x=0;
           this.y=0; 

           
        }
         update(){
             window.addEventListener("mousemove",(event) => {


            mouseX = event.clientX;
            mouseY = event.clientY;
            
            this.x = mouseX;
            this.y = mouseY;    
            }) ;

        }

        draw(){
            context.beginPath();
            context.moveTo(mouseX,mouseY);
            context.lineTo(mouseX-9,mouseY);
            context.lineTo(mouseX+9,mouseY);
            context.moveTo(mouseX,mouseY);
            context.lineTo(mouseX,mouseY+9);
             context.lineTo(mouseX,mouseY-9);
            context.strokeStyle= "red";
            context.stroke();
            context.closePath();
        }

    }