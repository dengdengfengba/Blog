(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{182:function(t,a,n){"use strict";n.r(a);var s=n(2),e=Object(s.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h2",{attrs:{id:"介绍"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#介绍","aria-hidden":"true"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),n("p",[t._v("地图交互功能和上一篇讲的地图控件有些混淆，它们都控制着用户与地图的交互，区别是地图控件的触发都是一些可见的 HTML 元素触发，如按钮、链接等；而交互功能都是一些设备行为触发，都是不可见的，如鼠标双击、滚轮滑动等，手机设备的手指缩放等。")]),t._v(" "),n("p",[t._v("地图的交互功能包含很多，如地图双击放大，鼠标滚轮缩放，矢量要素点选，地图上绘制图形等等。只要是涉及到与地图的交互，就会涉及到 intercation 类，它定义了用户与地图进行交互的基本要素和事件。下面我们就来看看用户与地图都有那些交互，怎么交互。")]),t._v(" "),n("p",[t._v("注: '自定义用户交互类型'，'定制化交互' 或者 '交互优化' 都超出了本文范围。")]),t._v(" "),n("h2",{attrs:{id:"参数"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#参数","aria-hidden":"true"}},[t._v("#")]),t._v(" 参数")]),t._v(" "),n("p",[t._v("在ol 中，表达交互功能的基类是 interaction，它是一个虚基类，不负责实例化，交互功能都继承该基类， ol 中可实例化的子类及其功能如下：")]),t._v(" "),n("ul",[n("li",[t._v("doubleclickzoom interaction，双击放大交互功能")]),t._v(" "),n("li",[t._v("draganddrop interaction，以“拖文件到地图中”的交互添加图层")]),t._v(" "),n("li",[t._v("dragbox interaction，拉框，用于划定一个矩形范围，常用于放大地图")]),t._v(" "),n("li",[t._v("dragpan interaction，拖拽平移地图")]),t._v(" "),n("li",[t._v("dragrotateandzoom interaction，拖拽方式进行缩放和旋转地图")]),t._v(" "),n("li",[t._v("dragrotate interaction，拖拽方式旋转地图")]),t._v(" "),n("li",[t._v("dragzoom interaction，拖拽方式缩放地图")]),t._v(" "),n("li",[t._v("draw interaction，绘制地理要素功能")]),t._v(" "),n("li",[t._v("interaction defaults ，规定了默认添加的交互功能")]),t._v(" "),n("li",[t._v("keyboardpan interaction，键盘方式平移地图")]),t._v(" "),n("li",[t._v("keyboardzoom interaction，键盘方式缩放地图")]),t._v(" "),n("li",[t._v("select interaction，选择要素功能")]),t._v(" "),n("li",[t._v("modify interaction，更改要素")]),t._v(" "),n("li",[t._v("mousewheelzoom interaction，鼠标滚轮缩放功能")]),t._v(" "),n("li",[t._v("pinchrotate interaction，手指旋转地图，针对触摸屏")]),t._v(" "),n("li",[t._v("pinchzoom interaction，手指进行缩放，针对触摸屏")]),t._v(" "),n("li",[t._v("pointer interaction，鼠标的用户自定义事件基类")]),t._v(" "),n("li",[t._v("snap interaction，鼠标捕捉，当鼠标距离某个要素一定距离之内，自动吸附到要素")])]),t._v(" "),n("h2",{attrs:{id:"interaction-defaults-默认添加的交互功能"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#interaction-defaults-默认添加的交互功能","aria-hidden":"true"}},[t._v("#")]),t._v(" interaction defaults - 默认添加的交互功能")]),t._v(" "),n("p",[t._v("该类规定了默认包含在地图中的功能，主要是最为常用的功能，如缩放、平移和旋转地图等，具体功能有如下这些：")]),t._v(" "),n("ul",[n("li",[t._v("ol.interaction.DragRotate，鼠标拖拽旋转，一般配合一个键盘按键辅助")]),t._v(" "),n("li",[t._v("ol.interaction.DragZoom，鼠标拖拽缩放，一般配合一个键盘按键辅助")]),t._v(" "),n("li",[t._v("ol.interaction.DoubleClickZoom，鼠标或手指双击缩放地图")]),t._v(" "),n("li",[t._v("ol.interaction.PinchRotate，两个手指旋转地图，针对触摸屏")]),t._v(" "),n("li",[t._v("ol.interaction.PinchZoom，两个手指缩放地图，针对触摸屏")]),t._v(" "),n("li",[t._v("ol.interaction.DragPan，鼠标或手指拖拽平移地图")]),t._v(" "),n("li",[t._v("ol.interaction.KeyboardZoom，使用键盘 + 和 - 按键进行缩放")]),t._v(" "),n("li",[t._v("ol.interaction.KeyboardPan，使用键盘方向键平移地图")]),t._v(" "),n("li",[t._v("ol.interaction.MouseWheelZoom，鼠标滚轮缩放地图")])]),t._v(" "),n("p",[t._v("可以看出，很多都兼容移动设备的触摸屏，键盘，鼠标事件，而且这些功能都是默认添加的，如果要更改默认的选项，需要在相应的选项设置为 false。如果想去掉默认的 DoubleClickZoom 功能，配置如下：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("interactions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("defaults")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    doubleClickZoom"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),n("h2",{attrs:{id:"draw-interaction-绘图功能"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#draw-interaction-绘图功能","aria-hidden":"true"}},[t._v("#")]),t._v(" draw interaction - 绘图功能")]),t._v(" "),n("p",[n("router-link",{attrs:{to:"/gis/openlayer/draw1.html"}},[t._v("draw详解")]),t._v(" "),n("router-link",{attrs:{to:"/gis/openlayer/draw2.html"}},[t._v("draw原理")])],1),t._v(" "),n("p",[t._v("绘图交互允许绘制几何地理要素，可选参数为一个对象，包含参数如下：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @typedef {{features: (ol.Collection.<ol.Feature>|undefined),\n *     source: (ol.source.Vector|undefined),\n *     snapTolerance: (number|undefined),\n *     type: ol.geom.GeometryType,\n *     minPointsPerRing: (number|undefined),\n *     style: (ol.style.Style|Array.<ol.style.Style>|ol.style.StyleFunction|undefined),\n *     geometryName: (string|undefined),\n *     condition: (ol.events.ConditionType|undefined)}}\n * @api\n */")]),t._v("\n")])])]),n("ul",[n("li",[t._v("features，绘制的要素的目标集合")]),t._v(" "),n("li",[t._v("source，绘制的要素的目标图层来源，即目标图层的 source属性")]),t._v(" "),n("li",[t._v("snapTolerance，自动吸附完成点的像素距离，也就是说当鼠标位置距离闭合点小于该值设置的时候，会自动吸附到闭合点，默认值是 12;\ntype，绘制的地理要素类型，"),n("code",[t._v("ol.geom.GeometryType")]),t._v("类型，包含 "),n("code",[t._v("Point")]),t._v("、 "),n("code",[t._v("LineString")]),t._v("、 "),n("code",[t._v("Polygon")]),t._v("、"),n("code",[t._v("MultiPoint")]),t._v("、"),n("code",[t._v("MultiLineString")]),t._v(" 或者 "),n("code",[t._v("MultiPolygon")])]),t._v(" "),n("li",[t._v("minPointsPerRing，绘制一个多边形需要的点数最小值，数值类型，默认是 3")]),t._v(" "),n("li",[t._v("style，要素素描的样式，是 ol.style.Style对象之一")]),t._v(" "),n("li",[t._v("geometryName，绘制的地理要素的名称，string类型")]),t._v(" "),n("li",[t._v("condition，一个函数，接受一个"),n("code",[t._v("ol.MapBrowserEvent")]),t._v("类型的参数，返回一个布尔值表示是否应该调用事件处理函数。默认情况下，增加一个顶点，类型为 "),n("code",[t._v("ol.events.ConditionType")])])]),t._v(" "),n("p",[t._v("给地图添加该交互功能，首先需要实例化一个ol.interaction.Draw，必须指定 source和type属性：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" draw "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Draw")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    source"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" source"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    type"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Polygon"')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[t._v("然后将该功能添加到地图中map.addInteraction(draw)。")]),t._v(" "),n("p",[t._v("这里我们在页面中添加一个 HTML select 元素，通过选择要素类型，绘制相应的要素类型：")]),t._v(" "),n("div",{staticClass:"language-HTML extra-class"},[n("pre",{pre:!0,attrs:{class:"language-html"}},[n("code",[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("select")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("type"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("option")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("value")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("None"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("None"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("option")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("option")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("value")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("LineString"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("LineString"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("option")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("option")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("value")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("Polygon"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Polygon"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("option")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("select")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),n("p",[t._v("定义一个函数用于添加该交互功能：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" typeSelect "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'type'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" draw"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// global so we can remove it later")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("addInteraction")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" value "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" typeSelect"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'None'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    draw "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Draw")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      source"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" source"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      type"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" value\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    map"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("addInteraction")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("draw"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("绑定select值变化触发的事件：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("typeSelect"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onchange")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  map"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeInteraction")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("draw"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("addInteraction")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[t._v("最后首先执行绑定函数"),n("code",[t._v("addInteraction()")]),t._v(";，然后点击鼠标进行绘制：")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdn.net/20150515223812835",alt:"markdown",title:"markdown"}})]),t._v(" "),n("h2",{attrs:{id:"dragrotateandzoom-interaction-鼠标拖拽进行缩放和旋转地图"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#dragrotateandzoom-interaction-鼠标拖拽进行缩放和旋转地图","aria-hidden":"true"}},[t._v("#")]),t._v(" dragrotateandzoom interaction - 鼠标拖拽进行缩放和旋转地图")]),t._v(" "),n("p",[t._v("拖拽实现旋转和缩放地图的功能。首先定义该交互对象：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* *\n * 定义地图的交互功能\n */")]),t._v("\n "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" interactions "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("defaults")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("extend")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DragRotateAndZoom")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[t._v("然后在 map 中加入交互对象：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" map "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Map")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    target"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'map'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    interactions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" interactions"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    layers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("p",[t._v("这个功能的使用方法是首先按住键盘的 shift 按钮，然后使用鼠标点住地图一点，然后拖拽鼠标围绕地图中心旋转，地图就会选择相应的角度；如果拖拽鼠标远离地图中心，就会实现地图的放大，靠近地图中心，地图就会缩小。")]),t._v(" "),n("p",[t._v("该功能是两个单独功能的合体： "),n("code",[t._v("dragzoom")]),t._v(" 和 "),n("code",[t._v("dragrotate")]),t._v("，一个负责拖拽缩放，一个负责拖拽旋转，和以上的功能一样。")]),t._v(" "),n("h2",{attrs:{id:"dragbox-interaction-拉框交互"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#dragbox-interaction-拉框交互","aria-hidden":"true"}},[t._v("#")]),t._v(" dragbox interaction - 拉框交互")]),t._v(" "),n("p",[t._v("在地图上拉出一个矩形框，一般配合使用一个辅助按键，如Shift，常用于放大功能。该功能是默认添加在地图中的，默认情况下，按下Shift，然后拖动鼠标拉框，然后地图就会将框内内容放大。")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdn.net/20150516125108990",alt:"markdown",title:"markdown"}})]),t._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdn.net/20150516125305480",alt:"markdown",title:"markdown"}})]),t._v(" "),n("h2",{attrs:{id:"draganddrop-interaction-拖拽文件到地图"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#draganddrop-interaction-拖拽文件到地图","aria-hidden":"true"}},[t._v("#")]),t._v(" draganddrop interaction - 拖拽文件到地图")]),t._v(" "),n("p",[t._v("将空间数据使用鼠标或者手指拖拽到地图中，解析成一个图层添加到地图中。目前只支持矢量数据，未来可能支持更多的空间数据格式。目前，支持的格式包括 "),n("code",[t._v("GeoJSON")]),t._v(", "),n("code",[t._v("GML")]),t._v(", "),n("code",[t._v("KML")]),t._v(", "),n("code",[t._v("GPX")]),t._v(", "),n("code",[t._v("OSMXML")]),t._v(", "),n("code",[t._v("TopoJSON")]),t._v(" 和 "),n("code",[t._v("IGC")]),t._v("。首先实例化一个 "),n("code",[t._v("draganddrop interaction")]),t._v("：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" dragAndDropInteraction "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DragAndDrop")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  formatConstructors"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("format"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("GeoJSON"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("format"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("KML")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[n("code",[t._v("formatConstructors")]),t._v(" 表示想要支持的格式，这里我选择了支持两种常见的格式："),n("code",[t._v("GeoJSON")]),t._v(" 和 "),n("code",[t._v("KML")]),t._v("，然后将该交互添加到地图中：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" interactions "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("defaults")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("extend")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DragRotateAndZoom")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    dragAndDropInteraction\n "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[t._v("如果想在添加数据的时候定义一些额外行为，比如缩放到添加到数据的范围，需要注册 "),n("code",[t._v("interaction")]),t._v(" 的事件-"),n("code",[t._v("dragAndDropInteraction.on('addfeatures', function(event) {})")]),t._v(";， 以下为拖拽一个KML文件到地图中：")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdn.net/20150517094522778",alt:"markdown",title:"markdown"}})]),t._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdn.net/20150517094451402",alt:"markdown",title:"markdown"}})]),t._v(" "),n("h2",{attrs:{id:"keyboard-interaction-键盘交互功能"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#keyboard-interaction-键盘交互功能","aria-hidden":"true"}},[t._v("#")]),t._v(" keyboard interaction - 键盘交互功能")]),t._v(" "),n("p",[t._v("包含 "),n("code",[t._v("ol.interaction.KeyboardZoom")]),t._v(" 和 "),n("code",[t._v("ol.interaction.KeyboardPan")]),t._v("，分别是键盘缩放和键盘平移。默认添加到地图中，但是只有当焦点在包含地图的 HTML 元素上，才可用。可以通过修改 "),n("code",[t._v("ol.Map")]),t._v(" 的 "),n("code",[t._v("keyboardEventTarget")]),t._v(" 属性，修改键盘事件的关联 HTML 元素。")]),t._v(" "),n("p",[n("code",[t._v("ol.interaction.KeyboardZoom")]),t._v("，使用键盘+ 和 - 进行地图缩放；"),n("code",[t._v("ol.interaction.KeyboardPan")]),t._v("，使用方向键平移地图。")]),t._v(" "),n("p",[t._v("##　modify 和 select interaction")]),t._v(" "),n("p",[t._v("select 就像名字暗示的一样，是用来选中要素的；而 modify 是修改要素的，主要是通过拖拽方式修改点的坐标。")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdn.net/20150520113251350",alt:"markdown",title:"markdown"}})]),t._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdn.net/20150520113155210",alt:"markdown",title:"markdown"}})]),t._v(" "),n("p",[t._v("模拟选中并修改要素的交互功能需要添加如下代码：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" select "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Select")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" moddify "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Modify")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    features"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("select"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getFeatures")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[n("code",[t._v("features")]),t._v(": "),n("code",[t._v("select.getFeatures()")]),t._v("目的为修改选中的要素。 然后将两个交互功能添加到 map 中就可以使用其功能了。")]),t._v(" "),n("h2",{attrs:{id:"pinchrotate-，pinchzoom-interaction-两个手指缩放和旋转地图"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#pinchrotate-，pinchzoom-interaction-两个手指缩放和旋转地图","aria-hidden":"true"}},[t._v("#")]),t._v(" pinchrotate ，pinchzoom interaction - 两个手指缩放和旋转地图")]),t._v(" "),n("p",[t._v("这两个功能针对触摸屏，两个手指按住地图，增减距离来实现缩放，旋转手指，地图跟着旋转。默认添加到地图中。")]),t._v(" "),n("h2",{attrs:{id:"pointer-interaction-自定义鼠标事件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#pointer-interaction-自定义鼠标事件","aria-hidden":"true"}},[t._v("#")]),t._v(" pointer interaction - 自定义鼠标事件")]),t._v(" "),n("p",[t._v("针对鼠标的行为按下（"),n("code",[t._v("Down")]),t._v("）、移动（"),n("code",[t._v("Move")]),t._v("）和抬起（"),n("code",[t._v("Up")]),t._v("），自定义事件。这三个事件发生有先后顺序，首先是触发按下，之后是移动事件，最后是抬起事件。只要配置相关的属性，包含"),n("code",[t._v("handleDownEvent")]),t._v("，"),n("code",[t._v("handleDragEvent")]),t._v("，"),n("code",[t._v("handleMoveEvent")]),t._v("，"),n("code",[t._v("handleUpEvent")]),t._v("分别对应鼠标的 "),n("code",[t._v("down")]),t._v("、"),n("code",[t._v("drag")]),t._v("、"),n("code",[t._v("move")]),t._v("和"),n("code",[t._v("up")]),t._v("四种事件。例如配置鼠标的按下左键事件，当按下鼠标左键时候，就会触发 "),n("code",[t._v("functionName")]),t._v("函数 ：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Pointer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    handleDownEvent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" functionName\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("h2",{attrs:{id:"snap-interaction-鼠标捕捉"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#snap-interaction-鼠标捕捉","aria-hidden":"true"}},[t._v("#")]),t._v(" snap interaction - 鼠标捕捉")]),t._v(" "),n("p",[t._v("当修改和绘制矢量要素时，鼠标距离某个要素一定距离之内，自动吸附到要素。")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdn.net/20150520132144892",alt:"markdown",title:"markdown"}})]),t._v(" "),n("p",[t._v("再靠近就会吸附到黄色的点\n"),n("img",{attrs:{src:"https://img-blog.csdn.net/20150520132317684",alt:"markdown",title:"markdown"}})]),t._v(" "),n("p",[t._v("可以配置的选项有 具有捕捉吸附功能的要素集 或者 矢量图层，发生捕捉的最大距离（像素为单位），使用方法如下：")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interaction"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Snap")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    features"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("要素集")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Collection"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    pixelTolerance"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 捕捉发生的距离，像素数，默认为"),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v("，\n    source"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("具有捕捉功能的图层")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ol"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("source"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Vector"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("h2",{attrs:{id:"总结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#总结","aria-hidden":"true"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),n("p",[t._v("交互功能比较多，主要涉及用户与地图交互需要的基本功能：缩放、平移拖拽、旋转，为了提高兼容性，除了针对鼠标和键盘的交互，还有针对触摸屏的缩放、旋转和平移拖拽。")]),t._v(" "),n("p",[t._v("比较有用的有勾绘draw、选择要素select、modify、捕捉吸附snap 和 鼠标自定义事件pointer。这些交互功能可以共同构建一个动态标绘系统，在客户端增加或者修改空间数据，提交给服务器，更新数据。")]),t._v(" "),n("h2",{attrs:{id:"相关链接"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#相关链接","aria-hidden":"true"}},[t._v("#")]),t._v(" 相关链接")]),t._v(" "),n("p",[n("a",{attrs:{href:"https://blog.csdn.net/qingyafan/article/details/45887109",target:"_blank",rel:"noopener noreferrer"}},[t._v("CSDN庆祝亚运会"),n("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=e.exports}}]);