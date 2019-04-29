        var wsUri = "ws:localhost:5208";
        var ws = new WebSocket(wsUri);
        // console.log("point"+point);
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
        //数据转化  
        function formatNumber(n) {  
          n = n.toString()  
          return n[1] ? n : '0' + n  
        } 
        ws.onopen = function(evt) {
            console.log("Connection open ...");
            ws.send("Hello WebSockets!" + Math.random());
        };

        ws.onmessage = function(evt) {
            console.log( "Received Message: " + evt.data);
            var message = evt.data;
            var flags=message.split('#')[0];
            var value1=message.split('#')[1];//value[93, 100, 60, 100, 100, 100, 100, 100]
            
            
            // var staflags=message.split('#')[0];
            // var stavalue=message.split('#')[1];

            // value1=value1.replace(/\s*/g,"");
            // console.log("value1"+value1);
            if('linegraph'===flags){
            var dataStrArr=value1.split(",");//分割成字符串数组  
            var dataIntArr=[];//保存转换后的整型字符串  
            dataIntArr=dataStrArr.map(item => {  
                return +item;  
            });  
            // console.log("dataIntArr:::"+dataIntArr);
            var value2;
        
            
                var value=message.split('#')[1];//获取数据
                value=value.split('=')[1];
                value=value.replace(/\"/g,"");
                // value=value.replace(/\]/g,"");
                value=value.substring(2,value.length-5);
                var section=value.split(': [')[0];
                var data=value.split(': [')[1];
                // console.log("valuevaluevaluevalue"+value);
                // console.log("valuevaluevaluevalue"+section+"oooooooooooo"+data);

                var arr=!!data ? data.split(", ") : [];
                initArrSize = arr.length;
                Items = [];//.splice(0,Items.length);
                // dataStr1="[";
                for (var i = 0; i<arr.length; ) {
                    var items={"value":[formatTime(arr[i+1].split('time: ')[1].split("}")[0],'Y/M/D h:m:s'),arr[i].split('znb: ')[1]]};
                    // console.log("items"+arr[i+1].split('time: ')[1].split("}")[0]);
                    Items.push(items);
                    i=i+2;
                }
                // console.log("typeItems::::"+Items);
                processingDataLine(section,Items);
            }
        };

        ws.onerror = function(evt) {
            console.log("发生了错误");
        };

        ws.onclose = function(evt) {
            console.log("Connection closed.");
        };  