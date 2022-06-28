const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board1, board2; 
var numberOfArrows = 10;
var drops = [];
var dropCount = 100;
var newDownfall = 500;
var rain;
var thunder;
var score = 0;
var board1Collision
var board1Collision1
var ballon123,imageball
function preload() {
  backgroundImg = loadImage("./assets/background.png");
  rain = loadSound('rain.mp3');
	thunder = loadSound('thunder.mp3');
  imageball =loadImage("./assets/blue_balloon0.png")
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  rain.setVolume(0.5);
	rain.loop();
  swal({
    title: `Archery`,
    text: "Welcome to the game of archery",
    imageUrl: "https://github.com/aaditkumar2009/image/blob/main/Vecteezy.com.png?raw=true",
    imageSize: "400x400",
    confirmButtonText: "Ok"
  });
	downfall();
  engine = Engine.create();
  world = engine.world;
  let options={
    restitution : 0,
    isStatic: true
    }
ballon123 = Bodies.circle(700,100,200,options);
Engine.run(engine);
World.add(world,ballon123);

ellipseMode(RADIUS);
  playerBase = new PlayerBase(300, 500, 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );



  board1 = new Board(width - 300, 330, 100, 200);
  board2 = new Board(width - 550, height - 300, 50, 200);
}


function draw() {
  background(backgroundImg);

  Engine.update(engine);

  for(var i = drops.length-1; i >= 0; i--) {
		drops[i].update();
		drops[i].show();
    	if(drops[i].bad()) drops.splice(i, 1);
	}

	
  //ellipse(ballon123.position.x,ballon123.position.y,50);
 // ballon123.addImage("imageball")
	if(drops.length <= newDownfall) downfall();
 
	
	if(floor(random(300)) == 1) doThunder();

  playerBase.display();
  player.display();
  playerArcher.display();

  board1.display();
  board2.display();

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
      var collision = Matter.SAT.collides(board1.body, playerArrows[i].body);
  if(collision.collided){
    score +=1
  }

        board1Collision = Matter.SAT.collides(
        board1.body,
        playerArrows[i].body,
       
      );

      
      var board2Collision = Matter.SAT.collides(
        board2.body,
        playerArrows[i].body
      );

      if (board1Collision.collided) {
        console.log("Collided");
        Matter.World.remove(world, board1);
        score+=1
      }
      if (board2Collision.collided) {
        console.log("Collided");
        Matter.World.remove(world, board2);
        score +=1
      }

      var posX = playerArrows[i].body.position.x;
      var posY = playerArrows[i].body.position.y;

      if (posX > width || posY > height) {
        if (!playerArrows[i].isRemoved) {
          playerArrows[i].remove(i);
        }
      }
    }
  }
  
  
  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("Archery", width / 2, 100);

  // Arrow Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining Arrows : " + numberOfArrows, 200, 100);
  //score
  fill("#FFFF");
  textAlign("center");
  textSize(30)
  text("Score : " +score,450,100)
}

function gameOver(){
    swal({
      title: `Sorry, you lose`,
      text: "All the arrows have been arched, there are no more",
      imageUrl: "https://github.com/aaditkumar2009/image/blob/main/emojipng.com-14665.png?raw=true",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
    }
    else(
      gameOver()
    )
  }

}
function doThunder() {
	thunder.play();
	background(255);
}
function downfall() {
	// Create drops
	for(var i = 0; i < dropCount; i++) {
		drops.push(new Drop());
	}
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
   
  }
}
