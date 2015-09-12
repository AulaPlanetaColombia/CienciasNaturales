Motor = new function()
{
	this.fons = "";
	this.inicis = new Array();
	this.finals = new Array();
	this.preguntes = new Array();
	this.respostes = new Array();
	
	this.contenedor = "";

	this.INITIAL_Y = 118;
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
	this.LINE_X = 670;
	this.LINE_Y_MIN = 20;
	this.LINE_Y_MAX = 535;
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
			Motor.datosXML.cantidad = $(xml).find('sonidoaimagen').attr('cantidad');
			
			$(xml).find('cuestion').each(function(index) {
				//debugger;
				this.preg = new pregunta();
				this.preg.imagen = $(this).find('imagen').text();
				this.preg.text = $(this).find('imagen').attr("etiqueta");
				this.preg.id=index;
			  	
			  	this.preg.respuestas = 0;
			  	var dato = this;
			  	$(this).find('respuesta').each(function(index2) {
					//debugger;
					var rest = new respuesta();
					rest.text = $(this).attr('etiqueta');
					rest.id = index2;
					rest.pregunta = dato.preg;
					
					dato.preg.respuestas++;
				  	Motor.datosXML.respuestas.push(rest);
				});
				
				Motor.datosXML.preguntas.push(this.preg);
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
		
		for( index = 0; index < Motor.preguntes.length; index++){
			for(key1 in Motor.preguntes){
				if(Motor.preguntes[key1].id == index){
					for ( key2 in Motor.respostes ) {
						if(Motor.respostes[key2].idPregunta == Motor.preguntes[key1].id)
						{
							if( Motor.respostes[key2].base.pregunta != null)
								estado.push(Motor.respostes[key2].base.pregunta.id);
							else
								estado.push("-1");
						}
					}
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
			
			var counter = 0;
			for(var key in this.estado){
				for(key1 in Motor.preguntes){
					if(Motor.preguntes[key1].id == key){
						for ( key2 in Motor.respostes ) {
							if(Motor.respostes[key2].idPregunta == Motor.preguntes[key1].id)
							{
								//console.log(estado[counter]);
								Motor.contenedor.setChildIndex ( Motor.respostes[key2].contenedor,  Motor.contenedor.getNumChildren () - 1 );
								for(key3 in Motor.preguntes){
									
										if( Motor.preguntes[key3].id == estado[counter] ){
											//console.log("p:"+Motor.preguntes[key3].id );
											Motor.preguntes[key3].situar(  Motor.respostes[key2], 0 );
											//break;
										}
								}		
								counter++;
							}
						}
					}
				}
			}
		}
	}
	
	this.validar = function() {
		var correctes = 0;
		var total =0; 
	  	for(key1 in Motor.preguntes){
	   		for (key2 in Motor.preguntes[key1].contenedors) {
				if( Motor.preguntes[key1].contenedors[key2].resposta == null)
				{
					total++;
				}
				else
				{
					//console.log( Motor.preguntes[key1].idPregunta + " - " + Motor.inicis[key2].resposta.idResposta );
					if( Motor.preguntes[key1].contenedors[key2].resposta.idPregunta  == 
						Motor.preguntes[key1].id)
					{
						correctes++;
						total++;
						Motor.preguntes[key1].contenedors[key2].resposta.correcte();
					
					}
					else
					{
						total++;
						Motor.preguntes[key1].contenedors[key2].resposta.erronia();	
					}
				}
			}
		}
		return correctes.toString() +  "/" + total.toString();
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
		for (var key in Motor.preguntes) 
  		{
  			for(var key1 in Motor.preguntes[key].contenedors)
  			{
  				Motor.preguntes[key].contenedors[key1].resposta = null;
  			}
		}
		
		for (var key0 in Motor.respostes)
		{
			for (var key2 in Motor.preguntes) 
	  		{
				if( Motor.respostes[key0].idPregunta == Motor.preguntes[key2].id )
				{
					Motor.preguntes[key2].addElement( Motor.respostes[key0], 350 * Math.random() + 300)
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
    	this.separator = Utils.dashedLineTo(this.separator, 
				    						this.PREG_X_PADDING + this.LINE_X, 
				    						this.INITIAL_Y + this.LINE_Y_MIN, 
				    						this.PREG_X_PADDING + this.LINE_X, this.LINE_Y_MAX, this.LINE_SIZE );
    	this.contenedor.addChild(this.separator);
    }
    this.drawElements = function()
    {
    	Motor.respostes = new Array();
    	Motor.finals = new Array();

    	Motor.preguntes = new Array();
    	var preguntas = Motor.datosXML.preguntas;
    	var respCounter= 0;
    	//console.log(responses);
    	for(var i=0; i < Motor.datosXML.cantidad; i++)
    	{
    		// creem random o no.
    		var index = 0;
			if(Contenedor.datosXML.sinaleatoriedad == 0 && Scorm.modo != Scorm.MODO_REVISAR && Scorm.modo != Scorm.MODO_REVISARALUMNO )
			{
				index = Math.floor(Math.random()*preguntas.length);

			} 
			
			var preg = preguntas[index];
			preguntas.splice(index,1);
			
			this.pregunta = new Pregunta(i, preg, Motor.datosXML.cantidad);
			Motor.preguntes.push(this.pregunta);
			
			this.contenedor.addChild(this.pregunta.contenedor);

		}

		var numResp = Motor.datosXML.respuestas.length;
		for(var j=0; j < numResp ;j++)
		{
			
			if(Contenedor.datosXML.sinaleatoriedad == 0 && Scorm.modo != Scorm.MODO_REVISAR && Scorm.modo != Scorm.MODO_REVISARALUMNO )
			{
				index = Math.floor(Math.random() * Motor.datosXML.respuestas.length);

			} 
			
			var resposta = Motor.datosXML.respuestas[index];
			Motor.datosXML.respuestas.splice(index,1);
			
    		// creem marc resposta
	    	var finali = new BaseResposta( i.toString()+j.toString() ,this.RESP_WIDTH, this.RESP_HEIGHT , 5);
	        finali.contenedor.x = this.PREG_X_PADDING + this.PREG_FINAL_X_PADDING ;
	        finali.contenedor.y = this.INITIAL_Y + this.RESP_HEIGHT * respCounter + 7 * respCounter + 24  ;
	        // creem caixa resposta
	        var resp = new Resposta(resposta.text, this.RESP_INNER_WIDTH, this.RESP_INNER_HEIGHT, 5) ;
	        resp.contenedor.x = this.PREG_X_PADDING + this.PREG_FINAL_X_PADDING + 1;
	        resp.contenedor.y = this.INITIAL_Y + this.RESP_HEIGHT * respCounter + 7 * respCounter + 25 ;
	        resp.idResposta = i.toString()+j.toString();
	        resp.idPregunta = resposta.pregunta.id ;
			resp.ordre = j;
			 
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
	    		Motor.currentElement = data.element
		    	// capturem punt de click dins la resposta
		    	Motor.itemX = evt.stageX/Main.scale - evt.target.parent.x ;
		    	Motor.itemY = evt.stageY/Main.scale - evt.target.parent.y ;
		    	// coloquem reposta al davant
		    	Motor.contenedor.setChildIndex ( data.resposta.contenedor,  Motor.contenedor.getNumChildren () - 1 );
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
					var pt = Motor.preguntes[key2].fons.globalToLocal( data.resposta.contenedor.x  * Main.scale + 100, data.resposta.contenedor.y * Main.scale + 14 );
		
				    if( Motor.preguntes[key2].fons.hitTest( pt.x, pt.y )){
						trobat = Motor.preguntes[key2].addElement( data.resposta, 0 );
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