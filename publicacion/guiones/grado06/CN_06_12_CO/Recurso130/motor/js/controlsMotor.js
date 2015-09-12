function Pagina( pregunta, _numpagina) {
  
    this.numpagina  = _numpagina;
	//debugger;
    this.enunciat = new createjs.RichText();
    this.enunciat.text = pregunta.enunciado;
    this.video = pregunta.video;
    this.salto = (pregunta.salto != "" )? pregunta.salto/25: 0;
    
    this.enunciat.font = (Contenedor.datosXML.plataforma.grado == 1)? "19px Arial" : "17px Arial" ;
	this.enunciat.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 19 : 17 ;
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
	
	this.idPregunta = pregunta.id;
	
	this.validacio = true;
	this.respostes = new Array();
	
	this.explicacion = new createjs.RichText();
	this.explicacion.text = pregunta.explicacion;
	this.explicacion.font = (Contenedor.datosXML.plataforma.grado == 1)? "15px Arial" : "13px Arial" ;
	this.explicacion.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 15 : 13 ;
	this.explicacion.color = "#0D3158";
	this.explicacion.x = 400;
	this.explicacion.y = 355;
	this.explicacion.lineWidth = 500;
	this.explicacion.lineHeight = 21;
	this.explicacion.mask = new createjs.Shape();
	this.explicacion.mask.graphics.beginFill("#fff").drawRect(0,0,500, 88);
	this.explicacion.mask.y = 355;
	this.explicacion.mask.x = 400;
	this.explicacion.mouseEnabled = false;
	this.explicacion.visible = false;
	
  
    this.contenedor = new createjs.Container();
    this.contenedor.addChild( this.enunciat );
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
    	cb.contenedor.y = 90 + (280 / num_respuestas) * i;
    	cb.contenedor.x = 400;
    	this.contenedor.addChild(cb.contenedor);
    	
    	this.respostes.push(cb);
    }	

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
    this.texte.font = (Contenedor.datosXML.plataforma.grado == 1)? "21px Arial" : "18px Arial" ;
	this.texte.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 21 : 18 ;
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
	this.chk = new createjs.Bitmap("motor/images/check_base.png");
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
