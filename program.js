/*
    四角鸣墨题库(New Version)
    version: 3.0.2
    date:  2016/2/13 20:29
*/
$(function(){
  /*
    全局CSS配置
  */
  $('.nav-tabs > li').css({'float':'none','margin-bottom':'0'});
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
    题目成绩计算函数
  */
  function calcScore(inputData){
    if(!inputData){
      return 0;
    }else{
      return 1.0;
    }
  }


  /*
    下一题触发事件
  */
    // 进入下一题
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var activeTab = $(e.target).attr('next-pos');

    // 声明全局变量pos
    pos = $(e.target).attr('open-pos');
    localStorage.qPos = pos;

    // 更改并载入进度条动画
    $(".progress-animate").remove();
    $(".fill-header").after("<div id=\"progress\" class=\"progress-back progress-animate\" <\/div>");
    $(".progress-animate").css({
      "animation-name":"process",
      "animation-duration": msg[pos-1].time+"s"
    });
    var timeOut = (durationRecord>msg[pos-1].time)?true:false;
    // 添加post数据
    postLocal.data[pos] =  {
                "time": timeRecord,
                "duration": durationRecord,
                "frequency": 3,
                "isHint": gloHint,
                "isTimeout": timeOut,
                "result": gloResult,
                "score": calcScore(gloResult),
                "postAnswer": gloPost
            }

    // 将post数据存入localStorage
    localStorage.setItem("postData",JSON.stringify(postLocal));

    // 开始下一题的计时
    timer('start');
    gloHint = 0;
  });

  $("#getTip").click(function(){
    $(".tab-pane:eq("+pos+")").find(".panel").show();
    gloHint = 12;
  })
/**/
  /*
    进入历史定位
  */
  if (!localStorage.qPos){
  }else if(localStorage.qPos==1){
  }else{
    $(".tab-pane").removeClass("active");   //禁用首页active
    $(".tab-pane:eq("+localStorage.qPos+")").addClass("in active"); //获得local数据并定位显示
  }




/*
  选择题判断机制
*/

    $(".tab-pane li").click(function(){
      // 计时停止
      timer('stop');
      //
      // 由于选择器是在页面加载时就已经确定的，所以无法使用变量pos
      var input = $(this).attr('opt-order');
      gloPost = input;
      // 显示「下一题」按钮
      $(this).parent().parent().find('.next').show();     

      // 题目result返回数据
      if(validate(input, msg[pos-1].answer, msg[pos-1].validate)){
        $(this).addClass('answerTrue');
        gloResult = true;
      }else{
        $(this).addClass('answerFalse');
        $(this).siblings('[opt-order=\"'+msg[pos-1].answer+'\"]').addClass('answerTrue');
        gloResult = false;
      }
      // 进度条暂停
      $(".progress-animate").css({
        "animation-play-state":"paused"
      });

    });


  /*
    计时函数
  */
  function timer(step){
    var getTime = parseInt(new Date().getTime()/1000);
    if(step=='start'){
      timeRecord = getTime;
    }else if(step=='stop'){
      durationRecord = (getTime-timeRecord);
    }else if(step=='clear'){
      timeRecord = 0;
    }
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

  /*
    local储存
  */
  var postLocal = {
      "config": [
          {
              "postUID": 555555
          }
      ],
      "data": [
      ]
  }
























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


/*
{
    "config": [
        {
            "postUID": 555555
        }
    ],
    "data": [
        {
            "time": 15533722,
            "duration": 26,
            "frequency": 3,
            "isHint": 4,
            "isTimeout": true,
            "result": true,
            "score": 0.9,
            "postAnswer": "4"
        },
        {
            "time": 15533722,
            "duration": 26,
            "frequency": 3,
            "isHint": 4,
            "isTimeout": true,
            "result": true,
            "score": 0.9,
            "postAnswer": "4"
        }
    ]
}

  $("div").click(function(){
  alert(msg[pos].uid);
      var str1 = $("#data1").val();
      var str2 = $("#data2").val();
      var type = $("#data3").val();
    alert(validate('A a','Aa','space'));
  });

    $.getJSON("msg.json",function(result){
        $(".active-tab").append(result[3].validate + "|");
      $.each(result, function(i, field){
        $(".active-tab").append(field.validate + " ");
      });
    });
*/