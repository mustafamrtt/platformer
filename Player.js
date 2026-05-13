class Player {
         
        


        constructor() {
            this.x=100.0;
            this.y= 100.0;
            this.height =88;
            this.width = 60;
            this.spriteSheet;
            this.frameHeight = 88;
            this.frameWidth = 60;
          
            this.currentFrame=0;
        
            this.frameCount=0;
            this.frameTimer=0;
            this.animationspeed = 250;
            this.bullets=5;
            
          

            this.IDLE = 0;
            this.RUNNING = 1;
            this.JUMPING = 2;
            this.currentRow=-1;
           
            this.speed = {
                x: 0,
                y:  0
            }

            
          
           
        
        }
        getPosition(){
            let position= {
                x:this.x-40,
                y:this.y-90
            }
            return position;
        }
        start(){
            this.spriteSheet = image("./sprite/spritesheet.png");

            this.animation(this.IDLE,2);
            this.timestamp = 0.0;


        }
       
        animation(newRow, frameCount){
            if(this.currentRow!= newRow){
                this.currentRow = newRow;
                this.frameCount = frameCount;
                this.currentFrame = 0;
                this.frameTimer = 0.0;





                
                
            }

        }
        update(deltaTime){
            // Bu kodu update metodunun en başına koy
            console.log("Mevcut Hız X:", this.speed.x, "| Oynayan Animasyon:", this.currentRow);
           if((this.speed.x===0)){
            this.animation(this.IDLE,2);
           }
           else if(this.speed.x>0 && isOnGround){
            this.isDirectionRight=true;
            this.animation(this.RUNNING,4);
           }
           else if ( this.speed.x<0&&isOnGround){
            this.isDirectionRight=false;
            this.animation(this.RUNNING,4);
           }
           else if(!isOnGround){
            this.animation(this.JUMPING,3);
           }
           
            this.frameTimer += deltaTime;
             
            if(this.frameTimer >= this.animationspeed){
                this.currentFrame++;
                this.frameTimer = 0.0;

            }
            if(this.currentFrame >= this.frameCount){
                this.currentFrame = 0;
            }
            

        }
        
        draw(angle){
            
    let frameX = this.currentFrame * this.frameWidth;
    let frameY = this.currentRow * this.frameHeight;
    

    context.save();
    if(angle>90.0){ 
       
        context.drawImage(
            this.spriteSheet, 
            frameX, frameY, this.frameWidth, this.frameHeight,
            this.x, this.y, this.width, this.height 
        );
    }
    else{ 
        context.translate(this.x + this.width, this.y);
        context.scale(-1, 1); 
        
        context.drawImage(
            this.spriteSheet, 
            frameX, frameY, this.frameWidth, this.frameHeight, 
            0, 0, this.width, this.height 
        );
    }
    context.restore(); 
}
    
        

    }