function BaseElemento(_index, _width, _height, _radius) {
  
  this.element  = null;
  this.index = _index;
  this.width = _width;
  this.height = _height;
  this.radius = _radius;
  this.categoria=null;
  
  this.base = new createjs.Shape();
  
  this.contenedor = new createjs.Container();
  this.dibuixa();
}

BaseElemento.prototype.setElement = function(_element){
  this.element = _element;
  this.element.index = this.index;
  this.element.base = this;
  //this.contenedor.addChild( this.resposta.contenedor );
}

BaseElemento.prototype.dibuixa = function() {
  
  this.base.graphics.beginFill("#fde8c2").drawRoundRect(0, 0, this.width, this.height, this.radius);
  this.base.graphics.beginStroke("#f8B334").setStrokeStyle(1).drawRoundRect(0, 0, this.width, this.height, this.radius);
  this.base.mouseEnabled = false;
  this.contenedor.addChild( this.base );
  
}

function Elemento(_texte, id, _width, _height, _radius) {
	this.width = _width;
  	this.height = _height;
  	this.radius = _radius;
  	this.texte = _texte;
  	this.id = id;
  	this.index = 0;
  	this.ordre = -1;
  	this.idElement = -1;
  	this.categoria = -1;
  	this.error = true;
  	this.base = null;
  	
  	this.correccio = new createjs.Shape();
  	
  	this.fons = new createjs.Shape();	
	this.text = new createjs.RichText();	
	this.contenedor = new createjs.Container();
  	this.dibuixa();
}

Elemento.prototype.lightResponse = function(){
	this.fons.graphics.clear();
	this.fons.graphics.beginFill("#f8B334").drawRoundRect(0, 0, this.width, this.height, this.radius);
	this.fons.shadow = new createjs.Shadow("#777", 4, 4, 10);
}
Elemento.prototype.unlightResponse = function(){
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, this.width, this.height, this.radius);
	this.fons.shadow = null;
}
Elemento.prototype.erronia = function(){
	this.error = true;
	this.correccio.graphics.clear();
	this.correccio.graphics.beginStroke("#E1001A").setStrokeStyle(3).drawRoundRect(-2, -2, this.width + 4, this.height + 4, this.radius);
	this.contenedor.addChild( this.correccio );
}
Elemento.prototype.correcte = function(){
	this.error = false
	this.correccio.graphics.clear();
	this.correccio.graphics.beginStroke("#41A62A").setStrokeStyle(3).drawRoundRect(-2, -2, this.width + 4, this.height + 4, this.radius);
	this.contenedor.addChild( this.correccio );
}
Elemento.prototype.removeError = function(){
	if(this.error) this.contenedor.removeChild( this.correccio );
}
Elemento.prototype.dibuixa = function() {
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, this.width, this.height, this.radius);
	
	this.text.font = (Contenedor.datosXML.plataforma.grado == 1)?  "16px Arial" : "14px Arial" ;
	this.text.fontSize = (Contenedor.datosXML.plataforma.grado == 1)?  16 : 14 ;
	this.text.color = "#0D3158";
	this.text.text = this.texte ;
	this.text.x = 8;
	this.text.y = 5 ;
	this.text.lineWidth = 700;
	this.text.lineHeight = 22;
	this.text.mouseEnabled = false;
	
	this.contenedor.addChild( this.fons );
	this.contenedor.addChild( this.text );
}

