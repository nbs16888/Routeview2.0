<template>
  <dv-full-screen-container>
      <div id="index">
        <div class="bg">
          <dv-loading v-if="loading">Loading...</dv-loading>
          <div v-else class="host-body" style="height: calc(~'100% - 10px');">
            <div class="d-flex jc-center">
                <div><img src="@/assets/images/left_logo.png" width="40px" ></div>
              <dv-decoration-10 class="dv-dec-10" />
              <div class="d-flex jc-center">
                <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
                <div class="title">
                  <div>
                    <span class="title-text">北极冰区航线智能规划系统</span>
                  </div>
                  <dv-decoration-6
                    class="dv-dec-6"
                    :reverse="true"
                    :color="['#50e3c2', '#67a1e5']"
                  />
                </div>
                <dv-decoration-8
                  class="dv-dec-8"
                  :reverse="true"
                  :color="decorationColor"
                />
              </div>
              <dv-decoration-10 class="dv-dec-10-s" />
            </div>

            <!-- 第二行 -->
            <div class="d-flex jc-between px-2">
              <div class="d-flex aside-width">


                <!-- <div class="react-left ml-3">
                  <span class="text" @mouseover="showDialog = true;" style="cursor: pointer;"><dv-decoration-7 style="width:130px;height:40px;">航线智算</dv-decoration-7></span>
                </div>
                <div class="menu_dialog_hx" v-if="showDialog" @mouseover="showDialog = true;" @mouseleave="cb_hide">
                  <dv-border-box-12>
                    <ul class="menu_ul">
                      <li @click="dialogVisable = true;dialogVisableys = false;dia_type = 1;dia_title='航线规划';refreshkey=new Date().getTime();">航线规划</li>
                      <li @click="dialogVisable = true;dialogVisableys = true;dia_type = 1;dia_title='航线规划';refreshkey=new Date().getTime();">多因素规划</li>
                    </ul>
                  </dv-border-box-12>
                </div> -->
                <div class="react-left ml-3">
                  <span class="text" @mouseover="showDialog = true;" style="cursor: pointer;">航线规划</span>
                </div>
                <div class="menu_dialog_hxgh" v-if="showDialog" @mouseover="showDialog = true;" @mouseleave="cb_hide">
                  <dv-border-box-12>
                    <ul class="menu_ul">
                      <li @click="dialogVisable = true;dialogVisableys = false;dia_type = 1;dia_title='航线前规划';refreshkey=new Date().getTime();">航行前规划</li>
                      <li @click="dialogVisable = true;dialogVisableys = false;dia_type = 3;dia_title='航行中规划';refreshkey=new Date().getTime();">航行中规划</li>
                    </ul>
                  </dv-border-box-12>
                </div>
                <div class="react-left ml-3">
                  <span class="text" @mouseover="showDialog = true;" style="cursor: pointer;">港口决策</span>
                </div>
                <div class="menu_dialog_gk" v-if="showDialog" @mouseover="showDialog = true;" @mouseleave="cb_hide">
                  <dv-border-box-12>
                    <ul class="menu_ul">
                      <li>港口可视化</li>
                      <li @click="dialogVisable = true;dia_type = 2;dia_title='港口可达性分析';refreshkey=new Date().getTime();">港口可达分析</li>
                    </ul>
                  </dv-border-box-12>
                </div>

                <div class="react-left ml-3">
                  <span class="text" @mouseover="showDialog = true;" style="cursor: pointer;">适航评估</span>
                </div>
                <div class="menu_dialog_sh" v-if="showDialog" @mouseover="showDialog = true;" @mouseleave="cb_hide">
                  <dv-border-box-12>
                    <ul class="menu_ul">
                      <li @click="dialogVisableHxdb=true;refreshkey=new Date().getTime();">航线对比</li>
                      <li @click="addImageProvider">适行分析</li>
                      <li>历史航线</li>
                    </ul>
                  </dv-border-box-12>
                </div>
                <div class="react-left ml-3">
                  <span class="text" @mouseover="showDialog = true;" style="cursor: pointer;">
                    <!-- 海冰运动短临预报 -->Nowcasting of sea ice motion
                  </span>
                </div>
              </div>
              <div class="d-flex aside-width">
                <div class="react-right bg-color-blue mr-3">
                  <span class="text fw-b">海冰漂移分析</span>
                </div>
                <div class="react-right bg-color-blue mr-3">
                  <span class="text fw-b">未来通航期</span>
                </div>
                <div class="react-right bg-color-blue mr-3">
                  <span class="text fw-b">通航能力变化</span>
                </div>
                <div class="react-right mr-4 react-l-s">
                  <span class="react-after"></span>
                  <span class="text"
                    >{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span
                  >
                </div>
              </div>
            </div>
              <div class="body-box" ref="cesiumContainer" style="background:transparent;">
                    <vc-viewer class="viewer" @ready="ready" :camera="camera"
                      :full = "true"
                      :animation = "false"
                      :timeline = "false"
                      :sceneModePicker = "false"
                      :baseLayerPicker = "false"
                      :geocoder = "false"
                      :scene3DOnly = "true"
                      :navigationHelpButton = "false"
                      :homeButton = "false"
                      :infoBox = "false"
                      :showRenderLoopErrors = "false"
                      :skyBox = "false"
                      :fullscreenButton = "false"
                      :selectionIndicator = "false"
                      :orderIndependentTranslucency = "false"
                      :contextOptions = "{webgl:{alpha:true}}"
                    >
                      <vc-navigation></vc-navigation>
                      <vc-layer-imagery :alpha="1" :brightness="1" :contrast="1">
                        <vc-provider-imagery-bingmaps
                        :url="url"
                        :bm-key="bmKey"
                        map-style="Aerial"
                        ></vc-provider-imagery-bingmaps>
                      </vc-layer-imagery>
                    </vc-viewer>
              </div>
              <!-- 温度变化 -->
              <div style="position: absolute;top: 10%;left: 78%;height: 250px; width: 410px;text-align: center;">
                <dv-border-box-10>
                  <el-row style="height: 20px;line-height: 40px;font-size: 15px;text-align: left;">
                    <span style="padding-left: 20px;">当前航线冰密集度变化</span>
                  </el-row>
                  <div style="text-align: center;">
                    <line3DChart id="line3DChart"/>
                  </div>
                  <!-- <lineChart  :height="200" :showY="false" style="width: 100%;" :key="refreshkey+'1'" categoryName="acct_day"
                        seriesColors="#407DFE" :showLabel="false" :lineSmooth="true" :lineAreaStyle="true"
                        v-if="mjddata.length" :data="[mjddata]" title_size="16px" :hasTitle="false"/> -->
                </dv-border-box-10>
              </div>
              <!-- 温度变化 -->
              <div style="position: absolute;top: 35%;left: 78%;height: 200px; width: 410px;text-align: center;">
                <dv-border-box-10>
                  <el-row style="height: 20px;line-height: 40px;font-size: 15px;text-align: left;">
                    <span style="padding-left: 20px;">温度(℃)变化预测</span>
                  </el-row>
                  <lineChart  :height="190" :showY="false" style="width: 100%;" :key="refreshkey+'1'" categoryName="acct_day"
                        seriesColors="#407DFE" :showLabel="false" :lineSmooth="true" :lineAreaStyle="true"
                        v-if="tempdata.length" :data="[tempdata]" title_size="16px" :hasTitle="false"/>
                </dv-border-box-10>
              </div>
              <!-- 日历通航时期 -->
              <div style="position: absolute;top: 65%;left: 39%;height: 220px; width: 60%;text-align: center;" ref="calendarRef">
                <dv-border-box-10>
                  <el-row style="height: 20px;line-height: 40px;font-size: 15px;text-align: left;">
                    <span style="padding-left: 20px;">通航时期</span>
                  </el-row>
                  <calendarChart id="channel_calendar" :tips="60" :colorObj="colorData"/>
                </dv-border-box-10>
              </div>
          </div>
        </div>
      </div>

          <el-dialog :title="dia_title" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisable" :show-close="true" :destroy-on-close="true" width="15%" style="left:-69%;top:17%;" class="tj_dialog" :key="refreshkey">
                <dv-border-box-13>
                  <!-- 航行规划 -->
                  <div v-if="dia_type == 1">
                    <div style="height: 550px;overflow-y: auto;" class="viewer_dialog">
                      <el-row class="input_row">
                        开始时间：<el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="startdate"></el-date-picker>
                      </el-row>
                      <el-row class="input_row">
                        <el-col :span="12">
                          始：经度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_longitude1" style="width: 50%;"></el-input>
                        </el-col>
                        <el-col :span="12">
                          维度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_latitude1" style="width: 50%;"></el-input>
                          <i class="el-icon-position" @click="getStartPoint">点选</i>
                        </el-col>
                      </el-row>
                      <el-row class="input_row">
                        <el-col :span="12">
                          终：经度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_longitude2" style="width: 50%;"></el-input>
                        </el-col>
                        <el-col :span="12">
                          维度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_latitude2" style="width: 50%;"></el-input>
                          <i class="el-icon-position" @click="getEndPoint">点选</i>
                        </el-col>
                      </el-row>
                      <el-row class="input_row select-style">
                          船舶类型：<el-select v-model="cb_type" style="width: 60%;" :popper-append-to-body="false">

                                <el-option
                                  v-for="item in cboptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                  :disabled="item.disabled">
                                </el-option>
                              </el-select>
                          </el-select>
                      </el-row>
                      <el-row class="input_row select-style">
                          <span v-html="'装&nbsp;箱&nbsp;量&nbsp;：'"/><el-select v-model="zx_type" style="width: 60%;" :popper-append-to-body="false">
                            <el-option
                              v-for="item in zxoptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              :disabled="item.disabled">
                            </el-option>
                          </el-select>
                      </el-row>
                      <el-row class="input_row select-style">
                          <span v-html="'燃&emsp;&emsp;料：'"></span><el-select v-model="rl_type" style="width: 60%;" :popper-append-to-body="false">
                            <el-option
                              v-for="item in rloptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              :disabled="item.disabled">
                            </el-option>
                          </el-select>
                      </el-row>
                      <el-row class="input_row select-style">
                          <span v-html="'冰&emsp;&emsp;区：'"/><el-select v-model="bq_type" style="width: 60%;" :popper-append-to-body="false">
                            <el-option
                              v-for="item in bqoptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              :disabled="item.disabled">
                            </el-option>
                          </el-select>
                      </el-row>
                      <el-row class="input_row select-style">
                          <span v-html="'碳&emsp;&emsp;税：'"/><el-select v-model="ts_type" style="width: 60%;" :popper-append-to-body="false">
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
                          规划规则：<el-select v-model="gh_rule" style="width: 60%;" :popper-append-to-body="false">
                            <el-option value="1">最短路径</el-option>
                            <el-option value="2">最短时间</el-option>
                            <el-option value="3">最低能耗</el-option>
                            <el-option value="4">最低风险</el-option>
                            <el-option value="5">自定因素</el-option>
                          </el-select>
                      </el-row>
                      <el-row class="input_row" style="text-align: right;cursor: pointer;">
                        <span class="el-icon-s-unfold" @click="dialogVisableys = true;">通航环境</span>
                      </el-row>
                    </div>
                    <div class="dlg_footer">
                      <slot name="footer">
                          <el-button @click="dialogVisable = false" >取 消</el-button>
                          <el-button @click="dialogVisable = false" >确 定</el-button>
                      </slot>
                    </div>
                  </div>
                  <!-- 港口分析 -->
                  <div v-if="dia_type == 2">
                    <div style="height: auto;" class="viewer_dialog">
                      <el-row class="input_row">
                        <el-col :span="12">
                          船舶：经度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_longitude1" style="width: 50%;"></el-input>
                        </el-col>
                        <el-col :span="12">
                          维度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_latitude1" style="width: 50%;"></el-input>
                          <i class="el-icon-position" @click="getStartPoint">点选</i>
                        </el-col>
                      </el-row>
                      <el-row class="input_row">
                        <el-col :span="12">
                          港口：经度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_longitude2" style="width: 50%;"></el-input>
                        </el-col>
                        <el-col :span="12">
                          维度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_latitude2" style="width: 50%;"></el-input>
                          <i class="el-icon-position" @click="getEndPoint">点选</i>
                        </el-col>
                      </el-row>

                      <el-row class="input_row select-style">
                        <el-col :span="12">
                          规划规则：<el-select  v-model="gh_rule"  style="width: 60%;" :popper-append-to-body="false">
                            <el-option value="1">最短路径</el-option>
                            <el-option value="2">最短时间</el-option>
                            <el-option value="3">最低能耗</el-option>
                            <el-option value="4">最低风险</el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="12">
                          <el-button type="success" icon="el-icon-check" round>分析</el-button>
                            <el-button icon="el-icon-delete" round>重置</el-button>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-table
                            :data="tableData"
                            style="width: 90%;margin: 0 auto;">
                            <el-table-column
                              prop="distance"
                              label="距离(km)">
                            </el-table-column>
                            <el-table-column
                              prop="costtime"
                              label="耗时"
                              width="100">
                            </el-table-column>
                            <el-table-column
                              prop="cost"
                              label="油耗(L/km)"
                              width="120">
                            </el-table-column>

                            <el-table-column
                              fixed="right"
                              label="操作"
                              width="100">
                              <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="handleClick(scope.row)" type="text" size="small">选择</el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                      </el-row>
                    </div>
                  </div>

                  <!-- 航行中规划 -->
                  <div v-if="dia_type == 3">
                    <div style="height: 550px;overflow-y: auto;" class="viewer_dialog">
                            <el-row class="input_row">
                              开始时间：<el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="startdate"></el-date-picker>
                            </el-row>
                            <el-row class="input_row">
                              <el-col :span="12">
                                始：经度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_longitude1" style="width: 50%;"></el-input>
                              </el-col>
                              <el-col :span="12">
                                维度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_latitude1" style="width: 50%;"></el-input>
                                <i class="el-icon-position" @click="getStartPoint">点选</i>
                              </el-col>
                            </el-row>

                            <!-- 经过的经纬度start -->
                            <el-form ref="form" :model="form">
                              <div v-for="(item, index) in form.channel_arr" :key="index" class="label">
                                  <el-row>
                                    <el-col :span="10">
                                      <el-form-item label="经度:" :prop="'lng.' + index + '.lng'"
                                      :rules="{required: true, message: '请输入', trigger: 'blur'}" class="middleInput">
                                        <el-input v-model.trim="item.lng" maxlength="30" placeholder="请输入" style="width:60%;"></el-input>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="14">
                                      <el-form-item label="维度:" :prop="'lat.' + index + '.lat'" :rules="{ required: true, message: '请输入', trigger: 'blur' }"
                                      class="middleInput">
                                        <el-input maxlength="100" :rows="3" v-model.trim="item.lat" placeholder="请输入" style="width:60%;"></el-input>
                                        <i class="el-icon-circle-plus-outline icon" v-if="(index === (form.channel_arr.length - 1))" @click.prevent="addKey(item)" style="font-size: 20px;transform: translateY(5px);"></i>
                                        <i class="el-icon-remove-outline icon" v-if="(form.channel_arr.length > 1)" @click.prevent="removeKey(item, index)" style="font-size: 20px;transform: translateY(5px);"></i>
                                      </el-form-item>
                                      </el-col>
                                   </el-row>
                                  </div>
                              </el-form>
                            <!-- 经过的经纬度end -->


                            <el-row class="input_row">
                              <el-col :span="12">
                                终：经度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_longitude2" style="width: 50%;"></el-input>
                              </el-col>
                              <el-col :span="12">
                                维度：<el-input placeholder="请输入" prefix-icon="el-icon-position" v-model="hx_latitude2" style="width: 50%;"></el-input>
                                <i class="el-icon-position" @click="getEndPoint">点选</i>
                              </el-col>
                            </el-row>
                            <el-row class="input_row select-style">
                                船舶类型：<el-select v-model="cb_type" style="width: 60%;" :popper-append-to-body="false">

                                      <el-option
                                        v-for="item in cboptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                      </el-option>
                                    </el-select>
                                </el-select>
                            </el-row>
                            <el-row class="input_row select-style">
                                <span v-html="'装&nbsp;箱&nbsp;量&nbsp;：'"/><el-select v-model="zx_type" style="width: 60%;" :popper-append-to-body="false">
                                  <el-option
                                    v-for="item in zxoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                  </el-option>
                                </el-select>
                            </el-row>
                            <el-row class="input_row select-style">
                                <span v-html="'燃&emsp;&emsp;料：'"></span><el-select v-model="rl_type" style="width: 60%;" :popper-append-to-body="false">
                                  <el-option
                                    v-for="item in rloptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                  </el-option>
                                </el-select>
                            </el-row>
                            <el-row class="input_row select-style">
                                <span v-html="'冰&emsp;&emsp;区：'"/><el-select v-model="bq_type" style="width: 60%;" :popper-append-to-body="false">
                                  <el-option
                                    v-for="item in bqoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                  </el-option>
                                </el-select>
                            </el-row>
                            <el-row class="input_row select-style">
                                <span v-html="'碳&emsp;&emsp;税：'"/><el-select v-model="ts_type" style="width: 60%;" :popper-append-to-body="false">
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
                                规划规则：<el-select v-model="gh_rule" style="width: 60%;" :popper-append-to-body="false">
                                  <el-option value="1">最短路径</el-option>
                                  <el-option value="2">最短时间</el-option>
                                  <el-option value="3">最低能耗</el-option>
                                  <el-option value="4">最低风险</el-option>
                                  <el-option value="5">自定因素</el-option>
                                </el-select>
                            </el-row>
                            <el-row class="input_row" style="text-align: right;cursor: pointer;">
                              <span class="el-icon-s-unfold" @click="dialogVisableys = true;">通航环境</span>
                            </el-row>
                          </div>
                          <div class="dlg_footer">
                            <slot name="footer">
                                <el-button @click="dialogVisable = false" >取 消</el-button>
                                <el-button @click="dialogVisable = false" >确 定</el-button>
                            </slot>
                          </div>
                    </div>
                  </div>

                  <!-- 航线对比 -->
                  <div v-if="dia_type == 4">
                    <div style="height: 520px;" class="viewer_dialog">
                      <el-row class="input_row select-style">
                        航线选择：
                        <el-select v-model="hx_arr" multiple placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-row>
                        <div style="text-align: center;margin: 0 auto;">
                          <radarChart
                          :id="Math.random()+''"
                          :tips="60"
                          :colorObj="colorData"/>
                        </div>
                    </div>
                  </div>
                </dv-border-box-13>
          </el-dialog>
          <el-dialog title="通航环境" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisableys" :show-close="true" width="15%" style="left:-24%;top:17%;" class="ys_dialog">
              <div>
                  <el-tree
                    :data="data"
                    :props="props"
                    node-key="id"
                    default-expand-all
                    show-checkbox>
                  </el-tree>

              </div>
          </el-dialog>

          <el-dialog title="航线列表" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisableHxdb" :show-close="true" width="50%" style="left:0%;top:17%;" class="hxdb_dialog">
              <div>
                      <avue-crud :data="data" :option="option" v-model="obj" >
                        <template slot="menu" slot-scope="scope">
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-view"
                            @click="viewhx(scope.row)">查看
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-edit"
                            @click="comparehx(scope.row)">对比
                          </el-button>
                        </template>
                      </avue-crud>
              </div>
          </el-dialog>
          <el-dialog title="航线视图" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisableHxview" :show-close="true" width="50%" style="left:0%;top:17%;" class="hxview_dialog">
              <div>
                <el-row style="text-align: center;"><span style="font-size: 16px;color: #fff;">航线名称：</span><span style="font-size: 20px;color: #f00;font-weight: bold;">{{hxviewobj.name}}</span></el-row>
                   <el-row>
                     <el-col :span="12">
                       <radarChart
                         :id="Math.random()+''"
                         :tips="60"
                         :colorObj="colorData"
                       />
                     </el-col>

                     <el-col :span="12">
                        <ul class="hbview_detail">
                          <li><el-row><el-col :span="12"><span>距离：</span></el-col><el-col :span="12"><span>{{hxviewobj.jl}}</span></el-col></el-row></li>
                          <li><el-row><el-col :span="12"><span>海冰密集度：</span></el-col><el-col :span="12"><span>{{hxviewobj.hbmjd}}</span></el-col></el-row></li>
                          <li><el-row><el-col :span="12"><span>海冰厚度：</span></el-col><el-col :span="12"><span>{{hxviewobj.hbhd}}</span></el-col></el-row></li>
                          <li><el-row><el-col :span="12"><span>水深：</span></el-col><el-col :span="12"><span>{{hxviewobj.ss}}</span></el-col></el-row></li>
                          <li><el-row><el-col :span="12"><span>风险值：</span></el-col><el-col :span="12"><span>{{hxviewobj.fxz}}</span></el-col></el-row></li>
                          <li><el-row><el-col :span="12"><span>能耗：</span></el-col><el-col :span="12"><span>{{hxviewobj.nh}}</span></el-col></el-row></li>
                        </ul>
                     </el-col>
                   </el-row>

              </div>
          </el-dialog>


  </dv-full-screen-container>
</template>

<script>
import autoResize from '@jiaminghi/data-view/lib/mixin/autoResize.js';
import { formatTime } from '@/utils/bigscreen/index.js';
import radarChart from '@/views/components/bigscreen/radarEcharts';
import calendarChart from '@/views/components/bigscreen/calendarEcharts';
import lineChart from '@/views/components/bigscreen/lineEcharts';
import line3DChart from '@/views/components/bigscreen/line3DEcharts';
export default {
  mixins: [ autoResize ],
  data() {
    return {
      Cesium:null,
      viewer: null,
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      decorationColor: ['#568aea', '#000000'],
      width:'100%',
      height:'100%',

      start:null,
      stop:null,
      property:null,

      animation: false,
      timeline: false,
      camera: {
        position: {
          lng: 180.1,
          lat: 90.1,
          height: 13000000
        },
        heading: 360,
        pitch: -90,
        roll: 0
      },
      url: 'https://dev.virtualearth.net',
      bmKey: 'Ahv1KDJwbpJl4V8zklaRXcoueWXoNLo16osJiU4Zk07vc-VNNzJ0gB81TZyPqNFz', // 可到(https://www.bingmapsportal.com/)申请Key。
      mapStyle: 'Aerial',
      showDialog: true,
      refreshkey:0,
      dialogVisable: false,
      dia_type:0,
      cb_longitude:"",
      cb_latitude:"",
      dia_title:"",

      hx_longitude1:"",
      hx_latitude1:"",
      hx_longitude2:"",
      hx_latitude2:"",

      cb_longitude1:"",
      cb_latitude1:"",
      cb_longitude2:"",
      cb_latitude2:"",

      props: {
        label: 'label',
        children: 'children'
      },
      dialogVisableys: false,
      dialogVisableHxdb: false,
      dialogVisableHxview: false,
      data: [{
            id: 1,
            label: '海冰参数',
            children: [
              {
                id: 11,
                label: '海冰厚度'
              },
              {
                id: 12,
                label: '海冰漂移'
              },
              {
                id: 12,
                label: '海冰密集度'
              },
            ]
          }, {
            id: 2,
            label: '气象参数',
            children: [{
              id: 21,
              label: '风速'
            }, {
              id: 22,
              label: '温度'
            }, {
              id: 24,
              label: '能见度'
            }]
          }, {
            id: 3,
            label: '雾',
            children: [{
              id: 7,
              label: '大雾'
            }]
          }, {
            id: 4,
            label: '浪高',
            children: [{
              id: 41,
              label: '浪高'
            }]
          }, {
            id: 4,
            label: '水深',
            children: [{
              id: 41,
              label: '水深'
            }]
          }],
              defaultProps: {
                children: 'children',
                label: 'label'
              },
              tableData: [{
                  costtime: '1天10时',
                  distance: '521',
                  cost: '50'
                },{
                  costtime: '1天10时',
                  distance: '521',
                  cost: '50'
                },{
                  costtime: '1天10时',
                  distance: '521',
                  cost: '50'
                },{
                  costtime: '1天10时',
                  distance: '521',
                  cost: '50'
                }],
              form:{
                channel_arr:[{lng:"95.222",lat:"36.221"},{lng:"",lat:""},{lng:"",lat:""}]
              },
               gh_rule:"",
               gh_model:"",
               water_len:0,
               nh_type:"",

               hx_arr:[],
               options: [{
                 value: '选项1',
                 label: '航线1'
               }, {
                 value: '选项2',
                 label: '航线2'
               }, {
                 value: '选项3',
                 label: '航线3'
               }, {
                 value: '选项4',
                 label: '航线4'
               }, {
                 value: '选项5',
                 label: '航线5'
               }],
                colorData: {
                  textStyle: '#3fc0fb',
                  series: {
                    color: ['#00bcd44a', 'transparent'],
                    dataColor: {
                      normal: '#03a9f4',
                      shadowColor: '#97e2f5'
                    }
                  }
               },
               tempdata:[
                 {
                 	"col_value": 23.89,
                 	"acct_day": "12日",
                 	"decimal_num": 2
                 },
                 {
                 	"col_value": 24.09,
                 	"acct_day": "13日",
                 	"decimal_num": 2
                 },
                 {
                 	"col_value": 21.09,
                 	"acct_day": "14日",
                 	"decimal_num": 2
                 },
                 {
                 	"col_value": 23.30,
                 	"acct_day": "15日",
                 	"decimal_num": 2
                 },{
                 	"col_value": 21.30,
                 	"acct_day": "16日",
                 	"decimal_num": 2
                 },{
                 	"col_value": 22.30,
                 	"acct_day": "17日",
                 	"decimal_num": 2
                 },{
                 	"col_value": 25.30,
                 	"acct_day": "18日",
                 	"decimal_num": 2
                 },
                 {
                 	"col_value": 23.30,
                 	"acct_day": "19日",
                 	"decimal_num": 2
                 },{
                 	"col_value": 21.30,
                 	"acct_day": "20日",
                 	"decimal_num": 2
                 },{
                 	"col_value": 22.30,
                 	"acct_day": "21日",
                 	"decimal_num": 2
                 }
               ],
               mjddata:[
                 {
                 	"col_value": 28.89,
                 	"acct_day": "02日",
                 	"decimal_num": 2
                 },
                 {
                 	"col_value": 21.09,
                 	"acct_day": "03日",
                 	"decimal_num": 2
                 },
                 {
                 	"col_value": 31.09,
                 	"acct_day": "04日",
                 	"decimal_num": 2
                 },
                 {
                 	"col_value": 23.30,
                 	"acct_day": "05日",
                 	"decimal_num": 2
                 },{
                 	"col_value": 21.30,
                 	"acct_day": "06日",
                 	"decimal_num": 2
                 },{
                 	"col_value": 22.30,
                 	"acct_day": "07日",
                 	"decimal_num": 2
                 },{
                 	"col_value": 25.30,
                 	"acct_day": "08日",
                 	"decimal_num": 2
                 },
                 {
                 	"col_value": 22.30,
                 	"acct_day": "09日",
                 	"decimal_num": 2
                 },{
                 	"col_value": 25.30,
                 	"acct_day": "10日",
                 	"decimal_num": 2
                 },{
                 	"col_value": 26.30,
                 	"acct_day": "11日",
                 	"decimal_num": 2
                 }
               ],
               startdate:"2024-02-02",
               cboptions:[{label:"普通商船",value:"1"},{label:"破冰船",value:"2",disabled:true}],
               zxoptions:[{label:"4000TEU",value:"4000"},{label:"10000TEU",value:"10000"},{label:"16000TEU",value:"16000"}],
               rloptions:[{label:"LNG",value:"1"},{label:"HFO",value:"2"},{label:"MDO",value:"3"}],
               bqoptions:[{label:"1",value:"1"},{label:"4",value:"4"},{label:"7",value:"7"}],
               tsoptions:[{label:"0%",value:"0"},{label:"50%",value:"0.5"},{label:"100%",value:"1"}],
               cb_type:"1",
               zx_type:"4000",
               rl_type:"1",
               bq_type:"1",
               ts_type:"0",
               obj:{},
                       data: [
                         {
                           name:'航线一',
                           jl:'10500',
                           hbmjd:'23.5%',
                           hbhd:'15',
                           ss:'5000',
                           fxz:'0.85',
                           nh:'55kw',
                           date:'2023-07-22'
                         },
                         {
                           name:'航线二',
                           jl:'1090',
                           hbmjd:'20.5%',
                           hbhd:'22',
                           ss:'8000',
                           fxz:'0.85',
                           nh:'105kw',
                           date:'2023-07-28'
                         },
                         {
                           name:'航线三',
                           jl:'10500',
                           hbmjd:'23.5%',
                           hbhd:'15',
                           ss:'5000',
                           fxz:'0.85',
                           nh:'55kw',
                           date:'2023-08-02'
                         },
                         {
                           name:'航线五',
                           jl:'10500',
                           hbmjd:'23.5%',
                           hbhd:'15',
                           ss:'5000',
                           fxz:'0.85',
                           nh:'55kw',
                           date:'2023-08-06'
                         },
                         {
                           name:'北极新航线',
                           jl:'10500',
                           hbmjd:'23.5%',
                           hbhd:'15',
                           ss:'5000',
                           fxz:'0.85',
                           nh:'55kw',
                           date:'2023-08-12'
                         },

                       ],
                       option:{
                         "title": "",
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
                         "menu": true,
                         "props": {
                           "label": "label",
                           "value": "value"
                         },
                         column:[
                           {
                             label: "开始日期",
                             prop: "date",
                             type: "date",
                             format: "yyyy-MM-dd",
                             valueFormat: "yyyy-MM-dd",
                           },
                            {
                             label:'航线名称',
                             prop:'name'
                           },{
                             label:'距离',
                             prop:'jl'
                           },
                           {
                             label:'海冰密集度',
                             prop:'hbmjd'
                           },{
                             label:'海冰厚度',
                             prop:'hbhd'
                           },{
                             label:'水深',
                             prop:'ss'
                           },{
                             label:'风险值',
                             prop:'fxz'
                           },{
                             label:'能耗',
                             prop:'nh'
                           }
                         ]
                       },
                       hxviewobj:{}

    }
  },
  components: {
    radarChart,
    calendarChart,
    lineChart,
    line3DChart
  },
  created() {
    console.log();
  },
  mounted() {
    this.timeFn();
    this.cancelLoading();
  },
  beforeDestroy () {
    clearInterval(this.timing)
    },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
        async ready(cesiumInstance) {
                const { Cesium, viewer } = cesiumInstance;

                this.Cesium = Cesium;
                this.viewer = viewer;
                viewer.imageryLayers.removeAll();
                //设置默认视角
                Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
                    // 西边的经度
                  89.5,
                  // 南边维度
                  20.4,
                  // 东边经度
                  110.4,
                  // 北边维度
                  61.2
                );
                //隐藏logo
                viewer.cesiumWidget.creditContainer.style.display = "none";
                /*
                viewer.scene.skyBox.show = false; //去掉天空盒子
                viewer.scene.backgroundColor = new Cesium.Color(0, 0, 0, 0); //设置场景背景色透明，便于显示自定的背景
                viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0); //修改地邱球体背景透明
                viewer.scene.imageryLayers.removeAll();//去除其他图层
                viewer.scene.globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0);
                */

                Cesium.Math.setRandomNumberSeed(0);

                    var promise =Cesium.GeoJsonDataSource.load('geojson/china.json',{
                        stroke: Cesium.Color.WHITE,
                        fill: Cesium.Color.BLUE.withAlpha(0.3), //注意：颜色必须大写，即不能为blue
                        strokeWidth: 5
                    });

                    promise.then(function (dataSource) {

                        viewer.dataSources.add(dataSource);

                        var entities =dataSource.entities.values;

                        var colorHash = {};

                        for (var i = 0; i < entities.length;i++) {

                            var entity = entities[i];

                            var name = entity.name;

                            var color = colorHash[name];

                            if (!color) {

                                color =Cesium.Color.fromRandom({

                                    alpha: 1.0

                                });

                                colorHash[name] = color;

                            }

                            entity.polygon.material = color;

                            entity.polygon.outline = false;

                           entity.polygon.extrudedHeight =5000.0;

                        }

                    });

                    viewer.flyTo(promise);


              },
              cb_hide(){
                setTimeout(()=>{
                  this.showDialog = false;
                },500);
              },
              location_auto(){
                  this.viewer.entities.add({
                      id: new Date().getTime(),
                      position: this.Cesium.Cartesian3.fromDegrees(104.06, 30.67, 100),
                      billboard: new this.Cesium.BillboardGraphics({
                        image: 'https://zouyaoji.top/vue-cesium/favicon.png',
                        scale: 0.2
                      }),
                      label: new this.Cesium.LabelGraphics({
                        text: '当前船舶位置',
                        fillColor: this.Cesium.Color.GOLD,
                        font: '24px sans-serif',
                        horizontalOrigin: 1,
                        outlineColor: new this.Cesium.Color(0, 0, 0, 1),
                        outlineWidth: 2,
                        pixelOffset: new this.Cesium.Cartesian2(17, 0),
                        style: this.Cesium.LabelStyle.FILL
                      })
                });
                 this.viewer.camera.flyTo({
                    destination: this.Cesium.Cartesian3.fromDegrees(104.06, 30.67, 5000000),
                    orientation: {
                      heading: this.Cesium.Math.toRadians(0), // east, default value is 0.0 (north) //东西南北朝向
                      pitch: this.Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
                      roll: 0.0 // default value
                    },
                    duration: 3 //3秒到达战场
                  })
              },
              linetrace(){

                let data = [
                        { longitude: 71.8, latitude: 72.923, height: 0, time: 0 },
                        { longitude: 26.8, latitude: 72.932, height: 0, time: 30 },
                        { longitude: -2.623, latitude: 63.782, height: 70000, time: 60 },
                        { longitude: -44.623, latitude: 56.782, height: 70000, time: 110 },
                        { longitude: -16.23, latitude: 53.221, height: 0, time: 120 },
                        { longitude: -18.23, latitude: 32.221, height: 0, time: 120 }];
                    this.start = this.Cesium.JulianDate.fromDate(new Date());
                    console.log("**********",this.start);
                    // 结束时间
                    this.stop = this.Cesium.JulianDate.addSeconds(this.start, 120, new Cesium.JulianDate());
                    let property = this.createProperty(data);
                    this.viewer.entities.add({
                      // 和时间轴关联
                        availability : new this.Cesium.TimeIntervalCollection([new this.Cesium.TimeInterval({
                            start: this.start,
                            stop: this.stop
                        })]),
                        id : 'move'+this.start,
                        position : property,
                        // 根据所提供的位置计算模型的朝向
                        orientation : new this.Cesium.VelocityOrientationProperty(property),
                        // 模型
                        model : {
                            uri : '../../assets/bigscreen/Cesium_Air.glb',
                            minimumPixelSize: 100
                        },
                        path : {
                            resolution: 1,
                            material: new this.Cesium.PolylineArrowMaterialProperty(this.Cesium.Color.YELLOW),
                            //material: new PolylineGlowMaterialProperty({glowPower: 0.1, color: Color.YELLOW}),
                            // leadTime、trailTime 不设置 path全显示
                            //leadTime:0,// 设置为0时 模型通过后显示path
                            //trailTime: 0,// 设置为0时 模型通过后隐藏path
                            width: 10
                        }
                    });

              },
              /**
               * 计算飞行路径
               * @param source 数据坐标
               * @returns {SampledPositionProperty|*}
               */
              createProperty(source) {
                  // 取样位置 相当于一个集合
                  let property = new this.Cesium.SampledPositionProperty();
                  for (let i = 0; i < source.length; i++) {
                      let time = this.Cesium.JulianDate.addSeconds(this.start, source[i].time, new this.Cesium.JulianDate);
                      let position = this.Cesium.Cartesian3.fromDegrees(source[i].longitude, source[i].latitude, source[i].height);
                      // 添加位置，和时间对应
                      property.addSample(time, position);
                  }
                  return property;
              },
              handleClick(row) {
                console.log(row);
                this.hx_longitude2 = 36.55482;
                this.hx_latitude2 = 103.55482;
              },
              //增加问题与建议
              addKey (item) {
                this.form.channel_arr.push({
                  name: '',
                  value: ''
                })
              },
              removeKey (item, index) {
                if(this.form.channel_arr.length == 1){
                  this.$message.warning("必须保留一行条件...");
                  return;
                }
                this.form.channel_arr.splice(index, 1)
              },
              getStartPoint(){

                this.viewer.entities.removeById("hx_start_point");

                //下面是核心代码

                    let flag = 1; //节流阀
                    //创建一个屏幕控制实例，获取viewer下scene下所有canvas实例
                    let handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
                    let _this = this;
                    //添加一个setInputAction监听事件，他可以监听点击，移动事件
                    handler.setInputAction(function (movement) {

                      let ray = _this.viewer.camera.getPickRay(movement.position);
                      let cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene);
                      let cartographic = _this.Cesium.Cartographic.fromCartesian(cartesian);
                      let lng = _this.Cesium.Math.toDegrees(cartographic.longitude);//经度
                      let lat = _this.Cesium.Math.toDegrees(cartographic.latitude);// 纬度
                      let height = cartographic.height;//高度
                      console.log('经度:',lng,'纬度:',lat,'高度:',height);

                      _this.hx_longitude1 = lng;
                      _this.hx_latitude1 = lat;



                      //let pick = viewer.scene.pick(movement.position)
                    //这时候就可以用了
                      if (flag <= 1) {
                        flag++; //本次我只需要两个点 所以设了节流阀，放开就可以多次画点
                        let poly = _this.viewer.entities.add({  //添加实体
                        id:'hx_start_point',
                          position: new _this.Cesium.Cartesian3.fromDegrees(lng, lat, 0), //添加实体的位置信息
                          point: { //添加点
                            pixelSize: 25, //添加点的大小

                            color: _this.Cesium.Color.fromCssColorString('#ee0000'),
                            // 边框颜色
                            outlineColor: _this.Cesium.Color.fromCssColorString('#fff'),
                            // 边框宽度(像素)
                            outlineWidth: 2
                          },
                        });
                      }
                      //_this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(_this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
                    setTimeout(() => {
                        handler.removeInputAction(_this.Cesium.ScreenSpaceEventType.LEFT_CLICK)
                    }, 500)
                      //当前的事件为点击事件
                    }, _this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
              },
              getEndPoint(){

                this.viewer.entities.removeById("hx_end_point");
                //下面是核心代码

                    let flag = 1; //节流阀
                    //创建一个屏幕控制实例，获取viewer下scene下所有canvas实例
                    let handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
                    let _this = this;
                    //添加一个setInputAction监听事件，他可以监听点击，移动事件
                    handler.setInputAction(function (movement) {

                      let ray = _this.viewer.camera.getPickRay(movement.position);
                      let cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene);
                      let cartographic = _this.Cesium.Cartographic.fromCartesian(cartesian);
                      let lng = _this.Cesium.Math.toDegrees(cartographic.longitude);//经度
                      let lat = _this.Cesium.Math.toDegrees(cartographic.latitude);// 纬度
                      let height = cartographic.height;//高度
                      console.log('经度:',lng,'纬度:',lat,'高度:',height);

                      _this.hx_longitude2 = lng;
                      _this.hx_latitude2 = lat;



                      //let pick = viewer.scene.pick(movement.position)
                    //这时候就可以用了
                      if (flag <= 1) {
                        flag++; //本次我只需要两个点 所以设了节流阀，放开就可以多次画点
                        let poly = _this.viewer.entities.add({  //添加实体
                        id:'hx_end_point',
                          position: new _this.Cesium.Cartesian3.fromDegrees(lng, lat, 0), //添加实体的位置信息
                          point: { //添加点
                            pixelSize: 25, //添加点的大小
                            color: _this.Cesium.Color.fromCssColorString('#ff8200'),
                            // 边框颜色
                            outlineColor: _this.Cesium.Color.fromCssColorString('#fff'),
                            // 边框宽度(像素)
                            outlineWidth: 2
                          },
                        });
                      }
                      //_this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(_this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
                    setTimeout(() => {
                        handler.removeInputAction(_this.Cesium.ScreenSpaceEventType.LEFT_CLICK)
                    }, 500)
                      //当前的事件为点击事件
                    }, _this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
              },
              viewhx(row){
                  this.hxviewobj = row;
                  this.dialogVisableHxview = true;
              },
              comparehx(row){

              },
              addImageProvider(){
                // 图片的URL
                var layers = this.viewer.scene.imageryLayers;

                layers.addImageryProvider(new this.Cesium.SingleTileImageryProvider({

                    url : 'geojson/imagery/cloudMap.png',

                    rectangle : this.Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75)

                }));
              }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/bigscreen/scss/index.scss';
