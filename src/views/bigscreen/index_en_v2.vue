<template>
  <div>
    <el-row class="toprow" style="background-color: black;">
      <div ref="toprow">33333333333333
      <el-button @click="getStartPoint">sss</el-button>
      </div>
      <div id="latlng_show">
          <div style="width: 170px; height: 30px; float: left;">
              <font size="3" color="white">Longitude：<span id="longitude_show"></span></font>
          </div>
          <div style="width: 170px; height: 30px; float: left;">
              <font size="3" color="white">Latitude：<span id="latitude_show"></span></font>
          </div>
          <div style="width: 170px;float: left;">
            <el-switch
                v-model="maptype"
                active-text="map3D"
                inactive-text="map2D">
            </el-switch>
          </div>
      </div>
    </el-row>
    <el-row class="centerrow">
      <div class="cesium-container" id="cesiumContainer" ref="cesiumContainer"></div>
    </el-row>

   <el-row>
     <div class="body">
           <button type="primary" @click="start">开始 / 重新开始</button>
           <button type="primary" @click="pause">暂停</button>
           <button type="primary" @click="continueWrite">继续</button>
           <button type="primary" @click="reset">重置</button>
           <printWriter
             class="tl"
             ref="typewriter"
             :interval="90"
             cursorStr=""
             @writeEnd="writeEnd"
           >
             <div class="comments">
               <p>const array = [1, 2, 2, 3, 4, 4, 5];</p>
               <p>const uniqueArray = Array.from(new Set(array));</p>
               <p>console.log(uniqueArray);</p>
               <p>{{ message }}</p>
             </div>
             <table>
               <tr>
                 <td>1</td>
                 <td>2</td>
                 <td>3</td>
                 <td>4</td>
                 <td>5</td>
                 <td>6</td>
                 <td>7</td>
                 <td>8</td>
                 <td>9</td>
                 <td>0</td>
               </tr>
             </table>
           </printWriter>
         </div>
   </el-row>
  </div>

</template>

<script>
  import fullScreen from '@/components/full-screen/index';
