$(function(){
  /*
    全局CSS配置
  */
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var activeTab = $(e.target).attr('next-pos');
  });
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

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    pos = $(e.target).attr('open-pos');
    //声明全局变量pos
  });
/**/


  /*
    数据键值
  */
  var msg = [
    {
        "uid": 38872,
        "answer": "1",
        "validate": "exact",
        "time": 80
    },
    {
        "uid": 38873,
        "answer": "3",
        "validate": "case",
        "time": 40
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
      if(validate(input, msg[pos].answer, msg[pos].validate)){
        $(this).addClass('answerTrue');
      }else{
        $(this).addClass('answerFalse');
        $(this).siblings('[opt-order=\"'+msg[pos].answer+'\"]').addClass('answerTrue');
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