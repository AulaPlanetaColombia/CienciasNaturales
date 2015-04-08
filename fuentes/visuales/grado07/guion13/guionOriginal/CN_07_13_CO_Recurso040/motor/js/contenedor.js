
Contenedor = new function()
{
	//CONSTANTS DE POSICIONAMENT DE CAPES I TEXTOS
	this.MOTOR_Y = 118;
	this.FONS_MOTOR_H = 440;
	this.TITLE_MOTOR_X = 180;
	this.TITLE_MOTOR_Y = 12;
	this.LOGO_PLANETA_X = 130;
	this.LOGO_PLANETA_Y = 5;
	this.LOGO_PLANETA_SCALE = 0.13;
	
	this.PLANETA_X = 14;
	this.PLANETA_Y = 8;
	this.PLANETA_X2 = 55;
	
	this.FONS_TITLE_Y = 41;
	this.FONS_TITLE_HEIGHT = 76;
	
	this.TANCAR_X = 915;
	this.TANCAR_Y = 10;
	
	this.TITLE_ACT_X = 25;
	this.TITLE_ACT_Y = 52;
	this.TITLE_ACT_W = 800;
	this.TITLE_ACT_H = 25;
	
	this.MOREINFO_SIZE = 22;
	this.MOREINFO_X1 = 815;
	this.MOREINFO_X2 = 915;
	this.MOREINFO_Y = 48;
	
	this.CALC_X1 = 811;
	this.CALC_X2 = 911;
	this.CALC_Y = 75;
	
	this.SEPARATOR_Y = 41;
	this.SEPARATOR_X = 850;
	this.SEPARATOR_HEIGHT = 76;
	
	this.CLOCK_TITLE_X = 855;
	this.CLOCK_TITLE_Y = 63;
	this.CLOCK_X = 860;
	this.CLOCK_Y = 72;
	
	//VARIABLES DE FORMES CAPES I TEXTOS
	this.fons = "";
	this.fonsGeneral =""; 
	this.fonsTitol =""; 
	
	this.title_planeta_1 = "";
	this.title_planeta_2 = "";
	this.logo_planeta ="";
	
	this.title_motor ="";
	this.tancar ="";
	
	this.title_exercici ="";
	this.mesInfo="";
	this.calc ="";
	this.separador ="";
	
	this.titleClock = "";
	this.clock ="";
	this.DEFAULT_TIME = 0;
	this.time = 0;
	this.timer ="";
	this.timeRevision="";
	
	// btns corregir i validar
	this.validar = "";
	this.corregir = "";
	
	// capes de info
	this.missatge = "";
	this.moreinfopanel ="";
	
	this.num_pagines = 0;
	this.reiniciar = false;
	
	// variable de dades XML
	this.datosXML = "";
	
	// Obtener el mc general
	this.obtenerPrincipal_mc = function(contenedorMotor){
		
	}
	// Obtener el modo de presentación
	this.obtenerNoRandom = function (){
		
	}
	// Obtener el idioma del ejercio
	this.obtenerIdioma = function (){
		
	}
	
	// Evento al que avisar cuando se ha completado
	this.motorCompletado = function (){
		
	}
	// Evento al que avisar cuando se ha completado una página
	this.paginaCompletada = function (){
		
	}
	// Evento para avisar de un cambio de página en el ejercicio
	this.motorCambioPagina = function (nuevaPagina){
		
	}
	// creació del footer amb la paginació si cal
	this.crearPaginacio = function()
	{
		Contenedor.num_pagines = Motor.numPaginas();
		this.drawFooter();
		
		// si entra en modo revision cargamos el estado del ejercicio com lo dejo del alumno
        if( ( this.reiniciar && Scorm.modo == Scorm.MODO_REVISAR )  || 
            ( !this.reiniciar && ( Scorm.modo == Scorm.MODO_REVISAR || Scorm.modo == Scorm.MODO_REVISARALUMNO )) )
        {
        	Motor.estado = Scorm.suspend_data;
        	Motor.revisar();
	 		Motor.desactivar();
	 		Contenedor.deleteHeaderDown();
	 		Contenedor.drawHeaderDown();
	 		Contenedor.validacioResultatsHandler(null);	
	 		
        }
	}
	// funcio de carrega de dades del xml
	this.cargarDatos = function()
	{
		$.get(pppPreloader.from("data", "data/datos.xml" + "?time=" + new Date().getTime()), function (xml) {

			//debugger;
			Contenedor.datosXML = new datosContenedor();
			
			var motor = $(xml).find('motor');
	       	Contenedor.datosXML.tipo =  motor.attr('tipo');
	       	Contenedor.datosXML.classe = motor.attr('classe');
	       	
	       	//parseamos el enunciado para que aparezcan los siimbolo < y >
	       	var enunciado = motor.children('enunciado');
	       	var enunciadoParseado = enunciado.text();
	       	enunciadoParseado = enunciadoParseado.replace(/</g, "{{lt}}");
            enunciadoParseado = enunciadoParseado.replace(/>/g, "{{lg}}");
	        Contenedor.datosXML.enunciado = enunciadoParseado;
	         	
	        var temps = $(xml).find('temps');
	        Contenedor.datosXML.temps = temps.text();
	         		      		     
		    var calc = $(xml).find('calc');
	        Contenedor.datosXML.calc = calc.text();		   
	        
			var sinaleatoriedad = $(xml).find('sinaleatoriedad');
			Contenedor.datosXML.sinaleatoriedad = sinaleatoriedad.text();
			
			var respuestaunica = $(xml).find('respuestaunica');
			Contenedor.datosXML.respuestaunica = respuestaunica.text();
	        
	        var masinfo = $(xml).find('masinfo');
	        Contenedor.datosXML.masinfo.text  = masinfo.text();
	        Contenedor.datosXML.masinfo.inicio = masinfo.attr('inicio');
	         
		    var plataforma = $(xml).find('plataforma');
	        Contenedor.datosXML.plataforma.grado = plataforma.find('grado').text(); 
	        Contenedor.datosXML.plataforma.titulo = plataforma.find('titulo').text(); 
	        Contenedor.datosXML.plataforma.lang = plataforma.find('lang').text(); 
	        
	        Contenedor.inicializarEstructura();
	        
	        //cargamos los datos
	       	Motor.cargarDatos();
	       	Contenedor.settingsCalc();
	       	

		});
	}
	 this.settingsCalc = function(){

	 	var navegador = Main.navegador.split(',');
        var mobil = Main.mobil
        var index = navegador[0].indexOf("Chrome");
        var index2 = navegador[0].indexOf("Safari");
        var version = navegador[1];

	 	
	 	if(Contenedor.datosXML.plataforma.grado == 1)
		{
			$('#calculator').calculator();
			if( (index > -1 || index2 > -1 ) && mobil =="Android"){
			     //en chrome no se carga el draggable
			}else{
				$('#calculator').draggable();
			    $("#calculator").css('-ms-touch-action', 'none');
			    $( "#calculator" ).on( "dragstart", function( event, ui ) { Contenedor.calculadora.element_x = 0; Contenedor.calculadora.element_y = 0;} );
			}
			
		}
		else{
			$('#calculator').calculator({layout: $.calculator.scientificLayout});
			if( (index > -1 || index2 > -1 ) && mobil =="Android"){
    			//en chrome no se carga el draggable
            }else{
            	$('#calculator').draggable();
    			$("#calculator").css('-ms-touch-action', 'none');
    			$( "#calculator" ).on( "dragstart", function( event, ui ) { Contenedor.calculadora.element_x = 0; Contenedor.calculadora.element_y = 0; } );
            }
			
		}
	 }
	
	this.inicializarEstructura = function(){
		
		if( Contenedor.datosXML.plataforma.lang == "" ) LangRes.init();
	    else LangRes.setLang(Contenedor.datosXML.plataforma.lang);
	        
		this.drawBackGround();
		this.drawHeaderUp();
		this.drawHeaderDown();
	}
	
	this.drawBackGround = function()
	{
		this.drawFonsGeneral();
		this.drawFonsTitol();
		this.drawFonsMotor();
	}
	this.drawHeaderUp = function()
	{
		this.drawPlaneta();
		this.drawTitle();
		//this.drawTancar();
	}
	this.drawHeaderDown = function()
	{
		this.drawTitleActivity();
		this.drawMoreInfo();
		this.drawCalculator();
		this.drawSeparator();
		this.drawClock();
	}
	this.drawFooter = function()
	{
		Contenedor.missatge = new inicialPanell(Contenedor.num_pagines);
		
		Contenedor.missatge.validar.bt.on("mousedown",Contenedor.validaHandler);
		Contenedor.missatge.corregir.bt.on("mousedown",Contenedor.corregirHandler);
		
		if( Contenedor.num_pagines > 1 )
		{
			for( key in Contenedor.missatge.pagines.pags)
			{
				Contenedor.missatge.pagines.pags[key].bt.on("mousedown",Contenedor.selectPagHandler,Contenedor.missatge.pagines.pags[key]);
			}
			
			Contenedor.missatge.seguent.bt.on("mousedown",Contenedor.seguentPaginaHandler);
		}
	}
	//Event del boto de seguent pagina
	this.seguentPaginaHandler = function(evt)
	{
	   	if( evt.primary ){
	      	Contenedor.missatge.seguentPag();
	      	Motor.ponerPagina( Motor.currentNumPag + 2 );
	     }
	}
	//Event de selecció d'una pagina
	this.selectPagHandler = function(evt)
	{
		if( evt.primary ){
			Contenedor.missatge.unselectCurrentPag();
			Contenedor.missatge.selectPag(this.num);
			Motor.ponerPagina(this.num);
		}
	}
	
	//event del boto de validar
	this.validaHandler = function(evt){
		if( evt.primary ){
			// mostrem missatge de confirmaciño de reintentar
			if( Scorm.initialMode == Scorm.MODO_EXPONER ){
                Contenedor.missatge = new missatgePanell( LangRes.lang[ LangRes.MSG_REINTENTAR ] /*"¡Atención! Si reintentas, empezarás el ejercicio de nuevo."*/);
            }else{
                if( Scorm.initialMode != Scorm.modo ){
                    Contenedor.missatge = new missatgePanell( LangRes.lang[ LangRes.MSG_REINTENTAR_AREVIEW ] /*"Esta actividad ya ha sido entregada. Ahora puedes practicar tantas veces como quieras."*/);
                }else{
                    Contenedor.missatge = new missatgePanell( LangRes.lang[ LangRes.MSG_REINTENTAR ] /*"¡Atención! Si reintentas, empezarás el ejercicio de nuevo."*/);
                }
                
            }
			
			//Contenedor.missatge = new missatgePanell( LangRes.lang[ LangRes.MSG_REINTENTAR ] /*"¡Atención! Si reintentas, empezarás el ejercicio de nuevo"*/);
			// events del panell
			Contenedor.missatge.aceptar.bt.on("mousedown", Contenedor.reiniciarHandler);
			Contenedor.missatge.cancelar.bt.on("mousedown", Contenedor.cancelHandler );
			//desactivar activitat
			Motor.desactivar();
		}
	}
	//Event del boto de cancelar
	this.cancelHandler = function(evt){
		if( evt.primary ){
			//barra controls inicial
			Contenedor.drawFooter();
			
			if( Contenedor.time > 0 ){		
				Motor.activar();
			}else if(Contenedor.datosXML.temps != "" && Contenedor.datosXML.temps != "0" && Scorm.modo != Scorm.MODO_EXAMEN ){
				Motor.activar();
			}else if(Contenedor.datosXML.temps == "" || Contenedor.datosXML.temps == "0"){
				Motor.activar();
			}	
		}	
	}
	//Event del boto de reiniciar
	this.reiniciarHandler = function(evt){
		if( evt.primary ){
			//reiniciem el temps
			clearInterval(Contenedor.timer);
			Contenedor.time = Contenedor.DEFAULT_TIME;
			Main.stage.removeChild(Contenedor.titleClock);
			Main.stage.removeChild(Contenedor.clock);
	
			//reiniciem solucionat
			Contenedor.solucionat = false; 
		
			
			//mostrem o no el crono segons si ja ha estat entregada
			if(Scorm.modo == Scorm.MODO_EXAMEN )
				Contenedor.drawClock();
			
			//barra controls inicial
			Contenedor.drawFooter();
	
			//reiniciem el motor
			Contenedor.reiniciar = true;
			Motor.reinicializarEstructuraMotor();
		}
	}

	// Event del  boto de corregir
	this.corregirHandler = function(evt){
		if( evt.primary ){
			//paramos el crono
			clearInterval(Contenedor.timer);
			
			if(Scorm.modo == Scorm.MODO_EXAMEN ){
				//Mostramos mensaje precorrección
				if( Motor.estaCompletado() ) Contenedor.missatge = new missatgePanell( LangRes.lang[ LangRes.MSG_VALIDAR ] /*"Si continúas, se almazenará la nota del ejercicio. Si quieres hacer alguna modificación, haz clic en Cancelar."*/ );
				else  Contenedor.missatge = new missatgePanell( LangRes.lang[ LangRes.MSG_VALIDARSINRESPONDER ] /*"Hay preguntas sin responder. Si continúas, se almazenará la nota del ejercicio. Si quieres hacer alguna modificación, haz clic en Cancelar."*/ );
			
				//eventos del mensaje
				Contenedor.missatge.aceptar.bt.on("mousedown", Contenedor.validacioResultatsHandler);
				Contenedor.missatge.cancelar.bt.on("mousedown", Contenedor.cancelCorrectHandler );
			}else{
				Contenedor.validacioResultatsHandler(null);
			}
			//desactivar l'acvitivat
			Motor.desactivar();
		}
	}
	//Event de missatge de mostrar resultats validació
	this.validacioResultatsHandler = function(evt)
	{
		if( evt == null || evt.primary ){
			// obtenció dels resultats
			var resultat = Motor.validar();
			
			//extracció de dades
			var ar = resultat.split("/");
			var correctes = ar[0];
			var total = ar[1];
			var temps = "";
			var temps1 = "";
			
			if(evt == null) {
				temps1 = Contenedor.getTempsRevision(); // venimos de revision de ejercicio
				temps = Contenedor.timeRevision;
				
				if( Scorm.modo == Scorm.MODO_REVISAR ){ 
					this.clock.text = temps;
				}

			}
			else{
				 temps = Contenedor.getTemps(); // venimos de ejecutar el ejercicio
				 temps1 = Contenedor.getTempsUsat();
			}
			
			if( Scorm.modo == Scorm.MODO_EXAMEN ){
				//s'envien les dades a scorm si esta en mode EXAMEN
				var estado = Motor.getEstado();
				if( Contenedor.datosXML.temps != "" && Contenedor.datosXML.temps > 0  ){
					estado = "["+temps+"]["+estado+"]";
				}
				//console.log( estado +" - "+ 0 +" - "+ total+" - "+ correctes+" - "+ temps );
				aulaPlaneta.SCORM.ejercicio_enviar_resultado( estado, 0, total, correctes, temps )
			}
			else if( Scorm.modo == Scorm.MODO_REVISAR || Scorm.modo == Scorm.MODO_REVISARALUMNO ){
				//paramos el crono
				clearInterval(Contenedor.timer);
			}
	
			// mostrar panell amb els resultats de l'activitat
			Contenedor.missatge = new resultatsPanell( correctes, total, temps1);
			Contenedor.missatge.aceptar.bt.on("mousedown", Contenedor.resultatAceptarHandler);
		}
	}
	//Event d'acceptació de mostrar els resultats
	this.resultatAceptarHandler = function(evt)
	{
		if( evt.primary ){
			this.num_pagines = Motor.numPaginas();
			
			//Mostrar la paginació en la validació dels resultats
			Contenedor.missatge = new solucioPanell(this.num_pagines);
			//Events del missatge
			Contenedor.missatge.solucio.bt.on("mousedown", Contenedor.solucioHandler);
			
			if( Scorm.modo != Scorm.MODO_REVISAR )
				Contenedor.missatge.reintentar.bt.on("mousedown", Contenedor.preReiniciarHandler);
			
			if( Scorm.modo == Scorm.MODO_EXAMEN || Scorm.modo == Scorm.MODO_REVISARALUMNO )
				Scorm.modo = Scorm.MODO_EXPONER;
				
			//En cas d'haver pagines es mostren
			if(Contenedor.num_pagines > 1)
			{
				for( key in Contenedor.missatge.pagines.pags)
				{
					Contenedor.missatge.pagines.pags[key].bt.on("mousedown",Contenedor.selectPagHandler,Contenedor.missatge.pagines.pags[key]);
				}
				
				Contenedor.missatge.seguent.bt.on("mousedown",Contenedor.seguentPaginaHandler);
			}
		}
	}
	//Event de avis de reinici de app
	this.preReiniciarHandler = function(evt)
	{
		if( evt.primary ){
		    if( Scorm.initialMode == Scorm.MODO_EXPONER ){
		        Contenedor.missatge = new missatgePanell( LangRes.lang[ LangRes.MSG_REINTENTAR ] /*"¡Atención! Si reintentas, empezarás el ejercicio de nuevo."*/);
		    }else{
		        Contenedor.missatge = new missatgePanell( LangRes.lang[ LangRes.MSG_REINTENTAR_AREVIEW ] /*"Esta actividad ya ha sido entregada. Ahora puedes practicar tantas veces como quieras."*/);
		    }
			Contenedor.missatge.cancelar.bt.on("mousedown", Contenedor.returnSolucioHandler);
			Contenedor.missatge.aceptar.bt.on("mousedown", Contenedor.reiniciarHandler);
		}
	}
	//Event de confirmació del mostrat de la solució
	this.returnSolucioHandler = function(evt)
	{
		if( evt.primary ){
			this.num_pagines = Motor.numPaginas();
			
			//Mostrar panell amb la solució
			Contenedor.missatge = new solucioPanell(this.num_pagines);
			//Events del panell
			Contenedor.missatge.solucio.bt.on("mousedown", Contenedor.solucioHandler);
			Contenedor.missatge.reintentar.bt.on("mousedown", Contenedor.preReiniciarHandler);
			
			//amagar el boto de la solució si ja ha estat solucionat
			if(Contenedor.solucionat)
				Contenedor.missatge.solucio.bt.visible = false;	
			
			//En cas d'haver pagines es mostren
			if(Contenedor.num_pagines > 1)
			{
				for( key in Contenedor.missatge.pagines.pags)
				{
					Contenedor.missatge.pagines.pags[key].bt.on("mousedown",Contenedor.selectPagHandler,Contenedor.missatge.pagines.pags[key]);
				}
				
				Contenedor.missatge.seguent.bt.on("mousedown",Contenedor.seguentPaginaHandler);
			}
		}
	}
	//Event per mostrar la solució
	this.solucioHandler = function(evt)
	{
		if( evt.primary ){
			Contenedor.missatge.solucio.bt.visible = false;
			Contenedor.solucionat = true; 
			//mostrem la solució
			Motor.verSolucion();
		}
	}
	//event per cancelar el mostrat de la solució
	this.cancelCorrectHandler = function(evt){
		if( evt.primary ){
			//console.log( Contenedor.missatge );
			Main.stage.removeChild( Contenedor.missatge.contenedor );
			
			//barra controls inicial
			Contenedor.drawFooter();
			
			if( Contenedor.time > 0){
				Contenedor.timer = setInterval(Contenedor.updateClock , 1000);
				Motor.activar();
			}else if(Contenedor.datosXML.temps != "" && Contenedor.datosXML.temps != "0" && Scorm.modo != Scorm.MODO_EXAMEN ){
				Motor.activar();
			}else if(Contenedor.datosXML.temps == "" || Contenedor.datosXML.temps == "0"){
				Motor.activar();
			}
		}

	}
	this.deleteHeaderDown = function()
	{
		Main.stage.removeChild( this.titleClock);
		Main.stage.removeChild( this.clock);
		Main.stage.removeChild( this.separador );
		Main.stage.removeChild( this.calc);
		Main.stage.removeChild( this.mesInfo );
	}
	this.drawClock = function()
	{
		if( (Contenedor.datosXML.temps != "" && Contenedor.datosXML.temps > 0  &&  Scorm.modo == Scorm.MODO_EXAMEN ) 
			|| ( Contenedor.timeRevision != "" &&  Scorm.modo == Scorm.MODO_REVISAR ))
		{
			Contenedor.time = Contenedor.datosXML.temps * 60;
			this.titleClock  = new createjs.RichText();
			this.titleClock.font = "bold 10px Arial";
			this.titleClock.color = "#E1001A";
			this.titleClock.text = LangRes.lang[ LangRes.TIEMPORESTANTE ] ; //"TIEMPO RESTANTE";
			this.titleClock.y = this.CLOCK_TITLE_Y;
			this.titleClock.x = this.CLOCK_TITLE_X;
	
			Main.stage.addChild( this.titleClock);
			
			this.clock  = new createjs.RichText();
			this.clock.font =  "34px Arial";
			this.clock.color = "#E1001A";
			this.clock.text = "00:00";
			this.clock.y = this.CLOCK_Y ;
			this.clock.x = this.CLOCK_X ;
			
			Main.stage.addChild( this.clock);
			
			if( Scorm.modo == Scorm.MODO_EXAMEN ){
				
				var min= Math.floor( Contenedor.time / 60 );
				var seg = Contenedor.time - min * 60;
				min  = Utils.lPad( min.toString(), 2);
				seg  = Utils.lPad( seg.toString(), 2);
				this.clock.text = min+":"+seg;
				
				Contenedor.timer = setInterval(this.updateClock , 1000);
			}
		}
	}
	this.getTempsRevision = function()
	{
		var aRevisionTime = Contenedor.timeRevision.split(":");
		var iRevisionTime = parseInt( aRevisionTime[ 0 ] ) * 60 + parseInt( aRevisionTime[ 1 ] );
		if(Contenedor.datosXML.temps != "" && Contenedor.datosXML.temps > 0){
			var total = Contenedor.datosXML.temps * 60;
			var real =  total - iRevisionTime;
			
			if( real < 0 ) return "00:00";
			
			var min= Math.floor( real / 60 );
			var seg = real - min * 60;
			min  = Utils.lPad( min.toString(), 2);
			seg  = Utils.lPad( seg.toString(), 2);
			return min+":"+seg;
		}else{
			return "00:00";
		}
	}
	this.getTemps = function()
	{
		if(Contenedor.datosXML.temps != "" && Contenedor.datosXML.temps > 0){
			//var total = Contenedor.datosXML.temps * 60;
			//var real =  total - Contenedor.time;
			var real =  Contenedor.time;
			
			var min= Math.floor( real / 60 );
			var seg = real - min * 60;
			min  = Utils.lPad( min.toString(), 2);
			seg  = Utils.lPad( seg.toString(), 2);
			return min+":"+seg;
		}else{
			return "00:00";
		}
	}
	this.getTempsUsat = function(){
		if(Contenedor.datosXML.temps != "" && Contenedor.datosXML.temps > 0){
			var total = Contenedor.datosXML.temps * 60;
			var real =  total - Contenedor.time;
			
			var min= Math.floor( real / 60 );
			var seg = real - min * 60;
			min  = Utils.lPad( min.toString(), 2);
			seg  = Utils.lPad( seg.toString(), 2);
			return min+":"+seg;
		}else{
			return "00:00";
		}
	}
	this.updateClock = function(){

		if(Contenedor.time > 0)
		{
			Contenedor.time--;
			var min= Math.floor( Contenedor.time / 60 );
			var seg = Contenedor.time - min * 60;
			min  = Utils.lPad( min.toString(), 2);
			seg  = Utils.lPad( seg.toString(), 2);
			Contenedor.clock.text = min+":"+seg;
		}else{
			clearInterval(Contenedor.timer);
			
			//eliminem missatge
			if(Contenedor.missatge != ""){
				Main.stage.removeChild( Contenedor.missatge.contenedor );
				Contenedor.missatge = "";
			}
		
			Contenedor.missatge = new confirmaPanell( LangRes.lang[ LangRes.MSG_AGOTADOTIEMPO ] /*"Has agotado el tiempo. Si continúas, se almazenará la nota del ejercicio. Si reinicias, empezarás el ejercicio de nuevo"*/ );
			Contenedor.missatge.reiniciar.bt.on("mousedown", Contenedor.reiniciarHandler);
			Contenedor.missatge.corregir.bt.on("mousedown", Contenedor.corregirHandler );
			Motor.desactivar();
		}
	}
	

	this.drawSeparator = function()
	{
		if((Contenedor.datosXML.temps != "" && Contenedor.datosXML.temps > 0  &&  Scorm.modo == Scorm.MODO_EXAMEN ) 
			|| ( Contenedor.timeRevision != "" &&  Scorm.modo == Scorm.MODO_REVISAR ))
		{
			this.separador  = new createjs.Shape();
			this.separador.graphics.beginStroke("#C5C6C8").setStrokeStyle(1);
	 		this.separador.graphics.moveTo( this.SEPARATOR_X, this.SEPARATOR_Y );
			this.separador.graphics.lineTo( this.SEPARATOR_X, this.SEPARATOR_Y + this.SEPARATOR_HEIGHT );
	        this.separador.graphics.endStroke();
	        
	        Main.stage.addChild( this.separador );
       }
	}
	this.drawCalculator = function()
	{
		if(this.datosXML.calc == "1")
		{
			var btnSrc = new Image(); 
			btnSrc.src = pppPreloader.from("module", 'motor/images/calculadora.png');
			btnSrc.name = 'calc';
			this.calc = new createjs.Bitmap(btnSrc); 
			
			if( (Contenedor.datosXML.temps != "" && Contenedor.datosXML.temps > 0  &&  Scorm.modo == Scorm.MODO_EXAMEN ) 
			|| ( Contenedor.timeRevision != "" &&  Scorm.modo == Scorm.MODO_REVISAR ) ){
				this.calc.x = this.CALC_X1 + 4;
				this.calc.y = this.CALC_Y + 2;
			}else{
				this.calc.x = this.CALC_X2 + 4;
				this.calc.y = this.CALC_Y + 2;
			}
			this.calc.scaleX= 0.7;
			this.calc.scaleY= 0.7;
			
			this.calc.on("mousedown", this.calcHandler);
			this.calc.on("mouseover", function(){ document.body.style.cursor='pointer'; }, this);
			this.calc.on("mouseout", function(){ document.body.style.cursor='default'; }, this);
			Main.stage.addChild( this.calc);
			
			//dibiuxem calculadora fisica
			this.calcContenedor = new createjs.Container();
			this.calculadora = new createjs.DOMElementCustom('calculator', this.calcContenedor);
			
			if(Contenedor.datosXML.plataforma.grado == 1){

				this.calculadora.element_x = 1600;
				this.calculadora.element_y = 150;
				this.calculadora.element_width = 245;
				this.calculadora.element_height = 250;

			
				this.calculadora.x = this.calculadora.element_x ;
				this.calculadora.y = this.calculadora.element_y ;
				$(this.calculadora.htmlElement).css("width",230);
				$(this.calculadora.htmlElement).css("height", 225);
			}
			else{

				this.calculadora.element_x = 1600;
				this.calculadora.element_y = 150;
				this.calculadora.element_width = 425;
				this.calculadora.element_height = 345;

			
				this.calculadora.x = this.calculadora.element_x ;
				this.calculadora.y = this.calculadora.element_y ;
				$(this.calculadora.htmlElement).css("width",425);
				$(this.calculadora.htmlElement).css("height", 345);
			}
			$(Contenedor.calculadora.htmlElement).css("display", "none");
			this.calcContenedor.addChild(this.calculadora);

			Main.stage.addChild( this.calcContenedor );
		}
		else
		{
			this.calculadora = new createjs.DOMElementCustom('calculator', this.calcContenedor);
			$(this.calculadora.htmlElement).css("display","none");
		}
	}
	this.calcHandler = function(evt){

		if( evt.primary ){
			
			if( Contenedor.calculadora.element_x == 1600 ){
				$(Contenedor.calculadora.htmlElement).css("display", "inline");
				var lineH = $("#wrapper").css( 'line-height').substring(0, $("#stage").css('line-height').lastIndexOf('px') );

		    	var relacio = 0;
		    	if(lineH > $("#stage").attr('height'))
		    	{
		    		relacio= ( (lineH-$("#stage").attr('height')) / 2 )/ Main.scale;
		    	}
    	
				if( window.innerHeight> 1000 )	$(Contenedor.calculadora.htmlElement).css("top",(window.innerHeight - $("#stage").attr('height'))/2 + relacio )
	    		else	$(Contenedor.calculadora.htmlElement).css("top",relacio);

				$(Contenedor.calculadora.htmlElement).css("left",0);
				createjs.Tween.get(Contenedor.calculadora).to({element_x: 500, element_y: 150}, 1250, createjs.Ease.circOut);
			}else{
				$(Contenedor.calculadora.htmlElement).css("display", "none");
				Contenedor.calculadora.element_x = 1600;
				Contenedor.calculadora.element_y = 150;

				createjs.Tween.removeTweens(Contenedor.calculadora);
			}
		}
	}
	
	this.closeHandler = function(){
        if( Contenedor.calculadora.element_x == 1600 ){
            $(Contenedor.calculadora.htmlElement).css("display", "inline");
            createjs.Tween.get(Contenedor.calculadora).to({element_x: 500, element_y: 150}, 1250, createjs.Ease.circOut);
        }else{
            $(Contenedor.calculadora.htmlElement).css("display", "none");
            Contenedor.calculadora.element_x = 1600;
            Contenedor.calculadora.element_y = 150;

            createjs.Tween.removeTweens(Contenedor.calculadora);
        }
    }
	
	this.drawMoreInfo = function()
	{
		if(this.datosXML.masinfo.text != ""){
			var _imgLoaded = new Image(); 
			_imgLoaded.src = pppPreloader.from("module", 'motor/images/mesInfo.png');
			_imgLoaded.name = 'tancar';
	
			var data = {
			    images: [_imgLoaded],
			    frames: { width: this.MOREINFO_SIZE , height: this.MOREINFO_SIZE },
			    animations: { normal: [0], hover: [1] }
			};
			var spriteSheet = new createjs.SpriteSheet(data);
			this.mesInfo = new createjs.Sprite(spriteSheet);
			
			// the code block in this helper.addEventListener (It works with button.addEventListener)
			this.mesInfo.on("mouseover", function(evt){ this.gotoAndStop("hover");});
			this.mesInfo.on("mouseout", function(evt){ this.gotoAndStop("normal");});
			this.mesInfo.on("mousedown", this.masInfoHandler);
			//console.log("["+Contenedor.timeRevision+"]")
			if((Contenedor.datosXML.temps != "" && Contenedor.datosXML.temps > 0  &&  Scorm.modo == Scorm.MODO_EXAMEN ) 
			|| ( Contenedor.timeRevision != "" &&  Scorm.modo == Scorm.MODO_REVISAR )){
				this.mesInfo.x = this.MOREINFO_X1;
				this.mesInfo.y = this.MOREINFO_Y;
			}else{
				this.mesInfo.x = this.MOREINFO_X2;
				this.mesInfo.y = this.MOREINFO_Y;
			}
			this.mesInfo.gotoAndStop("normal");
			Main.stage.addChild( this.mesInfo );
			
			this.mesInfo.on("mouseover", function(){ document.body.style.cursor='pointer'; }, this);
			this.mesInfo.on("mouseout", function(){ document.body.style.cursor='default'; }, this);
					
			if( this.datosXML.masinfo.inicio == "1")
				setTimeout(function(){ Contenedor.masInfoHandler(null); }, 500); 
				
			if( !$( "#input_moreInfo" ).length ){
    			texto = Utils.cleanText(Contenedor.datosXML.masinfo.text);
                this.$inputText = $('<div id="input_moreInfo" style="display:none;"><span class="spanMoreInfo">' + texto + '</span></div>');
                this.$inputText.focusout(function(event){ $("body").focus(); });
                $("#mediaHolder").append(this.$inputText);
            }
		}
	}
	this.masInfoHandler = function(evt){
		//alert("mas info");
		if( evt.primary ){
			if( Contenedor.moreinfopanel == "" )
			{
				Contenedor.moreinfopanel = new moreInfoPanell( Contenedor.datosXML.masinfo.text );
				$(Contenedor.$inputText).css("display","inline" );
				Contenedor.moreinfopanel.contenedor.on("mousedown", Contenedor.tancarMasInfoHandler);
				Main.stage.setChildIndex ( Contenedor.moreinfopanel.contenedor,  Main.stage.getNumChildren() );
				Motor.hideDomObjects();
			}
		}
	}
	this.tancarMasInfoHandler  = function(evt)
	{
		if( evt.primary ){
			Main.stage.removeChild(Contenedor.moreinfopanel.contenedor);
			$(Contenedor.$inputText).css("display","none" );
			Contenedor.moreinfopanel = "";
			Motor.showDomObjects(); 
		}
	}
	this.drawTitleActivity = function()
	{
		this.title_exercici = new createjs.RichText();
		this.title_exercici.font = (Contenedor.datosXML.plataforma.grado == 1)? "20px Arial" : "18px Arial" ;
		this.title_exercici.color = "#0D3158";
		this.title_exercici.fontSize = 20; 
		this.title_exercici.text = Contenedor.datosXML.enunciado;
		this.title_exercici.y = this.TITLE_ACT_Y ;
		this.title_exercici.x = this.TITLE_ACT_X;
		this.title_exercici.lineWidth = this.TITLE_ACT_W;
		this.title_exercici.lineHeight = this.TITLE_ACT_H;
		this.title_exercici.mask = new createjs.Shape();
		this.title_exercici.mask.graphics.beginFill("#fff").drawRect(0,0,this.TITLE_ACT_W, 50);
		this.title_exercici.mask.y = this.TITLE_ACT_Y - 1;
		this.title_exercici.mask.x = this.TITLE_ACT_X;
		Main.stage.addChild( this.title_exercici);
	}
	this.drawTancar = function()
	{
		var btnSrc = new Image(); 
		btnSrc.src = pppPreloader.from("module", 'motor/images/tancar.png');
		btnSrc.name = 'tancar';
		this.tancar = new createjs.Bitmap(btnSrc); 
		this.tancar.x = this.TANCAR_X ;
		this.tancar.y = this.TANCAR_Y;
		this.tancar.on("mousedown", this.tancarGHandler);
		this.tancar.on("mouseover", function(){ document.body.style.cursor='pointer'; }, this);
		this.tancar.on("mouseout", function(){ document.body.style.cursor='default'; }, this);
		Main.stage.addChild( this.tancar);	
	}
	this.tancarGHandler = function(evt)
	{
 		aulaPlaneta.SCORM.ejercicio_cerrar();
	}
	this.drawTitle = function()
	{
		this.title_motor = new createjs.RichText();
		this.title_motor.font = "15px Arial";
		this.title_motor.color = "#fff";
		this.title_motor.text = Contenedor.datosXML.plataforma.titulo;
		this.title_motor.y = this.TITLE_MOTOR_Y  ;
		this.title_motor.x = this.TITLE_MOTOR_X ;
		Main.stage.addChild( this.title_motor);
		
	}
	this.drawPlaneta = function()
	{
		this.title_planeta_1 = new createjs.RichText();
		this.title_planeta_1.font = "22px Arial";
		this.title_planeta_1.color = "#fff";
		this.title_planeta_1.text = "aula";
		this.title_planeta_1.y = this.PLANETA_Y ;
		this.title_planeta_1.x = this.PLANETA_X;
		Main.stage.addChild( this.title_planeta_1);
		
		this.title_planeta_2 = new createjs.RichText();
		this.title_planeta_2.font = "22px Arial";
		this.title_planeta_2.color = "#009ee0";
		this.title_planeta_2.text = "Planeta";
		this.title_planeta_2.y = this.PLANETA_Y ;
		this.title_planeta_2.x = this.PLANETA_X2 ;
		Main.stage.addChild( this.title_planeta_2);
		
		var btnSrc = new Image(); 
		btnSrc.src = pppPreloader.from("module", 'motor/images/planeta.png');
		btnSrc.name = 'logo';
		this.logo_planeta= new createjs.Bitmap(btnSrc); 
		this.logo_planeta.x = this.LOGO_PLANETA_X;
		this.logo_planeta.y = this.LOGO_PLANETA_Y;
		this.logo_planeta.scaleX = this.LOGO_PLANETA_SCALE;
		this.logo_planeta.scaleY = this.LOGO_PLANETA_SCALE;
		Main.stage.addChild( this.logo_planeta);
	}
	this.drawFonsTitol = function()
	{
		this.fonsTitol = new createjs.Shape();
 		this.fonsTitol.graphics.beginFill("#fff").drawRect(0, 0, Main.stage_width, this.FONS_TITLE_HEIGHT);
        this.fonsTitol.x = 0;
        this.fonsTitol.y = this.FONS_TITLE_Y;
        
        Main.stage.addChild( this.fonsTitol);
	}
	
	this.drawFonsGeneral = function()
    {
    	this.fonsGeneral = new createjs.Shape();
 		this.fonsGeneral.graphics.beginFill("#0D3158").drawRoundRect(0, 0, Main.stage_width, Main.stage_height, 10);
        this.fonsGeneral.x = 0;
        this.fonsGeneral.y = 0;

        Main.stage.addChild( this.fonsGeneral);
    }
    this.checkPagina = function( ){
    	Contenedor.missatge.checkedCurrentPag();
    }
	this.drawFonsMotor = function()
    {
    	this.fons = new createjs.Shape();
 		this.fons.graphics.beginFill("#fde8c2").drawRect(0, 0, Main.stage_width, this.FONS_MOTOR_H );
        this.fons.x = 0;
        this.fons.y = this.MOTOR_Y;
        
        Main.stage.addChild( this.fons);
    }
}