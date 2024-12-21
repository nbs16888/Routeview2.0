<template>
  <dv-full-screen-container>
      <div id="index">
        <div>
            <avue-crud :data="data" :option="option" v-model="obj" ></avue-crud>
        </div>

          <el-dialog title="通航环境" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisableys" :show-close="true" width="15%" style="left:-24%;top:17%;" class="ys_dialog">
              <div>

              </div>
          </el-dialog>
      </div>

  </dv-full-screen-container>
</template>

<script>

export default {
  name:"Avue Crud",
  data() {
    return {
      dialogVisableys:false,
      obj:{},
              data: [
                {
                  name:'张三',
                  sex:'男',
                  date:'1994-02-23 00:00:00'
                }, {
                  name:'李四',
                  sex:'女',
                  date:'1994-02-23 00:00:00'
                }, {
                  name:'王五',
                  sex:'女',
                  date:'1994-02-23 00:00:00'
                }, {
                  name:'赵六',
                  sex:'男',
                  date:'1994-02-23 00:00:00'
                }
              ],
              option:{
                "title": "积分日报（不含追朔）",
                "titleSize": "h5",
                "exportBtn": true,
                header:false,
                "card": true,
                "page": false,
                "border": true,
                "index": true,
                "indexLabel": "序号",
                "menuAlign": "center",
                "menuWidth": 150,
                "align": "center",
                "refreshBtn": false,
                "columnBtn": false,
                "searchShowBtn": false,
                "showClomnuBtn": false,
                "searchIndex": 3,
                "searchIcon": true,
                "searchMenuSpan": 4,
                "searchSize": "mini",
                "maxHeight": 560,
                "emptyBtn": false,
                "addBtn": false,
                "editBtn": false,
                "viewBtn": false,
                "delBtn": false,
                "menu": false,
                "props": {
                  "label": "label",
                  "value": "value"
                },
                column:[
                   {
                    label:'姓名',
                    prop:'name'
                  },
                  {
                    label:'性别',
                    prop:'sex'
                  },{
                    label: "日期",
                    prop: "date",
                    type: "date",
                    format: "yyyy-MM-dd hh:mm:ss",
                    valueFormat: "yyyy-MM-dd hh:mm:ss",
                  }
                ]
              }
    }
  },
  components: {

  },
  created() {
    console.log();
  },
  mounted() {

  },
  beforeDestroy () {

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .avue-crud .el-card {
      border: 1px solid #214fa1!important;
      background: transparent!important;
  }
   .avue-crud .el-card__body {
      background-color: #040f34!important;
  }
// 表格样式
		.el-table .cell {
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: #C6D5EB;
			letter-spacing: 0px;
			text-align: center;
			line-height: 17px;
		}

		.el-card {
			background-color: transparent;
		}

		.el-card .avue-crud__menu {
			background-color: transparent;
		}

		.el-card .el-table {
			background-color: transparent;
			border-color: #214fa1;
			border-bottom-color: #214fa1;
			border-right-color: #214fa1;
		}

		.el-card .el-table::after,
		.el-card .el-table::before {
			background-color: #214fa1;
		}

		.el-card .el-table .el-table__fixed::after,
		.el-card .el-table .el-table__fixed::before {
			background-color: #214fa1;
		}

		.el-card .el-table__header tr {
			background-color: #040f34;
			color: #FFFFFF;
		}

		.el-card .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
			background-color: rgba(6, 150, 255, 0.3);
		}

		.el-card .el-table th {
			background-color: rgba(61, 158, 254, 0.18);
			color: #D6E4FF;
			font-size: 14px;
			border-color: #214fa1;
			border-bottom: 1px solid rgba(71, 167, 255, 0.5);
			height: 28px;
		}

		.el-card .el-table th div.cell {
			color: rgba(214, 218, 255, 0.75);
		}

		.el-card .el-table tr,
		.el-card .el-table td {
			background-color: transparent;
			color: #FFFFFF;
			border-color: #214fa1;
		}

		.el-table tr.hover-row {
			background-color: rgba(255, 255, 255, 0.1);
			color: #FFFFFF;
		}

		.el-table td {
			background: none;
			color: #FFFFFF;
		}

		.el-card .el-collapse-item__wrap {
			background-color: transparent;
			border-bottom: none;
		}

		.el-card .el-collapse {
			border-top: none;
			border-bottom: none;
		}

		.el-card .el-form-item__label {
			color: #FFFFFF;
		}

		.avue-crud__search label span {
			color: #FFFFFF;
		}

		.avue-crud__search .el-radio-button__inner {
			background-color: #010745;
			color: #FFFFFF;
			border-color: #15327E;
		}

		.avue-crud__search .el-radio-button__orig-radio:checked+.el-radio-button__inner {
			background-color: #409EFF;
			box-shadow: 0 0 0 0 #409eff;
		}

		.el-loading-mask {
			background-color: rgba(0, 0, 0, 0.2);
		}

		.avue-crud h2,
		.avue-crud h3 {
			color: #FFFFFF;
			background: transparent;
		}

		.avue-crud .el-input--mini input,
		.avue-form .el-input--mini input {
			background-color: #010745;
			color: #FFFFFF;
			border-color: #15327E;
		}

		.avue-crud__menu .avue-crud__left span {
			background-color: #010745;
			color: #FFFFFF;
			border: none;
		}

		.avue-crud__menu .avue-crud__right button {
			background-color: #010745;
			color: #FFFFFF;
			border-color: #15327E;
		}

		.coral_report {
			::v-deep .avue-empty__desc {
				color: #FFFFFF;
			}
		}

		.el-table--scrollable-x .el-table__body-wrapper {
			overflow-x: hidden;
		}

		.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
			background-color: rgba(255, 255, 255, 0.1);
		}

		.el-table__body tr.hover-row>td.el-table__cell {
			background-color: rgba(255, 255, 255, 0.1);
		}
</style>
