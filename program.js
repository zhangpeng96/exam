/*
四角鸣墨题库(New Version)
version: 3.1.0
date:  2016/4/3 22:29
 */
$(function () {
    /*
    全局CSS配置
     */
    $('.nav-tabs > li').css({
        'float' : 'none',
        'margin-bottom' : '0'
    });
    $(".next").hide();
    $(".panel").hide();
    /*
    全局载入脚本
     */
    //当前位置获得
    pos = 0;

    timer('start');

    /*
    选择、填空题布尔验证函数
     */

function validate(input1, input2, type) {
    var str1 = $.trim(input1);
    var str2 = $.trim(input2);
    function delSpace(str) {
        return str.replace(/\s+/g, "");
    }
    if (type == 'exact') {
        if (str1 == str2) {
            return 1;
        } else {
            return 0;
        }
    } else if (type == 'case') {
        if (str1.toLowerCase() == str2.toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    } else if (type == 'space') {
        if (delSpace(str1) == delSpace(str2)) {
            return 1;
        } else {
            return 0;
        }
    } else if (type == 'sc') {
        var data1 = delSpace(str1.toLowerCase());
        var data2 = delSpace(str2.toLowerCase());
        if (data1 == data2) {
            return 1;
        } else {
            return 0;
        }
    }
}

    /*
    题目成绩计算函数
     */
    function calcScore(inputData) {
        if (!inputData) {
            return 0;
        } else {
            return 1.0;
        }
    }
/* Can not be used as a public variable */
    function accessData(method, data) {
      var regs = new Array();
      if(method == 'time'){
        regs['time'] = data;
      }else if(method == 'duration'){
        regs['duration'] = data;
      }else if(method == 'frequency'){
        regs['frequency'] = data;
      }else if(method == 'isHint'){
        regs['isHint'] = data;
      }else if(method == 'isTimeout'){
        regs['isTimeout'] = data;
      }else if(method == 'result'){
        regs['result'] = data;
      }else if(method == 'score'){
        regs['score'] = data;
      }else if(method == 'postAnswer'){
        regs['postAnswer'] = data;
      }
      return regs;
    }
    // 进入下一题
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var activeTab = $(e.target).attr('next-pos');
        // 声明全局变量pos
        pos = $(e.target).attr('open-pos');
        localStorage.qPos = pos;        // 更改并载入进度条动画
        postLocal.data[pos] = {
            "time" : timeRecord,
            "duration" : durationRecord,
            "frequency" : 3,
            "isHint" : 0,
            //isHint算法计算不出来
            "isTimeout" : timeOut,
            "result" : gloResult,
            "score" : calcScore(gloResult),
            "postAnswer" : gloPost
        }

        // 将post数据存入localStorage
        localStorage.setItem("postData", JSON.stringify(postLocal));

        // 开始下一题的计时
        timer('start');
        gloHint = 0;
    });

function refreshProgress(time) {
    $(".progress-animate").remove();
    $(".fill-header").after("<div id=\"progress\" class=\"progress-animate\" <\/div>");
    $(".progress-animate").css({
        "animation-name" : "process",
        "animation-duration" : time + "s"
    });
}
function controlProgress(action) {
    if (action == 'pause') {
        $(".progress-animate").css({
            "animation-play-state" : "paused"
        });
    } else if (action == 'play') {}
    else if (action == 'replay') {}
    else {
        return -1;
    }
}


function showHint(pos) {
  $(".tab-pane:eq(" + pos + ")").find(".panel").show();
}

    /**/
    /*
    进入历史定位
     */
    if (!localStorage.qPos) {}
    else if (localStorage.qPos == 1) {}
    else {
        $(".tab-pane").removeClass("active"); //禁用首页active
        $(".tab-pane:eq(" + localStorage.qPos + ")").addClass("in active"); //获得local数据并定位显示
    }

    /*
    选择题判断机制
     */

    $(".tab-pane li").click(function () {
        // 计时停止
        timer('stop');
        //
        // 由于选择器是在页面加载时就已经确定的，所以无法使用变量pos
        var input = $(this).attr('opt-order');
        gloPost = input;
        // 显示「下一题」按钮
        $(this).parent().parent().find('.next').show();

        // 题目result返回数据
        if (validate(input, msg[pos - 1].answer, msg[pos - 1].validate)) {
            $(this).addClass('answerTrue');
            gloResult = true;
        } else {
            $(this).addClass('answerFalse');
            $(this).siblings('[opt-order=\"' + msg[pos - 1].answer + '\"]').addClass('answerTrue');
            gloResult = false;
        }
        // 进度条暂停

    });

    /*
    计时函数
     */
function timer(step, record) {
    var now = parseInt(new Date().getTime() / 1000);
    if (step == 'start') {
        var time = now;
    } else if (step == 'stop') {
        var time = (now - record);
    } else if (step == 'clear') {
        var time = 0;
    } else {
        var time = -1;
    }
    return time;
}
function isTimeout(input, plan) {
    if (input > plan) {
        return 1;
    } else {
        return 0;
    }
}

function position(step){
  if(step == 'get'){

  }else if(step == 'increase'){

  }else if(step == 'decrease'){

  }else{
    var data = -1;
  }
  return data;
}
    /*
    数据键值
     */
    var msg = [{
            "uid" : 38872,
            "answer" : "1",
            "validate" : "exact",
            "time" : 40
        }, {
            "uid" : 38873,
            "answer" : "3",
            "validate" : "case",
            "time" : 20
        }, {
            "uid" : 38874,
            "answer" : "2",
            "validate" : "space",
            "time" : 80
        }, {
            "uid" : 38875,
            "answer" : "1",
            "validate" : "sc",
            "time" : 90
        }
    ];

function storageData() {

}
    /*
    local储存
     */
    var postLocal = {
        "config" : [{
                "postUID" : 555555
            }
        ],
        "data" : [
        ]
    }


});
