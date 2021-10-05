
/* eslint-disable */

// function DeviceTest()
// {
// //MSIE, Firefox, Chrome, Safari, Opera, Gecko, Presto, Mozilla
// 	var agent=navigator.userAgent.toLowerCase();
// 	if(agent.indexOf("msie") > 0 && document.all)
// 		return "MSIE";
// 	else if(agent.indexOf("firefox") > 0)
// 		return "Firefox";
// 	else if(agent.indexOf("chrome") > 0)
// 		return "Chrome";
// 	else if(agent.indexOf("safari") > 0)
// 		return "Safari";
// 	else if(agent.indexOf("opera") > 0)
// 		return "Opera";
// 	else if(agent.indexOf("camino") > 0)
// 		return "Camino";
// 	else if(agent.indexOf("gecko") > 0)
// 		return "Gecko";
// 	else if(agent.indexOf("trident") > 0)
// 		return "Trident";
// 	else if(agent.indexOf("mozilla") > 0)
// 		return "Mozilla";
// 	return null;
// }

// Object.forEachKeys = function(obj, f)
// {
// 	Object.keys(obj).forEach(function(k, i) {
// 		f.call(obj, obj[k], k, i);
// 	});
// }

// Location.prototype.getParameter = function (parameterName) {
// 	var result = this.search.substr(1).split("&")
// 		.map(function(item) { return item.split("="); })
// 		.find(function (item) { return item[0] === parameterName; });
// 	if (result)
// 		return decodeURIComponent(result[1]);
// 	return null;
// }

// Location.prototype.pathInfo = function(exeApp)
// {
// 	var aPath = window.location.pathname.split("/");
// 	var nPageIndex = 0;
// 	for (nPageIndex = 0 ; nPageIndex < aPath.length ; nPageIndex++)
// 		if (aPath[nPageIndex].toLowerCase() == exeApp)
// 			return aPath.slice(nPageIndex + 1);
// 	return null;
// }

// Object.defineProperty(Array.prototype, "equals", { value : function(another) {
// 	if (another == null)
// 		return false;
// 	if (this.length != another.length)
// 		return false;
// 	for (var i in another)
// 	{
// 		if (this[i] != another[i])
// 			return false;
// 	}
// 	return true;
// } });
    
// Function.prototype.derive = function (destClass)
// {
// 	destClass.prototype = new this;
// 	//for (var m in this) { if (this.hasOwnProperty(m)) destClass[m] = this[m]; }
// 	return destClass;
// }
// Function.prototype.public = function (baseClass) { baseClass.derive(this); return this; }
// Date.prototype.customBaseYear = 1911;
// Date.prototype.format = function(format) //author: meizz
// {
// 	if (isNaN(this.getTime()))
// 		return "NaN";
// 	var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// 	var weekshort = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
// 	var month = ['January', 'February', 'March', 'April', 'May', '	June', 'July', 'August', 'September', 'October', 'November', 'December'];
// 	var monthshort = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
// 	var o = {
// 		"[yY]+": function(f) { return f == 1 || f == 2 ? this.getFullYear() % 100 : this.getFullYear(); },
// 		"C+": function(f) { return this.getFullYear() - this.customBaseYear; },
// 		"q+": function(f) { return Math.floor((this.getMonth() + 3) / 3); },  //quarter
// 		"M+": function(f) { return f == 4 ? month[this.getMonth()] : f == 3 ? monthshort[this.getMonth()] : this.getMonth() + 1; }, //month
// 		"[dD]+": function(f) { return f == 4 ? week[this.getDay()] : f == 3 ? weekshort[this.getDay()] : this.getDate(); },    //day
// 		"h+": function(f) { return (this.getHours() - 1) % 12 + 1; },   //hour
// 		"H+": function(f) { return this.getHours(); },   //hour
// 		"m+": function(f) { return this.getMinutes(); }, //minute
// 		"s+": function(f) { return this.getSeconds(); }, //second
// 		"S": function(f) { return this.getMilliseconds(); }, //millisecond
// 	}
// 	var mtchs = [];
// 	for (var k in o)
// 	{
// 		var v = o[k];
// 		var re = new RegExp("(" + k + ")", "g");
// 		var arr = null;
// 		while ((arr = re.exec(format)) != null)
// 		{
// 			var m = { s: arr.index, l: arr[0].length };
// 			var d = v.call(this, m.l);
// 			if (m.l > 1 && !(d instanceof String))
// 				d = ("0000" + d).substr(4 - Math.max(0, m.l - ("" + d).length))
// 			m.v = d;
// 			if (d)
// 				mtchs.push(m);
// 		}
// 	}
// 	mtchs.sort(function (a, b) { return a.s > b.s ? -1 : 1; });
// 	mtchs.forEach(function (m) { format = format.substr(0, m.s) + m.v + format.substr(m.s + m.l); });
// 	return format;
// }
// Date.prototype.toString = function()
// {
// 	return this.format("yyyy/MM/dd");
// }
// Date.prototype.addDiff = function (type, diff)
// {
// 	if (isNaN(this.getTime()))
// 		return this;
// 	switch (type)
// 	{
// 		case "y":
// 			return new Date(this.getFullYear() + diff, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
// 		case "M":
// 			var nmth = (this.getMonth() + diff) % 12
// 			var ndt = new Date(this.getFullYear(), this.getMonth() + diff, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
// 			while (ndt.getMonth() != nmth)
// 				ndt = ndt.addDiff("d", -1);
// 			return ndt;
// 		case "d":
// 			return new Date(this.getTime() + diff * 24 * 3600000);
// 		case "H":
// 			return new Date(this.getTime() + diff * 3600000);
// 		case "m":
// 			return new Date(this.getTime() + diff * 60000);
// 		case "s":
// 			return new Date(this.getTime() + diff * 1000);
// 	}
// 	return this;
// }
// Date.prototype.diff = function (type, other)
// {
// 	if (isNaN(this.getTime()) || isNaN(other.getTime()))
// 		return this;
// 	var diff = 0
// 	switch (type)
// 	{
// 		case "y":
// 			diff = other.getFullYear() - this.getFullYear();
// 			break;
// 		case "M":
// 			diff = other.getMonth() - this.getMonth();
// 			break;
// 		case "d":
// 			return Math.floor((other.getTime() - this.getTime()) / 86400000);
// 		case "H":
// 			return Math.floor((other.getTime() - this.getTime()) / 3600000);
// 		case "m":
// 			return Math.floor((other.getTime() - this.getTime()) / 60000);
// 		case "s":
// 			return Math.floor((other.getTime() - this.getTime()) / 1000);
// 	}
// 	if (diff == 0)
// 		return 0;	
// 	var n = other.getTime() - this.addDiff(type, diff).getTime();
// 	return diff + (n * diff >= 0 ? 0 : diff > 0 ? -1 : 1);
// }

