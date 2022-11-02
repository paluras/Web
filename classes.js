class Sprite{
    constructor({
        position,
        velocity,
        image,
        frames = {max: 1},
        sprites,
        isEnemy = false
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
        this.opacity = 1
        this.health = 100
        this.isEnemy =  isEnemy
    }

    draw(){
        c.save()
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image,
            //71 pixel to move the sprite sheet, its the widthof one
            this.frames.val * 71.03,
            0,
            this.image.width / this.frames.max ,
            this.image.height ,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max ,
            this.image.height 
        )  
        c.restore()
            if(!this.moving)  
             return this.frames.val = 0
            if(this.frames.max > 1){
                this.frames.elapsed++
            }
            if(this.frames.elapsed % 10 === 0){
            if(this.frames.val < this.frames.max - 1) this.frames.val++ 
            else this.frames.val = 0
            }
    }   

   attack ({ attack, recipient}){

    switch(attack.name) {
        case'Water':

        break;

        
        case 'Flap' :
            const tl = gsap.timeline()

            this.health -= attack.damage
        
            let movementDistance = 20
            if(this.isEnemy) movementDistance = -20
        
            let healthbar = '#enemyHealth'
            if(this.isEnemy) healthbar = '#ownHealth'
            
            tl.to(this.position, {
                x:this.position.x -  movementDistance
            }).to(this.position, {
                x:this.position.x + movementDistance * 2,
                duration: 0.1,
                onComplete: () => {
        
                    gsap.to(healthbar, {
                        width: this.health  - attack.damage + "%"
                    })
                    gsap.to(recipient.position, {
                        x: recipient.position.x + 10,
                        yoyo: true,
                        repeat: 5,
                        duration: 0.08,
                    })
        
                    gsap.to(recipient ,{
                        opacity: 0.5,
                        repeat: 5,
                        yoyo: true,
                        duration: 0.08
                    })
                }
            }).to(this.position, {
                x:this.position.x 
            })
        

        break;
    }
    
   }
}


class Boundary {
    // 88 since we multiply a tile by 5.5
    static width = 88 +3 
    static height = 88  - 2
    constructor({position}) {
        this.position = position
        //change Size of tiles colision
        this.width = 88
        this.height = 88
    }
draw(){
    c.fillStyle = "rgba(255, 0, 0, 0.3)"
    c.fillRect(this.position.x , this.position.y, this.width, this.height)
}
}