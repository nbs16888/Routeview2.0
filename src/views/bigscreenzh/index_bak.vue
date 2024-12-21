<template>
  <full-screen>
      <div id="index">
        <div class="bg">
          <dv-loading v-if="loading">Loading...</dv-loading>
          <div v-else class="host-body" style="height: calc(~'100% - 10px');">
            <div class="d-flex jc-center">
              <dv-decoration-10 class="dv-dec-10" />
              <div class="d-flex jc-center">
                <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
                <div class="title">
                  <span class="title-text">北极冰区航线智能规划系统</span>
                  <dv-decoration-6
                    class="dv-dec-6"
                    :reverse="true"
                    :color="['#50e3c2', '#67a1e5']"
                  />
                </div>
                <dv-decoration-8
                  class="dv-dec-8"
                  :reverse="true"
                  :color="decorationColor"
                />
              </div>
              <dv-decoration-10 class="dv-dec-10-s" />
            </div>

            <!-- 第二行 -->
            <div class="d-flex jc-between px-2">
              <div class="d-flex aside-width">
                <!-- <div class="react-left bg-color-blue ml-4 react-l-s">
                  <span class="react-left"></span>
                  <span class="text" @mouseenter="showDialog = true;" style="cursor: pointer;">
                    <dv-decoration-7 style="width:130px;height:30px;">船舶定位</dv-decoration-7>
                  </span>
                </div> -->
                <div class="react-left ml-3">
                  <span class="text" @mouseover="showDialog = true;" @mouseleave="cb_hide" style="cursor: pointer;">
                    <dv-decoration-7 style="width:130px;height:40px;">船舶定位</dv-decoration-7>
                  </span>
                </div>
                  <div class="menu_dialog_cb" v-if="showDialog">
                    <dv-border-box-12>
                      <ul class="menu_ul">
                        <li>自动定位</li>
                        <li>经纬度定位</li>
                        <li>模拟通航</li>
                      </ul>
                    </dv-border-box-12>
                  </div>
                <div class="react-left ml-3">
                  <span class="text"><dv-decoration-7 style="width:130px;height:40px;">航线智算</dv-decoration-7></span>
                </div>
                <div class="menu_dialog_hx" v-if="showDialog">
                  <dv-border-box-12>
                    <ul class="menu_ul">
                      <li>航线规划</li>
                      <li>多因素规划</li>
                    </ul>
                  </dv-border-box-12>
                </div>
                <div class="react-left ml-3">
                  <span class="text"><dv-decoration-7 style="width:130px;height:40px;">港口决策</dv-decoration-7></span>
                </div>
                <div class="menu_dialog_gk" v-if="showDialog">
                  <dv-border-box-12>
                    <ul class="menu_ul">
                      <li>港口可视化</li>
                      <li>港口可达分析</li>
                    </ul>
                  </dv-border-box-12>
                </div>
                <div class="react-left ml-3">
                  <span class="text"><dv-decoration-7 style="width:130px;height:40px;">航线规划</dv-decoration-7></span>
                </div>
                <div class="menu_dialog_hxgh" v-if="showDialog">
                  <dv-border-box-12>
                    <ul class="menu_ul">
                      <li>航行前规划</li>
                      <li>航行中规划</li>
                    </ul>
                  </dv-border-box-12>
                </div>
                <div class="react-left ml-3">
                  <span class="text"><dv-decoration-7 style="width:130px;height:40px;">适航评估</dv-decoration-7></span>
                </div>
                <div class="menu_dialog_sh" v-if="showDialog">
                  <dv-border-box-12>
                    <ul class="menu_ul">
                      <li>航线对比</li>
                      <li>适行分析</li>
                      <li>历史航线</li>
                    </ul>
                  </dv-border-box-12>
                </div>
              </div>
              <div class="d-flex aside-width">
                <div class="react-right bg-color-blue mr-3">
                  <span class="text fw-b">海冰漂移分析</span>
                </div>
                <div class="react-right bg-color-blue mr-3">
                  <span class="text fw-b">vue-big-screen</span>
                </div>
                <div class="react-right mr-4 react-l-s">
                  <span class="react-after"></span>
                  <span class="text"
                    >{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span
                  >
                </div>
              </div>
            </div>
              <div class="body-box" ref="cesiumContainer" style="flex-shrink: 0;flex-grow:0;">
                    <vc-viewer class="viewer" @ready="ready" :camera="camera" :key="refreshkey"
                      :full = "true"
                      :animation = "false"
                      :timeline = "false"
                      :sceneModePicker = "false"
                      :baseLayerPicker = "false"
                      :geocoder = "false"
                      :scene3DOnly = "true"
                      :navigationHelpButton = "false"
                      :homeButton = "false"
                      :infoBox = "false"
                      :showRenderLoopErrors = "false"
                      :skyBox = "false"
                      :fullscreenButton = "false"
                      :selectionIndicator = "false"
                    >
                      <vc-navigation></vc-navigation>
                      <vc-layer-imagery :alpha="1" :brightness="1" :contrast="1">
                        <vc-provider-imagery-bingmaps
                        url="https://dev.virtualearth.net"
                        bm-key="AmGu3cvB_g1HbkQErEyvmLc9j0YIGWS7IdOqR7-hQbO8J92Fzrzkhy_bYKSsyoEx"
                        map-style="Aerial"
                        ></vc-provider-imagery-bingmaps>
                      </vc-layer-imagery>
                    </vc-viewer>
              </div>
          </div>
        </div>
      </div>
    <!--  <el-dialog top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
        :visible.sync="showDialog" :show-close="true" width="20%" style="left: -40%;top: 10vh!important;"></el-dialog> -->
  </full-screen>
</template>

<script>
import drawMixin from "@/utils/bigscreen/drawMixin";
import autoResize from '@jiaminghi/data-view/lib/mixin/autoResize.js'
import { formatTime } from '@/utils/bigscreen/index.js'
import centerLeft1 from './centerLeft1'
import centerLeft2 from './centerLeft2'
import centerRight1 from './centerRight1'
import centerRight2 from './centerRight2'
import center from './center'
import bottomLeft from './bottomLeft'
import bottomRight from './bottomRight'

import fullScreen from '@/components/full-screen/index'

export default {
  mixins: [ autoResize ],
  data() {
    return {
      viewer: null,
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      decorationColor: ['#568aea', '#000000'],
      width:'100%',
      height:'100%',

      animation: false,
      timeline: false,
      camera: {
        position: {
          lng: 90,
          lat: 90,
          height: 18000000
        },
        heading: 360,
        pitch: -90,
        roll: 0
      },
      url: 'https://dev.virtualearth.net',
      bmKey: 'Ahv1KDJwbpJl4V8zklaRXcoueWXoNLo16osJiU4Zk07vc-VNNzJ0gB81TZyPqNFz', // 可到(https://www.bingmapsportal.com/)申请Key。
      mapStyle: 'Aerial',
      showDialog: true,
      refreshkey:0
    }
  },
  components: {
    fullScreen,
    centerLeft1,
    centerLeft2,
    centerRight1,
    centerRight2,
    center,
    bottomLeft,
    bottomRight
  },
  created() {
    console.log();
  },
  mounted() {
    this.timeFn();
    this.cancelLoading();
    this.initViewer();
    //监听浏览器放大或缩小
    window.addEventListener('resize', () => {
        nextTick(() => {
            refreshkey.value++
        })
    })
  },
  beforeDestroy () {
    clearInterval(this.timing)
    },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    async initViewer() {

          //const viewer = new Cesium.Viewer('cesiumContainer');
          // Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYjg2NTViMS0zM2VlLTQ1NGUtYTNmZi1hZmJlYjQ5YTkxYWQiLCJpZCI6MTc2NzM2LCJpYXQiOjE3MDAxMTc1ODF9.Lb42l4B7fiWp0XNpJCd_PsZGERmx6rQbo2adT_aZPG4"

          /*const viewer = new Viewer("cesiumContainer", {
            // terrainProvider: new CesiumTerrainProvider({
            //   url: "https://tiles.geovis.online/base/v1/terrain?token=fd2cddddcf70866a1a334a47b78b8cba1941af00c93b3a97e49c65ab5182922a",
            //   requestWaterMask: true,
            //   requestVertexNormals: true,
            // }),
            // imageryProvider: new ArcGisMapServerImageryProvider({
            //   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
            // }),
            /*
            sceneMode: SceneMode.SCENE3D,
            vrButton: false,
            animation: false,
            baseLayerPicker: false,
            geocoder: false,
            timeline: false,
            fullscreenButton: false,
            homeButton: false,
            creditContainer: document.createElement("div"), //版权信息
            infoBox: true,
            navigationHelpButton: false,
            sceneModePicker: false,
            scene3DOnly: true, //是否只显示3D
            *
            // skyBox: new SkyBox({
            //   sources: {
            //     positiveX: "./assets/images/tycho2t3_80_px.jpg",
            //     negativeX: "./assets/images/tycho2t3_80_mx.jpg",
            //     positiveY: "./assets/images/tycho2t3_80_py.jpg",
            //     negativeY: "./assets/images/tycho2t3_80_my.jpg",
            //     positiveZ: "./assets/images/tycho2t3_80_pz.jpg",
            //     negativeZ: "./assets/images/tycho2t3_80_mz.jpg",
            //   },
            // }), //设置天空的颜色
          });
          */
        },
        ready(cesiumInstance) {
                const { Cesium, viewer } = cesiumInstance;

                //设置默认视角
                Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
                    // 西边的经度
                  89.5,
                  // 南边维度
                  20.4,
                  // 东边经度
                  110.4,
                  // 北边维度
                  61.2
                );
                //隐藏logo
                viewer.cesiumWidget.creditContainer.style.display = "none";
                viewer.scene.skyBox.destroy();
                viewer.scene.skyBox = undefined;
                viewer.scene.sun.destroy();
                viewer.scene.sun = undefined;
                viewer.scene.moon.destroy();
                viewer.scene.moon = undefined;
                viewer.scene.skyAtmosphere.destroy();
                viewer.scene.skyAtmosphere = undefined;
                viewer.scene.backgroundColor = new Cesium.Color(0, 0, 0, 0);
                viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0);
                /*
                viewer.entities.add({
                  id: '成都欢迎你',
                  position: Cesium.Cartesian3.fromDegrees(104.06, 30.67, 100),
                  billboard: new Cesium.BillboardGraphics({
                    image: 'https://zouyaoji.top/vue-cesium/favicon.png',
                    scale: 0.1
                  }),
                  label: new Cesium.LabelGraphics({
                    text: 'Hello Word',
                    fillColor: Cesium.Color.GOLD,
                    font: '24px sans-serif',
                    horizontalOrigin: 1,
                    outlineColor: new Cesium.Color(0, 0, 0, 1),
                    outlineWidth: 2,
                    pixelOffset: new Cesium.Cartesian2(17, -5),
                    style: Cesium.LabelStyle.FILL
                  })
                })
                */
              },
              cb_hide(){
                setTimeout(()=>{
                  //this.showDialog = false;
                },500);
              }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/bigscreen/scss/index.scss';
