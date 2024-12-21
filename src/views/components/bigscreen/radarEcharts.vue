<template>
  <div>
    <!-- 通过率/达标率 -->
    <Echart
      :options="options"
      :id="id"
      height="320px"
      width="85%"
      style="margin: 0 auto;"
    ></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  data () {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    id: {
      type: String,
      required: true,
      default: "chartRate"
    },
    tips: {
      type: Number,
      required: true,
      default: 50
    },
    colorObj: {
      type: Object,
      default: function () {
        return {
          textStyle: "#3fc0fb",
          series: {
            color: ["#00bcd44a", "transparent"],
            dataColor: {
              normal: "#03a9f4",
              shadowColor: "#97e2f5"
            }
          }
        };
      }
    }
  },
  watch: {
    // tips 是会变更的数据，所以进行监听
    tips: {
      handler (newData) {
        this.options = {
                backgroundColor: "transparent",
                tooltip: {
                    show: true,
                    // 控制提示框组件的显示位置
                    position: ["60%", "10%"]
                },
                radar: {
                    indicator: [
                        { name: "Distance(sea mile)", max: 100 },
                        { name: "Time", max: 100 },
                        { name: "Fuel consumption cost", max: 100 },
                        { name: "CO2 per trip", max: 100 },
                        { name: "Unit shipping costs", max: 100 }
                    ],
                    // 修改雷达图的大小
                    radius: "65%",
                    shape: "circle",
                    // 分割的圆圈个数
                    splitNumber: 4,
                    name: {
                        // 修饰雷达图文字的颜色
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    // 分割的圆圈线条的样式
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255, 0.5)"
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    // 坐标轴的线修改为白色半透明
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255, 255, 255, 0.5)"
                        }
                    }
                },
                series: [
                    {
                        name: "RouteCompare",
                        type: "radar",
                        // 填充区域的线条颜色
                        lineStyle: {
                            normal: {
                                color: "#fff",
                                width: 1,
                                opacity: 0.5
                            }
                        },
                        data: [[90, 19, 56, 11, 34],[ 19, 56, 11 , 34,90]],
                        // 设置图形标记 （拐点）
                        symbol: "circle",
                        // 这个是设置小圆点大小
                        symbolSize: 5,
                        // 设置小圆点颜色
                        itemStyle: {
                            color: "#fff"
                        },
                        // 让小圆点显示数据
                        label: {
                            show: true,
                            fontSize: 10
                        },
                        // 修饰我们区域填充的背景颜色
                        areaStyle: {
                            color: "rgba(238, 197, 102, 0.6)"
                        }
                    }
                ]
            }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
