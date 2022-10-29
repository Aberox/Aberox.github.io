var pic = document.getElementsByClassName('pic')[0];
var leftBtn = document.getElementsByClassName('lbtn')[0];
var rightBtn = document.getElementsByClassName('rbtn')[0];
var imgs = pic.getElementsByTagName('img');
var div = document.getElementsByClassName('dots')[0];
var dots = div.getElementsByTagName('span');
// console.log(imgs.length);
// iW : 单张图片宽度
var iW = parseFloat(css(imgs[0], 'width')),
    // length : 图片的张数
    length = imgs.length,
    // 当前显示的图片的索引
    index = 0;

var timer;
timer = setInterval(function () {
    index++
    css(pic, 'left', -iW * index + 'px')
    if (index === length - 1) {
        index = 0
    }
    setDots();
}, 3000);
pic.onmouseenter = function () {
    clearInterval(timer);
}

var timer1 = timer;
pic.onmouseleave = function () {
    timer1 = setInterval(function () {
        index++
        css(pic, 'left', -iW * index + 'px')
        if (index === length - 1) {
            index = 0
        }
        setDots();
    }, 4000);
};

pic.onmouseenter = function () {
    clearInterval(timer1);
}

css(pic, 'width', iW * length + 'px');
leftBtn.onclick = function () {
    index--;
    if (index < 0) {
        index = length - 1;
        css(pic, 'left', -iW * index + 'px');
        index--;
    }
    animate(pic, { left: -iW * index }, 12);

    setDots();
};

rightBtn.onclick = function () {
    index++;
    index = index % length;
    animate(pic, { left: -iW * index }, 12, function () {
        console.log("第" + index + "张图片运动结束。")
        if (index == length - 1) {
            index = 0;
            css(pic, 'left', '0px');
        }
    });

    setDots();
};

for (var i = 0; i < dots.length; i++) {

    dots[i].index = i;
    dots[i].onclick = function () {
        // console.log(this);
        for (var i = 0; i < dots.length; i++) {
            dots[i].className = '';
        }

        this.className = 'current';
        // 将当前点击的小圆点的下标赋值给 全局变量 index 
        index = this.index;

        // 通过下标来切换图片
        animate(pic, { left: -iW * index }, 12);
    }

};

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

var $top = $(".toTop"), timer;
$(window).scroll(function () {
    var y = $(window).scrollTop();
    // 节流
    clearTimeout(timer);
    timer = setTimeout(function () {

        // 防抖
        if ($top.is(":animated")) return;

        if (y > 300) {
            $top.fadeIn(500);
        } else {
            $top.fadeOut(500);
        }

    }, 1);

})

