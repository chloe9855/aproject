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


// 
if (sg) {
	if (!sg.controls)
		sg.controls = {};

	sg.controls.ControlBase = sg.Class.extend(
		{
			node: null,
			targetNode: "",
			name: "",
			initialize: function (param, node) {
				this.node = document.createElement("div");
				sg.addClass(this.node, "sgCtrl");
				if (node) {
					if (typeof node == "string")
						this.targetNode = sg.byId(node);
					else if (node.nodeType == 1)
						this.targetNode = node;
					if (this.targetNode)
						this.targetNode.appendChild(this.node);
				}
			},
			setFocusable: function (p) {
				if (!sg.isBoolean(p))
					return;
				this.focusable = p;
				if (this.focusable && this.node)
					this.node.setAttribute("tabindex", "0");
			},
			focus: function () {
				if (!this.node)
					return;
				this.node.focus();
			},
			show: function () {
				if (!this.node)
					return;
				this.node.style.display = "";
			},
			hide: function () {
				if (!this.node)
					return;
				this.node.style.display = "none";
			},
			startup: function () {
				if (this.targetNode && this.node.parentNode != this.targetNode)
					this.targetNode.appendChild(this.node);
			},
			destroy: function () {
				if (this.targetNode && this.node.parentNode == this.targetNode)
					this.targetNode.removeChild(this.node);
			}
		});

	sg.controls.LayerSwipe = sg.controls.ControlBase.extend(
		{
			map: null,
			node: null,
			layers: null,
			type: "vertical",
			left: null,
			top: null,
			initialize: function (param, node) {
				sg.controls.ControlBase.prototype.initialize.apply(this, arguments);

				if (!param || !param.map || !param.layers)
					throw "map and layers must be provided";

				this.map = param.map;
				this.layers = param.layers;

				if (typeof param.type == "string")
					this.type = param.type;

				if (typeof param.left == "number")
					this.left = param.left;
				else if (this.type == "horizontal")
					this.left = this.map.getClientWidth();
				else
					this.left = this.map.getClientWidth() / 2;

				if (typeof param.top == "number")
					this.top = param.top;
				else if (this.type == "horizontal")
					this.top = this.map.getClientHeight() / 2;
				else
					this.top = this.map.getClientHeight();

				this.buildNode();
			},
			startup: function () {
				sg.controls.ControlBase.prototype.startup.apply(this, arguments);
				this.updateClip_();
			},
			destroy: function () {
				sg.controls.ControlBase.prototype.destroy.apply(this, arguments);
				if (this.layers) {
					var i = 0;
					while (i < this.layers.length) {
						var layer = this.layers[i];
						if (layer.getNode) {
							var nd = layer.getNode();
							if (nd)
								layer.getNode().style.clip = "";
						}
						i++;
					}
				}
			},
			buildNode: function () {
				var that = this;
				if (!this.node)
					return;

				sg.addClass(this.node, "layer-swipe");
				var bar = document.createElement("div");
				var handle = document.createElement("div");
				this.node.appendChild(bar);
				this.node.appendChild(handle);
				sg.addClass(handle, "handle");
				sg.addClass(bar, "bar");

				if (this.type == "horizontal") {
					sg.addClass(handle, "horizontal-handle");
					sg.addClass(bar, "horizontal-bar");
					this.node.style.left = "0px";
					this.node.style.top = this.top + "px";
					this.node.style.width = "100%";
					bar.style.top = -(bar.clientHeight / 2) + "px";
					handle.style.left = this.left / 2 - handle.clientWidth / 2 + "px";
				}
				else {
					sg.addClass(handle, "vertical-handle");
					sg.addClass(bar, "vertical-bar");
					this.node.style.left = this.left + "px";
					this.node.style.top = "0px";
					this.node.style.height = "100%";
					bar.style.left = -(bar.clientWidth / 2) + "px";
					handle.style.top = this.top / 2 - handle.clientHeight / 2 + "px";
				}
				var onMouseDown = function (e) {
					AttachEvent(document.body, "mousemove", onMoseMove);
					AttachEvent(document.body, "mouseup", onMouseUp);
					if (e.preventDefault)
						e.preventDefault();
					return false;
				};
				var onMouseUp = function (e) {
					DetachEvent(document.body, "mousemove", onMoseMove);
					DetachEvent(document.body, "mouseup", onMouseUp);
					if (e.preventDefault)
						e.preventDefault();
					return false;
				};
				var onMoseMove = function (e) {
					if (!that.node || !that.node.parentNode)
						return;

					var bbox = that.node.parentNode.getBoundingClientRect();
					if (that.type == "horizontal") {
						var top = e.clientY - bbox.top;
						that.top = top;
					}
					else {
						var left = e.clientX - bbox.left;
						that.left = left;
					}
					that.updateClip_();
					if (e.preventDefault)
						e.preventDefault();
					return false;
				};
				AttachEvent(handle, "mousedown", onMouseDown);
			},
			updateClip_: function () {
				var i = 0;
				while (i < this.layers.length) {
					var layer = this.layers[i];
					if (layer.getNode)
						var nd = layer.getNode();
					if (nd)
						layer.getNode().style.clip = "rect(0px," + this.left + "px," + this.top + "px,0px)";

					i++;
				}
				if (this.type == "horizontal")
					this.node.style.top = this.top + "px";
				else
					this.node.style.left = this.left + "px";
			}
		});

	sg.controls.Gauge = sg.controls.ControlBase.extend(
		{
			initialize: function (param, node) {
				sg.controls.ControlBase.prototype.initialize.apply(this, arguments);
				var that = this;
				this.angle = 0;
				this.outRadius = 80;
				this.inRadius = 60;
				if (param) {
					if (param.layer)
						this.layer = param.layer;
					this.maxDataValue = typeof param.maxDataValue == "number" ? param.maxDataValue : 100;
					this.dataField = typeof param.dataField == "string" ? param.dataField : "";
					this.dataFormat = typeof param.dataFormat == "string" ? param.dataFormat : "value";
					this.caption = typeof param.caption == "string" ? param.caption : "";
					this.title = typeof param.title == "string" ? param.title : "";
					this.dataLabelField = typeof param.dataLabelField == "string" ? param.dataLabelField : "";
					this.unitLabel = typeof param.unitLabel == "string" ? param.unitLabel : "";
					this.color = typeof param.color == "string" ? param.color : "#88ff33";
					this.lowColor = typeof param.lowColor == "string" ? param.lowColor : "#88ff33";
					this.midColor = typeof param.midColor == "string" ? param.midColor : "#FFD700";
					this.highColor = typeof param.highColor == "string" ? param.highColor : "#FF2400";
				}
				var content = document.createElement("div");
				sg.addClass(content, "sgGaugeContainer");
				content.style.width = "100%";
				content.style.height = "100%";
				this.captionSpan = document.createElement("span");
				this.captionSpan.setAttribute("class", "caption");
				this.captionSpan.style.position = "absolute";
				this.captionSpan.style.bottom = "0px";
				this.valueSpan = document.createElement("span");
				this.valueSpan.style.position = "absolute";
				this.valueSpan.setAttribute("class", "value");
				this.titleSpan = document.createElement("span");
				this.titleSpan.setAttribute("class", "title");
				this.titleSpan.style.position = "absolute";
				this.titleSpan.style.top = "0px";
				this.labelSpan = document.createElement("span");
				this.labelSpan.setAttribute("class", "label");
				this.labelSpan.style.position = "absolute";
				this.labelSpan.style.top = "1em";

				if (this.node) {
					this.node.appendChild(content);
					this.node.appendChild(this.captionSpan);
					this.node.appendChild(this.valueSpan);
					this.node.appendChild(this.titleSpan);
					this.node.appendChild(this.labelSpan);
				}

				this.cx = node.clientWidth / 2;
				this.cy = node.clientHeight / 4 * 3;
				var surface = null;
				surface = sg.createSurface(content);
				var backGauge = surface.path(this.createPathStr(0, this.outRadius, this.inRadius, this.cx, this.cy));
				backGauge.attr({ "fill": "#aaaaaa", "stroke": "#555555", "stroke-width": 2 });
				this.path = surface.path("");
				this.path.attr({ "fill": this.color, "stroke-width": 2 });
				this.captionSpan.innerHTML = this.caption;
				this.titleSpan.innerHTML = this.title;
				this.update();
			},
			update: function () {
				if (!this.feature)
					return;

				var that = this;
				var value = parseFloat(this.feature.attributes[this.dataField]);
				var mv = value;
				if (this.dataLabelField)
					this.labelSpan.innerHTML = this.feature.attributes[this.dataLabelField];

				if (mv < 0)
					mv = 0;
				if (mv > this.maxDataValue)
					mv = this.maxDataValue;

				if (value / this.maxDataValue <= 0.33)
					this.color = this.lowColor;
				else if (value / this.maxDataValue <= 0.66)
					this.color = this.midColor;
				else if (value / this.maxDataValue <= 1)
					this.color = this.highColor;

				var startAngle = this.angle;
				var endAngle = 180 * (1 - mv / this.maxDataValue);
				var da = endAngle - startAngle;
				if (this.animation)
					this.animation.stop();

				this.valueSpan.style.left = this.cx - this.valueSpan.clientWidth / 2 + "px";
				this.valueSpan.style.top = this.cy + "px";
				this.valueSpan.innerHTML = value + " " + this.unitLabel;

				if (isNaN(mv)) {
					var pathStr = that.createPathStr(180, that.outRadius, that.inRadius, that.cx, that.cy);
					that.path.attr({ path: pathStr });
					this.angle = 180;
					return;
				}

				this.animation = sg.fx.createAnimation(
					{
						easing: sg.fx.easing.quadInOut,
						type: window.requestAnimationFrame ? "" : "setTimeout",
						duration: 150,
						onAnimation: function (percent) {
							that.angle = startAngle + da * percent;
							var pathStr = that.createPathStr(that.angle, that.outRadius, that.inRadius, that.cx, that.cy);
							that.path.attr({ fill: that.color });
							that.path.attr({ path: pathStr });
						},
						onEnd: function () {
							var pathStr = that.createPathStr(endAngle, that.outRadius, that.inRadius, that.cx, that.cy);
							that.path.attr({ path: pathStr });
						}
					});
				this.animation.play();
			},
			setCaption: function (p) {
				if (typeof p != "string")
					return;
				this.caption = p;
				if (this.captionSpan)
					this.captionSpan.innerHTML = p;
			},
			setTitle: function (p) {
				if (typeof p != "string")
					return;
				this.title = p;
				if (this.titleSpan)
					this.titleSpan.innerHTML = p;
			},
			setLabel: function (p) {
				if (typeof p != "string")
					return;
				this.label = p;
				if (this.labelSpan)
					this.labelSpan.innerHTML = p;
			},
			setValue: function (p) {
				if (typeof p != "number")
					return;
				this.value = p;
				if (this.valueSpan) {
					this.valueSpan.innerHTML = p;
					this.valueSpan.style.left = this.cx - this.valueSpan.clientWidth / 2 + "px";
					this.valueSpan.style.top = this.cy;
				}
			},
			setFeature: function (p) {
				if (!(p instanceof sg.Graphic))
					return;
				this.feature = p;
				this.update();
			},
			startup: function () {
				sg.controls.ControlBase.prototype.startup.apply(this);
				var that = this;
				this.handler_ = sg.events.on(
					this.layer,
					"mouse-over",
					function (e) {
						that.feature = e.graphic;
						that.update();
					}
				);
			},
			destroy: function () {
				sg.controls.ControlBase.prototype.destroy.apply(this);
				if (this.handler_)
					this.handler_.remove();
				this.handler_ = null;
			},
			createPathStr: function (angle, out_radius, in_radius, cx, cy) {
				var theta = angle / 180 * Math.PI;
				x = cx + out_radius * Math.cos(theta);
				y = cy - out_radius * Math.sin(theta);
				x2 = cx + in_radius * Math.cos(theta);
				y2 = cy - in_radius * Math.sin(theta);
				return "M" + (cx - out_radius) + "," + cy + "A" + out_radius + "," + out_radius + ",0,0,1," + x + "," + y + "L" + x2 + "," + y2 + "A" + in_radius + "," + in_radius + ",0,0,0," + (cx - in_radius) + "," + cy + "z";
			}
		});
}
var checkbox_ID = 0;
function MapLegend(pNode, pCtx, pLayer, OnLegendClick, pMapBase) {
	var m_pExp = null;
	var m_pChk = null;
	var m_pImgDiv = null;
	var m_pSubDiv = null;
	var m_pLegends = null;
	var m_SelectedValue = null;

	var pDiv = pNode.ownerDocument.createElement("DIV");
	pNode.appendChild(pDiv);
	pDiv.style.position = "relative";
	pDiv.style.textAlign = "left";

	var pDiv2 = pDiv.ownerDocument.createElement("DIV");
	pDiv.appendChild(pDiv2);
	pDiv2.style.position = "relative";

	if (pLayer == null)
		return;

	this.targetLayer = pLayer;
	var pProperties = function (tEvent) {
		var pElem = tEvent.srcElement ? tEvent.srcElement : tEvent.target;
		if (pElem.tagName == "IMG" && pElem.className == "show") {
			if (!m_pSubDiv)
				return;

			if (m_pSubDiv.style.display == "none") {
				pElem.src = "images/lyrinfodown.png";
				pElem.ctype = "ShowClose";
				m_pSubDiv.style.display = "";
			}
			else {
				pElem.src = "images/right.png";
				pElem.ctype = "ShowOpen";
				m_pSubDiv.style.display = "none";
			}
		}
		else if (pElem.tagName == "INPUT") {
			pLayer.putVisible(pElem.checked);
			if (pLayer.RebuildElement)
				pLayer.RebuildElement();
			else if (pLayer.getParent)
				pLayer.getParent().RebuildElement();
		}
	};
	m_pExp = pNode.ownerDocument.createElement("IMG");
	m_pExp.src = "images/lyrinfodown.png";
	m_pExp.className = "show";
	m_pExp.ctype = "ShowClose";
	pDiv2.appendChild(m_pExp);

	if (pLayer.getVisible) {
		m_pChk = pNode.ownerDocument.createElement("INPUT");
		m_pChk.type = "checkbox";
		m_pChk.id = "LTCheckbox" + checkbox_ID++;
		m_pChk.checked = pLayer.getVisible();
		if (pLayer.getName)
			m_pChk.value = pLayer.getName();
		pDiv2.appendChild(m_pChk);
	}
	AttachEvent(pDiv2, "click", FuncAdapter(this, pProperties), false);
	var pLbl = pNode.ownerDocument.createElement("LABEL");
	pLbl.style.fontSize = "18px";
	pDiv2.appendChild(pLbl);
	if (pLayer.getTitle)
		pLbl.innerHTML = pLayer.getTitle();
	else if (pLayer.getName)
		pLbl.innerHTML = pLayer.getName();

	if (m_pSubDiv == null) {
		m_pSubDiv = pDiv.ownerDocument.createElement("DIV");
		pDiv.appendChild(m_pSubDiv);
		m_pSubDiv.style.position = "relative";
		m_pSubDiv.style.paddingLeft = "20px";
	}
	if (pLayer.getResource) {
		m_pImgDiv = pDiv.ownerDocument.createElement("DIV");
		m_pSubDiv.appendChild(m_pImgDiv);
		m_pImgDiv.style.position = "relative";
		m_pImgDiv.style.paddingLeft = "5px";
		pLayer.getResource(null, function (src) {
			var img = new Image();
			img.onload = function() {m_pImgDiv.appendChild(img);};
			img.src = src;
		});
	}
	this.selectedValue = function () {
		return m_SelectedValue;
	};
	this.getHandle = function () {
		return pDiv;
	};
	this.getLayer = function () {
		return pLayer;
	};
	this.CreateSubLegend = function (pLyr, OnLegendClick) {
		var pLgd = new MapLegend(m_pSubDiv, pCtx, pLyr, OnLegendClick, pMapBase);
		if (m_pLegends == null)
			m_pLegends = new Array;
		m_pLegends.push(pLgd);
		this.legends = m_pLegends;
		return pLgd;
	};
	this.Deactive = function () {
		pDiv2.style.background = "";
	};
	this.Active = function () {
		pDiv2.style.background = "gray";
	};
	this.FinalRelease = function () {
		if (m_pLegends) {
			for (var i = 0; i < m_pLegends.length; i++)
				m_pLegends[i].FinalRelease();
		}

		m_pLegends = null;
		pNode.removeChild(pDiv);
	};
	if (pLayer.CreateLegend) {
		pDiv.style.marginTop = "15px";
		var move_to_layer = document.createElement("IMG");
		var MapBase = pMapBase;
		move_to_layer.src = "images/PC_OtherTool/Go-Search.png";
		move_to_layer.style.marginRight = "10px";
		move_to_layer.style.float = "right";
		pDiv2.appendChild(move_to_layer);
		AttachEvent(move_to_layer, "click", function () {
			var top = pLayer.getTop();
			var left = pLayer.getLeft();
			var bottom = pLayer.getBottom();
			var right = pLayer.getRight();
			var extent = new sg.geometry.Extent;
			extent.xmax = right;
			extent.xmin = left;
			extent.ymax = top;
			extent.ymin = bottom;

			MapBase.ZoomMapTo(extent);
			MapBase.RefreshMap(true);
		});
		var hrNode = document.createElement("hr");
		hrNode.style.width = "95%";
		pDiv2.appendChild(hrNode);
		pLayer.CreateLegend(this);
	}
	else if (pLayer.title == "Drawing Layer" || pLayer.title == "OpenStreetMapLayer") {
		pDiv.style.marginTop = "15px";
		var move_to_layer = document.createElement("IMG");
		move_to_layer.src = "images/PC_OtherTool/Go-Search.png";
		move_to_layer.style.marginRight = "10px";
		move_to_layer.style.float = "right";
		pDiv2.appendChild(move_to_layer);
		var hrNode = document.createElement("hr");
		hrNode.style.width = "95%";
		pDiv2.appendChild(hrNode);
	}
}
function ContentControl(pParentElem, pMapBase, pLyrs) {
	var m_ActiveObj = null;
	var m_Values = null;
	var that = this;

	this.RebuildElement = function () {
		if (m_pLegends) {
			for (var i = 0; i < m_pLegends.length; i++)
				m_pLegends[i].FinalRelease();
		}
		m_pLegends = new Array;
		for (var i = 0; i < pLyrs.length; i++) {
			if (!pLyrs[i].hideLegend && pLyrs[i].getTitle() != "Graphics Layer" && pLyrs[i].getName() != "Graphics Layer") {
				var lgn = new MapLegend(m_hObj, that, pLyrs[i], null, pMapBase);
				m_pLegends.push(lgn);
				if (m_ActiveObj && m_ActiveObj.Active) {
					if (m_ActiveObj.targetLayer == pLyrs[i]) {
						lgn.Active();
						m_ActiveObj = lgn;
						break;
					}
					if (lgn.legends) {
						for (var l = 0; l < lgn.legends.length; l++) {
							var subLgn = lgn.legends[l];
							if (m_ActiveObj.targetLayer == subLgn.targetLayer) {
								subLgn.Active();
								m_ActiveObj = subLgn;
								break;
							}
						}
					}
				}
			}
		}
	};
	this.getActive = function () {
		return m_ActiveObj;
	};
	this.putActive = function (newVal) {
		if (m_ActiveObj != null && m_ActiveObj.Deactive)
			m_ActiveObj.Deactive();

		m_ActiveObj = newVal;
		if (m_ActiveObj != null && m_ActiveObj.Active)
			m_ActiveObj.Active();
	};
	this.getValues = function () {
		return m_Values;
	};
	this.setValues = function (values) {
		m_Values = values;
	};
	var m_pLegends = null;
	var m_hObj;
	m_hObj = pParentElem.ownerDocument.createElement("span");
	pParentElem.appendChild(m_hObj);
	m_hObj.style.fontSize = "12px";
	m_hObj.style.width = "100%";
	m_hObj.style.height = "100%";
	pMapBase.on("load", this.RebuildElement);
	pMapBase.on("layer-add", this.RebuildElement);
	pMapBase.on("layer-remove", this.RebuildElement);
	pMapBase.on("layers-removed", this.RebuildElement);
}
function CreateClipImage(pNode, sSrc, nLfet, nTop, nWidth, nHeight) {
	var pCont = pNode.ownerDocument.createElement("div");
	pNode.appendChild(pCont);
	pCont.style.position = "relative";
	pCont.style.width = nWidth + "px";
	pCont.style.height = nHeight + "px";
	pCont.style.overflow = "hidden";
	pImg = pCont.ownerDocument.createElement("img");
	pCont.appendChild(pImg);
	pImg.src = sSrc;
	pImg.style.position = "absolute";
	pImg.style.left = -nLfet + "px";
	pImg.style.top = -nTop + "px";
	pCont.Img = pImg;
	return pCont;
}
function ScaleBarControl(pParentElem, pMapBase, System, Style)
{
	var LineContent = [
				{ tag: "div", attr: { class: "barLine" },
					child: [
						{ tag: "div", attr: { class: "back V left" } }, { tag: "div", attr: { class: "back V right" } }, { tag: "div", attr: { class: "back H bottom" } },
						{ tag: "div", attr: { class: "force V left" } }, { tag: "div", attr: { class: "force V right" } }, { tag: "div", attr: { class: "force H bottom" } },
					] },
				{ tag: "div", attr: { class: "barText" } }
	];
	var BlockContent = [
				{ tag: "div", attr: { class: "barImage back" }, child: [{ tag: "span", attr: { class: "force" } }, { tag: "span", attr: { class: "force" } }, { tag: "span", attr: { class: "force" } }] },
				{ tag: "div", attr: { class: "barNumber" }, child: [{ tag: "span" }, { tag: "span" }, { tag: "span" }, { tag: "span" }, { tag: "span" }] },
				{ tag: "div", attr: { class: "barUnit" } }
	];
	var m_Units = [{ name: "km", unitratio: 1000 }, { name: "m", unitratio: 1 }];
	if (System == "English")
		m_Units = [{ name: "mi", unitratio: 1609.344 }, { name: "ft", unitratio: 0.3048 }];
	pParentElem.appendChild(SuperGIS.Windows.Create({ tag: "div", attr: { class: "scalebar" }, child: Style == "Line" ? LineContent : BlockContent }));

	this.UpdateElement = function()
	{
		function FitUnit(dDist, units)
		{
			var u;
			for (u in units)
				if (dDist >= units[u].unitratio)
					break;
			return units[u];
		}

		var Sep = (Style == "Line" ? 1 : 3);
		var maxDist = pMapBase.ToMapDistX(pParentElem.clientWidth / Sep);
		var u = FitUnit(maxDist, m_Units);
		var dP = Math.pow(10, Math.floor(Math.log10(maxDist / u.unitratio)));
		var nD = Math.floor(maxDist / u.unitratio / dP);
		var nD = nD < 2 ? 1 : nD < 5 ? 2 : 5;

		Array.from(pParentElem.getElementsByClassName("scalebar")).forEach(function (x, i) { x.style.width = pMapBase.FromMapDistX(dP * nD * u.unitratio * Sep) + "px"; });
		var ratio = [0, 0.5, 1, 2, 3];
		Array.from(pParentElem.getElementsByClassName("barUnit")).forEach(function (x, i) { x.innerHTML = u.name; });
		Array.from(pParentElem.getElementsByClassName("barNumber")).forEach(function (x) { Array.from(x.childNodes).forEach(function (y, i) { y.innerHTML = dP * nD * ratio[i % ratio.length]; }); })
		Array.from(pParentElem.getElementsByClassName("barText")).forEach(function (x) { x.innerHTML = dP * nD + u.name; })
	};
	this.UpdateElement();
}

