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
	
  	this.cantidad = "";
	this.cruzadas = new Array();
	this.central = new palabra();
	
	
}
 
function palabra(){
	
  	this.definicion = "";
  	this.etiqueta = "";
  	this.cortePropio ="";  	
  	this.id = -1;
}



