function BaseResposta(_index, _width, _height, _radius) {
  
  this.resposta  = null;
  this.index = _index;
  this.width = _width;
  this.height = _height;
  this.radius = _radius;
  this.pregunta =null;
  
  this.base = new createjs.Shape();
  
  this.contenedor = new createjs.Container();
  this.dibuixa();
}

BaseResposta.prototype.setReposta = function(_resposta){
  this.resposta = _resposta;
  this.resposta.index = this.index;
  this.resposta.base = this;
  //this.contenedor.addChild( this.resposta.contenedor );
}

BaseResposta.prototype.dibuixa = function() {
  
  this.base.graphics.beginFill("#fde8c2").drawRoundRect(0, 0, this.width, this.height, this.radius);
  this.base.graphics.beginStroke("#f8B334").drawRoundRect(0, 0, this.width, this.height, this.radius);
  this.base.mouseEnabled = false;
  this.contenedor.addChild( this.base );
  
}

function Resposta(_texte, _width, _height, _radius) {
	this.width = _width;
  	this.height = _height;
  	this.radius = _radius;
  	this.texte = _texte;
  	this.index = 0;
  	this.idResposta = -1;
  	this.idPregunta = -1; 
  	this.ordre = -2;
  	this.error = false;
  	this.base = null;
  	
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
	this.correccio.graphics.beginStroke("#E1001A").setStrokeStyle(3).drawRoundRect(-2, -2, this.width + 4, this.height + 4, this.radius);
	this.contenedor.addChild( this.correccio );
}
Resposta.prototype.correcte = function(){
	this.error = false
	this.correccio.graphics.beginStroke("#41A62A").setStrokeStyle(3).drawRoundRect(-2, -2, this.width + 4, this.height + 4, this.radius);
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
	this.text.y = 3 ;
	this.text.lineWidth = 190;
	this.text.lineHeight = 22;
	this.text.mouseEnabled = false;
	
	this.contenedor.addChild( this.fons );
	this.contenedor.addChild( this.text );
}


function Pregunta(i, pregunta, numcat){
  	this.texte = pregunta.text;
  	this.index = i;
  	this.id = pregunta.id;
  	this.contenedor = new createjs.Container();
  	this.contenedor.y = Motor.INITIAL_Y + (this.index % 3) * 130+25;
  	this.contenedor.x =  Math.floor(this.index / 3) * 330 + 25;
  	
  	//fons
  	this.fons = new createjs.Shape();
  	this.fons.graphics.beginFill("#fde8c2").drawRoundRect(0, 0, 325, 125, 5);
  	
  	//titol	
	this.text = new createjs.RichText();	
	this.text.font = (Contenedor.datosXML.plataforma.grado == 1)? "16px Arial" : "14px Arial" ;
	this.text.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 16 : 14 ;
	this.text.color = "#0D3158";
	this.text.text = this.texte;
	this.text.y = 4 ;
	this.text.x = 120;
	this.text.lineWidth = 200;
	this.text.lineHeight = 20;
	this.text.mouseEnabled = false;
	
	//mascara de cantonades arrodonides
	this.text.mask = new createjs.Shape();
	this.text.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 200, 40, 1);
	this.text.mask.x =120;
	this.text.mask.y = 4;
	
	this.imagen = new Imagen(pregunta);
	// contenedors
	this.contenedors = new Array();
	
	this.contenedor.addChild( this.fons );
	this.contenedor.addChild( this.text );
	this.contenedor.addChild( this.imagen.contenedor );
	
	for(var i=1; i <= pregunta.respuestas; i++)
	{
		var inici = new BaseResposta(i,Motor.RESP_WIDTH, Motor.RESP_HEIGHT , 5);
		inici.contenedor.x = 120;
        inici.contenedor.y = 20 + 34 * i;
        
		inici.pregunta = this;
		this.contenedor.addChild( inici.contenedor );
		this.contenedors[i-1] = inici;
	}
	this.currentIndex = 0;
}
Pregunta.prototype.addElement = function(element, delay ) {
	
	//if(this.currentIndex < this.contenedors.length)
	//{
	for( var key in this.contenedors)
	{
		if( this.contenedors[key].resposta == null){
			//this.contenedors[this.currentIndex].pregunta = this;
			Motor.contenedor.setChildIndex ( element.contenedor,  Motor.contenedor.getNumChildren ()  );
			// coordenades del element desti
			var xfi = this.contenedor.x + this.contenedors[key].contenedor.x + 1;
			var yfi = this.contenedor.y + this.contenedors[key].contenedor.y + 1;
	
			// coloquem l'element origen a la casella de l'element destí
			this.contenedors[key].setReposta(element); 		 
			createjs.Tween.get(element.contenedor).wait(delay).to({x: xfi, y: yfi}, 250, createjs.Ease.circOut);

			return true;
		}
	}
	return false;

}
Pregunta.prototype.situar = function(element, delay ) {
	
	for( var key in this.contenedors)
	{
		if( this.contenedors[key].resposta == null){
			//this.contenedors[this.currentIndex].pregunta = this;
			Motor.contenedor.setChildIndex ( element.contenedor,  Motor.contenedor.getNumChildren ()  );
			// coordenades del element desti
			var xfi = this.contenedor.x + this.contenedors[key].contenedor.x + 1;
			var yfi = this.contenedor.y + this.contenedors[key].contenedor.y + 1;
	
			// coloquem l'element origen a la casella de l'element destí
			this.contenedors[key].setReposta(element); 
			
			element.contenedor.x = xfi;
			element.contenedor.y = yfi;		 
			//createjs.Tween.get(element.contenedor).wait(delay).to({x: xfi, y: yfi}, 250, createjs.Ease.circOut);
	
			return true;
		}
	}
	return false;

}
Pregunta.prototype.removeElement = function(element, resituar ) {
	
	var key="";
	var trobat = false
	for( key in this.contenedors )
	{
		if( this.contenedors[key].resposta == element )
		{
			trobat= true;
			break;
		}
	}
	
	if(trobat)
	{
		this.contenedors[key].resposta = null;
	}
}

function Imagen( pregunta ){	    
	    // get imagen
    this.contenedor = new createjs.Container();

    var img = new Image();
    var objeto = this;
	img.onload = function () {
	   	objeto.imagen = new createjs.Bitmap(this);

 		objeto.imagen.x = 0;
		objeto.imagen.y = 5;
		//escalem imatges
		objeto.imagen.scaleX =  115 / this.width;
		objeto.imagen.scaleY =  115 / this.height;

		//mascara de cantonades arrodonides
		objeto.imagen.mask = new createjs.Shape();
		objeto.imagen.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 115, 115, 4);
		objeto.imagen.mask.x = 0;
	 	objeto.imagen.mask.y = 5;
		
		objeto.contenedor.addChild( objeto.imagen);
	};
	
	if( pregunta.imagen!= "")
		img.src = Motor.IMG + pregunta.imagen;
}
