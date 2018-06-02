//ground = 2404/18
//char = 89x94
//char 1 @ 1514
//char 2 @ 1603

scoreInterval = 0;
frameInterval = 0;
groundscroll = 0;
groundscroll2 = 0;
tempstart = 0;
groundbool = false;
frame = 0;
bool = false;
grav = 0.6;

gamespeed = 0;

multiS = -1;
picS = 0;
obsS = ({
  x: 20,
  y: 230,
  w: 34,
  h: 70,
  scroll: -100,
  on: false
})

multiB = -1;
picB = 0;
obsB = ({
  x: 20,
  y: 201,
  w: 49,
  h: 100,
  scroll: -200,
  on: false
})

// for flying objects if they would be added in the future
obsF = ({
  x: 20,
  y: 250,
  w: 93,
  h: 69,
  scroll: -100
})

p = ({
  x : 100,
  y : 500,
  w : 89,
  h : 94,
  yv : 0,
  score: 0,
  hscore: 0,
  jump: 15
});

//crouching for flying objects
pcrouch = ({
  x: p.x,
  y: p.y,
  w: 118,
  h: 60
});

pbox = ({
  x : p.x,
  y : 0,
  w : 80,
  h : 75
});

onG = false;
sprImg = new Image();

window.onload = function(){
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');

	setInterval(update,1000/60);

  document.addEventListener("keydown",keyDown);

  sprImg.src = "sprite.png";


  plat = ({
    x: 0,
    y: canvas.height - 100,
    w: canvas.width,
    h: 5,
  })

}

function update(){
  if(!onG){
    p.yv += grav;
  }

  p.y+=p.yv;
  pbox.y = p.y;
  scoreInterval++;
  if (scoreInterval > 6 && gamespeed != 0){
    p.score++;
    scoreInterval = 0;
  }

  if (gamespeed < 17 && gamespeed != 0){
    gamespeed = 7 + (p.score/100);
  }

  onG = false;
  if (p.y + p.h > plat.y){
    p.y = plat.y - p.h;
    onG = true;
  }
  //big collision
  if (pbox.x > (canvas.width - obsB.scroll) - p.w && pbox.x < (canvas.width - obsB.scroll) + (obsB.w * multiB) &&
    pbox.y > obsB.y - pbox.h){
      gameover();
  }

  //small collision
  if (pbox.x > (canvas.width - obsS.scroll) - p.w && pbox.x < (canvas.width - obsS.scroll) + (obsS.w * multiS) &&
      pbox.y > obsS.y - pbox.h){
        gameover();
  }

  frameInterval++;
  if (frameInterval > 5){
    bool = !bool;
    frameInterval = 0;
  }
  else{
  }

  if (bool && onG){
    frame = 1514;
  }
  else if (!bool && onG){
    frame = 1602;
  }
  else{
    frame = 1338;
  }

  ctx.fillStyle="white";
	ctx.fillRect(0,0,canvas.width,canvas.height);

  // This is all for ground scrolling
  groundscroll+=gamespeed;
  ctx.drawImage(sprImg, 0, 104, 2404, 18, 0 - groundscroll + tempstart, plat.y - 24, 2404, 18);
  if (groundscroll - tempstart > 2404 - canvas.width || groundbool){
    groundbool = true;
    groundscroll2+=gamespeed;
    ctx.drawImage(sprImg, 0, 104, canvas.width, 18, 0 - groundscroll2 + canvas.width, plat.y - 24, canvas.width, 18);
    if (groundscroll2 > canvas.width && groundscroll - tempstart > 1000){
      tempstart = canvas.width;
      groundscroll = 20;
    }
    if (groundscroll2 > 2402){
      groundscroll2 = 0;
      groundbool = false;
    }
  }

  //char drawing
  if(gamespeed != 0){
    ctx.fillStyle="black";
    ctx.drawImage(sprImg, frame, 0, 88, 94, p.x, p.y, p.w, p.h);
  }
  else{
    ctx.drawImage(sprImg, 1338, 0, 88, 94, p.x, p.y, p.w, p.h);
  }
  //ctx.fillRect(pbox.x, pbox.y, pbox.w, pbox.h);

  //small obstacle drawing
  if (!obsB.on){
    obsS.on = true;
    if (multiS == -1){
      rngS();
    }

    // All commented rectangles are for viewing hitboxes
    //ctx.fillRect(canvas.width - obsS.scroll, obsS.y, obsS.w * multiS, obsS.h);
    ctx.drawImage(sprImg, picS, 2, obsS.w * multiS, obsS.h, canvas.width - obsS.scroll, obsS.y, obsS.w * multiS, obsS.h);
    obsS.scroll+=gamespeed;
    if (obsS.scroll > canvas.width + obsS.w * 3){
      obsS.scroll = -100;
      multiS = -1;
      obsS.on = false;
    }
  }

  //big obstacle drawing
  if(!obsS.on){
    obsB.on = true;
    if (multiB == -1){
      rngB();
    }

    //ctx.fillRect(canvas.width - obsB.scroll, obsB.y, obsB.w * multiB, obsB.h);
    ctx.drawImage(sprImg, 652, 2, obsB.w * multiB, obsB.h, canvas.width - obsB.scroll, obsB.y, obsB.w * multiB, obsB.h);

    obsB.scroll+= gamespeed;
    if (obsB.scroll > canvas.width + obsB.w * 3){
      obsB.scroll = -200;
      multiB = -1;
      obsB.on = false;
    }
  }

  ctx.font='20px verdana';
  ctx.fillStyle="black";
  ctx.fillText("Score: ", 100, canvas.height - 40);
  ctx.fillText(p.score, 170, canvas.height - 40);
  ctx.fillText("Highscore: ", 600, canvas.height - 40);
  ctx.fillText(p.hscore, 715, canvas.height - 40);
}

function gameover(){
  gamespeed = 0;
  console.log("HIT!");
  if (p.score > p.hscore){
    p.hscore = p.score;
  }
  p.score = 0;
  obsB.scroll = -200;
  obsS.scroll = -100;

  scoreInterval = 0;
  frameInterval = 0;
  groundscroll = 0;
  groundscroll2 = 0;
  tempstart = 0;
  groundbool = false;
  multiS = -1;
  multiB = -1;
}

function keyDown(evt) {
	if (evt.keyCode == 38) {
			if(onG) {
				p.yv=-p.jump;
			}
      if(gamespeed == 0){
        gamespeed = 7;
      }
	}
}

function rngS(){
  multiS = Math.floor(Math.random() * 3) + 1;
  picS = 446 + (Math.floor(Math.random() * 2) * 102);
}

function rngB(){
  multiB = Math.floor(Math.random() * 3) + 1;
  picB = 652 + (Math.floor(Math.random() * 2) * 150);
}
