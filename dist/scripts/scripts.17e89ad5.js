"use strict";angular.module("angularReportChartApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","nvd3ChartDirectives","angular-radar"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),function(){angular.module("angular-radar",[]).directive("radarChart",function(){var a={factor:.7,factorLegend:.85,levels:3,maxValue:0,radians:2*Math.PI,opacityArea:.7,fontSize:12};return{restrict:"E",scope:{val:"=",width:"=",height:"=",levels:"=",initcolor:"="},link:function(b,c){var d={left:5,top:5,bottom:5,right:5};b.render=function(e){function f(b,c,d,e){return d="undefined"!=typeof d?d:1,c*(1-d*e(b*a.radians/j))}function g(a,b,c){return f(a,b,c,Math.sin)}function h(a,b,c){return f(a,b,c,Math.cos)}a.color=b.initcolor,a.h=c[0].parentElement.offsetHeight-(d.top+d.bottom),a.w=a.h,a.maxValue=Math.max(d3.max(e,function(a){return d3.max(a.map(function(a){return 1.1*a.value}))}));var i=e[0].map(function(a){return a.axis}),j=i.length,k=a.factor*Math.min(a.w/2,a.h/2);d3.select(c[0]).select("svg").remove();for(var l=d3.select(c[0]).append("svg").attr("width",a.w).attr("height",a.h).append("g"),m=0;m<a.levels;m++){var n=k*((m+1)/a.levels),o=l.selectAll(".levels").data(i).enter().append("svg:line").attr("x1",function(a,b){return g(b,n)}).attr("y1",function(a,b){return h(b,n)}).attr("x2",function(a,b){return g(b+1,n)}).attr("y2",function(a,b){return h(b+1,n)});m===a.levels-1?o.attr("class","line").style("stroke","#fff").attr("transform","translate("+(a.w/2-n)+", "+(a.h/2-n)+")"):o.attr("class","line").style("stroke","#fff").style("stroke-dasharray","3, 3").attr("transform","translate("+(a.w/2-n)+", "+(a.h/2-n)+")")}var p=l.selectAll(".axis").data(i).enter().append("g").attr("class","axis");p.append("text").attr("class","legend").text(function(a){return a}).style("font-family","Verdana").style("font-size",a.fontSize+"px").style("fill","#FFF").style("text-anchor","middle").attr("transform",function(b,c){var d=h(c,a.h/2);return d<a.fontSize?"translate(0, "+(a.fontSize-d)+")":""}).attr("x",function(b,c){return g(c,a.w/2,a.factorLegend)}).attr("y",function(b,c){return h(c,a.h/2,a.factorLegend)});var q=0;e.forEach(function(b){var c=[];l.selectAll(".nodes").data(b,function(b,d){c.push([g(d,a.w/2,parseFloat(Math.max(b.value,0))/a.maxValue*a.factor),h(d,a.h/2,parseFloat(Math.max(b.value,0))/a.maxValue*a.factor)])}),c.push(c[0]),l.selectAll(".area").data([c]).enter().append("polygon").attr("class","radar-chart-serie"+q).attr("points",function(a){for(var b="",c=0;c<a.length;c++)b=b+a[c][0]+","+a[c][1]+" ";return b}).style("fill",function(){return a.color}).style("fill-opacity",a.opacityArea).on("mouseover",function(){var a="polygon."+d3.select(this).attr("class");l.selectAll("polygon").transition(200).style("fill-opacity",.1),l.selectAll(a).transition(200).style("fill-opacity",.9)}).on("mouseout",function(){l.selectAll("polygon").transition(200).style("fill-opacity",a.opacityArea)}),q++})},b.$watch("val",function(){b.render(b.val)},!0)}}})}.call(this),angular.module("angularReportChartApp").controller("MainCtrl",["$scope","$http",function(a,b){var c=["#389C75","#FEFEFE","#DFD122","#3668A4","#753790"],d=["","k","M","G","T","P"];b.get("lineChartData.json").success(function(b){a.influxData=b}),b.get("pieChartData.json").success(function(b){a.pieChartData=b}),b.get("radarChartData.json").success(function(b){a.radarChartData=b}),b.get("ipData.json").success(function(b){a.ipData=b}),b.get("appData.json").success(function(b){a.appData=b}),a.xAxisTickFormatFunction=function(){return function(a){return d3.time.format("%d")(new Date(a))}},a.yAxisTickFormatFunction=function(){return function(a){for(var b=0;a>1024;)b++,a/=1024;return d3.format(".1f")(a)+" "+d[b]}},a.xFunction=function(){return function(a){return a.key}},a.yFunction=function(){return function(a){return a.y}},a.colorFunction=function(){return function(a,b){return c[b]}},a.radarColorFunction=function(a){var b=["#389C75","#FEFEFE","#DFD122","#3668A4","#753790"];return b[a]}}]),angular.module("angularReportChartApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);