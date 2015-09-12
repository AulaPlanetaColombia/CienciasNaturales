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

function datosMotor() {
	
	this.enunciado = "";
	this.intentos = "";
	this.estilo = "";
	this.numpreguntas = "";
	this.preguntas = new Array();
	
}

function pregunta(){
	this.id ="";
	this.enunciado = "";
	this.palabra = "";
	this.visibles = "";
}
 



