/**
 * Created by chenkuan on 16/3/11.
 */
function styleition(json,key){
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
        rightq.innerHTML="],";
    }else{
        leftq.innerHTML="<span style='color:#a71d5d'>\""+key+"\"</span> : {";
        // 如果key不存在,则不写键名
        if(!key){
            leftq.innerHTML="{";
        }
        rightq.innerHTML="},";
    }

    // 求出属性数量
    var k,length = 0,i = 0;
    for(k in json){
        length++;
    }

    // 遍历json属性值
    for(k in json){
        // 确定当前行数
        i = i + 1;

        // 获得键
        var styledKey = "<span style='color:#a71d5d'>\""+k+"\"</span> : ";
        // 如果json是数组,则不需要键名
        console.log(json);

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
            // 若当前元素为数组
            if(json[k] instanceof Array){
                // 若父级也为数组
                if(json instanceof Array){
                    wrap.appendChild(styleition(json[k]));
                }else{
                    wrap.appendChild(styleition(json[k],k));
                }
                continue;// 避免当前键值对被重写为 key:[object object] 的形式
            }else if(json[k]==null){
                // null值
                styledVal = "<span style='color:#aa3022'> null </span>"
            }else{
                // 若父级也为数组
                if(json instanceof Array){
                    wrap.appendChild(styleition(json[k]));
                }else{
                    wrap.appendChild(styleition(json[k],k));
                }
                continue;// 避免当前键值对被重写为 key:[object object] 的形式
            }
        }

        // 新建一行
        var line = document.createElement("p");
        // 设置新行缩进和行距
        line.style.paddingLeft = indent;
        line.style.margin = lineMargin+" 0";

        // 设置新行值,此处要判断是否到了最后一个对象,来确定是否要加逗号
        if(i>=length){
            line.innerHTML = styledKey +styledVal+"<br>";
            rightq.innerHTML = rightq.innerHTML.replace(",","");
        }else{
            line.innerHTML = styledKey +styledVal+",<br>";
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