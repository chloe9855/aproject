function IndexView(pTrans, pLayers, userpass)
{
	var pDivM = null;
	var pOverview = null;
	this.MapCommand = function(tEvent, pMapBase, hObj)
	{
		if (pDivM == null)
		{
			var idmo = document.getElementById("IndexMap");
			var idmi = document.getElementById("IndexMapNode");
			pOverview = new Overview(idmi, pMapBase, pTrans, "174px", "107px", 4);
			for (var i = 0 ; i < pLayers.length ; i++)
			{
				var pLayer = new MapLayer(pLayers[i].value, pLayers[i].url, pLayers[i].userpass);
				pOverview.getMapBase().AddLayer(pLayer);
			}
		}
		else
		{
			if (pDivM.style.display == "")
				pDivM.style.display = "none";
			else
				pDivM.style.display = "";
		}
	};
}
function MagnifierBase(pParentElem, pMapBase, pLayer, pTrans, diffLevel)
{
	this.Visible = function(Visib)
	{
		if (Visib)
			this.Show();
		else
			this.Hide();
	};
	this.IsVisible = function()
	{
		return m_MainTable.style.visibility != "hidden";
	};
	this.Hide = function()
	{
		m_MainTable.style.visibility = "hidden";
	};
	this.Show = function()
	{
		m_MainTable.style.visibility = "visible";
	};
	this.getMapBase = function()
	{
		return m_MapBase;
	};
	this.ViewAt = function(dX, dY, bClearAll)
	{
		var pt = m_TargetMapBase.FromMapPoint(dX, dY);
		var tX = pt.X - m_CenterOffsetX;
		var tY = pt.Y - m_CenterOffsetY;
		m_MainTable.style.left = tX + "px";
		m_MainTable.style.top = tY + "px";
		m_MapBase.MoveMapTo(dX, dY);
		m_pTrans.putScale(pTrans.getScale() * Math.pow(2, diffLevel));
		m_MapBase.RefreshMap(bClearAll);
	};
	this.RebuildElement = function()
	{
		var tX = parseInt(m_MainTable.style.left);
		var tY = parseInt(m_MainTable.style.top);
		var nX = m_CenterOffsetX + tX;
		var nY = m_CenterOffsetY + tY;
		var pt = m_TargetMapBase.ToMapPoint(nX, nY);
		this.ViewAt(pt.X, pt.Y, true);
	};
	this.UpdateElement = function(imgRatio)
	{
		if (m_MapMagnifierAsync && this.IsVisible)
		{
			var tX = parseInt(m_MainTable.style.left);
			var tY = parseInt(m_MainTable.style.top);
			var nX = m_CenterOffsetX + tX;
			var nY = m_CenterOffsetY + tY;
			var pt = m_TargetMapBase.ToMapPoint(nX, nY);
			this.ViewAt(pt.X, pt.Y, false);
		}
	};
	var m_MapBase;
	var m_MainTable;
	var m_MapMagnifier;
	var MouseCurX;
	var MouseCurY;
	var m_TargetMapBase;
	var m_CenterOffsetX = 0;
	var m_CenterOffsetY = 0;
	var m_MapMagnifierAsync = true;
	m_TargetMapBase = pMapBase;
	pDoc = pParentElem.ownerDocument;
	m_MainTable = pDoc.createElement("table");
	pTbl = m_MainTable;
	pParentElem.appendChild(pTbl);
	pTbl.style.position = "absolute";
	pTbl.style.left = "0px";
	pTbl.style.top = "0px";
	pTbl.border = 0;
	pTbl.cellPadding = 0;
	pTbl.cellSpacing = 0;
	pTbl.unselectable = "on";
	pRow = pTbl.insertRow(-1);
	pCell = pRow.insertCell(-1);
	pCell.style.position = "absolute";
	
	var pTracker = new DragTracker(pTbl, pTbl);
	pTracker.MoveEvent = FuncAdapter(this, function()
	{
		this.UpdateElement();
	});
	pTracker.DropEvent = FuncAdapter(this, function()
	{
		this.RebuildElement();
	});
	pImg = pDoc.createElement("IMG");
	pCell.appendChild(pImg);
	pImg.onmousedown = function()
 	{
		return false;
	};

	pImg.galleryImg = false;
	pImg.hideFocus = true;
	pImg.style.MozUserSelect = "none";
	pImg.style.position = "absolute";
	pImg.style.left = "0px";
	pImg.style.top = "0px";
	pImg.border = 0;
	pImg.src = "images/windows/030_03.png";
	m_CenterOffsetX = 87;
	m_CenterOffsetY = 54;
	pDiv = pDoc.createElement("DIV");
	pCell.appendChild(pDiv);
	pDiv.style.position = "absolute";
	pDiv.style.left = "6px";
	pDiv.style.top = "8px";
	pDiv.style.width = "174px";
	pDiv.style.height = "107px";
	pDiv.style.background = "white";
	pDiv.style.overflow = "hidden";
	
	if (pLayer)
	{
		var m_pTrans = new ScaleTransformation(1);
		m_pTrans.putBaseScaleX(pTrans.getBaseScaleX());
		m_pTrans.putBaseScaleY(pTrans.getBaseScaleY());
		m_pTrans.putScale(pTrans.getScale() * Math.pow(2, diffLevel));
		m_MapBase = new MapBase(pDiv, m_pTrans, "0px", "0px", "174px", "107px");
		m_MapBase.AddLayer(pLayer);
	}
	this.ViewAt(m_TargetMapBase.getCenterX(), m_TargetMapBase.getCenterY(), true);
}
function MagnifierTool(pTrans, pLayer)
{
	var m_pMagni;
	this.MapCommand = function(tEvent, pMapBase, hObj)
	{
		if (m_pMagni == null)
		{
			m_pMagni = new MagnifierBase(pMapBase.getHPackage(), pMapBase, pLayer, pTrans, 2);
			pMapBase.AddElement(m_pMagni);
			pMapBase.RefreshMap(true);
		}
		else if (m_pMagni.IsVisible())
			m_pMagni.Hide();
		else
			m_pMagni.Show();
	};
}
function PanTool(bAllowDblClick, bAllowWheel)
{
	var MouseCurX;
	var MouseCurY;
	var m_bMapAction = false;
	var Touch1;
	var Touch2;
	var m_bTouchAction = false;
	var TouchDoubleTap;
	var firstClick = false;
	var secondClick = false;
	var tapTimer = null;
	var TouchMapCenter;
	var TouchScrCenter;
	var TouchScrLength;
	var TouchCellSizeX;
	var TouchCellSizeY;
	var TouchMapScale;
	var TouchMapStartAngle;
	var mapStartAngle;
	var m_bMultiTouch = false;
	var LastMapCenter;
	var LastMapScale;
	var m_bMultiTouching = false;
	var tWheelTimer = null;
	var that = this;
	this.isAngle = false;
	this.ExitMapEvent = null;
	var mobile = CheckDevice();
	
	this.IsMapAction = function()
	{
		return m_bMapAction;
	};
	this.InitMapEvent = function(pMapBase)
	{
		var hPack = pMapBase.getHPackage();
		var hObj = hPack;
		var touches = [], changedTouches = [];
		var waitDoubleTap = function(t)
		{
			tapTimer = setTimeout(function()
			{
				firstClick = false;
			}, t);
		};
		var isNearest = function(pt1, pt2, dist)
		{
			var d = 20;
			if (dist)
				d = dist;
			if (Math.abs(pt1.X - pt2.X) <= d && Math.abs(pt1.Y - pt2.Y) <= d)
				return true;
			return false;
		};
		var getTouchScreenValue = function(pt1, pt2)
		{
			var pos1 = pMapBase.getCursorPosition(pt1);
			var pos2 = pMapBase.getCursorPosition(pt2);
			var scx = parseFloat((pos1.X + pos2.X) / 2);
			var scy = parseFloat((pos1.Y + pos2.Y) / 2);
			var len = Math.sqrt((pos1.X - pos2.X) * (pos1.X - pos2.X) + (pos1.Y - pos2.Y) * (pos1.Y - pos2.Y));
			var dx = pt1.screenX - pt2.screenX;
			var dy = pt1.screenY - pt2.screenY;
			var angle = sg.math.radianToDegree(Math.atan2(dx, dy));
			return{scrCenter:{X:scx, Y:scy}, length:len, angle:angle};
		};
		var getTouchValue = function(pt1, pt2)
		{
			var val = getTouchScreenValue(pt1, pt2);
			var center = val.scrCenter;
			var len = val.length;
			var map = pMapBase.ToMapPoint(center.X, center.Y);
			var angle = val.angle;
			return{mapCenter:map, scrCenter:center, length:len, angle:angle};
		};
		var pTouchStart = function(evt)
		{
			evt.preventDefault();
			touches = evt.touches;
			var t = touches[0];
			if (firstClick == true)
			{
				var dummy = {X:touches[0].clientX, Y:touches[0].clientY};
				if (isNearest(dummy, Touch1) == true)
				{
					secondClick = true;
					firstClick = false;
					TouchDoubleTap = t;
				}
			}
			Touch1 = {X:t.clientX, Y:t.clientY};
			if (touches.length > 1)
			{
				var t2 = touches[1];
				var val = getTouchValue(t, t2);
				TouchMapCenter = val.mapCenter;
				TouchScrCenter = val.scrCenter;
				TouchScrLength = val.length;
				TouchMapStartAngle = val.angle;
				TouchCellSizeX = pMapBase.getCellSizeX();
				TouchCellSizeY = pMapBase.getCellSizeY();
				TouchMapScale = pMapBase.getScale();
				mapStartAngle = pMapBase.getAngle();
				m_bMultiTouch = true;
				Touch2 = {X:t2.clientX, Y:t2.clientY};
			}
			m_bTouchAction = true;
		};
		var Angleaction = false;
		var pTouchMove = function(evt)
		{
			evt.preventDefault();
			touches = evt.touches;
			changedTouches = evt.changedTouches;
			var t = touches[0];
			var ox = t.clientX - Touch1.X;
			var oy = t.clientY - Touch1.Y;
			var lastAngle = 0;
			if (touches.length > 1)
			{
				if (m_bMultiTouching)
					return;
				m_bMultiTouching = true;
				var t2 = touches[1];
				if (m_bMultiTouch)
				{
					var val = getTouchScreenValue(t, t2);
					var cpt = val.scrCenter;
					if (!isNearest(cpt, TouchScrCenter, 5))
					{
						var new_length = val.length;
						var ratio = parseFloat(new_length / TouchScrLength);
						var dX = pMapBase.getClientWidth() / 2 - cpt.X;
						var dY = pMapBase.getClientHeight() / 2 - cpt.Y;
						var center = new MapPoint(TouchMapCenter.X + dX * TouchCellSizeX / ratio, TouchMapCenter.Y + dY * TouchCellSizeY / ratio);
						LastMapCenter = new MapPoint(center.X, center.Y);
						var da = val.angle - TouchMapStartAngle;
						var newAngle = mapStartAngle - da; //±ÛÂà(§PÂ_)
						
						if (!Angleaction && Math.abs(da) >= 20)
						{
							Angleaction = true;
							pMapBase.setAngle(newAngle);
						}
						else if (Angleaction)
							pMapBase.setAngle(newAngle);

						LastMapScale = TouchMapScale * ratio; //Zoom In/Out
						pMapBase.putScale(LastMapScale);
						pMapBase.putCenterX(LastMapCenter.X);
						pMapBase.putCenterY(LastMapCenter.Y);
						pMapBase.RefreshMap(false);
					}
				}
				Touch2 = {X:t2.clientX, Y:t2.clientY};
				m_bMultiTouching = false;
			}
			else
			{
				Touch1 = {X:t.clientX, Y:t.clientY};
				if (m_bTouchAction)
				{
					var Mat = sg.math.Matrix;
					var angle = pMapBase.getAngle();
					var res = Mat.rotate(-angle).transform(ox, oy);
					var ox = res.x;
					var oy = res.y;
					pMapBase.MoveMapTo(pMapBase.getCenterX() - pMapBase.ToMapDistX(ox), pMapBase.getCenterY() - pMapBase.ToMapDistY(oy));
					pMapBase.RefreshMap(false);
				}
			}
		};
		var pTouchEnd = function(evt)
		{
			evt.preventDefault();
			touches = evt.touches;
			changedTouches = evt.changedTouches;
			Angleaction = false;
			if (secondClick == true)
			{
				secondClick = false;
				pDblClick(TouchDoubleTap);
			}
			else
			{
				if (LastMapCenter != null && LastMapScale != null)
				{
					pMapBase.putScale(LastMapScale);
					pMapBase.putCenterX(LastMapCenter.X);
					pMapBase.putCenterY(LastMapCenter.Y);
				}
				pMapBase.RefreshMap(true);
				LastMapCenter = null;
				LastMapScale = null;
				m_bTouchAction = false;
				m_bMultiTouch = false;
				firstClick = true;
				waitDoubleTap(500);
			}
		};
		var pTouchCancel = function(evt)
		{
			evt.preventDefault();
			touches = [];
			changedTouches = [];
			pMapBase.RefreshMap(true);
			m_bTouchAction = false;
		};
		var rotationActive = false;
		var sa = pMapBase.getAngle();
		var ssa;
		var spos;
		var dPos, dCenter, dMPos;
		var M = sg.math.Matrix;
		var pMouseMove = function(tEvent) 
		{
			var scrPt = pMapBase.getCursorPosition(tEvent);
			var ox = scrPt.X - MouseCurX;
			var oy = scrPt.Y - MouseCurY;
			var distX = pMapBase.ToMapDistX(ox);
			var distY = -pMapBase.ToMapDistX(oy);
			if (rotationActive)
			{
				that.isAngle = true;
				var pos = pMapBase.getTransformCursorPosition(tEvent);
				var cx = pMapBase.getClientWidth() / 2;
				var cy = pMapBase.getClientHeight() / 2;
				var dx = pos.X - cx;
				var dy = pos.Y - cy;
				var cAngle = Math.atan2(dx, dy);
				var da = sg.math.radianToDegree(sAngle - cAngle);
				pMapBase.setAngle(sa + da);
			}
			else
				pMapBase.MoveMapTo(pMapBase.getCenterX() - distX, pMapBase.getCenterY() - distY);
			
			MouseCurX = scrPt.X;
			MouseCurY = scrPt.Y;
			pMapBase.RefreshMap(false);
		};
		var pMouseUp = function(tEvent)
		{
			DetachEvent(hObj, "mousemove", pMouseMove, true);
			DetachEvent(hObj, "mouseup", pMouseUp, true);
			rotationActive = false;
			that.isAngle = false;
			pMapBase.RefreshMap(true);
			dCenter = null;
			dMPos = null;
			m_bMapAction = false;
		};
		var sAngle;
		var pMouseDown = function(tEvent)
		{
			sg.preventDefault(tEvent);
			m_bMapAction = true;
			rotationActive = tEvent.shiftKey;
			if (rotationActive)
			{
				var pos = pMapBase.getTransformCursorPosition(tEvent);
				var cx = pMapBase.getClientWidth() / 2;
				var cy = pMapBase.getClientHeight() / 2;
				var dx = pos.X - cx;
				var dy = pos.Y - cy;
				sAngle = Math.atan2(dx, dy);
			}
			sa = pMapBase.getAngle();
			var scrPt = pMapBase.getCursorPosition(tEvent);
			MouseCurX = scrPt.X;
			MouseCurY = scrPt.Y;
			AttachEvent(hObj, "mouseup", pMouseUp, true);
			AttachEvent(hObj, "mousemove", pMouseMove, true);
		};
		
		var pDblClick = function(tEvent)
		{
			if (!bAllowDblClick)
				return;
			
			m_bMapAction = true;
			var OffsetPt2 = pMapBase.getCursorPosition(tEvent);
			var cpt = pMapBase.ToMapPoint(OffsetPt2.X, OffsetPt2.Y);
			var FinalLevel = pMapBase.getScale();
			var nD = 1;
			var s = 1;
			var pTrans = pMapBase.getTransformation();
			
			if (pTrans != null && pTrans.getLevelScale != null && pTrans.getMapLevel != null)
				s = pTrans.getLevelScale(pTrans.getMapLevel() + nD) / FinalLevel;
			else
				s = Math.pow(2, nD);
			
			FinalLevel *= s;
			cpt = new MapPoint((pMapBase.getCenterX() - cpt.X) / s + cpt.X, (pMapBase.getCenterY() - cpt.Y) / s + cpt.Y);
			pMapBase.MoveToAnimation(cpt, FinalLevel, function()
			{
				m_bMapAction = false;
			});
		};
		var pDblClick = function(tEvent)
		{
			if (!bAllowDblClick)
				return;
			m_bMapAction = true;
			var OffsetPt2 = pMapBase.getCursorPosition(tEvent);
			var cpt = pMapBase.ToMapPoint(OffsetPt2.X, OffsetPt2.Y);
			var FinalLevel = pMapBase.getScale();
			var nD = 1;
			var s = 1;
			var pTrans = pMapBase.getTransformation();
			
			if (pTrans != null && pTrans.getLevelScale != null && pTrans.getMapLevel != null)
				s = pTrans.getLevelScale(pTrans.getMapLevel() + nD) / FinalLevel;
			else
				s = Math.pow(2, nD);
			
			FinalLevel *= s;
			cpt = new MapPoint((pMapBase.getCenterX() - cpt.X) / s + cpt.X, (pMapBase.getCenterY() - cpt.Y) / s + cpt.Y);
			pMapBase.MoveToAnimation(cpt, FinalLevel, function()
			{
				m_bMapAction = false;
			});
		};
		var pWheelFunc = function(tEvent)
		{
			if (!bAllowWheel)
				return;
			m_bMapAction = true;
			var OffsetPt2 = pMapBase.getCursorPosition(tEvent);
			var cpt = pMapBase.ToMapPoint(OffsetPt2.X, OffsetPt2.Y);
			var FinalLevel = pMapBase.getScale();
			var nDelta = tEvent.wheelDelta ? tEvent.wheelDelta : -tEvent.detail;
			var nD = 0;
			
			if (nDelta > 0)
				nD = 1;
			else if (nDelta < 0)
				nD = -1;
			
			var s = 1;
			var pTrans = pMapBase.getTransformation();
			if (pTrans != null && pTrans.getLevelScale != null && pTrans.getMapLevel != null)
				s = pTrans.getLevelScale(pTrans.getMapLevel() + nD) / FinalLevel;
			else
				s = Math.pow(2, nD);
			
			FinalLevel *= s;
			cpt = new MapPoint((pMapBase.getCenterX() - cpt.X) / s + cpt.X, (pMapBase.getCenterY() - cpt.Y) / s + cpt.Y);
			pMapBase.MoveToAnimation(cpt, FinalLevel, function()
			{
				m_bMapAction = false;
			});
		};
		this.ExitMapEvent = function()
		{
			if (!mobile)
			{
				if (bAllowWheel)
					DetachEvent(hObj, "mousewheel", pWheelFunc, false);
				DetachEvent(hObj, "mousedown", pMouseDown, false);
				if (bAllowDblClick)
					DetachEvent(hObj, "dblclick", pDblClick, false);
			}
			else
			{
				DetachEvent(hObj, "touchstart", pTouchStart, false);
				DetachEvent(hObj, "touchend", pTouchEnd, false);
				DetachEvent(hObj, "touchcancel", pTouchCancel, false);
				DetachEvent(hObj, "touchleave", pTouchEnd, false);
				DetachEvent(hObj, "touchmove", pTouchMove, false);
			}
		};
		this.ExitDbClickEvent = function()
		{
			if (bAllowDblClick)
				DetachEvent(hObj, "dblclick", pDblClick, false);
		};
		
		if (!mobile)
		{
			AttachEvent(hObj, "mousedown", pMouseDown, false);
			if (bAllowDblClick)
				AttachEvent(hObj, "dblclick", pDblClick, false);
			if (bAllowWheel)
				AttachEvent(hObj, "mousewheel", pWheelFunc, false);
		}
		else
		{
			AttachEvent(hObj, "touchstart", pTouchStart, false);
			AttachEvent(hObj, "touchend", pTouchEnd, false);
			AttachEvent(hObj, "touchcancel", pTouchCancel, false);
			AttachEvent(hObj, "touchleave", pTouchEnd, false);
			AttachEvent(hObj, "touchmove", pTouchMove, false);
		}		
	};
}
function ZoomTool(ZoomType)
{
	var MouseCurX;
	var MouseCurY;
	var MouseDownX;
	var MouseDownY;
	var m_hObj;
	this.ExitMapEvent = null;
	
	this.InitMapEvent = function(pMapBase)
	{
		var hObj = pMapBase.getHPackage();
		var pEventFunc = function(dLeft, dTop, dRight, dBottom)
		{
			if (ZoomType != 0)
			{
				var LT = pMapBase.ToMapPoint(0, 0);
				var RB = pMapBase.ToMapPoint(pMapBase.getClientWidth(), pMapBase.getClientHeight());
				var sX = (RB.X - LT.X) / (dRight - dLeft);
				var sY = (RB.Y - LT.Y) / (dBottom - dTop);
				var s = Math.min(sX, sY);
				dLeft = LT.X + (LT.X - dLeft) * s;
				dRight = RB.X + (RB.X - dRight) * s;
				dTop = LT.Y + (LT.Y - dTop) * s;
				dBottom = RB.Y + (RB.Y - dBottom) * s;
			}
			pMapBase.ZoomMapTo(new MapEnvelope(dLeft, dTop, dRight, dBottom));
			pMapBase.RefreshMap(true);
		};
		var pMouseDown = function(tEvent)
		{
			RectangleTracker(pMapBase, tEvent, pEventFunc);
		};
		PreventDefault(hObj, "mousdown");
		this.ExitMapEvent = function()
		{
			DetachEvent(hObj, "mousedown", pMouseDown, false);
		};
		AttachEvent(hObj, "mousedown", pMouseDown, false);
	};
}
function FullExtentTool()
{
	this.MapCommand = function(tEvent, pMapBase, hObj)
	{
		pMapBase.ZoomMapTo(pMapBase.getExtent());
		pMapBase.RefreshMap(true);
	};
}
function ZoomLastTool(pStep, bPrev)
{
	this.MapCommand = null;
	this.InitialMapBase = function(pTargetMapBase)
	{
		if (bPrev)
		{
			this.MapCommand = function(tEvent, pMapBase, hObj)
			{
				pStep.PrevLocation(pTargetMapBase);
			};
		}
		else
		{
			this.MapCommand = function(tEvent, pMapBase, hObj)
			{
				pStep.NextLocation(pTargetMapBase);
			};
		}
	};
}
var MapZoomStep = function(pTargetMapBase)
{
	function MapLocate(dX, dY, dLevel)
	{
		this.X = dX;
		this.Y = dY;
		this.Level = dLevel;
	}
	this.RemoveSelf = null;
	this.RebuildElement = null;
	var m_MapLocates = new Array;
	var m_MapLocatesNext = new Array;
	this.RebuildElement = null;
	this.MapCommand = null;
	var m_bRelocation = true;
	this.PrevLocation = function(pMapBase)
	{
		Relocation(pMapBase, m_MapLocates, m_MapLocatesNext);
	};
	this.NextLocation = function(pMapBase)
	{
		Relocation(pMapBase, m_MapLocatesNext, m_MapLocates);
	};
	function Relocation(pMapBase, pMain, pTarget)
	{
		var l = pMain == m_MapLocates ? 1 : 0;
		if (pMain.length > l)
		{
			pLocate = pMain.pop();
			if (pLocate)
			{
				pTarget.push(pLocate);
				if (m_MapLocates.length > 0)
				{
					m_bRelocation = false;
					pLocate = m_MapLocates[m_MapLocates.length - 1];
					pMapBase.MoveMapTo(pLocate.X, pLocate.Y);
					pMapBase.putScale(pLocate.Level);
					pMapBase.RefreshMap(true);
					m_bRelocation = true;
				}
				else
				{
					pLocate = pTarget.pop();
					pMain.push(pLocate);
				}
			}
		}
	}
	this.RebuildElement = function()
	{
		if (m_bRelocation)
		{
			m_MapLocates.push({X:pTargetMapBase.getCenterX(), Y:pTargetMapBase.getCenterY(), Level:pTargetMapBase.getScale()});
			while (m_MapLocatesNext.length > 0)
				m_MapLocatesNext.pop();
		}
	};
	this.Clear = function()
	{
		while (m_MapLocates.length > 0)
			m_MapLocates.pop();
		while (m_MapLocatesNext.length > 0)
			m_MapLocatesNext.pop();
	};
	this.RebuildElement();
	pTargetMapBase.AddElement(this);
};
function XYLocateTool()
{
	var pPanel = null;
	this.MapCommand = function(tEvent, pMapBase, hObj)
	{
		if (pPanel != null)
			return;
		var pNode = document.body;
		pPanel = new SWGPanel(pNode, 0, true, true);
		pPanel.setClosedEvent(function()
		{
			pPanel = null;
		});
		pPanel.putTitle("XY Location");
		var pM = pPanel.getViewFrame();
		var pTbl = pM.ownerDocument.createElement("TABLE");
		pM.appendChild(pTbl);
		pTbl.width = "240px";
		pTbl.border = "0";
		pTbl.cellSpacing = "0";
		pTbl.cellPadding = "2";
		pTbl.unselectable = "on";
		pTbl.style.fontSize = "8pt";
		pRow = pTbl.insertRow(-1);
		pCell = pRow.insertCell(-1);
		pCell = pRow.insertCell(-1);
		pCell.innerHTML = "Input X, Y values";
		pRow = pTbl.insertRow(-1);
		pCell = pRow.insertCell(-1);
		pCell.innerHTML = "X";
		pCell = pRow.insertCell(-1);
		var pInputX = pCell.ownerDocument.createElement("input");
		pInputX.type = "text";
		pCell.appendChild(pInputX);
		pInputX.value = pMapBase.getCenterX();
		pInputX.style.fontSize = "8pt";
		pRow = pTbl.insertRow(-1);
		pCell = pRow.insertCell(-1);
		pCell.innerHTML = "Y";
		pCell = pRow.insertCell(-1);
		var pInputY = pCell.ownerDocument.createElement("input");
		pInputY.type = "text";
		pCell.appendChild(pInputY);
		pInputY.value = pMapBase.getCenterY();
		pInputY.style.fontSize = "8pt";
		pRow = pTbl.insertRow(-1);
		pCell = pRow.insertCell(-1);
		pCell = pRow.insertCell(-1);
		var pInput = pCell.ownerDocument.createElement("input");
		pInput.type = "button";
		pCell.appendChild(pInput);
		pInput.value = "Locate";
		AttachEvent(pInput, "click", function()
		{
			pMapBase.MoveMapTo(parseFloat(pInputX.value), parseFloat(pInputY.value));
			pMapBase.RefreshMap(true);
		}, false);
		pCell.appendChild(pCell.ownerDocument.createTextNode(" "));
		var pInput = pCell.ownerDocument.createElement("input");
		pInput.type = "button";
		pCell.appendChild(pInput);
		pInput.value = "Current Position";
		AttachEvent(pInput, "click", function()
		{
			pInputX.value = pMapBase.getCenterX();
			pInputY.value = pMapBase.getCenterY();
		}, false);
		pPanel.FitFrameSize();
		pPanel.CenterWindow();
	};
}