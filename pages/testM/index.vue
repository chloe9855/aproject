<template>
  <div>
    <!-- <div
      id="HeaderNode"
      class="Headercolor"
    >
      <img
        id="WebMapperLogo"
        alt=""
        src="images/SuperGeo_logo.png"
      >
      <h1
        id="Title"
        class="Layoutcolor"
      >
        SuperGIS Map Viewer
      </h1>
      <h2
        id="SubTitle"
        class="Layoutcolor"
      >
        SubTitle
      </h2>
      <div
        id="MobileToolCaller"
        style="height:100%;"
        onclick="staticCustom.Custom.init();"
      >
        <span style="display:inline-block;height:100%;vertical-align:middle;" />
        <img
          alt=""
          style="vertical-align:middle;"
          src="images/toolbox.png"
        >
      </div>
      <div
        id="LayerTool"
        style="height:100%;"
        onclick="staticCustom.TOC.init();"
      >
        <span style="display:inline-block;height:100%;vertical-align:middle;" />
        <img
          alt=""
          style="vertical-align:middle;"
          src="images/Layersbtn.png"
        >
      </div>
    </div> -->
    <canvas
      id="tempcanvas"
      width="80"
      height="50"
      style="display: none;"
    />
    <div id="mapNode" />
    <!-- <div id="Tools"> -->
    <!-- <div
        id="ZoomTools_Mobile"
        class="Tools"
      >
        <div
          id="mZoomIn"
          class="Buttoncolor"
          onclick="ZoomIn();"
        >
          <img
            alt=""
            src="images/Mobile_Tools/Plus.png"
            title="Zoom in"
          >
        </div>
        <div
          id="mZoomOut"
          class="Buttoncolor"
          onclick="ZoomOut();"
        >
          <img
            alt=""
            src="images/Mobile_Tools/Minus.png"
            title="Zoom out"
          >
        </div>
        <div
          id="mZoomHome"
          class="Buttoncolor"
          onclick="ResetZoom();"
        >
          <img
            alt=""
            src="images/Mobile_Tools/Home.png"
          >
        </div>
      </div> -->
    <!-- <div
        id="ZoomTools"
        class="Tools"
      >
        <div
          id="ZoomIn"
          class="Tool Buttoncolor"
          onclick="ZoomIn();"
        >
          <img
            alt=""
            src="images/Zoomin.png"
            title="Zoom in"
          >
        </div>
        <div
          id="ZoomOut"
          class="Tool Buttoncolor"
          onclick="ZoomOut();"
        >
          <img
            alt=""
            src="images/Zoomout.png"
            title="Zoom out"
          >
        </div>
      </div> -->
    <!-- <div
        id="CustomTools"
        class="Tools"
      >
        <div
          id="CustomA"
          class="Tool Buttoncolor"
        />
        <div
          id="CustomB"
          class="Tool Buttoncolor"
        />
        <div
          id="CustomC"
          class="Tool Buttoncolor"
        />
        <div
          id="CustomD"
          class="Tool Buttoncolor"
        />
      </div>
      <div
        id="IndexMap"
        class="Tools On Buttoncolor"
      >
        <div id="IndexMapNode" />
        <button
          class="IndexMap_Arrow"
          onclick="this.parentNode.classList.toggle('On');"
        />
      </div> -->
    <!-- <div
        id="SemiTransparentFooter"
        class="FooterDisplayAtbottom NONE"
      > -->
    <div id="CoordTools">
      <label id="Coordinate">NaN NaN</label>
    </div>
    <div
      id="ScaleTools"
      style="position: relative;width: 5.2cm;height: 28px;left: 20px;bottom:0;"
    />
    <!-- </div> -->
    <!-- </div> -->

    <!-- <div
      id="TOC"
      class="Drawer"
      style="display:none;"
    >
      <div class="Frame">
        <div
          id="Header"
          class="Headercolor"
        >
          <span class="Layoutcolor">Layers</span>
        </div>
        <div id="TOCBody" />
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  head: {
    script: [
      {
        src: 'scripts/Base.js',
        async: true
      },
      {
        src: 'scripts/OperationBase.js',
        async: true
      },
      {
        src: 'scripts/SuperGeoUtility.js',
        async: true
      },
      {
        src: 'scripts/AjaxAgent.js',
        async: true
      },
      {
        src: 'scripts/Framework.js',
        async: true
      },
      {
        src: 'scripts/MapBase.js',
        async: true
      },
      {
        src: 'scripts/Controls.js',
        async: true
      },
      {
        src: 'scripts/MapLayer.js',
        async: true
      },
      {
        src: 'scripts/Navigate.js',
        async: true
      },
      {
        src: 'scripts/CachedLayer.js',
        async: true
      },
      {
        src: 'scripts/OpenStreetMap.js',
        async: true
      },
      {
        src: 'scripts/ToolControls.js',
        async: true
      },
      {
        src: 'scripts/Tasks.js',
        async: true
      },
      {
        src: 'scripts/GFX.js',
        async: true
      },
      {
        src: 'scripts/FX.js',
        async: true
      },
      {
        src: 'scripts/Compass.js',
        async: true
      },
      {
        src: 'scripts/Tracker.js',
        async: true
      },
      {
        src: 'scripts/Geometry.js',
        async: true
      },
      {
        src: 'scripts/Symbol.js',
        async: true
      },
      {
        src: 'scripts/Draw.js',
        async: true
      },
      {
        src: 'scripts/Overview.js',
        async: true
      },
      {
        src: 'scripts/Bookmark.js',
        async: true
      },
      {
        src: 'scripts/TemplatePicker.js',
        async: true
      },
      {
        src: 'scripts/Layer.js',
        async: true
      },
      {
        src: 'scripts/TiledLayer.js',
        async: true
      },
      {
        src: 'scripts/TileLayer.js',
        async: true
      },
      {
        src: 'scripts/DynamicLayer.js',
        async: true
      },
      {
        src: 'scripts/Graphic.js',
        async: true
      },
      {
        src: 'scripts/GraphicsLayer.js',
        async: true
      },

      {
        src: 'scripts/OSMLayer.js',
        async: true
      },
      {
        src: 'scripts/BingTiledLayer.js',
        async: true
      },
      {
        src: 'scripts/Infowindow.js',
        async: true
      },
      {
        src: 'scripts/Mercator.js',
        async: true
      },
      {
        src: 'scripts/CoordSys.js',
        async: true
      },
      {
        src: 'scripts/PrintTool.js',
        async: true
      },
      {
        src: 'scripts/Process.js',
        async: true
      },
      {
        src: 'scripts/Query.js',
        async: true
      },
      {
        src: 'scripts/Edit.js',
        async: true
      },
      {
        src: 'scripts/UndoManager.js',
        async: true
      },
      {
        src: 'scripts/Request.js',
        async: true
      },
      {
        src: 'scripts/WMSLayer.js',
        async: true
      },
      {
        src: 'scripts/WMTSLayer.js',
        async: true
      },
      {
        src: 'scripts/Google.js',
        async: true
      },
      {
        src: 'scripts/Base64.js',
        async: true
      },
      {
        src: 'scripts/Projection.js',
        async: true
      },
      // {
      //   src: 'ServerGate/SGSGate.ashx?F=~/scripts/Framework.js',
      //   async: true
      // },
      {
        src: 'scripts/setMap.js',
        async: true
      }
    ]
  },
  layout: 'nohf'
};
</script>

