/*
	四角鸣墨题库(New Version)
	version: 3.2.0
	date:  2016/4/13 18:39
*/
$(function() {

/*
	数据函数
*/
  
  /* Can not be used as a public variable */
  function accessData(method, data) {
    var regs = new Array();
    if (method == 'time') {
      regs['time'] = data;
    } else if (method == 'duration') {
      regs['duration'] = data;
    } else if (method == 'frequency') {
      regs['frequency'] = data;
    } else if (method == 'isHint') {
      regs['isHint'] = data;
    } else if (method == 'isTimeout') {
      regs['isTimeout'] = data;
    } else if (method == 'result') {
      regs['result'] = data;
    } else if (method == 'score') {
      regs['score'] = data;
    } else if (method == 'postAnswer') {
      regs['postAnswer'] = data;
    }
    return regs;
  }
  
  /* 获得localStorage.qPos数据 */
  function getHistoryPos() {
    return localStorage.qPos;
  }
  
  /* 设置localStorage.qPos数据 */
  function setHistoryPos(data) {
    localStorage.qPos = parseInt(data);
  }
  
  /* 写入localStorage题目数据 */
  function writeStorage() {
    postLocal.data[pos] = {
      "time": timeRecord,
      "duration": durationRecord,
      "frequency": 3,
      "isHint": 0,
      //isHint算法计算不出来
      "isTimeout": timeOut,
      "result": gloResult,
      "score": calcScore(gloResult),
      "postAnswer": gloPost
    }
    localStorage.setItem("postData", JSON.stringify(postLocal));
  }
  
  /* 创建复杂localStorage数据 */
  function createStorage() {
    var postLocal = {
      "config": [{
        "postUID": 555555
      }],
      "data": []
    }
  }
  
  /* 初始化localStorage数据 */
  function intialStorage() {}

  
/*
	功能函数
*/
  
  /* 单项成绩计算 */
  function calcScore(inputData) {
    if (!inputData) {
      return 0;
    } else {
      return 1.0;
    }
  }
  
  /* 计时器 */  
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
  
  /* 检测是否超时 */
  function isTimeout(input, plan) {
    if (input > plan) {
      return 1;
    } else {
      return 0;
    }
  }

  /*  选择、填空题布尔验证函数   */
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
	Layout函数
*/

  /* 初始化全局布局 */
  function intialLayout() {
	$('.nav-tabs > li').css({
	  'float': 'none',
	  'margin-bottom': '0'
	});
	$(".next").hide();
	$(".panel").hide();
  }
  
  /* 更新进度条动画 */
  function refreshProgress(time) {
    $(".progress-animate").remove();
    $(".fill-header").after("<div id=\"progress\" class=\"progress-animate\" <\/div>");
    $(".progress-animate").css({
      "animation-name": "process",
      "animation-duration": time + "s"
    });
  }
  
  /* 控制进度条动画动作 */
  function controlProgress(action) {
    if (action == 'pause') {
      $(".progress-animate").css({
        "animation-play-state": "paused"
      });
    } else if (action == 'play') {} else if (action == 'replay') {} else {
      return -1;
    }
  }
  
  /* 显示提示面板 */
  function showHint(pos) {
    $(".tab-pane:eq(" + pos + ")").find(".panel").show();
  }
  
  /* 跳转到指定题目位置 */
  function jumpPosition(pos, extra) {
    // $(".tab-pane").removeClass("active");
    //禁用首页active
    $(".tab-pane:eq(" + pos + ")").addClass("in active"); //获得local数据并定位显示
  }
  
  /* 显示下一题按钮 */
  function showNextBtn() {
    $(this).parent().parent().find('.next').show();
  }
  
  /* 更新答案验证后的提示UI */
  function markVali(type, obj, para) {
    switch (type) {
      case 'OT':
        $(this).addClass('answerTrue');
        break;
      case 'OF':
        $(this).addClass('answerFalse');
        $(this).siblings('[opt-order=\"' + para.answer + '\"]').addClass('answerTrue');
        break;
      case 'OFO':
        $(this).addClass('answerFalse');
        break;
      default:
        return -1;
    }
  }

  /*
  数据键值
   */
  var msg = [{
    "uid": 38872,
    "answer": "1",
    "validate": "exact",
    "time": 40
  }, {
    "uid": 38873,
    "answer": "3",
    "validate": "case",
    "time": 20
  }, {
    "uid": 38874,
    "answer": "2",
    "validate": "space",
    "time": 80
  }, {
    "uid": 38875,
    "answer": "1",
    "validate": "sc",
    "time": 90
  }];

});
