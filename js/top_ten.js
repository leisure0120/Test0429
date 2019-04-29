/*
*
* 事件方法
* 按照阻尼比排序的十个断面
* 触发后会改变折线图数据源
*
* */
interval=[];
function data_change_0(){    
    for(var i=0;i<10;i++){
        clearInterval(interval[i]);
    }
    interval[0] = setInterval(function () {
        processingDataLine(sectionname[0],arrstoday[0],arrsyesterday[0]);
    }, 1000);
}
function data_change_1(){
    for(var i=0;i<10;i++){
        clearInterval(interval[i]);
    }
    interval[1]=setInterval(function () {
        processingDataLine(sectionname[1],arrstoday[1],arrsyesterday[1]);
    }, 1000);
}
function data_change_2(){
    for(var i=0;i<10;i++){
        clearInterval(interval[i]);
    }
    interval[2]=setInterval(function () {
        processingDataLine(sectionname[2],arrstoday[2],arrsyesterday[2]);
    }, 1000);
}
function data_change_3(){
    for(var i=0;i<10;i++){
        clearInterval(interval[i]);
    }
    interval[3]=setInterval(function () {
        processingDataLine(sectionname[3],arrstoday[3],arrsyesterday[3]);
    }, 1000);
}
function data_change_4(){
    for(var i=0;i<10;i++){
        clearInterval(interval[i]);
    }
    interval[4]=setInterval(function () {
        processingDataLine(sectionname[4],arrstoday[4],arrsyesterday[4]);
    }, 1000);
}
function data_change_5(){
    for(var i=0;i<10;i++){
        clearInterval(interval[i]);
    }
    interval[5]=setInterval(function () {
        processingDataLine(sectionname[5],arrstoday[5],arrsyesterday[5]);
    }, 1000);
}
function data_change_6(){
    for(var i=0;i<10;i++){
        clearInterval(interval[i]);
    }
    interval[6]=setInterval(function () {
        processingDataLine(sectionname[6],arrstoday[6],arrsyesterday[6]);
    }, 1000);
}
function data_change_7(){
    for(var i=0;i<10;i++){
        clearInterval(interval[i]);
    }
    interval[7]=setInterval(function () {
        processingDataLine(sectionname[7],arrstoday[7],arrsyesterday[7]);
    }, 1000);
}
function data_change_8(){
    for(var i=0;i<10;i++){
        clearInterval(interval[i]);
    }
    interval[8]=setInterval(function () {
        processingDataLine(sectionname[8],arrstoday[8],arrsyesterday[8]);
    }, 1000);
}
function data_change_9(){
    interval[9]=setInterval(function () {
        for(var i=0;i<10;i++){
        clearInterval(interval[i]);
    }
        processingDataLine(sectionname[9],arrstoday[9],arrsyesterday[9]);
    }, 1000);
}