// //Array.prototype.recursive = function(m, itemCB, arrayCB, resoultCB)
// //{
// //	var r = null;
// //	if (this.length > 0 && this[0] instanceof Array)
// //		r = this[m](i => i.recursive(m, itemCB, arrayCB));
// //	else if (arrayCB != null)
// //		r = arrayCB(this);
// //	else if (itemCB != null)
// //		r = this[m](itemCB);
// //	if (r == null)
// //		r = this;
// //	if (resoultCB)
// //		return resoultCB(r);
// //	return r;
// //}

// if (!('sinh' in Math))
// 	Math.sinh = function(x) {var y = Math.exp(x); return (y - 1 / y) / 2;}
// if (!('cosh' in Math))
// 	Math.cosh = function(x) {var y = Math.exp(x); return (y + 1 / y) / 2;}
// if (!('limits' in Math))
// 	Math.limits = function (v, minv, maxv) { return Math.max(minv, Math.min(maxv, v)); }
// if (!('hypot' in Math))
// 	Math.hypot = function ()
// 	{
// 		var dSum = 0;
// 		for (var i in arguments)
// 			dSum += arguments[i] * arguments[i];
// 		return Math.sqrt(dSum);
// 	};
// if (!('_hypot' in Math))
// 	Math._hypot = Math.hypot;
	
// function Color()
// {
// 	var m_R = 0;
// 	var m_G = 0;
// 	var m_B = 0;
// 	var m_A = 0;
	
// 	function parseNumber(v)
// 	{
// 		if (typeof v === "string" || v instanceof String)
// 		{
// 			if (v.substr(0, 1) == '#')
// 				return parseInt(v.substr(1), 16);
// 			else if (v.substr(0, 2) == '0x')
// 				return parseInt(v.substr(2), 16);
// 			return parseFloat(v);
// 		}
// 		return v;
// 	}
// 	function ArrayValue(valarr, func)
// 	{
// 		var i = valarr.length - 3;
// 		if (i == 1)
// 			m_A = func(valarr[0]);
// 		m_R = func(valarr[0 + i]);
// 		m_G = func(valarr[1 + i]);
// 		m_B = func(valarr[2 + i]);
// 	}
	
// 	this.fromString = function(arg)
// 	{
// 		if (!arg || arg.length == 0) 
// 			return this;
// 		if (arg.substr(0, 1) == '#')
// 		{
// 			var valarr = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i.exec(arg);
// 			if (valarr != null)
// 				ArrayValue(valarr.filter(function(x, i) { return i != 0 && x;}), function(v) { return parseInt(v, 16) * 0x11; });
// 			else
// 			{
// 				var valarr = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(arg);
// 				if (valarr != null)
// 					ArrayValue(valarr.filter(function(x, i) { return i != 0 && x;}), function(v) { return parseInt(v, 16); });
// 			}
// 		}
// 		else
// 		{
// 			var valarr = /^rgb\(?\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)?$/.exec(arg);
// 			if (valarr == null)
// 				valarr = /^argb\(?\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)?$/.exec(arg);
// 			if (valarr != null)
// 				ArrayValue(valarr.filter(function(x, i) { return i != 0 && x;}), function(v) { return parseInt(v) });
// 		}
// 		return this;
// 	}

// 	this.fromRGB = function(arg)
// 	{
// 		if (arguments.length > 1)
// 			ArrayValue(arguments, parseNumber);
// 		else if (typeof arg === "array" || arg instanceof Array)
// 			ArrayValue(arg, parseNumber);
// 		else
// 		{
// 			if ("a" in arg)
// 				m_A = parseNumber(arg.a);
// 			if ("r" in arg)
// 				m_R = parseNumber(arg.r);
// 			if ("g" in arg)
// 				m_G = parseNumber(arg.g);
// 			if ("b" in arg)
// 				m_B = parseNumber(arg.b);
// 		}
// 		return this;
// 	}

// //	this.fromHSL = function()
// //	{
// //	}

// 	this.fromHSV = function(arg)
// 	{
// 		if (arguments.length === 3)
// 			arg = { h: parseNumber(arguments[0]), s: parseNumber(arguments[1]), v: parseNumber(arguments[2]) };
// 		arg.h /= 360;
// 		arg.s /= 100;
// 		arg.v /= 100;
	    
