//
function Pagina(pregunta, _numpagina) {

	this.numpagina = _numpagina;
	this.nivel = pregunta.nivel;
	this.imagen = pregunta.imagen;
	this.ampliacion = pregunta.ampliacion;
	//debugger;
	var enunciats = Utils.getEnunciats(pregunta.enunciado);
	this.contenedor = new createjs.Container();
	var listEnunciats = new Array();
	//var espaisBlanc = new createjs.RichText();
	//espaisBlanc.text =" ";
	//console.log(enunciats);
	
	var totalW = 900;
	var AcumW = 15;
	var AcumH = 11;
	for( var index in enunciats){
		//console.log(enunciats[index].text);
		this.enunciat = new createjs.RichText();

		this.enunciat.font = "19px Arial";
		this.enunciat.fontSize = 19;
		
		//setejem color segons si es link o no
		if(enunciats[index].tipo == 0) this.enunciat.color = "#0D3158";
		if(enunciats[index].tipo == 1) this.enunciat.color = "#5555FF";
		
		// Setegem un text inicial per colocar el fons del link
		if(enunciats[index].tipo == 0) this.enunciat.text = enunciats[index].text;
		if(enunciats[index].tipo == 1) this.enunciat.text = "{{u}}"+enunciats[index].text+"{{normal}}";
		
		auxAcumW = (this.enunciat.getBounds() != null)? AcumW + this.enunciat.getBounds().width : AcumW;
		if( auxAcumW >= 900 && enunciats.length > 1){
			AcumW = 15;
			AcumH += 22;
		}
		
		this.enunciat.x = AcumW ;
		this.enunciat.y = AcumH ;
		
		AcumW += (this.enunciat.getBounds() != null)? this.enunciat.getBounds().width + 6 : 0;

		//coloquem el fons del link amb els events
		if(enunciats[index].tipo == 1) { 	
        	var fons = new createjs.Shape();
        	fons.graphics.beginFill("#fff").drawRect(this.enunciat.x,this.enunciat.y, this.enunciat.getBounds().width, this.enunciat.getBounds().height);
        	fons.alpha = 0.01;
        	this.contenedor.addChild(fons);
        	
        	fons.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
        	fons.on("mouseout", function(evt){ document.body.style.cursor='default'; });
        	fons.on("click",function(evt, data){ location.href = data.href;}, null, false, {href: enunciats[index].href});
        	
			//this.contenedor.addChild(this.enunciat);
		}
		
		// posem les variables definitives
		this.enunciat.lineWidth = 900;
		this.enunciat.lineHeight = 22;
		this.enunciat.mask = new createjs.Shape();
		this.enunciat.mask.graphics.beginFill("#fff").drawRect(0,0,900, 98);
		this.enunciat.mask.y = 8;
		this.enunciat.mask.x = 15;
		this.enunciat.mouseEnabled = false;

		this.contenedor.addChild(this.enunciat);
		listEnunciats.push(this.enunciat);
	}
	
	
	this.texto = pregunta.texto;

	this.inputText = new TextInputBox(this, pregunta);
    
    if( this.imagen != "" ){
       this.inputText.contenedor.x = 375;
       this.inputText.contenedor.y = 85;
       this.posicionX = 378;
       this.ancho = 495;
       this.imagen = new Imagen(pregunta, true);
   }else if( this.texto != "" ){
       this.inputText.contenedor.x = 375;
       this.inputText.contenedor.y = 85;
       this.posicionX = 378;
       this.ancho = 495;
       this.texto = new Texto(pregunta, true);
    }else{
       this.inputText.contenedor.x = 25;
       this.posicionX = 28;
       this.ancho = 845;
       this.inputText.contenedor.y = 85;
    }

	this.textIntroducido = "";

	

	this.explicacion = new createjs.RichText();
	this.explicacion.text = pregunta.explicacion;
	this.explicacion.font = "18px Arial";
	this.explicacion.fontSize = 18;
	this.explicacion.color = "#0D3158";
	this.explicacion.x = 380;
	this.explicacion.y = 350;
	this.explicacion.lineWidth = 475;
	this.explicacion.lineHeight = 22;
	this.explicacion.visible = false;

	this.respuesta = new createjs.RichText();
	this.respuesta.text = "";
	this.respuesta.font = "18px Arial";
	this.respuesta.fontSize = 18;
	this.respuesta.color = "#0D3158";
	this.respuesta.x = 380;
	this.respuesta.y = 155;
	this.respuesta.lineWidth = 475;
	this.respuesta.lineHeight = 22;
	this.respuesta.visible = false;

	this.validacio = true;
	this.respostes = new Array();

	
	this.contenedor.addChild(this.inputText.contenedor);
	this.contenedor.addChild(this.imagen.contenedor);
	this.contenedor.addChild(this.texto.contenedor);
	this.contenedor.addChild(this.explicacion);
	this.contenedor.addChild(this.respuesta);

}

