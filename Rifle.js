 class Bullet {
     constructor(){
        
        this.x;
        this.y;
        this.height=15;
        this.width=15;
        this.frameWidth=15;
        this.frameHeight=7;
        this.currentFrame=0;
        this.frameCount=4;
        this.frameTimer=0.0;
        this.animationSpeed=350;

        this.image = image("./sprite/bulletspritesheet.png");
        this.animation(4);
        this.speed ={
           x:1,
           y:1
        }
        this.angle;
        
        
      }
      
      animation(frameCount){
            this.frameCount = frameCount;
         
            this.currentFrame = 0;
            this.frameTimer = 0.0;
            


      }
      update(deltaTime){

        
        this.frameTimer += deltaTime;

        if(this.frameTimer>= this.animationSpeed)
        {
            this.currentFrame++;
            this.frameTimer = 0.0;
        } 
        if(this.currentFrame>=this.frameCount)
            this.currentFrame = 0;


        
            
        
        
        

        
      }
      draw(){

            context.save();
            context.translate(this.x,this.y)
            context.rotate(this.angle);
            if(!this.angle>90.0)
                   context.scale(-1,-1); 
            
        
            context.drawImage(this.image,
                this.currentFrame*this.frameWidth,0,
                this.frameWidth,this.frameHeight,
                0,0,this.width,this.height

            )
            context.restore();
       


      }
    }
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
            
            context.save();
            context.translate(this.x+this.width,this.y);
            context.rotate(this.angle);
            if(Math.abs(this.angle) > Math.PI/2){
            
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


   