// 		var i = Math.floor(arg.h * 6);
// 		var f = arg.h * 6 - i;
// 		var vals = [1 - (1 - f) * arg.s, 1 - arg.s, 1 - f * arg.s].slice(i % 2, i % 2 + 2);
// 		vals = [].concat(1, vals, 1, vals).slice(3 - Math.round((i % 6) / 2));
// 		m_R = Math.min(255, Math.round(vals[0] * arg.v * 256));
// 		m_G = Math.min(255, Math.round(vals[1] * arg.v * 256));
// 		m_B = Math.min(255, Math.round(vals[2] * arg.v * 256));
// 		return this;
// 	}
	
// 	this.toHEX = function()
// 	{
// 		return '#' + (0x1000000 + ((m_R << 16) | (m_G << 8) | m_B)).toString(16).slice(1).toUpperCase();
// 		//return "#" + [m_R, m_G, m_B].map(function(x) { return (0x100 + (c % 0x100)).toString(16).slice(1); }).join("");
// 	}
	
// 	this.toARGB = function()
// 	{
// 		return { a: m_A, r: m_R, g: m_G, b: m_B}
// 	}
	
// 	this.toHSV = function()
// 	{
// 		var max = Math.max(Math.max(m_R, m_G), m_B);
// 		var min = Math.min(Math.min(m_R, m_G), m_B);
// 		var d = max - min;
// 		var h = (d == 0 ? 0 : 
// 				max == m_R ? (m_G - m_B) / d : 
// 				max == m_G ? (m_B - m_R) / d + 2 : 
// 				max == m_B ? (m_R - m_G) / d + 4 : 0) / 6;
// 		if (h < 0)
// 			h += 1;
// 		return { h: h * 360, s: (max === 0 ? 0 : d / max) * 100, v: max / 255 * 100 };
// 	}
// }

// Object.defineProperty(Color.prototype, "luminance", { get: function () {
// 		var rgba = this.toARGB();
// 		var r = { r: .2126, g: .7152, b: .0722};
// 		return Object.keys(r).reduce(function(o, k) {
// 			var v = rgba[k] / 255;
// 			return o + r[k] * (v < .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4));
// 		}, 0);
//     } });
// Object.defineProperty(Color.prototype, "toConstract", { value: function () {
// 		if (this.luminance < 0.179128784747792)
// 			return new Color().fromRGB(255, 255, 255);
// 		return new Color().fromRGB(0, 0, 0);
//     } });

// function GetOffset(pObj)
// {
// 	var dX = 0;
// 	var dY = 0;
// 	while (pObj != null)
// 	{
// 		if ("offsetLeft" in pObj)
// 			dX += pObj.offsetLeft - pObj.scrollLeft;
// 		if ("offsetTop" in pObj)
// 			dY += pObj.offsetTop - pObj.scrollTop;
// 		pObj = pObj.offsetParent;
// 	}
// 	return {X:dX, Y:dY};
// }

// function FuncAdapter(pCaller, pFunc)
// {
// 	return function(pEvent)
// 	{
// 		return pFunc.call(pCaller, pEvent);
// 	};
// }

// function SystemEvent(targetObj, actEvent)
// {
// 	var se = "on" + actEvent;
// 	var m = null;
// 	for (m in targetObj)
// 		if (m == se)
// 			return true;
// 	return false;
// }

// function AttachEvent(targetObj, actEvent, actFunc, useCapture)
// {
// 	if (targetObj.addEventListener)
// 	{
// 		if (actEvent == "mousewheel" && DeviceTest() == 'Firefox')
// 			actEvent = "DOMMouseScroll";
// 		if (useCapture)
// 			targetObj.ownerDocument.addEventListener(actEvent, actFunc, useCapture);
// 		else
// 			targetObj.addEventListener(actEvent, actFunc, useCapture);
// 	}
// 	else if (targetObj.attachEvent)
// 	{
// 		if (SystemEvent(targetObj, actEvent))
// 			targetObj.attachEvent(se, actFunc);
// 		else
// 		{
// 			if (!targetObj[actEvent])
// 				targetObj[actEvent] = 1;
// 			actFunc._wrapfunc = function (pEvent)
// 			{
// 				if (pEvent.propertyName == actEvent)
// 					actFunc(pEvent);
// 			}
// 			targetObj.attachEvent("onpropertychange", actFunc._wrapfunc);
// 		}
// 		if (useCapture)
// 			targetObj.setCapture();
// 	}
// 	return { 
// 		raise: function(customDetail) { FireEvent(targetObj, actEvent, customDetail); },
// 		detach: function() { DetachEvent(targetObj, actEvent, actFunc, useCapture); },
// 	}
// }

// function DetachEvent(targetObj, actEvent, actFunc, useCapture)
// {
// 	if (targetObj.removeEventListener)
// 	{
// 		if (actEvent == "mousewheel" && DeviceTest() == 'Firefox')
// 			actEvent = "DOMMouseScroll";
// 		if (useCapture)
// 			targetObj.ownerDocument.removeEventListener(actEvent, actFunc, useCapture);
// 		else
// 			targetObj.removeEventListener(actEvent, actFunc, useCapture);
// 	}
// 	else if (targetObj.detachEvent)
// 	{
// 		targetObj.detachEvent("on" + actEvent, actFunc);
// 		if (actFunc._wrapfunc)
// 			targetObj.detachEvent("onpropertychange", actFunc._wrapfunc);
// 		if (useCapture)
// 			targetObj.releaseCapture();
// 	}
// }

// function FireEvent(targetObj, actEvent, customDetail)
// {
// 	var pDoc = targetObj.ownerDocument || targetObj.document || null;
// 	if (pDoc == null)
// 		return;
// 	if (targetObj.dispatchEvent)
// 	{
// 		if (actEvent == "mousewheel" && DeviceTest() == 'Firefox')
// 			actEvent = "DOMMouseScroll";