@import '@/assets/bigscreen/scss/style.scss';
#index{
  .title-logo{
    background: url('../../assets/images/left_logo.png') no-repeat;
  }
  .viewer,.body-box{background-image:url('../../assets/bigscreen/pageBg.png');}

  .menu_dialog_cb{
    position: absolute;
    top: 100px;
    width:140px;
    height:auto;
    transform: translateX(28px);
    z-index: 9999;
    background-color: #0f1325;
    border-radius: 12px;
  }
  .menu_dialog_hx{
    position: absolute;
    top: 100px;
    width:140px;
    height:auto;
    transform: translateX(179px);
    z-index: 9999;
    background-color: #0f1325;
    border-radius: 12px;
  }
  .menu_dialog_gk{
    position: absolute;
    top: 100px;
    width:140px;
    height:auto;
    transform: translateX(215px);
    z-index: 9999;
    background-color: #0f1325;
    border-radius: 12px;
  }
  .menu_dialog_hxgh{
    position: absolute;
    top: 100px;
    width:140px;
    height:auto;
    transform: translateX(28px);
    z-index: 9999;
    background-color: #0f1325;
    border-radius: 12px;
  }
  .menu_dialog_sh{
    position: absolute;
    top: 100px;
    width:140px;
    height:auto;
    transform: translateX(405px);
    z-index: 9999;
    background-color: #0f1325;
    border-radius: 12px;
  }

  .menu_ul{
    li{
      //padding: 15px 12px 3px 12px;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
      padding: 10px 0px 0px 0px;
      cursor: pointer;
    }

    li:last-child{
      padding: 10px 0px 10px 0px;
    }

    /* 核心代码 */
    li:hover {
        color: #01c2ff;
        background-image: url('data:image/png;base64,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');
        background-size: 100% 100%;
        background-position: 0 0%;
        color:#fff;
        transition: background .3s ease;
    }
  }
}

      ::v-deep .tj_dialog .el-dialog,
          .el-pager li {
            background-color: #081c32;
            color: #FFFFFF;
            background-image: url('../../assets/images/dialog_bg1.png');
            background-size: 100%  100%;
          }
      ::v-deep .ys_dialog .el-dialog,
          .el-pager li {
            background-color: #081c32;
            color: #FFFFFF;
            background-image: url('../../assets/images/dialog_bg3.png');
            background-size: 100%  100%;
          }
          ::v-deep .hxdb_dialog .el-dialog,
          .el-pager li {
            background-color: #0d1f66;
            color: #FFFFFF;
            //background-image: url('../../assets/images/dialog_bg3.png');
            background-size: 100%  100%;
            border-radius: 20px;
            opacity: 0.85;
          }
          ::v-deep .hxview_dialog .el-dialog {
            background-color: #0d1f66;
            color: #FFFFFF;
            //background-image: url('../../assets/images/dialog_bg3.png');
            background-size: 100%  100%;
            border-radius: 20px;
            opacity: 0.85;
          }
    ::v-deep .el-dialog{
      pointer-events:auto;
      .el-dialog__title{
        color: #fff!important;
      }

      //将el-dialog__header、el-dialog__body、el-dialog__footer背景设置为透明
        .el-dialog__header {
          padding-top: 10px !important;
          background-color:rgb(255,255,255,0);
          border-radius: 14px 14px  0  0 ;
          text-align: center;
        }
        .el-dialog__body {
          border-top: 0 !important;
          background-color: rgba(19, 31, 59, 0);
          color: #FFFFFF;
        }
        .el-dialog__footer{
          text-align: center;
          background-color: rgba(255,255,255,0);
        }

      .input_row:first-child{
        padding: 40px 20px 0px 20px;
      }
      //n 从0 开始
      .input_row:nth-child(n+2){
        padding: 20px 20px 0px 20px;
      }
    }
    //背景色设置为透明
    :deep(.el-input__wrapper){
      background-color:rgba(0,0,0,0);
    }

    //输入框颜色
    ::v-deep .el-input__inner  {
      background-color: rgba(0, 0, 0, 0) !important;
        color: #fff;
        border: 1px solid #33484b;
    }

    //历史记录后自动补充的颜色
    ::v-deep input:-webkit-autofill {
      -webkit-text-fill-color: #fff;
      transition: background-color 5000s ease-out 0.5s;
    }

    //提示框的字体颜色
    ::v-deep input::-webkit-input-placeholder {
      color: #fff;
    }

    ::v-deep .dlg_footer {
      text-align: right;
      height:40px;
      margin: 10px;
      .el-button{
          background: transparent;
          margin: 3px 10px;
          border-radius: 10px;
          color: #01c2ff;
          border-color: #1890ff;
          text-shadow: 0 -1px 0 rgba(0, 0, 0, .12);
          box-shadow: 0 2px 0 rgba(0, 0, 0, .045);
          padding: 8px 15px;
      }
    }

    .el-dialog__wrapper{
        pointer-events:none;
        ::v-deep .el-dialog{
          pointer-events:auto;
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


    //表格
    		  ::v-deep .el-table,
              .el-table__expanded-cell {
                font-size: 14px;
                background-color: transparent;
              }

              ::v-deep .el-table tr {
                background-color: transparent !important;
              }
              ::v-deep .el-table__body td,::v-deep .el-table__header th,
              .el-table .cell {
                background-color: transparent;
              }
              ::v-deep .el-table::before {
                //去除底部白线
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0px;
              }
              //th的样式
               ::v-deep .el-table__header th {
              font-weight: bold;
              font-size: 16px;
        }
        ::v-deep .el-table--enable-row-hover,::v-deep .el-table__body tr:hover > td
               {background-color:transparent;}

        ::v-deep .el-table .el-table__fixed-right tbody tr:hover td {
          //右边固定
          background-color: transparent;
        }

        ::v-deep .el-form .el-textarea__inner{
          background-color:transparent;
        }

        ::v-deep .el-dialog .el-dialog__body{
          padding: 20px!important;
        }

        .textarea-row{
          padding: 20px;
        }

        .el-form-item{
          padding: 10px;
        }

        ::v-deep .avue-crud .el-card {
            border: 1px solid #214fa1!important;
            background: transparent!important;
        }
         ::v-deep .avue-crud .el-card__body {
            background-color: #040f34!important;
        }
      // 表格样式
          ::v-deep .el-table .cell {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #C6D5EB;
            letter-spacing: 0px;
            text-align: center;
            line-height: 17px;
          }

          ::v-deep .el-card {
            background-color: transparent;
          }

         ::v-deep  .el-card .avue-crud__menu {
            background-color: transparent;
          }

          ::v-deep .el-card .el-table {
            background-color: transparent;
            border-color: #214fa1;
            border-bottom-color: #214fa1;
            border-right-color: #214fa1;
          }

          ::v-deep .el-card .el-table::after,
          ::v-deep .el-card .el-table::before {
            background-color: #214fa1;
          }

          ::v-deep .el-card .el-table ::v-deep .el-table__fixed::after,
          ::v-deep .el-card .el-table .el-table__fixed::before {
            background-color: #214fa1;
          }

          ::v-deep .el-card .el-table__header tr {
            background-color: #040f34;
            color: #FFFFFF;
          }

          ::v-deep .el-card .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
            background-color: rgba(6, 150, 255, 0.3);
          }

          ::v-deep .el-card .el-table th {
            background-color: rgba(61, 158, 254, 0.18);
            color: #D6E4FF;
            font-size: 14px;
            border-color: #214fa1;
            border-bottom: 1px solid rgba(71, 167, 255, 0.5);
            height: 28px;
          }

          ::v-deep .el-card .el-table th div.cell {
            color: rgba(214, 218, 255, 0.75);
          }

          ::v-deep .el-card .el-table tr,
          ::v-deep .el-card .el-table td {
            background-color: transparent;
            color: #FFFFFF;
            border-color: #214fa1;
          }

          ::v-deep .el-table tr.hover-row {
            background-color: rgba(255, 255, 255, 0.1);
            color: #FFFFFF;
          }

          ::v-deep .el-table td {
            background: none;
            color: #FFFFFF;
          }

          ::v-deep .el-card .el-collapse-item__wrap {
            background-color: transparent;
            border-bottom: none;
          }

          ::v-deep .el-card .el-collapse {
            border-top: none;
            border-bottom: none;
          }

          ::v-deep .el-card .el-form-item__label {
            color: #FFFFFF;
          }

          ::v-deep .avue-crud__search label span {
            color: #FFFFFF;
          }

          ::v-deep .avue-crud__search .el-radio-button__inner {
            background-color: #010745;
            color: #FFFFFF;
            border-color: #15327E;
          }

          ::v-deep .avue-crud__search .el-radio-button__orig-radio:checked+.el-radio-button__inner {
            background-color: #409EFF;
            box-shadow: 0 0 0 0 #409eff;
          }

          ::v-deep .el-loading-mask {
            background-color: rgba(0, 0, 0, 0.2);
          }

          ::v-deep .avue-crud h2,
          ::v-deep .avue-crud h3 {
            color: #FFFFFF;
            background: transparent;
          }

          ::v-deep .avue-crud .el-input--mini input,
          ::v-deep .avue-form .el-input--mini input {
            background-color: #010745;
            color: #FFFFFF;
            border-color: #15327E;
          }

          ::v-deep .avue-crud__menu .avue-crud__left span {
            background-color: #010745;
            color: #FFFFFF;
            border: none;
          }

          ::v-deep .avue-crud__menu .avue-crud__right button {
            background-color: #010745;
            color: #FFFFFF;
            border-color: #15327E;
          }


          ::v-deep .avue-empty__desc {
            color: #FFFFFF;
          }

          ::v-deep .el-table--scrollable-x .el-table__body-wrapper {
            overflow-x: hidden;
          }

          ::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
            background-color: rgba(255, 255, 255, 0.1);
          }

          ::v-deep .el-table__body tr.hover-row>td.el-table__cell {
            background-color: rgba(255, 255, 255, 0.1);
          }

          .hbview_detail{
            border-left: 1px solid #fff;
            li{
              margin: 40px;
            }
          }
</style>
