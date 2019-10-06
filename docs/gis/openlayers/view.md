---
title: 地图视图
---

## view属性

`view` 的构造函数需要的参数是一个 `olx.ViewOptions`对象，这个对象的描述如下：(跟多详细的代码可在github上查询，这里只做用的比较多的API)

```js
/**
 * Object literal with config options for the view.
 * @typedef {{center: (ol.Coordinate|undefined),
 *     constrainRotation: (boolean|number|undefined),
 *     enableRotation: (boolean|undefined),
 *     extent: (ol.Extent|undefined),
 *     minResolution: (number|undefined),
 *     maxResolution: (number|undefined),
 *     minZoom: (number|undefined),
 *     maxZoom: (number|undefined),
 *     projection: ol.proj.ProjectionLike,
 *     resolution: (number|undefined),
 *     resolutions: (Array.<number>|undefined),
 *     rotation: (number|undefined),
 *     zoom: (number|undefined),
 *     zoomFactor: (number|undefined)}}
 * @api
 */
```

比较重要的属性有:
 - center: 一个`[x, y]`坐标,表示地图视图的中心位置
 - extent: 一个数组对象`[left, bottom, right, top]`,表示地图的初始范围
 - projection: 地图的投影坐标系统
 - resolution: 表示地图的分辨率，单位并不是普通的单位面积的像素，而是单位像素表示的距离单位，比如 米/像素
 - rotation: 表示地图的旋转角度
 - zoom: 表示地图初始的缩放级别

 除此之外，还有一些限制属性：`maxResolution`, `minResolution`, `minZoom`, `maxzoom`等, 这些属性主要限制地图的最大最小分辨率、最大最小缩放级别。

  定义view类的方法是 **混合使用构造函数模式和原型模式**，构造函数模式部分，主要定义类的私有属性和私有函数，所以以上定义的为每个对象特有的属性，各个对象内容各异；原型模式主要定义类的公有方法，每个实例化的对象保存的都是原型的指针，所以原型模式定义的方法和属性只有一个实例，每个对象都引用这个实例。

## view方法

`view`类的方法主要是针对`view`的属性的 `get` 和 `set` 方法，其基本的方法很多，常用的方法有：

- rotate、isDef
- fitExtent、fitGeometry
- getCenter、getProjection、getResolution、getRotation、getZoom
- setCenter、setResolution、setRotation、setZoom

### rotate

`rotate(rotation , opt_anchor )`: 接受两个参数，旋转角度(`rotation`)和旋转中心(`opt_anchor`, 可选)，将地图围绕`opt_anchor`旋转`rotation`角度

### isDef

`isDef`: 检查地图的中心和分辨率是否已经设置，都设置返回true，否则返回false

### fitExtent

`fitExtent(extent, size)`: 接受两个参数：`extent` 和 `size`，`extent` 类型是 `ol.Extent – [left, bottom, right, top]`，`size`由`map.getSize()`获取；该功能类似于 `ArcGIS `的缩放到图层功能，将地图的`view` 缩放到 `extent` 区域可见的合适尺度；

### fitGeometry

`fitGeometry(geometry, size, opt_options)`,参数是地理要素，地图尺寸和可选参数；根据给定的地理要素，将 `view` 缩放到适合地理要素显示的尺寸；

### get

`get`: `getCenter()` 获取地图的中心，返回一个地图中心的坐标、`getResolution()`获取地图的分辨率，即比例尺，返回一个表示比例尺的数值、 `getProjection()`获取地图使用的”投影坐标系统”，如`EPSG:4326`、`getRotation()`获取地图的“旋转角度”、`getZoom()`获取地图的缩放级别，返回一个表示缩放级别的数值；以上的函数均不需要任何参数；

### set

`set`: `setCenter(center)`，参数为`ol.Coordinate`类型 `– [x, y]`，作用为设置地图的中心坐标、`setResolution(number)`设置地图的分辨率（比例尺）、`setRotation(number)`，参数为旋转的角度对应的值，并不是度数，如`Math.PI`，不是180度，作用是将地图旋转相应点角度，顺时针为正、`setZoom(number)`设置地图的缩放级别。


## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/45603415)
