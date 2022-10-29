// 主模块

/* 
Game 构造函数的形参：
    rows : 地图行数
    cols : 地图列数
    width : 每一个小格子的宽度
    height : 每一个小格式的高度
    selector : 游戏容器元素的选择器

*/

function Game(rows, cols, width, height, selector) {

    // 游戏的容器元素
    this.el = document.querySelector(selector);
    // 将行和列设置添加在主模块中，就不需要每一个子模块都传递一次参数了。
    // 注意要在子模块之前添加，否则子模块内部获取不到值
    this.rows = rows;
    this.cols = cols;

    // 将四个子模块作为主模块的实例属性
    this.map = new Map(width, height, this);
    this.stone = new Stone(this);
    this.snake = new Snake(this);
    this.food = new Food(this);


    // 设置默认的运动方向
    this.diretion = 0;

    // 设置暂停开关
    this.isStop = true;

    // 得分
    this.score = 0;
}

Game.prototype = {
    constructor: Game,

    init: function() {

        // console.log("初始化游戏");

        // 执行地图的初始化方法
        this.map.init(20, 20);

        // 执行障碍物的初始化方法
        this.stone.init();

        // 执行蛇角色的初始化方法
        this.snake.init();

        // 执行食物的初始化方法
        this.food.init();

        // console.log('1111', this.map.mapArr );

        this.start();

    },

    start: function() {
        var arrows = {
            ArrowLeft: 0,
            ArrowUp: 1,
            ArrowRight: 2,
            ArrowDown: 3
        };
        // 用一个变量保存当前作用域中的this对象。
        // var _this = this;
        var _that = this;


        document.onkeydown = function(ev) {
            var diretion = arrows[ev.key];

            if (ev.key === ' ') {
                // 切换开始暂停状态。
                _that.isStop = !_that.isStop;
            }

            // 如果值不为 undefined, 说明按下的一定是方向键
            // 如果 Math.abs(diretion - _that.diretion) 的值为 2 说明按的是与当前移动方向相反的方向
            // Math.abs(diretion - _that.diretion) !== 2 即限制不能按相反方向的按键。
            if (diretion !== undefined && Math.abs(diretion - _that.diretion) !== 2) {
                // 改变移动方向
                _that.diretion = diretion;
            }

        };

        this.run();
    },

    run: function() {
        var _that = this;

        this.timer = setInterval(function(){

            if (_that.isStop) return;

            var result = _that.snake.crashTest(_that.diretion);
                var errno = result.errno;

                if (errno > 1) {
                    console.log(result.msg);
                    _that.gameover();
                    return;
                }

                // 吃食物
                if (errno === 1) {
                    console.log(result.msg);

                    // 吃食物
                    _that.snake.eatFood(result.row, result.col, _that.diretion);
                    // 生成新的食物
                    _that.food.renderFood();

                    // 计分
                    _that.score ++;

                    return;
                }

                _that.snake.move(result.row, result.col, _that.diretion);

        }, 200);
    },

    gameover: function() {
        alert("游戏结束！得分：" + this.score);
        clearInterval(this.timer);
    }
};