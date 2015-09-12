
Main = new function()
{
	this.stage = "";
	this.navegador = "";
	this.mobil = "";	
	
	this.stage_width = 950;
	this.stage_height = 608;
	this.scale = 1;
	
	this.text_Y =0;
	this.text_X =0;
	
	this.refresh  = function (event){

    	Main.stage.update();
    	/*if( Main.input )
    	{
    		$(Main.input).focus();
    	}*/
    	    	
    }
    this.setFocus = function(_input){
    	Main.input= _input;
    }

    this.init = function()
    {
        this.stage = new createjs.Stage("stage");
        this.navegador = Main.detectBrowser();     
        this.mobil = Main.detectDevice();
        
        
        var canvas = this.stage.canvas;
        var ctx2D = canvas.getContext("2d");
        var refThis = this;
        var ffdone = false;
        var fftest = setInterval(function(){
            if(ffdone){
                clearInterval(fftest);
                refThis.continueInit();
            }
            try{
                ctx2D.measureText("MEASURE ME");
                ffdone = true;
            }catch(e){
                //console.log("FRAME OCULTO");
            }
        }, 100);
    };
    
    this.continueInit = function(){
        createjs.Touch.enable(this.stage);
        this.stage.enableMouseOver();
        
        Scorm.init( aulaPlaneta.SCORM.initialize() );
        Contenedor.cargarDatos();
        createjs.Ticker.addEventListener("tick", this.refresh);
        Main.windowResize();
        setTimeout(Main.windowResize,100 );
        this.stage.update();
    }
    
    this.switchBrowser = function(){
    	var browser = this.navegador.split(" ")[0];
    	
    	switch(browser){
    		case "Firefox": 
    				break;
    		case "IE":
    				break;
    		case "Chrome":
    				break;
    		case "Safari":
    				break;	
    	}
    }
      
    this.detectBrowser = function()
    {
		var ua= navigator.userAgent, tem, 
	    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	    if(/trident/i.test(M[1])){
	        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
	        return 'IE '+(tem[1] || '');
	    }
	    if(M[1]=== 'Chrome'){
	        tem= ua.match(/\bOPR\/(\d+)/)
	        if(tem!= null) return 'Opera '+tem[1];
	    }
	    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
	    return M.join(' ');
    } 
    
    this.detectDevice = function()
    {		
		 if( navigator.userAgent.match(/Android/i) ) return "Android";
		 else if( navigator.userAgent.match(/webOS/i) ) return "webOS";
		 else if( navigator.userAgent.match(/iPhone/i) ) return "iPhone"; 
		 else if( navigator.userAgent.match(/iPad/i) ) return "iPad";
		 else if( navigator.userAgent.match(/iPod/i) ) return "iPod";
		 else if( navigator.userAgent.match(/BlackBerry/i) ) return "BlackBerry";
		 else if( navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/iemobile/i) || navigator.userAgent.match(/windows mobile/i) ) return "Windows";
		 else return "PC";

    }
    
    this.windowResize =function ()
    {
		// browser viewport size
		var w = window.innerWidth;
		var h = window.innerHeight;
		
		// stage dimensions
		var ow = Main.stage_width; // your stage width
		var oh = Main.stage_height; // your stage height
		
		 // keep aspect ratio
		Main.scale = Math.min(w / ow, h / oh);
		Main.stage.scaleX = Main.scale;
		Main.stage.scaleY = Main.scale;
		
		// adjust canvas size
		Main.stage.canvas.width = ow * Main.scale;
		Main.stage.canvas.height = oh * Main.scale;
		  
		$("#wrapper").css( 'line-height',  h+ 'px');;

    }
      
} 
window.addEventListener('resize', Main.windowResize, false);
	
    
    
