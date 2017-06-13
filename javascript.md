 #               JavaScript技术报告
   AecGIS Server是用于开发基于web的GIS应用程序的主要平台。我们可以使用多种变成语言去开发基于ArcGIS Server的应用程序，包括JavaScript，flex和silverlight。JavaScript已经成为这个平台上开发应用程序的首选语言，因为他可以在web端和移动端应用程序中，并且在web端不需要为应用程序安装插件。flex和silverlight都不适合作为移动终端的开发语言。并且当应用程序在web端运行时都需要用到插件。
##    创建与安装ArcGIS Javascript API服务
JavaScript API是ArcGIS Server 9.3新增的一套API框架，为创建WebGIS应用提供了轻量级的解决方案，在客户端可以轻松地利用JavaScript API来调用ArcGIS Server所提供的服务，实现地图应用和地理处理功能。 

  开发人员在使用Javascript API进行开发时，只需编写客户端的代码，不需要编写服务器端代码。JavaScript API是纯粹的客户端操作，它基于Dojo库，并用面向对象的方式对其提供的功能进行了重新封装。 

 要使用ArcGIS Javascript API进行开发，有两种方法，一种方法是使用arcgisonline提供的在线脚本服务。其二是使用Javascript API离线版本创建自己的ArcGIS Javascript API服务。 

首先介绍第一种方法。第一种方法较为简单，直接利用在线的脚本服务。如果你的开发环境与运行环境，Web服务器都能直接与外网连通，那么可以使用方法一进行开发。方法一不需要创建自己的ArcGIS Javascript API服务。其使用方法如下：

  1.使用Dojo提供的样式表

```
<span style="font-size: medium;">  
<style type="text/css">
@import "http://serverapi.arcgisonline.com/jsapi/arcgis/1/js/dojo/dijit/themes/tundra/tundra.css";</style></span>
```
2.引用脚本文件


```
<span style="font-size: medium;"> 
<script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=1"> 
</script> </span>
```
使用arcGIS API for javascript创建应用程序的基本步骤

1.创建页面HTML

2.引用arcGIS API for javascript和样式表

3.加载模块

4.确保DOM可用

5.创建地图

6.定义页面内容

7.页面样式

==创建页面html==

不在赘述

==引用arcGIS API for javascript==


```
 <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.2/js/dojo/dijit/themes/claro/claro.css">  
    <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.2/js/esri/css/esri.css" />  
  
    <script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=3.2">
```
<script>标签加载的是arcGIS API for JavaScript 这个版本是3.2 <link>标签加载的是esri.css这个ESRI工具和组件的特定样式。
arcGIS API for JavaScript是建立在DojoJavaScript框架上的。Dojo包括Claro,Tundra,soria,Nihilo这四个预先定义的主题，他们用哦关于控制添加到应用程序中的用户界面工具的外观样式。

下面代码引用了Claro主题样式
```
<link rel = "stylesheet" href="http://js.arcgis/com.3.7/js/dojo/dijit/themes/claro/claro.css">
```
其他样式可以参考下列示例代码进行应用。如果你添加DOJO用户界面组件（Dijits）,你需要通过加载期中的一种样式在控制组件的外观

```
<link rel = "stylesheet" href="http://js.arcgis/com.3.7/js/dojo/dijit/themes/tundra/tundra.css">
```

```
<link rel = "stylesheet" href="http://js.arcgis/com.3.7/js/dojo/dijit/themes/soria/soria.css">
```

```
<link rel = "stylesheet" href="http://js.arcgis/com.3.7/js/dojo/dijit/themes/Nihilo/Nihilo.css">
```

==加载模块==

在创建地图对象之前，必须首先通过使用一个名为require()的函数来完成对地图资源的引用。

在web页面中使用require()函数来导入资源是，arcGIS API for javascript提供了很多资源，其中包括esri/map这个在创建地图或者使用geometry graphic和symbols之前必须用到的资源。一旦提供了资源的引用，你就可以使用map()来构造函数创建地图。

```
<script>
   dojo.require("esri.map");
   
   function init(){
       var map = new seri.map("mapDiv",{
           center:[-56.049,38.485],
           zoom:3,
           basemap:"streets"
       });
   }
</script>

```
导入资源需要包括在一个新的<script>标签里。添加谢列加粗显示行的代码到<script> 内，require()函数的参数名称可以按照你的习惯命名，但是无论Esri和Dojo都提供了一系列首选参数，推荐使用require回调函数中命名参数的时候使用esri的首选参数。

