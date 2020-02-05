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
        title: "読み込む",
        change: function(v){
            $("#dq").val(LZString.decompressFromEncodedURIComponent(v.replace(/^L1/,'')));
            $(window).resize();
        }
    });
    addBtn("簡単編集ボタン：ランダムMAP化", makeRandomMap);
    var input_dq = yaju1919.addInputText(h_ui,{
        id: "dq",
        title: "編集",
        textarea: true
    });
    addBtn("この内容で出力",function(){
        var str = 'avascript:(function(){var data="' + LZString.compressToEncodedURIComponent(input_dq()) +
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
                mapText: (dq.bOpenScr ? '' : 'L1') + data,
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
    function makeRandomMap(){ // ランダムMAP化
        var dq = $("#dq").val();

        function makeRandMap(){
            return '\n' + yaju1919.makeArray(50).map(function(){
                return yaju1919.makeArray(50).map(function(){
                    return yaju1919.randInt(1,26104);
                }).join(' ');
            }).join('\n');
        }
        dq = dq.replace(/(?<=#FLOOR)(.|\n)*?(?=#END)/g, makeRandMap);

        function makeRandHuman(){
            var str = "\n#HUMAN\n";
            var a = 'A' + yaju1919.randInt(1,1105);
            return [
                a,
                yaju1919.randInt(0,49), // x
                yaju1919.randInt(0,49), // y
                2, // direction
                5, // movement
                100, // speed
                '#END\n'
            ].join(',');
        }
        dq = dq.replace(/(?<=#(HUMAN|MAP|EPOINT))(.|\n)*?(?=#END)/g, ''); // 人物イベント全消去
        yaju1919.makeArray(49).forEach(function(v){
            dq += makeRandHuman();
        });

        $("#dq").val(dq);
    }
})();