Pagina.prototype.setPosicion = function(){
    Motor["input1"].element_x = this.posicionX;
    Motor["input1"].element_width = this.ancho; 
}

Pagina.prototype.explicar = function() {
	this.explicacion.visible = true;
}
Pagina.prototype.saveText = function() {
	this.textIntroducido = $(Motor.input1.htmlElement).val();
	
}
Pagina.prototype.drawText = function() {
	var navegadorSplit = Main.navegador.split(' ');
    var mobil = Main.mobil
    var index = navegadorSplit[0].indexOf("Safari");

    if(index > -1 && mobil =="Android"){
    	$(Motor.input1.htmlElement).focus().blur();
    }
	$(Motor.input1.htmlElement).val(this.textIntroducido);

}
function TextInputBox(pagina, pregunta) {
	this.correcte = false;
	this.checked = false;
	this.paginaPare = pagina;
	this.contenedor = new createjs.Container();

    this.pregunta = pregunta;

	this.fonsInput = new createjs.Shape();
	
	if( pregunta.imagen != "" || pregunta.texto != ""){
       this.fonsInput.graphics.beginFill("#fff").drawRoundRect(0, 0, 500, 300, 3);
       this.marcInput = new createjs.Shape();
       this.marcInput.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, 500, 300, 3);
    }else{
       this.fonsInput.graphics.beginFill("#fff").drawRoundRect(0, 0, 850, 300, 3);
       this.marcInput = new createjs.Shape();
       this.marcInput.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, 850, 300, 3);
    }

	this.areaText = new createjs.Container();
	this.areaText.x = 0;
	this.areaText.y = 25;

	this.areaText.addChild(this.fonsInput);
	this.areaText.addChild(this.marcInput);

	this.contenedor.addChild(this.areaText);

}

TextInputBox.prototype.focus = function() {
	this.marcInput.graphics.clear();
	
	if( this.pregunta.imagen != "" ){
       this.marcInput.graphics.beginStroke("#F8B334").setStrokeStyle(3).drawRoundRect(0, 0, 500, 300, 3);
    }else{
       this.marcInput.graphics.beginStroke("#F8B334").setStrokeStyle(3).drawRoundRect(0, 0, 850, 300, 3);
    }
}
TextInputBox.prototype.blur = function() {
	this.marcInput.graphics.clear();
	if( this.pregunta.imagen != "" ){
       this.marcInput.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, 500, 300, 3);
    }else{
       this.marcInput.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, 850, 300, 3);
    }

}

TextInputBox.prototype.clear = function() {
	this.marcInput.graphics.clear();
	if( this.pregunta.imagen != "" ){
       this.marcInput.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, 400, 32, 5);
    }else{
       this.marcInput.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, 750, 32, 5);
    }
}

function Texto(pregunta, gran){
    
    this.contenedor = new createjs.Container();
    this.contenedor.x = 25;
    this.contenedor.y = 110;

    this.fons = new createjs.Shape();
    this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, 325, 300, 10);

    this.texte = new createjs.RichText();
    this.texte.text = pregunta.texto;
    this.texte.font = (Contenedor.datosXML.plataforma.grado == 1)? "17px Arial" : "15px Arial" ;
    this.texte.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 17 : 15 ;
    this.texte.color = "#0D3158";
    this.texte.x = 10;
    this.texte.y = 10;
    this.texte.lineWidth = 300;
    this.texte.lineHeight = 22;
    this.texte.mouseEnabled = false;

    this.texte.mask = new createjs.Shape();
    this.texte.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 305, 263, 0);
    this.texte.mask.x = 10;
    this.texte.mask.y = 10;

    this.contenedor.addChild(this.fons);
    this.contenedor.addChild(this.texte);
    // texto completo ampliado
 
    if( pregunta.texto.length > 450){
        this.ampliacion = new AmpliacionTexto(pregunta);
        this.ampliacion.contenedor.x = 0;
        this.ampliacion.contenedor.y = 0;
        this.ampliacion.contenedor.alpha = 0;
        Main.stage.addChild(this.ampliacion.contenedor);
       
        this.zoom = new createjs.Bitmap(pppPreloader.from("module", 'motor/images/ico_zoom.png'));
        this.zoom.x = 285;
        this.zoom.y = 260;

        this.contenedor.addChild(this.zoom);
        this.contenedor.on("click", this.zooming, this);
        
        this.puntets =  new createjs.RichText();
        this.puntets.text = "...";
        this.puntets.font =  "24px Arial" ;
        this.puntets.color = "#0D3158";
        this.puntets.x = 10;
        this.puntets.y = 262;
        this.contenedor.addChild(this.puntets);
        this.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
        this.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
    }
}

