class Background{

    constructor(x,y,width,height,imagepath){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image(imagepath);

    }
    draw(){

    context.drawImage(this.image,this.x,this.y,this.width,this.height);

    }

}