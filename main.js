(function() {
    'use strict';
    var h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    $("<h1>").text("GUI無しでRPGENを編集するツール").appendTo(h);
    $("<div>").text("avascriptから始まる文字列をrpgenのページのURLバーに貼り付けでEnter押してください。").appendTo(h);
    function addBtn(title, func, parentNode){
        return $("<button>",{text: title}).appendTo(parentNode||h).click(func);
    }
    var h_ui = $("<div>").appendTo(h);
    var h_result = $("<div>").appendTo(h);
    yaju1919.addInputText(h_ui,{
        title: "rpgenのデータをコピーする関数",
        value: (function(){
            return "avascript:(function(){var c=" + toStr(yaju1919.copy) + ';' + toStr(getMapText) +
                ";c(getMapText());alert('コピー完了')})();";
        })(),
        readonly: true
    });
    yaju1919.addInputText(h_ui,{
        title: "読み込む",
        change: function(v){
            $("#dq").val(LZString.decompressFromEncodedURIComponent(v));
        }
    });
    var input_dq = yaju1919.addInputText(h_ui,{
        id: "dq",
        title: "編集",
        textarea: true
    });
    addBtn("出力",function(){
        var str = 'avascript:(function(){var data="' + LZString.compressToEncodedURIComponent(input_dq()) +
            '";(' + toStr(write) + ')();})();';
        yaju1919.addInputText(h_result.empty(),{
            title: "output",
            value: str,
            textarea: true,
            readonly: true
        },h_ui);
    });
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
                mapText: data,
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
        })
    }
})();
