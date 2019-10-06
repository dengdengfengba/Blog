---
title: 地图控件
---

## 介绍

每一个地图应用都应该有一些工具方便用户控制地图的行为，比如缩放，全屏，坐标控件等等，在 OpenLayers 中Control就是做这些事的。

## control类

`OpenLayers` 中的控件是由 `control` 类定义的，这是一个虚基类，不负责实例化特定的控件，它的主要作用是让其他具体的种类的控件类实现继承。`OpenLayers`中包含的控件有：

 - controldefaults: 地图默认包含的控件，包含缩放控件和旋转控件
 - fullscreencontrol: 全屏控件，用于全屏幕查看地图
 - mousepositioncontrol: 鼠标位置控件，显示鼠标所在地图位置的坐标，可以自定义投影
 - overviewmapcontrol: 地图全局视图控件
 - rotatecontrol: 地图旋转控件
 - scalelinecontrol: 比例尺控件
 - zoomcontrol: 缩放控件
 - zoomslidercontrol: 缩放刻度控件
 - zoomtoextentcontrol: 缩放到全局控件

## fullscreen control - 全屏控件

 地图全屏控件，该控件提供一个全屏按钮，当点击的时候，地图充满整个屏幕（注意是整个屏幕，而不是整个浏览器窗口）；当在全屏模式时，在屏幕的右上角会出现一个退出按钮，用于退出全屏模式，同时按 Esc 按钮也可以退出全屏模式。在 map 对象中添加如下代码：

 ```js
controls: ol.control.defaults().extend([
    new ol.control.FullScreen()
]),
 ```

刷新浏览器即可见：