function ToolbarControl(pParentElem, padding, nCol) {
	var m_hObj;
	var m_hRow;
	var m_Tools = new Array;
	var m_CurrentTool = null;
	m_hObj = pParentElem.ownerDocument.createElement("table");
	PreventDefault(m_hObj, "mousedown");
	pParentElem.appendChild(m_hObj);
	m_hObj.style.position = "relative";
	m_hObj.style.left = "0px";
	m_hObj.style.top = "0px";
	m_hObj.border = "0px";
	m_hObj.cellPadding = "0px";
	m_hObj.cellSpacing = "0px";

	this.FinalRelease = function () {
		if (m_Tools) {
			cnt = m_Tools.length;
			for (var i = 0; i < cnt; i++) {
				var hObj = m_Tools[i];

				if (hObj.pClickFunc)
					DetachEvent(hObj, "click", hObj.pClickFunc, false);
				hObj.pClickFunc = null;

				if (hObj.pMouseDownFunc)
					DetachEvent(hObj, "mousedown", hObj.pMouseDownFunc, false);
				hObj.pMouseDownFunc = null;

				if (hObj.pMouseOverFunc)
					DetachEvent(hObj, "mouseover", hObj.pMouseOverFunc, false);
				hObj.pMouseOverFunc = null;
			}
		}
		pParentElem.removeChild(m_hObj);
		m_Tools = null;
	};

	function ChangeClassName(pElem, strClass) {
		if (!pElem)
			return;

		if (strClass == "ButtonDown" || strClass == "ButtonFocus")
			pElem.Img.style.left = "-32px";
		else
			pElem.Img.style.left = "0px";
	}

	this.AddTool = function (pMapBase, pTool, imgPath, altString, title) {
		if (m_Tools.length == 0 || nCol != 0 && m_Tools.length % nCol == 0)
			m_hRow = m_hObj.insertRow(-1);

		var pCell = m_hRow.insertCell(-1);
		if (title)
			pCell.title = title;

		var hObj = CreateClipImage(pCell, imgPath, 0, 0, 32, 32);

		if (pTool && pTool.InitialMapBase)
			pTool.InitialMapBase(pMapBase);

		var pClick = function (tEvent) {
			var i;
			var cnt = m_Tools.length;
			for (i = 0; i < cnt; i++)
				ChangeClassName(m_Tools[i], "ButtonDefault");

			if (m_CurrentTool == hObj) {
				pMapBase.SelectMapTool(null);
				m_CurrentTool = null;
			}
			else if (pTool) {
				if (pMapBase.SelectMapTool(pTool))
					m_CurrentTool = hObj;
				else if (pTool.MapCommand)
					pTool.MapCommand(tEvent, pMapBase, hObj);
				ChangeClassName(m_CurrentTool, "ButtonDown");
			}
		};
		var pMouseDown = function (tEvent) {
			ChangeClassName(hObj, "ButtonDown");
			AttachEvent(hObj, "mouseup", pMouseUp, true);
		};
		var pMouseUp = function (tEvent) {
			ChangeClassName(hObj, "ButtonDefault");
			DetachEvent(hObj, "mouseup", pMouseUp, true);
		};
		var pMouseOver = function () {
			if (m_CurrentTool != hObj)
				ChangeClassName(hObj, "ButtonFocus");

			AttachEvent(hObj, "mouseout", pMouseOut, false);
		};
		var pMouseOut = function () {
			if (m_CurrentTool != hObj)
				ChangeClassName(hObj, "ButtonDefault");

			DetachEvent(hObj, "mouseout", pMouseOut, false);
		};
		hObj.pClickFunc = pClick;
		hObj.pMouseDownFunc = pMouseDown;
		hObj.pMouseOverFunc = pMouseOver;
		PreventDefault(hObj, "mousedown");
		AttachEvent(hObj, "click", pClick, false);
		AttachEvent(hObj, "mousedown", pMouseDown, false);
		AttachEvent(hObj, "mouseover", pMouseOver, false);
		m_Tools.push(hObj);
	};
	this.selectTool = function (Index) {
		m_Tools[Index].fireEvent("click");
	};
}
function PageControl(pParentElem) {
	var pThis = this;
	var pTbl = document.createElement("div");
	pParentElem.appendChild(pTbl);
	pTbl.style.border = "0";
	pTbl.style.width = "100%";
	pTbl.style.height = "100%";
	pTbl.style.backgroundImage = "url('images/3.2/javascript TOC/window4.png')";

	var pT1 = document.createElement("div");
	pT1.style.backgroundImage = "url('images/3.2/javascript TOC/window2.png')";
	pT1.style.color = "white";
	pT1.style.position = "absolute";
	pT1.style.fontWeight = "bold";
	pT1.style.height = "33px";
	pT1.style.width = "100%";
	pT1.style["text-align"] = "center";
	pT1.style["vertical-align"] = "middle";

	var content = document.createElement("div");
	content.id = "tocContent";
	content.style.position = "absolute";
	content.style.width = "100%";
	content.style.top = "33px";
	content.style.bottom = "44px";
	content.style.overflow = "auto";

	var pFootDiv = document.createElement("div");
	pFootDiv.style.position = "absolute";
	pFootDiv.style.height = "44px";
	pFootDiv.style.bottom = "0px";
	pFootDiv.style.width = "100%";
	pFootDiv.style.backgroundImage = "url('images/3.2/javascript TOC/window6.png')";
	pTbl.appendChild(content);
	pTbl.appendChild(pT1);
	pTbl.appendChild(pFootDiv);

	var pFootImg = document.createElement("img");
	pFootImg.src = "images/3.2/javascript TOC/window6.png";
	pFootImg.style.position = "absolute";
	pFootImg.style.top = "0px";
	pFootImg.style.left = "0px";
	var m_Pages = new Array;

	this.AddPage = function (sTitle, sPageImg, alternative) {
		var pImg = pFootDiv.ownerDocument.createElement("img");
		var span = document.createElement("span");
		span.appendChild(pImg);
		pFootDiv.appendChild(span);
		pImg.src = sPageImg;
		var pageContainer = document.createElement("div");
		pageContainer.style.position = "relative";
		content.appendChild(pageContainer);

		function pFunc(nIndex) {
			return function () {
				pThis.SetActivePage(nIndex);
			};
		}
		function pFuncIn(data) {
			return function () {
				if (data.active)
					return;
				data.elem.src = sPageImg;
			};
		}
		function pFuncOut(data) {
			return function () {
				if (data.active)
					return;
				data.elem.src = alternative;
			};
		}
		var pageData = { title: sTitle, container: span, normal: alternative, highlight: sPageImg, elem: pImg, cont: pageContainer };
		AttachEvent(pImg, "click", pFunc(m_Pages.length), false);
		AttachEvent(pImg, "mouseover", pFuncIn(pageData), false);
		AttachEvent(pImg, "mouseout", pFuncOut(pageData), false);
		m_Pages.push(pageData);
		this.SetActivePage(m_Pages.length - 1);
		return pageContainer;
	};
	this.SetActivePage = function (nIndex) {
		if (nIndex >= m_Pages.length)
			return;

		for (var i = 0; i < m_Pages.length; i++) {
			m_Pages[i].active = false;
			m_Pages[i].elem.src = m_Pages[i].normal;
			m_Pages[i].cont.style.display = "none";
		}

		pT1.innerHTML = m_Pages[nIndex].title;
		m_Pages[nIndex].elem.src = m_Pages[nIndex].highlight;
		m_Pages[nIndex].cont.style.display = "";
		m_Pages[nIndex].active = true;
	};
}
var LevelBarControl = function (pParentElem, pTrans) {
	var StepHeight = 10;
	var m_pMapBase = null;
	m_pLevelBarBar = pParentElem.ownerDocument.createElement("table");
	pParentElem.appendChild(m_pLevelBarBar);
	m_pLevelBarBar.style.position = "absolute";
	m_pLevelBarBar.style.left = "10px";
	m_pLevelBarBar.style.top = "40px";
	m_pLevelBarBar.style.width = "46px";
	m_pLevelBarBar.style.border = "0px";
	m_pLevelBarBar.cellPadding = "0";
	m_pLevelBarBar.cellSpacing = "0";
	var pRow = m_pLevelBarBar.insertRow(-1);
	var pCell = pRow.insertCell(-1);
	pCell.style.padding = "0px";
	pCell.style.backgroundImage = "url(images/3.2/Bar/pan.png)";
	pCell.style.backgroundRepeat = "no-repeat";
	pCell.style.backgroundPosition = "center";
	function PanMove(sx, sy) {
		var pt = m_pMapBase.ToMapPoint(m_pMapBase.getClientWidth() * sx, m_pMapBase.getClientHeight() * sy);
		m_pMapBase.MoveMapTo(pt.X, pt.Y);
		m_pMapBase.RefreshMap(true);
	}
	function ZoomLevel(lvl) {
		pTrans.putMapLevel(pTrans.getMapLevel() + lvl);
		pTrans.FitLevel();
		m_pMapBase.RefreshMap(true);
	}

	function StartThumdDrag(tEvent) {
		tEvent.preventDefault();
		tEvent.returenValue = false;
		if (tEvent.srcElement == pThumbImg) {
			var CurPos = tEvent.clientY;
			var CurLvl = pTrans.getMapLevel();
			function ThumbDraw(tEvent) {
				pTrans.putMapLevel(CurLvl + (CurPos - tEvent.clientY) / StepHeight);
				m_pMapBase.RefreshMap(false);
			}
			function EndThumbDraw(tEvent) {
				DetachEvent(pImg, "mousemove", ThumbDraw, true);
				DetachEvent(pImg, "mouseup", EndThumbDraw, true);
				pTrans.FitLevel();
				m_pMapBase.RefreshMap(true);
			}
			AttachEvent(pImg, "mousemove", ThumbDraw, true);
			AttachEvent(pImg, "mouseup", EndThumbDraw, true);
		}
		else {
			pTrans.putMapLevel((pDiv.clientHeight - tEvent.offsetY) / StepHeight - .5);
			pTrans.FitLevel();
			m_pMapBase.RefreshMap(true);
		}
	}

	var pPad = pCell.ownerDocument.createElement("table");
	pPad.setAttribute("class", "level-pad");
	pCell.appendChild(pPad);
	var pRow1 = pPad.insertRow(-1);
	pRow1.setAttribute("class", "top-row");

	var pCell1 = pRow1.insertCell(-1);
	var pCell1 = pRow1.insertCell(-1);
	var pImg = pCell1.ownerDocument.createElement("img");
	pCell1.appendChild(pImg);
	pImg.src = "images/3.2/Bar/Pan_o_up.png";
	AttachEvent(pImg, "click", function () {
		PanMove(.5, 0);
	}, false);

	var pCell1 = pRow1.insertCell(-1);
	var pRow1 = pPad.insertRow(-1);
	pRow1.setAttribute("class", "middle-row");
	var pCell1 = pRow1.insertCell(-1);
	var pImg = pCell1.ownerDocument.createElement("img");
	pCell1.appendChild(pImg);
	pImg.src = "images/3.2/Bar/Pan_o_L.png";
	AttachEvent(pImg, "click", function () {
		PanMove(0, .5);
	}, false);

	var pCell1 = pRow1.insertCell(-1);
	var pCell1 = pRow1.insertCell(-1);
	var pImg = pCell1.ownerDocument.createElement("img");
	pCell1.appendChild(pImg);
	pImg.src = "images/3.2/Bar/Pan_o_R.png";
	AttachEvent(pImg, "click", function () {
		PanMove(1, .5);
	}, false);

	var pRow1 = pPad.insertRow(-1);
	pRow1.setAttribute("class", "bottom-row");
	var pCell1 = pRow1.insertCell(-1);
	var pCell1 = pRow1.insertCell(-1);
	var pImg = pCell1.ownerDocument.createElement("img");
	pCell1.appendChild(pImg);
	pImg.src = "images/3.2/Bar/Pan_o_donw.png";
	AttachEvent(pImg, "click", function () {
		PanMove(.5, 1);
	}, false);

	var pCell1 = pRow1.insertCell(-1);
	var pRow = m_pLevelBarBar.insertRow(-1);
	var pCell = pRow.insertCell(-1);
	pCell.align = "center";
	var pSlider = pCell.ownerDocument.createElement("table");
	pCell.appendChild(pSlider);
	pSlider.border = "0";
	pSlider.cellPadding = "0";
	pSlider.cellSpacing = "0";
	pSlider.width = "22";
	var pRow1 = pSlider.insertRow(-1);
	var pCell1 = pRow1.insertCell(-1);
	pCell1.height = "22";
	pCell1.vAlign = "bottom";
	pCell1.align = "center";
	pCell1.style.backgroundImage = "url(images/3.2/Bar/Bar_out.png)";

	var c1 = pCell1;
	AttachEvent(c1, "mouseover", function () {
		c1.style.backgroundImage = "url(images/3.2/Bar/Bar_o_out.png)";
	}, false);
	AttachEvent(c1, "mouseout", function () {
		c1.style.backgroundImage = "url(images/3.2/Bar/Bar_out.png)";
	}, false);
	AttachEvent(c1, "click", function () {
		ZoomLevel(1);
	}, false);

	var pRow1 = pSlider.insertRow(-1);
	var pCell1 = pRow1.insertCell(-1);
	pCell1.height = Math.max(1, pTrans.getMapMaxLevel()) * StepHeight + "px";
	pCell1.align = "center";
	pCell1.style.backgroundImage = "url(images/3.2/Bar/Bar_02.png)";
	var pDiv = pCell1.ownerDocument.createElement("div");
	pCell1.appendChild(pDiv);
	pDiv.style.position = "relative";
	pDiv.style.width = "22px";
	pDiv.style.height = "100%";
	var pThumbImg = pDiv.ownerDocument.createElement("img");
	pDiv.appendChild(pThumbImg);
	pThumbImg.style.position = "absolute";
	pThumbImg.src = "images/3.2/Bar/Bar.png";
	pThumbImg.style.left = "0px";
	pThumbImg.style.bottom = "0px";
	AttachEvent(pDiv, "mousedown", StartThumdDrag, false);
	var pRow1 = pSlider.insertRow(-1);
	var pCell1 = pRow1.insertCell(-1);
	pCell1.height = "22";
	pCell1.vAlign = "top";
	pCell1.align = "center";
	pCell1.style.backgroundImage = "url(images/3.2/Bar/Bar_in.png)";
	var c2 = pCell1;
	AttachEvent(c2, "mouseover", function () {
		c2.style.backgroundImage = "url(images/3.2/Bar/Bar_o_in.png)";
	}, false);
	AttachEvent(c2, "mouseout", function () {
		c2.style.backgroundImage = "url(images/3.2/Bar/Bar_in.png)";
	}, false);
	AttachEvent(c2, "click", function () {
		ZoomLevel(-1);
	}, false);
	this.Initialize = function (pMapBase) {
		m_pMapBase = pMapBase;
	};
	this.UpdateElement = function () {
		var ltpt = (pTrans.getMapLevel() + .5) * StepHeight - pThumbImg.clientHeight / 2;
		pThumbImg.style.bottom = ltpt + "px";
	};
	this.RebuildElement = function () { };
	this.UpdateElement();
};
var LayerInfoTool = function (parentNode, pMapBase, tooltype) {
	var m_ActiveObj = null;
	var m_Values = null;
	var pthat = this;
	var pLyrs = pMapBase.getLayers();
	var m_pLegends = new Array;

	var mNode = document.createElement("div");
	mNode.id = "Layersmenu";
	mNode.className = "drawertoolbar";
	parentNode.appendChild(mNode);

	var mNode_hrNode = document.createElement("hr");
	mNode_hrNode.style.position = "absolute";
	mNode_hrNode.style.bottom = "30px";
	mNode_hrNode.style.width = "100%";
	mNode.appendChild(mNode_hrNode);

	var mNode_title = document.createElement("div");
	mNode_title.className = "toolbartitle";
	mNode_title.style.display = "none";
	var mNode_title_h2 = document.createElement("h2");
	mNode_title_h2.innerHTML = "Layers";
	var mNode_title_bkimg = document.createElement("img");
	mNode_title_bkimg.src = "images/right-arrow-of-straight-lines.png";
	AttachEvent(mNode_title_bkimg, "click", function () {
		mNode.style.width = "0px";
		FindXMLNodeById(document, "Coordinate").style.zIndex = "32767";
	});

	mNode_title.appendChild(mNode_title_h2);
	mNode_title.appendChild(mNode_title_bkimg);

	mNode.appendChild(mNode_title);
	var mNode_hrNode = document.createElement("hr");
	mNode_hrNode.style.position = "absolute";
	mNode_hrNode.style.bottom = "30px";
	mNode_hrNode.style.width = "100%";
	mNode.appendChild(mNode_hrNode);

	var img_control_group = document.createElement("div");
	img_control_group.style.bottom = "5px";
	img_control_group.style.left = "0px";
	img_control_group.style.position = "absolute";
	img_control_group.style.width = "100%";
	img_control_group.style.height = "30px";
	mNode.appendChild(img_control_group);
	//然後把上面那兩個放進去該不可穿透之div
	var mNode_ShowOn_img = document.createElement("img");
	mNode_ShowOn_img.src = "images/PC_OtherTool/Collapse-All20.png";
	mNode_ShowOn_img.style.float = "left";
	mNode_ShowOn_img.style.marginTop = "5px";
	mNode_ShowOn_img.style.marginLeft = "10px";
	mNode_ShowOn_img.style.height = "25px";
	mNode_ShowOn_img.style.width = "25px";
	mNode_ShowOn_img.title = "Expansion All Layers";
	AttachEvent(mNode_ShowOn_img, "click", function () {
		var k = FindXMLNodesByClassName(document, "show");
		for (var i = k.length - 1; i >= 0; i--) {
			if (k[i].ctype == "ShowOpen")
				k[i].click();
		}
	});

	var mNode_ShowOff_img = document.createElement("img");
	mNode_ShowOff_img.src = "images/PC_OtherTool/Unfold-All20.png";
	mNode_ShowOff_img.style.float = "left";
	mNode_ShowOff_img.style.marginTop = "5px";
	mNode_ShowOff_img.style.marginLeft = "10px";
	mNode_ShowOff_img.style.height = "25px";
	mNode_ShowOff_img.style.width = "25px";
	mNode_ShowOff_img.title = "Retracted All Layers";
	AttachEvent(mNode_ShowOff_img, "click", function () {
		var k = FindXMLNodesByClassName(document, "show");
		for (var i = k.length - 1; i >= 0; i--) {
			if (k[i].ctype == "ShowClose")
				k[i].click();
		}
	});

	img_control_group.appendChild(mNode_ShowOn_img);
	img_control_group.appendChild(mNode_ShowOff_img);

	var pNode = document.createElement("div");
	pNode.style.width = "100%";
	pNode.style.overflow = "auto";
	pNode.style.height = "calc(100% - 50px)";
	mNode.appendChild(pNode);

	var active = new ContentControl(pNode, pMapBase, pLyrs);
	active.RebuildElement();
};