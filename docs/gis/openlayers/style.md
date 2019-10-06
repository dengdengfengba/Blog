---
title: 地图样式
---

## 介绍

地图样式是由 style 类控制的，其包含了地图样式的方方面面，例如，填充色、图标样式、图片样式、规则图形样式、边界样式、文字样式等，样式一般针对矢量要素图层。

矢量图层样式可以事先写好，写成静态的，矢量图层直接按照定义好的样式渲染，也可以动态使用样式的 set() 方法，但是要注意刷新矢量图层，重新渲染，否则动态样式不生效。

## 参数

官方API：

```js
/**
 * @typedef {{geometry: (undefined|string|ol.geom.Geometry|ol.style.GeometryFunction),
 *     fill: (ol.style.Fill|undefined),
 *     image: (ol.style.Image|undefined),
 *     stroke: (ol.style.Stroke|undefined),
 *     text: (ol.style.Text|undefined),
 *     zIndex: (number|undefined)}}
 * @api
 */
```

 - geometry，要素的属性，或者要素，或者一个返回一个地理要素的函数，用来渲染成相应的地理要素
 - fill，填充要素的样式
 - iamge，图片样式，类型为 ol.style.Image
 - stroke，要素边界样式，类型为 ol.style.Stroke
 - text，要素文字的样式，类型为 ol.style.Text
 - zIndex，CSS中的zIndex，即叠置的层次，为数字类型


## 子类

 - ol.style.Circle，针对矢量要素设置圆形的样式，继承 ol.style.Image
 - ol.style.Icon，针对矢量数据设置图标样式，继承 ol.style.Image
 - ol.style.Fill，针对矢量要素设置填充样式
 - ol.style.RegularShape，对矢量要素设置规则的图形样式，如果设置 radius，结果图形是一个规则的多边形，如果设置 radius1 和 radius2，结果图形将是一个星形
 - ol.style.Stroke，矢量要素的边界样式
 - ol.style.Text，矢量要素的文字样式

可以看出这些样式都是针对矢量要素的。

## 例子

配置图层：

```js
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

效果展示：

![markdown](https://img-blog.csdn.net/20150525085032979 "markdown")

### geometry - 地理属性

`geometry` 可以是要素的地理属性，或者 `geometry`，或者一个返回 `geometry` 类型的函数。一般与 `image` 样式配合使用，表示 `image` 放置的位置。例：

```js
new ol.style.Style({
    image: new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({
        color: 'orange'
      })
    }),
    geometry: function(feature) {
      // return the coordinates of the first ring of the polygon
      var coordinates = feature.getGeometry().getCoordinates()[0];
      return new ol.geom.MultiPoint(coordinates);
    }
  })
