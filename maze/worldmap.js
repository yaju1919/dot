(function() {
    'use strict';
    var SIZE = 50;
    // 地面
    var UMI = "C11449", // 歩行不可
        RIKU = "7054";
    // 物
    var MORI = "3923",
        YAMA = "3859",
        YAMA2 = "C3858"; // 歩行不可
    var yuka = yaju1919.makeArray(SIZE).map(v=>yaju1919.makeArray(SIZE).map(v=>UMI));
    var mono = yuka.map(v=>v.slice().map(v2=>''));
    //
    function fill(startX, startY, size, fill_func, judge_func){
        var moved = [];
        loop(startX, startY);
        function loop(x,y){
            if(!size) return;
            fill_func(x,y);
            size--;
            moved.push(x + '_' + y);
            var ar = [
                [x+1,y],
                [x-1,y],
                [x,y+1],
                [x,y-1],
            ].filter(v => v[0] < SIZE && v[1] < SIZE && v[0] > 0 && v[1] > 0 && moved.indexOf(v[0] + '_' + v[1]) === -1 && judge_func(v[0], v[1]) );
            if(!ar.length) return loop(startX,startY); // 候補がなくなった
            var xy = yaju1919.randArray(ar);
            return loop(xy[0], xy[1]);
        }
    }
    var yukaArray = [];
    // 最初の地面
    yaju1919.makeArray(8).forEach(v=>{
        fill(
            yaju1919.randInt(0,SIZE),
            yaju1919.randInt(0,SIZE),
            100,
            (x,y) => {
                yuka[y][x] = RIKU;
                if(y > 0) yuka[y-1][x] = RIKU;
                if(x > 0) yuka[y][x-1] = RIKU;
                if(y < SIZE - 1) yuka[y+1][x] = RIKU;
                if(x < SIZE - 1) yuka[y][x+1] = RIKU;
                yukaArray.push(x + '_' + y);
            },
            (x,y) => {
                return true;
            }
        )
    });
    // 森
    [MORI,YAMA,YAMA2].forEach(vv=>{
        yaju1919.makeArray(8).forEach(v=>{
            var xy = yaju1919.randArray(yukaArray).split('_').map(v=>Number(v));
            fill(
                xy[0],
                xy[1],
                100,
                (x,y) => {
                    mono[y][x] = vv;
                },
                (x,y) => {
                    return yukaArray.indexOf(x + '_' + y) !== -1;
                }
            )
        });
    });
    (function(){
        var a = yuka.map(line=>line.join(' ')).join('\n');
        var b = mono.map(line=>line.join(' ')).join('\n');
        dq(s=>s.replace(/(?<=#FLOOR)(.|\n)*?(?=#END)/,'\n'+a).replace(/(?<=#MAP)(.|\n)*?(?=#END)/,'\n'+b));
    })();
})();
