const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');




canvas.width = 1024;
canvas.height = 768;

//Colision calcultion
/////////(nvm) Here try to do the 8 pixels schema, change 50 to 100 in tiled
const collisionMap = [];
for(let i = 0; i < collision.length ; i += 50){
   collisionMap.push (collision.slice(i, 50 + i))
}

const battleZonesMap = [];
for(let i = 0; i < battlezoneData.length ; i += 50){
   battleZonesMap.push (battlezoneData.slice(i, 50 + i))
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

const battleZones = []

battleZonesMap.forEach((row, i ) => {
    row.forEach((symbol, j) => {
        if(symbol === 4097 )

        battleZones.push(
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

const playerIdle = new Image();
    playerIdle.src = "./img/Idle.png"




const player =new Sprite({
    position : {
        x: canvas.width / 2 - 578 / 2 / 2 ,
        y: canvas.height / 2 - 98 / 2 
    },
    image: playerRightImage,
    frames: {
        max: 8
    },
    sprites:{
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerdownImage,
       
    }
})

const idle = new Sprite ({
    position : {
        x: offset.x,
        y: offset.y
    },
    image: playerIdle
})

const background = new Sprite({
    position:{
        x:offset.x ,
        y:offset.y 
    } ,
    image: image
})
const foreground = new Sprite({
    position:{
        x:offset.x ,
        y:offset.y 
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

const movables =[background,...boundaries, foreground,...battleZones]

function rectangularCollsion({rectangle1, recttangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= recttangle2.position.x && 
        rectangle1.position.x <= recttangle2.position.x + recttangle2.width &&
        rectangle1.position.y <= recttangle2.position.y + recttangle2.height&&
        rectangle1.position.y + rectangle1.height >= recttangle2.position.y)
}

const battle ={
    initiated:false
}
function animate(){
 const animationId = window.requestAnimationFrame(animate)
   
 background.draw()
 boundaries.forEach((boundary) => {
    boundary.draw()
 })

 battleZones.forEach(battlezone => {
    battlezone.draw()
 })



 player.draw();
foreground.draw()
let moving =true
    player.moving = false

if(battle.initiated)return

///math to calculate if player is acctualy in the battle zone
if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y))
      if (
        rectangularCollsion({
          rectangle1: player,
          recttangle2: battleZone
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01
)
{
   console.log("battle")
//deactive curent anim loop
   window.cancelAnimationFrame(animationId)


   battle.initiated = true
   gsap.to('#overlappingDiv',{
    opacity: 1,
    repeat: 3,
    yoyo:true,
    duration: 0.4,
    onComplete(){
        gsap.to("#overlappingDiv" , {
            opacity:1,
            duration: 0.4,
            onComplete(){
                animateBattle()
                    gsap.to("#overlappingDiv" , {
                        opacity:0,
                        duration: 0.4,
                        
                })
            }
        })

/// new animation
animateBattle()
// event listenr for buttons // attack
document.querySelectorAll('button').forEach(button =>{
    button.addEventListener("click", (e) => { 
        const selectAttack = attacks[e.currentTarget.innerHTML]
       seal1.attack({ 
        attack: selectAttack,
       recipient: seal2
  })
    })
})
addEventListener('click', () => {
    console.log("clicked")
})


    }
})
    break
      }
    } 
}
    

    
if(keys.w.pressed &&  lastKey === "w") {
    player.moving = true
    player.image = player.sprites.up

    
    
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


const battleBackgroundImage = new Image()
    battleBackgroundImage.src = './img/battlezone.png'
    const battleBackground = new Sprite({
        position:{
            x:0,
            y:0
        },
        image: battleBackgroundImage
    })
 const monster1Image = new Image()
 monster1Image.src = './img/monster1.png'
    const seal1 = new Sprite({
        position:{
            x:140,
            y:300
        },
        image : monster1Image
    })
    const monster2Image = new Image()
 monster2Image.src = './img/monster2.png'
    const seal2 = new Sprite({
        position:{
            x:750,
            y:300
        },
        image : monster2Image,
        isEnemy : true

    })

function animateBattle(){
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    seal1.draw()
    seal2.draw()
}