// 		var pEvent = null;
// 		if (customDetail != null)
// 		{
// 			//pEvent = new CustomEvent(actEvent, { "detail": customDetail, "bubbles": false, "cancelable": false });
// 			var pEvent = document.createEvent("CustomEvent");
// 			if (pEvent)
// 				pEvent.initCustomEvent(actEvent, false, false, customDetail);
// 		}
// 		else
// 		{
// 			pEvent = pDoc.createEvent("UIEvents");
// 			if (pEvent)
// 				pEvent.initEvent(actEvent, false, false);
// 		}
// 		if (pEvent)
// 			targetObj.dispatchEvent(pEvent);
// 	}
// 	else if (targetObj.fireEvent)
// 	{
// 		targetObj[actEvent]++;
// 		var pEvent = pDoc.createEventObject();
// 		targetObj.fireEvent("on" + actEvent, pEvent);
// 	}
// }

// function Inherit(pParent, pChild)
// {
// 	if (!pParent.Inherits)
// 	{
// 		pParent.Inherits = new Array();
// 		pParent.ParseTest = function (testElem)
// 		{
// 			var pInhs = pParent.Inherits;
// 			if (pInhs)
// 			{
// 				for (var i in pInhs)
// 				{
// 					if (pInhs[i].ParseTest)
// 					{
// 						var pObj = pInhs[i].ParseTest(testElem);
// 						if (pObj != null)
// 							return pObj;
// 					}
// 				}
// 			}
// 			if (pParent.TestTags)
// 				return pParent.TestTags(testElem);
// 			return null;
// 		}
// 	}
// 	pParent.Inherits.push(pChild);
// }

// function Implement(pBase, parseTags)
// {
// 	pBase.ParseTest = function (testElem)
// 	{
// 		return pBase.TestTags(testElem);
// 	}
// 	pBase.TestTags = function (testElem)
// 	{
// 		if (testElem == null)
// 			return null;
// 		var testTag = testElem.localName;
// 		var testNSURI = testElem.namespaceURI;
// 		if (parseTags.constructor != Array)
// 			parseTags = [parseTags];
// 		for (var i in parseTags)
// 		{
// 			var pTag = parseTags[i];
// 			if (pTag.constructor == String)
// 			{
// 				if (testTag == pTag)
// 					return new pBase(testElem);
// 			}
// 			else
// 			{
// 				if (testTag == pTag.tag && testNSURI == pTag.nsuri)
// 					return new pBase(testElem);
// 			}
// 		}
// 		return null;
// 	}
// }

// function SetObj(pObj1, pObj2)
// {
// 	if (pObj2 == null)
// 		return pObj1;
// 	return pObj2;
// }

// function AddObjArray(pObjs, pObj)
// {
// 	if (pObj != null)
// 	{
// 		if (pObjs == null)
// 			pObjs = new Array();
// 		pObjs.push(pObj)
// 	}
// 	return pObjs;
// }

// function FormatDegrees(dDegrees, positive, negative, e)
// {
// 	var v = Math.abs(dDegrees);
// 	var Deg = Math.floor(v);
// 	v = (v - Deg) * 60;
// 	var Minute = Math.floor(v);
// 	var Second = (v - Minute) * 60;
// 	var strTmp = Deg + "\u02DA";
// 	if (Minute != 0 || Second != 0)
// 	{
// 		strTmp += Minute + "\u2019";
// 		if (Second != 0)
// 		{
// 			if (Math.abs(Second - Math.floor(Second)) < 0.01)
// 				strTmp += Math.floor(Second) + "\u201D";
// 			else
// 				strTmp += Second.toFixed(e || 2) + "\u201D";
// 		}
// 	}
// 	return strTmp + (dDegrees < 0 ? negative : positive);
// }

// function GetTickCount()
// {
// 	var pDate = new Date();
// 	var ntick = pDate.valueOf();
// 	// delete pDate;
// 	return ntick;
// }

// var SuperGIS = new function ()
// {
// 	var _NS_ = this;
// 	this.Debug = function (bDebug)
// 	{
// 		var pErrorFunc = function (sMsg, sUrl, sLine)
// 		{
// 			//var p = new SWGPanel(window.document.body, 0, true, true);
// 			//var pM = p.getMainFrame()
// 			//pM.style.position = "absolute";
// 			//pM.style.top = 0
// 			//pM.style.right = 0;
// 			//pM.style.width = "250px";
// 			//pM.style.height = 0;
// 			//var pDiv = p.getViewFrame();
// 			//pDiv.style.textAlign = "left";
// 			//pDiv.innerHTML = "Error: " + sMsg + "<br>Line: " + sLine + "<br>URL: " + sUrl + "<br>";
// 			//return true;
// 			console.log("Error: " + sMsg + "\r\nLine: " + sLine + "\r\nURL: " + sUrl);
// 		}
// 		var pUnload = function ()
// 		{
// 			DetachEvent(window, "error", pErrorFunc);
// 			DetachEvent(window, "unload", pUnload);
// 		}

// 		if (bDebug)
// 		{
// 			AttachEvent(window, "unload", pUnload);
// 			AttachEvent(window, "error", pErrorFunc);
// 		}
// 		else
// 		{
// 			pUnload();
// 		}
// 	}

