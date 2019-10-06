---
title: 地图点聚集
---

## 介绍

点聚集指在某个缩放级别下，将临近（一般用像素距离衡量）的点聚合为一个点要素显示，这在房屋中介的等的地图找房功能中很常见，如下图。但是这样的例子并不恰当，地图找房里的聚集确切的说并不是点聚集，他们是在每一级别显示某一级区块，然后在区块多边形的质心或者什么地方设置一个点要素，用预先统计好的数量给这个点要素设置样式而已。

![markdown](https://img-blog.csdn.net/20180915120540899?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Fpbmd5YWZhbg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70 "markdown")

而我们要做的是动态聚类，在每一个地图缩放级别，动态扫描每个要素周围的要素，生成聚集的点要素。这里，我们利用USGS的地震数据，结合openlayers尝试实现全球地震点聚集可视化的功能。最终结果如图：

![markdown](https://img-blog.csdn.net/2018091512062022?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Fpbmd5YWZhbg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70 "markdown")

## 具体实现

openlayers 提供了一个点聚集图层数据源类型ol.source.Cluster，结合矢量图层即可构造一个简单的聚集图层。点聚集图层数据源的distance类型控制聚集的阈值，当两点间像素距离小于20时便聚集为一个点。

```js
// 聚类图层
earthquakeCluster = new ol.layer.Vector({
    source: new ol.source.Cluster({
        distance: 80,
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
        })
    })
});
```

使用 styleFunction 修改默认样式：

```js
// 样式函数，对每个feature返回一个样式
let currentResolution;
let styleFunction = (feature, resolution) => {
    if (resolution != currentResolution) {
        calculateClusterInfo(resolution);  /** key code 2 **/
        currentResolution = resolution;
    }
    let style;
    let size = feature.get('features').length;
    if (size > 1) {
        style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: feature.get('radius'), /** key code 1 **/
                fill: new ol.style.Fill({
                    color: [255, 153, 0]
                })
            }),
            text: new ol.style.Text({
                text: size.toString(),
                fill: new ol.style.Fill({
                    color: '#fff'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.6)',
                    width: 3
                })
            })
        })
    } else {
        // 每个地震点的默认样式
        style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({
                    color: 'rgb(255, 0, 0)'
                })
            })
        });
    }
    return style;
}
```

把改样式设置给图层即可。如果聚集包含的点数量多于1个，设置聚集的样式，如果是1个，应用普通的点样式。重点关注标记了 **key code 1** 的那一行，我们对点要素使用了circle样式，并使用要素的radius属性值作为其半径，radius属性并不是聚集点要素的自带属性，我们要预先计算好。（注意： 这里我们使用了半径区别聚集，我们可以使用其他样式，比如颜色的深浅等指标）那么便需要关注 **key code 2**，`calculateClusterInfo(resolution)`便初始化了每个聚集的radius属性：

```js
// 初始化聚集要素的半径
// 可自由定义要素半径的计算规则
let maxFeatureCount;
let earthquakeCluster = null;
let calculateClusterInfo = (resolution) => {
    maxFeatureCount = 0;
    let features = earthquakeCluster.getSource().getFeatures();
    let feature, radius;
    for (let i = features.length - 1; i >= 0; i--) {
        feature = features[i];
        let originalFeatures = feature.get('features');
        let extent = ol.extent.createEmpty();
        let j = (void 0), jj = (void 0);
        for (let j = 0, jj = originalFeatures.length; j<jj; ++j) {
            ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
        }
        maxFeatureCount = Math.max(maxFeatureCount, jj);
        radius = 0.15 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent)) / resolution; /** key code **/
        feature.set('radius', radius);
    }
}
```

以上代码使用每个聚集包含的所有点要素的范围和地图的分辨率计算了radius，并不是包含的点要素的数量作为半径，所以你会发现并不是数量越多聚集的半径越大，而是聚集包含的点要素的范围越大，聚集半径越大，（注意这里你可以使用其他的指标计算半径，比如聚集包含的点的数量）。

完整代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>地震点聚集</title>
    <link rel="stylesheet" href="./css/ol.css">
    <script src="./js/ol.js"></script>
</head>
<body>
    <div id="map"></div>
    <script>
        // 初始化聚集要素的半径
        // 可自由定义要素半径的计算规则
        let maxFeatureCount;
        let earthquakeCluster = null;
        let calculateClusterInfo = (resolution) => {
            maxFeatureCount = 0;
            let features = earthquakeCluster.getSource().getFeatures();
            let feature, radius;
            for (let i = features.length - 1; i >= 0; i--) {
                feature = features[i];
                let originalFeatures = feature.get('features');
                let extent = ol.extent.createEmpty();
                let j = (void 0), jj = (void 0);
                for (let j = 0, jj = originalFeatures.length; j<jj; ++j) {
                    ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
                }
                maxFeatureCount = Math.max(maxFeatureCount, jj);
                radius = 0.15 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent)) / resolution;
                feature.set('radius', radius);
            }
        }
        // 样式函数，对每个feature返回一个样式
        let currentResolution;
        let styleFunction = (feature, resolution) => {
            if (resolution != currentResolution) {
                calculateClusterInfo(resolution);
                currentResolution = resolution;
            }
            let style;
            let size = feature.get('features').length;
            if (size > 1) {
                style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: feature.get('radius'),
                        fill: new ol.style.Fill({
                            color: [255, 153, 0]
                        })
                    }),
                    text: new ol.style.Text({
                        text: size.toString(),
                        fill: new ol.style.Fill({
                            color: '#fff'
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 0.6)',
                            width: 3
                        })
                    })
                })
            } else {
                // 每个地震点的默认样式
                style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 3,
                        fill: new ol.style.Fill({
                            color: 'rgb(255, 0, 0)'
                        })
                    })
                });
            }
            return style;
        }
        // 聚类图层
        earthquakeCluster = new ol.layer.Vector({
            source: new ol.source.Cluster({
                distance: 80,   // 聚类阈值，当两点间距离小于20，便聚类为一个点
                source: new ol.source.Vector({
                    format: new ol.format.GeoJSON(),
                    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
                })
            }),
            style: styleFunction
        });
        let map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([118, 36]),
                zoom: 2
            })
        });
        map.addLayer(earthquakeCluster)
    </script>
