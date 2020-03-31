(function() {
    'use strict';
    var SIZE = 300;
    // 地面
    var UMI = "15_3", // 歩行不可
        RIKU = "0_8",
        SIGEMI = "3_8",
        MORI = "9_8",
        YAMA = "3_12",
        YAMA2 = "6_8"; // 歩行不可
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
            ].filter(v => {
                var x = v[0],
                    y = v[1];
                if(x < 0 || x >= SIZE || y < 0 || y >= SIZE) return false;
                return moved.indexOf(v[0] + '_' + v[1]) === -1 && judge_func(x,y);
            });
            if(!ar.length) return loop(startX,startY); // 候補がなくなった
            var xy = yaju1919.randArray(ar);
            return loop(xy[0], xy[1]);
        }
    }
    var yukaArray = [];
    // 最初の地面
    yaju1919.makeArray(80).forEach(v=>{
        fill(
            yaju1919.randInt(0,SIZE),
            yaju1919.randInt(0,SIZE),
            500,
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
    // 陸の周りの海
    yuka.forEach((line,y)=>{
        line.forEach((v,x)=>{
            if(yuka[y][x] !== UMI) return;
            yuka[y][x] = (function(){
                var str = [
                    [x,y-1],
                    [x-1,y],
                    [x+1,y],
                    [x,y+1],
                ].map(xy=>{
                    var x = xy[0],
                        y = xy[1];
                    if(!(x >= 0 && x < SIZE && y >= 0 && y < SIZE)) return '0';
                    return yuka[y][x] === RIKU ? '1' : '0';
                }).join('');
                switch(str){
                    case '0001': return 'C4304';
                    case '0010': return 'C4303';
                    case '0011': return 'C4295';
                    case '0100': return 'C4306';
                    case '0101': return 'C4296';
                    case '0110': return 'C2685';
                    case '0111': return 'C6343';

                    case '1000': return 'C4305';
                    case '1001': return 'C4336';
                    case '1010': return 'C4297';
                    case '1011': return 'C6345';
                    case '1100': return 'C4298';
                    case '1101': return 'C6346';
                    case '1110': return 'C6344';
                    case '1111': return '3_0';
                    default: return UMI;
                }
            })();
        });
    });
    // その他
    [MORI,SIGEMI,YAMA,YAMA2].forEach((vv)=>{
        yaju1919.makeArray(50).forEach(v=>{
            var xy = yaju1919.randArray(yukaArray.filter(str=>{
                var p = str.split('_').map(v=>Number(v));
                return yuka[p[1]][p[0]] === RIKU;
            })).split('_').map(v=>Number(v));
            fill(
                xy[0],
                xy[1],
                100,
                (x,y) => {
                    yuka[y][x] = vv;
                    [
                        [x+1,y],
                        [x-1,y],
                        [x,y+1],
                        [x,y-1],
                    ].filter(v=>{
                        return yukaArray.indexOf(v[0] + '_' + v[1]) !== -1;
                    }).forEach(v=>{
                        mono[y][x] = vv;
                    });
                },
                (x,y) => {
                    return yukaArray.indexOf(x + '_' + y) !== -1 && !mono[y][x];
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
