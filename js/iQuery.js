// var timer;

function animate(obj, attr, times, fn) {

    var count = 0, begin = parseFloat(css(obj, 'width')),
        target = attr.width,
        change = target - begin, current;

    // 使用一个对象来存储样式属性的初始值
    var initObj = {};
    // {width: 100, height: 150}
    for (var i in attr) {
        // console.log(i);
        initObj[i] = parseFloat(css(obj, i));
    }
    // console.log(initObj);

    clearInterval(obj.timer);
    obj.timer = setInterval(function() {

        count ++;
        
        for (var i in attr) {
            var begin = initObj[i];
            var change = attr[i] - begin;
            var current = begin + change / times * count;
            obj.style[i] = current + (i === 'opacity' ? '' : 'px');
        }

        if (count >= times) {
            clearInterval(obj.timer);
            if (typeof fn === 'function') {
                // 回调函数：在所有语句中，最后被调用的函数
                fn();
            }
        }

    }, 20);

}

// 既可以获取，也可以设置样式的封装函数
function css(obj, attr, val) {

    if (typeof attr === 'object') {

        for (var i in attr) {
            obj.style[i] = attr[i];
        }

    } else if (typeof val === 'undefined') {

        return getComputedStyle(obj)[attr];

    } else {

        obj.style[attr] = val;

    }

}