function PistaBox( index, press, _definicion) {
	
	this.contenedor = new createjs.Container();
//	console.log(index);
	this.id  = index;
	this.correcte = false;
	
	this.definicion = _definicion;

	//debugger;
	this.simbol = new createjs.Text();
    this.simbol.text = "";
    this.simbol.font = (Contenedor.datosXML.plataforma.grado == 1)? "18px Arial" : "16px Arial" ;
	this.simbol.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 18 : 16 ;
	this.simbol.color = "#fff";
	this.simbol.x = (Contenedor.datosXML.plataforma.grado == 1)? 0 : 4 ;
	this.simbol.y = (Contenedor.datosXML.plataforma.grado == 1)? 2 : 4 ;
	this.simbol.lineWidth = 24;

	this.simbol.mouseEnabled = false;
	
	this.area = new createjs.Container();
	
	this.fons = new createjs.Shape();
	this.fons.graphics.beginFill("#0D3158").drawRoundRect(0, 0, 24, 24, 4);
	
	
	this.area.addChild( this.fons );
	
	this.contenedor.addChild( this.area );
	this.contenedor.addChild( this.simbol );

	if(press) {
		this.area.on("mousedown", this.pressHandler, this);
		this.area.on("mouseover", function(){ document.body.style.cursor='pointer'; }, this);
		this.area.on("mouseout", function(){ document.body.style.cursor='default'; }, this);
	}
 }
