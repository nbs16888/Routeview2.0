<template>
  <div>
    <!-- 通过率/达标率 -->
    <Echart
      :options="options"
      :id="id"
      :height="height+'vh'"
      :width="width+'vw'"
      style="margin: 0 auto;"
    ></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart';
import echarts from 'echarts';
import {getLegendRanges} from '@/utils/bigscreen/legendRanges';
//import 'echarts-gl';
//import line3dJson from '../../../../public/geojson/noice.json';
export default {
  data () {
    return {
      options: {},
      edata: [],
      VALUE_RANGE: {
        concentration: [0, 100],
        thickness: [0, 5],
        rv: [-50, 30]
      },
      COLOR_MAP:  {
        thickness: [
          "#0000FF",
          "#0033FF",
          "#0066FF",
          "#0099FF",
          "#00CCFF",
          "#00FFFF",
          "#00FFCC",
          "#00FF99",
          "#00FF66",
          "#00FF33",
          "#00FF00",
          "#33FF00",
          "#66FF00",
          "#99FF00",
          "#CCFF00",
          "#FFFF00",
          "#FFCC00",
          "#FF9900",
          "#FF6600",
          "#FF3300",
          "#FF0000",
        ],
        concentration: [
          "#0000FF",
          "#0033FF",
          "#0066FF",
          "#0099FF",
          "#00CCFF",
          "#00FFFF",
          "#00FFCC",
          "#00FF99",
          "#00FF66",
          "#00FF33",
          "#00FF00",
          "#33FF00",
          "#66FF00",
          "#99FF00",
          "#CCFF00",
          "#FFFF00",
          "#FFCC00",
          "#FF9900",
          "#FF6600",
          "#FF3300",
          "#FF0000",
        ],
        rv: [
          "#FF0000",
          "#FF3300",
          "#FF6600",
          "#FF9900",
          "#FFCC00",
          "#FFFF00",
          "#CCFF00",
          "#99FF00",
          "#66FF00",
          "#33FF00",
          "#00FF00",
          "#00FF33",
          "#00FF66",
          "#00FF99",
          "#00FFCC",
          "#00FFFF",
          "#00CCFF",
          "#0099FF",
          "#0066FF",
          "#0033FF",
          "#0000FF"
        ],
      }
    };
  },
  components: {
    Echart,
  },
  props: {
    id: {
      type: String,
      required: true,
      default: "line3D"
    },
    height:{
      type:Number,
      default:200
    },
    width:{
      type:Number,
      default:410
    },
    line3dJson:{
      type:Array,
      default:()=>[]
    },
    dataType:{
      type: String,
      required: true,
      default: "0"
    },
  },
  computed:{
    colorType:function(){
      if(this.dataType==="0"){
        return "concentration";
      }
      else if(this.dataType==="1"){
        return "thickness";
      }
      else if(this.dataType==="2"){
        return "rv";
      }
    },
    zindex_desc:function(){
      if(this.dataType==="0"){
        return "(%)";
      }
      else if(this.dataType==="1"){
        return "(m)";
      }
      else if(this.dataType==="2"){
        return "";
      }
    }
  },
  created(){
    this.$nextTick(()=>{
      const tempx = [];
      const tempy = [];
      const tempz = [];
      if(!this.line3dJson.length) return;
      this.line3dJson.forEach(item=>{
        tempx.push(item[0]);
        tempy.push(item[1]);
        tempz.push(item[2]);
      });
      console.log(Math.floor(tempx.sort((a,b)=>a-b).shift()),
          Math.ceil(tempx.sort((a,b)=>a-b).pop()))
          console.log(Math.floor(tempx.sort((a,b)=>a-b).shift()),
              Math.ceil(tempx.sort((a,b)=>a-b).pop()))
      let sizeValue = '75%';
      this.options = {
        tooltip: {},
        grid: [
          { left: '50%', width: '40%', bottom: sizeValue },
          { left: '75%', width: '40%', bottom: sizeValue },
          { left: '50%', width: '40%', top: sizeValue },
          { left: '75%', width: '40%', top: sizeValue }
        ],
        xAxis3D: {
          name: "Lng",
          type: 'value',
          min: Math.floor(tempx.sort((a,b)=>a-b).shift()*0.8),
          max: Math.ceil(tempx.sort((a,b)=>a-b).pop()*1.2)
        },
        yAxis3D: {
          name: "Lat",
          type: 'value',
          min: Math.floor(tempy.sort((a,b)=>a-b).shift()*0.8),
          max: Math.ceil(tempy.sort((a,b)=>a-b).pop()*1.2)
        },
        zAxis3D: {
          name: this.zindex_desc,
          type: 'value',
          min: Math.floor(tempz.sort((a,b)=>a-b).shift()),
          max: Math.ceil(tempz.sort((a,b)=>a-b).pop()*1.2)
        },
        grid3D: {
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisPointer: {
            lineStyle: {
              color: '#ffbd67'
            }
          },
          viewControl: {
            // autoRotate: true
            // projection: 'orthographic'
            // 设置视角的左右旋转、上下旋转和距离
            alpha: 30,  // 左右旋转角度，0 到 90 度
            beta: 60,   // 上下旋转角度，-90 到 90 度
            distance: 200, // 图表与视角的距离，可以根据图表大小调整
          }
        },
        legend: {
          show: false,
        },
        visualMap: {
          show: false,
          dimension: 2,
          min: this.VALUE_RANGE[this.colorType][0],
          max: this.VALUE_RANGE[this.colorType][1],
          inRange: {
            color: this.COLOR_MAP[this.colorType],
          }
        },
        dataset: {
          source: this.line3dJson
        },
        series: [
          {
            type: "line3D",
            data: this.result,
            lineStyle: { width: 0 },
          },
          {
            type: 'scatter3D',
            name: this.colorType,
            symbol:'Point', //点形状 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            symbolSize: 3.5,
            itemStyle: {
              //borderWidth: 1,
              //borderColor: '#fff'
            },
            emphasis: {
              itemStyle: {
                color: '#fff'
              }
            }
          }
        ]
      };
    });
  },
  methods: {

  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
</style>
