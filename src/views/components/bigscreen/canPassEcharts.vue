<template>
  <div>
    <!-- 年度开工率 -->
    <Echart
      :options="options"
      id="bottomLeftChart"
      height="480px"
      width="100%"
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
  },
  created(){
    let colorarr = [
      "#1a7ab6",
      "#f77d0e",
      "#2a9c2a",
      "#da2325",
      "#9367bc",
      "#8e5645",
      "#e774bf",
      "#808080",
      "#bbba2c",
      "#4A235A",
      "#C39BD3",
      "#F9E79F",
      "#BA4A00",
      "#5555ff",
      "#616A6B",
      "#f8abb0",
      "#4A235A",
      "#3498DB",
    ];
    let colorList = [];
    let x_data = [],y_data = [],empty_data = [];
    let start_year = new Date().getFullYear();
    for(let i=0;i<=30;i++){
      x_data.push(start_year+i);
      y_data.push(this.getRandomInt(60,120));
      empty_data.push(this.getRandomInt(120,200));
      let randomIndex = Math.floor(Math.random() * colorarr.length);
      let randomValue = colorarr[randomIndex];
      colorList.push(randomValue);
    }
    this.drawFun(x_data, empty_data,y_data,colorList);

    /*
    let { innerWidth } = window;
    let fontSize = innerWidth > 4000 ? 24 : 12;
    let barWidth = innerWidth > 4000 ? 48 : 24;
    this.options = {

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: "rgba(0,0,0,0.08)",
            },
          },
          formatter: (params) => {
            let tar = params[1];
            return tar.name + " : " + tar.value;
          },
        },
        grid: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 40,
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLabel: {
              color: "rgba(255,255,255,0.75)",
              fontSize: fontSize,
              lineHeight: 16,
              end: true,
              margin: 10,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.75)",
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.75)",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.35)",
              },
            },
            data: [
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
              "2021"
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "rgba(255,255,255,0.75)",
              fontSize: fontSize,
              lineHeight: 16,
              end: true,
              margin: 10,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.75)",
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.75)",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.35)",
              },
            },
            min: 0,
            max: 365,
          },
        ],
        series: [
          {
            name: "Auxiliary", //空白堆叠部分
            type: "bar",
            stack: "total",
            itemStyle: {
              color: "rgba(255,0,0,0)",
            },
            barWidth: barWidth,
            data: [218, 231, 222, 208, 222, 202, 220, 205, 200, 223],
          },
          {
            name: "Number",
            type: "bar",
            stack: "total",
            itemStyle: {
              color: (params) => {
                let colorList = [
                  "#1a7ab6",
                  "#f77d0e",
                  "#2a9c2a",
                  "#da2325",
                  "#9367bc",
                  "#8e5645",
                  "#e774bf",
                  "#808080",
                  "#bbba2c",
                  "#4A235A",
                  "#C39BD3",
                  "#F9E79F",
                  "#BA4A00",
                  "#ECF0F1",
                  "#616A6B",
                  "#EAF2F8",
                  "#4A235A",
                  "#3498DB",
                ];
                return colorList[params.dataIndex];
              },
            },
            label: {
              show: true,
              position: "inside",
              color: "rgba(255,255,255,0.75)",
              fontSize: fontSize,
            },
            barWidth: barWidth,
            data: [78, 50, 62, 81, 74, 83, 76, 101, 114, 79],
          },
        ]
    };
    */
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min); // 将min向上取整
      max = Math.floor(max); // 将max向下取整
      return Math.floor(Math.random() * (max - min + 1)) + min; // 返回min到max之间的随机整数
    },
    drawFun(x_data,empty_data,y_data,colorList){
      this.options = {
          color: ['#2ec7c9'], // 调色盘颜色列表
          legend: {
            show: false, // 是否显示图例组件
            left: 120, // 图例组件离容器左侧的距离(值为 left,center,right 组件会根据相应的位置自动对齐)
            top: 20, // 图例组件离容器上侧的距离(值为top,middle,bottom 组件会根据相应的位置自动对齐)
            data: ['val值'], // 图例的数据数组
            icon: 'roundRect', // 图例项的图标 circle.圆 rect.矩形 roundRect.圆角矩形 triangle.三角形 diamond.菱形 pin.钉 arrow.箭头 none.无
            textStyle: {
              color: 'red', // 文字的颜色
              fontSize: 12, // 字体大小
              fontStyle: 'normal', // 字体风格 normal.标准(默认) talic oblique.斜的
              fontWeight: 'normal' // 字体粗细
            } // 图例的公用文本样式
          }, // 图例组件
          tooltip: {
            trigger: 'axis', // 触发类型 item.数据项图形触发(主要在散点图) axis.坐标轴触发(主要在柱状图) none.什么都不触发
            axisPointer: {
              type: 'shadow' // 指示器类型 line.直线指示器 shadow.阴影指示器 none.无指示器 cross.十字准星指示器
            } // 坐标轴指示器配置项
          }, // 提示框组件
          grid: {
            top:10,
            left: '2%', // grid 组件离容器左侧的距离(值为 left,center,right 组件会根据相应的位置自动对齐)
            right: '2%', // grid 组件离容器右侧的距离
            bottom: '10%', // grid 组件离容器下侧的距离
            containLabel: true // grid 区域是否包含坐标轴的刻度标签
          }, // 直角坐标系网格
          dataZoom: [{
            type: "slider", // 滑动条型数据区域缩放组件
            //show: true, // 是否显示组件(用于 x 轴使用)
            start: 70, // 数据窗口范围的起始百分比(范围是：0 ~ 100。表示 0% ~ 100%)
            end: 100, // 数据窗口范围的结束百分比(范围是：0 ~ 100。表示 0% ~ 100%)
            height: 20, // 组件的高度(水平布局默认 30，竖直布局默认自适应)
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '50%', // 控制手柄的尺寸，可以是像素大小，也可以是相对于 dataZoom 组件宽度的百分比，默认跟 dataZoom 宽度相同
            handleStyle: {
              color: '#fff', // 图形的颜色
              // borderColor: 'red', // 图形的描边颜色
              borderWidth: 0, // 描边线宽。为 0 时无描边
              borderType: 'solid' ,// 描边类型 solid.实线(默认) dashed.虚线 dotted.点虚线
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }, // 两侧缩放手柄的样式配置
            showDataShadow: false, // 是否在 dataZoom-silder 组件中显示数据阴影。数据阴影可以简单地反应数据走势
          }, {
            type: "inside", // 内置型数据区域缩放组件(即在坐标系内平移与缩放)
            start: 70, // 数据窗口范围的起始百分比(范围是：0 ~ 100。表示 0% ~ 100%)
            end: 100 // 数据窗口范围的结束百分比(范围是：0 ~ 100。表示 0% ~ 100%)
          }, {
            type: "slider", // 滑动条型数据区域缩放组件
            //show: false, // 是否显示组件(用于 y 轴使用)
            width: "5%", // 组件的宽度(竖直布局默认 30，水平布局默认自适应)
            height: "50%", // 组件的高度(水平布局默认 30，竖直布局默认自适应)
            yAxisIndex: 0, // 组件控制的 y 轴(即下方 yAxis 数组的索引值)
            filterMode: "empty", // none.不过滤数据只改变数轴范围 empty.当前数据窗口外的数据设置为空，不影响其他轴的数据范围 其他访问https://echarts.apache.org/zh/option.html#dataZoom-slider.filterMode
            handleSize: '50%', // 控制手柄的尺寸，可以是像素大小，也可以是相对于 dataZoom 组件宽度的百分比，默认跟 dataZoom 宽度相同
            handleStyle: {
              color: '#fff', // 图形的颜色
              // borderColor: 'red', // 图形的描边颜色
              borderWidth: 0, // 描边线宽。为 0 时无描边
              borderType: 'solid' // 描边类型 solid.实线(默认) dashed.虚线 dotted.点虚线
            }, // 两侧缩放手柄的样式配置
            showDataShadow: false, // 是否在 dataZoom-silder 组件中显示数据阴影。数据阴影可以简单地反应数据走势
            left: "93%" // 组件离容器左侧的距离
          }], // 区域缩放
          xAxis: [{

              type: "category",
              boundaryGap: true,
              axisLabel: {
                color: "rgba(255,255,255,0.75)",
                fontSize: 14,
                lineHeight: 16,
                end: true,
                margin: 10,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.75)",
                },
              },
              axisTick: {
                show: true,
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.75)",
                },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.35)",
                },
              },
              data: x_data
          }],
          yAxis: [{
            // name: 'y坐标轴名称', // 坐标轴名称
            nameLocation: 'end', // 坐标轴名称的显示位置 start.开始 center.中心 end.末端(默认)
            nameTextStyle: {
              color: '#000', // 字体颜色(默认取 axisLine.lineStyle.color)
              fontSize: 12, // 字体大小
              padding: 0, // 文字块的内边距
              fontStyle: 'normal', // 字体风格 normal.标准(默认) talic oblique.斜的
              fontWeight: 'normal' // 字体粗细
            }, // 坐标轴名称的文字样式
            type: 'value', // 坐标轴类型 value.数值轴(适用于连续数据) category.类目轴(适用于离散的类目数据) time.时间轴(适用于连续的时序数据) log.对数轴(适用于对数数据)
            axisLabel: {
              color: "#fff",
              fontSize: 14,
              lineHeight: 16,
              end: true,
              margin: 10,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.35)",
              },
            },
            min: 0,
            max: 365
          }],
          series: [{
            name: "Auxiliary", //空白堆叠部分
            type: "bar",
            stack: "total",
            itemStyle: {
              color: "rgba(255,0,0,0)",
            },
            barWidth: '30%',
            data: empty_data,
          },
          {
            name: "Number",
            type: "bar",
            stack: "total",
            itemStyle: {
              color: (params) => {
                return colorList[params.dataIndex];
              },
            },
            label: {
              show: true,
              position: "inside",
              color: "#fff",
              fontSize: 14,
            },
            barWidth: '30%',
            data: y_data,
          }]
        };
    }
  },
  watch: {},
}
</script>
