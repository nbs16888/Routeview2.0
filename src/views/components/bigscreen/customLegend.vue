<template>
  <div class="legend">
    <!--
    <el-row>
      <div class="legend-name"><span>{{legendName}}</span></div>
    </el-row>
     <div v-for="item in legendItems" :key="item.title" class="legend-item">
      <span class="legend-color" :style="{ background: item.color }"></span>
      <span class="legend-title">{{ legendtype == 'route'?displayLabel(item.title):item.title }}</span>
    </div> -->
    <div style="display: flex;margin: 20px auto;">
      <div class="legend-name"><span>{{legendName}}</span></div>
      <div v-for="(item,index) in legendItems" :key="item.title">
          <div class="colbox">
            <div class="itemname">{{ index%2 == 0?item.title:""}}</div>
            <div class="itemvalue" :style="{ background: item.color }"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'likeLegend',
  props: {
    legendtype:{
      type:String,
      default:""
    },
    legendName:{
      type:String,
      default:""
    },
    legendItems: {
      type: Array,
      default: () => [
        { title: '1.1', color: '#FF0000' },
        { title: '2.2', color: '#00FF00' },
        { title: '3.3', color: '#0000FF' },
        { title: '1.1', color: '#FF0000' },
        { title: '2.2', color: '#00FF00' },
        { title: '3.3', color: '#0000FF' }
      ]
    }
  },
  methods:{
    displayLabel(k){
      switch (k) {
        case "0":
        case "14":
        case "30":
        case "-26":
        case "-50":
          return k;
        default:
          return " ";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.legend {
  //width: 120px;
  font-size: 12px;
  color: #333;
  z-index: 1;
  .legend-name{
    text-align: left;
    color: #fff;
    font-size: 15px;
    line-height: 28px;
    margin-right: 5px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    margin-left: 5px;
    margin-bottom: -2px;
    height: 15px;
    line-height: 15px;
  }

  .legend-color {
    display: block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    border-radius: 2px;
  }

  .legend-title {
    margin-right: 10px;
    color: #fff;
    font-size: 12px;
  }

  //new Legend
  .itemname{
    text-align: center;
    width: 25px;
    height: 15px;
    font-size: 11px;
    color: #fff;
  }
  .itemvalue{
    width: 25px;
    height: 12px;
  }
}


</style>
