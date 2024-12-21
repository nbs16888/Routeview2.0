<template>
  <div class="app-main">
    <menu-tab />
    <gaode-poi-search />
    <vc-viewer
      class="viewer"
      :animation="animation"
      :timeline="timeline"
      :sceneMode="sceneMode"
      :fullscreenButton="fullscreenButton"
      :fullscreenElement="fullscreenElement"
      :infoBox="infoBox"
      :shadows="shadows"
      :terrainShadows="terrainShadows"
      @ready="ready"
      @layerAdded="layerAdded"
    >
      <vc-map-overview />
      <vc-navigation :options="options"></vc-navigation>
      <vc-layer-tianditu v-if="tiandituShow"></vc-layer-tianditu>
      <vc-terrain :type="terrainType" v-if="terrainShow"></vc-terrain>
      <div v-if="drawerToolVisible">
        <drawer-tool-box :visible.sync="drawerToolVisible"></drawer-tool-box>
      </div>
      <div v-if="measureToolVisible">
        <measure-tool-box :visible.sync="measureToolVisible"></measure-tool-box>
      </div>
    </vc-viewer>
    <div v-if="abcVisible">
      <abc-controller :visible.sync="abcVisible"></abc-controller>
    </div>
    <div v-if="imageLayerSplitVisible">
      <image-layers-split :visible.sync="imageLayerSplitVisible" />
    </div>
    <!--自定义组件，需要先获取到viewer等对象    -->
    <div v-if="ViewerInitOver">
      <custom-info-box
        title="啊咧咧"
        :info="infoText"
        lng="122.27"
        lat="43.62"
        height="200"
      />
      <custom-info-box
        title="啊咧咧2"
        :info="infoText"
        lng="122.27"
        lat="43.42"
        height="50"
      />
    </div>
  </div>
</template>

<script>
import "vue-cesium/lib/vc-navigation.css";
import vcViewer from "../../api/earth/configOptions/vcViewer"; //vc-viewer配置属性
import vcNavigation from "../../api/earth/configOptions/vcNavigation"; //vc-navigation配置属性
import VcTerrain from "../../components/earthComponents/VcTerrain/index";
// import AbcController from "../../components/earthComponents/tools/abcController/index";
// import DrawerToolBox from "../../components/earthComponents/tools/DrawerToolBox/index";
// import MeasureToolBox from "../../components/earthComponents/tools/MeasureToolBox/index";
// import ImageLayersSplit from "../../components/earthComponents/tools/ImageLayersSplit/index";
import MenuTab from "./MenuTab/index";
import GaodePoiSearch from "../../components/earthComponents/tools/gaodePoiSearch/index";
import VcLayerTianditu from "../../components/earthComponents/vcLayerTianditu/index";
// import CustomInfoBox from "../../components/earthComponents/tools/CustomInfoBox/index";
import { addAdditionalLayerOption } from "../../api/earth/layers/layersHandler";

export default {
  name: "AppMain",
  components: {
    CustomInfoBox: () =>
      import("../../components/earthComponents/tools/CustomInfoBox/index"),
    VcLayerTianditu,
    GaodePoiSearch,
    MenuTab,
    ImageLayersSplit: () =>
      import("../../components/earthComponents/tools/ImageLayersSplit/index"),
    MeasureToolBox: () =>
      import("../../components/earthComponents/tools/MeasureToolBox/index"),
    DrawerToolBox: () =>
      import("../../components/earthComponents/tools/DrawerToolBox/index"),
    AbcController: () =>
      import("../../components/earthComponents/tools/abcController/index"),
    VcTerrain
  },
  data() {
    //这里存放数据",
    return {
      infoText: [
        ["位置1", "11"],
        ["位置1", "11"],
        ["位置1", "11"],
        ["位置1", "11"]
      ],
      ViewerInitOver: false,
      terrainShow: true, //地形数据显示
      terrainType: "cesium", //地形数据类型
      tiandituShow: false, //天地图矢量底图显示隐藏
      abcVisible: false, //abc组件显示隐藏
      // alpha: 1, //透明度
      // brightness: 1, //亮度
      // contrast: 1, //对比度
      drawerToolVisible: false, //绘制组件
      measureToolVisible: false, //量算组件
      imageLayerSplitVisible: false, //卷帘组件
      cesiumInstance: null, //vue-ceium实例
      loading: true,
      ...vcViewer.data(), //vc-viewer属性
      ...vcNavigation.data()
    };
  },
  computed: {
    key() {
      return this.$route.path;
    }
  },
  watch: {},
  methods: {
    ready(cesiumInstance) {
      this.cesiumInstance = cesiumInstance; //获取全局cesium实例
      const { Cesium, viewer } = this.cesiumInstance;
      viewer.scene.globe.depthTestAgainstTerrain = true; //绘制贴地形
      //隐藏版本信息
      // viewer._cesiumWidget._creditContainer.style.display = "none";
      this.GLOBAL.Cesium = Cesium; //全局Cesium
      this.GLOBAL.viewer = viewer; //全局viewer
      this.GLOBAL.layers = viewer.imageryLayers._layers;
      addAdditionalLayerOption(
        "BingMap底图",
        new Cesium.BingMapsImageryProvider({
          url: "https://dev.virtualearth.net",
          key:
            "AgcbDCAOb9zMfquaT4Z-MdHX4AsHUNvs7xgdHefEA5myMHxZk87NTNgdLbG90IE-",
          mapStyle: Cesium.BingMapsStyle.AERIAL
        })
      );
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          122.27, //经
          43.52, //纬
          10000 //相机高度
        ),
        orientation: {
          heading: Cesium.Math.toRadians(360), //相机弧度
          pitch: Cesium.Math.toRadians(-45), //相机弧度方向
          roll: 0 //相机弧度角
        }
      });

      this.ViewerInitOver = true;
    },
    layerAdded(imageryLayer, index) {
      // console.log(imageryLayer);
    },
    //添加天地图矢量标注底图
    addTianditu() {
      this.tiandituShow = !this.tiandituShow;
    },
    //展示透明度，亮度，对比度栏目
    showAbcController() {
      this.drawerToolVisible = false;
      this.measureToolVisible = false;
      this.abcVisible = !this.abcVisible;
    },
    //展示绘制工具
    showDrawerToolBox() {
      this.abcVisible = false;
      this.measureToolVisible = false;
      this.drawerToolVisible = !this.drawerToolVisible;
    },
    showMeasureToolBox() {
      this.abcVisible = false;
      this.drawerToolVisible = false;
      this.measureToolVisible = !this.measureToolVisible;
    },
    //卷帘工具
    showImageLayerSplit() {
      this.imageLayerSplitVisible = !this.imageLayerSplitVisible;
    },
    //更换地形题图
    changeTerrain(val) {
      if (val !== null && val !== "" && val !== "undefined" && val) {
        this.terrainShow = true;
        this.terrainType = val;
      } else {
        this.terrainShow = false;
      }
    }
  },
  mounted() {
    document.body.style.overflow = "hidden";
  }
};
</script>
<style scoped>
.app-main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
<style>
#cesiumContainer .cesium-infoBox {
  background-color: rgba(15, 15, 15, 0.3);
  margin-top: 30px;
}

#cesiumContainer .cesium-infoBox-description {
  color: #0a0a0a;
}

#cesiumContainer .cesium-infoBox-title {
  background-color: rgba(15, 15, 15, 0.5);
}

#cesiumContainer button.cesium-infoBox-camera {
  display: none;
}

#cesiumContainer .vc-navigation {
  top: auto;
  bottom: 230px;
}
</style>
