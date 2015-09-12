<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions">
	
	<xsl:template match="listaNumerada">
		<div class="list01">
			<ul>
				<xsl:for-each select="listaElemento">
					<li>
						<xsl:apply-templates/>
					</li>
				</xsl:for-each>
			</ul>
		</div>
	</xsl:template>


	<xsl:template match="listaSinNumerar">
		<div class="list02">
			<ul>
				<xsl:for-each select="listaElemento">
					<li>
						<xsl:apply-templates/>
					</li>
				</xsl:for-each>
			</ul>
		</div>
	</xsl:template>
	
</xsl:stylesheet>
