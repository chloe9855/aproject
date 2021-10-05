var sg = sg || function()
{
	if (!Array.prototype.indexOf)
	{
		Array.prototype.indexOf = function(elt)
		{
			var len = this.length >>> 0;
			var from = Number(arguments[1]) || 0;
			from = from < 0 ? Math.ceil(from) : Math.floor(from);
			if (from < 0)
				from += len;
			for ( ; from < len ; from++)
			{
				if (from in this && this[from] === elt)
					return from;
			}
			return -1;
		};
	}
	var alertFallback = false;
	if (typeof console === "undefined" || typeof console.log === "undefined")
	{
		console = {};
		if (alertFallback)
		{
			console.log = function(msg)
			{
				alert(msg);
			};
		}
	}
	if (document.namespace)
		document.namespaces.add("vml", "urn:schemas-microsoft-com:vml", "#default#VML");
	var sg = {};
	var DeviceTest = function()
	{
		var agent = navigator.userAgent.toLowerCase();
		var rv = -1;
		if (navigator.appName == "Microsoft Internet Explorer")
		{
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
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
		else
			return null;
	};
	var listener = function(target, type, handler)
	{
		this.target = target;
		this.type = type;
		this.handler = handler;
	};
	listener.prototype.trigger = function()
	{
		this.target.trigger(this.type);
	};
	listener.prototype.remove = function()
	{
		var targetEvt = this.target["on" + this.type];
		for (var i = 0 ; i < targetEvt.length ; i++)
		{
			if (targetEvt[i] == this)
			{
				targetEvt.splice(i, 1);
				return;
			}
		}
	};
	sg.events = sg.events || function()
	{
		var ev = {};
		ev.on = function(target, type, handler)
		{
			if (!target)
				return;
			return target.on(type, handler);
		};
		ev.remove = function(listener)
		{
			if (!listener)
				return;
			return listener;
		};
		ev.trigger = function(target, type, op)
		{
			if (!target || typeof type != "string")
				return;
			target.trigger(type);
		};
		return ev;
	}();
	sg.extend = function(dest)
	{
		var sources = Array.prototype.slice.call(arguments, 1), i, j, len, src;
		var len = sources.length;
		for (var j = 0 ; j < len ; j++)
		{
			src = sources[j] || {};
			for (i in src)
			{
				if (src.hasOwnProperty(i))
					dest[i] = src[i];
			}
		}
		return dest;
	};
	sg.Class = function() {};
	sg.Class.extend = function(props)
	{
		var class_ = function()
		{
			if (this.initialize)
				this.initialize.apply(this, arguments);
		};
		var F = function() {};
		F.prototype = this.prototype;
		var proto = new F;
		proto.constructor = class_;
		class_.prototype = proto;
		for (var i in this)
		{
			if (this.hasOwnProperty(i) && i !== "prototype")
				class_[i] = this[i];
		}
		if (props.statics)
		{
			sg.extend(class_, props.statics);
			delete props.statics;
		}
		if (props.includes)
		{
			sg.extend.apply(null, [proto].concat(props.includes));
			delete props.includes;
		}
		if (props.events)
		{
			proto.on = function(type, handler)
			{
				if ("on" + type in this)
				{
					var l = new listener;
					l.handler = handler;
					l.type = type;
					l.target = this;
					
					if (!this["on" + type])
						this["on" + type] = [];
					
					var targetEvt = this["on" + type];
					if (targetEvt)
						targetEvt.push(l);
					return l;
				}
			};
			proto.trigger = function(type)
			{
				if ("on" + type in this)
				{
					var target = this["on" + type];
					if (!target)
						return;
					target = target.slice(0);
					var tlength = target.length;
					for (var listener = 0 ; listener < tlength ; listener++)
						target[listener].handler.apply(this, Array.prototype.slice.call(arguments, 1));
					
					return;
				}
			};
			var plength = props.events.length;
			for (var e = 0 ; e < plength ; e++)
				proto["on" + props.events[e]] = null;
			
			delete props.events;
		}
		sg.extend(proto, props);
		var parent = this;
		class_.__super__ = parent.prototype;
		return class_;
	};
	sg.Class.include = function(props)
	{
		sg.extend(this.prototype, props);
	};
	var componentToHex = function(c)
	{
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	};
	sg.Color = sg.Class.extend(
	{
		r: 0,
		g: 0, 
		b: 0,
		a: 1,
		initialize: function(r, g, b, a)
		{
			this.r = r ? parseInt(r) : this.r;
			this.g = g ? parseInt(g) : this.g;
			this.b = b ? parseInt(b) : this.b;
			this.a = a == undefined ? this.a : a;
		},
		toHex: function()
		{
			return "#" + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
		},
		toRgb: function()
		{
			return [this.r, this.g, this.b];
		},
		toRgba: function()
		{
			return [this.r, this.g, this.b, this.a];
		},
		toCss: function(useAlpha)
		{
			if (useAlpha)
				return "rgb(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
			else
				return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
		},
		toString: function()
		{
			return this.toCss(true);
		}
	});
	sg.SpatialReference = sg.Class.extend(
	{
		initialize: function(param)
		{
			switch(typeof param)
			{
				case "number":
					this.wkid = param;
					break;
				case "string":
					this.wkt = param;
					break;
				case "object":
					if (param.wkid)
						this.wkid = param.wkid;
					else if (param.wkt)
						this.wkt = param.wkt;
					break;
			}
		},
		wkt: null,
		wkid: null,
		isWebMercator: function()
		{
			return this.wkid == 102113 || this.wkid == 102100 || this.wkid == 3857;
		},
		equals: function(sr)
		{
			return sr.wkt == this.wkt || sr.wkid == this.wkid;
		}
	});
	return sg;
}();
(function()
{
	sg.features = {};
	var agent = navigator.userAgent.toLowerCase();
	var rv = -1;
	if (navigator.appName == "Microsoft Internet Explorer")
	{
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
	}
	if (rv)
	{
		sg.features.ie = {};
		sg.features.ie.version = rv;
	}
	
	if (agent.indexOf("firefox") > 0)
		sg.features.firefox = true;
	else if (agent.indexOf("chrome") > 0)
		sg.features.chrome = true;
	
	var elem = document.createElement("canvas");
	sg.features.canvas = !!(elem.getContext && elem.getContext("2d"));
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	window.cancelAnimationFrame = cancelAnimationFrame;
	
	if (requestAnimationFrame && cancelAnimationFrame)
		sg.features.animationFrame;
	
	sg.features.getDPI = function()
	{
		if (sg.isNumber(sg.features.DPI))
			return sg.features.DPI;
		if (document.readyState === "complete")
		{
			var dpiElem = document.createElement("div");
			dpiElem.style.width = "1in";
			dpiElem.style.height = "1in";
			dpiElem.style.position = "absolute";
			dpiElem.style.visibility = "hidden";
			document.body.appendChild(dpiElem);
			sg.features.DPI = dpiElem.offsetHeight;
			document.body.removeChild(dpiElem);
			return sg.features.DPI;
		}
	};
	sg.features.svg = !!("createElementNS" in document && document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
	sg.features.cssTransform = "transform" in document.documentElement.style || "msTransform" in document.documentElement.style;
})();
sg.isDescendant = function(parent, child)
{
	var node = child.parentNode;
	while (node != null)
	{
		if (node == parent)
			return true;
		node = node.parentNode;
	}
	return false;
};
sg.ltrim = function(instr)
{
	return instr.replace(/^[\s]*/gi, "");
};
sg.forEach = function(ary, callback)
{
	if (!ary || !callback)
		return;
	for (var i = 0 ; i < ary.length ; i++)
		callback.call(ary, ary[i], i, ary);
};
sg.removeArrayItem = function(ary, item)
{
	if (!ary)
		return;
	var idx = any.indexOf(item);
	if (idx >= 0)
		ary.splice(idx, 1);
};
sg.rtrim = function(instr)
{
	return instr.replace(/[\s]*$/gi, "");
};
sg.trim = function(instr)
{
	if (instr.trim)
		return instr.trim();
	return sg.rtrim(sg.ltrim(instr));
};
sg.byId = function(id)
{
	return document.getElementById(id);
};
sg.stopPropagation = function(e)
{
	if (!e)
		return;
	if (e.stopPropagation)
		e.stopPropagation();
	e.cancelBubble = true;
};
sg.isString = function(p)
{
	return typeof p == "string";
};
sg.isArray = function(p)
{
	return Array.isArray ? Array.isArray(p) : p.constructor === Array;
};
sg.isNumber = function(p)
{
	return !isNaN(p);
};
sg.setOpacity = function(node, value)
{
	if (!sg.isNumber(value) || value > 1)
		return;
	
	node.style.opacity = value;
	node.style.filter = "alpha(opacity=" + Math.round(value * 100) + ")";
};
sg.isBoolean = function(p)
{
	return typeof p == "boolean";
};
sg.isFunction = function(p)
{
	return typeof p === "function";
};
sg.isElement = function(p)
{
	return p instanceof HTMLElement;
};
sg.wrap = function(ctx, func)
{
	return function()
	{
		func.apply(ctx, arguments);
	};
};
sg.addClass = function(el, cls)
{
	if (!el || !el.getAttribute)
		return;
	
	var c_cls = el.getAttribute("class");
	if (!c_cls)
		c_cls = "";
	
	var hasClass = sg.hasClass(el, cls);
	if (hasClass)
		return;
	else
	{
		c_cls += " " + cls;
		el.setAttribute("class", sg.trim(c_cls));
	}
};
sg.removeClass = function(el, cls)
{
	if (!sg.hasClass(el, cls)) 
		return;
	var c_cls = el.getAttribute("class");
	el.setAttribute("class", sg.trim(c_cls.replace(cls, "")));
};
sg.toggleClass = function(el, cls)
{
	if (sg.hasClass(el, cls))
		sg.removeClass(el, cls);
	else
		sg.addClass(el, cls);
};
sg.hasClass = function(el, cls)
{
	var c_cls = el.getAttribute("class");
	if (!c_cls)
		return false;
	return c_cls.indexOf(cls) >= 0;
};
sg.removeFromParent = function(node)
{
	if (!sg.isElement(node))
		return;
	if (node.parentNode)
		node.parentNode.removeChild(node);
};
sg.preventDefault = function(e)
{
	if (!e)
		return;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
};
sg.style = function(node, prop, value)
{
	switch(prop)
	{
		case "transform":
			node.style["transform"] = value;
			node.style["-webkit-transform"] = value;
			node.style["-ms-transform"] = value;
			break;
		default:
			node.style[prop] = value;
	}
};
sg.getOffset = function(obj)
{
	var curleft = curtop = 0;
	if (obj.offsetParent)
	{
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while(obj = obj.offsetParent);
		return[curleft, curtop];
	}
};
sg.target = function(event)
{
	return event.srcElement || event.target;
};
sg.parseXML = function(str)
{
	var xmlDoc = null;
	if (window.DOMParser)
	{
		var parser = new DOMParser;
		xmlDoc = parser.parseFromString(str, "application/xml");
	}
	else if (window.ActiveXObject)
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.loadXML(str);
	}
	else
		return null;
	
	return xmlDoc;
};
sg.addDomEvent = function(targetObj, actEvent, actFunc, useCapture)
{
	if (!targetObj || !actEvent || !actFunc)
		return;
	if (targetObj.addEventListener)
	{
		if (actEvent == "mousewheel" && sg.features.firefox)
			actEvent = "DOMMouseScroll";
		if (useCapture)
			targetObj.ownerDocument.addEventListener(actEvent, actFunc, useCapture);
		else
			targetObj.addEventListener(actEvent, actFunc, useCapture);
	}
	else
	{
		targetObj.attachEvent("on" + actEvent, actFunc);
		if (useCapture)
			targetObj.setCapture();
	}
};
sg.math = {};
sg.math.degreeToRadian = function(degree)
{
	return degree / 180 * Math.PI;
};
sg.math.radianToDegree = function(rad)
{
	return rad / Math.PI * 180;
};
sg.math.length = function(w, h)
{
	return Math.sqrt(w * w + h * h);
};
sg.math.rotate = function(x, y, angle)
{
	var radian = sg.math.degreeToRadian(angle);
	x = x * Math.cos(radian) - y * Math.sin(radian);
	y = x * Math.sin(radian) + y * Math.cos(radian);
	return{x: x, y: y};
};
sg.math.Matrix = function()
{
	var m = function(arr)
	{
		this.arr_ = arr;
	};
	m.square = function(size, value)
	{
		return m.create(size, size, value);
	};
	m.rotate = function(angle)
	{
		var rad = sg.math.degreeToRadian(angle);
		var arr = [[Math.cos(rad), -Math.sin(rad), 0], [Math.sin(rad), Math.cos(rad), 0], [0, 0, 1]];
		return new m(arr);
	};
	m.scale = function(facX, facY)
	{
		var arr = [[facX, 0, 0], [0, facY, 0], [0, 0, 1]];
		return new m(arr);
	};
	m.translate = function(x, y)
	{
		var arr = [[1, 0, x], [0, 1, y], [0, 0, 1]];
		return new m(arr);
	};
	m.identity = function(size)
	{
		var zero = m.zero(size, size);
		var arr = zero.arr_;
		
		for (var i = 0 ; i < size ; i++)
			arr[i][i] = 1;
		
		return zero;
	};
	m.create = function(rows, cols, value)
	{
		var value = value ? value : 0;
		var arr = [];
		for (var r = 0 ; r < rows ; r++)
		{
			var ta = new Array(cols);
			arr.push(ta);
			for (var c = 0 ; c < cols ; c++)
				ta[c] = typeof value == "function" ? value(r, c) : value;
		}
		return new m(arr);
	};
	m.zero = function(rows, cols)
	{
		return m.create(rows, cols, 0);
	};
	var proto = m.prototype;
	proto.toString = function()
	{
		var raw = this.getRows();
		var col = this.getCols();
		
		var str = "\n" + raw + " x " + col;
		for (var i = 0 ; i < raw ; i++)
			str += "\n" + this.arr_[i].join();
		return str;
	};
	proto.array = function()
	{
		return arr_;
	};
	proto.getRows = function()
	{
		return this.arr_.length;
	};
	proto.getCols = function()
	{
		return this.arr_[0].length;
	};
	proto.get = function(r, c)
	{
		return this.arr_[r][c];
	};
	proto.set = function(r, c, value)
	{
		this.arr_[r][c] = value;
	};
	proto.add = function(target)
	{
		return this.elementOperate(target, function(i, j)
		{
			return this.get(i, j) + target.get(i, j);
		});
	};
	proto.productOperate = function(target, operator)
	{
		if (!this.isAligned(target))
			return null;
		for (var i = 0 ; i < r_this ; i++)
		{
			for (var j = 0 ; j < c_target ; j++)
			{
				var sum = 0;
				for (var k = 0 ; k < c_this ; k++)
					sum += this.arr_[i][k] * target.arr_[k][j];
				operator(i, j, sum);
			}
		}
		return r;
	};
	proto.elementOperate = function(target, operator)
	{
		if (!this.isEqualSize(target))
			return null;
		var r = m.zero(r1, c1);
		this.forEach(function(i, j)
		{
			r.set(i, j, operator(i, j));
		});
		return r;
	};
	proto.multiply = function(target)
	{
		return this.elementOperate(target, function(i, j)
		{
			return this.get(i, j) * target.get(i, j);
		});
	};
	proto.substract = function(target)
	{
		return this.elementOperate(target, function(i, j)
		{
			return this.get(i, j) - target.get(i, j);
		});
	};
	proto.forEach = function(callback)
	{
		if (!callback)
			return;
		
		var c1 = this.getCols();
		var r1 = this.getRows();
		for (var i = 0 ; i < r1 ; i++)
			for (var j = 0 ; j < c1 ; j++)
				callback(i, j);
	};
	proto.inverse = function()
	{
		var det = this.determinant();
		if (det == 0)
			throw "This matrix have zero determinant";
		
		var ma = this.arr_;
		var a = ma[0][0];
		var b = ma[0][1];
		var c = ma[0][2];
		var d = ma[1][0];
		var e = ma[1][1];
		var f = ma[1][2];
		var g = ma[2][0];
		var h = ma[2][1];
		var i = ma[2][2];
		var A = e * i - f * h;
		var B = -(d * i - f * g);
		var C = d * h - e * g;
		var D = -(b * i - c * h);
		var E = a * i - c * g;
		var F = -(a * h - b * g);
		var G = b * f - c * e;
		var H = -(a * f - c * d);
		var I = a * e - b * d;
		return new m([[A / det, D / det, G / det], [B / det, E / det, H / det], [c / det, F / det, I / det]]);
	};
	proto.determinant = function()
	{
		var ma = this.arr_;
		var a = ma[0][0];
		var b = ma[0][1];
		var c = ma[0][2];
		var d = ma[1][0];
		var e = ma[1][1];
		var f = ma[1][2];
		var g = ma[2][0];
		var h = ma[2][1];
		var i = ma[2][2];
		var A = e * i - f * h;
		var B = -(d * i - f * g);
		var C = d * h - e * g;
		return a * A + b * B + c * C;
	};
	proto.transform = function(x, y)
	{
		var input = new m([[x], [y], [1]]);
		var r = this.product(input);
		return{x:r.get(0, 0), y:r.get(1, 0)};
	};
	proto.isEqualSize = function(target)
	{
		var r_this = this.getRows();
		var c_this = this.getCols();
		var r_target = target.getRows();
		var c_target = target.getCols();
		return c_this === c_target && r_this === r_target;
	};
	proto.isAligned = function(target)
	{
		var r_this = this.getRows();
		var c_this = this.getCols();
		var r_target = target.getRows();
		var c_target = target.getCols();
		return c_this === r_target;
	};
	proto.product = function(target)
	{
		if (!this.isAligned(target))
			throw "Matrix not aligned";
		
		var r_this = this.getRows();
		var c_this = this.getCols();
		var r_target = target.getRows();
		var c_target = target.getCols();
		var r = m.zero(r_this, c_target);
		
		for (var i = 0 ; i < r_this ; i++)
		{
			for (var j = 0 ; j < c_target ; j++)
			{
				var sum = 0;
				for (var k = 0 ; k < c_this ; k++)
					sum += this.arr_[i][k] * target.arr_[k][j];
				r.set(i, j, sum);
			}
		}
		return r;
	};
	return m;
}();
sg.settings = {proxy: "proxy.ashx"};
var bDebug = false;
if (bDebug)
{
	var pErrorFunc = function(sMsg, sUrl, sLine)
	{
		var p = new SWGPanel(window.document.body, 0, true, true);
		var pM = p.getMainFrame();
		pM.style.position = "absolute";
		pM.style.top = 0;
		pM.style.right = 0;
		pM.style.width = "250px";
		pM.style.height = 0;
		var pDiv = p.getViewFrame();
		pDiv.style.textAlign = "left";
		pDiv.innerHTML = "Error: " + sMsg + "<br>Line: " + sLine + "<br>URL: " + sUrl + "<br>";
		return true;
	};
	var pUnload = function()
	{
		DetachEvent(window, "error", pErrorFunc);
		DetachEvent(window, "unload", pUnload);
	};
	AttachEvent(window, "unload", pUnload);
	AttachEvent(window, "error", pErrorFunc);
}
function DeviceTest()
{
	var agent = navigator.userAgent.toLowerCase();
	var rv = -1;
	if (navigator.appName == "Microsoft Internet Explorer")
	{
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
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
	else
		return null;
}
function FuncAdapter(pCaller, pFunc)
{
	return function(pEvent)
	{
		return pFunc.call(pCaller, pEvent);
	};
}
function AttachEvent(targetObj, actEvent, actFunc, useCapture)
{
	if (targetObj.addEventListener)
	{
		if (actEvent == "mousewheel" && DeviceTest() == "Firefox")
			actEvent = "DOMMouseScroll";
		if (useCapture)
			targetObj.ownerDocument.addEventListener(actEvent, actFunc, useCapture);
		else
			targetObj.addEventListener(actEvent, actFunc, useCapture);
	}
	else
	{
		targetObj.attachEvent("on" + actEvent, actFunc);
		if (useCapture)
			targetObj.setCapture();
	}
}
function DetachEvent(targetObj, actEvent, actFunc, useCapture)
{
	if (targetObj.removeEventListener)
	{
		if (actEvent == "mousewheel" && DeviceTest() == "Firefox")
			actEvent = "DOMMouseScroll";
		if (useCapture)
			targetObj.ownerDocument.removeEventListener(actEvent, actFunc, useCapture);
		else
			targetObj.removeEventListener(actEvent, actFunc, useCapture);
	}
	else
	{
		targetObj.detachEvent("on" + actEvent, actFunc);
		if (useCapture)
			targetObj.releaseCapture();
	}
}
function Inherit(pThisObj, pBaseObj)
{
	for (var t in pBaseObj)
		pThisObj[t] = pBaseObj[t];
}
function CreateWndBG(pElem, sStyle, h1, h2, w1, w2)
{
	var pTbl = pElem.ownerDocument.createElement("TABLE");
	pElem.insertBefore(pTbl, pElem.firstChild);
	pTbl.style.position = "absolute";
	pTbl.style.left = "0px";
	pTbl.style.top = "0px";
	pTbl.style.width = "100%";
	pTbl.style.height = "100%";
	pTbl.border = "0px";
	pTbl.cellPadding = "0px";
	pTbl.cellSpacing = "0px";
	var pRow1 = pTbl.insertRow(-1);
	pRow1.height = h1;
	pRow1.style.height = h1;
	var pCell1 = pRow1.insertCell(-1);
	pCell1.className = sStyle + "InnerUL";
	var pCell2 = pRow1.insertCell(-1);
	pCell2.className = sStyle + "InnerU";
	var pCell3 = pRow1.insertCell(-1);
	pCell3.className = sStyle + "InnerUR";
	var pRow2 = pTbl.insertRow(-1);
	var pCell4 = pRow2.insertCell(-1);
	pCell4.className = sStyle + "InnerL";
	pCell4.width = w1;
	var pCell5 = pRow2.insertCell(-1);
	pCell5.className = sStyle + "Inner";
	pCell5.innerHTML = "&nbsp;";
	var pCell6 = pRow2.insertCell(-1);
	pCell6.className = sStyle + "InnerR";
	pCell6.width = w2;
	var pRow3 = pTbl.insertRow(-1);
	pRow3.height = h2;
	pRow3.style.height = h2;
	var pCell7 = pRow3.insertCell(-1);
	pCell7.className = sStyle + "InnerDL";
	var pCell8 = pRow3.insertCell(-1);
	pCell8.className = sStyle + "InnerD";
	var pCell9 = pRow3.insertCell(-1);
	pCell9.className = sStyle + "InnerDR";
	
	this.Dock = function(nType)
	{
		pRow1.style.display = nType & 4 ? "none" : "";
		pRow3.style.display = nType & 8 ? "none" : "";
		pCell1.style.display = nType & 1 ? "none" : "";
		pCell4.style.display = nType & 1 ? "none" : "";
		pCell7.style.display = nType & 1 ? "none" : "";
		pCell3.style.display = nType & 2 ? "none" : "";
		pCell6.style.display = nType & 2 ? "none" : "";
		pCell9.style.display = nType & 2 ? "none" : "";
	};
}
function CreateWndBG2(pElem, nWidth, h1, h2)
{
	var pTbl = pElem.ownerDocument.createElement("TABLE");
	pElem.insertBefore(pTbl, pElem.firstChild);
	pTbl.style.position = "absolute";
	pTbl.style.left = "0px";
	pTbl.style.top = "0px";
	pTbl.style.width = "100%";
	pTbl.style.height = "100%";
	pTbl.border = "0px";
	pTbl.cellPadding = "0px";
	pTbl.cellSpacing = "0px";
	var pRow1 = pTbl.insertRow(-1);
	pRow1.width = nWidth;
	pRow1.height = h1;
	pRow1.style.height = h1 + "px";
	var pCell1 = pRow1.insertCell(-1);
	pCell1.style.backgroundImage = "url(images/windows/004_01.png)";
	var pRow2 = pTbl.insertRow(-1);
	var pCell4 = pRow2.insertCell(-1);
	pCell4.style.backgroundImage = "url(images/windows/004_02.png)";
	var pRow3 = pTbl.insertRow(-1);
	pRow3.height = h2;
	pRow3.style.height = h2 + "px";
	var pCell7 = pRow3.insertCell(-1);
	pCell7.style.backgroundImage = "url(images/windows/004_03.png)";
	this.Dock = function(nType) {};
}
function SWGPanel(pParentElem, nStyle, bFloat, bAllowClose)
{
	var onClosedevent = null;
	this.setClosedEvent = function(newVal)
	{
		onClosedevent = newVal;
	};
	var m_pViewFrame = null;
	var m_hObj = pParentElem.ownerDocument.createElement("DIV");
	pParentElem.appendChild(m_hObj);
	m_hObj.style.position = "absolute";
	m_hObj.style.width = "300px";
	m_hObj.style.height = "0px";
	m_hObj.style.left = "0px";
	m_hObj.style.top = "0px";
	var m_pBG = null;
	m_pBG = new CreateWndBG2(m_hObj, 300, 12, 14);
	var m_pTbl = m_hObj.ownerDocument.createElement("TABLE");
	m_hObj.appendChild(m_pTbl);
	m_pTbl.style.position = "relative";
	m_pTbl.border = "0px";
	m_pTbl.cellPadding = "0px";
	m_pTbl.cellSpacing = "0px";
	m_pTbl.style.fontSize = "8pt";
	var pRow = m_pTbl.insertRow(-1);
	pRow.height = "13px";
	pRow.style.height = "13px";
	var pCell = pRow.insertCell(-1);
	pCell.width = "15px";
	pCell.style.width = "15px";
	var pCell = pRow.insertCell(-1);
	var pCell = pRow.insertCell(-1);
	pCell.width = "15px";
	pCell.style.width = "15px";
	var pRow = m_pTbl.insertRow(-1);
	var pCell = pRow.insertCell(-1);
	var pInnerCell = pRow.insertCell(-1);
	var pCell = pRow.insertCell(-1);
	var pRow = m_pTbl.insertRow(-1);
	pRow.height = "15px";
	pRow.style.height = "15px";
	var pCell = pRow.insertCell(-1);
	var pCell = pRow.insertCell(-1);
	var pCell = pRow.insertCell(-1);
	var m_pInnerTbl = pInnerCell.ownerDocument.createElement("TABLE");
	pInnerCell.appendChild(m_pInnerTbl);
	m_pInnerTbl.style.position = "relative";
	m_pInnerTbl.border = "0px";
	m_pInnerTbl.cellPadding = "0px";
	m_pInnerTbl.cellSpacing = "0px";
	m_pInnerTbl.style.fontSize = "8pt";
	var pRow = m_pInnerTbl.insertRow(-1);
	var pCell = pRow.insertCell(-1);
	pCell.className = "Panel";
	pCell.vAlign = "top";
	pCell.align = "center";
	pCell.style.padding = "0px 0px 3px 0px";
	var pDrag = null;
	var pTitle = null;
	
	if (bFloat)
	{
		pD = pCell.ownerDocument.createElement("TABLE");
		pD.style.fontSize = "8pt";
		pD.style.border = "1px solid #000000";
		pD.style.backgroundColor = "#83CA54";
		pD.style.backgroundSize = "100%";
		pD.style["-webkit-background-size"] = "100%";
		pD.border = "0px";
		pD.cellPadding = "0px";
		pD.cellSpacing = "0px";
		pD.style.width = "269px";
		pD.style.height = "17px";
		pCell.appendChild(pD);
		var pRow = pD.insertRow(-1);
		pRow.style.cursor = "move";
		pTitle = pRow.insertCell(-1);
		pTitle.style.color = "white";
		var pSys = pRow.insertCell(-1);
		pSys.align = "right";
		pSys.style.padding = "0px 5px 0px 0px";
		
		if (bAllowClose)
		{
			var pImg = pSys.ownerDocument.createElement("IMG");
			pSys.appendChild(pImg);
			pImg.style.cursor = "pointer";
			pImg.src = "images/3.2/window/Title_DE.png";
			pImg.border = "0";
			AttachEvent(pImg, "click", FuncAdapter(this, function(tEvent)
			{
				this.FinalRelease();
				if (onClosedevent)
					onClosedevent.call(this);
			}), false);
		}
		pDrag = new DragTracker(pRow, m_hObj);
	}
	var pRow = m_pInnerTbl.insertRow(-1);
	var pCell = pRow.insertCell(-1);
	pCell.style.padding = "0px";
	pCell.className = "Panel";
	pCell.vAlign = "top";
	pCell.align = "center";
	pC = pCell.ownerDocument.createElement("TABLE");
	pC.style.fontSize = "8pt";
	pC.border = "0px";
	pC.cellPadding = "0px";
	pC.cellSpacing = "0px";
	pC.style.width = "269px";
	pC.style.height = "100%";
	pCell.appendChild(pC);
	var pRow = pC.insertRow(-1);
	pRow.style.height = "9px";
	pT1 = pRow.insertCell(-1);
	pT1.style.backgroundImage = "url(images/windows/004_05.png)";
	var pRow = pC.insertRow(-1);
	pT2 = pRow.insertCell(-1);
	pT2.style.backgroundImage = "url(images/windows/004_06.png)";
	pT2.style.padding = "0px 9px 3px 9px";
	var pRow = pC.insertRow(-1);
	pRow.style.height = "8px";
	pT3 = pRow.insertCell(-1);
	pT3.style.backgroundImage = "url(images/windows/004_07.png)";
	pFrame = pT2.ownerDocument.createElement("DIV");
	pT2.appendChild(pFrame);
	pFrame.style.position = "relative";
	pFrame.style.left = "0px";
	pFrame.style.top = "0px";
	pFrame.style.width = "244px";
	pFrame.style.height = "100%";
	m_pViewFrame = pFrame;
	
	this.getViewFrame = function()
	{
		return m_pViewFrame;
	};
	this.getMainFrame = function()
	{
		return m_hObj;
	};
	this.putTitle = function(newVal)
	{
		pTitle.innerHTML = newVal;
	};
	this.FitFrameSize = function()
	{
		m_hObj.style.width = m_pTbl.clientWidth + "px";
		m_hObj.style.height = m_pTbl.clientHeight + "px";
	};
	this.CenterWindow = function()
	{
		m_hObj.style.left = (pParentElem.clientWidth - m_pTbl.clientWidth) / 2 + "px";
		m_hObj.style.top = (pParentElem.clientHeight - m_pTbl.clientHeight) / 2 + "px";
	};
	this.MoveWindow = function(nLeft, nTop)
	{
		m_hObj.style.left = nLeft + "px";
		m_hObj.style.top = nTop + "px";
	};
	this.Show = function(bShow)
	{
		m_hObj.style.display = bShow ? "" : "none";
	};
	this.FinalRelease = function()
	{
		if (m_pTbl)
			m_hObj.removeChild(m_pTbl);
		m_pTbl = null;
		
		if (m_hObj)
			pParentElem.removeChild(m_hObj);
		m_hObj = null;
		if (pDrag)
			pDrag.FinalRelease();
		pDrag = null;
	};
	this.Dock = function(nType)
	{
		m_hObj.style.left = (nType & 1) != 0 ? "0px" : "";
		m_hObj.style.right = (nType & 1) == 0 ? "0px" : "";
		m_hObj.style.top = (nType & 8) == 0 ? "0px" : "";
		m_hObj.style.bottom = (nType & 8) != 0 ? "0px" : "";
		m_pBG.Dock(nType);
	};
}
function SWGContextMenu(pParentElem, posX, posY, bSelfDelete)
{
	var m_ContextMenu = null;
	var m_Menu = null;
	var pFocusoutFunc = FuncAdapter(this, function()
	{
		if (m_ContextMenu)
		{
			var pElem = event.toElement;
			while (pElem)
			{
				if (pElem == m_ContextMenu)
					break;
				pElem = pElem.parentElement;
			}
			if (pElem == null || event.toElement.tagName == "A")
			{
				DetachEvent(m_ContextMenu, "focusout", pFocusoutFunc, false);
				m_ContextMenu.style.display = "none";
				if (pElem)
					event.toElement.fireEvent("onclick");
			}
			if (bSelfDelete)
				this.DestroyMenu();
		}
	});
	this.DestroyMenu = function()
	{
		if (m_ContextMenu)
			pParentElem.removeChild(m_ContextMenu);
		m_ContextMenu = null;
	};
	this.AddItem = function(txtItem, clickEvent)
	{
		pA = m_Menu.ownerDocument.createElement("A");
		pA.href = "javascript:;";
		if (clickEvent)
			AttachEvent(pA, "click", FuncAdapter(this, clickEvent), false);
		
		pA.appendChild(pA.ownerDocument.createTextNode(txtItem));
		m_Menu.appendChild(pA);
	};
	m_ContextMenu = pParentElem.ownerDocument.createElement("div");
	pParentElem.appendChild(m_ContextMenu);
	m_ContextMenu.style.position = "absolute";
	m_ContextMenu.style.width = "85px";
	m_ContextMenu.style.border = "solid 1px";
	m_ContextMenu.style.left = posX;
	m_ContextMenu.style.top = posY;
	m_Menu = m_ContextMenu.ownerDocument.createElement("DIV");
	m_Menu.className = "CB TC";
	m_ContextMenu.appendChild(m_Menu);
	AttachEvent(m_ContextMenu, "focusout", pFocusoutFunc, false);
	m_ContextMenu.focus();
}
function PreventDefault(elem, event) 
{
	AttachEvent(elem, event, function Prevent(tEvent)
	{
		if (tEvent.preventDefault)
			tEvent.preventDefault();
		tEvent.returbValue = false;
	}, false);
}
function SWGAttributeList(parentNode)
{
	var pTbl = null, container = null;
	var that = this;
	
	function init()
	{
		container = document.createElement("div");
		container.style.maxHeight = "600px";
		container.style.overflow = "auto";
		pTbl = document.createElement("table");
		pTbl.style.tableLayout = "fixed";
		pTbl.width = 227;
		pTbl.style.width = "227px";
		pTbl.border = "0";
		pTbl.cellSpacing = "0";
		pTbl.cellPadding = "0";
		pTbl.unselectable = "on";
		pTbl.style.fontSize = "8pt";
		container.appendChild(pTbl);
		parentNode.appendChild(container);
	}
	this.onClose = [];
	var createButton = function(data)
	{
		var img = document.createElement("img");
		img.src = data.img;
		img.style.cursor = "hand";
		img.style.title = data.title;
		if (data.action)
		{
			img.onclick = function()
			{
				data.action.apply(img, data.args ? data.args : []);
			};
		}
		return img;
	};
	this.addItem = function(title, action, args, options)
	{
		pRow = pTbl.insertRow(-1);
		pRow.style.height = "20px";
		pRow.style.backgroundImage = "url(images/Item_02.png)";
		pRow.style.backgroundRepeat = "repeat-x";
		pCell = pRow.insertCell(-1);
		pCell.width = 6;
		pCell.style.width = "6px";
		pCell.style.backgroundImage = "url(images/Item_01.png)";
		pCell.style.backgroundRepeat = "no-repeat";
		pCell = pRow.insertCell(-1);
		pCell.style.overflow = "hidden";
		pCell.width = 200;
		pCell.style.width = "200px";
		pCell.style.whiteSpace = "nowrap";
		pCell.innerHTML = title;
		
		if (options && options.buttons)
		{
			var blength = options.buttons.length;
			for (var i = 0 ; i < blength ; i++)
			{
				pCell = pRow.insertCell(-1);
				pCell.width = 14;
				pCell.style.width = "14px";
				var button = createButton(options.buttons[i]);
				pCell.appendChild(button);
			}
		}
		if (action)
		{
			pCell = pRow.insertCell(-1);
			pCell.width = 14;
			pCell.style.width = "14px";
			var button = createButton({img: "images/icons/Attribute.png", action: action, args: args});
			pCell.appendChild(button);
		}
		pCell = pRow.insertCell(-1);
		pCell.width = 5;
		pCell.style.width = "5px";
		pCell.style.backgroundImage = "url(images/Item_03.png)";
		pCell.style.backgroundRepeat = "no-repeat";
	};
	this.deleteItem = function(idx)
	{
		pTbl.deleteRow(idx);
	};
	this.clear = function(idx)
	{
		table_.innerHTML = "";
	};
	init();
}
function SWGList()
{
	var m_Panel = null, pM = null, pCenterCell = null, container = null;
	this.panel = m_Panel;
	var al;
	var that = this;
	function init()
	{
		m_Panel = new SWGPanel(document.body, 0, true, true);
		that.panel = m_Panel;
		m_Panel.setClosedEvent(function()
		{
			var olength = that.onClose.length;
			for (var ev = 0 ; ev < olength ; ev++)
				that.onClose[ev].call(this);
			m_Panel = null;
		});
		pM = m_Panel.getMainFrame();
		pCenterCell = m_Panel.getViewFrame();
		m_Panel.CenterWindow();
		m_Panel.putTitle("New List");
		al = new SWGAttributeList(pCenterCell);
		m_Panel.FitFrameSize();
	}
	this.onClose = [];
	this.setTitle = function(title)
	{
		if (m_Panel)
			m_Panel.putTitle(title);
	};
	this.addItem = function(title, action, args, options)
	{
		al.addItem(title, action, args, options);
		m_Panel.FitFrameSize();
	};
	this.deleteItem = function(idx)
	{
		al.deleteItem(idx);
		m_Panel.FitFrameSize();
	};
	this.clear = function(idx)
	{
		al.clear(idx);
	};
	this.display = function(disp)
	{
		al.display(idx);
	};
	init();
}
function CheckDevice() //DeviceCheck
{
	if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
		return true;
	else
		return false;
}