// 	var m_strServicePath = null;
// 	var m_Modules = {};
// 	Object.defineProperty(this, 'ServicePath', { get: function() { return m_strServicePath; } });
// 	this.Initialize = function (strServicePath, funcCallback)
// 	{
// 		m_strServicePath = strServicePath;
// 		var n = 0;
// 		function Loaded()
// 		{
// 			n++;
// 			if (n == 13)
// 				funcCallback();
// 		}
// 		this.LoadModule("scripts/AjaxAgent.js", Loaded);
// 		this.LoadModule("scripts/CoordSys.js", Loaded);
// 		this.LoadModule("scripts/Projection.js", Loaded);
// 		this.LoadModule("scripts/Base64.js", Loaded);
// 		this.LoadModule("scripts/Geometry.js", Loaded);
// 		this.LoadModule("scripts/Graphic.js", Loaded);
// 		this.LoadModule("scripts/Render.js", Loaded);
// 		this.LoadModule("scripts/EPSG.js", Loaded);
// 		this.LoadModule("scripts/Tracker.js", Loaded);
// 		this.LoadModule("scripts/Window.js", Loaded);
// 		this.LoadModule("scripts/Interpolation.js", Loaded);
// 		this.LoadModule("scripts/earcut.js", Loaded);
// 		this.LoadModule("scripts/suncalc.js", Loaded);
// 	}

// 	function LoadScript(sSrc, pFunc)
// 	{
// 		var bLoaded = false;
// 		var pScp = document.createElement("script");
// 		function readystatechanged()
// 		{
// 			if (pScp.readyState == "loaded")
// 				Loaded();
// 		}
// 		function Loaded()
// 		{
// 			bLoaded = true;
// 			if (pFunc)
// 				pFunc.call(pScp);
// 			DetachEvent(pScp, "readystatechange", readystatechanged, false);
// 			DetachEvent(pScp, "load", Loaded, false);
// 		}
// 		AttachEvent(pScp, "readystatechange", readystatechanged, false);
// 		AttachEvent(pScp, "load", Loaded, false);
// 		document.body.appendChild(pScp);
// 		pScp.type = "text/javascript";
// 		pScp.src = sSrc;
// 	}

// 	this.LoadModule = function (strScriptName, funcCallback)
// 	{
// 		if (self.importScripts)
// 		{
// 			self.importScripts(m_strServicePath + strScriptName);
// 			if (funcCallback)
// 				funcCallback.call(null);
// 			return;
// 		}
// 		if (m_Modules[strScriptName])
// 		{
// 			if (funcCallback)
// 				funcCallback.call(m_Modules[strScriptName]);
// 			return;
// 		}
// 		LoadScript(m_strServicePath + strScriptName, function ()
// 		{
// 			m_Modules[strScriptName] = this;
// 			if (funcCallback)
// 				funcCallback.call(this);
// 		});
// 	}

// 	this._EventTarget = function (pNode)
// 	{
// 		var _InnerEvent = null;
// 		var pEventObj = pNode;
// 		if (pEventObj == null)
// 		{
// 			_InnerEvent = document.createElement("div");
// 			_InnerEvent.style.display = "none";
// 			document.body.appendChild(_InnerEvent);
// 			pEventObj = _InnerEvent;
// 		}
// 		this.destroy = function ()
// 		{
// 			if (_InnerEvent == null)
// 				return;
// 			document.body.removeChild(_InnerEvent);
// 			_InnerEvent = null;
// 			pEventObj = null;
// 		}
// 		this.addEventListener = function (actEvent, actFunc, useCapture)
// 		{
// 			AttachEvent(pEventObj, actEvent, actFunc, useCapture);
// 		}
// 		this.removeEventListener = function (actEvent, actFunc, useCapture)
// 		{
// 			DetachEvent(pEventObj, actEvent, actFunc, useCapture);
// 		}
// 		this.raiseEvent = function (actEvent, customDetail)
// 		{
// 			FireEvent(pEventObj, actEvent, customDetail);
// 		}
// 	}

// 	this._EnumType = function _EnumType(sText)
// 	{
// 		var m_value = 0;
// 		//var m_text = enumArray[0];

// 		//this.getText = function() {return m_text;};
// 		//this.setText = function(val) {m_text = val;};
// 		this.toString = function () { return this.constructor._enum[m_value]; };
// 		this.valueOf = function () { return m_value; }

// 		if (sText == null)
// 			return;
// 		for (var i in this.constructor._enum)
// 		{
// 			if (sText == this.constructor._enum[i])
// 			{
// 				m_value = i;
// 				//m_text = sText;
// 				break;
// 			}
// 		}
// 	};
// 	this._EnumType.Enum = function (eValues, pEnum)
// 	{
// 		if (pEnum == null)
// 			pEnum = function (sValue) { SuperGIS._EnumType.call(this, sValue); };
// 		else if (pEnum.constructor == String)
// 			pEnum = function () { SuperGIS._EnumType.call(this, pEnum); };
// 		//pEnum = SuperGIS._EnumType.derive(pEnum);
// 		pEnum._enum = eValues;
// 		for (var i in eValues)
// 		{
// 			if (eValues[i].constructor == String)
// 				pEnum[eValues[i]] = i;
// 			else
// 				pEnum[eValues[i].name] = eValues[i].value;
// 		}
// 		return pEnum;
// 	}

// 	this._ListType = function (sText, separator, funcItem)
// 	{
// 		if (sText == null)
// 			return;
// 		var m_list = sText.split(separator);
// 		for (var i in m_list)
// 		{
// 			var str = m_list[i];
// 			if (str.length > 0)
// 			{
// 				if (funcItem)
// 					str = funcItem(str);
// 				if (str != null)
// 					this.push(str);
// 			}
// 		}
// 	}

// 	this.AnimationFrame = function (aniFunc)
// 	{
// 		var pThis = this;
// 		var timeInterval = 30;
// 		var bContinue = false;
// 		var post =
// 			window.requestAnimationFrame ||
// 			window.mozRequestAnimationFrame ||
// 			window.webkitRequestAnimationFrame ||
// 			window.oRequestAnimationFrame ||
// 			window.msRequestAnimationFrame ||
// 			function (callback) { setTimeout(callback, timeInterval); };

