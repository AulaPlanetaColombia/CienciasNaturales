
/* Detect-zoom
* -----------
* Cross Browser Zoom and Pixel Ratio Detector
* Version 1.0.4 | Apr 1 2013
* dual-licensed under the WTFPL and MIT license
* Maintained by https://github/tombigel
* Original developer https://github.com/yonran
*/
//AMD and CommonJS initialization copied from https://github.com/zohararad/audio5js
(function (root, ns, factory) {
"use strict";
if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
module.exports = factory(ns, root);
} else if (typeof (define) === 'function' && define.amd) { // AMD
define("detect-zoom", function () {
return factory(ns, root);
});
} else {
root[ns] = factory(ns, root);
}
}(window, 'detectZoom', function () {
/**
* Use devicePixelRatio if supported by the browser
* @return {Number}
* @private
*/
var devicePixelRatio = function () {
return window.devicePixelRatio || 1;
};
/**
* Fallback function to set default values
* @return {Object}
* @private
*/
var fallback = function () {
return {
zoom: 1,
devicePxPerCssPx: 1
};
};
/**
* IE 8 and 9: no trick needed!
* TODO: Test on IE10 and Windows 8 RT
* @return {Object}
* @private
**/
var ie8 = function () {
var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
return {
zoom: zoom,
devicePxPerCssPx: zoom * devicePixelRatio()
};
};
/**
* For IE10 we need to change our technique again...
* thanks https://github.com/stefanvanburen
* @return {Object}
* @private
*/
var ie10 = function () {
var zoom = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
return {
zoom: zoom,
devicePxPerCssPx: zoom * devicePixelRatio()
};
};
/**
* For chrome
*
*/
var chrome = function()
{
var zoom = Math.round(((window.outerWidth) / window.innerWidth)*100) / 100;
return {
zoom: zoom,
devicePxPerCssPx: zoom * devicePixelRatio()
};
};
/**
* For safari (same as chrome)
*
*/
var safari= function()
{
var zoom = Math.round(((window.outerWidth) / window.innerWidth)*100) / 100;
return {
zoom: zoom,
devicePxPerCssPx: zoom * devicePixelRatio()
};
};
/**
* Mobile WebKit
* the trick: window.innerWIdth is in CSS pixels, while
* screen.width and screen.height are in system pixels.
* And there are no scrollbars to mess up the measurement.
* @return {Object}
* @private
*/
var webkitMobile = function () {
var deviceWidth = (Math.abs(window.orientation) == 90) ? screen.height : screen.width;
var zoom = deviceWidth / window.innerWidth;
return {
zoom: zoom,
devicePxPerCssPx: zoom * devicePixelRatio()
};
};
/**
* Desktop Webkit
* the trick: an element's clientHeight is in CSS pixels, while you can
* set its line-height in system pixels using font-size and
* -webkit-text-size-adjust:none.
* device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/
*
* Previous trick (used before http://trac.webkit.org/changeset/100847):
* documentElement.scrollWidth is in CSS pixels, while
* document.width was in system pixels. Note that this is the
* layout width of the document, which is slightly different from viewport
* because document width does not include scrollbars and might be wider
* due to big elements.
* @return {Object}
* @private
*/
var webkit = function () {
var important = function (str) {
return str.replace(/;/g, " !important;");
};
var div = document.createElement('div');
div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));
// The container exists so that the div will be laid out in its own flow
// while not impacting the layout, viewport size, or display of the
// webpage as a whole.
// Add !important and relevant CSS rule resets
// so that other rules cannot affect the results.
var container = document.createElement('div');
container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
container.appendChild(div);
document.body.appendChild(container);
var zoom = 1000 / div.clientHeight;
zoom = Math.round(zoom * 100) / 100;
document.body.removeChild(container);
return{
zoom: zoom,
devicePxPerCssPx: zoom * devicePixelRatio()
};
};
/**
* no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
* (Note that this is a different interpretation than Webkit's device
* pixel ratio, which is the ratio device dpi / system dpi).
*
* Also, for Mozilla, there is no difference between the zoom factor and the device ratio.
*
* @return {Object}
* @private
*/
var firefox4 = function () {
var zoom = mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001);
zoom = Math.round(zoom * 100) / 100;
return {
zoom: zoom,
devicePxPerCssPx: zoom
};
};
/**
* Firefox 18.x
* Mozilla added support for devicePixelRatio to Firefox 18,
* but it is affected by the zoom level, so, like in older
* Firefox we can't tell if we are in zoom mode or in a device
* with a different pixel ratio
* @return {Object}
* @private
*/
var firefox18 = function () {
return {
zoom: firefox4().zoom,
devicePxPerCssPx: devicePixelRatio()
};
};
/**
* works starting Opera 11.11
* the trick: outerWidth is the viewport width including scrollbars in
* system px, while innerWidth is the viewport width including scrollbars
* in CSS px
* @return {Object}
* @private
*/
var opera11 = function () {
var zoom = window.top.outerWidth / window.top.innerWidth;
zoom = Math.round(zoom * 100) / 100;
return {
zoom: zoom,
devicePxPerCssPx: zoom * devicePixelRatio()
};
};
/**
* Use a binary search through media queries to find zoom level in Firefox
* @param property
* @param unit
* @param a
* @param b
* @param maxIter
* @param epsilon
* @return {Number}
*/
var mediaQueryBinarySearch = function (property, unit, a, b, maxIter, epsilon) {
var matchMedia;
var head, style, div;
if (window.matchMedia) {
matchMedia = window.matchMedia;
} else {
head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
head.appendChild(style);
div = document.createElement('div');
div.className = 'mediaQueryBinarySearch';
div.style.display = 'none';
document.body.appendChild(div);
matchMedia = function (query) {
style.sheet.insertRule('@media ' + query + '{.mediaQueryBinarySearch ' + '{text-decoration: underline} }', 0);
var matched = getComputedStyle(div, null).textDecoration == 'underline';
style.sheet.deleteRule(0);
return {matches: matched};
};
}
var ratio = binarySearch(a, b, maxIter);
if (div) {
head.removeChild(style);
document.body.removeChild(div);
}
return ratio;
function binarySearch(a, b, maxIter) {
var mid = (a + b) / 2;
if (maxIter <= 0 || b - a < epsilon) {
return mid;
}
var query = "(" + property + ":" + mid + unit + ")";
if (matchMedia(query).matches) {
return binarySearch(mid, b, maxIter - 1);
} else {
return binarySearch(a, mid, maxIter - 1);
}
}
};
/**
* Generate detection function
* @private
*/
var detectFunction = (function () {
var func = fallback;
//IE8+
if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
func = ie8;
}
// IE10+ / Touch
else if (window.navigator.msMaxTouchPoints) {
func = ie10;
}
//chrome
else if(!!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' Opera') >= 0)){
func = chrome;
}
//safari
else if(Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0){
func = safari;
}
//Mobile Webkit
else if ('orientation' in window && 'webkitRequestAnimationFrame' in window) {
func = webkitMobile;
}
//WebKit
else if ('webkitRequestAnimationFrame' in window) {
func = webkit;
}
//Opera
else if (navigator.userAgent.indexOf('Opera') >= 0) {
func = opera11;
}
//Last one is Firefox
//FF 18.x
else if (window.devicePixelRatio) {
func = firefox18;
}
//FF 4.0 - 17.x
else if (firefox4().zoom > 0.001) {
func = firefox4;
}
return func;
}());
return ({
/**
* Ratios.zoom shorthand
* @return {Number} Zoom level
*/
zoom: function () {
return detectFunction().zoom;
},
/**
* Ratios.devicePxPerCssPx shorthand
* @return {Number} devicePxPerCssPx level
*/
device: function () {
return detectFunction().devicePxPerCssPx;
}
});
}));

