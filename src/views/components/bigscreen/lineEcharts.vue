<template>
  <div :class="'chart-box ' + className" :style="'width:' + width + 'px; height:' + height + 'px;'">
    <el-row v-if="title" class="chart-top">
      <el-col :span="14">
        <span class="chart-title" :style="title_size != undefined ? 'font-size:' + title_size : ''">{{ title }}</span>
      </el-col>
      <el-col :span="10" class="chart-tag" v-if="tagValue">
        <font :color="tagColor" class="chart-tag-1">{{ tagValue }}</font>
        <font :color="tagColor" class="chart-tag-2">{{ tagSuffix }}</font>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="chart-content">
        <div :ref="refName" :style="'height: ' + chartHeight + 'px;'"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts';
export default {
  name: 'chart-line',
  components: {},
  data() {
    return {
      objEcharts: null,
      chartHeight: 0,
      dataCategory: ['02-11', '02-12', '02-13', '02-14', '02-15', '02-16', '02-17'],
      dataSource: [[23, 34, 52, 11, 50, 25, 32]]
    }
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    refName: {
      type: String,
      default: 'chart_2'
    },
    width: {
      type: [Number, String],
      default: 462
    },
    height: {
      type: [Number, String],
      default: 183
    },
    title: {
      type: String,
      default: null
    },
    title_size: {
      type: String,
      default: undefined
    },
    tagColor: {
      type: String,
      default: '#45F2FE'
    },
    tagValue: {
      type: String,
      default: null
    },
    tagSuffix: {
      type: String,
      default: ''
    },
    categoryName: {
      type: String,
      default: 'acct_day'
    },
    valueColName: {
      type: String,
      default: 'col_value'
    },
    decimalColName: {
      type: String,
      default: 'decimal_num'
    },
    seriesCnNames: {
      type: String,
      default: null
    },
    seriesColors: {
      type: String,
      default: '#45F2FE'
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    showLegend: {
      type: Boolean,
      default: false
    },
    labelColor: {
      type: String,
      default: '#45CCFE'
    },
    labelSize: {
      type: String,
      default: '14px'
    },
    labelRotate: {
      type: Number,
      default: 0
    },
    lastColors: {
      type: String,
      default: null
    },
    lastLabelColor: {
      type: String,
      default: null
    },
    lineSmooth: {
      type: Boolean,
      default: false
    },
    lineAreaStyle: {
      type: Boolean,
      default: false
    },
    lineBoundaryGap: {
      type: Boolean,
      default: true
    },
    isRate: {
      type: Boolean,
      default: false
    },
    showX: {
      type: Boolean,
      default: true
    },
    showY: {
      type: Boolean,
      default: false
    },
    isZoomY: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    },
    splitNumber: {
      type: Number,
      default: 3
    },
    data: {
      type: Array,
      default: () => []
    },
    realData: {
      type: Array,
      default: () => []
    },
    stack: {
      type: Boolean,
      default: false
    },
    labelPos: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    axisxColor: {
      type: String,
      default: '#47A7FF'
    },
    axisyColor: {
      type: String,
      default: '#47A7FF'
    },
    axisfontColor: {
      type: String,
      default: '#98BBFF'
    },
    yright: {
      type: String,
      default: '70%'
    },
    interval: {
      type: Number,
      default: 0
    },
    showSplitLine: {
      type: Boolean,
      default: false
    },
    showAxisLine: {
      type: Boolean,
      default: false
    },
    xAxisName: {
      type: String,
      default: ''
    },
    isInt: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.chartHeight = this.title != null ? this.height - 30 : this.height
    if (this.showX && this.height > 100) {
      this.chartHeight = this.chartHeight - 20
    }
    this.setSpecialColor()
  },
  mounted() {
    this.loadData()
  },
  beforeDestroy() {
    this.dataCategory = []
    this.dataSource = []
    if (this.objEcharts != null) {
      this.objEcharts.dispose()
      this.objEcharts = null
    }
  },
  methods: {
    parseDecimal(col_value, decimal_num) {
      if (null == decimal_num || decimal_num == undefined) {
        decimal_num = 0
      }
      if (col_value == null) return null
      let res = Number(col_value.toFixed(decimal_num))
      try {
        let resArr = res.toString().split('.')
        if (resArr.length == 1 && decimal_num > 0) {
          res = res + '.'
          for (var i = 0; i < decimal_num; i++) {
            res = res + '0'
          }
        }
      } catch {}
      return res
    },
    setSpecialColor() {
      if (this.lastColors != null && this.lastColors != '') {
        if (this.lastColors.indexOf('-') > 1) {
          this.specialColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: this.lastColors.split('-')[0] },
            { offset: 1, color: this.lastColors.split('-')[1] }
          ])
        } else {
          this.specialColor = this.lastColors
        }
      }
    },
    loadData() {
      let _this = this
      if (null != _this.data && undefined != _this.data && _this.data.length > 0) {
        let tmpDataCategory = []
        let tmpDateAll = []
        _this.data.forEach((item2, index2) => {
          if (null != item2) {
            let tmpDataItem = []
            item2.forEach((item3, index3) => {
              if (null != item3) {
                if (index2 === 0) {
                  tmpDataCategory.push(item3[_this.categoryName])
                }
                tmpDataItem.push(_this.parseDecimal(item3[_this.valueColName], item3[_this.decimalColName]))
              }
            })
            if (null != _this.realData && _this.realData.length > 0 && null != _this.realData[index2]) {
              if (index2 === 0) {
                tmpDataCategory.push(_this.realData[index2][_this.categoryName])
              }
              tmpDataItem.push(_this.parseDecimal(_this.realData[index2][_this.valueColName], _this.realData[index2][_this.decimalColName]))
            }
            tmpDateAll.push(tmpDataItem)
          }
        })
        _this.dataCategory = tmpDataCategory
        _this.dataSource = tmpDateAll
        _this.loadChart()
      } else {
        this.loadChart()
      }
    },
    loadChart() {
      let _this = this

      this.objEcharts = echarts.init(this.$refs[this.refName])

      //console.log({title:_this.title, seriesCnNames: _this.seriesCnNames, series: _this.dataCategory, data: _this.dataSource});
      let option = {
        grid: {
          top: '35px',
          right: this.lineBoundaryGap ? (this.xAxisName ? '55px' : '15px') : '20px',
          bottom: '0',
          left: this.lineBoundaryGap ? '15px' : '20px',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            var relVal = params[0].name
            for (var i = 0, l = params.length; i < l; i++) {
              relVal += '<br />' + params[i].marker + (params[i].value == undefined ? '-' : params[i].value) + ' ' + (params[i].value == undefined ? '-' : this.unit)
            }
            return relVal
          }
        },
        xAxis: [
          {
            name: this.xAxisName ? this.xAxisName : '', // 这个设置只在末尾添加单位
            nameLocation: 'end',
            nameGap: 5,
            show: this.showX,
            type: 'category',
            boundaryGap: this.lineBoundaryGap,
            axisLabel: {
              show: true,
              interval: this.interval,
              rotate: this.labelRotate,
              textStyle: {
                color: _this.axisfontColor
              }
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: _this.axisxColor,
                width: '1'
              }
            },
            data: this.dataCategory
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitNumber: this.splitNumber,
            show: this.showY,
            position: 'left',
            axisLabel: {
              show: this.showY,
              textStyle: {
                color: _this.axisfontColor
              },
              formatter: (value, index) => {
                return this.isRate ? `${value}%` : `${this.isInt ? Number(value.toFixed(0)) : value}` + (this.tagSuffix != null ? this.tagSuffix : '')
              }
            },
            axisLine: {
              show: this.showAxisLine,
              lineStyle: {
                type: 'solid',
                color: _this.axisyColor,
                width: '1'
              }
            },
            splitLine: {
              show: this.showSplitLine,
              lineStyle: {
                type: 'solid',
                color: '#2551b3'
              }
            },

            max: function (val) {
              if (_this.max != undefined) return _this.max
              if (_this.isZoomY) {
                return val.max * 1.1
              }
              return val.max
            },
            min: function (val) {
              if (_this.min != undefined) return _this.min
              if (_this.isZoomY && val.min >= 0) {
                return (val.min * 0.85).toFixed()
              } else if (_this.isZoomY && val.min < 0) {
                return (val.min * 1.1).toFixed()
              }
              return val.min
            }
          }
        ],
        series: []
      }
      if (this.max != undefined && this.min != undefined) {
        let interval = (this.max - this.min) / this.splitNumber
        option.interval = interval
      }
      if (_this.showLegend && null != _this.seriesCnNames && _this.seriesCnNames.split(',').length >= 1) {
        option.legend = {
          data: _this.seriesCnNames.split(','),
          x: _this.yright,
          y: 'top',
          itemWidth: 10, // 图例图形宽度
          itemHeight: 10, // 图例图形高度
          right: '10px',
          textStyle: {
            color: '#99BAFC'
          }
        }
      }
      if (null != _this.dataSource && _this.dataSource.length > 0) {
        _this.dataSource.forEach((item, index) => {
          option.series.push({
            type: 'line',
            name: _this.seriesCnNames != null ? _this.seriesCnNames.split(',')[index] : null,
            stack: _this.stack,
            smooth: _this.lineSmooth,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: _this.seriesColors.split(',')[index],
              lineStyle: {
                width: 4 //设置线条粗细
              }
            },
            label: {
              show: _this.showLabel,
              position: _this.labelPos != '' ? _this.labelPos.split(',')[index] : 'top',
              color: _this.labelColor,
              fontSize: _this.labelSize,
              fontFamily: 'PingFangSC-Semibold',
              formatter: _this.isRate ? '{@[1]}%' : '{@[1]}'
            },
            data: _this.dataSource[index]
          })
          if (_this.lineAreaStyle) {
            option.series[index].areaStyle = {
              opacity: 0.4,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: _this.seriesColors.split(',')[index]
                },
                {
                  offset: 0.9,
                  color: 'rgba(180,180,180,0)'
                }
              ])
            }
          }
        })
      }
      //console.trace();
      this.objEcharts.setOption(option)
    }
  }
}
</script>

<style lang="scss">
</style>
