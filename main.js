(function() {
    'use strict';
    var h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    $("<h1>").text("RPGEN edit tool 1").appendTo(h);
    $("<div>").text("MAPのURLバーにjを入力した後に、Bookmarkletを貼り付けてEnter押してください。").appendTo(h);
    var message_elm = $("<div>").appendTo(h);
    function message(str,color){
        message_elm.text(str + '(' + yaju1919.getTime() + ')').css({
            backgroundColor: color || 'white'
        });
    }
    function addBtn(title, func, parentNode){
        return $("<button>",{text: title}).appendTo(parentNode||h).click(func);
    }
    var h_ui = $("<div>").appendTo(h);
    var tabA = $("<div>");
    var tabB = $("<div>");
    var tabC = $("<div>");
    yaju1919.addTab(h,{
        list: {
            "Edit": tabA,
            "Output": tabB,
            "Bookmarklet": tabC,
        }
    });
    yaju1919.addInputText(h_ui,{
        title: "MAPデータを取得するBookmarklet",
        value: window.Bookmarklet.getMapData(),
        readonly: true
    });
    addBtn("clear",function(){
        $("#load").val('');
    },h_ui);
    yaju1919.addInputText(h_ui,{
        id: "load",
        title: "load",
        change: function(v){
            $("#dq").val(LZString.decompressFromEncodedURIComponent(v.replace(/^L1/,'')));
            $(window).resize();
        }
    });
    function dq(asg){ // 引数に応じてedit欄を編集する関数
        var a;
        switch(yaju1919.getType(asg)){
            case "Function":
                a = asg($("#dq").val());
                if(a) $("#dq").val(a);
                message("dqの引数の関数を実行しました。");
                break;
            case "String":
                $("#load").val(asg).trigger("change");
                message("dqの引数の文字列を実行しました。");
                break;
            default:
                message("dqの引数の型は関数か文字列にしてください。","pink");
                break;
        }
        $(window).resize();
    }
    window.dq = dq;
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------
    // template
    yaju1919.addHideArea(h_ui,{
        title: "テンプレ",
        id2: "template"
    });
    function addTemplate(title, asg){
        addBtn(title, function(){
            dq(asg);
        }, "#template");
    }
    yaju1919.addSelect("#template",{
        title: "テンプレ",
        list: {
            "ここから洗濯してね": "",
            "ミナギル地方": "minagiru",
            "空室": "kushitsu",
            "リバース空室": "kushitsu-reverse",
        },
        change: function(v){
            if(!v) return;
            $.get(`sample/${v}.txt`, function(r){
                $("#dq").val(r).trigger("change");
            });
        }
    });
    addTemplate("random", makeMapRandom);
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------
    // replace
    yaju1919.addHideArea(h_ui,{
        title: "文字列置換",
        id2: "replace"
    });
    var select_range = yaju1919.addSelect("#replace",{
        title: "範囲選択",
        list: {
            "地面": "FLOOR",
            "物": "MAP",
            "人": "HUMAN",
            "宝箱": "TBOX",
            "マップ移動": "MPOINT",
            "しらべる": "SPOINT",
            "イベント": "EPOINT",
        },
        save: "select_range",
    });
    var input_find = yaju1919.addInputText("#replace",{
        title: "検索文字列",
        save: "find",
    });
    var input_replace = yaju1919.addInputText("#replace",{
        title: "置換後の文字列",
        save: "replace",
    });
    addBtn("置換実行", function(){
        dq(function(){
            var select = select_range(),
                find = input_find(),
                replace = input_replace();
            return $("#dq").val().replace(new RegExp('(?<=#' + select + ')(.|\n)*?(?=#END)','g'), function(area){
                if(["FLOOR","MAP"].indexOf(select) !== -1){ // 地面&物
                    return area.replace(/[0-9A-Za-z_]+/g, function(v){
                        return v === find ? replace : v; // 要素ごとに置換
                    });
                }
                else{
                    return area.split('\n').map(function(line){
                        return line.replace(find, replace); // 行ごとに置換
                    }).join('\n');
                }
            });
        });
    },"#replace");
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------
    var input_dq = yaju1919.addInputText(tabA,{
        id: "dq",
        textarea: true,
        hankaku: false,
    });
    addBtn("output",function(){
        var result = window.Bookmarklet.writeMapData(input_dq());
        yaju1919.addInputText(tabB.empty(),{
            value: result[0],
            textarea: true,
            readonly: true
        });
        yaju1919.addInputText(tabC.empty(),{
            value: result[1],
            textarea: true,
            readonly: true
        });
    },h_ui).css({
        color:"yellow",
        backgroundColor:"red",
        fontSize: "2em",
    });
    h_ui.children().after("<br>");
    //------------------------------------------------------------------------------------
    function makeMapRandom(){ // ランダムMAPサンプル
        var width = 50,
            result = [
                "#HERO\n3,7",
                "#BGM\nhttps://www.youtube.com/watch?v=f6FUc-KoTIM",
                "#BGIMG\nhttp://i.imgur.com/qiN1und.jpg",
            ];
        function makeRandMap(){
            return "#FLOOR\n" + yaju1919.makeArray(width).map(function(){
                return yaju1919.makeArray(width).map(function(){
                    return yaju1919.randInt(1,26104);
                }).join(' ') + " 45C";
            }).join('\n') + '\n' + yaju1919.makeArray(width).map(function(){
                return "45C";
            }).join(' ');
        }
        result.push(makeRandMap());
        function makeRandHuman(){
            return "#HUMAN\n" + [
                'A' + yaju1919.randInt(1,1105),
                yaju1919.randInt(0,width-1), // x
                yaju1919.randInt(0,width-1), // y
                yaju1919.randInt(0,3), // direction
                yaju1919.randInt(0,6), // movement
                yaju1919.randInt(0,100), // speed
            ].map(function(v){
                return v + ',';
            }).join('');
        }
        yaju1919.makeArray(49).forEach(function(v){
            result.push(makeRandHuman());
        });
        return result.map(function(v){
            return v + '#END\n';
        }).join('\n');
    }
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------
    function makeM(str){
        return "#MSG\nm:" + str + ",\n#ED\n";
    }
    function makeM_split(str, flag){
        var result = '', sum = '';
        str.trim().split('\n').forEach(function(line){
            line.trim().split(/[ 　]+/).forEach(function(word,i,a){
                if(!word.length) return;
                sum += word.replace(/['",]/g, function(c){
                    switch(c){
                        case "'": return '[’]';
                        case '"': return '[”]';
                        case ',': return '[、]';
                    }
                });
                if(flag) result += makeM(sum);
                if(i !== a.length - 1) sum += ' ';
                else if(!flag) result += makeM(sum);
            });
            sum += '\n';
        });
        return result;
    }
    window.test = {
        makeM: makeM,
        makeM_split: makeM_split
    };
})();