//import CesiumWindy from '@/utils/bigscreen/windy/cesiumwindy'
import {CanvasWindy} from '@/utils/bigscreen/windy/canvaswindy';
import {getAttackcoordinates,createAttackArrow} from '@/utils/bigscreen/windy/attackarrow';
//import {getwindData} from '@/utils/bigscreen/windy/createwindy';
import drawMixin from "@/utils/bigscreen/drawMixin.js";
import start_icon from '@/assets/images/startpoint_green.png';
import printWriter from '@/views/components/bigscreen/printWriter';
export default {
  name: 'HelloWorld',
  mixins: [drawMixin],
  props: {
    msg: String
  },
  components:{
    fullScreen,
    printWriter
  },
  data() {
    return {
      viewer: null,
      riskRIOareaLayer:null,
      hisdate:'2020-08-08'
    }
  },
  created(){
    this.$nextTick(()=>{
      //console.log(this.$refs.toprow.offsetHeight);
    })
  },
  mounted() {
    //注册的token有问题
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNzdhOTgxZS0zMzMwLTQ4YTAtYjlkNy1kMDRmNzU3ZjI2MjgiLCJpZCI6NjIyMzUsImlhdCI6MTYyNjg1MDU1OH0.ETpPvP99Sze2XW5JByp2vyK1F6R_P9Ojn-W7OE8KeA8';
    /*
    const worldTerrain = Cesium.createWorldTerrain({ requestWaterMask: true, // 添加水面波浪效果
      requestVertexNormals: true // 添加地形光照
    })
    */
   //设置默认视角
   /*
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
   */
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
      navigationHelpButton: false // 是否显示帮助信息控件
    });

    this.viewer.imageryLayers.removeAll();

    //隐藏logo
    this.viewer.cesiumWidget.creditContainer.style.display = "none";

    //加载  bingMap
    /*
    let bingMap = new Cesium.BingMapsImageryProvider({
            url: this.url,
            key: this.bmKey,
            mapStyle: Cesium.BingMapsStyle.AERIAL
        });

    //viewer.imageryLayers.addImageryProvider(bingMap);
    this.bingmapLayer = bingMap;
    */
    //加载天地图
    let token = 'a0e5adf3f1b5ec9d9a57465febe6baad';
    // 服务域名
    let tdtUrl = 'https://t{s}.tianditu.gov.cn/';
    // 服务负载子域
    let subdomains=['0','1','2','3','4','5','6','7'];
    // 叠加影像服务
    let tdtimgMap = new Cesium.UrlTemplateImageryProvider({
        url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
        subdomains: subdomains,
        tilingScheme : new Cesium.WebMercatorTilingScheme(),
        maximumLevel : 18,
        style:'img_c'
    });
    this.viewer.imageryLayers.addImageryProvider(tdtimgMap);

    const position = Cesium.Cartesian3.fromDegrees(180.1, 90.1, 13000000) //可以根据需求选择坐标与坐标类型
      this.viewer.camera.setView({
          destination: position,                  // 相机位置
          orientation: {
              heading: Cesium.Math.toRadians(360), // 水平旋转  -正北方向
              pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
              roll: 0 // 视口翻滚角度
              }
      });
    //this.viewer.scene.globe.enableLighting = true
    // // 添加默认图层
    // const imageryProvider = this.$Cesium.createWorldImagery()
    // viewer.imageryLayers.addImageryProvider(imageryProvider)

    // // 设置相机视角
    // viewer.camera.flyTo({
    //   destination: this.$Cesium.Cartesian3.fromDegrees(116.3974, 39.9092, 15000000.0)
    // })
    /*
    this.viewer.imageryLayers.remove(this.riskRIOareaLayer);
    let hisd = this.hisdate;
    //this.removeLayers();
    var provider = new Cesium.WebMapServiceImageryProvider({
          url: 'http://210.72.81.171:8099/geoserver/arctic/wms',
          layers: 'arctic:NO_ICE_rv_'+hisd,
          parameters: {
              service : 'WMS',
              format: 'image/png',
              transparent: true
          }
      });
    this.riskRIOareaLayer = this.viewer.imageryLayers.addImageryProvider(provider);
    */

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

  },
  methods: {
    getStartPoint(){
          //this.setCursorStyle("move");
          this.viewer.entities.removeById("hx_start_point");
          //下面是核心代码
          let flag = 1; //节流阀
          //创建一个屏幕控制实例，获取viewer下scene下所有canvas实例
          let handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
          let _this = this;
          //添加一个setInputAction监听事件，他可以监听点击，移动事件
          handler.setInputAction((click)=>{
            //this.setCursorStyle();

            // 屏幕坐标转世界坐标——关键点
            const ellipsoid = this.viewer.scene.globe.ellipsoid;
            const cartesian = this.viewer.camera.pickEllipsoid(click.position, ellipsoid);
            if (cartesian) {     //判断点击的是否是地球
              //将笛卡尔坐标转换为地理坐标
            const cartographic = Cesium.Cartographic.fromCartesian(cartesian);

            //let ray = _this.viewer.camera.getPickRay(movement.position);
            //let cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene);
            //let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let lng = Cesium.Math.toDegrees(cartographic.longitude);//经度
            let lat = Cesium.Math.toDegrees(cartographic.latitude);// 纬度
            let height = cartographic.height;//高度

            _this.hx_longitude1 = +lng;
            _this.hx_latitude1 = +lat;
            //let pick = viewer.scene.pick(movement.position)
            //这时候就可以用了
            if (flag <= 1) {
              flag++; //本次我只需要两个点 所以设了节流阀，放开就可以多次画点
              let poly = _this.viewer.entities.add({  //添加实体
              id:'hx_start_point',
                position: new Cesium.Cartesian3.fromDegrees(lng, lat, height), //添加实体的位置信息
                /*
                point: { //添加点
                  pixelSize: 25, //添加点的大小

                  color: _this.Cesium.Color.fromCssColorString('#ee0000'),
                  // 边框颜色
                  outlineColor: _this.Cesium.Color.fromCssColorString('#fff'),
                  // 边框宽度(像素)
                  outlineWidth: 2
                },
                */
                point: {
                    pixelSize: 1,   //设置小点  基本看不见
                    color: new Cesium.Color(0.0, 0.0, 0.0, 0.0)  //颜色设置透明
                },
                billboard: {
                    image: start_icon,
                    width: 40,  // 图片宽度,单位px
                    height: 40, // 图片高度，单位px
                    pixelOffset: new Cesium.Cartesian2(0, 0),
                    eyeOffset: new Cesium.Cartesian3(0, 0, 0),//与坐标位置的偏移距离
                    //color: Cesium.Color.RED,//颜色
                    scale: 1,   // 缩放比例
                  }
              });
            }
            //_this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(_this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
            setTimeout(() => {
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
            }, 500)
            }
            //当前的事件为点击事件
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        },

        // 开始
            start() {
              this.$refs.typewriter.start();
            },
            // 暂停
            pause() {
              this.$refs.typewriter.pause();
            },
            // 继续
            continueWrite() {
              this.$refs.typewriter.continueWrite();
            },
            // 重置
            reset() {
              this.$refs.typewriter.reset();
            },
            // 结束回调
            writeEnd() {
              console.log("end");
            }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url(../../../public/Cesium-1.73/Build/Cesium/Widgets/widgets.css);
.toprow,.centerrow{position: initial;}
#cesiumContainer{
  position: absolute;
  width: 0%;
  height: 0%;
}
.dv-border-box-11 .border-box-content {
    padding: 62px 9px 10px;
}

//ul  li 动态打印显示 样式
.data_desc{
        ul>li {

            /* 先把所有的透明度都为0，再用动画一个个显示出来 */
            opacity: 0;
        }

        ul>li:nth-of-type(4n+1) {
             /* 第一个2s 是指定一个动画周期的时长 */
             /* 第二个秒数 是定义动画于何时开始 */
             /* forwards ：动画结束后（由 animation-iteration-count 决定），动画将应用该属性值 动画完成后就停止 */
             /* 1 ： animation-iteration-count属性定义动画应该播放多少次。 */
              /* ease-in-out ： 开始和结束速度都是缓慢*/
            animation: show 2s 0s 1 forwards ease-in-out;
        }
        ul>li:nth-of-type(4n+2) {
            animation: show 2s 0.5s 1 forwards ease-in-out;
        }
        ul>li:nth-of-type(4n+3) {
            animation: show 2s 1s 1 forwards ease-in-out;
        }
        ul>li:nth-of-type(4n+4) {
            animation: show 2s 1.5s 1 forwards ease-in-out;
        }


        @keyframes show {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }
  }
</style>

