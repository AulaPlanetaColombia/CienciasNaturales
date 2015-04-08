/************************************************************************
	SCORM.js: Connexi� entre els exercicis i AulaPlaneta via SCORM
	
	Versi�: 14.9.30.1
	Hist�ria:	- 30/9/14: Assimilaci� mode "normal" a "exam" i afegig debugMode
						- 5/9/14: Primera versi�
	Autors: Sinergia sistemas inform�ticos
	
************************************************************************/

// Creamos el espacio de nombres para aulaPlaneta
var aulaPlaneta = aulaPlaneta || {};

// Creamos dentro del espacio de nombres aulaPlaneta el api SCORM
// si no lo hemos creado previamente, claro.
if (!aulaPlaneta.hasOwnProperty("SCORM")) {

	////////////////////////////////////////////////////////
	// RUTINAS PRIVADAS
	////////////////////////////////////////////////////////
	var queryStringDecode = function (encodedString) {
		return decodeURIComponent(encodedString.replace(/\+/g,' '));
	};
	
	var getWindowQueryParam = function (win, pName) {
		var CurrURL = win.location.href;
		var ParamsPos = CurrURL.indexOf("?",0);
		if (ParamsPos > 0) {
			var ParamsStr = CurrURL.substr(ParamsPos+1,CurrURL.length);
			var Params = ParamsStr.split("&");
			var i;
			for (i=0;i<Params.length;i++) {
				if (Params[i].indexOf(pName + "=",0) == 0) {
					return queryStringDecode(Params[i].substr(pName.length + 1,Params[i].length));
				}
			}
		}
		return "";
	};
	
	
	var getRecursiveQueryParam = function (pName) {
		var w = window; // window es variable/objecte local
		while (w != null) {
			var res = getWindowQueryParam(w, pName);
			if (res != "") {
				//alert("Rec: "+pName+" => "+res);
				return res;
			}
			// A vegades en comptes de retornar NULL retorna la
			// mateixa finestra com a parent (una finestra �s
			// "parent" de s� mateixa)...
			if (w == w.parent) {
				break;
			} else { // Si en canvi no s�c el meu pare, vol dir que haig de "pujar" en la jerarquia
				w = w.parent;
			}
		}
		return "";
	};
	
	var getQueryParam = function (pName) {
		var CurrURL = location.href;
		var ParamsPos = CurrURL.indexOf("?",0);
		if (ParamsPos > 0) {
			var ParamsStr = CurrURL.substr(ParamsPos+1,CurrURL.length);
			var Params = ParamsStr.split("&");
			var i;
			for (i=0;i<Params.length;i++) {
				if (Params[i].indexOf(pName + "=",0) == 0) {
					return queryStringDecode(Params[i].substr(pName.length + 1,Params[i].length));
				}
			}
		}
		return "";
	};
	
	
	////////////////////////////////////////////////////////
	// DEFINICION DEL SERVICIO "SCORM"
	////////////////////////////////////////////////////////
	aulaPlaneta.SCORM = {
		
		////////////////////////////////////////////////
		// MODOS DE LOS EJERCICIOS
		////////////////////////////////////////////////
		MODO_NORMAL: 		"normal",				// Modo ejercicio
		MODO_BROWSE: 		"browse",				// Modo exponer
		MODO_REVIEW: 		"review",				// Modo revisar por el profesor
		MODO_AREVIEW: 	"areview",			// Modo revisar por el alumno (lo vuelve a ver)
		MODO_EXAM: 			"exam",					// Modo examen (como ejercicio pero sin posibilidad de ver la soluci�n)
		
		////////////////////////////////////////////////
		// MODO DEBUG CON MENSAJES (ALERTS)
		////////////////////////////////////////////////
		debugMode: false,

		////////////////////////////////////////////////
		// INICIALIZACION DE LA CONEXION SCORM
		// Nos retorna un objecto con los par�metros
		// obtenidos v�a SCORM de AulaPlaneta:
		// { mode, completed, suspend_data, connected }
		// donde:
		// - mode: es el modo del ejercicio (ver arriba)
		// - completed: "completed" o "uncompleted"
		// - suspend_data: los datos previos
		// - connected: true/false seg�n encuentre un
		//   servidor SCORM disponible.
		////////////////////////////////////////////////
		initialize: function () {

			var suspend_data = "";
			var modo = "";
			var completed = "";
			var connected = false;
	
			// si la inicializaci�n SCORM ha sido correcta, obtenemos las variables necesarias
			if (typeof doInitialize == 'function' && doInitialize() == "true") {

				// Nos apuntamos que estamos conectados				
				connected = true;
				
				// Obtenemos el modo de aparici�n
				modo = doGetValue('cmi.mode');

				// Obtenemos el estado previo del ejercicio (completado/no completado)
				completed = doGetValue('cmi.completion_status');
				
				// Si el ejercicio ha sido completado, no dejamos crear nuevos intentos y se accede siempre a la actividad anterior
				if (completed == 'completed') {
					doSetValue('cmi.exit', 'suspend');
					doCommit();
				}
				
				// Obtenemos el estado del ejercicio tal y como lo dej� el alumno
				// NOTA: Hemos de mirar tambi�n si la variable SCORM no est� definida. Seg�n
				// La implementaci�n SCORM que se use, puede retornar "", un error 403 o null.
				suspend_data = doGetValue('cmi.suspend_data');
				if (suspend_data == 403 || suspend_data == null) {
					suspend_data = "";
				}
				
				// Miramos si el modo REVIEW es del alumno o del profesor buscando
				// en la URL de la ventana/iframe o cualquiera de los que quede por encima.
				if (modo == aulaPlaneta.SCORM.MODO_REVIEW && getRecursiveQueryParam("IsAlumno") == "1") {
					modo = aulaPlaneta.SCORM.MODO_AREVIEW;
				}
				
			} else { // NO HAY CMI
					// Recogemos los par�metros a trav�s de la URL
					// Si no les llega valor lo podemos establecer "harcodeado" para pruebas
					modo = getQueryParam("mode");
					completed = getQueryParam("completion_status");
					suspend_data = getQueryParam("suspend_data");
	
					// Valores por defecto si no se pasan par�metros
					if (modo == '') { modo = aulaPlaneta.SCORM.MODO_BROWSE; }
					if (completed == '') { completed = 'uncompleted'; }
					// suspend_data ya nos llegar�a como '' si no hay par�metro
			}
	
			// En teor�a no se da nunca, pero como v�lvula de seguridad si hay un
			// buf en el c�digo anterior, forzamos MODO_BROWSE si no tenemos modo.
			if (modo == "") {
				modo = aulaPlaneta.SCORM.MODO_BROWSE;
			}
			
			// Asimilamos el modo normal a modo exam, para deshacernos "definitivamente"
			// del modo "normal", que est� obsoleto.
			if (modo == aulaPlaneta.SCORM.MODO_NORMAL) {
				modo = aulaPlaneta.SCORM.MODO_EXAM;
			}

			// Montamos el objeto con el resultado
			var res = {};
			res.mode = modo;
			res.completed = completed;
			res.suspend_data = suspend_data;
			res.connected = connected;
			
			if (aulaPlaneta.SCORM.debugMode)
				alert("SCORM Initialize MODO: " + res.mode + " - " + res.completed + " - " + res.suspend_data + " - " + res.connected);
			
			return res;
			
		},
		
		////////////////////////////////////////////////
		// FINALIZACION DE LA CONEXION SCORM
		////////////////////////////////////////////////
		terminate: function () {
			if (aulaPlaneta.SCORM.debugMode)
				alert("SCORM Terminate");
			// Matamos el cliente SCORM
			doTerminate();
		},
		
		////////////////////////////////////////////////
		// API DE LOS EJERCICIOS
		////////////////////////////////////////////////
		
		// API NUEVO PARA EJERCICIOS CONVENCIONALES
		ejercicio_enviar_resultado: function (estado, score_min, score_max, score_raw, time) {
			
			if (aulaPlaneta.SCORM.debugMode)
				alert('SCORM ejercicio_enviar_resultado: ' + estado + " - " + score_min + " - " + score_max + " - " + score_raw + " - " + time);
			// Obtenemos los valores "diferidos" necesarios para SCORM
			var score_scaledSCORM = score_raw / score_max;
			var successSCORM = 'passed';
			if (score_scaledSCORM < 0.5) {
					successSCORM = 'failed';
			}
			// Componemos el time
			var timeSCORM = "PT0H0M0S";
			if (time != "") {
				var timeParts = time.split(":");
				var timeHour = parseInt(timeParts[0]);
				var timeSec = parseInt(timeParts[1]);
				timeSCORM = "PT0H" + timeHour + "M" + timeSec + "S";
			}
					
			// Ponemos las variables SCORM en funci�n de la informaci�n proporcionada
			doSetValue('cmi.suspend_data',estado);
			doSetValue('cmi.score.min',score_min);
			doSetValue('cmi.score.max',score_max);
			doSetValue('cmi.score.raw',score_raw);
			doSetValue('cmi.score.scaled', score_scaledSCORM);
			doSetValue('cmi.success_status', successSCORM);
			doSetValue('cmi.session_time',timeSCORM);  
			doSetValue('cmi.completion_status', 'completed');
			doSetValue('cmi.exit','suspend');
			doCommit();
		},
		
		// API PARA EJERCICIOS NO AUTOEVALUADOS
		ejercicio_guardar: function(estado) {
			if (aulaPlaneta.SCORM.debugMode)
				alert('SCORM ejercicio_guardar: ' + estado);
			// Ponemos las variables SCORM en funci�n de la informaci�n proporcionada
			doSetValue('cmi.suspend_data',estado);
			doCommit();
		},
		
		ejercicio_evaluar: function(estado, time) {
			if (aulaPlaneta.SCORM.debugMode)
				alert('SCORM ejercicio_evaluar: ' + estado + " - " + time);
			// Componemos el time
			var timeSCORM = "PT0H0M0S";
			if (time != "") {
				var timeParts = time.split(":");
				var timeHour = parseInt(timeParts[0]);
				var timeSec = parseInt(timeParts[1]);
				timeSCORM = "PT0H" + timeHour + "M" + timeSec + "S";
			}
			
			// Ponemos las variables SCORM en funci�n de la informaci�n proporcionada
			doSetValue('cmi.suspend_data',estado);
			doSetValue('cmi.session_time',timeSCORM);
			doSetValue('cmi.completion_status', 'completed');
			doSetValue('cmi.exit','suspend');
			doCommit();
		},
		
		// RUTINA A LA QUE SE LLAMA PARA CERRAR LA VENTANA
		ejercicio_cerrar: function() {
			if (aulaPlaneta.SCORM.debugMode)
				alert("SCORM ejercicio_cerrar");
			// Llama la rutina "cerrar" de una ventana de orden superior (padre, abuelo, etc. del iframe, vamos)
			var finalWindow = null;
			var w = window.parent;
			while (w != null) {
				if (w.parent == null || w.parent == w) {
					finalWindow = w;
					break;
				}
				w = w.parent;
			}
			if (finalWindow != null) {
				finalWindow.close();
			}
		}
		
		// FIN DEL OBJETO aulaPlaneta.SCORM
		
	};

}

