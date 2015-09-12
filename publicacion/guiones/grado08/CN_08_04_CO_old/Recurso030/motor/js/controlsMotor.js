function Pagina( pregunta, _numpagina) {
  
    this.numpagina  = _numpagina;
    this.index = pregunta.id;
	//debugger;
    this.enunciat = new createjs.RichText();
    this.enunciat.text = pregunta.enunciado;    
    this.enunciat.font = (Contenedor.datosXML.plataforma.grado == 1)? "19px Arial" : "17px Arial";
	this.enunciat.fontSize = 26;
	this.enunciat.color = "#0D3158";
	this.enunciat.x = 15;
	this.enunciat.y = 10 ;
	this.enunciat.lineWidth = 900;
	this.enunciat.lineHeight = 22;
	this.enunciat.mouseEnabled = false;
	
	this.validacio = true;
  
    this.contenedor = new createjs.Container();
    this.contenedor.addChild( this.enunciat );
    
   	this.teclat = new Teclat(this);
   	this.teclat.contenedor.x = 100;
	this.teclat.contenedor.y = 170 ;
   	this.contenedor.addChild(this.teclat.contenedor);
   	
   
   	this.palabra = new PalabraBox( pregunta.palabra, pregunta.visibles, this );
   	this.palabra.contenedor.x = (950 - this.palabra.fons.getBounds().width)/2;
	this.palabra.contenedor.y = 75 ;
   	this.contenedor.addChild(this.palabra.contenedor);
   	
   	this.ahorcado = new Ahorcado(this);
   	this.ahorcado.contenedor.x = 565;
	this.ahorcado.contenedor.y = 175;
	this.ahorcado.contenedor.scaleX *= 0.8;
	this.ahorcado.contenedor.scaleY *= 0.8;
   	this.contenedor.addChild(this.ahorcado.contenedor);
   	
   	//preMorir dependiendo de los intentos
   	this.ejecutado = false;
   
}

function Ahorcado( pagina)
{
	this.estat = 0;
	this.c0 = new createjs.Shape();
	this.c0.graphics.beginFill("#000").drawRect(0, 225, 150, 8);
	this.c1 = new createjs.Shape();
	this.c1.graphics.beginFill("#000").drawRect(70, 10, 8, 215);
	this.c2 = new createjs.Shape();
	this.c2.graphics.beginFill("#000").drawRect(70, 10, 150, 8);
	this.c3 = new createjs.Shape();
	this.c3.graphics.beginFill("#000").drawRect(205, 10, 4, 30);
	this.c4= new createjs.Bitmap(pppPreloader.from("module", 'motor/images/1.png'));
	this.c4.x = 186;
	this.c4.y = 38;
	this.c5= new createjs.Bitmap(pppPreloader.from("module", 'motor/images/2.png'));
	this.c5.x = 206;
	this.c5.y = 66;
	this.c6= new createjs.Bitmap(pppPreloader.from("module", 'motor/images/3.png'));
	this.c6.x = 214;
	this.c6.y = 93;
	this.c7= new createjs.Bitmap(pppPreloader.from("module", 'motor/images/4.png'));
	this.c7.x = 159;
	this.c7.y = 95;
	this.c8= new createjs.Bitmap(pppPreloader.from("module", 'motor/images/5.png'));
	this.c8.x = 180;
	this.c8.y = 155;
	this.c9= new createjs.Bitmap(pppPreloader.from("module", 'motor/images/6.png'));
	this.c9.x = 211;
	this.c9.y = 153;
	
	this.contenedor = new createjs.Container();
	this.pagina = pagina;

}
Ahorcado.prototype.morir = function( ){
	
	this.contenedor.addChild( this["c"+this.estat] );
	this.estat++;
	//if(this.estat == Motor.datosXML.intentos)
	if(this.estat == Motor.numMaxIntentos)
	{
		//TODO: fin del juego
		if( Contenedor.missatge != "" ) Contenedor.checkPagina();
	    this.pagina.palabra.corregir();
	}
	
	//console.log(this.estat + " : " + Motor.datosXML.intentos);
	//console.log(Motor.datosXML);
}

