    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const gravity = 0.1;


    canvas.width = 1280;
    canvas.height = 720;
    
    
    let isOnGround = false;
    let isKeyUp = false;
    let friction = 0.1;

    let speedMultiplier = 3;


    let mouseX,mouseY;

    class Bullet {
     constructor(){
        
        this.x;
        this.y;
        this.speed ={
           x:0,
           y:0
        }
        this.angle; 
        this.isClicked;
      }
        
      update(rifleAngle, rifleX, rifleY, isClicked){
        this.x = rifleX + 10;
        this.y = rifleY;
        this.angle = rifleAngle;
        this.isClicked = isClicked;
        
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
    
    player.start();
    isOnGround = false;
    
   
    let lastTime= 0;
    function gameLoop(){
        
        let deltaTime = Date.now()-lastTime;
        lastTime = Date.now();
        


        context.clearRect(0, 0, canvas.width, canvas.height);
        platforms.forEach(platform => {
            
            platform.draw();

        });

     
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

        
        
      let kaymaMiktari = player.x - 100; 
    
    
    if (kaymaMiktari !== 0) {
        
       
        player.x = 100;
      
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
                else if(event.code === "Space"&& isOnGround) {
                player.speed.y = -5.0;
            }
            
        });   
       
       window.addEventListener("keyup", (event) => {
            if (event.code === "KeyD" || event.code === "KeyA") {
               isKeyUp = true;
            }
        });
        
        window.addEventListener("mousedown", (event) => {
        rifle.isClicked = true;
        rifle.clickTime = Date.now();
        rifle.currentFrame = 1; // ateş animasyonu
        player.speed.x +=5*(Math.cos(rifle.angle));//X eksenine göre recoil
        let speedY = 5*(Math.sin(rifle.angle));//Y eksenine göre recoil
        
        if(isOnGround && speedY < 0){
            player.speed.y += speedY;
        }
    });
       
      


    }


