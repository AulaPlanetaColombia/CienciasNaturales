function Pagina( pregunta, _numpagina) {
  
    this.numpagina  = _numpagina;
    this.idPregunta = pregunta.id;
	//debugger;
    this.enunciat = new createjs.RichText();
    this.enunciat.text = pregunta.enunciado;
   
    this.imagen = new Imagen(pregunta, true);

    
    this.enunciat.font = (Contenedor.datosXML.plataforma.grado == 1)? "19px Arial" : "17px Arial" ;
	this.enunciat.fontSize =(Contenedor.datosXML.plataforma.grado == 1)? 20 : 18 ;
	this.enunciat.color = "#0D3158";
	this.enunciat.x = 15;
	this.enunciat.y = 10 ;
	this.enunciat.lineWidth = 900;
	this.enunciat.lineHeight = 22;
	this.enunciat.mask = new createjs.Shape();
	this.enunciat.mask.graphics.beginFill("#fff").drawRect(0,0,900, 45);
	this.enunciat.mask.y = 10;
	this.enunciat.mask.x = 15;
	this.enunciat.mouseEnabled = false;
	
	this.explicacion = new createjs.RichText();
    this.explicacion.text = pregunta.explicacion;
    this.explicacion.font = (Contenedor.datosXML.plataforma.grado == 1)? "15px Arial" : "13px Arial" ;
	this.explicacion.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 15 : 13 ;
	this.explicacion.color = "#0D3158";
	this.explicacion.x = 400;
	this.explicacion.y = 350;
	this.explicacion.lineWidth = 500;
	this.explicacion.lineHeight = 22;
	this.explicacion.mask = new createjs.Shape();
	this.explicacion.mask.graphics.beginFill("#fff").drawRect(0,0,500, 88);
	this.explicacion.mask.y = 350;
	this.explicacion.mask.x = 400;
	this.explicacion.mouseEnabled = false;
	this.explicacion.visible = false;
	
	this.validacio = true;
	this.respostes = new Array();
  
    this.contenedor = new createjs.Container();
    this.contenedor.addChild( this.enunciat );
    this.contenedor.addChild( this.imagen.contenedor );
    this.contenedor.addChild( this.explicacion );
    

    var num_respuestas =  pregunta.respuestas.length;
    for(var i=0; i < num_respuestas; i++)
	{
    	var index = 0;
		if(Contenedor.datosXML.sinaleatoriedad == 0 && Scorm.modo != Scorm.MODO_REVISAR && Scorm.modo != Scorm.MODO_REVISARALUMNO )
		{
			index = Math.floor( Math.random()*pregunta.respuestas.length);
		} 
		var resp = pregunta.respuestas[ index ]; 
		pregunta.respuestas.splice(index,1);
		
		var cb = new CheckBox( resp, this, i);
    	cb.contenedor.y = 85 + (280 / num_respuestas) * i;
    	cb.contenedor.x = 400;
    	this.contenedor.addChild(cb.contenedor);
    	
    	this.respostes.push(cb);
    }	

}
Pagina.prototype.explicar= function(){
	this.explicacion.visible= true;
}
function CheckBox(resposta, pagina, index)
{
	this.correcte = resposta.correcte;
	this.checked= false;
	this.repostaUnica = Contenedor.datosXML.respuestaunica;
	this.paginaPare = pagina;
	this.contenedor = new createjs.Container();
	this.id = index;
	this.idResposta = resposta.id;
	//debugger;
	this.texte = new createjs.RichText();
    this.texte.text = resposta.text;
    this.texte.font = (Contenedor.datosXML.plataforma.grado == 1)? "18px Arial" : "16px Arial" ;
	this.texte.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 18 : 16 ;
	this.texte.color = "#0D3158";
	this.texte.x = 45;
	this.texte.y = 2 ;
	this.texte.lineWidth = 480;
	this.texte.lineHeight = 22;
	this.texte.mask = new createjs.Shape();
	this.texte.mask.graphics.beginFill("#fff").drawRect(0,0,480, 45);
	this.texte.mask.y = 2;
	this.texte.mask.x = 45;
	this.texte.mouseEnabled = false;
	
	this.fonsText = new createjs.Shape();
	this.fonsText.graphics.beginFill("#fff").drawRoundRect(0, 0, 480, this.texte.getMeasuredHeight() + 12, 3);
	
	this.marcText = new createjs.Shape();
	this.marcText.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, 480, this.texte.getMeasuredHeight() + 12, 3);
	
	this.areaText = new createjs.Container();
	this.areaText.x = 40;
	this.areaText.y = -3;

	this.areaText.addChild( this.fonsText );
	this.areaText.addChild( this.marcText );
	this.areaText.alpha = 0.01;
	
	this.area = new createjs.Container();
	
	this.fons = new createjs.Shape();
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, 30, 30, 3);
	
	this.marc = new createjs.Shape();
	this.marc.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, 30, 30, 3);
	
	this.ok = new createjs.Bitmap(pppPreloader.from("module", 'motor/images/check_ok.png'));
	this.ko = new createjs.Bitmap(pppPreloader.from("module", 'motor/images/check_ko.png'));
	this.ko.x = 2;
	this.ko.y = 0;
	this.chk = new createjs.Bitmap(pppPreloader.from("module", 'motor/images/check_base.png'));
	this.buit = new createjs.DisplayObject();
	
	this.base = new createjs.Container();
	this.base.x = 5;
	this.base.y = 8;
	
	this.area.addChild( this.fons );
	this.area.addChild( this.marc );
	this.area.addChild( this.base );
	
	this.contenedor.addChild( this.areaText );
	this.contenedor.addChild( this.texte );
	this.contenedor.addChild( this.area );
	
	this.area.on("mousedown", this.pressHandler, this);
	this.areaText.on("mousedown", this.pressHandler, this);
	this.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
	this.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
	//this.desactivar();

}
CheckBox.prototype.pressHandler = function(evt){
	if(evt.primary){
		//deseleccionem en cas de resposta unica
		if(this.repostaUnica == 1)
		{
			for(key in this.paginaPare.respostes)
		    {
		    	if(this.paginaPare.respostes[key].id != this.id)
		    	{
		    		this.paginaPare.respostes[key].base.removeAllChildren();
		    		this.paginaPare.respostes[key].areaText.alpha = 0.01;
		    		this.paginaPare.respostes[key].checked= false;
		    	
		    	}
		    }
		}
		
		//seleccionem o deseleccionem
		if(this.checked) {
			this.base.removeAllChildren();
			this.areaText.alpha = 0.01;
		}
		else 
		{
			this.base.addChild(this.chk);
			this.areaText.alpha = 1;
		}
		
		this.checked = !this.checked;
		
		Contenedor.checkPagina();
	}
	
}
CheckBox.prototype.desactivar = function(){
	this.area.removeAllEventListeners();
	this.areaText.removeAllEventListeners();
	this.contenedor.removeAllEventListeners();
}
CheckBox.prototype.activar = function(){
	if( !this.area.hasEventListener("mousedown") )
	{
	   this.area.on("mousedown", this.pressHandler, this);
	   this.areaText.on("mousedown", this.pressHandler, this);
	   this.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
	   this.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
	}
}