function Teclat( pagina )
{
	switch(LangRes.curLang )
	{
		case "en": this.teclas = LangRes.TECLAS_EN;
			break;
		case "val": this.teclas = LangRes.TECLAS_VAL;
			break;
		case "gal": this.teclas = LangRes.TECLAS_GAL;
			break;
		case "es": this.teclas = LangRes.TECLAS_ES;
			break;
	}
	
	this.teclasBox = new Array();
	this.contenedor = new createjs.Container();
	this.pagina = pagina;
	
	this.fons = new createjs.Shape();
	this.fons.graphics.beginFill("#FFF").drawRoundRect(0, 0, 387, 206,5);
	this.contenedor.addChild( this.fons );
	for(key in this.teclas)
	{
		var tecla = new TeclaBox( key, this.teclas[key], this );
		tecla.contenedor.x = ( key % 9 ) * 35 + 38;
		tecla.contenedor.y = Math.floor( key / 9 ) * 45 + 25; 
		this.contenedor.addChild( tecla.contenedor );
		this.teclasBox.push(tecla);	
	}
	this.picades = "";
}
Teclat.prototype.marcarTecla = function( lletra ){
	
	for(key2 in this.teclasBox)
	{
		if( lletra.toUpperCase() == this.teclasBox[key2].simbol.text.toUpperCase() )
		{
			//this.teclasBox[key2].pressHandler();
			this.teclasBox[key2].fons.graphics.beginFill("#F8B334").drawRoundRect(0, 0, 24, 24, 4);
			this.teclasBox[key2].pressed = true;
			break;
		}
	}
}
Teclat.prototype.block = function( lletra ){
	for(var key2 in this.teclasBox)
	{
		this.teclasBox[key2].block();
	}
}
Teclat.prototype.unblock = function( lletra ){

	for(var key2 in this.teclasBox)
	{
		this.teclasBox[key2].unblock();
	}
}

function TeclaBox( index, lletra, _teclat) {
	
	this.contenedor = new createjs.Container();
//	console.log(index);
	this.id  = index;
	this.pressed = false;
	this.teclat = _teclat;

	//debugger;
	this.simbol = new createjs.Text();
    this.simbol.text = lletra.toUpperCase();
    this.simbol.font = (Contenedor.datosXML.plataforma.grado == 1)? "bold 18px Arial" : "bold 16px Arial";
	this.simbol.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 18 : 16;
	this.simbol.color = "#fff";
	
	if( lletra.toUpperCase() == "I" || lletra.toUpperCase() == "." || lletra.toUpperCase() == ",") this.simbol.x = 9;
	else if( lletra.toUpperCase() == "W" ) this.simbol.x =(Contenedor.datosXML.plataforma.grado == 1)? 3 : 5;
	else this.simbol.x = (Contenedor.datosXML.plataforma.grado == 1)? 5 : 6;
	
	this.simbol.y = (Contenedor.datosXML.plataforma.grado == 1)? 2 : 3;
	this.simbol.lineWidth = 24;
	this.simbol.mouseEnabled = false;
	
	this.area = new createjs.Container();
	
	this.fons = new createjs.Shape();
	this.fons.graphics.beginFill("#0D3158").drawRoundRect(0, 0, 24, 24, 4);
	
	this.area.addChild( this.fons );
	
	this.contenedor.addChild( this.area );
	this.contenedor.addChild( this.simbol );

	this.contenedor.on("mousedown", this.pressHandler, this);
	this.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
	this.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
 }

TeclaBox.prototype.pressHandler = function(){

	if(!this.pressed)
	{
		this.fons.graphics.clear();
		this.fons.graphics.beginFill("#F8B334").drawRoundRect(0, 0, 24, 24, 4);
		this.pressed = true;
		this.teclat.picades += this.simbol.text.toUpperCase() ;

		if( !this.teclat.pagina.palabra.haveLletra( this.simbol.text) )
		{
		    if( !this.teclat.pagina.ejecutado ){
		    //cuando tienes menos intentos de los maximos posibles
                var preIntentos = Motor.numMaxIntentos - Motor.datosXML.intentos;
                if( preIntentos > 0 ){
                    for( var i=1; i <=preIntentos;i++ ){
                        this.teclat.pagina.ahorcado.morir();
                    }
                }
                this.teclat.pagina.ejecutado = true;
            }
			this.teclat.pagina.ahorcado.morir();
		}
	}
	
}
TeclaBox.prototype.block = function(){
	this.contenedor.removeAllEventListeners();
}
TeclaBox.prototype.unblock = function(){
	this.contenedor.on("mousedown", this.pressHandler, this);
	this.contenedor.on("mouseover", function(evt){ document.body.style.cursor='pointer'; });
	this.contenedor.on("mouseout", function(evt){ document.body.style.cursor='default'; });
}

