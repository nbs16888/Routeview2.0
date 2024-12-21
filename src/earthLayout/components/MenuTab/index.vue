<template>
  <div class="MenuTab">
    <!--    <el-tabs type="border-card" v-show="boxShow">-->
    <!--      <el-tab-pane label="用户管理">用户管理</el-tab-pane>-->
    <!--      <el-tab-pane label="配置管理">配置管理</el-tab-pane>-->
    <!--      <el-tab-pane label="角色管理">角色管理</el-tab-pane>-->
    <!--      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>-->
    <!--    </el-tabs>-->
    <el-tabs type="border-card" v-show="boxShow">
      <el-tab-pane label="底图图层"
        ><div>
          <el-button @click="addTdt">{{
            tianditu ? "移除天地图标注地图" : "添加天地图标注地图"
          }}</el-button>
        </div>
        <div>
          <el-radio-group v-model="terrainType" @change="changeTerrain">
            <el-radio-button label="cesium">Cesium地形</el-radio-button>
            <el-radio-button label="arcgis"
              >ArcGISTiledElevation地形
            </el-radio-button>
            <el-radio-button label="">移除</el-radio-button>
          </el-radio-group>
        </div></el-tab-pane
      >
      <el-tab-pane label="自定义图层"><layer-tree /></el-tab-pane>
      <el-tab-pane label="工具栏"
        ><div>
          <el-button @click="showAbcController">透明度操作栏</el-button>
          <el-button @click="showDrawerToolBox">绘制</el-button>
          <el-button @click="showMeasureToolBox">量算</el-button>
          <el-button @click="showImageLayerSplit">卷帘</el-button>
          <location-mark /></div
      ></el-tab-pane>
      <el-tab-pane label="其他"
        ><div>
          <el-select
            :value="cameraPositionValue"
            ref="cameraPosition"
            filterable
            placeholder="请选择"
            @change="cesiumCameraFly2Position"
          >
            <el-option
              v-for="item in cameraPositionList"
              :key="item.cameraId"
              :label="item.cameraName"
              :value="item"
            >
            </el-option>
          </el-select></div
      ></el-tab-pane>
    </el-tabs>

    <el-button
      type="text"
      icon="el-icon-s-fold"
      title="菜单栏"
      class="menuBtn"
      v-if="boxShow"
      @click="toggleBox"
    ></el-button>
    <el-button
      type="text"
      icon="el-icon-s-unfold"
      title="菜单栏"
      v-else
      class="menuBtn"
      @click="toggleBox"
    ></el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { listCamera } from "@/api/earth/camera";
import LayerTree from "./LayerTree";
import LocationMark from "../../../components/earthComponents/tools/LocationMark/index";
export default {
  name: "MenuTab",
  //import引入的组件需要注入到对象中才能使用",
  components: { LocationMark, LayerTree },
  props: {},
  data() {
    //这里存放数据",
    return {
      boxShow: false,
      direction: "ltr",
      terrainType: "cesium",
      tianditu: false,
      //预设的相机标记点
      cameraPositionList: [],
      cameraPositionValue: null
    };
  },
  //监听属性 类似于data概念",
  computed: {
    ...mapGetters(["avatar", "device"]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val
        });
      }
    }
  },
  //监控data中的数据变化",
  watch: {},
  //方法集合",
  methods: {
    toggleBox() {
      this.boxShow = !this.boxShow;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.href = "/index";
        });
      });
    },
    //告诉父组件APPmain添加天地图矢量标注底图
    addTdt() {
      this.tianditu = !this.tianditu;
      this.$parent.addTianditu();
    },
    //告诉父组件APPmain展示透明度，亮度，对比度栏目
    showAbcController() {
      this.$parent.showAbcController();
    },
    //告诉父组件APPmain展示绘制工具栏
    showDrawerToolBox() {
      this.$parent.showDrawerToolBox();
    },
    //告诉父组件APPmain显示量算工具栏
    showMeasureToolBox(val) {
      this.$parent.showMeasureToolBox(val);
    },
    //告诉父组件修改地形底图
    changeTerrain(val) {
      this.$parent.changeTerrain(val);
    },
    //从服务端拉取预设地点
    getCameraPositionList() {
      //将是否启用设置为查询条件，只要已启用的
      listCamera({ status: "1" }).then(response => {
        this.cameraPositionList = response.rows;
        // console.log(this.cameraPositionList);
      });
    },
    //卷帘
    showImageLayerSplit() {
      this.$parent.showImageLayerSplit();
    },
    cesiumCameraFly2Position(val) {
      this.cameraPositionValue = val.cameraName;
      this.$confirm(
        '确认要将相机视角跳转到"' + val.cameraName + '"的位置吗?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          // //取消掉下拉框的焦点
          this.$refs.cameraPosition.blur();
          //关闭侧边栏
          // this.visible = false;
        })
        .then(() => {
          // console.log(val);
          //相机飞到指定地点︿(￣︶￣)︿
          this.GLOBAL.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
              val.cameraPositionLng, //经
              val.cameraPositionLat, //纬
              val.cameraPositionHeight //相机高度
            ),
            orientation: {
              heading: Cesium.Math.toRadians(val.cameraOrientationHeading), //相机弧度
              pitch: Cesium.Math.toRadians(val.cameraOrientationPitch), //相机弧度方向
              roll: val.cameraOrientationRoll //相机弧度角
            }
          });
        });
    }
  },
  //生命周期 - 创建之前",数据模型未加载,方法未加载,html模板未加载
  beforeCreate() {},

  //生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created() {
    this.getCameraPositionList();
  },
  //生命周期 - 挂载之前",html模板未渲染
  beforeMount() {},

  //生命周期 - 挂载完成（可以访问DOM元素）",html模板已渲染
  mounted() {},

  //生命周期 - 更新之前",数据模型已更新,html模板未更新
  beforeUpdate() {},
  //生命周期 - 更新之后",数据模型已更新,html模板已更新
  updated() {},
  //生命周期 - 销毁之前",
  beforeDestroy() {},
  destroyed() {},
  //生命周期 - 销毁完成",
  //如果页面有keep-alive缓存功能，这个函数会触发",
  activated() {}
};
</script>

<style scoped>
.MenuTab {
  display: flex;
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: auto;
  left: 0;
}
.menuBtn {
  display: flex;
  position: relative;
  left: 0;
  font-size: 30px;
  width: 40px;
  height: 40px;
  background: rgba(250, 250, 250, 0.8);
}
.MenuTab .el-button {
  padding: 3px;
}
</style>