```
<script>
   require(["esri/map","dojo/domReady!"],function(Map){
       
   });
</script>
```
==确保DOM可用==

不再赘述

==创建地图==

创建一个新的MAP地图是通过esri/map这个先前步骤中所引入模块中的map类来实现的。在require()函数内部，使用构造函数来创建一个新的map对象。map对象的构造函数中接收两个参数，第一个是在web页面上用于承载地图的<div>标签引用，还有一个是可选参数，它的作用是顶一个中地图的加载选项。这个可选项被定义为一个包括一系列键/值的JSON对象。

首先，我们创建一个全局的变量map以及require()函数，添加下列加粗显示的代码行

```
<script>
   var map；
   require(["esri/map","dojo/domReady!"],function(Map){
       
   });
</script>

```
==页面样式==


```
    <style>
      html, body, #map {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }    
    </style>
```

==完整代码==


```
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=7, IE=9, IE=10">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no"/>
    <title>Simple Map</title>
    <link rel="stylesheet" href="http://js.arcgis.com/3.7/js/esri/css/esri.css">
	<link rel="stylesheet" href="http://js.arcgis.com/3.7/js/dojo/dijit/themes/claro/claro.css">
    <style>
      html, body, #map {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }    
    </style>
    <script src="http://js.arcgis.com/3.7/"></script>
    <script>
      var map;

      require(["esri/map", "dojo/domReady!"], function(Map) {
        map = new Map("map", {
          basemap: "topo",
          center: [-122.45,37.75], // long, lat
          zoom: 13,
          sliderStyle: "small"
        });
      });
    </script>
  </head>

  <body class="claro">
    <div id="map"></div>
  </body>
</html>

```


没有数据图层的地图就像是空白的画板。添加到地图中的数据图层让其有意义并未分析奠定了基础。提供数据图层添加到地图中主要哦有哦动态地图服务图层和切片地图服务图层。

使用ARCGIS中的图层类，可以引用宿主在ARCGIS server和其他地图服务器中的地图服务。所有的图层类继承自layer这个基类。

==添加特征图层==

arcgis提供特征图层来操作个护短图形特征。featurelayer对象继承自graphicslayer对象，但是他还可以提供额外的功能，比如执行查询和选择以及支持定义的表达式。数据从arcgis流向浏览器极大地减少了其往返服务器的时间，从而改善应用程序的性能。
增加多个图形图层到地图。一个图形图层显示国家，另一个显示城市。在一个地图中有多个图形图层的能力是在ArcGIS JavaScript API v1.4增加的。

从蓝色的城市点分隔灰色的区县多边形使图形易于管理。例如，如果仅仅想要删除城市，仅需删除有这个城市点的图形图层。如果城市和区县在同一个图形图层里，就不得不写一些额外的代码来探测城市图层并且删除它们。

注意如果单击一个重叠的图形区域，仅仅上层的图形响应单击事件。


==创建featurelayer对象==

```
  var olderStates = new FeatureLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/5", {
		    mode: FeatureLayer.MODE_SNAPSHOT,
		    outFields: ["STATE_NAME", "MED_AGE", "MED_AGE_M", "MED_AGE_F"]
		  });
```
==可选构造函数参数==
featurelayer对象除了接受来自地图服务或者特征服务这个必须图层作为第一个参数之外，还可以传递一个用于定义各项选项的json对象到构造参数中。许多种类的选项都可以被传递到构造函数中。outfields属性用来限制featurelayer对象返回的字段。

```
var earthquakes = 
featurelayer("http://service.esri.com/ARCgis/rest/
service.earthquakes/since_1970/mapserver/0",
{mode:featurelayer.MODE_shapshot,
outFields:["magnitude"],refreshinterval：5})
```

refreshinterval属性定义多长时间刷新图层。


==特征图层渲染==

arcgis中有五种不同的渲染器，分别是simplerenderer ClassBreaksRenderer,UniqueValueRenderer,DotDensityRenderer,temporalRenderer

首先创建渲染器实例。

```
 var renderer = new esri.renderer.UniqueValueRenderer(defaultSymbol, "SUB_REGION");
 
```

```
renderer.addValue("Pacific", new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255,0,0,0.5])));
        renderer.addValue("Mtn", new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([0,255,0,0.5])));
        renderer.addValue("N Eng", new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([0,0,255,0.5])));
        renderer.addValue("S Atl", new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255,0,255,0.5])));
```

以上是关于ArcGIS API for JAVASCRIPT的部分应用。





31401344
王锦辉


