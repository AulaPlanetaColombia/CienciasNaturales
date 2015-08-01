<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions">

	<xsl:template match="br">
		<br /><xsl:apply-templates/>
	</xsl:template>
	
	<xsl:template match="negrita">
		<strong><xsl:apply-templates/></strong>
	</xsl:template>

	<xsl:template match="cursiva">
		<i><xsl:apply-templates/></i>
	</xsl:template>

	<xsl:template match="negritacursiva">
		<strong><i><xsl:apply-templates/></i></strong>
	</xsl:template>

	<xsl:template match="subindice">
		<sub><xsl:apply-templates/></sub>
	</xsl:template>

	<xsl:template match="superindice">
		<sup><xsl:apply-templates/></sup>
	</xsl:template>
	
	<xsl:template match="enlace">
		<a href="{@destino}" target="_blank"><xsl:apply-templates/></a>
	</xsl:template>
	
	<xsl:template match="formula">
		<div class="formula">
			<xsl:choose>
				<xsl:when test="@alineacion='centrada'">
					<xsl:attribute name="style">text-align:center;</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="style">text-align:left;</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<img src="{$image_dir}/{@src}"/>
		</div>	
	</xsl:template>
	
	<xsl:template match="imagen">
		<div class="image_horizontal">
			<xsl:choose>
				<xsl:when test="count(ancestor::listaElemento) != 0">
					<xsl:attribute name="style">margin-left:<xsl:value-of select="-(count(ancestor::listaElemento) * 40)"/>px</xsl:attribute>
				</xsl:when>
			</xsl:choose>
			<img src="{$image_dir}/{@src}" />
			<xsl:apply-templates/>
		</div>
	</xsl:template>
	
</xsl:stylesheet>
