//***************************************************************
// Variables y funciones sobre idiomas
//***************************************************************

var LangRes = {

	// Idiomes disponibles
	LANG_ID_ES		: 0,
	LANG_ID_EN		: 1,
	LANG_ID_VAL		: 2, // El idioma valenciano no esta reconocido
	LANG_ID_GAL		: 3,
	LANG_ID_CAT		: 4,
	LANG_ID_EUS		: 5,

	// Indicadors del recurs
	ENTREGA_EN_MANO		:	0,
	ENVIAR			:	1,
	ADJUNTAR		:	2,
	GUARDAR			:	3,
	CANCELAR		:	4,
	CONTINUAR		:	5,
	CONFIRMAR_SIN_RESP	:	6,
	NO_HAY_ARCH_SUBIDOS	:	7,
	CORREGIR		:	8,
	DESCARGAR_ARCH		:	9,
	DESCARGAR_ARCH_TIT	:	10,
	CERRAR			:	11,
	CARGANDO_ACT		:	12,
	ACTIVITY_DONE		:	13,
	BROWSE_MODE		:	14,
	ACTIVITY_SENT		:	15,
	ACTIVITY_VIEWED		:	16,
	ACTIVITY_NOT_VIEWED	:	17,
	HTML_PAGE_TITLE		:	18,
	MSG_VALIDADOCORRECTO	:	19,
	MSG_ADJUNTA		:	20,
	
	// Text codificat que indica l'idioma, equivalent al langId però que
	// es fa servir als XML
	langNames: [
		{ id: "es", nameId: 0 },
		{ id: "en", nameId: 0 },
		{ id: "val", nameId: 0 },
		{ id: "gal", nameId: 0 },
		{ id: "cat", nameId: 0 },
		{ id: "eus", nameId: 0 }
	],


	// Array de traduccions
	langTexts:
	[
		[ // es
			"Entrega el trabajo en mano o por email.",
			"Enviar",
			"Adjuntar trabajo",
			"Guardar",
			"Cancelar",
			"Continuar",
			"Hay preguntas sin responder. Si continúas, se enviará al profesor el ejercicio para evaluar. Si quieres hacer alguna modificación, haz clic en Cancelar.",
			"No hay archivos subidos aún.",
			"Corregir",
			"Descargar Archivo",
			"Archivo de la actividad",
			"Cerrar",
			"Cargando actividad...",
			"Ya has realizado esta actividad antes.",
			"Esta actividad debe asignarse como tarea para poderse realizar, o bien entregarse en mano o por email.",
			"La actividad ya ha sido enviada al profesor.",
			"El alumno ha abierto la actividad.",
			"Actividad aún por empezar.",
			"Actividad",
			"Ejercicio enviado para validación",
			"Adjunta y envía el trabajo desde tu tarea abierta en la web."
		],
		[ // en
			"Hand in to your teacher directly or by email.",
			"Send",
			"Add file",
			"Save",
			"Cancel",
			"Next",
			"You still have some questions to answer. Press SEND for your teacher to mark them. Press CANCEL if you want to change or add anything.",
			"There are no uploaded files.",
			"Correct",
			"Download file",
			"Download activity file",
			"Close",
			"Loading activity...",
			"This activity has been completed before.",
			"To answer here, the activity should be assigned as a task before (Asignar tarea). If necessary, hand in to your teacher directly or by email.",
			"The activity has already been sent to your teacher.",
			"The student has openned the exercise.",
			"Activity still not started.",
			"Activity",
			"Exercise successfully sent for evaluation.",
			"Attach and send your answer from your task page."
		],
		[ // valenciano
			"Lliura el treball en mà o per correu electrònic.",
			"Envia",
			"Adjunta el treball",
			"Guarda",
			"Cancel·la",
			"Continua",
			"Hi ha preguntes sense contestar. Si continues, s'enviarà al professor l'exercici per avaluar. Si vols fer alguna modificació, fes clic en Cancel·la.",
			"Encara no s'ha carregat cap fitxer.",
			"Corregeix",
			"Descarrega el fitxer",
			"Fitxer de l'activitat",
			"Tanca",
			"S'està carregant l'activitat...",
			"Ja has fet aquesta activitat.",
			"Aquesta activitat ha d'assignar-se com a tasca per a poder fer-la, o bé lliurar-la en mà o per correu electrònic.",
			"L'activitat ja s'ha enviat al professor.",
			"L'alumne ha obert l'activitat.",
			"Activitat no iniciada encara.",
			"Activitat",
			"L'exercici s'ha enviat per a validar-lo",
			"Adjunta i envia el treball des de la teua tasca oberta en la web."
		],
		[ // gallego
			"Entrega o traballo en man ou por correo electrónico.",
			"Enviar",
			"Anexar traballo",
			"Gardar",
			"Cancelar",
			"Continuar",
			"Hai preguntas sen responder. Se continúas, enviarase ao profesor o exercicio para avaliar. Se queres facer algunha modificación, fai clic en Cancelar.",
			"Non se subiron arquivos aínda.",
			"Corrixir",
			"Descargar arquivo",
			"Arquivo da actividade",
			"Pechar",
			"Cargando actividade...",
			"Xa realizaches esta actividade antes.",
			"Esta actividade debe asignarse como tarefa para que se poida realizar, ou ben entregarse en man ou por correo electrónico.",
			"Xa se enviou a actividade ao profesor.",
			"O alumno abriu a actividade.",
			"Actividade aínda por empezar.",
			"Actividade",
			"Exercicio enviado para validar",
			"Anexa e envía o traballo desde a túa tarefa aberta na web."
		],
		[ // catalán
			"Entrega el treball en mà o per correu electrònic.",
			"Envia",
			"Adjunta el treball",
			"Guarda",
			"Cancel·la",
			"Continua",
			"Hi ha preguntes sense contestar. Si continues, s'enviarà al professor l'exercici per avaluar. Si vols fer alguna modificació, fes clic a Cancel·la.",
			"Encara no s'ha carregat cap fitxer.",
			"Corregeix",
			"Descarrega el fitxer",
			"Fitxer de l'activitat",
			"Tanca",
			"S'està carregant l'activitat...",
			"Ja has fet aquesta activitat.",
			"Aquesta activitat s'ha d'assignar com a tasca per poder fer-la, o bé entregar-la en mà o per correu electrònic.",
			"L'activitat ja s'ha enviat al professor.",
			"L'alumne ha obert l'activitat.",
			"Activitat no iniciada encara.",
			"Activitat",
			"L'exercici s'ha enviat a validar",
			"Adjunta i envia el treball des de la teva tasca oberta a la web."
		],
		[ // euskara
			"Entregatu zuzenean irakasleari edo bidali posta elektronikoz.",
			"Bidali",
			"Gehitu fitxategia",
			"Gorde",
			"Utzi",
			"Jarraitu",
			"Ez zaie galdera batzuei erantzun. Jarraituz gero, ariketaren puntuazioa gordeko da. Aldaketarik egin nahi izanez gero, sakatu Utzi.",
			"Encara no s'ha carregat cap fitxer.",
			"Zuzena",
			"Deskargatu fitxategia",
			"Deskargatu jarduera-fitxategia",
			"Itxi",
			"Jarduera kargatzen…",
			"Jarduera lehendik osatu da.",
			"Erantzun ahal izateko, jarduerari zeregin bat esleitu behar zaio. Behar izanez gero, entregatu zuzenean irakasleari edo bidali posta elektronikoz.",
			"Jarduera irakasleari bidali zaio jada.",
			"Ikasleak ariketa ireki du.",
			"Oraindik ez da jarduera hasi.",
			"Jarduera",
			"Ariketa behar bezala bidali da irakasleak berrikus dezan.",
			"Adjunta y envía el trabajo desde tu tarea abierta en la web."
		]
	],


	curLang: null,
	
	setLangId: function (langId) {
		// Comprovem que estigui dins del marge de l'array de traduccions
		// Si no és el cas, apliquem sempre l'espanyol
		if (langId >= 0 && langId < this.langTexts.length) {
			this.curLang = this.langTexts[langId];
		} else {
			this.curLang = this.langTexts[LangRes.LANG_ID_ES];
		}
	},
	
	getLangId: function() {
		for (var i=0;i<this.langTexts.length;i++) {
			if (this.langTexts[i] == this.curLang)
				return i;
		}
		return LangRes.LANG_ID_ES;
	},
		
	getLangIdFromString: function(lang) {
		/*
		if (lang == "en")
			return LangRes.LANG_ID_EN;
		else if (lang == "gal")
			return LangRes.LANG_ID_GAL;
		else if (lang == "val")
			return LangRes.LANG_ID_VAL;
		else
			return LangRes.LANG_ID_ES;
		*/
	       for (var i=0;i<LangRes.langNames.length;i++) {
		       if (lang == LangRes.langNames[i].id)
			       return i;
	       }
	       return LangRes.LANG_ID_ES;
	},
	
	getLangIdAsString: function() {
		var langId = this.getLangId();
		return LangRes.langNames[langId].id;
		/*
		var langId = this.getLangId();
		if (langId == LangRes.LANG_ID_EN)
			return "en";
		else if (langId == LangRes.LANG_ID_VAL)
			return "val";
		else if (langId == LangRes.LANG_ID_GAL)
			return "gal";
		else
			return "es";
		*/
	}
	
};

// COM CRIDAR
// Per posar l'idioma
// LangRes.setLangId(LangRes.LANG_ID_ES);
// Per recurperar un text
// var text = LangRes.curLang[LangRes.MSG_EXERCISE_SAVED];
