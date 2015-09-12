Motor = new function()
{
	this.fons = "";
	this.inicis = new Array();
	this.finals = new Array();
	this.preguntes = new Array();
	this.respostes = new Array();
	
	this.contenedor = "";

	this.INITIAL_Y = 124;
	this.PREG_Y_PADDING = 87;
	this.PREG_X_PADDING = 25;
	
	//inici
	this.PREG_INICI_X_PADDING = 235 ;
	//final
	this.PREG_FINAL_X_PADDING = 690 ;
	
	this.RESP_HEIGHT = 27;
	this.RESP_WIDTH = 202; 
	this.RESP_INNER_HEIGHT = 25;
	this.RESP_INNER_WIDTH = 200; 
	
	//line
	this.LINE_Y = 440;
	this.LINE_X_MIN = 25;
	this.LINE_X_MAX = 925;
	this.LINE_SIZE = 3;
	
	this.itemX= 0;
	this.itemY= 0;
	
	this.separator = ""; 
	
	this.datosXML = "";
	this.solucion = false;
	
	this.IMG = "data/imagenes/";
	this.currentElement = null;
	
	this.ponerContenedor = function(contenedorMotor) {
	  //alert("Estoy caminando!");
	};
	
	this.cargarDatos = function()
	{
		$.get(pppPreloader.from("data", "data/datos.xml" + "?time=" + new Date().getTime()), function (xml) {

			
			Motor.datosXML = new datosMotor();
			Motor.datosXML.cantidad = $(xml).find('textoacategoria').attr('cantidad');	
			Motor.datosXML.pregunta = $(xml).find('pregunta').text(); 

		  	$(xml).find('respuesta').each(function(index) {
				//debugger;
				var resp = new respuesta();
				resp.text = $(this).text();
				resp.orden = $(this).attr('orden');
				resp.id = index;
				
			  	Motor.datosXML.respuestas.push(resp);
			});
			
			//console.log(Motor.datosXML);
	       	Motor.inicializarEstructura();
	       	Contenedor.crearPaginacio();

		});
	}
	this.inicializarEstructura = function(estado) {
		
	 	this.init();
	 	if( this.solucion )
	 	{
	 		this.solucionar();
	 		this.desactivar();	
	 	}

	};
	this.reinicializarEstructuraMotor = function()
	{
		Main.stage.removeChild(Motor.contenedor);
		Motor.cargarDatos();
	}
	this.estaCompletado = function(){
	 	for(key1 in Motor.preguntes){
   			for (key2 in Motor.preguntes[key1].contenedors) {
  				if( Motor.preguntes[key1].contenedors[key2].resposta == null)
				{
					return false;
				}
			}
		}
		return true;
	};
	
	this.getEstado = function(){
		var estado = new Array();
		for(key1 in Motor.preguntes){
	   		for (key2 in Motor.preguntes[key1].contenedors) {
				if( Motor.preguntes[key1].contenedors[key2].resposta == null)
				{
					 estado.push("-1");
				}
				else
				{
					estado.push(Motor.preguntes[key1].contenedors[key2].resposta.idPregunta-1);
				}
			}
		}
		return estado.join(",");
	}
	
	this.revisar = function(){
		if(this.estado != "")
		{
			if( this.estado.indexOf("[")>=0 )
			{
				var datos = this.estado.substring(1, this.estado.length-1).split("][");
				Contenedor.timeRevision = datos[0];
				var estado = datos[1].split(",");
			}else{
				var estado = this.estado.split(",");
			}
			
			for(var key in estado)
			{
				for (var key2 in Motor.respostes ) {
					if(estado[key] == Motor.respostes[key2].idPregunta -1){
						// el id de la pregunta que coincida con el id de pregunta del estado 
						var count =0;
						for(key3 in Motor.preguntes)
						{
							for(key4 in Motor.preguntes[key3].contenedors){
								
								if(count == key)
									Motor.preguntes[key3].situar(  Motor.respostes[key2], Motor.preguntes[key3].contenedors[key4], 0 );
									
								count++;
							}
						}
						
						break;
					}
				}
			}
		}
	}
	
	this.validar = function() {
		var total = 0;
		var index = 0;
	  	for(key1 in Motor.preguntes){
	   		for (key2 in Motor.preguntes[key1].contenedors) {
				if( Motor.preguntes[key1].contenedors[key2].resposta != null)
				{
				
					if( Motor.preguntes[key1].contenedors[key2].resposta.idPregunta  == index+1)
					{
						total++;
						Motor.preguntes[key1].contenedors[key2].resposta.correcte();
					
					}
					else
					{
						Motor.preguntes[key1].contenedors[key2].resposta.erronia();	
					}
				}
				index++;
			}
		}
		return total.toString() +  "/" + index.toString();
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
		for (key in Motor.respostes) {
		 	// activem listeners de comportament de les respostes
	        Motor.respostes[key].contenedor.on("mousedown", Motor.preDragAndDrop, null, false, {resposta: Motor.respostes[key]});
	        Motor.respostes[key].contenedor.on("pressmove", Motor.dragAndDrop, null, false, {resposta: Motor.respostes[key]});
			Motor.respostes[key].contenedor.on("pressup", Motor.dropResposta, null, false, {resposta: Motor.respostes[key]});
			Motor.respostes[key].contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
			Motor.respostes[key].contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
		}
	}
	this.desactivar = function() {
		for (key in Motor.respostes) {
		  	// desactivem listeners de comportament de les respostes
		  	Motor.respostes[key].contenedor.removeAllEventListeners ("mousedown");
		  	Motor.respostes[key].contenedor.removeAllEventListeners ("pressmove");
		  	Motor.respostes[key].contenedor.removeAllEventListeners ("pressup");
		  	Motor.respostes[key].contenedor.removeAllEventListeners("mouseover");
		  	Motor.respostes[key].contenedor.removeAllEventListeners("mouseout");
		  	
		}
	};
	this.numPaginas = function(){
		return 0;
	};
	this.ponerPagina = function(pag) {

	};
	this.obtenerPaginaActual = function(pag){

	};
	this.verSolucion = function(conEfecto){
	  
	  	this.recolocar();
	  	this.solucionar();
		this.desactivar();	
		
	};
	this.recolocar = function(){
		for(key1 in Motor.preguntes){
	   		for (key2 in Motor.preguntes[key1].contenedors) {
				if( Motor.preguntes[key1].contenedors[key2].resposta != null)
				{
					for( key3 in Motor.finals) {
						if(Motor.finals[key3].index == Motor.preguntes[key1].contenedors[key2].resposta.idResposta)
						{
							// tornem l'element origen a la seva posicio inicial
							Motor.preguntes[key1].contenedors[key2].resposta.removeError();
					        createjs.Tween.get(Motor.preguntes[key1].contenedors[key2].resposta.contenedor).to({x:Motor.finals[key3].contenedor.x+1}, 350, createjs.Ease.circOut);
				    		createjs.Tween.get(Motor.preguntes[key1].contenedors[key2].resposta.contenedor).to({y:Motor.finals[key3].contenedor.y+1}, 350, createjs.Ease.circOut);
				    		Motor.preguntes[key1].contenedors[key2].resposta=null;
				    		break;
			
						}
					}
				}
			}
		}
	}
	this.solucionar = function(){
		var total = 0;
		this.solucion = false;
		
		// posem les caixes de categoria amb el index inicial
		for (key in Motor.preguntes) 
  		{
			Motor.preguntes[key].currentIndex = 0;
		}
		
		for (key0 in Motor.respostes)
		{
			var index = 0;
			for (var key1 in Motor.preguntes) 
	  		{
				for (key2 in Motor.preguntes[key1].contenedors) 
		   		{
					if(Motor.respostes[key0].idPregunta-1 == index)
					{
						Motor.preguntes[key1].addElement( Motor.respostes[key0], Motor.preguntes[key1].contenedors[key2], 300 * Math.random() + 350 );
					}
					index++;
				}
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

	    this.drawLine();
	    this.drawElements();
	    
	    Main.stage.addChild( this.contenedor);
    }

    this.drawLine = function()
    {
    	//dibuixem linia descontinua de separació
    	this.separator =  new createjs.Shape();
    	this.separator.graphics.beginStroke("#0D3158").setStrokeStyle(2);
    	this.separator = Utils.dashedLineTo(this.separator,	 this.LINE_X_MIN, this.LINE_Y, this.LINE_X_MAX, this.LINE_Y, this.LINE_SIZE );
    	this.contenedor.addChild(this.separator);
    }
    this.drawElements = function()
    {
    	Motor.respostes = new Array();
    	Motor.finals = new Array();

    	Motor.preguntes = new Array();
    	var preguntas = new Array();
    	var respCounter= 0;

    
		var preguntas = Motor.datosXML.pregunta.split(/[\r\n]+/g);
		var height = 22;

		for(var i = 0; i < preguntas.length  ; i++)
		{
			this.pregunta = new Pregunta(i, preguntas[i],  preguntas.length, height);
			height = this.pregunta.getHeight() + ((Contenedor.datosXML.plataforma.grado == 1)? 36 : 31);

			Motor.preguntes.push(this.pregunta);
			
			this.contenedor.addChild(this.pregunta.contenedor);
		}
		var numRespuestas = Motor.datosXML.respuestas.length;
		for(var j=0; j < numRespuestas; j++)
		{
			var index = 0;
			if(Contenedor.datosXML.sinaleatoriedad != 1 && Scorm.modo != Scorm.MODO_REVISAR && Scorm.modo != Scorm.MODO_REVISARALUMNO )
			{
				index = Math.floor(Math.random()*Motor.datosXML.respuestas.length);

			} 
			
			var preg = Motor.datosXML.respuestas[index];
			Motor.datosXML.respuestas.splice(index,1);
			
    		// creem marc resposta
    		if( Contenedor.datosXML.plataforma.grado == 2 ){
		    	var finali = new BaseResposta( j, this.RESP_WIDTH-25, this.RESP_HEIGHT , 5);
		        finali.contenedor.x = Math.floor(respCounter / 3) * 180 + 25;
		        finali.contenedor.y = (respCounter % 3) * 35 + 450;
	       	}else{
	       		var finali = new BaseResposta( j, this.RESP_WIDTH, this.RESP_HEIGHT+5 , 5);
		        finali.contenedor.x = Math.floor(respCounter / 3) * 225 + 25;
		        finali.contenedor.y = (respCounter % 3) * 35 + 450;
	       	}
	        // creem caixa resposta
	        if( Contenedor.datosXML.plataforma.grado == 2 ){
		        var resp = new Resposta(preg.text, this.RESP_INNER_WIDTH-25, this.RESP_INNER_HEIGHT, 5) ;
		        resp.contenedor.x = Math.floor(respCounter / 3) * 180 + 26;
		        resp.contenedor.y = (respCounter % 3) * 35 + 451;
	        }else{
	        	var resp = new Resposta(preg.text, this.RESP_INNER_WIDTH, this.RESP_INNER_HEIGHT+5, 5) ;
		        resp.contenedor.x = Math.floor(respCounter / 3) * 225 + 26;
		        resp.contenedor.y = (respCounter % 3) * 35 + 451;
	        }
	        resp.idResposta = j;
	        resp.idPregunta = preg.orden;

			//guardem resposta dins marc
	    	finali.setReposta(resp);
	    	Motor.respostes.push(resp);
	    	
	    	//guardem marc i resposta en un array per despres treballar em ells
	    	Motor.finals.push(finali);
	        
	       	this.contenedor.addChild( finali.contenedor );
	       	this.contenedor.addChild( resp.contenedor );

			// activem listeners de comportament de les respostes
	        resp.contenedor.on("mousedown", this.preDragAndDrop, null, false, {resposta:resp});
	        resp.contenedor.on("pressmove", this.dragAndDrop, null, false, {resposta:resp});
			resp.contenedor.on("pressup", this.dropResposta, null, false, {resposta:resp});
			resp.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
			resp.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
			
			respCounter++;
		}
    }
    
    this.preDragAndDrop = function(evt, data)
    {
    	if( evt.primary ){
	    	if(Motor.currentElement == null){
	    		Motor.currentElement = data.element;
		    	// capturem punt de click dins la resposta
		    	Motor.itemX = evt.stageX/Main.scale - evt.target.parent.x ;
		    	Motor.itemY = evt.stageY/Main.scale - evt.target.parent.y ;
		    	// coloquem reposta al davant
		    	Motor.contenedor.setChildIndex ( data.resposta.contenedor,  Motor.contenedor.getNumChildren() - 1 );
		    	//activem color seleccio i sombra de la resposta
		    	data.resposta.lightResponse();
		    	
		    	if(data.resposta.base.pregunta != null)
		    	{
		    		//console.log("data.resposta.base.pregunta");
		    		data.resposta.base.pregunta.removeElement(data.resposta);
		    		//data.element.base.categoria = null;
		    	}
	    	}
    	}
	}
    
    this.dragAndDrop = function(evt,data)
    {
    	if( evt.primary ){
	    	if( Motor.currentElement == data.element){
		    	evt.target.parent.x = evt.stageX/Main.scale - Motor.itemX;
				evt.target.parent.y = evt.stageY/Main.scale - Motor.itemY;
			}
		}
    }
    
    this.dropResposta = function(evt, data)
    {
    	if( evt.primary ){
	    	if(Motor.currentElement == data.element){
		    	// desactivem color seleccio i sombra del origen
		    	data.resposta.unlightResponse();
		    	
		    	var trobat = false;
				for( key2 in Motor.preguntes)
				{
					for(key4 in  Motor.preguntes[key2].contenedors)
					{
						var pt = Motor.preguntes[key2].contenedors[key4].base.globalToLocal( data.resposta.contenedor.x * Main.scale + 100, data.resposta.contenedor.y * Main.scale + 14 );
			
					    if(Motor.preguntes[key2].contenedors[key4].base.hitTest( pt.x, pt.y )){
							trobat = Motor.preguntes[key2].addElement( data.resposta, Motor.preguntes[key2].contenedors[key4], 0 );
							
					    }
				    }
				}
				if( !trobat )  // no ha colisionat amb cap categoria
				{
					for( key3 in Motor.finals) {
						if(Motor.finals[key3].index == data.resposta.idResposta){
							// tornem l'element origen a la seva posicio inicial
					        createjs.Tween.get(data.resposta.contenedor).to({x:Motor.finals[key3].contenedor.x+1}, 350, createjs.Ease.circOut);
				    		createjs.Tween.get(data.resposta.contenedor).to({y:Motor.finals[key3].contenedor.y+1}, 350, createjs.Ease.circOut);
						}
					}
				}
				Motor.currentElement = null;
			}
		}
    }
}