Texto.prototype.zooming = function(evt){
    if( evt.primary ){
        Main.stage.setChildIndex(this.ampliacion.contenedor, Main.stage.getNumChildren() - 1);
        this.ampliacion.contenedor.visible = true;
        createjs.Tween.get(this.ampliacion.contenedor).to({
            alpha : 1
        }, 500, createjs.Ease.circOut);
    }
}

function Imagen(pregunta, gran) {
	// get imagen
	this.contenedor = new createjs.Container();

	var img = new Image();
	var objeto = this;
	img.onload = function() {
		objeto.imagen = new createjs.Bitmap(this);

		if (gran) {
			objeto.imagen.x = 25;
			objeto.imagen.y = 110;
			//escalem imatges
			objeto.imagen.scaleX = 300 / this.width;
			objeto.imagen.scaleY = 300 / this.height;

			//mascara de cantonades arrodonides
			objeto.imagen.mask = new createjs.Shape();
			objeto.imagen.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 300, 300, 10);
			objeto.imagen.mask.x = 25;
			objeto.imagen.mask.y = 110;
			objeto.imagen.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
			objeto.imagen.on("mouseout", function(evt){ document.body.style.cursor='default'; });
		} else {
			objeto.imagen.x = 55;
			objeto.imagen.y = -40;
			//escalem imatges
			objeto.imagen.scaleX = 110 / this.width;
			objeto.imagen.scaleY = 110 / this.width;

			//mascara de cantonades arrodonides
			objeto.imagen.mask = new createjs.Shape();
			objeto.imagen.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 110, 110, 10);
			objeto.imagen.mask.x = 55;
			objeto.imagen.mask.y = -40;
			
			objeto.imagen.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
			objeto.imagen.on("mouseout", function(evt){ document.body.style.cursor='default'; });
		}

		objeto.contenedor.addChild(objeto.imagen);

		// boton de ampliacion
		if (pregunta.ampliacion != "") {
			objeto.contenedor.addChild(objeto.zoom);
			objeto.imagen.on("click", objeto.zooming, objeto);
		}
		
	};

	if (pregunta.imagen != "")
		img.src = Motor.IMG + pregunta.imagen;

	// imagen ampliada
	if (pregunta.ampliacion != "" && pregunta.ampliacion != undefined ) {
		this.ampliacion = new Ampliacion(pregunta);
		this.ampliacion.contenedor.x = 0;
		this.ampliacion.contenedor.y = 0;
		this.ampliacion.contenedor.alpha = 0;

		Main.stage.addChild(this.ampliacion.contenedor);

		this.zoom = new createjs.Bitmap(pppPreloader.from("module", 'motor/images/ico_zoom.png'));
		if (gran) {
			this.zoom.x = 285;
			this.zoom.y = 370;
		} else {
			this.zoom.x = 135;
			this.zoom.y = 70;
			this.zoom.scaleX = 0.75;
			this.zoom.scaleY = 0.75;
		}
		this.zoom.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
		this.zoom.on("mouseout", function(evt){ document.body.style.cursor='default'; });
		this.zoom.on("click", this.zooming, this);

	}
}

Imagen.prototype.zooming = function(evt){
	if( evt.primary ){
		Main.stage.setChildIndex(this.ampliacion.contenedor, Main.stage.getNumChildren() - 1);
		this.ampliacion.contenedor.visible = true;
		Motor.hideDomObjects();
		createjs.Tween.get(this.ampliacion.contenedor).to({
			alpha : 1
		}, 500, createjs.Ease.circOut);
	}
}

