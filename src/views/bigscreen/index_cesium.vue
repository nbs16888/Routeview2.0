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
                <div class="react-left bg-color-blue ml-4 react-l-s">
                  <span class="react-left"></span>
                  <span class="text" @click="showDialog = true;" style="cursor: pointer;">船舶定位</span>
                </div>
                <div class="react-left ml-3">
                  <span class="text">航线智算</span>
                </div>
                <div class="react-left ml-3">
                  <span class="text">港口决策分析</span>
                </div>
                <div class="react-left ml-3">
                  <span class="text">航线规划</span>
                </div>
                <div class="react-left ml-3">
                  <span class="text">适航性评估</span>
                </div>
              </div>
              <div class="d-flex aside-width">
                <div class="react-right mr-4">
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
              <div class="body-box" ref="cesiumContainer"
                    <vc-viewer class="viewer" @ready="ready" :camera="camera"
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
                      <vc-layer-imagery>
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
      <el-dialog top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
        :visible.sync="showDialog" :show-close="true" width="20%" style="left: -40%;top: 10vh!important;"></el-dialog>
  </full-screen>
</template>

<script>
import drawMixin from "@/utils/bigscreen/drawMixin";
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
  mixins: [ drawMixin ],
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
      requestWaterMask: false,
      f1:false,
      options: [{
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }, {
                value: '选项3',
                label: '蚵仔煎'
              }, {
                value: '选项4',
                label: '龙须面'
              }, {
                value: '选项5',
                label: '北京烤鸭'
              }],
              value: '',
              showDialog: false
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
                viewer.forceResize();
                // 监听浏览器窗口大小改变事件
                window.addEventListener('resize', function () {
                    // 当浏览器窗口大小变化时，更新Cesium Viewer的大小
                    viewer.resize();
                });
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
              }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/bigscreen/scss/index.scss';
@import '@/assets/bigscreen/scss/style.scss';

</style>
