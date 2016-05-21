/*
    四角鸣墨题库(New Version) 填空校对题
    version: 3.2.24
    date:  2016/5/21 11:11
*/
$(function() {

/*
    数据函数
*/
  
  /* 闭包函数实现的私有变量调用 */
function accessData(){
  var entry = {
      uid: 1,
      time: 140000000,
      duration: 40,
      frequency: 2,
      isHint: 0,
      isTimeout: 1,
      result: 1,
      score: 1.0,
      postAnswer: 'your answer'
  };  // 当前条目的数据缓存区
  var status = {
      type: 1,
      pos: 0,
      count: 0
  };  // 常用的状态数据
  var postLocal = new Array(5);
      // 本地数据存储
  var reserve;
      // 保留数据
  var temp;
      // 临时数据
  return {
      inital: function(){

      },
      entClear: function(){

      },
      entSet: function(key, value){
          switch(key){
            case 'uid':
              entry.uid = value;
            break;
            case 'time':
              entry.time = value;
            break;
            case 'duration':
              entry.duration = value;
            break;
            case 'frequency':
              entry.frequency = value;
            break;
            case 'isHint':
              entry.isHint = value;
            break;
            case 'isTimeout':
              entry.isTimeout = value;
            break;
            case 'result':
              entry.result = value;
            break;
            case 'score':
              entry.score = value;
            break;
            case 'postAnswer':
              entry.postAnswer = value;
            break;
            default:
              return -1;
            }
      },
      entRead: function(key){
          switch(key){
            case 'uid':
              return entry.uid;
            break;
            case 'time':
              return entry.time;
            break;
            case 'duration':
              return entry.duration;
            break;
            case 'frequency':
              return entry.frequency;
            break;
            case 'isHint':
              return entry.isHint;
            break;
            case 'isTimeout':
              return entry.isTimeout;
            break;
            case 'result':
              return entry.result;
            break;
            case 'score':
              return entry.score;
            break;
            case 'postAnswer':
              return entry.postAnswer;
            break;
            default:
              return -1;
          }
      },
      setLocal: function() {
          postLocal[status.pos] = {
            "uid" :     entry.uid,
            "time":     entry.time,
            "duration": entry.duration,
            "frequency":entry.frequency,
            "isHint":   entry.isHint,
            "isTimeout":entry.isTimeout,
            "result":   entry.result,
            "score":    entry.score,
            "postAnswer":entry.postAnswer
          };
          return 1;
      },
      readLocal: function() {
          return postLocal;
      },
      posInc: function(){
          status.pos ++;
      },  //位置标志递增
      posDec: function(){
          status.pos --;
      },  //位置标志递减
      posSet: function(despos){
          status.pos = despos;
      },  //指定位置标志
      posRead: function(){
          return status.pos;
      },  //读取位置标志
      posReac: function(){
          return (status.pos-1);
      },
      debug: function(){
        console.log(entry);
      }
  }
  // 闭包结构
}
  
  /* 获得localStorage.qPos数据 */
  function getHistoryPos() {
    return localStorage.qPos;
  }
  
  /* 设置localStorage.qPos数据 */
  function setHistoryPos(data) {
    localStorage.qPos = parseInt(data);
  }

  
  /* 创建复杂localStorage数据 */
/*  function createStorage() {
    var postLocal = {
      "config": [{
        "postUID": 555555
      }],
      "data": []
    }
  }*/
  
  /* 初始化localStorage数据 */
  function intialStorage() {
    var postLocal = {
      "config": [{
        "postUID": 555555,
        "userID": 20143333,
        "listUID": 123522200344,
        "timestamp": 100000000
      }],
      "data": []
    };
    e.setLocal(postLocal);
    localStorage.setItem("postData", JSON.stringify(e.readLocal()) );
  }

  
  /* 写入localStorage题目数据 */
  function writeStorage() {
    localStorage.setItem("postData", JSON.stringify(e.readLocal()) );
  }

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
  
  /* 计时器（闭包式） */  

  function timer() {
    var beginning;
    var termination;
    var duration;
    var now = (function(){
      return parseInt(new Date().getTime() / 1000);
    });
    return {
      start : function(){
        beginning = now;
      },
      stop : function(){
        termination = now;
        duration = termination - beginning;
        return duration;
      },
      begin: function(){
        return beginning;
      },
      length : function(){
        return duration;
      },
      clear : function(){
        beginning = NULL;
        termination = NULL;
        duration = NULL;
        return 1;
      },
      debug : function(){
        console.log("beginning:"+beginning+"|"+"termination:"+termination+"|"+"duration"+duration);
      }
    };
  }
  var a = timer();
  a.start;
  a.debug;
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
  $(".btn-rank").hide();
  $(".box-key").hide();
  }
  
  /* 更新进度条动画 */
  function refreshProgress(time) {
    $(".progress-animate").remove();
    // DOM整体移除
    $(".fill-header").after("<div id=\"progress\" class=\"progress-animate\" <\/div>");
    // DOM手动加入
    $(".progress-animate").css({
      "animation-name": "process",
      "animation-duration": time + "s"
    });
    // 手动设置CSS与动画过渡时长
  }
  
  /* 控制进度条动画动作 */
  function controlProgress(action) {
    if (action == 'pause') {
      $(".progress-animate").css({
        "animation-play-state": "paused"
      });
    } else if (action == 'play') {
      $(".progress-animate").css({
        "animation-play-state": "play"
      });
    } else if (action == 'replay') {
      // 该功能未通过理论验证
      $(".progress-animate").css({
        "animation-play-state": "play"
      });
    } else {
      return -1;
    }
  }
  
  /* 显示提示面板 */
  function showHint(pos) {
    $(".tab-pane:eq(" + pos + ")").find(".panel").show();
  }
  
  /* 跳转到指定题目位置 */
  function jumpPosition(pos, extra) {
    $(".tab-pane").removeClass("active");
    // 撤销所有活动table
    $(".tab-pane:eq(" + pos + ")").addClass("in active");
    // 获得local数据并定位显示
    e.posInc(pos);
    // 修改位置标志
  }
  
  /* 显示下一题按钮 */
  function showNextBtn(obj) {
    obj.parent().parent().find('.next').show();
  }
  
  /* 更新答案验证后的提示UI */
  function markVali(type, obj, para) {
    switch (type) {
      case 'OT':
        obj.addClass('answerTrue');
        break;
      case 'OF':
        obj.addClass('answerFalse');
        obj.siblings('[opt-order=\"' + para.answer + '\"]').addClass('answerTrue');
        break;
      case 'OFO':
        obj.addClass('answerFalse');
        break;
      default:
        return -1;
    }
  }

  function nextQue() {    
    
  }

  /*
  功能逻辑
  */
  intialLayout();
  // 布局初始化
  var e = accessData();
  console.log(e.posRead());
  // entry初始化
   $(".btn-submit").click(function(){
      var pos = e.posRead();
      var input = $(this).siblings('.elastic-input').val();
      $(this).siblings('.box-key').show();
      $(this).siblings('.btn-rank').show();
      $(this).hide();
      e.entSet('postAnswer', $(this).siblings('.input-ans').find('.elastic-input').val() );
  });
   $(".btn-rank li").click(function(){
      var clickRank = parseInt($(this).text());      
      e.entSet('result', clickRank );
      console.log(clickRank);
      showNextBtn($(this));    
   })/*
  e.entSet('uid', msg[e.posRead()] );
  e.entSet('time', msg[e.posRead()] ); */
  e.debug();


  $('a[data-toggle="tab"]').click(function(){
    writeStorage();
    refreshProgress(msg[e.posRead()].time);
    e.posInc();
  })

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