<style lang="scss">

  .sgContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.sgContainer .hObject {
  background-color: white;
}

.mapContainer .tooltip {
  padding: 5px;
  position: fixed;
  font-size: 0.8em;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #70aa70;
  border-radius: 4px;
  z-index: 9999;
}

.sgTooltip {
  padding: 5px;
  position: absolute;
  font-size: 0.8em;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #70aa70;
  border-radius: 4px;
  z-index: 9999;
}

.level-pad {
  border-collapse: collapse;
  border-spacing: 0;
}

.level-pad td {
  padding: 0;
}

.level-pad .top-row img {
  vertical-align: bottom;
}

.level-pad .middle-row img {
  vertical-align: middle;
}

.level-pad .bottom-row img {
  vertical-align: top;
}

.layer-swipe {
  position: absolute;
}

.layer-swipe:hover {
  opacity: 0.8;
}

.layer-swipe .bar {
  position: absolute;
  background-color: #eaeaea;
}

.layer-swipe .horizontal-bar {
  width: 100%;
  height: 4px;
  border-top: 1px solid #505050;
  border-bottom: 1px solid #505050;
}

.layer-swipe .vertical-bar {
  border-left: 1px solid #505050;
  border-right: 1px solid #505050;
  width: 4px;
  height: 100%;
}

