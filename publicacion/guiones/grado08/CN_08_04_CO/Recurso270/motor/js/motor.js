Motor = new function()
{
	this.fons = "";
	this.pagines = new Array();
	this.palabras= new Array();
	this.lineas = new Array();
	this.currentPalabra = false;

	this.contenedor= "";
	this.input= false;

	this.INITIAL_Y = 118;

	this.datosXML = "";
	this.solucion = false;
	
	this.currentPag = "";
	this.currentNumPag =0;
	this.estado_pagina = new Array();


    this.numMaxIntentos = 10;

	this.indexos = new Array();
	this.estatParaula = new Array();
	this.clicades = new Array();
	this.ahorcados = new Array();
	
	this.ponerContenedor = function(contenedorMotor) {
	  //alert("!");
	};
	
	this.cargarDatos = function()
	{
		$.get(pppPreloader.from("data", "data/datos.xml" + "?time=" + new Date().getTime()), function (xml) {

			//debugger;
			Motor.datosXML = new datosMotor();
			
			Motor.datosXML.enunciado = $(xml).find('enunciado').text();
			Motor.datosXML.intentos = $(xml).find('intentos').text();
			Motor.datosXML.estilo = $(xml).find('estilo').text();
			Motor.datosXML.numpreguntas = $(xml).find('numpreguntas').text();
			
			$(xml).find('pregunta').each(function(index) {
			  
				this.pg = new pregunta();
				this.pg.id = index;
				this.pg.enunciado = $(this).attr('enunciado');
				this.pg.palabra = $(this).attr('palabra');
				this.pg.visibles = $(this).attr('visibles');
				
			  	Motor.datosXML.preguntas.push(this.pg);

			});
			
	       	Motor.inicializarEstructura();
			Contenedor.crearPaginacio();
		});
	}
	this.inicializarEstructura = function(estado) {
		
		if( Scorm.modo != Scorm.MODO_REVISAR && Scorm.modo != Scorm.MODO_REVISARALUMNO )
	 		this.init();

	};
	this.reinicializarEstructuraMotor = function()
	{
		Main.stage.removeChild(Motor.contenedor);
		Motor.cargarDatos();
	}
	this.estaCompletado = function(){
		//mirem si estan les creuades completades

		return true;
	};
	
	this.getEstado = function(){
		var estado = new Array();
		for(var key in Motor.pagines)
		{
			var pregunta = new Array();
			
			pregunta.push( this.pagines[key].index );
			pregunta.push( this.pagines[key].palabra.getCurrentPalabra() );
			pregunta.push( this.pagines[key].teclat.picades );
			pregunta.push( this.pagines[key].ahorcado.estat );
			
			estado.push( pregunta.join(";") );
		}
		return estado.join("|");
	}
	
	this.revisar = function(){
		if(this.estado != "")
		{
			this.indexos = new Array();
			this.estatParaula = new Array();
			this.clicades = new Array();
			this.ahorcados = new Array();
			
			if( this.estado.indexOf("[")>=0 )
			{
				var datos = this.estado.substring(1, this.estado.length-1).split("][");
				Contenedor.timeRevision = datos[0];
				var estado = datos[1].split("|");
			}else{
				var estado = this.estado.split("|");
			}
			
			for(var key in estado)
			{
				var estado_pagina = estado[key].split(";");
				
				this.indexos.push( estado_pagina[0] );
				this.estatParaula.push( estado_pagina[1] );
				this.clicades.push( estado_pagina[2] );
				this.ahorcados.push( estado_pagina[3] );
				
			}

			this.buildRevision();
			this.recoveryState();
			
		}
	}
	
	this.validar = function() {
		var total = 0;
		var NumPalabras = 0;
	  	for(var key in this.pagines)
		{
			if( this.pagines[key].palabra.corregir() ) 
			{
				total++;
				this.pagines[key].validacio = true;
			}
			else
			{
				this.pagines[key].validacio = false;
			}	
		}
		return total.toString() +  "/" + (this.pagines.length).toString();
	};

	this.hideDomObjects = function(){

	}
	this.showDomObjects = function(){

	}
	this.obtenerEstado = function(){

	  //alert("Hola, Soy" + this.primerNombre);
	};
	this.reiniciar = function() {
	  	for(var key in this.pagines)
		{
			this.pagines[key].teclat.unblock();
		}
	};
	this.activar = function(){
		for(var key in this.pagines)
		{
			this.pagines[key].teclat.unblock();
		}
	}
	this.desactivar = function() {
		for(var key in this.pagines)
		{
			this.pagines[key].teclat.block();
		}
	};
	this.numPaginas = function(){
		return Motor.datosXML.numpreguntas;
	};
	this.ponerPagina = function(pag) {
	    this.contenedor.removeChild( this.currentPag.contenedor );
		this.currentNumPag = pag - 1;
	    this.currentPag = this.pagines[this.currentNumPag];
	    this.contenedor.addChild( this.currentPag.contenedor );
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

	  	for(key in this.pagines)
		{
		 	this.pagines[key].palabra.solucionar() ;

		}
	}

	this.obtenerTipoEjercicio = function() {

	};
	this.obtenerVersion = function(){

	};
	
    this.init = function()
    {
    	this.contenedor = new createjs.Container();
		this.pagines= new Array();
		
    	for(var i=0; i < Motor.datosXML.numpreguntas; i++)
    	{
	    	var index = 0;
	    	if(Contenedor.datosXML.sinaleatoriedad == 0 && Scorm.modo != Scorm.MODO_REVISAR && Scorm.modo != Scorm.MODO_REVISARALUMNO )
			{
				index = Math.floor( Math.random()*Motor.datosXML.preguntas.length); 
			}
			
			var pregunta = Motor.datosXML.preguntas[index];
			Motor.datosXML.preguntas.splice(index,1);
		
	    	this.addPagina( pregunta, i );
	    }
	    this.contenedor.addChild( this.pagines[0].contenedor );
	    this.currentPag = this.pagines[0] ;
	    this.currentNumPag = 0;
	    
	    Main.stage.addChild( this.contenedor );
    }
    
    this.buildRevision = function(){
    	this.contenedor = new createjs.Container();
		this.pagines= new Array();

    	for(var i=0; i < Motor.indexos.length; i++)
    	{
	    	var index = Motor.indexos[i];
			
			var pregunta = Motor.datosXML.preguntas[index];
			//Motor.datosXML.preguntas.splice(index,1);

	    	this.addPagina( pregunta, i );
	    }
	    this.contenedor.addChild( this.pagines[0].contenedor );
	    this.currentPag = this.pagines[0] ;
	    this.currentNumPag = 0;
	    
	    Main.stage.addChild( this.contenedor );
    }
    this.recoveryState = function(){
    	//console.log(this.ahorcados);
    	for( var index in Motor.pagines ){
    		for( var index2 in Motor.pagines[index].palabra.lletresBox ){
    			//console.log(this.estatParaula[index2]);
    			Motor.pagines[index].palabra.lletresBox[index2].lletra.text = this.estatParaula[index][index2];
    		}
    		for( var index3 in Motor.pagines[index].teclat.teclasBox ){
    			//console.log(Motor.pagines[index].teclat.teclasBox[index3].simbol.text);
    			for( var index4 in Motor.clicades[index])
    			{
    				if( Motor.pagines[index].teclat.teclasBox[index3].simbol.text.toUpperCase() == Motor.clicades[index][index4].toUpperCase() )
    					Motor.pagines[index].teclat.teclasBox[index3].pressHandler();
    			}
    		}
    		//for( var i=0; i < this.ahorcados[index] ; i++){
    			//Motor.pagines[index].ahorcado.morir();
    		//}
    	}
    }
    this.addPagina = function( pregunta, numpagina )
    {        
    	var pagina = new Pagina( pregunta, numpagina );
    	
    	pagina.contenedor.y = this.INITIAL_Y;
    	this.pagines.push( pagina );
    	
    }
}
