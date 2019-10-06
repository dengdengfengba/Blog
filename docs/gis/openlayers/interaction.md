---
title: 地图交互
---

## 介绍

地图交互功能和上一篇讲的地图控件有些混淆，它们都控制着用户与地图的交互，区别是地图控件的触发都是一些可见的 HTML 元素触发，如按钮、链接等；而交互功能都是一些设备行为触发，都是不可见的，如鼠标双击、滚轮滑动等，手机设备的手指缩放等。

地图的交互功能包含很多，如地图双击放大，鼠标滚轮缩放，矢量要素点选，地图上绘制图形等等。只要是涉及到与地图的交互，就会涉及到 intercation 类，它定义了用户与地图进行交互的基本要素和事件。下面我们就来看看用户与地图都有那些交互，怎么交互。

注: '自定义用户交互类型'，'定制化交互' 或者 '交互优化' 都超出了本文范围。

## 参数

在ol 中，表达交互功能的基类是 interaction，它是一个虚基类，不负责实例化，交互功能都继承该基类， ol 中可实例化的子类及其功能如下：

 - doubleclickzoom interaction，双击放大交互功能
 - draganddrop interaction，以“拖文件到地图中”的交互添加图层
 - dragbox interaction，拉框，用于划定一个矩形范围，常用于放大地图
 - dragpan interaction，拖拽平移地图
 - dragrotateandzoom interaction，拖拽方式进行缩放和旋转地图
 - dragrotate interaction，拖拽方式旋转地图
 - dragzoom interaction，拖拽方式缩放地图
 - draw interaction，绘制地理要素功能
 - interaction defaults ，规定了默认添加的交互功能
 - keyboardpan interaction，键盘方式平移地图
 - keyboardzoom interaction，键盘方式缩放地图
 - select interaction，选择要素功能
 - modify interaction，更改要素
 - mousewheelzoom interaction，鼠标滚轮缩放功能
 - pinchrotate interaction，手指旋转地图，针对触摸屏
 - pinchzoom interaction，手指进行缩放，针对触摸屏
 - pointer interaction，鼠标的用户自定义事件基类
 - snap interaction，鼠标捕捉，当鼠标距离某个要素一定距离之内，自动吸附到要素

## interaction defaults - 默认添加的交互功能

该类规定了默认包含在地图中的功能，主要是最为常用的功能，如缩放、平移和旋转地图等，具体功能有如下这些：

 - ol.interaction.DragRotate，鼠标拖拽旋转，一般配合一个键盘按键辅助
 - ol.interaction.DragZoom，鼠标拖拽缩放，一般配合一个键盘按键辅助
 - ol.interaction.DoubleClickZoom，鼠标或手指双击缩放地图
 - ol.interaction.PinchRotate，两个手指旋转地图，针对触摸屏
 - ol.interaction.PinchZoom，两个手指缩放地图，针对触摸屏
 - ol.interaction.DragPan，鼠标或手指拖拽平移地图
 - ol.interaction.KeyboardZoom，使用键盘 + 和 - 按键进行缩放
 - ol.interaction.KeyboardPan，使用键盘方向键平移地图
 - ol.interaction.MouseWheelZoom，鼠标滚轮缩放地图

可以看出，很多都兼容移动设备的触摸屏，键盘，鼠标事件，而且这些功能都是默认添加的，如果要更改默认的选项，需要在相应的选项设置为 false。如果想去掉默认的 DoubleClickZoom 功能，配置如下：

```js
interactions: ol.interaction.defaults([
    doubleClickZoom: false
]),
```

## draw interaction - 绘图功能

[draw详解](/gis/openlayer/draw1.html)
[draw原理](/gis/openlayer/draw2.html)

绘图交互允许绘制几何地理要素，可选参数为一个对象，包含参数如下：