PistaBox.prototype.setSimbol = function(_simbol){
	this.simbol.text = _simbol.toUpperCase();
	this.simbol.x = 7-(_simbol.length-1)*4; 
}
PistaBox.prototype.pressHandler = function(evt){
	if( evt== null || evt.primary ){
		for(var key in Motor.pistes)
		{
			if(Motor.pistes[key] != this.fons ){
				Motor.pistes[key].fons.graphics.clear();
				Motor.pistes[key].fons.graphics.beginFill("#0D3158").drawRoundRect(0, 0, 24, 24, 4);
				Motor.pistes[key].simbol.color = "#fff"; 
			}
		}

		Motor.definicionH.text = this.definicion;
	
		if(Motor.cruzadas.length >= this.id){
			if(Motor.currentLletra){
				Motor.currentLletra.fons.graphics.clear();
				Motor.currentLletra.fons.graphics.beginFill("#FDE8C2").drawRoundRect(0, 0, 24, 24, 4);
			}
			Motor.currentLletra = Motor.cruzadas[this.id-1].lletres[0]; 
			Motor.currentLletra.pressHandler(null);
			//Main.setFocus(Motor.currentLletra.input.htmlElement);
		}
	}
}
PistaBox.prototype.select = function(){
	for( key in Motor.pistes)
	{
		Motor.pistes[key].fons.graphics.clear();
		Motor.pistes[key].fons.graphics.beginFill("#0D3158").drawRoundRect(0, 0, 24, 24, 4);
		Motor.pistes[key].simbol.color = "#fff"; 
	}
	this.fons.graphics.clear();
	this.fons.graphics.beginFill("#F8B334").drawRoundRect(0, 0, 24, 24, 4);
	this.simbol.color = "#0D3158"; 
	Motor.definicionH.text = this.definicion;

}
PistaBox.prototype.desactivar = function()
{
	this.area.removeAllEventListeners();
}
PistaBox.prototype.activar = function()
{
	this.area.on("mousedown", this.pressHandler, this);
	this.area.on("mouseover", function(){ document.body.style.cursor='pointer'; }, this);
	this.area.on("mouseout", function(){ document.body.style.cursor='default'; }, this);
}
function ParaulaItem( numParaula, etiqueta , xposition, horitzontal)
{
	this.contenedor = new createjs.Container();
	this.numLletres = etiqueta.length;
	this.etiqueta = etiqueta;
	this.id  = numParaula;
	this.correcte = false;
	this.lletres = new Array();
	this.horitzontal = horitzontal;
	
	this.num = new createjs.Text();
    this.num.text = numParaula;
    this.num.font = (Contenedor.datosXML.plataforma.grado == 1)? "bold 18px Arial" : "bold 16px Arial" ;
	this.num.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 18 : 16 ;
	this.num.color = "#0D3158";
	
	xposition--;
	
	if(horitzontal){
		this.num.x = - (xposition+1) * 26 + ((Contenedor.datosXML.plataforma.grado == 1)? 0 : 2);
		this.num.y = 2 + ((Contenedor.datosXML.plataforma.grado == 1)? 0 : 2);
	}else{
		this.num.x = 5+ ((Contenedor.datosXML.plataforma.grado == 1)? 0 : 2);
		this.num.y = - (xposition+2) * 26 + ((Contenedor.datosXML.plataforma.grado == 1)? 0 : 2);
	}
	
	this.num.lineWidth = 285;
	this.num.lineHeight = 22;
	this.num.mouseEnabled = false;
	
	var xpos = 0;
	for(var i = 0; i < this.numLletres; i++)
	{
		this.lletra = new LletraBox(i, this);
		if( xposition > 0)
		{ 
			if(horitzontal) this.lletra.contenedor.x = - xposition * 28;
			else this.lletra.contenedor.y = - xposition * 28;
			xposition--;
		}
		else
		{
			if(horitzontal) this.lletra.contenedor.x =  xpos * 28;
			else this.lletra.contenedor.y =  xpos * 28;
			xpos++;
		}
		this.lletres.push(this.lletra);
		this.contenedor.addChild( this.lletra.contenedor );
	}
	
	this.contenedor.addChild( this.num );
}
function LletraBox( index, _paraula)
{

	this.contenedor = new createjs.Container();
//	console.log(index);
	this.id  = index;
	this.correcte = false;
	this.paraula = _paraula;

	//debugger;
	this.lletra = new createjs.Text();
    this.lletra.text = "";
    this.lletra.font = (Contenedor.datosXML.plataforma.grado == 1)? "bold 18px Arial" : "bold 16px Arial" ;
	this.lletra.fontSize = (Contenedor.datosXML.plataforma.grado == 1)? 18 : 16 ;
	this.lletra.color = "#000";//"#0D3158";
	this.lletra.x = (Contenedor.datosXML.plataforma.grado == 1)? 5 : 10 ;
	this.lletra.y = (Contenedor.datosXML.plataforma.grado == 1)? 2 : 4;
	this.lletra.lineWidth = 285;
	this.lletra.lineHeight = 22;
	this.lletra.mouseEnabled = false;

	this.area = new createjs.Container();
	
	this.fons = new createjs.Shape();
	this.fons.graphics.beginFill("#FDE8C2").drawRoundRect(0, 0, 24, 24, 4);
	
	this.marc = new createjs.Shape();
	this.marc.graphics.beginStroke("#F8B334").setStrokeStyle(0.5).drawRoundRect(0, 0, 24, 24, 4);
	
	this.area.addChild( this.fons );
	this.area.addChild( this.marc );
	
	this.contenedor.addChild( this.area );
	this.contenedor.addChild( this.lletra );
	//this.contenedor.addChild( this.input );

	this.contenedor.on("mousedown", this.pressHandler, this);
	this.contenedor.on("mouseover", function(){ document.body.style.cursor='pointer'; }, this);
	this.contenedor.on("mouseout", function(){ document.body.style.cursor='default'; }, this);
	//this.anteriorLletra = "";
	//this.desactivar();

}
LletraBox.prototype.setLletra = function(_lletra){
	//eliminem el focus del input seleccionat des del Main
	//Main.setFocus(false);
	
	if( _lletra != undefined && _lletra.trim() != "" )
	{
		//$( this.input.htmlElement ).val("");
		this.lletra.text= _lletra.toUpperCase();
		//this.anteriorLletra = _lletra.toUpperCase();
		
		//coloquem la i al centre
		if( _lletra.toUpperCase() == "Í" || _lletra.toUpperCase() == "Ï" || _lletra.toUpperCase() == "I" || _lletra == "·" ) this.lletra.x = 9;
		else this.lletra.x = 5;
		
		// si estem en paraula horitzontal pasem a la seguent lletra
		if( this.paraula.horitzontal && this.paraula.lletres.length-1 > this.id )
		{ 
			this.fons.graphics.clear();
			this.fons.graphics.beginFill("#FDE8C2").drawRoundRect(0, 0, 24, 24, 4);
		
			//posem el focus sobre la lletra seguent de la paraula
			Motor.currentLletra = this.paraula.lletres[ this.id + 1 ]; 
			Motor.currentLletra.pressHandler(null);
			//Main.setFocus(Motor.currentLletra.input.htmlElement);
		}
	}
	
}
LletraBox.prototype.pressHandler = function(evt){
	if( evt== null || evt.primary ){
		if(Motor.currentLletra){
			Motor.currentLletra.fons.graphics.clear();
			Motor.currentLletra.fons.graphics.beginFill("#FDE8C2").drawRoundRect(0, 0, 24, 24, 4);
		}
		this.fons.graphics.beginFill("#F8B334").drawRoundRect(0, 0, 24, 24, 4);
		Motor.currentLletra = this;
		Motor.clickat = true;

		if( Main.mobil == "iPad" ){
	        $('#inputar').css("top", ( this.paraula.contenedor.y + 118 + 50 ) + "px");
	    }
		$('body').click();
		setTimeout(function(){Motor.clickat=false;}, 500);
		 
		//posicionamos el input en la caja donde hemos apretado
		var point = this.lletra.localToGlobal(this.lletra.x, this.lletra.y);
		$("#inputar").css('top', point.y);
		$("#inputar").css('left', point.x);

		// si es paraula cruzada seleccionem la pista corresponent
		if( this.paraula.horitzontal )
			Motor.pistes[ this.paraula.id - 1 ].select();
	}
}
LletraBox.prototype.final = function(){
	for( key in Motor.audios)
	{
		if(Motor.audios[key].id == this.id[5])
		{
			Motor.audios[key].bt.bt.gotoAndStop("normal");
		}
	}
}
LletraBox.prototype.desactivar = function()
{
	this.contenedor.removeAllEventListeners();
}
LletraBox.prototype.activar = function()
{
	if( !this.contenedor.hasEventListener("mousedown") )
	{
	   this.contenedor.on("mousedown", this.pressHandler, this);
	}
}
LletraBox.prototype.setCorreccio = function( correcio )
{
	this.lletra.text = correcio.toUpperCase();
	
	//coloquem la i al centre
	if(correcio.toUpperCase() == "Í" || correcio.toUpperCase() == "Ï" || correcio.toUpperCase() == "I") this.lletra.x = 9;
	else this.lletra.x = 5;
	
	this.marc.graphics.clear();
	this.fons.graphics.clear();
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, 24, 24, 4);
	this.marc.graphics.beginStroke("#F8B334").setStrokeStyle(2).drawRoundRect(0, 0, 24, 24, 4);
}
LletraBox.prototype.clear = function(){
	this.marc.graphics.clear();
	this.fons.graphics.clear();
	this.fons.graphics.beginFill("#FDE8C2").drawRoundRect(0, 0, 24, 24, 4);
	this.marc.graphics.beginStroke("#F8B334").setStrokeStyle(0.5).drawRoundRect(0, 0, 24, 24, 4);
}
LletraBox.prototype.error = function(){
	this.marc.graphics.clear();
	this.fons.graphics.clear();
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, 24, 24, 4);
	this.marc.graphics.beginStroke("#E1001A").setStrokeStyle(2).drawRoundRect(0, 0, 24, 24, 4);
	this.correcte = false;
}

LletraBox.prototype.correct = function(){
	this.marc.graphics.clear();
	this.fons.graphics.clear();
	this.fons.graphics.beginFill("#fff").drawRoundRect(0, 0, 24, 24, 4);
	this.marc.graphics.beginStroke("#41A62A").setStrokeStyle(2).drawRoundRect(0, 0, 24, 24, 4);
	this.correcte = true;
}
