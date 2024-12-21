<template>
  <div :class="'cesiummap'+'_nofull'" :style="'width:'+width+'%; height:'+height+'%;'">
      <div :style="'width:'+width+'%; height:'+height+'%;'" class="cesium-container" id="cesiumContainer" ref="cesiumContainer"></div>
  </div>
</template>

<script>
  export default {
    name: "CesiumMap",
    components: {},
    data() {
      return {
          viewer:null
      };
    },
    props: {
      width: {
        type: [Number, String],
        default: 100
      },
      height: {
        type: [Number, String],
        default: 100
      }
    },
    created() {

    },
    mounted() {
      this.initMap();
    },
    beforeDestroy() {

    },
    methods: {
      initMap(){
        //注册的token有问题
          Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNzdhOTgxZS0zMzMwLTQ4YTAtYjlkNy1kMDRmNzU3ZjI2MjgiLCJpZCI6NjIyMzUsImlhdCI6MTYyNjg1MDU1OH0.ETpPvP99Sze2XW5JByp2vyK1F6R_P9Ojn-W7OE8KeA8';
          /*
          const worldTerrain = Cesium.createWorldTerrain({ requestWaterMask: true, // 添加水面波浪效果
            requestVertexNormals: true // 添加地形光照
          })
          */
         //设置默认视角
          // 初始化Cesium Viewer实例
          this.viewer = new Cesium.Viewer(this.$refs.cesiumContainer, {
            //地形
            // terrainProvider: worldTerrain

            //地形2
            //terrainProvider: new Cesium.CesiumTerrainProvider({ url: Cesium.IonResource.fromAssetId(1) }),
            homeButton: false,
            sceneModePicker: false,
            baseLayerPicker: false, // 影像切换
            animation: false, // 是否显示动画控件
            infoBox: false, // 是否显示点击要素之后显示的信息
            selectionIndicator: false, // 要素选中框
            geocoder: false, // 是否显示地名查找控件
            timeline: false, // 是否显示时间线控件
            fullscreenButton: false,
            shouldAnimate: false,
            navigationHelpButton: false ,// 是否显示帮助信息控件
            // 经纬度投影，经纬度-180~180，-90~90（切片方案的x和y比例是2:1）
            //tilingScheme : new Cesium.GeographicTilingScheme(),
            mapProjection:new Cesium.GeographicProjection(Cesium.Ellipsoid.WGS84),
            //tilingScheme :new Cesium.WebMercatorTilingScheme(),
            //mapProjection:new Cesium.WebMercatorProjection(),

            orderIndependentTranslucency: false,
            contextOptions:{
              webgl:{alpha: true}
            }
          });
          //this.viewer.scene.morphTo2D(1);
          this.viewer.imageryLayers.removeAll();
          //this.removeLayers();
          //隐藏logo
          this.viewer.cesiumWidget.creditContainer.style.display = "none";

          //加载天地图
          let token = 'a0e5adf3f1b5ec9d9a57465febe6baad';
          // 服务域名
          let tdtUrl = 'https://t{s}.tianditu.gov.cn/';
          // 服务负载子域
          let subdomains=['0','1','2','3','4','5','6','7'];
          // 叠加影像服务 地形：vec_w
          let tdtimgMap = new Cesium.UrlTemplateImageryProvider({
              url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
              subdomains: subdomains,
              //tilingScheme : new Cesium.WebMercatorTilingScheme(),
              //tilingScheme : new Cesium.GeographicTilingScheme(),
              maximumLevel : 18
          });
         /*
          let tdtimgMap = new Cesium.WebMapTileServiceImageryProvider({
              url: "http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
                  "&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
                  "&style=default&format=tiles&tk="+ token,
              layer: "tdtCva",
              style: "default",
              format: "tiles",
              tileMatrixSetID: "c",
              subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
              tilingScheme: new Cesium.GeographicTilingScheme(),
              tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
              maximumLevel: 18
          })
         */
          this.viewer.imageryLayers.addImageryProvider(tdtimgMap);
         let layer0 = this.viewer.scene.imageryLayers.get(0);
         layer0.gamma = 0.36;
         /*
         let bingMap = new Cesium.BingMapsImageryProvider({
                 url: this.url,
                 key: this.bmKey,
                 mapStyle: Cesium.BingMapsStyle.AERIAL
             });

         this.viewer.imageryLayers.addImageryProvider(bingMap);
         */
        //指定默认的位置
         this.resetViewer();
         let _this = this;
          //鼠标经过显示经纬度
           let handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
           handler.setInputAction(function (movement) {
            //动态经纬度视角高度
           var longitude_show = document.getElementById('longitude_show')
           var latitude_show = document.getElementById('latitude_show')
           var altitude_show = document.getElementById('altitude_show')
           //具体事件的实现
           var ellipsoid = _this.viewer.scene.globe.ellipsoid;
           //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
           var cartesian = _this.viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
           if (cartesian) {
               //将笛卡尔三维坐标转为地图坐标（弧度）
               var cartographic = _this.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
               //将地图坐标（弧度）转为十进制的度数
               var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
               var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
               var alti_String = (_this.viewer.camera.positionCartographic.height / 1000).toFixed(2);
               longitude_show.innerHTML = log_String;
               latitude_show.innerHTML = lat_String;
               //altitude_show.innerHTML = alti_String;
           }
           }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

          // 创建指北针小部件并将其添加到地图
          const options = {
              // 默认视角
              defaultResetView: Cesium.Cartographic.fromDegrees(180.1, 90.1, 13000000),
              //相机方向
              orientation: {pitch: Cesium.Math.toRadians(-45)},
              //相机延时
              // duration = 4, //默认为3s
              // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
              enableCompass: true,
              // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
              enableZoomControls: true,
              // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
              enableDistanceLegend: true,
              // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
              enableCompassOuterRing: true, //修改重置视图的tooltip
              resetTooltip: "Reset",
              // 修改放大按钮的tooltip
              zoomInTooltip: "Zoomin",
              // 修改缩小按钮的tooltip
              zoomOutTooltip: "Zoomout"
          };
         this.viewer.scene.skyBox.show = false;
         this.viewer.scene.backgroundColor = new Cesium.Color(0,0,0,0);
         //禁止中键旋转视角
         this.viewer.scene.screenSpaceCameraController.enableTilt = false;
         //开启地形检测
         this.viewer.scene.globe.depthTestAgainstTerrain = false; //默认为false
      },
      resetViewer(){
        let originposition = Cesium.Cartesian3.fromDegrees(180.1, 90.1, 13000000) //可以根据需求选择坐标与坐标类型
          this.viewer.camera.setView({
              destination: originposition,                  // 相机位置
              orientation: {
                  heading: Cesium.Math.toRadians(0.0), // 水平旋转  -正北方向
                  pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                  roll: 0 // 视口翻滚角度
                  }
          });
      }
    }
  };

</script>

<style lang="scss">

</style>
