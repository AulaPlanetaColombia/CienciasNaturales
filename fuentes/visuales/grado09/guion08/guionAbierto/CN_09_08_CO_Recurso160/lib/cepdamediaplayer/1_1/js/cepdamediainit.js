/************************************************************************
 *
 * CEPDA MEDIA INIT: rutina de inicialización del CEPDA MEDIA Player
 * con las opciones y aspecto habitual del player AulaPlaneta
 *
 * Versión 15.10.08.1
 *
 * Autor: Javier Garcés - Sinergia sistemas informáticos
 * 
 ************************************************************************/

function initMediaPlayer() {
	
	// Opciones de los vídeos y audiso
	var vidOptions = {
		// Tema (skin)
		theme: 'aulaplaneta',
		autoplayOn: false,
		// Textos a mostrar en los tooltips y botones
		texts:{
			play: 'Reproducir',
			playTitle: 'Comenzar la reproducción',
			pause: 'Pausa',
			pauseTitle: 'Parar la reproducción',
			mute: 'Silenciar',
			unmute: 'Recuperar el sonido',
			fullscreen: 'Pantalla completa',
			fullscreenTitle: 'Activar/desactivar el modo de pantalla completa',
			volumeTitle: 'Control de volumen',
			seekTitle: 'Control de tiempo',
			captions: 'Subtítulos',
			captionsTitle: 'Mostrar/ocultar subtítulos'
		},
		// Rutina a la que se llama para obtener el markup HTML de la toolbar (si no es la habitual)
		// En nuestro caso cambiamos el orden y posición de los elementos
		onToolbarTemplate: function(refThis, options) {
			var fullscreenBtnMarkup = (refThis.$self.is('video')) ? '<button class="cepda-fullscreen-button" title="' + options.texts.fullscreenTitle + '">' + options.texts.fullscreen + '</button>' : '';
			var template = '<div class="cepda-controls">' +
								'<span style="float:left; width: 10px;">&nbsp;</span>' +
								'<button class="cepda-play-button" title="' + options.texts.playTitle + '">' + options.texts.play + '</button>' +
								'<input type="range" class="cepda-seek-slider" title="' + options.texts.seekTitle + '" value="0" min="0" max="150" step="0.1"/>' +
								'<span style="float:right; width: 10px;">&nbsp;</span>' +
								fullscreenBtnMarkup +
								'<button class="cepda-caption-button" title="' + options.texts.captionsTitle + '">' + options.texts.captions + '</button>' +
								'<div class="cepda-caption-selector"></div>' +
								'<div class="cepda-volume-box">' +
									'<button class="cepda-volume-button" title="' + options.texts.mute + '">' + options.texts.mute + '</button>' +
									'<input type="range" class="cepda-volume-slider" title="' + options.texts.volumeTitle + '" value="1" min="0" max="1" step="0.05"/>' +
								'</div>' +
								'<span class="cepda-timer">00:00</span>' +
							'</div>';
			return template;
		},
		// Rutina a la que se llama cuando cambia algún aspecto de la toolbar y hay que recalcular/reposicionar elementos
		// En nuestro caso, el ajustamos el tamaño del slider de tiempo
		onToolbarChanged: function (refThis, options) {
			var left = refThis.$playBtn[0].offsetLeft + refThis.$playBtn[0].offsetWidth;//.offset().left + refThis.$playBtn.width();
			var right = refThis.$timer[0].offsetLeft-30;
			refThis.$seek.css('width', (right - left) + 'px');
		}
	};

	// Convertimos todos los tags nativos en equivalentes CEPDA	
	jQuery('video, audio').cepdaMediaPlayer(vidOptions);
	// Mostramos los elementos una vez hayan sido ya contruidos con la nueva interfaz
	// (para evitar que se vea el cambio de interfaz de nativo al de CEPDA)
	setTimeout(function() { jQuery('video').css('visibility', 'visible'); }, 500);
	
}
