function datosContenedor() {
	
  	this.tipo = "";
  	this.classe = "";
	this.enunciado ="";
	this.temps = "";
	this.calc = "";
	this.sinaleatoriedad = "";
	this.respuestaunica ="";
	
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

function datosMotor()
{
  	this.cantidad = "";
	this.preguntas = new Array();
}
 
function pregunta(){
	
  	this.explicacion = "";
  	this.enunciado = ""; 
  	this.imagen = ""; 
  	this.ampliacion = "";   	
  	this.id = -1;
	this.respuestas = new Array();
}

function respuesta(){
	
  	this.text = "";
  	this.correcte = -1;	
  	this.id =-1;
}

