<template>
  <div>
    <div
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
    </div>
    <canvas
      id="tempcanvas"
      width="80"
      height="50"
      style="display: none;"
    />
    <div id="mapNode" />
    <div id="Tools">
      <div
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
      </div>
      <div
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
      </div>
      <div
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
      </div>
      <div
        id="SemiTransparentFooter"
        class="FooterDisplayAtbottom NONE"
      >
        <div id="CoordTools">
          <label id="Coordinate">NaN NaN</label>
        </div>
        <div
          id="ScaleTools"
          style="position: relative;width: 5.2cm;height: 28px;left: 20px;bottom:0;"
        />
      </div>
    </div>

    <div
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
    </div>
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
        src: 'scripts/TileLayer.js',
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
  }
};
</script>

<style lang="scss" scoped>

  .bar {
    color: red;
  }

</style>
