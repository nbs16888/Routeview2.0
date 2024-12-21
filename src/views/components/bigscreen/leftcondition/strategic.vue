<template>
  <div>
    <div style="position:absolute;width:27%;left:1%;top:24%;" class="tj_dialog" v-if="dialogVisable">
          <!-- <dv-border-box-13> -->
            <!-- 航行前规划 -->
            <div v-if="dia_type == 1">
              <el-row style="text-align: center;margin: 15px auto;">
                <span>Strategic planning</span>
                <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="cancelBefore">
                  <i class="el-dialog__close el-icon el-icon-close" style="font-size: 20px; font-weight: bold; color: #fff;"></i>
                </button>
              </el-row>
              <el-row class="input_row">
                <el-radio-group v-model="rangeType">
                  <el-radio-button label="1">History&nbsp;({{hisYearRange}})</el-radio-button>
                  <el-radio-button label="2">
                    Forecast&nbsp;(&ge;{{new Date().getFullYear()}})
                    <!-- <el-popover
                      placement="right"
                      title="DateTips"
                      width="350"
                      trigger="hover"
                      popper-class="shipinfo-pop"
                      content="shipinfos"
                      :close-delay="1000">
                        <el-row>
                          <div>
                            Initial voyage planning enables the determination of both the initiation and termination dates for subsequent transit voyages of non-ice-strengthened vessels through the Northern Sea Route, with a forecast period ranging from 1 to 6 months in advance.
                          </div>
                        </el-row>
                        <i class="el-icon-info" slot="reference" style="font-size: 18px;margin-left: 10px;"></i>
                    </el-popover> -->
                  </el-radio-button>
                </el-radio-group>
              </el-row>
              <div style="height: 40vh;overflow-y: auto;margin-top: .5em;" class="viewer_dialog">
                <!-- <el-row class="input_row">
                  DateBetween:
                  <el-radio-group v-model="tab_radio" size="mini" style="margin-left:1%;">
                    <el-radio-button label="0">10-30 days</el-radio-button>
                    <el-radio-button label="1">1-3 months</el-radio-button>
                    <el-radio-button label="2">3-6 months</el-radio-button>
                  </el-radio-group>
                </el-row> -->
                <el-row class="input_row select-style">
                  <span class="description">Ship type：</span>
                  <el-select v-model="cb_type" style="width: 60%;" :popper-append-to-body="true" :disabled="rangeType=='2'">
                    <el-option
                      v-for="item in cboptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </el-row>
                <el-row class="input_row">
                  <span class="description">Date：</span>
                  <!--<el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="beforestartdate" :picker-options = "rangepickerOptions"></el-date-picker>-->
                  <input type="text" readonly v-model="defaultDate" class="dayPicker" placeholder="Select a day" /><i class="el-icon-date" @click="toggleDatePicker" style="cursor: pointer;font-size: 17px;padding-left: 5px;" title="Select a day"></i>
                </el-row>
                <el-row class="input_row" v-show="rangeType==='1'">
                  <el-col :span="9">
                    <span class="description">Start Lng：</span><span style="height: 36px;line-height: 36px;display: inline-block;min-width: 50px;text-align: right;">{{hx_longitude1}},</span>
                  </el-col>
                  <el-col :span="9">
                    Lat：<span style="height: 36px;line-height: 36px;display: inline-block;min-width: 50px;text-align: right;">{{hx_latitude1}}</span>
                    <span class="ico ico_start" style="cursor: default;"></span>
                  </el-col>
                </el-row>
                <el-row class="input_row" v-show="rangeType==='2'">
                  <el-col :span="12">
                    <span class="description">Start Lng：</span><el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_longitude1" style="width: 50%;"></el-input>
                  </el-col>
                  <el-col :span="12">
                    Lat：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_latitude1" style="width: 50%;"></el-input>
                    <div @click="getStartPoint" style="float:right;cursor: pointer;line-height: 35px;" title="Click map to marker a start point">
                      <span class="ico ico_start"></span>
                      <span class="ico ico_click" data-v-step="1"></span>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="input_row" v-show="rangeType==='1'">
                  <el-col :span="9">
                    <span class="description">End&nbsp;&nbsp;Lng：</span><span style="height: 36px;line-height: 36px;display: inline-block;min-width: 50px;text-align: right;">{{hx_longitude2}},</span>
                  </el-col>
                  <el-col :span="9">
                    Lat：<span style="height: 36px;line-height: 36px;display: inline-block;min-width: 50px;text-align: right;">{{hx_latitude2}}</span>
                    <span class="ico ico_end" style="cursor: default;"></span>
                  </el-col>
                </el-row>
                <el-row class="input_row" v-show="rangeType==='2'">
                  <el-col :span="12">
                    <span class="description">End&nbsp;&nbsp;Lng：</span><el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_longitude2" style="width: 50%;"></el-input>
                  </el-col>
                  <el-col :span="12">
                    Lat：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_latitude2" style="width: 50%;"></el-input>
                    <div @click="getEndPoint" style="float:right;cursor: pointer;line-height: 35px;" title="Click map to marker a end point">
                      <span class="ico ico_end"></span>
                      <span class="ico ico_click" data-v-step="2"></span>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="input_row select-style">
                  <span class="description">Rules：</span>
                  <el-select v-model="gh_rule" style="width: 60%;" :popper-append-to-body="true" placeholder="Please Select">
                    <el-option value="1"> Shortest path</el-option>
                    <el-option value="2"> Minimum time</el-option>
                    <el-option value="3"> Minimum energy</el-option>
                    <el-option value="4"> Minimum risk</el-option>
                  </el-select>
                </el-row>
                <el-row class="input_row select-style" v-show="rangeType==='2'">
                  <span class="description">Container load：</span>
                  <el-select v-model="zx_type" style="width: 60%;" :popper-append-to-body="true">
                    <el-option
                      v-for="item in zxoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </el-row>
                <el-row class="input_row select-style" v-show="rangeType==='2'">
                  <span class="description">Fuel：</span>
                  <el-select v-model="rl_type" style="width: 60%;" :popper-append-to-body="true">
                    <el-option
                      v-for="item in rloptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </el-row>
                <el-row class="input_row select-style" v-show="rangeType==='2'">
                  <span class="description">Ice zone：</span>
                  <span>{{ice_area}}</span>
                  <!-- <el-select v-model="bq_type" style="width: 60%;" :popper-append-to-body="true">
                    <el-option
                      v-for="item in bqoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled">
                    </el-option>
                  </el-select> -->
                </el-row>
                <el-row class="input_row select-style" v-show="rangeType==='2'">
                  <span class="description">Carbon tax：</span>
                  <el-select v-model="ts_type" style="width: 60%;" :popper-append-to-body="true">
                    <el-option
                      v-for="item in tsoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </el-row>
                <el-row class="input_row select-style">
                  <span class="description">Conditions：</span>
                  <ul class="conds_checked">
                    <li v-for="item in treeChecked">{{item}}</li>
                  </ul>
                </el-row>
                <el-row class="input_row select-style" v-show="rangeType==='2'">
                  <el-link type="primary" @click="toggleDataTree">More Navigation environment</el-link>
                </el-row>
                <el-row class="input_row" v-show="rangeType==='2'" style="text-align: right;position: absolute;right: 2em;bottom: .5em;">
                  <el-button @click="cancelBefore" round>Cancel</el-button>
                  <el-button type="success" @click="routebeforeSubmit" round id="submit_btn">Submit</el-button>
                </el-row>
              </div>
              <div class="dlg_footer">
                <slot name="footer">
                    <!-- <el-button @click="dialogVisable = false;dataVisible = false;dataVisibleLegend = false;navPeriodVisible = false;dialogVisableys = false;" >Cancel</el-button>
                    <el-button @click="routebeforeSubmit" >Submit</el-button> -->
                </slot>
              </div>
            </div>
            <!-- 港口分析 -->
            <div v-if="dia_type == 2">
              <div style="height: auto;" class="viewer_dialog">
                <el-row class="input_row">
                  <el-col :span="12">
                    Ship Lng：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_longitude1" style="width: 50%;"></el-input>
                  </el-col>
                  <el-col :span="12">
                    Lat：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_latitude1" style="width: 50%;"></el-input>
                    <i class="el-icon-position" @click="getStartPoint">Point</i>
                  </el-col>
                </el-row>
                <el-row class="input_row">
                  <el-col :span="12">
                    Port Lng：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_longitude2" style="width: 50%;"></el-input>
                  </el-col>
                  <el-col :span="12">
                    Lat：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_latitude2" style="width: 50%;"></el-input>
                    <i class="el-icon-position" @click="getEndPoint">Point</i>
                  </el-col>
                </el-row>

                <el-row class="input_row select-style">
                  <el-col :span="12">
                    Rules：<el-select v-model="gh_rule" style="width: 60%;" :popper-append-to-body="false">
                      <el-option value="1">Shortest path</el-option>
                      <el-option value="2">Minimum time</el-option>
                      <el-option value="3">Minimum energy</el-option>
                      <el-option value="4">Minimum risk</el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="success" icon="el-icon-check" round>Analysis</el-button>
                      <el-button icon="el-icon-delete" round>Reset</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-table
                      :data="tableData"
                      style="width: 90%;margin: 0 auto;">
                      <el-table-column
                        prop="distance"
                        label="distance(km)">
                      </el-table-column>
                      <el-table-column
                        prop="costtime"
                        label="costtime"
                        width="100">
                      </el-table-column>
                      <el-table-column
                        prop="cost"
                        label="Fule(L/km)"
                        width="120">
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="operation"
                        width="100">
                        <template slot-scope="scope">
                          <el-button @click="handleClick(scope.row)" type="text" size="small">View</el-button>
                          <el-button @click="handleClick(scope.row)" type="text" size="small">choose</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                </el-row>
              </div>
            </div>
          <!-- </dv-border-box-13> -->
    </div>
    <v-tour name="myTour" :steps="steps"></v-tour>
  </div>
