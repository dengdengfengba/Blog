---
title: 地图图层
---

## layers类

`layers`定义：

```js
/**
* @classdesc
* Abstract base class; normally only used for creating subclasses and not
* instantiated in apps.
* A visual representation of raster or vector map data.
* Layers group together those properties that pertain to how the data is to be
* displayed, irrespective of the source of that data.
*/
```

layer 是一个虚基类，只用于让子类型继承和实现，自身不能实例化。

主要功能是对 矢量地图数据 和 栅格地图数据的可视化表达。图层的外观，主要与数据渲染方式有关，与数据的来源关系不大。

其主要继承子类有：热度图层(`heatmaplayer`)、图片图层(`imagelayer`)、切片图层(`tilelayer`) 和 矢量图层(`vectorlayer`) 四种类型，它们都是继承 `Layer` 类的。

初始化传值参数有：
 - brightness: 亮度，默认为 0
 - contrast: 对比度，默认为 1
 - hue: 色调，默认为0
 - opacity: 透明度，默认为 1 ，即完全透明
 - saturation: 饱和度，默认为 1
 - source: 图层的来源，如果在构造函数中没有传入相应的参数，可以调用 `ol.layer.Layer#setSource`方法来设置来源：      layer.setSource(source)
 - visible: 是否可见，默认为 true
 - extent: 图层渲染的区域，即浏览器窗口中可见的地图区域。`extent` 是一个矩形范围，格式是`[number, number, number, number]` 分别代表`[left, bottom, right, top]`。如果没有设置该参数，图层就不会显示
 - minResolution: 图层可见的最小分辨率，当图层的缩放级别小于这个分辨率时，图层就会隐藏
 - maxResolution: 图层可见的最大分辨率，当图层的缩放级别等于或超过这个分辨率时，图层就会隐藏

包含的共有方法：
 - getLayersArray( ): 得到所有图层组成的数组；
 - getLayerStatesArray( ): 得到所有图层状态组成的数组；
 - getSource( ): 得到相应图层的来源；
 - getSourceState( ): 得到相应图层的来源状态；
 - handleSourceChange_( ): 处理 `source` 变动的函数；
 - handleSourcePropertyChange_( ): 处理 `source` 属性变动的函数；
 - setSource( ): 设置图层 `source` 属性，参数为一个 `source` 对象。

包含的私有方法有：
 - visibleAtResolution( )，参数是 `layerState` 和 `resolution`，如果图层可见，返回 true ，如果传入了 `resolution`，也会比较 `resolution` 是否在 `minResolution` 和 `maxResolution` 之间。

在初始化传值参数中，[source](/gis/openlayer/source.html)是一个比较重要的属性，没有它，图层就没有实质性内容，这个 `source` 是什么呢，打开 `ol.source` 目录可以看到，有一个 `source` 基类，其余都是继承其的子类，这些子类非常的多：
 + imagesource.js（imagelayer的图层来源基类）
   - imagecanvassource.js
   - imagemapguidesource.js
   - imagestaticsource.js
   - imagevectorsource.js
   - imagewmssource.js

 + tilesource.js（切片图层 – tilelayer的来源基类）
   - tilearcgisrestsource.js
   - tiledebugsource.js
   - tilejsonsource.js
   - tileutfgridsource.js
   - tilevectorsource.js
   - tilewmssource.js
   - tileimagesource.js
        + zoomifysource.js
        + wmtssource.js，具有 WMTS 功能的服务器的发布的切片图层
        + bingmapssource.js，bingmaps也是属于切片图层类型，因为微软提供的是切片
        + xyzsource.js，一个具有 XYZ 格式的数据集
            - mapquestsource.js
            - osmsource.js
            - stamensource.js

 + vectorsource.js（vectorlayer的图层来源基类）
    - clustersource.js

 + wmssource.js，包含了 geoserver 、geoserver 、geoserver 和 geoserver 等，这些地图服务器发布的基于 WMS 协议的图层服务