```js
/**
 * @typedef {{features: (ol.Collection.<ol.Feature>|undefined),
 *     source: (ol.source.Vector|undefined),
 *     snapTolerance: (number|undefined),
 *     type: ol.geom.GeometryType,
 *     minPointsPerRing: (number|undefined),
 *     style: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined),
 *     geometryName: (string|undefined),
 *     condition: (ol.events.ConditionType|undefined)}}
 * @api
 */
```

 - features，绘制的要素的目标集合
 - source，绘制的要素的目标图层来源，即目标图层的 source属性 
 - snapTolerance，自动吸附完成点的像素距离，也就是说当鼠标位置距离闭合点小于该值设置的时候，会自动吸附到闭合点，默认值是 12;
type，绘制的地理要素类型，`ol.geom.GeometryType`类型，包含 `Point`、 `LineString`、 `Polygon`、`MultiPoint`、`MultiLineString` 或者 `MultiPolygon`
 - minPointsPerRing，绘制一个多边形需要的点数最小值，数值类型，默认是 3
 - style，要素素描的样式，是 ol.style.Style对象之一
 - geometryName，绘制的地理要素的名称，string类型
 - condition，一个函数，接受一个`ol.MapBrowserEvent`类型的参数，返回一个布尔值表示是否应该调用事件处理函数。默认情况下，增加一个顶点，类型为 `ol.events.ConditionType`

给地图添加该交互功能，首先需要实例化一个ol.interaction.Draw，必须指定 source和type属性：

```js
var draw = new ol.interaction.Draw({
    source: source,
    type: "Polygon"
});
```

然后将该功能添加到地图中map.addInteraction(draw)。

这里我们在页面中添加一个 HTML select 元素，通过选择要素类型，绘制相应的要素类型：

```HTML
<select id="type">
  <option value="None">None</option>
  <option value="LineString">LineString</option>
  <option value="Polygon">Polygon</option>
</select>
```

定义一个函数用于添加该交互功能：

```js
var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later
function addInteraction() {
  var value = typeSelect.value;
  if (value !== 'None') {
    draw = new ol.interaction.Draw({
      source: source,
      type: value
    });
    map.addInteraction(draw);
  }  
}
```

绑定select值变化触发的事件：

```js
typeSelect.onchange = function(e) {
  map.removeInteraction(draw);
  addInteraction();
};
```

最后首先执行绑定函数`addInteraction()`;，然后点击鼠标进行绘制：

