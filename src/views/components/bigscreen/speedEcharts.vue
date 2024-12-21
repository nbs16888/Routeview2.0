<template>
  <div>
    <!-- 通过率/达标率 -->
    <Echart
      :options="options"
      :height="height+'px'"
      :width="width+'px'"
      style="margin: 0 auto;"
    ></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart';
import echarts from 'echarts';
import 'echarts-gl';
import { data } from 'vue-cesium/lib/mixins/mixinProps';
export default {
  data () {
    return {
      options: {},
      edata: [],
      intervalspeed:null
    };
  },
  components: {
    Echart,
  },
  props: {
    height:{
      type:Number,
      default:200
    },
    width:{
      type:Number,
      default:410
    },
    shipinfokey:{

    },
    speed:{
      type:Number,
      default:5
    }
  },
  beforeDestory(){
    clearInterval(this.intervalspeed);
  },
  created(){
    this.$nextTick(()=>{
      let sizeValue = '85%';
      this.options = {
            series: [
              {
                type: 'gauge',
                min:0,
                max:20,
                center: ['50%', '40%'],
                axisLine: {
                  lineStyle: {
                    width: 15,
                    color: [
                      [0.3, '#67e0e3'],
                      [0.7, '#37a2da'],
                      [1, '#fd666d']
                    ]
                  }
                },
                pointer: {
                  itemStyle: {
                    color: 'auto'
                  }
                },
                axisTick: {
                  distance: -30,
                  length: 8,
                  lineStyle: {
                    color: '#fff',
                    width: 2
                  }
                },
                splitLine: {
                  distance: -30,
                  length: 18,
                  lineStyle: {
                    color: '#fff',
                    width: 4
                  }
                },
                axisLabel: {
                  color: 'inherit',
                  distance: 5,
                  fontSize: 12
                },
                detail: {
                  fontSize: '15',
                  formatter: '{value} knot/h',
                  color: 'auto',
                  offsetCenter: ['0', '30%']
                },
                data: [
                  {
                    value: this.speed
                  }
                ]
              }
            ]
          };
    });
    /*
    let _this = this;
    this.intervalspeed = setInterval(function () {
      _this.options.series[0].data[0].value = +(Math.random() * 10).toFixed(2);
     // _this.$emit('update:shipinfokey', new Date().getTime());
    }, 2000);
    */
  },
  methods: {

  },
  watch: {}
};
</script>

<style lang="scss" scoped>
</style>