```

该样式配置了一个 `image` 属性，表示在相应的位置放置的图片的样式，这里是一个半径为 5，填充色为橙色的圆形的图片样式； `geometry` 属性配置了 `image` 放置的地理位置， 一个返回相应的要素的地理属性的函数。

### fill - 填充样式

`color: 'rgba(255, 255, 255, 0.9)'`，配置了图层的要素的填充颜色和透明度，格式为 `[R, G, B, A]`，分别代表 RGB 的三个分量，`A` 代表 `alpha`，即透明度。以上颜色配置为白色，每个分量值是` [0, 255]` 区间内的值，越小，越暗；越大，越亮。透明度为 `0.9`，透明度是一个` [0, 1] `区间内的值，越小，要素越是透明；越大，越不透明。

更改颜色 `[0, 255, 0, 0.9]`，将颜色的绿色分量调为最大，其他颜色分量调为 0，那么地图的背景色应该变为纯绿色，刷新浏览器，得到下图：

![markdown](https://img-blog.csdn.net/20150525085459646 "markdown")

更改透明度`[255, 255, 255, 0.1]`，将透明度分量改为 0.1 ，预期图层将变得非常透明，刷新浏览器，得到如下图：

![markdown](https://img-blog.csdn.net/20150525090325758 "markdown")

### image - 图片样式

样式主要针对矢量图层（`vector layer`），矢量图层中包含一个或多个要素（`feature`），要素中包含一个地理属性（`geometry`）表示地理位置，还可能包含一个或多个其他属性，比如要素的名称、类型等等，要素可以使用单独的样式，这时候要使用 `feature.setStyle`(`ol.style.Style`) 来设置单独使用的样式，否则直接继承矢量图层的样式。

使用 `setStyle` 方法设置单个要素样式，首先定义一个图标样式：

```js
var iconStyle = new ol.style.Style({
  image: new ol.style.Icon(({
    src: 'data/icon.png'
  }))
});
```

设置一个显示在特定位置的图片图标，使用 `ol.style.Icon`配置该属性，src属性设置了图片的地址，还可以设置透明度等属性。接下来定义一个点要素：

```js
var iconFeature = new ol.Feature({
  geometry: new ol.geom.Point([0, 0]),
});
```

将样式应用于点要素：`iconFeature.setStyle(iconStyle)`;，最后定义一个矢量图层，并加入该要素：

```js
var iconLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [iconFeature]
    })
});
```

得到结果后，会在[0，0]坐标处显示一个图标：

![markdown](https://img-blog.csdn.net/20150527204712361 "markdown")

该样式有一个特性，就是地图中不显示相应区域时候，图片默认不加载，当该区域在地图视口中，才会加载图片，当然这是为了节省带宽，提高性能。如果我们将图层的`style`属性配置为`iconStyle`，那么结果是一样的，其结果是图层中的所有要素都会是一样的样式。需要指出的是，该样式只针对于点要素。

### stroke - 边界线条

`color: '#319FD3'`, `width: 1`，配置要素边界的颜色为 `'#319FD3'`，16 进制颜色代码，width 说明线条宽度为 1 像素。更改颜色为红色：`'#FF0000'`，结果如下图：

![markdown](https://img-blog.csdn.net/20150525091903569 "markdown")

若更改线条宽度：width:10，则得到如下结果：

![markdown](https://img-blog.csdn.net/20150525092043759 "markdown")

### text - 文字

设置矢量图层中的各个要素中要显示的文字的字体类型，线条填充颜色，线条边界颜色，因为文字的线条本身就具有宽度，所以有填充色和边界颜色说法。如下面的例子，设置了文字的大小、字体、填充色和边界颜色：

```js
text: new ol.style.Text({
  font: '12px Calibri,sans-serif',    //字体与大小
  fill: new ol.style.Fill({    //文字填充色
    color: '#000'
  }),
  stroke: new ol.style.Stroke({    //文字边界宽度与颜色
    color: '#fff',
    width: 3
  })
})
```

`font: '12px Calibri,sans-serif'`,指定了文字的大小和字体，我们修改文字大小为 24px，得到如下结果：

![markdown](https://img-blog.csdn.net/20150525094113284 "markdown")

`fill` 规定了文字笔画线条的填充颜色，修改为 #FFF，结果应该是白色。结果如图：

![markdown](https://img-blog.csdn.net/20150525094219575 "markdown")

`stroke` 规定了文字的边缘线条的颜色和宽度，其实文字本身就像一个地理要素一样，有填充和线条样式，可以看出文字的笔画线条外边缘有白色，就是这个样式在起作用。

### 条件样式

条件样式是将样式配置为一个回调函数，其参数包含要素本身和分辨率，可以根据要素本身的属性和地图的分辨率，显示动态的样式，形式如 `style: function(feature, resolution) {}`。

例如，以下代码段配置当分辨率小于 5000 时候，在要素上显示一个标签，标识要素名称：

```js
style: function(feature, resolution) {
    style.getText().setText(resolution < 5000 ? feature.get('name') : '');
    return styles;
  }
```

## 总结

样式主要针对矢量图层数据，既可以配置一个全局的样式，也可以针对每个feature单独配置；既可以应用统一的样式，也可以根据要素和分辨率应用条件样式。样式应用是非常灵活的。

另外，样式是可以多个一起起作用的，就如同 HTML 的元素样式类 class 可以有多个一样。如下例子中，就应用了两个样式，一个是应用于多边形本身，另一个用于绘制每个多边形的顶点：

```js
var styles = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      width: 3
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  }),
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({
        color: 'orange'
      })
    }),
    geometry: function(feature) {
      // return the coordinates of the first ring of the polygon
      var coordinates = feature.getGeometry().getCoordinates()[0];
      return new ol.geom.MultiPoint(coordinates);
    }
  })
];
```

## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/46273663)