CheckBox.prototype.clear = function(){
	this.base.removeAllChildren();
	//this.areaText.alpha = 0.01;
	this.marc.graphics.clear();
	this.marc.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, 30, 30, 3);
	this.checked= false;
}
CheckBox.prototype.error = function(){
	this.base.removeAllChildren();
	this.base.addChild(this.ko);
	this.marc.graphics.beginStroke("#E1001A").setStrokeStyle(2).drawRoundRect(0, 0, 30, 30, 5);
}

CheckBox.prototype.correct = function(){
	this.base.removeAllChildren();
	this.base.addChild(this.ok);
	this.marc.graphics.beginStroke("#41A62A").setStrokeStyle(2).drawRoundRect(0, 0, 30, 30, 5);
}

function Imagen( pregunta, gran ){	    
	    // get imagen
    this.contenedor = new createjs.Container();

    var img = new Image();
    var objeto = this;
	img.onload = function () {
	   	objeto.imagen = new createjs.Bitmap(this);
	   	
	   	if(gran){
			objeto.imagen.x = 25;
			objeto.imagen.y = 75;
			//escalem imatges
			objeto.imagen.scaleX =  300 / this.width;
			objeto.imagen.scaleY =  300 / this.height;
	
			//mascara de cantonades arrodonides
			objeto.imagen.mask = new createjs.Shape();
			objeto.imagen.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 300,  300 , 10);
			objeto.imagen.mask.x = 25;
		 	objeto.imagen.mask.y = 75;
	 	}
	 	else
	 	{
	 		objeto.imagen.x = 55;
			objeto.imagen.y = -40;
			//escalem imatges
			objeto.imagen.scaleX =  110 / this.width;
			objeto.imagen.scaleY =  110 / this.width;
	
			//mascara de cantonades arrodonides
			objeto.imagen.mask = new createjs.Shape();
			objeto.imagen.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 110, 110, 10);
			objeto.imagen.mask.x = 55;
		 	objeto.imagen.mask.y =-40;
	 	}
		
		objeto.contenedor.addChild( objeto.imagen);

		// boton de ampliacion
		if( pregunta.ampliacion != "")
		{
			objeto.contenedor.addChild( objeto.zoom );
			objeto.imagen.on("click", objeto.zooming, objeto);
			objeto.contenedor.on("mouseover", function(evt){ document.body.style.cursor = 'pointer'; });
			objeto.contenedor.on("mouseout", function(evt){ document.body.style.cursor = 'default'; });
		}
	};
	
	if( pregunta.imagen!= "")
		img.src = Motor.IMG + pregunta.imagen;
	
	// imagen ampliada
	if( pregunta.ampliacion != "" && pregunta.ampliacion != undefined)
	{
	    this.ampliacion = new Ampliacion(pregunta);
	    this.ampliacion.contenedor.x = 0;
		this.ampliacion.contenedor.y = 0;
		this.ampliacion.contenedor.alpha = 0;
		Main.stage.addChild( this.ampliacion.contenedor);
		
		this.zoom = new createjs.Bitmap(pppPreloader.from("module", 'motor/images/ico_zoom.png'));
	    if(gran){
			this.zoom.x = 285;
			this.zoom.y = 335;
		}else{
			this.zoom.x = 135;
			this.zoom.y = 40;
			this.zoom.scaleX =  0.75;
			this.zoom.scaleY =  0.75;
		}
		this.zoom.on("click", this.zooming , this);
	}
}
Imagen.prototype.zooming = function(evt){
	if( evt.primary ){
		Main.stage.setChildIndex ( this.ampliacion.contenedor,  Main.stage.getNumChildren () - 1 );
		this.ampliacion.contenedor.visible = true;
		createjs.Tween.get(this.ampliacion.contenedor).to({alpha:1}, 500, createjs.Ease.circOut);
	}
}

function Ampliacion(pregunta)
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
	img.src = Motor.IMG + pregunta.ampliacion;
		
	
	this.contenedor.on("click", this.tancar);
	this.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
	this.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
}
Ampliacion.prototype.tancar= function(evt){
	if( evt.primary ){
		createjs.Tween.get(this).to({alpha:0}, 500, createjs.Ease.circOut);
	}
}
