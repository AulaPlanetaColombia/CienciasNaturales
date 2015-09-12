Motor = new function()
{
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
	
	this.video ="";	
	this.currentPag = "";
	this.currentNumPag =0;
	
	this.ponerContenedor = function(contenedorMotor) {
	  //alert("Estoy caminando!");
	};
	
	this.cargarDatos = function()
	{
		$.get(pppPreloader.from("data", "data/datos.xml" + "?time=" + new Date().getTime()), function (xml) {

			//debugger;
			Motor.datosXML = new datosMotor();
			Motor.datosXML.cantidad = $(xml).find('test').attr('cantidad');
			
			$(xml).find('cuestion').each(function(index) {
				//debugger;
				this.preg = new pregunta();
				this.preg.explicacion = $(this).children('explicacion').text();
				this.preg.id = index;
				this.preg.enunciado = $(this).children('enunciado').text();
				this.preg.video = $(this).children('video').text().split(".")[0] + ".mp4";
				//console.log(this.preg.video );
				this.preg.salto = $(this).children('salto').text();
				
				var dato = this;
				//debugger;
				$(this).find('respuesta').each(function(index2) {
					//debugger;
					var rest = new respuesta();
					rest.text = $(this).attr('contestacion');
					rest.correcte = $(this).attr('correcta');
					rest.id = index2;
					
				  	dato.preg.respuestas.push(rest);
				});

			  	Motor.datosXML.preguntas.push(this.preg);

			});

	       	Motor.inicializarEstructura();
			Contenedor.crearPaginacio();
		});
	}
	this.inicializarEstructura = function(estado) {
		
	 	this.init();
	};
	this.reinicializarEstructuraMotor = function()
	{
		Main.stage.removeChild(Motor.contenedor);
		Motor.cargarDatos();
		
	}
	this.estaCompletado = function(){
	  	var total = 0;
	  	for(key1 in Motor.pagines){
	  		var contestada = false
	   		for (key2 in Motor.pagines[key1].respostes) 
	   		{
	   			if(Motor.pagines[key1].respostes[key2].checked )
	   			{
	   				contestada = true;
	   			}
			}
			if( !contestada ) return false;
		}
		return true;
	};
	
	this.getEstado = function(){
		var estado = new Array();
		for( var i = 0 ; i < Motor.pagines.length ; i++ ){
			for ( var key1 in Motor.pagines ) {
				if( i == Motor.pagines[key1].idPregunta ){
					var repuestas = new Array();
					for( var key2 in Motor.pagines[key1].respostes ) 
			   		{
						if( Motor.pagines[key1].respostes[key2].checked ){
							repuestas[Motor.pagines[key1].respostes[key2].idResposta] = "1" ;
						}
						else{
							repuestas[Motor.pagines[key1].respostes[key2].idResposta] = "0" ;
						}
					}
					estado.push(repuestas.join(","));
				}
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
			
			for(var key in estado)
			{
				if(estado[key].trim() != ""){
					var repuestas = estado[key].split(",");
					for(key1 in Motor.pagines)
					{
						if( key == Motor.pagines[key1].idPregunta )
						{
					   		for (key2 in Motor.pagines[key1].respostes) 
					   		{
					   			for( key3 in repuestas)
					   			{
									if( key3 == Motor.pagines[key1].respostes[key2].idResposta && repuestas[key3] == "1" )
									{
										Motor.pagines[key1].respostes[key2].pressHandler();
									}
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
	  	for(key1 in Motor.pagines){
	   		for (key2 in Motor.pagines[key1].respostes) 
	   		{
	   			Motor.pagines[key1].respostes[key2].desactivar();
	   			
	   			if(Motor.pagines[key1].respostes[key2].checked && Motor.pagines[key1].respostes[key2].correcte == "1")
	   			{
	   				Motor.pagines[key1].respostes[key2].correct();
	   				
	   			}
	   			else if(Motor.pagines[key1].respostes[key2].checked && Motor.pagines[key1].respostes[key2].correcte == "0")
	   			{
	   				Motor.pagines[key1].respostes[key2].error();
	   				Motor.pagines[key1].validacio = false;
	   			}
	   			else if(Motor.pagines[key1].respostes[key2].correcte == "1" && !Motor.pagines[key1].respostes[key2].checked )
	   			{
	   				Motor.pagines[key1].validacio = false;
	   			}
			}
			if(Motor.pagines[key1].validacio) total++;
		}
		return total.toString() +  "/" + Motor.pagines.length.toString();
	};
	this.hideDomObjects = function(){
		 $(Motor.video.htmlElement).css('display', 'none');
	}
	this.showDomObjects = function(){
		$(Motor.video.htmlElement).css('display', 'block');
	}
	this.obtenerEstado = function(){

	};
	this.reiniciar = function() {

	};
	this.activar = function(){
		for(key1 in Motor.pagines){
	   		for (key2 in Motor.pagines[key1].respostes) 
	   		{
	   			Motor.pagines[key1].respostes[key2].activar();
	   		}
	   	}
	}
	this.desactivar = function() {
		for(key1 in Motor.pagines){
	   		for (key2 in Motor.pagines[key1].respostes) 
	   		{
	   			Motor.pagines[key1].respostes[key2].desactivar();
	   		}
	   	}
	};
	this.numPaginas = function(){
		return Motor.datosXML.cantidad;
	};
	this.ponerPagina = function(pag) {
		this.contenedor.removeChild( this.currentPag.contenedor );
		this.currentNumPag = pag - 1;
	    this.currentPag = this.pagines[this.currentNumPag];
	    this.contenedor.addChild( this.currentPag.contenedor );

		// canviar el video
	    this.loadVideo();
	    
	};
	this.loadVideo = function()
	{
		//if($("#videoHolder video source").attr("src") !=  "data/videos/"+this.currentPag.video)
		if($("#videoHolder video source").attr("src") !=  pppPreloader.from("data", "data/videos/" + this.currentPag.video))
		{
			$videoAPI = $("#videoplayer").data("cepdaPlayer");
			$videoAPI.loadVideo(pppPreloader.from("data", "data/videos/" + this.currentPag.video));
			//$videoAPI.seek(this.currentPag.salto);
	   	}
	}
	this.obtenerPaginaActual = function(pag){

	};
	this.verSolucion = function(conEfecto){
	  
	  	this.deseleccionar();
	  	this.solucionar();
		//this.desactivar();	
		
	};
	this.deseleccionar = function(){
		for(var key1 in Motor.pagines){
	   		for (var key2 in Motor.pagines[key1].respostes) 
	   		{
	   			Motor.pagines[key1].respostes[key2].desactivar();
	   			Motor.pagines[key1].respostes[key2].clear();
			}
		}
	}
	this.solucionar = function(){
		var total = 0;
		
	  	for(var key1 in Motor.pagines){
	   		for (var key2 in Motor.pagines[key1].respostes) 
	   		{
	   			if( Motor.pagines[key1].respostes[key2].correcte == "1")
	   			{
	   				Motor.pagines[key1].respostes[key2].correct();
	   			}
			}
			 Motor.pagines[key1].explicacion.visible = true;
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
		this.deleteVideos();
		var videoHtml = $('<video id="videoplayer" width="325" height="220" controls></video>')
	            .append('<source id="videoSource" src="" type="video/mp4" />')
	            .appendTo($("#mediaHolder"));
	    
	   // this.video = new createjs.DOMElementCustom( document.getElementById("videoHolder"), this.contenedor );
	    this.video = new createjs.DOMElementCustom( "mediaHolder", this.contenedor );
	    this.video.x = 30;
	    this.video.y = 210;
	    
	    initMediaPlayer();
	    
	    this.video.element_x = 30;
		this.video.element_y =  225;
		this.video.element_width = 325;
		this.video.element_height = 220;
		this.video.fontsize = 18;
		
		this.video.grandParent =  Main.stage;
	   
	    this.contenedor.addChild( this.video );
		
	    for(var i=0; i < Motor.datosXML.cantidad; i++)
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
	    this.loadVideo();
	   
	    Main.stage.addChild( this.contenedor );
	    

    }
    
    this.addPagina = function( pregunta, numpagina )
    {
    	
    	var pagina = new Pagina( pregunta, numpagina );
    	pagina.contenedor.y = this.INITIAL_Y;
    	this.pagines.push( pagina );
    	
    }
    this.deleteVideos = function()
	{
		$( ".aulaplaneta" ).each(function() {
		  $( this ).remove();
		});
	}

}
