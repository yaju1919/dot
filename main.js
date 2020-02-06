(function() {
    'use strict';
    var h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    $("<h1>").text("GUI無しでRPGENを編集するツール").appendTo(h);
    $("<div>").text("出力は、RPGENの作品ページのURLバーにjを入力した後、貼り付けでEnter押してください。").appendTo(h);
    $("<div>").text('編集入力欄のid属性は"dq"です。$("#dq").val();などで好きに処理してください。').appendTo(h);
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
    yaju1919.addHideArea(h_ui,{
        title: "template",
        id2: "template"
    });
    function addTemplate(title, func){
        addBtn(title, function(){
            var result = func($("#dq").val());
            if(result) $("#dq").val(result);
            $(window).resize();
        }, "#template");
    }
    addTemplate("ミナギル地方", function(){
        var d = "MQCQogSg8gUAzAGgOzDAOQCIxsAQgcQFkYALAFzIAcAuAeloHcmA6ATwHsBXMzgIwFNmAY3YBbRgEMyQkgH4AbgF4AKgDYAyqLCiAVssIB9ANapM2PPgCShfKQo16AS2aPRAc04AnYWNoBHRzQARk4AOwATZh1KN1MsHAAxABkoKAh4AwAWAAI4LNz8vJyiguLC8rLK0uqS2oqa+rqqpobmxva2ztbult6O1oyqgE4DAAZskfHJibGZqdnpxYXl+dW5nv6+rq2N7c39vcPdweqltbP1i6uVy5ud+4Pdp4ejl+eOk5Lr85vv9aDVAYgtkAUCQYDgRc3tDHjDXrCEfDMp98tNQcD0eCwZicRCsRi8bjsYS8VDEe8kRSqXDqR8WmiScSmQTmfi2USWZzbuMabzyXzKQKBiUAEwigwi-6Mrkc9nSuWszFkwX81Uq9W0zonC6y3XyvWK+XKzUmoVmtUUmBBPIADm5Cpl+qdhpdkLuFvNGs9prpqJuBsdrodwaV7q9Hoj4ajwr9awDIedgaT9u9qcjPqj2v9iYTQfjobWaejRYzmpROT+ld+1Z+PPTJYb9cR5dLNONjeLTc7SJbHdbXf73cHlr7o4HY6Hnt745nk9nw6L07ny4X84nZfXm7X25XWyXq93O4Px7h+63h4vJ53Z6P56vl8Xd6ft5f3ZvD9f96-j8-z4--8Hd9v1-ECAJeIC-2AsDQJjaC4KghCp0g5CYJQyoINQzD4InDDsKwxDX1wgi8JIqCiLQ4jKJwiiaPw89yLoxjSIFBjmKYqjI1Yji2J4jMuNo3iBOOISRPYn9BLEyS31EiTZMAmTuMU+iFJUqSNzU1S5NPTSlI0zidIMvStUMrSjOEsyTN0ntLJsoz+Ishy4LicxCAAQQABWwLzvJ87I-P8vygiQAwAFYYACgKgtC8KIsC4KwtiuLosSkF4ucnBCHcqBLDQZQrQQVQECCEK4EyIrRgQUZ0uATLstymAKptIqSqakVkHSoA";
        $("#load").val(d).trigger("change");
        return false;
    });
    addTemplate("空室", function(){
        var d = "MQCQogSg8gUALAJgDQE4BswwDkAiMbABCA4gLIHZ4EkCSpxMAFgC7MAOAXAPRcCWAdLwC2AcwCuAJ34BjAPZCuAR15YAjGIB2AE34ArNiMy58wAGIAZKFAgwABPYePbAdgD6qgKwv3Xt5+-+fr4+AcGBIUGhUZExEXHhCWFJ0fHJsYkpGelpqZlJdk5O2XklxWW55VkV1VW1OXWlNfXNoQWFDpUtnY0N3X1NPV0D-b1Nbe2DkyNDo7Mz81PDS3OtEx3LC9OLK1u7G9ubqePtezv7p4dnV5c3eTAXB48Pz+ev109vt0H3nx-vL-9fgCvkDQZ4foDISCoX9oXDYQjphD4cDEWCUei0TCLsisRjsZjUUTCSTErjiQTKfjqXjacDyaSaRSmYy6azOgyqWyuczuSyeUdeUL2SKBWL+R5ORK+TLheLZZ8pQr5XLparlc0lertaK1bqNa0dSr9Ua9cayaaDZbrSbGVrbeazU6rXabY6Xe63XD7Z6Hc6vR75j7-X7A2GA9lg+HQxGY3HwbHfUmQ8nBlHEynM9HHen41mM9mJbnUwXS3nYcX8+WyyX0ZXCw2a1XrvWm43qx25q3O83e+2W-hB0PhyPR2Px2tJ1Op2gUAhVLZZ-PjtPVzO514l5K1zuJh4PAAOFC2fdHk+H4+ny8X89nq+2A8eBAABhPaAQB7fCGcK93O-vAE3oBd5ATej4vl+n4eO+P5-nB9jAdeIHIUhqEPk+r7QR+X6wfBf6qAgCC2ARADMxGEeRZGIbex7gZh75QTBv54ZOBFwORRGkeR7HUfedGQThzEsRMBFeARnEIGRok0TJfEYQJWG4cJcH7igmFAc4z4Lh4mnabpQnKe0W4OKp6lHgZhl7h4akySZs4oBZlmOKp2nWa5KDuQudkoA5Tlri554eYFnnBaFb4+Y5fmhQFMVuZFfmxUFiVefYs4kWg8VOcl0VuYu76vmg+V5RBj6qL5UVTtl2WFRB9ileVFWTlVcWNTO74LjVHUHnAz6ZU5nXFaofWWXAHgAMK2KNY1GFQwCkAAggACuOK2rWt60bROrWOEuz4TUuqj7XOh2LsdR3zvtOlwJdzgkedJ1pYdw3wUu12nQg43vZ9W7nd9OkIDdD0bkdPUTYemlgweEPoRdz1wUuB4TUZKAkYjJlQwDcN-gjSOFM4KAeOxCEY2NWO7jjEz44T6POJj207XOaMnATRMniTZM7hTzPU8TtOk-TDhc4UFPg3tbPQ4es78wLp1wEDF3vfLSvnXdqVzmLaXXRza5pd9wNfedGtnadJFvbLyuK-dR0kU9MsMwgb0-SbaBI7rYNoDp7t82+h7nYj2vk4zuMIWgcAoO7cBo9BT5+9LdvvUzTjQXAjtBwHnNB04B1W5bJu2-HCfBwbxfJwDhfpzrmeFIeqjOLHFerkLgtoCR4d5aj9cF+bKu47tOfZ7nmtx3bbuyxr3UFRPMMu8XTtzyjLsN43KOJ2liMzfgQA";
        $("#load").val(d).trigger("change");
        return false;
    });
    addTemplate("random", makeMapRandom);
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
    function toStr(func){ // 関数を文字列化
        return String(func).replace(/\/\/.*\n/g,'');
    }
    function getMapText(){
        return LZString.compressToEncodedURIComponent(getCurrentMapText(dq.mapNum));
    }
    function write(){
        $.ajax({
            type: 'POST',
            url: dqSock.getRPGBase() + 'cons/writeMapText.php',
            async: false,
            data: {
                token: g_token,
                index: parseInt(dq.mapNum),
                mapText: (dq.bOpenScr ? '' : 'L1') + map,
            },
        }).done(function(r){
            if ( r != 0 ){
                isError = true;
                apprise( "ごめんなさい・・・<br>マップの書き込みに失敗してしまいましたヽ(´Д｀ヽ)(/´Д｀)/ｱﾜﾜ" );
                g_oldWriteText = '';
            }
        }).fail(function(){
            isError = true;
            apprise("ごめんなさい・・・<br>マップの書き込みに失敗してしまいました・・(´・ω・｀)ｺﾞﾒﾝ");
            g_oldWriteText = '';
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
