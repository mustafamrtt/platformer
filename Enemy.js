class Enemy{

    constructor(x,y,width,height,imagepath){

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image(imagepath);
        this.frameCount=4;
        this.frameWidth=29;
        this.frameHeight=48;
        this.currentFrame;
        
        this.frameTimer;
        this.animationSpeed = 250;
        

        this.animation();
    


    }
    animation(){
        this.frameTimer = 0.0;
        this.currentFrame = 0;
    }
    update(deltaTime){

        

        
        
        if(this.frameTimer >= this.animationSpeed){
            this.currentFrame++;
            this.frameTimer = 0.0;
        }
        this.frameTimer += deltaTime;
        if(this.currentFrame>=this.frameCount){
            this.currentFrame = 0;
        }


        

        
    }
    
    draw(){
        context.save();
        context.translate(this.x+this.width,this.y);
       
        context.scale(-1,1);
        context.drawImage(this.image,this.currentFrame*this.frameWidth,0,
            this.frameWidth,this.frameHeight,
            0,0,this.width,this.height // translate yaptığımız için x ve y değerlerini 0 giriyoruz.
        );
        context.restore();
        
        
    }


}