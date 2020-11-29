var ball, ballposition;
var obstacle;
var bg
function preload(){
    bg=loadImage("bgimage.png");
}


function setup(){
    database=firebase.database();
    createCanvas(displayWidth,displayHeight);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    
    obstacle=createSprite(displayWidth/2-50, displayHeight-30);
    obstacle.shapeColor="blue";

    var ballposition=database.ref('ball/position');
    ballposition.on("value", readPosition, showError );
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    if(ball.isTouching(obstacle)){
        background("black")
        ball.shapeColor="black"
        obstacle.shapeColor="black"
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
function writePosition(x,y){ 
    database.ref('ball/position').set({ 'x': position.x + x , 'y': position.y + y })
 }
  function readPosition(data){ 
      position = data.val(); 
      console.log(position.x);
      ball.x = position.x; 
      ball.y = position.y;
     }

     function showError(){ 
         console.log("Error in writing to the database"); 
        }

