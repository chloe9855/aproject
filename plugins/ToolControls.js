function padRight(str, len)
{
	str = '' + str;
	return str.length >= len ? str : str + new Array(len - str.length + 1).join("0");
}
function padLeft(str, len)
{
	str = '' + str;
	return str.length >= len ? str : new Array(len - str.length + 1).join("#") + str;
}

function HEXonchange(str, that)
{
	var color = new Color().fromString(that.value);
	that.style.color = color.toConstract().toHEX();
	that.style.backgroundColor = color.toHEX();
	//ModifyStyleRule("." + str, { color: color.toHEX() });
}
var cumulativeOffset = function (element)
{
	var top = 0, left = 0;
	do
	{
		top += element.offsetTop || 0;
		left += element.offsetLeft || 0;
		element = element.offsetParent;
	} while (element);

	return {
		top: top,
		left: left
	};
};
function ResetZoom()
{
	pMapBase.ZoomMapTo(pMapBase.getExtent());
	pMapBase.RefreshMap(true);
}
function ZoomIn() { ZoomLevel(1); }
function ZoomOut() { ZoomLevel(-1); }
function ZoomLevel(lvl)
{
	var pTrans = pMapBase.getTransformation();
	pTrans.putMapLevel(pTrans.getMapLevel() + lvl);
	pTrans.FitLevel();
	pMapBase.RefreshMap(true);
}

