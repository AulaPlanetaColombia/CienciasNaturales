function BaseResposta(_index, _width, _height, _radius) {
  
  this.resposta  = null;
  this.index = _index;
  this.width = _width;
  this.height = _height;
  this.radius = _radius;
  this.idPregunta =-1;
  
  this.base = new createjs.Shape();
  
  this.contenedor = new createjs.Container();
  this.dibuixa();
}

BaseResposta.prototype.setReposta = function(_resposta){
  this.resposta = _resposta;
  this.resposta.index = this.index;
  //this.contenedor.addChild( this.resposta.contenedor );
}

BaseResposta.prototype.dibuixa = function() {
  
  this.base.graphics.beginFill("#fde8c2").drawRoundRect(0, 0, this.width, this.height, this.radius);
  this.base.graphics.beginStroke("#f8B334").drawRoundRect(0, 0, this.width, this.height, this.radius);
  this.base.mouseEnabled = false;
  this.contenedor.addChild( this.base );
  
}

BaseResposta.prototype.hideBounds = function() {
  
  this.base.graphics.clear();
}




function Resposta(_texte, _width, _height, _radius) {
	this.width = _width;
  	this.height = _height;
  	this.radius = _radius;
  	this.texte = _texte;
  	this.index = 0;
  	this.idResposta = -1;
  	this.error = false;
  	
  	this.correccio = new createjs.Shape();
  	
  	this.fons = new createjs.Shape();	
	this.text = new createjs.RichText();	
	this.contenedor = new createjs.Container();
  	this.dibuixa();
}

Resposta.prototype.lightResponse = function(){
	this.fons.graphics.clear();
	this.fons.graphics.beginFill("#f8B334").drawRoundRect(0, 0, this.width, this.height, this.radius);
	this.fons.shadow = new createjs.Shadow("#777", 4, 4, 10);
}
Resposta.prototype.unlightResponse = function(){
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, this.width, this.height, this.radius);
	this.fons.shadow = null;
}
Resposta.prototype.erronia = function(){
	this.error = true;
	this.correccio.graphics.beginStroke("#E1001A").setStrokeStyle(3).drawRoundRect(-2, -2, this.width + 2, this.height + 2, this.radius);
	this.contenedor.addChild( this.correccio );
}
Resposta.prototype.correcte = function(){
	this.error = false
	this.correccio.graphics.beginStroke("#41A62A").setStrokeStyle(3).drawRoundRect(-2, -2, this.width + 2, this.height + 2, this.radius);
	this.contenedor.addChild( this.correccio );
}
Resposta.prototype.removeError = function(){
	if(this.error) this.contenedor.removeChild( this.correccio );
}
Resposta.prototype.dibuixa = function() {
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, this.width, this.height, this.radius);
	
	this.text.font = (Contenedor.datosXML.plataforma.grado == 1)? "16px Arial" : "14px Arial" ;
	this.text.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 16 : 14 ;
	this.text.color = "#0D3158";
	this.text.text = this.texte ;
	this.text.x = 8;
	this.text.y = 5 ;
	this.text.lineWidth = 305;
	this.text.lineHeight = 22;
	this.text.mouseEnabled = false;
	
	this.contenedor.addChild( this.fons );
	this.contenedor.addChild( this.text );
}

function Numero( pregunta ) {
	//console.log(pregunta.text);
  	this.texte = "0"+pregunta.text;
  	this.index = 0;
  	this.idNumero = pregunta.id;
  	
  	this.fons = new createjs.Shape();	
	this.text = new createjs.Text();	
	this.contenedor = new createjs.Container();
  	this.dibuixa();
}

Numero.prototype.dibuixa = function() {
	this.fons.graphics.beginFill("#fff").drawRoundRect( 0, 0, 32, 32, 5);
	
	this.text.font = (Contenedor.datosXML.plataforma.grado == 1)? "20px Arial" : "18px Arial" ;
	this.text.color = "#F39613";
	this.text.text = this.texte ;
	this.text.x = 5;
	this.text.y = 4 ;
	this.text.mouseEnabled = false;
	
	this.contenedor.addChild( this.fons );
	this.contenedor.addChild( this.text );
}

