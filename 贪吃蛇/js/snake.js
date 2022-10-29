// 蛇角色模块

/* 

errno: 蛇往前移动时的碰撞结果：
    0  ：  前面就是空格子，不会碰撞
    1  ：  前面是食物
    2  ：  前面是障碍物
    3  ：  前面是蛇的身体
    4  ：  前面是墙
    5  ：  表示回头

 */

function Snake(parent) {
    this.snakeArr = [
        // row 行坐标  col  列坐标   diretion  身体朝向
        // {row: 8, col: 4, diretion: 0},
        {row: 8, col: 5, diretion: 0},
        {row: 8, col: 6, diretion: 0},
        {row: 8, col: 7, diretion: 0},
        {row: 8, col: 8, diretion: 0},
    ]

    this.parent = parent;
    this.rows = parent.rows;
    this.cols = parent.cols;
    this.mapArr = parent.map.mapArr;
}

Snake.prototype = {
    constructor: Snake,

    init: function() {
        // console.log("初始化蛇角色");

        // 蛇头背景图片
        this.headImg = "./img/1.png";
        // 蛇身背景图片
        this.bodyImg = "./img/5.png";
        // 蛇尾背景图片
        this.tailImg = "./img/8.png";

        this.renderSnake();
    },

    renderSnake: function() {

        var head = this.snakeArr[0];
        var bodies = this.snakeArr.slice(1,-1);
        var tail = this.snakeArr.slice(-1)[0];

        // 绘制蛇头
        this.renderLimbs(head, this.headImg);

        // 绘制蛇尾
        this.renderLimbs(tail, this.tailImg);

        // 绘制蛇身体
        for (var i=0; i<bodies.length; i++) {
            this.renderLimbs(bodies[i], this.bodyImg);
        }

    },

    renderLimbs: function(limb, imgSrc) {
        // 设置小格子的背景图片为蛇头，蛇身或蛇尾
        this.mapArr[limb.row][limb.col].style.backgroundImage = "url(" + imgSrc +")";
        // 将小格子的状态标记为蛇身体
        this.mapArr[limb.row][limb.col].type = 3;
        // 设置蛇身体的朝向
        this.mapArr[limb.row][limb.col].style.transform = "rotate(" + limb.diretion * 90 + "deg)";
    }, 

    move: function(row, col, diretion) {
        // 清空原来蛇身体所占的小格子的背景图片
        this.clear();

        var head = this.snakeArr[0];
        head.diretion = diretion;

        for (var i=this.snakeArr.length - 1; i>0; i--) {
            this.snakeArr[i].row = this.snakeArr[i - 1].row;
            this.snakeArr[i].col = this.snakeArr[i - 1].col;
            this.snakeArr[i].diretion = this.snakeArr[i - 1].diretion;
        }

        head.row = row;
        head.col = col;
        this.renderSnake();
    },

    // 碰撞检测 （检测移动到的下一个格子是空格子、障碍物或食物）
    crashTest: function(diretion) {

        // 获取到蛇头的坐标
        var row = this.snakeArr[0].row;
        var col = this.snakeArr[0].col;
        var msgArr = [
            "向前冲呀！",
            "吃到食物啦！",
            "撞到石头啦！",
            "咬到自己啦！"
        ];

        // 根据蛇头的坐标和移动方向来计算下一个格子的坐标
        switch (diretion) {

            // 向左移动
            case 0:
                col -= 1;
                break;

            // 向上移动
            case 1:
                row -= 1;
                break;

            // 向右移动
            case 2:
                col += 1;
                break;

            // 向下移动
            case 3:
                row += 1;
                break;
        }

        // 判断是不是撞墙了
        if (row < 0 || col < 0 || row >= this.rows || col >= this.cols) {
            return {errno: 4, msg: "撞到南墙啦！"};
        }

        // 获取到蛇头前面的小格子
        var nextDiv = this.mapArr[row][col];

        return {
            row: row, 
            col: col,
            errno: nextDiv.type,
            msg: msgArr[nextDiv.type]
        };

    },

    eatFood: function(row, col, diretion) {
        this.snakeArr.unshift({row: row, col: col, diretion: diretion});
        this.renderSnake();
    },

    clear: function() {
        for (var i=0; i<this.snakeArr.length; i++) {
            // 清空背景
            this.mapArr[this.snakeArr[i].row][this.snakeArr[i].col].style.backgroundImage = 'none';

            // 重置小格子的 rotate 角度。
            this.mapArr[this.snakeArr[i].row][this.snakeArr[i].col].style.transform = '';

            // 将小格子的状态重置为空格子
            this.mapArr[this.snakeArr[i].row][this.snakeArr[i].col].type = 0;
        }
    }

};