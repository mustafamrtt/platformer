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
    
    let gunsound  = document.getElementById("gunfire");
    let music = document.getElementById("background");

    
    

 
   
    class bulletGui{

        constructor(){
            this.x;
            this.y;
            this.count;
            context.font= "100px Arial";
        }

        update(){
            this.count = "[]"+player.bullets;
            this.x = player.x-500;
            this.y = 1050;
        }

        draw(){
            
            context.fillText(this.count,this.x, this.y);
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
            this.matrix = new DOMMatrix(); 
            }
            
        }
       
        draw(){
            


           if(!this.pattern){
                return;
           }
            // piksellerin çok büyümemesi için yanyana döşüyoruz 
             
            this.matrix.e = this.x;
            this.matrix.f = this.y-15;

            

            this.pattern.setTransform(this.matrix);  

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
        new Enemy(800,400,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(2250,500,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(6400,400,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(7600,700,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(8000,700,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(10500,250,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(10500,250,96,94,"./sprite/Woodcutter_idle.png")
    ];

    let spikes = [ 
       new Spike(1600, 560, 80,80,"./sprite/Spike.png"),
       new Spike(1900, 560, 80,80,"./sprite/Spike.png"),
       
    ];
    
    platforms = [
        new Platform(-50, 500, 250, 90),
        new Platform(300, 400, 300, 90),
        new Platform(700, 500, 500, 90),
        new Platform(1400, 600, 1000, 40),
        new Platform(2600, 315, 350, 40),
        new Platform(2950, 225, 850, 100),
        new Platform(3800, 650, 250, 100), //diken koyulacak.
        new Platform(4050, 225, 100, 30),
        new Platform(4150, 650, 250, 100),
        new Platform(4400, 225, 100, 30),
        new Platform(4500, 650, 250, 100),
        new Platform(4700, 225, 850, 100),
        new Platform(5650, 500, 850, 300),
        new Platform(6650, 250, 200, 100),
        new Platform(7000, 250, 200, 100),
        new Platform(7350, 250, 200, 100),
        new Platform(7550, 800, 1000, 100),
        new Platform(8800, 200, 350, 50),
        new Platform(9150, 250, 350, 50),
        new Platform(9500, 300, 350, 50),
        new Platform(9850, 350, 750, 50),
        new Platform(11250, 300, 400, 50),
        new Platform(11650, 500, 350, 50),
        new Platform(12000, 800, 350, 50),
        new Platform(12500, 750, 100, 50),
        new Platform(12750, 650, 100, 50),
        new Platform(13000, 700, 100, 50),
        new Platform(13250, 750, 100, 50),
        new Platform(13500, 725, 100, 50),  
        new Platform(13750, 650, 100, 50),
        new Platform(14000, 700, 1000, 100),
        new Platform(15600, 500, 500, 100),
        new Platform(16250, 600, 40, 100),
        new Platform(16450, 550, 40, 100),
        new Platform(16700, 625, 40, 100),
        new Platform(16900, 575, 40, 100),
        new Platform(17250, 610, 40, 100),
        new Platform(17500, 700, 40, 100),
        new Platform(17700, 630, 40, 100),
        new Platform(18000, 600, 1000, 100),
        new Platform(19000, 500, 500, 100)

    
        
    ];
     background    =  [
        new Background(0,300,100,200,"./sprite/tree.png"),
        new Background(300,200,100,200,"./sprite/tree.png"),
        new Background(300,370,30,30,"./sprite/rock.png"),
        new Background(700,475,30,30,"./sprite/rock.png"),
        new Background(950,430,70,70,"./sprite/plant.png"),
        new Background(540,350,70,50,"./sprite/leaf.png"),
        new Background(750,470,30,30,"./sprite/flower.png"),
        new Background(900,470,30,40,"./sprite/rock2.png"),

    ]
    bullets =  [
        new Bullet(),new Bullet(),new Bullet(),new Bullet(),new Bullet(),
        new Bullet(),new Bullet(),new Bullet(),new Bullet(),new Bullet()
    ]
    let bullet =new bulletGui();

   
    
   
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
     
        spikes.forEach(spike => {
            spike.draw();
       });

        
        
        update();
        collisionDetection();
        
        
       
        rifle.update(player.x,player.y,player.width);
        bullet.update(player.x,player.y);
        cross.update();
        player.update(deltaTime);
        cross.draw();
        rifle.draw()
        bullet.draw();
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
        spikes.forEach(spike => {
              spike.x -= offset;
        });
      
      
    }

        
    }
    function collisionDetection() {
     

    platforms.forEach(platform => {
        
        
        if (player.x <= platform.x + platform.width &&
            player.x + player.width >= platform.x &&
            player.y + player.height >= platform.y &&
            player.y <= platform.y + platform.height) 
        {
            if(player.speed.y > 0 && player.y + player.height <= platform.y + player.speed.y) {
                player.y = platform.y - player.height;
                player.speed.y = 0;
                isOnGround = true;
            } else {
                isOnGround = false;
            }

            if(!isOnGround){
                player.speed.x = 0;
            }
        } else if (player.x >= platform.x && player.x <= platform.x + platform.width) {
            // Platformun üstünde değilse düşme kontrolü
            if(player.y !== platform.y - player.height) {
                isOnGround = false;                                   
            }
        }

        bullets.forEach(bullet => {
            
            if (bullet.y === -700) return; 

            if (bullet.x <= platform.x + platform.width &&
                bullet.x + bullet.width >= platform.x &&
                bullet.y + bullet.height >= platform.y &&
                bullet.y <= platform.y + platform.height)  
            {
                
                bullet.y = -700; 
                bullet.speed.x = 0;
                bullet.speed.y = 0;
            }
        });       
    });


    enemies.forEach(enemy => {
        
        if (enemy.death) return;

        
        if (player.x <= enemy.x + enemy.width &&
            player.x + player.width >= enemy.x &&
            player.y + player.height >= enemy.y &&
            player.y <= enemy.y + enemy.height)  
        {   
            gameOver = 1;
            


        }

        
        bullets.forEach(bullet => {
            if (bullet.y === -700 ) return; 

            if (bullet.x <= enemy.x + enemy.width &&
                bullet.x + bullet.width >= enemy.x &&
                bullet.y + bullet.height >= enemy.y &&
                bullet.y <= enemy.y + enemy.height)  
            {
               
                enemy.death = true;
                bullet.y = -700; 
                player.bullets += 2;
                
                setTimeout(() => { 
                    enemy.x = -700;
                }, 1250);
            }
        });
    });
    spikes.forEach(spike => {
    
        if (player.x <= spike.x + spike.width &&
             player.x + player.width >= spike.x &&
             player.y + player.height >= spike.y &&
             player.y <= spike.y + spike.height) {
                
                  
                gameOver = 1;
               
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
        
        
       
      


    }

    window.addEventListener("mousedown", (event) => {
     

        if(bulletcontrol(this.bullets)){
            if(bulletCount>=9){
                bulletCount= -1;

            }    
        bulletCount++;
       
        
        gunsound.play();      
        music.play(); 
       
 
        bullets[bulletCount].angle = rifle.angle;
        bullets[bulletCount].x = rifle.x+rifle.width;
        bullets[bulletCount].y = rifle.y;
        bullets[bulletCount].speed.x = -Math.cos(rifle.angle)*10;
        bullets[bulletCount].speed.y = Math.sin(rifle.angle)*10;

        
        
    
        }
    });


