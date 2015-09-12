Motor = new function()
{
	this.fons = "";
	this.inicis = new Array();
	this.finals = new Array();
	this.preguntes = new Array();
	this.respostes = new Array();
	
	this.contenedor = "";

	this.INITIAL_Y = 113;
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
	
	this.numSelect = 0;
	
	this.IMG = "data/imagenes/";
	
	this.ponerContenedor = function(contenedorMotor) {
	  //alert("Estoy caminando!");
	};
	
	this.cargarDatos = function()
	{
		$.get(pppPreloader.from("data", "data/datos.xml" + "?time=" + new Date().getTime()), function (xml) {

			
			Motor.datosXML = new datosMotor();
			Motor.datosXML.cantidad = $(xml).find('textoacategoria').attr('cantidad');	
			Motor.datosXML.pregunta = $(xml).find('pregunta').text(); 
			Motor.datosXML.sonido = $(xml).find('sonido').text(); 

		  	$(xml).find('respuesta').each(function(index) {
				//debugger;
				var resp = new respuesta();
				resp.text = $(this).text();
				resp.orden = $(this).attr('orden');
				resp.id = index;
				
				$(this).find('opcion').each(function(index) {
					
					var opc = new opcion(); 
					opc.text = $(this).text();
					opc.correcta = $(this).attr('correcta');
					resp.opciones.push(opc);
				});
				
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

	  	for(key1 in Motor.preguntes)
	  	{
	   		for (key2 in Motor.preguntes[key1].contenedors) 
	   		{
				if( Motor.preguntes[key1].contenedors[key2].text.text == "") return false;
			}
		}
		return true;
	};
	
	this.getEstado = function(){
		var estado = new Array();
		for(key1 in Motor.preguntes)
		{
			for (key2 in Motor.preguntes[key1].contenedors) 
			{
				estado.push( Motor.preguntes[key1].contenedors[key2].text.text );
			}
		}
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
			
			var counter =0;
			for(key1 in Motor.preguntes)
			{
				for (key2 in Motor.preguntes[key1].contenedors) 
				{
					for(key3 in  Motor.preguntes[key1].contenedors[key2].options.opcions){
						//console.log( Motor.preguntes[key1].contenedors[key2].options.opcions[key3].texte + " - " + estado[counter] );
						if(Motor.preguntes[key1].contenedors[key2].options.opcions[key3].texte == estado[counter]){
							Motor.preguntes[key1].contenedors[key2].options.opcions[key3].triar(null);
						}
					}
		   		 	counter++;
		   		}
			}
		}
	}	
	
	this.validar = function() {
		var total = 0;
		var total_preguntes = 0;

	  	for(key1 in Motor.preguntes)
	  	{
	  	    //console.log(Motor.preguntes[key1].contenedors);
	   		for (key2 in Motor.preguntes[key1].contenedors) 
			{

				if( Motor.preguntes[key1].contenedors[key2].correcta == "1")
	   			{
					total++;
					Motor.preguntes[key1].contenedors[key2].correct();
				}
				else if(Motor.preguntes[key1].contenedors[key2].correcta == "0")
				{
					Motor.preguntes[key1].contenedors[key2].error();	
				}
				total_preguntes++;
			}
		}
		return total.toString() + "/" + total_preguntes.toString();
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
		for (key in Motor.preguntes) {
			for(key1 in Motor.preguntes[key].contenedors){
		  		// desactivem listeners de comportament de les respostes
		  		Motor.preguntes[key].contenedors[key1].activar();
		  	}
		}
	}
	this.desactivar = function() {
		for (key in Motor.preguntes) {
			for(key1 in Motor.preguntes[key].contenedors){
		  		// desactivem listeners de comportament de les respostes
		  		Motor.preguntes[key].contenedors[key1].desactivar();
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
		for( key0 in Motor.datosXML.respuestas)
		{
			var index = 0;
		  	for(key1 in Motor.preguntes)
		  	{
		   		for (key2 in Motor.preguntes[key1].contenedors) 
				{
					Motor.preguntes[key1].contenedors[key2].removeError();
					Motor.preguntes[key1].contenedors[key2].setText(Motor.preguntes[key1].contenedors[key2].textCorrecte);
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
		
	    this.drawElements();
	    
	    Main.stage.addChild( this.contenedor);
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
		this.numSelect = 0;
		for(var i = 0; i < preguntas.length  ; i++)
		{
			this.pregunta = new Pregunta(i, preguntas[i],  Motor.datosXML.respuestas, height);
			height += this.pregunta.getHeight()+15;

			Motor.preguntes.push(this.pregunta);
			
			this.contenedor.addChild(this.pregunta.contenedor);
		}
    }

}