.layer-swipe .handle {
  position: absolute;
  background-color: #eaeaea;
  border: 1px solid #505050;
  border-radius: 4px;
}

.layer-swipe .vertical-handle {
  width: 18px;
  height: 36px;
  left: -9px;
  background: linear-gradient(to right, #eaeaea, #eaeaea, lightgray);
  cursor: col-resize;
}

.layer-swipe .horizontal-handle {
  width: 36px;
  height: 18px;
  top: -9px;
  background: linear-gradient(to bottom, #eaeaea, #eaeaea, lightgray);
  cursor: row-resize;
}

.print-tool-container {
  width: 244px;
  overflow: auto;
}

.print-tool-container .template-view {
  width: 560px;
  text-align: right;
}

.print-tool-template {
  width: 130px;
  height: 130px;
  padding: 4px;
  text-align: center;
  border: 2px solid rgba(0, 0, 0, 0);
}

.print-tool-template:hover {
  border: 2px solid #6f6f6f;
}

.print-tool-template.focus {
  border: 2px solid #68d0d7;
}

.print-tool-template img {
  vertical-align: middle;
}

.print-tool-template .landscape {
  width: 100%;
  max-width: 100%;
}

.print-tool-template .portrait {
  height: 100%;
  max-height: 100%;
}

.print-tool-container .setting-View button {
  margin-top: 16px;
  float: right;
}

.print-tool-container .setting-View input[type='checkbox'] {
  margin-top: 4px;
}

.attribute-inspector table {
  width: 100%;
}

.attribute-inspector table tr:first-child {
  width: 35%;
}

.attribute-inspector .nav-bar button {
  margin-right: 4px;
}

.Headercolor {
  background-color: #338053;
}

.Layoutcolor {
  color: #fff;
}

.Buttoncolor {
  background-color: #338053;
}

.Clickcolor {
  background-color: #f00;
}

#HeaderNode h1 {
  margin-top: 5px;
  margin-left: 40px;
  float: left;
  font-size: 36px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
  color: #fff;
}

#HeaderNode h2 {
  margin-top: 22px;
  margin-left: 15px;
  float: left;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
  color: #fff;
  margin-bottom: 0;
}

#LayerTool {
  float: right;
}

#mapNode {
  width: 100%;
  height: calc(100% - 50px);
  position: absolute;
  // top: 50px;
  overflow: hidden;
}

.Tool {
  width: 50px;
  height: 50px;
  float: left;
  text-align: center;
  cursor: pointer;
}

.Tools_Side .Tool {
  margin-top: 5px;
  opacity: 0.7;
}

.Tools_Top .Tool {
  margin-left: 5px;
}

#ZoomTools {
  position: absolute;
}

#ZoomTools.Tools_Side {
  width: 50px;
  height: 110px;
  top: 55px;
  left: 10px;
}

#ZoomTools.Tools_Top {
  width: 120px;
  height: 55px;
  top: 55px;
  left: 10px;
}

#CustomTools {
  position: absolute;
}

#CustomTools.Tools_Side {
  width: 50px;
  height: 230px;
  top: 175px;
  left: 10px;
}

#CustomTools.Tools_Top {
  width: 240px;
  height: 55px;
  top: 55px;
  left: 130px;
}

#TOC {
  width: 300px;
  height: calc(100% - 50px);
  padding: 0 0 10px 10px;
  position: absolute;
  top: 50px;
  right: 0;
  overflow: hidden;
  box-sizing: border-box;
}
#TOC.Popup { padding: 10px 10px 20px; }

#TOC .Frame {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  -webkit-box-shadow: 0 0 5px 3px #6e6e6e;
  -moz-box-shadow: 0 0 5px 3px #6e6e6e;
  box-shadow: 0 0 5px 3px #6e6e6e;
  box-sizing: border-box;
}
#TOC.Popup .Frame { border-radius: 10px; }

#TOC #Header {
  width: 100%;
  height: 30px;
}

#TOC #Header span {
  margin-top: 2px;
  margin-left: 10px;
  font-size: 20px;
}