function MapInitilize(onlinemaptmp)
{
	var pOMap = document.getElementById("mapNode");
	if (pMapBase)
	{
		pMapBase = null;
		pOMap.innerHTML = "";

		OpenView();
		document.getElementById("ScaleTools").innerHTML = '';
		document.getElementById("IndexMapNode").innerHTML = "";
		document.getElementById("Coordinate").innerHTML = "NaN	NaN";
	}
	var pTrans = null;
	var pExt = null;
	if (pMapService)
	{
		pMapService.forEach(function (svr)
		{
			var sPath = "";
			if (svr.url)
				sPath += "http://" + svr.url + "/ServerGate/SGSGate.ashx";

			var pServer = new SuperGIS.Server.SGServer(sPath, false);
			if (svr.userpass)
				pServer.Login(svr.userpass, null);
			var R = pServer.GetResource(svr.value);
			var pEnv = R.getEnvelope();
			var pLyr = null;
			if (pEnv != null)
			{
				pLyr = new MapLayer(svr.value, svr.url, svr.userpass);
				if (pMapBase == null)
				{
					var sx = pOMap.clientWidth / (pEnv.Right - pEnv.Left);
					var sy = pOMap.clientHeight / (pEnv.Bottom - pEnv.Top);
					var s = (Math.abs(sx) < Math.abs(sy) ? Math.abs(sx) : Math.abs(sy));
					pTrans = new LevelTransformation(1, 0, 10);
					pTrans.putBaseScaleX(sx > 0 ? s : -s);
					pTrans.putBaseScaleY(sy > 0 ? s : -s);
				}
			}
			else
			{
				pEnv = R.getTileEnvelope();
				if (pEnv != null)
				{
					pLyr = new MapCachedLayer(svr.url, { Resource: svr.value, UserPass: svr.userpass });
					if (pMapBase == null)
						pTrans = new CachedLevelTransformation(pLyr);
				}
			}
			if (pEnv != null)
			{
				if (pExt == null)
					pExt = new MapEnvelope(pEnv.Left, pEnv.Top, pEnv.Right, pEnv.Bottom);
				else
					pExt.Extend(new MapEnvelope(pEnv.Left, pEnv.Top, pEnv.Right, pEnv.Bottom));
			}
			if (pMapBase == null)
			{
				pMapBase = new MapBase(pOMap, pTrans, 0, 0, "100%", "100%");
				if (onlinemaptmp)
					pMapBase.AddLayer(onlinemaptmp);
			}
			if (pMapBase != null && pLyr != null)
			{
				if (pMapBase.getLayers().length > 0)
					pLyr.setOpacity(0.6);
				pMapBase.AddLayer(pLyr);
			}
		})
	}
	
	if (pMapBase == null)
	{
		pTrans = new ScaleTransformation(1);
		pMapBase = new MapBase(pOMap, pTrans, 0, 0, "100%", "100%");
		if (onlinemaptmp)
			pMapBase.AddLayer(onlinemaptmp);
	}

	//Have Current Extent
	var currExt = MSC.MapperConfig.CurrentExtent;
	if (currExt)
	{
		pMapBase.MoveMapTo(currExt.CenterX, currExt.CenterY);
		pMapBase.putScale(currExt.Scale);
	}
	else
		pMapBase.ZoomMapTo(pExt);

	gpanTool = new PanTool(true, true);
	pMapBase.SelectMapTool(gpanTool);

	var DeafultTool = MSC.MapperConfig.Widget.DefaultTools;
	if (DeafultTool.indexOf("IndexMap") >= 0)
	{
		var pOverview = new Overview(document.getElementById("IndexMapNode"), pMapBase, pTrans, "100%", "100%", 4);
		pMapService.forEach(function (l) { pOverview.getMapBase().AddLayer(new MapLayer(l.value, l.url, l.userpass)); })
	}

	if (DeafultTool.indexOf("Identify") >= 0)
	{
		ft = new sg.FeatureInfoTool();
		ft.InitMapEvent(pMapBase);
	}

	var SBOpt = MSC.MapperConfig.DefaultToolOption.ScaleBar;
	if (DeafultTool.indexOf("ScaleBar") >= 0 && SBOpt)
		pMapBase.AddElement(new ScaleBarControl(document.getElementById("ScaleTools"), pMapBase, SBOpt.ScaleUnit, SBOpt.ScaleStyle));

	if (DeafultTool.indexOf("Coordinate") >= 0)
	{
		var LinearUnits = {
			"mm": 0.001,
			"cm": 0.01,
			"dm": 0.1,
			"m": 1,
			"km": 1000,
			"in": 0.0254,
			"ft": 0.3048,
			"yd": 0.9144,
			"mi": 1609.344,
			"nmi": 1852
		};
		var pCoordinate = document.getElementById("Coordinate");
		AttachEvent(pOMap, "mousemove", function (tEvent)
		{
			//Gary Lu:使用者選擇什麼坐標系統就顯示怎樣的坐標，不再統一轉成EPSG3826
			if (!pMapBase)
				return;
			var pt = pMapBase.getCursorPosition(tEvent);
			pt = pMapBase.ToMapPoint(pt.X, pt.Y);
			var c = [pt.X, pt.Y];
			var dec = 3;
			var crd = MSC.MapperConfig.DefaultToolOption.Coordinate;
			if (crd)
			{
				if (crd.Unit in LinearUnits)
					c = c.map(function (x) { return x / LinearUnits[crd.Unit]; });
				dec = crd.Decimal;
			}
			pCoordinate.innerHTML = c.map(function (x) { return x.toFixed(dec); }).join("\t");
		}, false);
	}

	pMapBase.RefreshMap(true);
}