</template>

<script>
  import historyRange from '@/utils/bigscreen/history_range.js';
export default {
  data () {
    return {
      options: {},
      gh_rule:"",
      tableData:[],
      showDatePicker:false,
      showDataTree:false,
      routeingstartdate:undefined,
      cboptions:[{label:"General merchant ship",value:"1"},{label:"Ice breaker",value:"2",disabled:false}],
      rangeType:"1",
      cb_type:"1",
      zx_type:"4000TEU",
      rl_type:"LNG",
      bq_type:"ICE_1",
      ts_type:"FAX_0",
      zxoptions:[{label:"4000TEU",value:"4000TEU"},{label:"10000TEU",value:"10000TEU"},{label:"16000TEU",value:"16000TEU"}],
      rloptions:[{label:"LNG",value:"LNG"},{label:"HFO",value:"HFO"},{label:"MDO",value:"MDO"}],
      bqoptions:[{label:"1",value:"ICE_1"},{label:"4",value:"ICE_4"},{label:"7",value:"ICE_7"}],
      tsoptions:[{label:"0%",value:"FAX_0"},{label:"50%",value:"FAX_50"},{label:"100%",value:"FAX_100"}],
      steps: [
        {
          target: '[data-v-step="1"]',  // We're using document.querySelector() under the hood
          content: `Step(1/3):Click here and click map to marker a start point.`
        },
        {
          target: '[data-v-step="2"]',  // We're using document.querySelector() under the hood
          content: `Step(2/3):Click here and click map to marker a end point.`
        },
        {
          target: '#submit_btn',
          content: 'Step(3/3):Click the submit button to calculate the route and related data.',
          params: {
              placement: 'top'
          }
        }
      ]
    };
  },
  components: {

  },
  computed:{
    hisYearRange:function(){
      return Object.keys(historyRange)[0]+" - "+Object.keys(historyRange).pop();
    }
  },
  mounted() {
  },
  props: {
    dia_type:{
      type: Number,
      default: 0
    },
    dia_title: {
      type: String,
      required: true,
      default: "chartRate"
    },
    dialogVisable:{
      type:Boolean,
      default: false
    },
    beforestartdate: {
      type: String,
      default: ""
    },
    hx_longitude1: {
      type: Number,
      default: 0
    },
    hx_latitude1: {
      type: Number,
      default: 0
    },
    hx_longitude2: {
      type: Number,
      default: 0
    },
    hx_latitude2: {
      type: Number,
      default: 0
    },
    conditions: {
      type: Array,
      default:[]
    },
    treeChecked: {
      type: Array,
      default:[]
    },
    defaultDate: {
      type: String,
      default:undefined
    },
    ice_area: {
      type: String,
      default: "--"
    }
  },
  watch: {
    "rangeType":function(nv,ov){
      this.cb_type = "1";
      this.zx_type = "4000TEU";
      this.rl_type = "LNG";
      this.bq_type = "ICE_1";
      this.ts_type = "FAX_0";
      if(nv=="1"){
        this.cboptions[1].disabled = false;
        this.$emit('changeYear',{name:Object.keys(historyRange)[0],value:+Object.keys(historyRange)[0]});
        this.$tours['myTour'].stop();
      } else if (nv=="2"){
        this.cboptions[1].disabled = true;
        const year = new Date().getFullYear();
        this.$emit('changeYear',{name:year,value:year});
        this.$emit('emptyLngLat');
        this.$tours['myTour'].start();
      }
    },
    "cb_type":function(nv,ov){
      this.$emit('changeCb',nv);
    },
    "zx_type":function(nv,ov){
      this.$emit('changeZx',nv);
    },
    "rl_type":function(nv,ov){
      this.$emit('changeRl',nv);
    },
    "bq_type":function(nv,ov){
      this.$emit('changeBq',nv);
    },
    "ts_type":function(nv,ov){
      this.$emit('changeTs',nv);
    }
  },
  methods: {
    routebeforeSubmit(){
      this.$emit("routebeforeSubmit",false);
    },
    cancelBefore(){
      this.$emit('update:dialogVisable',false);
      this.$emit("cancelInitPlan");
    },
    getStartPoint(){
      this.$emit("getStartPoint",{});
    },
    getEndPoint(){
      this.$emit("getEndPoint",{});
    },
    toggleDatePicker(){
      this.$emit("toggleDatePicker",!this.showDatePicker);
    },
    toggleDataTree(){
      this.$emit("toggleDataTree",!this.showDataTree);
    },
  },
};
</script>

