---
title: 地图弹出框
---

## 介绍

在ol中，其overlay初始属性如下：

```js

/**
* @enum {string}
*/
ol.OverlayProperty = {
  ELEMENT: 'element',
  MAP: 'map',
  OFFSET: 'offset',
  POSITION: 'position',
  POSITIONING: 'positioning'
};
```

其中，ELEMENT代表要转换成overlay的HTML元素，可能是一个DIV标签，MAP是要绑定的地图对象，POSITION是点击时Popup放置的位置。

但为了产生弹出框的效果，那么HTML、js等也要有相应的元素：

```html
<div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content" style="width:300px; height:120px;"></div>
</div>
```

```js
var container = document.getElementById('popup');
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250   //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度. 
  }
}));
```

map绑定事件为弹出框触发弹出：

```js

/**
 * Add a click handler to the map to render the popup.
 */
map.addEventListener('click', function(evt) {
  var coordinate = evt.coordinate;
  var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
      coordinate, 'EPSG:3857', 'EPSG:4326'));
  content.innerHTML = '<p>你点击的坐标是：</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);
  map.addOverlay(overlay);
});
```

这里为了最大程度兼容各个浏览器，我们使用了DOM0级绑定事件的方式，event对象（evt）保存着点击的点坐标，在相应的位置显示框框即可（overlay.setPosition()），最后，将popup加到地图上。

效果展示：

![markdown](https://img-blog.csdn.net/20150318172251920 "markdown")



完整代码展示：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="http://openlayers.org/en/v3.3.0/css/ol.css" type="text/css">
    <style>
      .map {
        height: 400px;
        width: 100%;
      }
      .ol-popup {
        position: absolute;
        background-color: white;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #cccccc;
        bottom: 12px;
        left: -50px;
      }
      .ol-popup:after, .ol-popup:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }
      .ol-popup:after {
        border-top-color: white;
        border-width: 10px;
        left: 48px;
        margin-left: -10px;
      }
      .ol-popup:before {
        border-top-color: #cccccc;
        border-width: 11px;
        left: 48px;
        margin-left: -11px;
      }
      .ol-popup-closer {
        text-decoration: none;
        position: absolute;
        top: 2px;
        right: 8px;
      }
      .ol-popup-closer:after {
        content: "✖";
      }
    </style>
    <title>OpenLayers 3 example</title>
  </head>
  <body>
    <h2>My Map</h2>
    <div id="map" class="map">
        <div id="popup" class="ol-popup">
            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
            <div id="popup-content" style="width:300px; height:120px;"></div>
        </div>
    </div>
    <script src="http://openlayers.org/en/v3.3.0/build/ol.js" type="text/javascript"></script>
    <script type="text/javascript">
      map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          })
        ],
        view: new ol.View({
          center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
          zoom: 4
        })
      });
    </script>
    <script src="popup.js" type="text/javascript"></script>
  </body>
</html>
```

popup.js:

```js
/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
 
 
/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};
 
 
/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250   //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度. 单位为毫秒（ms）
  }
}));
 
 
/**
 * Add a click handler to the map to render the popup.
 */
map.addEventListener('click', function(evt) {
  var coordinate = evt.coordinate;
  var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
      coordinate, 'EPSG:3857', 'EPSG:4326'));
  content.innerHTML = '<p>你点击的坐标是：</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);
  map.addOverlay(overlay);
});
```

## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/44415631)

