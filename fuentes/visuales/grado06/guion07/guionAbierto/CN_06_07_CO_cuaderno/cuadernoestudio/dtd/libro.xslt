<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<!--xsl:output method="html" version="4.0" encoding="UTF-8" indent="yes"/-->
	
	<xsl:output method="html" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" encoding="UTF-8" indent="yes"/>

	<xsl:character-map name="spaces">
		<xsl:output-character character="&#160;" string="&amp;nbsp;"/>
	</xsl:character-map>


	<xsl:include href="config.xslt"/>
	<xsl:include href="index.xslt"/>
	<xsl:include href="seccions.xslt"/>
	<xsl:include href="llistes.xslt"/>
	<xsl:include href="blocs.xslt"/>
	<xsl:include href="basics.xslt"/>
	<xsl:include href="paragrafs.xslt"/>
	<xsl:include href="taules.xslt"/>
	
	
	<xsl:template match="/">
		<xsl:for-each select="libro">
			<html>
				<head>
					<style type="text/css">
						<!--
						body{margin:0px; padding:0px;}
						.fl_menu{position:relative; top:10px; left:0px; z-index:9999; width:150px; height:50px;}
						-->
					</style>
					<link href="cuadernoestudio/css/style_DTD.css" type="text/css" rel="stylesheet"/>
					<link href="cuadernoestudio/css/xsl-styles.css" type="text/css" rel="stylesheet"/>
					<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
					<script type="text/javascript" src="cuadernoestudio/js/jquery.accordion.js"></script>
					<script type="text/javascript" src="cuadernoestudio/js/jquery.easing.1.3.js"></script>
					<script type='text/javascript' src='cuadernoestudio/js/jquery.cookie.js'></script>
					<script type='text/javascript' src='cuadernoestudio/js/jquery.hoverIntent.minified.js'></script>
					<script type='text/javascript' src='cuadernoestudio/js/jquery.dcjqaccordion.2.7.min.js'></script>
					<script type='text/javascript' src='cuadernoestudio/js/jquery.scrolltofixed-min.js'></script>
					
					<script type="text/javascript">
						$(function() {
							$('#accordion-1').dcAccordion({
								eventType: 'click',
								autoClose: true,
								saveState: false,
								disableLink: true,
								speed: 'slow',
								showCount: false,
								autoExpand: true,
								cookie	: 'dcjq-accordion-1',
								classExpand	 : 'dcjq-current-parent'
							});
						
							$('#st-accordion').accordion({
								oneOpenedItem	: true
							});
						
							$(".sidebar").scrollToFixed();
						});
					</script>
					<noscript>
						<style>
							.st-accordion ul li{
								height:auto;
							}
							.st-accordion ul li > a span{
								visibility:hidden;
							}
						</style>
					</noscript>
				</head>
				<body>
					<div class="wrapper"> <!--wrapper-->
						<div class="main-content">
							
							<div class="sidebar">
								<xsl:call-template name="index"/>
							</div>
							
							<div class="content">
								<div class="cuadernoEstudio temas-verde">
									<div class="st-accordion" id="st-accordion">
										<ul>
											<xsl:apply-templates select="seccion1"/>
											<xsl:apply-templates select="masinformacion"/>
										</ul>
									</div>
								</div>
							</div>
							
						</div><!--end main content-->
						
						<div class="footer"></div>
					</div><!--end wrapper-->
					<script>
					//config
					$float_speed=1500; //milliseconds
					$float_easing="easeOutQuint";
					$menu_fade_speed=500; //milliseconds
					$closed_menu_opacity=0.75;
					
					//cache vars
					$fl_menu=$(".fl_menu");
					$fl_menu_menu=$(".fl_menu .menu");
					$fl_menu_label=$(".fl_menu .label");
					
					$(window).load(function() {
						menuPosition=$('.fl_menu').position().top;
						//FloatMenu();
						$fl_menu.hover(
							function(){ //mouse over
								$fl_menu_label.fadeTo($menu_fade_speed, 1);
								$fl_menu_menu.fadeIn($menu_fade_speed);
							},
							function(){ //mouse out
								$fl_menu_label.fadeTo($menu_fade_speed, $closed_menu_opacity);
								$fl_menu_menu.fadeOut($menu_fade_speed);
							}
						);
					});
					</script>
				</body>
			</html>
		</xsl:for-each>
	</xsl:template>

</xsl:stylesheet>