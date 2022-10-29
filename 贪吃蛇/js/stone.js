// 障碍物模块

function Stone(parent) {
    this.parent = parent;
    this.stoneArr = [
        // {row: 3, col: 3},
        // {row: 4, col: 3},
        // {row: 5, col: 3},
        // {row: 6, col: 3},

        // {row: 8, col: 3},
        // {row: 8, col: 4},
        // {row: 8, col: 5},
        // {row: 8, col: 6},

        {row: 3, col: 3},
        {row: 4, col: 3},
        {row: 5, col: 3},
        {row: 5, col: 4},
        {row: 5, col: 5}
    ];
}

Stone.prototype = {
    constructor: Stone,

    init: function() {

        // console.log("初始化障碍物");

        // console.log(this.parent);
        // console.log(this.parent.map.mapArr, '障碍物模块');

        this.renderStone();


    },

    renderStone: function() {
        var mapArr = this.parent.map.mapArr;

        for (var i=0; i<this.stoneArr.length; i++) {
            mapArr[this.stoneArr[i].row][this.stoneArr[i].col].style.backgroundImage = "url(./img/block.png)";

            //  将小格子的状态标记了障碍物
            mapArr[this.stoneArr[i].row][this.stoneArr[i].col].type = 2;
        }
    }

};