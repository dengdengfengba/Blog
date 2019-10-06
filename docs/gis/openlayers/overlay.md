---
title: 地图覆盖物
---

## 介绍

`Overlay` 从名字看，是覆盖图、覆盖物的意思，主要的用途就是在地图之上再覆盖一层，用以显示额外的可见元素，可见元素一般是 HTML 元素，利用 `overlay`，可以将可见元素放置到地图的任意位置，形成地图上再浮动一层的效果。例如在地图上相应的坐标放置一个标志，标签，利用 `overlay` 都可以做到，具体来说，点击地图上某位置，在点击位置弹出弹出框就是利用了 `overlay`。

因为 `overlay` 是固定在特定坐标的可见元素，因此移动地图（pan操作）和进行缩放，`overlay` 会与地图坐标相对位置不变，跟着地图移动。`overlay` 直接继承了 `ol.Object` ，很多 `ol.Object` 对象的方法和监听事件直接被继承到了 `overlay` 中。


## 参数

`overlay` 初始化时可以接受很多的配置参数，这些配置参数是一个个的键值对，共同构成一个对象字面量（`options`），然后传递给其“构造函数”，如 `new ol.Overlay(options)`，此处的 `options` 便是参数键值对构成的对象字面量。可配置的键值对，定义如下：

```js
/**
 * Object literal with config options for the overlay.
 * @typedef {{id: (number|string|undefined),
 *     element: (Element|undefined),
 *     offset: (Array.<number>|undefined),
 *     position: (ol.Coordinate|undefined),
 *     positioning: (ol.OverlayPositioning|string|undefined),
 *     stopEvent: (boolean|undefined),
 *     insertFirst: (boolean|undefined),
 *     autoPan: (boolean|undefined),
 *     autoPanAnimation: (olx.animation.PanOptions|undefined),
 *     autoPanMargin: (number|undefined)}}
 * @api stable
 */
olx.OverlayOptions;
```

 - id: 为对应的 overlay 设置一个 id，便于使用 ol.Map 的 getOverlayById 方法取得相应的 overlay
 - element: overlay 包含的 DOM element
 - offset: 偏移量，像素为单位，overlay 相对于放置位置（position）的偏移量，默认值是 [0, 0]，正值分别向右和向下偏移
 - position: 在地图所在的坐标系框架下，overlay 放置的位置
 - positioning: overlay 对于 position 的相对位置，可能的值包括 bottom-left、bottom-center、bottom-right 、center-left、center-center、center-right、top-left、top-center、top-right，默认是 top-left，也就是 element 左上角与 position 重合
 - stopEvent: 地图的事件传播是否停止，默认是 true，即阻止传播，可能不太好理解，举个例子，当鼠标滚轮在地图上滚动时，会触发地图缩放事件，如果在 overlay 之上滚动滚轮，并不会触发缩放事件，如果想鼠标在 overlay 之上也支持缩放，那么将该属性设置为 false 即可
 - insertFirst: overlay 是否应该先添加到其所在的容器（container），当 stopEvent 设置为 true 时，overlay 和 openlayers 的控件（controls）是放于一个容器的，此时将 insertFirst 设置为 true ，overlay 会首先添加到容器，这样，overlay 默认在控件的下一层（CSS z-index），所以，当 stopEvent 和 insertFirst 都采用默认值时，overlay 默认在 控件的下一层
 - autoPan: 当触发 overlay setPosition 方法时触发，当 overlay 超出地图边界时，地图自动移动，以保证 overlay 全部可见
 - autoPanAnimation: 设置 autoPan 的效果动画，参数类型是 olx.animation.panOptions
 - autoPanMargin: 地图自动平移时，地图边缘与 overlay 的留白（空隙），单位是像素，默认是 20像素

## 事件

支持的事件主要是继承 `ol.Object` 而来的 `change` 事件，当 `overlay` 相关属性或对象变化时触发：

 - change，当引用计数器增加时，触发
 - change:element，overlay 对应的 element 变化时触发
 - change:map，overlay 对应的 map 变化时触发
 - change:offset，overlay 对应的 offset 变化时触发
 - change:position，overlay 对应的 position 变化时触发
 - change:positioning，overlay 对应的 positioning 变化时触发
 - propertychange，overlay 对应的属性变化时触发

openlayers 绑定事件遵循一般的 dom 事件绑定规则，包括 DOM 2 级事件绑定。举例说明：

```js
// example overlay event binding
var overlay = new ol.Overlay({
    // ...
});
overlay.on("change:position", function(){
    console.log("位置改变！");
})
```

## 方法

支持的方法这里只介绍 overlay 特有的方法，就不介绍其继承而来的方法。主要是针对 overlay 的属性及其相关联对象的 get 和 set 方法：

 - getElement，取得包含 overlay 的 DOM 元素
 - getId，取得 overlay 的 id
 - getMap，获取与 overlay 关联的 map对象
 - getOffset，获取 offset 属性
 - getPosition，获取 position 属性
 - getPositioning，获取 positioning 属性
 - setElement；设置 overlay 的 element
 - setMap，设置与 overlay 的 map 对象
 - setOffset，设置 offset
 - setPosition，设置 position 属性
 - setPositioning，设置 positioning 属性

## 总结

利用 Overlay 可以做出很多很棒的效果，任何做出的 HTML 元素效果，都可以通过 overlay 添加到地图之上，形成覆盖物的效果，如在灾害点放置动态点扩散效果的文章中实现的效果，以及点击地图，在相应位置[弹出信息框](/gis/openlayer/popup.html)，都是利用了 overlay 。

## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/49840041)

