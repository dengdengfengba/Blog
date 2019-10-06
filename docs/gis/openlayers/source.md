---
title: 地图图层数据来源
---

## 介绍

source 是 Layer 的重要组成部分，表示图层的来源，也就是服务地址。除了在构造函数中制定外，可以使用 `layer.setSource(source)` 稍后指定。

## 包含的类型

 - ol.source.BingMaps: 必应地图的切片数据，继承自ol.source.TileImage
 - ol.source.Cluster: 聚簇矢量数据，继承自ol.source.Vector
 - ol.source.ImageCanvas: 数据来源是一个 canvas 元素，其中的数据是图片，继承自 ol.source.Image
 - ol.source.ImageMapGuide: Mapguide 服务器提供的图片地图数据，继承自 ol.source.Image，fire ol.source.ImageEvent
 - ol.source.ImageStatic: 提供单一的静态图片地图，继承自ol.source.Image
 - ol.source.ImageVector: 数据来源是一个 canvas 元素，但是其中的数据是矢量来源 ol.source.Vector，继承自ol.source.ImageCanvas
 - ol.source.ImageWMS: WMS 服务提供的单一的图片数据，继承自 ol.source.Image，触发 ol.source.ImageEvent
 - ol.source.MapQuest: MapQuest 提供的切片数据，继承自 ol.source.XYZ
 - ol.source.OSM: OpenStreetMap 提供的切片数据，继承自 ol.source.XYZ
 - ol.source.Stamen: Stamen 提供的地图切片数据，继承自 ol.source.XYZ
 - ol.source.TileVector: 被切分为网格的矢量数据，继承自 ol.source.Vector
 - ol.source.TileDebug: 并不从服务器获取数据，而是为切片渲染一个网格，继承自 ol.source.Tile
 - ol.source.TileImage: 提供切分成切片的图片数据，继承自 ol.source.Tile，触发 ol.source.TileEvent
 - ol.source.TileUTFGrid: TileJSON 格式 的 UTFGrid 交互数据，继承自 ol.source.Tile
 - ol.source.TileJSON: TileJSON 格式的切片数据，继承自 ol.source.TileImage
 - ol.source.TileArcGISRest: ArcGIS Rest 服务提供的切片数据，继承自 ol.source.TileImage
 - ol.source.WMTS: WMTS 服务提供的切片数据。继承自 ol.source.TileImage
 - ol.source.XYZ: XYZ 格式的切片数据，继承自 ol.source.TileImage
 - ol.source.Zoomify: Zoomify 格式的切片数据，继承自 ol.source.TileImage

上面介绍的都是可以实例化的类，还有一部分基类，不能被实例化，只负责被继承，有：

 - ol.source.Image，提供单一图片数据的类型，直接继承自 ol.source.Source
 - ol.source.Tile，提供被切分为网格切片的图片数据，继承自 ol.source.Source
 - ol.source.Vector，提供矢量图层数据，继承自 ol.source.Source

## ol.source.Vector 用法说明

矢量图层的数据来源

### 事件

包含四个事件，`addfeature`，`changefeature`，`clear`，`removefeature`: 

 - addfeature，当一个要素添加到 source 中触发
 - changefeature，当要素变化时触发
 - clear，当 source 的 clear 方法调用时候触发
 - removefeature，当要素移除时候发生

### 参数

官方介绍：

```js
/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *     features: (Array.<ol.Feature>|undefined),
 *     format: (ol.format.Feature|undefined),
 *     loader: (ol.FeatureLoader|undefined),
 *     logo: (string|olx.LogoOptions|undefined),
 *     strategy: (ol.LoadingStrategy|undefined),
 *     url: (string|undefined),
 *     wrapX: (boolean|undefined)}}
 * @api
 */
```

 - attribution，地图右下角的 logo 包含的内容
 - features，地理要素，从字符串读取的数据
 - format，url属性设置后，加载要素使用的数据格式，采用异步的 AJAX 加载
 - loader，加载要素使用的加载函数
 - logo，logo包含的内容
 - strategy，加载要素使用的策略，默认是 一次性加载所有要素
 - url，要素数据的地址
 - wrapX，是否在地图水平坐标轴上重复，默认是 true

### 实例

features 方法
假如有一个包含空间数据的字符串，geojsonObject，是GeoJSON字符串格式，那么可以用来初始化一个图层。

```js
var vectorSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: style
});

map.addLayer(vectorLayer);议，转载请附上原文出处链接及本声明。
```

url + format 方法
如果有一个文件作为数据源，那么可以配置 url 属性来加载数据：

```js
var vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'data/geojson/countries.geojson',
    format: new ol.format.GeoJSON()
  })
});
```

这两种方法中都会指定数据来源格式， 矢量数据源支持的格式包含很多：`gml`、`EsriJSON`、`geojson`、`gpx`、`igc`、`kml`、`osmxml`、`ows`、`polyline`、`topojson`、`wfs`、`wkt`、`wms capabilities`（兼容 wms 的格式）、 `wms getfeatureinfo`、 `wmts capabilities`、`xlink`、`xsd`等格式。这些格式都有`readFeatures `、`readFeature` 和`readGeometry `方法用于读取数据。

## ol.source.Tile 用法说明

提供被切分为切片的图片地图数据

官方介绍：

```js
/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *            extent: (ol.Extent|undefined),
 *            logo: (string|olx.LogoOptions|undefined),
 *            opaque: (boolean|undefined),
 *            tilePixelRatio: (number|undefined),
 *            projection: ol.proj.ProjectionLike,
 *            state: (ol.source.State|undefined),
 *            tileGrid: (ol.tilegrid.TileGrid|undefined),
 *            wrapX: (boolean|undefined)}}
 */
```

可以配置的选项(与 vector 一样的选项就不介绍了，介绍特有的选项):

 - extent，地图视图默认的坐标范围
 - opaque，不透明与否，一个布尔值，默认 false
 - tilePixelRatio，切片的大小调整选项，如 256 × 256，和 512 × 512
 - projection，投影
 - state，地图所处的状态，包括undefined，loading，ready，error
 - tileGrid，覆盖在地图上的格网

接受的事件： 

 - tileloadstart，切片开始加载时触发的事件
 - tileloadend，切片加载完毕触发事件
 - tileloaderror，切片加载出错时的处理

## ol.source.Image 用法说明

提供单一的图片地图。

官方介绍：

```js
/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *            extent: (null|ol.Extent|undefined),
 *            logo: (string|olx.LogoOptions|undefined),
 *            projection: ol.proj.ProjectionLike,
 *            resolutions: (Array.<number>|undefined),
 *            state: (ol.source.State|undefined)}}
 */
```

可以配置的选项(与 vector 一样的选项就不介绍了，介绍特有的选项):

 - resolutions，地图分辨率。其他的选项都与以上的一样

触发的事件：

 - imageloadstart，图片地图开始加载触发的事件
 - imageloadend，图片地图加载完毕触发的事件
 - imageloaderror，图片地图加载出错时触发的事件

## 总结

source 是 layer 中必须的选项，定义着地图数据的来源，与数据有关的函数，如`addfeature`、`getfeature`等函数都定义在 source 中，而且数据源支持多种格式。

## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/45950125)
