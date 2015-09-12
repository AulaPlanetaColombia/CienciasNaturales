Motor = new function()
{
	this.fons = "";
	this.inicis = new Array();
	this.finals = new Array();
	this.preguntes = new Array();
	this.respostes = new Array();
	this.audio = false;
	this.audios = new Array();
	this.imagen = false;
	this.ampliacion = false;
	this.zoom = false;
	
	this.contenedor = "";

	this.INITIAL_Y = 118;
	this.PREG_Y_PADDING = 87;
	this.PREG_X_PADDING = 25;
	
	//inici
	this.PREG_INICI_X_PADDING = 350;
	//final
	this.PREG_FINAL_X_PADDING = 650 ;
	
	this.RESP_HEIGHT = 60;
	this.RESP_WIDTH = 250; 
	this.RESP_INNER_HEIGHT = 58;
	this.RESP_INNER_WIDTH = 248; 
	
	//line
	this.LINE_X = 625;
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
			Motor.datosXML.cantidad = $(xml).find('textoatexto').attr('cantidad');
			Motor.datosXML.imagen = $(xml).find('imagen').text();
			Motor.datosXML.ampliacion = $(xml).find('ampliacion').text();
			Motor.datosXML.sonido = $(xml).find('sonido').text();
			
			$(xml).find('cuestion').each(function(index) {
				//debugger;
				var preg = new pregunta();
				preg.text = $(this).find('pregunta').text();
				preg.id=index;
			  	Motor.datosXML.preguntas.push(preg);
			  	
			  	var rest = new respuesta();
				rest.text = $(this).find('respuesta').text();
				rest.id = index;
			  	Motor.datosXML.respuestas.push(rest);

			});
			
			//console.log(Motor.datosXML);
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
	  for (key in Motor.inicis) {
			if( Motor.inicis[key].resposta == null)
			{
				return false;
			}
		}
		return true;
	};
	
	this.getEstado = function(){
		var estado = new Array();
		for(var i=0; i < Motor.numeros.length ; i++){
			for(var key in Motor.numeros){
				if( i == Motor.numeros[key].idNumero ){
					for (key1 in Motor.inicis) {
						if( Motor.numeros[key].idNumero == Motor.inicis[key1].idPregunta ){
							if( Motor.inicis[key1].resposta != null ){
								estado.push( Motor.inicis[key1].resposta.idResposta );
							}else{
								estado.push("");
							}
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
			
			for(var key in estado)
			{
				for (key2 in Motor.finals) {
					// mirar los id de respuesta que coincidan con el indice o posicion del array del estado
					if(  "" != estado[key] && Motor.finals[key2].resposta.idResposta == estado[key] )
					{ 
						for(key1 in Motor.numeros){
							// el id de la pregunta que coincida con el id de pregunta del estado 
							if(key == Motor.numeros[key1].idNumero )
							{
								Motor.inicis[ key1 ].setReposta( Motor.finals[key2].resposta);
								Motor.contenedor.setChildIndex ( Motor.finals[key2].resposta.contenedor,  Motor.contenedor.getNumChildren () - 1 );
								Motor.finals[key2].resposta.contenedor.x = Motor.inicis[key1].contenedor.x + 1;
								Motor.finals[key2].resposta.contenedor.y = Motor.inicis[key1].contenedor.y + 1;

								break;
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
	  	for(key1 in Motor.numeros){
	   		for (key2 in Motor.inicis) {
	   			if(key1 == key2){
					if( Motor.inicis[key2].resposta == null)
					{
						//return false;
					}
					else
					{
						//console.log( Motor.preguntes[key1].idPregunta + " - " + Motor.inicis[key2].resposta.idResposta );
						if(Motor.inicis[key2].resposta.idResposta == Motor.numeros[key1].idNumero)
						{
							total++;
							Motor.inicis[key2].resposta.correcte();
						}
						else
						{
							Motor.inicis[key2].resposta.erronia();	
						}
					}
				}
			}
		}
		return total.toString() +  "/" + Motor.inicis.length.toString();
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
		
		for (key in Motor.audios) 
        {
            if ( !$('#audio'+Motor.audios[key].index)[0].paused ){
               $('#audio' + Motor.audios[key].index)[0].pause(); 
               $('#audio'+ Motor.audios[key].index)[0].currentTime = 0;
               Motor.audios[key].bt.gotoAndStop("normal");
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
		for (key1 in Motor.inicis) {
			if( Motor.inicis[key1].resposta != null)
			{
				for (key2 in Motor.finals) {
					if(Motor.finals[key2].resposta.contenedor.id == Motor.inicis[key1].resposta.contenedor.id)
					{
						//tornem la resposta a la casella inicial
				        Motor.inicis[key1].resposta.contenedor.x = Motor.finals[key2].contenedor.x+1;
			    		Motor.inicis[key1].resposta.contenedor.y = Motor.finals[key2].contenedor.y+1;
						Motor.inicis[key1].resposta=null;
						break;
					}
				}
			}
		}
	}
	this.solucionar = function(){
		var total = 0;
		this.solucion = false;
		
	  	for(key1 in Motor.numeros){
	   		for (key2 in Motor.finals) {
				if( Motor.finals[key2].resposta.idResposta == 
					Motor.numeros[key1].idNumero )
				{ 
					Motor.finals[key2].resposta.removeError();
					Motor.contenedor.setChildIndex ( Motor.finals[key2].resposta.contenedor,  Motor.contenedor.getNumChildren () - 1 );
					createjs.Tween.get(Motor.finals[key2].resposta.contenedor).wait( 250 + key1 * 350 ).to({x: Motor.inicis[key1].contenedor.x+1, y: Motor.inicis[key1].contenedor.y+1}, 750, createjs.Ease.circOut);
					break;
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
		
		this.createImage();
		this.createAudio();
	    this.drawNumeros();
	    this.drawInicis();
	    this.drawLine();
	    this.drawFinals();
	    
	    Main.stage.addChild( this.contenedor);
	    
    }
    this.createImage = function(){
	    
	    // get imagen
	    var img = new Image();
		img.onload = function () {
		   	Motor.imagen = new createjs.Bitmap(this);
			Motor.imagen.x = 25;
			Motor.imagen.y = Motor.INITIAL_Y+25;
			//escalem imatges
			Motor.imagen.scaleX =  300 / this.width;
			Motor.imagen.scaleY =  300 / this.width;

			//mascara de cantonades arrodonides
			Motor.imagen.mask = new createjs.Shape();
			Motor.imagen.mask.graphics.beginFill("#fff").drawRoundRect(0, 0, 300, this.height * 300 / this.width, 10);
			Motor.imagen.mask.x = 25;
		 	Motor.imagen.mask.y =  Motor.INITIAL_Y+25;
		 	Motor.imagen.on("click", Motor.zooming );
			Motor.imagen.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
			Motor.imagen.on("mouseout", function(evt){ document.body.style.cursor='default'; });
			
			Motor.contenedor.addChild( Motor.imagen);
			
			// boton de ampliacion
			Motor.zoom = new createjs.Bitmap(pppPreloader.from("module", 'motor/images/ico_zoom.png'));
			Motor.zoom.x = 285;
			Motor.zoom.y = Motor.INITIAL_Y+285;
			Motor.contenedor.addChild( Motor.zoom);
			Motor.zoom.on("click", Motor.zooming );
			Motor.zoom.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
			Motor.zoom.on("mouseout", function(evt){ document.body.style.cursor='default'; });
		};
		img.src = pppPreloader.from("data", this.IMG + Motor.datosXML.imagen);//this.IMG + Motor.datosXML.imagen;
		
		// imagen ampliada
	    Motor.ampliacion = new Ampliacion();
	    Motor.ampliacion.contenedor.x = 0;
		Motor.ampliacion.contenedor.y = 0;
		Motor.ampliacion.contenedor.alpha = 0;
		Main.stage.addChild( Motor.ampliacion.contenedor);
    }
    this.zooming = function(evt){
		if( evt.primary ){
	    	Main.stage.setChildIndex ( Motor.ampliacion.contenedor, Main.stage.getNumChildren () - 1 );
	    	createjs.Tween.get(Motor.ampliacion.contenedor).to({alpha:1}, 500, createjs.Ease.circOut);
	    }
    	//Motor.ampliacion.contenedor.visible = true;
    }
    this.createAudio = function(){
    	this.audios = new Array();	
		if( Motor.datosXML.sonido != "" ){
			if(Main.navegador == "MSIE 9"){
				$('<audio id="audio0" preload="auto" src="' + pppPreloader.from("data", "data/sonidos/"+Motor.datosXML.sonido) + '" ></audio>')
		        .appendTo($("#mediaHolder"));
			}else{
		    	$('<audio id="audio0" preload="auto" ></audio>')
		        .append('<source src="' + pppPreloader.from("data", "data/sonidos/"+Motor.datosXML.sonido) + '" type="audio/mpeg" />')
		        .appendTo($("#mediaHolder"));
	       }

		    this.audio = new BotoAudio('0');
			this.audio.bt.x = 25;
			this.audio.bt.y = 450;
			
			this.contenedor.addChild( this.audio.bt);
			
			Motor.audios.push(this.audio);
		}
    }
    this.drawNumeros = function()
    {   
		Motor.numeros = new Array();
		var preguntes = Motor.datosXML.preguntas;
    	//dibuixem caixa i preguntes
    	for(i=0; i < Motor.datosXML.cantidad; i++)
    	{
    		var index = 0;			
			var preg = preguntes[index];
			preguntes.splice(index,1);
			
			//creem pregunta
	       	var num = new Numero(preg);
	        num.contenedor.x = 335 ;
	        num.contenedor.y =  this.INITIAL_Y + (this.RESP_HEIGHT+5) * i + 28 + i * ( (this.RESP_HEIGHT  + 5) * ( 6 - Motor.datosXML.cantidad ) ) / (Motor.datosXML.cantidad-1); 
			num.idNumero = i;
	        this.contenedor.addChild( num.contenedor );

	        //guardem marc inicial en un array per despres treballar em ells
	        Motor.numeros.push(num);
    	}
    }

    this.drawInicis = function()
    {
    	Motor.inicis = new Array();
    	// dibuixem marcs de cabuda de resposta
    	for(i=0; i < Motor.datosXML.cantidad; i++)
    	{
    		var inici = new BaseResposta(i,this.RESP_WIDTH, this.RESP_HEIGHT , 10);
	        inici.contenedor.x = this.PREG_X_PADDING + this.PREG_INICI_X_PADDING ;
	        inici.contenedor.y = this.INITIAL_Y + this.RESP_HEIGHT  * i + 5 * i + 25 + i * ( (this.RESP_HEIGHT  + 5) * ( 6 - Motor.datosXML.cantidad ) ) / (Motor.datosXML.cantidad-1);
			inici.idPregunta = Motor.numeros[i].idNumero;
			
	        this.contenedor.addChild( inici.contenedor );
	        //guardem marc inicial en un array per despres treballar em ells
	        Motor.inicis.push(inici);
    	}
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
    this.drawFinals = function()
    {
    	Motor.respostes = new Array();
    	Motor.finals = new Array();
    	var responses = Motor.datosXML.respuestas;
    	var total =  Motor.datosXML.cantidad;
    	//console.log(responses);
    	for(i=0; i < Motor.datosXML.cantidad; i++)
    	{
    		// creem random o no.
    		var index = 0;
			if(Contenedor.datosXML.sinaleatoriedad == 0 && Scorm.modo != Scorm.MODO_REVISAR && Scorm.modo != Scorm.MODO_REVISARALUMNO )
			{
				index = Math.floor(Math.random()*total);
				total--;
			} 
			
			var dataResp = responses[index];
			responses.splice(index,1);
			
    		// creem marc resposta
	    	var finali = new BaseResposta(i,this.RESP_WIDTH, this.RESP_HEIGHT , 10);
	        finali.contenedor.x = this.PREG_X_PADDING + this.PREG_FINAL_X_PADDING ;
	        finali.contenedor.y = this.INITIAL_Y + this.RESP_HEIGHT * i + 5 * i + 25  + i * ( (this.RESP_HEIGHT  + 5) * ( 6 - Motor.datosXML.cantidad ) ) / (Motor.datosXML.cantidad-1) ;
	        finali.hideBounds();
	        //debugger;
	        // creem caixa resposta
	        var resp = new Resposta( dataResp.text, this.RESP_INNER_WIDTH, this.RESP_INNER_HEIGHT, 10) ;
	        resp.contenedor.x = this.PREG_X_PADDING + this.PREG_FINAL_X_PADDING + 1;
	        resp.contenedor.y = this.INITIAL_Y + this.RESP_HEIGHT * i + 5 * i + 26  + i * ( (this.RESP_HEIGHT  + 5) * ( 6 - Motor.datosXML.cantidad ) ) / (Motor.datosXML.cantidad-1);
	        resp.idResposta = dataResp.id;

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
		}
    }
    
    this.preDragAndDrop = function(evt, data)
    {
    	if( evt.primary ){
	    	if(Motor.currentElement == null){
	    		Motor.currentElement = data.element
		    	// capturem punt de click dins la resposta
		    	Motor.itemX = evt.stageX/Main.scale  - evt.target.parent.x ;
		    	Motor.itemY = evt.stageY/Main.scale  - evt.target.parent.y ;
		    	// coloquem reposta al davant
		    	Motor.contenedor.setChildIndex ( evt.target.parent,  Motor.contenedor.getNumChildren () - 1 );
		    	//activem color seleccio i sombra de la resposta
		    	data.resposta.lightResponse();
		    	
		    	for (key in Motor.inicis) {
					if( Motor.inicis[key].resposta != null && 
						Motor.inicis[key].resposta.contenedor.id == evt.target.parent.id)
					{
						//netegem la resposta quan la treiem del final
						Motor.inicis[key].resposta = null;
					}
				}
			}
		}
	}
    
    this.dragAndDrop = function(evt, data)
    {
    	if( evt.primary ){
	    	if( Motor.currentElement == data.element){
			    evt.target.parent.x = evt.stageX/Main.scale  - Motor.itemX;
				evt.target.parent.y = evt.stageY/Main.scale  - Motor.itemY;
			}
		}
    }
    
    this.dropResposta = function(evt, data)
    {
    	if( evt.primary ){
	    	if(Motor.currentElement == data.element){
		    	//desactivem color seleccio i sombra de la resposta
		    	data.resposta.unlightResponse();
		    	
		    	var trobat = false;
		    	for (key in Motor.inicis) {
					var pt = Motor.inicis[key].contenedor.globalToLocal( (evt.target.parent.x + 160) * Main.scale, (evt.target.parent.y + 40) * Main.scale );
				   
				    // si colisiona amb una casella final
				    if ( evt.target.parent.children[0].hitTest( pt.x , pt.y )) {
				    	if(Motor.inicis[key].resposta == null) {
				    		//coloquem la resposta a la casella corresponent
				    		createjs.Tween.get(evt.target.parent).to({x:Motor.inicis[key].contenedor.x+1}, 750, createjs.Ease.circOut);
				    		createjs.Tween.get(evt.target.parent).to({y:Motor.inicis[key].contenedor.y+1}, 750, createjs.Ease.circOut);
					        Motor.inicis[key].setReposta( data.resposta );
					        trobat = true;
					    }
				    }
				}
				if(!trobat)  // no ha colisionat amb cap casella final
				{
					for (key in Motor.finals) {
						if(Motor.finals[key].resposta.contenedor.id == data.resposta.contenedor.id)
						{
							//tornem la resposta a la casella inicial
					        createjs.Tween.get(evt.target.parent).to({x:Motor.finals[key].contenedor.x+1}, 750, createjs.Ease.circOut);
				    		createjs.Tween.get(evt.target.parent).to({y:Motor.finals[key].contenedor.y+1}, 750, createjs.Ease.circOut);
		
						}
					}
				}
				Motor.currentElement = null;
			}
		}
    }

}