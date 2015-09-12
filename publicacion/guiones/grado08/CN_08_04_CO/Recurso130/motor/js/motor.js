 Motor = new function()
{
	this.fons = "";
	this.pagines = new Array();
	this.central = new Array();
	this.cruzadas = new Array();
	this.pistes = new Array();
	this.pistes_definicion = new Array();
	this.palabra ="";
	this.currentLletra = false;
	this.paraules = new Array();

	this.contenedor= ""
	this.down = "";
	this.across = "";
	this.crucigrama = "";
	this.definicionH = "";

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
	this.LINE_X = 576;
	this.LINE_Y_MIN = 25;
	this.LINE_Y_MAX = 420;
	this.LINE_SIZE = 3;
	
	this.itemX= 0;
	this.itemY= 0;
	
	this.separator = ""; 
	
	this.datosXML = "";
	this.solucion = false;
	
	this.video ="";	
	this.currentPag = "";
	this.currentNumPag =0;
	
	this.input_height = 75;
	this.input_width = 275;
	this.fontsize = 18;
	this.inputDOM ="";
	
	this.listening= false;
	this.ready = false;
	this.clickat = false;
	
	this.ponerContenedor = function(contenedorMotor) {
	  //alert("!");
	};
	
	this.cargarDatos = function()
	{
		//escuchar el teclado
		this.keyListen();

		$.get(pppPreloader.from("data", "data/datos.xml" + "?time=" + new Date().getTime()), function (xml) {

			//debugger;
			Motor.datosXML = new datosMotor();
			Motor.datosXML.cruzadas = new Array();
			//Motor.datosXML.cantidad = $(xml).find('test').attr('cantidad');
			
			Motor.datosXML.central.etiqueta = $(xml).find('central').attr('etiqueta');
			Motor.datosXML.central.definicion = $(xml).find('central').text();
			
			$(xml).find('palabra').each(function(index) {
			  
				//debugger;
				this.plb = new palabra();
				//this.preg.explicacion = $(this).children('explicacion').text();
				this.plb.id = index;
				this.plb.etiqueta = $(this).attr('etiqueta');
				this.plb.cortePropio = $(this).attr('cortePropio');
				this.plb.definicion = $(this).text();

				
			  	Motor.datosXML.cruzadas.push(this.plb);

			});
			
			//console.log(Motor.datosXML.cruzadas.length);
	       	Motor.inicializarEstructura();
			Contenedor.crearPaginacio();
			//Motor.recolocarVideo();
		});
	}
	this.inicializarEstructura = function(estado) {
		
	 	this.init();

	};
	this.reinicializarEstructuraMotor = function()
	{
		Main.stage.removeChild(Motor.contenedor);
		Motor.inicializarEstructura();
		
	}
	this.estaCompletado = function(){
		//mirem si estan les creuades completades
	  	for(key1 in Motor.cruzadas)
		{
			for(key2 in Motor.cruzadas[key1].lletres)
			{
				if( Motor.cruzadas[key1].lletres[key2].lletra.text == "" )
				{
					return false;
				}
			}
		}
		// mirem si esta completada la central
		for(key2 in Motor.datosXML.cruzadas){
	  		if( Motor.datosXML.cruzadas[key2].etiqueta == "NO" )
    		{
    			if( Motor.central.lletres[ key2 ].lletra.text =="")
    			{
    				return false;
    			}
    		}
    	}

		return true;
	};
	
	this.getEstado = function(){
		var estado1 = new Array();
		var estado2 = new Array();
		var central ="";
		var paraula ="";
		for( key0 in Motor.central.lletres){
				if( Motor.central.lletres[key0].lletra.text == "")  central += "_";
				else  central += Motor.central.lletres[key0].lletra.text;
		}
		//console.log(central);
		for(key3 in Motor.datosXML.cruzadas){
			paraula = "";
			if( Motor.datosXML.cruzadas[key3].etiqueta != "NO" ){
				for(key1 in Motor.cruzadas){
					if(Motor.datosXML.cruzadas[key3].etiqueta == Motor.cruzadas[key1].etiqueta){
						for(key2 in Motor.cruzadas[key1].lletres){
							if( Motor.datosXML.cruzadas[key3].cortePropio - 1 == key2 ){ // zona de tall entre creuades i central
								paraula += "_" ;
								if(Motor.cruzadas[key1].lletres[key2].lletra.text != ""){  // posem la lletra a la paraula central
									central = Utils.setCharAt(central, parseInt( key3 ), Motor.cruzadas[key1].lletres[key2].lletra.text);
								}
							}else if(Motor.cruzadas[key1].lletres[key2].lletra.text == ""){ // lletra sense omplir
								paraula += "_" ;
							}else{  // lletra omplerta
								paraula += Motor.cruzadas[key1].lletres[key2].lletra.text ;
							}
						}
					}
				}
			}else{
				paraula = "__";
			}
			estado2.push(paraula);
		}
		estado1.push(central);
		
		var estado = estado1.concat(estado2);
		
		return estado.join("|");
	}
	
	this.revisar = function(){
		if(this.estado != "")
		{
			if( this.estado.indexOf("[") >= 0 )
			{
				var datos = this.estado.substring(1, this.estado.length-1).split("][");
				Contenedor.timeRevision = datos[0];
				var estado = datos[1].split("|");
			}else{
				var estado = this.estado.split("|");
			}
			var index = 1;
			for(var key0 in estado){
				// CRUZADAS
				if(key0 != 0 && estado[key0].trim() != "" && estado[key0].trim() != "__"){
					//colocomos cruzadas
					for(key1 in Motor.cruzadas){
						for(key2 in Motor.cruzadas[key1].lletres){
							for(key3 in estado[key0]){
								if(key2 == key3 && key0-index == key1 && estado[key0][key3]!= "_"){
									 Motor.cruzadas[key1].lletres[key2].setLletra( estado[key0][key3]);
								}
							}
						}
					}
				// 	CENTRAL
				}else if( key0 == 0 && estado[key0].trim() != ""){
					//colocamos central sin cruce
					for( key4 in Motor.central.lletres){
						for( key5 in estado[key0] ){
							if( key5 == key4 & estado[key0][key5]!= "_")
							 	Motor.central.lletres[key4].setLletra( estado[key0][key5]);
						}
					}
					//colocamos central con cruce
					for(key6 in Motor.datosXML.cruzadas){
						if( Motor.datosXML.cruzadas[key6].etiqueta != "NO" ){
							for(key7 in Motor.cruzadas){
								if(Motor.datosXML.cruzadas[key6].etiqueta == Motor.cruzadas[key7].etiqueta){
									if( estado[0][key6] != "_" ){
			   							Motor.cruzadas[key7].lletres[ Motor.datosXML.cruzadas[key6].cortePropio - 1 ].setLletra( estado[0][ key6 ]);
			   							break;
			   						}
								}
							}
						}
					}
				}else{
					index++;// fila sin palabra
				} 
			}
		}
	}
	
	this.validar = function() {
		var total = 0;
		var correcteV = true;
	  	for(key1 in Motor.datosXML.cruzadas){
	  		if( Motor.datosXML.cruzadas[key1].etiqueta != "NO" )
    		{
		   		for (key2 in Motor.cruzadas) 
		   		{
		   			//console.log(Motor.datosXML.cruzadas[key1].etiqueta +" == " +Motor.cruzadas[key2].etiqueta);
		   			if(Motor.datosXML.cruzadas[key1].etiqueta == Motor.cruzadas[key2].etiqueta)
		   			{
		   				var correcte = true;
		   				// comprovem lletres paraules creuades
		   				for(key3 in Motor.datosXML.cruzadas[key1].etiqueta)
		   				{
		   					if(Motor.cruzadas[key2].lletres[key3]!= undefined && Motor.cruzadas[key2].lletres[key3].text != ""){
			   					if( Motor.datosXML.cruzadas[key1].etiqueta.toUpperCase()[key3] != Motor.cruzadas[key2].lletres[key3].lletra.text.toUpperCase())
			   					{
			   						correcte = false;
			   						break;
			   					}
		   					}
		   					else{
		   						correcte = false;
		   						break;
		   					}
		   				}
		   				if(correcte) total++;
		   				
		   				//validem paraules creuades completades
		   				for(key4 in Motor.cruzadas[key2].lletres)
		   				{
		   					if( correcte ) Motor.cruzadas[key2].lletres[key4].correct();
		   					else Motor.cruzadas[key2].lletres[key4].error();
		   				}
		   				
		   				// comprovem paraula central
		   				if(	Motor.datosXML.central.etiqueta.toUpperCase()[key1] !=
		   					Motor.cruzadas[key2].lletres[ Motor.datosXML.cruzadas[key1].cortePropio - 1 ].lletra.text.toUpperCase() )
	   					{
	   						correcteV = false;
	   					}
		   			}
				}
			}
			// comprovem paraula central de lletres no creuades
			else if( Motor.datosXML.central.etiqueta.toUpperCase()[key1] !=
				Motor.central.lletres[ key1 ].lletra.text.toUpperCase() )
			{
				correcteV = false;
			}			
		}
		if(correcteV) total++;
		
		//validem paraula central completades
		for(key1 in Motor.datosXML.cruzadas){
	  		if( Motor.datosXML.cruzadas[key1].etiqueta != "NO" ){
		   		for (key2 in Motor.cruzadas) {
		   			if(Motor.datosXML.cruzadas[key1].etiqueta == Motor.cruzadas[key2].etiqueta){
		   				if(correcteV) Motor.cruzadas[key2].lletres[ Motor.datosXML.cruzadas[key1].cortePropio - 1 ].correct();
		   			}
		   		}
		   	}
		   	else{
		   		if(correcteV) Motor.central.lletres[ key1 ].correct();
		   		else Motor.central.lletres[ key1 ].error();		   		
		   	}
		}
		return total.toString() +  "/" + (Motor.cruzadas.length+1).toString();
	};

	this.hideDomObjects = function(){

	}
	this.showDomObjects = function(){

	}
	this.obtenerEstado = function(){

	  //alert("Hola, Soy" + this.primerNombre);
	};
	this.reiniciar = function() {
	  //alert("Estoy caminando!");
	};
	this.activar = function(){
		for(var key1 in Motor.cruzadas)
		{
			for(key2 in Motor.cruzadas[key1].lletres)
			{
				Motor.cruzadas[key1].lletres[key2].activar();
			}
		}
		for(var key1 in Motor.central.lletres){
    			Motor.central.lletres[key1].activar();
    	}
    	for(var key3 in Motor.pistes){
    			Motor.pistes[key3].activar();
    	}
    	
	}
	this.desactivar = function() {
		for(var key1 in Motor.cruzadas)
		{
			for(key2 in Motor.cruzadas[key1].lletres)
			{
				Motor.cruzadas[key1].lletres[key2].desactivar();
			}
		}
		for(var key1 in Motor.central.lletres){
    			Motor.central.lletres[key1].desactivar();
    	}
    	for(var key3 in Motor.pistes){
    			Motor.pistes[key3].desactivar();
    	}

    	this.currentLletra = "";
	};
	this.numPaginas = function(){
		return 1;
	};
	this.ponerPagina = function(pag) {
	    
	};

	this.obtenerPaginaActual = function(pag){

	};
	this.verSolucion = function(conEfecto){
	  
	  	this.deseleccionar();
	  	this.solucionar();
		//this.desactivar();	
		
	};
	this.deseleccionar = function(){

	}
	this.solucionar = function(){
		this.solucion = false;
		for(key1 in Motor.datosXML.cruzadas){
	  		if( Motor.datosXML.cruzadas[key1].etiqueta != "NO" )
    		{
		   		for (key2 in Motor.cruzadas) 
		   		{
		   			//console.log(Motor.datosXML.cruzadas[key1].etiqueta +" == " +Motor.cruzadas[key2].etiqueta);
		   			if(Motor.datosXML.cruzadas[key1].etiqueta == Motor.cruzadas[key2].etiqueta)
		   			{
		   				var correcte = true;
		   				// corregim lletres paraules creuades
		   				for(key3 in Motor.datosXML.cruzadas[key1].etiqueta)
		   				{
		   					if( Motor.cruzadas[key2].lletres[key3]!= undefined && !Motor.cruzadas[key2].lletres[key3].correcte){
		   						Motor.cruzadas[key2].lletres[key3].setCorreccio( Motor.datosXML.cruzadas[key1].etiqueta.toUpperCase()[key3] );
		   					}
		   				}
		   			}
				}
			}
			// corregim paraula central de lletres no creuades
			else
			{
				Motor.central.lletres[ key1 ].setCorreccio( Motor.datosXML.central.etiqueta.toUpperCase()[key1] );
			}			
		}
	  	
	}

	this.obtenerTipoEjercicio = function() {

	};
	this.obtenerVersion = function(){

	};
	
    this.init = function()
    {
		this.contenedor = new createjs.Container();
		
		this.down = new createjs.Container();
		this.across = new createjs.Container();
		this.crucigrama = new createjs.Container();
		
		this.drawDown();
		this.drawAcross();
		this.drawCrucigrama();
			
	    this.contenedor.addChild(this.down );
	    this.contenedor.addChild(this.across );
	    this.contenedor.addChild(this.crucigrama );

		this.contenedor.y = this.INITIAL_Y;
		
	    Main.stage.addChild( this.contenedor );
	    
    }
    this.drawDown = function()
    {
    	var fonsDown = new createjs.Shape();
		fonsDown.graphics.beginFill("#fff").drawRoundRect(0, 0, 284, 184, 5);
		fonsDown.on('mousedown', Motor.blurInput);
		fonsDown.x = 635;
		fonsDown.y = 25;
		
		this.down.addChild(fonsDown);
		
		var titolV = new createjs.RichText();
	    titolV.text = LangRes.lang[ LangRes.VERTICAL ];
	    titolV.font = (Contenedor.datosXML.plataforma.grado == 1)? "Bold 18px Arial" : "Bold 16px Arial" ;
		titolV.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 18 : 16 ;
		titolV.color = "#0D3158";
		titolV.x = 655;
		titolV.y = 45 ;
		titolV.lineWidth = 285;
		titolV.lineHeight = 22;
		titolV.mouseEnabled = false;
		
		this.down.addChild(titolV);
		
		var btnPista = new PistaBox(1, false,"");
		var letraVertical = LangRes.lang[LangRes.VERTICAL][0];
		btnPista.setSimbol(letraVertical);
		btnPista.contenedor.x = 655;
		btnPista.contenedor.y = 72;
		this.down.addChild(btnPista.contenedor);
		
		var definicion = new createjs.RichText();
	    definicion.text = Motor.datosXML.central.definicion;
	    definicion.font = (Contenedor.datosXML.plataforma.grado == 1)? "17px Arial" : "15px Arial" ;
		definicion.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 17 : 15;
		definicion.color = "#0D3158";
		definicion.x = 655;
		definicion.y = 115 ;
		definicion.lineWidth = 250;
		definicion.lineHeight = 22;
		definicion.mouseEnabled = false;
		
		this.down.addChild(definicion);
    }
    this.drawAcross = function()
    {
    	var fonsAcross = new createjs.Shape();
		fonsAcross.graphics.beginFill("#fff").drawRoundRect(0, 0, 284, 194, 5);
		fonsAcross.on('mousedown', Motor.blurInput);
		fonsAcross.x = 635;
		fonsAcross.y = 225;
		
		this.across.addChild(fonsAcross);
		
		var titolH = new createjs.RichText();
	    titolH.text = LangRes.lang[ LangRes.HORIZONTALES ];
	    titolH.font = (Contenedor.datosXML.plataforma.grado == 1)? "Bold 18px Arial" : "Bold 16px Arial" ;
		titolH.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 18: 16 ;
		titolH.color = "#0D3158";
		titolH.x = 655;
		titolH.y = 245 ;
		titolH.lineWidth = 270;
		titolH.lineHeight = 22;
		titolH.mouseEnabled = false;
		
		this.across.addChild(titolH);
		
		this.pistes = new Array();
		this.pistes_definicion = new Array();
		var i = 1;
		for(var key in Motor.datosXML.cruzadas )
		{
			if( Motor.datosXML.cruzadas[key].etiqueta != "NO" )
			{
				var btnPista = new PistaBox(i, true, Motor.datosXML.cruzadas[key].definicion);
				btnPista.setSimbol(i.toString());
				btnPista.contenedor.x = 655 + (i-1) * 27;
				btnPista.contenedor.y = 272;
				
				this.pistes.push(btnPista);
				this.pistes_definicion.push(Motor.datosXML.cruzadas[key].definicion);
				
				this.across.addChild(btnPista.contenedor);
				i++;
			}
		}
		
		this.definicionH = new createjs.RichText();
	    this.definicionH.text = "";//Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum";
	    this.definicionH.font = (Contenedor.datosXML.plataforma.grado == 1)? "17px Arial" : "15px Arial" ;
		this.definicionH.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 17 : 15 ;
		this.definicionH.color = "#0D3158";
		this.definicionH.x = 655;
		this.definicionH.y = 310 ;
		this.definicionH.lineWidth = 250;
		this.definicionH.lineHeight = 22;
		this.definicionH.mouseEnabled = false;

		this.across.addChild(this.definicionH);

    }
    this.drawLine = function()
    {
    	//dibuixem linia descontinua de separació
    	this.separator =  new createjs.Shape();
    	this.separator.graphics.beginStroke("#0D3158").setStrokeStyle(2);
    	this.separator = Utils.dashedLineTo( this.separator, 
				    						 this.PREG_X_PADDING + this.LINE_X, 
				    						 this.LINE_Y_MIN, 
				    						 this.PREG_X_PADDING + this.LINE_X, this.LINE_Y_MAX, this.LINE_SIZE );
    	this.contenedor.addChild(this.separator);
    }
    this.drawCentral = function()
    {
    	var letraVertical = LangRes.lang[LangRes.VERTICAL][0];
    	this.central = new ParaulaItem( letraVertical, Motor.datosXML.central.etiqueta,  0, false);
    	this.central.contenedor.x = 25 + 542/2 - 20;
    	this.central.contenedor.y = (470 - Motor.datosXML.central.etiqueta.length * 28 )/2;    	
    	this.crucigrama.addChild(  this.central.contenedor );
    }
    this.drawCruzadas = function()
    {
    	var i=1;
    	this.paraules = new Array();
    	this.cruzadas = new Array();
    	for(var key in Motor.datosXML.cruzadas )
    	{
    		if( Motor.datosXML.cruzadas[key].etiqueta != "NO" )
    		{
	    		var cruzada = new ParaulaItem( i, Motor.datosXML.cruzadas[key].etiqueta, Motor.datosXML.cruzadas[key].cortePropio, true);
	    		
	    		cruzada.contenedor.x = 25 + 542 / 2 - 20;
    			cruzada.contenedor.y = (470 - Motor.datosXML.central.etiqueta.length * 28 )/2 + 28 * key;
    			
	    		this.cruzadas.push( cruzada );
	    		this.crucigrama.addChild(  cruzada.contenedor );
	    		
	    		i++;
    		}
    	}
    }

	this.blurInput = function(){
		$('#inputar').blur();
	};

    this.drawCrucigrama = function()
    {
    	this.cruzadas = new Array();	
		this.central = new Array();	
		
		var fonsCrucigrama = new createjs.Shape();
		fonsCrucigrama.graphics.beginFill("#fff").drawRoundRect(0, 0, 542, 394, 5);
		fonsCrucigrama.on('mousedown', Motor.blurInput);
		fonsCrucigrama.x = 25;
		fonsCrucigrama.y = 25;
		
		this.crucigrama.addChild(fonsCrucigrama);
		
		this.drawLine();
		
		this.drawCentral();		
		this.drawCruzadas();
		
		this.deleteInputs();
		this.drawInput();
		
		//seleccionem la primera
		//this.pistes[0].pressHandler();
    }
    this.drawInput = function(){
    	
    	var $input = $('<input type="text" id="inputar" name="inputar" class="input" onkeyup="Motor.keyLletraPressed(event);" />');
		$("#mediaHolder").append($input);
		//$('#inputar').css("top", "0");
		
		$('#inputar').change(Motor.inputChange);
	
        $('body').click(Motor.clica);
    }
    this.inputChange = function(e){ 
        //alert(e);
        $('#inputar').focus();  
    }
    this.clica = function(e){
        //alert(Motor.clickat);
        if( Motor.clickat )
            $('#inputar').change();
    }
    this.keyListen = function(){

    	//$(document).keydown(this.keyLletraPressed );

    }
    this.inputFocus = function(input){
    	//eliminem el focus del input seleccionat des del Main
		/*Main.setFocus(false);
    	
    	var id = $(input).attr("id");
    	var info = id.split("_");
    	if(info[1]=="D"){
    		this.central.lletres[info[2]].pressHandler();
    	}else{
    		this.cruzadas[info[1]-1].lletres[info[2]].pressHandler();
    	}*/
    }
    this.keyLletraPressed = function( evt ){
		//if( evt.primary ){
			var indexIE = Main.navegador.split(' ').indexOf("IE");
			var indexCR = Main.navegador.split(' ').indexOf("Chrome");
	        var mobil = Main.mobil;

	        //if( (indexIE > -1 && mobil =="Tablet") || (indexCR > -1 && mobil == "Android") ){
			if(evt.keyCode == 13){
				$('#inputar').blur();
				/*if( $(window.parent.document).find('meta[id=viewport]').length == 0 ){
					$(window.parent.document).find('head').append('<meta id="viewport" name="viewport" content="width=950px, initial-scale=1">');
				}else{
					$(window.parent.document).find('head #viewport').attr('content', 'width=950px, initial-scale=1');
				}*/
				//$(window.parent.document).find('meta[name=viewport]').remove();
				//$(window.parent.document).find('head #viewport').attr('content', 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=10');

			}//else{
				//$(window.parent.document).find('head').append('<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">');
			//}
			var lletra = $('#inputar').val();
			var lletresPossible =  ['a','à','á','ä','â','ã','b','c','ç','d','e','è','é','ë','ê','f','g','h','i','í','ï','ì','î','j','k','l','m','n','ñ','o','ò','ó','ö','ô','p','q','r','s','t','u','ú','ü','ù','û','v','w','x','y','z','·'];
	
			for( var index in lletra)
			{
				var llet = lletra[index];
				if( lletresPossible.indexOf( llet.toLowerCase() ) >= 0 )
				{
					if(Motor.currentLletra) Motor.currentLletra.setLletra( llet );
				}
			}
	
			$('#inputar').val("");
			Motor.clickat = false;

    }
    this.deleteInputs = function()
	{
		$("input").each(function() {
		  $( this ).remove();
		});
	}
}
