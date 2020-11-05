(function(window, undefined){
    "use strict";
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
    function writeMapData(input){
        var file = LZString.compressToEncodedURIComponent(input);
        return [
            file,
            'avascript:(function(){var map="' + file + '";(' + toStr(write) + ')();})();'
        ];
    }
    function getMapData(){
        return "avascript:(" + toStr(getFile) + ")();";
    }
    window.Bookmarklet = {
        writeMapData: writeMapData,
        getMapData: getMapData
    };
})(typeof window === 'object' ? window : this);