function PalabraBox( palabra, visibles, pagina )
{
	//console.log(visibles);
	this.contenedor = new createjs.Container();
	this.lletresBox = new Array();
	this.pagina = pagina;
	
	this.fons = new createjs.Shape();
	this.fons.graphics.beginFill("#FFF").drawRoundRect(0, 0, palabra.length*30+80, 52,5);
	this.fons.setBounds(0,0,palabra.length*30+80,52);
	this.contenedor.addChild( this.fons );
	
	for( key1 in palabra )
	{
		if( palabra[ key1 ] != ' ' )
		{
			//mirem si la lletra ha de ser visible només iniciar
			var palabraSA = Utils.removeAccents( palabra );
			palabra = palabra.toUpperCase();
			var visiblesUpper = visibles.toUpperCase();
			var visible = (visiblesUpper.indexOf( palabraSA[ key1 ] )>-1);
			
			if(visible){
				//marquem la tecla del teclat com a marcada
				this.pagina.teclat.marcarTecla(palabra[ key1 ]); 
				this.textVisible += palabra[ key1 ];
			}
			
			var lletra = new LletraBox( key1, palabra[key1], this, visible );
			lletra.contenedor.x = key1  * 30 + 40;
			lletra.contenedor.y = 14;
			this.contenedor.addChild( lletra.contenedor );
			this.lletresBox.push(lletra);	
		}else{
			var lletra = new LletraBox( key1, "_", this, false );
			lletra.lletra.text = "_";
			this.lletresBox.push(lletra);
		}
	}
}
PalabraBox.prototype.haveLletra = function(_lletra){
	var trobat = false;
	for(key3 in this.lletresBox)
	{
		var comparacio =this.lletresBox[key3].compare( _lletra );
		if( comparacio != false)
		{
			this.lletresBox[key3].setLletra( comparacio );
			trobat =  true;
		} 
	}
	return trobat;
}
PalabraBox.prototype.getCurrentPalabra = function(){
	var result = "";
	for(key3 in this.lletresBox)
	{
		if(this.lletresBox[key3].lletra.text == ""){
			result += " ";
		}else{
			result += this.lletresBox[key3].lletra.text.toUpperCase();
		}
	}
	return result;
}
PalabraBox.prototype.corregir = function(){
	var result=true;
	for(var key3 in this.lletresBox)
	{
		if(this.lletresBox[key3].lletra.text != "_"){
			
			if(this.lletresBox[key3].lletra.text == ""){
				this.lletresBox[key3].error();
				result =false;
			}
			else if( this.lletresBox[key3].lletraCorrecte.toUpperCase() == this.lletresBox[key3].lletra.text.toUpperCase() )
			{
				this.lletresBox[key3].correct();
			}
			else{
				this.lletresBox[key3].error();
				result =false;
			}
		}
	}
	this.pagina.teclat.block();
	//if(result) this.pagina.teclat.block();
	return result;
}

PalabraBox.prototype.solucionar = function(){
	for(key3 in this.lletresBox)
	{
		if(this.lletresBox[key3].lletra.text != "_"){
			this.lletresBox[key3].lletra.text = this.lletresBox[key3].lletraCorrecte.toUpperCase();
		}
	}

	this.pagina.teclat.block();
}

PalabraBox.prototype.esCorrecte = function(){
	for(var key3 in this.lletresBox)
	{

		if( this.lletresBox[key3].lletra.text == "")
			return;
	}
	if( Contenedor.missatge != "" ) Contenedor.checkPagina();
	this.corregir();
}

