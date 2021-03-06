var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex ;
var ground ;
var invisibleGround;
var ObstaclesGroup ;
var CloudsGroup ;
var count = 0;
var treximage,cactusimage;
function preload(){
  treximage = loadImage("trexi.png")
  cactusimage = loadImage("cac.png")
}
function setup() {
  createCanvas(400,400);
  trex = createSprite(200,350,20,50);
  trex.addImage("trex",treximage);
  treximage.resize(50,50)
  camera.position.x = 100
  camera.position.y = trex.y;
  ground = createSprite(200,380,400,20);
  ground.x = ground.width /2;
  invisibleGround = createSprite(200,385,400,5);
  invisibleGround.visible = false;
  ObstaclesGroup = createGroup();
  CloudsGroup = createGroup();
}

function draw() {
  background("white");
  text("Score: "+ count, 250, 100);
  if(gameState === PLAY){
    
    ground.velocityX = -6;
    
    count = Math.round(World.frameCount/4);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space") && trex.y >= 359){
      trex.velocityY = -12 ;
    }
  
   
    trex.velocityY = trex.velocityY + 0.8;
    
    
    spawnClouds();
  
    
    spawnObstacles();
    
   
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
  
  else if(gameState === END) {
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
  }
  trex.collide(invisibleGround);
  
  drawSprites();
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.addImage("ob",cactusimage);
    cactusimage.resize(50,50)
    obstacle.velocityX = -6;
    obstacle.lifetime = 70;
    ObstaclesGroup.add(obstacle);
  }
  
}

function spawnClouds() {
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.velocityX = -3;
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    CloudsGroup.add(cloud);
  }
  
}