// 食物模块

function Food(parent) {
    // this.food = {row: 3, col: 5};
    this.parent = parent;
    this.rows = parent.rows;
    this.cols = parent.cols;
}

Food.prototype = {
    constructor: Food,

    init: function() {

        // console.log("初始化食物");

        this.renderFood();

    },

    renderFood: function() {
        var mapArr = this.parent.map.mapArr;
        var row = this.randNum(this.rows);
        var col = this.randNum(this.cols);
        var foodDiv = mapArr[row][col];

        // 如果小格子的状态不为 0，表示当前小格子已经被占用，不能存放食物
        if (foodDiv.type) {
            this.renderFood();
            return;
        }

        foodDiv.style.backgroundImage = "url(./img/food.jpg)";

        // 将小格子的状态设置为食物
        foodDiv.type = 1;
   
    },

    // 生成一个随机的 0 ~ x - 1 之间的数字
    randNum: function(x) {
        return Math.floor( Math.random() * x );
    }

};