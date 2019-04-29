var bar_myChart = echarts.init(document.getElementById('double_bar'));
var bar_option=null;
        function bar_setOption(last_time,bar_xAxis_data,bar_plvdata,bar_zunidata){
                bar_option = {
                        title: {
                        textStyle:{
                             color:"#FFFFFF",
                             fontSize: 30
                        },
                       
                        text:last_time,
                        left: 'center'
                    },
                    tooltip: {
                        show:false,
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        show:false,
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:['阻尼比','频率'],
                        textStyle: {
                                    color: '#fff',
                                    fontSize:24
                                },
                        x: 1800,
                        
                    },
                    grid:{
                        x: 150,
                        y:100,
                        x2:200,
                        y2: 150,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    xAxis: [
                        {
                            type: 'category',
                            nameTextStyle:{fontSize:'24'},
                            data: bar_xAxis_data,
                            //设置轴线的属性
                            axisLine:{
                                lineStyle:{
                                    color:'#ffffff',
                                    width:1,//这里是为了突出显示加上的
                                }
                            },
                            // x轴的字体样式
                            axisLabel: {        
                                show: true,
                                interval:0,  
                                rotate:40, 
                                textStyle: {
                                    color: '#fff',
                                    fontSize:24
                                }
                            },
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine:{show:false},
                            nameTextStyle:{fontSize:'24'},
                            name: '频率(Hz)',
                            //设置轴线的属性
                            axisLine:{
                                lineStyle:{
                                    color:'#ffffff',
                                    width:1,//这里是为了突出显示加上的
                                }
                            },
                            axisLabel:{
                                    show: true,
                                    formatter: '{value}',
                                    textStyle: {
                                        fontSize:'24',
                                        color: '#fff'
                                    }
                               },
                            min: 0,
                            interval: 0.2,
                        },
                        {
                            type: 'value',
                            splitLine:{show:false},
                            name: '阻尼比(%)',
                            nameTextStyle:{fontSize:'24'},
                            axisLabel: {
                                    show: true,
                                    formatter: '{value} ',
                                    textStyle: {
                                        color: '#fff',
                                        fontSize:'24'
                                    }
                               },
                            //设置轴线的属性
                            axisLine:{
                                lineStyle:{
                                    color:'#ffffff',
                                    width:1,//这里是为了突出显示加上的
                                }
                            },
                            min: 0,
                            interval: 5,
                        }
                    ],
                    series: [                        
                        {

                            name:'频率',
                            type:'bar',
                            data:bar_plvdata,
                            itemStyle: {
                            //通常情况下：
                            normal: {
                                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                // color:'rgba(62,244,240,1)',
                                color: function(params) {//超过预警值显示红色
                                        if (bar_plvdata[params.dataIndex] < 0.3) {
                                            return '#BEDB29';
                                        }else{
                                            return 'rgba(62,244,240,1)';
                                        }
                                    },
                                }
                            },

                            
                             markLine:{
                                symbol:'none',//去掉箭头
                            
                                itemStyle: {
                                    normal: { 
                                        lineStyle: {
                                            type: 'dashed',
                                            // 这儿设置的颜色是公共配置，如需单独配置，请在data里配置
                                            color: '#ff0',
                                            width:6
                                        }, 
                                        label: { 
                                            show: true,
                                            position: 'start'
                                                
                                        }
                                    },
                                },
                                data: [
                                {
                                    name: 'X 轴值为 90 的竖直线',
                                    yAxis:0.3,
                                    // 单独配置每条线的样式
                                    lineStyle: {
                                        color: '#BEDB29',
                                        width:2
                                    },
                                    label: {
                                        show: true,//是否展示
                                        textStyle: {
                                            fontWeight:'bolder',
                                            fontSize : '22',
                                            color:'#BEDB29',
                                            fontFamily : '微软雅黑',
                                        }
                                    }
                                }
                            ]}
                        },
                        {
                            name:'阻尼比',
                            type:'bar',
                            yAxisIndex: 1,
                            barGap:'0%',
                            itemStyle: {
                            //通常情况下：
                            normal: {
                                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                color:'rgba(60,111,247,1)',
                                }
                            },
                            data:bar_zunidata,
                           
                        }
                    ]
                };         
            //      // 使用刚指定的配置项和数据显示图表。
            // bar_myChart.setOption(bar_option);  
            // window.onresize = function(){
            //     myChart.resize();
            // } 
                return bar_option;  
        }
        //bar_data
        function bar_data(last_time,bar_xAxis_data,bar_plvdata,bar_zunidata){
            var barChartOption =bar_setOption(last_time,bar_xAxis_data,bar_plvdata,bar_zunidata);
            bar_myChart.setOption(barChartOption);
        }