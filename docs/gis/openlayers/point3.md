---
title: 地图实时追踪轨迹
---

## 介绍

之前有这样一个需求：模拟一个移动物体每隔一段时间就将其位置显示在地图上。当时我们使用的是websocket通信来建立通信。但这种做法有个问题，就是每次刷新的时候它会再建立一个连接，导致地图上出现多个点。所以使用这种方法就需要考虑刷新后将上一次连接断开。

现在我们介绍[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/50478360)的获取要素的方法。

## 实现

1. getFeatures

首先，我们知道，`ol.source.Vector`，提供了 `getFeatures` 方法，该方法获取图层中的所有要素，并返回其组成的数组，其定义如下：

```js
ol.source.Vector.prototype.getFeatures = function() {
  var features;
  if (this.featuresCollection_) {
    features = this.featuresCollection_.getArray();
  } else if (this.featuresRtree_) {
    features = this.featuresRtree_.getAll();
    if (!goog.object.isEmpty(this.nullGeometryFeatures_)) {
      goog.array.extend(
          features, goog.object.getValues(this.nullGeometryFeatures_));
    }
  }
  goog.asserts.assert(features !== undefined,
      'Neither featuresRtree_ nor featuresCollection_ are available');
  return features;
};
```

函数首先检查 `featuresCollection_` 是否为空，如果不为空，那么调用其 getArray 方法，`featuresCollection_` 是一个 `ol.Collection` 对象，是 openlayers 对 javascript 的 Array 的进一步封装，其 getArray 方法就是返回对象内含的数组，数组中便包含着图层包含的所有要素；如果 `featureCollection_` 为空，则进一步检查 `featuresRtree_` 是否为空，如果不为空，则获取其中的所有要素，并获取 `nullGeometryFeatures_` 中的所有要素，然后合并两个数组，返回；最后，如果都没有要素，那么就报错：“`featuresRtree_` 和 `featuresCollection_` 中都没有要素”，如果有要素，返回。

 - featuresCollection_结构: 

   featuresCollection_ 是内含要素集合的 ol.Collection 对象，除非是 source 对象的 useSpatialIndex 设置为 false，或者其 features 属性设置为 ol.Collection 的要素集合，否则 featuresCollection_ 的值将是 null。

所以如果不是以上的配置，那么往往 getFeatures 方法是获取的 featuresRtree_ 中包含的要素集合。

 - featuresRtree_结构：
 
featuresRtree_ 在 ol.source.Vector 其定义如下：

```js
/**
   * @private
   * @type {ol.structs.RBush.<ol.Feature>}
   */
  this.featuresRtree_ = useSpatialIndex ? new ol.structs.RBush() : null;
```

 类初始化时，首先检查 `useSpatialIndex` （其默认值为 true），如果是 true，那么将其初始化为 `ol.structs.RBush` 对象类型，否则为 null。那么这个 `ol.structs.RBush` 是什么类型呢？

   `ol.structs.RBush` 是 openlayers 对 RBush 的再次封装，RBush 是一个用于点和矩形的 2D 空间索引算法的高性能 javascript 实现，其基于优化的 R-tree 数据结构，支持批量插入。不了解GIS的可能对“空间索引”不是很了解，“空间索引”其实是一个特殊的数据结构，主要针对数据类型是点或者矩形，“空间索引”可以让你高效的执行将查询条件限定为一个矩形区域的查询，即“空间查询”，比循环检索所有条目有‘几百倍’的提升！“空间索引”普遍用于地图和数据可视化。

       我们从上面 getFeatures 的源码可以看到，其使用了 `ol.structs.Rbush` 的 getAll 方法，其 getAll 方法调用了 RBush 的 all( ) 方法，但是这个返回所有数据的方法，并不能保证其按照插入数据的顺序，这也很容易理解，我们来看 R-tree 在内存中的情况：

![markdown](https://img-blog.csdn.net/20160107215259558 "markdown")

![markdown](https://img-blog.csdn.net/20160107215259558 "markdown")

从图中可以看出，当插入一条数据，这条数据会被添加到其被包含的矩形区域中，但是并没有记录其插入时候的序号，所以当取出所有节点时，就并不能保证按照插入的顺序。

所以我们并不能写出如下的代码，期待‘总是’得到“最后添加的要素”，之所以说‘总是’是因为，有时候可以得到，但并不稳定，我测试是，当超过10后就会出错：

```js
var features = veclayer.getSource().getFeatures();
var feature_num = features.length;
var last_feature = features[feature_num-1];
```

2. getFeatureById

除此之外，`ol.source.Vector` 还提供了一个方法：`getFeatureById`，我们可以通过要素的 id 来获取它，前提是你给要素设置了 id，通过 `feature.setId(id)` 设置，正如开篇提到的需求，在程序自动获取的情况下，我们可以设置一个计数器，每次添加要素就将计数器的值自增 1，然后将计数器的值设置为相应添加的要素的id，当获取到新的点位置时，通过计数器获取最后添加的要素，将其样式设置为普通样式即可。


## 总结

本文主要讲了实时轨迹追踪问题的获取最后添加的要素的方法，并讨论了 ol.source.Vector 方法获取的要素为什么是没有规则的顺序的原因。


## 相关链接

另外， RBush 的作者是 Vladimir Agafonkin，其[项目位置](https://github.com/mourner/rbush)

