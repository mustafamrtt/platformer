    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const gravity = 0.1;


    canvas.width = 1280;
    canvas.height = 720;
    
    
    let isOnGround = false;
    let isKeyUp = false;
    let friction = 0.1;

    let speedMultiplier = 3;
    let bulletCount=-1;

    let mouseX,mouseY;

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
   

    let platforms = [];
    let player = new Player(); 
    let rifle = new Rifle(player.getPosition().x,player.getPosition().y);
    
    let cross = new Crosshair(mouseX,mouseY);
  
    
    
    platforms = [
        new Platform(0, 500, 200, 500),
        new Platform(300, 400, 200, 20),
        new Platform(600, 300, 200, 20),
        new Platform(900, 200, 2000, 20)
    
        
    ];
    bullets =  [
        new Bullet(),new Bullet(),new Bullet(),new Bullet(),new Bullet(),
        new Bullet(),new Bullet(),new Bullet(),new Bullet(),new Bullet(),
        new Bullet(),new Bullet(),new Bullet(),new Bullet(),new Bullet(),
        new Bullet(),new Bullet(),new Bullet(),new Bullet(),new Bullet(),
        new Bullet(),new Bullet(),new Bullet(),new Bullet(),new Bullet(),
        new Bullet(),new Bullet(),new Bullet(),new Bullet(),new Bullet(),
        new Bullet(),new Bullet(),new Bullet(), new Bullet(), new Bullet(),
    ]
    
    player.start();
   
    
   
    let lastTime= 0;
    function gameLoop(){
        
        let deltaTime = Date.now()-lastTime;
        lastTime = Date.now();
        


        context.clearRect(0, 0, canvas.width, canvas.height);
        platforms.forEach(platform => {
            
            platform.draw();

        });
       for(var i=0;i<=bulletCount;i++){
           
            bullets[i].draw();
            bullets[i].update(deltaTime);
           
       }

     
        player.update(deltaTime);

        update();
        collisionDetection();
        
        
       
        rifle.update(player.x,player.y);
        
        cross.update();
        player.draw(rifle.angle);
        cross.draw();
        rifle.draw()
    
        requestAnimationFrame(gameLoop);

    }
    keyHandler();
    
   
    gameLoop();


    function update(){
        
        player.x += player.speed.x;
        player.speed.y += gravity;
        player.y += player.speed.y;
        

        if(player.speed.x > 0 && isOnGround && isKeyUp){
            player.speed.x -= friction;
            if(player.speed.x < 0.1){
                player.speed.x = 0;
            }
        }else if(player.speed.x < 0 && isOnGround && isKeyUp){
           player.speed.x += friction;
           if(player.speed.x > -0.1){
            player.speed.x = 0;
           }
        }
        for(var i=0;i<=bulletCount;i++){
            bullets[i].x += bullets[i].speed.x;
            bullets[i].y -= bullets[i].speed.y;
         }

        
        
      let kaymaMiktari = player.x - 500; 
    
    
    if (kaymaMiktari !== 0) {
        
       
        player.x = 500;
      
        platforms.forEach(platform => {
            platform.x -= kaymaMiktari;
        });
    }

        
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
                else
                    isOnGround = false;
                    

                   
                
                           
                
                
                

                if(!isOnGround){
                    player.speed.x = 0;
                }

              
                
            
            }
          
           
           
        });
        platforms.forEach(platform =>{
            if(player.x >= platform.x&&
               player.x <= platform.x+platform.width
            ){
                if((player.y< platform.y-platform.height||player.y>platform.y-platform.height)&&!(player.y == platform.y-player.height)){//platformun üstünde değilse
                    isOnGround = false;                                   
                }


            }

        });
    }
    function bulletcontrol(bullets){
        if(player.bullets>0){
            player.bullets-=1;
            return 1;
        }
        else{
            return 0;
        }
    }
    


    function keyHandler() {
        window.addEventListener("keydown", (event) => {
            
            
            
            if (event.code === "KeyD") {
                player.speed.x = speedMultiplier;
                isKeyUp = false;
            } else if (event.code === "KeyA") {
                player.speed.x = -speedMultiplier;
                isKeyUp = false;
            }
                else if(event.code === "Space" && isOnGround) {
                player.speed.y = -5.0;
            }
            
        });   
       
       window.addEventListener("keyup", (event) => {
            if (event.code === "KeyD" || event.code === "KeyA") {
               isKeyUp = true;
            }
        });
        
        window.addEventListener("mousedown", (event) => {
     

        if(bulletcontrol(this.bullets)){    
        bulletCount++;
       

        bullets[bulletCount].angle = rifle.angle;
        bullets[bulletCount].x = rifle.x+rifle.width;
        bullets[bulletCount].y = rifle.y;
        bullets[bulletCount].speed.x = -Math.cos(rifle.angle)*4;
        bullets[bulletCount].speed.y = Math.sin(rifle.angle)*4;
      
        rifle.isClicked = true;
        rifle.clickTime = Date.now();
        rifle.currentFrame = 1; // ateş animasyonu
        player.speed.x +=7*(Math.cos(rifle.angle));//X eksenine göre recoil
        let speedY = 7*(Math.sin(rifle.angle));//Y eksenine göre recoil
        
        
        
        if(isOnGround && speedY < 0){
            player.speed.y += speedY;
        }
    }
    });
       
      


    }