// 		this.action = function ()
// 		{
// 			if (bContinue)
// 				return;
// 			bContinue = true;
// 			tick();
// 		}

// 		this.cut = function ()
// 		{
// 			bContinue = false;
// 		}

// 		this.isRunning = function () { return bContinue; }

// 		function tick()
// 		{
// 			if (!bContinue)
// 				return;
// 			post(tick);
// 			if (aniFunc)
// 				aniFunc(pThis);
// 		}
// 	}

// 	this.AlphaAnimation = function (pDiv, minAlpha, maxAlpha, duration)
// 	{
// 		var divalphaT = minAlpha;
// 		var divalpha = minAlpha;
// 		var speed = 1;
// 		if (duration)
// 			speed = (maxAlpha - minAlpha) / duration;
// 		function setDivAlpha(opac)
// 		{
// 			divalpha = opac;
// 			if ("opacity" in pDiv.style)
// 				pDiv.style.opacity = opac;
// 			else if ("MozOpacity" in pDiv.style)
// 				pDiv.style.MozOpacity = opac;
// 			else if ("filter" in pDiv.style)
// 				pDiv.style.filter = 'Alpha(Opacity=' + (opac * 100) + ')';
// 		}
// 		setDivAlpha(minAlpha);
// 		var lastTime = 0;
// 		function resetTime() { lastTime = (new Date()).getTime(); }
// 		resetTime();

// 		var alphaact = new _NS_.AnimationFrame(function (ani)
// 		{
// 			var dt = new Date().getTime();
// 			var dx = (dt - lastTime) / 1000;
// 			lastTime = dt;

// 			var i = dx * speed;
// 			if (Math.abs(divalphaT - divalpha) < i)
// 			{
// 				ani.cut();
// 				setDivAlpha(divalphaT)
// 				return;
// 			}
// 			if (divalphaT < divalpha)
// 				setDivAlpha(divalpha - i);
// 			else
// 				setDivAlpha(divalpha + i);
// 		});
// 		function funcMouseOver()
// 		{
// 			divalphaT = maxAlpha;
// 			resetTime();
// 			alphaact.action();

// 		}
// 		function funcMouseOut()
// 		{
// 			divalphaT = minAlpha;
// 			resetTime();
// 			alphaact.action();
// 		}
// 		AttachEvent(pDiv, "mouseover", funcMouseOver, false);
// 		AttachEvent(pDiv, "mouseout", funcMouseOut, false);

// 		var bEnable = true;
// 		this.getEnable = function () { return bEnable; };
// 		this.setEnable = function (v)
// 		{
// 			if (bEnable == v)
// 				return;
// 			bEnable = v;
// 			if (bEnable)
// 			{
// 				AttachEvent(pDiv, "mouseover", funcMouseOver, false);
// 				AttachEvent(pDiv, "mouseout", funcMouseOut, false);
// 				setDivAlpha(minAlpha);
// 			}
// 			else
// 			{
// 				DetachEvent(pDiv, "mouseover", funcMouseOver, false);
// 				DetachEvent(pDiv, "mouseout", funcMouseOut, false);
// 				setDivAlpha(1);
// 			}
// 		};
// 	}

// 	this.RecyclingArray = function ()
// 	{
// 		var m_LastID = 0;
// 		var m_IDs = [];
// 		var m_Datas = [];
// 		this.push = function (pData)
// 		{
// 			if (pData == null)
// 				return -1;
// 			var nID = m_IDs.shift();
// 			if (nID == undefined)
// 				nID = m_LastID++;
// 			m_Datas[nID] = pData;
// 			return nID;
// 		}
// 		this.pop = function (nID)
// 		{
// 			if (nID < 0)
// 				return null;
// 			var pData = m_Datas[nID];
// 			m_Datas[nID] = null;
// 			m_IDs.push(nID);
// 			return pData;
// 		}
// 	}

// 	this.WorkThread = function (pWorkFunc, pInitFunc, pFinalFunc)
// 	{
// 		var ThreadCallback = new _NS_.RecyclingArray();
// 		var m_pWorker = null;

// 		var m_Imports = [];
// 		this.Import = function (sScript)
// 		{
// 			m_Imports.push("importScripts('" + sScript + "');\r\n");
// 			this.Close();
// 		}

// 		var _Initialize = function ()
// 		{
// 			self.window = self;
// 			self.addEventListener('message', function (e)
// 			{
// 				var pCall = function (pData) { postMessage({ '_ID': e.data._ID, 'data': pData }); };
// 				var pArgs = e.data.data;
// 				if (pArgs.constructor != Array)
// 					pArgs = [pArgs];
// 				var pData = self._Works[(e.data._Name == null ? '_' : e.data._Name)].apply(pCall, pArgs);
// 				if (pData != undefined)
// 					pCall(pData);
// 			}, false);
// 			self._Works = {};
// 		}
// 		var m_Works = ["(" + _Initialize.toString() + ")();\r\n"];
// 		if (pInitFunc != null)
// 			m_Works.push("(" + pInitFunc.toString() + ")();\r\n");
// 		m_Works.push("self._Works['_close'] = function() {self.close();};\r\n");
// 		this.AddWork = function (sName, pFunc)
// 		{
// 			m_Works.push("self._Works['" + (sName == null ? "_" : sName) + "'] = " + pFunc.toString() + ";\r\n");
// 			this.Close();
// 		};

