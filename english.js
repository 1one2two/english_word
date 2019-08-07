let word = { "sharpen": "加強", "course": "課程", "spilled": "打翻", "damp cloth": "抹布", "astronaut": "太空人", "volunteers": "志願", "graduate": "畢業", "probably": "可能", "damage": "破壞", "affect": "影響", "quality": "品質", "generations": "世代", "resigned": "辭職", "algebra": "代數", "geometry": "幾何", "term": "學期" }
var cou = 0;
var lis_q = [];
var point = 0;
var q_times = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//var test = JSON.splice('./english.json');
//console.log(test);

document.onkeydown = function (e) {
    switch (String(e.key)) {
        case "1":
            $('#a1').click();
            break;
        case "2":
            $('#a2').click();
            break;
        case "3":
            $('#a3').click();
            break;
        case "4":
            $('#a4').click();
            break;
        default:
            break;
    }
}

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
    new_q(); //delay(1000).then(() => new_q());
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
            pan_q.fillStyle = "#9EE37D";
            pan_q.fillRect(0, 0, pg_q.width, pg_q.height);

            pan_q.fillStyle = "black";
            pan_q.font = "bold 38px Arial";
            pan_q.textAlign = "center";
            pan_q.fillText(get_key_value(lis_q[index]).e, 310, 35);
            //responsiveVoice.speak(get_key_value(lis_q[index]).e);
        }
        else
            document.getElementById('a' + index).value = get_key_value(lis_q[index]).c;
    })
}

function re(id) {
    if (lis_q[id[1]] == lis_q[0]) {
        point++;
        q_times[lis_q[0]]++;

        $('#' + id).css('background-color', '#2AB6CF');
        delay(180).then(() => {
            new_q();
            $('#' + id).css('background-color', '');
        });
    }
    else {
        point = 0;
        $('#' + id).css('background-color', '#ff0000');
        delay(180).then(() => {
            new_q();
            $('#' + id).css('background-color', '');
        });
    }
    draw_score();
}

function draw_score() {
    //pan.globalAlpha= (Math.sin(0) + 1) / 2;
    pan.fillStyle = "#9EE37D";
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
