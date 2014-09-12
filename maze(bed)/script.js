// Визначення глобальних змінних 
var canvas;
var context;

// поточна позиція значка
var x = 0;
var y = 0;

// швидкість перемішення значка
var dx = 0;
var dy = 0;

// таймер, що керує включенням і виключенням лабіринту
var timer;

//завантажуємо лабіринти
function loadEasy() {
  drawMaze('http://professorweb.ru/my/html/html5/level4/files/easy_maze.png', 5, 5);
}

function loadHard() {
  drawMaze('http://professorweb.ru/my/html/html5/level4/files/maze.png', 268, 5);
}

window.onload = function() {
  
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  // фон
  drawMaze("http://professorweb.ru/my/html/html5/level4/files/maze.png", 268, 5);

  window.onkeydown = processKey;
};

function drawMaze(mazeFile, startingX, startingY) {

  clearTimeout(timer);

  // зупинити переміщення значка
  dx = 0;
  dy = 0;

  // зображення лабіринту
  var imgMaze = new Image();
  imgMaze.onload = function() {
    // підгонка до розмірів
    canvas.width = imgMaze.width;
    canvas.height = imgMaze.height;

    // малюємо лабіринт
    context.drawImage(imgMaze, 0,0);

    // малюємо значок!!!!!!
    x = startingX;
    y = startingY;

    var imgFace = document.getElementById("face");
    context.drawImage(imgFace, x, y);
    context.stroke();

    // наступний кадр -  10 мсек
    timer = setTimeout("drawFrame()", 10);
  };
  imgMaze.src = mazeFile;
}

function processKey(e) {
  // зупинка значка
  dx = 0;
  dy = 0;

  // вгору
  if (e.keyCode == 38) {
    dy = -1;
  }

  // вниз
  if (e.keyCode == 40) {
    dy = 1;
  }

  // вліво
  if (e.keyCode == 37) {
    dx = -1;
  }

  // вправо
  if (e.keyCode == 39) {
    dx = 1;
  }
}

function checkForCollision() {
  // інвертуємо пікселі
  var imgData = context.getImageData(x-1, y-1, 15+2, 15+2);
  var pixels = imgData.data;

  // один піксель
  for (var i = 0; n = pixels.length, i < n; i += 4) {
    var red = pixels[i];
    var green = pixels[i+1];
    var blue = pixels[i+2];
    var alpha = pixels[i+3];

    // чи є чорний?
    if (red == 0 && green == 0 && blue == 0) {
      return true;
    }
    // чи є сірий?
    if (red == 169 && green == 169 && blue == 169) {
      return true;
    }
  }
 
  return false;
}


function drawFrame() {
  // оновлення
  if (dx != 0 || dy != 0) {
    // замальовуємо пройдений шлях
    context.beginPath();
    context.fillStyle = "rgb(254,244,207)";
    context.rect(x, y, 15, 15);
    context.fill()

    // оновлюємо координати
    x += dx;
    y += dy;

    
    if (checkForCollision()) {
      x -= dx;
      y -= dy;
      dx = 0;
      dy = 0;
    }

    // перемальовуємо значок!!!!!
    var imgFace = document.getElementById("face");
    context.drawImage(imgFace, x, y);

    // фініш?
    if (y > (canvas.height - 17)) {
      alert("Ты победил!");
      return;
    }
  }

  // наступний кадр
  timer = setTimeout("drawFrame()", 10000);
}