var pPalette = null;
function OpenPalette(str, that)
{
	if (pPalette && pPalette.close(str))
		return pPalette = null;
	pPalette = null;
	if (!str)
		return null;
	return pPalette = (function (name)
	{
		var rt = SuperGIS.Windows.Create({ tag: "input", attr: { type: "text", value: "255", maxlength: "3" } });
		var gt = SuperGIS.Windows.Create({ tag: "input", attr: { type: "text", value: "0", maxlength: "3" } });
		var bt = SuperGIS.Windows.Create({ tag: "input", attr: { type: "text", value: "0", maxlength: "3" } });
		var ht = SuperGIS.Windows.Create({ tag: "input", attr: { type: "text", value: "100", maxlength: "3" } });
		var st = SuperGIS.Windows.Create({ tag: "input", attr: { type: "text", value: "0", maxlength: "3" } });
		var vt = SuperGIS.Windows.Create({ tag: "input", attr: { type: "text", value: "0", maxlength: "3" } });
		var Pan = SuperGIS.Windows.Create({
			tag: "div", attr: { class: "Palette" }, child: [
				{ tag: "div", attr: { class: "colorzone" }, child: [
					{
						tag: "div", attr: { class: "colortop" },
						child: ["#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF"].map(function (c) {
							return { tag: "div", attr:{ class: "itemcolor"}, style: { backgroundColor: c } };
						})
					},
					{
						tag: "div", attr: { class: "colormain" },
						child: ["#FF0000", "#CC3300", "#990000", "#663333", "#996633", "#CC6633",
								"#FFCC99", "#FFCC00", "#CC9933", "#FF9933", "#FF9966", "#FF6600",
								"#999933", "#CCCC33", "#FFFF00", "#FFFF66", "#FFFF99", "#FFFFCC",
								"#333300", "#666633", "#999966", "#669933", "#99CC33", "#99CC66",
								"#00FF00", "#99CC99", "#99FF99", "#CCFFCC", "#CCFF66", "#99FF00",
								"#33CC33", "#669966", "#006633", "#009933", "#33CC66", "#339966",
								"#669999", "#99CCCC", "#99FFFF", "#00FFFF", "#66FFCC", "#33CC99",
								"#336666", "#003333", "#003399", "#3366FF", "#6699FF", "#00CCFF",
								"#000066", "#6666CC", "#0000FF", "#6666FF", "#9999FF", "#CCCCFF",
								"#CC99FF", "#9900FF", "#6600CC", "#6633FF", "#330099", "#3300CC",
								"#9966CC", "#CC66FF", "#CC33FF", "#9900CC", "#663399", "#330066",
								"#CC99CC", "#996699", "#CC66CC", "#FF99FF", "#990099", "#660066",
								"#FF00FF", "#FF99CC", "#CC6699", "#FF3399", "#FF6699", "#FF0066",
								"#FF6666", "#FF9999", "#FFCCCC", "#993366", "#CC3366", "#CC3399"].map(function (c) {
							return { tag: "div", attr:{ class: "itemcolor"}, style: { backgroundColor: c } };
						})
					}
				] },
				{ tag: "div", attr: { class: "textzone" }, child: [
					{ tag: "div", attr: { class: "rgbtext" }, child: [ rt, { tag: "span", child: "R" }, gt, { tag: "span", child: "G" }, bt, { tag: "span", child: "B" } ] },
					{ tag: "div", attr: { class: "hsbtext" }, child: [ ht, { tag: "span", child: "H" }, st, { tag: "span", child: "S" }, vt, { tag: "span", child: "V" } ] }
				] }
			]
		});
		that.offsetParent.offsetParent.append(Pan);
		function UpdatePaletteRGB(color)
		{
			var rgb = color.toARGB();
			rt.value = rgb.r;
			gt.value = rgb.g;
			bt.value = rgb.b;
		}
		function UpdatePaletteHSV(color)
		{
			var hsv = color.toHSV();
			ht.value = hsv.h;
			st.value = hsv.s;
			vt.value = hsv.v;
		}
		function HexChange()
		{
			var color = new Color().fromString(this.value);
			UpdatePaletteRGB(color);
			UpdatePaletteHSV(color);
		}
		function scroll()
		{
			Pan.style.left = that.offsetParent.offsetLeft - that.offsetParent.scrollLeft + that.offsetLeft - that.scrollLeft + that.offsetWidth + "px";
			Pan.style.top = that.offsetParent.offsetTop - that.offsetParent.scrollTop + that.offsetTop - that.scrollTop + "px";
		}
		var scrollEvent = AttachEvent(that.offsetParent, "scroll", scroll);
		scrollEvent.raise();
		var target = that.previousSibling;//document.getElementById(name + "Text");
		target.addEventListener("keyup", HexChange, false);
		HexChange.call(target);

		function UpdateHEX(color)
		{
			target.value = color.toHEX();
			HEXonchange(name, target);
		}
		rt.onchange = gt.onchange = bt.onchange = function ()
		{
			var color = new Color().fromRGB(rt.value, gt.value, bt.value);
			UpdatePaletteHSV(color);
			UpdateHEX(color);
		};
		ht.onchange = st.onchange = vt.onchange = function ()
		{
			var color = new Color().fromHSV(ht.value, st.value, vt.value);
			UpdatePaletteRGB(color);
			UpdateHEX(color);
		};
		function ItemClick()
		{
			var color = new Color().fromString(this.style.backgroundColor);
			UpdatePaletteRGB(color);
			UpdatePaletteHSV(color);
			UpdateHEX(color);
		}
		Array.from(Pan.getElementsByClassName("itemcolor")).forEach(function (x) { x.onclick = ItemClick; })

		this.close = function (tstr)
		{
			target.removeEventListener("keyup", HexChange, false);
			Pan.parentNode.removeChild(Pan)
			if (scrollEvent)
				scrollEvent.detach();
			return tstr == name;
		};
		return this;
	})(str);
}

