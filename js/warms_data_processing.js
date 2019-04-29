        var bar_xAxis_data=[];
        var kline_xAxis_data=[];
        var bar_zunidata=[];
        var bar_plvdata=[];
        var last_time="";//bar_time
        var kline_time="";
        var kline_zunidata;
        var kline_plvdata;
        var section=[];
        var sectionname=[];
        var sectiondata=[];
        var sectionname_today=[];
        var sectiondata_today=[];
        arrsyesterday =[];
        arrstoday =[];



        /**
         * 时间戳转化为年 月 日 时 分 秒
         * number: 传入时间戳
         * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
         */
        function formatTime(number,format) {
            var formateArr  = ['Y','M','D','h','m','s'];
            var returnArr   = [];
            var date = new Date(number * 1000);
            returnArr.push(date.getFullYear());
            returnArr.push(formatNumber(date.getMonth() + 1));
            returnArr.push(formatNumber(date.getDate()));
            returnArr.push(formatNumber(date.getHours()));
            returnArr.push(formatNumber(date.getMinutes()));
            returnArr.push(formatNumber(date.getSeconds()));
            for (var i in returnArr)
            {
                format = format.replace(formateArr[i], returnArr[i]);
            }
            return format;
        }
        function formatTime2(number,format) {
            var formateArr  = ['Y','M','D','h','m','s'];
            var returnArr   = [];
            var date = new Date(number * 1000);
            returnArr.push(date.getFullYear());
            returnArr.push(formatNumber(date.getMonth() + 1));
            returnArr.push(formatNumber(date.getDate()+1));
            returnArr.push(formatNumber(date.getHours()));
            returnArr.push(formatNumber(date.getMinutes()));
            returnArr.push(formatNumber(date.getSeconds()));
            for (var i in returnArr)
            {
                format = format.replace(formateArr[i], returnArr[i]);
            }
            return format;
        }

        //数据转化  
        function formatNumber(n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        }

        //Websocket配置 // --------------------------------------------------
        var wsUri = "ws:localhost:5207";
        var ws = new WebSocket(wsUri);
        // console.log("point"+point);

        ws.onopen = function(evt) {
            console.log("Connection open ...");
            ws.send("Hello WebSockets!" + Math.random());
        };

        ws.onmessage = function(evt) {
            // console.log( "Received Message: " + evt.data);
        var message = evt.data;
             //处理接收到的数据
        var flags=message.split('#')[0];//将标志与数据分离 
        var value=message.split('#')[1];//获取数据
        bar_xAxis_data=[];//清空数组
        bar_zunidata=[];//清空数组
        bar_plvdata=[];//清空数组
        kline_xAxis_data=[];//清空数组

//get时间
        var time=  new Date();
        var year =time.getFullYear();
        var month=time.getMonth()+1;
        var date=time.getDate();
        var huors=time.getHours();
        var minutes=time.getMinutes();
        last_time = year+"-"+month+"-"+date+" "+huors+":"+minutes;
        kline_time = year+"-"+month+"-"+date;

//line_marker      
       if('linegraph2'===flags){
           var dataStrArr=value.split(",");//分割成字符串数组
           var dataIntArr=[];//保存转换后的整型字符串
           dataIntArr=dataStrArr.map(item => {
               return +item;
           });

           // console.log("dataIntArr:::"+dataIntArr);

           var value_data=value.split('=[');//昨日数据
           var value_yesterday=value_data[1];//昨日数据
           var value_today=value_data[2];//今日数据
           //昨日数据处理
           value_yesterday=value_yesterday.replace(/\"/g,"");
           value_yesterday=value_yesterday.substring(0,value_yesterday.length-7);//去掉，，今日
           //今日数据处理
           value_today=value_today.replace(/\"/g,"");
           value_today=value_today.substring(0,value_today.length-4);//去掉]}, }]
           // console.log("value_yesterday"+value_yesterday);
           // console.log("value_today"+value_today);
           section_yesterday=value_yesterday.split(']}');//断面
           section_today=value_today.split(']}');
           for(var i=0;i<section_yesterday.length-1;i++){
               if(i==0){
                   sectionname[0]=section_yesterday[0].split(":")[0].split("{")[1];
                   sectiondata[0]=section_yesterday[0].split(": [")[1];
               }else{
                   sectionname[i]=section_yesterday[i].split(":")[0].split(", {")[1];
                   sectiondata[i]=section_yesterday[i].split(": [")[1];
               }
           }
           for(var i=0;i<section_today.length-1;i++){
               if(i==0){
                   sectionname_today[0]=section_today[0].split(":")[0].split("{")[1];
                   sectiondata_today[0]=section_today[0].split(": [")[1];
               }else{
                   sectionname_today[i]=section_today[i].split(":")[0].split(", {")[1];
                   sectiondata_today[i]=section_today[i].split(": [")[1];
               }
           }

           for(var i=0;i<section_yesterday.length-1;i++){
               Items=[];
               var arr=!!sectiondata[i] ? sectiondata[i].split(", ") : [];
               initArrSize = arr.length;
               for (var j = 0; j<arr.length; ) {
                   // var items={"value":[formatTime(arr[j+1].split('time: ')[1].split("}")[0],'Y/M/D h:m:s'),arr[j].split('znb: ')[1]]};
                   var items={"value":[formatTime2(arr[j+1].split('time: ')[1].split("}")[0],'Y/M/D h:m:s'),arr[j].split('znb: ')[1]]};
                   // console.log("items"+items.value);
                   Items.push(items);
                   j=j+2;
               }
               arrsyesterday.push(Items);
           }

           for(var i=0;i<section_today.length-1;i++){
               Items2=[];
               var arr2=!!sectiondata_today[i] ? sectiondata_today[i].split(", ") : [];
               initArrSize2 = arr2.length;
               for (var j = 0; j<arr2.length; ) {
                   // var items2={"value":[formatTime(arr2[j+1].split('time: ')[1].split("}")[0],'Y/M/D h:m:s'),arr2[j].split('znb: ')[1]]};
                   var items2={"value":[formatTime(arr2[j+1].split('time: ')[1].split("}")[0],'Y/M/D h:m:s'),arr2[j].split('znb: ')[1]]};
                   // console.log("items2"+items2.value);
                   Items2.push(items2);
                   j=j+2;
               }
               arrstoday.push(Items2);
           }
           // processingDataLine(sectionname[0],arrstoday[0],arrsyesterday[0]);
       }


//bar
        if (flags==="bar_data") {
            value=value.replace(/\s/g,"");//出去空格
            value=value.replace(/\[/g,"");
            value=value.replace(/\]/g,"");
            value=value.replace(/\"/g,"");
           
            value=value.replace(/\:/g,",");
            value=value.split(",");//去除逗号变成数组
            for (var i = 0; i <value.length/2; ) {
                bar_xAxis_data.push(String(value[i]));
                bar_zunidata.push(parseFloat(value[i+1]));
                i=i+2;
            }
            for (var k = value.length/2 ; k <value.length ; ) {
                bar_plvdata.push(parseFloat(value[k+1]));
                k=k+2;
            }

        bar_data(last_time,bar_xAxis_data,bar_plvdata,bar_zunidata);
        }

//kline
        if (flags=="kline_data") {
            value=value.replace(/\s/g,"");//出去空格
            value=value.replace(/\[/g,"");
            value=value.replace(/\]/g,"");
            value=value.replace(/\"/g,"");
            value=value.split(",");//去除逗号变成数组

                //为kline_zunidata初始化一个二维数组
            var klineArray = new Array();  //先声明一维
            for(var k=0;k<value.length/10;k++){    //一维长度为i,i为变量，可以根据实际情况改变...这里是二维数组的长度
    
                klineArray[k]=new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；
    
                for(var j=0;j<4;j++){   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；....这里是一维数组的长度
    
                  klineArray[k][j]=k+j;    //这里将变量初始化，
                }
            }


             //为kline_plvdata初始化一个二维数组
            var tArray = new Array();  //先声明一维
            for(var k=0;k<value.length/10;k++){    //一维长度为i,i为变量，可以根据实际情况改变...这里是二维数组的长度
    
                tArray[k]=new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；
    
                for(var j=0;j<4;j++){   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；....这里是一维数组的长度
    
                  tArray[k][j]=k+j;    //这里将变量初始化，
                }
            }

            var m=0;
            for (var i = 0; i <value.length/2;) {
               kline_xAxis_data.push(String(value[i]));
               klineArray[m][0]=parseFloat(value[i+1]);
               klineArray[m][1]=parseFloat(value[i+2]);
               klineArray[m][2]=parseFloat(value[i+3]);
               klineArray[m][3]=parseFloat(value[i+4]);
               m++;
               i=i+5;
            }
            kline_zunidata=klineArray;
            var n=0;
            for (var k = value.length/2 ; k <value.length ;) {
                tArray[n][0]=parseFloat(value[k+1]);
                tArray[n][1]=parseFloat(value[k+2]);
                tArray[n][2]=parseFloat(value[k+3]);
                tArray[n][3]=parseFloat(value[k+4]);
                n++;
                k=k+5;
            }
            kline_plvdata=tArray;

        kline_data(kline_time,kline_xAxis_data,kline_plvdata,kline_zunidata);

        document.getElementById("top_1").innerHTML=kline_xAxis_data[0];
        document.getElementById("top_2").innerHTML=kline_xAxis_data[1];
        document.getElementById("top_3").innerHTML=kline_xAxis_data[2];
        document.getElementById("top_4").innerHTML=kline_xAxis_data[3];
        document.getElementById("top_5").innerHTML=kline_xAxis_data[4];
        document.getElementById("top_6").innerHTML=kline_xAxis_data[5];
        document.getElementById("top_7").innerHTML=kline_xAxis_data[6];
        document.getElementById("top_8").innerHTML=kline_xAxis_data[7];
        document.getElementById("top_9").innerHTML=kline_xAxis_data[8];
        document.getElementById("top_10").innerHTML=kline_xAxis_data[9];
    
        document.getElementById("top_1_zn").innerHTML=Math.floor(klineArray[0][0]*100)/100+"%";
        document.getElementById("top_2_zn").innerHTML=Math.floor(klineArray[1][0]*100)/100+"%";
        document.getElementById("top_3_zn").innerHTML=Math.floor(klineArray[2][0]*100)/100+"%";
        document.getElementById("top_4_zn").innerHTML=Math.floor(klineArray[3][0]*100)/100+"%";
        document.getElementById("top_5_zn").innerHTML=Math.floor(klineArray[4][0]*100)/100+"%";
        document.getElementById("top_6_zn").innerHTML=Math.floor(klineArray[5][0]*100)/100+"%";
        document.getElementById("top_7_zn").innerHTML=Math.floor(klineArray[6][0]*100)/100+"%";
        document.getElementById("top_8_zn").innerHTML=Math.floor(klineArray[7][0]*100)/100+"%";
        document.getElementById("top_9_zn").innerHTML=Math.floor(klineArray[8][0]*100)/100+"%";
        document.getElementById("top_10_zn").innerHTML=Math.floor(klineArray[9][0]*100)/100+"%";

        document.getElementById("top_1_pl").innerHTML=Math.floor(tArray[0][0]*100)/100+"Hz";
        document.getElementById("top_2_pl").innerHTML=Math.floor(tArray[1][0]*100)/100+"Hz";
        document.getElementById("top_3_pl").innerHTML=Math.floor(tArray[2][0]*100)/100+"Hz";
        document.getElementById("top_4_pl").innerHTML=Math.floor(tArray[3][0]*100)/100+"Hz";
        document.getElementById("top_5_pl").innerHTML=Math.floor(tArray[4][0]*100)/100+"Hz";
        document.getElementById("top_6_pl").innerHTML=Math.floor(tArray[5][0]*100)/100+"Hz";
        document.getElementById("top_7_pl").innerHTML=Math.floor(tArray[6][0]*100)/100+"Hz";
        document.getElementById("top_8_pl").innerHTML=Math.floor(tArray[7][0]*100)/100+"Hz";
        document.getElementById("top_9_pl").innerHTML=Math.floor(tArray[8][0]*100)/100+"Hz";
        document.getElementById("top_10_pl").innerHTML=Math.floor(tArray[9][0]*100)/100+"Hz";
        } 

    }



        ws.onerror = function(evt) {
            console.log("发生了错误");
        };

        ws.onclose = function(evt) {
            console.log("Connection closed.");
        };     