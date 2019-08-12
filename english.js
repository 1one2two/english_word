var word = { "sharpen": "加強", "course": "課程", "spilled": "打翻", "damp cloth": "抹布", "astronaut": "太空人", "volunteers": "志願", "graduate": "畢業", "probably": "可能", "damage": "破壞", "affect": "影響", "quality": "品質", "generations": "世代", "resigned": "辭職", "algebra": "代數", "geometry": "幾何", "term": "學期" }
var cou = 0;
var lis_q = [];
var point = 0;
var question_language_english = false;
//https://coolors.co/cffcff-aaefdf-9ee37d-63c132-358600

/*
1) Add button selecgt question language

2) Hide textbox or button by setting

3) Textbox CSS to more beautiful
*/

document.onresize = function () {
    console.log('Change');
}

function test() {
    var w = $(window).width();
    var h = $(window).height()
    if (w < 620) {
        $('#po').css('width', String(w) + 'px');
        $('#qe').css('width', String(w) + 'px');
        console.log('Small');
    }
    else {
        $('#po').css('width', '620px');
        $('#qe').css('width', '620px');
    }

    if (w < 620) {
        var a = document.createElement('button');
        a.innerHTML = 'abc';

        document.getElementsByTagName('body')[0].appendChild(a);
    }
}

document.onkeydown = function (e) {
    console.log(e);
    switch (String(e.code)) {
        case "Numpad1":
            $('#a1').click();
            break;
        case "Numpad2":
            $('#a2').click();
            break;
        case "Numpad3":
            $('#a3').click();
            break;
        case "Numpad4":
            $('#a4').click();
            break;
        case "Enter":
            re("a0");
            break;
        default:
            break;
    }
}

function reset() {
    point = 0;
    draw_score();
    new_q();
}

window.onload = function () {
    pg = document.getElementById('po');
    pan = pg.getContext('2d');

    pg_q = document.getElementById('qe');
    pan_q = pg_q.getContext('2d');
    for (i in word) {
        //console.log(cou, i, word[i]);
        cou++;
    }
    draw_score();
    new_q();
}

function get_key_value(ind) {
    var i = 0;
    for (k in word) {
        if (i == ind)
            if (question_language_english)
                return { "e": k, "c": word[k] };
            else
                return { "c": k, "e": word[k] };
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
            pan_q.fillText(get_key_value(lis_q[index]).e, $('#qe').width() / 2, 35);
            responsiveVoice.speak(get_key_value(lis_q[index]).e);
        }
        else
            document.getElementById('a' + index).value = get_key_value(lis_q[index]).c;
    })
}

function re(id) {
    var t = false;
    if (id[1] == 0) {
        console.log($('#a0')[0].value, get_key_value(lis_q[0]).c)
        if ($('#a0')[0].value == get_key_value(lis_q[0]).c)
            t = true;
    }
    else if (lis_q[id[1]] == lis_q[0])
        t = true;

    if (t) {
        $('#a0')[0].value = "";
        point++;

        var audio = new Audio('coin04.mp3');
        $('#' + id).css('background-color', '#2AB6CF');
        delay(180).then(() => {
            new_q();
            $('#' + id).css('background-color', '');
        });
        audio.play();
    } else {
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
    pan.font = "16px Arial";
    pan.fillStyle = "";
    pan.textAlign = "right";
    pan.fillText("Score:" + String(point), $('#po').width() - 20, 20);
}

var delay = function (s) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, s);
    });
};

$('#selectFiles').change(function () {
    var files = document.getElementById('selectFiles').files;
    if (files.length <= 0) {
        return false;
    }

    var fr = new FileReader();
    fr.onload = function (e) {
        console.log(e);
        var result = JSON.parse(e.target.result);
        var formatted = JSON.stringify(result, null, 2);
        word = result;
        console.log(word, formatted);
        reset();
    }

    fr.readAsText(files.item(0));
})
var sh = false;
$('#menu_btn').click(function () {
    if (sh) {
        $('#selectFiles').hide();
        $('ul').css('background-color', '#9EE37D');
        $('#menu').css('background-color', '#9EE37D');

        $('#box').css({ left: 0 });
    }
    else {
        $('#selectFiles').show();
        $('ul').css('background-color', '#AAEFDF');
        $('#menu').css('background-color', '#AAEFDF');

        $('#box').css({ left: 220 });
    }
    sh = !sh;
})

$(".menu li").on('mouseenter mouseleave', function (e) {

    var elm = $('ul:first', this);
    var off = elm.offset();
    var l = off.left;
    var w = elm.width();
    var docH = $(".container").height();
    var docW = $(".container").width();

    var isEntirelyVisible = (l + w <= docW);

    if (!isEntirelyVisible) {
        $(this).addClass('edge');
    } else {
        $(this).removeClass('edge');
    }
});