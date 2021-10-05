/**
 * Gary製SuperGeo Web Mapper 發布後的站台所需新功能的套件
 */
var SuperGeoUtility = {
    /**
     * Gary Lu 20190318
     * Javascript版單位轉換器，提供長度與面積的換算
     * 作為SuperGIS 發布站台內所需長度與面積計算用途
     */
    MeasurementUnitTable: {
        /**
        *長度單位表
        */
        LengthUnitTable: {
            "Kilometers": {
                "Kilometers": 1,
                "Meters": 1000,
                "Miles": 0.6214,
                "Yards": 1093.6,
                "Feet": 3280.83989501312
            },
            "Meters": {
                "Kilometers": 0.001,
                "Meters": 1,
                "Miles": 0.0006214,
                "Yards": 1.0936,
                "Feet": 3.28083989501312
            },
            "Miles": {
                "Kilometers": 1.609344,
                "Meters": 1609.344,
                "Miles": 1,
                "Yards": 1760,
                "Feet": 5280
            },
            "Yards": {
                "Kilometers": 0.0009144,
                "Meters": 0.9144,
                "Miles": 0.0005681818,
                "Yards": 1,
                "Feet": 3
            },
            "Feet": {
                "Kilometers": 0.0003048,
                "Meters": 0.3048,
                "Miles": 0.00018939394,
                "Yards": 1 / 3,
                "Feet": 1
            },
            /*上面是轉換對照表*/
            "SwitchUnit": function (length, fromUnit, toUnit) {
                /*單位轉換函數*/
                var Std = ["Kilometers", "Meters", "Miles", "Yards", "Feet"];
                if (Std.indexOf(fromUnit) == -1 || Std.indexOf(toUnit) == -1) {
                    throw new Error("來源單位與目的單位至少有一個不是受支援的長度單位。");
                }
                var transval = this[fromUnit][toUnit];
                return (length * transval);
            }
        },
        /**
        *面積單位表
        */
        AreaUnitTable: {
            "Sq Kilometers": {
                "Sq Kilometers": 1,
                "Hectares": 100,
                "Sq Miles": 0.3861021585,
                "Sq Yards": 1195990.0463010802,
                "Sq Feet": 10763910.4167097223
            },
            "Hectares": {
                "Sq Kilometers": 0.01,
                "Hectares": 1,
                "Sq Miles": 0.003861021585,
                "Sq Yards": 11959.900463010802,
                "Sq Feet": 107639.104167097223
            },
            "Sq Miles": {
                "Sq Kilometers": 2.589988110336,
                "Hectares": 258.9988110336,
                "Sq Miles": 1,
                "Sq Yards": 3097600,
                "Sq Feet": 27878400
            },
            "Sq Yards": {
                "Sq Kilometers": 0.00000083612736,
                "Hectares": 0.000083612736,
                "Sq Miles": 1 / 3097600,
                "Sq Yards": 1,
                "Sq Feet": 9
            },
            "Sq Feet": {
                "Sq Kilometers": 0.00000009290304,
                "Hectares": 0.000009290304,
                "Sq Miles": 1 / 27878400,
                "Sq Yards": 1 / 9,
                "Sq Feet": 1
            },
            "SwitchUnit": function (length, fromUnit, toUnit) {
                var Std = ["Sq Kilometers", "Hectares", "Sq Miles", "Sq Yards", "Sq Feet"];
                if (Std.indexOf(fromUnit) == -1 || Std.indexOf(toUnit) == -1) {
                    throw new Error("來源單位與目的單位至少有一個不是受支援的面積單位。");
                }
                var transval = this[fromUnit][toUnit];
                return (length * transval);
            }
        }
    },
    /**
     * Gary Lu 20190319 參考 https://www.w3schools.com/howto/howto_js_draggable.asp
     * 讓一個DIV可以被拖曳變更出現位置
     * 放在這裡做成套件的原因是不只有一個DIV需要被拖曳
     */
    DragDIVToMoveController: {
        "DragElement": function (element) {
            element.onmousedown = function(e) {
                e = e || window.event;
                e.preventDefault();
                var pos3 = e.clientX;
                var pos4 = e.clientY;
                document.onmouseup = function()
				{
            		document.onmouseup = null;
            		document.onmousemove = null;
                };
                document.onmousemove = function(e)
                {
                	e = e || window.event;
                	e.preventDefault();
                	//Gary Lu 20190322:不能超出上方與左方 & 不能超出下方與右方
                	element.parentNode.style.left = Math.min(Math.max(element.parentNode.offsetLeft - (pos3 - e.clientX), 0), document.body.clientWidth - element.clientWidth) + "px";
                	element.parentNode.style.top = Math.min(Math.max(element.parentNode.offsetTop - (pos4 - e.clientY), 0), document.body.clientHeight - 50) + "px";
                	pos3 = e.clientX;
                	pos4 = e.clientY;
                };
            }
        }
    },
    /**
    * 由下往上展開的視窗統一樣式處理：
    */
    PopFromButtomDlgControl: {
        /**
        * 切換是否只顯示標題
        */
        switchBodyShowAndOff: function () {
            //按鍵圖也要跟著換
            if (!document.getElementById("DlgBody").hasAttribute("hidden")) {
                document.getElementById("UpDown").setAttribute("src", "images//Mobile_MainTool/divup.png");
                //最上面標頭50px
                document.getElementById("mapNode").style.height = (document.body.clientHeight - 40 - 50) + "px";
                //Menu留40px高的標頭就可以了
                document.getElementById("PopFromBottomDlg").style.height = "40px";
                document.getElementById("DlgBody").setAttribute("hidden", "hidden");
            } else {
                document.getElementById("mapNode").style.height = "60%";
                document.getElementById("PopFromBottomDlg").style.height = (document.body.clientHeight - document.getElementById("mapNode").clientHeight - 50) + "px";
                document.getElementById("UpDown").setAttribute("src", "images//Mobile_MainTool/divdown.png");
                document.getElementById("DlgBody").removeAttribute("hidden");
            }
        },
        /**
        * 顯示由下往上展開的視窗
        */
        showDlg: function () {
            if (document.getElementById("PopFromBottomDlg").style.display == "none") {
                document.getElementById("mapNode").style.height = "60%";
                document.getElementById("PopFromBottomDlg").style.display = "";
                document.getElementById("PopFromBottomDlg").style.height = (document.body.clientHeight - document.getElementById("mapNode").clientHeight - 50) + "px";
                gMapBase.RefreshMap(false);
            }
        },
        /**
        * 關閉這個由下往上展開的視窗
        */
        closeDlg: function () {
            document.getElementById("PopFromBottomDlg").style.display = "none";
            document.getElementById("mapNode").style.height = "100%";
            gMapBase.RefreshMap(false);
        }
    },
    Coords: {
        EPSG3826: "PROJCS[\"TWD_1997_TM_Taiwan\", GEOGCS[\"GCS_TWD_1997\", DATUM[\"D_TWD_1997\", SPHEROID[\"GRS_1980\", 6378137.0, 298.257222101]], PRIMEM[\"Greenwich\", 0.0], UNIT[\"Degree\", 0.017453292519943295], AUTHORITY[\"EPSG\", 3824]], PROJECTION[\"Transverse_Mercator\"], PARAMETER[\"False_Easting\", 250000.0], PARAMETER[\"False_Northing\", 0.0], PARAMETER[\"Central_Meridian\", 121.0], PARAMETER[\"Scale_Factor\", 0.9999], PARAMETER[\"Latitude_Of_Origin\", 0.0], UNIT[\"Meter\", 1.0], AUTHORITY[\"EPSG\", 3826]]",
        EPSG3857: "PROJCS[\"WGS 84 / Pseudo-Mercator\", GEOGCS[\"WGS 84\", DATUM[\"WGS_1984\", SPHEROID[\"WGS 84\",6378137,298.257223563, AUTHORITY[\"EPSG\",\"7030\"]], AUTHORITY[\"EPSG\",\"6326\"]], PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]], UNIT[\"degree\",0.0174532925199433, AUTHORITY[\"EPSG\",\"9122\"]], AUTHORITY[\"EPSG\",\"4326\"]], PROJECTION[\"Mercator_1SP\"], PARAMETER[\"central_meridian\",0], PARAMETER[\"scale_factor\",1], PARAMETER[\"false_easting\",0], PARAMETER[\"false_northing\",0], UNIT[\"metre\",1, AUTHORITY[\"EPSG\",\"9001\"]], AXIS[\"X\",EAST], AXIS[\"Y\",NORTH], EXTENSION[\"PROJ4\",\"+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs\"], AUTHORITY[\"EPSG\",\"3857\"]"
    },
    /**
     * 通用副程式
     */
    CommonSubs: {
        /**
         * 清除掉一個select的所有選項
         * @param {string} selectid 要被清除所有選項的<select>ID
         */
        "ClearSelectOptions": function (selectId) {
            var select = document.getElementById(selectId);
            while (select.options.length > 0) {
                select.remove(0);
            }
        },
        /**
         * 視窗寬高判定
         */
        "CurrentMode": function ()
        {
        	if (window.matchMedia('(min-height:481px) and (min-width:481px)').matches)
        		return SuperGeoUtility.WindowMode.PC;
        	if (window.matchMedia('(orientation:portrait)').matches)
        		return SuperGeoUtility.WindowMode.MOBILE_VERTICAL;
			else
        		return SuperGeoUtility.WindowMode.MOBILE_HORIZONTAL;
        },
        /**
         * 目前執行模式是不是電腦版
         */
        "CurrentModeIsPC": function () {
        	return (SuperGeoUtility.CommonSubs.CurrentMode() == SuperGeoUtility.WindowMode.PC);
        },
        /**
         *  測量結果數據用Label動態附加在指定的DIV內
         */
        "AppendMeasurementResultLabel": function (target_div_id) {
            //先刪除掉現存的
            var elem = document.getElementById("MeasureResult");
            if (elem != undefined) {
                elem.parentNode.removeChild(elem);
            }
            elem = document.getElementById("numMeasureResult");
            if (elem != undefined) {
                elem.parentNode.removeChild(elem);
            }
            elem = document.getElementById("selMeasureUnits");
            if (elem != undefined) {
                elem.parentNode.removeChild(elem);
            }
            elem = document.getElementById("btnClearMeasureResult");
            if (elem != undefined) {
                elem.parentNode.removeChild(elem);
            }
            //下拉單位選單
            var sel = document.createElement("select");
            sel.id = "selMeasureUnits";
            sel.hidden = "hidden";
            sel.style.height = "40px";
            sel.style.width = "110px";
            sel.style.marginLeft = "5%";
            sel.style.marginTop = "5px";
            sel.style.float = "left";
            sel.style.borderRadius = "6px";
            sel.onchange = function () { UnitChange(); };
            document.getElementById(target_div_id).appendChild(sel);
            //清除計算結果用按鍵
            var btn = document.createElement("input");
            btn.id = "btnClearMeasureResult";
            btn.type = "button";
            btn.style.marginLeft = "5%";
            btn.style.marginTop = "5px";
            btn.style.float = "left";
            btn.value = "Clear";
            btn.className = "FlatButtonStyle";
            btn.onclick = function () { ClearMeasureResultWithValues(); };
            document.getElementById(target_div_id).appendChild(btn);
            //顯示結果用Label
            var labelA = document.createElement("label");
            labelA.id = "MeasureResult";
            labelA.style.marginLeft = "5%";
            labelA.style.marginTop = "10px";
            labelA.style.float = "left";
            labelA.style.width = "95%";
            document.getElementById(target_div_id).appendChild(labelA);
            //隱藏起來作為單位切換用
            var labelB = document.createElement("label");
            labelB.id = "numMeasureResult";
            labelB.style.display = "none";
            document.getElementById(target_div_id).appendChild(labelB);
        },
        /**
         * EPSG 3857座標轉成EPSG 3826座標(TWD 97 121分帶)
         * @param {number} x_3857 EPSG 3857座標X軸值
         * @param {number} y_3857 EPSG 3857座標Y軸值
         */
        "EPSG3857To3826": function (x_3857, y_3857) {
            var pm = new sg.Projection.PseudoMercator(0, 0, 0, 0); // EPSG:3857
            var pt = pm.Inverse({ SemiMajorAxis: 6378137 }, new MapPoint(x_3857, y_3857)); // 先轉成經緯度的 pt

            var tm = new sg.Projection.TransverseMercator(121, 250000, 0, 0); // EPSG:3826
            var result = tm.Forward({ SemiMajorAxis: 6378137, es: 0 }, new MapPoint(pt.X, pt.Y));
            return result;
        }
    },
    /**
     * 目前執行模式
     * (受影響範圍：Measurement功能，計算後數據呈現方式變更)
     */
    WindowMode: {
        MOBILE_VERTICAL: "MOBILE_VERTICAL",//手機直式
        MOBILE_HORIZONTAL: "MOBILE_HORIZONTAL",//手機橫式
        PC: "PC"//平板或電腦版
    },
};