#TOC #TOCBody {
  width: 100%;
  height: calc(100% - 30px);
  position: relative;
  overflow: hidden;
}

#CoordTools {
  display: none;
  position: absolute;
  bottom: 10px;
  left: 240px;
}

#CoordTools label {
  // text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

#ScaleTools {
  display: none;
}

.viewcloss {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 20px;
  font-family: sans-serif;
  cursor: pointer;
  color: #fff;
}

.basemapview {
  width: 470px;
  height: 300px;
  margin-top: 10px;
  margin-left: 10px;
  float: left;
}

.basemapviewheader {
  width: 70%;
  height: 30px;
  padding-top: 5px;
  padding-left: 10px;
  float: left;
  font-size: 20px;
  color: #fff;
  color: #18a04e;
  background: #fff;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

.basemapviewbody {
  width: 100%;
  height: 270px;
  padding-top: 5px;
  padding-left: 10px;
  float: left;
  overflow: auto;
  background: #fff;
  border-top-right-radius: 9px;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
}

.BakCloss {
  position: absolute;
  top: 0;
  right: 5px;
  font-family: sans-serif;
  color: #7aaea9;
  z-index: 3;
  cursor: pointer;
}

.BakCloss:hover {
  color: #bd0000;
}

.GalleryItem {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  float: left;
  cursor: pointer;
}

.BMGalleryItem {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  float: left;
  cursor: pointer;
}

.GalleryItemBak {
  width: 80px;
  height: 50px;
  position: relative;
  float: left;
  background-color: #4691c3;
}

.GalleryItemBak img {
  width: 80px;
  height: 50px;
  position: absolute;
}

.BMGalleryItemBak {
  width: 80px;
  height: 50px;
  position: relative;
  float: left;
}

.BMBakCloss {
  position: absolute;
  top: 0;
  right: 5px;
  font-family: sans-serif;
  color: #7aaea9;
  z-index: 3;
  cursor: pointer;
}

.BMBakCloss:hover {
  color: #bd0000;
}

.BMGalleryItemBak img {
  width: 80px;
  height: 50px;
  position: absolute;
}

.GalleryItemLab {
  width: 80px;
  height: 30px;
  float: left;
  font-size: 12px;
  text-align: center;
}

.paletteitem {
  width: 95%;
  margin-top: 10px;
  margin-left: 5%;
  float: left;
}

.paletteitem span {
  float: left;
}

.paletteitem input[type='button'] {
  width: 40px;
  height: 22px;
  margin-left: 5px;
  float: left;
  overflow: hidden;
  background-color: #f0f0f0;
}

.paletteitem input[type='text'] {
  width: 6em;
  margin-left: 10px;
  float: left;
}

.paletteitem input[type='number'] {
  width: 6em;
  margin-left: 10px;
  float: left;
}

.Palette {
  width: 145px;
  height: 200px;
  display: block;
  position: absolute;
  background-color: #f0f0f0;
  border: 1px solid #969696;
  z-index: 32767;
  box-shadow: 2px 2px 2px #6e6e6e;
}

.Palette .colorzone {
  width: 66px;
  height: 174px;
  margin-top: 10px;
  margin-left: 14px;
  float: left;
}

.Palette .colorzone .colortop {
  width: 100%;
  float: left;
}

.Palette .colorzone .colormain {
  width: 100%;
  margin-top: 9px;
  float: left;
}

.Palette .colorzone .itemcolor {
  width: 10px;
  height: 10px;
  margin-top: 1px;
  margin-left: 1px;
  float: left;
}

.Palette .textzone {
  width: 50px;
  height: 145px;
  margin-top: 50px;
  margin-left: 14px;
  float: left;
}

.Palette .textzone input[type='text'] {
  width: 30px;
  float: left;
  font-size: 12px;
  margin-bottom: 1px;
}

.Palette .textzone span {
  float: left;
  font-size: 15px;
}

.Palette .textzone .rgbtext {
  width: 100%;
  float: left;
}

.Palette .textzone .hsbtext {
  width: 100%;
  margin-top: 10px;
  float: left;
}

#slzone {
  width: 150px;
  height: 80px;
  position: absolute;
  bottom: 0;
  right: 0;
}

#slzone img {
  float: left;
}

