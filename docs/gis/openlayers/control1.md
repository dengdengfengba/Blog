---
title: 地图自定义控件
---

## 介绍

在openlayers 中的控件，是一个固定在页面某个位置的可见的DOM元素，它们可能包含可操作的按钮，也可能只是单纯的展示信息，它们的位置及其样式是由与其关联的CSS样式决定的。默认情况下，它们都位于一个CSS 类（class）为`ol.overlaycontainer-stopevent`的元素内，当然也可以使用其他的自定义的DOM容器元素。

在openlayers 的结构中，控件有很多，比如左上角的缩放控件、右下角的属性控件，这些控件都是继承一个基类 `ol.control.Control`，基类主要为它的子类提供统一的“`阻止事件传播机制`”，并且 `ol.control.Control`继承了 `ol.Object`，并且控件都放于一个统一的容器 `ol.Collection`，所以如果继承`ol.control.Control`基类，自定义的控件不仅可以得益于其“阻止事件传播机制”，也可以使用 `ol.Object`和`ol.Collection`的方法和事件。

## 自定义控件

`ol.control.Control`是`openlayers`的控件基类，我们的自定义控件可以继承该基类（在上边我们也讲了继承该基类的好处），在类中使用 javascript 动态创建DOM元素，指定DOM元素对应的CSS样式类（class），并对DOM元素绑定相应的事件，来完成自定义控件。ol 使用了google 的 closure 库来进行开发，要使用 closure 的语法来进行继承，比如我们定义我们的切换图层控件类为 `ol.control.Compass` ，那么使用closure实现继承的语句如下：

```js
ol.inherits(ol.control.Compass, ol.control.Control);    // 指定控件继承关系
```

我们要在控件类的‘构造函数’（加引号是因为javascript构造函数的概念不明显）中调用基类的构造函数，可以使用 call 或者 apply 方法（因为本质上javascript的类是函数模拟的），或者直接使用：`new ol.control.Control({element: myElement})`。

当然，我们完全可以不用继承`ol.control.Control`，但最好不要这样做，首先，继承基类有助于保持 openlayers 的组织结构清晰明了；其次，我们可以使用 `ol.control.Control`的‘阻止事件传播机制’，并且`ol.control.Control`继承了`ol.Object`，所以我们也可以使用它的方法。

具体实现（自定义ol指南针控件实现百度地图上的指南针效果）：

```js
ol.control.Compass = function(opt_options){
    var options = opt_options || {};      //参数
    
    this.reverseText = options.reverseText ? options.reverseText : '逆时针转动';    //title的提示信息
    this.recoveryText = options.recoveryText ? options.recoveryText : '恢复正北方向';
    this.forwordText = options.forwordText ? options.forwordText : '顺时针转动';

    var hiddenClassName = 'ol-unselectable';       　　　　　　　　　　　　　　//控件默认样式

    var compassClass = 'ol-compass';                                       //自定义控件样式

    this.element = document.createElement('div');                          //控件容器

    this.element.className = compassClass + ' ' + hiddenClassName;         //设置控件样式
    
    this.reverse = document.createElement('button');                　　　　//逆时针
    this.reverse.setAttribute('title', this.reverseText)            　　　　//设置提示逆时针的提示文字
    this.reverse.className = 'reverse';
    this.element.appendChild(this.reverse);
    
    this.recovery = document.createElement('button');               //恢复正北方向
    this.recovery.setAttribute('title', this.recoveryText)
    this.recovery.className = 'recovery';
    this.element.appendChild(this.recovery);
    
    this.forword = document.createElement('button');                //顺时针
    this.forword.setAttribute('title', this.forwordText);
    this.forword.className = 'forword';
    this.element.appendChild(this.forword);
    
    var this_ = this;                                                 // 存储当前指向的控件对象
    
    this.reverse.onclick = function(event){
        event = event || window.event;                                //获取event对象
        this_.reverseClick();;                                        //执行动作
        event.preventDefault();                                        //阻止事件冒泡
    };
    
    this.recovery.onclick = function(event){
        event = event || window.event;
        this_.recoveryClick();
        event.preventDefault();
    };
    
    this.forword.onclick = function(event){
        event = event || window.event;
        this_.forwordClick();
        event.preventDefault();
    };
    
    ol.control.Control.call(this,{
        element: this.element,
        target: options.target
    });
        
    ol.control.Compass.prototype.reverseClick = function(){
        var view = this.getMap().getView();
        var center = this.getMap().getView().getCenter();
        var rotation = this.getMap().getView().getRotation();
        view.animate({
            center: center,                                            //旋转中心点
            rotation: rotation - Math.PI/2,                        
            easing: ol.easing.easeOut                                //旋转速度
        })                                                            //逆时针旋转的角度为负 (-Math.PI/2 : -90°)
    };
    
    ol.control.Compass.prototype.recoveryClick = function(){
        var view = this.getMap().getView();
        var center = this.getMap().getView().getCenter();
        view.animate({
            center: center,
            rotation: 0,
            easing: ol.easing.easeOut
        })
    };
    
    ol.control.Compass.prototype.forwordClick = function(){
        var view = this.getMap().getView();
        var center = this.getMap().getView().getCenter();
        var rotation = this.getMap().getView().getRotation();
        view.animate({
            center: center,
            rotation: rotation + Math.PI/2,
            easing: ol.easing.easeOut
        })
    };

    ol.inherits(ol.control.Compass, ol.control.Control);            //指定控件继承关系

};  
```

初始化地图是添加至控件即可。

```js
controls: ol.control.defaults().extend([new ol.control.Compass()]);
```
