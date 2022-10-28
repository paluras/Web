const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');



canvas.width = 1024;
canvas.height = 576;

//Colision calcultion
const collisionMap = [];
for(let i = 0; i < collision.length ; i += 50){
   collisionMap.push (collision.slice(i, 50 + i))
}



//Did not understan, loop each row ,
const boundaries = []
const offset = {
    x: - 1200,
    y: - 1300
}

collisionMap.forEach((row, i ) => {
    row.forEach((symbol, j) => {
        if(symbol === 4097 )

        boundaries.push(
            new Boundary({
                position: {
            x:j * Boundary.width + offset.x,
            y:i * Boundary.height + offset.y
        }
    })
    )
})
})



const image = new Image()
image.src = "./img/map.png"

const foregroundimage = new Image()
foregroundimage.src = "./img/untitled.png"

const playerRightImage = new Image();
playerRightImage.src = "./img/right.png"

const playerUpImage = new Image();
playerUpImage.src = "./img/right.png"

const playerLeftImage = new Image();
playerLeftImage.src = "./img/left.png"

const playerdownImage = new Image();
playerdownImage.src = "./img/left.png"




const player =new Sprite({
    position : {
        x: canvas.width / 2 - 616 / 2 / 2 ,
        y: canvas.height / 2 - 110 / 2 
    },
    image: playerRightImage,
    frames: {
        max: 8
    },
    sprites:{
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerdownImage
    }
})



const background = new Sprite({
    position:{
        x:offset.x -50,
        y:offset.y + 30
    } ,
    image: image
})
const foreground = new Sprite({
    position:{
        x:offset.x -50,
        y:offset.y + 30
    } ,
    image: foregroundimage
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

const movables =[background,...boundaries, foreground]

function rectangularCollsion({rectangle1, recttangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= recttangle2.position.x && 
        rectangle1.position.x <= recttangle2.position.x + recttangle2.width &&
        rectangle1.position.y <= recttangle2.position.y + recttangle2.height&&
        rectangle1.position.y + rectangle1.height >= recttangle2.position.y)
}
function animate(){
 window.requestAnimationFrame(animate)
   
 background.draw()
 boundaries.forEach((boundary) => {
    boundary.draw()
 })
player.draw();
foreground.draw()
    
let moving =true
    player.moving = false
if(keys.w.pressed &&  lastKey === "w") {
    player.moving = true
    
        for (let i = 0 ; i <boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollsion({
                rectangle1: player,
                recttangle2: {...boundary, position:{
                    x:boundary.position.x,
                    y:boundary.position.y +3
                }
            }
        })
    )
    {
        moving = false
        break
     }
    }   
        if (moving) 
        movables.forEach(moveable => {moveable.position.y +=3})
    }


    else if(keys.a.pressed  &&  lastKey=== "a") {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0 ; i <boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollsion({
                rectangle1: player,
                recttangle2: {...boundary, position:{
                    x:boundary.position.x +3,
                    y:boundary.position.y 
                }
            }
        })
    )
    {
        moving = false
        break
     }
    }   
        if (moving) 
        movables.forEach(moveable => {moveable.position.x +=3})
    }



    else if(keys.s.pressed  && lastKey === "s") {
        player.moving = true
        for (let i = 0 ; i <boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollsion({
                rectangle1: player,
                recttangle2: {...boundary, position:{
                    x:boundary.position.x,
                    y:boundary.position.y -3
                }
            }
        })
    )
    {
        moving = false
        break
     }
    }   
        if (moving) 
        movables.forEach(moveable => {moveable.position.y -=3})
    }
    else if (keys.d.pressed && lastKey === "d") {
        player.moving =true
        player.image = player.sprites.right
        for (let i = 0 ; i <boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollsion({
                rectangle1: player,
                recttangle2: {...boundary, position:{
                    x:boundary.position.x -3,
                    y:boundary.position.y 
                }
            }
        })
    )
    {
        moving = false
        break
     }
    }   
        if (moving) 
        movables.forEach(moveable => {moveable.position.x -=3})
    }

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