// 		this.Create = function ()
// 		{
// 			var pScripts = m_Works;
// 			if (pFinalFunc != null)
// 				pScripts = m_Works.concat("postMessage({ '_ID': -2, 'data': null });\r\n");
// 			m_pWorker = new Worker(window.URL.createObjectURL(new Blob(m_Imports.concat(pScripts), { type: "text/javascript" })));
// 			AttachEvent(m_pWorker, "message", function (e)
// 			{
// 				var pMsg = e.data;
// 				switch (pMsg._ID)
// 				{
// 					case -2:
// 						if (pFinalFunc != null)
// 							pFinalFunc.call(null, pMsg.data);
// 					case -1:
// 						break;
// 					default:
// 						{
// 							var pCallback = ThreadCallback.pop(pMsg._ID);
// 							if (pCallback != null)
// 								pCallback.Function.call(pCallback.Caller, pMsg.data);
// 						}
// 				}
// 			}, false)
// 		}

// 		this.Close = function ()
// 		{
// 			if (m_pWorker != null)
// 				this.Post("_close", null, m_pWorker, function () { this.terminate(); });
// 			m_pWorker = null;
// 		}

// 		this.Post = function (sName, pData, pCaller, pFunction)
// 		{
// 			if (m_pWorker == null)
// 				this.Create();
// 			var pMsg = { "_Name": sName, "_ID": ThreadCallback.push({ "Caller": pCaller, "Function": pFunction }), "data": pData };
// 			m_pWorker.postMessage(pMsg);
// 		}
// 		if (pWorkFunc != null)
// 			this.AddWork(null, pWorkFunc);
// 	}
// }

/*=============================== */ 

