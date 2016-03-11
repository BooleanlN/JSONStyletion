/**
 * Created by chenkuan on 16/3/11.
 */
window.stylietion = function(ele){
    var text = ele.innerHTML;
    try{
        var json = JSON.parse(text);
        ele.innerHTML = '';
        ele.appendChild(styleition(json,null,true));
    }catch (e){
        ele.innerHTML = "============== JSON 格式不正确==================\n<br>"+text;
    }

    function styleition(json,key,isLastEle){
        var indent = '48px';// 缩进宽度
        var lineMargin = '5px';
        var styledEle = document.createElement("div");
        styledEle.style.listStyle = "none";
        styledEle.style.paddingLeft = "0";
        styledEle.style.fontFamily = 'Consolas, "Liberation Mono", Menlo, Courier, monospace';

        var leftq = document.createElement("p"); // 左括弧
        var wrap = document.createElement("p"); // 值区
        var rightq = document.createElement("p"); // 右括弧

        leftq.style.margin = wrap.style.margin = rightq.style.margin = lineMargin+" 0";
        leftq.style.paddingLeft = wrap.style.paddingLeft = rightq.style.paddingLeft = indent; // 设置值区缩进
        rightq.style.marginLeft = "0";// 设置回括弧额外缩进
        styledEle.appendChild(leftq); // 加入左括弧
        styledEle.appendChild(wrap); // 加入值区

        // 判断左括弧形式
        if(json instanceof Array){
            // 若json是数组
            leftq.innerHTML="<span style='color:#a71d5d'>\""+key+"\"</span> : [";
            // 如果key不存在,则不写键名
            if(!key){
                leftq.innerHTML="[";
            }
            rightq.innerHTML= isLastEle ? "]":"],";
        }else{
            leftq.innerHTML="<span style='color:#a71d5d'>\""+key+"\"</span> : {";
            // 如果key不存在,则不写键名
            if(!key){
                leftq.innerHTML="{";
            }
            rightq.innerHTML= isLastEle ? "}":"},";
        }

        // 求出属性数量
        var k,length = 0,i = 0;
        for(k in json){
            if(!json.hasOwnProperty(k))continue;// 排除为json类扩展的方法
            length++;
        }

        // 遍历json属性值
        for(k in json){
            if(!json.hasOwnProperty(k))continue; // 排除为json类扩展的方法
            // 确定当前行数
            i = i + 1;

            // 获得键
            var styledKey = "<span style='color:#a71d5d'>\""+k+"\"</span> : ";

            // 如果当前json为数组,则值不带键名
            if(json instanceof Array){
                styledKey = "";
            }

            // 获得值
            var styledVal = json[k];

            // 数 美化样式
            if(typeof json[k] == "number"){
                styledVal = "<span style='color:#0086b3'> "+styledVal+" </span>"
            }

            // 字符串 美化样式
            if(typeof json[k] == "string"){
                styledVal = "<span style='color:#239141'> \""+styledVal+"\" </span>"
            }

            // 布尔值 美化样式
            if(typeof json[k] == "boolean"){
                styledVal = "<span style='color:#a71d5d'> "+styledVal+" </span>"
            }

            // undefined 美化样式
            if(typeof json[k] == "undefined"){
                styledVal = "<span style='color:#969896'> "+styledVal+" </span>"
            }

            // 对象 递归
            if(typeof json[k] == "object"){

                if(json[k]==null){
                    // null值
                    styledVal = "<span style='color:#aa3022'> null </span>"
                }else{
                    var eles;
                    if(json instanceof Array){
                        // 若当前元素为数组
                        eles = i>=length ? styleition(json[k],null,true) : styleition(json[k],null,false);
                    }else{
                        // 否则
                        eles = i>=length ? styleition(json[k],k,true) : styleition(json[k],k,false);
                    }
                    wrap.appendChild(eles);
                    continue; // 防止Object元素重复添加
                }
            }

            // 新建一行
            var line = document.createElement("p");
            // 设置新行缩进和行距
            line.style.paddingLeft = indent;
            line.style.margin = lineMargin+" 0";

            // 设置新行值,此处要判断是否到了最后一个对象,来确定是否要加逗号
            line.innerHTML = styledKey +styledVal+",<br>";
            if(i>=length){
                // 如果是最后,则需要去掉最后属性的逗号
                line.innerHTML = line.innerHTML.replace(",","");
            }
            // 追加行
            wrap.appendChild(line);
        }
        // 追加值区
        styledEle.appendChild(wrap);
        // 追加回括弧
        styledEle.appendChild(rightq);
        return styledEle;
    }
};