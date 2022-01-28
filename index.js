window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  //VARIABLES
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let game;
  let isGameOn = false;
  let gameWillEnd = false;
  let myRoachSound;
  let endGameSound;
  let myPetSound;
  let myMusic;
  let score;
  let r1 = new Roach();
  let roachArr = [];
  let stomper = new Player();
  let p1 = new Pet();
  let petArr = [];
  roachArr.push(r1);
  petArr.push(p1);

  //MOVEMENTS
  canvas.addEventListener("mousemove", function (e) {
    stomper.x = e.offsetX;
    stomper.y = e.offsetY;
  });
  document.addEventListener("click", function (e) {
    stomper.clicked = true;
    stomper.mouseX = e.offsetX;
    stomper.mouseY = e.offsetY;
  });

  //
  function createRoach() {
    roachArr.push(new Roach());
  }
  function createPet() {
    let p1 = new Pet();
    petArr.push(p1);
  }

  //START
  function startGame() {
    if (!isGameOn) {
      score = 0;
      isGameOn = true;
      myMusic = new sound("sound/myMusic4.mp3");
      myPetSound = new sound("sound/myPetSound.mp3");
      myRoachSound = new sound("sound/myRoachSound.mp3");
      endGameSound = new sound("sound/endGameSound.mp3");
      myMusic.play();
      setInterval(createRoach, 3000);
      setInterval(createPet, 10000);
      animate();
    } else {
      // console.log("Game is already running");
    }
  }
  //COLLISION
  function detectCollision(player, obj) {
    if (
      player.x < obj.x + obj.w &&
      player.x + player.w > obj.x &&
      player.y < obj.y + obj.h &&
      player.y + player.h > obj.y
    ) {
      return true;
    } else {
      return false;
    }
  }
  function detectMouseCollision(player, obj) {
    if (
      player.mouseX < obj.x + obj.w &&
      player.mouseX > obj.x &&
      player.mouseY < obj.y + obj.h &&
      player.mouseY > obj.y
    ) {
      return true;
    } else {
      return false;
    }
  }
  //ANIMATION
  function animate() {
    game = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(stomper.image, stomper.x, stomper.y, stomper.w, stomper.h);
    ctx.fillStyle = "white";
    ctx.font = "40px Ariel";
    ctx.fillText(`Score: ${score}`, 200, 30);
    //animate the pets
    for (let i = 0; i < petArr.length; i++) {
      ctx.drawImage(
        petArr[i].image,
        petArr[i].x,
        petArr[i].y,
        petArr[i].w,
        petArr[i].h
      );
      petArr[i].move();
      //Call the collision function, and compare it to every object
      didCollide = detectCollision(stomper, petArr[i]);
      if (didCollide) {
        myPetSound.play();
        break;
      }
    }
    //animate the roaches
    for (let i = 0; i < roachArr.length; i++) {
      ctx.drawImage(
        roachImg,
        roachArr[i].x,
        roachArr[i].y,
        roachArr[i].w,
        roachArr[i].h
      );
      roachArr[i].move();
      if (stomper.clicked) {
        let stomped = detectMouseCollision(stomper, roachArr[i]);
        if (stomped) {
          myRoachSound.play();
          roachArr.splice(i, 1);
          score += 10;
        }
      }
    }
    stomper.clicked = false;
    if (didCollide) {
      // console.log("COLLISION");
      gameOver();
    }
  }

  //END
  let gameOverImg = new Image();
  gameOverImg.src = "/images/gameOver1.png";
  function gameOver() {
    window.cancelAnimationFrame(game);
    ctx.fillStyle = "black";
    ctx.drawImage(gameOverImg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "bold 60px Comic Sans MS";
    ctx.fillText(`GAME OVER`, 810, 700);
    ctx.fillStyle = "white";
    ctx.font = "italic 50px Comic Sans MS";
    ctx.fillText(`Your score: ${score}`, 810, 766);
    myMusic.stop();
    endGameSound.play();
    isGameOn = false;
  }
};
