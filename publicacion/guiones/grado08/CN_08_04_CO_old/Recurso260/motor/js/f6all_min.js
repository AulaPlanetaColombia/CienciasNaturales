/* VERSION : 15.6.25.1 */ 
var pppUI;(function(a){(function(i){function h(n,p,o,m,r){if(typeof r==="undefined"){r=true}var q=new a.UIObject(n);q.addClass(o);if(r&&TLF.isTLF(p)){q.addClass("tlfText");q.setContent(TLF.toHTML(p,function(s){return FUtils.realResourcePath(s)}))}else{q.setContent(p)}q.position=m;return q}i.createTextBox=h;function g(n,s,q,m,p,r){var o=new a.UIButton(n,q,p,s);o.command=r;o.position=m;return o}i.createEventButton=g;function l(u,q,v,m,t,n,s){if(typeof s==="undefined"){s=a.UIButton.BUTTON}var o;var r=new Array();for(o=0;o<t.length;o++){var p=new a.UIButton(t[o].id,t[o].className,s,t[o].content);if(m){p.x=q.x;p.y=q.y+o*v}else{p.x=q.x+o*v;p.y=q.y}p.width=q.width;p.height=q.height;p.visible=t[o].visible;p.command=n;u.addChild(p);r.push(p)}return r}i.createButtonList=l;function f(p,s,r,q){if(typeof q==="undefined"){q=a.UIButton.BUTTON}var o;var n=new Array();for(o=0;o<s.length;o++){var m=new a.UIButton(s[o].id,s[o].className,q,s[o].content);m.position=s[o].position;m.visible=s[o].visible;m.command=r;p.addChild(m);n.push(m)}return n}i.createButtonListVarPos=f;function e(r,m,n,t,s){var q;var p=new Array();for(q=0;q<t.length;q++){var o=new a.UIButton(t[q].id,t[q].className,a.UIButton.BUTTON,t[q].content);o.x=m.x;o.y=m.y+q*n;o.width=m.width;o.height=m.height;o.visible=t[q].visible;o.command=s;r.addChild(o);p.push(o)}return p}i.createButtonColumn2=e;function d(v,r,n,m,u,w,o){var p;var s=r.y;var t=new Array();for(p=0;p<u.length&&p<w;p++){var q=new a.UIButton(u[p].id,u[p].className,2,u[p].content);q.x=(p<u.length/2)?r.x:r.x+n;q.y=s+Math.floor(p%(u.length/2))*m;q.width=r.width;q.height=r.height;q.visible=u[p].visible;q.command=o;v.addChild(q);t.push(q)}return t}i.createButton2Columns=d;function j(v,q,x,n,u,o,p,t,r,w){if(typeof r==="undefined"){r="slideContainer"}if(typeof w==="undefined"){w=""}var m=new a.UISlider(r);m.addClass(w);m.position=t;v.addChild(m);var s=l(v,q,x,n,u,o,p);s.push(m);return s}i.createButtonsTabs=j;function c(n,m){if(n==null||n.DOMItem==null){return}var o=n.DOMItem;if(n instanceof a.UIRichText){o=n.$DOMItem.find("#realContent")[0];if(o==null){return}}if((o.scrollHeight-o.clientHeight)>3){var p=new a.UIImage("scrollMarker","","motor/images/scrollmarkertrans.png",a.UIImage.ADJUSTMODE_NONE,39,39);p.x=n.x+n.width-39-((m)?10:20);p.y=n.y+n.height-39-10;p.visible=false;n.parent.addChild(p);p.fadeIn(600);setTimeout(function(){if(p.DOMItem){p.fadeOut(500,function(){if(p.DOMItem){p.remove()}})}},2000)}}function k(o,n){var m=(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|Touch/i)!=null);var p=(navigator.userAgent.match(/Trident/i)!=null)&&(navigator.userAgent.match(/Touch/i)!=null);if(n==true&&m==false||p){return}setTimeout(function(){c(o,m)},500)}i.showScrollMarker=k})(a.Utils||(a.Utils={}));var b=a.Utils})(pppUI||(pppUI={}));var FUtils;(function(b){function c(g){if((g.indexOf("data/imagenes/")==0)||(g.indexOf("data/sonidos/")==0)||(g.indexOf("data/videos/")==0)||(g.indexOf("data/recursos/")==0)||(g.indexOf("data/actividades/")==0)||(g=="data/datos.xml")){return g}if(g.indexOf("medias/")==0){g=g.substring("medias/".length)}var f=g.substr(g.lastIndexOf(".")+1).toLowerCase();switch(f){case"jpg":case"jpeg":case"gif":case"png":case"svg":case"bmp":return"data/imagenes/"+g;case"swf":return"data/imagenes/"+g.replace(/\.swf/i,".png");case"mp4":return"data/videos/"+g;case"flv":return"data/videos/"+g.replace(/\.flv/i,".mp4");case"mp3":case"wav":return"data/sonidos/"+g;case"zip":return"data/actividades/"+g.replace(/\.zip/,"_zip")+"/Principal.html";case"xml":return"data/"+g;default:return"data/imagenes/"+g}}b.realResourcePath=c;var e={blocks:[{type:"img",files:[]}],spinner:"no",waitForDocumentReady:false,onEndLoading:null};function d(h,g){if(h==null||h==undefined||g==null||g==undefined||h==""||g==""){return}for(var f=0;f<e.blocks[0].files.length;f++){if(e.blocks[0].files[f].from==h&&e.blocks[0].files[f].file==g){return}}e.blocks[0].files.push({from:h,file:g})}b.addImageToPreloader=d;function a(f){if(e.blocks[0].files.length==0){f(e)}else{e.onEndLoading=f;pppPreloader.loadManifest(e)}}b.preloadImages=a})(FUtils||(FUtils={}));var stage;var LAYOUTS=[{width:400,height:250,positions:[{x:53,y:146},{x:497,y:146}]},{width:277,height:182,positions:[{x:35,y:182},{x:338,y:182},{x:641,y:182}]},{width:277,height:182,positions:[{x:122,y:86},{x:552,y:86},{x:122,y:324},{x:552,y:324}]},{width:277,height:182,positions:[{x:35,y:88},{x:338,y:88},{x:641,y:88},{x:174,y:329},{x:477,y:329}]},{width:277,height:182,positions:[{x:35,y:91},{x:338,y:91},{x:641,y:91},{x:35,y:334},{x:338,y:334},{x:641,y:334}]},{width:218,height:143,positions:[{x:27,y:107},{x:256,y:107},{x:483,y:107},{x:711,y:107},{x:141,y:324},{x:370,y:324},{x:597,y:324}]},{width:218,height:143,positions:[{x:27,y:107},{x:256,y:107},{x:483,y:107},{x:711,y:107},{x:27,y:334},{x:256,y:334},{x:483,y:334},{x:711,y:334}]},{width:298,height:332,positions:[{x:104,y:115},{x:545,y:115}]},{width:277,height:321,positions:[{x:35,y:139},{x:337,y:139},{x:639,y:139}]},{width:197,height:182,positions:[{x:124,y:86},{x:586,y:86},{x:124,y:333},{x:586,y:333}]},{width:197,height:182,positions:[{x:114,y:86},{x:347,y:86},{x:590,y:86},{x:231,y:333},{x:496,y:333}]},{width:197,height:182,positions:[{x:114,y:86},{x:347,y:86},{x:590,y:86},{x:114,y:326},{x:347,y:326},{x:590,y:326}]},{width:197,height:182,positions:[{x:27,y:88},{x:259,y:88},{x:492,y:88},{x:726,y:88},{x:144,y:333},{x:375,y:333},{x:608,y:333}]},{width:197,height:182,positions:[{x:27,y:86},{x:259,y:86},{x:492,y:86},{x:726,y:86},{x:27,y:322},{x:259,y:322},{x:492,y:322},{x:726,y:322}]}];var MAIN_TITLE_POS={x:90,y:9,width:767,height:77};var MAIN_FOOTER_POS={x:0,y:570,width:950,height:30};var SUBMENU_BUT_POS={x:46,y:565,width:37,height:37};var SUBMENU_BUT_SEPX=37+20;var PAGE_TITLE_POS={x:46,y:108,width:882,height:49};var PAGE_BK_POS={x:0,y:165,width:950,height:376};var PAGE_IMGSLIDER_POS={x:46,y:165,width:250,height:376};var PAGE_IMGSLIDER_TOOLBAR_POS={x:197,y:500,width:37,height:37};var PAGE_IMGSLIDER_TOOLBAR_SEPX=37+20;var PAGE_IMGSLIDER_ZOOM_POS={x:208,y:5,width:37,height:37};var PAGE_TEXT_POS={x:347,y:193,width:592,height:323};var POPUPIMAGEN_CLOSEBUT_POS={x:883,y:36,width:37,height:37};var WATERMARK_POS={x:20,y:20,width:62,height:62};function createImagePopup(f,d){var c=new pppUI.UIPopup("popup","bkWhite",null);var b=new pppUI.UIObject("popupContent");b.position={x:0,y:0,width:pppUI.UIStage.DP_WIDTH,height:pppUI.UIStage.DP_HEIGHT};c.addChild(b);var g=new pppUI.UIImage("img","",pppPreloader.from("data",FUtils.realResourcePath(f)),pppUI.UIImage.ADJUSTMODE_RESIZE,800,460,pppUI.UIImage.ALIGN_CENTER|pppUI.UIImage.ALIGN_MIDDLE);FUtils.addImageToPreloader("data",FUtils.realResourcePath(f));g.x=75;g.y=75;b.addChild(g);var a=pppUI.Utils.createTextBox("pie",d,"popupPie",{x:75,y:535,width:800,height:75});b.addChild(a);var e=new pppUI.UIButton("closeButton","popupCloseButton",pppUI.UIButton.BUTTON,"");e.position=POPUPIMAGEN_CLOSEBUT_POS;e.command=function(h,i){stage.closePopup()};b.addChild(e);return c}function createImageslide(j,b,a){var h=new pppUI.UISlide(b);var i=a.getAttribute("path")||"";if(i==null||i==""){return null}var g=a.getAttribute("pathbig")||"";if(g==""){g=i.replace(".jpg","_big.jpg");g=g.replace(".jpeg","_big.jpeg");g=g.replace(".png","_big.png");g=g.replace(".gif","_big.gif")}var d=$($(a).children("title")[0]).text();var f=a.getAttribute("border");var e=new pppUI.UIImage("img","",pppPreloader.from("data",FUtils.realResourcePath(i)),pppUI.UIImage.ADJUSTMODE_CROP,PAGE_IMGSLIDER_POS.width,PAGE_IMGSLIDER_POS.height);FUtils.addImageToPreloader("data",FUtils.realResourcePath(i));if(f=="true"||f=="1"){e.addClass("imageBordered")}h.addChild(e);if(g!=null&&g!=""){var c=new pppUI.UIButton("btnOpenPopup","popupOpenButton",pppUI.UIButton.BUTTON,"");c.position=PAGE_IMGSLIDER_ZOOM_POS;c.command=function(k,l){stage.openPopup(l.extra.popup)};c.extra.popup=createImagePopup(g,d);h.addChild(c)}return h}function createPageSlide(m,b,a){var h=new pppUI.UISlide(b);var p=a.getAttribute("color");var c=$(a).children("title")[0];var f=$(a).children("description")[0];var l="";if(c!=null&&$(c).text()!=null){l=$(c).text()}var n="";if(f!=null&&$(f).text()!=null){n=$(f).text()}var e=$(a).children("images");var d=new pppUI.UIObject("bk");d.position=PAGE_BK_POS;d.$DOMItem.css("background-color",p);h.addChild(d);var g=new pppUI.UISimpleText("title","slideSubtitle",l);g.alignMode=pppUI.UISimpleText.ALIGN_BOTTOM|pppUI.UISimpleText.ALIGN_LEFT;g.position=PAGE_TITLE_POS;h.addChild(g);var j=pppUI.Utils.createTextBox("txt",n,"",PAGE_TEXT_POS);j.$DOMItem.css("overflow-y","auto");h.addChild(j);var o=new pppUI.UISlider("imgs");o.transMode=pppUI.UISlider.TRANS_NONE;o.position=PAGE_IMGSLIDER_POS;h.addChild(o);h.onPrepare=function(s){o.current=0;var r=s.getChildById("prev_"+b);if(r!=null){r.visible=false}var q=s.getChildById("next_"+b);if(q!=null){q.visible=(o.count>1)?true:false}};h.onShown=function(r){var q=r.getChildById("txt");pppUI.Utils.showScrollMarker(q,true)};e.children("image").each(function(q,r){var s=createImageslide(o,"slide"+q,r);if(s!=null){o.addSlide(s)}});if(e.children("image").length>1){var i=[{id:"prev_"+b,className:"sliderprevbutton",content:"",visible:false},{id:"next_"+b,className:"slidernextbutton",content:"",visible:(o.count>1?true:false)}];var k=pppUI.Utils.createButtonList(h,PAGE_IMGSLIDER_TOOLBAR_POS,PAGE_IMGSLIDER_TOOLBAR_SEPX,false,i,function(r,s){var q=s.id.substring(4,s.id.length);switch(s.id.substring(0,4)){case"prev":o.prev();if(o.current==0){s.parent.getChildById("prev"+q).visible=false}s.parent.getChildById("next"+q).visible=true;break;case"next":o.next();if(o.current==(o.count-1)){s.parent.getChildById("next"+q).visible=false}s.parent.getChildById("prev"+q).visible=true;break}})}return h}function createPagesSlide(h,d,b,a,i){var f=new pppUI.UISlider(b);f.transMode=pppUI.UISlider.TRANS_NONE;f.position={x:0,y:0,width:pppUI.UIStage.DP_WIDTH,height:pppUI.UIStage.DP_HEIGHT};d.addChild(f);d.onPrepare=function(l){f.current=0;var k=l.getChildById("prev_"+b);if(k!=null){k.visible=false}var j=l.getChildById("next_"+b);if(j!=null){j.visible=(f.count>1)?true:false}};$(a).children("page").each(function(k,l){if(l.getAttribute("visible")=="true"){var j=createPageSlide(f,"page_"+k,l);f.addSlide(j)}});var c=new pppUI.UIButton("closeButton","popupCloseButton",pppUI.UIButton.BUTTON,"");c.position=POPUPIMAGEN_CLOSEBUT_POS;c.command=function(j,k){h.current=i};d.addChild(c);if($(a).children("page").length>1){var e=[{id:"prev_"+b,className:"sliderprevbutton",content:"",visible:false},{id:"next_"+b,className:"slidernextbutton",content:"",visible:(f.count>1?true:false)}];var g=pppUI.Utils.createButtonList(d,SUBMENU_BUT_POS,SUBMENU_BUT_SEPX,false,e,function(k,l){var j=l.id.substring(4,l.id.length);switch(l.id.substring(0,4)){case"prev":f.prev();if(f.current==0){l.parent.getChildById("prev"+j).visible=false}l.parent.getChildById("next"+j).visible=true;break;case"next":f.next();if(f.current==(f.count-1)){l.parent.getChildById("next"+j).visible=false}l.parent.getChildById("prev"+j).visible=true;break}})}}function fillInMenu(m,e,a,n){var b=$(a).children("main")[0];var i=$($(b).children("title")[0]).text();var j=$($(b).children("footer")[0]).text();var l=$(a).children("sections")[0];var h=$(l).children("section");var g=e.index;var f=b.getAttribute("layout");var c=new pppUI.UISimpleText("title","slideTitle",i);c.alignMode=pppUI.UISimpleText.ALIGN_CENTER|pppUI.UISimpleText.ALIGN_MIDDLE;c.position=MAIN_TITLE_POS;e.addChild(c);if(j!=null&&j!=""){var k=pppUI.Utils.createTextBox("txt","<span>&nbsp;&nbsp;"+j+"&nbsp;&nbsp;</span>","slideFooter",MAIN_FOOTER_POS);e.addChild(k)}h.each(function(u,p){var w=new pppUI.UISlide("sub_"+u);var z=m.addSlide(w);var s;var v=$(p).children("menuImage")[0].getAttribute("path");var y=$(p).children("menuImage")[0].getAttribute("border");var r=$($(p).children("menuImage")[0]).children("title").text();s=new pppUI.UIImageButton("btn"+u,"brightImageButton",pppUI.UIButton.BUTTON,pppPreloader.from("data",FUtils.realResourcePath(v)),pppUI.UIImageButton.ADJUSTMODE_STRETCH,LAYOUTS[f].width,LAYOUTS[f].height);FUtils.addImageToPreloader("data",FUtils.realResourcePath(v));s.command=function(A,B){m.current=z};s.x=LAYOUTS[f].positions[u].x;s.y=LAYOUTS[f].positions[u].y;s.width=LAYOUTS[f].width;s.height=LAYOUTS[f].height;if(y=="true"||y=="1"){s.addClass("imageBordered")}e.addChild(s);var x=pppUI.Utils.createTextBox("btnText"+u,r,"menuItemFooter",MAIN_TITLE_POS);x.position={x:s.x,y:s.y+s.height,width:s.width,height:100};e.addChild(x);var t=(p.getAttribute("hasSubsections")=="true");if(t){var q=$(p).children("submenu")[0];fillInMenu(m,w,q,g)}else{var o=$(p).children("pages")[0];createPagesSlide(m,w,"page"+u,o,g)}});if(n!=-1){var d=new pppUI.UIButton("back","sliderhomebutton",pppUI.UIButton.BUTTON,"");d.position=SUBMENU_BUT_POS;d.command=function(o,p){m.current=n};e.addChild(d)}}function main(b){var a=true;if(window.hasOwnProperty("pppUIScaled")){a=window.pppUIScaled}stage=new pppUI.UIStage("__stage","diaporama_container",a,false,function(c){var f=$(b).children("engine")[0];c.addClass("MainBk");var e=new pppUI.UISlider("mainSlider");e.position={x:0,y:0,width:pppUI.UIStage.DP_WIDTH,height:pppUI.UIStage.DP_HEIGHT};e.transMode=pppUI.UISlider.TRANS_NONE;e.addClass("bkWhite");c.addChild(e);var g=new pppUI.UISlide("main");g.visible=true;e.addSlide(g);fillInMenu(e,g,f,-1);var d=new pppUI.UIObject("watermark");d.addClass("watermark");d.position=WATERMARK_POS;c.addChild(d);if(window.hasOwnProperty("MathJax")){MathJax.Hub.Queue(["Typeset",MathJax.Hub])}FUtils.preloadImages(function(h){pppSpinner.hide()})})};