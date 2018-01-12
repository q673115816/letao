
$(function () {
    var data = [
        {time: "1月", sell: 1000},
        {time: "2月", sell: 2000},
        {time: "3月", sell: 1036},
        {time: "4月", sell: 2501},
        {time: "5月", sell: 1002},
        {time: "6月", sell: 2001},
    ]
    var arr1 = data.map(function (e) {
        return e.time;
    })
    var arr2 = data.map(function (e) {
        return e.sell;
    })
    var myChart = echarts.init(document.getElementById('chart1'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: arr1
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: arr2
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});
$(function () {
    var data = [
        {value: 335, name: '耐克'},
        {value: 310, name: '阿迪'},
        {value: 234, name: '李宁'},
        {value: 135, name: '新百伦'},
        {value: 1548, name: '阿迪王'}
    ];
    var arr1 = data.map(function (e) {
        return e.name;
    })
    var myChart = echarts.init(document.getElementById('chart2'));
    // 指定图表的配置项和数据
    option = {
        title: {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: arr1
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});