<!-- 
	jGrouseDoc template file. 
	Creates content for top-left frame with all namespaces
	@Copyright (c) 2007 by Denis Riabtchik. All rights reserved. See license.txt and http://jgrouse.com for details@
	$Id: startup.xslt 276 2007-12-09 00:50:40Z denis.riabtchik $
-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:param name='rootPath' />
    <xsl:param name="projectDesc"/>
    <xsl:param name="projectName"/>
	<xsl:param name='version'/>	
    <xsl:param name='aux_css'>not_specified</xsl:param>
	
	<xsl:output method='HTML' doctype-public="-//W3C//DTD HTML 4.01//EN"
		doctype-system="http://www.w3.org/TR/html4/strict.dtd">

	</xsl:output> 
    <xsl:import href="../../common/xslt/common.xslt"/>
    <xsl:import href="nfcommon.xslt"/>

	<xsl:template match="/">
		<xsl:comment>Generated by jGrouseDoc</xsl:comment>
		<html>
		    <head>
			     <xsl:call-template name="writeCss">
			         <xsl:with-param name="rootPath"><xsl:value-of select="$rootPath"/></xsl:with-param>
			         <xsl:with-param name="aux_css"><xsl:value-of select="$aux_css"/></xsl:with-param>
			     </xsl:call-template>
                 <script type="text/javascript" src="navTree.js"></script>
                 <script type="text/javascript" src="jgdoc.js"></script>
                 <title><xsl:value-of select="$projectName"/></title>
			</head>
			<body>
			    <div class="startup" id="startup">
			         <div class="banner" id="banner">
                         <h1 class="projectName">
                             <xsl:element name="a">z
                                 <xsl:attribute name="href">.</xsl:attribute>
                                 <xsl:attribute name="class">banner</xsl:attribute>
                                 <xsl:value-of select="$projectName"/>
                             </xsl:element>
                         </h1>
                         <div class="bar">
                             version <xsl:value-of select="$version"/>
                         </div>
                     </div>
		             <div class="content" id="docContent">
		                  <div class="block">
				                <div class="search" id="searchBlock">
				                    <div class="searchLabel">Search:</div>
				                    <div class="searchBlock">
						                <input id="jgsSearchString" type="text" size="60" class="jgdSearchString"/>
						                <div id="jgsSearchPanel" class="jgsSearchPanel" style="display:none">
							                <div  class="jgdSearchRect" >
							                    <div id="jgsSearchResults">
							                        Loading....
							                    </div>
							                </div>
						                   <div id="jgsInfo" class="jgsInfo" >No selection</div>
	                                    </div>
	                                 </div>
				                </div>
				                <div id="docScroll" class="docScroll">
				                    <div>
				                    <hr/>
					                <xsl:if test="count(/jgdoc/project) != 0">
					                    <div class="projectDesc">
					                    <a name="desc"></a><br/>
					                    <xsl:if test="string-length($projectDesc) != 0">
					                       <h1><xsl:value-of select="$projectDesc"/></h1>
					                    </xsl:if>
					                    <xsl:apply-templates select='/jgdoc/project/comment/commentContent/content'/>
					                    <p />
					                    <xsl:apply-templates select="/jgdoc/project/comment" mode="genCommonAttrs" />
					                    </div>
					                </xsl:if>
					                </div>				                    
				                </div>
                	       </div>
		             </div>
		             <xsl:call-template name="navigationPane">
		                  <xsl:with-param name="elementType">logical</xsl:with-param>
		             </xsl:call-template>  
				</div>	  
			</body>
            <script type="text/javascript">
                jgdoc.Searcher.start();
                jgdoc.NavTree.initialize('GLOBAL');
            </script>			
			<script type="text/javascript" src="jsindex.js">
            </script>
		</html>
	</xsl:template>



</xsl:stylesheet>
