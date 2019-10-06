---
title: draw原理
---

## 介绍

在 ol 中，负责交互的模块中，有一个负责绘制图形的交互模块，这个交互子模块是 `ol.interaction.Draw`。该模块允许用户通过鼠标点击（PC浏览器环境）或者手指触摸（ 触屏手机浏览器环境）在地图上绘制点、线 和 面。

注：绘制完成之前的要素图形我们称之为草图（sketch），绘制完成的图形称为要素（feature）。

## 实现原理

绘制交互是通过鼠标或手指的点击添加点的坐标的，OpenLayers 会自动将 屏幕坐标转换为 地图坐标，点击绘制完成后，所有的点初始化一个 geometry 对象，然后利用这个 geometry 初始化一个 feature。在上一篇介绍绘制用法时，我们知道初始化一个绘制交互，要传一个 features 参数或者 source 参数，如果是 features，那么勾绘完成的 feature 就会添加到 features 集合中，而 features 会属于一个 source，而 source 又属于 layer，layer 属于一个 map，这样，勾绘的要素（feature）就会显示到地图中。这个过程比较麻烦，估计会绕晕，我们用一张图进行说明：

![markdown](https://img-blog.csdn.net/20150924130819954 "markdown")

该类中，有几个私有变量，维护着绘制过程中的坐标和子要素或者绘制状态等内容，主要有以下几个：

 - finishCoordinate_，绘制的要素的完成点坐标，对于多边形来说是第一个点，因为多边形要闭合，所以第一个点和最后一个点是重合的。而对于多边形来说，最后一个点就是最后一个点
 - sketchFeature_，草图的要素
 - sketchPoint_，草图的点要素
 - sketchCoords_，草图的点要素的坐标集合，用于绘制要素为线或多边形时
 - sketchLine_，草图的线要素，用于绘制要素为多边形时
 - sketchLineCoords_，草图的线坐标，当绘制多边形或圆形时用到

## 实现细节

1. 私有的辅助函数

ol.interaction.Draw 类中，私有的辅助函数包括：
 
 - ol.interaction.Draw.handleDownEvent_，处理鼠标按下的事件
 - ol.interaction.Draw.handleUpEvent_，处理松开鼠标单击的事件
 - ol.interaction.Draw.getMode_，获得绘制要素的 geometry 类型，包含四种：Point、LineString、Circle和Polygon
 - ol.interaction.Draw.prototype.handlePointerMove_，处理鼠标移动事件
 - ol.interaction.Draw.prototype.atFinish_，判断一个事件是否在捕捉勾绘开始坐标的容差之内
 - ol.interaction.Draw.prototype.createOrUpdateSketchPoint_，创建或者更新一个点要素的坐标
 - ol.interaction.Draw.prototype.startDrawing_，获取事件对象的点坐标，根据设置的绘制类型，初始化一些维护坐标数据的私有变量,同时触发 drawstart 事件
 - ol.interaction.Draw.prototype.modifyDrawing_，获取事件的点坐标，利用该坐标，根据绘制要素类型，修改相应要素的第一个坐标（多边形）最后一个（线或圆）坐标
 - ol.interaction.Draw.prototype.addToDrawing_，获取事件对象包含的点坐标，并添加到当前绘制的要素
 - ol.interaction.Draw.prototype.abortDrawing_， 停止绘制，并返回 sketchFeature_ 
 - ol.interaction.Draw.prototype.updateSketchFeatures_，根据不同的情况，将 sketchFeature_ 、sketchLine_ 或 sketchPoint_ 对象 push 到 sketchFeatures 中，然后 在矢量图层中移除所有要素，并重新添加 sketchFeatures 中保存的所有要素，这个函数就像 Windows 系统下的桌面刷新功能差不多


实现：

```js
/**
 * Redraw the sketch features.
 * @private
 */
ol.interaction.Draw.prototype.updateSketchFeatures_ = function() {
  var sketchFeatures = [];
  if (this.sketchFeature_) {
    sketchFeatures.push(this.sketchFeature_);
  }
  if (this.sketchLine_) {
    sketchFeatures.push(this.sketchLine_);
  }
  if (this.sketchPoint_) {
    sketchFeatures.push(this.sketchPoint_);
  }
  var overlaySource = this.overlay_.getSource();
  overlaySource.clear(true);
  overlaySource.addFeatures(sketchFeatures);
};
```

ol.interaction.Draw.prototype.updateState_，这个辅助函数主要是获取 draw 交互的状态，是 active 还是 deactive，具体实现如下：

```js
/**
 * @private
 */
ol.interaction.Draw.prototype.updateState_ = function() {
  var map = this.getMap();
  var active = this.getActive();
  if (!map || !active) {
    this.abortDrawing_();
  }
  this.overlay_.setMap(active ? map : null);
};
```

纵观所有这些辅助的私有函数，基本的思路就是根据发生的事件，获取事件对象，获取对象包含的坐标，根据具体情况对以上提到的保存数据的六个私有变量进行修改，来达到目的。

2. 公有 API 函数

对外的 API 函数有以下几个，这些对外的公有函数，也无外乎使用辅助的私有函数或者私有变量来完成一些具体的操作。如下所示：

 - ol.interaction.Draw.handleEvent，处理 ol.MapBrowserEvent，返回一个布尔值，表明是否应该继续或者结束绘制。其定义如下： 

 ```js
    /**
 * Handles the {@link ol.MapBrowserEvent map browser event} and may actually
 * draw or finish the drawing.
 * @param {ol.MapBrowserEvent} mapBrowserEvent Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {ol.interaction.Draw}
 * @api
 */
    ol.interaction.Draw.handleEvent = function(mapBrowserEvent) {
    var pass = !this.freehand_;
    if (this.freehand_ &&
        mapBrowserEvent.type === ol.MapBrowserEvent.EventType.POINTERDRAG) {
        this.addToDrawing_(mapBrowserEvent);
        pass = false;
    } else if (mapBrowserEvent.type ===
        ol.MapBrowserEvent.EventType.POINTERMOVE) {
        pass = this.handlePointerMove_(mapBrowserEvent);
    } else if (mapBrowserEvent.type === ol.MapBrowserEvent.EventType.DBLCLICK) {
        pass = false;
    }
    return ol.interaction.Pointer.handleEvent.call(this, mapBrowserEvent) && pass;
    };
 ```
`this.freehand_`默认是 false，这里将 pass 赋值为 true。首先检查是否设置了 `freehand_ `模式，且检查发生的事件是否是鼠标拖拽事件，如果同时满足两个条件，就将事件对象中包含的坐标添加到当前正在绘制的多边形（因为只有多边形才有 freehand_ 模式），同时将 pass 设置为 false；如果不满足第一个条件，那么检查传来的事件是否是鼠标移动事件，如果是，调用的函数始终返回 true，但是会判断用户是否已经点击了最后一个点（`finishCoordinate_`），如果点击了，就将事件对象传递给 modifyDrawing_，如果没有定义，那么就将事件对象传递给 `createOrUpdateSketchPoint_` ；如果前面两个条件都不满足，那么检查事件是否是鼠标双击事件，那么就将 pass 赋值为 false。

 - ol.interaction.Draw.createRegularPolygon，该函数返回一个基于 `Circle` 绘制类型的 `geometryFunction` 函数（这种函数返回一个 `geometry` 对象），接受两个参数，分别是 边的数量（`opt_sides`）和 多边形的角度（`opt_angle`）。其定义如下：

```js
/**
 * Create a `geometryFunction` for `mode: 'Circle'` that will create a regular
 * polygon with a user specified number of sides and start angle instead of an
 * `ol.geom.Circle` geometry.
 * @param {number=} opt_sides Number of sides of the regular polygon. Default is
 *     32.
 * @param {number=} opt_angle Angle of the first point in radians. 0 means East.
 *     Default is the angle defined by the heading from the center of the
 *     regular polygon to the current pointer position.
 * @return {ol.interaction.DrawGeometryFunctionType} Function that draws a
 *     polygon.
 * @api
 */
ol.interaction.Draw.createRegularPolygon = function(opt_sides, opt_angle) {
  return (
      /**
       * @param {ol.Coordinate|Array.<ol.Coordinate>|Array.<Array.<ol.Coordinate>>} coordinates
       * @param {ol.geom.SimpleGeometry=} opt_geometry
       * @return {ol.geom.SimpleGeometry}
       */
      function(coordinates, opt_geometry) {
        var center = coordinates[0];
        var end = coordinates[1];
        var radius = Math.sqrt(
            ol.coordinate.squaredDistance(center, end));
        var geometry = opt_geometry ? opt_geometry :
            ol.geom.Polygon.fromCircle(new ol.geom.Circle(center), opt_sides);
        goog.asserts.assertInstanceof(geometry, ol.geom.Polygon,
            'geometry must be a polygon');
        var angle = opt_angle ? opt_angle :
            Math.atan((end[1] - center[1]) / (end[0] - center[0]));
        ol.geom.Polygon.makeRegular(geometry, center, radius, angle);
        return geometry;
      }
  );
};
```

从上面的定义可以看出，该函数返回的 `geometry`是由两个点坐标构成的，分别是 center 和 end，之所以将end 赋值为 `coordinate[1]`，是因为这是基于使用 `Circle` 模式为前提的，在这种模式下，只需要单击两次鼠标就可以完成绘制，所以 `coordinate` 数组中只有两个坐标，由于是 `circle` 模式，其半径是两点之间的距离；返回的函数中的第二个参数是 绘制的类型，必须是多边形；角度如果没有指定的话，那么就将两个坐标点的连线与水平（也就是东西走向）所成的角度。最后，将这些所需的参数都确定之后，利用这些参数调用了 `ol.geom.polygon.makeRegular` 函数，这个函数的主要作用是将 `polygon` 类型修改为一个规则多边形。

举例说明:

```js
var vector = new ol.layer.Vector({
   source: new ol.source.Vector()
});

var map = new ol.Map({
    target: 'map',
    layers: [ vector ],
    view: new ol.View({
        center: ol.proj.transform([120.896637,31.381207], 'EPSG:4326', 'EPSG:3857'),
        zoom: 15
    })
});
```

然后初始化一个 `draw interaction`，将其绘制模式设置为 `Circle`，`source` 设置为矢量图层的 `source（vector.getSource( )）`，`geometryFunction` 设置为我们这里介绍的函数创建（`ol.interaction.Draw.createRegularPolygon(3)`），并将其加入到地图中：

```js
var draw = new ol.interaction.Draw({
    type: 'Circle',
    source: vector.getSource(),
    geometryFunction: ol.interaction.Draw.createRegularPolygon(3)
});

map.addInteraction(draw);
```

效果展示：

![markdown](https://img-blog.csdn.net/20150929231314459 "markdown")

这里我们创建的是三条边的规则多边形（ol.interaction.Draw.createRegularPolygon(3)），自然就是三角形，我们将边数 3 换为 4 或者 5，效果如下：

![markdown](https://img-blog.csdn.net/20150929231655950 "markdown")

![markdown](https://img-blog.csdn.net/20150929231917497 "markdown")

如果继续增大边数，绘制的形状会越来越接近圆形。

 - ol.interaction.Draw.prototype.removeLastPoint，该函数作用是删除正处于绘制的线或者多边形的最后一个点。该函数只作用于正在绘制，且并未完成的要素。其实现源码如下：

```js
/**
 * Remove last point of the feature currently being drawn.
 * @api
 */
ol.interaction.Draw.prototype.removeLastPoint = function() {
  var geometry = this.sketchFeature_.getGeometry();
  goog.asserts.assertInstanceof(geometry, ol.geom.SimpleGeometry,
      'geometry must be an ol.geom.SimpleGeometry');
  var coordinates, sketchLineGeom;
  if (this.mode_ === ol.interaction.DrawMode.LINE_STRING) {
    coordinates = this.sketchCoords_;
    coordinates.splice(-2, 1);
    this.geometryFunction_(coordinates, geometry);
  } else if (this.mode_ === ol.interaction.DrawMode.POLYGON) {
    coordinates = this.sketchCoords_[0];
    coordinates.splice(-2, 1);
    sketchLineGeom = this.sketchLine_.getGeometry();
    goog.asserts.assertInstanceof(sketchLineGeom, ol.geom.LineString,
        'sketchLineGeom must be an ol.geom.LineString');
    sketchLineGeom.setCoordinates(coordinates);
    this.geometryFunction_(this.sketchCoords_, geometry);
  }

  if (coordinates.length === 0) {
    this.finishCoordinate_ = null;
  }

  this.updateSketchFeatures_();
};
```

在管理绘制的这个类中，`sketchFeature_` 是该类的私有变量，保存的是正在绘制的要素（`feature`）。该函数首先获取当前要素的 `geometry` 子对象，然后获取当前绘制的坐标数组，删除数组中的倒数第二个点（因为倒数第一个点还没有点定，是当前悬挂的点），然后重新构造 `geometry` 返回给当前绘制的要素（`feature`），并更新当前绘制的要素。

举例说明：

```js
var draw = new ol.interaction.Draw({
    type: 'Polygon',
    source: vector.getSource(),
    //geometryFunction: ol.interaction.Draw.createRegularPolygon(5)
});
```

然后在地图上添加一个按钮，用来触发该函数：

```js
$('#undo').bind('click', function(){
    draw.removeLastPoint();
});
```

效果展示：

![markdown](https://img-blog.csdn.net/20150930100531085 "markdown")

然后我们绘制一个多边形，然后点击按钮，取消绘制的前一个点，效果如下：

![markdown](https://img-blog.csdn.net/20150930100751591 "markdown")

该函数可以用作 回退（undo） 操作。

 - ol.interaction.Draw.prototype.finishDrawing，该函数用于停止绘制，并将当前勾绘的要素添加到目标图层，在这里是我们上面的例子中的 vector。该函数在将要素添加到目标图层之前，会触发 drawend 事件。其具体实现如下：

 ```js
/**
 * Stop drawing and add the sketch feature to the target layer.
 * The {@link ol.interaction.DrawEventType.DRAWEND} event is dispatched before
 * inserting the feature.
 * @api
 */
ol.interaction.Draw.prototype.finishDrawing = function() {
  var sketchFeature = this.abortDrawing_();
  goog.asserts.assert(!goog.isNull(sketchFeature),
      'sketchFeature should not be null');
  var coordinates = this.sketchCoords_;
  var geometry = sketchFeature.getGeometry();
  goog.asserts.assertInstanceof(geometry, ol.geom.SimpleGeometry,
      'geometry must be an ol.geom.SimpleGeometry');
  if (this.mode_ === ol.interaction.DrawMode.LINE_STRING) {
    // remove the redundant last point
    coordinates.pop();
    this.geometryFunction_(coordinates, geometry);
  } else if (this.mode_ === ol.interaction.DrawMode.POLYGON) {
    // When we finish drawing a polygon on the last point,
    // the last coordinate is duplicated as for LineString
    // we force the replacement by the first point
    coordinates[0].pop();
    coordinates[0].push(coordinates[0][0]);
    this.geometryFunction_(coordinates, geometry);
  }

  // cast multi-part geometries
  if (this.type_ === ol.geom.GeometryType.MULTI_POINT) {
    sketchFeature.setGeometry(new ol.geom.MultiPoint([coordinates]));
  } else if (this.type_ === ol.geom.GeometryType.MULTI_LINE_STRING) {
    sketchFeature.setGeometry(new ol.geom.MultiLineString([coordinates]));
  } else if (this.type_ === ol.geom.GeometryType.MULTI_POLYGON) {
    sketchFeature.setGeometry(new ol.geom.MultiPolygon([coordinates]));
  }

  // First dispatch event to allow full set up of feature
  this.dispatchEvent(new ol.interaction.DrawEvent(
      ol.interaction.DrawEventType.DRAWEND, sketchFeature));

  // Then insert feature
  if (!goog.isNull(this.features_)) {
    this.features_.push(sketchFeature);
  }
  if (!goog.isNull(this.source_)) {
    this.source_.addFeature(sketchFeature);
  }
};
 ```

该函数和上面的函数类似，首先获得当前绘制的要素（`var sketchFeature = this.abortDrawing_()`;）、`geometry`对象和坐标，然后删除最后一个悬挂的点，重新返回新的 `geometry`，并传给 `feature`，以完成绘制。同样，我们举例说明，这个例子和上面的例子几乎一模一样，所以不再详述实现，对勾图标对应调用该函数。实现效果如下：

![markdown](https://img-blog.csdn.net/20150930113059012 "markdown")

 - ol.interaction.Draw.prototype.extend，该函数将参数所指的要素进行继续编辑绘制，主要用途是对已经绘制好的要素进行再附加点，只对 LineString 类型有效。实现过程就是首先获取参数要素的坐标数组，然后将该坐标数组 push 到当前绘制的数组进行继续绘制。实现方式和前面的函数非常相似，这里不再详述，想详细了解可以看看其 GitHub 的代码。

## 总结

不仅仅是这个类，还包括其他的类都是这个思路，总体分为三层：私有变量、私有辅助函数和对外的 API 函数，其功能如下图：

![markdown](https://img-blog.csdn.net/20151002115052460 "markdown")

不仅仅是 ol 的设计，其他库的设计也大致是这样；不仅仅是 JavaScript ，很多其他的语言的类设计也是这样。其实这就是面向对象的思想的体现 - 封装。


## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/48489033)

