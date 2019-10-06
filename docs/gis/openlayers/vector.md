---
title: 地图矢量图层
---

## 介绍

在 GIS 中，地图一般分为两大类：**栅格地图**和**矢量地图**，**栅格地图**其实就是数码照片，只不过有的是卫星拍的。它们有一个共同特征，就是它们都是由很多个像素组成，像素大小是一致的，行高和列宽是一致的，从这个角度看，一幅遥感影像就像栅格。而**矢量地图**，是由很多要素组成的，每个要素都有自己的地理坐标，基于数学规则，无论矢量地图怎么放大，地图都不会失真。它是 `OpenLayers` 中非常重要的一种图层类型，利用矢量地图可以实现非常多的功能，如 **动态标绘**、**调用WFS 服务**、**编辑要素**、**可点击的要素**、**动态加载要素** 等等。

## 图层构成

矢量图层是在客户端渲染的，在 web 环境中，对应的就是浏览器。构成一个矢量图层的包含一个数据（`source`）和一个样式（`style`），数据构成矢量图层的要素，样式规定要素显示的方式和外观。一个初始化成功的矢量图层包含一个到多个要素（`feature`），每个要素由地理属性（`geometry`）和多个其他的属性，可能包含名称等。结构如下图：

![markdown](https://img-blog.csdn.net/20150605145054554 "markdown")

在初始化矢量图层时，可以有很多选项配置矢量图层的行为和外观，常用的有：
 - brightness、contrast，图层亮度和对比度，都是一个数值
 - renderOrder，一个指定规则的函数 (function(ol.Feature, ol.Feature))
 - hue，色调，是一个数值
 - minResolution，可见的最小分辨率
 - maxResolution，可见的最大分辨率
 - opacity，图层的透明度，0～1之间的数值，1表示不透明
 - saturation，饱和度
 - source，图层数据来源
 - style，图层样式，一个ol.style.Style或者一个ol.style.Style数组，或者一个返回 ol.style.Style 的函数
 - visible，图层可见性，默认为 true

## 初始化图层

```js
var vector = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'data/china_province_boundries.geojson',
    projection: 'EPSG:3857',
    format: new ol.format.GeoJSON({
        extractStyles: false
    })
  }),
  style: style
});
```

例中的 `source url` 设置了数据的来源，`projection` 设置了地理坐标系，`format` 设置 数据的解析器，因为 url 规定的数据来源是 `geojson` 格式，所以解析器也是 `geojson` 解析器 `new ol.format.GeoJSON`。

## 取得元素

利用 `getGeometry()` 可以获得要素的地理属性，这个函数当然返回要素包含的 `geometry`，`geometry` 包含很多类型，主要有 `point`、`multi point`、`linear ring`、`line string`、`multi line string`、`polygon`、`multi polygon`、`circle`。

取得 `geometry` 后，就可以获得要素的坐标了，可以根据坐标做一些地理判断，比如判断 一个坐标是否位于要素内（`containsCoordinate(coordinate)` 或者 `containsXY(x, y)`），取得要素的中心坐标等。
————————————————

## 总结

使用矢量图层，可以实现很多功能，比如**动态加载矢量数据**、**调用 WFS 服务**、**动态标绘**、**编辑要素**，分别是在**图层级别**和**要素级别**进行的操作。

例如可以实现，在矢量图层上绘制不同的图形，并添加属性，然后更新至数据库，即动态标绘系统；或者动态加载要素级数据，比如跟踪汽车的轨迹。

## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/46397803)