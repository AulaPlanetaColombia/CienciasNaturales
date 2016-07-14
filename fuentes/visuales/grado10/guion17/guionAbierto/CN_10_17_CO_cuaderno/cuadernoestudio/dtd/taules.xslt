<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions">

<xsl:template match="table">
	<div class="table01 {@filete}filete">
		<table width="100%">
			<xsl:apply-templates/>
		</table>
	</div>
</xsl:template>

<xsl:template match="caption">
	<caption>
		<xsl:apply-templates/>
	</caption>
</xsl:template>
	
<xsl:template match="tr">
	<tr>
		<xsl:apply-templates/>
	</tr>
</xsl:template>
	
<xsl:template match="td">
	<td>
		<xsl:choose>
			<xsl:when test="@colspan != ''">
				<xsl:attribute name="colspan">
					<xsl:value-of select="@colspan"/>
				</xsl:attribute>
			</xsl:when>
		</xsl:choose>
		<xsl:choose>
			<xsl:when test="@rowspan != ''">
				<xsl:attribute name="rowspan">
					<xsl:value-of select="@rowspan"/>
				</xsl:attribute>
			</xsl:when>
		</xsl:choose>
		<xsl:apply-templates/>
	</td>
</xsl:template>
	
</xsl:stylesheet>
