---
layout: post
title: jquery学习笔记2(效果)
date: 2016-10-23 11:12:00

---

##jquery隐藏和显示
hide/show函数: $("p").show(); 或者$("p").hide();
toggle()函数 切换隐藏和显示。

##jquery淡入淡出
fadeIn(speed,callback) 渐渐显示(淡入)
fadeOut(...) 渐渐显示(淡出)
fadeToggle()切换 淡入淡出
fadeTo(速度，透明度，callback) 调整透明度0-1之间值

##jquery滑动效果
像投影屏幕收起或下拉一样的效果
slideDown()    滑下面板
slideUp()      收起面板
slideToggle()  切换Down/up


##jquery 动画操作
$(selector).animate({params},speed,callback);

例如：
```js
$("button").click(function(){
  $("div").animate({left:'250px'});
});
或者 多个属性操作
$("button").click(function(){
  $("div").animate({
    left:'250px',
    opacity:'0.5',
    height:'150px',
    width:'150px'
  });
});
```

##jquery停止动画

stop函数,或者带参数$(selector).stop(stopAll,goToEnd);
stopall参数默认false，表示只停止当前动画，队列中其他的动画继续执行
goToEnd参数默认false表示，不立即完成当前动画，多个动画时，多次点击能依次停止各个动画

##jquery callback函数

许多jquery动画函数会有speed参数或者duration(持续) slow/fast/normal
然后第二个参数写一个回调函数，动画完成后会执行。

##jquery的Chaining(链式)操作
可以接连在一个元素上执行多个函数操作，这样就不用寻找同一个元素多次。俗称：链式操作
例如：
```js
$("##p1").css("color","red").slideUp(2000).slideDown(2000);
//p元素变红色，然后上滑，再下滑
```
