<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <head>
    <title>Playlist</title>
  </head>
  <body>
    <h1>Playlist: <xsl:value-of select="playlist/name"/></h1>
    <xsl:for-each select="playlist/song">

      <div class="song" style="display: grid; grid-template-columns: 1fr 1fr; align-items: center; justify-items:center; background:#CCC; border-radius: .2cm; padding:.1cm; margin:.1cm ">

        <div style="display:flex; flex-direction:column; justify-self:start">
          <div>
            <xsl:value-of select="name"/>
          </div>
          <small>
            <xsl:value-of select="author"/>
          </small>
        </div>

        <div style="color:#777; justify-self:end">
          <xsl:value-of select="duration"/>
        </div>

      </div>
    </xsl:for-each>

  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
