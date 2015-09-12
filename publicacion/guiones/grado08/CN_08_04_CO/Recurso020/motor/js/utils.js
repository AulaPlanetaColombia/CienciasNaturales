Utils = new function()
{
	this.dashedLineTo = function ( shape, x1 , y1 , x2 , y2 , dashLen ){
	    shape.graphics.moveTo( x1 , y1 );
	 
	    var dX = x2 - x1;
	    var dY = y2 - y1;
	    var dashes = Math.floor(Math.sqrt( dX * dX + dY * dY ) / dashLen );
	    var dashX = dX / dashes;
	    var dashY = dY / dashes;
	 
	    var q = 0;
	    while( q++ < dashes ){
	        x1 += dashX;
	        y1 += dashY;
	        if(q % 2 == 0 )
	      	{
	      		shape.graphics.moveTo(x1, y1);
	      	}
	      	else
	      	{
	      		shape.graphics.lineTo(x1, y1);
	      	}
	       // shape.graphics[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
	    }
	    if(q % 2 == 0 )
      	{
      		shape.graphics.moveTo(x1, y1);
      	}
      	else
      	{
      		shape.graphics.lineTo(x1, y1);
      	}
    	return shape;
	}
	
	this.arrowRect = function (shape, x1, y1, w, h)
	{
		var arrow_len = w * 0.075;
		var rect_len = w - arrow_len;
		
		shape.graphics.moveTo( x1, y1 );
		
		shape.graphics.lineTo( x1 + rect_len, y1);
		//shape.graphics.arcTo(x1 + rect_len*0.95, y1, x1 + rect_len*1.05, y1*1.05, 5);
		
		shape.graphics.lineTo( x1 + rect_len + arrow_len*0.8, y1 + h*0.8/2);		
		shape.graphics.quadraticCurveTo( x1 + rect_len + arrow_len*0.95, y1 + h/2, x1 + rect_len + arrow_len*0.8, y1 + h*1.2/2,   1);
		
		shape.graphics.moveTo( x1 + rect_len + arrow_len*0.8, y1 + h*1.2/2);
		
		shape.graphics.lineTo( x1 + rect_len, y1 + h);
		//shape.graphics.arcTo( x1 + rect_len*0.95, y1 + h*0.95, x1 + rect_len*0.95, y1+h, 5);
		
		shape.graphics.lineTo( x1, y1 + h );
		//shape.graphics.arcTo(  x1*1.05 , y1 + h , x1 , y1+h*0.95, 5);
		
		shape.graphics.lineTo( x1 , y1);
		//shape.graphics.arcTo(  x1 , y1*1.05  , x1*1.05 , y1 , 5);
		
		return shape;
	}
	this.lPad = function (str, max) 
	{
	  str = str.toString();
	  return str.length < max ? this.lPad("0" + str, max) : str;
	}
	
	this.cleanText = function( texto )
    {
        texto = texto.split("{{sub}}").join("<sub>");//.replace( "{{sub}}", "<sb>");
        texto = texto.split("{{sup}}").join("<sup>");//.replace( "{{sup}}", "<sp>");
        texto = texto.split("{{/subsup}}").join("<n>");//.replace( "{{/subsup}}", "<fs>");
        texto = texto.split("{{normal}}").join("<n>");//.replace( "{{normal}}", "<n>");
        texto = texto.split("{{cur}}").join("<i>");//.replace( "{{cur}}", "<c>");
        texto = texto.split("{{neg}}").join("<b>");//.replace( "{{neg}}", "<b>");
        texto = texto.split("{{u}}").join("<u>");//.replace( "{{u}}", "<u>");
        texto = texto.split("\n").join("<br/>");//.replace( "{{u}}", "<u>");
		texto = texto.split("\r").join("<br/>");//.replace( "{{u}}", "<u>"); 
		
        var encontradoAbierto = false;
        var encontradoCerrado = false;
        var tag = "";
        for(var i = 0; i < texto.length; i++){
            if( texto[i] == "<" ){
                encontradoAbierto = true;
                encontradoCerrado = false;
                continue;
            }
            if( texto[i] != ">"){
                if(encontradoAbierto){
                    if( texto[i] == " " || texto[i] == "n" || texto[i] == "/" ){
                        encontradoAbierto = false;
                        continue;
                    }else{
                        tag = tag + texto[i];
                        continue;
                    }
                }
            }else{
                if( encontradoAbierto ){
                    texto = texto.replace("<n>", "</" + tag + ">");
                    encontradoAbierto = false;
                    encontradoCerrado = false;

                    tag = "";
                }
            }
        }
        
        return texto;
    }
    
    this.cleanTags = function( texto )
    {
        var response ="";
        texto = texto.split("<![CDATA[").join("");
        texto = texto.split("]]>").join("");
        
        var encontradoAbierto = false;
        var encontradoCerrado = false;
        var tag = "";
        var tagState = true;
        for(var i = 0; i < texto.length; i++){
            if( texto[i] == "<" ){
                tag = "";
                encontradoAbierto = true;
                encontradoCerrado = false;
                continue;
            }
            if( texto[i] != ">"){
                if(encontradoAbierto){
                    tag += texto[i];
                }else{
                    response += texto[i];
                }
            }else{
                if( encontradoAbierto ){
                    encontradoAbierto = false;
                    encontradoCerrado = false;
                }
            }
        }
        //console.log(response);
        return response;
    }
    this.getEnunciats = function( texto){
    	var result = new Array();
    	if( texto.indexOf("||") >= 0){
    		var textos = texto.split("||");
    		if(textos.length > 1){
	    		for(var index in textos){
					
					if(textos.length > parseInt(index)+1){
						//console.log(textos[index]);
		    			//primers texts
		    			var text ="";
		    			if(index == 0) text = textos[index].substring( 0, textos[index].indexOf("{{"));
		    			else text = textos[index].substring( textos[index].indexOf("}}")+2, textos[index].indexOf("{{"));
		    			var texts = text.split(" ");
		    			
		    			for( var ind in texts){
		    				var t1 = new Object();
		    				t1.text = texts[ind];
			    			t1.tipo = 0;
			    			result.push(t1);
		    			}
		    			
		    			//link
		    			var link = new Object();
		    			link.text = textos[parseInt(index)+1].substring( 0, textos[parseInt(index) + 1].indexOf("}}"));
		    			link.tipo = 1;
		    			link.href = textos[index].substring(textos[index].indexOf("{{") + 2, textos[index].length ).split("link:").join("");
		    			result.push(link);
		    			
	    			}else{
	    				//segon text
	    				var text = textos[index].substring( textos[index].indexOf("}}") + 2, textos[index].length);
	    				var texts = text.split(" ");
		    			
		    			for( var ind in texts){
		    				var t2 = new Object();
			    			t2.text = texts[ind]; 
			    			t2.tipo = 0;
			    			result.push(t2);
		    			}
		    			
	    			}
	    			
	    		}
    		}else{
    			var init = new Object();
    			init.text = textos[0];
    			init.tipo = 0;
    			result.push(init);
    		}
    			
  		}else{
			var init = new Object();
			init.text = texto;
			init.tipo = 0;
			result.push(init);
		}
  		//console.log(result);
    	return result;
    }
    
}