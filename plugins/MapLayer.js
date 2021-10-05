MapLayer.enumFeatureType = {Unknown:0, Point:1, LineString:2, Polygon:3};
function MapLayer(sName, ResourcePath, UserPass)
{
	var pThis = this;
	var m_pMap = null;
	var m_Name = sName;
	var m_Title = sName;
	var m_SRName = null;
	var m_dLeft = 0;
	var m_dTop = 0;
	var m_dRight = 1;
	var m_dBottom = 1;
	var m_Visible = true;
	var m_ImgLeft = 0;
	var m_ImgTop = 0;
	var m_ImgRight = 0;
	var m_ImgBottom = 0;
	var m_CurLeft = 0;
	var m_CurTop = 0;
	var m_CurRight = 0;
	var m_CurBottom = 0;
	var m_Version = 0;
	var m_Session = new Date;
	var m_hImage = null;
	var m_Modified = false;
	var layerNode = null;
	var m_MapLayers = new Array;
	var m_ThematicLayer = null;
	var overlay_ = "";
	var opacity_ = 1;
	var overTransColor_ = null;
	var drawingOptions = null;
	var m_Unit = "";
	var m_userPass = UserPass;
	var m_path = "";
	if (ResourcePath != null && ResourcePath != "")
		m_path = "http://" + ResourcePath;
	m_path += "/ServerGate/SGSGate.ashx";
	var m_Server = new SuperGIS.Server.SGServer(m_path, false);
	m_Server.Login(UserPass, null, function (n) { });
	var m_Resource = null;

	this.Modify = function() { m_Modified = true; }
	this.increaseVersion = function() { m_Version++; };
	this.getName = function() { return m_Name; };
	this.putName = function(newVal) { m_Name = newVal; };
	this.getTitle = function() { return m_Title; };
	this.putTitle = function(newVal) { m_Title = newVal; };
	this.getVisible = function() { return m_Visible; };
	this.putVisible = function(newVal)
	{
		m_Visible = newVal;
		if (layerNode)
			layerNode.style.visibility = newVal ? "" : "hidden";
	};
	this.getResourcePath = function() { return ResourcePath; };
	this.getNode = function() { return layerNode; };
	this.getLeft = function() { return m_dLeft; };
	this.getTop = function() { return m_dTop; };
	this.getRight = function() { return m_dRight; };
	this.getBottom = function () { return m_dBottom; };
	this.getUnit = function () { return m_Unit; };
	this.getLayers = function() { return m_MapLayers; };
	this.getThematicLayer = function() { return m_ThematicLayer; };
	this.setOverlay = function(overlay, overTransColor)
	{
		overlay_ = overlay;
		overTransColor_ = overTransColor;
	};
	this.setOpacity = function(opacity)
	{
		if (isNaN(opacity))
			return;
		opacity_ = parseFloat(opacity);
		if (layerNode)
		{
			layerNode.style.opacity = opacity_;
			layerNode.style.filter = "alpha(opacity=" + opacity_ * 100 + ")";
		}
	};
	this.getOpacity = function() { return opacity_; };
	this.setLayerDrawingOption = function(layer, option)
	{
		if (drawingOptions == null)
			drawingOptions = {};
		if (typeof layer != "string")
			throw "Layer name must be a string";
		drawingOptions[layer] = option;
	};
	this.Initialize = function(pMap)
	{
		m_pMap = pMap;
		var pNode = m_pMap.getHObject();
		layerNode = pNode.ownerDocument.createElement("div");
		layerNode.style.position = "absolute";
		layerNode.style.width = "100%";
		layerNode.style.height = "100%";
		layerNode.style.visibility = m_Visible ? "" : "hidden";
		layerNode.style.opacity = opacity_;
		layerNode.style.filter = "alpha(opacity=" + opacity_ * 100 + ")";
		pNode.appendChild(layerNode);
		this.lastScale = m_pMap.getScale();
	};
	this.RemoveSelf = function()
	{
		if (layerNode == null)
			return;
		if (m_pMap != null)
		{
			var pNode = m_pMap.getHObject();
			pNode.removeChild(layerNode);
		}
		layerNode = null;
	};
	this.UpdateElement = function()
	{
		var ltpt = m_pMap.FromMapPoint(m_ImgLeft, m_ImgTop);
		var rbpt = m_pMap.FromMapPoint(m_ImgRight, m_ImgBottom);
		layerNode.style.width = Math.round(Math.abs(rbpt.X - ltpt.X)) + "px";
		layerNode.style.height = Math.round(Math.abs(rbpt.Y - ltpt.Y)) + "px";
		layerNode.style.left = Math.round(Math.min(ltpt.X, rbpt.X)) + "px";
		layerNode.style.top = Math.round(Math.min(ltpt.Y, rbpt.Y)) + "px";
	};
	this.RebuildElement = function()
	{
		if (this.getVisible() == false)
			return;
		
		var ecr = m_pMap.getExtendedClientRect();
		var viewport = m_pMap.getExtendedViewport();
		
		if (!m_Modified && viewport.xmin == m_CurLeft && viewport.ymax == m_CurTop && viewport.xmax == m_CurRight && viewport.ymin == m_CurBottom)
			return;
		m_Modified = false;
		
		m_CurLeft = viewport.xmin;
		m_CurTop = viewport.ymax;
		m_CurRight = viewport.xmax;
		m_CurBottom = viewport.ymin;
		var layers = m_MapLayers.filter(l => l.getVisible()).map(l => l.getName()).join(",");
		if (layers == "")
		{
			if (m_hImage != null)
				layerNode.removeChild(m_hImage);
			m_hImage = null;
			return;
		}
		
		m_Resource.LoadImage(layers, {"Left": m_CurLeft, "Top": m_CurTop, "Right": m_CurRight, "Bottom": m_CurBottom, "Width": Math.round(ecr.getWidth()), "Height": Math.round(ecr.getHeight()) }, 
			function (hImage)
			{
				hImage.galleryImg = false;
				hImage.hideFocus = true;
				hImage.style.MozUserSelect = "none";
				hImage.border = "0px";
				hImage.crossOrigin = "anonymous";
				hImage.style.width = "100%";
				hImage.style.height = "100%";
				hImage.onmousedown = function () { return false; };
				
				m_ImgLeft = m_CurLeft;
				m_ImgTop = m_CurTop;
				m_ImgRight = m_CurRight;
				m_ImgBottom = m_CurBottom;
				if (m_hImage != null)
					layerNode.removeChild(m_hImage);
				m_hImage = hImage;
				layerNode.appendChild(m_hImage);
				if (pThis.UpdateElement)
					pThis.UpdateElement();
			}
		)
	};
	this.CreateLegend = function(pLgd)
	{
		for (var i = 0;i < m_MapLayers.length;i++)
			pLgd.CreateSubLegend(m_MapLayers[i], function(tEvent, pLayer)
			{
				m_ThematicLayer = pLayer;
			});
	};
	this.ExecuteQuery = function(expr, bGeom, pSucceed, pFailed)
	{
		if (m_ThematicLayer == null)
			return;
		return m_ThematicLayer.ExecuteQuery(expr, bGeom, pSucceed, pFailed);
	};
	this.ExecuteUpdate = function(sID, sGeom, sValues, pSucceed, pFailed)
	{
		if (m_ThematicLayer == null)
			return;
		return m_ThematicLayer.ExecuteUpdate(sID, sGeom, sValues, pSucceed, pFailed);
	};
	this.ExecuteDelete = function(sID, pSucceed, pFailed)
	{
		if (m_ThematicLayer == null)
			return;
		return m_ThematicLayer.ExecuteDelete(sID, pSucceed, pFailed);
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
	this.toJson = function()
	{
		var json = 
		{
			type: "MapLayer",
			url: ResourcePath,
			userpass: m_userPass,
			resourcename: m_Name
		};
		if (m_MapLayers)
			json.layers = m_MapLayers.map(function (subLayer) {return {name:subLayer.getName(), visible:subLayer.getVisible()};});
		return json;
	};
	var innerMapLayer = sg.Class.extend(
	{
		initialize: function(LayerName, edtion)
		{
			var m_Layer = null;
			var m_Visible = true;
			var m_Fields = null;
			var m_FieldsType = null;
			var m_UniqueSymbols = null;
			var m_Editable = edtion;
			var m_FeatureType = 0;
			var m_TableRelates = null;
			var m_Features = {};
			var m_hasAllGIDs = false;
			var m_innerThat = this;
			var m_Name = LayerName;
			var m_Title = m_Name;

			this.Load = function (pLyr, pLyrXMLNode)
			{
				m_Layer = pLyr;
				m_Name = pLyr.getName();
				m_FeatureType = pLyr.getFeatureType();
				var pFlds = pLyr.getFields();
				if (pFlds)
				{
					m_Fields = pFlds.map(function (e) { return e.Name; });
					m_FieldsType = pFlds.map(function (e) { return e.Type; });
				}
				var pLegend = pLyr.getRenderer();
				if (pLegend)
				{
					m_UniqueSymbols = {};
					if (pLegend.Default)
						m_UniqueSymbols.defaultSymbol = pLegend.Default.Label;
					if (pLegend.Fields)
						m_UniqueSymbols.fields = pLegend.Fields;
					if (pLegend.Symbols)
						m_UniqueSymbols.symbols = pLegend.Symbols.map(function (s) {
							return { Label: s.Label, Values: s.Values.reduce(function (a, v, i) { a[pLegend.Fields[i].Name] = v; return a; }, {}) };
						});
				}
				//var relatedTables = GetXMLChildNode(pLyrXMLNode, "TableRelates");
				//if (relatedTables)
				//{
				//	var relatedTablNodes = FindXMLNodes(relatedTables, "TableRelate");
				//	if (relatedTablNodes.length > 0)
				//	{
				//		m_TableRelates = [];
				//		for (var t = 0 ; t < relatedTablNodes.length ; t++)
				//		{
				//			var relatedTabl = relatedTablNodes[t];
				//			var rtObj =
				//			{
				//				"name": GetXMLNodeAttribute(relatedTabl, "Name"),
				//				"title": GetXMLNodeAttribute(relatedTabl, "Title"),
				//				"targetField": GetXMLNodeAttribute(relatedTabl, "TargetField"),
				//				"sourceField": GetXMLNodeAttribute(relatedTabl, "SourceField")
				//			};
				//			m_TableRelates.push(rtObj);
				//		}
				//	}
				//}
			}
			this.getTableRelates = function() { return m_TableRelates; };
			this.isEditable = function() { return m_Editable; };
			this.getName = function() { return m_Name; };
			this.putName = function(newVal) { m_Name = newVal; };
			this.getTitle = function() { return m_Title; };
			this.putTitle = function(newVal) { m_Title = newVal; };
			this.getFields = function() { return m_Fields; };
			this.getFieldsType = function() { return m_FieldsType; };
			this.getFeatureType = function() { return m_FeatureType; };
			this.getSRName = function () { return m_SRName; };
			this.getParent = function() { return pThis; };
			this.setVisible = function(visible)
			{
				if (typeof visible == "boolean")
					m_Visible = visible;
				pThis.Modify();
			};
			this.putVisible = function(visible) { this.setVisible(visible); };
			this.getVisible = function() { return m_Visible; };
			this.getResource = function (symIdx, callback)
			{
				m_Layer.LoadLegend(symIdx, callback);
			};
			this.getUniqueSymbols = function() { return m_UniqueSymbols; };
			this.queryRelatedFeatures = function(relationName, gid, pSucceed, pFailed)
			{
			};

			function ProcessResponseFeatures(pRequest)
			{
				var doc = pRequest.responseXML;
				var features = FindXMLNodes(doc.documentElement, "Feature");
				var flds = m_Fields.map(function (e) { return e.replace(/&#x([0-9a-fA-F]{4});/g, "_x$1_"); });
				var rf = {};
				for (var i = 0 ; i < features.length ; i++)
				{
					var feature = features[i];
					var gid = feature.getAttribute("ID");
					var values = GetXMLChildNode(feature, "Values");
					var f = { gid: gid };
					//f.values = flds.map(function (e) { return GetXMLFirstChildNodeValue(values, e); });
					f.values = FindXMLNodes(values, "*").map(function (e) { return { tag: e.tagName, value: GetXMLNodeText(e)}; });
					f.geom = GetXMLFirstChildNodeValue(feature, "Geometry");
					rf[gid] = m_Features[gid] = f;
				}
				return rf;
			}
			this.ExecuteQuery = function(expr, bGeom, pSucceed, pFailed)
			{
				m_Server.Search(pThis.getName(), this.getName(), bGeom ? expr : null, bGeom ? null : expr, pSucceed);
			};
			this.ExecuteUpdate = function(sID, sGeom, sValues, pSucceed, pFailed)
			{
				m_Server.Update(pThis.getName(), this.getName(), sID, sGeom, sValues, function (r)
				{
					m_Features[sID] = null;
					pSucceed(r);
					pThis.Modify();
					pThis.RebuildElement();
				});
			};
			this.ExecuteDelete = function(sID, pSucceed, pFailed)
			{
				m_Server.Update(pThis.getName(), this.getName(), sID, null, null, function ()
				{
					m_Features[sID] = null;
					pSucceed();
					pThis.Modify();
					pThis.RebuildElement();
				});

				//var path = m_path + "/Update";
				//var pAgent = new AjaxAgent(path, false, false);
				//var reqdata = new FormData();
				//reqdata.append("ResourceName", pThis.getName());
				//reqdata.append("LayerName", this.getName());
				//reqdata.append("GIDs", sID);
				//pAgent.SendRequest(reqdata, pSucceed, null, pFailed);
				//pThis.RebuildElement();
			};

			//this.GetGIDs = function ()
			//{
			//	if (!m_hasAllGIDs)
			//	{		
			//		var rpath = m_path + "/GetGIDs";
			//		var pAgent = new AjaxAgent(rpath, false, false);
			//		var reqdata = new FormData();
			//		reqdata.append("ResourceName", sName);
			//		reqdata.append("LayerName", m_innerThat.getName());
			//		pAgent.SendRequest(reqdata, function (pRequest)
			//		{
			//			var xdoc = pRequest.responseXML;
			//			var features = FindXMLNodes(xdoc.documentElement, "GID");
			//			if (features != null)
			//			{
			//				var newFeatures = {};
			//				features.forEach(function (e) { newFeatures[GetXMLNodeText(e)] = null; });
			//				Object.keys(m_Features).forEach(function (k) { newFeatures[k] = m_Features[k]; });
			//				delete m_Features;
			//				m_Features = newFeatures;
			//			}
			//			m_hasAllGIDs = true;
			//		});
			//	}
			//	if (m_Features == null)
			//		return null;
			//	return Object.keys(m_Features);
			//}
			//this.GetFeatures = function (keys, trEvent)
			//{
			//	if (m_Fields == null)
			//		return null;
			//	var rf = {};
			//	keys.forEach(function (k) { if (k in m_Features) rf[k] = m_Features[k]; });

			//	var rkeys = keys.filter(function (k) { return !(k in rf) || (rf[k] == null); });
			//	if (rkeys.length <= 0)
			//	{
			//		if (trEvent)
			//			trEvent(rf);
			//		return;
			//	}

			//	var sreqdata = new FormData();
			//	sreqdata.append("ResourceName", sName);
			//	sreqdata.append("LayerName", m_innerThat.getName());
			//	sreqdata.append("GIDs", rkeys.join(","));
			//	var pAgent = new AjaxAgent(m_path + "/GetFeatures", true, false);
			//	pAgent.SendRequest(sreqdata, function(r) {
			//		var rf2 = ProcessResponseFeatures(r);
			//		//Object.keys(rf2).forEach(function (k) { rf[k] = rf2[k]; });
			//		rf = {};
			//		keys.forEach(function (k) { if (k in m_Features) rf[k] = m_Features[k]; });
			//		if (trEvent)
			//			trEvent(rf);
			//	});
			//};
			this.ClearAllSelect = function()
			{
				Object.keys(m_Features).forEach(function (k)
				{
					var f = m_Features[k];
					if (!f.selectedGraphic)
						return;
					if (m_pMap.drawingGraphicsLayer)
						m_pMap.drawingGraphicsLayer.remove(f.selectedGraphic);
					f.selectedGraphic = null;
				});
			}
			this.SelectFeature = function(f, bUnselect)
			{
				if (!f)
					return;
				if (bUnselect)
				{
					if (f.selectedGraphic)
					{
						if (m_pMap.drawingGraphicsLayer)
							m_pMap.drawingGraphicsLayer.remove(f.selectedGraphic);
						f.selectedGraphic = null;
					}
				}
				else
				{
					if (!f.selectedGraphic)
					{
						if (!f.geom)
							return;
						var geometry = sg.geometry.Geometry.fromWKT(f.geom);
						if (!geometry)
							return;
						var g = new sg.Graphic;
						g.geometry = geometry.geometry;
						if (g.geometry instanceof sg.geometry.MultiPolygon || g.geometry instanceof sg.geometry.Polygon || g.geometry instanceof sg.geometry.Extent)
							g.symbol = new sg.symbols.SimpleFillSymbol(null, new sg.symbols.SimpleLineSymbol(null, null, 3), new sg.Color(128, 128, 255, .5));
						else if (g.geometry instanceof sg.geometry.MultiLineString || g.geometry instanceof sg.geometry.LineString)
							g.symbol = new sg.symbols.SimpleLineSymbol(null, new sg.Color(128, 255, 128, 1), 4);
						else if (g.geometry instanceof sg.geometry.Point || g.geometry instanceof sg.geometry.MultiPoint)
							g.symbol = new sg.symbols.SimpleMarkerSymbol(null, 16, new sg.symbols.SimpleLineSymbol);
						f.selectedGraphic = g;
						if (m_pMap.drawingGraphicsLayer)
							m_pMap.drawingGraphicsLayer.add(f.selectedGraphic);
					}
				}
				this.trigger("SelectionChanged");
			}
			this.Select = function(gids, bUnselect)
			{
				if (!gids)
					return null;
				this.GetFeatures(gids, function (fs)
				{
					if (fs == null)
						return null;
					for (var gid in fs)
						m_innerThat.SelectFeature(fs[gid]);
				});
			}
			this.GetSelected = function()
			{
				return Object.keys(m_Features)
					.filter(function (k) { return ("selectedGraphic" in m_Features[k] && m_Features[k].selectedGraphic != null); })
					.map(function (k) { return m_Features[k]; });
			}

			this.setRenderer = function(renderer)
			{
				this.renderer = renderer;
			};
			this.getTaskOptions = function()
			{
				var options = {};
				options.userpass = m_userPass;
				options.resource = pThis.getName();
				return options;
			};
			this.getEnvelope = function(pSucceed, pFailed)
			{
				var rpath = m_path + "/GetResource";
				var pAgent = new AjaxAgent(rpath, false, false);
				var reqdata = new FormData();
				reqdata.append("ResourceName", sName);
			
				pAgent.SendRequest(reqdata, pSucceed, null, pFailed);
			};
		},
		events: ["SelectionChanged"]
	});

	var R = m_Server.GetResource(sName);
	m_Resource = R;
	if (R)
	{
		var pSR = R.getSpatialReferenceObject();
		if (pSR)
			m_SRName = pSR.PROJCS ? pSR.PROJCS.Name : pSR.GEOGCS ? pSR.GEOGCS.Name : null;
		//m_Unit = R.Resource.Unit;

		var pEnv = R.getEnvelope();
		if (pEnv)
		{
			m_dLeft = pEnv.Left;
			m_dTop = pEnv.Top;
			m_dRight = pEnv.Right;
			m_dBottom = pEnv.Bottom;
		}
		m_MapLayers = R.getLayers().map(pLyr => {
			var pMLyr = new innerMapLayer(pLyr.getName(), true);
			pMLyr.Load(pLyr);
			return pMLyr;
		});
	}
	if (m_MapLayers.length == 0)
		m_MapLayers.push(new innerMapLayer(null));
	m_ThematicLayer = m_MapLayers[m_MapLayers.length - 1];
}
MapLayer.fromJson = function(json)
{
	var layer = new MapLayer(json.resourcename, json.url, json.userpass);
	if (json.layers)
	{
		var subLayers = layer.getLayers();
		for (var l = 0 ; l < json.layers.length ; l++)
		{
			var subLayer = subLayers[l];
			subLayer.putVisible(json.layers[l].visible);
		}
	}
	return layer;
};