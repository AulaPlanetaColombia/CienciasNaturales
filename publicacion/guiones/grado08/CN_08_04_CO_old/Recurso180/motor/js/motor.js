//
Motor = new function(){
	this.fons = "";
	this.pagines = new Array();
	
	this.contenedor = "";
	
	this.INITIAL_Y = 118;
	this.PREG_Y_PADDING = 87;
	this.PREG_X_PADDING = 25;
	
	//inici
	this.PREG_INICI_X_PADDING = 235 ;
	//final
	this.PREG_FINAL_X_PADDING = 585 ;
	
	this.RESP_HEIGHT = 82;
	this.RESP_WIDTH = 322;
	this.RESP_INNER_HEIGHT = 78;
	this.RESP_INNER_WIDTH = 320;
	
	//line
	this.LINE_X = 570;
	this.LINE_Y_MIN = 20;
	this.LINE_Y_MAX = 535;
	this.LINE_SIZE = 3;

	this.itemX= 0;
	this.itemY= 0;
	
	this.separator = "";
	
	this.datosXML = "";
	this.solucion = false;
	
	this.video ="";
	this.currentPag = "";
	this.currentNumPag =0;
	
	this.inputText ="";
	this.simbol ="";
	this.windowSimbol ="";
	this.CursorPosition = 0;
	
	this.IMG = "data/imagenes/";
	this.familyNames = ["Matemáticos básicos", "Subíndices", "Superíndices", "Matemáticos (otros)", "Alfabeto griego", "Varios", "Fonética (inglés)", "Fonética (otros)"];
	this.symbols = ["√ ∛ ∜ ∝ ∞ ½ ⅓ ⅔ ¼ ¾ ⅕ ⅖ ⅗ ⅘ ⅙ ⅚ ⅛ ⅜ ⅝ ⅞ ⅟", "₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₊ ₋ ₌ ₍ ₎", "⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁺ ⁻ ⁼ ⁽ ⁾ ⁿ", "± − ∓ ∔ ∀ ∁ ∂ ∃ ∄ ∅ ∆ ∇ ∈ ∉ ∊ ∋ ∌ ∍ ∎ ∏ ∐ ∑ ∕ ∖ ∗ ∘ ∙ ∟ ∠ ∡ ∢ ∣ ∤ ∥ ∦ ∧ ∨ ∩ ∪ ∫ ∬ ∭ ∮ ∯ ∰ ∱ ∲ ∳ ∴ ∵ ∶ ∷ ⊕ ⊖ ⊗ ⊘ ⊙ ⊚ ⊛ ⊜ ⊝ ⊞ ⊟ ⊠ ⊡ ⊢ ⊣ ⊤ ⊥ ⊦ ⊧ ⊨ ⊩ ⊪ ⊫ ⊬ ⊭ ⊮ ⊯ ⊰ ⊱ ⊲ ⊳ ⊴ ⊵ ⊶ ⊷ ⊸ ⊹ ⊺ ⊻ ⊼ ⊽ ⊾ ⊿ ⋀ ⋁ ⋂ ⋃ ⋄ ⋅ ⋆ ⋇ ⋈ ⋉ ⋊ ⋋ ⋌ ⋍ ⋎ ⋏ ⋐ ⋑ ⋒ ⋓ ⋔ ⋕ ⋖ ⋗ ⋘ ⋙ ⋚ ⋛ ⋜ ⋝ ⋞ ⋟ ⋠ ⋡ ⋢ ⋣ ⋤ ⋥ ⋦ ⋧ ⋨ ⋩ ⋪ ⋫ ⋬ ⋭ ⋮ ⋯ ⋰ ⋱", "Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω Ϊ Ϋ ά έ ή ί ΰ α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ ς σ τ υ φ χ ψ ω ϊ ϋ ό ύ ώ ϐ ϑ ϒ ϓ ϔ ϕ ϖ Ϛ Ϝ Ϟ Ϡ Ϣ ϣ Ϥ ϥ Ϧ ϧ Ϩ ϩ Ϫ ϫ Ϭ ϭ Ϯ ϯ ϰ ϱ ϲ ϳ ϶", "€ £ ¥ © ® « » - – — ¬ Ê ê Ĉ ĉ ʷ ʸ ˉ µ", "i: \u026A \u028A u: e ə \u025C: \u0254: æ \u028C \u0251: \u0252 \u026Aə e\u026A \u028Aə \u0254\u026A ə\u028A eə a\u026A a\u028A p f t \u03B8 \u02A7 s \u0283 k b v d \u00F0 \u02A4 z ʒ g h m n \u014B r l w j", "Æ Ð ø ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ ɡ ɢ ɣ ɤ ɥ ɦ ɧ ɨ ɩ ɪ ɫ ɬ ɭ ɮ ɯ ɰ ɱ ɲ ɳ ɴ ɵ ɶ ɷ ɸ ɹ ɺ ɻ ɼ ɽ ɾ ɿ ʀ ʁ ʂ ʃ ʄ ʅ ʆ ʇ ʈ ʉ ʊ ʋ ʌ ʍ ʎ ʏ ʐ ʑ ʒ ʓ ʔ ʕ ʖ ʗ ʘ ʙ ʚ ʛ ʜ ʝ ʞ ʟ ʠ ʡ ʢ ʣ ʤ ʥ ʦ ʧ ʨ"];

	this.ponerContenedor = function(contenedorMotor) {
	//alert("Estoy caminando!");
	};
	
	this.cargarDatos = function(){
		//console.log("carga datos");
		$.get(pppPreloader.from("data", "data/datos.xml" + "?time=" + new Date().getTime()), function (xml) {
		
			//debugger;
			Motor.datosXML = new datosMotor();
			Motor.datosXML.cantidad = $(xml).find('preguntas').attr('cantidad');
		
			$(xml).find('pregunta').each(function(index) {
				//debugger;
				this.preg = new pregunta();
				this.preg.explicacion = $(this).children('explicacion').text();
				this.preg.id = index;
				this.preg.enunciado = $(this).children('enunciado').text();
				this.preg.imagen = $(this).children('imagen').text();
				this.preg.ampliacion = $(this).children('ampliacion').text();
				
				this.preg.nivel = $(this).children('nivel').text();
				this.preg.tipo = $(this).children('tipo').text();
				this.preg.texto = $(this).children('texto').text();
				
				Motor.datosXML.preguntas.push(this.preg);
		
			});
			//console.log(Motor.datosXML.preguntas);
			Motor.inicializarEstructura();
			Contenedor.crearPaginacio();
			
			if( Main.navegador == "MSIE 10" ){
				$(".input").css( "background-color", "#fff!important" );
			}
		});
	}
	
	this.inicializarEstructura = function(estado) {
		this.init();
	};
	
	this.reinicializarEstructuraMotor = function(){
		Main.stage.removeChild(Motor.contenedor);
		Motor.deleteInputs();
		Motor.cargarDatos();
	}
	
	this.estaCompletado = function(){
		var total = 0;
		this.currentPag.saveText();
		for(key1 in Motor.pagines){
			var contestada = false;
			if( Motor.pagines[key1].textIntroducido != ""){
			    contestada = true;
			}
			/*for (key2 in Motor.pagines[key1].respostes){
			    //console.log( Motor.pagines[key1].respostes[key2] );
				if( Motor.pagines[key1].respostes[key2].checked ){
				    contestada = true;
				}
			}*/
			if( !contestada ) return false;
		}
		return true;
	};
	
	this.getEstado = function(){
		var estado = new Array();
	    this.currentPag.saveText();
		for( var i=0; i < this.pagines.length ;i++)
		{
			for(key0 in this.pagines)
			{
				if( i == this.pagines[key0].numpagina)
				{
					estado.push(this.pagines[key0].textIntroducido.replace(/\|/gi, "##SEP##"));
				}
			}
		}
		return estado.join("{||}");
	}
	
	this.revisar = function(){
	
		if(this.estado != "")
		{
			if( this.estado.indexOf("[") >= 0 )
			{
				var datos = this.estado.substring(1, this.estado.length-1).split("][");
				Contenedor.timeRevision = datos[0];
				var estado = datos[1].split("{||}");
			}else{
				var estado = this.estado.split("{||}");
			}
			
			for(var key0 in this.pagines)
			{
				for(var key1 in estado)
				{
					if(parseInt(key1) == this.pagines[key0].numpagina)
					{
					this.pagines[key0].textIntroducido = estado[key1].replace(/##SEP##/gi, "|");
					}
				}
			}
			this.currentPag.drawText();
		}
	}
	
	this.validar = function() {
		var total = 0;
		this.currentPag.saveText();
		
		this.simbol.contenedor.alpha = 0.35;
		this.simbol.contenedor.removeAllEventListeners();
		
		return true;
	};
	
	this.hideDomObjects = function(){
		Motor.CursorPosition = $(this.inputDOM.htmlElement)[0].selectionStart;
		this.input1.visible = false;
	}
	this.showDomObjects = function(){
		this.input1.visible = true;
	}
	this.obtenerEstado = function(){
	
	//alert("Hola, Soy" + this.primerNombre);
	};
	this.reiniciar = function() {
		//alert("Estoy caminando!");
	};
	this.activar = function(){
		//$(this.inputDOM.htmlElement).removeAttr('readonly');
	}
	this.desactivar = function(){

		$(this.input1.htmlElement).attr('readonly','readonly');
	
	}
	this.numPaginas = function(){
		return Motor.datosXML.cantidad;
	};
	this.ponerPagina = function(pag) {
		this.currentPag.saveText();
		
		this.contenedor.removeChild( this.currentPag.contenedor );
		this.currentNumPag = pag - 1;
		this.currentPag = this.pagines[this.currentNumPag];
		this.contenedor.addChild( this.currentPag.contenedor );
		
		this.currentPag.setPosicion();
		this.currentPag.drawText();
	};
	
	this.obtenerPaginaActual = function(pag){
	
	};
	this.verSolucion = function(conEfecto){
	
		//this.deseleccionar();
		this.solucionar();
		this.desactivar();
	
	};
	
	this.solucionar = function(){
		var total = 0;
		this.solucion = false;
	
	}
	this.obtenerTipoEjercicio = function() {
	
	};
	this.obtenerVersion = function(){
	
	};
	
	this.init = function()
	{
		this.contenedor = new createjs.Container();
		this.pagines= new Array();
		
		for(var i=0; i < Motor.datosXML.cantidad; i++)
		{
			var index = 0;
			/*if(Contenedor.datosXML.sinaleatoriedad == 0 && Scorm.modo != Scorm.MODO_REVISAR && Scorm.modo != Scorm.MODO_REVISARALUMNO )
			{
				index = Math.floor( Math.random()*Motor.datosXML.preguntas.length);
			}*/
			
			var pregunta = Motor.datosXML.preguntas[index];
			Motor.datosXML.preguntas.splice(index,1);
			
			this.addPagina( pregunta, pregunta.id );
		}
		
		this.contenedor.addChild( this.pagines[0].contenedor );
		this.currentPag = this.pagines[0] ;
		this.currentNumPag = 0;
		
		this.createInput(pregunta);
		this.createSimbols();
		
		this.currentPag.setPosicion();
		
		Main.stage.addChild( this.contenedor );
	}
	
	this.addPagina = function( pregunta, numpagina )
	{
		var pagina = new Pagina( pregunta, numpagina );
		pagina.contenedor.y = this.INITIAL_Y;
		this.pagines.push( pagina );
	
	}
	this.createSimbols = function(){
		this.simbol = new Simbols();
		this.simbol.contenedor.x = 885;
		this.simbol.contenedor.y = 230;
		
		this.contenedor.addChild( this.simbol.contenedor );
		
		this.SimbolsPopup();
	}
	this.createInput = function(pregunta)
	{
		var $input = $('<textarea id="input0" class="input"></textarea>');
		
		$("#mediaHolder").append($input);
		//$input.css("width","275px");
		//$input.css("height","95px");
		this.input1 = new createjs.DOMElementCustom($input.attr("id"), this.contenedor);
		
		if( pregunta.imagen != "" ){
            this.input1.element_x = 380;
            this.input1.element_y = this.INITIAL_Y+117;
            this.input1.element_width = 490;
            this.input1.element_height = 290;
            this.input1.fontsize = 18;
        }else{
            this.input1.element_x = 27;
            this.input1.element_y = this.INITIAL_Y+117;
            this.input1.element_width = 845;
            this.input1.element_height = 290;
            this.input1.fontsize = 18;
        }
		
		
		this.input1.x = this.input1.element_x ;
		this.input1.y = this.input1.element_y ;
		$(this.input1.htmlElement).css("width",this.input1.element_width);
		$(this.input1.htmlElement).css("height",this.input1.element_height );
		
		$(this.input1.htmlElement).focus(function() {
			Motor.currentPag.inputText.focus();
		});
		$(this.input1.htmlElement).blur(function() {
			Motor.currentPag.inputText.blur();
		});
		$(this.input1.htmlElement).keydown(function() {
			//console.log($(this).attr('readonly'));
			if( $(this).attr('readonly') != "readonly"){
				var $this = $(this);
				Motor.CursorPosition = $this[0].selectionStart+1;
				Contenedor.checkPagina();
			}
		});
		$(this.input1.htmlElement).click(function() {
			if( $(this).attr('readonly') != "readonly"){
				var $this = $(this);
				Motor.CursorPosition = $this[0].selectionStart+1;
				Contenedor.checkPagina();
			}
		});
		this.contenedor.addChild( this.input1 );
		
		var index = Main.navegador.split(' ')[0].indexOf("IE");
	    var mobil = Main.mobil;
		if(index > -1 && mobil =="Tablet"){
	       $input.focusout(function(event){ $("body").focus(); });
	       $(this.input1.htmlElement).click(Motor.select);
	    }

	}
	this.select = function(){
		$(this).blur().focus();
	}
	this.clickSimbol = function(simb){
		var value = $(this.input1.htmlElement).val();
		value = value.substring(0,  Motor.CursorPosition) + simb + value.substring( Motor.CursorPosition + 1, value.length) ;
		$(this.input1.htmlElement).val(value);
	}
	this.deleteInputs = function()
	{
		$( "textarea" ).each(function() {
			$( this ).remove();
		});
	}
	this.InsertSymbol = function(Symboltext,SymbolNumber){

		var symbolstxt = Motor.symbols[Symboltext].split(" ");
		var symbolt=  symbolstxt[SymbolNumber];					
		
		Motor.clickSimbol(symbolt);
		Motor.CursorPosition++;
		$(Motor.inputDOM.htmlElement)[0].selectionStart = Motor.CursorPosition;
		Motor.tancaro();
	}
	this.SimbolsPopup = function() {
	
		this.familyNames = ["Matemáticos básicos", "Subíndices", "Superíndices", "Matemáticos (otros)", "Alfabeto griego", "Varios", "Fonética (inglés)", "Fonética (otros)"];
		this.symbols = ["√ ∛ ∜ ∝ ∞ ½ ⅓ ⅔ ¼ ¾ ⅕ ⅖ ⅗ ⅘ ⅙ ⅚ ⅛ ⅜ ⅝ ⅞ ⅟", "₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₊ ₋ ₌ ₍ ₎", "⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁺ ⁻ ⁼ ⁽ ⁾ ⁿ", "± − ∓ ∔ ∀ ∁ ∂ ∃ ∄ ∅ ∆ ∇ ∈ ∉ ∊ ∋ ∌ ∍ ∎ ∏ ∐ ∑ ∕ ∖ ∗ ∘ ∙ ∟ ∠ ∡ ∢ ∣ ∤ ∥ ∦ ∧ ∨ ∩ ∪ ∫ ∬ ∭ ∮ ∯ ∰ ∱ ∲ ∳ ∴ ∵ ∶ ∷ ⊕ ⊖ ⊗ ⊘ ⊙ ⊚ ⊛ ⊜ ⊝ ⊞ ⊟ ⊠ ⊡ ⊢ ⊣ ⊤ ⊥ ⊦ ⊧ ⊨ ⊩ ⊪ ⊫ ⊬ ⊭ ⊮ ⊯ ⊰ ⊱ ⊲ ⊳ ⊴ ⊵ ⊶ ⊷ ⊸ ⊹ ⊺ ⊻ ⊼ ⊽ ⊾ ⊿ ⋀ ⋁ ⋂ ⋃ ⋄ ⋅ ⋆ ⋇ ⋈ ⋉ ⋊ ⋋ ⋌ ⋍ ⋎ ⋏ ⋐ ⋑ ⋒ ⋓ ⋔ ⋕ ⋖ ⋗ ⋘ ⋙ ⋚ ⋛ ⋜ ⋝ ⋞ ⋟ ⋠ ⋡ ⋢ ⋣ ⋤ ⋥ ⋦ ⋧ ⋨ ⋩ ⋪ ⋫ ⋬ ⋭ ⋮ ⋯ ⋰ ⋱", "Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω Ϊ Ϋ ά έ ή ί ΰ α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ ς σ τ υ φ χ ψ ω ϊ ϋ ό ύ ώ ϐ ϑ ϒ ϓ ϔ ϕ ϖ Ϛ Ϝ Ϟ Ϡ Ϣ ϣ Ϥ ϥ Ϧ ϧ Ϩ ϩ Ϫ ϫ Ϭ ϭ Ϯ ϯ ϰ ϱ ϲ ϳ ϶", "€ £ ¥ © ® « » - – — ¬ Ê ê Ĉ ĉ ʷ ʸ ˉ µ", "i: \u026A \u028A u: e ə \u025C: \u0254: æ \u028C \u0251: \u0252 \u026Aə e\u026A \u028Aə \u0254\u026A ə\u028A eə a\u026A a\u028A p f t \u03B8 \u02A7 s \u0283 k b v d \u00F0 \u02A4 z ʒ g h m n \u014B r l w j", "Æ Ð ø ɐ ɑ ɒ ɓ ɔ ɕ ɖ ɗ ɘ ə ɚ ɛ ɜ ɝ ɞ ɟ ɠ ɡ ɢ ɣ ɤ ɥ ɦ ɧ ɨ ɩ ɪ ɫ ɬ ɭ ɮ ɯ ɰ ɱ ɲ ɳ ɴ ɵ ɶ ɷ ɸ ɹ ɺ ɻ ɼ ɽ ɾ ɿ ʀ ʁ ʂ ʃ ʄ ʅ ʆ ʇ ʈ ʉ ʊ ʋ ʌ ʍ ʎ ʏ ʐ ʑ ʒ ʓ ʔ ʕ ʖ ʗ ʘ ʙ ʚ ʛ ʜ ʝ ʞ ʟ ʠ ʡ ʢ ʣ ʤ ʥ ʦ ʧ ʨ"];
		
		this.tancar = new createjs.Bitmap(pppPreloader.from("module", 'motor/images/wtancar.png'));
		this.tancar.x = 670;
		this.tancar.y = 5;
	
		this.fons = new createjs.Shape();
		this.fons.graphics.beginFill("#d2ccf3").drawRoundRect(0,0, 700, 450, 2);
		
		this.titol = new createjs.RichText();
		this.titol.text = "INSERTAR SÍMBOLO";
		this.titol.font = "bold 12px arial";
		this.titol.fontSize = 14;
		this.titol.color = "#000";
		this.titol.x = 15;
		this.titol.y = 6;
		this.titol.lineWidth = 575;
	
		this.finestra = new createjs.Container();
		this.finestra.addChild(this.fons);
		this.finestra.addChild(this.titol);
		this.finestra.addChild(this.tancar);
		
		this.inputDOM = new createjs.DOMElementCustom('symbolHtml', this.finestra);
		
		this.inputDOM.element_x = 5;
		this.inputDOM.element_y = 27;
		this.inputDOM.element_width = 680;
		this.inputDOM.element_height = 389;
		this.inputDOM.grandParent = this.contenedor;
	
		this.inputDOM.x = this.inputDOM.element_x ;
		this.inputDOM.y = this.inputDOM.element_y ;
		$(this.inputDOM.htmlElement).css("width",this.inputDOM.element_width);
		$(this.inputDOM.htmlElement).css("height",this.inputDOM.element_height );
		//console.log($(this.inputDOM.htmlElement));
		
		this.finestra.addChild( this.inputDOM );

		
		this.finestra.addChild(this.fons);
		this.finestra.addChild(this.titol);
		this.finestra.addChild(this.tancar);
		this.finestra.alpha = 0;
		//$(this.inputDOM.htmlElement).css("display", "block");
	
		this.tancar.on("mousedown", this.tancaro, this);
		
		this.finestra.x = 125;
		this.finestra.y = 75;
		this.contenedor.addChild(this.finestra);
	}

	this.tancaro = function() {
		if (this.contenedor.alpha == 1) {
			Motor.showDomObjects();
			createjs.Tween.get(this.finestra).to({
				alpha : 0
			}, 200);
		}
		//Main.windowResize();
		this.contenedor.removeChild(this.finestra);
		$(this.inputDOM.htmlElement).css("display","none");
		$(this.inputDOM.htmlElement).css("overflow-y","hidden");
	}
}