.tBtn {
  width: 149px;
  height: 29px;
  float: left;
  text-align: center;
  color: #fff;
  background: #ccc;
  cursor: pointer;
}

.tBtn span {
  font-size: 20px;
}

input[type='radio'].Tab {
  display: none;
}

input[type='radio'].Tab:checked + div.tBtn {
  height: 29px;
  text-align: center;
  color: #000;
  background: #fff;
}

.tBtnChoose {
  height: 29px;
  text-align: center;
  color: #000;
  background: #fff;
}

.queryitem {
  width: 100%;
  height: 40px;
  float: left;
}

.queryitem:nth-child(even) {
  background-color: #dcdcdc;
}

.queryitemlabel {
  width: 230px;
  margin-top: 10px;
  margin-left: 20px;
  float: left;
  overflow: hidden;
  font-size: 18px;
}

.printpreview {
  background-color: blue;
  border-style: solid;
  border-color: blue;
  opacity: 0.5;
}

#IndexMap {
  width: 30px;
  height: 30px;
  display: none;
  position: absolute;
  overflow: hidden;
  text-align: center;
}

#IndexMap.On {
  width: 186px;
  height: 122px;
}

#IndexMap.Tools_Side {
  top: 60px;
  left: 70px;
}

#IndexMap.Tools_Top {
  top: 120px;
  left: 15px;
}

#IndexMap.Tools_BottomLeft {
  top: unset;
  bottom: 40px;
  left: 15px;
}

#IndexMap.Tools_TopRight {
  top: 60px;
  right: 15px;
  left: unset;
}

#IndexMap.Tools_BottomRight {
  top: unset;
  bottom: 40px;
  right: 15px;
  left: unset;
}

#IndexMap .IndexMap_Arrow {
  width: 30px;
  height: 30px;
  position: absolute;
  background-size: 30px 30px;
  border: 0;
}

#IndexMap.Tools_TopRight .IndexMap_Arrow {
  top: 0;
  right: 0;
}

#IndexMap.Tools_TopRight.On .IndexMap_Arrow {
  background-image: url("~/assets/img/arrow1.png");
}

#IndexMap.Tools_TopLeft .IndexMap_Arrow {
  top: 0;
  left: 0;
  background-image: url("~/assets/img/arrow4.png");
}

#IndexMap.Tools_TopLeft.On .IndexMap_Arrow {
  background-image: url("~/assets/img/arrow2.png");
}

#IndexMap.Tools_BottomLeft .IndexMap_Arrow {
  bottom: 0;
  left: 0;
  background-image: url("~/assets/img/arrow1.png");
}

#IndexMap.Tools_BottomLeft.On .IndexMap_Arrow {
  background-image: url("~/assets/img/arrow3.png");
}

#IndexMap.Tools_BottomRight .IndexMap_Arrow {
  bottom: 0;
  right: 0;
  background-image: url("~/assets/img/arrow2.png");;
}

#IndexMap.Tools_BottomRight.On .IndexMap_Arrow {
  background-image: url("~/assets/img/arrow4.png");
}

#IndexMapNode {
  width: 174px;
  height: 107px;
  position: absolute;
  top: 8px;
  left: 6px;
  overflow: hidden;
  background-color: #fff;

}

.SecItem {
  width: 60px;
  margin-top: 5px;
  margin-left: 10px;
  float: left;
}

.SecItem img {
  width: 100%;
  float: left;
  border-radius: 5px;
}

.SecItem div {
  width: 100%;
  float: left;
  text-align: center;
}

.FooterDisplayAtbottom {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  background-color: gray;
  opacity: 0.7;
}

.FlatButtonStyle {
  width: 100px;
  height: 40px;
  color: #fff;
  background-color: #808080;
  border: none;
  border-radius: 8px;
}

// righttool.css

.drawertoolbar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  transition: 0.5s;
}

.toolbartitle {
  width: 100%;
  height: 40px;
  float: left;
  background: #c0c0c0;
}

.toolbar h2 {
  margin-top: 8px;
  margin-left: 20px;
  float: left;
  font-size: 20px;
  color: #fff;
}

.toolbartitle img {
  width: 30px;
  height: 30px;
  margin-top: 5px;
  margin-right: 10px;
  float: right;
}

#LayerInfo {
  width: 100%;
  height: 600px;
  top: 50px;
  float: left;
  overflow: auto;
}

