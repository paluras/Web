class Sprite{
    constructor({
        position,
        velocity,
        image,
        frames = {max: 1},
        sprites
    }) {
        this.position = position;
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0} 
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        
        } 
        this.moving =  false
        this.sprites = sprites
    }

    draw(){
        c.drawImage(
            this.image,
            //77 pixel to move the sprite sheet, idk why
            this.frames.val * 77,
            0,
            this.image.width / this.frames.max ,
            this.image.height ,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max ,
            this.image.height 
        )  
            if(!this.moving)  return
            if(this.frames.max > 1){
                this.frames.elapsed++
            }
            if(this.frames.elapsed % 10 === 0){
            if(this.frames.val < this.frames.max - 1) this.frames.val++ 
            else this.frames.val = 0
            }
    }   
}


class Boundary {
    // 88 since we multiply a tile by 5.5
    static width = 88
    static height = 88
    constructor({position}) {
        this.position = position
        //change Size of tiles colision
        this.width = 55
        this.height = 55
    }
draw(){
    c.fillStyle = "rgba(255, 0, 0, 0)"
    c.fillRect(this.position.x , this.position.y, this.width, this.height)
}
}