![markdown](https://img-blog.csdn.net/20150515223812835 "markdown")

##  dragrotateandzoom interaction - 鼠标拖拽进行缩放和旋转地图

拖拽实现旋转和缩放地图的功能。首先定义该交互对象：

```js
/* *
 * 定义地图的交互功能
 */
 var interactions = ol.interaction.defaults().extend([
    new ol.interaction.DragRotateAndZoom()
 ]);
```

然后在 map 中加入交互对象：

```js
var map = new ol.Map({
    target: 'map',
    interactions: interactions,
    layers: [...]
    ...
})
```

这个功能的使用方法是首先按住键盘的 shift 按钮，然后使用鼠标点住地图一点，然后拖拽鼠标围绕地图中心旋转，地图就会选择相应的角度；如果拖拽鼠标远离地图中心，就会实现地图的放大，靠近地图中心，地图就会缩小。

该功能是两个单独功能的合体： `dragzoom` 和 `dragrotate`，一个负责拖拽缩放，一个负责拖拽旋转，和以上的功能一样。

## dragbox interaction - 拉框交互

在地图上拉出一个矩形框，一般配合使用一个辅助按键，如Shift，常用于放大功能。该功能是默认添加在地图中的，默认情况下，按下Shift，然后拖动鼠标拉框，然后地图就会将框内内容放大。

![markdown](https://img-blog.csdn.net/20150516125108990 "markdown")

![markdown](https://img-blog.csdn.net/20150516125305480 "markdown")

##  draganddrop interaction - 拖拽文件到地图

将空间数据使用鼠标或者手指拖拽到地图中，解析成一个图层添加到地图中。目前只支持矢量数据，未来可能支持更多的空间数据格式。目前，支持的格式包括 `GeoJSON`, `GML`, `KML`, `GPX`, `OSMXML`, `TopoJSON` 和 `IGC`。首先实例化一个 `draganddrop interaction`：

```js
var dragAndDropInteraction = new ol.interaction.DragAndDrop({
  formatConstructors: [
    ol.format.GeoJSON,
    ol.format.KML
  ]
});
```

`formatConstructors` 表示想要支持的格式，这里我选择了支持两种常见的格式：`GeoJSON` 和 `KML`，然后将该交互添加到地图中：

```js
var interactions = ol.interaction.defaults().extend([
    new ol.interaction.DragRotateAndZoom(),
    dragAndDropInteraction
 ]);
```

 如果想在添加数据的时候定义一些额外行为，比如缩放到添加到数据的范围，需要注册 `interaction` 的事件-`dragAndDropInteraction.on('addfeatures', function(event) {})`;， 以下为拖拽一个KML文件到地图中：

 ![markdown](https://img-blog.csdn.net/20150517094522778 "markdown")

 ![markdown](https://img-blog.csdn.net/20150517094451402 "markdown")

## keyboard interaction - 键盘交互功能

包含 `ol.interaction.KeyboardZoom` 和 `ol.interaction.KeyboardPan`，分别是键盘缩放和键盘平移。默认添加到地图中，但是只有当焦点在包含地图的 HTML 元素上，才可用。可以通过修改 `ol.Map` 的 `keyboardEventTarget` 属性，修改键盘事件的关联 HTML 元素。

`ol.interaction.KeyboardZoom`，使用键盘+ 和 - 进行地图缩放；`ol.interaction.KeyboardPan`，使用方向键平移地图。

##　modify 和 select interaction

select 就像名字暗示的一样，是用来选中要素的；而 modify 是修改要素的，主要是通过拖拽方式修改点的坐标。

![markdown](https://img-blog.csdn.net/20150520113251350 "markdown")

![markdown](https://img-blog.csdn.net/20150520113155210 "markdown")

模拟选中并修改要素的交互功能需要添加如下代码：

```js
var select = new ol.interaction.Select();
var moddify = new ol.interaction.Modify({
    features:select.getFeatures()
});
```

`features`: `select.getFeatures()`目的为修改选中的要素。 然后将两个交互功能添加到 map 中就可以使用其功能了。

## pinchrotate ，pinchzoom interaction - 两个手指缩放和旋转地图

这两个功能针对触摸屏，两个手指按住地图，增减距离来实现缩放，旋转手指，地图跟着旋转。默认添加到地图中。

## pointer interaction - 自定义鼠标事件

针对鼠标的行为按下（`Down`）、移动（`Move`）和抬起（`Up`），自定义事件。这三个事件发生有先后顺序，首先是触发按下，之后是移动事件，最后是抬起事件。只要配置相关的属性，包含`handleDownEvent`，`handleDragEvent`，`handleMoveEvent`，`handleUpEvent`分别对应鼠标的 `down`、`drag`、`move`和`up`四种事件。例如配置鼠标的按下左键事件，当按下鼠标左键时候，就会触发 `functionName`函数 ：

```js
new ol.interaction.Pointer({
    handleDownEvent: functionName
})
```

## snap interaction - 鼠标捕捉

当修改和绘制矢量要素时，鼠标距离某个要素一定距离之内，自动吸附到要素。

![markdown](https://img-blog.csdn.net/20150520132144892 "markdown")

再靠近就会吸附到黄色的点
![markdown](https://img-blog.csdn.net/20150520132317684 "markdown")

可以配置的选项有 具有捕捉吸附功能的要素集 或者 矢量图层，发生捕捉的最大距离（像素为单位），使用方法如下：

```js
new ol.interaction.Snap({
    features: 要素集(ol.Collection),
    pixelTolerance: 捕捉发生的距离，像素数，默认为10，
    source: 具有捕捉功能的图层(ol.source.Vector)
})
```

## 总结

交互功能比较多，主要涉及用户与地图交互需要的基本功能：缩放、平移拖拽、旋转，为了提高兼容性，除了针对鼠标和键盘的交互，还有针对触摸屏的缩放、旋转和平移拖拽。

比较有用的有勾绘draw、选择要素select、modify、捕捉吸附snap 和 鼠标自定义事件pointer。这些交互功能可以共同构建一个动态标绘系统，在客户端增加或者修改空间数据，提交给服务器，更新数据。

## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/45887109)

