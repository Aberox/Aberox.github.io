

// 轮播图
var pic = document.getElementsByClassName('pic')[0];

var imgs = pic.getElementsByTagName('img');
var div = document.getElementsByClassName('dots')[0];
var dots = div.getElementsByTagName('span');

var iW = parseFloat(css(imgs[0], 'width')),
    length = imgs.length,
    index = 0;
for (var i = 0; i < dots.length; i++) {

    dots[i].index = i;
    dots[i].onmouseenter = function () {

        for (var i = 0; i < dots.length; i++) {
            dots[i].className = '';
        }
        this.className = 'current';
        index = this.index;
        animate(pic, { left: -iW * index },1);
    }

};

// 轮播图按钮
function setDots() {
    for (var i = 0; i < dots.length; i++) {
        dots[i].className = '';
    }
    if (index === length - 1) {
        dots[0].className = 'current';
    }
    else {
        dots[index].className = 'current';
    }
}


// 导航栏
var tab = document.querySelector('.top1');
var btns = tab.getElementsByTagName('li');
var a = 0;
btns[i].a = i;
for (var i = 0; i < btns.length; i++) {
    btns[i].onmouseenter = function () {
        for (var i = 0; i < btns.length; i++) {
            btns[i].className = '';
        }
        this.className = 'active';
    };
};