![markdown](https://img-blog.csdn.net/20150511142242580 "markdown")

## mouseposition control - 鼠标位置控件

鼠标位置控件，用于显示鼠标指针 2D 坐标，默认情况下，它显示的是地图的 view 对象中设置的投影，但是可以修改为任意投影。鼠标位置控件是加载在地图右上角的位置，如，我们在以上全屏控件的基础上加如下代码：

```js
controls: ol.control.defaults().extend([
    new ol.control.FullScreen(),
    new ol.control.MousePosition()
]),
```

刷新浏览器即可见：

![markdown](https://img-blog.csdn.net/20150512125625976 "markdown")

但这样做，ol默认的鼠标位置空间会将全屏按钮遮盖住，那么我们如何解决这个问题？

一是修改 `ol.control.MousePosition` 的可选参数的默认值；二是覆盖其默认的 CSS 样式类

```js
/**
 * @typedef {{className: (string|undefined),
 *     coordinateFormat: (ol.CoordinateFormatType|undefined),
 *     projection: ol.proj.ProjectionLike,
 *     render: (function(ol.MapEvent)|undefined),
 *     target: (Element|undefined),
 *     undefinedHTML: (string|undefined)}}
 * @api stable
 */
```

通过控件的api，我们发现其重要参数有：

 - className，显示坐标的 HTML 元素的 class 值，如果不设置，就会默认 ol-mouse-position，也就是默认动态生成的
 - coordinateFormat，设置坐标显示的格式，保留小数点后几位等
 - projection，投影信息，表示显示的坐标的投影坐标系

知道用法后，我们就先定义将要显示坐标的 HTML 元素：

```HTML
<div  id="mouse-position" class="mouse-position-wrapper">
    <div class="custom-mouse-position"></div>
</div>
```

修改css样式：

```css
.mouse-position-wrapper{
    width:300px; 
    height:29px; 
    color:#FFFFFF; 
    position:absolute; 
    right:20px; 
    bottom:6px; 
    z-index:999;
}
```

修改 MousePosition 对象:

```js
controls: ol.control.defaults().extend([
    new ol.control.FullScreen(),
    new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position')
    })        
]),
```

刷新浏览器，即可得：

![markdown](https://img-blog.csdn.net/20150512131135585 "markdown")

## overviewmap control - 全局地图控件

全局地图控件，显示当前视口中的地图位于全局地图的哪一部分，可选的参数如下：

```js
/**
 * @typedef {{collapsed: (boolean|undefined),
 *     collapseLabel: (string|Node|undefined),
 *     collapsible: (boolean|undefined),
 *     label: (string|Node|undefined),
 *     layers: (Array.<ol.layer.Layer>|ol.Collection|undefined),
 *     render: (function(ol.MapEvent)|undefined),
 *     target: (Element|undefined),
 *     tipLabel: (string|undefined)}}
 * @api
 *
```

 - collapsed，收缩选项；
 - collapseLabel，收缩后的图标按钮
 - collapsible，是否可以收缩为图标按钮，默认为 true
 - label，当 overviewmapcontrol 收缩为图标按钮时，显示在图标按钮上的文字或者符号，默认为 »
 - layers，overviewmapcontrol针对的图层，默认情况下为所有图层
 - render，当 overviewmapcontrol 重新绘制时，调用的函数
 - target，放置的 HTML 元素
 - tipLabel，鼠标放置在图标按钮上的提示文字

以上参数都为可选，添加如下代码：

```js
new ol.control.OverviewMap({})
```

默认情况下，控件为收缩状态，点击即可打开，打开后如下图所示：

![markdown](https://img-blog.csdn.net/20150512164940732 "markdown")


## rotate control - 地图旋转控件

地图旋转控件，主要作用是当地图角度不为 0 时，默认显示，点击，使地图恢复旋转角度为 0。可选参数如下：

```js
/**
 * @typedef {{duration: (number|undefined),
 *     className: (string|undefined),
 *     label: (string|Node|undefined),
 *     tipLabel: (string|undefined),
 *     target: (Element|undefined),
 *     render: (function(ol.MapEvent)|undefined),
 *     autoHide: (boolean|undefined)}}
 * @api stable
 */
```

 - duration，在开始角度和目标角度转动特效的持续时间，毫秒为单位，默认 240
 - className，表示图标的样式，默认为ol-rotate
 - label，旋转按钮中显示的符号，默认为⇧
 - tipLabel，鼠标在按钮上时的提示文字，默认为Reset rotation
 - target，按钮放置的 HTML 元素的 ID 
 - render，当控件重新绘制的时候，调用的函数
 - autoHide，当选择角度为 0 的时候，控件是否自动隐藏，默认值为true，也就是默认隐藏

默认情况下，该控件不会显示；当地图旋转角度不为 0 时，才会显示，原因是该控件为地图默认添加控件。当该控件显示时候，其默认的位置和全屏控件重合，所以如果想要显示该按钮，那么全屏按钮就会被覆盖。

解决办法：

1. 按照`mousepositioncontrol`的方式，将其默认位置放于其它地方
2. 覆盖其原有的 CSS 样式，最好不要修改原文件，因为其它地方如果使用的话，就会同样改变。

覆盖css样式方法：

```css
 /* rewrite the default css in `ol.css` */
  .ol-rotate{
    right:40px;
  }
```

```js
new ol.control.Rotate({ 
    autoHide:false
})
```

效果展示：

![markdown](https://img-blog.csdn.net/20150512193627136 "markdown")

## scaleline control - 比例尺控件

比例尺控件，显示当前地图的分辨率，也就是比例尺，默认的位置和 `overviewmap control`位置重合，要移动位置避免覆盖，同样覆盖默认样式：

修改css:

```css
 /* rewrite the default css in `ol.css` */
  .ol-scale-line {
    #left:100px;
  }
```

```js
new ol.control.ScaleLine({  }),
```

效果展示：

![markdown](https://img-blog.csdn.net/20150512193825649 "markdown")

## zoom control - 缩放控件

缩放控件，包含两个按钮，一个放大，一个缩小，是默认加载的控件之一，默认的 CSS样式类分别为 `.ol-zoom-in`和`.ol-zoom-out`。

效果展示：

![markdown](https://img-blog.csdn.net/20150513085603148 "markdown")

## zoomslider control - 缩放条控件

缩放条控件，主要显示当前的分辨率对应的刻度，给予一个直观的显示，其默认的条没有刻度，如果需要有刻度的，需要自己定制。可选的参数有：

```js
/**
 * @typedef {{className: (string|undefined),
 *     duration: (number|undefined),
 *     maxResolution: (number|undefined),
 *     minResolution: (number|undefined),
 *     render: (function(ol.MapEvent)|undefined)}}
 * @api
 */
```

 - maxResolution，表示其最大的分辨率
 - minResolution，表示最小分辨率

```js
new ol.control.ZoomSlider({  }),
```

效果展示：

![markdown](https://img-blog.csdn.net/20150513090449178 "markdown")

##  zoomtoextent control - 缩放到图层控件

缩放到图层控件，将地图缩放到视口可以容纳整个地图的合适尺度，可选的参数如下：

```js
/**
 * @typedef {{className: (string|undefined),
 *     target: (Element|undefined),
 *     label: (string|Node|undefined),
 *     tipLabel: (string|undefined),
 *     extent: (ol.Extent|undefined)}}
 * @api stable
 */
```

这个控件也没有什么特殊的选项，除了 `extent`，表示缩放到范围的大小。需要注意的是该控件位置和 `zoomslidercontrol` 位置会有部分重叠，同样，我们需要覆盖`zoomslidercontrol`的样式类： `.ol-zoomslider`：

```css
 .ol-zoomslider{
    top:100px;
    left: 9px;
  }
```

```js
new ol.control.ZoomToExtent({  })
```

## 总结

常用的控件添加后的代码展示：

```js
map = new ol.Map({  //init map
    controls: ol.control.defaults().extend([
        new ol.control.FullScreen(),
        new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326',
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position')
        }) ,
        new ol.control.OverviewMap({  }),
        new ol.control.Rotate({ 
            autoHide:false
        }),
        new ol.control.ScaleLine({  }),
        new ol.control.ZoomSlider({  }),
        new ol.control.ZoomToExtent({  })
      ]),
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
      }),
      vectorLayer
    ],
    view: new ol.View({
      center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
      zoom: 2
    })
}); 
```

效果展示：

![markdown](https://img-blog.csdn.net/20150513093728120 "markdown")

当然，你也可以自定义所需的控件。在这里我做了一个简易的[自定义控件](/gis/openlayer/control1.html)可作参考。

## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/45715925)


