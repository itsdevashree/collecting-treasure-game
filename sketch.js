var path,boy,cash,diamonds,jwellery,sword,edges;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var invisibleWall1,invisibleWall2;
var treasureCollection = 0;
var cashGroup,diamondsGroup,jwelleryGroup,swordGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,550);
  
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;

  //creating boy running
  boy = createSprite(70,470,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  
  //invisible walls for not allowing boy go outside canvas
  invisibleWall1 = createSprite(0,0,50,1100);
  invisibleWall1.visible = false;
  invisibleWall2 = createSprite(410,0,50,1100);
  invisibleWall2.visible = false;
  
  //boy.debug = true;
  boy.setCollider("circle",0,0,470);
  
  //groups
  cashGroup=new Group();
  diamondsGroup=new Group();
  jwelleryGroup=new Group();
  swordGroup=new Group();

}

function draw() {

  background(0);
  
  edges = createEdgeSprites();
  boy.collide(edges);
  
  if(gameState == PLAY){
    
    //boy moving using the mouse
    boy.x = World.mouseX;
    
    boy.collide(invisibleWall1);
    boy.collide(invisibleWall2);
      
    //code to reset the background
    if(path.y > 400 ){
      path.y = height/2;
    }
  
    var rand = Math.round(random(1,4));
      if(frameCount % 100 === 0){
         if(rand == 1){
           createCash();
         }
         else if(rand == 2) {
           createSword();
         }
         else if(rand == 3){
           createJwellery(); 
         }
         else{
           createDiamonds();
         }
       }
    
    //scoring
    if (cashGroup.isTouching(boy)) {
       cashGroup.destroyEach();
       treasureCollection = treasureCollection+50
    }
    else if (diamondsGroup.isTouching(boy)) {
      diamondsGroup.destroyEach();
      treasureCollection = treasureCollection+150
    }
    else if(jwelleryGroup.isTouching(boy)) {
      jwelleryGroup.destroyEach();
      treasureCollection = treasureCollection+100
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;
        boy.addAnimation("SahilRunning",endImg);
        swordGroup.destroyEach();
      }
  }
    
   }else if(gameState == END){
    
      path.velocityY = 0;
      boy.x = 200;
      boy.y = 250;
      boy.velocityX = 0;
      boy.scale = 0.8;
      boy.lifetime = -1;
      cashGroup.destroyEach();
      cashGroup.setVelocityYEach(0);
      diamondsGroup.destroyEach();
      diamondsGroup.setVelocityYEach(0);
      jwelleryGroup.destroyEach();
      jwelleryGroup.setVelocityYEach(0);
    
    }
  
  drawSprites();
  
  //scoring texts
  textSize(20);
  fill(1);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4;
  cash.lifetime = 150;
  cashGroup.add(cash);
  
}

function createDiamonds() {
  
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4;
  diamonds.lifetime = 150;
  diamondsGroup.add(diamonds);

}

function createJwellery() {
  
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 4;
  jwellery.lifetime = 150;
  jwelleryGroup.add(jwellery);
  
}

function createSword(){
  
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 150;
  swordGroup.add(sword);
  
}