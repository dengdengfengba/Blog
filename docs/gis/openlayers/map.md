---
地图加载
---

## 创建一个地图实例

```html
<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="http://openlayers.org/en/v3.3.0/css/ol.css" type="text/css">
    <style>
      .map {
        height: 400px;
        width: 100%;
      }
    </style>
    <script src="http://openlayers.org/en/v3.3.0/build/ol.js" type="text/javascript"></script>
    <title>OpenLayers 3 example</title>
  </head>
  <body>
    <h2>My Map</h2>
    <div id="map" class="map"></div>
    <script type="text/javascript">
      var map = new ol.Map({
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
  </body>
</html>
```

## 浏览器显示

![markdown](https://img-blog.csdn.net/20150313101224878 "markdown")

## 剖析地图加载

1. 首先引入了ol的css和js文件

```html
<link rel="stylesheet" href="http://openlayers.org/en/v3.3.0/css/ol.css" type="text/css">
<script src="http://openlayers.org/en/v3.3.0/build/ol.js" type="text/javascript"></script>
```

2. 初始化地图

```js
var map = new ol.Map({
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
```

## 关于地图三要素

`github`的`openlayers`主页上的`map`定义显示：
 ```js 
ol.MapProperty = {
  LAYERGROUP: 'layergroup',
  SIZE: 'size',
  TARGET: 'target',
  VIEW: 'view'
};
 ```

说明地图加载需要 一个目标容器(`target`)、一个`view`、一个或多个图层(`layers`)。

关于view使用请看[view](/gis/openlayer/view.html) ，关于layers使用请看[layer](/gis/openlayer/layers.html)

## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/4422564)