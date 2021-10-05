/* eslint-disable */

/* eslint-disable */
var sg = sg || (function () {
	if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (elt /*, from*/) {
					var len = this.length >>> 0;

					var from = Number(arguments[1]) || 0;
					from = (from < 0)
			 ? Math.ceil(from)
			 : Math.floor(from);
					if (from < 0)
							from += len;

					for (; from < len; from++) {
							if (from in this &&
				this[from] === elt)
									return from;
					}
					return -1;
			};
	}

	var alertFallback = false;
	if (typeof console === "undefined" || typeof console.log === "undefined") {
			console = {};
			if (alertFallback) {
					console.log = function (msg) {
							alert(msg);
					};
			} else {
					console.log = function () { };
			}
	}

	if (document.namespace)
			document.namespaces.add('vml', 'urn:schemas-microsoft-com:vml', '#default#VML');

	var sg = {};

//    sg.import = function (deps) {


//    }


	var DeviceTest = function () {
			//MSIE, Firefox, Chrome, Safari, Opera, Gecko, Presto, Mozilla
			var agent = navigator.userAgent.toLowerCase();

			var rv = -1;
			if (navigator.appName == 'Microsoft Internet Explorer') {
					var ua = navigator.userAgent;
					var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
					if (re.exec(ua) != null)
							rv = parseFloat(RegExp.$1);
			}

			if (rv && rv < 9 && document.all)
					return "MSIE";
			else if (rv && rv >= 9)
					return "MSIE_S";
			else if (agent.indexOf("firefox") > 0)
					return "Firefox";
			else if (agent.indexOf("chrome") > 0)
					return "Chrome";
			else if (agent.indexOf("safari") > 0)
					return "Safari";
			else if (agent.indexOf("opera") > 0)
					return "Opera";
			else if (agent.indexOf("camino") > 0)
					return "Camino";
			else if (agent.indexOf("gecko") > 0)
					return "Gecko";
			else if (agent.indexOf("trident") > 0)
					return "Trident";
			else if (agent.indexOf("mozilla") > 0)
					return "Mozilla";
			return null;
	}


	var listener = function (target, type, handler) {
			this.target = target;
			this.type = type;
			this.handler = handler;
	}


	listener.prototype.trigger = function () {
			this.target.trigger(this.type);
	};

	listener.prototype.remove = function () {
			var targetEvt = this.target["on" + this.type];

			for (var i = 0; i < targetEvt.length; i++) {
					if (targetEvt[i] == this) {
							targetEvt.splice(i, 1);
							return;
					}
			}
	};


	sg.events = sg.events || (function () {
			var ev = {};
			ev.on = function (target, type, handler) {
					if (!target || !target.events)
							return;
					target.on(type, handler);
			}


			ev.trigger = function (target, type, op) {
					if (!target)
							return;
					if (typeof (type) != "string")
							return;
					target.trigger(type);
			}

			return ev;
	})()

	sg.extend = function (dest) {
			var sources = Array.prototype.slice.call(arguments, 1),
			i, j, len, src;

			for (j = 0, len = sources.length; j < len; j++) {
					src = sources[j] || {};
					for (i in src) {
							if (src.hasOwnProperty(i)) {
									dest[i] = src[i];
							}
					}
			}
			return dest;
	},

	sg.Class = function () { };

	sg.Class.extend = function (props) {

			var class_ = function () {
					// call the constructor
					if (this.initialize) {
							this.initialize.apply(this, arguments);
					}
			};

			// new func
			var F = function () { };
			F.prototype = this.prototype;

			var proto = new F();
			proto.constructor = class_;

			class_.prototype = proto;

			// inherit static member
			for (var i in this) {
					if (this.hasOwnProperty(i) && i !== 'prototype') {
							class_[i] = this[i];
					}
			}

			// add static member
			if (props.statics) {
					sg.extend(class_, props.statics);
					delete props.statics;
			}

			// merge properties
			if (props.includes) {
					sg.extend.apply(null, [proto].concat(props.includes));
					delete props.includes;
			}

			// register event
			if (props.events) {
					proto.on = function (type, handler) {
							var l = new listener();
							l.handler = handler;
							if (!this.events)
									return;
							for (var i = 0; i < this.events.length; i++) {
									if (this.events[i] == type) {
											if (!this["on" + type])
													this["on" + type] = [];

											var targetEvt = this["on" + type];
											if (targetEvt)
													targetEvt.push(l);
											return;
									}
							}
					}

					proto.trigger = function (type) {

							for (var i = 0; i < this.events.length; i++) {
									if (this.events[i] == type) {
											var target = this["on" + type];
											if (!target)
													return;
											for (var listener = 0; listener < target.length; listener++) {
													target[listener].handler.apply(this, Array.prototype.slice.call(arguments, 1));
											}
											return;
									}
							}
					}
					proto.events = props.events;
					//delete props.events;
			}


			// merge prototype
			sg.extend(proto, props);

			var parent = this;

			class_.__super__ = parent.prototype;

			return class_;
	};


	// method for adding properties to prototype
	sg.Class.include = function (props) {
			sg.extend(this.prototype, props);
	};

	var componentToHex = function (c) {
			var hex = c.toString(16);
			return hex.length == 1 ? "0" + hex : hex;
	}

	sg.Color = sg.Class.extend({
			initialize: function (r, g, b, a) {
					this.r = r ? parseInt(r) : this.r;
					this.g = g ? parseInt(g) : this.g;
					this.b = b ? parseInt(b) : this.b;
					this.a = a == undefined ? this.a : a;
			},
			r: 0,
			g: 0,
			b: 0,
			a: 1,
			toHex: function () {
					return "#" + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
			},
			toRgb: function () {
					return [this.r, this.g, this.b];
			},
			toRgba: function () {
					return [this.r, this.g, this.b, this.a];
			},
			toCss: function (useAlpha) {
					if (useAlpha)
							return "rgb(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
					else
							return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
			},
			toString: function () {
					return this.toCss(true);
			}
	});

	return sg;
})

