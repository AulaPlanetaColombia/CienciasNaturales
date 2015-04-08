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
	this.lang = "";	

}
function masInfo()
{
  	this.inicio = "";
  	this.text = "";
}

function datosMotor() {
	
  	this.enunciado = "";
  	this.cantidad = 0;
  	this.cuestiones = new Array();
  	this.elementos = new Array();
}

function cuestiona(){
	this.id = -1;
  	this.categoria = "";
  	this.sonido = "";
  	this.respuestas = new Array() ; 	
} 
function respuesta(){
	
  	this.id = -1;
  	this.texte = ""; 
  	this.categoria =-1;	
}

