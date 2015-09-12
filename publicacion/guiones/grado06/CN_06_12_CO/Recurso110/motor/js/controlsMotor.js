function SelectInputBox( index, respuesta)
{

    //console.log(respuesta);
	this.contenedor = new createjs.Container();
//	console.log(index);
	this.id  = index;
	this.correcte = false;
	this.correcta ="";
	this.textCorrecte = "";
	//this.textCorrecte = resposta.text;
	
	this.fonsInput = new createjs.Shape();
	this.fonsInput.graphics.beginFill("#fff").drawRoundRect(0, 0, Motor.RESP_WIDTH, Motor.RESP_HEIGHT +5, 5);
	
	this.marcInput  = new createjs.Shape();
	this.marcInput.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, Motor.RESP_WIDTH, Motor.RESP_HEIGHT+5 , 5);
	
	this.arrow = new createjs.Shape();
	this.arrow.graphics.beginFill("#F8B334").moveTo(Motor.RESP_WIDTH-15, 12).lineTo(Motor.RESP_WIDTH-5, 12).lineTo(Motor.RESP_WIDTH-10, 23).lineTo(Motor.RESP_WIDTH-15, 12);
	
	this.text = new createjs.RichText();	
	this.text.font = (Contenedor.datosXML.plataforma.grado == 1)? "17px Arial" : "15px Arial" ;
	this.text.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 17 : 15 ;
	this.text.color = "#0D3158"; 
	this.text.text = "";
	this.text.x = 5;
	this.text.y = 7;
	this.text.lineWidth = Motor.RESP_WIDTH-5;
	this.text.lineHeight = 22;
	this.text.mouseEnabled = false;
	
	this.areaText = new createjs.Container();
	this.areaText.x = 0;
	this.areaText.y = 0;

	this.areaText.addChild( this.fonsInput );
	this.areaText.addChild( this.marcInput );
	this.areaText.addChild( this.arrow );
	this.areaText.addChild( this.text );
	
	this.contenedor.addChild( this.areaText );
	
	this.contenedor.on("mousedown", this.pressHandler, this);
	this.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
	this.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
	
	this.options = new Options( respuesta.opciones, this );
    this.options.contenedor.x = 0;
	this.options.contenedor.y = 0;
	this.options.contenedor.alpha = 0;
	Main.stage.addChild( this.options.contenedor);
}

SelectInputBox.prototype.pressHandler = function(evt)
{
	if( evt.primary ){
		this.options.situar();
		Main.stage.setChildIndex ( this.options.contenedor,  Main.stage.getNumChildren () - 1 );
		Motor.hideDomObjects();
		createjs.Tween.get(this.options.contenedor).to({alpha:1}, 100, createjs.Ease.circOut);
	}
}
SelectInputBox.prototype.getContenedor = function()
{
	return this.contenedor;
}
SelectInputBox.prototype.desactivar = function()
{
	this.contenedor.removeAllEventListeners();
}
SelectInputBox.prototype.activar = function()
{
	this.contenedor.on("mousedown", this.pressHandler, this);
	this.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
	this.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
}
SelectInputBox.prototype.setText = function(text, correcta){

	this.text.text = text;
	this.text.x = 5 + ( ( Motor.RESP_WIDTH - 15 - this.text.getMeasuredWidth() ) / 2 );
	this.correcta = correcta;
}
SelectInputBox.prototype.clear = function(){

	this.marcInput.graphics.clear();
	this.marcInput.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, Motor.RESP_WIDTH, Motor.RESP_HEIGHT+5 , 5);
}
SelectInputBox.prototype.removeError = function(){

	if(!this.correcte){
		this.marcInput.graphics.clear();
		this.marcInput.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, Motor.RESP_WIDTH, Motor.RESP_HEIGHT+5 , 5);
	}
}

SelectInputBox.prototype.error = function(){

	this.marcInput.graphics.clear();
	this.marcInput.graphics.beginStroke("#E1001A").setStrokeStyle(3).drawRoundRect(0, 0, Motor.RESP_WIDTH, Motor.RESP_HEIGHT +5, 5);
	this.correcte = false;
}

SelectInputBox.prototype.correct = function(){

	this.marcInput.graphics.clear();
	this.marcInput.graphics.beginStroke("#41A62A").setStrokeStyle(3).drawRoundRect(0, 0, Motor.RESP_WIDTH, Motor.RESP_HEIGHT+5 , 5);
	this.correcte = true;
}

