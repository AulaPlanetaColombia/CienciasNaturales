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
	this.PRIMERO = 					4;
	this.GUARDAR = 					5;
	this.ENVIAR =					6;
	
	this.TIEMPORESTANTE =			7;

	this.MASINFORMACION =			8;

	this.RESULTADO =				9;
	this.RESPCORRECTAS =			10;
	this.RESPCORRECTAS_DE =			11;
	this.PUNTUACION =				12;
	this.TIEMPOEMPLEADO =			13;

	this.CONTINUAR =				14;
	this.REINICIAR =				15;
	this.ACEPTAR =					16;
	this.CANCELAR =					17;

	this.ABOUT =					18;
	this.MSG_AGOTADOTIEMPO =		19;
	this.MSG_REINTENTAR =			20;
	this.MSG_VALIDAR =				21;
	this.MSG_VALIDARSINRESPONDER =	22;
	this.MSG_VALIDAR_NE = 			23;
	this.MSG_VALIDARSINRESPONDER_NE = 	24;
	this.MSG_DOWNMESSAGE = 			25;
	this.MSG_GUARDADOCORRECTO = 	26;
	this.MSG_VALIDADOCORRECTO = 	27;
	this.MSG_BROWSEMODE =			28;

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
		} else if (langId == "cat") {
			this.lang = this.lang_cat;
		} else if (langId == "eus") {
			this.lang = this.lang_eus;
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
		"Primero",
		"Guardar",
		"Enviar",

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
		"Si continúas, se almacenará la nota del ejercicio. Si quieres hacer alguna modificación, haz clic en Cancelar.",
		"Hay preguntas sin responder. Si continúas, se almacenará la nota del ejercicio. Si quieres hacer alguna modificación, haz clic en Cancelar.",
		"Si continúas, se enviará al profesor el ejercicio para evaluar. Si quieres hacer alguna modificación, haz clic en Cancelar.",
		"Hay preguntas sin responder. Si continúas, se enviará al profesor el ejercicio para evaluar. Si quieres hacer alguna modificación, haz clic en Cancelar.",
		
		"Entrega las respuestas en mano o por email.",
		"Ejercicio guardado correctamente",
		"Ejercicio enviado para validación",
		"Esta actividad debe asignarse como tarea para poderse realizar, o bien entregarse en mano o por email."
	];
		
	// VALENCIANO
	this.lang_val = [
		"Reintenta",
		"Solució",
		"Corregeix",
		"Següent",
		"Primer",
		"Guarda",
		"Envia",

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
		"Si continues, s'emmagatzemarà la nota de l'exercici. Si vols fer alguna modificació, fes clic en Cancel·la.",
		"Hi ha preguntes sense contestar. Si continues, s'emmagatzemarà la nota de l'exercici. Si vols fer alguna modificació, fes clic en Cancel·la.",
		"Si continues, s'enviarà al professor l'exercici per avaluar. Si vols fer alguna modificació, fes clic en Cancel·la.",
		"Hi ha preguntes sense contestar. Si continues, s'enviarà al professor l'exercici per avaluar. Si vols fer alguna modificació, fes clic en Cancel·la.",
		
		"Lliura les respostes en mà o per correu electrònic.",
		"L'exercici s'ha guardat correctament",
		"L'exercici s'ha enviat per a validar-lo",
		"Aquesta activitat ha d'assignar-se com a tasca per a poder fer-la, o bé lliurar-la en mà o per correu electrònic."
	];
		
	// CATALA
	this.lang_cat = [
		"Reintenta",
		"Solució",
		"Corregeix",
		"Següent",
		"Primer",
		"Guarda",
		"Envia",

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
		"Si continues, s'emmagatzemarà la nota de l'exercici. Si vols fer alguna modificació, fes clic a Cancel·la.",
		"Hi ha preguntes sense contestar. Si continues, s'emmagatzemarà la nota de l'exercici. Si vols fer alguna modificació, fes clic a Cancel·la.",
		"Si continues, s'enviarà al professor l'exercici per avaluar. Si vols fer alguna modificació, fes clic a Cancel·la.",
		"Hi ha preguntes sense contestar. Si continues, s'enviarà al professor l'exercici per avaluar. Si vols fer alguna modificació, fes clic a Cancel·la.",
		
		"Entrega les respostes en mà o per correu electrònic.",
		"L'exercici s'ha guardat correctament",
		"L'exercici s'ha enviat a validar",
		"Aquesta activitat s'ha d'assignar com a tasca per poder fer-la, o bé entregar-la en mà o per correu electrònic."
	];
		
	// GALLEGO
	this.lang_gal = [
		"Tentar de novo",
		"Solución",
		"Corrixir",
		"Seguinte",
		"Primeiro",
		"Gardar",
		"Enviar",

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
		"Se continúas, almacenarase a nota do exercicio. Se queres facer algunha modificación, fai clic en Cancelar.",
		"Hai preguntas sen responder. Se continúas, almacenarase a nota do exercicio. Se queres facer algunha modificación, fai clic en Cancelar.",
		"Se continúas, enviarase ao profesor o exercicio para avaliar. Se queres facer algunha modificación, fai clic en Cancelar.",
		"Hai preguntas sen responder. Se continúas, enviarase ao profesor o exercicio para avaliar. Se queres facer algunha modificación, fai clic en Cancelar.",
		
		"Entrega as respostas en man ou por correo electrónico.",
		"Exercicio gardado correctamente",
		"Exercicio enviado para validar",
		"Esta actividade debe asignarse como tarefa para que se poida realizar, ou ben entregarse en man ou por correo electrónico."
	];
		
	// INGLÉS
	this.lang_en = [
		"Retry",
		"Answer",
		"Correct exercise",
		"Next",
		"First",
		"Save",
		"Send",

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
		"If you continue, your exercise score will be saved. If you want to make any changes, click Cancel.",
		"Some questions have not been answered. If you continue, your exercise score will be saved. In case you want to make any changes, click Cancel.",
		"If you continue, your exercise will be sent to the teacher for evaluation. If you want to make any changes, click Cancel.",
		"Some questions have not been answered. If you continue, your exercise will be sent to the teacher for evaluation. To make any changes, click Cancel.",
		
		"Hand in to your teacher directly or by email.",
		"Exercise successfully saved.",
		"Exercise successfully sent for evaluation.",
		"To answer here, the activity should be assigned as a task before (Asignar Tarea). If necessary, hand in to your teacher directly or by email."
	];
	
	// EUSKARA
	this.lang_eus = [
		"Saiatu berriro",
		"Erantzuna",
		"Zuzendu ariketa",
		"Hurrengoa",
		"Aurrena",
		"Gorde",
		"Bidali",

		"GELDITZEN DEN DENBORA",

		"Informazio gehiago",

		"Emaitza",
		"Erantzun zuzenak:",
		"/",
		"Puntuazioa:",
		"Erabilitako denbora:",

		"Jarraitu",
		"Berrabiarazi",
		"Ados",
		"Utzi",

		"xxxx ariketa, xxxx bertsioa",
		"Denbora agortu zaizu. Jarraituz gero, puntuazioa gordeko da. Berrabiaraziz gero, berriro hasiko duzu ariketa.",
		"Kontuz! Berrabiaraziz gero, berriro hasiko duzu ariketa.",
		"Jarraituz gero, ariketaren puntuazioa gordeko da. Aldaketarik egin nahi izanez gero, sakatu Utzi.",
		"Ez zaie galdera batzuei erantzun. Jarraituz gero, ariketaren puntuazioa gordeko da. Aldaketarik egin nahi izanez gero, sakatu Utzi.",
		"Jarraituz gero, irakasleari bidaliko zaio ariketa, berrikus dezan. Aldaketarik egin nahi izanez gero, sakatu Utzi.",
		"Ez zaie galdera batzuei erantzun. Jarraituz gero, irakasleari bidaliko zaio ariketa, berrikus dezan. Aldaketarik egin nahi izanez gero, sakatu Utzi.",
		
		"Entregatu zuzenean irakasleari edo bidali posta elektronikoz.",
		"Ariketa behar bezala gorde da.",
		"Ariketa behar bezala bidali da irakasleak berrikus dezan.",
		"Erantzun ahal izateko, jarduerari zeregin bat esleitu behar zaio. Behar izanez gero, entregatu zuzenean irakasleari edo bidali posta elektronikoz."
	];
		
};
