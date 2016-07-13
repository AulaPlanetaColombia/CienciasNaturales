/************************************************************************
	SCORM.js: Connexió entre els exercicis i AulaPlaneta via SCORM
	
	Versió: 15.5.14.1
	Història:
						- 14/5/15: Eliminada crida Commit en inicialitzar-se si està completat
						- 27/4/15: Afegida correcció Cross-Domain a getRecursiveQueryParam
						- 23/4/15: Implementació Cross-Domain amb subdominis
						- 23/3/15: Eliminació crida a doTerminate
						- 17/3/15: Mantenir l'estat correcte de la configuració SCORM
						- 30/9/14: Assimilació mode "normal" a "exam" i afegig debugMode
						- 5/9/14: Primera versió
	Autors: Sinergia sistemas informáticos
	
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
		try {
			while (w != null) {
				var res = getWindowQueryParam(w, pName);
				if (res != "") {
					//alert("Rec: "+pName+" => "+res);
					return res;
				}
				// A vegades en comptes de retornar NULL retorna la
				// mateixa finestra com a parent (una finestra és
				// "parent" de sí mateixa)...
				if (w == w.parent) {
					break;
				} else { // Si en canvi no sóc el meu pare, vol dir que haig de "pujar" en la jerarquia
					w = w.parent;
				}
			}
		} catch (error) {
			if (console && console.log)
				console.log("Posible error xdomain en getRecursiveQueryParam: '" + document.domain + "'" + error);
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
	
	// Rutina para resolver el tema de cross-origin/cross-domain entre iframes
	var patchCrossDomainError = function () {
			
			// Si tenemos deshabilitada la función retornamos true directamente
			if (aulaPlaneta.SCORM.patchCrossDomainErrorEnabled == false)
				return true;
			
			// Intentamos cambiar el dominio al principal para que pueda acceder
			var initialDomain = document.domain;
			//console.log("CCD: Dominio inicial: " + initialDomain);
			if (initialDomain.indexOf(".") == -1)
				return true; // SIEMPRE DEVOLVEMOS TRUE PARA QUE INTENTE OBTENER EL API IGUAL

			var newDomain = initialDomain;
			var cdb = false;
			var wp = window.parent;
			if (wp == null || wp == window) {
				wp = window.top.opener;
			}
			
			// Mientras tengamos al menos algo del tipo xxxx.xxx, vamos subiendo
			while (newDomain.indexOf(".") != -1 && wp != null && wp !== window) { 
				// Bloque try/catch para detectar si falla la incursión en el padre
				try {
					//console.log("CCD: vamos a probar con el dominio: '" + newDomain + "'");
					if (document.domain != newDomain)
						document.domain = newDomain;
					wp.document.getElementById("jeje"); // Simplemente al hacer la llamada debería petar, si el dominio no es compartido
					cdb = true;
					break;
				} catch(ex) {
					//console.log("CCD: ha petado... " + ex);
				}
				// Subimos un nivel
				parts = newDomain.split(".");
				parts.shift();
				newDomain = parts.join(".");
			}
			
			// Si no hemos conseguido comunicarnos con el padre, restauramos el dominio y 
			// retornamos false.
			if (cdb == false) {
				//console.log("CCD FAIL: " + document.domain);
				// return false;
				return true; // SIEMPRE DEVOLVEMOS TRUE PARA QUE INTENTE OBTENER EL API IGUAL
			}
			
			// Si todo ha ido bien, retornamos true
			//console.log("CCD SUCCESS: dominio definitivo:" + document.domain);
			return true;
	}
	
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
		MODO_EXAM: 			"exam",					// Modo examen (como ejercicio pero sin posibilidad de ver la solución)
		
		////////////////////////////////////////////////
		// MODO DEBUG CON MENSAJES (ALERTS)
		////////////////////////////////////////////////
		debugMode: false,

		////////////////////////////////////////////////
		// CHECK_TOP_DOMAIN
		////////////////////////////////////////////////
		patchCrossDomainErrorEnabled: true,

		////////////////////////////////////////////////
		// INICIALIZACION DE LA CONEXION SCORM
		// Nos retorna un objecto con los parámetros
		// obtenidos vía SCORM de AulaPlaneta:
		// { mode, completed, suspend_data, connected }
		// donde:
		// - mode: es el modo del ejercicio (ver arriba)
		// - completed: "completed" o "uncompleted"
		// - suspend_data: los datos previos
		// - connected: true/false según encuentre un
		//   servidor SCORM disponible.
		////////////////////////////////////////////////
		initialize: function () {

			var suspend_data = "";
			var modo = "";
			var completed = "";
			var connected = false;
			
			// Miramos de incializar el SCORM
			// si la inicialización SCORM ha sido correcta, obtenemos las variables necesarias
			if (typeof doInitialize == 'function' && patchCrossDomainError() && doInitialize() == "true") {

				// Nos apuntamos que estamos conectados				
				connected = true;
				
				// Obtenemos el modo de aparición
				modo = doGetValue('cmi.mode');

				// Obtenemos el estado previo del ejercicio (completado/no completado)
				completed = doGetValue('cmi.completion_status');
				
				// Si el ejercicio ha sido completado, no dejamos crear nuevos intentos y se accede siempre a la actividad anterior
				if (completed == 'completed') {
					doSetValue('cmi.exit', 'suspend');
					//doCommit();
				}
				
				// Obtenemos el estado del ejercicio tal y como lo dejó el alumno
				// NOTA: Hemos de mirar también si la variable SCORM no está definida. Según
				// La implementación SCORM que se use, puede retornar "", un error 403 o null.
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
					// Recogemos los parámetros a través de la URL
					// Si no les llega valor lo podemos establecer "harcodeado" para pruebas
					modo = getQueryParam("mode");
					completed = getQueryParam("completion_status");
					suspend_data = getQueryParam("suspend_data");
	
					// Valores por defecto si no se pasan parámetros
					if (modo == '') { modo = aulaPlaneta.SCORM.MODO_BROWSE; }
					if (completed == '') { completed = 'uncompleted'; }
					// suspend_data ya nos llegaría como '' si no hay parámetro
			}
	
			// En teoría no se da nunca, pero como válvula de seguridad si hay un
			// buf en el código anterior, forzamos MODO_BROWSE si no tenemos modo.
			if (modo == "") {
				modo = aulaPlaneta.SCORM.MODO_BROWSE;
			}
			
			// Asimilamos el modo normal a modo exam, para deshacernos "definitivamente"
			// del modo "normal", que está obsoleto.
			if (modo == aulaPlaneta.SCORM.MODO_NORMAL) {
				modo = aulaPlaneta.SCORM.MODO_EXAM;
			}

			// Montamos el objeto con el resultado
			this.config = {};
			this.config.mode = modo;
			this.config.completed = completed;
			this.config.suspend_data = suspend_data;
			this.config.connected = connected;
			
			if (aulaPlaneta.SCORM.debugMode)
				alert("SCORM Initialize MODO: " + res.mode + " - " + res.completed + " - " + res.suspend_data + " - " + res.connected);
			
			return this.config;
			
		},
		
		////////////////////////////////////////////////
		// FINALIZACION DE LA CONEXION SCORM
		////////////////////////////////////////////////
		terminate: function () {
			if (aulaPlaneta.SCORM.debugMode)
				alert("SCORM Terminate");
			// Matamos el cliente SCORM
			// 23/3/2015 - ELIMINADA LA LLAMADA, PUES REENVIA INFORMACION SCORM INVALIDA
			// doTerminate();
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
					
			// Ponemos las variables SCORM en función de la información proporcionada
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
			// Actualizamos el config
			this.config.completed = 'completed';
			this.config.suspend_data = estado;
		},
		
		// API PARA EJERCICIOS NO AUTOEVALUADOS
		ejercicio_guardar: function(estado) {
			if (aulaPlaneta.SCORM.debugMode)
				alert('SCORM ejercicio_guardar: ' + estado);
			// Ponemos las variables SCORM en función de la información proporcionada
			doSetValue('cmi.suspend_data',estado);
			doCommit();
			// Actualizamos el config
			this.config.suspend_data = estado;
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
			
			// Ponemos las variables SCORM en función de la información proporcionada
			doSetValue('cmi.suspend_data',estado);
			doSetValue('cmi.session_time',timeSCORM);
			doSetValue('cmi.completion_status', 'completed');
			doSetValue('cmi.exit','suspend');
			doCommit();
			// Actualizamos el config
			this.config.completed = 'completed';
			this.config.suspend_data = estado;
		},
		
		// RUTINA A LA QUE SE LLAMA PARA CERRAR LA VENTANA
		ejercicio_cerrar: function() {
			if (aulaPlaneta.SCORM.debugMode)
				alert("SCORM ejercicio_cerrar");
			// Llama la rutina "cerrar" de una ventana de orden superior (padre, abuelo, etc. del iframe, vamos)
			var finalWindow = null;
			try {
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
			} catch (error) {
				if (console && console.log)
					console.log("Posible error xdomain en getRecursiveQueryParam: '" + document.domain + "'" + error);
			}
		}
		
		// FIN DEL OBJETO aulaPlaneta.SCORM
		
	};

}