function AmpliacionTexto(pregunta) {
    this.fons = new createjs.Shape();
    this.fons.graphics.beginFill("#333").drawRoundRect(0, 0, Main.stage_width, Main.stage_height, 5);
    this.fons.alpha = 0.30;

    this.contenedor = new createjs.Container();
    this.contenedor.addChild(this.fons);

    this.fons = new createjs.Shape();
    this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, 750, 450, 4);
    this.fons.x = 100;
    this.fons.y = 100;

    this.fonsHead = new createjs.Shape();
    this.fonsHead.graphics.beginFill("#0D3158").drawRoundRectComplex(0, 0, 750, 32, 4, 4, 0, 0);
    this.fonsHead.x = 100;
    this.fonsHead.y = 100;
    
    this.texteHead = new createjs.RichText();
    this.texteHead.text = LangRes.lang[ LangRes.TEXTOCOMPLETO ];
    this.texteHead.font = (Contenedor.datosXML.plataforma.grado == 1)? "17px Arial" : "15px Arial" ;
    this.texteHead.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 17 : 15;
    this.texteHead.color = "#fff";
    this.texteHead.x = 115;
    this.texteHead.y = 108;

    this.texte = new createjs.RichText();
    this.texte.text = pregunta.texto;
    this.texte.font = "17px Arial";
    this.texte.fontSize = 17;
    this.texte.color = "#0D3158";
    this.texte.x = 115;
    this.texte.y = 140;
    this.texte.lineWidth = 720;
    this.texte.lineHeight = 22;
    this.texte.mouseEnabled = false;

    this.texte.mask = new createjs.Shape();
    this.texte.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 720, 393, 0);
    this.texte.mask.x = 115;
    this.texte.mask.y = 140;
    
    this.fonsFoot = new createjs.Shape();
    this.fonsFoot.graphics.beginFill("#0D3158").drawRoundRectComplex(0, 0, 750, 15, 0, 0, 0, 0);
    this.fonsFoot.x = 100;
    this.fonsFoot.y = 535;

    this.contenedor.addChild(this.fons);
    this.contenedor.addChild(this.fonsHead);
    this.contenedor.addChild(this.texteHead);
    this.contenedor.addChild(this.texte);
    this.contenedor.addChild(this.fonsFoot);

    this.contenedor.on("click", this.tancar);
    this.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
    this.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
}

function Ampliacion(pregunta) {
	this.fons = new createjs.Shape();
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, Main.stage_width, Main.stage_height, 5);
	this.fons.alpha = 0.60;

	this.contenedor = new createjs.Container();
	this.contenedor.addChild(this.fons);

	var img = new Image();
	var amplia = this;

	this.imagen = "";
	img.onload = function() {

		amplia.imagen = new createjs.Bitmap(this);

		amplia.imagen.scaleX = 500 / this.height;
		amplia.imagen.scaleY = 500 / this.height;

		amplia.imagen.x = (Main.stage_width - (this.width * 500 / this.height)) / 2;
		amplia.imagen.y = 50;

		//mascara de cantonades arrodonides
		amplia.imagen.mask = new createjs.Shape();
		amplia.imagen.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 500, this.height * 500 / this.width, 10);
		amplia.imagen.mask.x = (Main.stage_width - (this.width * 500 / this.height)) / 2;
		amplia.imagen.mask.y = 50;
	

		amplia.contenedor.addChild(amplia.imagen);
	};
	img.src = Motor.IMG + pregunta.ampliacion;

	this.contenedor.on("click", this.tancar);
}

Ampliacion.prototype.tancar = function(evt){
	if( evt.primary ){
		Motor.showDomObjects();
		createjs.Tween.get(this).to({
			alpha : 0
		}, 500, createjs.Ease.circOut);
	}
}

AmpliacionTexto.prototype.tancar = function(evt){
    if( evt.primary ){
        createjs.Tween.get(this).to({
            alpha : 0
        }, 500, createjs.Ease.circOut);
    }
}

function Simbols() {
	this.simbols = new createjs.Bitmap(pppPreloader.from("module", 'motor/images/simbolos.png'));
	this.marcInput = new createjs.Shape();

	this.contenedor = new createjs.Container();

	this.contenedor.addChild(this.simbols);
	this.contenedor.addChild(this.marcInput);

	this.contenedor.on("mouseover", this.over, this);
	this.contenedor.on("mouseout", this.out, this);
	this.contenedor.on("click", this.press, this);
}

Simbols.prototype.over = function() {
	this.marcInput.graphics.beginStroke("#3FA6E0").setStrokeStyle(1).drawRoundRect(0, 1, 32, 32, 3);
}
Simbols.prototype.out = function() {
	this.marcInput.graphics.clear();
}

Simbols.prototype.press = function() {
	if (Motor.finestra.alpha == 0) {
	    $(Motor.inputDOM.htmlElement).css("display", "block");
	    Motor.contenedor.addChild(Motor.finestra);
		Main.stage.setChildIndex(Motor.finestra, Main.stage.getNumChildren() - 1);
		//$("#symbolHtml").blur().focus();
		//createjs.Touch.disable(Main.stage);
		
		createjs.Tween.get(Motor.finestra).to({
			alpha : 1
		}, 200, createjs.Ease.circOut).call(function(){
				$(Motor.inputDOM.htmlElement).css("width",Motor.inputDOM.element_width+1);
				$(Motor.inputDOM.htmlElement).css("height",Motor.inputDOM.element_height+1);
				Main.stage.setChildIndex(Motor.finestra, Main.stage.getNumChildren() - 1);
		 });
	}
	$(Motor.inputDOM.htmlElement).css("display","block");
	$(Motor.inputDOM.htmlElement).css("overflow-y","auto");
}
