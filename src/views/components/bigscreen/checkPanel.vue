<template>
  <div class="chooser">
    <ul class="chooser-list">
      <li v-for="(item, index) in options" :key="index"
      @click="optionsClick(item)"
      :class="{active: item.value == defaultvalue.value, disabled: item.disabled,enabled: !item.disabled && ptype==='dd'}"
      >{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'options',
    /*
    model: {
       prop: 'currValArr',
       event: 'change'//input
    },
    */
    data () {
      return {
         currValArr: []
      }
    },
    props: {
      ptype:{
        type:String,
        default:""
      },
      //currValArr: Array,
      options: Array, //传入的数组
      isMultiply: { //是否是多选。默认为false：单选；true：多选
        type: Boolean,
        default: false
      },
      defaultvalue:{
        type:Object,
        default:()=>{}
      }
    },
    methods: {
      optionsClick (item) {
        if(item.disabled){//disabled = true 为不能选择
          return;
        }
        if (this.isMultiply === false) { //单选
            this.$set(this.currValArr, 0, item) // 将该值设为当前数组的第一项
        } else { //多选
          if (this.currValArr.indexOf(item) === -1) {
            // 当前数组中没有该值则push到数组
            this.currValArr.push(item)
          } else {
            //当前数组中有该值，找到该值下标并删除
            this.currValArr.splice(this.currValArr.indexOf(item), 1)
          }
        }
        //console.log("this.currValArr",this.currValArr);
        this.$emit('changeVal', item,this.ptype);
      },
      checkActive (item) {
        //console.log("check******",this.currValArr);
        if (this.isMultiply === false) {
          this.currValArr.length = 1
        }
        return this.currValArr.indexOf(item) !== -1
      }
    }
}
</script>

<style lang="scss" scoped>
  .chooser{
    ul{width: 275px;}
    ul, li {
      margin: 0;
      padding:0;
      list-style: none;
    }
    .chooser {
      position: relative;
      display: inline-block;
    }
    .chooser-list li{
      margin: 5px;
      width: 80px;
      height: 30px;
      line-height: 30px;
      border-radius: 7px;
      display: inline-block;
      color: #fff;
      text-align: center;
      background: rgba(200,200,200,.65);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
    .chooser-list li.active {
      border-color: #ffffff;
      color: #ffffff;
      background: #55aaff;
      font-weight: bold;
      font-size: 15px;
    }
    .chooser-list li.disabled {
      color: #ccc;
      background: rgba(153,153,153,.8);
      cursor: not-allowed;
      background: transparent;
    }
    .chooser-list li.enabled {
      background-image: url('../../../assets/images/duigou.svg');
      background-repeat: no-repeat;
      background-position: 80% center;
    }
  }
</style>
