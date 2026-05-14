    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const gravity = 0.1;


    canvas.width = 1280;
<<<<<<< HEAD
    canvas.height = 720;
    let collision = 0;
    let acceleration = 0.1;
    let isOnGround = false;
    let mouseX,mouseY;
    class Player {
         
        
=======
    canvas.height = 960;

    
    
    let isOnGround = false;
    let isKeyUp = false;
    let friction = 0.125;

    let speedMultiplier = 3;
    let bulletCount=-1;
    let gameOver = 0;
    
    let mouseX,mouseY;

    let offset = 0;
    
    let gunsound  = document.getElementById("gunfire");
    let music = document.getElementById("background");
>>>>>>> animation

    let totaloffset = 0;
    
    

<<<<<<< HEAD
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
=======
 
   
    class bulletGui{

        constructor(){
            this.x;
            this.y;
            this.count;
            context.font= "bold 70px serif";
            this.image = image("./sprite/bullet.png");
            this.matrix = new DOMMatrix();
        }

        update(){
            this.count = player.bullets;
            this.x = player.x-400;
            this.y = 100;
        }

        draw(){
            
            context.fillText(this.count,this.x, this.y);
            context.drawImage(this.image,this.x-60,this.y-90,50,100);
>>>>>>> animation
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
            // Kaynaktan (spritesheet) kesilecek alanın koordinatları (Burayı değiştirmedin)
    let frameX = this.currentFrame * this.frameWidth;
    let frameY = this.currentRow * this.frameHeight;
    

    context.save(); // Canvas ayarlarını kaydet

    if(this.isDirectionRight&&angle>90.0){ 
        // --- SAĞA BAKIYORSA (Normal Çizim) ---
        // Son iki parametreye DİKKAT: Artık 'this.width' ve 'this.height' (büyük boyutlar) kullanıyoruz.
        context.drawImage(
            this.spriteSheet, 
            frameX, frameY, this.frameWidth, this.frameHeight, // Spritedaki orijinal boyut (kesim)
            this.x, this.y, this.width, this.height // Ekranda çizilecek büyük boyut
        );
    }
    else{ 
        // --- SOLA BAKIYORSA (Aynalayarak Çizim) ---
        // Karakteri büyüttüğümüz için, aynalama kaydırmasını da (translate) büyük boyuta göre yapmalıyız.
        // DİKKAT: 'this.x + this.frameWidth' yerine 'this.x + this.width' yazıyoruz!
        context.translate(this.x + this.width, this.y);
        context.scale(-1, 1); // X ekseninde ters çevir (aynalama efekti)
        
        context.drawImage(
            this.spriteSheet, 
            frameX, frameY, this.frameWidth, this.frameHeight, // Spritedaki orijinal boyut (kesim)
            0, 0, this.width, this.height // Ekranda çizilecek büyük boyut (translate yapıldığı için x:0, y:0)
        );
    }
    context.restore(); // Canvas ayarlarını eski haline getir
}
    
        

<<<<<<< HEAD
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
=======

    }
   
>>>>>>> animation
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
<<<<<<< HEAD
    let cross = new crosshair(mouseX,mouseY);
    
=======
    
    let cross = new Crosshair(mouseX,mouseY);

  
    let enemies = [
        new Enemy(800,400,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(2250,500,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(3600,120,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(6400,400,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(7600,700,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(7850,700,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(10500,250,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(14300,600,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(18400,800,96,94,"./sprite/Woodcutter_idle.png"),
        new Enemy(18600,800,96,94,"./sprite/Woodcutter_idle.png"),
>>>>>>> animation

        
    ];
<<<<<<< HEAD
    
    player.start();
    
    
    let lastTime= 0;
    function gameLoop(timeStamp){
        
        
        const deltaTime = timeStamp -lastTime;
        lastTime = timeStamp;



=======

    let spikes = [ 
       new Spike(1600, 560, 80, 80,"./sprite/Spike.png"),
       new Spike(1900, 560, 80, 80,"./sprite/Spike.png"),
       new Spike(3150, 180, 80, 80,"./sprite/Spike.png"),
       new Spike(3350, 180, 80, 80,"./sprite/Spike.png"),
       new Spike(3800, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(3840, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(3880, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(3920, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(3960, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(4150, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(4190, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(4230, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(4270, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(4310, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(4500, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(4540, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(4580, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(4620, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(4660, 310, 80, 80,"./sprite/Spike.png"),
       new Spike(5000, 180, 80, 80,"./sprite/Spike.png"),
       new Spike(5250, 180, 80, 80,"./sprite/Spike.png"),
       new Spike(8150, 760, 80, 80,"./sprite/Spike.png"),
       new Spike(8180, 760, 80, 80,"./sprite/Spike.png"),
       new Spike(8210, 760, 80, 80,"./sprite/Spike.png"),
       new Spike(9060, 160, 80, 80,"./sprite/Spike.png"),
       new Spike(9085, 160, 80, 80,"./sprite/Spike.png"),
       new Spike(9410, 210, 80, 80,"./sprite/Spike.png"),
       new Spike(9435, 210, 80, 80,"./sprite/Spike.png"),
       new Spike(9760, 260, 80, 80,"./sprite/Spike.png"),
       new Spike(9785, 260, 80, 80,"./sprite/Spike.png"),
       new Spike(11585, 260, 80, 80,"./sprite/Spike.png"),
       new Spike(11935, 460, 80, 80,"./sprite/Spike.png"),
       new Spike(12285, 760, 80, 80,"./sprite/Spike.png"),
       new Spike(14450, 660, 80, 80,"./sprite/Spike.png"),
       new Spike(14700, 660, 80, 80,"./sprite/Spike.png"),
       new Spike(18100, 860, 80, 80,"./sprite/Spike.png"),
       new Spike(18130, 860, 80, 80,"./sprite/Spike.png"),
       new Spike(18160, 860, 80, 80,"./sprite/Spike.png"),
       new Spike(18480, 860, 80, 80,"./sprite/Spike.png"),
       new Spike(18500, 860, 80, 80,"./sprite/Spike.png"),
       new Spike(18520, 860, 80, 80,"./sprite/Spike.png"),
       new Spike(18540, 860, 80, 80,"./sprite/Spike.png")
       

    ];
    
    platforms = [
        new Platform(-50, 500, 250, 90),
        new Platform(300, 400, 300, 90),
        new Platform(700, 500, 500, 90),
        new Platform(1400, 600, 1000, 40),
        new Platform(2600, 315, 350, 40),
        new Platform(2950, 225, 850, 100),
        new Platform(3800, 350, 225, 100), //diken koyulacak.
        new Platform(4025, 225, 100, 30),
        new Platform(4150, 350, 225, 100),
        new Platform(4400, 225, 100, 30),
        new Platform(4500, 350, 225, 100),
        new Platform(4725, 225, 850, 100),
        new Platform(5650, 500, 850, 100),
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
        new Platform(16350, 600, 100, 50),
        new Platform(16550, 550, 100, 50),
        new Platform(16800, 625, 100, 50),
        new Platform(17000, 575, 100, 50),
        new Platform(17350, 610, 100, 50),
        new Platform(17600, 700, 100, 50),
        new Platform(17820, 630, 100, 50),
        new Platform(18100, 900, 1000, 100),
        new Platform(19100, 150, 500, 100)

    
        
    ];
     background    =  [
        new Background(0,300,100,200,"./sprite/tree.png"),
        new Background(340,200,100,200,"./sprite/tree.png"),
        new Background(300,370,30,30,"./sprite/rock.png"),
        new Background(700,475,30,30,"./sprite/rock.png"),
        new Background(950,430,70,70,"./sprite/plant.png"),
        new Background(540,350,70,50,"./sprite/leaf.png"),
        new Background(750,470,30,30,"./sprite/flower.png"),
        new Background(900,470,30,40,"./sprite/rock2.png"),
        new Background(100,60,400,400,"./sprite/cloud1.png"),
        new Background(700,50,400,400,"./sprite/cloud2.png"),
        new Background(1200,55,400,400,"./sprite/cloud2.png"),
        new Background(2000,20,400,400,"./sprite/cloud2.png"),
        new Background(2800,0,400,400,"./sprite/cloud2.png"),
        new Background(3400,0,400,400,"./sprite/cloud2.png"),
        new Background(4000,20,400,400,"./sprite/cloud2.png"),
        new Background(4500,10,400,400,"./sprite/cloud1.png"),
        new Background(5500,25,400,400,"./sprite/cloud2.png"),
        new Background(6500,15,400,400,"./sprite/cloud1.png"),
        new Background(7400,10,400,400,"./sprite/cloud2.png"),
        new Background(8000,10,400,400,"./sprite/cloud1.png"),
        new Background(9500,20,400,400,"./sprite/cloud2.png"),
        new Background(11000,10,400,400,"./sprite/cloud1.png"),
        new Background(12000,40,400,400,"./sprite/cloud2.png"),
        new Background(14000,30,400,400,"./sprite/cloud1.png"),
        new Background(14500,50,400,400,"./sprite/cloud2.png"),
        new Background(15000,20,400,400,"./sprite/cloud2.png"),
        new Background(16000,10,400,400,"./sprite/cloud2.png"),
        new Background(17000,10,400,400,"./sprite/cloud2.png"),
        new Background(19000,20,400,400,"./sprite/cloud2.png"),
        new Background(1750,400,100,200,"./sprite/tree.png"),
        new Background(2750,115,100,200,"./sprite/tree.png"),
        new Background(2900,270,30,40,"./sprite/rock2.png"),
        new Background(2850,280,30,30,"./sprite/flower.png"),
        new Background(4900,30,100,200,"./sprite/tree.png"),
        new Background(5125,30,100,200,"./sprite/tree.png"),
        new Background(5350,30,100,200,"./sprite/tree.png"),
        new Background(5700,450,30,40,"./sprite/rock2.png"),
        new Background(5885,450,30,40,"./sprite/rock2.png"),
        new Background(5800,450,70,50,"./sprite/leaf.png"),
        new Background(5775,460,30,30,"./sprite/rock.png"),
        new Background(5900,450,70,50,"./sprite/leaf.png"),
        new Background(8400,600,100,200,"./sprite/tree.png"),
        new Background(14050,650,70,50,"./sprite/leaf.png"),
        new Background(14150,500,100,200,"./sprite/tree.png"),
        new Background(14225,660,30,30,"./sprite/rock.png"),
        new Background(14520,500,100,200,"./sprite/tree.png"),
        new Background(14770,500,100,200,"./sprite/tree.png"),
        new Background(15800,300,100,200,"./sprite/tree.png"),
        new Background(15925,450,30,40,"./sprite/rock2.png"),
        new Background(15700,450,70,50,"./sprite/leaf.png"),
        new Background(18300,700,100,200,"./sprite/tree.png"),
        new Background(18800,700,100,200,"./sprite/tree.png")
      



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
        
        console.log(totaloffset);
        
     
>>>>>>> animation
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        for(var i=0;i<=bulletCount;i++){
           
            bullets[i].draw();
            bullets[i].update(deltaTime);
           
        }
       
       
        player.draw(rifle.angle);
        
        platforms.forEach(platform => {
            
            platform.draw();

        });
<<<<<<< HEAD
     
        player.update(deltaTime);
        update();
        collisionDetection();
        cross.draw();
        cross.update();

        player.draw(rifle.angle);
        rifle.update(player.x,player.y);
        rifle.draw()
       
    
       
        
        
        
    
        
=======
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
>>>>>>> animation
        requestAnimationFrame(gameLoop);

    }
    keyHandler();
<<<<<<< HEAD
   

=======
    
   
    gameLoop();

    
    
>>>>>>> animation

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

        
        

      offset = player.x - 500; 
    

    
    if (offset !== 0) {
        
       
        player.x = 500;
        
        platforms.forEach(platform => {
            totaloffset += offset;
            platform.x -= offset;
        });
        background.forEach(object => {
            totaloffset += offset;
            object.x -= offset;
        });
        enemies.forEach(enemy =>{
            totaloffset += offset;
              enemy.x -= offset;
        });
        spikes.forEach(spike => {
             totaloffset += offset;
              spike.x -= offset;
        });
      
      
    }

        
    }
    function collisionDetection() {
<<<<<<< HEAD
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
                
=======
    
        if(player.y>960){

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "100px serif";
            context.fillText("Game Over",canvas.width/2-200,canvas.height/2);


        }

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
>>>>>>> animation
            
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
           
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "100px serif";
            context.fillText("Game Over",canvas.width/2-200,canvas.height/2);
            player.y = 970;
            
            
                  
                


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
                

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "100px serif";
            context.fillText("Game Over",canvas.width/2-200,canvas.height/2);
            
            player.y = 970;
            
            
            
            
                  
                
               
      }
      });

}
   
  

   
    
    function bulletcontrol(bullets){
        if(player.bullets>0){
            //player.bullets-=1;
            return 1;
        }
        else{
            return 0;
        }
    }
    


    function keyHandler() {
        window.addEventListener("keydown", (event) => {
            
            if(!gameOver){
            
<<<<<<< HEAD
            
            if (event.code === "ArrowRight") {
                player.speed.x = 2;
                player.lastKey = 0;
            } else if (event.code === "ArrowLeft") {
                player.speed.x = -2;
                player.lastKey = 2;
            }
                else if(event.code === "ArrowUp"&& isOnGround) {
                player.speed.y = -2.9;
=======
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
>>>>>>> animation
            }
            
        });   
       
       window.addEventListener("keyup", (event) => {
            if (event.code === "KeyD" || event.code === "KeyA") {
               isKeyUp = true;
            }
        });
<<<<<<< HEAD
        canvas.addEventListener("mousedown", (event) => {
        rifle.isClicked = true;
        rifle.clickTime = Date.now();
        rifle.currentFrame = 1; // ateş animasyonu
    });
=======
        
        
>>>>>>> animation
       
      


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


