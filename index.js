window.onload = () => {
    document.getElementById("start-button").onclick = () => {
      startGame();
    };

    const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let isGameOn = false;

  const slipper  = new Image();
  slipper.src = "/images/images (2).png";
  