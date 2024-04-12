<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <head>
    <title>Playlist</title>
  </head>
  <body>
    <h1>Playlist: <xsl:value-of select="playlist/name"/></h1>
    <table border="1">
      <tr bgcolor="#9acd32">
        <th>Song</th>
        <th>Author</th>
        <th>Duration</th>
      </tr>
      <xsl:for-each select="playlist/song">
        <tr>
          <td><xsl:value-of select="name"/></td>
          <td><xsl:value-of select="author"/></td>
          <td><xsl:value-of select="duration"/></td>
        </tr>
      </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>

<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <head>
    <title>Playlist</title>
  </head>
  <body>
    <h1>Playlist: <xsl:value-of select="playlist/name"/></h1>
    <table border="1">
      <tr bgcolor="#9acd32">
        <th>Song</th>
        <th>Author</th>
        <th>Duration</th>
      </tr>
      <xsl:for-each select="playlist/song">
        <tr>
          <td><xsl:value-of select="name"/></td>
          <td><xsl:value-of select="author"/></td>
          <td><xsl:value-of select="duration"/></td>
        </tr>
      </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