var CurrentView = null;
var ReleaseView = null;
function OpenView(ViewType, strTitle, cancelFunc)
{
	if (ViewType && ViewType.toUpperCase() == "ONLYHEAD")
	{
		if (CurrentView)
		{
			var bHead = CurrentView.classList.toggle("ONLYHEAD");
			document.getElementById("SemiTransparentFooter").classList.toggle("ALL", !bHead);
			document.getElementById("SemiTransparentFooter").classList.toggle("ONLYHEAD", bHead);
		}
		return;
	}

	if (ReleaseView)
		ReleaseView();
	ReleaseView = null;
	if (CurrentView)
		CurrentView.parentNode.removeChild(CurrentView);
	CurrentView = null;

	var tar = null;
	if (ViewType)
	{
		tar = SuperGIS.Windows.Create({ tag: "div", attr: { class: "ViewBody" } });
		var pTitle = SuperGIS.Windows.Create({
			tag: "div", attr: { class: "ViewHeader Headercolor Layoutcolor" },
			child: [
				{ tag: "span", attr: { class: "ViewTitle" }, child: strTitle },
				{ tag: "div", attr: { class: "Buttoncolor Switch Close" }, event: { click: OpenView.bind(null, null) } },
				{ tag: "div", attr: { class: "Buttoncolor Switch Header" }, event: { click: OpenView.bind(null, "onlyhead") } },
			]
		});
		var pView = SuperGIS.Windows.Create({ tag: "div", attr: { class: ViewType == "Dialog" ? "DialogView" : ViewType == "Popup" ? "PopupView" : ViewType == "Drawer" ? "DockView" : "" }, style: { display: "block" }, child: [pTitle, tar] });
		if (ViewType == "Dialog")
			new DragTracker(pTitle, pView);
		CurrentView = pView;
		window.document.body.appendChild(CurrentView);
	}
	document.getElementById("SemiTransparentFooter").classList.remove("ONLYHEAD");
	document.getElementById("SemiTransparentFooter").classList.toggle("ALL", ViewType);
	ReleaseView = cancelFunc;
	return tar;
}

function CustomClick(Custom, Tool, Type)
{
	Custom.obj = new Tool(OpenView(Type, Custom.title, function ()
	{
		if (Custom.obj && Custom.obj.ExitMapEvent)
			Custom.obj.ExitMapEvent();
		delete Custom.obj;
	}), pMapBase);
	if (Custom.obj.ActiveMapEvent)
		Custom.obj.ActiveMapEvent();
}

function CustomTool(parentNode, pMapBase)
{
	this.ActiveMapEvent = function()
	{
		var CustomToolsArray = MSC.MapperConfig.Widget.CustomTools;
		parentNode.appendChild(SuperGIS.Windows.Create({
			tag: "div", style: { width: "100%", height: "100%" },
			child: CustomToolsArray
				.filter(function(t) { return t in staticCustom && "elem" in staticCustom[t]; })
				.map(function (t) { return { tag: "div", attr: { class: "SecItem" }, child: [staticCustom[t].elem, { tag: "div", child: staticCustom[t].desc }] }; })
		}));
	}

	this.ExitMapEvent = function () { }
}

