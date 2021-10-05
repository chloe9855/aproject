function CachedLevelTransformation(pCachedLayer)
{
	var m_BaseScaleX = pCachedLayer.getBaseScaleX();
	var m_BaseScaleY = pCachedLayer.getBaseScaleY();
	var pS = pCachedLayer.getScales();
	var m_Factors = pS.map(function(x) { return 1 / (x.resolution * m_BaseScaleX); })
		.sort(function (a, b) { return a - b; });
	var m_Level = 0;
	var m_LevelFac = 1;
	this.Fixed = false;
	
	this.FitLevel = function()
	{
		this.putMapLevel(Math.round(m_Level));
	};
	this.getBaseScaleX = function()
	{
		return m_BaseScaleX;
	};
	this.putBaseScaleX = function(newVal)
	{
		m_BaseScaleX = newVal;
	};
	this.getBaseScaleY = function()
	{
		return m_BaseScaleY;
	};
	this.putBaseScaleY = function(newVal)
	{
		m_BaseScaleY = newVal;
	};
	this.getMapMaxLevel = function()
	{
		return m_Factors.length;
	};
	this.getMapLevel = function()
	{
		return m_Level;
	};
	this.putMapLevel = function(newVal)
	{
		if (this.Fixed)
			newVal = Math.round(newVal);
		if (m_Level == newVal)
			return true;
		var tVal = newVal > m_Factors.length - 1 ? m_Factors.length - 1 : newVal < 0 ? 0 : newVal;
		
		if ((newVal >= m_Factors.length || newVal < 0) && m_Level == tVal)
			return false;
		
		m_Level = tVal;
		m_LevelFac = GetFactor(m_Level);
		return true;
	};
	this.getScale = function()
	{
		return m_BaseScaleX * m_LevelFac;
	};
	this.putScale = function(newVal)
	{
		this.putMapLevel(FromFactory(newVal / m_BaseScaleX));
	};
	this.getScaleX = function()
	{
		return m_BaseScaleX * m_LevelFac;
	};
	this.getScaleY = function()
	{
		return m_BaseScaleY * m_LevelFac;
	};
	this.getLevelScale = function(dLevel)
	{
		return m_BaseScaleX * GetFactor(dLevel);
	};
	function FromFactory(val)
	{
		var nLevel = 0;
		for (nLevel = 0 ; nLevel < m_Factors.length - 1 ; nLevel++)
		{
			if (val < m_Factors[nLevel + 1])
				break;
		}
		if (nLevel < m_Factors.length - 1)
		{
			var fac1 = m_Factors[nLevel];
			var fac2 = m_Factors[nLevel + 1];
			nLevel += Math.log(val / fac1) / Math.log(fac2 / fac1);
		}
		return nLevel;
	}
	function GetFactor(dLevel)
	{
		var nLevel = Math.floor(Math.max(0, Math.min(dLevel, m_Factors.length - 2)));
		var s = dLevel - nLevel;
		var fac1 = m_Factors[nLevel];
		var fac2 = m_Factors[nLevel + 1];
		return fac1 * Math.pow(fac2 / fac1, s);
	}
}
function MapTiledLayer(sName, sSrName, TileInfo, options)
{
	var m_pMap = null;
	var m_MapImages = new Array;
	var m_MapImagesBuffer = new Array;
	var m_hImages = null;
	var m_hCopyright = null;
	var m_Visible = true;
	var m_Name = sName;
	var m_Title = m_Name;
	var m_SRName = "";
	var m_Opacity = 1;
	var m_Extent = new MapEnvelope(0, 1, 1, 0);
	var m_Origin = new MapPoint(0, 0);
	var m_ImgWidth = 256;
	var m_ImgHeight = 256;
	var m_Scales = new Array;
	var m_Copyright = null;
	
	if (TileInfo)
	{
		m_Extent = TileInfo.Extent || new MapEnvelope(0, 1, 1, 0);
		m_Origin = TileInfo.Origin || new MapPoint(0, 0);
		m_ImgWidth = TileInfo.Width || 256;
		m_ImgHeight = TileInfo.Height || 256;
		m_Scales = new Array;
		
		if (TileInfo.Scales)
		{
			for (var i = 0 ; i < TileInfo.Scales.length ; i++)
			{
				var sc = TileInfo.Scales[i];
				var pSC = {level:sc.level, scale:sc.scale, resolution:sc.resolution};
				
				pSC.toString = function()
				{
					return this.level + ":" + this.scale + "[" + this.resolution + "]";
				};
				m_Scales.push(pSC);
			}
		}
		if (TileInfo.Copyright)
			m_Copyright = TileInfo.Copyright;
	}
	this.getHObject = function()
	{
		return m_hImages;
	};
	this.getNode = function()
	{
		return m_hImages;
	};
	this.getName = function()
	{
		return m_Name;
	};
	this.putName = function(newVal)
	{
		m_Name = newVal;
	};
	this.getTitle = function()
	{
		return m_Title;
	};
	this.putTitle = function(newVal)
	{
		m_Title = newVal;
	};
	this.getVisible = function()
	{
		return m_Visible;
	};
	this.putVisible = function(newVal)
	{
		m_Visible = newVal;
		if (m_hImages)
			m_hImages.style.visibility = m_Visible ? "" : "hidden";
	};
	this.getSRName = function()
	{
		return m_SRName;
	};
	this.getExtent = function()
	{
		return m_Extent;
	};
	this.getOrigin = function()
	{
		return m_Origin;
	};
	this.getScales = function()
	{
		return m_Scales;
	};
	this.getBaseScaleX = function()
	{
		return 1 / m_Scales[0].resolution;
	};
	this.getBaseScaleY = function()
	{
		return -1 / m_Scales[0].resolution;
	};
	this.getLeft = function()
	{
		return m_Extent.Left;
	};
	this.getTop = function()
	{
		return m_Extent.Top;
	};
	this.getRight = function()
	{
		return m_Extent.Right;
	};
	this.getBottom = function()
	{
		return m_Extent.Bottom;
	};
	function AddMapImage(pScale, nIndexX, nIndexY)
	{
		var surl = this.getTileUrl(pScale.level, nIndexX, nIndexY);
		if (surl == null)
			return;
		
		for (var i = 0 ; i < m_MapImages.length ; i++)
		{
			if (m_MapImages[i].isEqual(pScale.scale, nIndexX, nIndexY))
				return;
		}
		dLeft = m_Origin.X + nIndexX * pScale.resolution * m_ImgWidth;
		dRight = m_Origin.X + (nIndexX + 1) * pScale.resolution * m_ImgWidth;
		dTop = m_Origin.Y - nIndexY * pScale.resolution * m_ImgHeight;
		dBottom = m_Origin.Y - (nIndexY + 1) * pScale.resolution * m_ImgHeight;
		m_MapImages.push(new MapCachedImage(surl, m_hImages, pScale.scale, nIndexX, nIndexY, dLeft, dTop, dRight, dBottom, options));
	}
	function FindScale(resolution)
	{
		if (m_Scales.length <= 0)
			return -1;
		var sidx = 0;
		var f = Math.abs(Math.log(m_Scales[0].resolution / resolution));
		for (var i = 1 ; i < m_Scales.length ; i++)
		{
			var sc = m_Scales[i];
			var tf = Math.abs(Math.log(sc.resolution / resolution));
			if (tf < f)
			{
				sidx = i;
				f = tf;
			}
		}
		return sidx;
	}
	this.setOpacity = function(opacity)
	{
		if (typeof opacity == "number")
		{
			m_Opacity = opacity;
			if (m_hImages)
			{
				m_hImages.style.opacity = opacity;
				m_hImages.style.filter = "alpha(opacity = " + opacity * 100 + ")";
			}
		}
	};
	this.Initialize = function(pMap, pNode)
	{
		m_pMap = pMap;
		this.RemoveSelf(true);
		pNode = pNode || m_pMap.getHObject();
		m_hImages = pNode.ownerDocument.createElement("div");
		pNode.appendChild(m_hImages);
		m_hImages.style.position = "absolute";
		m_hImages.style.left = "0px";
		m_hImages.style.top = "0px";
		m_hImages.style.width = "100%";
		m_hImages.style.height = "100%";
		m_hImages.style.visibility = m_Visible ? "" : "hidden";
		this.setOpacity(m_Opacity);
		
		if (m_Copyright)
		{
			m_hCopyright = pNode.ownerDocument.createElement("div");
			pNode.appendChild(m_hCopyright);
			m_hCopyright.style.position = "absolute";
			m_hCopyright.style.overflow = "hidden";
			m_hCopyright.style.right = "0px";
			m_hCopyright.style.bottom = "0px";
			m_hCopyright.innerHTML = m_Copyright;
		}
	};
	this.RemoveSelf = function()
	{
		if (m_MapImages)
		{
			while (m_MapImages.length > 0)
				m_MapImages.pop().RemoveSelf();
		}
		if (m_MapImagesBuffer)
		{
			while (m_MapImagesBuffer.length > 0)
				m_MapImagesBuffer.pop().RemoveSelf();
		}
		if (m_hImages != null)
		{
			if (m_hImages.parentNode)
				m_hImages.parentNode.removeChild(m_hImages);
			m_hImages = null;
		}
		if (m_hCopyright != null)
		{
			if (m_hCopyright.parentNode)
				m_hCopyright.parentNode.removeChild(m_hCopyright);
			m_hCopyright = null;
		}
	};
	this.UpdateElement = function()
	{
		if (m_pMap == null || !this.getVisible())
			return;
		var pImgs = [m_MapImages, m_MapImagesBuffer];
		
		for (var j = 0 ; j < pImgs.length ; j++)
		{
			var pImg = pImgs[j];
			for (var i = 0 ; i < pImg.length ; i++)
			{
				var cltpt = m_pMap.FromMapPoint(pImg[i].getLeft(), pImg[i].getTop());
				var cltpt2 = m_pMap.FromMapPoint(pImg[i].getRight(), pImg[i].getBottom());
				var dw2 = cltpt2.X - cltpt.X;
				var dh2 = cltpt2.Y - cltpt.Y;
				
				if (dw2 < 0)
					cltpt.X -= dw2 = -dw2;
				if (dh2 < 0)
					cltpt.Y -= dh2 = -dh2;
				pImg[i].ReloadStatus(cltpt.X, cltpt.Y, dw2, dh2);
			}
		}
	};
	this.RebuildElement = function()
	{
		if (m_pMap == null || !this.getVisible() || m_Scales.length <= 0)
			return;
		
		var rx = m_pMap.ToMapDistX(1);
		var sidx = FindScale(rx);
		var pScale = m_Scales[sidx];
		var sx = pScale.resolution * m_ImgWidth;
		var sy = pScale.resolution * m_ImgHeight;
		var ev = m_pMap.getExtendedViewport();
		var UL = {X: ev.xmin, Y: ev.ymax};
		var DR = {X: ev.xmax, Y: ev.ymin};
		var bX1 = Math.floor((Math.max(UL.X, m_Extent.Left) - m_Origin.X) / sx);
		var bY1 = Math.floor((m_Origin.Y - Math.max(DR.Y, m_Extent.Top)) / sy);
		var bX2 = Math.ceil((Math.min(DR.X, m_Extent.Right) - m_Origin.X) / sx);
		var bY2 = Math.ceil((m_Origin.Y - Math.min(UL.Y, m_Extent.Bottom)) / sy);
		UL.X = m_Origin.X + bX1 * sx;
		UL.Y = m_Origin.Y - bY1 * sy;
		DR.X = m_Origin.X + bX2 * sx;
		DR.Y = m_Origin.Y - bY2 * sy;
		
		for (var j = bY1 ; j < bY2 ; j++)
		{
			for (var i = bX1 ; i < bX2 ; i++)
				AddMapImage.call(this, pScale, i, j);
		}
		var pArray = new Array;
		var cnt = m_MapImages.length;
		for (var i = 0 ; i < cnt ; i++)
		{
			var pMI = m_MapImages[i];
			var dScl = pMI.getScale();
			var dX = (pMI.getLeft() + pMI.getRight()) / 2;
			var dY = (pMI.getTop() + pMI.getBottom()) / 2;
			
			if (dScl == pScale.scale && dX < UL.X != dX < DR.X && dY < UL.Y != dY < DR.Y)
				pArray.push(pMI);
			else if (pMI.IsComplete() && pMI.getStatus())
				m_MapImagesBuffer.push(pMI);
			else
				pMI.RemoveSelf();
		}
		m_MapImages = pArray;
		this.UpdateElement();
		
		var pCheckLoaded = function()
		{
			var b = true;
			for (var i = 0 ; i < m_MapImages.length ; i++)
			{
				if (!m_MapImages[i].IsComplete())
					return setTimeout(pCheckLoaded, 500);
				else
					b = m_MapImages[i].getStatus();
				
				if (b)
				{
					while (m_MapImagesBuffer.length > 0)
						m_MapImagesBuffer.pop().RemoveSelf();
				}
			}
		};
		setTimeout(pCheckLoaded, 500);
	};
}
function MapCachedLayer(ResourcePath, options)
{
	var pThis = this;
	var m_MapLayers = new Array;
	var m_ThematicLayer = null;
	var m_path = "";
	var m_Name = "";
	var m_Title = "";
	var m_Extent;
	var m_options = options;
    this.ndelete = false;
	
	if (!options)
		return;
    this.failed = false;

    var m_path = "/ServerGate/SGSGate.ashx";
    if (ResourcePath != null && ResourcePath != "")
    {
    	if (ResourcePath.substr(0, 7).toLowerCase() != "http://" && ResourcePath.substr(0, 8).toLowerCase() != "https://")
    		m_path = "http://" + ResourcePath + m_path;
		else
		{
			var idx = ResourcePath.toLowerCase().indexOf(m_path.toLowerCase());
			if (idx < 0)
				m_path = ResourcePath;
			else
			{
				var p = ResourcePath.substr(idx + m_path.length);
				if (p.substr(0, 6) == "/REST/")
				{
					var j = p.indexOf("/", 6);
					if (j >= 0)
						options.Resource = p.substring(6, j);
					else
						options.Resource = p.substr(6);
				}
				m_path = ResourcePath.substr(0, idx + m_path.length);
			}
		}
    }
    var m_Server = new SuperGIS.Server.SGServer(m_path, false);
    if (options.UserPass)
    	m_Server.Login(options.UserPass, null, function () { });
    else if (options.Username && options.Password)
    	m_Server.Login(options.Username, options.Password, function () { });
    var R = m_Server.GetResource(options.Resource);
    m_Resource = R;

	if (m_Resource == null)
	{
            alert('Not a valid user. Can not get the cache information.');
            pThis.failed = true;
            return;
	}
	m_Name = R.getName();
	m_Title = R.getName();
	
	var m_ImgWidth = R.getTileWidth();
	var m_ImgHeight = R.getTileHeight();
	if (isNaN(m_ImgWidth))
		m_ImgWidth = 256;
	if (isNaN(m_ImgHeight))
		m_ImgHeight = 256;
	var m_Origin = new MapPoint(R.getOriginX(), R.getOriginY());
	if (isNaN(m_Origin.X))
		m_Origin.X = 0;
	if (isNaN(m_Origin.Y))
		m_Origin.Y = 0;
	var pEnv = R.getTileEnvelope();
	m_Extent = new MapEnvelope(pEnv.Left, pEnv.Top, pEnv.Right, pEnv.Bottom);
	if (isNaN(m_Extent.Left))
		m_Extent.Left = 0;
	if (isNaN(m_Extent.Top))
		m_Extent.Top = 1;
	if (isNaN(m_Extent.Right))
		m_Extent.Right = 1;
	if (isNaN(m_Extent.Bottom))
		m_Extent.Bottom = 0;
	var m_Scales = new Array;
	var pScls = R.getScales();
	if (pScls)
		m_Scales = pScls.map(function(item, i) { return {level: i, scale: item.Denominator, resolution: item.Factor}; });
	m_Scales.reverse();
	MapTiledLayer.call(this, m_Name, null, { Extent: m_Extent, Origin: m_Origin, Width: m_ImgWidth, Height: m_ImgHeight, Scales: m_Scales }, options);
	function innerCachedLayer(pLyrDes, nLayerIndex)
	{
		var ithat = this;
		
		var sName = pLyrDes.getName();
		var m_Title = sName;
		var m_FeatureType = 0;
		//m_FeatureType = parseInt(GetXMLNodeAttribute(pl, "GeometryType"));
		
		var pSR = pLyrDes.getSpatialReferenceObject();
		if (pSR)
			var sSRName = pSR.PROJCS ? pSR.PROJCS.Name : pSR.GEOGCS ? pSR.GEOGCS.Name : null;;
		
		var m_Fields = null;
		//var pFlds = FindXMLNodes(GetXMLChildNode(pl, "Fields"), "Field");
		//if (pFlds)
		//{
		//	m_Fields = new Array;
		//	for (var i = 0 ; i < pFlds.length ; i++)
		//		m_Fields.push(GetXMLNodeAttribute(pFlds.item(i), "Name"));
		//}
		MapTiledLayer.call(ithat, sName, sSRName, { Extent: m_Extent, Origin: m_Origin, Width: m_ImgWidth, Height: m_ImgHeight, Scales: m_Scales }, options);
		
		this.getFields = function()
		{
			return m_Fields;
		};
		this.getFeatureType = function()
		{
			return m_FeatureType;
		};
		this.getTileUrl = function(s, x, y)
		{
			//return m_path + "/GetCacheImage?ResourceName=" + encodeURIComponent(R.getName()) + "&ScaleIndex=" + s + "&XIndex=" + x + "&YIndex=" + y + "&LayerIndex=" + nLayerIndex + "";
			return [m_path, "REST", encodeURIComponent(R.getName()), "Tile", s, y, x, nLayerIndex].join("/");
		};
		this.getResource = function()
		{
			var pth = null;
			//var pAgent = AjaxAgent(m_path + "/" + nLayerIndex + "/Legend/", false, false);
			//pAgent.OverrideMimeType("text/plain; charset=x-user-defined");
			//pAgent.SendRequest(reqdata, function(pRequest) { pth = "data:image/jpeg;base64," + Base64Encode(pRequest.responseText); });
			return pth;
		};
		this.ExecuteQuery = function(expr, bGeom, pSucceed, pFailed)
		{
			pAgent = new AjaxAgent(ResourcePath + "/Query", true, true);
			pAgent.SendRequest("Layer=" + escape(this.getName()) + (bGeom ? "&GEOM=" : "&EXPR=") + escape(expr), pSucceed, null, pFailed);
		};
	}
	
	var pLyrs = R.getLayers();
	if (pLyrs)
	{
		for (var i = 0 ; i < pLyrs.length ; i++)
			m_MapLayers.push(new innerCachedLayer(pLyrs[i], i));
	}
	m_ThematicLayer = null;
	
	if (m_MapLayers.length > 0)
		m_ThematicLayer = m_MapLayers[m_MapLayers.length - 1];

    if (this.failed)
        return;
	
	this._Initialize = this.Initialize;
	this._RemoveSelf = this.RemoveSelf;
	
	this.Initialize = function(pMap, pNode)
	{
		this._Initialize(pMap, pNode);
		for (var i = m_MapLayers.length - 1 ; i >= 0 ; i--)
			m_MapLayers[i].Initialize(pMap, this.getHObject());
	};
	this.RemoveSelf = function(d)
	{
		this._RemoveSelf();
		for (var i = 0 ; i < m_MapLayers.length ; i++)
			m_MapLayers[i].RemoveSelf();
		m_pMap = null;
        if (!d)
            pThis.ndelete = true;
	};
	this.getTileUrl = function (s, x, y)
	{
		return [m_path, "REST", encodeURIComponent(R.getName()), "Tile", s, y, x, 0].join("/");
		//return m_path + "/GetCacheImage?ResourceName=" + encodeURIComponent(R.getName()) + "&ScaleIndex=" + s + "&XIndex=" + x + "&YIndex=" + y + "&LayerIndex=0";
	};
	if (m_MapLayers.length > 0)
	{
		this.UpdateElement = function ()
		{
			if (!this.getVisible())
				return;

			for (var i = 0 ; i < m_MapLayers.length ; i++)
				m_MapLayers[i].UpdateElement();
		};
		this.RebuildElement = function ()
		{
			if (!this.getVisible())
				return;

			for (var i = 0 ; i < m_MapLayers.length ; i++)
				m_MapLayers[i].RebuildElement();
		};
	}
	this.getResourcePath = function()
	{
		return ResourcePath;
	};
	this.getLayers = function()
	{
		return m_MapLayers;
	};
	this.getThematicLayer = function()
	{
		return m_ThematicLayer;
	};
	this.getFeatureType = function()
	{
		if (m_ThematicLayer == null)
			return;
		return m_ThematicLayer.getFeatureType();
	};
	this.getFeatureType = function()
	{
		if (m_ThematicLayer == null)
			return;
		return m_ThematicLayer.getFeatureType();
	};
	this.getFields = function()
	{
		if (m_ThematicLayer == null)
			return;
		return m_ThematicLayer.getFields();
	};
	this.CreateLegend = function(pLgd)
	{
		for (var i = 0 ; i < m_MapLayers.length ; i++)
		{
			pLgd.CreateSubLegend(m_MapLayers[i], function(tEvent, pLayer)
			{
				m_ThematicLayer = pLayer;
			});
		}
	};
	this.ExecuteQuery = function(expr, bGeom, pSucceed, pFailed)
	{
		if (m_ThematicLayer == null)
			return;
		m_ThematicLayer.ExecuteQuery(expr, bGeom, pSucceed, pFailed);
	};
	this.getPreview = function (node, width, height)
	{
		var tarnode = node;
		var path = m_path + "MapImage/?left=" + m_Extent.Left + "&top=" + m_Extent.Top + "&right=" + m_Extent.Right + "&bottom=" + m_Extent.Bottom + "&width=" + width + "&height=" + height;
		var reqdata = new FormData();
		if (m_options.UserPass)
		{
			reqdata.append("UserPass", m_options.UserPass);
		}
		else if (m_options.Username && m_options.Password)
		{
			reqdata.append("Username", m_options.Username);
			reqdata.append("Password", m_options.Password);
		}
		
		var Agent = new AjaxAgent(path, false, false);
		Agent.OverrideMimeType("text/plain; charset=x-user-defined");
		Agent.SendRequest(reqdata, function(pRequest)
		{
			var pData = pRequest.responseText;
			tarnode.crossOrigin = "anonymous";
			tarnode.onload = function() {};
			tarnode.src = "data:image/png;base64," + Base64Encode(pData);
		});
	};
	this.toJson = function()
	{
		return { type: "MapCachedLayer", url: [m_path, "REST", encodeURIComponent(R.getName())].join("/"), options: m_options };
	};
}
MapCachedLayer.fromJson = function(json)
{
	return new MapCachedLayer(json.url, json.options);
};
function MapCachedImage(ResourcePath, pNode, dScale, nIndexX, nIndexY, dLeft, dTop, dRight, dBottom, options)
{
	var m_hObj;
	var m_dScale;
	var m_nIndexX;
	var m_nIndexY;
	var m_dLeft;
	var m_dTop;
	var m_dRight;
	var m_dBottom;
	var m_Error = false;
	m_dScale = dScale;
	m_nIndexX = nIndexX;
	m_nIndexY = nIndexY;
	m_dLeft = dLeft;
	m_dTop = dTop;
	m_dRight = dRight;
	m_dBottom = dBottom;
	mapurl = ResourcePath;
	m_hObj = pNode.ownerDocument.createElement("img");
	
	m_hObj.onerror = function()
	{
		m_hObj.onload = null;
		m_hObj.onerror = null;
		m_Error = true;
	};
	m_hObj.onmousedown = function()
	{
		return false;
	};
	
	var rpath = mapurl;
	var pAgent = new AjaxAgent(rpath, true, false);
	pAgent.OverrideMimeType("text/plain; charset=x-user-defined");
	var reqdata = new FormData();
	if (options.UserPass)
	{
		reqdata.append("UserPass", options.UserPass);
	}
	else if (options.Username && options.Password)
	{
		reqdata.append("Username", options.Username);
		reqdata.append("Password", options.Password);
	}
	reqdata.append("Language", "Chinese");
	
	pAgent.SendRequest(reqdata, function(pRequest)
	{
		var pData = pRequest.responseText;
		m_hObj.crossOrigin = "anonymous";
		m_hObj.onload = function() {};
		m_hObj.src = "data:image/png;base64," + Base64Encode(pData);
	});
	
	//m_hObj.src = mapurl;
	m_hObj.galleryImg = false;
	m_hObj.hideFocus = true;
	m_hObj.style.MozUserSelect = "none";
	m_hObj.border = "0px";
	m_hObj.style.width = 0;
	m_hObj.style.height = 0;
	m_hObj.style.position = "absolute";
	pNode.appendChild(m_hObj);
	
	this.IsComplete = function()
	{
		return m_hObj.complete || m_hObj.readyState == "complete";
	};
	this.getStatus = function()
	{
		return !m_Error;
	};
	this.getHObject = function()
	{
		return m_hObj;
	};
	this.getScale = function()
	{
		return m_dScale;
	};
	this.getLeft = function()
	{
		return m_dLeft;
	};
	this.getTop = function()
	{
		return m_dTop;
	};
	this.getRight = function()
	{
		return m_dRight;
	};
	this.getBottom = function()
	{
		return m_dBottom;
	};
	this.RemoveSelf = function()
	{
		if (m_hObj)
		{
			m_hObj.onmousedown = null;
			pNode.removeChild(m_hObj);
		}
		m_hObj = null;
	};
	this.ReloadStatus = function(cx, cy, imgWidth, imgHeight)
	{
		var tx = cx + imgWidth;
		cx = Math.round(cx);
		var ty = cy + imgHeight;
		cy = Math.round(cy);
		m_hObj.style.left = cx + "px";
		m_hObj.style.top = cy + "px";
		m_hObj.style.width = Math.round(tx - cx) + "px";
		m_hObj.style.height = Math.round(ty - cy) + "px";
	};
	this.isEqual = function(dScl, dX, dY)
	{
		return m_dScale == dScl && m_nIndexX == dX && m_nIndexY == dY;
	};
};