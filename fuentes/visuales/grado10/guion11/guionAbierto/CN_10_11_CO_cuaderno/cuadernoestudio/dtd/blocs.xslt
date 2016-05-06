<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions">

	<xsl:template match="blockquote">
		<blockquote>
			<xsl:apply-templates/>
		</blockquote>
	</xsl:template>
	
	
	<xsl:template match="destacado">
		<div class="destacado {@clip}imagen">
			<xsl:apply-templates/>
		</div>
	</xsl:template>
	
	<xsl:template match="destacadoTitulo">
		<h4><xsl:apply-templates/></h4>
	</xsl:template>
	
	<xsl:template match="recuerda">
		<div class="recuerda">
			<h4>
				<xsl:choose>
                        <xsl:when test="$idioma = 'EN'">Remember</xsl:when>
                        <xsl:otherwise>Recuerda</xsl:otherwise>
				</xsl:choose>
			</h4>
			<xsl:apply-templates/>
		</div>
	</xsl:template>
	
	<xsl:template match="profundiza">
		<div class="profundiza">
			<div class="profundiza_left">
				<h4>
					<xsl:choose>
                        <xsl:when test="$idioma = 'EN'">Study</xsl:when>
                        <xsl:otherwise>Profundiza</xsl:otherwise>
					</xsl:choose>
				</h4>
			</div>
			<div class="profundiza_right">
				<div class="profundiza_inside">
					<xsl:for-each select="enlace">
						<xsl:apply-templates select="."/>
						<xsl:if test="position() != last()"><br/><br/></xsl:if>
					</xsl:for-each>	
				</div>
			</div>
		</div>	
	</xsl:template>

	<xsl:template match="practica">
		<div class="practica">
			<div class="practica_left">
				<h4>
					<xsl:choose>
                        <xsl:when test="$idioma = 'EN'">Practice</xsl:when>
                        <xsl:otherwise>Practica</xsl:otherwise>
					</xsl:choose>
				</h4>
			</div>
			<div class="practica_right">
				<div class="practica_inside">
					<xsl:for-each select="enlace">
						<xsl:apply-templates select="."/>
						<xsl:if test="position() != last()"><br/><br/></xsl:if>
					</xsl:for-each>	
				</div>
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="mapaconceptual">
		<xsl:variable name="toc_id">
			<xsl:call-template name="object.id"/>
		</xsl:variable>
		<div class="mapa_conceptual">
			<xsl:for-each select="enlace">
				<a href="{@destino}" target="_blank">
					<h4 id="$toc_id">
						<xsl:choose>
							<xsl:when test="$idioma = 'EN'">Conceptual map</xsl:when>
							<xsl:otherwise>Mapa conceptual</xsl:otherwise>
						</xsl:choose>
					
					
					</h4>
					<p>
						<xsl:value-of select="."/>
					</p>
				</a>
			</xsl:for-each>
		</div>
	</xsl:template>
	
	<xsl:template match="autoevaluate">
		<div class="autoevaluacion">
			<xsl:for-each select="enlace">
				<a href="{@destino}" target="_blank">
					<h4>
						<xsl:choose>
							<xsl:when test="$idioma = 'EN'">Evaluation</xsl:when>
							<xsl:otherwise>Autoevaluación</xsl:otherwise>
						</xsl:choose>
					</h4>
					<p>
						<xsl:value-of select="."/>
					</p>
				</a>
			</xsl:for-each>
		</div>
	</xsl:template>
	
	<!--xsl:template match="ejercitacionLibre">
		<div class="ejercitacion_libre">
			<xsl:for-each select="enlace">
				<a href="{@destino}" target="_blank">
					<h4>
						<xsl:choose>
							<xsl:when test="$idioma = 'EN'">Open practice</xsl:when>
							<xsl:otherwise>Ejercitación libre</xsl:otherwise>
						</xsl:choose>
					</h4>
					<p>
						<xsl:apply-templates/>
					</p>
				</a>
			</xsl:for-each>
		</div>
	</xsl:template-->
	
	<xsl:template match="enlacesreferencia">
		<div class="websref">
			<h4>
				<xsl:choose>
                        <xsl:when test="$idioma = 'EN'">References</xsl:when>
                        <xsl:otherwise>Webs de referencia</xsl:otherwise>
				</xsl:choose>
			</h4>
			<ul>
				<xsl:for-each select="enlace">
					<li><a href="{@destino}" target="_blank"><xsl:apply-templates/></a></li>
				</xsl:for-each>
			</ul>
		</div>
	</xsl:template>
	
	<xsl:template match="media">
		<div class="media">
			<div class="media_left">
				<h4>Media</h4>
			</div>
			<div class="media_right">
				<ul>
					<xsl:for-each select="enlace">
						<li><p><a href="{@destino}" target="_blank"><xsl:apply-templates/></a></p></li>
					</xsl:for-each>
				</ul>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="nota">
		<div class="nota">
			<div class="nota_left">
				<h4>¡Esto es una nota, esto es una nota!</h4>
				<p>Profesor</p>
			</div>
			<div class="nota_right">
				<xsl:apply-templates/>
			</div>
		</div>
	</xsl:template>
	
</xsl:stylesheet>
