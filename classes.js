//SOUND
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
//PLAYER
// ctx.rotate(degrees*Math.PI/180);
const boot = new Image();
boot.src = "images/shoe1.png";

class Player {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height;
    this.w = 140;
    this.h = 200;
    this.image = boot;
    this.clicked = false;
    this.mouseX = null;
    this.mouseY = null;
  }
}
//ROACH
const roachImg = new Image();
roachImg.src = "images/roach1.png";

class Roach {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.w = 80;
    this.h = 100;
    this.vx = 5;
    this.vy = 5;
    this.image = roachImg;
  }
  move() {
    this.x += this.vx + 2;
    this.y += this.vy + 2;
    if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
      this.vy *= -1;
    }
    if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
      this.vx *= -1;
    }
  }
}
//PET
const catImg = new Image();
catImg.src = "images/cat4.png";
const dogImg = new Image();
dogImg.src = "images/dog2.png";

class Pet {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.w = 140;
    this.h = 220;
    this.image = this.changePetImg();
  }
  move() {
    this.x = this.x + 4;
  }
  changePetImg() {
    let petArr = [catImg, dogImg];
    let petImg = petArr[Math.floor(Math.random() * petArr.length)];
    return petImg;
    //get method to return random el from Arr
    //return selected el
  }
}