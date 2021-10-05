
/* eslint-disable */
SuperGIS.Server = new function ()
{
	var _NS_ = this;
	this.SGServer = function (strServerPath, async)
	{
		var pThis = this;
		var m_Code = null;
	
		Object.defineProperty(this, "LoginCode", 
		{
			"enumerable": true, 
			"get": function () { return m_Code; }
		});
		
		if (!strServerPath)
			strServerPath = "";
		else if (strServerPath.charAt(strServerPath.length - 1) != '/')
			strServerPath += "/";
		var pSyncAgt = new AjaxAgent(null, false, true);

		function IsResponse(pReq) { return (pReq != null && pReq.responseXML != null && pReq.responseXML.documentElement != null) }

		function IsNullOrEmpty(s) { return (s == null || s == ""); }

		function ProcAdapter(ProcessResponse, ProcessCallback)
		{
			return function (pReq)
			{
				var r = ProcessResponse(pReq);
				if (ProcessCallback)
					ProcessCallback(r);
				return r;
			}
		}

		this.getServerPath = function () { return strServerPath; };
		this.SendMethod = function (strMethod, strPost, funcProcessResponse, bAsync)
		{
			var pAgt = pSyncAgt;
			if (bAsync)
			{
				pAgt = new AjaxAgent(null, true, true);
				pAgt.OverrideMimeType(null);
			}
			pAgt.Open("POST", strServerPath + strMethod);
			var r = null;
			pAgt.SendRequest(strPost, function (pReq) { 
				r = funcProcessResponse(pReq);
			});
			return r;
		}

		this.Proxy = function (sMethod, sURL, sData, sMimeType, funcProcessResponse, bAsync)
		{
			var pAgt = pSyncAgt;
			if (bAsync)
				pAgt = new AjaxAgent(null, true, true);
			pAgt.OverrideMimeType(sMimeType);
			if (sMethod == "GET" && sData != null)
			{
				sURL = sURL + "?" + sData;
				sData = null;
			}
			pAgt.Open(sMethod, this.ProxyPath(sURL));
			return pAgt.SendRequest(sData, funcProcessResponse);
		}
		this.ProxyPath = function (sURL)
		{
			return strServerPath + "Proxy?Path=" + encodeURIComponent(sURL);
		}

		this.FilePath = function (sFilepath)
		{
			return strServerPath + "?F=" + sFilepath;
		}

		this.Login = function (Uesrname, Password, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					var pRoot = pReq.responseXML.documentElement;
					if (GetXMLNodeAttribute(pRoot, "Result").toLowerCase() == "true")
					{
						m_Code = GetXMLNodeText(GetXMLChildNode(pRoot, "Code"));
						if (GetXMLNodeText(GetXMLChildNode(pRoot, "Manage")).toLowerCase() == "true")
							return 2;
						return 1;
					}
					return 0;
				}
				return -1;
			}
			var sPost = null;
			if (Uesrname != null)
			{
				sPost = "Username=" + Uesrname;
				if (Password != null)
					sPost += "&Password=" + Password;
			}
			return this.SendMethod("Login", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.Logout = function (funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					var pRoot = pReq.responseXML.documentElement;
					if (GetXMLNodeAttribute(pRoot, "Result").toLowerCase() == "true")
					{
						return 1;
					}
					return 0;
				}
				return -1;
			}
			return this.SendMethod("Logout", null, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}
		
		this.Backup = function(funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					pRoot = pReq.responseXML.documentElement;
					return true;
				}
				return false;
			}
			return this.SendMethod("Backup", null, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}
		
		this.Restore = function(Name, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					pRoot = pReq.responseXML.documentElement;
					return true;
				}
				return false;
			}
			var sPost = null;
			if (Name)
				sPost = "Name=" + encodeURIComponent(Name);
			return this.SendMethod("Backup/Restore", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}
		
		this.BackupHistory = function(funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				var Names = new Array();
				if (IsResponse(pReq))
				{
					var pNodes = FindXMLNodes(pReq.responseXML.documentElement, "History");
					if (pNodes == null || pNodes.length <= 0)
						return Names;
					for (var i = 0; i < pNodes.length; i++)
						Names.push(GetXMLNodeText(pNodes[i]));
				}
				return Names;
			}
			return this.SendMethod("Backup/History", null, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}
		
		this.BackupRemove = function(Name, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					pRoot = pReq.responseXML.documentElement;
					return true;
				}
				return false;
			}
			if (!Name)
				return false;
			return this.SendMethod("Backup/Remove", "Name=" + Name, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.GetWorkspace = function (funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					pRoot = pReq.responseXML.documentElement;
					var sType = GetXMLNodeText(GetXMLChildNode(pRoot, "Type"));
					var sDatabase = GetXMLNodeText(GetXMLChildNode(pRoot, "Database"));
					var sAuthority = GetXMLNodeText(GetXMLChildNode(pRoot, "Authority"));
					var sWorkpath = GetXMLNodeText(GetXMLChildNode(pRoot, "Workpath"));
					return { "Type": sType, "Database": sDatabase, "Authority": sAuthority, "Workpath": sWorkpath };
				}
				return false;
			}
			return this.SendMethod("GetWorkspace", null, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.RebuildService = function (sType, sServer, sCatalog, sUsername, sPassword, sWorkpath, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					pRoot = pReq.responseXML.documentElement;
					var sClassID = GetXMLNodeText(GetXMLChildNode(pRoot, "ClassID"));
					var sDatabase = GetXMLNodeText(GetXMLChildNode(pRoot, "Database"));
					var sAuthority = GetXMLNodeText(GetXMLChildNode(pRoot, "Authority"));
					var sWorkpath = GetXMLNodeText(GetXMLChildNode(pRoot, "Workpath"));
					return { "ClassID": sClassID, "Database": sDatabase, "Authority": sAuthority, "Workpath": sWorkpath };
				}
				return false;
			}
			var sPost = "Type=" + encodeURIComponent(sType) +
					"&Server=" + encodeURIComponent(sServer) +
					"&Catalog=" + encodeURIComponent(sCatalog) +
					"&Username=" + encodeURIComponent(sUsername) +
					"&Password=" + encodeURIComponent(sPassword) +
					"&Workpath=" + encodeURIComponent(sWorkpath);
			return this.SendMethod("RebuildService", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.ServiceStatus = function (sAction, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
					return GetXMLNodeText(pReq.responseXML.documentElement);
				return false;
			}

			var sPost = null;
			if (sAction != null)
				sPost = "Action=" + encodeURIComponent(sAction);
			return this.SendMethod("ServiceStatus", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.GetResourceList = function (funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				var Names = new Array();
				if (IsResponse(pReq))
				{
					var pNodes = FindXMLNodes(pReq.responseXML.documentElement, "Resource");
					if (pNodes == null || pNodes.length <= 0)
						return Names;
					for (var i = 0; i < pNodes.length; i++)
						Names.push({
							Name: GetXMLNodeText(GetXMLChildNode(pNodes[i], "Name")),
							Description: GetXMLNodeText(GetXMLChildNode(pNodes[i], "Description")),
							Keywords: GetXMLNodeText(GetXMLChildNode(pNodes[i], "Keywords")),
							CreateDate: GetXMLNodeText(GetXMLChildNode(pNodes[i], "CreateDate")),
						});
				}
				return Names;
			}
			return this.SendMethod("GetResourceList", null, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.GetResource = function (strResourceName, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					var pSRes = new SGServerResource(pThis, strResourceName);
					pSRes.LoadResource(pReq.responseXML);
					return pSRes;
				}
				return null;
			}
			if (strResourceName == null)
				return;
			var sPost = "ResourceName=" + encodeURIComponent(strResourceName);
			return this.SendMethod("GetResource", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.RemoveResource = function (strResourceName, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
					return (GetXMLNodeText(pReq.responseXML.documentElement).toLowerCase() == "true");
				return false;
			}

			if (strResourceName == null)
				return false;
			var sPost = "ResourceName=" + encodeURIComponent(strResourceName);
			return this.SendMethod("RemoveResource", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.GetUserList = function (funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				var Names = new Array();
				if (IsResponse(pReq))
				{
					var pNodes = FindXMLNodes(pReq.responseXML.documentElement, "User");
					if (pNodes == null || pNodes.length <= 0)
						return Names;
					for (var i = 0; i < pNodes.length; i++)
						Names.push(GetXMLNodeText(pNodes[i]));
				}
				return Names;
			}
			return this.SendMethod("GetUserList", null, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.AddUser = function (pSUsr, strPassword, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
					return (GetXMLNodeText(pReq.responseXML.documentElement).toLowerCase() == "true");
				return false;
			}
			if (pSUsr == null)
				return false;
			var sPost = pSUsr.CreatePostData() + "&Password=" + strPassword;
			return this.SendMethod("AddUser", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.RemoveUser = function (strUsername, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
					return (GetXMLNodeText(pReq.responseXML.documentElement).toLowerCase() == "true");
				return false;
			}
			if (strUsername == null)
				return false;
			var sPost = "Username=" + encodeURIComponent(strUsername);
			return this.SendMethod("RemoveUser", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.GetUser = function (strUsername, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					var pSUsr = new _NS_.SGServerUser();
					pSUsr.LoadUser(pReq.responseXML);
					return pSUsr;
				}
				return null;
			}
			if (strUsername == null)
				return false;
			var sPost = "Username=" + strUsername;
			return this.SendMethod("GetUser", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.SetUser = function (pSUsr, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
					return (GetXMLNodeText(pReq.responseXML.documentElement).toLowerCase() == "true");
				return false;
			}
			if (pSUsr == null)
				return false;
			var sPost = pSUsr.CreatePostData();
			return this.SendMethod("SetUser", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

//		this.GetAppList = function (funcProcessCallback)
//		{
//			function ProcessResponse(pReq)
//			{
//				var Names = new Array();
//				if (IsResponse(pReq))
//				{
//					var pNodes = FindXMLNodes(pReq.responseXML.documentElement, "App");
//					if (pNodes == null || pNodes.length <= 0)
//						return Names;
//					for (var i = 0; i < pNodes.length; i++)
//						Names.push({ GUID: GetXMLNodeAttribute(pNodes[i], "GUID"), name: GetXMLNodeAttribute(pNodes[i], "name") });
//				}
//				return Names;
//			}
//			return this.SendMethod("GetEarthAppList", null, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
//		}


//		this.GetApp = function (strGUID, funcProcessCallback)
//		{
//			function ProcessResponse(pReq)
//			{
//				if (IsResponse(pReq))
//				{
//					var pSApp = new _NS_.SGServerApp();
//					pSApp.LoadApp(pReq.responseXML);
//					return pSApp;
//				}
//				return null;
//			}
//			if (!strGUID || strGUID == null || strGUID == "")
//				return false;
//			var sPost = "GUID=" + strGUID;
//			return this.SendMethod("GetEarthApp", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
//		}

//		this.RemoveApp = function (strGUID, funcProcessCallback)
//		{
//			function ProcessResponse(pReq)
//			{
//				if (IsResponse(pReq))
//					return (GetXMLNodeText(pReq.responseXML.documentElement).toLowerCase() == "true");
//				return false;
//			}
//			if (strGUID == null)
//				return false;
//			var sPost = "GUID=" + strGUID;
//			return this.SendMethod("RemoveEarthApp", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
//		}

//		this.AddApp = function (pSApp, funcProcessCallback)
//		{
//			function ProcessResponse(pReq)
//			{
//				if (IsResponse(pReq))
//					return true;
//				return false;
//			}
//			if (pSApp == null)
//				return false;
//			var sPost = pSApp.CreatePostData();
//			return this.SendMethod("AddEarthApp", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
//		}

//		this.SetApp = function (pSApp, funcProcessCallback)
//		{
//			function ProcessResponse(pReq)
//			{
//				if (IsResponse(pReq))
//					return true;
//				return false;
//			}
//			if (pSApp == null)
//				return false;
//			var sPost = pSApp.CreatePostData();
//			return this.SendMethod("SetEarthApp", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
//		}

		this.GetFeatureClass = function (strResourceName, pLayer, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					return pReq.responseXML;
				}
				return null;
			}
			var sPost = "";
			if (strResourceName != null)
				sPost += "ResourceName=" + encodeURIComponent(strResourceName);
			if (pLayer != null)
			{
				if (pLayer.constructor == String)
					sPost += "&FeatureName=" + encodeURIComponent(pLayer);
				else if (pLayer.getName)
					sPost += "&FeatureName=" + encodeURIComponent(pLayer.getName());
			}
			return this.SendMethod("GetFeatureClass", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}
		
		this.Search = function (strResourceName, pLayer, strGeometry, strExpression, funcProcessCallback)
		{
			var pSRef = null;
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					pXml = pReq.responseXML;
					var Features = new Array();
					var pFets = FindXMLNodes(pXml.documentElement, "Feature");
					for (var i = 0; i < pFets.length; i++)
					{
						var pFet = new _NS_.SGServerFeature(pThis, pSRef);
						pFet.LoadFeature(pFets[i]);
						Features.push(pFet);
					}
					return Features;
				}
				return null;
			}
			var sPost = "";
			if (strResourceName != null)
				sPost += "ResourceName=" + encodeURIComponent(strResourceName);
			if (pLayer != null)
			{
				if (pLayer.constructor == String)
					sPost += "&LayerName=" + encodeURIComponent(pLayer);
				else
				{
					if (pLayer.getName)
						sPost += "&LayerName=" + encodeURIComponent(pLayer.getName());
					if (pLayer.getSpatialReferenceObject)
						pSRef = pLayer.getSpatialReferenceObject();
				}
			}
			if (strGeometry != null)
				sPost += "&GEOM=" + encodeURIComponent(strGeometry);
			if (strExpression != null)
				sPost += "&EXPR=" + encodeURIComponent(strExpression);
			return this.SendMethod("Search", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

		this.Update = function (strResourceName, pLayer, sID, sGeom, sValues, funcProcessCallback)
		{
			var pSRef = null;
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
				{
					pXml = pReq.responseXML;
					var Features = new Array();
					var pFets = FindXMLNodes(pXml.documentElement, "Feature");
					for (var i = 0; i < pFets.length; i++)
					{
						var pFet = new _NS_.SGServerFeature(pThis, pSRef);
						pFet.LoadFeature(pFets[i]);
						Features.push(pFet);
					}
					return Features;
				}
				return null;
			}
			var sPost = "";
			if (strResourceName != null)
				sPost += "ResourceName=" + encodeURIComponent(strResourceName);
			if (pLayer != null)
			{
				if (pLayer.constructor == String)
					sPost += "&LayerName=" + encodeURIComponent(pLayer);
				else
				{
					if (pLayer.getName)
						sPost += "&LayerName=" + encodeURIComponent(pLayer.getName());
					if (pLayer.getSpatialReferenceObject)
						pSRef = pLayer.getSpatialReferenceObject();
				}
			}
			sPost += "&ID=" + sID;
			if (sGeom != null)
				sPost += "&GEOM=" + encodeURIComponent(sGeom);
			if (sValues != null)
				sPost += "&Values=" + encodeURIComponent(sValues);
			return this.SendMethod("Update", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}

//		this.Delete = function (strResourceName, pLayer, sID, funcProcessCallback)
//		{
//			var pSRef = null;
//			function ProcessResponse(pReq)
//			{
//				if (IsResponse(pReq))
//				{
//				}
//				return null;
//			}
//			var sPost = "";
//			if (strResourceName != null)
//				sPost += "ResourceName=" + encodeURIComponent(strResourceName);
//			if (pLayer != null)
//			{
//				if (pLayer.constructor == String)
//					sPost += "&LayerName=" + encodeURIComponent(pLayer);
//				else
//				{
//					if (pLayer.getName)
//						sPost += "&LayerName=" + encodeURIComponent(pLayer.getName());
//					if (pLayer.getSpatialReferenceObject)
//						pSRef = pLayer.getSpatialReferenceObject();
//				}
//			}
//			return this.SendMethod("Update", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
//		}

		this.EPSG = function (nCode, funcProcessCallback)
		{
			function ProcessResponse(pReq)
			{
				if (IsResponse(pReq))
					return GetXMLNodeText(pReq.responseXML.documentElement);
				return null;
			}
			var sPost = null;
			if (nCode != null)
				sPost = "Code=" + encodeURIComponent(nCode);
			return this.SendMethod("EPSG", sPost, ProcAdapter(ProcessResponse, funcProcessCallback), funcProcessCallback != null);
		}
	}

	function LoadEnvelope(pNode, pSRNode)
	{
		if (pNode == null)
			return null;
		var dLeft = parseFloat(GetXMLNodeAttribute(pNode, "Left"));
		var dTop = parseFloat(GetXMLNodeAttribute(pNode, "Top"));
		var dRight = parseFloat(GetXMLNodeAttribute(pNode, "Right"));
		var dBottom = parseFloat(GetXMLNodeAttribute(pNode, "Bottom"));
		var pSR = SpatialReference.ImportFromWKT(GetXMLNodeText(pSRNode));

		return new SuperGIS.Geometry.Envelope(dLeft, dTop, dRight, dBottom, pSR);
	}

	function SGServerResource(pSGServer, sName)
	{
		var m_Name = sName;
		var m_Envelope = null;
		var m_SpatialReferenceName = null;
		//var m_SpatialReference = null;
		//var m_SpatialReferenceObject = null;
		var m_Layers = null;
		var m_Metadata = null;
		var m_HasTile = false;
		var m_OriginX = 0;
		var m_OriginY = 0;
		var m_TileWidth = 0;
		var m_TileHeight = 0;
		var m_TileEnvelope = null;
		var m_TileSpatialReferenceName = null;
		//var m_TileSpatialReference = null;
		//var m_TileSpatialReferenceObject = null;
		var m_Scales = null;
		var m_HasCache = false;
		var m_Format = null;
		var m_Quality = 0;
		var m_ColorDepth = 0;
		var m_Smoothing = false;
		var m_HasDTM = false;
		var m_Models = null;
		
		var m_aliveTick = 0;
		var m_aliveStatus = null;
		var xImageAgent = new AjaxAgent(null, true, true);
		xImageAgent.OverrideMimeType("text/plain; charset=x-user-defined");

		this.getName = function () { return m_Name; };
		this.getEnvelope = function () { return m_Envelope; };
		//this.getSpatialReference = function() {return m_SpatialReference;};
		this.getSpatialReferenceObject = function () { if (m_Envelope) return m_Envelope.getSpatialReference(); return null };
		this.getLayers = function () { return m_Layers; };
		this.getMetadata = function () { return m_Metadata; };
		this.getHasTile = function () { return m_HasTile; };
		this.getOriginX = function () { return m_OriginX; };
		this.getOriginY = function () { return m_OriginY; };
		this.getTileWidth = function () { return m_TileWidth; };
		this.getTileHeight = function () { return m_TileHeight; };
		this.getTileEnvelope = function () { return m_TileEnvelope; };
		//this.getTileSpatialReference = function() {return m_TileSpatialReference;};
		this.getTileSpatialReferenceObject = function () { if (m_TileEnvelope) return m_TileEnvelope.getSpatialReference(); return null; };
		this.getScales = function () { return m_Scales; };
		this.getHasCache = function () { return m_HasCache; };
		this.getFormat = function () { return m_Format; };
		this.getQuality = function () { return m_Quality; };
		this.getColorDepth = function () { return m_ColorDepth; };
		this.getSmoothing = function () { return m_Smoothing; };
		this.getHasDTM = function () { return m_HasDTM; };
		this.getModels = function () { return m_Models; };

		this.LoadResource = function (pXml)
		{
			m_Name = GetXMLNodeAttribute(pXml.documentElement, "Name");
			var pSRNode = GetXMLChildNode(pXml.documentElement, "SpatialReference");
			m_SpatialReferenceName = GetXMLNodeAttribute(pSRNode, "Name");
			//m_SpatialReference = GetXMLNodeText(pSRNode);
			//m_SpatialReferenceObject = SpatialReference.ImportFromWKT(m_SpatialReference);
			m_Envelope = LoadEnvelope(GetXMLChildNode(pXml.documentElement, "Envelope"), pSRNode);

			m_Layers = new Array();
			var pLyrs = FindXMLNodes(GetXMLChildNode(pXml.documentElement, "LayerContent"), "Layer");
			if (pLyrs != null)
			{
				for (var i = 0; i < pLyrs.length; i++)
				{
					var LyrName = GetXMLNodeAttribute(pLyrs[i], "Name");
					var pLyr = new SGServerLayer(pSGServer, this, LyrName);
					pLyr.LoadLayer(pLyrs[i]);
					m_Layers.push(pLyr);
				}
			}
			
			m_Metadata = {};
			var pDatas = FindXMLNodes(GetXMLChildNode(pXml.documentElement, "Metadata"), "Data");
			if (pDatas != null)
			{
				for (var i = 0; i < pDatas.length; i++)
					m_Metadata[GetXMLNodeAttribute(pDatas[i], "Name")] = GetXMLNodeText(pDatas[i]);
			}
			
			m_Scales = new Array();
			var pTle = GetXMLChildNode(pXml.documentElement, "TileSetting");
			if (pTle != null)
			{
				m_HasTile = true;
				m_OriginX = parseFloat(GetXMLNodeAttribute(pTle, "OriginX"));
				m_OriginY = parseFloat(GetXMLNodeAttribute(pTle, "OriginY"));
				m_TileWidth = parseInt(GetXMLNodeAttribute(pTle, "TileWidth"));
				m_TileHeight = parseInt(GetXMLNodeAttribute(pTle, "TileHeight"));
				var pSRNode = GetXMLChildNode(pTle, "SpatialReference");
				m_TileSpatialReferenceName = GetXMLNodeAttribute(pSRNode, "Name");
				//m_TileSpatialReference = GetXMLNodeText(pSRNode);
				//m_TileSpatialReferenceObject = SpatialReference.ImportFromWKT(m_TileSpatialReference);
				m_TileEnvelope = LoadEnvelope(GetXMLChildNode(pTle, "Envelope"), pSRNode);

				var pScls = FindXMLNodes(GetXMLChildNode(pTle, "Scales"), "Scale");
				for (var i = 0; i < pScls.length; i++)
				{
					var d = parseFloat(GetXMLNodeText(GetXMLChildNode(pScls[i], "Denominator")));
					var f = parseFloat(GetXMLNodeText(GetXMLChildNode(pScls[i], "Factor")));
					m_Scales.push({ "Denominator": d, "Factor": f });
				}
			}
			var pChe = GetXMLChildNode(pXml.documentElement, "CacheSetting");
			if (pChe != null)
			{
				m_HasCache = true;
				m_Format = GetXMLNodeAttribute(pChe, "Format");
				m_Quality = parseInt(GetXMLNodeAttribute(pChe, "Quality"));
				m_ColorDepth = parseInt(GetXMLNodeAttribute(pChe, "ColorDepth"));
				m_Smoothing = GetXMLNodeAttribute(pChe, "Smoothing");
			}

			var pDTM = GetXMLChildNode(pXml.documentElement, "DTMSetting");
			if (pDTM != null)
			{
				m_HasDTM = true;
			}

			function CreateModels(pNode)
			{
				var pMdls = FindXMLNodes(pNode, "Model");
				if (pMdls == null)
					return null;
				if (pMdls.length <= 0)
					return null;
					
				var pModels = new Array();
				for (var i = 0; i < pMdls.length; i++)
				{
					var sMdlName = GetXMLNodeAttribute(pMdls[i], "Name");
					var pMdlLocate = eval("[" + GetXMLNodeText(GetXMLChildNode(pMdls[i], "Locate")) + "]");
					var dRange = parseFloat(GetXMLNodeText(GetXMLChildNode(pMdls[i], "Range")));
					var dMinResolution = parseFloat(GetXMLNodeText(GetXMLChildNode(pMdls[i], "MinResolution")));
					var dMaxResolution = parseFloat(GetXMLNodeText(GetXMLChildNode(pMdls[i], "MaxResolution")));
					var pMdl = {
						"Name": sMdlName,
						"Locate": pMdlLocate,
						"Range": dRange,
						"MinResolution": dMinResolution,
						"MaxResolution": dMaxResolution
					}
					var sSource = GetXMLNodeText(GetXMLChildNode(pMdls[i], "Source"));
					if (sSource != null)
					{
						pMdl.Source = sSource;
						var Lods = new Array();
						var pLODs = FindXMLNodes(pMdls[i], "LOD");
						for (var j = 0; j < pLODs.length; j++)
							Lods.push(parseFloat(GetXMLNodeText(pLODs[j])));
						pMdl.LOD = Lods;
					}
					else
						pMdl.Models = CreateModels(pMdls[i]);
					pModels.push(pMdl);
				}
				return pModels;
			}
			m_Models = CreateModels(GetXMLChildNode(pXml.documentElement, "Models"));
		}
		
		this.UpdateMetadata = function()
		{
			var xmlDoc = null;
			if (document.implementation && "createDocument" in document.implementation)
				xmlDoc = document.implementation.createDocument(null, "Request");
			else if (DOMParser)
				xmlDoc = (new DOMParser()).parseFromString("<Request></Request>", "text/xml"); //important to use "text/xml"
			if (xmlDoc == null)
				return;
			//var xmlString = (new XMLSerializer()).serializeToString(xmlDoc);
			
			var pRoot = xmlDoc.documentElement;
			pRoot.setAttribute("ResourceName", m_Name);
			
			var MDatas = Object.keys(m_Metadata).map(function(k) {
					return {tag: "Data", attr: {"Name": k}, child: m_Metadata[k].toString() }
				});
			pRoot.appendChild(SuperGIS.Windows.Create({tag: "Metadata", child: MDatas}, pRoot));
			console.log((new XMLSerializer()).serializeToString(xmlDoc));
			
			return pSGServer.SendMethod("UpdateResource", xmlDoc, function(pReq)
			{
				//pReq.responseXML;
				return null;
			}, true);
		}
		
		this.LoadImage = function(layers, setting, loadCallback)
		{
			//var sPath = pSGServer.getServerPath() + "GetImage?ResourceName=" + pSRes.getName() + "&Left=" + dLeft + "&Top=" + dTop + "&Right=" + dRight + "&Bottom=" + dBottom + "&Width=" + nWidth+ "&Height=" + nHeight;
			//xImageAgent.Abort();
			xImageAgent.Open("POST", pSGServer.getServerPath() + "GetImage");
			xImageAgent.SendRequest({
					"ResourceName": m_Name, "Layers" : layers,
					"Left": setting.Left, "Top": setting.Top, "Right": setting.Right, "Bottom": setting.Bottom,
					"Width": setting.Width, "Height": setting.Height
				},
				function (pRequest)
				{
					m_aliveTick = (new Date()).valueOf();
					var pData = pRequest.responseText;
					var hImage = new Image();
					hImage.onload = function() {loadCallback(hImage);};
					hImage.src = "data:image/jpeg;base64," + Base64Encode(pData);
				});
		}
	}

	function SGServerLayer(pSGServer, pResource, sName)
	{
		var m_Name = sName;
		var m_MaximumScale = 0;
		var m_MinimumScale = 0
		var m_Envelope = null;
		var m_SpatialReferenceName = null;
		var m_Fields = null;
		var m_FeatureType = 0;
		var m_Legend = null;
		var m_Renderer = null;

		this.getName = function () { return m_Name; };
		this.getMaximumScale = function () { return m_MaximumScale; };
		this.getMinimumScale = function () { return m_MinimumScale; };
		this.getEnvelope = function () { return m_Envelope; };
		this.getFields = function () { return m_Fields; };
		this.getFeatureType = function () { return m_FeatureType; };
		this.getRenderer = function () { return m_Renderer; };
		this.getSpatialReferenceObject = function ()
		{
			var pSRef = null;
			if (m_Envelope)
				pSRef = m_Envelope.getSpatialReference();
			if (pSRef == null)
				pSRef = pResource.getTileSpatialReferenceObject();
			return pSRef;
		};
		this.LoadLayer = function (pLyrNode)
		{
			m_Name = GetXMLNodeAttribute(pLyrNode, "Name");
			m_MaximumScale = parseFloat(GetXMLNodeAttribute(pLyrNode, "MaximumScale"));
			m_MinimumScale = parseFloat(GetXMLNodeAttribute(pLyrNode, "MinimumScale"));
			var pSRNode = GetXMLChildNode(pLyrNode, "SpatialReference");
			m_SpatialReferenceName = GetXMLNodeAttribute(pSRNode, "Name");
			m_Envelope = LoadEnvelope(GetXMLChildNode(pLyrNode, "Envelope"), pSRNode);
			m_Legend = GetXMLNodeText(GetXMLChildNode(pLyrNode, "Legend"));
			var pRdn = GetXMLChildNode(pLyrNode, "Renderer");
			if (pRdn)
			{
				m_Renderer = { };
				var pFlds = FindXMLNodes(GetXMLChildNode(pRdn, "Fields"), "Field");
				if (pFlds != null)
					m_Renderer.Fields = Array.from(pFlds).map(function(f) { return { Name: GetXMLNodeAttribute(f, "Name"), Alias: GetXMLNodeAttribute(f, "Alias") }; });
				var pDef = GetXMLChildNode(pRdn, "Default");
				if (pDef)
					m_Renderer.Default = { Label: GetXMLNodeAttribute(pDef, "Label"), Image: GetXMLNodeText(GetXMLChildNode(pDef, "Image")) };
					
				var pSyms = FindXMLNodes(GetXMLChildNode(pRdn, "Symbols"), "Symbol");
				if (pSyms != null)
					m_Renderer.Symbols = Array.from(pSyms).map(function(f) { return { Label: GetXMLNodeAttribute(f, "Label"), Image: GetXMLNodeText(GetXMLChildNode(f, "Image")), Values: Array.from(FindXMLNodes(GetXMLChildNode(f, "Values"), "Value")).map(function(v) {  return GetXMLNodeText(v); }) }; });
			}
			
			var pXml = pSGServer.GetFeatureClass(pResource.getName(), this);
			m_FeatureType = parseInt(GetXMLNodeAttribute(pXml.documentElement, "FeatureType"));
			//m_Envelope = LoadEnvelope(GetXMLChildNode(pXml.documentElement, "Envelope"), GetXMLChildNode(pXml.documentElement, "SpatialReference"));
			m_Fields = Array.from(FindXMLNodes(GetXMLChildNode(pXml.documentElement, "Fields"), "Field") || []).map(function(f) { 
				return {
					Name: GetXMLNodeAttribute(f, "Name"),
					Type: GetXMLNodeAttribute(f, "Type"),
					Length: GetXMLNodeAttribute(f, "Length"),
					Precision: GetXMLNodeAttribute(f, "Precision"),
				};
			});
		}

		this.Search = function (strGeometry, strExpression, funcProcessCallback)
		{
			return pSGServer.Search(pResource.getName(), this, strGeometry, strExpression, funcProcessCallback);
		}

		this.LoadLegend = function (symIdx, loadCallback)
		{
			if (symIdx == null && m_Legend)
				return loadCallback("data:image/png;base64," + m_Legend);
			else if (symIdx != null && m_Renderer)
			{
				if (m_Renderer.Default && symIdx == -1)
					return loadCallback("data:image/png;base64," + m_Renderer.Default.Image);
				if (m_Renderer.Symbols && symIdx >= 0 && symIdx < m_Renderer.Symbols.length)
					return loadCallback("data:image/png;base64," + m_Renderer.Symbols[symIdx].Image);
			}
				
			var xImage = new AjaxAgent(null, true, true);
			xImage.OverrideMimeType("text/plain; charset=x-user-defined");
			var data = { "ResourceName": pResource.getName(), "LayerName" : m_Name };
			if (symIdx)
				data.LegendIndex = symIdx;
			xImage.Open("POST", pSGServer.getServerPath() + "GetLayerLegend");
			xImage.SendRequest(data, function (pRequest) { loadCallback("data:image/png;base64," + Base64Encode(pRequest.responseText)); });
		}
	}

	this.SGServerFeature = function (pSGServer, pSRef)
	{
		var m_Identifier = null;
		var m_Geometry = null;
		var m_Values = [];

		this.LoadFeature = function (pFetNode)
		{
			XMLType.call(this, pFetNode, function (Item)
			{
				if (Item.nodeName == "Identifier") m_Identifier = GetXMLNodeText(Item);
				else if (Item.nodeName == "Geometry")
				{
					XMLType.call(this, Item, function (Item2)
					{
						m_Geometry = SetObj(m_Geometry, SuperGIS.GeometryXML.GeometryType.ParseTest(Item2));
						if (m_Geometry != null && pSRef)
							m_Geometry.setSpatialReference(pSRef);
					});
				}
				else if (Item.nodeName == "Values")
				{
					XMLType.call(this, Item, function (Item2)
					{
						var sName = Item2.nodeName;
						if (sName == "Value")
							sName = GetXMLNodeAttribute(Item2, "Name");
						m_Values.push({ name: sName, value: GetXMLNodeText(Item2) });
					});
				}
			})
		}

		this.getIdentifier = function () { return m_Identifier; }
		this.getValues = function () { return m_Values; }
		this.getGeometry = function () { return m_Geometry; }
	}

	this.SGServerUser = function ()
	{
		var m_Name = null;
		var m_Alias = null;
		var m_Description = null;
		var m_Modifications = false;
		var m_Validation = true;
		var m_EffectiveDate = null;
		var m_ExpirationDate = null;
		var m_Administrator = false;
		var m_Manage = false;
		var m_Publish = false;
		var m_DataAccess = false;

		this.getName = function () { return m_Name; };
		this.setName = function (v) { m_Name = v; };
		this.getAlias = function () { return m_Alias; };
		this.setAlias = function (v) { m_Alias = v; };
		this.getDescription = function () { return m_Description; };
		this.setDescription = function (v) { m_Description = v; };
		this.getModifications = function () { return m_Modifications; };
		this.setModifications = function (v) { m_Modifications = v; };
		this.getValidation = function () { return m_Validation; };
		this.setValidation = function (v) { m_Validation = v; };
		this.getEffectiveDate = function () { return m_EffectiveDate; };
		this.setEffectiveDate = function (v) { m_EffectiveDate = v; };
		this.getExpirationDate = function () { return m_ExpirationDate; };
		this.setExpirationDate = function (v) { m_ExpirationDate = v; };
		this.getAdministrator = function () { return m_Administrator; };
		this.setAdministrator = function (v) { m_Administrator = v; };
		this.getManage = function () { return m_Manage; };
		this.setManage = function (v) { m_Manage = v; };
		this.getPublish = function () { return m_Publish; };
		this.setPublish = function (v) { m_Publish = v; };
		this.getDataAccess = function () { return m_DataAccess; };
		this.setDataAccess = function (v) { m_DataAccess = v; };

		this.LoadUser = function (pXml)
		{
			m_Name = GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Username"));
			m_Alias = GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Alias"));
			m_Description = GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Description"));
			m_Modifications = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Modifications")), false);
			m_Validation = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Validation")), true);
			m_EffectiveDate = GetDate(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "EffectiveDate")), null);
			m_ExpirationDate = GetDate(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "ExpirationDate")), null);
			m_Administrator = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Administrator")), false);
			m_Manage = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Manage")), false);
			m_Publish = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Publish")), false);
			m_DataAccess = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "DataAccess")), false);
		}
		this.CreatePostData = function ()
		{
			var sPost = "Username=" + m_Name;
			if (m_Alias != null)
				sPost += "&Alias=" + m_Alias;
			if (m_Description != null)
				sPost += "&Description=" + m_Description;
			sPost += "&Modifications=" + m_Modifications;
			sPost += "&Validation=" + m_Validation;
			if (m_EffectiveDate != null)
				sPost += "&EffectiveDate=" + m_EffectiveDate.format("yyyy/MM/dd");
			if (m_ExpirationDate != null)
				sPost += "&ExpirationDate=" + m_ExpirationDate.format("yyyy/MM/dd");
			sPost += "&Administrator=" + m_Administrator;
			sPost += "&Manage=" + m_Manage;
			sPost += "&Publish=" + m_Publish;
			sPost += "&DataAccess=" + m_DataAccess;
			return sPost;
		}
	}

	this.SGServerApp = function ()
	{
		var m_GUID = null;
		var m_Name = null;
		var m_Resources = null;
		var m_Title = null;
		var m_Copyright = null;
		var m_Graticule = false;
		var m_Toolbar = false;

		var m_IndexMap = true;
		var m_AddGeometries = true;
		var m_AddKml = true;
		var m_Query = false;
		var m_Measurements = true;
		var m_Share = false;
		var m_SMTPServer = null;
		var m_SMTPAccount = null;
		var m_SMTPPassword = null;

		var m_IsCube = false;
		var m_Controler = true;
		var m_TableOfContents = false;
		var m_Elevation = null;
		var m_Exaggeration = 1;

		this.getGUID = function () { return m_GUID; };
		this.setGUID = function (v) { m_GUID = v; };
		this.getName = function () { return m_Name; };
		this.setName = function (v) { m_Name = v; };
		this.getResources = function () { return m_Resources; };
		this.setResources = function (v) { m_Resources = v; };
		this.getTitle = function () { return m_Title; };
		this.setTitle = function (v) { m_Title = v; };
		this.getCopyright = function () { return m_Copyright; };
		this.setCopyright = function (v) { m_Copyright = v; };
		this.getGraticule = function () { return m_Graticule; };
		this.setGraticule = function (v) { m_Graticule = v; };
		this.getToolbar = function () { return m_Toolbar; };
		this.setToolbar = function (v) { m_Toolbar = v; };

		this.getIndexMap = function () { return m_IndexMap; };
		this.setIndexMap = function (v) { m_IndexMap = v; };
		this.getAddGeometries = function () { return m_AddGeometries; };
		this.setAddGeometries = function (v) { m_AddGeometries = v; };
		this.getAddKml = function () { return m_AddKml; };
		this.setAddKml = function (v) { m_AddKml = v; };
		this.getQuery = function () { return m_Query; };
		this.setQuery = function (v) { m_Query = v; };
		this.getMeasurements = function () { return m_Measurements; };
		this.setMeasurements = function (v) { m_Measurements = v; };
		this.getShare = function () { return m_Share; };
		this.setShare = function (v) { m_Share = v; };
		this.getSMTPServer = function() {return m_SMTPServer;};
		this.setSMTPServer = function (v) { m_SMTPServer = v; };
		this.getSMTPAccount = function() {return m_SMTPAccount;};
		this.setSMTPAccount = function (v) { m_SMTPAccount = v; };
		this.getSMTPPassword = function() {return m_SMTPPassword;};
		this.setSMTPPassword = function (v) { m_SMTPPassword = v; };

		this.getIsCube = function () { return m_IsCube; };
		this.setIsCube = function (v) { m_IsCube = v; };
		this.getControler = function () { return m_Controler; };
		this.setControler = function (v) { m_Controler = v; };
		this.getTableOfContents = function () { return m_TableOfContents; };
		this.setTableOfContents = function (v) { m_TableOfContents = v; };
		this.getElevation = function () { return m_Elevation; };
		this.setElevation = function (v) { m_Elevation = v; };
		this.getExaggeration = function () { return m_Exaggeration; };
		this.setExaggeration = function (v) { m_Exaggeration = v; };

		this.LoadApp = function (pXml)
		{
			m_GUID = GetXMLNodeAttribute(pXml.documentElement, "GUID");
			m_Name = GetXMLNodeAttribute(pXml.documentElement, "name");
			m_Resources = [];
			var pNodes = FindXMLNodes(pXml.documentElement, "Resource");
			if (pNodes != null)
				for (var i = 0; i < pNodes.length; i++)
					m_Resources.push(GetXMLNodeText(pNodes[i]));
			//m_Resource = GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Resource"));
			m_Title = GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Title"));
			m_Copyright = GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Copyright"));
			m_Graticule = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Graticule")), false);
			m_Toolbar = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Toolbar")), false);

			m_IndexMap = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "IndexMap")), true);
			m_AddGeometries = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "AddGeometries")), true);
			m_AddKml = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "AddKml")), true);
			m_Query = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Query")), false);
			m_Measurements = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Measurements")), true);
			m_Share = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Share")), true);
			//m_SMTPServer = GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "SMTPServer"));
			//m_SMTPAccount = GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "SMTPAccount"));
			//m_SMTPPassword = GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "SMTPPassword"));

			m_IsCube = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "IsCube")), false);
			m_Controler = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Controler")), true);
			m_TableOfContents = GetBoolean(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "TableOfContents")), false);
			m_Elevation = GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Elevation"));
			m_Exaggeration = GetDouble(GetXMLNodeText(GetXMLChildNode(pXml.documentElement, "Exaggeration")), 1);
		}

		this.CreatePostData = function ()
		{
			var sPost = {
				GUID: m_GUID,
				Name: m_Name,
				ResourceName: m_Resources != null ? m_Resources.join(",") : null,
				Title: m_Title,
				Copyright: m_Copyright,
				Graticule: m_Graticule,
				Toolbar: m_Toolbar,
				IndexMap: m_IndexMap,
				AddGeometries: m_AddGeometries,
				AddKml: m_AddKml,
				Query: m_Query,
				Measurements: m_Measurements,
				Share: m_Share,
				SMTPServer: m_SMTPServer,
				SMTPAccount: m_SMTPAccount,
				SMTPPassword: m_SMTPPassword,
				IsCube: m_IsCube,
				Controler: m_Controler,
				TableOfContents: m_TableOfContents,
				Elevation: m_Elevation,
				Exaggeration: m_Exaggeration
			};
			return sPost;
		}
	}
}