function BaseMapTool(parentNode, pMapBase)
{
	this.ActiveMapEvent = function()
	{
		var previewSrc = {
			"Google Map": "images/google.png",
			"Bing Maps": "images/bing.png",
			"OpenStreetMap Light": "images/OpenStreetMap-Light.png",
			"OpenStreetMap Dark": "images/OpenStreetMap-Dark.png",
			"OpenStreetMap Standard": "images/OpenStreetMap-Standard.png",
			"WMS": "images/WMS.png",
			"WMTS": "images/WMTS.png"
		}

		function CreateSourceLayer(item)
		{
			if (item.Type == "OSMBaseMap")
			{
				if (item.Title == "OpenStreetMap Standard")
					return new sg.layers.OSMLayer();
				else if (item.Title == "OpenStreetMap Dark")
					return new sg.layers.OSMLayer({ url: "http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" });
				else if (item.Title == "OpenStreetMap Light")
					return new sg.layers.OSMLayer({ url: "http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" });
				else if (item.Title == "Bing Maps")
					return new sg.layers.BingTiledLayer({ key: item.Key });
				else if (item.Title == "Google Map")
					return new GoogleLayer({ key: item.Key });
			}
			else if (item.Type == "OGCBaseMap")
			{
				if (item.OgcType == "WMS")
				{
					var lyr = new sg.layers.WMSLayer(item.Url, { imageFormat: item.ImageFormat, loadEffect: true, resourceInfo: { version: "1.1.1", layerInfos: [new sg.layers.WMSLayerInfo({ name: item.LayerName })] }, visibleLayers: [item.LayerName] });
					var spa = item.SRS.split(':');
					if (spa[1] != "")
						lyr.spatialReference = new sg.SpatialReference({ wkid: parseInt(spa[1]) });
					return lyr;
				}
				else if (item.OgcType == "WMTS")
					return new sg.layers.WMTSLayer(item.Url, { serviceMode: "KVP", loadEffect: true, layerInfo: new sg.layers.WMTSLayerInfo({ identifier: item.LayerName, tileMatrixSet: item.TMS, format: item.ImageFormat }) });
			}
			else if (item.Type == "SGSBaseMap")
				return new MapCachedLayer(item.Url, { Username: item.UserName, Password: item.UserPass });
			return null
		}

		var items = MSC.MapperConfig.CustomToolOption.BaseMap || [];
		items = items.slice(0).reverse();
		parentNode.appendChild(SuperGIS.Windows.Create({ tag: "div", attr: { class: "basemapviewheader" }, child: "BaseMap Gallery" }));
		parentNode.appendChild(SuperGIS.Windows.Create({
			tag: "div", attr: { class: "basemapviewbody" }, child: items.map(function (Data, i)
			{
				var img = SuperGIS.Windows.Create({ tag: "img", style: { width: "80px", height: "50px" } });
				if (Data.Type == "SGSBaseMap")
				{
					var sgsLayer = new MapCachedLayer(Data.Url, { Username: Data.UserName, Password: Data.UserPass });
					sgsLayer.getPreview(img, 80, 50);
				}
				else if (Data.Type == "OSMBaseMap")
					img.src = previewSrc[Data.Title];
				else if (Data.Type == "OGCBaseMap")
					img.src = previewSrc[Data.OgcType];
				return SuperGIS.Windows.Create({
					tag: "div", attr: { "class": "GalleryItem", title: Data.Title }, child: [
						{ tag: "div", attr: { "class": "GalleryItemBak" }, style: { "background": "#FFFFFF" }, child: img },
						{ tag: "div", attr: { "class": "GalleryItemLab" }, child: Data.Title.toString() }
					],
					event: { click: function () { MapInitilize(CreateSourceLayer(Data)); } }
				})
			})
		}));
	}

	this.ExitMapEvent = function() { }
}

