<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions">

	<xsl:template match="blockquote">
		<blockquote>
			<xsl:apply-templates/>
		</blockquote>
	</xsl:template>
	
	
	<xsl:template match="destacado">
		<div class="destacado">
			<xsl:apply-templates/>
		</div>
	</xsl:template>
	
	<xsl:template match="destacadoTitulo">
		<h4><xsl:apply-templates/></h4>
	</xsl:template>
	
	<xsl:template match="recuerda">
		<div class="recuerda">
			<h4>¡Recuerda!</h4>
			<xsl:apply-templates/>
		</div>
	</xsl:template>
	
	<xsl:template match="profundiza">
		<div class="profundiza">
			<div class="profundiza_left">
				<h4>Aprende</h4>
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
				<h4>Practica</h4>
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
					<h4 id="$toc_id">Mapa Conceptual</h4>
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
					<h4>Autoeveluación</h4>
					<p>
						<xsl:value-of select="."/>
					</p>
				</a>
			</xsl:for-each>
		</div>
	</xsl:template>
	
	<xsl:template match="ejercitacionLibre">
		<div class="ejercitacion_libre">
			<xsl:for-each select="enlace">
				<a href="{@destino}" target="_blank">
					<h4>Ejercitación libre</h4>
					<p>
						<xsl:apply-templates/>
					</p>
				</a>
			</xsl:for-each>
		</div>
	</xsl:template>
	
	<xsl:template match="enlacesreferencia">
		<div class="websref">
			<h4>Webs de referencia</h4>
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
