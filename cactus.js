class Cactus {                          //定义一个名为Cactus的类，这个类定义了仙人掌的一些属性和方法
  constructor() {                    //构造函数，通过它可以定义和设置类的一些属性
    this.img = imgCactus[int(random(1, 12))]; //定义类的图像，并设置它的初始值为12张图中的随机的一张
    this.w = this.img.width * 1.5; //定义类的宽度，并设置宽度值为它的图像的宽度
    this.h = this.img.height * 1.5; //定义类的高度，并设置高度值为它的图像的高度
    this.x = width;                  //定义类的横坐标，并设置它的初始值为画布的宽度
    this.y = height - this.h;         //定义类的纵坐标，并设置它的初始值，使它的底部与画布的底部对齐
    this.score = 0;                  //定义类的得分，设置初始值为0，用来记录恐龙是否经过了这个仙人掌
  }
  move() {                              //定义仙人掌类的移动方法
    this.x -= 8;                         //使仙人掌有水平方向的位移，始终以固定的速度向左移动
  }
  show() {                              //定义仙人掌类的显示方法

    image(this.img, this.x, this.y + 5, this.w, this.h); //显示当前的仙人掌图片
  }
}