function BookMarkTool(parentNode, pMapBase)
{
	this.ActiveMapEvent = function()
	{
		var items = MSC.MapperConfig.CustomToolOption.BookMark || [];
		items = items.slice(0).reverse();
		parentNode.appendChild(SuperGIS.Windows.Create({ tag: "div", attr: { class: "basemapviewheader" }, child: "Book Mark List" }));
		parentNode.appendChild(SuperGIS.Windows.Create({
			tag: "div", attr: { class: "basemapviewbody" }, child: items.map(function (item, i)
			{
				var BookMarkImg = SuperGIS.Windows.Create({ tag: "img" });
				if (item.Type == "Upload")
				{
					BookMarkImg.src = item.Src;
				}
				else if (item.Type == "Cache")
				{
					if (pMapService && pMapService.length > 0)
					{
						var tempcanvas = document.getElementById("tempcanvas");
						tempcanvas.width = 80;
						tempcanvas.height = 50;
						tempcanvas.style.display = "none";
						var context = tempcanvas.getContext('2d');
						context.clearRect(0, 0, tempcanvas.width, tempcanvas.height);
						var complete = 0;
						pMapService.forEach(function (source)
						{
							var path = (option.url == "" ? "localhost" : option.url);
							var pServer = new SuperGIS.Server.SGServer("http://" + path + "/ServerGate/SGSGate.ashx", false);
							pServer.GetResource(source.value, function (r)
							{
								pServer.LoadImage(null, { Left: item.Left, Top: item.Top, Right: item.Right, Bottom: item.Bottom, Width: 80, Height: 50 },
									function (img)
									{
										context.drawImage(img, 0, 0);
										complete++;
										if (complete == pMapService.length)
											BookMarkImg.src = tempcanvas.toDataURL();
									});
							});
						});
					}
				}
				var BookMarkItem = SuperGIS.Windows.Create({
					tag: "div", attr: { "class": "BMGalleryItem" }, child: [
						{ tag: "div", attr: { "class": "BMGalleryItemBak" }, child: BookMarkImg },
						{ tag: "div", attr: { "class": "GalleryItemLab" }, child: item.Title.toString() }
					]
				})
				BookMarkItem.title = item.Title;
				BookMarkItem.onclick = function ()
				{
					pMapBase.MoveMapTo(item.CenterX, item.CenterY);
					pMapBase.putScale(item.Scale);
					pMapBase.RefreshMap(true);
				};
				return BookMarkItem;
			})
		}));
	}

	this.ExitMapEvent = function () { }
}

