    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const gravity = 0.1;


    canvas.width = 1920;
    canvas.height = 1080;

    
    let isOnGround = false;
    let isKeyUp = false;
    let friction = 0.125;

    let speedMultiplier = 3;
    let bulletCount=-1;
    let gameOver = 0;
    
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
        window.addEventListener("mousedown", (event) => {
     

        if(bulletcontrol(this.bullets)){
            if(bulletCount>=5){
                bulletCount= -1;

            }    
        bulletCount++;
       

        bullets[bulletCount].angle = rifle.angle;
        bullets[bulletCount].x = rifle.x+rifle.width;
        bullets[bulletCount].y = rifle.y;
        bullets[bulletCount].speed.x = -Math.cos(rifle.angle)*10;
        bullets[bulletCount].speed.y = Math.sin(rifle.angle)*10;
        }
    });
        
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
            this.image = image("./sprite/grassground.png");

            this.image.onload = () => {
    
            this.pattern = context.createPattern(this.image,"repeat");
            }
        }
       
        draw(){
            


           if(!this.pattern){
                return;
           }
            // piksellerin çok büyümemesi için yanyana döşüyoruz 
            const matrix = new DOMMatrix();  

            matrix.translateSelf(this.x,this.y-15);

            this.pattern.setTransform(matrix);  

            context.fillStyle = this.pattern;

            context.fillRect(this.x,this.y-15,this.width,this.height);
         
        }
    }


   
    let background= [];
    let platforms = [];
    let player = new Player(); 
    let rifle = new Rifle(player.getPosition().x,player.getPosition().y);
    
    let cross = new Crosshair(mouseX,mouseY);
    
  
    let enemies = [
        new Enemy(800,400,96,94,"./sprite/Woodcutter_idle.png")
    ]
    
    platforms = [
        new Platform(-50, 500, 300, 90),
        new Platform(300,350,300,90),
        new Platform(700,500,500,90)
     
     
    
        
    ];
     background    =  [
        new Background(0,300,100,200,"./sprite/tree.png"),
        new Background(300,150,100,200,"./sprite/tree.png"),
        new Background(300,320,30,30,"./sprite/rock.png"),
        new Background(700,475,30,30,"./sprite/rock.png"),
        new Background(950,430,70,70,"./sprite/plant.png"),
        new Background(540,350,70,50,"./sprite/leaf.png"),
        new Background(750,470,30,30,"./sprite/flower.png"),
        new Background(900,470,30,40,"./sprite/rock2.png"),

    ]
    bullets =  [
        new Bullet(),new Bullet(),new Bullet(),new Bullet(),new Bullet(),
        new Bullet(),new Bullet(),new Bullet(),new Bullet(),new Bullet(),
        
        
    ]
    

   
    
   
    let lastTime= 0;
    function gameLoop(){
        
        let deltaTime = Date.now()-lastTime;
        lastTime = Date.now();
        


        context.clearRect(0, 0, canvas.width, canvas.height);
       
       for(var i=0;i<=bulletCount;i++){
           
            bullets[i].draw();
            bullets[i].update(deltaTime);
           
       }
       
       
        player.draw(rifle.angle);
        
        platforms.forEach(platform => {
            
            platform.draw();

        });
        background.forEach(object=>{
            
            object.draw();
        })
        enemies.forEach(enemy =>{
            enemy.draw();
            enemy.update(deltaTime);
        })
     
        

        
        
        update();
        collisionDetection();
        
        
       
        rifle.update(player.x,player.y,player.width);
        
        cross.update();
        player.update(deltaTime);
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

        
        
      let offset = player.x - 500; 
    
    
    if (offset !== 0) {
        
       
        player.x = 500;
        
        platforms.forEach(platform => {
            platform.x -= offset;
        });
        background.forEach(object => {
            object.x -= offset;
        });
        enemies.forEach(enemy =>{
              enemy.x -= offset;
        });
      
      
    }

        
    }
    function collisionDetection() {
        platforms.forEach(platform => {
            if (player.x <= platform.x + platform.width &&
                player.x + player.width >= platform.x&&
                player.y + player.height>= platform.y &&
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
        enemies.forEach(enemy =>{
             if(player.x <= enemy.x + enemy.width &&
                player.x + player.width >= enemy.x&&
                player.y + player.height>= enemy.y &&
                player.y <= enemy.y + enemy.height)  
            {
                
                player.speed.x = 0;
                player.speed.y = 0;
                player.x = -200;
                player.y = 100;
               
                offset = 0;
            

            }
        });
        enemies.forEach(enemy =>{
            bullets.forEach(bullet =>{
               
             if(bullet.x <= enemy.x + enemy.width &&
                bullet.x + bullet.width >= enemy.x&&
                bullet.y + bullet.height>= enemy.y &&
                bullet.y <= enemy.y + enemy.height)  
            {
                enemy.death = true;
                enemy.x = -700;
                player.bullets+=2;
            

            }
        
   
            
         });
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
        
        
       
      


    }