</body>
</html>
```

## Cluster原理

ol具体实现：

```js
if (this.resolution === undefined) {
    return;
}
this.features.length = 0;
const extent = createEmpty();
const mapDistance = this.distance * this.resolution;
const features = this.source.getFeatures();

const clustered = {};

for (let i = 0, ii = features.length; i < ii; i++) {
    const feature = features[i];
    if (!(getUid(feature).toString() in clustered)) {
    const geometry = this.geometryFunction(feature);
    if (geometry) {
        const coordinates = geometry.getCoordinates();
        createOrUpdateFromCoordinate(coordinates, extent);
        buffer(extent, mapDistance, extent);

        let neighbors = this.source.getFeaturesInExtent(extent);
        neighbors = neighbors.filter(function(neighbor) {
        const uid = getUid(neighbor).toString();
        if (!(uid in clustered)) {
            clustered[uid] = true;
            return true;
        } else {
            return false;
        }
        });
        this.features.push(this.createCluster(neighbors));
    }
    }
}
```

遍历所有的点要素（可以是其它类型的要素：线、面，但要为每个要素定义`geometryFunction`，接受每个要素的geometry，返回点geometry，所以我们可以取面的质心或者取线的中点等），首先，对要素做缓冲区`buffer(extent, mapDistance, extent)`;，缓冲区的半径是根据传入的距离阈值和分辨率计算得到`const mapDistance = this.distance * this.resolution`;，然后，在这个缓冲区中寻找不在其他聚集中(`clustered`)的点要素，最后，将聚集的位置设置在包含点的中心：`this.features.push(this.createCluster(neighbors))`;，`this.createCluster(neighbors)`计算这些点的中心。

## 总结

点聚集可以看很多呈点状分布的现象，如分析垃圾堆放点、村落分布、地震分布等，通过聚集我们可以看出它们的分布特点，当然我们也可以对面或线状要素做同样的聚集，但是效果应该不会很好。


## 相关链接

[CSDN庆祝亚运会](https://blog.csdn.net/qingyafan/article/details/82712666)

