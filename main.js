(function() {
    'use strict';
    var a = prompt("1+1=?");
    if(a !== 'jack') return location.href = "https://www1.x-feeder.info/io_games/";
    var h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    yaju1919.addInputText(h,{
        title: "このページのタイトルを変更",
        change: function(v){
            if(v) $("title").text(v);
        }
    });
    $("<h1>").text("GUI無しでRPGENを編集するツール").appendTo(h);
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
        value: "avascript:(" + toStr(getFile) + ")();",
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
    addTemplate("ミナギル地方", "MQCQogSg8gUAzAGgOzDAOQCIxsAQgcQFkYALAFzIAcAuAeloHcmA6ATwHsBXMzgIwFNmAY3YBbRgEMyQkgH4AbgF4AKgDYAyqLCiAVssIB9ANapM2PPgCShfKQo16AS2aPRAc04AnYWNoBHRzQARk4AOwATZh1KN1MsHAAxABkoKAh4AwAWAAI4LNz8vJyiguLC8rLK0uqS2oqa+rqqpobmxva2ztbult6O1oyqgE4DAAZskfHJibGZqdnpxYXl+dW5nv6+rq2N7c39vcPdweqltbP1i6uVy5ud+4Pdp4ejl+eOk5Lr85vv9aDVAYgtkAUCQYDgRc3tDHjDXrCEfDMp98tNQcD0eCwZicRCsRi8bjsYS8VDEe8kRSqXDqR8WmiScSmQTmfi2USWZzbuMabzyXzKQKBiUAEwigwi-6Mrkc9nSuWszFkwX81Uq9W0zonC6y3XyvWK+XKzUmoVmtUUmBBPIADm5Cpl+qdhpdkLuFvNGs9prpqJuBsdrodwaV7q9Hoj4ajwr9awDIedgaT9u9qcjPqj2v9iYTQfjobWaejRYzmpROT+ld+1Z+PPTJYb9cR5dLNONjeLTc7SJbHdbXf73cHlr7o4HY6Hnt745nk9nw6L07ny4X84nZfXm7X25XWyXq93O4Px7h+63h4vJ53Z6P56vl8Xd6ft5f3ZvD9f96-j8-z4--8Hd9v1-ECAJeIC-2AsDQJjaC4KghCp0g5CYJQyoINQzD4InDDsKwxDX1wgi8JIqCiLQ4jKJwiiaPw89yLoxjSIFBjmKYqjI1Yji2J4jMuNo3iBOOISRPYn9BLEyS31EiTZMAmTuMU+iFJUqSNzU1S5NPTSlI0zidIMvStUMrSjOEsyTN0ntLJsoz+Ishy4LicxCAAQQABWwLzvJ87I-P8vygiQAwAFYYACgKgtC8KIsC4KwtiuLosSkF4ucnBCHcqBLDQZQrQQVQECCEK4EyIrRgQUZ0uATLstymAKptIqSqakVkHSoA");
    addTemplate("空室", "MQCQogSg8gUArABgDSOGAcgERjYAhAcQFlcNtdCBJIgmACwBcGAHALgHp2BLAOi4FsA5gFcATjwDGAe37sAjl3QBGYQDsAJjwBWzQWiw5gAMQAyUKBBxXrN23ZsACJ85eu37j55cA2AJwAmJQc-QJgvcIjI5xC4YIC4MKikpLg4XwQHVIAOX0y4HLyC7NziwtysuH8MuG9-LMzagHZE5NavVPSyrtKe-JK+hwqqhrqR5raJjw7qgd6i2YWCoera+pr-ccmt5yV-fwddgGYDvZPjuf6lypXR9c3trd2AFhP9o5OXi67lkbWmloeE12sV2b38x2B3UW5WuvzGAMB22m3UaCCCcFR6MxCMRrRizmRxRxuLahIGBL8vmJJKiHXRaXpvkZQQpvipNMmdLyTO5zN5-IabOpHPCXLFDN5wpFnnFPNlLKcfkO3il0vc8v5XO8tQy2uGeoyFSU7LVKQlGq1OucRpNptp5odTNVdp8tSCevdWSeCGdLsVbuCbt9fqecAAwg5Q2H9ORgEQAIIABXsKdTjj97hCCAjISUOYCebigXzxeCGKeOYxhxLhaVeeDIpCFaL4ZbJdbMUrjX8Xdr8Xz3oj+VRQ6yI8GlXrGczASyEZnhznBLHPYbHJCS-cjV8cBeTmHq+nbg387c293y+7YbXNJPHnPe8yK+vR9cd63O8fB5fr+is9Pb7-k+47DtmT5+D+v5xE8falrmNYIUW1aKgEYFKhWN4kkqHb9m2RZoQW+aHM20GwWRiF1pBUEof4zadnEyrzthQ7eBiLFXg0+QlnOmHrkBLg1E8vgsU8S41JU3FUdR76uIJdH-rxt78X+cGEUWfaHFO1EqZuKk4f4raCT2RY8dpOkAcuSiNCZUlQTJ0TeIcwmBoukmKVhvgwSWyE0QRqn+RpGFmShhw4YOwRerqkUTv43jtvFeFKnF7kea5f6uTGhhgImUCUOgAAqDgMAAHqwiBIAwACeZVKEguCJiAGQMPwrC1bgRAAGoAPphtg6isP4SAAG6tRVrDIKQ2Bxt1iZ9QNw2jWwi4TWgU1gEYXUEJYXAIKwDAALwIAA1BIh0ALQIBdZ1KCtYBrRtW0wDte2HSd52XZdVR1atpAPdtu0Hcdp0fVdhy3fdm3-S9QPvVd3rfXdv2Q09AOvcDV2XeVk1I49z2A29IOXd44M41D+PoyDqIIxDuOozDhNnVkJNoH9KPQwTGNnek1Ptd1YbxjAJUDWyFXVf4IsMONPMs11ECPT901dYmAtC+VVVlcgkvM51XVEMmqitTUWQVaV3hPKLwuDQAzqNgijVb-VtQrDVkD6mWkDleWFULQkW3ATsNU1LVO2GIBKyAMBsMgpXldV-vSy7WBu2QQA");
    addTemplate("リバース空室", "MQCQogSg8gUArABgDSOGAcgERjYAhAcQFlcNtdCBJIgmACwBcGAHALgHp2BLAOi4FsA5gFcATjwDGAe37sAjl3QBGYQDsAJjwBWzQWiw5gAMQAyUKBBxXrN23fsO7AAheu37j56-f3ANl8ATEpO-kEwPhGRUW6hwbHh0YmJAb5KcAAsIYEIWQE5oTlwcACcwUWlTuVlJcEAHHBKxQlJLT4paZn+AMzFAMJZXbX9BZU1oxVV43UNTa1zXu0ZbpMrY5P1jc3z25W+xbW7cEOHAOz9cL4nAedrtxNjG7M7Oxf7h9e76X2fx6v3-9NNs8XnsDn9qgCplD1jMtsCXiVCkcnvDtnsAnAXOUkbUUajttjRri4fjohcAmDAicsYiicU6U4lAFMkyAoyAl12Zl6nkSaTIuTKQFqYtMUVcQzxfSmZjWezOTKnDyEHz+T5BbthU5RZLkQy5UyFQE2YalXBeWqkhrySLUkVdRKpQ76U6ncrVZbPNaqdq7WK9a6A0HHcH6e7PWTAkLqeMcS7Q86GeGIwKTgglOc0xnKlnhsUgnmCyF8xmPSmPOi4IWq8WMb19ORgEQAIIABUcHc7Xes5ei6OO6Rrg8LQzL5fRCEL2fR05Lea66X6Lj26VnXVLve86MXnw+ler898S+LXRr6LOY5T-fOtSUMb8+dHm6815fj96l4jE6nP9r2Zi76fp6r5pL4XSTp415AZar6QYBz5wRS5y+OkO4VvBCEPquv4zjh+ZdEu35-vOi7QWqeyngetZnvmEEUWhK6zkWuHEaxFEbphbi1LU643mmfEQe0qSHoRxSUdRVH7hJtYXpxyy1CcBGuBRxyIU+clYgpSkuIsvhvkhZH8kcinHrp+nqRpxnab6oHmR+GmaSZrhmWp9kOcZ2bGRBXkjseD4GQ5AHYTpqS+IJdrfCxUVzmxYmkYFyliTWNlHP0ixnNJUlZfmNFdEeDaGGArZQJQ6AACpOAwAAerANEgDAAJ6sF8SC4K2IA5Aw-CsEorXAL0IAAPrtTAbDIDViBIE1LWkNgwDtWQKoFaQxWlRV1W1cgjXNcUfXtZ13W9bgRAAGqDb02DqKwARIAAbqwW0PX1YBzadw2XU9929WwgzILNpBGINBCWFwCCsAwAC8CAANQSFDAC0CCI-DSh-Wgc1gIDwMwKD4NQ7DCNI0jeTPRjWMg2DkMw3DRPI+BpMA0DFN49ThPI+kaMvYz2O41TBO00jk3-Wg5M45T+M08jSNhQzItM2LLP81L8NprLmPy7zEts0jtSc2TGvi6zAvw8UevHWdvTNjAG0BMUu3bbb9tPcL6sQNj6Pm8NVsbZN22+87HtNmdRDtqoPUXLU9U1Sh9VNbbXRIAAzj1SCCCnidXUdgcLVgS1kEAA");
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
        hankaku: true,
    });
    addBtn("output",function(){
        var file = LZString.compressToEncodedURIComponent(input_dq());
        yaju1919.addInputText(tabB.empty(),{
            value: file,
            textarea: true,
            readonly: true
        });
        var str = 'avascript:(function(){var map="' + file + '";(' + toStr(write) + ')();})();';
        yaju1919.addInputText(tabC.empty(),{
            value: str,
            textarea: true,
            readonly: true
        });
    },h_ui).css({
        color:"yellow",
        backgroundColor:"red",
        fontSize: "2em",
    });
    //------------------------------------------------------------------------------------
    h_ui.children().after("<br>");
    //------------------------------------------------------------------------------------
    function toStr(func){ // 関数を文字列化
        return String(func).replace(/\/\/.*\n/g,'');
    }
    function getFile(){
        var e = document.createElement("textarea");
        e.textContent = LZString.compressToEncodedURIComponent(g_dqFile);
        document.body.appendChild(e);
        e.select();
        document.execCommand('copy');
        document.body.removeChild(e);
        apprise('コピー完了');
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
