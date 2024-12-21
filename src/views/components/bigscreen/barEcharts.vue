<template>
  <div :class="'chart-box ' + className" :style="'width:'+width+'px; height:'+height+'px;'">
    <el-row v-if="title" class="chart-top">
      <el-col :span="14">
        <span class="chart-title">{{title}}</span>
      </el-col>
      <el-col :span="10" class="chart-tag">
        <font :color="tagColor" class="chart-tag-1">{{tagValue}}</font>
        <font :color="tagColor" class="chart-tag-2">{{tagSuffix}}</font>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="chart-content">
        <div :ref="refName" :style="'height: '+ chartHeight + 'px;'"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "chart-bar",
    components: {},
    data() {
      return {
        objEcharts: null,
        chartHeight: 0,
        dataCategory: ['02-11', '02-12', '02-13', '02-14', '02-15', '02-16', '02-17'],
        dataSource: [
          [23, 34, 52, 11, 32, 25, 32]
        ],
        specialColor: null
      };
    },
    props: {
      className: {
        type: String,
        default: ''
      },
      refName: {
        type: String,
        default: "chart_1"
      },
      width: {
        type: [Number, String],
        default: 460
      },
      height: {
        type: [Number, String],
        default: 183
      },
      title: {
        type: String,
        default: null
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
      moreBar: {
        type: Boolean,
        default: false
      },
      showLegend: {
        type: Boolean,
        default: false
      },
      seriesCnNames: {
        type: String,
        default: null
      },
      seriesColors: {
        type: String,
        default: '#45F2FE'
      },
      labelColor: {
        type: String,
        default: '#45CCFE'
      },
      lastColors: {
        type: String,
        default: null
      },
      labelSize: {
        type: String,
        default: '14px'
      },
      labelRotate: {
        type: Number,
        default: 0
      },
      lastLabelColor: {
        type: String,
        default: null
      },
      isRate: {
        type: Boolean,
        default: false
      },
      barWidth: {
        type: Number,
        default: 16
      },
      isRadius: {
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
      yuce: {
        type: Boolean,
        default: false
      },
      yuceColor: {
        type: String,
        default: '#FFB83A'
      },
      axisxColor: {
        type: String,
        default: '#47A7FF'
      },
      axisfontColor: {
        type: String,
        default: '#98BBFF'
      },
      axisyColor: {
        type: String,
        default: '#98BBFF'
      },
      barVertical: {
        type: Boolean,
        default: true
      },
      xPostion: {
        type: String,
        default: '70%'
      },
      barGap: {
        type: String,
        default: '40%'
      },
      toPostion: {
        type: String,
        default: '35px'
      },
	  right: {
	    type: String,
	    default: '15px'
	  }
    },
    created() {
      this.chartHeight = this.title != null ? (this.height - 30) : this.height;
      if (this.showX && this.height > 100) {
        this.chartHeight = this.chartHeight - 20;
      }
      this.setSpecialColor();
    },
    mounted() {
      this.loadData();
    },
    beforeDestroy() {
      this.dataCategory = [];
      this.dataSource = [];
      if (this.objEcharts != null){
        this.objEcharts.dispose();
        this.objEcharts = null;
      }
    },
    methods: {
      parseDecimal(col_value, decimal_num) {
        if (null == decimal_num || decimal_num == undefined) {
          decimal_num = 0;
        }
        let res = Number(col_value.toFixed(decimal_num));
        try {
          let resArr = res.toString().split(".");
          if (resArr.length == 1 && decimal_num > 0) {
            res = res + ".";
            for (var i = 0; i < decimal_num; i++) {
              res = res + "0";
            }
          }
        } catch {

        }
        return res;
      },
      setSpecialColor() {
        if (this.lastColors != null && this.lastColors != '') {
          if (this.lastColors.indexOf("-") > 1) {
            this.specialColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.lastColors.split("-")[0]
              },
              {
                offset: 1,
                color: this.lastColors.split("-")[1]
              }
            ])
          } else {
            this.specialColor = this.lastColors;
          }
        }
      },
      loadData() {
        let _this = this;
        if (null != _this.data && undefined != _this.data && _this.data.length > 0) {
          let tmpDataCategory = [];
          let tmpDateAll = [];
          _this.data.forEach((item2, index2) => {
            if (null != item2) {
              let tmpDataItem = [];
              item2.forEach((item3, index3) => {
                if (null != item3) {
                  if (index2 === 0) {
                    tmpDataCategory.push(item3[_this.categoryName]);
                  }
                  if (_this.yuce && index3 == item2.length - 1 && index2 == _this.data.length - 1) {
                    let tmpValue = {
                      itemStyle: {
                        normal: {
                          color: 'transparent',
                          barBorderColor: _this.yuceColor,
                          barBorderWidth: 1,
                          barBorderRadius: 0,
                          borderType: 'dashed'
                        }
                      },
                      label: {
                        color: _this.yuceColor,
                        offset: [0, -20]
                      },
                      value: item3[_this.valueColName] != null ? _this.parseDecimal(item3[_this.valueColName], item3[_this.decimalColName]) : ''
                    };

                    tmpDataItem.push(tmpValue);
                  } else if (_this.specialColor != null && _this.specialColor != '' && (item2.length == index3 +
                      1) && (null == _this.realData || _this.realData.length <= 0 || null == _this.realData[
                      index2])) {
                    let tmpValue = {
                      itemStyle: {
                        color: _this.specialColor
                      },
                      value: item3[_this.valueColName] != null ? _this.parseDecimal(item3[_this.valueColName], item3[_this.decimalColName]) : ''
                    };
                    if (_this.lastLabelColor != null && _this.lastLabelColor != '') {
                      tmpValue.label = {
                        color: _this.lastLabelColor
                      }
                    }
                    tmpDataItem.push(tmpValue);
                  } else {
                    tmpDataItem.push(item3[_this.valueColName] != null ? _this.parseDecimal(item3[_this.valueColName], item3[_this.decimalColName]) : '');
                  }
                }
              });
              if (null != _this.realData && _this.realData.length > 0 && null != _this.realData[index2]) {
                if (index2 === 0) {
                  tmpDataCategory.push(_this.realData[index2][_this.categoryName]);
                }
                if (_this.specialColor != null && _this.specialColor != '') {
                  let tmpValue = {
                    itemStyle: {
                      color: _this.specialColor
                    },
                    value: (_this.realData[index2][_this.valueColName] != null ? _this.parseDecimal(_this.realData[index2][_this.valueColName], _this.realData[index2][_this.decimalColName]) : '')
                  };
                  if (_this.lastLabelColor != null && _this.lastLabelColor != '') {
                    tmpValue.label = {
                      color: _this.lastLabelColor
                    }
                  }
                  tmpDataItem.push(tmpValue);
                } else {
                  tmpDataItem.push(_this.realData[index2][_this.valueColName] != null ? _this.parseDecimal(_this.realData[index2][_this.valueColName], _this.realData[index2][_this.decimalColName]) : '');
                }
              }
              tmpDateAll.push(tmpDataItem);
            }
          });
          _this.dataCategory = tmpDataCategory;
          _this.dataSource = tmpDateAll;
          _this.loadChart();
        } else {
          this.loadChart();
        }
      },
      loadChart() {
        let _this = this;
        this.objEcharts = echarts.init(this.$refs[this.refName]);
        //console.log({title:_this.title, seriesCnNames: _this.seriesCnNames, series: _this.dataCategory, data: _this.dataSource});
        let option = {
          grid: {
            top: _this.toPostion,
            right: _this.right,
            bottom: '0',
            left: '15px',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            show: _this.showX,
            type: (_this.barVertical ? 'category' : 'value'),
            axisLabel: {
              show: _this.showX,
              interval: 0,
              rotate: _this.labelRotate,
              textStyle: {
                color: _this.axisfontColor
              }
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: _this.axisxColor,
                width: '1',
              }
            }
          }],
          yAxis: [{
            type: (_this.barVertical ? 'value':'category'),
            splitNumber: this.splitNumber,
            show: this.showY,
            position: 'left',
            axisLabel: {
              show: this.showY,
              textStyle: {
                color: _this.axisfontColor,
              },
              formatter: this.isRate ? '{value}%' : '{value}' + (this.tagSuffix != null ? this.tagSuffix : '')
            },
            axisLine: {
              show: this.showY,
              lineStyle: {
                type: 'solid',
                color: _this.axisyColor,
                width: '1'
              }
            },
            splitLine: {
              show: false
            },
            // max: function(val){
            // return val.max * 1.01;
            // },
            // min: function(val){
            // return val.min * 0.85;
            // }
          }],
          series: []
        };
        if (_this.barVertical) {
          option.xAxis[0].data = _this.dataCategory;
        } else {
          option.yAxis[0].data = _this.dataCategory;
        }
        let itemColor = _this.seriesColors.split(",");
        itemColor.forEach((item, index) => {
          if (itemColor[index].indexOf('-') > 1) {
            itemColor[index] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0.17,
                color: itemColor[index].split("-")[0]
              },
              {
                offset: 0.98,
                color: itemColor[index].split("-")[1]
              }
            ])
          }
        });
        //单柱子显示 并且不显示legend
        if (!_this.moreBar && null != _this.dataSource && _this.dataSource.length > 0) {
          _this.dataSource.forEach((item, index) => {
            option.series.push({
              type: 'bar',
              //showBackground: true,
              //stack: _this.stack,
              barWidth: _this.barWidth,
              itemStyle: {
                color: itemColor[index],
                barBorderRadius: _this.isRadius ? [_this.barWidth, _this.barWidth, 0, 0] : [0, 0, 0, 0]
              },
              label: {
                show: true,
                position: (_this.barVertical ? 'top':'right'),
                color: _this.labelColor,
                fontSize: _this.labelSize,
                fontFamily: 'PingFangSC-Semibold',
                formatter: _this.isRate ? '{@[1]}%' : '{@[1]}'
              },
              data: _this.dataSource[index]
            });
          });
        }
        //多柱子显示  并且显示legend
        if (_this.moreBar && null != _this.seriesCnNames && _this.seriesCnNames.split(",").length > 1) {
          if (_this.showLegend) {
            option.legend = {
              data: _this.seriesCnNames.split(","),
              x: _this.xPostion,
              y: 'top',
              right: '10px',
              itemWidth: 10, // 图例图形宽度
              itemHeight: 10, // 图例图形高度
              textStyle: {
                color: '#99BAFC'
              }
            };
          }

          if (null != _this.dataSource && _this.dataSource.length > 0) {
            _this.dataSource.forEach((item, index) => {
              option.series.push({
                type: 'bar',
                //showBackground: true,
                stack: _this.stack,
                barGap: _this.yuce ? '-100%' : _this.barGap,
                name: _this.seriesCnNames != null ? _this.seriesCnNames.split(",")[index] : '',
                barWidth: _this.barWidth,
                itemStyle: {
                  color: itemColor[index], //_this.seriesColors.split(",")[index],
                  barBorderRadius: _this.isRadius ? [_this.barWidth, _this.barWidth, 0, 0] : [0, 0, 0, 0]
                },
                label: {
                  show: true,
                  position: (_this.barVertical ? 'top':'right'),
                  color: _this.labelColor,
                  fontSize: _this.labelSize,
                  fontFamily: 'PingFangSC-Semibold',
                  formatter: (index == _this.dataSource.length - 1 && _this.yuce ? '预测：' : '') + (_this.isRate ? '{@[1]}%' : '{@[1]}')
                },
                data: _this.dataSource[index]
              });
            });
          }
        }
        //console.trace();
        this.objEcharts.setOption(option);
      }
    }
  };

</script>

<style lang="scss">

</style>
