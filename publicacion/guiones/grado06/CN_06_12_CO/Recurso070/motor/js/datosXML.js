//datosXML
function datosContenedor() {
	
  	this.tipo = "";
  	this.classe = "";
	this.enunciado ="";
	this.temps = "";
	this.calc = "";
	this.sinaleatoriedad = "";
	
	this.masinfo = new masInfo();
	this.plataforma = new plataforma();
	
 }
 
function plataforma()
{
  	this.grado = "";
  	this.titulo = "";
	this.lang ="";	

}
function masInfo()
{
  	this.inicio = "";
  	this.text = "";
}

function datosMotor() {
	
  	this.cantidad = "";
	this.preguntas = new Array();
	this.respuestas = new Array();
	
}
 
function pregunta(){
	
  	this.text = "";
  	this.id = -1; 	
}

function respuesta(){
	
  	this.text = "";
  	this.id = -1;
}

