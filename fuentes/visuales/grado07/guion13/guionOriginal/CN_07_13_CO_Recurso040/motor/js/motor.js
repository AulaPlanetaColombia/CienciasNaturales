Motor = new function()
{
	this.fons = "";
	this.contenedores = new Array();
	this.elementos = new Array();
	this.categorias = new Array();
	this.audios = new Array();
	
	this.contenedor = "";

	//this.INITIAL_Y = 118;
	this.INITIAL_Y = 105;
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
	this.ini = false;
	this.fi = false;
	this.titolIni = "";
	this.titolFi = "";
	this.idRespuesta = 0;
	this.currentElement = null;
	
	this.ponerContenedor = function(contenedorMotor) {
	  //alert("Estoy caminando!");
	};
	
	this.cargarDatos = function()
	{
		Motor.idRespuesta = 0;
		$.get(pppPreloader.from("data", "data/datos.xml" + "?time=" + new Date().getTime()), function (xml) {

			Motor.datosXML = new datosMotor();
			Motor.datosXML.enunciado = $(xml).find('enunciado').text();
			Motor.datosXML.cantidad = $(xml).find('textoacategoria').attr("cantidad");
			
			$(xml).find('cuestion').each(function(index) {
				//debugger;
				
				var cuestion = new cuestiona();
				
				cuestion.categoria = $(this).children('categoria').text();
				cuestion.sonido = $(this).children('sonido').text();
				cuestion.id = index;
				
				$(this).find('respuesta').each(function(index2) {
					
					var resp = new respuesta();
					resp.texte = $(this).text();
					resp.id = index.toString() + index2.toString();
					resp.categoria = cuestion.id;
					resp.idElement = Motor.idRespuesta;
					cuestion.respuestas.push(resp);

					Motor.datosXML.elementos.push(resp);
					Motor.idRespuesta++;
				});
			  	Motor.datosXML.cuestiones.push(cuestion);
			});

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
	  	for( key1 in Motor.categorias )
		{
			var count = 0;
			for( key2 in Motor.categorias[key1].contenedors )
			{
				// si element posicionat a la categoria i no evaluat com a correcte
				if( Motor.categorias[key1].contenedors[key2].element == null )
				{
					count++;
				}
			}
			if(count >3 ) return false;
		}
		return true;
	};
	
	this.getEstado = function(){
		var estado = new Array();

		for( index = 0; index < Motor.elementos.length; index++){
			for(key1 in Motor.elementos){
				if(Motor.elementos[key1].ordre == index){
					if( Motor.elementos[key1].base.categoria != null)
						estado.push(Motor.elementos[key1].base.categoria.id);
					else
						estado.push("-1");
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
			for(var key in estado){
			    if(estado[key] != ""){
    				for(key1 in Motor.elementos){
    					if(Motor.elementos[key1].ordre == key){
    						//console.log(key);
    						for ( key2 in Motor.categorias ) {
    							//console.log(Motor.elementos[key2].categoria);
    							if(estado[key] == Motor.categorias[key2].id)
    							{
    								//console.log(estado[counter]);
    								Motor.contenedor.setChildIndex ( Motor.elementos[key1].contenedor,  Motor.contenedor.getNumChildren () - 1 );
    								Motor.categorias[key2].situar(  Motor.elementos[key1], 0 );
    							}
    						}
    					}
    				}
    			}
			}
		}
	}
	
	this.validar = function() {
		var total = 0;
		
		for(var key2 in Motor.categorias){
		  for(var key4 in Motor.categorias[key2].contenedors){
		      if( Motor.categorias[key2].contenedors[key4].element != null ){
		          if( Motor.categorias[key2].contenedors[key4].element.categoria == Motor.categorias[key2].contenedors[key4].categoria.id){
		              Motor.categorias[key2].contenedors[key4].element.correcte();
                      total++;
		          }else{
		              Motor.categorias[key2].contenedors[key4].element.erronia(); 
		          }   
		      }
		  }
		}
		
		
	  	/*for (key1 in Motor.datosXML.cuestiones) 
	  	{
	  		for(key2 in Motor.categorias)
	  		{
	  			if( Motor.datosXML.cuestiones[key1].id == Motor.categorias[key2].id)
	  			{
		  			for(key3 in Motor.datosXML.cuestiones[key1].respuestas)
		  			{
		  				for(key4 in Motor.categorias[key2].contenedors)
		  				{
		  					// si element posicionat a la categoria i no evaluat com a correcte
		  					if(Motor.categorias[key2].contenedors[key4].element != null && Motor.categorias[key2].contenedors[key4].element.error)
		  					{
		  						// si tenen el mateix id de resposta dins de la mateixa categoria
								if(Motor.datosXML.cuestiones[key1].respuestas[key3].id == Motor.categorias[key2].contenedors[key4].element.id)
								{
									Motor.categorias[key2].contenedors[key4].element.correcte();
									total++;
									//break;
								}else{
								    Motor.categorias[key2].contenedors[key4].element.erronia();
								}
								
							}
								
						}
					}
				}
  			}
		}*/
		

		return total.toString() +  "/" + Motor.contenedores.length.toString();
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
		for (key in Motor.elementos) {
		 	// activem listeners de comportament de les respostes
	        Motor.elementos[key].contenedor.on("mousedown", Motor.preDragAndDrop, null, false, {element: Motor.elementos[key]});
	        Motor.elementos[key].contenedor.on("pressmove", Motor.dragAndDrop, null, false, {element: Motor.elementos[key]});
			Motor.elementos[key].contenedor.on("pressup", Motor.dropElement, null, false, {element: Motor.elementos[key]});
			Motor.elementos[key].contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
			Motor.elementos[key].contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
		}
	}
	this.desactivar = function() {
		for (key in Motor.elementos) {
		  	// desactivem listeners de comportament de les respostes
		  	Motor.elementos[key].contenedor.removeAllEventListeners ("mousedown");
		  	Motor.elementos[key].contenedor.removeAllEventListeners ("pressmove");
		  	Motor.elementos[key].contenedor.removeAllEventListeners ("pressup");
		  	Motor.elementos[key].contenedor.removeAllEventListeners("mouseover");
		  	Motor.elementos[key].contenedor.removeAllEventListeners("mouseout");
		}
		
		for( key1 in  Motor.audios){
            if ( !Motor.audios[key1].bt.paused ){
                $('#audio' + Motor.audios[key1].index)[0].pause(); 
                $('#audio'+ Motor.audios[key1].index)[0].currentTime = 0;
                Motor.audios[key1].bt.gotoAndStop("normal");
            }
        }
		
		
	};
	this.numPaginas = function(){
		return 1;
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
		
	}
	this.solucionar = function(){
		var total = 0;
		this.solucion = false;
		
		// posem les caixes de categoria amb el index inicial
		for (var key in Motor.categorias) 
  		{
  			for(var key3 in Motor.categorias[key].contenedors)
  			{
  				Motor.categorias[key].contenedors[key3].element = null;
  			}
		}
		
		for(var key0 in Motor.elementos)
		{
			// borrem marc d'error i coloquem les respostes a la posicio inicial
			for (var key1 in Motor.contenedores) {
				if( Motor.contenedores[key1].index == Motor.elementos[key0].idElement )
				{
					Motor.elementos[key0].removeError();
					createjs.Tween.get( Motor.elementos[key0].contenedor ).to({ x: Motor.contenedores[key1].contenedor.x + 1 }, 250, createjs.Ease.circOut);
		    		createjs.Tween.get( Motor.elementos[key0].contenedor ).to({ y: Motor.contenedores[key1].contenedor.y + 1 }, 250, createjs.Ease.circOut);
				}
			}
			
			//posicionem les respostes a la categoria que li toca
			for (var key2 in Motor.categorias) 
	  		{
				if( Motor.elementos[key0].categoria == Motor.categorias[key2].id )
				{
					Motor.categorias[key2].addElement( Motor.elementos[key0], 350 * Math.random() + 300)
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
		
		this.deleteAudios();
		this.creaAudios();
		this.drawCategories();
	    this.drawSeparador();
	    this.drawContenedores();
	    this.drawElementos();
	    
	    Main.stage.addChild( this.contenedor);
	    
    }
    this.creaAudios = function(){
    	this.audios = new Array();	
		for(key in  Motor.datosXML.cuestiones)
    	{
    		if( Motor.datosXML.cuestiones[key].sonido != "" ){
    			if(Main.navegador == "MSIE 9"){
		        	$('<audio id="audio'+ Motor.datosXML.cuestiones[key].id+'"  src="data/sonidos/'+ Motor.datosXML.cuestiones[key].sonido+'" ></audio>')
		        	.appendTo($("#mediaHolder"));
				}else{
			    	$('<audio id="audio'+ Motor.datosXML.cuestiones[key].id+'" preload="auto"></audio>')
		        	.append('<source src="data/sonidos/'+ Motor.datosXML.cuestiones[key].sonido+'" type="audio/mpeg" />')
		        	.appendTo($("#mediaHolder"));
		        }
		    }
	        
	        //this.audios.push();
       }
    }
    this.deleteAudios = function()
	{
		$( "audio" ).each(function() {
		  $( this ).remove();
		});
	}
    this.drawCategories = function()
    {
		Motor.categorias = new Array();
    	var numCuestiones = Motor.datosXML.cuestiones.length;
    	var cuestiones = new Array();
    	
    	var numFilas;
        if( Contenedor.datosXML.plataforma.grado == 1 ){
            numFilas = 4;
        }else{
            numFilas = 5;
        }
    	
    	// dibuixem marcs de cabuda de resposta
    	
    	var ancho = (Main.stage_width - 50) - (numCuestiones*230);
    	    	
    	for(var i=0; i < numCuestiones; i++)
    	{
    		var index = 0;
    		if(Contenedor.datosXML.sinaleatoriedad == 0 && Scorm.modo != Scorm.MODO_REVISAR && Scorm.modo != Scorm.MODO_REVISARALUMNO )
			{
				index = Math.floor(Math.random()*Motor.datosXML.cuestiones.length);
			}
		
			var cuestion = Motor.datosXML.cuestiones[index];
			Motor.datosXML.cuestiones.splice(index,1);
			cuestiones.push(cuestion);
			
			//console.log(Contenedor.datosXML.plataforma.grado)
			
			
    		var cat = new Categoria(index, cuestion, numCuestiones, numFilas);
	        //cat.contenedor.x = 25 + i * 230 ;
	        
	        if( numCuestiones > 1 ){
               cat.contenedor.x = 25 + (ancho/(numCuestiones - 1)*i) + (i * 230);
            }else{
                cat.contenedor.x = 350;
            }
	        
	        
	        cat.contenedor.y = this.INITIAL_Y + 25 ; 

	        this.contenedor.addChild( cat.contenedor );
	        //guardem marc inicial en un array per despres treballar em ells
	        Motor.categorias.push(cat);
    	}
    	Motor.datosXML.cuestiones = cuestiones;
    }
    this.drawSeparador = function()
    {   
		//dibuixem linia descontinua de separació.
    	this.separator =  new createjs.Shape();
    	this.separator.graphics.beginStroke("#0D3158").setStrokeStyle(2);
    	//this.separator = Utils.dashedLineTo(this.separator, 25, 380, 925, 380, 3);
    	this.separator = Utils.dashedLineTo(this.separator, 25, 360, 925, 360, 3);
    	this.contenedor.addChild(this.separator);
    	
    }
    this.drawContenedores = function()
    {
    	Motor.contenedores = new Array();
    	var numCuestiones = Motor.datosXML.cuestiones.length;
    	var posX = 0;
        var posY = 0;
    	// dibuixem marcs inicials de cabuda de resposta
    	
    	var ancho;
    	var distancia;
        if( Contenedor.datosXML.plataforma.grado == 1 ){
            ancho = 34;
            distancia = 40;
        }else{
            ancho = 28;
            distancia = 35;
        }
    	
    	for(var i=0; i < Motor.datosXML.elementos.length; i++)
    	{
    	    
    	    if ( (i % 4) == 0){
                posX = 37;
                //posY = this.INITIAL_Y + 281 + 40 * (i/4);
                posY = this.INITIAL_Y + 265 + distancia * (i/4);
            }else{
                //posX = posX + 230;
                posX = posX + 223;
                posY = posY;
            }
    	    
    		var base = new BaseElemento(i, 185, ancho , 5);
	        //base.contenedor.x = Math.floor( i / 4 )*230 + 37 ;
	        //base.contenedor.y = this.INITIAL_Y + 40 * (i % 4) + 280;
	        base.contenedor.x = posX;
            base.contenedor.y = posY;

	        this.contenedor.addChild( base.contenedor );
	        //guardem marc inicial en un array per despres treballar em ells
	        Motor.contenedores.push(base);
    	}
    }
    
    this.drawElementos = function()
    {
    	Motor.elementos = new Array();
        var numCuestiones = Motor.datosXML.cuestiones.length;
    	var elementos = Motor.datosXML.elementos;
    	var numElementos = elementos.length;
    	
    	var ancho;
    	var distancia;
        if( Contenedor.datosXML.plataforma.grado == 1 ){
            ancho = 32;
            distancia = 40;
        }else{
            ancho = 26;
            distancia = 35;
        }
    	
    	var posX = 0;
    	var posY = 0;
    	for(var i=0; i < numElementos; i++)
    	{
    		// creem random o no.
    		var index = 0;
    		if(Contenedor.datosXML.sinaleatoriedad == 0 && Scorm.modo != Scorm.MODO_REVISAR && Scorm.modo != Scorm.MODO_REVISARALUMNO )
			{
				index = Math.floor(Math.random()*elementos.length);
			}
			var elemento = elementos[index];
			elementos.splice(index,1);
			
			if ( (i % 4) == 0){
			    posX = 38;
			    //posY = this.INITIAL_Y + 281 + 40 * (i/4);
			    posY = this.INITIAL_Y + 266 + distancia * (i/4);
			}else{
			    //posX = posX + 230;
			    posX = posX + 223;
			    posY = posY;
			}
			
			
	        // creem caixa element
	        var el = new Elemento( elemento.texte, elemento.id, 183, ancho, 5) ;
	        	        
	        //el.contenedor.x = Math.floor( i / 4 )*230 + 38 ;
	        el.contenedor.x = posX;
	        //el.contenedor.y = this.INITIAL_Y + 40 * (i%4) + 281;
	        el.contenedor.y = posY;
	        el.idElement = i;
	        el.ordre = elemento.idElement;
	        el.categoria = elemento.categoria;

			//guardem resposta dins marc
	    	Motor.elementos.push(el);
	    	Motor.contenedores[i].setElement(el);
	        
	       	this.contenedor.addChild( el.contenedor );

			// activem listeners de comportament de les respostes
	        el.contenedor.on("mousedown", this.preDragAndDrop, null, false, {element:el});
	        el.contenedor.on("pressmove", this.dragAndDrop, null, false, {element:el});
			el.contenedor.on("pressup", this.dropElement, null, false, {element:el});
			el.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
			el.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
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
		    	Motor.contenedor.setChildIndex ( evt.target.parent,  Motor.contenedor.getNumChildren () - 1 );
		    	//activem color seleccio i sombra de la resposta
		    	data.element.lightResponse();
		    	
		    	if(data.element.base.categoria != null)
		    	{
		    		data.element.base.categoria.removeElement(data.element);
		    		//data.element.base.categoria = null;
		    	}
	    	}
    	}
	}
    
    this.dragAndDrop = function(evt, data)
    {
    	if( evt.primary ){
	    	if( Motor.currentElement == data.element){
		  	  	evt.target.parent.x = evt.stageX/Main.scale - Motor.itemX;
				evt.target.parent.y = evt.stageY/Main.scale - Motor.itemY;
			}
		}
    }
    
    this.dropElement = function(evt, data)
    {
    	if( evt.primary ){
	    	if( Motor.currentElement == data.element ){
		    	// desactivem color seleccio i sombra del origen
		    	data.element.unlightResponse();
		    	
		    	var trobat = false;
				for( key2 in Motor.categorias)
				{
					var pt = Motor.categorias[key2].fons.globalToLocal( data.element.contenedor.x * Main.scale + 91, data.element.contenedor.y * Main.scale + 14 );
		
				    if ( Motor.categorias[key2].fons.hitTest( pt.x, pt.y )){
						trobat = Motor.categorias[key2].addElement( data.element,0 );
						
				    }
				}
				if(!trobat)  // no ha colisionat amb cap categoria
				{
					for (key3 in Motor.contenedores) {
						if(Motor.contenedores[key3].index == data.element.idElement)
						{
							// tornem l'element origen a la seva posicio inicial
					        createjs.Tween.get(evt.target.parent).to({x:Motor.contenedores[key3].contenedor.x+1}, 350, createjs.Ease.circOut);
				    		createjs.Tween.get(evt.target.parent).to({y:Motor.contenedores[key3].contenedor.y+1}, 350, createjs.Ease.circOut);
		
						}
					}
				}
				Motor.currentElement = null;
			}
		}
    }
}