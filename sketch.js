
var lastAddTime = 0;          //定义记录上次增加障碍物的时间的变量，并且设置初值为0
let cactuses = [];              //定义一个仙人掌类的数组，用来存储多个仙人掌的类
var imgDino = [];              //定义一个恐龙图片的数组，用来存放一些恐龙的图片
var imgCactus = [];            //定义一个仙人掌图片的数组，用来存放一些仙人掌的图片
var jumpSound;                //定义恐龙跳跃的音效的变量
var gameoverSound;            //定义游戏结束的音效的变量

var score = 0;                  //定义游戏的得分的变量，并设置初始值为0
var gameScreen = 0;             //定义游戏界面的变量，并设置初始值为0
var cld = 0;                   //定义一个变量，用来判断恐龙和障碍物是否发生了碰撞，值为0表示没有发生碰撞
var index = 1;                  //定义一个变量作为指示器，来控制显示不同的图片
function setup() {            //设置部分
  createCanvas(windowWidth, windowHeight - 100);     //设置画布大小，宽高为窗口大小
  dinosaur = new Dinosaur();  //定义一个名为dinosaur的对象，这个对象是属于恐龙类（Dinosaur类）
  cactus = new Cactus();      //定义一个名为cactus的对象，这个对象是属于仙人掌类（Cactus类）
}

function draw() {                          //绘图部分

  //判断当前界面状态，进入不同界面
  if (gameScreen == 0) {         //如果当前是游戏准备开始界面状态
    initScreen();                //调用游戏准备方法，进入游戏准备界面
  } else if (gameScreen == 1) {  //如果当前是游戏界面状态
    gamePlayScreen();            //调用开始游戏方法，进入游戏界面
  } else if (gameScreen == 2) {  //如果当前是游戏结束界面状态
    gameOverScreen();            //调用游戏结束方法，进入游戏结束界面
  }
}
function addObstacle() {                    //定义增加障碍物的函数
  var interval = random(800, 4000);           //设置前后两个仙人掌出现的时间间隔是800到4000毫秒中的一个随机数 
  if (millis() - lastAddTime > interval) {   //如果当前时间与上次添加仙人掌类的时间，相差超过一个时间间隔，就增加一个新的仙人掌类
    cactuses.push(new Cactus());       //添加一个新的仙人掌对象到仙人掌类的数组中
    lastAddTime = millis();              //将上次增加障碍物的时间设置为当前的时间
  }
}

function initScreen() {               //游戏开始界面
  background(245, 255, 250);         //设置背景色
  image(imgDino[index % 4 + 1], 80, height - imgDino[index % 4 + 1].height * 1.5 - 10, imgDino[index % 4 + 1].width * 1.5, imgDino[index % 4 + 1].height * 1.5);//循环显示恐龙图片的图1至图4，使恐龙有一些动作

  textAlign(CENTER);                 //设置文本对齐方式为居中对齐
  fill(255, 223, 0);                  //设置文本颜色
  textSize(100);                     //设置字体大小
  text("DINOSAUR JMUP", width / 2, height / 2); //输出文字，并设置文字的位置

  fill(255, 223, 0);                        //填充长方形按钮颜色
  noStroke();                         //设置长方形的外边框为无
  rectMode(CENTER);                   //设置画长方形的模式为正中心
  rect(width / 2, height - 40, 200, 60, 5); //设置长方形的长宽和位置，圆角的大小
  fill(236, 240, 241);                  //设置文本颜色
  textSize(30);                       //设置字体大小
  text("Start", width / 2, height - 30);   //输出文字，并设置文字的位置
}

function gamePlayScreen() {  //游戏中的界面
  background(245, 255, 250);              //设置背景颜色
  addObstacle();                          //调用添加障碍物的函数
  printScore();                           //调用打印得分的函数，将得分显示在画布上
  dinosaur.update();                      //通过调用恐龙类的更新方法，将恐龙的图片设置为它当前状态的图片
  dinosaur.move();                        //通过调用恐龙类的移动方法，使恐龙发生移动
  dinosaur.show();                        //通过调用恐龙类的显示方法，将恐龙显示出来 
  if (frameCount % 6 == 0) index++;           //设置恐龙动画的快慢
  for (let c of cactuses) {                 //使仙人掌类数组中的每一个仙人掌对象移动和显示
    c.move();                            //调用仙人掌类的移动方法
    c.show();                            //调用仙人掌类的显示方法
    if (dinosaur.hits(c)) {                //判断恐龙是否与仙人掌对象发生碰撞，如果发生碰撞
      cld = 1;                              //将变量的值设为1，表示已经发生了碰撞
      // gameoverSound.play();
      textAlign(CENTER);                  //设置文字的对齐方式为居中对齐  
      textSize(70);                       //设置文字的大小为70像素
      gameOver();                         //调用游戏结束的函数，来显示游戏结束的界面

    }
    dinosaur.addScore(c);                 //调用恐龙类的得分方法
  }
}

