Scorm = new function()
{

	this.modo = "";
	this.initialMode = "";
	this.suspend_data = "";
	this.completed = "";
	this.connected = false;
	
	this.MODO_EXPONER = "browse";
	this.MODO_REVISAR = "review";
	this.MODO_REVISARALUMNO = "areview";
	this.MODO_EXAMEN = "exam";
	
	this.init = function( data )
	{
		this.modo = data.mode;
		this.suspend_data = data.suspend_data;
		this.completed = data.completed;
		this.connected = data.connected;
		
		/****  HARDCODED DATA  ****
		this.modo = this.MODO_EXAMEN ;
		this.suspend_data = "hola|si|no|adeu|bon dia|bona nit||fins aviat";
		this.completed = "completed";
		this.connected = true;
		**/

		this.initialMode = this.modo;
	}
	
}