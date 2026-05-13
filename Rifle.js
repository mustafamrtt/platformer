class Rifle{
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 30;
            this.angle; 
            this.spriteSheet = image("./sprite/riflespritesheet.png");
            this.frameWidth = 46;
            this.frameHeight = 30;
            this.currentFrame=0;
        
            this.clickTime=0;
            this.isClicked = false;
            
      
            this.isDirectionRight = true;
        
        }
        
        update(playerX,playerY,playerWidth){
                this.angle =(Math.atan2(this.y+this.height-cross.y,this.x+this.width/2-cross.x));//silah ile crosshair arasındaki açıyı buluyoruz
                
                if(this.isClicked && Date.now()-this.clickTime >= 400){
                    this.currentFrame = 0;
                    this.isClicked = false;
                }
                
                if(cross.x >= playerX+playerWidth/2){
                  
                    this.x = playerX+playerWidth-35;
                    this.y = playerY+45;
                    
                }   
                else{
                    this.x = playerX-25;
                    this.y = playerY+45;
                }
                   
                
        }
  
        draw(){
            console.log(this.angle);
            context.save();
            context.translate(this.x+this.width,this.y);
            context.rotate(this.angle);
            if(Math.abs(this.angle) > Math.PI / 2){
            
                context.scale(-1,-1);
            }                                   //silahı aynalıyoruz oyuncunun baktığı yere
            else{
                context.scale(-1,1); 
            }
           
            context.drawImage(this.spriteSheet,this.currentFrame*this.frameWidth,0,this.frameWidth,this.frameHeight,
                this.width/-2.0,this.height/-2.0,this.width,this.height
            );//çizim noktasını merkeze akip rotasyon veriyoruz

            context.restore();

          
            
           


        }
    }    