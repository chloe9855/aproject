var bDebug = true;
function AjaxAgent(targetFunction, async, bForm)
{
	var pThis = this;
	var AjaxRequest = null;
	if (window.XMLHttpRequest)
	{
		AjaxRequest = new XMLHttpRequest();
		if (AjaxRequest.overrideMimeType)
			AjaxRequest.overrideMimeType('text/xml');
	}
	else if (window.ActiveXObject)
	{
		try {AjaxRequest = new ActiveXObject("Msxml2.XMLHTTP");} 
		catch (e) {try {AjaxRequest = new ActiveXObject("Microsoft.XMLHTTP");} catch (e) {}};
	}
		
	this.Open = function(strMethod, targetFunction)
	{
		if (AjaxRequest==null)
			return;
		AjaxRequest.open(strMethod, targetFunction, async);
		if (bForm)
			AjaxRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	};
	
	this.SetHeader = function(HeaderName, HeadValue)
	{
		if (AjaxRequest==null)
			return;
		AjaxRequest.setRequestHeader(HeaderName, HeadValue);
	};
	
	this.OverrideMimeType = function(sMimeType)
	{
		if (AjaxRequest==null)
			return;
		if (AjaxRequest.overrideMimeType)
		{
			try
			{
				if (sMimeType)
					AjaxRequest.overrideMimeType(sMimeType);
				else
					AjaxRequest.overrideMimeType('text/xml');
			}
			catch(e) {}
		}
	}
	
	this.SendRequest = function(pPostData, pSucceed, pComplete, pFailed, pStep)
	{
		if (AjaxRequest==null)
			return;
		function CompleteStatae()
		{
			if (pComplete) pComplete.call(pThis, AjaxRequest, AjaxRequest.status);
			if (AjaxRequest.status != 200)
			{
				if (pFailed) pFailed.call(pThis, AjaxRequest, AjaxRequest.status);
				if (bDebug) window.open("").document.write(AjaxRequest.responseText);
			}
			else if (pSucceed)
			{
				pSucceed.call(pThis, AjaxRequest);
			}
		}
		
		if (async)
		{
			AjaxRequest.onreadystatechange = function()
			{
				if (pStep) pStep.call(pThis, AjaxRequest, AjaxRequest.readyState);
				if (AjaxRequest.readyState == 4)
					CompleteStatae();
			};
		}
		try {AjaxRequest.send(pPostData);}
		catch (e) {return alert("Error");}
		if (!async)
		{
			if (!async)
				CompleteStatae();
			return AjaxRequest;
		}
		return null;
	};
	if (targetFunction)
		this.Open("POST", targetFunction);
}

function GetXMLChildNode(pNode, strName)
{
	var pNodes = FindXMLNodes(pNode, strName);
	if (pNodes != null && pNodes.length > 0)
		return pNodes.item(0);
	return null;
}

function GetXMLFirstChildNodeValue(pNode, strName)
{
	var pNodes = FindXMLFirstNode(pNode, strName);
	if (pNodes == null)
		return null;
	return pNodes.firstChild.nodeValue;
}

function FindXMLNodes(pNode, strName)
{
	if (pNode == null)
		return null;
	return pNode.getElementsByTagName(strName);
}

function FindXMLNodesByClassName(pNode, strName)
{
	if (pNode == null)
		return null;
	
	return pNode.getElementsByClassName(strName);
}

function FindXMLFirstNode(pNode, strName)
{
	if(pNode == null)
		return null;
	return pNode.getElementsByTagName(strName)[0];
}

function FindXMLNodeById(pNode, strName)
{
	if (pNode == null)
		return null;
	return pNode.getElementById(strName);
}

function FindXMLNodeByTagNameNs(pNode, type, strName)
{
	if (pNode == null)
		return null;
	return pNode.getElementsByTagNameNS(type, strName);
}

function FindXMLFirstNodeByTagNameNs(pNode, type, strName)
{
	if (pNode == null)
		return null;
	return pNode.getElementsByTagNameNS(type, strName)[0];
}

function FindXMLFirstNodeFirstChildNodeValueByTagNameNs(pNode, type, strName)
{
	if (pNode == null)
		return null;
	return pNode.getElementsByTagNameNS(type, strName)[0].firstChild.nodeValue;
}

function GetXMLNodeText(pNode)
{
	if (pNode == null)
		return null;
	if (pNode.firstChild)
		return pNode.firstChild.nodeValue;
	return "";
}

function GetXMLNodeAttribute(pNode, strName)
{
	if (pNode)
	{
		return pNode.getAttribute(strName);
	}
	return "";
}

function CreateXMLNode(tagName, className, id)
{
	if (!tagName)
		return null;
	var node = document.createElement(tagName);
	if (id || id == 0)
		node.id = id;
	if (className)
		node.className = className;
	return node;
}

function WriteXmlDocNode(pDoc, tagName, value)
{
	var pRoot = pDoc.documentElement;
	var node = pDoc.createElement(tagName);
	node.textContent = value;
	pRoot.appendChild(node);
}

function CreateXMLInput(type, name, value, className, id)
{
	var node = document.createElement("input");
	if (type)
		node.type = type;
	if (name)
		node.name = name;
	if (value)
		node.value = value;
	if (className)
		node.className = className;
	if (id || id == 0)
		node.id = id;
	return node;
}

function CreateXMLImg(src, className, id)
{
	if (!src)
		return "";
	var node = document.createElement("img");
	node.src = src;
	if (className)
		node.className = className;
	if (id || id == 0)
		node.id = id;
	return node;
}

function LoadScript(sSrc, pFunc)
{
	var bLoaded = false;
	var pScp = document.createElement("script");
	function readystatechanged()
	{
		if (pScp.readyState == "loaded")
			Loaded();
	}
	function Loaded() 
	{
		bLoaded = true;
		if (pFunc)
			pFunc.call(null, pScp);
		DetachEvent(pScp, "readystatechange", readystatechanged, false);
		DetachEvent(pScp, "load", Loaded, false);
		document.body.removeChild(pScp);
	}
	AttachEvent(pScp, "readystatechange", readystatechanged, false);
	AttachEvent(pScp, "load", Loaded, false);
	document.body.appendChild(pScp);
	pScp.type = "text/javascript";
	pScp.src = sSrc;
}



function CheckDevice() //DeviceCheck
{
	if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
		return true;
	else
		return false;
}