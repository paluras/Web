const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');



canvas.width = 1024;
canvas.height = 576;

//Colision calcultion
const collisionMap = [];
for(let i = 0; i < collision.length ; i += 50){
   collisionMap.push (collision.slice(i, 50 + i))
}

class Boundary {
    static width = 55
    static height = 55
    constructor({position}) {
        this.position = position
        this.width = 55
        this.height = 55
    }
draw(){
    c.fillStyle = "red"
    c.fillRect(this.position.x , this.position.y, this.width, this.height)
}

}

//Did not understan, loop each row ,
const boundaries = []

collisionMap.forEach((row, i ) => {
    row.forEach((symbol, j) => {
        if(symbol === 4097 )

        boundaries.push(
            new Boundary({
                position: {
            x:j * Boundary.width ,
            y:i * Boundary.height
        }
    })
    )
})
})



const image = new Image()
image.src = "./img/map.png"

const playerImage = new Image();
playerImage.src = "./img/right.png"

class Sprite{
    constructor({
        position,
        velocity,
        image
    }) {
        this.position = position;
        this.image = image
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y) 
    }


}




const background = new Sprite({
    position:{
        x:-1200,
        y:-1250
    } ,
    image: image
})

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
}


function animate(){
 window.requestAnimationFrame(animate)
   
 background.draw()
 boundaries.forEach(boundary => {
    boundary.draw()
 })
 c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 8 ,
        playerImage.height ,
        canvas.width / 2 - playerImage.width / 2 ,
        canvas.height / 2 - playerImage.height / 2 ,
        playerImage.width / 8 ,
        playerImage.height 
    )     

    if(keys.w.pressed &&  lastKey === "w") background.position.y  += 3
    else if(keys.a.pressed  &&  lastKey=== "a") background.position.x += 3
    else if(keys.s.pressed  && lastKey === "s") background.position.y -= 3
    else if (keys.d.pressed && lastKey === "d") background.position.x -= 3

}

animate()

let lastKey = ""
window.addEventListener('keydown' , ( e ) => {
    switch(e.key){
        case "w":
            keys.w.pressed = true
            lastKey = "w"
            break

        case "a":
            keys.a.pressed = true
            lastKey = "a"
            break

        case "s":
            keys.s.pressed = true
            lastKey = "s"
            break

        case "d":
            keys.d.pressed = true
            lastKey = "d"
            break
    }
})

window.addEventListener('keyup' , ( e ) => {
    switch(e.key){
        case "w":
            keys.w.pressed = false
            break

        case "a":
            keys.a.pressed = false
            break

        case "s":
            keys.s.pressed = false
            break

        case "d":
            keys.d.pressed = false
            break
    }
})

