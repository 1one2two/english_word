let word = { "exact": "確切", "thunder": "雷", "storm": "暴風雨", "breeze": "微風", "aruge": "爭論", "package": "包裹", "stairs": "樓梯", "tiptoe": "顛腳", "shovel": "鏟", "lie": "躺" }
var cou = 0;
var lis_q = [];
var point = 0;
var q_times = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//var test = JSON.splice('./english.json');
//console.log(test);

window.onload = function () {
    pg = document.getElementById('po');
    pan = pg.getContext('2d');

    pg_q = document.getElementById('qe');
    pan_q = pg_q.getContext('2d');
    for (i in word) {
        console.log(cou, i, word[i]);
        cou++;
    }
    draw_score();
    delay(1000).then(() => new_q());
}

$("#butts").click(function () {
    alert("Your answer:" + $("#all_answer").val())
});

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

            pan_q.fillStyle = "#2AB6CF";
            pan_q.font = "30px Arial";
            pan_q.textAlign = "center";
            pan_q.fillText(get_key_value(lis_q[index]).e, 125, 25);
            responsiveVoice.speak(get_key_value(lis_q[index]).e);
        }
        else
            document.getElementById('a' + index).value = get_key_value(lis_q[index]).c;
    })
}

function re(id) {
    if (lis_q[id[1]] == lis_q[0]) {
        point++;
        q_times[lis_q[0]]++;
        new_q();
    }
    else {
        point = 0;
        console.log("False");
    }
    draw_score();
}

function draw_score() {
    pan.fillStyle = "#FFFFFF";
    pan.fillRect(0, 0, pg.width, pg.height);

    pan.fillStyle = "#000000";
    pan.font = "12px Arial";
    pan.fillStyle = "";
    pan.fillText("Score:" + String(point), 5, 20);
}

var delay = function (s) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, s);
    });
};
