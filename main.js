(function() {
    'use strict';
    var h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    $("<h1>").text("GUI無しでRPGENを編集するツール").appendTo(h);
    $("<div>").text("編集し終わった後は出力をコピペして開発者ツールで実行").appendTo(h);
    function addBtn(title, func){
        return $("<button>",{text: title}).appendTo(h).click(func);
    }
    var h_ui = $("<div>").appendTo(h);
    var h_result = $("<div>").appendTo(h);
    var input_map = yaju1919.addInputNumber(h_ui,{
        title: "MAP番号"
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
        var url = "http://rpgen.us/dq/cons/writeMapText.php",
            mapText = LZString.compressToEncodedURIComponent(input_dq());
        var param = {
            "token": "2afa8b13b99da6535f5ad5040c0f3796b605703b",
            "index": input_map(),
            "mapText": mapText
        };
        var str = '$.post("' + url + ',{' + Object.keys(param).map(function(v){
            return '"' + v + '":"' + param[v] + '"\n';
        }) + '});'
        yaju1919.addInputText(h_result.empty(),{
            title: "output",
            value: str,
            textarea: true,
            readonly: true
        });
    });
})();
