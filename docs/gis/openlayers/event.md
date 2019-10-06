---
title: 地图事件
---

## 介绍

我们都知道javascript的事件机制是遵循 W3C 的标准的，那么openlayers当然也是遵循这个标准，只不过是对其进行了的简化实现。

而事件机制的设计模式其实是观察者模式（对象间的一对多的依赖关系，当对象的状态发生改变时，依赖它的对象都将得到通知并被自动更新）。对象（也就是包含事件的类）并不创建事件对象实例，它们往往注册某些类型的事件及其监听函数（事件对象作为其第一个参数），在某种类型的事件被分发（dispatch）时，所有监听该类型事件的函数都会触发并执行。所有的事件事件对象实例都有一个 target 属性，对应于触发事件的对象（一般是 dom 元素），监听器的内部 this 默认指向 target，可以通过绑定时候配置。有一些自定义的事件类型，可能有额外的属性。

openlayers 中实现注册和解除监听函数功能的类是 ol.Observable，因此任何继承于 ol.Observable 的类的对象实例都具有注册或者解除注册监听器的能力，并且可以分发事件。

## ol事件机制结构

ol 的事件类型有地图点击事件、拖拽事件等，但它们都是基于基本的浏览器通用事件，就像 javascript 中使用的一样，OL 中具体的事件体系结构规定如下图：

