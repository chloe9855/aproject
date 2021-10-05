function OpenStreetMap(sName, options)
{
	var m_Url = "http://tile.openstreetmap.org/";
	if (options && options.url)
		m_Url = options.url;
	var dVal = 6378137.0 * Math.PI;
	var dRes = (dVal / 128);
	var dFac = 96 / 0.0254;
	var m_Scales = new Array();
	for (var i = 0 ; i < 19 ; i++, dRes /= 2)
		m_Scales.push({level:i,scale:dRes * dFac,resolution:dRes});

	Inherit(this, new MapTiledLayer(sName, "",
	{
		Extent: new MapEnvelope(-dVal, dVal, dVal, -dVal),
		Origin: new MapPoint(-dVal, dVal),
		Width: 256,
		Height: 256,
		Scales: m_Scales,
		Copyright: "&copy;<a href='http://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC BY-SA</a>"
	}));

	this.getTileUrl = function(s, x, y)
	{
		var ds = parseFloat(s);
		var m = Math.pow(2, ds);
		if (x < 0 || x >= m)
			return null;
		if (y > -1 || y <= -m - 1)
			return null;
		if (m_Url.constructor == String)
			return m_Url + s + "/" + x + "/" + (-y-1) + ".png";
		else if (m_Url.constructor == Array && m_Url.length)
			return m_Url[Math.floor((Math.random() * m_Url.length)) % m_Url.length] + s + "/" + x + "/" + (-y-1) + ".png";
	};
	
	this.getResourceUrl = function()
	{
		return null;
	};
}