function BotoAudio( index) {
	
  	this.width = 58;
  	this.height = 58;
  	this.index = index;

	var _imgLoaded = new Image(); 
	_imgLoaded.src = "motor/images/btnAudio.png";
//	_imgLoaded.name = 'tancar';

	var data = {
	    images: [_imgLoaded],
	    frames: { width: 58, height: 58},
	    animations: { normal: [0], hover: [2], play:{ frames: [2,3,4,5,6,7,8,9] , next: "play", speed: 0.5}}
	};
	var spriteSheet = new createjs.SpriteSheet(data);
	this.bt = new createjs.Sprite(spriteSheet);
	this.bt.scaleX = 0.5;
	this.bt.scaleY = 0.5;
	
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
 BotoAudio.prototype.pressHandler = function(){
	//console.log($('#audio'+this.index)[0]);
	//$('#audio'+this.id)[0].trigger("click");
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
		
		//$('#audio'+this.index)[0].load(); 
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
BotoAudio.prototype.final= function(){
	for( key in Motor.audios)
	{
		Motor.audios[Motor.audios[key].index].bt.gotoAndStop("normal");
	}
}
 
function Categoria(i, categoria, numcat, numFilas){
  	this.texte = categoria.categoria;
  	this.index = i;
  	this.id = categoria.id;
  	this.contenedor = new createjs.Container();
  	
  	//fons
  	this.fons = new createjs.Shape();
  	this.fons.graphics.beginFill("#FCE1AE").drawRoundRect(0,0, 210, 220, 5);
  	
  	//titol	
	this.text = new createjs.RichText();	
	this.text.font = (Contenedor.datosXML.plataforma.grado == 1)?  "16px Arial" : "14px Arial" ;
	this.text.fontSize = (Contenedor.datosXML.plataforma.grado == 1)?  16 : 14 ;
	this.text.color = "#0D3158";
	this.text.text = this.texte;
	this.text.y = 7 ;
	if(210 < this.text.getMeasuredWidth())
	{
		this.text.x = 10;
		this.text.lineWidth = 200;
		this.text.lineHeight = 20;
	}else{
		this.text.x = 5+(220 -this.text.getMeasuredWidth())/2;
	}
	this.text.mouseEnabled = false;
	
	// contenedors
	this.contenedors = new Array();
	
	this.contenedor.addChild( this.fons );
	this.contenedor.addChild( this.text );
	
	//audios
	if(categoria.sonido != "" ){
		this.audio = new BotoAudio(categoria.id);
		this.audio.bt.x = 10;
		this.audio.bt.y = 5;
		Motor.audios.push(this.audio);
		this.contenedor.addChild( this.audio.bt );
	}
	
	var ancho, espacio;
    if(numFilas > 4){
        ancho = 28;
        espacio =35;
    }else{
        ancho = 34;
        espacio = 43;
    }
    
	for(var i=1; i <= numFilas; i++)
	{
		var base = new BaseElemento(i, 185, ancho, 5);
		base.contenedor.x = 12;
		base.contenedor.y = 45 + ( i - 1 ) * espacio;
		base.categoria = this;
		this.contenedor.addChild( base.contenedor);
		this.contenedors[i-1]= base;
	}
	this.currentIndex = 0;
	
	
 // 	this.dibuixa();
}
Categoria.prototype.situar = function(element, delay ) {
	
	for( var key in this.contenedors)
	{
		if( this.contenedors[key].element == null){
			this.contenedors[key].categoria = this;
			
			// coordenades del element desti
			var xfi = this.contenedor.x + this.contenedors[key].contenedor.x + 1;
			var yfi = this.contenedor.y + this.contenedors[key].contenedor.y + 1;
	
			// coloquem l'element origen a la casella de l'element destí
			this.contenedors[key].setElement(element); 
			element.contenedor.x = xfi;
			element.contenedor.y = yfi;	 
			//createjs.Tween.get(element.contenedor).wait(delay).to({x: xfi, y: yfi}, 250, createjs.Ease.circOut);
		
			return true;
		}
	}
	return false;

}
Categoria.prototype.addElement = function(element, delay ) {
	
	for( var key in this.contenedors)
	{
		if( this.contenedors[key].element == null){
			this.contenedors[key].categoria = this;
			
			// coordenades del element desti
			var xfi = this.contenedor.x + this.contenedors[key].contenedor.x + 1;
			var yfi = this.contenedor.y + this.contenedors[key].contenedor.y + 1;
	
			// coloquem l'element origen a la casella de l'element destí
			this.contenedors[key].setElement(element); 		 
			createjs.Tween.get(element.contenedor).wait(delay).to({x: xfi, y: yfi}, 250, createjs.Ease.circOut);
		
			return true;
		}
	}
	return false;

}

Categoria.prototype.removeElement = function(element, resituar ) {
	
	var key="";
	var trobat = false
	for( key in this.contenedors )
	{
		if( this.contenedors[key].element == element )
		{
			trobat= true;
			break;
		}
	}
	
	if(trobat)
	{
		this.contenedors[key].element = null;
	}
}
