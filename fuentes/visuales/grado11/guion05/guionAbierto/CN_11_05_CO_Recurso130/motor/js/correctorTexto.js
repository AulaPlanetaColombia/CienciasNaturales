
// Clase para la corrección de texto (comparación de lo entrado por el usuario
// y el texto de referencia para corregir

CorrectorTexto = new function()
{
	// Modos de funcionamiento del corrector
	this.MODO_CI = 1;								// No tiene en cuenta acentos
	this.MODO_NOENDPUNCT = 2;				// No tiene en cuenta la puntuación final
	this.MODO_NOPUNCT = 4;						// No tiene en cuenta la puntuación (en general)
	this.MODO_OLDESTRICTO_ON = 8;		// Modo antigo Estricto/No estricto
	this.MODO_OLDESTRICTO_OFF = 16;	// Modo antigo Estricto/No estricto

	// Funciones internas
	this.trimBeginEnd = function(str)
	{
	    for(var i = 0; str.charCodeAt(i) < 33; i++);
	    for(var j = str.length-1; str.charCodeAt(j) < 33; j--);
	    return str.substring(i, j+1);
	}	
	this.charIsPunct = function(str, i)
	{
    	if (str.charCodeAt(i) == 46 /*.*/ || str.charCodeAt(i) == 44 /*,*/ || str.charCodeAt(i) == 45 /*-*/ || 
				str.charCodeAt(i) == 58 /*:*/ || str.charCodeAt(i) == 59 /*;*/ || str.charCodeAt(i) == 33 /*!*/ ||
				str.charCodeAt(i) == 161 /*¡*/ || str.charCodeAt(i) == 191 /*¿*/ || str.charCodeAt(i) == 63 /*?*/ ||
				str.charCodeAt(i) == 34 /*"*/) // Si es puntuación, ponemos espacios en su lugar
				return true;
		else
				return false;
	}

	this.charIsSpace = function(str, i)
	{
    	return (str.charCodeAt(i) < 33);
	}
	
	this.trimAllSpaces = function( str )
	{
    	var lastChar = 256;
		var res = "";
		for (var i=0;i<str.length;i++)
		{
			if (str.charCodeAt(i) < 33) // Si es un espacio
			{
				if (lastChar >= 33) // Si el anteior NO era un espacio, lo pongo
				{
					res += " ";
					lastChar = 32;
				}
			}
			else // Si es cualquier otra letra
			{
				res += str.substring(i,i+1);
				lastChar = str.charCodeAt(i);
			}
		}
		
		return this.trimBeginEnd(res);
	}

	this.trimAllPunct = function( str )
	{
    	var res = "";
		for (var i=0;i<str.length;i++)
		{
			if (this.charIsPunct(str,i)) // Si es puntuación, ponemos espacios en su lugar
			{
				res += " ";
			}
			else // Si no, copiamos el caracter sin más...
			{
				res += str.substring(i,i+1);
			}
		}
		return res;
	}

	this.trimEndPunct = function( str )
	{
    	var i = str.length-1;
		var strEnd = "";
		while (this.charIsPunct(str,i) || str.charCodeAt(i) < 33 /* espacio */) // Si es puntuación o espacio, lo eliminamos
		{
			i--;
			strEnd += " "; // Dejo el hueco en el lugar de la puntuación
		}
    
    	return str.substring(0, i+1) + strEnd;
	}
		
	this.addSpacesToPunct = function( str )
	{
    	var res = "";
		for (var i=0;i<str.length;i++)
		{
			// Si es puntuación, añado un espacio antes
			if (this.charIsPunct(str,i)) // Si es puntuación, ponemos espacios en su lugar
			{
				res += " ";
			}
			// copio el elemento actual
			res += str.substring(i,i+1);
			// Si es puntuación, añado un espacio detrás
			if (this.charIsPunct(str,i)) // Si es puntuación, ponemos espacios en su lugar
			{
				res += " ";
			}
		}
		return res;
	}
	// Rutina para reemplazar elementos, según los antiguos motores
	this.replace = function( str )
	{
    	var arr = Str.split(searchStr);
		return arr.join(replaceStr);
	}

	// Rutina para reemplazar elementos, según los antiguos motores
	this.replace = function( str )
	{
    	var arr = Str.split(searchStr);
		return arr.join(replaceStr);
	}

	// Comparador
	this.esValido = function( txtAlumno, txtReferencia, modo)
	{
		// Separo la puntuación de las palabras
		txtAlumno = this.addSpacesToPunct(txtAlumno);
		txtReferencia = this.addSpacesToPunct(txtReferencia);
		
		// Case Insensitive
		if (modo & this.MODO_CI)
		{
			txtAlumno = txtAlumno.toUpperCase();
			txtReferencia = txtReferencia.toUpperCase();
		}
		
		// Pasamos de la puntuación (toda)
		if (modo & this.MODO_NOPUNCT)
		{
			txtAlumno = this.trimAllPunct(txtAlumno);
			txtReferencia = this.trimAllPunct(txtReferencia);
		}
		
		// Pasamos de la puntuación final)
		if (modo & this.MODO_NOENDPUNCT)
		{
			txtAlumno = this.trimEndPunct(txtAlumno);
			txtReferencia = this.trimEndPunct(txtReferencia);
		}
		
		// Finalmente, vamos a obtener las palabras y compararlas
		txtAlumno = this.trimAllSpaces(txtAlumno);
		txtReferencia = this.trimAllSpaces(txtReferencia);
		
		// Hago la comparación
		if (txtAlumno == txtReferencia)
				return true;
		else
				return false;
		
	}
	
	
	
	// ALGORITMO PARA MARCAR LOS ERRORES EN LA SOLUCIÓN
	// escrita = la que escribe el usuario; correcta: la solución dada por buena
	// 1º se numeran todas las palabras de escrita y correcta
	// 2º se procesa palabra a palabra correcta de la siguiente manera:
	// - para cada palabra se busca su equivalente en escrita y se obtiene su número
	// - esto se ha de hacer siempre mirando en escrita desde la última palabra correcta encontrada
	// - se anota el nº de palabra de escrita para cada palabra de correcta (o -1 si no hay coincidencia)
	// 3º se procesa correcta con los índices de escrita y se aplica el siguiente criterio
	// - Si una palabra tiene índice -1 se marca como incorrecta
	// - Si una palabra tiene un índice < que la anterior, se marca como incorrecta
	// - En el resto de los casos, se deja sin marcar
	// 4º se genera correcta con las anotaciones
	// - Mirando correcta, se coge la solución (que tiene correspondencia caràcter a caràcter)
	//   y se aplica en la solución el marcado. El motivo de hacerlo así es que procesos previos como
	//   eliminar la puntuación hacen que "correcta" no sea letra a letra la solución que ve el usuario.
	
	// Tipos de token
	this.TOKEN_NONE = 0;
	this.TOKEN_WORD = 1;
	this.TOKEN_PUNCT = 2;
	this.TOKEN_WHITESPACE = 3;
	
	// Rutina para crear un token
	this.createToken = function( val, tp, ini, end)
	{
		var token = new Object();
		token.value = val;
		token.type = tp;
		token.iniPos = ini;
		token.endPos = end;
		token.otherIndex = -1;
		return token;
	}
	
	// Rutina para generar un array de tokens en base a un string
	this.stringToTokens = function( val )
	{
		var res = new Array();
		// Procedemos a generar los tokens...
		var iniPos = 0;
		var curPos = 0;
		var type = this.TOKEN_NONE;
		var value = "";
		while (curPos < val.length)
		{
			// Primero miramos si cambia el tipo de token
			if (this.charIsPunct(val, curPos)) // PUNTUACION
			{
				if (type != this.TOKEN_NONE & type != this.TOKEN_PUNCT)
				{
					// Guardamos el token pendiente
					res.push(this.createToken(value,type,iniPos,curPos));
					iniPos = curPos;
					value = "";
				}
				// Creamos el nuevo token
				type = this.TOKEN_PUNCT;
				value += val.charAt(curPos);
			}
			else if (this.charIsSpace(val, curPos)) // ESPACIOS
			{
				if (type != this.TOKEN_NONE & type != this.TOKEN_WHITESPACE)
				{
					// Guardamos el token pendiente
					res.push(this.createToken(value,type,iniPos,curPos));
					iniPos = curPos;
					value = "";
				}
				// Creamos el nuevo token
				type = this.TOKEN_WHITESPACE;
				value += val.charAt(curPos);
			}
			else // LETRAS
			{
				if (type != this.TOKEN_NONE & type != this.TOKEN_WORD)
				{
					// Guardamos el token pendiente
					res.push(this.createToken(value,type,iniPos,curPos));
					iniPos = curPos;
					value = "";
				}
				// Creamos el nuevo token
				type = this.TOKEN_WORD;
				value += val.charAt(curPos);
			}
			curPos++;
		}
		
		// Escribimos el último token, si lo hay
		if (type != this.TOKEN_NONE)
		{
			// Guardamos el token pendiente
			res.push(this.createToken(value,type,iniPos,curPos));
		}
		
		return res;
	}
	this.traceTokens = function( name, tokens )
	{
		for (var i = 0;i<tokens.length;i++)
		{
			var item = tokens[i];
			console.log(name + "[" + i + "] = {'" + item.value + "', " + item.type + ", " + item.iniPos + ", " + item.endPos + "} -> " + item.otherIndex + " [" + item.ok + "]");
		}
	}
	
	// Rutina para buscar una palabra o puntuación en un array de tokens a partir de cierta posición
	this.searchForToken = function( where, value, from )
	{
		// Caso erróneo
		if (from >= where.length || value == "")
			return -1;
			
		// Buscamos a partir de from la palabra indicada
		for (var i= from;i<where.length;i++)
		{
			var token = where[i];
			if ((token.type == this.TOKEN_WORD || token.type == this.TOKEN_PUNCT))
			{
				if (token.value == value)
					return i;
			}
		}
		return -1;
	}
	
	// Rutina para anotar el índice de escrita en cada palabra de correcta
	this.annotateTokens = function( escrita, correcta )
	{
		var lastOk = 0;
		for (var i = 0; i < correcta.length; i++)
		{
			var correctaToken = correcta[i];
			correctaToken.otherIndex = this.searchForToken(escrita, correctaToken.value, lastOk);
			// Avanzamos LastOk si hemos encontrado la palabra
			if (correctaToken.otherIndex != -1)
				lastOk = correctaToken.otherIndex;
		}
	}
	
	this.correctTokens = function( escrita, correcta )
	{
		// Anotamos los tokens de correcta con los correspondientes índices de escrita
		this.annotateTokens(escrita, correcta);
		for (var i = 0; i < correcta.length; i++)
		{
			var token = correcta[i];
			if (token.type == this.TOKEN_WHITESPACE)
				token.ok = true;
			else // PALABRA O PUNTUACIÓN
			{
				if (token.otherIndex != -1)
					token.ok = true;
				else 
					token.ok = false;
			}
		}
	}
	

	this.setCharAt = function( str, char, index ){
    	return str.substr(0,index) + char + str.substr(index + 1);
	}
	
	
	this.tokensToTaggedString = function( tokens, stringToMark, iniTag, endTag )
	{
		var res = "";
		for (var i = 0; i< tokens.length;i++)
		{
			var token = tokens[i];
			var part = stringToMark.substring(token.iniPos, token.endPos);
			//res += "[" + part + "," + token.iniPos + "," + token.endPos + "] ";
			if (token.ok == true) // Si todo es correcto, traspaso el contenido
				res += part;
			else // si no, lo enmarco entre iniTag y endTag
				res += iniTag + part + endTag;
		}
		return res;
	}
	
	this.taggedContestacion = function( txtAlumno, txtReferencia, modo, iniTag, endTag )
	{
		
		var correcta = txtReferencia;
		
		// Case Insensitive
		if (modo & this.MODO_CI)
		{
			txtAlumno = txtAlumno.toUpperCase();
			txtReferencia = txtReferencia.toUpperCase();
		}
		
		// Pasamos de la puntuación (toda)
		if (modo & this.MODO_NOPUNCT)
		{
			txtAlumno = this.trimAllPunct(txtAlumno);
			txtReferencia = this.trimAllPunct(txtReferencia);
		}
		
		// Pasamos de la puntuación final)
		if (modo & this.MODO_NOENDPUNCT)
		{
			txtAlumno = this.trimEndPunct(txtAlumno);
			txtReferencia = this.trimEndPunct(txtReferencia);
		}
		
		//trace("txtAlumno     : " + txtAlumno);
		//trace ("txtReferencia: " + txtReferencia);
		
		var escritaTokens = CorrectorTexto.stringToTokens(txtAlumno);
		var correctaTokens = CorrectorTexto.stringToTokens(txtReferencia);
		this.correctTokens(escritaTokens, correctaTokens);
		return this.tokensToTaggedString(correctaTokens, correcta, iniTag, endTag);
	}
	

}
