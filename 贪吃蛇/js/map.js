// 地图模块
/* 

    type :  表示每一个小格子的状态
        0 ： 空格子
        1 ： 食物
        2 ： 障碍物
        3 ： 蛇身体


 */

function Map(width, height, parent) {
    this.width = width;
    this.height = height;
    this.parent = parent;
    this.rows = parent.rows;
    this.cols = parent.cols;

    // 存储所有地图小格子
    this.mapArr = [];
}

Map.prototype = {
    constructor: Map,

    init: function() {

        // 设置地图容器宽度
        this.parent.el.style.width = this.width * this.cols + 'px';

        var tmpArr = [];

        // 创建地图小方块
        for (var i=0; i<this.rows * this.cols; i++) {
            var div = document.createElement('div');
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            this.parent.el.appendChild(div);

            div.type = 0;

            if ( i && i % this.cols === 0) {
                this.mapArr.push(tmpArr);
                tmpArr = [];
            }
            tmpArr.push(div);

        }
        this.mapArr.push(tmpArr);

    }

};