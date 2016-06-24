<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions">

	<xsl:variable name="image_dir">cuadernoestudio/images_xml</xsl:variable>
	
	<xsl:variable name="idioma">
                        <xsl:value-of select="substring(libro/@id,1,2)"/>
            </xsl:variable>

	<xsl:template name="object.id">
		<xsl:param name="object" select="."/>
		<xsl:choose>
			<xsl:when test="$object/@id">
				<xsl:value-of select="$object/@id"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="generate-id($object)"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
</xsl:stylesheet>