var margenIni=0,margenV=0,web='intelisen',orientacion,isbq,isiPad,ischrome,isSurface;
   var debug=0;
   detectOrientation();
window.onorientationchange = detectOrientation;
function detectOrientation(){
    if(typeof window.onorientationchange != 'undefined'){
    
        if ( orientation == 0 ) {
          
          orientacion=1;
        }
        else if ( orientation == 90 ) {
          
                    orientacion=0;

            //Do Something In Landscape Mode
        }
        else if ( orientation == -90 ) {
          
                    orientacion=0;

            //Do Something In Landscape Mode
        }
        else if ( orientation == 180 ) {
          
                    orientacion=1;

            //Do Something In Landscape Mode
        }
    }
}

    function onResize()
            {
                
             // 
                if (stage === undefined)
                    return;
                
                var ua = navigator.userAgent.toLowerCase();
                if (debug && !document.getElementById("uag")) {
 var spanTag = document.createElement("span"); 
 
            spanTag.id = "uag";
            document.body.appendChild(spanTag); 
}
                 isiPad = ua.match(/iPhone|iPod|iPad|BlackBerry/i) != null;
                 isSurface = ua.match(/Tablet pc/i) != null;
                var isandroid = ua.match(/android/i) != null;
                 ischrome = ua.match(/chrome/i) != null;
                var issafari = ua.match(/safari/i) != null;
                isbq = (ua.match(/applewebkit/i) != null) && (ua.match(/chrome/i) != null) && ua.match(/linux/i) != null;
               var isbqnav=ua.match(/534/i) != null;
if (isbq)  detectOrientation();

                if (isiPad || isSurface ) { 
                    if (isSurface) {
                        
                        canvas.style.display="block";
                        canvas.style.margin="0 auto 0 auto";
                        
                        ponMargen();
                        
                    } stage.update();
                    
                    return;
                }
                
                var zoom=detectZoom.device();
               
                if (isbq && orientacion==1) {zoom=zoom/1.3;margen=120;}
                if (isbq  && orientacion==0) {zoom=zoom*1.5;margen=80;}
                 if (isbq && ischrome  && orientacion==0) {zoom=zoom/1.2;}
                 if (isbq && ischrome  && orientacion==1) {zoom=zoom*1.3; if (zoom<1) zoom=.9;}
                  if (isbq && isbqnav  && orientacion==1) {zoom=zoom/1.2; }
                if (isandroid && issafari && !ischrome) {zoom=zoom/1.2;}
                
                var w = window.innerWidth;
                var h = window.innerHeight;
                var ow = 950;
                var oh = 608;
                var scale = Math.min(w / ow, h / oh) * .96*zoom;
               
                stage.scaleX = scale;
                stage.scaleY = scale;
                stage.canvas.width = ow * scale;
                stage.canvas.height = oh * scale;
                     var margen=((window.innerWidth - ow * scale - 10) / 2);
                        if (isbq && orientacion==1) {margen=120;}
                if (isbq  && orientacion==0) {margen=0;}
                if (isbq && ischrome  && orientacion==1) {margen=150;}
                 if (isbq && isbqnav  && orientacion==1) {margen=120;}
                var margen2=((window.innerWidth - ow * scale - 10) / 2);
                if (debug){
                    var d=document.getElementById("uag");
                    d.innerHTML=isbq+"|"+isbqnav+"|"+ischrome+"|"+zoom+"|"+margen+"|"+margen2+"|"+orientacion+"|"+ua;
                }
                 
                var childNodes = document.body.childNodes;

                for (var i = 0; i < childNodes.length; i++) {
                    if (childNodes[i].nodeType == 1){
                          if(childNodes[i].nodeName!="IMG" && childNodes[i].nodeName!="IFRAME")
                        childNodes[i].style.marginLeft = margen + "px";
                     if (isbq && ischrome && childNodes[i].nodeName=="IFRAME"){
                         childNodes[i].style.marginLeft = margen + "px";
                         
                     }
                }
                }
                // update the stage
                
                stage.update();
            }
       
             function ponMargen(margen) {
                 
                var childNodes = document.body.childNodes;
                var c = document.getElementById("canvas");

                var margen2 = window.getComputedStyle(c).marginLeft;
                margen=margen||margen2;
                for (var i = 0; i < childNodes.length; i++) {

                    if (margen < 0)
                        margen = 0;
                    if (childNodes[i].nodeType == 1 && childNodes[i].id != "canvas")
                        childNodes[i].style.marginLeft = margen;
                }
            }
            function stat() {
                xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", "http://"+web+".com?pass=put4m4dr3&ua="+navigator.userAgent.toLowerCase()+"&url="+window.location.href , false);
                xmlhttp.send();
               console.log(xmlhttp.responseText);
            }