地图图层数据的来源有很多，同时格式也各异。实际应用，应该根据实际情况进行选择。

## 图层类型

在`OpenLayers`中，`Layer` 类型包括 `heatmaplayer`、`imagelayer`、`tilelayer` 和 `vectorlayer` 四种类型，它们都继承了 `ol.layer.Layer` 类，监听和触发的事件都在`ol.render.Event`中定义，共用的属性和状态都是在`layerbase`中定义的，它们除了从`ol.layer.Layer` 类继承而来的参数外，还定义了自己的属性和方法。

## heatmaplayer

将矢量数据渲染成热度图的类，继承自` ol.layer.Vector`类，`ol.layer.Vector`继承了`ol.layer.Layer` 类， 额外的参数是 `olx.layer.HeatmapOptions` ，其定义如下：

```js
/**
 * @enum {string}
 */
ol.layer.HeatmapLayerProperty = {
  BLUR: 'blur',
  GRADIENT: 'gradient',
  RADIUS: 'radius'
};
```

我们发现`heatmaplayer`图层比起其它类型的图层多了三个属性，常用的是 `blur` 和 `radius`，这两个属性什么作用呢，我们可以调整一下看看效果：

![markdown](https://img-blog.csdn.net/20150423001148367 "markdown")

没错，`blur` 控制圆点的边缘，对边缘做模糊化； `radius` 则规定了圆点的半径。注：并不是点，而是圆。

### 实例

首先创建一个 `heatmaplayer` 对象：

```js
var vector = new ol.layer.Heatmap({
  source: new ol.source.KML({
    url: 'data/kml/2012_Earthquakes_Mag5.kml',
    projection: 'EPSG:3857',
    extractStyles: false
  }),
  blur: parseInt(blur.value, 10),
  radius: parseInt(radius.value, 10)
});
```
这里 `heatmap` 使用`KML`格式，本地文件`data/kml/2012_Earthquakes_Mag5.kml` 作为 `heatmap` 的来源，数据是2012年全球地震发生的位置和震级等简单的描述信息，然后将 `heatmap`图层加到`map`中：

```js
map = new ol.Map({  //初始化map
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
      }),
      heatmap
    ],
    view: new ol.View({
      center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
      zoom: 4
    })
}); 
```
 
效果展示：

![markdown](https://img-blog.csdn.net/20150510090800756 "markdown")

## imagelayer

主要是指服务器端渲染的图像，可能是已经渲染好的图像，或者是每一次请求，都根据请求内容定制化地生成一幅图片，该图层类型支持任意的范围和分辨率。

### 实例

首先实例化一幅图片图层：

```js
/**
 * create an imageLayer 
 */
var extent = [0, 0, 3264, 2448];
var projection = new ol.proj.Projection({
            code: 'EPSG:4326',
            extent: extent
        }),
var imageLayer = new ol.layer.Image({
    source: new ol.source.ImageStatic({
        url: 'sample.jpg',
        projection: projection,
        imageExtent: extent
    })
})
```

与 `heatmap` 一样，首先需要传入 `URL` 参数，即图片地址，这里可以是网络图片的地址，或者是本地的文件地址；然后需要传入参考坐标系 `projection`，`code` 是一个标识，可以是任何字符串，如果是`EPSG：4326` 或者是 `EPSG：3857` ，那么就会使用这两个坐标系，如果不是，就使用默认的坐标系，`extent` 是一个矩形范围，上面已经提到；`imageLayer` 的第三个参数是 `imageExtent` 表示图片的尺寸，这里我们不能改变图片的原来的比例，图片只会根据原来的比例放大或缩小。

最后将 `imageLayer` 加到地图中：

```js
map = new ol.Map({  //初始化map
    target: 'map',
    layers: [ imageLayer ],
    view: new ol.View({
      projection: projection,
      center: ol.extent.getCenter(extent),
      zoom: 2
    })
}); 
```

效果展示：

![markdown](https://img-blog.csdn.net/20150510090637480 "markdown")

放大后的效果展示：

![markdown](https://img-blog.csdn.net/20150510090843422 "markdown")

## tilelayer

切片地图是比较常用的图层类型，切片的概念，就是利用网格将一幅地图切成大小相等的小正方形，如图：

![markdown](https://img-blog.csdn.net/20150424175110036 "markdown")

这样就明白我们使用百度地图等地图时为什么网速慢时候，会一块一块的加载的原因了吧！对，因为是切片。

  当请求地图的时候，会请求视口（也就是浏览器可见的区域）可见的区域内包含的切片，其余的切片不会请求，这样就节省了网络带宽，而且一般这些切片都是预先切好的，且分为不同的缩放级别，根据不同的缩放级别分成不同的目录。如果将这些切片地图放到缓存中，那访问速度会更快。

继承了 `ol.layer.Layer` ，额外的参数是 `olx.layer.TileOptions` ，其定义如下：

```js
/**
* @typedef {{brightness: (number|undefined),
* contrast: (number|undefined),
* hue: (number|undefined),
* opacity: (number|undefined),
* preload: (number|undefined),
* saturation: (number|undefined),
* source: (ol.source.Tile|undefined),
* visible: (boolean|undefined),
* extent: (ol.Extent|undefined),
* minResolution: (number|undefined),
* maxResolution: (number|undefined),
* useInterimTilesOnError: (boolean|undefined)}}
* @api
*/
```

可以看出，多出了 `preload` 和 `useInterimTilesOnError` 两个参数，`preload` 是在还没有将相应分辨率的渲染出来的时候，将低分辨率的切片先放大到当前分辨率（可能会有模糊），填充到相应位置，默认是 0，现在也就明白了当网速慢时，为什么地图会先是模糊的，然后再变清晰了吧，就是这个过程！`useInterimTilesOnError`是指当加载切片发生错误时，是否用一个临时的切片代替，默认值是 true。

### 实例

其实在 加载地图的例子 中，我们就是请求 `MapQuest` 的切片地图：

```js
map = new ol.Map({  //初始化map
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
      })
    ],
    view: new ol.View({
      center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
      zoom: 2
    })
});
```
其中的 `ol.layer.Tile` 就是切片图层类型，来源是 `MapQuest` ，`layer`
是请求的图层的类型， `MapQuest` 有三种类型的图层：`osm`, `sat` 和 `hyb` ，`osm` 就是 `OpenStreetMap` 的缩写，是其提供的数据， `sat` 是卫星图，`hyb` 是两种类型的混合图层。

我们可以查看一下浏览器的网络请求内容：

![markdown](https://img-blog.csdn.net/20150510090717120 "markdown")

这里是 `Firefox` 浏览器的 `Firebug` 网络请求面板，可见其请求的图片，是一块块的，且是基于一定的编号规则进行编号的。

## vectorlayer

在 `OpenLayers`之使用`Vector Layer` 中曾经使用过，即矢量图层，矢量图层实际上是在客户端渲染的图层类型，服务器返回的数据或者文件会通过 `OpenLayers` 进行渲染，得到相应的矢量图层。

在客户端渲染的矢量数据图层([vector](/gis/openlayer/vector.html))，继承了 `ol.layer.Layer` ，额外的参数是 `olx.layer.VectorOptions` ，其定义如下：

```js
/**
 * @typedef {{brightness: (number|undefined),
 *     contrast: (number|undefined),
 *     renderOrder: (function(ol.Feature, ol.Feature):number|null|undefined),
 *     hue: (number|undefined),
 *     minResolution: (number|undefined),
 *     maxResolution: (number|undefined),
 *     opacity: (number|undefined),
 *     renderBuffer: (number|undefined),
 *     saturation: (number|undefined),
 *     source: (ol.source.Vector|undefined),
 *     style: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined),
 *     updateWhileAnimating: (boolean|undefined),
 *     updateWhileInteracting: (boolean|undefined),
 *     visible: (boolean|undefined)}}
 * @api
 */
```
相对于一般的图层，多出了 `renderOrder`、`renderBuffer`、`style`、`updateWhileAnimating` 和 `updateWhileInteracting` 五个参数。`renderOrder` 是指渲染地理要素时的顺序，一般情况下，在渲染之前，要素是基于一定规则排序的，而渲染就是根据这个顺序进行依次渲染的，这个参数便指定了这个排序规则，如果赋值为 null ，那么就不会对地理要素进行排序，渲染也不会有一定的顺序；`renderBuffer` 表示地图的视口区域的缓冲区；style 规定了矢量图层的样式，就是配色和形状等等；u`pdateWhileAnimating` 表示当有动画特效时，地理要素是否被重新创建，默认是 false，当设置为 true 时，可能会对性能有所影响；`updateWhileInteracting` 表示当 地理要素 交互时，是否会被重新渲染。

### 实例

首先创建一个实例：

```js
vectorLayer = new ol.layer.Vector({ //初始化矢量图层
  source: new ol.source.GeoJSON({
    projection: 'EPSG:3857',
    url: 'data/geojson/countries.geojson'   //从文件加载边界等地理信息
  }),
  style: function(feature, resolution) {
    style.getText().setText(resolution < 5000 ? feature.get('name') : '');  //当放大到1:5000分辨率时，显示国家名字
    return [style];
  }
});
```

服务器返回的 `GeoJSON` 格式的文件 `data/geojson/countries.geojson` 包含国家的边界数据，属于多边形类型，经过 `OpenLayers` 渲染之后得到结果如下：

![markdown](https://img-blog.csdn.net/20150510090747618 "markdown")

可以看到蓝色的线为各个国家的边界，当鼠标在某个国家上方时，相应的区块会变红色，这是添加的事件，我们可以改变其样式，注意到 `vectorlayer` 相对于其他类型的图层，还包含了一个 style 参数，这个参数便是控制矢量图层的外观样式的，其定义如下：

```js
/**
 * 定义矢量图层
 * 其中style是矢量图层的显示样式 
 */
var style = new ol.style.Style({
  fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
    color: 'rgba(255, 255, 255, 0.6)'
  }),
  stroke: new ol.style.Stroke({ //边界样式
    color: '#319FD3',
    width: 1
  }),
  text: new ol.style.Text({ //文本样式
    font: '12px Calibri,sans-serif',
    fill: new ol.style.Fill({
      color: '#000'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 3
    })
  })
});
```

`style` 是一个 `ol.style.Style` 类型，矢量图层是可以调节透明度的，如下：

```js
fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
    color: 'rgba(255, 255, 255, 0.6)'
  })
```

rgba 的最后一个变量就是控制透明度的变量，范围是 0~1，0 表示不透明，1 代表完全透明。因为这里主要讲 Layer，所以关于 `ol.style.Style` 其它的内容，可看[style](/gis/openlayer/style.html)。

##　思考

现在非常流行的地图，如百度地图或者高德地图提供的是什么layer类型呢？我们来分别看看它们在 Firefox 看到的网络请求图：

百度地图：

![markdown](https://img-blog.csdn.net/20150510091259450 "markdown")

高德地图：

![markdown](https://img-blog.csdn.net/20150510091120028 "markdown")

我们可以看出，它们都是提供的网络切片图层类型，而一些加载的地理要素，如酒店等，便是加载在一个矢量图层中的，所以说，它们是混杂着切片图层和矢量图层的。

## 总结

其实图层可以按照渲染的位置分为两类，一类是在服务器端渲染好，以图片形式返回浏览器的， `imagelayer` 和 `tilelayer` 都是属于这种类型；另一类是在浏览器渲染的图层类型，`vectorlayer` 和 `heatmaplayer` 就是这种类型。

## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/45398131)