var pMapService = [];
		var ft, gpanTool;
		var staticCustom = {
			"TOC": { title: "Layers", desc: "Layers", init: function () { CustomClick(this, LayerInfoTool, MSC.MapperConfig.WebMapperStyle.TableContents); } },
			"Custom": { title: "Custom Menu", desc: "Custom Menu", init: function () { CustomClick(this, CustomTool, "Dialog"); } },
			"Basemap": { title: "BaseMap", desc: "BaseMap", init: function () { CustomClick(this, BaseMapTool, "Dialog"); } },
			"Bookmark": { title: "Bookmark", desc: "Bookmark", init: function () { CustomClick(this, BookMarkTool, "Dialog"); } },
			"Draw": { title: "Draw", desc: "Draw", init: function () { CustomClick(this, DrawTool, "Dialog"); } },
			"Measure": { title: "Measure", desc: "Measure", init: function () { CustomClick(this, MeasureTool, "Dialog"); } },
			"Query": { title: "Query", desc: "Query", init: function () { CustomClick(this, FindTool, "Popup"); } },
			"Edit": { title: "Edit", desc: "Edit", init: function () { CustomClick(this, EditTool, "Popup"); } },
			"Geo-process": { title: "Process", desc: "Process", init: function () { CustomClick(this, ProcessTool, "Popup"); } },
			"Print": { title: "Print", desc: "Print", init: function () { CustomClick(this, PrintTool, "Popup"); } },
			"CoordinateSys": { title: "Set CRS", desc: "Set CRS" }
		}

		var MapSiteConfigDefine = ["Name",
			{
				Obj: "MapperConfig", Params: ["Title", "sTitle", "Logo", "Coordinate",
					{ Objs: "MapSource", Sub: "Source", Params: ["Name", "Coordinate", "Url", "UserPass", "CoordinatePRJ"] },
					{ Obj: "WebMapperStyle", Params: ["TableContents", { Obj: "ColorStyle", Params: ["Text", "Header", "Button"] }, "View"] },
					{ Obj: "Widget", Params: [{ Strings: "DefaultTools" }, { Strings: "CustomTools" }] },
					{ Obj: "CurrentExtent", Params: [{ Float: "CenterX" }, { Float: "CenterY" }, { Float: "Scale" }] },
					{
						Obj: "DefaultToolOption", Params: [
							{ Objs: "Identify", Sub: "iItem", Params: ["ServiceId", "LayerName"] },
							{ Obj: "Coordinate", Params: ["Unit", { Int: "Decimal" }] },
							"IndexMap",
							{ Obj: "ScaleBar", Params: ["ScaleUnit", "ScaleStyle"] }
						]
					},
					{
						Obj: "CustomToolOption", Params: [
							{ Objs: "BaseMap", Sub: "Item", Params: ["Type", "Title", "Description", "Key", "OgcType", "Url", "LayerName", "ImageFormat", "SRS", "TMS", "UserName", "UserPass", "DataString"] },
							{ Objs: "BookMark", Sub: "Item", Params: ["Title", "Description", "Type", "Src", { Float: "CenterX" }, { Float: "CenterY" }, { Float: "Scale" }, { Float: "Left" }, { Float: "Top" }, { Float: "Right" }, { Float: "Bottom" }] },
							{ Obj: "Measure", Params: [{ Strings: "SelectLMeasure" }, { Strings: "SelectAMeasure" }] },
							{ Obj: "Swipe", Params: ["SwipeStyle", "SelectLayer1", "SelectLayer2"] },
							"LayerList",
							"Draw",
							{ Obj: "CoordinateSys", Params: ["TransCoordName", "TransCoordPRJ", "CoordSevenPar"] },
						]
					}
				]
			}
		];
		function XML2Obj(pNode, props)
		{
			if (pNode == null)
				return null;
			var pObj = {};
			props.forEach(function (e)
			{
				var sTag = null;
				var pCnv = null;
				if (e.constructor === String)
				{
					sTag = e;
				}
				else if ("Obj" in e)
				{
					sTag = e.Obj;
					pCnv = function (ep) { return XML2Obj(ep, e.Params); };
				}
				else if ("Objs" in e)
				{
					sTag = e.Objs;
					pCnv = function (ep)
					{
						var pSub = FindXMLNodes(ep, e.Sub);
						if (pSub == null)
							return null;
						return pSub.map(function (epp) { return XML2Obj(epp, e.Params); });
					};
				}
				else if ("Float" in e)
				{
					sTag = e.Float;
					pCnv = function (ep) { return parseFloat(GetXMLNodeText(ep)); }
				}
				else if ("Int" in e)
				{
					sTag = e.Int;
					pCnv = function (ep) { return parseInt(GetXMLNodeText(ep)); }
				}
				else if ("Strings" in e)
				{
					sTag = e.Strings;
					pCnv = function (ep)
					{
						var s = GetXMLNodeText(ep);
						if (s == null)
							return null
						return s.split(",");
					}
				}

				var pEN = GetXMLChildNode(pNode, sTag);
				if (pCnv)
					pObj[sTag] = pCnv(pEN);
				else
					pObj[sTag] = GetXMLNodeText(pEN);
			});
			return pObj;
		}
		function ModifyStyleRule(sSelector, Style)
		{
			Array.from(document.styleSheets).forEach(function (ss)
			{
				try { Object.forEachKeys(ss.rules, function (o, r) { if (o.selectorText == sSelector) Object.forEachKeys(Style, function (s, m) { o.style[m] = s; }); }) }
				catch (e) { }
			})
		}
		DOMTokenList.prototype.switch = function (v, vs)
		{
			this.remove.apply(this, vs);
			this.add(v);
		}

		function onResize()
		{
			if (pMapBase)
				pMapBase.RefreshMap(false);
		}

		function LoadConfig()
		{
			SuperGIS.Initialize("/ServerGate/SGSGate.ashx?F=~/", function ()
			{
				SuperGIS.LoadModule("SGServer.js", function ()
				{
					var agent = new AjaxAgent(null, true, true);
					agent.Open("GET", "Config.xml?rnd=" + Math.random());
					agent.SendRequest(null, function (Res)
					{
						LoadMapSetConfig(Res.responseXML);
					}, null, function () { alert("Config.xml not found!"); });
				});
			});
		}

		function LoadMapSetConfig(xDoc)
		{
			MSC = XML2Obj(xDoc.documentElement, MapSiteConfigDefine);

			// document.getElementById("Title").textContent = MSC.MapperConfig.Title;
			// document.getElementById("SubTitle").textContent = MSC.MapperConfig.sTitle;
			var logo = MSC.MapperConfig.Logo;
			if (logo.trim() != "" && logo!=undefined)
				// document.getElementById("WebMapperLogo").src = logo;
			if (MSC.MapperConfig.MapSource)
				pMapService = MSC.MapperConfig.MapSource.map(function (s) { return { value: s.Name, url: s.Url, userpass: s.UserPass }; }).reverse();

			if (MSC.MapperConfig.WebMapperStyle)
			{
				document.getElementById("TOC").className = MSC.MapperConfig.WebMapperStyle.TableContents;

				//ColorStyle
				var ColorStyle = MSC.MapperConfig.WebMapperStyle.ColorStyle;
				ModifyStyleRule(".Layoutcolor", { color: new Color().fromString(ColorStyle.Text).toHEX() });
				ModifyStyleRule(".Headercolor", { backgroundColor: new Color().fromString(ColorStyle.Header).toHEX() });
				ModifyStyleRule(".Buttoncolor", { backgroundColor: new Color().fromString(ColorStyle.Button).toHEX() });

				//LayOut
				var ViewStyle = MSC.MapperConfig.WebMapperStyle.View;
				Array.from(document.getElementsByClassName("Tools")).forEach(function (x) { x.classList.switch("Tools_" + ViewStyle, ["Tools_Top", "Tools_Side"]); });
			}

			var onlinemaptmp = null;
			if (MSC.MapperConfig.Widget)
			{
				//Default
				var DeafultTool = MSC.MapperConfig.Widget.DefaultTools;
				if (DeafultTool)
				{
					var DefaultToolElems = { "Coordinate": "CoordTools", "IndexMap": "IndexMap", "ScaleBar": "ScaleTools" };
					DeafultTool.forEach(function (type)
					{
						if (!(type in DefaultToolElems))
							return;
						var targetdef = document.getElementById(DefaultToolElems[type]);
						if (targetdef)
							targetdef.style.display = "block";
					});
					if (DeafultTool.indexOf("IndexMap") >= 0)
						document.getElementById("IndexMap").classList.switch("Tools_" + MSC.MapperConfig.DefaultToolOption.IndexMap, ["Tools_TopLeft", "Tools_BottomLeft", "Tools_TopRight", "Tools_BottomRight"]);
				}
				var CustomToolsArray = MSC.MapperConfig.Widget.CustomTools;
				if (CustomToolsArray)
				{
					var k = ["CustomA", "CustomB", "CustomC", "CustomD"].map(function (c) { return document.getElementById(c); });
					var curs = CustomToolsArray.filter(function (t) { return t in staticCustom && "init" in staticCustom[t]; });
					curs.concat("Custom").forEach(function (t, i)
					{
						staticCustom[t].elem = { tag: "img", attr: { src: "images/CustomToolsIcon/" + t + ".png", title: staticCustom[t].desc, class: "Buttoncolor" },
							event: { click: staticCustom[t].init.bind(staticCustom[t]) } };
					});
					if (curs.length > k.length)
						curs = curs.slice(0, k.length - 1).concat("Custom");
					// curs.forEach(function (t, i) { k[i].appendChild(SuperGIS.Windows.Create(staticCustom[t].elem)); });
					// k.slice(curs.length).forEach(function (e) { e.style.display = "none"; });
				}
			}
			MapInitilize(onlinemaptmp);
		}

    LoadConfig();