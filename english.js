let word = {
    "afford": "給予",
    "unfortunately": "不幸",
    "waterprof": "防水",
    "scratch": "抓",
    "roof": "屋頂",
    "tutor": "家教",
    "assignment": "報告",
    "material": "材料",
    "recognize": "辨認",
    "rub": "模插"
}
var cou = 0;
var lis_q = [];
var point = 0;

window.onload = function () {
    pg = document.getElementById('po');
    pan = pg.getContext('2d');

    pg_q = document.getElementById('qe');
    pan_q = pg_q.getContext('2d');
    for (i in word) {
        console.log(word[i]);
        cou++;
    }
    draw_score();
    new_q();
}

function get_key_value(ind) {
    var i = 0;
    for (k in word) {
        if (i == ind) return { "e": k, "c": word[k] };
        i++;
    }
    return 0;
}

function new_q() {
    var lis = Array.from({ length: 10 }, (x, i) => i);
    lis_q = [];
    for (var i = 10; i > 5; i--) {
        r = Math.floor(Math.random() * i);
        lis_q.push(lis[r]);
        lis.splice(r, 1);
    }

    lis_q[Math.floor(Math.random() * 4) + 1] = lis_q[0];

    lis_q.map((value, index) => {
        if (index == 0) {
            pan_q.fillStyle = "#FFFFFF";
            pan_q.fillRect(0, 0, pg_q.width, pg_q.height);

            pan_q.fillStyle = "#49BED3";
            pan_q.font = "30px Arial";
            pan_q.fillText(get_key_value(lis_q[index]).e, 5, 20);
        }
        else
            document.getElementById('a' + index).value = get_key_value(lis_q[index]).c;
    })
}

function re(id) {
    if (lis_q[id[1]] == lis_q[0]) {
        point++;
        draw_score();
        console.log(point);
        new_q();
    }
    else console.log("False");
}

function draw_score() {
    pan.fillStyle = "#FFFFFF";
    pan.fillRect(0, 0, pg.width, pg.height);

    pan.fillStyle = "#000000";
    pan.font = "12px Arial";
    pan.fillText("Score:" + String(point), 5, 20);

}