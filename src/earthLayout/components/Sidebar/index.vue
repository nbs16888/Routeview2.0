<template>
  <div class="Sidebar">
    <el-button
      type="text"
      icon="el-icon-menu"
      @click="visible = true"
      title="菜单栏"
      class="sidebarBtn"
    ></el-button>
    <el-drawer title="菜单栏" :visible.sync="visible" :direction="direction">
      <div class="userInfo">
        <div class="right-menu">
          <el-dropdown
            class="avatar-container right-menu-item hover-effect"
            trigger="click"
          >
            <div class="avatar-wrapper">
              <img :src="avatar" class="user-avatar" />
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/user/profile">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click.native="logout">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div>
        <el-tabs tab-position="left" type="border-card" style="height: 100vh;">
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
            </div></el-tab-pane
          >
          <el-tab-pane label="其他"
            ><div>
              <el-select
                v-model="cameraPositionValue"
                ref="cameraPosition"
                clearable
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
      </div>
    </el-drawer></div
></template>

<script>
import { mapGetters } from "vuex";
import { listCamera } from "@/api/earth/camera";
import LayerTree from "./LayerTree";
export default {
  name: "Sidebar",
  //import引入的组件需要注入到对象中才能使用",
  components: { LayerTree },
  props: {},
  data() {
    //这里存放数据",
    return {
      visible: false,
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
          //取消掉下拉框的焦点
          this.$refs.cameraPosition.blur();
          //关闭侧边栏
          this.visible = false;
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

<style lang="scss" scoped>
.Sidebar {
  .userInfo {
    display: flex;
    justify-content: center;
    border-bottom: #dcdfe6 solid;

    .right-menu {
      float: right;
      height: 100%;
      line-height: 25px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 80px;
            height: 80px;
            border-radius: 40px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 60px;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
<style>
.Sidebar .sidebarBtn {
  position: fixed;
  z-index: 1000;
  top: 80px;
  bottom: auto;
  left: 16px;
  font-size: 50px;
}
.Sidebar .el-tabs__item {
  padding: 10px 20px;
  height: 70px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  position: relative;
}
</style>
