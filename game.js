    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const gravity = 0.03;


    canvas.width = 1024;
    canvas.height = 728;
    let collision = 0;
    let isOnGround = false;

    canvas.style.cursor = 'none';
    
    let mouse = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };


    class Player {


        constructor() {
            let x = 100;
            let y = 100;
            let height = 70;
            let width = 50;
            this.image = image("characther.png");
            this.x = x;
            this.y = y;
            this.height = height;
            this.width = width;
            this.speed = {
                x: 0,
                y:  0
            }
            
        
        }
        
        draw(){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            
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


    platforms = [
        new Platform(0, 500, 200, 500),
        new Platform(300, 400, 200, 20),
        new Platform(600, 300, 200, 20),
        new Platform(900, 200, 200, 20)
    ];


    function Crosshair(){
        
        context.beginPath();

        context.moveTo(mouse.x - 7 , mouse.y);
        context.lineTo(mouse.x + 7 , mouse.y);
        context.moveTo(mouse.x , mouse.y - 7);
        context.lineTo(mouse.x , mouse.y + 7);

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

    }


    function gameLoop(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        platforms.forEach(platform => {
            
            platform.draw();

        });
        player.draw();

        Crosshair();
        
        
        
    
        update();
        collisionDetection();
        requestAnimationFrame(gameLoop);

    }
    keyHandler();

    mouseHandler();



    function update(){
        
        player.x += player.speed.x;
        player.speed.y += gravity
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
                if(player.x+player.width < platform.x) {
                        player.x = platform.x - player.width;

                    }  
                    if(player.x + player.width > platform.x + platform.width+5) {
                        player.x = platform.x + platform.width;
                    }
                
                if(player.speed.y > 0 && player.y + player.height <= platform.y + player.speed.y) {
                        player.y = platform.y - player.height;
                        if(player.speed.y > 0) {
                            player.speed.y = 0;
                            isOnGround = true;

                        }
                        
                        
                    }
                
            
            }
        });
    }


    function keyHandler() {
        window.addEventListener("keydown", (event) => {
            
            
            
            if (event.code === "ArrowRight") {
                player.speed.x = 1;
            } else if (event.code === "ArrowLeft") {
                player.speed.x = -1;
            }
                else if(event.code === "ArrowUp"&& isOnGround) {
                player.speed.y = -3;
            }
            
        });   
        window.addEventListener("keyup", (event) => {
            if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
                player.speed.x = 0;
            }
        });


    }


    function mouseHandler(){
        canvas.addEventListener("mousemove",(mouseEvent) => {

            const  clientRect = canvas.getBoundingClientRect();
            
            mouse.x = mouseEvent.clientX - clientRect.left;
            mouse.y = mouseEvent.clientY - clientRect.top;
        });
    }

