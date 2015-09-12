<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions">

	<xsl:template name="index">
		<div class="fl_menu">
			<div class="graphite demo-container"> 
				<ul class="accordion" id="accordion-1">
					<xsl:for-each select="seccion1">
						<li>
							<xsl:choose>
								<xsl:when test="count(preceding-sibling::seccion1) = 0">
									<xsl:attribute name="class">first</xsl:attribute>
								</xsl:when>
							</xsl:choose>
							<a>
								<xsl:attribute name="href">#<xsl:call-template name="object.id"/></xsl:attribute>
								<span class="numbers_menu">
									<xsl:choose>
										<xsl:when test="count(preceding-sibling::seccion1) + 1 &lt; 10">0</xsl:when>
									</xsl:choose>
									<xsl:value-of select="count( preceding-sibling::seccion1 ) + 1"/>
								</span>
								<p><xsl:apply-templates select="seccion1Titulo"/></p>
							</a>
							<xsl:choose>
								<xsl:when test="count(child::seccion1Texto/seccion2) &gt; 0">
									<ul>
										<xsl:for-each select="seccion1Texto/seccion2">
											<li>
												<a>
													<xsl:attribute name="href">#<xsl:call-template name="object.id"/></xsl:attribute>
													<span class="numbers_menu_inside">
														<xsl:value-of select="count( preceding-sibling::seccion2 ) + 1"/>
													</span>
													<span class="text-menu-inside"><xsl:apply-templates select="seccion2Titulo"/></span>
												</a>
												<xsl:choose>
													<xsl:when test="count(child::seccion2Texto/seccion3) &gt; 0">
														<ul>
															<xsl:for-each select="seccion2Texto/seccion3">
																<li>
																	<a>
																		<xsl:attribute name="href">#<xsl:call-template name="object.id"/></xsl:attribute>
																		<span class="numbers_menu_inside_inside">
																			<xsl:value-of select="count( ../../preceding-sibling::seccion2 ) + 1"/>.<xsl:value-of select="count( preceding-sibling::seccion3 ) + 1"/>
																		</span>
																		<span class="text-menu-inside"><xsl:apply-templates select="seccion3Titulo"/></span>
																	</a>
																</li>
															</xsl:for-each>
														</ul>
													</xsl:when>
												</xsl:choose>
											</li>
										</xsl:for-each>
									</ul>
								</xsl:when>
							</xsl:choose>
						</li>
					</xsl:for-each>
					<li>
						<a>
							<xsl:attribute name="href">#<xsl:call-template name="object.id"/></xsl:attribute>
							<span class="star_menu"></span>
							<p>Fin de unidad: Repaso</p>
						</a>
					</li>
					<li>
						<a href="#" class="editar">
							<b>Editar</b> índice
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="mapa_conceptual_menu">
			<a>
				<xsl:attribute name="href">#<xsl:call-template name="object.id"/></xsl:attribute>
				<b>Mapa</b> conceptual
			</a>
		</div>
	</xsl:template>
	
</xsl:stylesheet>
