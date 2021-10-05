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
} ())

