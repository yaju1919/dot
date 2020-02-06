(function() {
    'use strict';
    var h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    $("<h1>").text("GUI無しでRPGENを編集するツール").appendTo(h);
    $("<div>").text("対象MAPのURLバーにjを入力した後、貼り付けてEnter押してください。").appendTo(h);
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
    var h_result = $("<div>").appendTo(h);
    yaju1919.addInputText(h_ui,{
        title: "rpgenのデータをコピーする関数",
        value: (function(){
            return "avascript:(function(){var c=" + toStr(yaju1919.copy) + ';' + toStr(getMapText) +
                ";c(getMapText());apprise('コピー完了')})();";
        })(),
        readonly: true
    });
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
    addTemplate("ミナギル地方", "MQCQogSg8gUAzAGgOzDAOQCIxsAQgcQFkYALAFzIAcAuAeloHcmA6ATwHsBXMzgIwFNmAY3YBbRgEMyQkgH4AbgF4AKgDYAyqLCiAVssIB9ANapM2PPgCShfKQo16AS2aPRAc04AnYWNoBHRzQARk4AOwATZh1KN1MsHAAxABkoKAh4AwAWAAI4LNz8vJyiguLC8rLK0uqS2oqa+rqqpobmxva2ztbult6O1oyqgE4DAAZskfHJibGZqdnpxYXl+dW5nv6+rq2N7c39vcPdweqltbP1i6uVy5ud+4Pdp4ejl+eOk5Lr85vv9aDVAYgtkAUCQYDgRc3tDHjDXrCEfDMp98tNQcD0eCwZicRCsRi8bjsYS8VDEe8kRSqXDqR8WmiScSmQTmfi2USWZzbuMabzyXzKQKBiUAEwigwi-6Mrkc9nSuWszFkwX81Uq9W0zonC6y3XyvWK+XKzUmoVmtUUmBBPIADm5Cpl+qdhpdkLuFvNGs9prpqJuBsdrodwaV7q9Hoj4ajwr9awDIedgaT9u9qcjPqj2v9iYTQfjobWaejRYzmpROT+ld+1Z+PPTJYb9cR5dLNONjeLTc7SJbHdbXf73cHlr7o4HY6Hnt745nk9nw6L07ny4X84nZfXm7X25XWyXq93O4Px7h+63h4vJ53Z6P56vl8Xd6ft5f3ZvD9f96-j8-z4--8Hd9v1-ECAJeIC-2AsDQJjaC4KghCp0g5CYJQyoINQzD4InDDsKwxDX1wgi8JIqCiLQ4jKJwiiaPw89yLoxjSIFBjmKYqjI1Yji2J4jMuNo3iBOOISRPYn9BLEyS31EiTZMAmTuMU+iFJUqSNzU1S5NPTSlI0zidIMvStUMrSjOEsyTN0ntLJsoz+Ishy4LicxCAAQQABWwLzvJ87I-P8vygiQAwAFYYACgKgtC8KIsC4KwtiuLosSkF4ucnBCHcqBLDQZQrQQVQECCEK4EyIrRgQUZ0uATLstymAKptIqSqakVkHSoA");
    addTemplate("空室", "MQCQogSg8gUArANgDQIJzDAOQCIxsAIQHEBZfLXfYgSRKJgAsAXJgBwC4B6TgSwDoeAWwDmAVwBOfAMYB7QZwCOPTAEZRAOwAmfAFathGHHmAAxADJQoEPDdt37Dx04cACN+4+ev3n779oAJhUXQJUYPwjIqN9AuBDUALhw6JTUzzg4AA5UFwzs3KycvKLCgvzil0y4AIAGXIQAzPqAgHZktI7oiu7SnvLe0qra5qbEVvbOyd8+kv652YXK6rqx0Ya2qc2fFQCAlx2AZn3d46OZspyhlYa18a37jx2AFmO9w+OX84qrkeaNh4eOziOzeASOQIukO+y1+Y3+AIRBVQK16LRqwTgaIxWImiKmsXcGWRF1xeM2RJR+UJaFQpLJHSJGLgqCZLKRwWpqFp9K2jPZ-L5guZHMQXLpPJSQrZUrCEqmMoFwo8aAOCHFcsiCoVCAadR1w31dSqKm5GoZSq1SsN7mNprNaUtLPV9piDWC+vdmSeNWdLu8HpCbt9fs8TzgAGEXGHw4ZKMASABBAAKzlTafTdhD-gSNUjoTzCRUBaCxaLIUxTzzmIOpYLByLwZdgUr8USxYjrY7sSrLQCPbL3fi3sjWTRI8yY6WJcb9sCmUj-tQB3nhInfZnZrnC68LVQcBeblH66zMQSK+8u-3q974Y3Gq3PkvB9ya9vJ58D4ve+fR7f768n4AWe46TqOuYvmgf7-sqqBPAOha1q28Elq2NZuIE4EqpWd5yiqXYJPhbatphCHxAcLZDshVGISqDbQR+CQtoOKoIAueEjggmIcTe9RZMW844ZuwHpAgTyoBxTwrog1T8VB9EwY024eIgTxMcBgn3sJCnUUhdZ0fJniAehBHthJfatgJBmGVp6SZCoLSyRpuE2e4OoHOJgbLo5VkwXBxZocZtQ0aR+ZkdhPmuUu+HDiEXp6nFU6sZ2pnJWRrFOc5XmRV5sZ4EAA");
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
            "イベント": "EPOINT",
            "マップ移動": "MPOINT",
            "宝箱": "TBOX",
            "しらべる": "SPOINT",
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
    },"#replace");
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------
    var input_dq = yaju1919.addInputText(h_ui,{
        id: "dq",
        title: "edit",
        textarea: true
    });
    addBtn("output",function(){
        var str = 'avascript:(function(){var map="' + LZString.compressToEncodedURIComponent(input_dq()) +
            '";(' + toStr(write) + ')();})();';
        yaju1919.addInputText(h_result.empty(),{
            title: "output",
            value: str,
            textarea: true,
            readonly: true
        });
    },h_ui);
    //------------------------------------------------------------------------------------
    h_ui.children().after("<br>");
    //------------------------------------------------------------------------------------
    function toStr(func){ // 関数を文字列化
        return String(func).replace(/\/\/.*\n/g,'');
    }
    function getMapText(){
        return LZString.compressToEncodedURIComponent(getCurrentMapText(dq.mapNum));
    }
    function write(){
        $.post(dqSock.getRPGBase() + 'cons/writeMapText.php',{
            token: g_token,
            index: parseInt(dq.mapNum),
            mapText: (dq.bOpenScr ? '' : 'L1') + map,
        }).done(function(r){
            if ( r != 0 ) apprise("error");
        }).fail(function(){
            apprise("error");
        });
    }
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
                }).join(' ');
            }).join('\n');
        }
        result.push(makeRandMap());
        function makeRandHuman(){
            var str = "#HUMAN\n";
            var a = 'A' + yaju1919.randInt(1,1105);
            return [
                a,
                yaju1919.randInt(0,width-1), // x
                yaju1919.randInt(0,width-1), // y
                2, // direction
                5, // movement
                100, // speed
            ].join(',');
        }
        yaju1919.makeArray(49).forEach(function(v){
            result.push(makeRandHuman());
        });
        return result.join('#END\n\n');
    }
})();
