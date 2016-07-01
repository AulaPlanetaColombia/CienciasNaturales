<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions">

	<xsl:template match="seccion1">
		<xsl:variable name="toc_id">
			<xsl:call-template name="object.id"/>
		</xsl:variable>
		<xsl:variable name="tipus-seccio">
			<xsl:choose>
				<xsl:when test="(count(preceding-sibling::seccion1) + 1) mod 2 = 0">even</xsl:when>
				<xsl:otherwise>odd</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<li class="{$tipus-seccio}">	
			<a href="#">
				<span class="number">
					<xsl:choose>
						<xsl:when test="count(preceding-sibling::seccion1) + 1 &lt; 10">0</xsl:when>
					</xsl:choose>
					<xsl:value-of select="count( preceding-sibling::seccion1 ) + 1"/>
				</span>
				<p class="title" id="$toc_id"><xsl:apply-templates select="seccion1Titulo"/></p>
				<span class="st-arrow">Open or Close</span>
			</a>
			<div class="st-content">
				<xsl:apply-templates select="seccion1Texto"/>
			</div>
		</li>
	</xsl:template>
	
	<xsl:template match="seccion1Texto">
		<div class="clase1">
			<div class="content_inside">
				<div class="left">
					<div class="iconos"><a href="#" class="bulb"></a><a href="#" class="note"></a></div>
				</div>
				<div class="right">
					<xsl:apply-templates select="destacado | formula | imagen | listaNumerada | listaSinNumerar | p | practica | profundiza | recuerda | table | media | nota | blockquote"/>
				</div>
			</div>
		</div>
		<xsl:apply-templates select="seccion2"/>
	</xsl:template>
	
	<xsl:template match="seccion2">
		<xsl:variable name="toc_id">
			<xsl:call-template name="object.id"/>
		</xsl:variable>
		<div class="clase2">
			<div class="subindice">
				<div class="left">
					<div class="numeracion">
						<xsl:choose>
							<xsl:when test="count(../../preceding-sibling::seccion1) + 1 &lt; 10">0</xsl:when>
						</xsl:choose>
						<xsl:value-of select="count(../../preceding-sibling::seccion1) + 1"/>.<xsl:value-of select="count(preceding-sibling::seccion2) + 1"/>
					</div>
				</div>
				<div class="right"><h3 id="{$toc_id}"><xsl:apply-templates select="seccion2Titulo"/></h3></div>
			</div>
			<div class="content_inside">
				<div class="left">
					<div class="iconos"><a href="#" class="bulb"></a><a href="#" class="note"></a></div>
				</div>
				<div class="right">
					<xsl:for-each select="seccion2Texto">
						<xsl:apply-templates select="destacado | formula | imagen | listaNumerada | listaSinNumerar | p | practica | profundiza | recuerda | table | media | nota | blockquote"/>
					</xsl:for-each>
				</div>
			</div>
		</div>
		<xsl:for-each select="seccion2Texto">
			<xsl:apply-templates select="seccion3"/>
		</xsl:for-each>
	</xsl:template>

	<xsl:template match="seccion3">
		<xsl:variable name="toc_id">
			<xsl:call-template name="object.id"/>
		</xsl:variable>
		<div class="clase3">
			<div class="subsubindice">
				<div class="left">
					<div class="numeracion">
						<xsl:choose>
							<xsl:when test="count(../../../../preceding-sibling::seccion1) + 1 &lt; 10">0</xsl:when>
						</xsl:choose>
						<xsl:value-of select="count(../../../../preceding-sibling::seccion1) + 1"/>.<xsl:value-of select="count(../../preceding-sibling::seccion2) + 1"/>.<xsl:value-of select="count(preceding-sibling::seccion3) + 1"/>
					</div>
				</div>
				<div class="right"><h4 id="{$toc_id}"><xsl:apply-templates select="seccion3Titulo"/></h4></div>
			</div>
			<div class="content_inside">
				<div class="left">
					<div class="iconos"><a href="#" class="bulb"></a><a href="#" class="note"></a></div>
				</div>
				<div class="right">
					<xsl:for-each select="seccion3Texto">
						<xsl:apply-templates select="destacado | formula | imagen | listaNumerada | listaSinNumerar | p | practica | profundiza | recuerda | table | media | nota | blockquote"/>
					</xsl:for-each>
				</div>
			</div>
		</div>
	</xsl:template>
	
	<xsl:template match="masinformacion">
		<li class="last">
			<a href="#"><span class="number"></span><p class="title">Fin de unidad:<br/>repaso</p><span class="st-arrow">Open or Close</span></a>
			<div class="st-content" style="padding-bottom:0px">
				<div class="end_unidad">
					<xsl:apply-templates/>
				</div>
			</div>
		</li>	
	</xsl:template>
	
</xsl:stylesheet>
