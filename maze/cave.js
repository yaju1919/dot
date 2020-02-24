function f(str){
    var mass = str.split('\n').map(v=>v.split(''));
    var copy = mass.map(v=>v.slice());
    mass = mass.map(v=>v.map(v2=>v2==='0'?'12825':'C17193'));
    copy.forEach(function(line,y){
        line.forEach(function(c,x){
            if(c==='0') return;
            var right = (function(){ // →
                var a = line[x+1];
                if(!a) return;
                if(a === '1') return;
                mass[y][x] = 'C12823';
                return true;
            })();

            var left = (function(){ // ←
                var a = line[x-1];
                if(!a) return;
                if(a === '1') return;
                mass[y][x] = 'C12819';
                return true;
            })();

            var up = (function(){ // ↑
                var a = copy[y-1];
                if(!a) return;
                if(a[x] === '1') return;
                mass[y][x] = 'C12830';
                return true;
            })();

            var down = (function(){ // ↓
                var a = copy[y+1];
                if(!a) return;
                if(a[x] === '1') return;
                mass[y][x] = 'C12821';
                return true;
            })();

            if(left && up) mass[y][x] = 'C12829';
            if(left && down) mass[y][x] = 'C12828';
            if(right && up) mass[y][x] = 'C12831';
            if(right && down) mass[y][x] = 'C12832';

            if(mass[y][x] === 'C17193'){ // 上下左右壁
                (function(){ // 左上
                    var a = copy[y-1];
                    if(!a) return;
                    var b = a[x-1];
                    if(!b) return;
                    if(b === '0') mass[y][x] = 'C12819';
                })();
                (function(){ // 左下
                    var a = copy[y+1];
                    if(!a) return;
                    var b = a[x-1];
                    if(!b) return;
                    if(b === '0') mass[y][x] = 'C12820';
                })();
                (function(){ // 右上
                    var a = copy[y-1];
                    if(!a) return;
                    var b = a[x+1];
                    if(!b) return;
                    if(b === '0') mass[y][x] = 'C17344';
                })();
                (function(){ // 右下
                    var a = copy[y+1];
                    if(!a) return;
                    var b = a[x+1];
                    if(!b) return;
                    if(b === '0') mass[y][x] = 'C12822';
                })();
            }
        });
    });
    (function(){
        var a = mass.map(line=>line.join(' ')).join('\n');
        dq(s=>s.replace(/(?<=#FLOOR)(.|\n)*?(?=#END)/,'\n'+a));
    })();
}
