//Controls Motor
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
	this.text.y = 5 ;
	this.text.lineWidth = 305;
	this.text.lineHeight = 22;
	this.text.mouseEnabled = false;
	
	this.text.mask = new createjs.Shape();
	this.text.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, this.width-10,  this.height-5, 1);
	this.text.mask.x = 8;
	this.text.mask.y = 3;
	
	this.contenedor.addChild( this.fons );
	this.contenedor.addChild( this.text );
}


function Pregunta(_texte, _width, _height) {
	this.width = _width;
  	this.height = _height;
  	this.texte = _texte;
  	this.index = 0;
  	this.idPregunta = -1;
  	
  	this.fons = new createjs.Shape();	
	this.text = new createjs.RichText();	
	this.contenedor = new createjs.Container();
  	this.dibuixa();
}

Pregunta.prototype.dibuixa = function() {
	this.fons.graphics.beginFill("#fff");
	this.fons = Utils.arrowRect(this.fons, 0, 0, 212, 24);
	
	this.text.font = (Contenedor.datosXML.plataforma.grado == 1)? "16px Arial" : "14px Arial" ;
	this.text.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 16 : 14;
	this.text.color = "#0D3158";
	this.text.text = this.texte ;
	this.text.x = 8;
	this.text.y = 3 ;
	this.text.lineWidth = 195;
	this.text.lineHeight = 22;
	this.text.mouseEnabled = false;
	
	this.text.mask = new createjs.Shape();
	this.text.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 195, 24, 1);
	this.text.mask.x = 8;
	this.text.mask.y = 3;
	
	this.contenedor.addChild( this.fons );
	this.contenedor.addChild( this.text );
}