//
Scorm = new function()
{

	this.modo = "";
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
		
		/****  HARDCODED DATA  ***
		this.modo = this.MODO_EXAMEN;
		this.suspend_data ="0{||}1{||}2{||}3{||}4{||}5{||}6{||}7{||}8{||}9{||}10{||}11{||}12{||}13{||}14{||}15{||}16{||}17{||}18{||}19{||}20{||}21{||}22{||}23{||}24{||}25{||}26{||}27";
		this.completed = "completed";
		this.connected = true;
		***/
	}
	
}