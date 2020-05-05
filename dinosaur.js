class Dinosaur {               //定义一个名为Dinosaur的类，这个类定义了恐龙的一些属性和方法
  constructor() {           //构造函数，通过它可以定义和设置类的一些属性
    this.img = imgDino[3];    //定义类的图像，并设置它的初始值为图3
    this.w = this.img.width * 1.5; //定义类的宽度，并设置宽度值为它的图像的宽度
    this.h = this.img.height * 1.5; //定义类的高度，并设置高度值为它的图像的高度
    this.x = 80;              //定义类的横坐标，并设置它的初始值为80像素
    this.y = height - this.h;   //定义类的纵坐标，并设置它的初始值，使它的底部与屏幕的底部对齐

    this.vy = 0;               //定义类的垂直方向的速度，并设置它的初始值为0
    this.gravity = 1;        //定义类的重力参数，并设置它的初始值为1 
  }

  jump() {                     //定义恐龙类的跳跃方法
    if (this.y == height - this.h) { //只有恐龙的脚在地面上，才能够跳跃。否则的话，在半空中也能跳跃了
      this.vy = -18;            //使恐龙有垂直向上的起跳初速度

    }
  }

  move() {                                       //定义恐龙类的移动方法
    this.y += this.vy;                            //使恐龙有竖直方向的位移，移动的初速度是起跳初速度
    this.vy += this.gravity;                      //使恐龙的垂直速度加上重力加速度
    this.y = constrain(this.y, 0, height - this.h); //使恐龙在竖直方向上，不会超出屏幕的范围
  }

  update() {                                    //定义恐龙的更新方法，把恐龙设置为当前状态的图片
    if (cld == 0) {                                //如果没有发生碰撞
      if (this.y < height - 100) {                   //并且恐龙离开地面
        this.img = imgDino[2];                 //使恐龙显示为跳跃的图2
      }
      else {                                   //如果恐龙没有离开地面
        this.img = imgDino[index % 2 + 3];        //使恐龙显示为行走的图3和图4
      }
    }
    else {                                      //如果发生了碰撞 
      this.img = imgDino[5];                   //使恐龙显示为发生碰撞的图5
    }
  }

  show() {                                          //定义恐龙类的显示方法
    image(this.img, this.x, this.y + 2, this.w, this.h);  //显示当前状态恐龙的图片
  }
  // 定义恐龙类的碰撞检测方法
  hits(obstacle) {  
    let x = this.x - 10;
    let y = this.y - 5;
    let w = this.w - 5;
    let h = this.h - 10;
    let x2 = obstacle.x;
    let y2 = obstacle.y;
    let w2 = obstacle.w - 30;
    let h2 = obstacle.h - 35;
     //返回两个矩形是否碰撞的检测结果的逻辑值，发生碰撞为真，未发生碰撞为假
    if (x + w >= x2 &&    // r1 right edge past r2 left
      x <= x2 + w2 &&    // r1 left edge past r2 right
      y + h >= y2 &&    // r1 top edge past r2 bottom
      y <= y2 + h2) {    // r1 bottom edge past r2 top
      return true;
    }
    return false;                                 
  }

  addScore(obstacle) {                                              //定义恐龙类的得分方法
    if ((obstacle.x + obstacle.w < this.x) && (obstacle.score == 0) && (cld == 0)) { //如果某个障碍物的右侧部分在恐龙的左边，并且恐龙之前没有经过这个障碍物，并且没有发生碰撞
      obstacle.score = 1;                                          //使这个障碍物的分数为1，表示恐龙已经经过了这个障碍物，就不再继续得分
      score += 1;                                                  //得分加一
    }
  }
}


