---
title: draw详解
---

## 介绍

Ol中负责勾绘交互的是 interaction 中的 `draw interaction`，默认支持绘制的图形类型包含 `Point`（点）、`LineString`（线）、`Polygon`（面）和`Circle`（圆）。

触发的事件包含 `drawstart`和`drawend`，分别在勾绘开始时候（单击鼠标）和结束时候触发（双击鼠标），利用 ol 给一个 Web 地图添加勾绘交互很简单，在地图初始化的时候添加这个交互或者后续追加：

初始化 map 时添加 draw interaction：

```js
var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
    source: source
});
var map = new ol.Map({
    interactions: ol.interaction.defaults().extend([
        new ol.interaction.Draw({
            source: source,
            type: 'Polygon',
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            })
        })
    ]),
    target: 'map',
    layers: [
        vector
    ],
    view: new ol.View({
          center: ol.proj.transform([120,31], 'EPSG:4326', 'EPSG:3857'),
          zoom: 12
    })
}); 
```

后续添加 draw interaction：

```js
var map = new ol.Map({
    target: 'map',
    layers: [
        vector
    ],
    view: new ol.View({
          center: ol.proj.transform([120,31], 'EPSG:4326', 'EPSG:3857'),
          zoom: 12
    })
}); 

var draw = new ol.interaction.Draw({
    source: source,
    type: 'Polygon',
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
})
map.addInteraction(draw);
```

无论采用哪种方式，执行的结果会是下图这样，点击鼠标左键，逐一添加多半形的顶点：

![markdown](https://img-blog.csdn.net/20150920130238467 "markdown")

需要指出的是，当勾绘多边形超过三个点时，我们完成多边形的方式有两种，一种是在最后一个点进行双击，这样会根据现存的点围成一个多边形；另一种是将绘制最后一个点时，与第一个点重合，但是手动肯定会有误差，所以这里就用到了吸附，就是当鼠标靠近一个矢量点一定距离时，会自动吸附到相应的矢量点。

![markdown](https://img-blog.csdn.net/20150920140411710 "markdown")

我们看到初始化 draw interaction 需要一些可选参数:

```js
var draw = new ol.interaction.Draw({
    source: source,
    type: 'Polygon',
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
})
```

这里指定了三个参数，`source` 表示勾绘的要素属于的数据集，这里是属于一个矢量图层 `vector` 的矢量数据集 `source`。这样勾绘的要素就会添加到 `source` 所属的矢量图层，我们才可以看到勾绘的结果；type 表示勾绘的要素包含的 `geometry` 类型，这里是多边形；style 表示勾绘的要素的样式。其他更多的参数选项有：`clickTolerance`、`snapTolerance`、`source`、`minPoints`、`maxPoints`、`geometryFunction`、`geometryName`、`condition`、`freehandCondition`、`wrapX`。

## clickTolerance

数值类型，单位是像素，判断用户鼠标（PC）或者手指（移动设备）的行为是添加点，还是按住鼠标或者手指不松开进行拖拽地图，默认值是 6 像素，也就是说当按下鼠标和抬起鼠标左键之间的这段时间段内，如果地图被拖动没有超过 6 像素，那么默认为添加一个点，相反如果超过了 6 像素，那么不会添加点，只是平移一下地图。

## features

绘制的要素所属的要素集合，要素集合（featureCollection）是要素集（source）的一个子集，要素集包含要素集合。要素集合添加到要素集（source），才会显示到 source 所属的矢量图层。这个参数和 source 参数很类似。

## snapTolerance

数值，像素为单位，默认值是 12 像素。上面我们提到完成多边形时，可以把最后一个点与第一个点重合来完成，那么我们知道重合很难做到，只有吸附才能做到精确重合。上图可以看到鼠标所指的位置和吸附的矢量点还有一定的距离，也就是说当鼠标位置进入以矢量点为圆心，一定距离为半径的圆范围内，就会被吸附到相应的矢量点。具体的值就是在这里设置的。

我们改变一下 snapTolerance 的值，对比一下效果，首先我们设置 snapTolerance 为 默认：

![markdown](https://img-blog.csdn.net/20150920140411710 "markdown")

为了更好的看到效果，更改 snapTolerance 为50，如图：

![markdown](https://img-blog.csdn.net/20150920155015219 "markdown")

可以明显看到鼠标所在位置和吸附点的位置变大，需要指出的是吸附选项只会吸附起始点和当前的最后一个点，且只会吸附当前绘制的多边形。

## maxPoints & minPoints 

都是数值类型，maxPoints 表示绘制单个要素（面和线）最多的点数限制，默认没有限制；minPoints 表示绘制单个要素（面和线）需要的最少点数，面默认为 3，线默认为 2。

## geometryFunction 

默认的绘制类型只有四种类型，如果我想绘制一个矩形框呢？当然有一个拉框交互可以实现这个效果，这里我们使用 draw 交互来实现拉框的效果，这个要结合 maxPoints 加以限制。

该函数有两个参数，一个是坐标集合、一个是勾绘的 geometry 类型，返回构造好的 geometry 对象，用来初始化要素。如下，我们给 draw 增加 geometryFunction 参数和 maxPoints 参数：

```js
var draw = new ol.interaction.Draw({
    source: source,
    type: 'LineString',
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    }),
    maxPoints: 2,
    geometryFunction: function(coordinates, geometry){
        if(!geometry){
            geometry = new ol.geom.Polygon(null);
        }
        var start = coordinates[0];
        var end = coordinates[1];
        geometry.setCoordinates([
            [start, [start[0], end[1]], end, [end[0], start[1]], start]
        ]);
        return geometry;
    }
})
```

注意到我修改了 type 属性，为勾绘 LineString，也就是线。这里的原理就是捕捉鼠标点击的点，然后获取限制的两个点的坐标，用来初始化一个矩形框。运行结果如图：

![markdown](https://img-blog.csdn.net/20150920165759886 "markdown")

## geometryName

字符串类型，绘制的 geometry 的名称。

## condition

类型为 ol.events.ConditionType，规定了什么情况下触发 draw 操作，默认不需要特殊条件进行触发。

## freehandCondition

类型同condition，也是 ol.events.ConditionType，这个选项规定了什么情况下触发不用重复点击绘制模式，即拖拽鼠标就可以绘制图形的模式，默认情况下是按下 shift 按键，这种模式对于不容易绘制的曲线比较方便，而且释放 shift 情况下，如果没有完成绘制，可以继续使用点击绘制。

## wrapX

当地图水平显示多个相同位置时，是否显示多个勾绘任务，默认为 false，设置为 true，效果如下：

![markdown](https://img-blog.csdn.net/20150920173011811 "markdown")

## 总结

利用 Draw 交互可以创作出很多有用的功能，比如做一个可以支持缩放和平移的绘图板；还可以新建一个矢量图层，覆盖在底图上，然后描出地图的轮廓，这样便可以进行简单的数字化；或者在地图上勾绘一下矢量图斑，保存到数据库，来完成一下编辑操作等等的任务。


## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/48622467)