var gDrawLayer = null;
function DrawTool(parentNode, pMapBase)
{
	if (gDrawLayer == null)
	{
		gDrawLayer = new sg.GraphicsLayer();
		pMapBase.AddLayer(gDrawLayer);
	}
	var currentType = null;
	var draw = new sg.Draw(pMapBase);

	var TypeClass = {
		POINT: { src: "images/point.png", asrc: "images/point2.png" },
		LINESTRING: { src: "images/line.png", asrc: "images/line2.png" },
		POLYGON: { src: "images/geometry.png", asrc: "images/geometry2.png" },
		CIRCLE: { src: "images/pie.png", asrc: "images/pie2.png" },
		TRIANGLE: { src: "images/triangle.png", asrc: "images/triangle2.png" },
		RECTANGLE: { src: "images/rectangle.png", asrc: "images/rectangle2.png" }
	}

	this.ExitMapEvent = function () { OpenPalette(); draw.deactivate(); }

	this.ActiveMapEvent = function ()
	{
		var pColor = SuperGIS.Windows.Create({ tag: "input", attr: { type: "text", value: "#000000", maxlength: "7" }, style: { color: "#FFFFFF", backgroundColor: "#000000" }, event: { keyup: function () { HEXonchange('ColorZone', this); } } });
		var pWidth = SuperGIS.Windows.Create({ tag: "input", attr: { type: "number", value: "3", min: "0" } });
		var pOutlineColor = SuperGIS.Windows.Create({ tag: "input", attr: { type: "text", value: "#000000", maxlength: "7" }, style: { color: "#FFFFFF", backgroundColor: "#000000" }, event: { keyup: function () { HEXonchange('OutlineColorZone', this); } } });
		var pOutlineWidth = SuperGIS.Windows.Create({ tag: "input", attr: { type: "number", value: "3", min: "0" } });
		var pSize = SuperGIS.Windows.Create({ tag: "input", attr: { type: "number", value: "10", min: "0" } });

		var pSymBody = SuperGIS.Windows.Create({ tag: "div" });

		function DrawActiveClick(type)
		{
			if (currentType in TypeClass)
				TypeClass[currentType].obj.src = TypeClass[currentType].src;
			currentType = type;
			OpenPalette();
			Array.from(pSymBody.childNodes).forEach(function (e) { pSymBody.removeChild(e); });
			draw.deactivate();
			gpanTool.InitMapEvent(pMapBase);
			if (ft)
				ft.InitMapEvent(pMapBase);

			if (!currentType)
				return;

			if (ft)
				ft.ExitMapEvent(pMapBase);
			gpanTool.ExitDbClickEvent();

			var endType = draw.activate(sg.Draw[type], { showToolTips: true });
			switch (type)
			{
				case "MULTI_POINT":
				case "POLYGON":
				case "LINESTRING":
					draw.setTooltipContent("Click to add point/vertex. [Finish] to finish.".replace("[Finish]", endType == 0 ? "Double-click" : "Press longer then release"));
					break;
				case "POINT":
					draw.setTooltipContent("Click to add point.");
					break;
				default:
					draw.setTooltipContent("Drag to start. Let go to finish.");
					break;
			}
			if (type in TypeClass)
				TypeClass[type].obj.src = TypeClass[type].asrc;
			pSymBody.appendChild(SuperGIS.Windows.Create({ tag: "div", attr: { class: "paletteitem" }, child: [{ tag: "span", child: "Color" }, pColor, { tag: "input", attr: { type: "button" }, event: { click: function () { OpenPalette('ColorZone', this); } } }] }));
			if (type == "LINESTRING")
				pSymBody.appendChild(SuperGIS.Windows.Create({ tag: "div", attr: { class: "paletteitem" }, child: [{ tag: "span", child: "Width" }, pWidth] }));
			if (type == "POINT" || type == "POLYGON" || type == "CIRCLE" || type == "TRIANGLE" || type == "RECTANGLE")
			{
				pSymBody.appendChild(SuperGIS.Windows.Create({ tag: "div", attr: { class: "paletteitem" }, child: [{ tag: "span", child: "OutlineColor" }, pOutlineColor, { tag: "input", attr: { type: "button" }, event: { click: function () { OpenPalette('OutlineColorZone', this); } } }] }));
				pSymBody.appendChild(SuperGIS.Windows.Create({ tag: "div", attr: { class: "paletteitem" }, child: [{ tag: "span", child: "OutlineWidth" }, pOutlineWidth] }));
			}
			if (type == "POINT")
				pSymBody.appendChild(SuperGIS.Windows.Create({ tag: "div", attr: { class: "paletteitem" }, child: [{ tag: "span", child: "Size" }, pSize] }));
		}

		Object.keys(TypeClass).forEach(function (k)
		{
			TypeClass[k].obj = SuperGIS.Windows.Create({
				tag: "img", attr: { class: "dritem", src: TypeClass[k].src }, style: { width: "40px", height: "40px", marginLeft: "3%", marginTop: "5px", float: "left" },
				event: { click: function () { DrawActiveClick(k); } }
			});
			parentNode.appendChild(TypeClass[k].obj);
		})
		parentNode.appendChild(SuperGIS.Windows.Create({
			tag: "input", attr: { type: "button", class: "FlatButtonStyle", value: "Clear" }, style: { marginLeft: "3%", marginTop: "5px", float: "left" },
			event: {
				click: function ()
				{
					gDrawLayer.clear();
					DrawActiveClick(null);
				}
			}
		}));
		parentNode.appendChild(pSymBody);

		sg.events.on(draw, "draw-end", function (e)
		{
			var clr = new Color().fromString(pColor.value).toARGB();
			var oclr = new Color().fromString(pOutlineColor.value).toARGB();
			var cc = new sg.Color(clr.r, clr.g, clr.b);
			var graphicSymbol = {
				fillcolor: cc,
				linecolor: cc, linewidth: parseInt(pWidth.value),
				markercolor: cc, markersize: parseInt(pSize.value),
				borderwidth: parseInt(pOutlineWidth.value), bordercolor: new sg.Color(oclr.r, oclr.g, oclr.b)
			};
			gDrawLayer.add(sg.Graphic.createFromGeometry(e.geometry, graphicSymbol));

			DrawActiveClick(null);
		});
	}
}