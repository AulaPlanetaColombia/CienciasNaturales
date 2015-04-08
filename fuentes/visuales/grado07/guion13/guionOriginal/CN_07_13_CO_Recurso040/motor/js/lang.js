// Constantes que se usan en el sistema de motores de ejercicios
LangRes = new function()
{
	// Array con los strings
	this.lang = new Array();
	// Lenguaje definitivo
	this.curLang ="";
	
	
	// Defines para los diferentes elementos a traducir (índices del array)
	this.REINTENTAR =				0;
	this.SOLUCION =					1;
	this.CORREGIR =					2;
	this.SIGUIENTE =				3;
	
	this.TIEMPORESTANTE =			4;

	this.MASINFORMACION =			5;

	this.RESULTADO =				6;
	this.RESPCORRECTAS =			7;
	this.RESPCORRECTAS_DE =			8;
	this.PUNTUACION =				9;
	this.TIEMPOEMPLEADO =			10;

	this.CONTINUAR =				11;
	this.REINICIAR =				12;
	this.ACEPTAR =					13;
	this.CANCELAR =					14;

	this.ABOUT =					15;
	this.MSG_AGOTADOTIEMPO =		16;
	this.MSG_REINTENTAR =			17;
	this.MSG_REINTENTAR_AREVIEW =	18;
	this.MSG_VALIDAR =				19;
	this.MSG_VALIDARSINRESPONDER =	20;

	this.init = function() {
		this.curLang = "es";
		this.lang = this.lang_es;
	}

	this.setLang = function(langId) {
		this.curLang = langId;
		if (langId == "en") { // Inglés
			this.lang = this.lang_en;
		} else if (langId == "val") {
			this.lang = this.lang_val;
		} else if (langId == "gal") {
			this.lang = this.lang_gal;
		} else { // Si no es ningún idioma reconocido, entonces forzamos español
			this.curLang = "es";
			this.lang = this.lang_es;
		}
	}

	// ESPAÑOL
	this.lang_es = [
		"Reintentar",
		"Solución",
		"Corregir",
		"Siguiente",

		"TIEMPO RESTANTE",

		"Más información",

		"Resultado",
		"Respuestas correctas:",
		"de",
		"Puntuación:",
		"Tiempo empleado:",

		"Continuar",
		"Reiniciar",
		"Aceptar",
		"Cancelar",

		"Ejercicio xxxx versión xxxx",
		"Has agotado el tiempo. Si continúas, se almacenará la nota del ejercicio. Si reinicias, empezarás el ejercicio de nuevo.",
		"¡Atención! Si reintentas, empezarás el ejercicio de nuevo.",
		"Esta actividad ya ha sido entregada. Ahora puedes practicar tantas veces como quieras.",
		"Si continúas, se almacenará la nota del ejercicio. Si quieres hacer alguna modificación, haz clic en Cancelar.",
		"Hay preguntas sin responder. Si continúas, se almacenará la nota del ejercicio. Si quieres hacer alguna modificación, haz clic en Cancelar."
	];
	
	// VALENCIANO
	this.lang_val = [
		"Reintenta",
		"Solució",
		"Corregeix",
		"Següent",

		"TEMPS RESTANT",

		"Més informació",

		"Resultat",
		"Respostes correctes:",
		"de",
		"Puntuació:",
		"Temps emprat:",

		"Continua",
		"Reinicia",
		"D'acord",
		"Cancel·la",

		"Exercici xxxx versió xxxx",
		"Has esgotat el temps. Si continues, s'emmagatzemarà la nota de l'exercici. Si reinicies, tornaràs a començar l'exercici.",
		"Atenció! Si reintentes, tornaràs a començar l'exercici.",
		"Aquesta activitat ja s'ha lliurat. Ara pots practicar tantes vegades com vullgues.",
		"Si continues, s'emmagatzemarà la nota de l'exercici. Si vols fer alguna modificació, fes clic en Cancel·la.",
		"Hi ha preguntes sense contestar. Si continues, s'emmagatzemarà la nota de l'exercici. Si vols fer alguna modificació, fes clic en Cancel·la."
	];
	
	// GALLEGO
	this.lang_gal = [
		"Tentar de novo",
		"Solución",
		"Corrixir",
		"Seguinte",

		"TEMPO RESTANTE",

		"Máis información",

		"Resultado",
		"Respostas correctas:",
		"de",
		"Puntuación:",
		"Tempo empregado:",

		"Continuar",
		"Reiniciar",
		"Aceptar",
		"Cancelar",

		"Exercicio xxxx versión xxxx",
		"Esgotaches o tempo. Se continúas, almacenarase a nota do exercicio. Se reinicias, empezarás o exercicio de novo.",
		"Atención! Se o volves tentar, empezarás o exercicio de novo.",
		"Xa se entregou esta actividade. Agora podes practicar tantas veces como queiras.",
		"Se continúas, almacenarase a nota do exercicio. Se queres facer algunha modificación, fai clic en Cancelar.",
		"Hai preguntas sen responder. Se continúas, almacenarase a nota do exercicio. Se queres facer algunha modificación, fai clic en Cancelar."
	];
	
	// INGLÉS
	this.lang_en = [
		"Retry",
		"Answer",
		"Correct exercise",
		"Next",

		"TIME REMAINING",

		"More information",

		"Score",
		"Correct answers:",
		"of",
		"Score:",
		"Time taken:",

		"Continue",
		"Restart",
		"OK",
		"Cancel",

		"Exercise xxxx version xxxx",
		"You have run out of time. If you continue, your score will be saved. If you restart, you'll begin the exercise again.",
		"Watch out! If you restart, you'll begin the exercise again.",
		"This activity has been delivered. Now you can practice as many times as you want.",
		"If you continue, your exercise score will be saved. If you want to make any changes, click Cancel.",
		"Some questions have not been answered. If you continue, your exercise score will be saved. In case you want to make any changes, click Cancel."
	];
	
}