function Options(options, select)
{
	this.fons = new createjs.Shape();
	this.fons.graphics.beginFill("#333").drawRoundRect(0, 0, Main.stage_width, Main.stage_height, 5);
	this.fons.alpha = 0.30;
	
	this.contenedor = new createjs.Container();
	this.contenedor.addChild(this.fons);

	this.objecte = new createjs.Container();
	this.marc = new createjs.Shape();
	this.marc.graphics.beginStroke("#F8B334").drawRoundRect(0, 0, Motor.RESP_WIDTH, (Motor.RESP_HEIGHT+5) * options.length , 5);
	
	this.opcions = new Array();
	for( key in options)
	{
	    //console.log(options[key]);
		this.opcio = new Option( options[key].text, options[key].correcta, select);
		this.opcio.contenedor.y = (Motor.RESP_HEIGHT+5) * parseInt(key);
		this.objecte.addChild( this.opcio.contenedor);
		
		if( options[key].correcta == "1" )
			select.textCorrecte = options[key].text;

		this.linea = new createjs.Shape();
		//this.linea.graphics.beginStroke("#F8B334").setStrokeStyle(1).moveTo(1, Motor.RESP_HEIGHT+4).lineTo(Motor.RESP_WIDTH-1, Motor.RESP_HEIGHT+4);
		this.linea.graphics.beginStroke("#F8B334").setStrokeStyle(1).moveTo(1, (key*Motor.RESP_HEIGHT) + (5*key)).lineTo(Motor.RESP_WIDTH-1, (key*Motor.RESP_HEIGHT) + (5*key));
		this.objecte.addChild( this.linea);
		this.opcions.push(this.opcio);
	}
	
	this.objecte.addChild( this.marc);
	this.objecte.mask = new createjs.Shape();
	this.objecte.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, Motor.RESP_WIDTH+2,  ((Motor.RESP_HEIGHT+5) * options.length) + 2, 7);
	
	this.select = select;
	this.contenedor.addChild( this.objecte);

	this.contenedor.on("click", this.tancar);
	this.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
	this.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
}

Options.prototype.situar = function(){
	
	var altura = this.select.contenedor.y + this.select.contenedor.parent.y + Motor.RESP_HEIGHT + 7;
	altura = altura + this.objecte.getBounds().height;
	
	if( Contenedor.missatge.contenedor.y > altura ){
	    this.objecte.y = this.select.contenedor.y + this.select.contenedor.parent.y + Motor.RESP_HEIGHT + 7;
	    this.objecte.mask.y = this.select.contenedor.y + this.select.contenedor.parent.y +Motor.RESP_HEIGHT + 6;
	}else{
	    this.objecte.y = this.select.contenedor.y + this.select.contenedor.parent.y - this.objecte.getBounds().height - 7;
        this.objecte.mask.y = this.select.contenedor.y+ this.select.contenedor.parent.y - this.objecte.getBounds().height - 6;
	}
	//this.objecte.y = this.select.contenedor.y + this.select.contenedor.parent.y +Motor.RESP_HEIGHT + 7;
	
	this.objecte.mask.x = this.select.contenedor.x-1;
	this.objecte.x = this.select.contenedor.x;
}

Options.prototype.tancar= function(evt){
	if( evt.primary ){
		createjs.Tween.get(this).to({alpha:0}, 100, createjs.Ease.circOut).call(function(){ Motor.showDomObjects(); });
	}
}

function Option( text, correcta, select)
{
	this.correcta = correcta;
	this.texte = text;
	this.select = select;
	
	this.text = new createjs.RichText();	
	this.text.font = (Contenedor.datosXML.plataforma.grado == 1)? "17px Arial" : "15px Arial" ;
	this.text.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 17 : 15 ;
	this.text.color = "#0D3158"; 
	this.text.text = text;
	this.text.x = 5 + ( ( Motor.RESP_WIDTH - 5 - this.text.getMeasuredWidth() ) / 2 );
	this.text.y = 7;
	this.text.lineWidth = Motor.RESP_WIDTH-5;
	this.text.lineHeight = 28;
	this.text.mouseEnabled = false;
	
	this.fons = new createjs.Shape();
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, Motor.RESP_WIDTH , Motor.RESP_HEIGHT+5, 0);
	
	this.contenedor = new createjs.Container();
	
	this.contenedor.addChild(this.fons);
	this.contenedor.addChild(this.text);
	
	this.contenedor.on("click", this.triar, this);
	this.contenedor.on("mouseover", this.over, this);
	this.contenedor.on("mouseout", this.out, this);
}
Option.prototype.triar = function(evt){
    
	if( evt==null || evt.primary ){
		this.select.setText( this.text.text, this.correcta );
	}
}
Option.prototype.over = function(evt){
	if( evt.primary ){
		this.text.color = "#EF3301";
	}
}
Option.prototype.out = function(evt){
	if( evt.primary ){
		this.text.color = "#0D3158";
	}
}

