    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const gravity = 0.03;


    canvas.width = 1280;
    canvas.height = 720;
    let collision = 0;
    let acceleration = 0.1;
    let isOnGround = false;
    let mouseX,mouseY;
    class Player {
         
        


        constructor() {
            this.x=100.0;
            this.y= 100.0;
            this.height =178;
            this.width = 120;
            this.spriteSheet;
            this.frameHeight = 88;
            this.frameWidth = 60;
          
            this.currentFrame=0;
        
            this.frameCount=0;
            this.frameTimer=0;
            this.animationspeed = 350;
            
          

            this.IDLE = 0;
            this.RUNNING = 1;
            this.JUMPING = 2;
            this.isDirectionRight = true; //yön kontrolü
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
            this.spriteSheet = image("spritesheet.png");

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
           else if(this.speed.x>0&&isOnGround){
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
    

    context.save(); //contexti kaydediyoruz değişiklik için
            //gittiği yöne ve silahın açısına göre çizimi yapıyoruz.
    if(this.isDirectionRight&&angle>90.0){ 
        //SAĞ
        context.drawImage(
            this.spriteSheet, 
            frameX, frameY, this.frameWidth, this.frameHeight,
            this.x, this.y, this.width, this.height
        );
    }
    else{ 
        //Sol
        context.translate(this.x + this.width, this.y);
        context.scale(-1, 1); //sola gittiği için karakteri aynalıyoruz
        
        context.drawImage(
            this.spriteSheet, 
            frameX, frameY, this.frameWidth, this.frameHeight,  
            0, 0, this.width, this.height 
        );
    }
    context.restore(); //değişikliği uyguluyoruz
}
    
        

    }    
    class crosshair{
        constructor(){
           this.x=0;
           this.y=0; 

           
        }
         update(){
             window.addEventListener("mousemove",(event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            }) ;

            this.x = mouseX;
            this.y = mouseY;
        }

        draw(){
            context.beginPath();
            context.moveTo(mouseX,mouseY);
            context.lineTo(mouseX-6,mouseY);
            context.lineTo(mouseX+6,mouseY);
            context.moveTo(mouseX,mouseY);
            context.lineTo(mouseX,mouseY+6);
             context.lineTo(mouseX,mouseY-6);
            context.strokeStyle= "red";
            context.stroke();
        }

    }
    class Rifle{
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.width = 90;
            this.height = 90;
            this.angle; 
            this.spriteSheet = image("riflespritesheet.png");
            this.frameWidth = 46;
            this.frameHeight = 30;
            this.currentFrame=0;
        
            this.clickTime=0;
            this.isClicked = false;
            
      
            this.isDirectionRight = true;
        }
        
        update(playerX,playerY){
                this.angle =(90.0-Math.atan2(this.x+this.width/2-mouseX,this.y+this.height/2-mouseY));//silah ile mouse arasındaki açıyı buluyoruz
                
                if(this.isClicked && Date.now()-this.clickTime >= 400){
                    this.currentFrame = 0;
                    this.isClicked = false;
                }
                if(this.angle>90.00){
                    this.x = playerX+player.width-30;
                    this.y = playerY+100;
                    
                }   
                else{
                    this.x = playerX+30;
                    this.y = playerY+100;
                   
                }
        }
              
        draw(){
            console.log(this.angle);
            context.save();
            context.translate(this.x,this.y);
            context.rotate(this.angle);
            if(this.angle>90.00){
             context.scale(-1,-1);//silahı aynalıyoruz oyuncunun baktığı yere
            }
            else{
                context.scale(-1,1);//silahı aynalıyoruz oyuncunun baktığı yöne
            }
            context.drawImage(this.spriteSheet,this.currentFrame*this.frameWidth,0,this.frameWidth,this.frameHeight,
                this.width/-2.0,this.height/-2.0,this.width,this.height
            );//çizim noktasını merkeze akip rotasyon veriyoruz

            context.restore();

          
            
           


        }
    }
    class Platform {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        
        }
       
        draw(){
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    function image(imageSrc) {
        let img = new Image();
        img.src = imageSrc;
        return img;
    }

    let platforms = [];
    let player = new Player(); 
    let rifle = new Rifle(player.getPosition().x,player.getPosition().y);
    let cross = new crosshair(mouseX,mouseY);
    

    platforms = [
        new Platform(0, 500, 200, 500),
        new Platform(300, 400, 200, 20),
        new Platform(600, 300, 200, 20),
        new Platform(900, 200, 200, 20)
    ];
    
    player.start();
    
    
    let lastTime= 0;
    function gameLoop(timeStamp){
        
        
        const deltaTime = timeStamp -lastTime;
        lastTime = timeStamp;



        context.clearRect(0, 0, canvas.width, canvas.height);
        platforms.forEach(platform => {
            
            platform.draw();

        });
     
        player.update(deltaTime);
        update();
        collisionDetection();
        cross.draw();
        cross.update();

        player.draw(rifle.angle);
        rifle.update(player.x,player.y);
        rifle.draw()
       
    
       
        
        
        
    
        
        requestAnimationFrame(gameLoop);

    }
    keyHandler();
   


    function update(){
        
        player.x += player.speed.x;
        player.speed.y += gravity;
        player.y += player.speed.y;
        isOnGround = false;
        platforms.forEach(platform => {
            if(player.x >= 500){
            let current_speed = player.speed.x;
            platform.x -= current_speed;
            }
        });
        
    }
    function collisionDetection() {
        platforms.forEach(platform => {
            if (player.x <= platform.x + platform.width &&
                player.x + player.width >= platform.x&&
                player.y + player.height >= platform.y &&
                player.y <= platform.y + platform.height
                ) {
        
                
                if(player.speed.y > 0 && player.y + player.height <= platform.y + player.speed.y) {
                        player.y = platform.y - player.height;
                        if(player.speed.y > 0) {
                            player.speed.y = 0;
                            isOnGround = true;

                        }
                        
                        
                    }
                if(!isOnGround){
                    player.speed.x = 0;
                }  
                
            
            }
        });
    }


    function keyHandler() {
        window.addEventListener("keydown", (event) => {
            
            
            
            if (event.code === "ArrowRight") {
                player.speed.x = 2;
                player.lastKey = 0;
            } else if (event.code === "ArrowLeft") {
                player.speed.x = -2;
                player.lastKey = 2;
            }
                else if(event.code === "ArrowUp"&& isOnGround) {
                player.speed.y = -2.9;
            }
            
        });   
        window.addEventListener("keyup", (event) => {
            if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
                player.speed.x = 0;
            }
        });
        canvas.addEventListener("mousedown", (event) => {
        rifle.isClicked = true;
        rifle.clickTime = Date.now();
        rifle.currentFrame = 1; // ateş animasyonu
    });
       
      


    }

