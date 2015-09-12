function BaseResposta(_index, _width, _height, _radius) {
  
  this.resposta  = null;
  this.index = _index;
  this.width = _width;
  this.height = _height;
  this.radius = _radius;
  this.pregunta = null;
  
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
	this.text.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 16: 14 ;
	this.text.color = "#0D3158";
	this.text.text = this.texte ;
	this.text.x = 8;
	this.text.y = 3 ;
	this.text.lineWidth = 190;
	this.text.lineHeight = 22;
	this.text.mouseEnabled = false;
	this.text.textAlign ="left";
	
	this.contenedor.addChild( this.fons );
	this.contenedor.addChild( this.text );
}


function Pregunta(i, pregunta, numcat, height){
  	this.texte = pregunta;
  	this.index = i;
  	this.id = i;
  	this.contenedor = new createjs.Container();
  	this.contenedor.y = Motor.INITIAL_Y - 10 ;
  	this.contenedor.x =  0;
  	this.respostes = new Array();
  	
  	var respuestas = pregunta.trim().split("[*]");
	var acumWidth = 0;
	this.acumHeight= height;
	// contenedors
	this.contenedors = new Array();
	
  	for(key in respuestas)
	{
		var palabras = respuestas[key].trim().split(" ");
		for( key2 in palabras){
	  		//vamos añadiendo palabra por palabra en cada linea correspondiente
			this.text = new createjs.RichText();	
			this.text.font = (Contenedor.datosXML.plataforma.grado == 1)? "16px Arial" : "15px Arial" ;
			this.text.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 17 : 15;
			this.text.color = "#0D3158";
			this.text.text = palabras[key2] + " ";
			this.text.lineWidth = 880;
			this.text.lineHeight = (Contenedor.datosXML.plataforma.grado == 1)? 36 : 31;
			this.text.mouseEnabled = false;
			
			if( this.text.lineWidth >  acumWidth + this.text.getMeasuredWidth() ){
				// misma linea
				this.text.y = this.acumHeight ;
				this.text.x =  25 + acumWidth ;
				acumWidth += this.text.getMeasuredWidth();
			}else{
				// cambio de linea
				acumWidth = this.text.getMeasuredWidth(); 
				this.text.y = this.acumHeight + ((Contenedor.datosXML.plataforma.grado == 1)? 36 : 31);
				this.text.x = 25  ;
				this.acumHeight +=  (Contenedor.datosXML.plataforma.grado == 1)? 36 : 31;
			}
			this.contenedor.addChild( this.text );
		}
		if( key < respuestas.length - 1 )
		{
			// añadimos el cuadro de texto
			var widthResp = ( Contenedor.datosXML.plataforma.grado == 1 )? Motor.RESP_WIDTH : Motor.RESP_WIDTH-25;
			if( this.text.lineWidth < acumWidth + widthResp +10)
			{
				this.acumHeight += ((Contenedor.datosXML.plataforma.grado == 1)? 36 : 31);
				acumWidth = 0; 
			}
			
			if( Contenedor.datosXML.plataforma.grado == 1 ){
				var inici = new BaseResposta(key,Motor.RESP_WIDTH, Motor.RESP_HEIGHT +5, 5);
			}else{
				var inici = new BaseResposta(key,Motor.RESP_WIDTH-25, Motor.RESP_HEIGHT , 5);
			}
			inici.contenedor.x = acumWidth + 25  ;
	        inici.contenedor.y = this.acumHeight-4;
	        acumWidth += widthResp+10;
	        
			this.contenedor.addChild( inici.contenedor );
			this.contenedors.push( inici );
			inici.pregunta = this;
			//this.respostes.push(inici);
			
		}
	}
	this.currentIndex = 0;
}
Pregunta.prototype.getHeight = function()
{
	return  this.acumHeight;
}
Pregunta.prototype.addElement = function( element, _contenedor, delay ) {
	

	if( _contenedor.resposta == null){
		//this.contenedors[key].categoria = this;
		
		// coordenades del element desti
		var xfi = this.contenedor.x + _contenedor.contenedor.x + 1;
		var yfi = this.contenedor.y + _contenedor.contenedor.y + 1;

		// coloquem l'element origen a la casella de l'element destí
		_contenedor.setReposta(element); 		 
		createjs.Tween.get(element.contenedor).wait(delay).to({x: xfi, y: yfi}, 250, createjs.Ease.circOut);
	
		return true;
	}

	return false;

}
Pregunta.prototype.situar = function(element, _contenedor, delay ) {
	
	
	if( _contenedor.resposta == null){
		//this.contenedors[key].categoria = this;
		
		// coordenades del element desti
		var xfi = this.contenedor.x + _contenedor.contenedor.x + 1;
		var yfi = this.contenedor.y + _contenedor.contenedor.y + 1;

		// coloquem l'element origen a la casella de l'element destí
		_contenedor.setReposta(element); 		 
		element.contenedor.x = xfi;
		element.contenedor.y = yfi;	
	
		return true;
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
	
	/*if( this.currentIndex > 0 )
	{
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
			this.currentIndex--;
			
			for(var i = parseInt(key)+1; i < this.contenedors.length; i++)
			{
				if( this.contenedors[i].resposta != null )
				{
					this.contenedors[i-1].setElement( this.contenedors[i].resposta );
					this.contenedors[i-1].pregunta = this;
					
					this.contenedors[i].resposta = null;
					
					var xfi = this.contenedor.x + this.contenedors[i-1].contenedor.x + 1;
					var yfi = this.contenedor.y + this.contenedors[i-1].contenedor.y + 1;
					
					// coloquem l'element origen a la casella de l'element destí
					if( resituar ) createjs.Tween.get(this.contenedors[i-1].element.contenedor).to({x: xfi, y: yfi}, 150, createjs.Ease.circOut);
				}
			}
		}
	}*/
}