function gameOverScreen() {  //游戏结束界面
  background(23, 24, 24, 3);     //设置背景颜色
  textAlign(CENTER);            //设置文本对齐方式为居中对齐
  fill(77, 212, 71);                      //设置文本颜色
  textSize(30);                            //设置字体大小
  text("Score", width / 2, height / 2 - 110);     //输出文字，并设置文字的位置
  textSize(150);                           //设置字体大小
  text(score, width / 2, height / 2 + 50);       //输出文字并设置文字的位置

  fill(255, 223, 0);                        //填充长方形按钮颜色
  rectMode(CENTER);                        //设置画长方形的模式为正中心
  noStroke();                              //设置长方形的外边框为无
  rect(width / 2, height - 40, 200, 60, 5);      //设置长方形的长宽和位置，圆角的大小
  fill(236, 240, 241);                       //设置文本颜色
  textSize(30);                            //设置字体大小
  text("Restart", width / 2, height - 30);     //输出文字并设置文字的位置
}
function startGame() {   //游戏开始函数
  gameScreen = 1;          //设置当前界面状态为游戏界面
}


function gameOver() {    //游戏结束界面
  gameScreen = 2;         //设置当前界面状态为游戏结束界面
  gameoverSound.play();
}

function restart() {     //游戏重新开始的方法
  gameScreen = 1;        //使当前界面为游戏界面
  lastAddTime = 0;       //重置增加障碍物的时间
  cactuses = [];          //初始化翼龙类的数组，将原来存储的翼龙类对象清空 
  cld = 0;                //重置用来判断是否发生碰撞的变量
  score = 0;              //重置分数的变量
}

function preload() {                        //预加载函数，通过它把图片加载到数组中
  jumpSound = loadSound("assets/jump.mp3");
  gameoverSound = loadSound("assets/gameover.wav");
  for (let i = 1; i <= 5; i++) {            //使用for循环，把这些恐龙图片依次加载到恐龙数组中
    var str1 = "assets/dinosaur/dino" + i + ".png"; //定义一个字符变量，并将恐龙图片的名字的字符串赋值给它
    imgDino[i] = loadImage(str1);        //将这个名字的图片加载到数组中
  }

  for (let j = 1; j <= 12; j++) {             //使用for循环，把这些仙人掌的图片依次加载到仙人掌数组中
    var str2 = "assets/cactus/cactus" + j + ".png";  //定义一个字符变量，并将仙人掌图片的名字的字符串赋值给它
    imgCactus[j] = loadImage(str2);       //将这个名字的图片加载到数组中
  }
}

function keyPressed() {                  //定义一个按键的事件，如果按下键盘的键，就调用此函数
  if (key == ' ') {                      //如果按下的键是空格键
    dinosaur.jump();                    //通过调用恐龙类的跳跃方法，使恐龙跳跃起来
  }
}

function mouseClicked() { //定义一个鼠标点击事件，如果点击鼠标，就调用此函数

  if (gameScreen == 0) {    //按下鼠标时,如果当前界面是游戏准备开始界面
    startGame();         //调用游戏开始方法，来开始游戏 
  }
  if (gameScreen == 2) {    //按下鼠标时,如果当前界面是游戏结束界面
    restart();           //调用游戏重新开始函数，来重新开始游戏
  }
  if (gameScreen == 1) {    //按下鼠标时,如果当前界面是游戏中的界面
    dinosaur.jump();    //调用恐龙类的跳跃方法，使恐龙跳跃
    jumpSound.play();   //播放恐龙跳跃的声音
  }

}

// 打印得分方法
function printScore() {
  textAlign(LEFT);
  fill(77, 212, 71);
  textSize(30);
  text("Score: " + score, 5 * width / 6, height / 9);
} 