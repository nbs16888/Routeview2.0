import Vue from 'vue'

import Cookies from 'js-cookie'
import enLang from "element-ui/lib/locale/lang/en";
import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import '../public/Cesium-1.73/Build/Cesium/Widgets/widgets.css'
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import plugins from './plugins' // plugins
import { download } from '@/utils/request'
import autofit from '@/utils/bigscreen/autofit.js';

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey, updateConfigByKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi";
// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
// 富文本组件
import Editor from "@/components/Editor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 字典标签组件
import DictTag from '@/components/DictTag'
// 头部标签组件
import VueMeta from 'vue-meta'
// 字典数据组件
import DictData from '@/components/DictData'
// 引入echart-若依自带版本4.9.0
import echarts from "echarts";
import 'echarts-gl';
import VueCesium from "vue-cesium";
import { VcOverviewMap, VcNavigationSM } from "vue-cesium";
import "./assets/styles/vue-cesium/style.css"; //vue-cesium global css
import "./assets/styles/vue-cesium/vc-map-overview.css"; //vue-cesium global css
import "./assets/styles/vue-cesium/vc-navigation-sm.css"; //vue-cesium global css
import "./assets/styles/vue-cesium/vc-navigation.css"; //vue-cesium global css
import global_ from './earthLayout/components/Global/index'//引用全局定义Cesium和viewer等的文件
import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";
import { detectZoom } from '@/utils/bigscreen/detectZoom';
import VueTour from 'vue-tour';

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.updateConfigByKey = updateConfigByKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

Vue.prototype.$echarts = echarts;
Vue.prototype.GLOBAL = global_//全局定义Cesium和viewer挂载到Vue实例上面

// 全局组件挂载
Vue.component('DictTag', DictTag)
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('ImagePreview', ImagePreview)
Vue.component('echarts', echarts);
Vue.use(directive)
Vue.use(plugins)
Vue.use(VueMeta)
Vue.use(VueTour)
DictData.install()

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

// 修改 el-dialog 默认点击遮照为不关闭
Element.Dialog.props.closeOnClickModal.default = false

// VueCesium 默认使用 `https://unpkg.com/cesium/Build/Cesium/Cesium.js`
Vue.use(VueCesium, {
  // cesiumPath 是指引用的Cesium.js路径，如
  // 项目本地的Cesium Build包，vue项目需要将Cesium Build包放static目录：
  // cesiumPath: "/SuperMap_iClient3D_10i_for_WebGL_CN/Build/Cesium/Cesium.js",
  cesiumPath: "/Cesium-1.73/Build/Cesium/Cesium.js",
  // 个人在线Cesium Build包：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/Cesium/Cesium.js'
  // 个人在线SuperMap Cesium Build包（在官方基础上二次开发出来的）：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/SuperMapCesium/Cesium.js'
  // 官方在线Cesium Build包，有CDN加速，推荐用这个：
  // cesiumPath: "https://unpkg.com/cesium/Build/Cesium/Cesium.js",
  // 指定Cesium.Ion.defaultAccessToken，使用Cesium ion的数据源需要到https://cesium.com/ion/申请一个账户，获取Access Token。不指定的话可能导致 Cesium 在线影像加载不了
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNzdhOTgxZS0zMzMwLTQ4YTAtYjlkNy1kMDRmNzU3ZjI2MjgiLCJpZCI6NjIyMzUsImlhdCI6MTYyNjg1MDU1OH0.ETpPvP99Sze2XW5JByp2vyK1F6R_P9Ojn-W7OE8KeA8"
});
Vue.use(VcOverviewMap);
Vue.use(VcNavigationSM);

//数据大屏引入
import dataV from '@jiaminghi/data-view';
Vue.use(dataV)

const m = detectZoom();
console.log("**----***",m);
 //判断屏幕是否为4k
/*
if (window.screen.width * window.devicePixelRatio >=3840) {

  switch (m) {
    // 4k屏时屏幕缩放比为100%
    case 100:
      document.body.style.zoom = 100 / 50;
      break;
      // 4k屏时屏幕缩放比为125%
    case 125:
      document.body.style.zoom = 100 / 62.5;
      break;
      // 4k屏时屏幕缩放比为150%
    case 150:
      document.body.style.zoom = 100 / 75;
      break;
      // 4k屏时屏幕缩放比为175%
    case 175:
      document.body.style.zoom = 100 / 87.4715;
      break;
      // 4k屏时屏幕缩放比为200%
    case 200:
      document.body.style.zoom = 100 / 100;
      break;
      // 4k屏时屏幕缩放比为225%
    case 225:
      document.body.style.zoom = 100 / 112.485;
      break;

    default:
      break;
  }

  //document.body.style.zoom = 100 / (Number(m)/2);
}else{
  document.body.style.zoom = 100 / Number(m);
}
*/


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
Vue.use(Avue, {
  size: "mini",
  menuType: "text"
});

Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size
  locale: enLang
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
