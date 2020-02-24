function f(str){
    var mass = str.split('\n').map(v=>v.split(''));
    var copy = mass.map(v=>v.slice());
    var mono = mass.map(v=>v.slice().map(v2=>''));
    mass = mass.map(v=>v.map(v2=>v2==='0'?(Math.random()<0.99?'24342':'25393'):'C45'));
    copy.forEach(function(line,y){
        line.forEach(function(c,x){
            if(c==='1') return;
            var right = (function(){ // →
                var a = line[x+1];
                if(!a) return;
                if(a === '0') return true;
                mono[y][x] = '25433';
                return true;
            })();

            var left = (function(){ // ←
                var a = line[x-1];
                if(!a) return;
                if(a === '0') return true;
                mono[y][x] = '21424';
                return true;
            })();

            (function(){ // ↓
                var a = copy[y+1];
                if(!a) return;
                var b = a[x];
                if(!b) return;
                if(b === '0') return;
                mass[y][x] = '25385';
                mass[y+1][x] = 'C24347';
                if(right){
                    if(copy[y][x+1] === '1'){
                        mass[y+1][x] = 'C24346';
                        if(mass[y+2]) if(mass[y+2][x]) mass[y+2][x] = 'C24346';
                        if(mass[y+3]) if(mass[y+3][x]) mass[y+3][x] = 'C24347';
                    }
                    else if(copy[y][x+2] === '1'){
                        mass[y+1][x] = 'C24352';
                        if(mass[y+2]) if(mass[y+2][x]) mass[y+2][x] = 'C24352';
                        if(mass[y+3]) if(mass[y+3][x]) mass[y+3][x] = 'C24353';
                    }
                }
                if(left){
                    if(copy[y][x-1] === '1'){
                        mass[y+1][x] = 'C24352';
                        if(mass[y+2]) if(mass[y+2][x]) mass[y+2][x] = 'C24352';
                        if(mass[y+3]) if(mass[y+3][x]) mass[y+3][x] = 'C24353';
                    }
                    else if(copy[y][x-2] === '1'){
                        mass[y+1][x] = 'C24346';
                        if(mass[y+2]) if(mass[y+2][x]) mass[y+2][x] = 'C24346';
                        if(mass[y+3]) if(mass[y+3][x]) mass[y+3][x] = 'C24347';
                    }
                }
            })();
        });
    });
    (function(){
        var a = mass.map(line=>line.join(' ')).join('\n');
        var b = mono.map(line=>line.join(' ')).join('\n');
        dq(s=>s.replace(/(?<=#FLOOR)(.|\n)*?(?=#END)/,'\n'+a).replace(/(?<=#MAP)(.|\n)*?(?=#END)/,'\n'+b));
    })();
}
