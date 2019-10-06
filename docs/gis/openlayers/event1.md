---
title: 地图鼠标右键事件
---

## 介绍

添加右键菜单，首先我们要监听鼠标右键点击的操作，我们知道鼠标右键事件名是 contextmenu，当鼠标在 html 元素之上，点击鼠标右键，便会触发 contextmenu 事件，在 contextmenu 事件的回调函数中实现相应的显示菜单功能即可。

那么在 ol 中，在地图中添加这个事件，首先我们得了解 openlayers 的初始化页面的过程，然后才能在相应的地方添加事件。

## ol初始化过程

openlayers 也是一个前端库，那么它肯定离不开 html 的运用，比如，我们首先需要在页面放置一个显示地图的 html 元素，一个 div 元素（假设其 id 属性设置为 “map”，后面简称为 map div），然后在地图初始化的时候指定这个元素，openlayers 会首先在这个元素中创建一个 class 为 `ol-viewport` 的 div 元素，其尺寸保持与 map div 相同，然后在 `ol-viewport` div 中创建一个 canvas 元素，在这个 canvas 元素中渲染请求到的地图；其次，还会添加一个 class 为 `ol-overlaycontainer` 的 div 元素，用来放置 overlay；最后，添加一个 class 为 `ol-overlaycontainer-stopevent` 的 div 元素，主要是放置 openlayers 的控件。具体实现如下：

![markdown](https://img-blog.csdn.net/20151227102246427 "markdown")

其实在 map div 元素添加事件，然后右键弹出菜单，着重注意解决三个问题: 

 - 首先，事件对象所含的坐标是相对于整个浏览器的视口、页面或者整个屏幕的
 - 其次，而显示地图的元素往往又是随意的大小和位置
 - 最后，屏幕的坐标系和地图的坐标系又往往完全不同，如何将相对与地图元素的坐标再转化为地图坐标系下的坐标？
      首先，我们需要获得事件坐标相对于 map div （包含地图的元素）的坐标，然后将相对于 map div 的坐标转化为地图中的实际坐标。第一步中，我们可以通过计算获得，但是第二步必须通过 openlayers 来完成，因为只有 openlayers 对地图的坐标系最清楚，这在 openlayers 中也有相关的功能。庆幸的是，openlayers 中我们可以一步完成上述操作，只需要一个函数：`map.getEventCoordinate(event)`。

## 具体实现

1. 对 html 元素添加 contextmenu 事件

因为浏览器都有默认的右键菜单，所以我们要取消默认的菜单，只要调用 e.preventDefault(); 即可：

```html
$(map.getViewport()).on("contextmenu", function(event){
    e.preventDefault();
    // 书写事件触发后的函数
});
```

2. 获取地图相应的点击坐标

```js
var coordinate = map.getEventCoordinate(event);
```

函数参数是 oncontextmenu 对应的事件对象，该函数包含对 map.getCoordinateFromPixel() 的调用，map.getCoordinateFromPixel() 参数为 ol.pixel，是一个坐标，数组格式[x, y]，其实现中又调用了 ol.vec.Mat4.multVec2()，该函数完成处理坐标转换的实际工作。

3. 地图相应位置添加菜单

这里我们结合 overlay 添加菜单。首先，我们在 html 页面添加一个目录，具体的 css 样式可以自己设定：

```html
<div id="contextmenu_container" class="contextmenu">
    <ul>
        <li><a href="#">设置中心</a></li>
        <li><a href="#">添加地标</a></li>
        <li><a href="#">距离丈量</a></li>
    </ul>
</div>
```

```js
var menu_overlay = new ol.Overlay({            //使用这个 html 元素初始化一个 overlay，并将 overlay 添加到地图中：
    element: document.getElementById("contextmenu_container"),
    positioning: 'center-center'
});
menu_overlay.setMap(map);

menu_overlay.setPosition(coordinate);        //在鼠标右键菜单的事件回调函数中，并根据获取的地图坐标位置，设置 overlay 的显示位置

```

4. 菜单隐藏

当我们鼠标点击右键，菜单出现，但是我们不能让菜单总是显示在地图中，这时我们可以添加鼠标左键单击，菜单消失功能，或者当选择某项功能时，菜单消失。这个比较容易实现，只要一句便可以实现，放在鼠标左键事件的回调函数或者菜单功能执行函数中就行，如下：

```js
menu_overlay.setPosition(undefined);
```


## 完整代码

```html
<!DOCTYPE HTML>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>contextmenu</title>
	<link rel="stylesheet" href="./css/ol.css" type="text/css">
	<link rel="stylesheet" href="./css/common.css">
	<style type="text/css">
  	.contextmenu{
  		position: absolute;
  		padding: 12px 0;
  		z-index: 9;
		background-color: white;
		width: 120px;
		border-radius: 4px;
  	}
  	.contextmenu ul{
  		padding: 6px 2px 0 2px;
  		list-style: none;
  	}
  	.contextmenu > ul > li{
  		text-align: center;
  		padding: 5px 0;
  	}
  	.contextmenu > ul > li:hover{
  		background-color: rgba(255, 0, 0, 0.5);
  	}
    </style>
  </head>
  <body>
  	<div id="contextmenu_container" class="contextmenu">
  		<ul>
  			<li><a href="#">设置中心</a></li>
  			<li><a href="#">添加地标</a></li>
  			<li><a href="#">距离丈量</a></li>
  		</ul>
  	</div>

  	<div id="map"></div>

  	<script type="text/javascript" src="./js/jquery.min.js"></script>
  	<script type="text/javascript" src="./js/ol.js"></script>
  	<script type="text/javascript">
  		var map = new ol.Map({
  			target: document.getElementById("map"),
  			layers: [
  				new ol.layer.Tile({
  					source: new ol.source.OSM()
  				})
  			],
  			view: new ol.View({
  				center: [12977452.2662, 4847790.3422],
  				zoom: 9
  			})
  		});
  		var menu_overlay = new ol.Overlay({
  			element: document.getElementById("contextmenu_container"),
  			positioning: 'center-center'
  		});
  		menu_overlay.setMap(map);
  		$(map.getViewport()).on("contextmenu", function(e){
  			e.preventDefault();
  			var coordinate = map.getEventCoordinate(e);
  			menu_overlay.setPosition(coordinate);
  		});
  		$(map.getViewport()).on("click", function(e){
  			e.preventDefault();
  			menu_overlay.setPosition(undefined);
  		});
  	</script>
  </body>
</html>
```


## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/50372053)