.footer {
  height: 30px;
  position: absolute;
  bottom: 5px;
  left: 20px;
}

#footer_line {
  width: 100%;
}

.toolinfo {
  width: 100%;
  top: 50px;
  float: left;
}

.template-picker {
  float: left;
}

.legend-item {
  width: 90px;
  height: 80px;
  position: relative;

  /* overflow: hidden; */
  float: left;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  vertical-align: middle;
  box-sizing: border-box;
}

.legend-image {
  max-width: 64px;
  max-height: 64px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.legend-label {
  display: none;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.legend-item.hightlight {
  border: 1px solid #888;
}

.legend-item.hightlight .legend-label {
  display: unset;
}

.template-picker .selected {
  background-color: #bbb;
}

input[type='checkbox']::after {
  // content: url(../images/hook2.png);
  margin: -2px 0 0 -2px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

input[type='checkbox']:checked::after {
  // content: url(../images/hook.png);
}

// InfoWindow.css
.sgInfoWindow {
  position: absolute;
  background-color: #eee;
  border: 2px solid #353;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  z-index: 100;
  -moz-box-shadow: 0 0 1em #26393d;
  box-shadow: 4px 4px 3px rgba(20%, 20%, 40%, 0.5);
}

.sgInfoWindow .title {
  height: 1.1em;
  padding: 2px;
  overflow: hidden;
  font-size: 12px;
  font-family: sans-serif;
  font-weight: bold;
  color: #e6e2af;
  background-color: #383;
  z-index: 1;
  border-bottom: 1px solid #26393d;
}

.sgInfoWindow .content {
  padding: 2px;
  position: relative;
  overflow: auto;
  color: #002f2f;
  background-color: white;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  z-index: 1;
}

.sgInfoWindow .close {
  width: 1.1em;
  height: 1.1em;
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  color: white;
  cursor: pointer;
}

.sgInfoWindow .hide {
  width: 1.1em;
  height: 1.1em;
  margin: 0;
  position: absolute;
  top: 0;
  right: 1.1em;
  text-align: center;
  color: white;
  cursor: pointer;
}

.sgInfoWindow .odd-attribute {
  background-color: #ccc;
}

/* .sgInfoWindow .even-attribute
{
} */

.sgInfoWindow .attribute-name {
  font-weight: bold;

  /* margin-right: 5px; */
}

.sgInfoWindow .attribute-value {
  /* margin-left: 5px; */
  display: inline-block;
}

.sgInfoWindow .pointer {
  width: 48px;
  height: 48px;
  position: absolute;
  background-color: white;
  border: 2px solid #26393d;
  box-shadow: 4px 4px 3px rgba(20%, 20%, 40%, 0.5);
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.sgInfoWindow .left-pointer {
  width: 30px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -30px;
  overflow: hidden;
  pointer-events: none;
}

.sgInfoWindow .left-pointer .pointer {
  margin-top: -25px;
  top: 50%;
  left: 18px;
}

.sgInfoWindow .left-top-pointer {
  width: 30px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -30px;
  overflow: hidden;
  pointer-events: none;
}

.sgInfoWindow .left-top-pointer .pointer {
  top: 24px;
  left: 18px;
}

.sgInfoWindow .left-bottom-pointer {
  width: 30px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -30px;
  overflow: hidden;
  pointer-events: none;
}

.sgInfoWindow .left-bottom-pointer .pointer {
  bottom: 24px;
  left: 18px;
}

.sgInfoWindow .right-pointer {
  width: 30px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 100%;
  overflow: hidden;
  pointer-events: none;
}

.sgInfoWindow .right-pointer .pointer {
  margin-top: -25px;
  top: 50%;
  right: 18px;
}

.sgInfoWindow .right-top-pointer {
  width: 30px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 100%;
  overflow: hidden;
  pointer-events: none;
}

.sgInfoWindow .right-top-pointer .pointer {
  top: 24px;
  right: 18px;
}

.sgInfoWindow .right-bottom-pointer {
  width: 30px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 100%;
  overflow: hidden;
  pointer-events: none;
}

.sgInfoWindow .right-bottom-pointer .pointer {
  bottom: 24px;
  right: 18px;
}

.sgInfoWindow .top-pointer {
  width: 100%;
  height: 30px;
  position: absolute;
  top: -30px;
  left: 0;
  overflow: hidden;
  pointer-events: none;
}

.sgInfoWindow .top-pointer .pointer {
  margin-left: -25px;
  top: 18px;
  left: 50%;
  background-color: #383;
}

.sgInfoWindow .bottom-pointer {
  width: 100%;
  height: 30px;
  position: absolute;
  top: 100%;
  left: 0;
  overflow: hidden;
  pointer-events: none;
}

.sgInfoWindow .bottom-pointer .pointer {
  margin-left: -25px;
  bottom: 18px;
  left: 50%;
}

.sgInfoWindow .none-pointer {
  width: 100%;
  height: 30px;
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  overflow: hidden;
  pointer-events: none;
}

.sgInfoWindow .none-pointer .pointer {
  margin-left: -25px;
  bottom: 18px;
  left: 50%;
}

// Scalebar.css
.scalebar {
  width: 100%;
  height: 100%;
  position: absolute;
}
.scalebar .force { background-color: black; }
.scalebar .back { background-color: white; }

.scalebar > .barImage {
  width: calc(100% - 2px);
  height: 10px;
  position: absolute;
  top: 16px;
  overflow: hidden;
  border: 1px solid black;
}

.scalebar > .barImage > * {
  height: 12px;
  margin: -1px;
  position: absolute;
  border: 0 solid;
}

.scalebar > .barImage > *:nth-of-type(1) { width: calc((100% + 2px) / 12);
  left: 0%; }

.scalebar > .barImage > *:nth-of-type(2) { width: calc((100% + 2px) / 12);
  left: calc((100% + 2px) / 6); }

.scalebar > .barImage > *:nth-of-type(3) { width: calc((100% + 2px) / 3);
  left: calc((100% + 2px) / 3); }

.scalebar > .barNumber {
  width: 100%;
  position: absolute;
  font-size: 6pt;
}

.scalebar > .barNumber > * {
  position: absolute;
  font-size: 6pt;
  color: white;
  text-shadow: 1px 0 black, -1px 0 black, 0 1px black, 0 -1px black, 1px 1px black, -1px -1px black, -1px 1px black, 1px -1px black;
  transform: translate(-50%, 0);
}
.scalebar > .barNumber > *:nth-of-type(1) { left: 0%; }
.scalebar > .barNumber > *:nth-of-type(2) { left: calc((100%) / 6); }
.scalebar > .barNumber > *:nth-of-type(3) { left: calc((100%) / 3); }
.scalebar > .barNumber > *:nth-of-type(4) { left: calc((100%) * 2 / 3); }
.scalebar > .barNumber > *:nth-of-type(5) { left: 100%; }

.scalebar > .barUnit {
  position: absolute;
  top: 12px;
  left: calc(100% + 2px);
  font-size: 10pt;
  color: white;
  text-shadow: 1px 0 black, -1px 0 black, 0 1px black, 0 -1px black, 1px 1px black, -1px -1px black, -1px 1px black, 1px -1px black;
}

.scalebar > .barLine {
  width: 100%;
  height: 12px;
  position: absolute;
  bottom: 3px;
}

.scalebar > .barLine > * { position: absolute; }
.scalebar > .barLine > .force { margin: 1px; }
.scalebar > .barLine > .back { margin: 0; }

.scalebar > .barLine > .V { width: 2px;
  height: calc(100% + 2px);
  top: -2px; }

.scalebar > .barLine > .H { width: calc(100% + 2px);
  height: 2px;
  left: -2px; }

.scalebar > .barLine > .back.V { width: 4px;
  height: calc(100% + 4px); }

.scalebar > .barLine > .back.H { width: calc(100% + 4px);
  height: 4px; }
.scalebar > .barLine > .left { left: -2px; }
.scalebar > .barLine > .top { top: -2px; }
.scalebar > .barLine > .right { right: -2px; }
.scalebar > .barLine > .bottom { bottom: -2px; }

.scalebar > .barText {
  position: absolute;
  top: 3px;
  left: 50%;
  color: black;
  text-shadow: 1px 0 white, -1px 0 white, 0 1px white, 0 -1px white, 1px 1px white, -1px -1px white, -1px 1px white, 1px -1px white;
  transform: translate(-50%, 0);
}

</style>
