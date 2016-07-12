/************************************************************************
 *
 * CEPDA Media Player - jQuery plugin basado en Acorn Media Player
 *
 * VersiÛn 15.10.08.1
 *
 * Autores Acorn Media Player: www.ghinda.net 
 *														(stephenoldham y leslash en github.com)
 * Autor versiÛn actual: Javier GarcÈs - Sinergia sistemas inform·ticos
 *
 ************************************************************************/

// InicializaciÛn del plugin JQuery
(function($) {
	
	/*
	 * FunciÛn a la que debemos llamar desde jquery
	 */
	$.fn.cepdaMediaPlayer = function(options) {
		
		/*
		 * Definimos las opciones por defecto del plugin
		 */
		var defaults = {
			theme: 'planeta',							// Tema
			volumeSlider: 'horizontal',		// Tipo de slider para volumen (vertical u horizontal)
			captionsOn: true,							// Mostramos los subtÌtulos si los tiene
			autoplayOn: true,							// Reproducimos el vÌdeo nada m·s crearlo
			bigBtnOn: true,								// Ponemos el botÛn BIG Play
			saveVolumeOn: false,					// No guardamos el nivel de volumen entre sesiones
			nativeSliders: false,					// No usamos sliders nativos
			fullScreenRelocateOn: false,	// Recolocamos en el DOM el elemento para que en fullscreen estÈ en el body y evite problemas de escalado
			texts:{												// Textos de los botones 
				play: 'Play',
				playTitle: 'Start the playback',
				pause: 'Pause',
				pauseTitle: 'Pause the playback',
				mute: 'Mute',
				unmute: 'Unmute',
				fullscreen: 'Fullscreen',
				fullscreenTitle: 'Toggle fullscreen mode',
				volumeTitle: 'Volume control',
				seekTitle: 'Video seek control',
				captions: 'Captions',
				captionsTitle: 'Show captions'
			}
		};
		// Extendemos las opciones por defecto con las que nos pasan
		options = $.extend(defaults, options);

		/*
		 * FunciÛn para generar un identificador ˙nico a partir de la fecha y hora
		 * Se usa para generar un Id por cada tag de media (vÌdeo o audio) que encontremos
		 */
		var uniqueID = function() {
			var currentDate = new Date();
			return currentDate.getTime();
		};

		/*
		 * Debug
		 */
		function debugLog(string) {
			var da = document.getElementById("debug");
			if (da) {
				da.value += string + "\n";
				da.scrollTop = da.scrollHeight;				
			}
		}

		/*
		* DetecciÛn b·sica de algunos aspectos de compatibilidad (pantalla tactil, casos de navegadores determinados, etc)
		*/
		// DetecciÛn de Flash (basada en SWFObject 2.2)
		function hasAdobeFlash() {
      var SHOCKWAVE_FLASH = "Shockwave Flash",
          SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
          FLASH_MIME_TYPE = "application/x-shockwave-flash";
			
			try {
				var d = null;
				if (typeof navigator.plugins != "undefined" && typeof navigator.plugins[SHOCKWAVE_FLASH] == "object") {
	        d = navigator.plugins[SHOCKWAVE_FLASH].description;
	        if (d && !(typeof navigator.mimeTypes != "undefined" && navigator.mimeTypes[FLASH_MIME_TYPE] && !navigator.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
	        	return true;
	      	}
				}
				else if (typeof win.ActiveXObject != "undefined") {
	        try {
	          var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
	          if (a) { // a will return null when ActiveX is disabled
	            d = a.GetVariable("$version");
	            if (d) {
	    					return true;
	            }
	          }
	        }
	        catch(e) {}
				}
			} catch(e) {}
			return false;
		}
		
		// DetecciÛn de soporte para LocalStorage (para guardarnos el volumen)
		function hasLocalStorage() {
			try {
				return 'localStorage' in window && window.localStorage !== null;
			} catch(e){
				return false;
			}
		}

		// VARIABLES QUE NOS INDICAN QUE CARACTERISTICAS TENEMOS DISPONIBLES PARA EL NAVEGADOR
		// Es dispositivo de touch
		var is_touch_device = 'ontouchstart' in document.documentElement;
		// Es un navegador Chrome para Android
		var is_android_chrome_browser = (/Android/i.test(navigator.userAgent)) && (/Chrome/i.test(navigator.userAgent)); // Pone su propio BIG Play
		// Es un navegador nativo de Android (el antiguo)
		var is_android_os_browser = (/Android/i.test(navigator.userAgent)) && !(/Chrome/i.test(navigator.userAgent)); ; // Pone su propio BIG Play
		// Es un dispositivo iOS
		var is_ios_browser = (/iPhone|iPad|iPod/i.test(navigator.userAgent));
		// Es un navegador IE para windows
		var is_windows_ie_browser = (/Windows/i.test(navigator.userAgent)) && (/Trident/i.test(navigator.userAgent))
		// Tiene plugin de flash
		var has_adobe_flash = hasAdobeFlash();
		// Soporta local storage
		var supports_local_storage = hasLocalStorage();
		
		// No tiene soporte nativo vÌdeo HTML5
		var cant_use_html5_video = !document.createElement('video').canPlayType;
		// No puede manejar el volumen (iOS)
		var cant_manage_volume = is_ios_browser; // Sin soporte de control de volumen
		// No puede mostar el BIG play porque resulta que el propio navegador ya pone uno y no lo quita nunca
		var cant_show_big_play = is_android_chrome_browser || is_android_os_browser;
		// No puede usar el modo fullscreen nativo aunque el api lo soporte (por ejemplo, porque quita subtÌtulos o controles)
		// NOTA (11/7/2014): Lo desactivamos porque cuando el player va dentro de un IFRAME nunca puede hacer
		//                   fullscreen nativo
		var cant_go_fullscreen = true; //is_windows_ie_browser || is_ios_browser || is_android_chrome_browser || is_android_os_browser;

		debugLog("cant_use_html5_video: " + cant_use_html5_video);
		debugLog("cant_manage_volume: " + cant_manage_volume);
		debugLog("cant_show_big_play: " + cant_show_big_play);
		debugLog("cant_go_fullscreen: " + cant_go_fullscreen);
		debugLog("has_adobe_flash: " + has_adobe_flash);

		/*********************************************************************************************************
				MODO VIDEO FLASH (para cuando no hay compatibilidad vÌdeo nativo HTML5)
		**********************************************************************************************************/

		/* cant_use_html5_video = false; */

		// Miramos si tenemos soporte de vÌdeo HTML5 nativo
		if (cant_use_html5_video) {
			
			/*
			 * FunciÛn principal del plugin cuando ha de usar FLASH (pseudo-constructor)
			 * Se la llamar· para cada elemento video o audio que queramos customizar
			 */
			var cepdaFlashPlayer = function() {
				// Creamos el objeto cepda, que ser· el que usaremos como raÌz para las
				// referencias a todos los elementos a manipular del vÌdeo/audio
				var cepda = {
					$self: $(this)
				};
				
				/*
				 * Miramos si hay la media tiene ID.
				 * Si no tiene, generamos uno que sea ˙nico
				 */
				cepda.id = cepda.$self.attr('id');
				if(!cepda.id) {
					cepda.id = 'cepda' + uniqueID();
					cepda.$self.attr('id', cepda.id);
				}
	
				/* VERSION QUE CONSTRUYE EL TAG COMPLETO PARA FLASH
				var videoSource = $("source[type='video/mp4']", cepda.$self).attr('src');
				var videoSubs = $("track", cepda.$self).attr('src');
				var videoWidth = cepda.$self.attr('width');
				var videoHeight = cepda.$self.attr('height');
				var videoClass = cepda.$self.attr('class');
				var videoStyle = cepda.$self.attr('style');
				
				var flashMarkup = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + videoWidth + '" height="' + videoHeight + '">\n' +
	    										'	<param name="allowScriptAccess" value="sameDomain" />\n' +
	    										'	<param name="allowFullScreen" value="true" />\n' +
	    										'	<param name="movie" value="pppVideoPlayer.swf" />\n' +
	    										'	<param name="quality" value="high" />\n' +
	    										'	<param name="wmode" value="transparent">\n' +
													'	<param name="FlashVars" value="ruta_flv=' + encodeURIComponent(videoSource);
				if (videoSubs != null && videoSubs != undefined && videoSubs != "") {
					flashMarkup +=			'&ruta_srt=' + encodeURIComponent(videoSubs);
				}
				flashMarkup +=				'">\n' +
	    										'	<embed src="pppVideoPlayer.swf" width="' + videoWidth + '" height="' + videoHeight + '" quality="high" allowScriptAccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent" ' +
	    										'flashvars="ruta_flv=' + encodeURIComponent(videoSource);
				if (videoSubs != null && videoSubs != undefined && videoSubs != "") {
					flashMarkup +=			'&ruta_srt=' + encodeURIComponent(videoSubs);
				}
				flashMarkup +=				'"/>\n' +
													'</object>\n';
													
				// Contenedor de los media. B·sicamente, lo que se hace es sacar el vÌdeo/audio del DOM
				// poner este contenedor en su lugar, y dentro de Èste volver a colocar el vÌdeo/audio
				// junto con los controles, el botÛn BIG Play y otros elementos.
				var $wrapper = $(flashMarkup);
				// Nos aseguramos que sea visible
				//$wrapper.css('visibility','visible');
				
				// Montamos el HTML Markup definitivo
				// AÒadimos el contenedor
				cepda.$self.after($wrapper);
	
				// Quitamos la media real y nos quedamos con el nuevo media/video dentro del contenedor
				cepda.$self.remove();
				cepda.$self = $wrapper.find('object');
				*/
				
				// VERSION QUE SIMPLEMENTE EXTRAE EL TAG DE COMPATIBILIDAD Y LO PONE FUERA DEL TAG DE VIDEO
				// LA GRAN VENTAJA QUE TIENE ES QUE MANTIENE LOS ESTILOS Y OTROS DETALLES PUESTOS EN EL TAG
				// OBJECT DE COMPATIBILIDAD, CON LO QUE EL HTML MANTIENE TODO EL CONTROL EN CUANTO AL ESTILO
				// DEL FLASH SUBSTITUTO.
				// Obtenemos el tag "object" del Flash
				var $flashObject = $("object", cepda.$self);
				// Lo sacamos del DOM
				$flashObject.detach();
				// Lo volvemos a aÒadir tras el tag de vÌdeo
				cepda.$self.after($flashObject);
				// Nos cargamos el tag de vÌdeo
				cepda.$self.remove();
				// Hacemos que $self apunte ahora al objeto Flash
				cepda.$self = $flashObject;
				
			}
			
			// Hacemos este proceso por todos los elementos que cumplan con el criterio de incializaciÛn
			// para que acaben siendo un plugin de Flash y lo dejamos asÌ.
			return this.each(cepdaFlashPlayer);
		}

		/*********************************************************************************************************
				MODO VIDEO NATIVO HTML5
		**********************************************************************************************************/

		/*
		 * Obtenemos el volumen del LocalStorage, si lo hay. Si no, lo ponemos al m·ximo
		 */
		var volume = (supports_local_storage && options.saveVolumeOn) ? localStorage.getItem('cepdavolume') : 1;
		if(!volume) {
			volume = 1;
		}

		/*
		 * FunciÛn principal del plugin (pseudo-constructor)
		 * Se la llamar· para cada elemento video o audio que queramos customizar
		 */
		var cepdaPlayer = function() {
			// Creamos el objeto cepda, que ser· el que usaremos como raÌz para las
			// referencias a todos los elementos a manipular del vÌdeo/audio
			var cepda = {
				$self: $(this)
			};
			
			// Variables privadas
			var loadedMetadata; // Indica si se ha cargado las metadata
			var seeking; // Indica que se est· en proceso de seek 
			var wasPlaying; // Indica si se estaba reproduciendo cuando se comenzÛ el seek
			var fullscreenMode; // Indica si estamos en modo fullscreen
			var hasCaptions;		// Indica que hay subtÌtulos
			var captionsActive; // Indica si los subtitulos est·n activos

			// Deshabilitamos el autoplay nativo para usar nuestra opciÛn de autoplay
			cepda.$self.prop('autoplay', false);


			// Contenedor de los media. B·sicamente, lo que se hace es sacar el vÌdeo/audio del DOM
			// poner este contenedor en su lugar, y dentro de Èste volver a colocar el vÌdeo/audio
			// junto con los controles, el botÛn BIG Play y otros elementos.
			var $wrapper = $('<div class="cepda-player" role="application"></div>').addClass(options.theme);

			/*
			 * Miramos si hay la media tiene ID.
			 * Si no tiene, generamos uno que sea ˙nico
			 */
			cepda.id = cepda.$self.attr('id');
			if(!cepda.id) {
				cepda.id = 'cepda' + uniqueID();
				cepda.$self.attr('id', cepda.id);
			}

			/*
			 * HTML Markup del botÛn de FullScreen
			 * Si no es un vÌdeo (es un audio, vaya), queda en blanco
			 */
			var fullscreenBtnMarkup = (cepda.$self.is('video')) ? '<button class="cepda-fullscreen-button" title="' + options.texts.fullscreenTitle + '">' + options.texts.fullscreen + '</button>' : '';

			/*
			 * Template HTML general para una barra de control cl·sica
			 */
			var template = '<div class="cepda-controls">' +
								'<button class="cepda-play-button" title="' + options.texts.playTitle + '">' + options.texts.play + '</button>' +
								'<input type="range" class="cepda-seek-slider" title="' + options.texts.seekTitle + '" value="0" min="0" max="150" step="0.1"/>' +
								'<span class="cepda-timer">00:00</span>' +
								'<div class="cepda-volume-box">' +
									'<button class="cepda-volume-button" title="' + options.texts.mute + '">' + options.texts.mute + '</button>' +
									'<input type="range" class="cepda-volume-slider" title="' + options.texts.volumeTitle + '" value="1" min="0" max="1" step="0.05"/>' +
								'</div>' +
								fullscreenBtnMarkup +
								'<button class="cepda-caption-button" title="' + options.texts.captionsTitle + '">' + options.texts.captions + '</button>' +
							'</div>';

			// Si en las opciones tenemos una plantilla alternativa (a travÈs de la funciÛn onToolbarTemplate),
			// entonces generamos la pantilla a partir de las opciones que nos han pasado
			if (options.onToolbarTemplate) {
				template = options.onToolbarTemplate(cepda, options);
			}
			
			// HTML Markup para los subtÌtulos
			var captionMarkup = '<div class="cepda-caption"></div>';

			/*
			 * Montamos el HTML Markup definitivo
			 */

			// AÒadimos el contenedor
			cepda.$self.after($wrapper);

			// IMPORTANTE: BUG iOS y BUG Chrome
			// - BUG iOS: Para soportar iOS, debemos clonar el nodo y eliminar el original y obtener una referencia al nuevo.
			// Esto se ha de hacer porque iOS no reproduce vÌdeos que han sido "recolocados".
			// Mirar: http://bugs.jquery.com/ticket/8015
			// - BUG Chrome: Si se clona de vÌdeo/audio el nodo en vez de simplemente moverlo, Èsto provoca que no se carguen
			//   bien los metadatos y el vÌdeo se quede esperando indefinidamente.
			// - BUG general Audios: Si recolocamos el audio, en vez de clonarlo, no recibimos evento de metadata...
			// Debemos tener en cuenta estos temas:
			// Si es iOS o es un audio, clonamos el nodo
			if (is_ios_browser || cepda.$self.is('audio')) {
				$wrapper[0].appendChild( cepda.$self[0].cloneNode(true) );
				// Quitamos la media real y nos quedamos con el nuevo media/video dentro del contenedor
				cepda.$self.remove();
				cepda.$self = $wrapper.find('video, audio');
			}
			// Si no es iOS, lo "movemos" en el DOM
			else {
				$wrapper[0].appendChild(cepda.$self[0]);
			}
			
			// AÒadimos los controles, el BIG Play (si lo soporta) y la m·scara de cargando
			cepda.$self.after(template);
			if (options.bigBtnOn && !cant_show_big_play)
				cepda.$self.after('<div class="cepda-bigbutton"></div>');
			cepda.$self.after('<div class="loading-media"></div>');

			// Nos quedamos con las referencias a todos los elementos DOM importantes
			// del DOM que hemos creado con las marcas para poderlos manipular
			// posteriormente
			cepda.$container = cepda.$self.parent('.cepda-player');
			cepda.$controls = $('.cepda-controls', cepda.$container);
			cepda.$playBtn = $('.cepda-play-button', cepda.$container);
			cepda.$seek = $('.cepda-seek-slider', cepda.$container);
			cepda.$timer = $('.cepda-timer', cepda.$container);
			cepda.$volume = $('.cepda-volume-slider', cepda.$container);
			cepda.$volumeBtn = $('.cepda-volume-button', cepda.$container);
			cepda.$fullscreenBtn = $('.cepda-fullscreen-button', cepda.$container);
			
			// El BIG Play, si la opciÛn est· activa.
			if (options.bigBtnOn && !cant_show_big_play) {
				cepda.$bigBtn = $('.cepda-bigbutton', cepda.$container);
				// Ajusto la altura del playbutton
				cepda.$bigBtn.css('height', /*cepda.$self.height() + 'px'*/'100%');
			}

			// AÒadimos finalmente el Markup de subtÌtulos
			// que van un poco por libre (subs dentro del contenedors)
			cepda.$controls.after(captionMarkup);

			// Nos quedamos con las referencias a los elementos DOM de los subtÌtulos
			cepda.$caption = $('.cepda-caption', cepda.$container);
			cepda.$captionBtn = $('.cepda-caption-button', cepda.$container);

			// Vinculamos el objeto cepda al elementoDOM
			cepda.$self.data('cepdaPlayer', cepda);
			/*
			 * Rutina para formatear el tiempo en "minutos:segundos". 
			 * Recibe el n∫ de segundos.
			 * Se usa junto a "currentTime"
			 */
			var timeFormat = function(sec) {
				var m = Math.floor(sec/60)<10?"0" + Math.floor(sec/60):Math.floor(sec/60);
				var s = Math.floor(sec-(m*60))<10?"0" + Math.floor(sec-(m*60)):Math.floor(sec-(m*60));
				return m + ":" + s;
			};

			/*
			 * Comportamiento de PLAY/PAUSE
			 *
			 * Function for the Play button
			 * Lanza los eventos nativods de Play o Pause. De esta manera, el control de los botones
			 * est· siempre sincronizado con el funcionamiento real del vÌdeo
			 */
			var playMedia = function() {
				// Si no estaba en pausa, lo pone en pausa
				if(!cepda.$self.prop('paused')) {
					cepda.$self.trigger('pause');
				} else { // Si estaba en pausa, lo pone en marcha
					cepda.$self.trigger('play');
					// Quitamos el boton grande si es necesario
					if (cepda.$bigBtn) {
						if (cepda.$bigBtn.css('visibility') != 'hidden') {
							cepda.$bigBtn.css('opacity','0');
							setTimeout( function () {
								cepda.$bigBtn.css('visibility','hidden');
							}, 700); // Deja un tiempo para que se pueda hacer el efecto fadeout del botÛn
						}
					}
					// Habilitamos el botÛn de fullscreen si es necesario, que por defecto est·
					// inhabilitado hasta que comience la reproducciÛn.
					if (cepda.$fullscreenBtn.prop('disabled') == true) {
						cepda.$fullscreenBtn.prop('disabled', false);
					}
				}
				return false;
			};
			
			/*
			 * Funciones para gestionar los eventos de Play, Pause y Ended de la media.
			 * AquÌ es realmente donde ponemos los estados de los botones de la toolbar, de manera
			 * que siempre est·n sincronizados con la media. AsÌ pues, a˙n usando los mandos 
			 * "nativos" del men˙ contextual (por ejemplo), la toolbar seguirÌa sincronizada
			 */
			var startPlayback = function() {
				// Cambiamos el texto y clase del botÛn para que ponga el modo pause
				cepda.$playBtn.text(options.texts.pause).attr('title', options.texts.pauseTitle);
				cepda.$playBtn.addClass('cepda-paused-button');

				// Si todavÌa no se ha cargado la metada, mostramos la m·scara de cargando
				if(!loadedMetadata) $wrapper.addClass('show-loading');
			};

			var stopPlayback = function() {
				// Recuperamos el boton play original
				cepda.$playBtn.text(options.texts.play).attr('title', options.texts.playTitle);
				cepda.$playBtn.removeClass('cepda-paused-button');
			};

			/*
			 * Comportamiento del SLIDER de SEEK
			 *
			 * Actualiza tanto el contador de tiempo como la barra del slider
			 * Se llama en cada evento "timeUpdate" que nos llega
			 */
			var seekUpdate = function() {
				var currenttime = cepda.$self.prop('currentTime');
				cepda.$timer.text(timeFormat(currenttime));

				// Si estamos forzando seek manualmente
				if(!seeking) {
					// Actualizamos el slider
					if (options.nativeSliders) {
						//cepda.$seek.val(currenttime);
						cepda.$seek[0].value = currenttime;
					} else {
						cepda.$seek.slider('value', currenttime);
					}
				}

				// Si tenemos subtÌtulos, los actualizamos
				if(captionsActive) {
					updateCaption();
				}
			};

			/*
			 * El slider de jQuery usa preventDefault cuando se clica sobre cualquier elemento
			 * lo que hace que el botÛn activo no pierda el foco.
			 * Esto causa problemas con la selecciÛn de subtÌtulos.
			 * Hay que lanzar el blur manualmente.
			 */
			var blurCaptionBtn = function() {
				cepda.$captionBtn.trigger('blur');
			};

			/*
			 * Lanzado cuando el usuario inicia un seek manualmente
			 * Pausa la media durante el seek y cambia el "currentTime" del slider al nuevo valor
			 */
			var startSeek = function(e, ui) {
/*
				if (seeking == true)
					return;
*/

				if(!cepda.$self.prop('paused')) {
					wasPlaying = true;
				}
				cepda.$self.trigger('pause');
				seeking = true;

				var seekLocation;
				if (options.nativeSliders) {
					seekLocation = cepda.$seek.val();
				} else {
					seekLocation = ui.value;
				}


				cepda.$self.prop('currentTime', seekLocation);

				// forzamos el blur sobre el botÛn de subtÌtulos
				blurCaptionBtn();
			};

			/*
			 * Lanzado cuando el usuario acaba de hacer seek manualmente
			 * Si la media estaba reproduciÈndose, la pone en marcha de nuevo
			 */
			var endSeek = function(e, ui) {
/*
				if (seeking == false)
					return;
*/
				if(wasPlaying) {
					if (options.nativeSliders) {
						setTimeout(function() {
					cepda.$self.trigger('play');
						},100);
					} else {
						cepda.$self.trigger('play');
					}
					wasPlaying = false;
				}
				seeking = false;
			};

			/*
			 * Inicializar el slider jQuery
			 */
			var initSeek = function() {

				// obtener las clases actuales
				var seekClass = cepda.$seek.attr('class');

				// crear el markup html final necesario y ponerlo en lugar del actual
				var	divSeek = '<div class="' + seekClass + '" title="' + options.texts.seekTitle + '"></div>';
				cepda.$seek.after(divSeek).remove();

				// obtener el nuevo elemento seek definitivo
				cepda.$seek = $('.' + seekClass, cepda.$container);

				// Creamos el elemento que har· de buffer visual
				var bufferBar = '<div class="ui-slider-range cepda-buffer"></div>';
				cepda.$seek.append(bufferBar);

				// obtener el elemento DOM que har· de buffer
				cepda.$buffer = $('.cepda-buffer', cepda.$container);

				// Ponemos las opciones propias de un slider jQuery
				var sliderOptions = {
					value: 0,
					step: 1,
					orientation: 'horizontal',
					range: 'min',
					min: 0,
					max: 100
				};
				// inicializamos el slider jQuery
				cepda.$seek.slider(sliderOptions);

			};

			/*
			 * Actualizar el slider de Seek, una vez tenemos los metadatos de la media cargados
			 * Vinculamos eventos, aÒadimos el atributo "duration" y generamos el slider jQuery
			 */
			var updateSeek = function() {
				// Obtenemos la duraciÛn de la media
				var duration = cepda.$self.prop('duration');

				// Check for the nativeSliders option
				if(options.nativeSliders) {
					cepda.$seek.attr('max', duration);
					//use input instead of change event (see: https://github.com/aFarkas/webshim/issues/297)
					cepda.$seek.bind('change', function() { startSeek(); endSeek(); }); // Change es como startseek y stopseek
					cepda.$seek.bind('mousedown', function() { debugLog("SEEK DOWN"); startSeek(); });
					cepda.$seek.bind('mouseup', function() { debugLog("SEEK UP"); endSeek(); });
				} else {
				// Ponemos las opciones para el slider jQuery
				var sliderOptions = {
					value: 0,
					step: 1,
					orientation: 'horizontal',
					range: 'min',
					min: 0,
					max: duration,
					slide: startSeek,
					stop: endSeek,
					label: 'Video seek control'
				};
				// inicializamos el slider jQuery
				cepda.$seek.slider('option', sliderOptions);
					if (isNaN(duration) == false)
						cepda.$seek.slider( "option", "max", duration );
					debugLog("ACTUALIZANDO MAX: " + duration + " - " + cepda.$seek.slider( "option", "max"));

				// Quitar el foco del botÛn de subtÌtulos manualmente cuando se clique el handle del slider
				$('.ui-slider-handle', cepda.$seek).click(blurCaptionBtn);

				// Vinculamos el avance del vÌdeo con el elemento DOM de buffer
				cepda.$self.bind('progress', showBuffer);
				}

				// Quitamos el loading
				$wrapper.removeClass('show-loading');

			};

			/*
			 * Rutina para actualizar el tamaÒo del buffer en el slider seg˙n el progreso de la media
			 */
			var showBuffer = function(e) {
				var max = parseInt(cepda.$self.prop('duration'), 10);
				var tr = cepda.$self.prop('buffered');
				if(tr && tr.length) {
					var buffer = parseInt(tr.end(0) - tr.start(0), 10);
					var bufferWidth = (buffer*100)/max;

					cepda.$buffer.css('width', bufferWidth + '%');
				}
			};

			/*
			 * Evento de cambio de volumen. Comportamiento del botÛn de volumen y su slider
			 *
			 * Cambiar el volumen a travÈs del slider y usar el localStorage para guardar el volumen entre sesiones
			 */
			var changeVolume = function(e, ui) {
				// Obtenemos el valor actual del volumen
				volume = ui.value;
				// lo guardamos en el localStorage
				if (supports_local_storage && options.saveVolumeOn)
					localStorage.setItem('cepdavolume', volume);

				// Miramos si el volumen estaba "muted" antes
				if(cepda.$self.prop('muted')) {
					cepda.$self.prop('muted', false);
					cepda.$volumeBtn.removeClass('cepda-volume-mute');
					cepda.$volumeBtn.text(options.texts.mute).attr('title', options.texts.mute);
				}

				// ponemos el nuevo volumen en a media
				cepda.$self.prop('volume', volume);

				// manually trigger the Blur event on the Caption Button
				blurCaptionBtn();
			};

			/*
			 * Mute y Unmute del volumen
			 * TambiÈn aÒadir clases y cambiar el label del volumen en el botÛn
			 */
			var muteVolume = function() {
				if(cepda.$self.prop('muted') === true) {
					cepda.$self.prop('muted', false);
					if(options.nativeSliders) {
						cepda.$volume.val(volume);
					} else {
					cepda.$volume.slider('value', volume);
					}

					cepda.$volumeBtn.removeClass('cepda-volume-mute');
					cepda.$volumeBtn.text(options.texts.mute).attr('title', options.texts.mute);
				} else {
					cepda.$self.prop('muted', true);

					if(options.nativeSliders) {
						cepda.$volume.val('0');
					} else {
					cepda.$volume.slider('value', '0');
					}

					cepda.$volumeBtn.addClass('cepda-volume-mute');
					cepda.$volumeBtn.text(options.texts.unmute).attr('title', options.texts.unmute);
				}
			};

			/*
			 * Inicializar el sistema del volumen (boton y slider)
			 *
			 * Vinculamos eventos, creamos el slider jQuery
			 */
			var initVolume = function() {
				if(options.nativeSliders) {
					cepda.$volume.bind('change', function() {
						cepda.$self.prop('muted',false);
						volume = cepda.$volume.val();
						cepda.$self.prop('volume', volume);
					});
				} else {
				var volumeClass = cepda.$volume.attr('class');

				var	divVolume = '<div class="' + volumeClass + '" title="' + options.texts.volumeTitle + '"></div>';
				cepda.$volume.after(divVolume).remove();

				cepda.$volume = $('.' + volumeClass, cepda.$container);

				var volumeSliderOptions = {
					value: volume,
					orientation: options.volumeSlider,
					range: "min",
					max: 1,
					min: 0,
					step: 0.1,
					animate: true,
					slide: changeVolume,
					label: "Volume control"
				};

				cepda.$volume.slider(volumeSliderOptions);

				cepda.$volume.$handle = cepda.$volume.find('.ui-slider-handle');

				// quitar el foco manualmente al boton de subtÌtulos cuando se pica en el handle del slider de volumen
				$('.ui-slider-handle', cepda.$volume).click(blurCaptionBtn);
				}

				cepda.$volumeBtn.click(muteVolume);
			};

			/*
			 * Comportamiento FULLSCREEN
			 *
			 * Cambiar el tamaÒo del vÌdeo mientras estamos en modo fullscreen
			 * Lo vinculamos a window.resize
			 */
			var resizeFullscreenVideo = function() {
				cepda.$self.attr({
					'width': $(window).width(),
					'height': $(window).height()
				});
			};

			/*
			 * Evento de fullscreen
			 * para cuando se sale a saco (ESC) del modo fullscreen.
			 * debe normalizar la interficie de usuario para que estÈ sincronizada.
			 * SÛlo nos llega cuando el navegador est· en fullscreen nativo y se sale
			*/
			var fullScreenChange = function(event) {
				// actualizo los elementos visuales a la nueva disposiciÛn
				$('body').css('overflow', '');
				cepda.$controls.removeClass('fullscreen-controls');
				cepda.$caption.removeClass('fullscreen-caption');

				fullscreenMode = false;
				
				// Avisamos para que pongan la toolbar a la medida que toque
				if (options.onToolbarChanged) {
					options.onToolbarChanged(cepda, options);
				}
				
			} 
			
			/*
			 * Rutina de entrada y salida del modo fullscreen
			 *
			 * Mira si hay soporte nativo para fullscreen (siempre que mantenga la interfaz y los subtÌtulos)
			 * y la aplica, o bien la simula haciendo que el vÌdeo ocupe toda la ventana
			 * o bien sale del modo fullscreen si estaba ya en fullscreen.
			 */
			/* VARIOS ELEMENTOS ADICIONALES PARA EL MODO FULLSCREEN
			var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
			var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
			*/
			var goFullscreen = function() {
				
				// Primero miramos si soportamos fullscreen
				var supportsFullscreen = !cant_go_fullscreen;
				// Miramos quÈ versiones de navegador soporta fullscreen
				
				// Si estamos en modo fullscreen, salimos de Èste
				if(fullscreenMode) {
					
				  if(document.mozCancelFullScreen && supportsFullscreen) {
				    document.removeEventListener("mozfullscreenchange", fullScreenChange);
				    document.mozCancelFullScreen();
				  } else if(document.webkitExitFullscreen && supportsFullscreen) {
				    document.removeEventListener("webkitfullscreenchange", fullScreenChange);
				    document.webkitExitFullscreen();
				  } else if(document.msCancelFullScreen && supportsFullscreen) {
				    document.removeEventListener("MSFullscreenChange", fullScreenChange);
				    document.msExitFullScreen();
				  } else if(document.exitFullscreen && supportsFullscreen) {
				    document.removeEventListener("fullscreenchange", fullScreenChange);
				    document.exitFullscreen();
				  } else {
				  	debugLog('Simulamos fullscreen');
				  	// modo pantalla completa sin fullscreen de navegador
						cepda.$self.parent().removeClass('has-fullscreen-video');
						cepda.$self.removeClass('fullscreen-video');
				    
					}
					
					// actualizo los elementos visuales a la nueva disposiciÛn
					$('body').css('overflow', '');
					cepda.$controls.removeClass('fullscreen-controls');
					cepda.$caption.removeClass('fullscreen-caption');
					if (options.fullScreenRelocateOn) {
						var $vidContainer = cepda.$self.parent();
						var playing = !cepda.$self.prop('paused');
			  		var vc = $vidContainer.detach();
			  		$("#fs_cepdavideoplayer_stub").before(vc);
			  		$("#fs_cepdavideoplayer_stub").remove();
			  		if (playing) {
			  			setTimeout(function () {
			  				playMedia();
			  			}, 200);
			  		}
			  	}

					fullscreenMode = false;

				} else { // Si no est·bamos en modo fullscreen, entramos en Èste
				
				  if(cepda.$self[0].mozRequestFullScreen && supportsFullscreen) {
				    cepda.$self[0].mozRequestFullScreen();
				    // Registramos el evento, con cierto retraso para que el fullscreen ya sea efectivo y no nos avisen
				    // para el caso de entrar en fullscreen
				    setTimeout(function() { document.addEventListener("mozfullscreenchange", fullScreenChange); }, 200);
				  } else if(cepda.$self[0].webkitRequestFullscreen && supportsFullscreen) {
				    cepda.$self[0].webkitRequestFullscreen();
				    // Registramos el evento, con cierto retraso para que el fullscreen ya sea efectivo y no nos avisen
				    // para el caso de entrar en fullscreen
				    setTimeout(function() { document.addEventListener("webkitfullscreenchange", fullScreenChange); }, 200);
				  } else if(cepda.$self[0].msRequestFullscreen && supportsFullscreen) {
				    cepda.$self[0].msRequestFullscreen();
				    // Registramos el evento, con cierto retraso para que el fullscreen ya sea efectivo y no nos avisen
				    // para el caso de entrar en fullscreen
				    setTimeout(function() { document.addEventListener("MSFullscreenChange", fullScreenChange); }, 200);
				  } else if(cepda.$self[0].requestFullscreen && supportsFullscreen) {
				    cepda.$self[0].requestFullscreen();
				    // Registramos el evento, con cierto retraso para que el fullscreen ya sea efectivo y no nos avisen
				    // para el caso de entrar en fullscreen
				    setTimeout(function() { document.addEventListener("fullscreenchange", fullScreenChange); }, 200);
				  }	else {
				  	// modo pantalla completa sin fullscreen de navegador
				  	debugLog('Simulamos fullscreen');
						cepda.$self.addClass('fullscreen-video');
						cepda.$self.parent().addClass('has-fullscreen-video');
						if (options.fullScreenRelocateOn) {
							var playing = !cepda.$self.prop('paused');
							var $vidContainer = cepda.$self.parent();
			  			$vidContainer.after('<div id="fs_cepdavideoplayer_stub" style="visibility:hidden; width: 1px; height 1px;">');
			  			var vc = $vidContainer.detach();
			  			vc.appendTo("body");
				  		if (playing) {
				  			setTimeout(function () {
				  				playMedia();
				  			}, 200);
				  		}
				  	}
					}			
				
					// entramos fullscreen: actualizmo los elementos visuales a la nueva posiciÛn
					$('body').css('overflow', 'hidden');
					cepda.$controls.addClass('fullscreen-controls');
					cepda.$caption.addClass('fullscreen-caption');

					fullscreenMode = true;

				}
				
				// Avisamos para que pongan la toolbar a la medida que toque
				if (options.onToolbarChanged) {
					options.onToolbarChanged(cepda, options);
				}
				
			};

			/*
			 * Comportamiento de los subtÌtulos
			 *
			 * Desactivando los subtÌtulos cuando falle la carga...
			 */
			var captions;
			var captionBtnActiveClass = 'cepda-caption-active';
			var captionBtnLoadingClass = 'cepda-caption-loading';

			var captionRadioName = 'cepdaCaptions' + uniqueID();

			var captionOff = function() {
				captions = '';
				cepda.$caption.hide();
				captionsActive = false;

				cepda.$captionBtn.removeClass(captionBtnActiveClass);
			};

			/*
			 * Actualizar los subtÌtulos en base a "currentTime"
			 * Obtenido y adaptado del artÌculo "Accessible HTML5 Video with JavaScripted captions" de Bruce Lawsonù
			 * http://dev.opera.com/articles/view/accessible-html5-video-with-javascripted-captions/
			 */
			var updateCaption = function() {
				// incializamos variables
				var now = cepda.$self.prop('currentTime'),
					text = '',
					i,
					captionsLength = captions.length;
				// Buscamos el subtÌtulo que nos toca mostrar
				for (i = 0; i < captionsLength; i++) {
					if (now >= captions[i].start && now <= captions[i].end) {
						text = captions[i].content; // yes? then load it into a variable called text
						break;
					}
				}
				// lo ponemos (si no encontramos ninguno, entonces "text" quedar· vacÌo)
				cepda.$caption.html(text);
			};

			/*
			 * Cargar subtÌtulos
			 * Carga archivo en formato SRT 
			 * Recibe la url de los subtÌtulos como par·metro de entrada
			 */
			var loadCaption = function(url) {
				// AÒadimos la clase de "cargando" para que aparezca el indicador
				cepda.$captionBtn.addClass(captionBtnLoadingClass);
				// Lanzamos la llamada AJAX para cargar el archivo
				var jqXHR = $.ajax({
					url: url,
					dataType: "text",	// indicamos que el formato es texto
					success: function(data) {
						/*
						 * Si todo va bien, parseamos el SRT
						 * Usamos el parser SRT de  Silvia Pfeiffer <silvia@siliva-pfeiffer.de>
						 * (la rutina est· al final del archivo)
						 */
						 
						captions = parseSrt(data);

						// Ahora indicamos que hay que recalcular la medida de la toolbar, al aÒadir el botÛn
						// de subtÌtulos
						if (options.onToolbarChanged)
							options.onToolbarChanged(cepda, options);
							
						// Mostramos los subtÌtulos
						cepda.$caption.show();
						captionsActive = true;

						// En caso de que la media estÈ en pausa, actualizamos los subtÌtulos para que se vean los actuales
						if(cepda.$self.prop('paused')) {
							updateCaption();
						}

						cepda.$captionBtn.addClass(captionBtnActiveClass).removeClass(captionBtnLoadingClass);
					},
					error: function() {
						// Si hay alg˙n error, desactivo el botÛn de subtÌtulos
						captionOff();
						// AquÌ podrÌamos mostrar un mensaje al usuario, si acaso
					}
				});
			};

			/*
			 * InicializaciÛn y carga de subtÌtulos
			 */
			var initCaption = function() {
				
				hasCaptions = false;
				
				// get all <track> elements
				cepda.$track = $('track', cepda.$self);

				// Si hay al menos un elemento DOM <track>, mostramos el botÛn
				if(cepda.$track.length) {
					cepda.$captionBtn.show();
					// Avisamos para que pongan la toolbar a la medida que toque
					// al aÒadir el nuevo botÛn
					if (options.onToolbarChanged) {
						options.onToolbarChanged(cepda, options);
					}
				} else {
					captionOff();
					cepda.$captionBtn.unbind('click');
					captions = '';
					cepda.$caption.hide();
					cepda.$captionBtn.hide();
					if (options.onToolbarChanged) {
						options.onToolbarChanged(cepda, options);
					}
					hasCaptions = false;
					return;
				}

				// Miramos si hay un track de subtÌtulos (el primero)
				if(cepda.$track.length) {
					
					hasCaptions = true;
					
					// Si sÛlo hay un elemento <track>
					// cargamos directamente los subtÌtulos al picar sobre el botÛn de subtÌtulos
					var tracksrc = cepda.$track.attr('src');
					cepda.$captionBtn.bind('click', function() {
						if(cepda.$captionBtn.hasClass(captionBtnActiveClass)) {
							captionOff();
						} else {
							loadCaption(tracksrc);
							cepda.$captionBtn.addClass(captionBtnActiveClass);
						}
					});

					// Cargamos los subtÌtulos por defecto si tenemos la opciÛn activa
					if(options.captionsOn) {
						loadCaption(tracksrc);
						cepda.$captionBtn.addClass(captionBtnActiveClass);
					}
				}

			};

			/*
			 * FunciÛn de inicializaciÛn general (la llama el constructor)
			 * Se encarga de inicializar todo, vincular eventos y eliminar los controles nativos de la media
			 */
			var init = function() {
				

				// Avisamos para que pongan la toolbar a la medida que toque
				if (options.onToolbarChanged) {
					options.onToolbarChanged(cepda, options);
				}

				// 8/10/2015 - en iOS 9, si usamos touchstart como evento de origen del playMedia(), el vÌdeo
				// no arranca. En cambio si usamos click sÌ que lo hace.
				// CAMBIAMOS 'touchstart' por 'click' siempre.
				
				// Click del botÛn play/pause
				cepda.$playBtn.bind( (is_touch_device) ? 'click' /*'touchstart'*/ : 'click', playMedia);
				
				// BIG Play button
				if (options.bigBtnOn && !cant_show_big_play)
					cepda.$bigBtn.bind( (is_touch_device) ? 'click' /*'touchstart'*/: 'click', playMedia);

				if (document.createElement('video').canPlayType) {
					cepda.$self.bind((is_touch_device) ? 'click' /*'touchstart'*/: 'click', playMedia);
				}

				// Eventos del propio vÌdeo
				cepda.$self.bind('play', startPlayback);
				cepda.$self.bind('pause', stopPlayback);
				cepda.$self.bind('ended', stopPlayback);

				// Evento de actualizaciÛn de tiempo para el slider (que se vaya actualizando)
				cepda.$self.bind('timeupdate', seekUpdate);

				// Eventos del modo fullscreen (por defecto el botÛn est· desactivado, hasta que se empiece a reproducir el vÌdeo)
				cepda.$fullscreenBtn.prop('disabled',true);
				cepda.$fullscreenBtn.click(goFullscreen);

				// InicializaciÛn del volumen (botÛn y slider)
				initVolume();
				
				// En iOS no podemos poner el volumen, pues iOS no deja controlar el volumen desde HTML
				if (cant_manage_volume) {
					cepda.$volumeBtn.css('display', 'none');
				}

				// InicializaciÛn del slider de seek
				if (!options.nativeSliders)
				initSeek();

				// Evento de metadata cargada
				cepda.$self.bind('loadedmetadata', function() {
					/* Uso un intervalo de 500ms para asegurarme de que pase a estado "readyState"
					 * para saltarme un bug de webkit que hace que loadedmetadata sea llamado antes de que
					 * efectivamente la informaciÛn de la duraciÛn estÈ disponible.
					 */
					var t = window.setInterval(function() {
								if (cepda.$self.prop('readyState') > 0) {
									loadedMetadata = true;
									updateSeek();

									clearInterval(t);
								}
							}, 500);

					initCaption();
				});
				
				// Evento de duration change
				cepda.$self.bind('durationchange', function() {
					updateSeek();
				});
				

				// Quitamos los controles nativos del vÌdeo/audio
				cepda.$self.prop('controls', false);

				// Si es audio, aÒadimos la clase "audio-player"
				if(cepda.$self.is('audio')) {
					/*
					 * Si la media es de tipo <audio>, aÒadimos la clase "audio-player".
					 * Por lo visto, en Opera 10.62 no se puede "tunerar" un tag <audio> con CSS
					 * por lo que lo "marcamos" con la clase "audio-player" para que pueda hacer dicho trabajo.
					 */
					cepda.$container.addClass('audio-player');
				}
				
				// Forzamos la actualizaciÛn del slider de seek la primera vez (para iOS)
				if (is_ios_browser) {
					updateSeek();
				}
				if (options.onToolbarChanged)
					options.onToolbarChanged(cepda, options);
				
				// Si est· en modo autoplay, ponemos el vÌdeo en marcha
				// (excepto para iOS, que no deja)
				if (options.autoplayOn && !is_ios_browser) {
					playMedia();
				}

				// AÒadio API PUBLIC al objeto CEPDA para cambiar el vÌdeo
				cepda.playPause = function () { 
					playMedia();
				};

				cepda.isPlaying = function () {
					if(!this.$self.prop('paused')) {
						return true;
					} else {
						return false;
					}
				}

				cepda.getDuration = function() {
					return this.$self.prop('duration');
				}

				cepda.seek = function (seekLocation) {
					this.$self.prop('currentTime', seekLocation);
				}

				cepda.loadVideo = function(videoUrl, srtUrl, srtLang, srtLabel) {
					// Paramos el vÌdeo si est· reproduciÈndose
					if (this.isPlaying())
						this.playPause();
					// Ahora cargamos el nuevo vÌdeo
					this.$self.children("source").attr("src", videoUrl);
					this.$self.children("track").remove();
					if (srtUrl != null && srtUrl != undefined && srtUrl != "") {
						$("<track src=\"" + srtUrl + "\" kind=\"subtitles\" srclang=\"" + srtLang + "\" label=\"" + srtLabel + "\" />").appendTo(this.$self);
					}
					// Lanzamos la carga del vÌdeo (en 100 ms).
					this.$self[0].load();

				}

				cepda.resize = function(newWidth, newHeight) {
					this.$self.css({ width: newWidth + "px", height: newHeight + "px" });
					// Si es audio, fem el contenidor de la mida indicada
					if (this.$self.prop("tagName").toLowerCase() == "audio")
						this.$self.parent().css({ width: newWidth + "px" });
					if (options.onToolbarChanged)
						options.onToolbarChanged(cepda, options);
				}

				cepda.setScale = function (newScale) {
					if (options.nativeSliders == false && this.$seek != null) {
						this.$seek.slider('scale', newScale);
					}
				}

			}();

		};

		// Hacemos este proceso por todos los elementos que cumplan con el criterio de incializaciÛn
		return this.each(cepdaPlayer);
	};

})(jQuery);

/*
 * parseSrt function
 * JavaScript SRT parser by Silvia Pfeiffer <silvia@siliva-pfeiffer.de>
 * http://silvia-pfeiffer.de/
 *
 * Tri-licensed under MPL 1.1/GPL 2.0/LGPL 2.1
 *  http://www.gnu.org/licenses/gpl.html
 *  http://www.gnu.org/licenses/lgpl.html
 *  http://www.mozilla.org/MPL/
 *
 * The Initial Developer of the Original Code is Mozilla Corporation.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *  Silvia Pfeiffer <silvia@siliva-pfeiffer.de>
 *
 *
 */
function parseSrt(data) {
	var srt = data.replace(/\r+/g, ''); // remove dos newlines
	srt = srt.replace(/^\s+|\s+$/g, ''); // trim white space start and end
	srt = srt.replace(/<[a-zA-Z\/][^>]*>/g, ''); // remove all html tags for security reasons

	// get captions
	var captions = [];
	var caplist = srt.split('\n\n');
	for (var i = 0; i < caplist.length; i=i+1) {
		var caption = "";
		var content, start, end, s;
		caption = caplist[i];
		s = caption.split(/\n/);
		if (s[0].match(/^\d+$/) && s[1].match(/\d+:\d+:\d+/)) {
			// ignore caption number in s[0]
			// parse time string
			var m = s[1].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/);
			if (m) {
				start =
				(parseInt(m[1], 10) * 60 * 60) +
				(parseInt(m[2], 10) * 60) +
				(parseInt(m[3], 10)) +
				(parseInt(m[4], 10) / 1000);
				end =
				(parseInt(m[5], 10) * 60 * 60) +
				(parseInt(m[6], 10) * 60) +
				(parseInt(m[7], 10)) +
				(parseInt(m[8], 10) / 1000);
			} else {
				// Unrecognized timestring
				continue;
			}
			// concatenate text lines to html text
			content = s.slice(2).join("<br>");
		} else {
			// file format error or comment lines
			continue;
		}
		captions.push({start: start, end: end, content: content});
	}

	return captions;
}