@import '@/assets/bigscreen/scss/style.scss';
#index{
  .menu_dialog_cb{
    position: absolute;
    top: 110px;
    width:140px;
    height:auto;
    transform: translateX(28px);
    z-index: 9999;
  }
  .menu_dialog_hx{
    position: absolute;
    top: 110px;
    width:140px;
    height:auto;
    transform: translateX(179px);
    z-index: 9999;
  }
  .menu_dialog_gk{
    position: absolute;
    top: 110px;
    width:140px;
    height:auto;
    transform: translateX(329px);
    z-index: 9999;
  }
  .menu_dialog_hxgh{
    position: absolute;
    top: 110px;
    width:140px;
    height:auto;
    transform: translateX(480px);
    z-index: 9999;
  }
  .menu_dialog_sh{
    position: absolute;
    top: 110px;
    width:140px;
    height:auto;
    transform: translateX(630px);
    z-index: 9999;
  }

  .menu_ul{
    li{
      //padding: 15px 12px 3px 12px;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
      padding: 10px 0px 0px 0px;
      cursor: pointer;
    }

    li:last-child{
      padding: 10px 0px 10px 0px;
    }

    /* 核心代码 */
    li:hover {
        color: #01c2ff;
        background-image: url('data:image/png;base64,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');
        background-size: 100% 100%;
        background-position: 0 0%;
        color:#fff;
        transition: background .3s ease;
    }
  }
}
</style>
