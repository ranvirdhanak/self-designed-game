var player;
var playerImg;
var playerImg2;
var ball;
var ballImg;
var hoop;
var hoopImg;
var hoopImg2;
var bg;
var bgImg;
var edges;
var invisibleHoop;
var score = 0;
var chance = 25;
var gameState = "play";
var restart;
var restartImg;
var sound;

function preload(){
  
  playerImg = loadImage("player1.png");
  playerImg2 = loadImage("player2.png");
  ballImg = loadImage("ball.png");
  hoopImg = loadImage("bBallHoop.png");
  hoopImg2 = loadImage("bBallHoop1.png");
  bgImg = loadImage("background.png");
  restartImg = loadImage("restart.png");
  sound = loadSound("sound.mp3");
  
  
}

function setup(){
createCanvas(400,400);

   //creating player
   player = createSprite(350,300,20,20);
   player.addImage("player2",playerImg2);
   player.addImage("player1",playerImg);
   //player.debug = true;
  player.setCollider("rectangle",0,0,50,150);
  
  //creating ball
   ball = createSprite(340,192,20,20);
  ball.addImage(ballImg);
  ball.scale = 0.08;
  
  //creating hoop
  hoop = createSprite(60,190,20,20);
  hoop.addImage("hoop1",hoopImg);
  hoop.addImage("hoop2",hoopImg2);
  hoop.scale = 0.5;
  hoop.velocityY = 2;
  hoop.setCollider("rectangle",-115,-40,20,150);
  
  //creating invisible hoop
  invisibleHoop = createSprite(50,180,30,30);
  invisibleHoop.visible = false;
  
  //creating restart button
  restart = createSprite(200,250,40,40);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  restart.visible = false;
  
  //creating edgeSprites
  edges = createEdgeSprites();
  
 
  
}




function draw(){
  
background(bgImg);

  // for making hoop stay inside the canvas
  hoop.bounceOff(edges[2]);
  hoop.bounceOff(edges[3]);
  
  //creating playState
  if(gameState === "play"){

    
  
  //for throwing ball in basket
  if(keyDown("SPACE")){
  ball.velocityX = -9;
  ball.velocityY = -10;
  chance = chance - 1;
  player.changeImage("player1",playerImg);
  }
  
    // for changing  player animation
  else if(keyWentUp("SPACE")){
    
  player.changeImage("player2",playerImg2);
    
  }
    
    // for making ball bounce on hoop
  ball.bounceOff(hoop);  

  // gravity
  ball.velocityY = ball.velocityY + 0.8;
  
  //to make the ball stay on the hands of player
  ball.collide(player);
  
  
    // for reseting the ball
    if(keyDown(UP_ARROW)){
      
  ball.x = 340;
  ball.y = 192;
  ball.velocityX = 0;
  ball.velocityY = 0;
    }
  
    // for changing hoop image and adding sound
  if(ball.isTouching(invisibleHoop)){
    
    hoop.changeImage("hoop2",hoopImg2);
    sound.play();
    
  }
  
    
  else{
hoop.changeImage("hoop1",hoopImg);
}
  
    // for making invisiblehoop moving by hoop position
  invisibleHoop.y = hoop.y;
  
  //for increasing score
  if(ball.isTouching(invisibleHoop)){
    score = score + 1;
  }
  
    // to end the game
  if(chance === 0){
    
    gameState = "end";
    
  }
    
  }
  

 //endState
 else if(gameState === "end"){
     
    
      restart.visible = true;
     

     textSize(50);
     fill("White");
     text("Game Over ",70,200);
   
     if(mousePressedOver(restart)){
    
    reset();
    
    
  }
   
    
  }

  
drawSprites();
  
  
  
  
       textSize(15);
   fill("White");
   text("Chances: " + chance,100,40);
  
  textSize(15);
  fill("white");
  text("Score: " + score,300,40);
    

    
  }
  
 
// to restart the game
function reset(){

gameState = "play";
chance = 25;
restart.visible = false;
score = 0;

  
  
}







