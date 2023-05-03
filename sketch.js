
var bg_Img;
var knight, kngt_Walk, invisKnght;
var plt, plt1, plt2, plt3, plt4;
var invis_grnd, invisible, invis;
var demon, demonAttack, demonDeath;
var coin, coin_Img, coinGroup;
var pltGroup, invisibleGroup, enemyGroup;
var coinScore=0;


function preload()
{
  bg_Img = loadImage("./Assets/background.jpg");
  kngt_Walk = loadAnimation("./Knight/walk1.png", "./Knight/walk2.png", "./Knight/walk3.png", "./Knight/walk4.png", "./Knight/walk5.png", "./Knight/walk6.png");
  kngt_Attack = loadAnimation("./Knight/attack0.png", "./Knight/attack1.png", "./Knight/attack2.png", "./Knight/attack3.png", "./Knight/attack4.png");
  plt1 = loadImage("./Assets/Ground_Merged.png");
  plt2 = loadImage("./Assets/Ground.png");
  plt3 = loadImage("./Assets/Ground_i.png");
  plt4 = loadImage("./Assets/Ground_ii.png");
  coin_Img = loadImage("./Assets/Coin_01.png");


  /*demonAttack = loadAnimation("./Demon/Walk1.png", "./Demon/Attack1.png", "./Demon/Attack2.png", "./Demon/Attack3.png", "./Demon/Attack4.png");
  demonDeath = loadAnimation("./Demon/Death1.png", "./Demon/Death2.png", "./Demon/Death3.png", "./Demon/Death4.png", "./Demon/Death5.png", "./Demon/Death6.png");*/
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  invis_grnd = createSprite(windowWidth/2, height-70, windowWidth*5, 10);
  invis_grnd.visible = false;
  
  knight=createSprite(windowWidth,505,50,50);
  knight.addAnimation("walk", kngt_Walk);
  knight.addAnimation("attack", kngt_Attack);
  //knight.debug = true;
  knight.setCollider("rectangle",-20,9,40,69);
  camera.x = knight.x;
  camera.y = height/2;

  pltGroup = new Group();
  invisibleGroup = new Group();
  coinGroup = new Group();
  enemyGroup = new Group();
}

function draw()
{
  background(bg_Img); 
  console.log(knight.x);
  if(knight.x<200){
    knight.x=width/2;
  }
  if(knight.y<50){
    knight.y=height/2;
  }

  if(keyDown(RIGHT_ARROW)){
    knight.x +=5;
  }
  if(keyDown(LEFT_ARROW)){
    knight.x -=5;
  }
  if(keyDown(UP_ARROW)){
    knight.velocityY -=1.5;
  }

  if(keyWentDown("SPACE")){
    knight.changeAnimation("attack", kngt_Attack);
  }
  if(keyWentUp("SPACE")){
    knight.changeAnimation("walk", kngt_Walk);
  }
  knight.velocityY = knight.velocityY+0.8;
 
  if(invisibleGroup.isTouching(knight)){
    knight.collide(invisibleGroup);
  }

  knight.collide(invis_grnd);



  spawnPlatform();
  handlePowerCoins();
  //spawnEnemies();
  drawSprites();
  textSize(18)
  text("Coins: " + coinScore, 700,50);
}

function spawnPlatform()
{
  if (frameCount % 100 === 0) {
    plt = createSprite(windowWidth,500);
    plt.addImage(plt1);
    plt.scale = 0.7;

    grd = createSprite(windowWidth,windowHeight-75);
    grd.velocityX = -7;
    grd.addImage(plt3);

    invisible = createSprite(windowWidth,300)
    invisible.width = plt.width-200;
    invisible.height= 2;

    invis = createSprite(windowWidth,300)
    invis.width = grd.width-15;
    invis.height= 2;

    coin = createSprite(windowWidth, 300, 30, 30);
    coin.addImage(coin_Img);
    coin.scale=0.5;

    plt.x = Math.round(random(windowWidth, windowWidth*4))
    plt.y = Math.round(random(300,700))
    plt.velocityX = -7;

    
    invisible.x = plt.x;
    invisible.y = plt.y-40;
    invisible.velocityX = -7;

    invis.x = grd.x;
    invis.y = grd.y-60;
    invis.velocityX = -7;

    coin.x = plt.x;
    coin.y = plt.y-80;
    coin.velocityX = -7
    //var ran = Math.round(random(1, 2));
     
    pltGroup.add(plt);
    pltGroup.add(grd);
    invisibleGroup.add(invisible);
    invisibleGroup.add(invis);
    coinGroup.add(coin);
  
  }
}

function handlePowerCoins() 
{
  knight.overlap(coinGroup, function(collector, collected) {
    coinScore += 1;
    collected.remove();
  });
}

  
function spawnEnemies()
{  
  //create knight after every 150 frames
  if (frameCount % 150 === 0) {
    demon = createSprite(windowWidth,150,10,10);
    demon.addAnimation("demonAttack", demonAttack);
    demon.x = Math.round(random(windowWidth, windowWidth*4))
    demon.y = Math.round(random(300,700))
    demon.scale =1.5;
    demon.velocityX = -5
    demon.lifetime = 1200;
    enemyGroup.add(demon);
  
  }
}