mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: false, //是否显示滚动条
});
var gallery = mui('.mui-slider');
gallery.slider({
    interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
});

function getE() {
    var data = decodeURI(location.search.slice(1));
    var arr = data.split("&");
    var obj = {};
    arr.forEach(function (e, i) {
        obj[e.split("=")[0]] = e.split("=")[1]
    })
    return obj
}

function GET(key) {
    return getE()[key];
}
