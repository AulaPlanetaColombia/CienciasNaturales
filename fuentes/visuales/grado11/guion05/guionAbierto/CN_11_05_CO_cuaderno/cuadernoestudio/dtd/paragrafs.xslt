<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions">

	<xsl:template match="imagen/p">
		<xsl:choose>
			<xsl:when test="@centrado = 'si'">
				<p class="centrado">
					<xsl:apply-templates/>
				</p>
			</xsl:when>
			<xsl:otherwise>
				<p>
					<xsl:apply-templates/>
				</p>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="listaElemento/p">
		<xsl:choose>
			<xsl:when test="@centrado = 'si'">
				<p class="centrado">
					<xsl:apply-templates/>
				</p>
			</xsl:when>
			<xsl:otherwise>
				<p>
					<xsl:apply-templates/>
				</p>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="nota/p">
		<xsl:choose>
			<xsl:when test="@centrado = 'si'">
				<p class="centrado">
					<xsl:apply-templates/>
				</p>
			</xsl:when>
			<xsl:otherwise>
				<p>
					<xsl:apply-templates/>
				</p>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template match="p">
		<div class="text">
			<xsl:choose>
				<xsl:when test="@centrado = 'si'">
					<p class="centrado">
						<xsl:apply-templates/>
					</p>
				</xsl:when>
				<xsl:otherwise>
					<p>
						<xsl:apply-templates/>
					</p>
				</xsl:otherwise>
			</xsl:choose>	
		</div>
	</xsl:template>
	
</xsl:stylesheet>