function LletraBox( index, lletra, _paraula, visible)
{

	this.contenedor = new createjs.Container();
//	console.log(index);
	this.id  = index;
	this.correcte = false;
	this.paraula = _paraula;
	this.lletraCorrecte = lletra;

	//debugger;
	this.lletra = new createjs.Text();
    this.lletra.font = (Contenedor.datosXML.plataforma.grado == 1)? "bold 18px Arial" : "bold 16px Arial";
	this.lletra.fontSize =(Contenedor.datosXML.plataforma.grado == 1)? 18 : 16;
	this.lletra.color = "#000";//"#0D3158";
	this.lletra.x = (Contenedor.datosXML.plataforma.grado == 1)? 5 : 6;
	this.lletra.y = (Contenedor.datosXML.plataforma.grado == 1)? 2 : 3;
	this.lletra.lineWidth = 285;
	this.lletra.lineHeight = 22;
	this.lletra.mouseEnabled = false;
	
	if(visible){
		this.initLletra(lletra);
	}else{
		this.lletra.text = "";
	}
	
	this.area = new createjs.Container();
	
	this.fons = new createjs.Shape();
	this.fons.graphics.beginFill("#FDE8C2").drawRoundRect(0, 0, 24, 24, 4);
	
	this.marc = new createjs.Shape();
	this.marc.graphics.beginStroke("#F8B334").setStrokeStyle(1).drawRoundRect(0, 0, 24, 24, 4);
	
	this.area.addChild( this.fons );
	this.area.addChild( this.marc );
	
	this.contenedor.addChild( this.area );
	this.contenedor.addChild( this.lletra );

	//this.contenedor.on("mousedown", this.pressHandler, this);
	//this.desactivar();

}
LletraBox.prototype.setLletra = function(_lletra){
	this.lletra.text = _lletra.toUpperCase();
	
	//coloquem la i al centre
	if(_lletra.toUpperCase() == "." || _lletra.toUpperCase() == "," || _lletra.toUpperCase() == "I") this.lletra.x = 9;
	else this.lletra.x = 5;
	
	this.paraula.esCorrecte();
	
}
LletraBox.prototype.initLletra = function(_lletra){
    //console.log(_lletra.toUpperCase());
	this.lletra.text = _lletra.toUpperCase();
	
	//coloquem la i al centre
	if(_lletra.toUpperCase() == "." || _lletra.toUpperCase() == "," || _lletra.toUpperCase() == "I") this.lletra.x = 9;
	else this.lletra.x = 5;

	
}

LletraBox.prototype.compare = function( lletra)
{
	var correcte = this.lletraCorrecte.toUpperCase();
	if( correcte == lletra.toUpperCase() )
	{
		return correcte;
	}
	else if(lletra.toUpperCase() == "I" && ( correcte == "Í" || correcte == "Ï"  ))
	{
		return correcte;
	}
	else if(lletra.toUpperCase() == "I" && ( correcte == "Ú" || correcte == "Ü"  ))
	{
		return correcte;
	}
	else if(lletra.toUpperCase() == "A" && ( correcte == "À" || correcte == "Á"  ))
	{
		return correcte;
	}
	else if(lletra.toUpperCase() == "E" && ( correcte == "É" || correcte == "È"  ))
	{
		return correcte;
	}
	else if(lletra.toUpperCase() == "O" && ( correcte == "Ó" || correcte == "Ò"  ))
	{
		return correcte;
	}
	return false;
}

LletraBox.prototype.error = function(){
	this.marc.graphics.clear();
	this.fons.graphics.clear();
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, 24, 24, 4);
	this.marc.graphics.beginStroke("#E1001A").setStrokeStyle(2).drawRoundRect(0, 0, 24, 24, 4);
	this.lletra.color = "#E1001A";
	this.correcte = false;
}

LletraBox.prototype.correct = function(){
	this.marc.graphics.clear();
	this.fons.graphics.clear();
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, 24, 24, 4);
	this.marc.graphics.beginStroke("#41A62A").setStrokeStyle(2).drawRoundRect(0, 0, 24, 24, 4);
	this.correcte = true;
}

