class Enemy{

    constructor(x,y,imagepath){

        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 96;
        this.image = image(imagepath);
        this.deathImage = image("./sprite/Woodcutter_death.png");
        this.frameCount=4;
        this.frameWidth=29;
        this.frameHeight=48;
        this.deathframeWidth=48;
        this.deathframeHeight=48;
        this.deathCurrentFrame = 0;
        this.currentFrame;
        this.death = false;
        this.frameTimer;
        this.animationSpeed = 250;
        

        this.animation();
    


    }
    animation(){
        this.frameTimer = 0.0;
        this.currentFrame = 0;
    }
    update(deltaTime){

        if(this.death){ //duruma göre spriteı update ediyoruz
            
            if(this.frameTimer>= this.animationSpeed){
                this.deathCurrentFrame++;                    ///animasyon hızına ve zamanlayıcıya göre Framei arttırıyoruz.                  
                this.frameTimer = 0.0;                                                      
            }


            
            if(this.deathCurrentFrame>=6){
                                                          ///spritesheetteki frame sayısını kontrol edip başa dönüyoruz.
                 this.frameTimer = 0;
            }
            else{
                this.frameTimer += deltaTime;           //geçen zamanı frameTimer'a ekliyoruz.
            }
        }

        
        else{
        if(this.frameTimer >= this.animationSpeed){
            this.currentFrame++;                                
            this.frameTimer = 0.0;
        }
        this.frameTimer += deltaTime;
        if(this.currentFrame>=this.frameCount){
            this.currentFrame = 0;
        }
    }


        

        
    }
    
    draw() {
    context.save();
    context.translate(this.x + this.width, this.y);
    
    
    context.scale(-1, 1);           //Aynalıyoruz.

    if (this.death) {
        context.drawImage(
            this.deathImage, 
            this.deathCurrentFrame * this.deathframeWidth, 0, 
            this.deathframeWidth, this.frameHeight, 
            0, 0, this.width, this.height
      );
    } else {
        context.drawImage(
            this.image, 
            this.currentFrame * this.frameWidth, 0,
            this.frameWidth, this.frameHeight,
            0, 0, this.width, this.height 
        );
    }
    context.restore(); 
}


}