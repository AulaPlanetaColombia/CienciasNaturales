	//***************************************************************
	// Varibales y funciones generales
	//***************************************************************
	var actionsReady = false;
	var xmlEditor = null;
	//var interfaceInputs = new MInputs();

	// Variables Globales
	var scormConfig;
	var lastFileValue = "";
	var xmlDocu;
	var resiz = new XResize('contenedor_actividad');

	var IDTarea = 0;
	var IDAlumno = 0;
	var IDProfesor = 0;
	var URL = "";

	//***************************************************************
	// RUTINAS DE UTILIDAD
	//***************************************************************
	// RUTINA PARA OBTENER UN PAR�?METRO DE LA URL
	function getQueryParamMotor(pName) {
		var CurrURL = location.href;
		var ParamsPos = CurrURL.indexOf("?", 0);
		if (ParamsPos > 0) {
			var ParamsStr = CurrURL.substr(ParamsPos+1, CurrURL.length);
			var Params = ParamsStr.split("&");
			for (var i=0;i<Params.length;i++) {
				if (Params[i].indexOf(pName + "=", 0) === 0) {
					return unescape(Params[i].substr(pName.length + 1, Params[i].length));
				}
			}
		}
		return "";
	}

	function saveXMLData(xmlData, mode, outUrl) {
		// Enviar XML generado a un servidor de prueba por POST
		if (outUrl !== '') {
			$("#out_xmldata").val(xmlData);
			$("#out_mode").val(mode);
			$("#out_form").attr("action", outUrl);
			$("#out_form").submit();
		}
	}

	function showXMLData(xmlData) {
		alert(xmlData);
	}

	function postDocument(mode) {
		var xe = checkXML();
		if (xe.hasErrors()) {
			alert('El documento tiene errores y NO podemos guardarlo para previsualizar');
			return;
		} else if (xe.hasWarnings()) {
			alert('El documento tiene elementos que habría que revisar antes de darlo por definitivo. ¿Estás seguro de que quieres guardarlo?');
		}
		var xmlData = xmlEditor.saveDocumentAsString();
		var outUrl = getQueryParamMotor('out_url');
		if (outUrl != null && outUrl != "") {
			saveXMLData(xmlData,mode,outUrl);
		} else {
			showXMLData(xmlData);
		}
	}



	// En esta función se irán poniendo requisitos generales para la aplicación
	function initJQuery() {
		// Testear IE en jQuery 2.0 (la propiedad jQuery.browser.msie en versiones previas a 1.9 no existe)
		jQuery.browser = new Object();
		jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
	}

	//***************************************************************
	// EVENTOS
	//***************************************************************
	function onClickDownload(element) {
		element.form.submit();
	}

	// M102
	function loadXMLM102( onDocumentLoaded ) {
		// Miramos en in_url o en datos_xml
		var xmlUrl = getQueryParamMotor('in_url');
		if (xmlUrl == null || xmlUrl == "")
			xmlUrl = getQueryParamMotor('datos_xml');
		// Per defecte es data/datos.xml
		if (xmlUrl == null || xmlUrl == "")
			xmlUrl = "data/datos.xml?time=" + new Date().getTime();
		xmlUrl = pppPreloader.from("data", xmlUrl);
		// Cargamos el fichero XML de datos con la librería XDOM
		XDOM.newXMLFromURL(xmlUrl, /*onSuccess*/function (xmlDoc) {
			//alert(XDOM.XMLToString(xmlDoc));
			xmlDocu = xmlDoc;
			var value = XDOM.valueOfNode(xmlDoc, "plataforma.titulo");
			XHTML.setElementContent("plataforma.titulo", value);
			value = XDOM.valueOfNode(xmlDoc, "enunciado");
			XHTML.setElementContent("enunciado", XHTML.xmlToHtml(value));
			var idiomaXML = XDOM.valueOfNode(xmlDoc, "plataforma.lang");
			LangRes.setLangId(LangRes.getLangIdFromString(idiomaXML));
			document.title = LangRes.curLang[LangRes.HTML_PAGE_TITLE];
			onDocumentLoaded();
		}, /*onError*/function (textStatus, errorThrown) {
			alert("Error al intentar procesar el archivo XML:\n- Status: " + textStatus + ".\n -Error: " + errorThrown);
		});
	}

	function addContent(xmlDoc) {
		var htmlMsg = $('#mensaje').html();
		if (htmlMsg)
			$('#mensaje').html(htmlMsg.replace(/Cargando actividad\.\.\./, LangRes.curLang[LangRes.CARGANDO_ACT]));
		var adjunto = XDOM.valueOfNode(xmlDoc, "adjunto");
		adjunto = $.trim(adjunto);
		if (adjunto != "") {
			var dotIndex = adjunto.lastIndexOf(".");
			var extension;
			if (dotIndex != -1)
				extension = adjunto.substring(dotIndex+1).toLowerCase();
			else
				alert("Error adjunto sin extension " + adjunto);
			//alert(extension);
			switch (extension) {
				case "pdf":
					// De moment el posem com descàrrega
					renderDownloadContent("contenido_embed", adjunto, "doc");
					break;
				case "doc":
				case "docx":
				case "txt":
				case "xls":
				case "xlsx":
				case "ppt":
				case "pptx":
					renderDownloadContent("contenido_embed", adjunto, "doc");
					break;
				case "mp3":
				case "wav":
					renderDownloadContent("contenido_embed", adjunto, "audio");
					break;
				/*
				case "swf":
					renderFlashContent("contenido_embed", adjunto);
					break;
				case "flv":
					renderFlashVideoContent("contenido_embed", adjunto);
					break;
				*/
				case "jpg":
				case "jpeg":
				case "gif":
				case "png":
				case "bmp":
					renderImageContent("contenido_embed", adjunto);
					break;
				case "mp4":
					renderMP4Content("contenido_embed", adjunto);
					break;
					render
				case "htm":
				case "html":
					renderHtmlContent("contenido_embed", adjunto);
					break;
				case undefined: // caso de que el fichero no tiene extensión (no tiene punto)
					break;
				default:
					// Si no se ha reconocido la extension, se pone como descargable con icono especial
					renderDownloadContent("contenido_embed", adjunto, "other");
			}
		} else { // Deu ser una URL
			var url = XDOM.valueOfNode(xmlDoc, "url");
			url = $.trim(url);
			if (url != "") {
				if (url.indexOf("www.youtube.com/") != -1)
					renderYouTubeContent("contenido_embed", url);
				else
					renderURLContent("contenido_embed", url);
			}

		}
	}
	
	function renderDownloadContent(contentId, adjunto, extension) {

		var content = document.getElementById(contentId);
		var fileName = "";
		switch (extension) {
			case "pdf":
				fileName = "ico_" + extension + ".jpg";
				break;
			case "doc":
				fileName = "ico_" + extension + ".png";
				break;
			case "audio":
				fileName = "ico_" + extension + ".png";
				break;
			default:
				fileName = "ico_other.png";
		}
		var downloadHTMLContent = 
					'<div class="caja_desc">' + 
						'<form method="get" action="' + pppPreloader.from('data', 'data/adjuntos/'+adjunto) + '" target="_blank">' + 
						'<ul>' + 
							'<li class="tit"><h2>'+LangRes.curLang[LangRes.DESCARGAR_ARCH_TIT]+'</h2></li>' + 
							'<li><div class="adjunto_descarga" '+((jQuery.browser.msie==true)?'style="padding-top:0px;"':'')+'><img src="' + pppPreloader.from('module', 'motor/images/' + fileName) + '" /></div><div class="nom_archivo" '+((jQuery.browser.msie==true)?'style="padding-top:0px;"':'')+'><strong>'+adjunto+'</strong><span id="fileSize"></span> </div><div class="bt_descarg" style="margin: 0;'+((jQuery.browser.msie==true)?' padding-top:0px;':'')+'"><input type="button" name="pdf_desc" value="'+((jQuery.browser.msie==true)?'   ':'')+LangRes.curLang[LangRes.DESCARGAR_ARCH]+'" onClick="javascript: this.target=\'_blank\'; onClickDownload(this); return false;" /></div><div class="clearfix"></div></li>' + 
						'</ul>' + 
						'</form>' + 
					'</div>';
		content.innerHTML = downloadHTMLContent;

		// Mirem de carregar (asíncronament) la mida de l'arxiu
		/*var xhr = new XMLHttpRequest();
		xhr.open('HEAD', "data/adjuntos/" + adjunto, true);
		xhr.onreadystatechange = function() {
			var contLen = xhr.getResponseHeader('Content-Length');
			if ( xhr.readyState == 4 ) {
				if ( xhr.status == 200 ) {
					if (contLen != null)
						if ($.trim(contLen) != "")
							document.getElementById("fileSize").innerHTML = " (" + contLen + " bytes)";
				}
			}
		};
		xhr.send(null);*/
	}

	function renderFlashContent(contentId, adjunto) {
		var content = document.getElementById(contentId);
		$(content).html('<div id="contenido_embed_flash" style="height: 100%; min-height: 440px; padding: 0px; margin: 0px; overflow: hidden; position: relative;"></div>');
		var contentFlash = document.getElementById('contenido_embed_flash');
		setTimeout(function () {
		//alert("content size: " + content.offsetWidth + " x " + content.offsetHeight);
		var params = new Array();
		params.wmode = "window"; 
			swfobject.embedSWF(pppPreloader.from('data', "data/adjuntos/" + adjunto), contentFlash, contentFlash.offsetWidth-(39*2), contentFlash.offsetHeight, 10, "expressInstall.swf", {}, params);
		$(content).html($(content).html()+"<div id='expand_content'></div>");
		$('#expand_content').css('visibility', 'visible');
		$('#expand_content').click(function() {
			window.open(pppPreloader.from('data', "data/adjuntos/" + adjunto), 'Adjunto', 'height='+window.screen.height+',width='+window.screen.width+',top=0,left=0,resizable,scrollbars=1')
		});
		}, 0);
	}

	function renderFlashVideoContent(contentId, adjunto) {
		var content = document.getElementById(contentId);
		//alert("content size: " + content.offsetWidth + " x " + content.offsetHeight);
		var flashvars = {
			ruta_flv: "../data/adjuntos/" + adjunto // IMPORTANTE: path respecto al SWF de reproducción del vídeo
		};
		var params = {
			menu: "false",
			wmode: "transparent",
			allowScriptAccess: "sameDomain",
			allowFullScreen: true
		};
		var attributes = {
			id: "flvPlayer"
		};
		swfobject.embedSWF(pppPreloader.from('module', "motor/pppVideoPlayer.swf"), content, content.offsetWidth, content.offsetHeight, 10, "expressInstall.swf", flashvars, params, attributes);
	}
	function renderMP4Content(contentId, adjunto) {
		var content = document.getElementById(contentId);
		var tagContent = '<video id="mivideo" controls="controls" width="' + content.offsetWidth + 'px" height="' + content.offsetHeight + 'px" preload="metadata" style="_visibility: hidden;">' +
							'<source type="video/mp4" src="' + pppPreloader.from('data', 'data/adjuntos/' + adjunto) + ' " />' +
							'</video>';
		$(content).html(tagContent);
		initMediaPlayer();
	}

	function renderImageContent(contentId, adjunto) {
		var content = document.getElementById(contentId);
		content.innerHTML = "<img id=\"img_to_show\" style=\"visibility: hidden; position: absolute;\" src=\"" + pppPreloader.from('data', "data/adjuntos/" + adjunto) + "\" onload=\"adjustImageContent('" + contentId + "', 'img_to_show');\"><div id='expand_content'></div>";
	}

	function adjustImageContent(contentId, imageId) {
		
		// Requeisitos previos a tener en cuenta
		// para redimensionar la imagen teniendo en cuenta
		// que al lado aparecerá un botón de expandir
		// 1. - Saber si la longitud de la imagen (despues de ser escalada)
		//	mas la longitud del botón provocarán que se vean cortados
		//	(alguna parte sale fuera del contenedor).
		// Si es así, el escalado (función ScaleImage) debe hacerse
		// teniendo en cuenta que el contenedor es mas pequeño,
		// en concreto su tamaño de ancho menos la anchura del botón.

		// Ajustem la mida
		var showExpandBut = false;
		var content = document.getElementById(contentId);
		var img = document.getElementById(imageId);

		// Mirem la mida de content i la de img i deduim si hi cap la imatge
		var conW = content.offsetWidth;
		var conH = content.offsetHeight;
		var imgW = img.offsetWidth;
		var imgH = img.offsetHeight;

		// compute the new size and offsets
		var result = ScaleImage(imgW, imgH, conW, conH, true, false);
		//alert(imgW+" "+imgH+" "+result.width+" "+result.height);

		// Mirar si la imagen se muestra en tamaño real
		// (no necesita ampliarse)
		if (result.width != imgW || result.height != imgH) {
			$('#expand_content').css('visibility', 'visible');
			$('#expand_content').click(function() {
				window.open($('#img_to_show').prop('src'), 'Adjunto', 'height='+window.screen.height+',width='+window.screen.width+',top=0,left=0,resizable,scrollbars=1')
			});
			//alert(result.width+"-"+imgW+"-"+result.height+"-"+imgH);
			showExpandBut = true;
		}

		// comprobar que el botón no se sale del contenedor
		if (showExpandBut && (result.targetleft + result.width + 39) > conW)
			result = ScaleImage(imgW, imgH, (conW-39), conH, true, false);

		// adjust the image coordinates and size
		img.width = result.width;
		img.height = result.height;
		$(img).css("left", result.targetleft);
		$(img).css("top", result.targettop);

		$(img).css("visibility", "visible");
		
		if (showExpandBut) {
			// Ahora retocamos la posición del botón de "expandir" para que
			// apareca en la parte superior derecha fuera de la imagen
			$('#expand_content').css("left", result.targetleft + result.width);
			$('#expand_content').css("top", result.targettop);
		}
	}

	/*
	 * Source: 
	 * http://selbie.wordpress.com/2011/01/23/scale-crop-and-center-an-image-with-correct-aspect-ratio-in-html-and-javascript/
	 * 
	 * This function does the math to decide how to scale the image to fit 
	 * within (or across) a specified area. It does not matter if the image or 
	 * target are in portrait or landscape orientations. The code above will 
	 * return the correct result. It also doesn’t matter if the image is 
	 * “scaling down�? (the common case for thumbnails) or “scaling up�? for 
	 * images smaller than it’s parent.  The image will fill the parent. 
	 * (It would be trivial to modify the ScaleImage function to have a “not grow�? mode.
	 * 
	 * The function takes 6 parameters:

	 * srcwidth – integer width of the source image that we want to scale
	 * srcheight – integer height of the source image that we want to scale.
	 * targetwidth – integer width of the parent element that we want to fit the image into
	 * targetheight – integer height of the parent element that we want to fit the image into
	 * fLetterBox – True if we want the "fitted" mode. Otherwise, the function uses the “zoom�? mode.
	 * fGrow - True if we want to fit image size to container (if image is smaller).

	 * Returns an object with the following properties defined:

	 * width – new width that should be applied to the image for scaling
	 * height – new height that should be applied to the image for scaling
	 * targetleft – What the left position attribute of the image should be (can be negative)
	 * targettop – What the top position attribute of the image should be (can be negative)
	 * fScaleToTargetWidth – bool indicating which dimension was clamped down to fit exactly the size of the parent. (The other dimension was set to keep the aspect ratio correct).
	 */
	function ScaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox, fGrow) {

		var result = { width: 0, height: 0, fScaleToTargetWidth: true };

		if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
		    return result;
		}

		var fit = false;
		if (fGrow === false) {
			// Look if image fit inside container
			fit = (srcwidth <= targetwidth && srcheight <= targetheight);
		}

		// scale to the target width
		var scaleX1 = targetwidth;
		var scaleY1 = (srcheight * targetwidth) / srcwidth;

		// scale to the target height
		var scaleX2 = (srcwidth * targetheight) / srcheight;
		var scaleY2 = targetheight;

		// now figure out which one we should use
		var fScaleOnWidth = (scaleX2 > targetwidth);
		if (fScaleOnWidth) {
		    fScaleOnWidth = fLetterBox;
		}
		else {
		   fScaleOnWidth = !fLetterBox;
		}

		if (fGrow === false && fit == true) {
			result.width = srcwidth;
			result.height = srcheight;
			if (fScaleOnWidth) {
			    result.fScaleToTargetWidth = true;
			}
			else {
			    result.fScaleToTargetWidth = false;
			}
		}else {
			if (fScaleOnWidth) {
			    result.width = Math.floor(scaleX1);
			    result.height = Math.floor(scaleY1);
			    result.fScaleToTargetWidth = true;
			}
			else {
			    result.width = Math.floor(scaleX2);
			    result.height = Math.floor(scaleY2);
			    result.fScaleToTargetWidth = false;
			}
		}
		result.targettop = Math.floor((targetheight - result.height) / 2);
		result.targetleft = Math.floor((targetwidth - result.width) / 2);

		return result;
	}

	/* REVISAR - OBSOLETA
	function renderPDFContent(contentId, adjunto, extension) { // NO SE USA
		var success = new PDFObject({ url: "../pdf/" + value }).embed(contentId);
		// Si no se carga bién lo ponemos como disponible para descarga
		if (success == false) {
			renderDownloadContent(contentId, adjunto, extension);
		}
	}
	*/
	
	function renderHtmlContent(contentId, adjunto) {
		var content = document.getElementById(contentId);
		/* IFRAME INTEGRAT
		content.innerHTML = "<iframe id=\"iframeUrl\" frameborder=\"0\" height=\"445px\" width=\"100%\"></iframe><div id='expand_content'></div>";
		adjustHTMLContent("data/adjuntos/" + adjunto, "iframeUrl");
		document.getElementById("iframeUrl").src = pppPreloader.from('data', "data/adjuntos/" + adjunto);
		*/
		// IFRAME EXTERN
		if (resiz._isIOS)
			$(document.body).append('<iframe id="iframeUrlExt" style="position: absolute; visibility: hidden; top: 0; left: 0; width: 1px; height: 1px;" frameborder="0" src="about:blank" scrolling="no"></iframe><div id="expand_contentExt"></div>');
		else
			$(document.body).append('<iframe id="iframeUrlExt" style="position: absolute; visibility: hidden; top: 0; left: 0; width: 1px; height: 1px;" frameborder="0" src="about:blank"></iframe><div id="expand_contentExt"></div>');
		var extiframe = document.getElementById("iframeUrlExt");
		setGlobalFramePos(contentId, "iframeUrlExt", true);
		adjustExtHTMLContent(pppPreloader.from('data', "data/adjuntos/" + adjunto), "iframeUrlExt");
		$('#iframeUrlExt').css('visibility', 'visible');
		extiframe.src = pppPreloader.from('module', pppPreloader.from('data', "data/adjuntos/" + adjunto));
		// Afegim callback
		resiz.resizeCallbacks.push(function () {
			var extiframe = document.getElementById("iframeUrlExt");
			setGlobalFramePos(contentId, "iframeUrlExt", true);
			adjustExtHTMLContent(pppPreloader.from('data', "data/adjuntos/" + adjunto), "iframeUrlExt", true);
			var $exp_but = $('#expand_contentExt');
			/* Sistema de escalado antiguo por CSS que el resultado en pantalla es borroso */
			$exp_but.css("-ms-transform-origin", "0 0");
			$exp_but.css("-ms-transform-origin-x", "0px");
			$exp_but.css("-ms-transform-origin-y", "0px");
			$exp_but.css("-webkit-transform-origin-x", "0px");
			$exp_but.css("-webkit-transform-origin-y", "0px");
			$exp_but.css("-moz-transform-origin-x", "0px");
			$exp_but.css("-moz-transform-origin-y", "0px");
			$exp_but.css("-o-transform-origin-x", "0px");
			$exp_but.css("-o-transform-origin-y", "0px");
			$exp_but.css("transform-origin-x", "0px");
			$exp_but.css("transform-origin-y", "0px");
			$exp_but.css("transform-origin", "0 0");
			$exp_but.css("-ms-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("-moz-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("-o-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("-webkit-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("transform", "scale("+resiz.scale+","+resiz.scale+")");
		});
		// FIN IFRAME EXTERN
	}

	function setGlobalFramePos(contentId, frameId, expand) {
		var pos = $("#" + contentId).offset();
		var expandSize = 0;
		if (expand == true)
			expandSize = 39 + 10;
		var width = ($("#" + contentId).width()  - expandSize)* resiz.scale;
		var height = $("#" + contentId).height() * resiz.scale;
		//alert("OFFSET: " + pos.left + " , " + pos.top + " - SIZE: " + width + " x " + height);
		$("#" + frameId).css( { width: width + "px", height: height + "px", left: pos.left + "px", top: pos.top + "px"});
	}

	function setGlobalFrameContainerPos(contentId, frameContainerId, expand) {
		var pos = $("#" + contentId).offset();
		var expandSize = 0;
		if (expand == true)
			expandSize = 39 + 10;
		var width = ($("#" + contentId).width()  - expandSize)* resiz.scale;
		var height = $("#" + contentId).height() * resiz.scale;
		//alert("OFFSET: " + pos.left + " , " + pos.top + " - SIZE: " + width + " x " + height);
		var $frameContainerElem = $("#" + frameContainerId);
		$frameContainerElem.css( { width: width + "px", height: height + "px", left: pos.left + "px", top: pos.top + "px"});
		$("#" + frameContainerId).find("#iframeUrlExt").each(function (ind) {
			$(this).css( { width: (width) + "px", height: (height) + "px", left: 0 + "px", top: 0 + "px"});
		});
	}
	
	function renderURLContent(contentId, url) {
		if (!url || url.length == 0)
			return;
		if (url.indexOf("http://") != 0)
			url = "http://" + url;
		/* IFRAME INTEGRAT
		var content = document.getElementById(contentId);
		content.innerHTML = "<iframe id=\"iframeUrl\" frameborder=\"0\" height=\"445px\" width=\"100%\"></iframe><div id='expand_content'></div>";
		adjustHTMLContent(url, "iframeUrl");
			document.getElementById("iframeUrl").src = url;
		*/
		/* IFRAME EXTERN */
		if (resiz._isIOS) {
			$("#iframeExtContainer").append('<iframe id="iframeUrlExt" style="position: relative; visibility: hidden; top: 0; left: 0; width: 1px; height: 1px;" frameborder="0" src="about:blank" scrollbars="auto"></iframe>');
			$(document.body).append('<div id="expand_contentExt"></div>');
			$('#iframeUrlExt').css('overflow', 'scroll');
			$('#iframeUrlExt').css('-webkit-overflow-scrolling', 'touch');
		} else {
			$(document.body).append('<iframe id="iframeUrlExt" style="position: absolute; visibility: hidden; top: 0; left: 0; width: 1px; height: 1px;" frameborder="0" src="about:blank"></iframe><div id="expand_contentExt"></div>');
		}
		var extiframe = document.getElementById("iframeUrlExt");
		if (resiz._isIOS) {
			setGlobalFrameContainerPos(contentId, "iframeExtContainer", true);
			adjustExtHTMLContent(url, "iframeExtContainer");
		} else {
			setGlobalFramePos(contentId, "iframeUrlExt", true);
			adjustExtHTMLContent(url, "iframeUrlExt");
		}
		$('#iframeUrlExt').css('visibility', 'visible');
		if (resiz._isIOS)
			resiz.repositionEnabled = false;
		extiframe.src = url;
		// Afegim callback
		resiz.resizeCallbacks.push(function () {
			var extiframe = document.getElementById("iframeUrlExt");
			if (resiz._isIOS) {
				setGlobalFrameContainerPos(contentId, "iframeExtContainer", true);
				adjustExtHTMLContent(url, "iframeExtContainer", true);
			} else {
				setGlobalFramePos(contentId, "iframeUrlExt", true);
				adjustExtHTMLContent(url, "iframeUrlExt");
			}
			var $exp_but = $('#expand_contentExt');
			/* Sistema de escalado antiguo por CSS que el resultado en pantalla es borroso */
			$exp_but.css("-ms-transform-origin", "0 0");
			$exp_but.css("-ms-transform-origin-x", "0px");
			$exp_but.css("-ms-transform-origin-y", "0px");
			$exp_but.css("-webkit-transform-origin-x", "0px");
			$exp_but.css("-webkit-transform-origin-y", "0px");
			$exp_but.css("-moz-transform-origin-x", "0px");
			$exp_but.css("-moz-transform-origin-y", "0px");
			$exp_but.css("-o-transform-origin-x", "0px");
			$exp_but.css("-o-transform-origin-y", "0px");
			$exp_but.css("transform-origin-x", "0px");
			$exp_but.css("transform-origin-y", "0px");
			$exp_but.css("transform-origin", "0 0");
			$exp_but.css("-ms-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("-moz-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("-o-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("-webkit-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("transform", "scale("+resiz.scale+","+resiz.scale+")");
		});
		if (resiz._isIOS) {
			$(extiframe).load(function() {
				resiz.repositionEnabled = true;
				// Procesamos todas las reposiciones pendientes que habian llegado
				// mientras la resposición no estaba disponible
				// Pero realmente solo hace falta una
				setTimeout(function () {
					resiz.reposition();
				}, 500);
			});
		}
		// FIN IFRAME EXTERN
	}
	
	function adjustHTMLContent(url, frameId) {
		var fram = document.getElementById(frameId);
		$(fram).css('float', 'left');
		fram.width = $(fram).width() - 39 - 10; // con jquery obtenemos el ancho "computado"
		$('#expand_content').css('visibility', 'visible');
		$('#expand_content').click(function() {
			window.open(url, 'Adjunto', 'height='+window.screen.height+',width='+window.screen.width+',top=0,left=0,resizable,scrollbars=1');
		});
	}
		
	function adjustExtHTMLContent(url, frameId, updating) {
		var fPos = $("#" + frameId).offset();
		var fWidth = $("#" + frameId).width();
		$('#expand_contentExt').css({ visibility: 'visible', left: fPos.left + fWidth + (10 * resiz.scale), top: fPos.top});
		if (!updating) {
			$('#expand_contentExt').click(function() {
				window.open(url, 'Adjunto', 'height='+window.screen.height+',width='+window.screen.width+',top=0,left=0,resizable,scrollbars=1');
			});
		}
	}
	
	function renderYouTubeContent(contentId, url) {
		var videoId = getQueryParamMotorUrl(url, "v");
		var url = "//www.youtube.com/embed/" + videoId;
		/* IFRAME INTEGRAT
		var content = document.getElementById(contentId);
		// Altenativa
		//renderURLContent(contentId, url);
		// Directo
		content.innerHTML = "<iframe id=\"iframeUrl\" frameborder=\"0\" height=\"445px\" width=\"100%\"></iframe>";
		document.getElementById("iframeUrl").src = url;
		*/
		/* IFRAME EXTERN */
		if (resiz._isIOS)
			$(document.body).append('<iframe id="iframeUrlExt" style="position: absolute; visibility: hidden; top: 0; left: 0; width: 1px; height: 1px;" frameborder="0" src="about:blank" scrolling="no"></iframe><div id="expand_contentExt"></div>');
		else
			$(document.body).append('<iframe id="iframeUrlExt" style="position: absolute; visibility: hidden; top: 0; left: 0; width: 1px; height: 1px;" frameborder="0" src="about:blank"></iframe><div id="expand_contentExt"></div>');
		var extiframe = document.getElementById("iframeUrlExt");
		setGlobalFramePos(contentId, "iframeUrlExt", false);
		$('#iframeUrlExt').css('visibility', 'visible');
		extiframe.src = url;
		// Afegim callback
		resiz.resizeCallbacks.push(function () {
			var extiframe = document.getElementById("iframeUrlExt");
			setGlobalFramePos(contentId, "iframeUrlExt", false);
			var $exp_but = $('#expand_contentExt');
			/* Sistema de escalado antiguo por CSS que el resultado en pantalla es borroso */
			$exp_but.css("-ms-transform-origin", "0 0");
			$exp_but.css("-ms-transform-origin-x", "0px");
			$exp_but.css("-ms-transform-origin-y", "0px");
			$exp_but.css("-webkit-transform-origin-x", "0px");
			$exp_but.css("-webkit-transform-origin-y", "0px");
			$exp_but.css("-moz-transform-origin-x", "0px");
			$exp_but.css("-moz-transform-origin-y", "0px");
			$exp_but.css("-o-transform-origin-x", "0px");
			$exp_but.css("-o-transform-origin-y", "0px");
			$exp_but.css("transform-origin-x", "0px");
			$exp_but.css("transform-origin-y", "0px");
			$exp_but.css("transform-origin", "0 0");
			$exp_but.css("-ms-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("-moz-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("-o-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("-webkit-transform", "scale("+resiz.scale+","+resiz.scale+")");
			$exp_but.css("transform", "scale("+resiz.scale+","+resiz.scale+")");
		});
		// FIN IFRAME EXTERN
	}
	
	
	function getQueryParamMotorUrl(CurrURL, pName) {
		var ParamsPos = CurrURL.indexOf("?",0);
		if (ParamsPos > 0) {
			var ParamsStr = CurrURL.substr(ParamsPos+1,CurrURL.length);
			var Params = ParamsStr.split("&");
			for (var i=0;i<Params.length;i++) {
				if (Params[i].indexOf(pName + "=",0) == 0) {
					return unescape(Params[i].substr(pName.length + 1,Params[i].length));
				}
			}
		}
		return "";
	}
	
	//<!-- BLOQUE DE RUTINAS GENERICAS DE LOS MOTORES HTML -->
	
	// RUTINAS PARA DETECTAR LINUX Y AGENTE
	function isLinux()
	{
		if (navigator.platform.indexOf("Linux") != -1)
			return true;
		else
			return false;
	}

	function testCSS(prop) {
		return prop in document.documentElement.style;
	}

	function getAgent()
	{
		var isOpera = !!(window.opera && window.opera.version);  // Opera 8.0+
		if (isOpera == true)
			return "opera";
		var isFirefox = testCSS('MozBoxSizing');                 // FF 0.8+
		if (isFirefox == true)
			return "firefox";
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		if (isSafari == true)
			return "safari";
		// At least Safari 3+: "[object HTMLElementConstructor]"
		var isChrome = !isSafari && testCSS('WebkitTransform');  // Chrome 1+
		if (isChrome == true)
			return "chrome";
		var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6
		if (isIE == true)
			return "ie";

		return "firefox"; // Por defecto, asume compatibilidad con Firefox
	}

	function getBrowserVersion()
	{
		var N=navigator.appName, ua=navigator.userAgent, tem;
		var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
		M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
		return parseFloat(M[1]);
	}
	
	//***********************************************
	// Evntos de carga y descarga de la página
	//***********************************************
	function end(){
		// Matamos el cliente SCORM
		aulaPlaneta.SCORM.terminate();
	}

	// Nos aseguramos de que al cerrar la ventana cierre el sistema SCORM
	window.onunload = function () {
		end();
	};

	// Creamos todo lo necesario...
	function waitDocumentReady() {
		// Podemos suponer que despues de la carga del manifest el documento ya esta ready pero nos aseguramos
		$(document).ready(function() { // asegurarnos que el documento esta disponible
		scormConfig = aulaPlaneta.SCORM.initialize();

		// Es fa aquí perquè SCORM s'encarrega d'ajustar el domini per evitar cross-domain
		IDTarea = getRecursiveQueryParam("IDTarea");
		//if (IDTarea == '') IDTarea = "16069"; // Pruebas
		IDAlumno = getRecursiveQueryParam("IDAlumno");
		//if (IDAlumno == '') IDAlumno = "9234"; // Pruebas
		IDProfesor = getRecursiveQueryParam("IDProfesor");
		//if (IDProfesor == '') IDProfesor = "34965"; // Pruebas
		URL = getRecursiveQueryParam("URL");
		//if (URL == '') URL = 'serverfake.php';
		//if (URL == "") URL = "http://pre4.aulaplaneta.com/desktopmodules/ppp_uploadscorm/UploadPostedFiles.aspx";
		//if (URL == "") URL = "/DesktopModules/PPP_UploadScorms/UploadPostedFiles.aspx";
		//alert(URL);
		//URL = "http://localhost/AulaPlaneta4.5/DesktopModules/PPP_UploadScorms/UploadPostedFiles.aspx";
		//alert("Parámetros recibidos:\nIDTarea: "+IDTarea+"\nIDAlumno: "+IDAlumno+"\nIDProfesor: "+IDProfesor+"\nURL: "+URL);
		

		// AQUI HARIAMOS LA INICIALIZACION EN BASE A LO OBTENIDO DE SCORM Y POR PARAMETROS
		// LUEGO SE EJECUTARIA EL $(document).ready PROPIO DEL MOTOR
	
		// Inicialitzem el que necessitem de JQUERY
		//initJQuery(); (ya se inicializa en el módulo XResize)
		
		// Actualizar contenido de la página dependiente del navegador
		var ver = getBrowserVersion();
		if (getAgent() == "ie" && ver < 9)
			$("#adj").after('<input type="file" name="uploadField" class="upl" style="position:absolute; margin-top:-4px; opacity:0; filter:alpha(opacity=0);" unselectable="on" onchange="javascript:sendStorePetition(this);" />');
		else
			$("#adj").after('<input type="file" name="uploadField" class="upl" unselectable="on" onchange="javascript:sendStorePetition(this);" />');
		
			// Cargamos las imágenes del html con javascript
			$('#ac_01 .top .logo img').attr("src", pppPreloader.from('module', 'motor/images/aula-planeta-logo.jpg'));
		$('#subir_pro').prop('action', URL);
		
		resiz.initXResize();
		//Adaptar el canvas al tamaño de la ventana del navegador
		resiz.reposition();
		
		// Carreguem el document XML
		loadXMLM102(function() { readyMain(); });
	});
	}

	function endAction() {
		// Cuando se pincha el botón de enviar se supone que ya se ha subido un fichero
		// y por tanto se ha guardado un suspend_data. Comprobamos si la hay.
		lastSuspend_data = scormConfig.suspend_data;
		if (lastSuspend_data == 403 || lastSuspend_data == null)
			lastSuspend_data = "";
		if (lastSuspend_data == "") alert(LangRes.curLang[LangRes.NO_HAY_ARCH_SUBIDOS]);
		else {
			aulaPlaneta.SCORM.ejercicio_evaluar(lastSuspend_data, "");
			// Se deshabilitan los botones para que no pueda volver a enviar
			$('#buttonEndAction').html('');
			$('#cajaSubir').toggleClass('form_adj');
			$('#cajaSubir').toggleClass('form_adj_no_upload');
			$('#cajaSubir').html("");
			$('.form_adj_txt').css('width', '900px');
			var msg = "<span class=\"central_msg\">" + LangRes.curLang[LangRes.ACTIVITY_SENT] + "</span>";
			$('.form_adj_txt').html($('.form_adj_txt').html() + msg);
			$('.central_msg').css('margin-top', '3px');
			$('#uploadField').val(lastFileValue);
		}
	}

	function getFileNameFromFullPath(fileNameWithFullPath) {
		var pathSep;
		if (isLinux()) pathSep = "/";
		else pathSep = "\\";
		// Se comprueba si el nombre del fichero termina con el separador de Path
		var stringSearch = fileNameWithFullPath;
		if (fileNameWithFullPath.indexOf(pathSep, fileNameWithFullPath.length - pathSep.length) !== -1)
			stringSearch = fileNameWithFullPath.substring(0, fileNameWithFullPath.length - pathSep.length);
		if (stringSearch.indexOf(pathSep) == -1) return stringSearch;
		return stringSearch.substring(stringSearch.lastIndexOf(pathSep)+1, stringSearch.length);
	}

	function readyMain() {
			// para test
		//scormConfig.mode = aulaPlaneta.SCORM.MODO_REVIEW;
		//scormConfig.suspend_data = "";
		// Distinguimos entre tipo de ejercicio M102 a o b
		var amano = XDOM.valueOfNode(xmlDocu, "amano");
		if (amano == "") amano = "0";
		if (amano == "0") {
			// Ejecutamos el visor online en HTML
			// Inicializar la base de la pantalla, para mostrar un botón de Download o Upload
			// En función del modo, si es professor o alumno.

			//alert('MODO: ' +scormConfig.mode+" SUSP: "+suspend_data+" COMPL.: "+completed);

			addContent(xmlDocu);
			// Comprobación de que si estamos en localhost (todoso los casos)
			if (document.location.hostname == "localhost") {
				msg = "<span class=\"central_msg\">" + LangRes.curLang[LangRes.MSG_ADJUNTA] + "</span>";
				// Poner los botones en gris y deshabilitarlos
				// botón Subir proyecto
				$('#cajaSubir').addClass('form_adj_inactive');
				$('#cajaSubir').find(".upl").prop('title', ' ');
				$('#cajaSubir').find(".upl").css('visibility', 'hidden');
				$('#cajaSubir').find(".adjuntar").css('cursor', 'default');
				// botón Enviar
				$('#buttonEndAction').find('input').removeClass('corregir_bt');
				$('#buttonEndAction').find("input").prop('title', '');
				$('#buttonEndAction').find("input").prop('alt', '');
				$('#buttonEndAction').find("input").prop("onclick", null);
				$('#buttonEndAction').css("border", "none");
				$('#buttonEndAction').find("input").css("border", "none");
				$('#buttonEndAction').find('input').addClass('corregir_bt_inactive');
				$('#buttonEndAction').find('input').val(LangRes.curLang[LangRes.ENVIAR]);
				$('#cajaSubir').children('.adjuntar').html(LangRes.curLang[LangRes.ADJUNTAR]);
				// Poner el texto en medio
				$('.form_adj_txt').css('margin-top', '5px');
				$('.form_adj_txt').css('width', '600px');
				$('.form_adj_txt').html(msg);
				//alert(parseInt($('.central_msg').css('height'))); // Pruebas, saber el tamaño de la letra
				// Comprobar si hay dos líneas de texto para reposicionar en el centro el texto
				if (parseInt($('.central_msg').css('height')) > 17) {
					$('.form_adj_txt').css('margin-top', '-2px');
				}
			} else {
			if (scormConfig.mode == aulaPlaneta.SCORM.MODO_REVIEW || scormConfig.mode == aulaPlaneta.SCORM.MODO_AREVIEW) {
				// El professor lo REVISA
				if (scormConfig.suspend_data == "" || scormConfig.suspend_data == null) {
					// Aún no se subido ningún fichero
					//alert("1- "+modo+"("+scormConfig.suspend_data+")");
					$('#buttonEndAction').html('');
					$('#cajaSubir').toggleClass('form_adj');
					$('#cajaSubir').toggleClass('form_adj_no_upload');
					var msg = "<span class=\"central_msg\">" + LangRes.curLang[LangRes.NO_HAY_ARCH_SUBIDOS] + "</span>";
					$('#cajaSubir').html(msg);
				} else {
					// Fichero ya se ha subido al servidor
					//alert("2- "+modo+"("+scormConfig.suspend_data+")");

					// No se muestra el botón de corregir, ni otro botón.
					//$('#buttonEndAction').html('<input type="button" name="endActionBut" value="'+LangRes.curLang[LangRes.CORREGIR]+'" class="corregir_bt" alt="'+LangRes.curLang[LangRes.CORREGIR]+'" title="'+LangRes.curLang[LangRes.CORREGIR]+'" onClick="javascript: endAction();" />');
					$('#buttonEndAction').html("");
					$('#cajaSubir').toggleClass('form_adj');
					$('#cajaSubir').toggleClass('form_adj_no_upload');
					var suspendParts = scormConfig.suspend_data.split("||");
					if (suspendParts.length == undefined || suspendParts.length <= 1) {
						var msg = "<span class=\"central_msg\">" + LangRes.curLang[LangRes.NO_HAY_ARCH_SUBIDOS] + "</span>";
						$('#cajaSubir').html(msg);
					} else {
						var fullRouteFileName = suspendParts[0];
						var anchorRuta = suspendParts[1];
						var fileName = getFileNameFromFullPath(fullRouteFileName);
						if (fileName == "" || anchorRuta == "") {
							var msg = "<span class=\"central_msg\">" + LangRes.curLang[LangRes.NO_HAY_ARCH_SUBIDOS] + "</span>";
							$('#cajaSubir').html(msg);
						} else {
							if (getAgent() == "ie")
								$('#cajaSubir').html('<table><tr><td>'+fileName+'</td><td> <div class="bt_descarg" ><a id="bt_descarg_a" href="' + anchorRuta + '" target="_blank"><input type="button" value="'+LangRes.curLang[LangRes.DESCARGAR_ARCH]+'" onclick="document.getElementById(\'bt_descarg_a\').click()"/></a></div></td></tr></table>');
							else
								$('#cajaSubir').html('<table><tr><td>'+fileName+'</td><td> <div class="bt_descarg" ><a href="' + anchorRuta + '" target="_blank"><input type="button" value="'+LangRes.curLang[LangRes.DESCARGAR_ARCH]+'" /></a></div></td></tr></table>');
							// Poner el texto de ya enviado en medio
							var msg = "<span class=\"central_msg\">" + LangRes.curLang[LangRes.MSG_VALIDADOCORRECTO] + "</span>";
							$('.form_adj_txt').css('margin-top', '5px');
							$('.form_adj_txt').css('width', '600px');
							$('.form_adj_txt').html(msg);
						}
					}
				}
			} else if (scormConfig.mode == aulaPlaneta.SCORM.MODO_BROWSE) {
				// Modo Exponer
				var msg;
				/*
				 * Esta parte cargaba el mensaje de entregar el trabajo en mano
				 * 
				// Si no tenim suspend data, llavors posem missatge estàndar
				if (scormConfig.suspend_data == "" || scormConfig.suspend_data == null) {
					msg = "<span style='font-family:helvetica, arial; font-size:16px; '>" + LangRes.curLang[LangRes.ENTREGA_EN_MANO] + "</span>";
				} else { // Si hi ha suspend data, posem missatge indicant que l'activitat està acabada
					msg = "<span style='font-family:helvetica, arial; font-size:16px; '>" + LangRes.curLang[LangRes.ACTIVITY_DONE] + "</span>";
				}
				$('#buttonEndAction').html('');
				$('#cajaSubir').toggleClass('form_adj');
				$('#cajaSubir').toggleClass('form_adj_no_upload');
				$('#cajaSubir').html(msg);
				*/

				// Si no tenim suspend data, llavors posem missatge estàndar
				if (scormConfig.suspend_data == "" || scormConfig.suspend_data == null) {
					msg = "<span class=\"central_msg\">" + LangRes.curLang[LangRes.BROWSE_MODE] + "</span>";
				} else { // Si hi ha suspend data, posem missatge indicant que l'activitat està acabada
					msg = "<span class=\"central_msg\">" + LangRes.curLang[LangRes.ACTIVITY_DONE] + "</span>";
				}
				// Poner los botones en gris y deshabilitarlos
				// botón Subir proyecto
				$('#cajaSubir').addClass('form_adj_inactive');
				$('#cajaSubir').find(".upl").prop('title', ' ');
				$('#cajaSubir').find(".upl").css('visibility', 'hidden');
				$('#cajaSubir').find(".adjuntar").css('cursor', 'default');
				// botón Enviar
				$('#buttonEndAction').find('input').removeClass('corregir_bt');
				$('#buttonEndAction').find("input").prop('title', '');
				$('#buttonEndAction').find("input").prop('alt', '');
				$('#buttonEndAction').find("input").prop("onclick", null);
				$('#buttonEndAction').css("border", "none");
				$('#buttonEndAction').find("input").css("border", "none");
				$('#buttonEndAction').find('input').addClass('corregir_bt_inactive');
				$('#buttonEndAction').find('input').val(LangRes.curLang[LangRes.ENVIAR]);
				$('#cajaSubir').children('.adjuntar').html(LangRes.curLang[LangRes.ADJUNTAR]);
				// Poner el texto en medio
				$('.form_adj_txt').css('margin-top', '5px');
				$('.form_adj_txt').css('width', '600px');
				$('.form_adj_txt').html(msg);
				//alert(parseInt($('.central_msg').css('height'))); // Pruebas, saber el tamaño de la letra
				// Comprobar si hay dos líneas de texto para reposicionar en el centro el texto
				if (parseInt($('.central_msg').css('height')) > 17) {
					$('.form_adj_txt').css('margin-top', '-2px');
				}

			} else if (scormConfig.mode == aulaPlaneta.SCORM.MODO_EXAM || scormConfig.mode == aulaPlaneta.SCORM.MODO_NORMAL) {
				// Pot pujar arxius... esta fent l'examen... posar Upload
				if (scormConfig.suspend_data == "" || scormConfig.suspend_data == null) {
				// Caso de que no se ha subido nungún fichero al servidor
				// Debemos permitir subirlo y ocultar el botón de Finalizar
				} else {
					// ya había un fichero subido previamente, lo mostramos en el campo
					var suspendParts = scormConfig.suspend_data.split("||");
					if (suspendParts.length != undefined || suspendParts.length > 1) {
						var fullRouteFileName = suspendParts[0];
						var anchorRuta = suspendParts[1];
						var fileName = getFileNameFromFullPath(fullRouteFileName);
						if (fileName != "" && anchorRuta != "") {
							$('#contenedor_actividad .pie input .upl').css('width', '420px');
							$('#contenedor_actividad .pie .form_adj_txt input').css('visibility', 'visible');
							lastFileValue = fileName;
							$('#contenedor_actividad .pie .form_adj_txt input').val(lastFileValue);
							$('#descarga_alumno').html('<a href="' + anchorRuta + '" target="_blank"><div style="margin: 0; padding: 0;"></div></a>');
						}
					}
				}
				if (scormConfig.completed != 'completed') {
					$('#buttonEndAction').html('<input type="button" name="endActionBut" value="'+LangRes.curLang[LangRes.ENVIAR]+'" class="corregir_bt" alt="'+LangRes.curLang[LangRes.ENVIAR]+'" title="'+LangRes.curLang[LangRes.ENVIAR]+'" onClick="endAction();" />');
					$('#cajaSubir').children('.adjuntar').html(LangRes.curLang[LangRes.ADJUNTAR]);
				}else {
					$('#buttonEndAction').html('');
					$('#cajaSubir').toggleClass('form_adj');
					$('#cajaSubir').toggleClass('form_adj_no_upload');
					$('#cajaSubir').html("");
					//$('#cajaSubir').html(LangRes.curLang[LangRes.NO_HAY_ARCH_SUBIDOS]);
					// Posar el missatge de "feedback"
					$('.form_adj_txt').css('width', '900px');
					var msg = "<span class=\"central_msg\">" + LangRes.curLang[LangRes.ACTIVITY_SENT] + "</span>";
					$('.form_adj_txt').html($('.form_adj_txt').html() + msg);
					$('.central_msg').css('margin-top', '3px');
				}
			} else {
				// Si no se reconoce el modo, la barra inferior se muestra vacía
				$('#buttonEndAction').html('');
				$('#cajaSubir').toggleClass('form_adj');
				$('#cajaSubir').toggleClass('form_adj_no_upload');
				$('#cajaSubir').html('');
			}
			}
		} else if (amano == "1") {
			// Ejecutamos el visor online en HTML (b)

			// assignación de modo para pruebas
			//scormConfig.mode = aulaPlaneta.SCORM.MODO_BROWSE;
			//scormConfig.suspend_data = "visto";
			//alert('MODO: ' + scormConfig.mode +" SUSP: " + scormConfig.suspend_data);
			
			if (scormConfig.mode == aulaPlaneta.SCORM.MODO_REVIEW) {
				addContent(xmlDocu);
				$('#buttonEndAction').html('');
				$('#cajaSubir').toggleClass('form_adj');
				$('#cajaSubir').toggleClass('form_adj_no_upload');
				// El professor lo REVISA
				if (scormConfig.suspend_data == "visto") {
					// El alumno ya abrió el ejercicio
					$('#cajaSubir').html("<span style='font-family:helvetica, arial !important; font-size:16px !important; '>" + LangRes.curLang[LangRes.ACTIVITY_VIEWED] + "</span>");
				} else {
					$('#cajaSubir').html("<span style='font-family:helvetica, arial !important; font-size:16px !important; '>" + LangRes.curLang[LangRes.ACTIVITY_NOT_VIEWED] + "</span>");
				}
			} else if (scormConfig.mode == aulaPlaneta.SCORM.MODO_BROWSE) {
				addContent(xmlDocu);
				var msg = "<span style='font-family:helvetica, arial; font-size:16px; '>" + LangRes.curLang[LangRes.ENTREGA_EN_MANO] + "</span>";
				$('#buttonEndAction').html('');
				$('#cajaSubir').toggleClass('form_adj');
				$('#cajaSubir').toggleClass('form_adj_no_upload');
				$('#cajaSubir').html(msg);
			} else if (scormConfig.mode == aulaPlaneta.SCORM.MODO_EXAM || scormConfig.mode == aulaPlaneta.SCORM.MODO_NORMAL || scormConfig.mode == aulaPlaneta.SCORM.MODO_AREVIEW) {
				// Si la actividad es abierta por el alumno, por cada documento que "abra" o vea
				// se pone un "visto" en el suspend_data para indicar al professor que ha sido abierto
				addContent(xmlDocu, function() {
					// Acción a realizar una vez se pincha en descargar el documento
					// Se cree que el alumno habrá visto el documento
					// HAY QUE HACERLO CON CIERTO RETRASO, PORQUE SCORM TODAVIA NO ESTA INICIALIZADO
					// DEJAMOS PASAR 1 SEGUNDO...
					//alert('Documento visrto por el alumno');
				});
				var msg = "<span style='font-family:helvetica, arial; font-size:16px; '>" + LangRes.curLang[LangRes.ENTREGA_EN_MANO] + "</span>";
				$('#buttonEndAction').html('');
				$('#cajaSubir').toggleClass('form_adj');
				$('#cajaSubir').toggleClass('form_adj_no_upload');
				$('#cajaSubir').html(msg);
				// Si no estem revisant, notifiquem que l'hem vist
				if (scormConfig.mode != aulaPlaneta.SCORM.MODO_AREVIEW) {
					setTimeout(function() { 
						if (scormConfig.suspend_data != 'visto') {
							aulaPlaneta.SCORM.ejercicio_evaluar('visto', ''); 
						}
					}, 1000);
				}
			} else {
				// Si no se reconoce el modo, la barra inferior se muestra vacía
				$('#buttonEndAction').html('');
				$('#cajaSubir').toggleClass('form_adj');
				$('#cajaSubir').toggleClass('form_adj_no_upload');
				$('#cajaSubir').html('');
			}
		}
	}

	function sendStorePetition(inputElem) {
		//alert('MODO: ' + modo+" SUSP: "+scormConfig.suspend_data+" COMPL.: "+completed);
		var newFileName = inputElem.value;
		//alert(URL);
		if (newFileName != "" && URL != "") {
			// prepare Options Object
			var options = {
				url:		URL,
				type:		'post',
				datatype:	'json',
				data: {IDTarea : IDTarea, IDAlumno : IDAlumno, IDProfesor : IDProfesor, URL : URL},
				success:	function(responseData, textStatus, jqXHR) {
					//alert("POST response: "+responseData);
					//var newFileValue = document.getElementById("uploadField").value;
					//alert("newFileName: "+newFileName+" \n"+lastFileValue);
					var jsonObj = $.parseJSON(responseData);
					var rutaURL = jsonObj['ruta'];
					//alert("POST response: "+responseData+" rutaURL: "+rutaURL);
					var newSuspendData = newFileName + "||" + rutaURL;
					aulaPlaneta.SCORM.ejercicio_guardar(newSuspendData);
					// Retoque CSS del botón de subir archivos
					$('#contenedor_actividad .pie input .upl').css('width', '420px');
					$('#contenedor_actividad .pie .form_adj_txt input').css('visibility', 'visible');
					lastFileValue = getFileNameFromFullPath(newFileName);
					$('#contenedor_actividad .pie .form_adj_txt input').val(lastFileValue);
					$('#descarga_alumno').html('<a href="' + rutaURL + '" target="_blank"><div style="margin: 0; padding: 0;"></div></a>');
				},
				error:		function(jqXHR, textStatus, errorThrown) {
					alert("Error en petición a " + URL + ":\n - Status: " + textStatus + ".\n - Error: " + errorThrown);
					$('#cajaSubir').children('input').attr('title', (lastFileValue == "") ? getFileNameFromFullPath(document.getElementById("uploadField").value) : lastFileValue);
				}
			};

			// pass options to ajaxForm
			$('#subir_pro').ajaxForm(options);
			$('#subir_pro').submit();
		}

	}