function Pregunta(i, pregunta, resps, height){
  	this.texte = pregunta;
  	this.index = i;
  	this.id = i;
  	this.contenedors = new Array();
  	
  	this.contenedor = new createjs.Container();
  	this.contenedor.y = Motor.INITIAL_Y +5 ;
  	this.contenedor.x =  0;
  	this.text = "";
  	
  	var respuestas = pregunta.trim().split("[*]");
	this.acumWidth = 0;
	this.acumHeight= 0;
	//this.numSelect = 0;
	
  	for(key in respuestas)
	{
		this.palabras = respuestas[key].trim().split(" ");
		this.i=0;
		
		//text
		this.text = new createjs.RichText();	
		this.text.font = (Contenedor.datosXML.plataforma.grado == 1)? "17px Arial" : "15px Arial" ;
		this.text.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 17 : 15 ;
		this.text.color = "#0D3158"; 
		this.text.text = "";
		this.text.lineWidth = 850;
		this.text.lineHeight = 28;
		this.text.mouseEnabled = false;
		
		//escrivimos el texto
		this.drawText(height);
		// volvemos a escribir por si a llegado a final de linea
		this.drawText(height);

		//select
		if(key < respuestas.length-1)
		{
			var select = new SelectInputBox(this.i.toString()+key.toString(), resps[Motor.numSelect]);
			
			if( this.text.lineWidth > this.acumWidth + 200 )
			{
				select.contenedor.x = 25 + this.acumWidth;
		        select.contenedor.y = height - 7 + this.acumHeight;
		        this.acumWidth += 210;
		        
	        }else{
	        	this.acumHeight += 38;
	        	select.contenedor.x = 25;
	        	select.contenedor.y = height  - 7 + this.acumHeight;
	        	this.acumWidth = 210;
	        }
	        
			this.contenedor.addChild( select.contenedor );
			this.contenedors.push( select );
			Motor.numSelect ++;
		}

	}
	this.currentIndex = 0;
}
Pregunta.prototype.drawText = function(height){
	if(this.i < this.palabras.length){
		while( this.i < this.palabras.length && this.text.lineWidth > this.acumWidth + this.text.getMeasuredWidth())
		{
			this.text.text += this.palabras[this.i] + " ";
			
			if( this.acumWidth == 0 &&  this.text.getMeasuredWidth() > this.text.lineWidth ) {
				this.text.lineWidth = this.text.getMeasuredWidth();
			}
			
			this.i++;
		}
		
		//console.log(this.text.lineWidth+" vs "+  (this.acumWidth + this.text.getMeasuredWidth()))
		if( this.text.lineWidth > this.acumWidth + this.text.getMeasuredWidth() ){
			this.text.y = height + this.acumHeight;
			this.text.x = 25 + this.acumWidth;
			this.acumWidth += this.text.getMeasuredWidth() + 5; 
			
			this.contenedor.addChild( this.text );
		}else{
			this.text.y = height + this.acumHeight;
			this.text.x = 25+this.acumWidth ;
			this.acumWidth = 0; 
			this.acumHeight += 38;
			
			this.contenedor.addChild( this.text );
			
			this.text = new createjs.RichText();	
			this.text.font = (Contenedor.datosXML.plataforma.grado == 1)? "17px Arial" : "15px Arial" ;
			this.text.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 17: 15 ;
			this.text.color = "#0D3158"; 
			this.text.text = "";
			this.text.lineWidth = 850;
			this.text.lineHeight = 28;
			this.text.mouseEnabled = false;
		
		}
	}
}
Pregunta.prototype.getHeight = function()
{
	return (this.text != "")? this.text.getMeasuredHeight() +this.acumHeight : 0;
}


