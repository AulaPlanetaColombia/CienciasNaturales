// boto de panells inferiors
function Boton( _width, _height, src, label, align) {
	
  	this.width = _width;
  	this.height = _height;
	
	// crear imatge del boto
	var _imgLoaded = new Image(); 
	_imgLoaded.src = pppPreloader.from("module", src);

	// carregar imatage del boto
	var data = {
	    images: [_imgLoaded],
	    frames: { width: _width, height: _height},
	    animations: { normal: [0], hover: [1] }
	};
	//crear boto
	var spriteSheet = new createjs.SpriteSheet(data);
	this.bt = new createjs.Sprite(spriteSheet);
	
	// Events de over i out
	this.bt.on("mouseover", function(evt){ this.gotoAndStop("hover"); document.body.style.cursor='pointer'; });
	this.bt.on("mouseout", function(evt){ this.gotoAndStop("normal"); document.body.style.cursor='default'; });

	//posicio boto
	//this.bt.x = 815;
	//this.bt.y = 48;
	//estat de boto
	this.bt.gotoAndStop("normal");
	
	//label boto
	this.label = new createjs.RichText();
 	this.label.font = "bold 12px Arial";
	this.label.color = "#0D3158";
	this.label.text = label;
	this.label.mouseEnabled = false;
	
	if(align == "left") this.label.x = 10;
	else if(align == "center") this.label.x = ( _width - this.label.getMeasuredWidth() ) / 2;
	
	this.label.y = 7;
	
	this.contenedor =  new createjs.Container();
	this.contenedor.addChild(this.bt);
	this.contenedor.addChild(this.label);
 }
 // Panell de mes informació
 function moreInfoPanell( texto )
 {
 	//crear fons general
 	this.fons = new createjs.Shape();
 	this.fons.graphics.beginFill("#000").drawRect(0, 0, 950, 567);
 	this.fons.y = 41; 	this.fons.alpha = 0.2;
 	
 	// crear fons superior
 	this.banda_superior = new createjs.Shape();
 	this.banda_superior.graphics.beginFill("#0D3158").drawRect(0, 0, 650, 32);
 	this.banda_superior.x = 150;
 	this.banda_superior.y = 100;
 	
 	//crear fons central
 	this.banda_central= new createjs.Shape();
 	this.banda_central.graphics.beginFill("#fff").drawRect(0, 0, 650, 405);
 	this.banda_central.x = 150;
 	this.banda_central.y = 132;
 	
 	//crear fons inferior
 	this.banda_inferior = new createjs.Shape();
 	this.banda_inferior.graphics.beginFill("#0D3158").drawRect(0, 0, 650, 13);
 	this.banda_inferior.x =150 ;
 	this.banda_inferior.y =537;
 	
 	//crear boto tancar
 	var btnSrc = new Image(); 
	btnSrc.src = pppPreloader.from("module", 'motor/images/tancar.png');
	btnSrc.name = 'tancar';
	this.tancar = new createjs.Bitmap(btnSrc); 
	this.tancar.x = 773;
	this.tancar.y = 105;

 	
 	// crear titol del more info
 	this.titol = new createjs.RichText();
 	this.titol.font = "18px Arial";
	this.titol.color = "#fff";
	this.titol.text = LangRes.lang[ LangRes.MASINFORMACION ];//"Más información";
	this.titol.x = 160;
	this.titol.y = 105;
	this.titol.lineWidth = 600;
	//this.text.lineHeight = 20;
	this.titol.mouseEnabled = false;
 	
 	// creem texte d info de more infor
 	/*this.contingut = new createjs.RichText();
 	this.contingut.font = "18px Arial";
	this.contingut.color = "#0D3158";
	this.contingut.text = texto;
	this.contingut.x = 160;
	this.contingut.y = 140;
	
	//creem mascara per evitar que texte sobrepassi capa
	this.contingut.mask = new createjs.Shape();
	this.contingut.mask.graphics.beginFill("#fff").drawRect(0, 0, 650, 405);
	this.contingut.mask.x = 150;
 	this.contingut.mask.y = 132;
 	
	this.contingut.lineWidth = 628;
	this.contingut.lineHeight = 21;
	this.contingut.mouseEnabled = false;*/
 	
 	//creem contenidor principal
 	this.contenedor = new createjs.Container();
 	this.contenedor.x = 0;
	this.contenedor.y = 0;
	
	this["inputDOM0"] = new createjs.DOMElementCustom("input_moreInfo", this.contenedor);
    this["inputDOM0"].element_x = 160;
    this["inputDOM0"].element_y = 140;
    this["inputDOM0"].fontsize = 18;
    this["inputDOM0"].element_width = 615;
    this["inputDOM0"].element_height = 370;
    this["inputDOM0"].x = this["inputDOM0"].element_x ;
    this["inputDOM0"].y = this["inputDOM0"].element_y ;
    $(this["inputDOM0"].htmlElement).css("width",this["inputDOM0"].element_width);
    $(this["inputDOM0"].htmlElement).css("height",this["inputDOM0"].element_height );    
    this.contenedor.addChild( this["inputDOM0"]);
	
	
	// inserir elements en el contenidor principal
	this.contenedor.addChild( this.fons );
	this.contenedor.addChild( this.banda_superior );
	this.contenedor.addChild( this.banda_central );
	this.contenedor.addChild( this.banda_inferior );
	this.contenedor.addChild( this.tancar );
	this.contenedor.addChild( this.titol );
	this.contenedor.addChild( this.contingut );
 	
 	// posem el contenidor principal en el canvas i transicio de alpha 	
 	Main.stage.addChild( this.contenedor );
	this.contenedor.alpha =0;
	createjs.Tween.get(this.contenedor).to({alpha:1}, 1250, createjs.Ease.circOut);
 }
 // Panell inferior amb missatge per l'usuari
 function missatgePanell( texto )
 {
 	// creem fons principal
 	this.fons = new createjs.Shape();
 	this.fons.graphics.beginFill("#f8B334").drawRect(0, 0, 950, 51);
 	//creem text del missatge
 	this.text = new createjs.RichText();
 	this.text.font = "15px Arial";
	this.text.color = "#333333";
	this.text.text = texto;
	this.text.x = 15;
	this.text.y = (texto.length < 75) ? 15 : 8 ;
	this.text.lineWidth = 530;
	this.text.lineHeight = 20;
	this.text.mouseEnabled = false;
 	// creem contenidor principal
 	this.contenedor = new createjs.Container();
 	this.contenedor.x = 0;
	this.contenedor.y = 558;
 	// creem botons i els posicionem
 	this.aceptar = new Boton(144,28,pppPreloader.from("module", 'motor/images/btnAceptar.png'), LangRes.lang[ LangRes.ACEPTAR ],"center");
 	this.cancelar = new Boton(144,28,pppPreloader.from("module", 'motor/images/btnCancelar.png'), LangRes.lang[ LangRes.CANCELAR ],"center");
 	
 	this.cancelar.contenedor.x = 796;
 	this.cancelar.contenedor.y = 12;
 	
 	this.aceptar.contenedor.x = 650; 
 	this.aceptar.contenedor.y = 12;
 	// posem els botons i texte en el contenidor principal
 	this.contenedor.addChild( this.fons );
 	this.contenedor.addChild( this.text );
 	this.contenedor.addChild( this.aceptar.contenedor );
 	this.contenedor.addChild( this.cancelar.contenedor );
 	//posem contenidor principal en canvas
 	Main.stage.removeChild(Contenedor.missatge.contenedor);
 	Main.stage.addChild( this.contenedor );
	this.contenedor.alpha =0;
	createjs.Tween.get(this.contenedor).to({alpha:1}, 1250, createjs.Ease.circOut);
 }
 // Panell inferior de confimació d'acció
 function confirmaPanell( texto )
 {
 	// creem fons del panell
 	this.fons = new createjs.Shape();
 	this.fons.graphics.beginFill("#f8B334").drawRect(0, 0, 950, 51);
 	// creem texte del panell
 	this.text = new createjs.RichText();
 	this.text.font = "15px Arial";
	this.text.color = "#333333";
	this.text.text = texto;
	this.text.x = 15;
	this.text.y = 8 ;
	this.text.lineWidth = 530;
	this.text.lineHeight = 20;
	this.text.mouseEnabled = false;
 	// creem contenidor principal del panell
 	this.contenedor = new createjs.Container();
 	this.contenedor.x = 0;
	this.contenedor.y = 558;
 	// creem botons del panell
 	this.corregir = new Boton( 144, 28, pppPreloader.from("module", 'motor/images/btnCorregir.png'), LangRes.lang[ LangRes.CORREGIR ],"center");
 	this.reiniciar = new Boton( 144, 28, pppPreloader.from("module", 'motor/images/btnReiniciar.png'), LangRes.lang[ LangRes.REINICIAR ],"center");
 	
 	this.reiniciar.contenedor.x = 796;
 	this.reiniciar.contenedor.y = 12;
 	
 	this.corregir.contenedor.x = 650; 
 	this.corregir.contenedor.y = 12;
 	// insertem botons en el contenidor
 	this.contenedor.addChild( this.fons );
 	this.contenedor.addChild( this.text );
 	this.contenedor.addChild( this.reiniciar.contenedor );
 	this.contenedor.addChild( this.corregir.contenedor );
 	// insertem contenidor en el canvas
 	Main.stage.removeChild(Contenedor.missatge.contenedor);
	Main.stage.addChild( this.contenedor );
	this.contenedor.alpha =0;
	createjs.Tween.get(this.contenedor).to({alpha:1}, 1250, createjs.Ease.circOut);
 }
 // Panell inferior d ela pantalla de validacio i resultats del motor
 function resultatsPanell( correctes, total, temps)
 {
 	//  creem fons del panell
 	this.fons = new createjs.Shape();
 	this.fons.graphics.beginFill("#f8B334").drawRect(0, 0, 950, 51);
 	// creem texte part 1 de resultats
 	this.text1 = new createjs.RichText();
 	this.text1.font =  "bold 16px Arial";
	this.text1.color = "#0D3158";
	this.text1.text = LangRes.lang[ LangRes.RESPCORRECTAS ];//"Respuestas correctas: ";
	this.text1.x = 15;
	this.text1.y = 16 ;
	// creem texte correctes de resultats
	this.correctes = new createjs.RichText();
	this.correctes.font = "34px Arial";
	this.correctes.color = "#41A62A";
	this.correctes.text = correctes.toString();
	this.correctes.x = (correctes.toString().length ==1)? 200 : 188;
	this.correctes.y = 6 ;
	// creem texte part 2 de resultats
	this.text2 = new createjs.RichText();
 	this.text2.font =  "14px Arial";
	this.text2.color = "#0D3158";
	this.text2.text = LangRes.lang[ LangRes.RESPCORRECTAS_DE ];//"de";
	this.text2.x = 230;
	this.text2.y = 17 ;
	// creem texte totals de resultats
	this.totals = new createjs.RichText();
	this.totals.font = "34px Arial";
	this.totals.color = "#0D3158";
	this.totals.text = total.toString();
	this.totals.x = 256;
	this.totals.y = 6 ;
	
	// creem texte part 3 de resultats
	this.text3 = new createjs.RichText();
 	this.text3.font =  "bold 16px Arial";
	this.text3.color = "#0D3158";
	this.text3.text = LangRes.lang[ LangRes.PUNTUACION ]; //"Puntuación: ";
	this.text3.x = 300;
	this.text3.y = 16;
	// creem texte punts de resultats
	this.punts = new createjs.RichText();
	this.punts.font = "34px Arial";
	this.punts.color = "#0D3158";
	
	//calculem decimals de puntuacio
	var puntuacio = correctes / total * 10;
	var enter = Math.floor(puntuacio);
	var decimals = puntuacio - enter;
	if( decimals == 0) this.punts.text = puntuacio.toString();
	else this.punts.text = puntuacio.toFixed(1).toString().replace(".",",");
	
	this.punts.x = 400;
	this.punts.y = 6 ;
	
	//creem contenidor
	this.contenedor = new createjs.Container();
 	this.contenedor.x = 0;
	this.contenedor.y = 558;
 	//creem botons
 	this.aceptar = new Boton(144,28,pppPreloader.from("module", 'motor/images/btnAceptar.png'), LangRes.lang[ LangRes.ACEPTAR ],"center");
 	
 	this.aceptar.contenedor.x = 796; 
 	this.aceptar.contenedor.y = 14;
 	// inserim elements al contenidor 	
 	this.contenedor.addChild( this.fons );
 	this.contenedor.addChild( this.text1 );
 	this.contenedor.addChild( this.correctes );
 	this.contenedor.addChild( this.totals );
 	this.contenedor.addChild( this.punts );
 	
 	this.contenedor.addChild( this.text2 );
 	this.contenedor.addChild( this.text3 );
 	
 	this.contenedor.addChild( this.aceptar.contenedor );
 	
 	// si motor te temporitzador mostrem el segons emprats
	if((Contenedor.datosXML.temps != "" && Contenedor.datosXML.temps > 0  &&  Scorm.modo == Scorm.MODO_EXAMEN ) 
			|| ( Contenedor.timeRevision != "" &&  Scorm.modo == Scorm.MODO_REVISAR ))
	{
		this.text4 = new createjs.RichText();
	 	this.text4.font =  "bold 16px Arial";
		this.text4.color = "#0D3158";
		this.text4.text =  LangRes.lang[ LangRes.TIEMPOEMPLEADO ]; //"Tiempo empleado: ";
		this.text4.x = 480;
		this.text4.y = 16;
		
		this.temps = new createjs.RichText();
		this.temps.font = "34px Arial";
		this.temps.color = "#0D3158";
		this.temps.text = temps;
		this.temps.x = 625;
		this.temps.y = 6 ;
		
		this.contenedor.addChild( this.temps );
		this.contenedor.addChild( this.text4 );
	}
	// inserim contenidor en el canvas amb transicio
 	Main.stage.removeChild(Contenedor.missatge.contenedor);
	Main.stage.addChild( this.contenedor );
	this.contenedor.alpha =0;
	createjs.Tween.get(this.contenedor).to({alpha:1}, 1250, createjs.Ease.circOut);
 }
 // Panell inferior de la pantalla de solucio del motor
 function solucioPanell( numpagines )
 {
 	// creem fons de motor
 	this.fons = new createjs.Shape();
 	this.fons.graphics.beginFill("#0D3158").drawRect(0, 0, 950, 51);
 	// creem contenidor
 	this.contenedor = new createjs.Container();
 	this.contenedor.x = 0;
	this.contenedor.y = 558;
	// configuremm dades de paginació
	this.currentPag= Motor.currentNumPag;
	this.numPagines = numpagines;
 	//creem botons del panell
 	this.reintentar = new Boton( 146, 29, pppPreloader.from("module", 'motor/images/btnRestaurar.png'), LangRes.lang[ LangRes.REINTENTAR ],"left");
 	this.solucio = new Boton( 148, 29, pppPreloader.from("module", 'motor/images/btnSolucio.png'), LangRes.lang[ LangRes.SOLUCION ],"left");
 	
 	this.solucio.contenedor.x = 786;
 	this.solucio.contenedor.y = 12;
 	
 	this.reintentar.contenedor.x = 15; 
 	this.reintentar.contenedor.y = 12;
 	// afegim components al contenidor principal
 	this.contenedor.addChild( this.fons );
 	this.contenedor.addChild( this.text );
 	this.contenedor.addChild( this.solucio.contenedor );
 	
 	if( Scorm.modo != Scorm.MODO_REVISAR )
 		this.contenedor.addChild( this.reintentar.contenedor );
 	
 	
 	this.pagines ="";

	if( this.numPagines > 1 ){ // si tenim més d'una pagina mostrem la paginacio
 		//creem paginador
 		this.pagines = new Paginador(this.numPagines);
 		this.pagines.contenedor.x =315;
 		this.pagines.contenedor.y = 11;
 		// creem boto seguent pagina
 		this.seguent = new Boton(144,28,pppPreloader.from("module", 'motor/images/btnSeguent.png'), LangRes.lang[ LangRes.SIGUIENTE ],"left");
 		this.seguent.contenedor.x = 285 + this.numPagines*31 + 40; 
 		this.seguent.contenedor.y = 12;
 		// afegim components a contenidor principal
 		this.contenedor.addChild( this.pagines.contenedor );
 		this.contenedor.addChild( this.seguent.contenedor );
 		//seleccionem pagina actual
 		this.pagines.pags[this.currentPag].state("select"); 
 		if(this.currentPag == this.numPagines - 1) this.seguent.contenedor.visible = false;
 	}
 	//posem contenidor al canvas amb transició
 	Main.stage.removeChild(Contenedor.missatge.contenedor);
	Main.stage.addChild( this.contenedor );
	this.contenedor.alpha =0;
	createjs.Tween.get(this.contenedor).to({alpha:1}, 1250, createjs.Ease.circOut);
	
	if(this.numPagines > 1)
 	{
 		//validació de estat de pagina (correcte / incorrecte)
		this.validaPags();
		// seleccionem pagina actual
		this.selectPag(this.currentPag+1);
	}
 }
 //funcio de seleccio de pagina
 solucioPanell.prototype.selectPag = function(numpag){
 	// posem estat de selecionat
	this.pagines.pags[numpag-1].state("select");
	this.currentPag = numpag-1;

	//amaguem o mostrem el boto de seguent
	if(this.currentPag < this.numPagines - 1) this.seguent.contenedor.visible = true;
	if(this.currentPag == this.numPagines - 1) this.seguent.contenedor.visible = false;
	//posem fons vermell
	
	if(Motor.pagines[this.currentPag].validacio) this.pagines.pags[this.currentPag].numero.color = "#41A62A";
	else this.pagines.pags[numpag-1].numero.color = "#E1001A";
 }
 // funcio de deselecció de pagina
 solucioPanell.prototype.unselectCurrentPag = function(){
 	// Al deseleccionar pagina mirem si es correcte o incorrecte per posar fons.
	if(Motor.pagines[this.currentPag].validacio){
		this.pagines.pags[this.currentPag].state("correct");
	}
	else{
		this.pagines.pags[this.currentPag].state("error");
	}
	//posem boto blau
	this.pagines.pags[this.currentPag].numero.color = "#0D3158";
 }
 // funcio de pagina seguent
 solucioPanell.prototype.seguentPag = function(){
	if( this.currentPag < this.numPagines - 1 )
	{
		//deseleccionem pagina anterior
		this.unselectCurrentPag();
		
		//seleccionem nova pagina
		this.currentPag++;
		this.pagines.pags[this.currentPag].state("select"); 
		this.pagines.pags[this.currentPag].numero.color = "#E1001A";
		
		// amaguem boto de seguent si s'escau
		if(this.currentPag == this.numPagines - 1) this.seguent.contenedor.visible = false;
	}
 }
 // funcio que posar fons en funció de la validació de la pagina
 solucioPanell.prototype.validaPags = function(){
	for( key in Motor.pagines)
	{
		if(Motor.pagines[key].validacio){
			this.pagines.pags[key].state("correct");
		}
		else{
			this.pagines.pags[key].state("error");
		}
	}
 }
 
 // boto de pagina
 function PagBase(index, src)
 {
 	this.bt = new createjs.Container();
	this.num = index + 1;
	this.contestada = 0;
	//fons de la pagina
	this.fons = new createjs.Shape();
	this.src = src;
	if(src == "inici")
		this.fons.graphics.beginFill("#556f8a").drawRoundRectComplex (1, 1, 28, 28, 6,0,0,6);
	else if(src == "fi")
		this.fons.graphics.beginFill("#556f8a").drawRoundRectComplex (1, 1, 28, 28, 0,6,6,0);
	else
		this.fons.graphics.beginFill("#556f8a").drawRoundRectComplex (1, 1, 28, 28, 0,0,0,0);

	//numero de pagina
	this.numero = new createjs.RichText();
	this.numero.font = "18px Arial";
	this.numero.color = "#0D3158";
	this.numero.text = this.num.toString();
	this.numero.x = (this.num.toString().length == 1) ? 10 : 4;
	this.numero.y = 6;
	this.numero.mouseEnabled = false;
	// afegim components al contenidor
	this.bt.addChild(this.fons);
	this.bt.addChild(this.numero);

	this.bt.on("mouseover", function(evt) {
		document.body.style.cursor = 'pointer';
	});
	this.bt.on("mouseout", function(evt) {
		document.body.style.cursor = 'default';
	});
 }
 PagBase.prototype.state = function(estat){
	
	this.fons.graphics.clear();
	var color ="";
	
	if(estat=="normal")	color = "#556f8a";
	else if(estat=="select")color = "#f8b334";
	else if(estat=="correct") color = "#41a62a";
	else if(estat=="error")	color = "#e1061a";
	else if(estat=="buit") color = "#fff";	

	if(this.src == "inici")
		this.fons.graphics.beginFill(color).drawRoundRectComplex (1, 1, 28, 28, 6,0,0,6);
	else if(this.src == "fi")
		this.fons.graphics.beginFill(color).drawRoundRectComplex (1, 1, 28, 28, 0,6,6,0);
	else
		this.fons.graphics.beginFill(color).drawRoundRectComplex (1, 1, 28, 28, 0,0,0,0);
}
 //Bloc de botons de pagines
 function Paginador(numpagines)
 {
 	this.contenedor = new createjs.Container();
 	this.pags = new Array();

 	for(i = 0; i < numpagines; i++)// segons el numero de pagines
 	{
 		var pag ="";
 		//creem tipus de boto de paginas
 				if (i == 0)
			pag = new PagBase(i, 'inici'); //pppPreloader.from("module",  /*'motor/images/paginacioIni.png'*/));
		else if (i == numpagines - 1)
			pag = new PagBase(i, 'fi'); //pppPreloader.from("module", /*'motor/images/paginacioFi.png'*/));
		else
			pag = new PagBase(i, 'mig'); //pppPreloader.from("module", x/*'motor/images/paginacio.png'*/));
 		//coloquem pagina
 		pag.bt.x= i*30;
 		pag.bt.y = 0;
 		//afegim pagina al contenidor i a la collecció
 		this.contenedor.addChild(pag.bt);
 		this.pags.push(pag);	
 	}
 }
 // Panell inicial amb la poginació
 function inicialPanell( numpagines )
 {
 	//creem fons
 	this.fons = new createjs.Shape();
 	this.fons.graphics.beginFill("#0D3158").drawRect(0, 0, 950, 51);
 	//setegem dades paginacio
 	this.currentPag= Motor.currentNumPag;
 	this.numPagines = numpagines;
 	//creem contenidor principal
 	this.contenedor = new createjs.Container();
 	this.contenedor.x = 0;
	this.contenedor.y = 558;
 	//creem botons
 	this.validar = new Boton(146,29,pppPreloader.from("module", 'motor/images/btnRestaurar.png'), LangRes.lang[ LangRes.REINTENTAR ],"left");
 	this.corregir = new Boton(146,28,pppPreloader.from("module", 'motor/images/btnValidar.png'), LangRes.lang[ LangRes.CORREGIR ],"left");
 	
 	this.validar.contenedor.x = 25;
 	this.validar.contenedor.y = 12;
 	
 	this.corregir.contenedor.x = 169; 
 	this.corregir.contenedor.y = 12;
 	
 	this.pagines = "";
 	if( this.numPagines > 1 ){// si hi ha més d'una pagina
 		//creem poginació
 		this.pagines = new Paginador(this.numPagines);
 		this.pagines.contenedor.x =330;
 		this.pagines.contenedor.y = 11;
 		//creem boto seguent
 		this.seguent = new Boton(144,28,pppPreloader.from("module", 'motor/images/btnSeguent.png') , LangRes.lang[ LangRes.SIGUIENTE ],"left");
 		this.seguent.contenedor.x = 300 + this.numPagines*31 + 40; 
 		this.seguent.contenedor.y = 12;
 		if(this.currentPag == this.numPagines - 1) this.seguent.contenedor.visible = false;
 	}
 	//afegim components al contenidor
 	this.contenedor.addChild( this.fons );
 	this.contenedor.addChild( this.text );
 	this.contenedor.addChild( this.validar.contenedor );
 	this.contenedor.addChild( this.corregir.contenedor );
 	
 	if( this.numPagines > 1 )
 	{
 		//Afegim components de la paginació al contenidor
 		this.contenedor.addChild( this.pagines.contenedor );
 		this.contenedor.addChild( this.seguent.contenedor );
 		this.pagines.pags[this.currentPag].state("select"); 
 	}
	
	//afegim contenidor al canvas amb transicio
 	Main.stage.removeChild(Contenedor.missatge.contenedor);
	Main.stage.addChild( this.contenedor );
	this.contenedor.alpha = 0;
	createjs.Tween.get(this.contenedor).to({alpha:1}, 1250, createjs.Ease.circOut);
 }
 //funcio seleccio de pagina
 inicialPanell.prototype.selectPag = function(numpag){
	//selecionem fons del boto de paginacio
	this.pagines.pags[numpag-1].state("select");
	this.currentPag = numpag-1;
	//Eliminem boto de seguen si cal
	if(this.currentPag < this.numPagines - 1) this.seguent.contenedor.visible = true;
	if(this.currentPag == this.numPagines - 1) this.seguent.contenedor.visible = false;
 }
 //funció de seleccio de pagina
 inicialPanell.prototype.unselectCurrentPag = function(){
 	// si la pregunta de la pagina deseleccionada esta constestada o no mostrem un fons o un altre
 	if( this.pagines.pags[this.currentPag].contestada == 0 )
		this.pagines.pags[this.currentPag].state("normal");
	else 
		this.pagines.pags[this.currentPag].state("buit");
 }
 //funció de posar la pagina com a contestada
 inicialPanell.prototype.checkedCurrentPag = function(){
	this.pagines.pags[this.currentPag].contestada = 1; //.state("buit");
 }
 // per pasar a la pagina seguent
 inicialPanell.prototype.seguentPag = function(){
	if( this.currentPag < this.numPagines - 1 ) // si no estem a la ultima pagina
	{
		//seleccionem pagina anterior
		this.unselectCurrentPag();	
		//seleccionem pagina seguent	
		this.currentPag++;
		this.pagines.pags[this.currentPag].state("select"); 
		
		//amaguem el boto de seguent si estem a la ultima pagina
		if(this.currentPag == this.numPagines - 1) this.seguent.contenedor.visible = false;
	}
 }
 