<style lang="scss" scoped>
  .tj_dialog{
        //background-color: #081c32;
        background-color: transparent;
        color: #FFFFFF;
        //background-image: url('../../assets/images/panel.png');
        background: rgba(0,0,0,0.3) url('../../../../assets/images/panel1.png') no-repeat;
        background-size: 100%  100%;

        .input_row:first-child{
          //padding: 20px 20px 0px 20px;
        }
        //n 从0 开始
        .input_row:nth-child(n+1){
          padding: 20px 20px 0px 20px;
        }
      }

      /** 修改select下拉框的样式 */
      ::v-deep .el-popper[x-placement^="bottom"] {
        background-color: #0a4680;
        border-color: #00d1ff;
      }

      ::v-deep .el-select-dropdown__item {
        color: #fff;
      }

      ::v-deep .el-select-dropdown__item:hover,
      .el-select-dropdown__item.hover {
        color: #fff;
        background-color: #0b53979a;
      }

      ::v-deep .el-popper[x-placement^="bottom"] .popper__arrow::after {
        border-bottom-color: #0a4680 !important;
      }

      ::v-deep .el-popper[x-placement^="bottom"] .popper__arrow {
        border-bottom-color: #00d1ff;
      }

      ::v-deep .el-select-dropdown__item.selected {
        color: #78ddec;
        background-color: #135ea3;
      }

      .select-style{
        white-space:pre;
      }
      .select-style ::v-deep .el-select-dropdown {
        position: absolute !important;
      }
      .select-style ::v-deep .el-icon-arrow-up:before {
        content: "";
        width: 10px;
        height: 10px;
        //background: url("/images/demonstration/room-create-img/select-click.png") center no-repeat;
        background-size: 100% 100%;
        transform: rotate(0deg);
      }
      .select-style ::v-deep .el-select .el-input__inner {
        //border: none;
        //background: url("/images/demonstration/common-img/input-notCheck.png") no-repeat;
        background-size: 100% 100%;
        color: #e0ecf5;
      }

       // 树形最外层样式
      ::v-deep .el-tree {
        background: transparent;
        color: #fff;
      }
      // 设置三角图标颜色
      ::v-deep .el-tree-node__expand-icon {
        color: #fff;
      }
      // 鼠标悬浮图标颜色
      ::v-deep .el-tree-node__content:hover .el-tree-node__expand-icon {
        color: #fff;
      }
      ::v-deep .el-tree-node__content:hover .el-tree-node__expand-icon .is-leaf {
        color: transparent;
      }
      // 鼠标悬浮节点样式
      ::v-deep .el-tree-node__content:hover {
        background: rgba(0,0,0,0);
        color: #fff;
      }
      // 节点点击样式
      ::v-deep .el-tree-node:focus > .el-tree-node__content .el-tree-node__expand-icon {
        color: #fff;
      }
      ::v-deep .el-tree-node:focus > .el-tree-node__content {
        background: rgba(0,0,0,0);
        color: #fff !important;
      }
      .dayPicker {background-color: transparent;border: none;color:#fff;}
      .dayPicker::placeholder {color:#fff;}
      .ico {
        background-position: left center;
        background-size: 19px;
        background-repeat: no-repeat;
        padding-left:16px;
        cursor: pointer;
        margin-left:5px;
      }
      .ico_start{background-image: url('../../../../assets/images/startpoint_green.png');}
      .ico_end {background-image: url('../../../../assets/images/endpoint.png');}
      .ico_click {background-image: url('../../../../assets/images/clickhere.png');margin-left:0;}
      .viewer_dialog span.description {min-width:95px;width:auto;display: inline-block;text-align: right;}
      ::v-deep .conds_checked {list-style-type: none;}
      ::v-deep .conds_checked li {line-height: 2;}
      ::v-deep .conds_checked li::before {content: "√"; padding-right: 5px; color: green;font-weight: bold;}
</style>