function BotoAudio( index) {
	
  	this.width = 58;
  	this.height = 58;
  	this.index = index;

	var _imgLoaded = new Image(); 
	_imgLoaded.src = pppPreloader.from("module", 'motor/images/btnAudio.png');
//	_imgLoaded.name = 'tancar';

	var data = {
	    images: [_imgLoaded],
	    frames: { width: 58, height: 58},
	    animations: { normal: [0], hover: [2], play:{ frames: [2,3,4,5,6,7,8,9] , next: "play", speed: 0.5}}
	};
	var spriteSheet = new createjs.SpriteSheet(data);
	this.bt = new createjs.Sprite(spriteSheet);

	// the code block in this helper.addEventListener (It works with button.addEventListener)
	this.bt.on("mouseover", function(evt){ if( $('#audio'+this.index)[0].paused)  this.bt.gotoAndStop("hover");},this);
	this.bt.on("mouseout", function(evt){ if($('#audio'+this.index)[0].paused) this.bt.gotoAndStop("normal");},this);
	this.bt.on("mousedown", this.pressHandler, this);
	this.bt.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
	this.bt.on("mouseout", function(evt){ document.body.style.cursor='default'; });
	
	this.bt.x = 0;
	this.bt.y = 0;
	this.bt.gotoAndStop("normal");
}
BotoAudio.prototype.pressHandler = function(evt){
	if(evt.primary){
		if( $('#audio'+this.index)[0].paused ) 
		{
			for( key in Motor.audios)
			{
				if( !$('#audio'+Motor.audios[key].index)[0].paused )
				{
					Motor.audios[key].bt.gotoAndStop("normal");
					$('#audio'+Motor.audios[key].index)[0].pause();
					$('#audio'+Motor.audios[key].index)[0].currentTime = 0;
				}
			}
	
			$('#audio'+this.index)[0].play(); 
			this.bt.gotoAndPlay("play");
			$('#audio'+this.index)[0].addEventListener("ended",this.final);
		}
		else 
		{
			$('#audio'+this.index)[0].pause(); 
			$('#audio'+this.index)[0].currentTime = 0;
			this.bt.gotoAndStop("normal");
		}
	}
}
BotoAudio.prototype.final= function(){
	for( key in Motor.audios)
	{
		Motor.audios[Motor.audios[key].index].bt.gotoAndStop("normal");
	}
}

function Ampliacion()
{
	this.fons = new createjs.Shape();
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, Main.stage_width, Main.stage_height, 5);
	this.fons.alpha = 0.60;
	
	this.contenedor = new createjs.Container();
	this.contenedor.addChild(this.fons);
	
	var img = new Image();
	var amplia = this;
	
	this.imagen = "";
	img.onload = function () {

	   	amplia.imagen = new createjs.Bitmap(this);

		amplia.imagen.scaleX =  500 / this.height;
		amplia.imagen.scaleY =  500 / this.height;
		
		amplia.imagen.x = (Main.stage_width - (this.width * 500 / this.height))/2;
		amplia.imagen.y = 50;
		
		//mascara de cantonades arrodonides
		amplia.imagen.mask = new createjs.Shape();
		amplia.imagen.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 500, this.height * 500 / this.width, 10);
		amplia.imagen.mask.x = (Main.stage_width - (this.width * 500 / this.height))/2;
	 	amplia.imagen.mask.y = 50;
		
		amplia.contenedor.addChild( amplia.imagen);
	};
	img.src = pppPreloader.from("data", Motor.IMG + Motor.datosXML.ampliacion);//Motor.IMG + Motor.datosXML.ampliacion;
		
	this.contenedor.on("click", this.tancar);
	this.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
	this.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
}
Ampliacion.prototype.tancar= function(evt){
	if( evt.primary ){
		createjs.Tween.get(this).to({alpha:0}, 500, createjs.Ease.circOut);
	}
}