var app = {};
var option = null;
var myChartLine = echarts.init(document.getElementById('container'));
//使用制定的配置项和数据显示图表

function setOptionLine(section,rawData1,rawData2){
    // 指定图表的配置项和数据
    option = {
        backgroundColor: 'rgba(9,9,19,1 )',
        title: {
            textStyle:{
                color:"#FFFFFF",
                fontSize: 48
            },
            text:section,
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            right: 65,
            top: 20,
            textStyle:{
                color:"#FFFFFF",
                fontSize: 24
            },
            data:['昨日曲线','今日曲线']
        },
        toolbox: {
            show: false,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        grid:{
            left:5,
            right:20,
            top:80,
            bottom:50,
            containLabel:true,
        },
        xAxis:  {
            type: 'time',
            boundaryGap: true,
            // timeFormat:'hh:MM',
            // data:rawData2,
            // data: ['周一','周二','周三','周四','周五','周六','周日'],
            axisLabel: {
                show: true,
                // interval:20,
                rotate:90,
                // formatter:function(c){
                //     // console.log(value);
                //     reutrn c.split(" ")[1];
                // },
                textStyle: {
                    color: '#fff',
                    fontSize:24
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#0A81F9'
                }
            },
            splitLine: {
                show:false,
                lineStyle: {
                    type: 'dashed',
                    color:'#0A81F9'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            },
            axisLabel: {
                show: true,
                interval:0,
                rotate:0,
                textStyle: {
                    color: '#fff',
                    fontSize:24
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#0A81F9'
                }
            },
            splitLine: {
                show:false,
                lineStyle: {
                    type: 'dashed',
                    color:'#0A81F9'
                }
            }
        },
        series: [
            {
                name:'昨日曲线',
                type:'line',
                // data:[11, 11, 15, 13, 12, 13, 10],
                data:rawData2,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                }
            },
            {
                name:'今日曲线',
                type:'line',
                data:rawData1,
                markPoint: {
                    data: [
                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    ]
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartLine.setOption(option);
    window.onresize = function(){
        myChartLine.resize();
    }
    return option;
}

function processingDataLine(section,jsonData1,jsonData2){
    var LineOption = setOptionLine(section,jsonData1,jsonData2);
    myChartLine.setOption(LineOption);
} 