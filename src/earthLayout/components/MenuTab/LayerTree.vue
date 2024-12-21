<template>
  <div class="LayerTree">
    <el-tree
      :data="layerlistList"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="layerProps"
      @node-click="nodeClick"
    >
    </el-tree>
  </div>
</template>

<script>
import { listLayerlist, getLayerlist } from "@/api/earth/layerlist";
export default {
  name: "LayerTree",
  //import引入的组件需要注入到对象中才能使用",
  components: {},
  data() {
    //这里存放数据",
    return {
      // 图层管理表格数据
      layerlistList: [],
      layerProps: {
        children: "children",
        label: "layerName"
      }
    };
  },
  //监听属性 类似于data概念",
  computed: {},
  //监控data中的数据变化",
  watch: {},
  //方法集合",
  methods: {
    /** 查询图层管理列表 */
    getList() {
      listLayerlist({ visible: "1" }).then(response => {
        this.layerlistList = this.handleTree(
          response.data,
          "layerId",
          "parentId"
        );
        // console.log(response.data);
      });
    },
    /** 转换图层管理数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.layerId,
        label: node.layerName,
        children: node.children
      };
    },
    //节点被点击时的回调
    nodeClick(node) {
      this.$confirm(
        '确认要将相机视角飞行定位到"' + node.layerName + '"的位置吗?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        console.log(node);
        // 相机飞到指定地点︿(￣︶￣)︿
        if (node.layerX != null && node.layerY != null) {
          this.GLOBAL.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
              node.layerX, //经
              node.layerY, //纬
              node.cameraPositionHeight //相机高度
            ),
            orientation: {
              heading: Cesium.Math.toRadians(node.layerHeading), //相机弧度
              pitch: Cesium.Math.toRadians(node.layerPitch), //相机弧度方向
              roll: Cesium.Math.toRadians(node.layerRoll) //相机弧度角
            }
          });
        } else {
          this.GLOBAL.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
              122.27, //经
              43.62, //纬
              10000 //相机高度
            )
          });
        }
      });
    }
  },
  //生命周期 - 创建之前",数据模型未加载,方法未加载,html模板未加载
  beforeCreate() {},

  //生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created() {
    this.getList();
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

<style></style>