(function () {
	sg.OperationBase = sg.Class.extend({
			label: null,
			type: null,
			initialize: function (params) {
					if (typeof (params.label) == "string")
							this.label = params.label;
					if (typeof (params.type) == "string")
							this.type == params.type
			},
			performRedo: function () {
			},
			performUndo: function () {
			}
	});
});

function ScaleTransformation(dBaseScale)
{
	var m_BaseScaleX = dBaseScale;
	var m_BaseScaleY = -dBaseScale;
	var m_ScaleX = 1;
	var m_ScaleY = 1;
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
	this.getScale = function()
	{
		return m_BaseScaleX * m_ScaleX;
	};
	this.putScale = function(newVal)
	{
		m_ScaleX = newVal / m_BaseScaleX;
		m_ScaleY = newVal / Math.abs(m_BaseScaleY);
	};
	this.getScaleX = function()
	{
		return m_BaseScaleX * m_ScaleX;
	};
	this.getScaleY = function()
	{
		return m_BaseScaleY * m_ScaleY;
	};
}
function LevelTransformation(dBaseScale, nLevel, nMaxLevel)
{
	var m_BaseScaleX = dBaseScale;
	var m_BaseScaleY = -dBaseScale;
	var m_Level = nLevel;
	var m_LevelS = Math.pow(2, m_Level);
	var m_MaxLevel = nMaxLevel;
	
	function log2(val)
	{
		return Math.log(val) / Math.LN2;
	}
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
		return m_MaxLevel;
	};
	this.putMapMaxLevel = function(newVal)
	{
		m_MaxLevel = newVal;
	};
	this.getMapLevel = function()
	{
		return m_Level;
	};
	this.putMapLevel = function (newVal)
	{
		if (this.Fixed)
			newVal = Math.round(newVal);
		if (m_Level == newVal)
			return true;
		
		var tVal = newVal > m_MaxLevel - 1 ? m_MaxLevel - 1 : newVal < 0 ? 0 : newVal;
		
		if ((newVal >= m_MaxLevel || newVal < 0) && m_Level == tVal)
			return false;
		
		m_Level = tVal;
		m_LevelS = Math.pow(2, m_Level);
		return true;
	};
	this.getScale = function()
	{
		return m_BaseScaleX * m_LevelS;
	};
	this.putScale = function(newVal)
	{
		this.putMapLevel(log2(newVal / m_BaseScaleX));
	};
	this.getScaleX = function()
	{
		return m_BaseScaleX * m_LevelS;
	};
	this.getScaleY = function()
	{
		return m_BaseScaleY * m_LevelS;
	};
}
var TileInfoTransformation = function(tileInfo)
{
	if (!tileInfo || !tileInfo.lods)
		throw "TileInfo or LODs is not defined";
	
	var mLevel = 0;
	var mScale = 1 / tileInfo.lods[mLevel].resolution;
	var m_BaseScaleX = 1 / tileInfo.lods[0].resolution;
	var m_BaseScaleY = -m_BaseScaleX;
	
	this.getScale = function()
	{
		return mScale;
	};
	this.getNearestLevel = function(scale)
	{
		var tRes = 1 / scale;
		var min = Infinity;
		var idx = 0;
		for (var i = 0 ; i < tileInfo.lods.length ; i++)
		{
			var res = tileInfo.lods[i].resolution;
			var d = Math.abs(tRes - res);
			if (d < min)
			{
				min = d;
				idx = i;
			}
		}
		return idx;
	};
	this.putScale = function(newVal)
	{
		mScale = newVal;
		mLevel = this.getNearestLevel(mScale);
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
	this.getScaleX = function()
	{
		return this.getScale();
	};
	this.getScaleY = function()
	{
		return-this.getScale();
	};
	this.getLevelScale = function(dLevel)
	{
		var res = null;
		var idx = Math.round(dLevel);
		if (idx < 0)
			idx = 0;
		if (idx >= tileInfo.lods.length)
			idx = tileInfo.lods.length - 1;
			
		return 1 / tileInfo.lods[idx].resolution;
	};
	this.getMapMaxLevel = function()
	{
		return tileInfo.lods.length;
	};
	this.getMapLevel = function()
	{
		return mLevel;
	};
	this.putMapLevel = function(newVal)
	{
		if (this.getMapMaxLevel() <= newVal || newVal < 0)
			return;
		this.putScale(this.getLevelScale(newVal));
		mLevel = newVal;
		return true;
	};
	this.FitLevel = function()
	{
	};
};
var MapBase = sg.Class.extend(
{
	initialize: function(pParentElem, pTrans, locX, locY, locWidth, locHeight, params)
	{
		var m_hPackage;
		var m_hObj;
		var that = this;
		var m_MapLayers;
		var m_MapElements;
		var m_MapEvent;
		var drawingLayers = [];
		var m_cltWidth = 0;
		var m_cltHeight = 0;
		var m_CenterX = 0;
		var m_CenterY = 0;
		var m_Trans = null;
		var mobile = CheckDevice();
		m_MapLayers = new Array;
		m_ActiveLayer = 0;
		m_MapElements = new Array;
		m_MapEvent = null;
		m_Trans = pTrans;
		
		var mapContainer = pParentElem.ownerDocument.createElement("div");
		pParentElem.appendChild(mapContainer);
		mapContainer.setAttribute("class", "sgContainer mapContainer");
		var infoNode = pParentElem.ownerDocument.createElement("div");
		infoNode.style.position = "absolute";
		infoNode.style.left = "0px";
		infoNode.style.top = "0px";
		infoNode.style.width = "0px";
		infoNode.style.height = "0px";
		m_hPackage = pParentElem.ownerDocument.createElement("div");
		m_hPackage.setAttribute("class", "sgContainer hPackage");
		
		var eventContainer = document.createElement("div");
		m_hPackage.appendChild(eventContainer);
		sg.addClass(eventContainer, "sgContainer");
		sg.addClass(eventContainer, "sgEventLayer");
		if (!mobile)
		{
			PreventDefault(eventContainer, "mousedown");
			PreventDefault(eventContainer, "mousemove");
		}
		else
		{
			PreventDefault(eventContainer, "touchstart");
			PreventDefault(eventContainer, "touchmove");
		}
		
		var layerContainer = pParentElem.ownerDocument.createElement("div");
		eventContainer.appendChild(layerContainer);
		layerContainer.setAttribute("class", "sgContainer layerContainer");
		layerContainer.style.overflow = "visible";
		if (!mobile)
		{
			PreventDefault(eventContainer, "mousedown");
			PreventDefault(eventContainer, "mousemove");
		}
		else
		{
			PreventDefault(eventContainer, "touchstart");
			PreventDefault(eventContainer, "touchmove");
		}
		
		m_hObj = m_hPackage.ownerDocument.createElement("div");
		layerContainer.appendChild(m_hObj);
		mapContainer.appendChild(m_hPackage);
		mapContainer.appendChild(infoNode);
		m_hObj.setAttribute("class", "sgContainer hObject");
		m_hObj.style.overflow = "visible";
		if (!mobile)
		{
			PreventDefault(eventContainer, "mousedown");
			PreventDefault(eventContainer, "mousemove");
		}
		else
		{
			PreventDefault(eventContainer, "touchstart");
			PreventDefault(eventContainer, "touchmove");
		}
		
		m_cltWidth = Number(m_hObj.clientWidth);
		m_cltHeight = Number(m_hObj.clientHeight);
		
		var length = Math.sqrt(m_cltWidth * m_cltWidth + m_cltHeight * m_cltHeight);
		var resizeTimeout;
		var resizeThrottler = function()
		{
			if (!resizeTimeout)
			{
				resizeTimeout = setTimeout(function()
				{
					resizeTimeout = null;
					pResizeFunc();
				}, 99);
			}
		};
		var tTimeID;
		var pResizeFunc = FuncAdapter(this, function()
		{
			if (m_cltWidth == Number(m_hObj.clientWidth) && m_cltHeight == Number(m_hObj.clientHeight))
				return;
			
			if (tTimeID)
				clearTimeout(tTimeID);
			tTimeID = setTimeout(FuncAdapter(this, function()
			{
				this.RefreshMap(true);
			}), 1E3);
			this.RefreshMap(false);
		});
		AttachEvent(window, "resize", resizeThrottler, false);
		this.FinalRelease = function()
		{
			this.SelectMapTool(null);
			this.RemoveAllElements();
			DetachEvent(window, "resize", resizeThrottler, false);
			m_hPackage.removeChild(m_hPackage);
		};
		if (params && params.infoWindow instanceof sg.InfoWindowBase)
		{
			this.infoWindow = params.infoWindow;
			this.infoWindow.setMap(this);
		}
		this.getContainer = function()
		{
			return mapContainer;
		};
		this.getHObject = function()
		{
			return m_hObj;
		};
		this.getHPackage = function()
		{
			return m_hPackage;
		};
		this.getBBox = function()
		{
			return layerContainer.getBoundingClientRect();
		};
		this.getClientWidth = function()
		{
			return m_cltWidth;
		};
		this.getClientHeight = function()
		{
			return m_cltHeight;
		};
		this.getCenterX = function()
		{
			return m_CenterX;
		};
		this.putCenterX = function(newVal)
		{
			m_CenterX = newVal;
		};
		this.getCenterY = function()
		{
			return m_CenterY;
		};
		this.putCenterY = function(newVal)
		{
			m_CenterY = newVal;
		};
		this.getTransformation = function()
		{
			return m_Trans;
		};
		this.putScale = function(newVal)
		{
			m_Trans = newVal;
		};
		this.getScale = function()
		{
			return m_Trans.getScale();
		};
		this.putScale = function(newVal)
		{
			m_Trans.putScale(newVal);
		};
		this.getCellSizeX = function()
		{
			return this.ToMapDistX(1);
		};
		this.getCellSizeY = function()
		{
			return this.ToMapDistY(1);
		};
		this.MoveMapTo = function(centerX, centerY)
		{
			this.putCenterX(centerX);
			this.putCenterY(centerY);
		};
		this.ZoomMapTo = function(pEnvelope)
		{
			if (!pEnvelope)
				return;
			var left, top, right, bottom;
			if (pEnvelope instanceof sg.geometry.Extent)
			{
				left = pEnvelope.xmin;
				top = pEnvelope.ymax;
				right = pEnvelope.xmax;
				bottom = pEnvelope.ymin;
			}
			else if (pEnvelope instanceof sg.geometry.Point)
			{
				this.MoveMapTo(pEnvelope.x, pEnvelope.y);
				return;
			}
			else if (pEnvelope instanceof MapPoint)
			{
				this.MoveMapTo(pEnvelope.X, pEnvelope.Y);
				return;
			}
			else if (pEnvelope.Left == null || pEnvelope.Top == null || pEnvelope.Right == null || pEnvelope.Bottom == null)
				return;
			else
			{
				left = pEnvelope.Left;
				top = pEnvelope.Top;
				right = pEnvelope.Right;
				bottom = pEnvelope.Bottom;
			}
			this.MoveMapTo((right + left) / 2, (bottom + top) / 2);
			var dScaleX = m_cltWidth / (right - left);
			var dScaleY = m_cltHeight / (bottom - top);
			this.putScale(Math.min(Math.abs(dScaleX), Math.abs(dScaleY)));
		};
		this.setExtent = function(extent)
		{
			if (extent.xmin == null || extent.ymax == null || extent.xmax == null || extent.ymin == null)
				return;
			this.MoveMapTo((extent.xmax + extent.xmin) / 2, (extent.ymin + extent.ymax) / 2);
			var dScaleX = m_cltWidth / (extent.xmax - extent.xmin);
			var dScaleY = m_cltHeight / (extent.ymin - extent.ymax);
			this.putScale(Math.min(Math.abs(dScaleX), Math.abs(dScaleY)));
		};
		this.getLayerContainer = function()
		{
			return layerContainer;
		};
		this.getEventContainer = function()
		{
			return eventContainer;
		};
		this.getPackageOffset = function()
		{
			var bbox = m_hPackage.getBoundingClientRect();
			return new MapPoint(bbox.left, bbox.top);
		};
		this.getTransformCursorPosition = function(tEvent)
		{
			if (tEvent == null)
				return null;
			var Offset = this.getPackageOffset();
			return new MapPoint(tEvent.clientX - Offset.X, tEvent.clientY - Offset.Y);
		};
		this.getCursorPosition = function(tEvent)
		{
			if (tEvent == null)
				return;
			var angle = this.getAngle();
			var offset = sg.getOffset(m_hPackage);
			
			var cx1, cy1;
			if (tEvent.touches && tEvent.touches.length > 0)
			{
				cx1 = tEvent.touches[0].clientX - offset[0] + document.body.scrollLeft;
				cy1 = tEvent.touches[0].clientY - offset[1] + document.body.scrollTop; 
			}
			else if (tEvent.changedTouches && tEvent.changedTouches.length > 0)
			{
				cx1 = tEvent.changedTouches[0].clientX - offset[0] + document.body.scrollLeft;
				cy1 = tEvent.changedTouches[0].clientY - offset[1] + document.body.scrollTop; 
			}
			else
			{
				cx1 = tEvent.clientX - offset[0] + document.body.scrollLeft;
				cy1 = tEvent.clientY - offset[1] + document.body.scrollTop;
			}
			
			if (angle)
			{
				var hcw = m_cltWidth / 2;
				var hch = m_cltHeight / 2;
				var tm = sg.math.Matrix.translate(hcw, hch);
				var tm2 = sg.math.Matrix.translate(-hcw, -hch);
				var rm = sg.math.Matrix.rotate(-this.getAngle());
				var tr = tm.product(rm).product(tm2).transform(cx1, cy1);
				cx1 = tr.x;
				cy1 = tr.y;
			}
			return new MapPoint(cx1, cy1);
		};
		this.ToMapPoint = function(dX, dY)
		{
			return new MapPoint(this.ToMapDistX(dX - m_cltWidth / 2) + m_CenterX, this.ToMapDistY(dY - m_cltHeight / 2) + m_CenterY);
		};
		this.FromMapPoint = function(dX, dY)
		{
			var pt = new MapPoint(this.FromMapDistX(dX - m_CenterX) + m_cltWidth / 2, this.FromMapDistY(dY - m_CenterY) + m_cltHeight / 2);
			return pt;
		};
		this.ToMapDistX = function(dX)
		{
			return dX / m_Trans.getScaleX();
		};
		this.ToMapDistY = function(dY)
		{
			return dY / m_Trans.getScaleY();
		};
		this.FromMapDistX = function(dX)
		{
			return dX * m_Trans.getScaleX();
		};
		this.FromMapDistY = function(dY)
		{
			return dY * m_Trans.getScaleY();
		};
		this.SelectMapTool = function(pMapEvent)
		{
			if (pMapEvent && pMapEvent.InitMapEvent)
			{
				if (m_MapEvent && m_MapEvent.ExitMapEvent)
			  		m_MapEvent.ExitMapEvent();
				pMapEvent.InitMapEvent(this);
				m_MapEvent = pMapEvent;
				return true;
			}
			else if (m_MapEvent && m_MapEvent.ExitMapEvent)
			{
				m_MapEvent.ExitMapEvent();
				m_MapEvent = null;
			}
			return false;
		};
		this.GetMapTool = function()
		{
			return m_MapEvent;
		};
		this.getLayers = function()
		{
			return m_MapLayers;
		};
		this.AddLayer = function(pElem, idx)
		{
			if (pElem == null)
				return;
			for (var m = 0;m < m_MapLayers.length;m++)
			{
				if (m_MapLayers[m] == pElem)
					return;
			}
			if (pElem.Initialize)
				pElem.Initialize(this);
			if (pElem.isDrawinglayer)
			{
				drawingLayers.push(pElem);
				return;
			}
			if (typeof idx == "number")
				m_MapLayers.splice(idx, 0, pElem);
			else
				m_MapLayers.unshift(pElem);
			
			this.trigger("layer-add");
			if (m_MapLayers.length == 1)
				this.trigger("load");
		};
		this.RemoveLayer = function(pLayer)
		{
			if (!pLayer)
				return;
			var cnt = m_MapLayers.length;
			for (var i = 0 ; i < cnt ; i++)
			{
				if (m_MapLayers[i] == pLayer)
				{
					m_MapLayers.splice(i, 1);
					break;
				}
			}
			if (pLayer.RemoveSelf)
				pLayer.RemoveSelf();
			this.trigger("layer-remove");
		};
		this.RemoveAllLayers = function()
		{
			var cnt = m_MapLayers.length;
			for (var i = 0 ; i < cnt ; i++)
			{
				if (m_MapLayers[i].RemoveSelf)
					m_MapLayers[i].RemoveSelf();
			}
			m_MapLayers = new Array;
			this.trigger("layers-removed");
		};
		this.getElements = function(nIndex)
		{
			return m_MapElements;
		};
		this.AddElement = function(pElem)
		{
			if (pElem.Initialize)
				pElem.Initialize(this);
			m_MapElements.unshift(pElem);
		};
		this.RemoveElement = function(pElem)
		{
			var cnt = m_MapElements.length;
			for (var i = 0 ; i < cnt ; i++)
			{
				if (m_MapElements[i] == pElem)
				{
					m_MapElements.splice(i, 1);
					break;
				}
			}
			if (pElem.RemoveSelf)
				pElem.RemoveSelf();
		};
		this.RemoveAllElements = function()
		{
			var cnt = m_MapElements.length;
			for (var i = 0 ; i < cnt ; i++)
			{
				if (m_MapElements[i].RemoveSelf)
					m_MapElements[i].RemoveSelf();
			}
			m_MapElements = new Array;
		};
		this.getExtendedClientRect = function()
		{
			var length = sg.math.length(this.getClientWidth(), this.getClientHeight());
			var radius = length / 2;
			var hw = this.getClientWidth() / 2;
			var hh = this.getClientHeight() / 2;
			return new sg.geometry.Extent(hw - radius, hh - radius, hw + radius, hh + radius);
		};
		this.getExtendedViewport = function()
		{
			var extended = this.getExtendedClientRect();
			var UL = this.ToMapPoint(extended.xmin, extended.ymin);
			var DR = this.ToMapPoint(extended.xmax, extended.ymax);
			return new sg.geometry.Extent(UL.X, DR.Y, DR.X, UL.Y);
		};
		this.getViewport = function()
		{
			var UL = this.ToMapPoint(0, 0);
			var DR = this.ToMapPoint(this.getClientWidth(), this.getClientHeight());
			return new sg.geometry.Extent(UL.X, DR.Y, DR.X, UL.Y);
		};
		this.getTileViewport = function()
		{
			var angle = Math.floor(Math.abs(this.getAngle()) % 90);
			var length = sg.math.length(this.getClientWidth(), this.getClientHeight()) / 2;
			var radius = length;
			var wradius = (radius - (this.getClientWidth() / 2)) * (angle / 90);
			var hradius = (radius - (this.getClientHeight() / 2)) * (angle / 90);
			var UL = this.ToMapPoint(0 - wradius, 0 - hradius);
			var DR = this.ToMapPoint(this.getClientWidth() + wradius, this.getClientHeight() + hradius);
			return new sg.geometry.Extent(UL.X, DR.Y, DR.X, UL.Y);
		};
		this.getExtent = function()
		{
			var dLeft = null;
			var dTop = null;
			var dRight = null;
			var dBottom = null;
			for (var i = 0 ; i < m_MapLayers.length ; i++)
			{
				var pElem = m_MapLayers[i];
				if (pElem.getLeft)
				{
					if (dLeft == null || this.FromMapDistX(dLeft) > this.FromMapDistX(pElem.getLeft()))
						dLeft = pElem.getLeft();
				}
				if (pElem.getTop)
				{
					if (dTop == null || this.FromMapDistY(dTop) > this.FromMapDistY(pElem.getTop()))
						dTop = pElem.getTop();
				}
				if (pElem.getRight)
				{
					if (dRight == null || this.FromMapDistX(dRight) < this.FromMapDistX(pElem.getRight()))
						dRight = pElem.getRight();
				}
				if (pElem.getBottom)
				{
					if (dBottom == null || this.FromMapDistY(dBottom) < this.FromMapDistY(pElem.getBottom()))
						dBottom = pElem.getBottom();
				}
			}
			return new MapEnvelope(dLeft, dTop, dRight, dBottom);
		};
		this.RefreshMap = function(bClearAll)
		{
			tAnimationCanceled = true;
			m_cltWidth = Number(m_hObj.clientWidth);
			m_cltHeight = Number(m_hObj.clientHeight);
			if (m_MapLayers && m_MapLayers.length > 0)
			{
				if (bClearAll)
				{
					for (var i = 0 ; i < m_MapLayers.length ; i++)
					{
						if (m_MapLayers[i].RebuildElement)
							var k = m_MapLayers[i].RebuildElement();
					}
				}
				for (var i = 0 ; i < m_MapLayers.length ; i++)
				{
					if (m_MapLayers[i].UpdateElement)
						m_MapLayers[i].UpdateElement(1);
				}
			}
			if (m_MapElements && m_MapElements.length > 0)
			{
				if (bClearAll)
				{
					for (var i = 0 ; i < m_MapElements.length ; i++)
						if (m_MapElements[i].RebuildElement)
							m_MapElements[i].RebuildElement();
				}
				for (var i = 0 ; i < m_MapElements.length ; i++)
				{
					if (m_MapElements[i].UpdateElement)
						m_MapElements[i].UpdateElement(1);
				}
			}
			if (drawingLayers && drawingLayers.length > 0)
			{
				var cnt = drawingLayers.length;
				
				if (bClearAll)
				{
					for (var i = 0 ; i < cnt ; i++)
						if (drawingLayers[i].RebuildElement)
							drawingLayers[i].RebuildElement();
				}
				for (var i = 0 ; i < cnt ; i++)
				{
					if (drawingLayers[i].UpdateElement)
						drawingLayers[i].UpdateElement(1);
				}
			}
			that.onsetAngle = false;
		};
		var triggerEvent = function(type, e)
		{
			var cpos = that.getCursorPosition(e);
			var pos = that.ToMapPoint(cpos.X, cpos.Y);
			var pt = new sg.geometry.Point(pos.X, pos.Y);
			e.point = pt;
			e.screenPoint = new sg.geometry.Point(cpos.X, cpos.Y);
			that.trigger(type, e);
		};
		var eventElem = eventContainer;
		
		if (!mobile)
		{
			AttachEvent(eventElem, "mousedown", function(e) 
			{
				var scrX = e.screenX;
				var scrY = e.screenY;
				var moved = false;
				triggerEvent("mousedown", e);
				triggerEvent("drag-start", e);
				
				var drag = function(e)
				{
					if (!moved && e.screenX === scrX && e.screenY === scrY)
					{
						moved = true;
						return;
					}
					triggerEvent("drag", e);
				};
				var dragEnd = function(e)
				{
					DetachEvent(eventElem, "mousemove", drag);
					DetachEvent(eventElem, "mouseup", dragEnd);
					if (scrX === e.screenX && scrY === e.screenY)
						triggerEvent("click", e);
					else
						triggerEvent("drag-end", e);
				};
				AttachEvent(eventElem, "mousemove", drag);
				AttachEvent(eventElem, "mouseup", dragEnd);
			});
			AttachEvent(eventElem, "mousemove", function(e) 
			{
				triggerEvent("mousemove", e);
			});
			AttachEvent(eventElem, "mouseup", function(e)
			{
				triggerEvent("mouseup", e);
			});
			AttachEvent(eventElem, "mouseout", function(e)
			{
				triggerEvent("mouseout", e);
			});
			AttachEvent(eventElem, "mouseover", function(e)
			{
				triggerEvent("mouseover", e);
			});
			AttachEvent(eventElem, "dblclick", function(e)
			{
				triggerEvent("dblclick", e);
			});
		}
		else
		{
			AttachEvent(eventElem, "touchstart", function(e) 
			{
				var scrX = e.touches[0].screenX;
				var scrY = e.touches[0].screenY;
				moved = false;
				triggerEvent("touchstart", e);
				triggerEvent("drag-start", e);
				var drag = function(e)
				{
					if (!moved && e.changedTouches[0].screenX === scrX && e.changedTouches[0].screenY === scrY)
					{
						moved = true;
						return;
					}
					triggerEvent("drag", e);
				};
				var dragEnd = function(e)
				{
					DetachEvent(eventElem, "touchmove", drag);
					DetachEvent(eventElem, "touchend", dragEnd);
					if (scrX === e.changedTouches[0].screenX && scrY === e.changedTouches[0].screenY)
					{
						triggerEvent("click", e);
					}
					else
					{
						triggerEvent("drag-end", e);
					}
				};
				AttachEvent(eventElem, "touchmove", drag);
				AttachEvent(eventElem, "touchend", dragEnd);
			});
			AttachEvent(eventElem, "touchstart", function(e) 
			{
				triggerEvent("touchstart", e);
			});
			AttachEvent(eventElem, "touchend", function(e) 
			{
				triggerEvent("touchend", e);
			});
			AttachEvent(eventElem, "touchmove", function(e) 
			{
				triggerEvent("touchmove", e);
			});
		}
		
		var tAnimationFunc = null;
		var tAnimationCanceled = false;
		var tMapPtX = null;
		var tMapPtY = null;
		var tMapSC = null;
		var duration = 400;
		var animation = null;
		this.smoothAnimation = true;
		
		this.MoveToAnimation = function(MapPT, MapScale, pFinalFunc)
		{
			this.trigger("zoom-start");
			if (this.smoothAnimation && sg.fx)
			{
				if (animation)
					animation.stop();
				var centerX = this.getCenterX();
				var centerY = this.getCenterY();
				var curScale = this.getScale();
				var dx = MapPT.X - centerX;
				var dy = MapPT.Y - centerY;
				var tarRes = 1 / MapScale;
				var curRes = 1 / curScale;
				var dRes = tarRes - curRes;
				
				animation = sg.fx.createAnimation(
				{
					easing: sg.fx.easing.quadOut,
					duration: duration,
					type: sg.features.animationFrame ? "req" : "setTimeout",
					onAnimation: function(percent)
					{
						var tarRes = curRes + dRes * percent;
						var tx = centerX + dx * percent;
						var ty = centerY + dy * percent;
						that.putScale(1 / tarRes);
						that.MoveMapTo(tx, ty);
						that.RefreshMap(false);
						that.trigger("zoom");
					},
					onEnd:function()
					{
						that.putScale(MapScale);
						that.MoveMapTo(MapPT.X, MapPT.Y);
						that.RefreshMap(true);
						animation = null;
						that.trigger("zoom-end");
						if (pFinalFunc)
							pFinalFunc();
					}
				});
				animation.play();
			}
			else
			{
				tAnimationCanceled = false;
				tMapPtX = MapPT.X;
				tMapPtY = MapPT.Y;
				tMapSC = MapScale;
				if (tAnimationFunc != null)
					return;
				
				var TimeMove = function()
				{
					if (tAnimationCanceled)
					{
						tAnimationFunc = null;
						that.trigger("zoom-end");
						if (pFinalFunc)
							pFinalFunc();
						return;
					}
					var centerX = this.getCenterX();
					var centerY = this.getCenterY();
					var curScale = this.getScale();
					if (this.FromMapDistX(Math.abs(centerX - tMapPtX)) >= 5 || this.FromMapDistY(Math.abs(centerY - tMapPtY)) >= 5 || Math.abs(Math.log(curScale / tMapSC)) >= .03125)
					{
						this.putScale(2 / (1 / curScale + 1 / tMapSC));
						
						if (curScale != this.getScale())
						{
							this.MoveMapTo((centerX + tMapPtX) / 2, (centerY + tMapPtY) / 2);
							this.RefreshMap(false);
							tAnimationCanceled = false;
							tAnimationFunc = setTimeout(FuncAdapter(this, TimeMove), 60);
							that.trigger("zoom");
							return;
						}
					}
					this.putScale(tMapSC);
					this.MoveMapTo(tMapPtX, tMapPtY);
					this.RefreshMap(true);
					tAnimationCanceled = false;
					tAnimationFunc = null;
					that.trigger("zoom-end");
					if (pFinalFunc)
						pFinalFunc();
				};
				TimeMove.call(this);
			}
		};
		var mAngle = 0;
		this.getAngle = function()
		{
			return mAngle;
		};
		this.tm;
		this.onsetAngle = false;
		this.setAngle = function(angle)
		{
			if (sg.features.cssTransform && sg.isNumber(angle))
			{
				that.onsetAngle = true;
				var oldAngle = mAngle;
				mAngle = angle;
				var tstr = "rotate(" + mAngle + "deg)";
				layerContainer.style.transform = tstr;
				layerContainer.style["-webkit-transform"] = tstr;
				layerContainer.style["-ms-transform"] = tstr;
				this.trigger("angle-changed", {oldAngle:oldAngle, newAngle:mAngle});
			}
		};
		if (sg && sg.InfoWindow)
		{
			this.infoWindow = new sg.InfoWindow(null, infoNode);
			this.infoWindow.setMap(this);
		}
		if (sg && sg.GraphicsLayer)
		{
			var gfxSurface_ = sg.createSurface(layerContainer);
			if (gfxSurface_)
			{
				this.gfxSurface_ = gfxSurface_;
				this.gfxSurface_.element().style.overflow = "visible";
				this.drawingGraphicsLayer = new sg.GraphicsLayer;
				this.drawingGraphicsLayer.putTitle("Drawing Layer");
				this.drawingGraphicsLayer.putName("Drawing Layer");
				this.drawingGraphicsLayer.isDrawingLayer = true;
				this.AddLayer(this.drawingGraphicsLayer);
			}
		}
		if (sg && sg.SnappingManager)
			this.snappingManager = new sg.SnappingManager({map:this});
	},
	events:["load", "layer-add", "layer-remove", "layers-removed", "mousedown", "mouseup", "click", "mousemove", "mouseout", "mouseover", "touchstart", "touchend", "touchmove", "touchcancel", "dblclick", "drag-start", "drag", "drag-end", "angle-changed", "zoom-start", "zoom-end", "zoom"]
});

sg.Map = MapBase;
sg.MapBase = MapBase;
function MapPoint(dX, dY)
{
	this.X = dX;
	this.Y = dY;
	this.Diff = function(pt)
	{
		if (pt.constructor != MapPoint)
			return this;
		
		return new MapPoint(this.X - pt.X, this.Y - pt.Y);
	};
	this.Plus = function(pt)
	{
		if (pt.constructor != MapPoint)
			return this;
		
		return new MapPoint(this.X + pt.X, this.Y + pt.Y);
	};
	this.toString = function()
	{
		return this.X + " " + this.Y;
	};
}

function MapEnvelope(dLeft, dTop, dRight, dBottom)
{
	this.Left = dLeft;
	this.Top = dTop;
	this.Right = dRight;
	this.Bottom = dBottom;
	this.Extend = function(pEnv)
	{
		if (pEnv.constructor != MapEnvelope)
			return;
		
		if (pEnv.Left)
		{
			if (this.Left == null || this.Left > pEnv.Left == this.Right > this.Left)
				this.Left = pEnv.Left;
		}
		if (pEnv.Top)
		{
			if (this.Top == null || this.Top < pEnv.Top == this.Bottom < this.Top)
				this.Top = pEnv.Top;
		}
		if (pEnv.Right)
		{
			if (this.Right == null || this.Right < pEnv.Right == this.Left < this.Right)
				this.Right = pEnv.Right;
		}
		if (pEnv.Bottom)
		{
			if (this.Bottom == null || this.Bottom > pEnv.Bottom == this.Top > this.Bottom)
				this.Bottom = pEnv.Bottom;
		}
	};
	this.Shrink = function(pEnv)
	{
		if (pEnv.constructor != MapEnvelope)
			return;
		
		if (pEnv.Left)
		{
			if (this.Left == null || this.Left < pEnv.Left == this.Right > this.Left)
				this.Left = pEnv.Left;
		}
		if (pEnv.Top)
		{
			if (this.Top == null || this.Top > pEnv.Top == this.Bottom < this.Top)
				this.Top = pEnv.Top;
		}
		if (pEnv.Right)
		{
			if (this.Right == null || this.Right > pEnv.Right == this.Left < this.Right)
				this.Right = pEnv.Right;
		}
		if (pEnv.Bottom)
		{
			if (this.Bottom == null || this.Bottom < pEnv.Bottom == this.Top > this.Bottom)
				this.Bottom = pEnv.Bottom;
		}
	};
	
	this.toString = function()
	{
		return Math.min(this.Left, this.Right) + " " + Math.min(this.Top, this.Bottom) + "," + Math.max(this.Left, this.Right) + " " + Math.max(this.Top, this.Bottom);
	};
}