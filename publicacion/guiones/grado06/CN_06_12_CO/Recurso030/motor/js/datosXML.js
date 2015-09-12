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
	this.pregunta = "";
	this.respuestas = new Array();

} 

function respuesta(){
	
  	this.text = "";
  	this.orden = -1;
  	this.id = -1;
}