![markdown](https://img-blog.csdn.net/20160504090644081 "markdown")

 - event.js，定义了 openlayers 的事件基类，所有事件有关的类都继承这个类
 - mapevent.js，地图事件的基类，地图的各种事件类型都会继承这个类
 - mapbrowserevent.js，地图浏览器事件

 - events
    + event.js: openlayers对于 W3C DOM 2级 Event 接口的精简实现，事件对象中只包含 target type 属性，和 stopPropagation preventDefault方法
    + eventtarget.js: openlayers对于 W3C DOM 2级 EventTarget 接口的精简实现，实现中没有捕获模型，没有实现‘事件目标层次结构’，当监听器调用stopProgation 或者 preventDefault时，效果是其他的监听器不会再被调用，和监听器返回 false 一个效果
    + condition.js，包含了判定满足某种条件的鼠标和键盘事件的函数集合。

 - pointer
    + pointerevent.js: 鼠标指针事件的基类
    + pointereventhandler.js: 包含注册、解除注册、触发等一系列与事件有关的工具类
    + eventsource.js，事件的来源
        - mousesource.js，来自鼠标的事件
        - mssource.js，来自IE 的事件
        - nativesource.js，来自本地的事件
        - touchsource.js，触控设备的触摸事件

其实events 目录中定义的就是 W3C 关于浏览器事件规范的精简实现，event.js 定义的就是事件对象，也就是触发事件时返回的事件对象，包含 target 属性，指向绑定的DOM元素；eventtarget.js 定义的是事件目标对象，也就是被注册事件的DOM对象，包含添加和移除特定类型监听函数的能力和分发事件的能力，注册的监听函数维护在 ‘listeners’ 数组中。


## ol.Observable

`ol.Observable` 提供了从事件目标注册和移除监听器的功能，任何继承于 `ol.Observable` 的类的对象实例都具有注册或者移除注册监听器的能力。其提供的方法如下：

 - changed(): 增加事件对象的版本号（每次事件对象变化，都会增加版本号），并分发 change 事件
 - dispatchEvent(event): 分发事件，并调用所有的监听该类型事件的监听器
 - getRevision(): 获取事件对象的版本号
 - on(type, listener, opt_this): 监听 type 类型的事件，若事件触发，则调用 listener 函数
 - once(type, listener, opt_this): 监听 type 类型的事件（仅一次），若事件触发，则调用 listener 函数，并移除该监听器
 - un(type, listener, opt_this): 移除监听 type 类型的监听函数 listener
 - unByKey(key): 移除对应 key 的监听器，key 一般是由 on() 或者 once() 返回的

此外还提供了一个静态方法： `ol.Observable.unByKey`，和原型方法 `ol.prototype.unByKey(key)` 是一致的定义。推荐使用静态方法，其定义如下：

```js
/**
* Removes an event listener using the key returned by on() or once().
* Note that using the {@link ol.Observable.unByKey} static function is to
* be preferred.
* @param {ol.events.Key|Array.<ol.events.Key>} key The key returned by on() or once() (or an array of keys).
* @function
* @api stable
*/
ol.Observable.prototype.unByKey = ol.Observable.unByKey;
```

## 使用事件实例

此处使用ol事件结合 '切片WMS数据源'（ol.source.TileWMS）对象的事件机制进行实例分析。

```js
/**
 * Update the user-provided params.
 * @param {Object} params Params.
 * @api stable
 */
ol.source.TileWMS.prototype.updateParams = function(params) {
  ol.object.assign(this.params_, params);
  this.resetCoordKeyPrefix_();
  this.resetParamsKey_();
  this.updateV13_();
  this.changed();
};
```

我们看到方法中除了赋值新的 params 给 this.params_ 之外，还调用了四个函数，这四个函数功能分别如下：

 - this.resetCoordKeyPrefix_(): 修改 this.coordKeyPrefix 为使用 ‘#’ 分隔符连接的 this.urls 数组
 - this.resetParamsKey_(): 修改 this.paramsKey_ 为使用 ‘/’ 分隔符连接的 this.params 数组
 - this.updateV13_(): 比较参数中指定的 WMS 协议版本号和 ‘1.3’ 版本号，如果不低于1.3，那么返回 true
 - this.changed(): 这个函数是 ol.Observable 中定义的，它会触发 ol.events.EventType.CHANGE 事件，所有的 source 类型都继承 ol.source.Source，而它继承了 ol.Object，其继承了 ol.Observable，因此所有 source 类型中都可以使用事件机制

changed 函数的定义：

```js
/**
 * Increases the revision counter and dispatches a 'change' event.
 * @api
 */
ol.Observable.prototype.changed = function() {
  ++this.revision_;
  this.dispatchEvent(ol.events.EventType.CHANGE);
};
```

这里调用的 `dispatchEvent(event)` 方法，是定义在 `events/eventtarget.js` 中的方法，因为 `ol.Observable` 继承了定义在 `events/eventtarget.js` 中的 `ol.events.EventTarget`，`dispatchEvent` 方法是其原型方法。方法的作用是触发一个事件，并调用所有监听该类型事件的 `listeners`，`event` 参数可以是字符串，也可以是一个包含 type 属性的事件对象。定义如下：

```js
/**
 * @param {{type: string,
 *     target: (EventTarget|ol.events.EventTarget|undefined)}|ol.events.Event|
 *     string} event Event or event type.
 * @return {boolean|undefined} `false` if anyone called preventDefault on the
 *     event object or if any of the listeners returned false.
 */
ol.events.EventTarget.prototype.dispatchEvent = function(event) {
  var evt = typeof event === 'string' ? new ol.events.Event(event) : event;
  var type = evt.type;
  evt.target = this;
  var listeners = this.listeners_[type];
  var propagate;
  if (listeners) {
    if (!(type in this.pendingRemovals_)) {
      this.pendingRemovals_[type] = 0;
    }
    for (var i = 0, ii = listeners.length; i < ii; ++i) {
      if (listeners[i].call(this, evt) === false || evt.propagationStopped) {
        propagate = false;
        break;
      }
    }
    var pendingRemovals = this.pendingRemovals_[type];
    delete this.pendingRemovals_[type];
    while (pendingRemovals--) {
      this.removeEventListener(type, ol.nullFunction);
    }
    return propagate;
  }
};
```

函数首先检查事件目标是否有该类型的监听函数，如果有，就依次调用。

ol 中的 map 实例中包含的所有图层都会添加到 `ol.MapProperty.LAYERGROUP` 中，而在 map 实例初始化时，对 `ol.MapProperty.LAYERGROUP` 设置了监听函数：

```js
ol.events.listen ( this, ol.Object.getChangeEventType(ol.MapProperty.LAYERGROUP), this.handleLayerGroupChanged_, this);
```

`handleLayerGroupChanged_` 定义如下：

```js
/**
 * @private
 */
ol.Map.prototype.handleLayerGroupChanged_ = function() {
  if (this.layerGroupPropertyListenerKeys_) {
    this.layerGroupPropertyListenerKeys_.forEach(ol.events.unlistenByKey);
    this.layerGroupPropertyListenerKeys_ = null;
  }
  var layerGroup = this.getLayerGroup();
  if (layerGroup) {
    this.layerGroupPropertyListenerKeys_ = [
      ol.events.listen(
          layerGroup, ol.ObjectEventType.PROPERTYCHANGE,
          this.handleLayerGroupPropertyChanged_, this),
      ol.events.listen(
          layerGroup, ol.events.EventType.CHANGE,
          this.handleLayerGroupMemberChanged_, this)
    ];
  }
  this.render();
};
```

函数首先删除与地图图层相关的所有监听函数，然后重新监听图层组的成员（图层）和属性的变化事件，最后调用 render()函数，重新绘制地图。

## 总结

此处分析了ol的事件结构，并结合 `ol.source.TileWMS` 讲解了具体的实例。当然，您也可以看另一个[鼠标右键事件](/gis/openlayer/event1.html)作进一步了解

## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/50926858)

