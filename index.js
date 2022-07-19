const canvas=document.querySelector('#canvas');
const context=canvas.getContext("2d");

const bird=new Image();
const backgroundFon=new Image();
const forgroundFon=new Image();
const pipeUp=new Image();
const pipeBottom=new Image();

bird.src="img/bird.png";
backgroundFon.src="img/bird_bg.png";
forgroundFon.src="img/bird_fg.png";
pipeUp.src="img/bird_pipeUp.png";
pipeBottom.src="img/bird_pipeBottom.png";


let gap=100;
//Bird control
document.addEventListener("keydown",onMoveUp)

function onMoveUp(){
    yPositionBird -= 35;
}

// Create block
let pipe=[];
pipe[0]= {
    x: canvas.width,
    y: 0,
}

//Position bird
let xPositionBird=10;
let yPositionBird=150;
const grav=1;
let score=0;

function darwObjects(){
    context.drawImage(backgroundFon, 0, 0);

    for (let i = 0; i < pipe.length; i+=1) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y );
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;

        if (pipe[i].x === 125){
            pipe.push({
                x:canvas.width,
                y:Math.floor(Math.random()*pipeUp.height)-pipeUp.height,
            })
        }

        if(xPositionBird+bird.width>=pipe[i].x 
            && xPositionBird<= pipe[i].x + pipeUp.width 
            && (yPositionBird<= pipe[0].y+pipeUp.height||yPositionBird+bird.height>=pipe[i].y+pipeUp.height+gap)
            ||yPositionBird+bird.height>=canvas.height - forgroundFon.height){
                location.reload()
            } 

        if (pipe[i].x === 5){
            score++;

        }
    }

    context.drawImage(forgroundFon,0, canvas.height - forgroundFon.height);
    context.drawImage(bird, xPositionBird,yPositionBird )
    

    yPositionBird+= grav;
    context.fillStyle="#000";
    context.font="24px Verdana"
    context.fillText("Check :"+score,10,canvas.height-20)
    requestAnimationFrame(darwObjects);
}
pipeBottom.onload=darwObjects;
