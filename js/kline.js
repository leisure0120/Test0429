 var kline_myChart = echarts.init(document.getElementById('k_line'));
    var kline_option=null     

 function kline_setOption(kline_time,kline_xAxis_data,kline_plvdata,kline_zunidata){
         kline_option = {
                    title: {
                        textStyle:{
                             color:"#FFFFFF",
                             fontSize: 30
                        },
                       
                        text:kline_time,
                        left: 'center'
                    },
                    grid:{
                        x: 150,
                        y:100,
                        x2:200,
                        y2: 150,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    legend: {
                        data:['阻尼比','频率'],
                        textStyle: {
                                    color: '#fff',
                                    fontSize:24
                                },
                        x: 1800,
                        
                    },
                    xAxis: [
                        {
                            type: 'category',
                            nameTextStyle:{fontSize:'24'},
                            data: kline_xAxis_data,
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
                            // x轴的字体样式
                            axisLabel: {        
                                show: true,
                                interval:0,  
                                rotate:0, 
                                formatter: '{value}',
                                textStyle: {
                                    color: '#fff',
                                    fontSize:24
                                }
                            },
                            // min: 0,
                            // max: 2,
                            // interval: 0.2,
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        {
                            type: 'value',
                            splitLine:{show:false},
                            nameTextStyle:{fontSize:'24'},
                            name: '阻尼比(%)',
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
                                rotate:0, 
                                textStyle: {
                                    color: '#fff',
                                    fontSize:24
                                }
                            },
                            axisPointer: {
                                type: 'shadow'
                            },
                            // min: 0,
                            // max: 25,
                            // interval: 5,
                    }],
                    series: [
                        {
                        name:'频率',
                        type: 'candlestick',
                        data:kline_plvdata,
                            itemStyle: {
                                    normal:{
                                            color:'#49F676',//阳线
                                            color0:'#49F676',//
                                            borderColor:'#49F676',//阳线边框
                                            borderColor0:'#49F676',//阴线边框
                                        }
                                    }
                        },
                        {
                            name:'阻尼比',
                            type: 'candlestick',
                            data: kline_zunidata,
                            yAxisIndex: 1,
                            itemStyle: {
                                    normal:{
                                            color:'#4AC5F6',//阳线
                                            color0:'#4AC5F6',//
                                            borderColor:'#4AC5F6',//阳线边框
                                            borderColor0:'#4AC5F6',//阴线边框
                                        }
                                    }
                            }
                    ],
                };

        return kline_option;

    }

 //kline_data
        function kline_data(kline_time,kline_xAxis_data,kline_plvdata,kline_zunidata){
            var klineChartOption =kline_setOption(kline_time,kline_xAxis_data,kline_plvdata,kline_zunidata);
            kline_myChart.setOption(klineChartOption);
        }