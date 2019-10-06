---
title: 动态点扩散效果
---

## 介绍

以前有这样一个需求：在地图上显示基站的覆盖范围。当时做完了之后发现其实这种效果其实有些类似在水中投入一个石头，水波扩散的效果。本篇就介绍此做法。

## 实例

1. 创建一个 DIV 元素，将其形状限制为圆形，并使用 CSS3 为其赋予动画：

```html
<div id="css_animation"></div>
```

```css
<style>
    #css_animation{
        height:50px; 
        width:50px;
        border-radius: 25px; 
        background: rgba(255, 0, 0, 0.9);

        transform: scale(0);
        animation: myfirst 3s;      
        animation-iteration-count: infinite;
    }

    @keyframes myfirst{
        to{
            transform: scale(2);
            background: rgba(0, 0, 0, 0);
        }
    }
  </style>
```

 ```js
var point_div = document.getElementById("css_animation");
var point_overlay = new ol.Overlay({
    element: point_div,
    positioning: 'center-center'
});
map.addOverlay(point_overlay);
point_overlay.setPosition( [11468382.41282299,3502038.887913635] );
 ```

首先，`var point_div = document.getElementById("css_animation")`;使其获得具有动画效果的HTML元素；然后将其赋予 `overlay` 的 element 参数，overlay 还有一个参数是 `positioning: 'center-center'`，表示 HTML 元素相对于 overlay 的定位点的方位，”center-center” 表示元素中心对准定位点中心；最后 `map.addOverlay(point_overlay)`; 将 overlay 添加到地图中，此时的 overlay 是不可见的，最后一行：point_overlay.setPosition([11468382.41282299,3502038.887913635]);设置了 overlay 可见元素（也就是具有动画的元素）的位置，这样动画元素就设置到相应的点了。

完整代码：

```html
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="./css/ol.css" type="text/css">
		<link rel="stylesheet" href="./css/common.css" type="text/css">
		<style>
			#css_animation{
				height:50px;
				width:50px;
				border-radius: 25px;
				background: rgba(255, 0, 0, 0.9);
				transform: scale(0);
				animation: myfirst 3s;
				animation-iteration-count: infinite;
			}
			@keyframes myfirst{
				to{
					transform: scale(2);
					background: rgba(0, 0, 0, 0);
				}
			}
		</style>
	</head>
	<body>
		<div id="css_animation"></div>
		<div id="map"></div>
	<script type="text/javascript" src="./js/jquery.min.js"></script>
	<script type="text/javascript" src="./js/ol.js"></script>
	<script type="text/javascript">
		var tian_di_tu_road_layer = new ol.layer.Tile({
			title: "天地图路网",
			source: new ol.source.XYZ({
				url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
			})
		});
		var tian_di_tu_annotation = new ol.layer.Tile({
			title: "天地图文字标注",
			source: new ol.source.XYZ({
				url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
			})
		});
		var map = new ol.Map({
			target: 'map',
			layers: [
				tian_di_tu_road_layer,
				tian_di_tu_annotation
			],
			controls: ol.control.defaults({}).extend([
				new ol.control.MousePosition({})
			]),
			view: new ol.View({
				center:  [11468382.41282299,3502038.887913635],
				zoom: 11
			})
		});
		var point_div = document.getElementById("css_animation");
		var point_overlay = new ol.Overlay({
			element: point_div,
			positioning: 'bottom-left',
			stopEvent: false
		});
		map.addOverlay(point_overlay);
		point_overlay.setPosition([11468382.41282299,3502038.887913635]);
	</script>
	</body>
</html>
```
