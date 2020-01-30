(function() {
    'use strict';
    var h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    $("<h1>").text("RPGENドット絵制作補助ツール").appendTo(h);
    $("<div>").text("114514").appendTo(h);
    function addBtn(title, func){
        return $("<button>",{text: title}).appendTo(h).click(func);
    }
    var h_ui = $("<div>").appendTo(h);
    var h_result = $("<div>").appendTo(h);
    yaju1919.addInputText(h_ui,{
        title: "RGBA形式に変換",
        placeholder: "#137a7f",
        change: function(v){
            yaju1919.addInputText(h_result.empty(),{
                title: "output",
                value: "rgba(" + yaju1919.getRGB(v).join(',') + ",1.0)",
                readonly: true
            });
        }
    });
})();
