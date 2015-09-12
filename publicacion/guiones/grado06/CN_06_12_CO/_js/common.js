/*
 * Fichero para rutinas javascript comunes
 * v : 10.10.8
 */
 
 function init()
{
	// Obtenemos la query string y la traspasamos al motor 
	var dest = "motor/motor.html";
	var motor = document.getElementById("motor");
	var CurrURL = location.href;
	var ParamsPos = CurrURL.indexOf("?",0);
	if (ParamsPos > 0) {
		var ParamsStr = CurrURL.substr(ParamsPos+1,CurrURL.length);
		dest += "?" + ParamsStr;
	}
	//alert("dest: " + dest);
	motor.src = dest;
}