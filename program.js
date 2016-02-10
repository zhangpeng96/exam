$(function(){
  /*
    全局CSS配置
  */

  $('.nav-tabs > li').css({'float':'none','margin-bottom':'0'});


  /*
    选择、填空题布尔验证
  */
  function validate(input1,input2,type){
    var str1 = $.trim(input1);
    var str2 = $.trim(input2);
    function delSpace(str){
      return str.replace(/\s+/g, "");
    }
    if(type=='exact'){
      if(str1==str2){
        return 1;
      }else{
        return 0;
      }
    }else if(type=='case'){
      if(str1.toLowerCase()==str2.toLowerCase()){
        return 1;
      }else{
        return 0;
      }
    }else if(type=='space'){
      if(delSpace(str1)==delSpace(str2)){
        return 1;
      }else{
        return 0;
      }
    }else if(type=='sc'){
      if(delSpace(str1.toLowerCase())==delSpace(str2.toLowerCase())){
        return 1;
      }else{
        return 0;
      }
    }
  }

  /*
    当前位置获得
  */
  pos = 0;

  /*
    下一题触发事件
  */
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    // 进入下一题
    var activeTab = $(e.target).attr('next-pos');

    // 声明全局变量pos
    pos = $(e.target).attr('open-pos');
    localStorage.qPos = pos; 
    $(".progress-animate").css({
      "animation-name:":"process",
      "animation-timing-function": "linear",
      "animation-duration": "30s"
    });

    //$(".progress-animate").stop();

    /*$(".progress-animate").remove();
    $(".fill-header").after("<div id=\"progress\" class=\"progress-back progress-animate\" style=\"animation-duration\"\:\""+String(msg[pos].time)+"s\"><\/div>");*/
    //$(".progress-animate").attr("animation-duration", String(msg[pos].time)+'s');
    /*$(".progress-animate").css({
      "animation-name:":"clear",
      "animation-name:":"process",
      "animation-duration":"30s"
    });*/
    // 更改进度条动画
    //$(".progress-animate").attr("animation-duration", "30s");
    //$(".progress-animate").removeAttr("animation-name").attr("animation-name", "process");
   
   /*removeClass("progress-animate").addClass("progress-animate");
    $("#progress").removeClass("progress-animate");
    $("#progress").addClass("progress-animate");*/
   /* $(".progress-animate").attr("animation-duration", String(msg[pos].time));
    alert("okl");*/

  });


  /*
    进入历史定位
  */
  if (!localStorage.qPos){

  }else if(localStorage.qPos==1){


  }else{
    $(".tab-pane").removeClass("active");
    $(".tab-pane:eq("+localStorage.qPos+")").addClass("in active");
  }


  /*
    数据键值
  */
  var msg = [
    {
        "uid": 38872,
        "answer": "1",
        "validate": "exact",
        "time": 40
    },
    {
        "uid": 38873,
        "answer": "3",
        "validate": "case",
        "time": 20
    },
    {
        "uid": 38874,
        "answer": "2",
        "validate": "space",
        "time": 80
    },
    {
        "uid": 38875,
        "answer": "1",
        "validate": "sc",
        "time": 90
    }
];

msg_str = JSON.stringify(msg);//将JSON对象转化成字符串
localStorage.setItem("str",msg_str);

  /*	$("div").click(function(){
  alert(msg[pos].uid);
      var str1 = $("#data1").val();
      var str2 = $("#data2").val();
      var type = $("#data3").val();
      alert(validate('A a','Aa','space'));*/
/*  });

    $.getJSON("msg.json",function(result){
        $(".active-tab").append(result[3].validate + "|");
      $.each(result, function(i, field){
        $(".active-tab").append(field.validate + " ");
      });
    });
*/

/*
  选择题判断机制
*/

    $(".tab-pane li").click(function(){
      // 由于选择器是在页面加载时就已经确定的，所以无法使用变量pos
      var input = $(this).attr('opt-order');
      if(validate(input, msg[pos-1].answer, msg[pos-1].validate)){
        $(this).addClass('answerTrue');
      }else{
        $(this).addClass('answerFalse');
        $(this).siblings('[opt-order=\"'+msg[pos-1].answer+'\"]').addClass('answerTrue');
      }
    });


/*
  计时函数
*/
  function timer(step){
    var getTime = parseInt(new Date().getTime()/1000);
    if(step=='start'){
      timeRecord = getTime;
    }else if(step=='stop'){
      timeRecord = (getTime-timeRecord);
    }else if(step=='clear'){
      timeRecord = 0;
    }
    return timeRecord;
  }

/*
  local储存
*/























/*
  timer('clear');
  $("#btn-start").click(function(){
    timer('start');
    $("#data").val(timeRecord);
  });
  $("#btn-stop").click(function(){
    timer('stop');    
    $("#data").val(timeRecord);
  });
*/











/*
    Debug
*/
function debug(){
  $("div").click(function(){    
    alert(
      'pos'+':'+pos+'\n'

      );
  });
}
//debug();








});