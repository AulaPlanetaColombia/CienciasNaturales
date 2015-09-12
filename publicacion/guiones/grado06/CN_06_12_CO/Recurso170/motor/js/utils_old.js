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
	
	this.richText = function( xmlText )
	{
		
		xml = replace(xmlText, "{{sub}}", "</u></i></b><font face=\"GG subscript\">");
		xml = replace(xmlText, "{{sup}}", "</u></i></b><font face=\"GG Superscript\">");
		xml = replace(xmlText, "{{/subsup}}", "</u></i></b></font><font face=\"Arial Unicode MS\">");
		xml = replace(xmlText, "{{normal}}", "</u></i></b></font><font face=\"Arial Unicode MS\">");
		//xml = replace(xml, "{{cur}}", "</u></i></b></font><font face=\"Arev Sans\" size=\"-1\" letterSpacing=\"-1\"><i>");
		xml = replace(xmlText, "{{cur}}", "</u></i></b></font><font face=\"Arev Sans\" size=\"-1\"><i>");
		xml = replace(xmlText, "{{neg}}", "</u></i></b></font><font face=\"Arev Sans\" size=\"-1\"><b>");
		xml = replace(xmlText, "{{u}}", "</u></i></b><u>");
		return xml;		
	}
}