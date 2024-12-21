<template>
  <div>
    <!-- 通过率/达标率 -->
    <div ref="calendarchart" style="margin: 0 auto;height:200px;min-width:580px;width:auto;" :key="freshKey"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import historyRange from '@/utils/bigscreen/history_range.js';
import forecastRange from '@/utils/bigscreen/forecast_range.js';
export default {
  data () {
    return {
      options: {},
      edata: [],
      chart: null,
      colors : ['#00aa00','#aaa'],
      pathes : [
        'M997.888 70.144C686.592 261.12 460.8 502.272 358.912 623.104l-248.832-195.072-110.08 88.576 429.568 437.248c73.728-189.44 308.224-559.616 594.432-822.784l-26.112-60.928m0 0z',
        'M512 64C264.533333 64 64 264.533333 64 512S264.533333 960 512 960 960 759.466667 960 512 759.466667 64 512 64z m0 810.666667c-200.533333 0-362.666667-162.133333-362.666667-362.666667S311.466667 149.333333 512 149.333333s362.666667 162.133333 362.666667 362.666667-162.133333 362.666667-362.666667 362.666667z M298.666667 469.333333h426.666666v85.333334H298.666667z'
      ],
      layouts : [
        [[0, 0]],
      ],
      freshKey: new Date().getTime(),
      nowYear:undefined
    };
  },
  components: {
    //Echart,
  },
  props: {
    year: {
      type: Number,
      default: undefined
    }
  },
  computed:{
    preMonth:function(){
      let temp = (this.isHistory?(historyRange[this.nowYear] && Object.keys(historyRange[this.nowYear])[0] - 1):(forecastRange[this.nowYear] && Object.keys(forecastRange[this.nowYear])[0] - 1)) || 7;
      return temp<1?'01':(temp+'').padStart(2,'0');
    },
    aftMonth:function(){
      let temp = (this.isHistory?(historyRange[this.nowYear] && Object.keys(historyRange[this.nowYear])[0] + 1):(forecastRange[this.nowYear] && Object.keys(forecastRange[this.nowYear])[0] + 1)) || 10;
      return temp>12?'12':(temp+'').padStart(2,'0');
    },
    isHistory:function(){
      return !!historyRange[this.year];
    }
  },
  created(){
    this.nowYear = this.year || Object.keys(historyRange).sort((a,b)=>b-a).pop();
    this.edata = this.getVirtualData(this.nowYear);
    this.options = {
      backgroundColor: 'transparent',
      title: {
        show:false,
        top: -5,
        text: '通航时期',
        left: 10,
        textStyle: {
            color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item',
        borderWidth: 0,
        formatter: (params) => {
          return `<div><b>${params.value[0]}</b> : ${params.value[1]==0?'Unobstructed':'Barrier'}</div>`
        },
      },
      visualMap: [
        {
          show:false,
          type: 'piecewise',
          orient: 'horizontal',
          top: 0,
          right: 0,
          min: 0,
          max: 1000,
          text: ['多', '少'],
          textStyle: {
            color: '#fff',
            fontSize: 14,
            // 处理两端文字与图例单元格距离
            padding: [0, 16],
            borderWidth: 0.000001,
            borderColor: 'transparent'
          },
          showLabel: false,
          itemWidth: 20,
          itemHeight: 20,
          itemGap: 4,
          selectedMode: false, //禁止选择
          inRange: {
            color: [
            '#55aaff'
            ]
          },
          //图例分段
          pieces: [
            { min: 1000 },
            { min: 800, max: 1000 },
            { min: 500, max: 800 },
            { min: 300, max: 500 },
            { min: 1, max: 300 },
            { value: 0, color: 'rgba(233,233,233)' }
          ]
        }
      ],
      calendar: {
        left: 'center',
        top: 'middle',
        range: [this.nowYear+"-"+this.preMonth,this.nowYear+"-"+this.aftMonth],
        cellSize: [20, 20], //格子尺寸
        itemStyle: {
          //解决格子间距
          borderWidth: 1,
          borderColor: 'transparent',
          backgroundColor:'transparent'
        },
        splitLine: {
          // 去掉月份分割线
          show: false,
        },
        dayLabel: {
          firstDay: 0,
          fontSize: 14,
          margin: 16,
          color: '#fff',
          verticalAlign: 'middle',
          nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        monthLabel: {
          color: '#fff',
          align: 'center'
        },
        yearLabel: {
          show: false,
        },
      },
      series: {
        type: 'custom',
        coordinateSystem: 'calendar',
        renderItem: (params, api)=> {
          const cellPoint = api.coord(api.value(0));
          const cellWidth = params.coordSys.cellWidth;
          const cellHeight = params.coordSys.cellHeight;
          const value = api.value(1);
          const events = value;
          if (isNaN(cellPoint[0]) || isNaN(cellPoint[1])) {
            return;
          }
          const group = {
            type: 'group',
            children:
              (this.layouts[events.length - 1] || []).map((
                itemLayout,
                index
              )=>{
                return {
                  type: 'path',
                  shape: {
                    pathData: this.pathes[+events[index]],
                    x: -6,
                    y: -14,
                    width: 14,
                    height: 12
                  },
                  position: [
                    cellPoint[0] +
                      echarts.number.linearMap(
                        itemLayout[0],
                        [-0.5, 0.5],
                        [-cellWidth / 2, cellWidth / 2]
                      ),
                    cellPoint[1] +
                      echarts.number.linearMap(
                        itemLayout[1],
                        [-0.5, 0.5],
                        [-cellHeight / 2 + 20, cellHeight / 2]
                      )
                  ],
                  style: api.style({
                    fill: this.colors[+events[index]]
                  })
                };
              }) || []
          };
          group.children.push({
            type: 'text',
            style: {
              x: cellPoint[0],
              y: cellPoint[1] - cellHeight / 2 + 15,
              text: echarts.format.formatTime('dd', api.value(0)),
              fill: 'transparent',
              textFont: api.font({ fontSize: 14 })
            }
          });
          return group;
        },
        dimensions: [undefined, { type: 'ordinal' }],
        data: this.edata
      },
    };
  },
  mounted(){
    this.$nextTick(()=>{
      this.initChart();
    })
  },
  methods: {
    initChart () {
      // 初始化echart
      this.chart = this.$echarts.init(this.$refs.calendarchart);
      this.chart.setOption(this.options)
      this.getNowDate();
    },
    getVirtualData(year) {
      year = year || Date.getFullYear();
      const date = +echarts.number.parseDate(year + '-'+this.preMonth+'-01');
      const end = +echarts.number.parseDate(year + '-'+this.aftMonth+'-'+(new Date(year,this.aftMonth,0).getDate()));
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      if(this.isHistory){
        for (let time = date; time < end; time += dayTime) {
          const date = echarts.format.formatTime('yyyy-MM-dd', time).split("-");
          let items = [historyRange[+date[0]] && historyRange[+date[0]][+date[1]] && historyRange[+date[0]][+date[1]].indexOf(+date[2])>-1?0:1 || 1];
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            items
          ]);
        }
      }else{
        for (let time = date; time < end; time += dayTime) {
          const date = echarts.format.formatTime('yyyy-MM-dd', time).split("-");
          let items = [forecastRange[+date[0]] && forecastRange[+date[0]][+date[1]] && forecastRange[+date[0]][+date[1]].indexOf(+date[2])>-1?0:1 || 1];
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            items
          ]);
        }
      }
      return data;
    },
    // 点击事件,获取选中日期传递给父组件
    getNowDate() {
      this.chart.on("click", (e)=> {
        if(e.data[1][0]===1) {
          this.$message.warning("Not navigable");
          return;
        }
        // 高亮颜色
        this.ChangeFontColor(e);
        setTimeout(() => {
          const data = e.data[0];
          this.$emit("getData", data); //用that.$emit即可解决传值问题
          // that.infoData = that.chartData.infoData;
          //that.infoItem = that.infoData.find(obj => obj.date === data);
        }, 20);
      });
    },

    // 点击图标改变字体颜色
    ChangeFontColor(params) {
      let seriesIndex = params.seriesIndex;
      let dataIndex = params.dataIndex;
      this.chart.dispatchAction({
        type: "downplay" //取消高亮指定的数据图形。通过seriesName或者seriesIndex指定系列。如果要指定某个数据可以再指定dataIndex或者name。
      });
      this.chart.dispatchAction({
        type: "highlight", //高亮指定的数据图形。通过seriesName或者seriesIndex指定系列。如果要再指定某个数据可以再指定dataIndex或者name。         //取消高亮指定的数据图形。通过seriesName或者seriesIndex指定系列。如果要指定某个数据可以再指定dataIndex或者name。
        seriesIndex: seriesIndex, // 可选，系列 index，可以是一个数组指定多个系列
        dataIndex: dataIndex // 可选，数据的 index
      });
    }
  },
  watch: {
    "year":function(nv,ov){
      this.nowYear = nv;
      this.edata = this.getVirtualData(nv);
      this.options.calendar.range = [this.nowYear+"-"+this.preMonth,this.nowYear+"-"+this.aftMonth];
      this.options.series.data = this.edata;
      this.chart.clear();
      this.chart.setOption(this.options,false);
      this.chart.resize();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
