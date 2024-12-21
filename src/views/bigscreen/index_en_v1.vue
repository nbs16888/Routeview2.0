<template>
  <fullScreen>
      <div id="index">
        <div class="bg">
          <!-- <dv-loading v-if="loading">Loading...</dv-loading> -->
          <div class="host-body">
            <div class="d-flex jc-center" ref="titlerow">
              <dv-decoration-10 class="dv-dec-10"  style="width:15%;"/>
              <div class="d-flex jc-center">
                <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
                <div class="title" style="width: 857px;">
                  <div>
                    <div style="margin-left: -88%; margin-top: -2%;margin-bottom: -0.5%;">
                      <img src="../../../public/Logo_ico.png" width="65px" >
                    </div>
                    <span class="title-text" style="line-height: 35px; letter-spacing: -0.9px;">Intelligent Route Planning System for Ships Sailing</span>
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
              <dv-decoration-10 class="dv-dec-10-s"  style="width:15%;"/>
            </div>

            <!-- 第二行 -->
            <div class="d-flex jc-between px-2"  ref="menurow">
              <div class="d-flex aside-width">
                <ul class="top-nav">
                  <!-- <li><a href="#">&emsp;</a></li> -->
                  <li>
                    <a href="#">Routes planning</a>
                    <ul>
                        <li><a href="#">Strategic stage</a>
                          <ul>
                              <li><a href="#" @click="beforecanpass" title="Potential navigation planning (from 3 to 25-30 years in advance)">Potential navigation planning</a></li>
                              <li><a href="#" @click="beforeroute" title="Initial planning (1-6 months in advance)">Initial planning</a></li>
                          </ul>
                        </li>
                        <li><a href="#">Tactical stage</a>
                          <ul>
                              <li><a href="#" @click="routeing" title="Operational planning (1-10 days in advance)">Operational planning</a></li>
                          </ul>
                        </li>
                    </ul>
                  </li>
                  <li><a href="#">Economic viability</a>
                      <ul>
                          <li @click="routecompare"><a href="#">Routes compare</a></li>
                          <!--
                          <li @click="loadHistoryRout"><a href="#">Route analysis</a></li>
                          <li @click="loadHistoryRout"><a href="#">Historical routes</a></li>
                          <li @click="loadHistoryIntensity"><a href="#">Historical intensity</a></li>
                           -->
                      </ul>
                  </li>
                  <li><a href="#">Accessibility of ports</a>
                    <ul>
                        <li><a href="#">Port visualization</a></li>
                        <li  @click="dialogVisable = true;dia_type = 2;dia_title='Port accessibility analysis';refreshkey=new Date().getTime();"><a href="#">Port accessibility analysis</a></li>
                    </ul>
                  </li>
                </ul>

              </div>
              <div class="d-flex aside-width">
                <!--
                <div class="react-right bg-color-blue mr-3" style="width:560px">
                  <span class="text fw-b">Nowcasting of sea ice drift</span>
                </div>
                <div class="react-right bg-color-blue mr-3" style="width:560px">
                  <span class="text fw-b">Navigability assessments</span>
                </div>
                <div class="react-right mr-4 react-l-s">
                  <!- <span class="react-after"></span>
                  <span class="text">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span> ->
                  <span class="react-after"></span>
                  <span class="text el-icon-setting" @click="showTools = !showTools;" style="cursor: pointer;">Tools</span>
                </div>
                -->
                <ul class="top-nav-right">
                  <li>
                    <a href="#">Nowcasting of sea ice drift</a>
                  </li>
                  <li>
                    <a href="#">Navigability assessments</a>
                  </li>
                  <li>
                    <a href="#">{{ dateYear }}</a>
                    <!-- <a href="#"><span class="text el-icon-setting" @click="showTools = !showTools;" style="cursor: pointer;">Tools</span></a> -->
                  </li>
                </ul>
              </div>
              <div class="show_tools" style="position: fixed;right: 15px;top: 11%;z-index: 10;" v-if="showTools">
                 <div v-if="showTools">
                   <ul class="tools_ul">
                      <transition-group name="fade"  mode="in-out">
                        <li v-for="(item,index) in toolsArr" @click="handlerClickLi(index)" :key="'tr_li_'+index" :class="{ active: activeArr.indexOf('tools'+index) > -1 }">
                          <span :class="item.icon+' li_icon'"></span>
                          <span class="li_label">{{item.label}}</span>
                        </li>
                      </transition-group>
                    </ul>
                  </div>

              </div>
            </div>
              <div class="body-box" style="background:transparent;" v-if="true" :key="resizeMapKey">
                <div class="cesium-container" id="cesiumContainer" ref="cesiumContainer"></div>
                    <!--
                    <vc-viewer class="viewer" @ready="ready" :camera="camera"
                      :full = "true"
                      :animation = "true"
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
                      <vc-windmap ref="windmap" :data="windData" :particle-system-options="particleSystemOptions" v-if="false"></vc-windmap>
                      <!-
                      <vc-navigation  :options="controlleroptions"></vc-navigation>
                      <vc-layer-imagery :alpha="1" :brightness="1" :contrast="1">
                        <vc-provider-imagery-bingmaps
                        :url="url"
                        :bm-key="bmKey"
                        map-style="Aerial"
                        ></vc-provider-imagery-bingmaps>
                      </vc-layer-imagery> ->
                    </vc-viewer>
                    -->
              </div>


              <!-- 经纬度及视角等 -->
              <div id="latlng_show">
                  <div style="width: 170px; height: 30px; float: left">
                      <font size="3" color="white">Longitude：<span id="longitude_show"></span></font>
                  </div>
                  <div style="width: 170px; height: 30px; float: left">
                      <font size="3" color="white">Latitude：<span id="latitude_show"></span></font>
                  </div>
              </div>


              <div style="position: absolute;height: 15%;width: 33%;margin: 38px 33%;" v-show="true">
                <div class="newrouteing">
                  <dv-border-box-11 title="Tactical stage" style="width: 650px;height: 170px;" backgroundColor="#131f3b00">
                    <!-- <el-row style="text-align: center;">Tactical stage</el-row> -->
                    <el-row class="input_row">
                      <el-col :span="12">
                          StartDate：<el-date-picker style="width: 170px;" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions" v-model="routeingstartdate"></el-date-picker>
                        <el-popover
                            placement="right"
                            title="DateTips"
                            width="350"
                            trigger="hover"
                            popper-class="shipinfo-pop"
                            content="shipinfos"
                            :close-delay="1000">

                                  <el-row>
                                    <div>
                                      Operational planning, herein referred to as on-scene planning, must be informed by contemporary ice condition maps and short-term ice condition forecasts extending up to 10 days. Route planning and its subsequent execution at sea should be predicated upon the acquisition of highly detailed data on prevailing ice conditions.
                                    </div>
                                  </el-row>
                                <i class="el-icon-info" slot="reference" style="font-size: 18px;margin-left: 10px;"></i>
                        </el-popover>
                      </el-col>
                      <el-col :span="12">
                        Sailing ships：<el-select v-model="routedship" style="width: 55%;" :filterable="true" :popper-append-to-body="false">

                              <el-option
                                v-for="item in routedships"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                              </el-option>
                            </el-select>
                        </el-select>
                        <el-popover
                            placement="right"
                            title="Ship infos"
                            width="400"
                            trigger="hover"
                            popper-class="shipinfo-pop"
                            content="shipinfos"
                            :close-delay="2000">

                                  <el-row :key="shipinfokey">
                                    <el-row>
                                      Length：800 m<br>
                                    </el-row>
                                    <el-row>
                                      Width：305 m<br>
                                    </el-row>
                                    <el-row>
                                      Tonage：50.5 Tons<br>
                                    </el-row>
                                    <el-row>
                                      Draft depth：320.8 m<br>
                                    </el-row>
                                    <el-row>
                                      Tonnage：620.8 Tons<br>
                                    </el-row>

                                    <el-row>
                                      Container load：4000TEU<br>
                                    </el-row>
                                    <el-row>
                                      Fuel type：LNG<br/>
                                    </el-row>
                                    <el-row>
                                      Icearea：4<br/>
                                    </el-row>
                                    <el-row>
                                      Carbon tax：50%<br/>
                                    </el-row>
                                  </el-row>
                                  <el-row>
                                    <div style="width: 300px;height: 200px;">
                                    Current Speed:<speedChart :width="300" :height="300" :shipinfokey.sync="shipinfokey"/>
                                    </div>
                                  </el-row>
                                <i class="el-icon-info" slot="reference" style="font-size: 18px;margin-left: 10px;"
                                   @pointermove="shipinfokey = new Date().getTime()"></i>
                          </el-popover>
                      </el-col>
                      <!-- <el-col :span="7">
                          Rules：<el-select v-model="gh_rule" style="width: 55%;" :popper-append-to-body="false">
                            <el-option value="1">Shortest path</el-option>
                            <el-option value="2">Minimum time</el-option>
                            <el-option value="3">Minimum energy</el-option>
                            <el-option value="4">Minimum risk</el-option>
                          </el-select>
                      </el-col>
                      <el-col :span="1">
                        <span style="cursor: pointer;" class="el-icon-s-unfold" @click="dialogVisableys = !dialogVisableys;"></span>
                      </el-col> -->
                      </el-row>
                    </dv-border-box-11>
                </div>
              </div>


              <!-- 温度变化 -->
              <div v-if="dataVisible" :style="'position: absolute;top: 10%;left: '+(isbig?'58%':'64.5%')+';height: '+Number(divheight+50)+'px; width: '+divwidth+'px;text-align: center;background: rgba(0,0,0,0.3);z-index:9;'">
                <!-- 航行前视图 -->
                <dv-border-box-10 style="opacity: 1;" v-if="dia_type == 1">
                  <el-row class="viewtitle">
                    <h3>Route View
                  <span style="padding-left: 95%;display: block;margin-top: -20px;cursor: pointer;" @click="dataVisible = false;">X</span></h3></el-row>
                  <el-row>
                    <ul class="routeview">
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Distance：</span><span>222.25</span>Sea mile</li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Elapsed time：</span><span>192.28</span>hours</li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Speed：</span><span>10</span>knot</li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Energy consumption：</span><span>152.21</span>Ton</li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>CO₂：</span><span>365.2</span>Ton</li>

                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Temperature：</span><span  @click="temperature_show = !temperature_show;"><span :class="temperature_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Windy：</span><span  @click="windy_show = !windy_show;"><span :class="windy_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Sea fog：</span><span  @click="seafog_show = !seafog_show;"><span :class="seafog_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Route RIO：</span><span  @click="routerio_show = !routerio_show;loadRiskRIO();"><span :class="routerio_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Route Area：</span><span  @click="routearea_show = !routearea_show;"><span :class="routearea_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Floating ice：</span><span  @click="floatice_show = !floatice_show;"><span :class="floatice_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                    </ul>
                  </el-row>
                  <el-row style="height: 20px;line-height: 20px;font-size: 15px;text-align: left;">
                    <span style="padding-left: 20px;">
                      <span class="el-icon-s-promotion" style="color: #ff8200;"></span>Variations in sea ice conditions along the optimal route</span>
                    <span :style="'cursor: pointer;font-size:18px;padding-left: '+(isbig?'48%':'1%')+';'" :class="isbig?'el-icon-full-screen':'el-icon-rank'" @click="divheight = isbig?600:600;divwidth = isbig?410:800;refreshkey = new Date().getTime();isbig = !isbig"></span>
                  </el-row>

                  <el-row>
                    <el-col :span="4"><span style="line-height: 40px;padding-left: 20px;">Type：</span></el-col>
                    <el-col :span="20" style="text-align: left;">
                      <el-radio-group v-model="tab_radio" size="mini" style="z-index: 12; position: relative; left: 25px; top: 10px;">
                        <el-radio-button label="0">Concentration</el-radio-button>
                        <el-radio-button label="1">Thickness</el-radio-button>
                        <el-radio-button label="2">Speed</el-radio-button>
                      </el-radio-group>
                    </el-col>
                    <line3DChart id="line3DChart"  :height="350" :width="divwidth" :key="refreshkey"/>
                  </el-row>


                  <!-- <el-row style="height: 20px;line-height: 40px;font-size: 15px;text-align: left;">
                    <span style="padding-left: 20px;">
                      <span class="el-icon-s-promotion" style="color: #ff8200;"></span>Speed route trend line</span>
                  </el-row>
                  <lineChart  :height="190" :showY="false" style="width: 100%;" :key="refreshkey+'1'" categoryName="acct_day"
                        seriesColors="#fff" axisfontColor="#fff" :showLabel="false" :lineSmooth="true" :lineAreaStyle="true"
                        v-if="tempdata.length" :data="[tempdata]" title_size="16px" :hasTitle="false"/> -->
                </dv-border-box-10>
                <!-- 航行中视图 -->
                <dv-border-box-10 style="opacity: 1;" v-if="dia_type == 3">
                  <el-row class="viewtitle">
                    <h3>ReRoute View
                  <span style="padding-left: 95%;display: block;margin-top: -20px;cursor: pointer;" @click="dataVisible = false;">X</span></h3></el-row>
                  <el-row>
                    <ul class="routeview">
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Energy consumption：</span><span>152.21</span>Ton</li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span>Location: <span>E{{getRandomFloat(80,90)}}</span>,<span>N{{getRandomFloat(30,40)}}</span><img alt="direction" src="../../assets/images/compass.png" :style="'display:inline-block;height: 30px;vertical-align: middle;'+'transform: rotate(45deg);'" /></li>
                      <li>
                        <el-row>
                          <el-col :span="10"><span class="el-icon-s-promotion" style="color: #ff8200;"></span>
                          <el-popover
                              placement="right"
                              title="ProgressTips"
                              width="350"
                              trigger="hover"
                              popper-class="shipinfo-pop"
                              content="shipinfos"
                              :close-delay="1000">

                                    <el-row>
                                      <div>
                                        The percentage of the current waterway in the total route
                                      </div>
                                    </el-row>
                                  <i class="el-icon-info" slot="reference" style="font-size: 18px;margin-left: 10px;"></i>
                            </el-popover>

                          <span>Progress:</span></el-col>
                          <el-col :span="14">
                          <el-progress :text-inside="true" :stroke-width="15" :percentage="70" status="success" style="width: 70%;height: 0px;"></el-progress>

                          </el-col>
                        </el-row>
                      </li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Reroute Distance：</span><span>122.25</span>Sea mile</li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>cost time：</span><span>122.28</span>hours</li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Speed：</span><span>10</span>knot</li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>CO₂ emission：</span><span>275.2</span>Ton</li>

                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Temperature：</span><span  @click="temperature_show = !temperature_show;"><span :class="temperature_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Windy：</span><span  @click="windy_show = !windy_show;"><span :class="windy_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Sea fog：</span><span  @click="seafog_show = !seafog_show;"><span :class="seafog_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Route RIO：</span><span  @click="routerio_show = !routerio_show;loadRiskRIO();"><span :class="routerio_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Route Area：</span><span  @click="routearea_show = !routearea_show;"><span :class="routearea_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                      <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Floating ice：</span><span  @click="floatice_show = !floatice_show;"><span :class="floatice_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                    </ul>
                  </el-row>
                  <el-row style="height: 20px;line-height: 20px;font-size: 15px;text-align: left;">
                    <span style="padding-left: 20px;">
                      <span class="el-icon-s-promotion" style="color: #ff8200;"></span>Variations in sea ice conditions along the optimal route</span>
                    <span :style="'cursor: pointer;font-size:18px;padding-left: '+(isbig?'48%':'1%')+';'" :class="isbig?'el-icon-full-screen':'el-icon-rank'" @click="divheight = isbig?600:600;divwidth = isbig?410:800;refreshkey = new Date().getTime();isbig = !isbig"></span>
                  </el-row>

                  <el-row>
                    <el-col :span="4"><span style="line-height: 40px;padding-left: 20px;">Type：</span></el-col>
                    <el-col :span="20" style="text-align: left;">
                      <el-radio-group v-model="tab_radio" size="mini" style="z-index: 12; position: relative; left: 25px; top: 10px;">
                        <el-radio-button label="0">Concentration</el-radio-button>
                        <el-radio-button label="1">Thickness</el-radio-button>
                        <el-radio-button label="2">Speed</el-radio-button>
                      </el-radio-group>
                    </el-col>
                    <line3DChart id="line3DChart"  :height="300" :width="divwidth" :key="refreshkey"/>
                  </el-row>


                  <!-- <el-row style="height: 20px;line-height: 40px;font-size: 15px;text-align: left;">
                    <span style="padding-left: 20px;">
                      <span class="el-icon-s-promotion" style="color: #ff8200;"></span>Speed route trend line</span>
                  </el-row>
                  <lineChart  :height="190" :showY="false" style="width: 100%;" :key="refreshkey+'1'" categoryName="acct_day"
                        seriesColors="#fff" axisfontColor="#fff" :showLabel="false" :lineSmooth="true" :lineAreaStyle="true"
                        v-if="tempdata.length" :data="[tempdata]" title_size="16px" :hasTitle="false"/> -->
                </dv-border-box-10>
              </div>
              <!-- 温度变化 -->
              <!-- <div v-if="dataVisible" style="position: absolute;top: 35%;left: 78%;height: 200px; width: 410px;text-align: center;">
                <dv-border-box-10>
                  <el-row style="height: 20px;line-height: 40px;font-size: 15px;text-align: left;">
                    <span style="padding-left: 20px;">Variations in temperature along the optimal route</span>
                  </el-row>
                  <lineChart  :height="190" :showY="false" style="width: 100%;" :key="refreshkey+'1'" categoryName="acct_day"
                        seriesColors="#fff" axisfontColor="#fff" :showLabel="false" :lineSmooth="true" :lineAreaStyle="true"
                        v-if="tempdata.length" :data="[tempdata]" title_size="16px" :hasTitle="false"/>
                </dv-border-box-10>
              </div> -->
              <!-- 日历通航时期 -->
              <div v-if="navPeriodVisible" :style="'position: absolute;top: '+(isFullscreen ? '78%':'70%' )+';left: 78%;height: 180px; width: 21%;text-align: center;'" ref="calendarRef">
                <dv-border-box-10>
                  <el-row style="height: 20px;line-height: 40px;font-size: 15px;text-align: left;">
                    <span style="padding-left: 20px;color: #fff;">Navigation period</span>
                  </el-row>
                  <calendarChart @getData="getData"/>
                </dv-border-box-10>
              </div>
          </div>
        </div>
      </div>

          <el-dialog :title="dia_title" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisable" :show-close="true" :destroy-on-close="true" width="15%" style="left:-69%;top:17%;" class="tj_dialog" :key="refreshkey">
                <!-- <dv-border-box-13> -->
                  <!-- 航行规划 -->
                  <div v-if="dia_type == 1">
                    <div style="height: 550px;overflow-y: auto;" class="viewer_dialog">
                      <!-- <el-row class="input_row">
                        DateBetween:
                        <el-radio-group v-model="tab_radio" size="mini" style="margin-left:1%;">
                          <el-radio-button label="0">10-30 days</el-radio-button>
                          <el-radio-button label="1">1-3 months</el-radio-button>
                          <el-radio-button label="2">3-6 months</el-radio-button>
                        </el-radio-group>
                      </el-row> -->
                      <el-row class="input_row">
                        DateRange：<span>{{startdate}}--{{rangedate}}</span>
                        <el-popover
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
                          </el-popover>
                      </el-row>
                      <el-row class="input_row">
                        StartDate：<el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="beforestartdate" :picker-options = "rangepickerOptions"></el-date-picker>
                      </el-row>
                      <el-row class="input_row">
                        <el-col :span="12">
                          Start Lng：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_longitude1" style="width: 50%;"></el-input>
                        </el-col>
                        <el-col :span="12">
                          Lat：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_latitude1" style="width: 50%;"></el-input>
                          <i class="el-icon-position" @click="getStartPoint">Point</i>
                        </el-col>
                      </el-row>
                      <el-row class="input_row">
                        <el-col :span="12">
                          End Lng：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_longitude2" style="width: 50%;"></el-input>
                        </el-col>
                        <el-col :span="12">
                          Lat：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_latitude2" style="width: 50%;"></el-input>
                          <i class="el-icon-position" @click="getEndPoint">Point</i>
                        </el-col>
                      </el-row>
                      <el-row class="input_row select-style">
                          Ship type：<el-select v-model="cb_type" style="width: 60%;" :popper-append-to-body="false">

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
                          <span v-html="'Container load：'"/><el-select v-model="zx_type" style="width: 60%;" :popper-append-to-body="false">
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
                          <span v-html="'Fuel：'"></span><el-select v-model="rl_type" style="width: 60%;" :popper-append-to-body="false">
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
                          <span v-html="'Icearea：'"/><el-select v-model="bq_type" style="width: 60%;" :popper-append-to-body="false">
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
                          <span v-html="'Carbon tax：'"/><el-select v-model="ts_type" style="width: 60%;" :popper-append-to-body="false">
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
                          Rules：<el-select v-model="gh_rule" style="width: 60%;" :popper-append-to-body="false" placeholder="Please Select">
                            <el-option value="1">Shortest path</el-option>
                            <el-option value="2">Minimum time</el-option>
                            <el-option value="3">Minimum energy</el-option>
                            <el-option value="4">Minimum risk</el-option>
                          </el-select>
                      </el-row>
                      <el-row class="input_row" style="text-align: right;cursor: pointer;">
                        <span class="el-icon-s-unfold" @click="dialogVisableys = !dialogVisableys;">Navigation environment</span>
                      </el-row>
                    </div>
                    <div class="dlg_footer">
                      <slot name="footer">
                          <el-button @click="dialogVisable = false;dataVisible = false;dataVisibleLegend = false;navPeriodVisible = false;dialogVisableys = false;" >Cancel</el-button>
                          <el-button @click="routebeforeSubmit" >Submit</el-button>
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

                  <!-- 航行中规划 -->
                  <div v-if="dia_type == 3">
                    <div style="height: auto;overflow-y: auto;min-height: 280px;" class="viewer_dialog">
                            <el-row class="input_row">
                              StartDate：<el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions" v-model="routeingstartdate"></el-date-picker>
                            <el-popover
                                placement="right"
                                title="DateTips"
                                width="350"
                                trigger="hover"
                                popper-class="shipinfo-pop"
                                content="shipinfos"
                                :close-delay="1000">

                                      <el-row>
                                        <div>
                                          Operational planning, herein referred to as on-scene planning, must be informed by contemporary ice condition maps and short-term ice condition forecasts extending up to 10 days. Route planning and its subsequent execution at sea should be predicated upon the acquisition of highly detailed data on prevailing ice conditions.
                                        </div>
                                      </el-row>
                                    <i class="el-icon-info" slot="reference" style="font-size: 18px;margin-left: 10px;"></i>
                            </el-popover>
                            </el-row>


                            <!-- 经过的经纬度start -->
                            <!--
                            <el-form ref="form" :model="form">
                              <div v-for="(item, index) in form.channel_arr" :key="index" class="label">
                                  <el-row>
                                    <el-col :span="10">
                                      <el-form-item label="Lng:" :prop="'lng.' + index + '.lng'"
                                      :rules="{required: true, message: 'please input', trigger: 'blur'}" class="middleInput">
                                        <el-input v-model.trim="item.lng" maxlength="30" placeholder="please input" style="width:60%;"></el-input>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="14">
                                      <el-form-item label="Lat:" :prop="'lat.' + index + '.lat'" :rules="{ required: true, message: 'please input', trigger: 'blur' }"
                                      class="middleInput">
                                        <el-input maxlength="100" :rows="3" v-model.trim="item.lat" placeholder="please input" style="width:60%;"></el-input>
                                        <i class="el-icon-circle-plus-outline icon" v-if="(index === (form.channel_arr.length - 1))" @click.prevent="addKey(item)" style="font-size: 20px;transform: translateY(5px);"></i>
                                        <i class="el-icon-remove-outline icon" v-if="(form.channel_arr.length > 1)" @click.prevent="removeKey(item, index)" style="font-size: 20px;transform: translateY(5px);"></i>
                                      </el-form-item>
                                      </el-col>
                                   </el-row>
                                  </div>
                              </el-form>
                              -->
                            <!-- 经过的经纬度end -->
                            <el-row class="input_row select-style">
                                sailing ships：<el-select v-model="routedship" style="width: 60%;" :filterable="true" :popper-append-to-body="false">

                                      <el-option
                                        v-for="item in routedships"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                      </el-option>
                                    </el-select>
                                </el-select>
                                <el-popover
                                    placement="right"
                                    title="Ship infos"
                                    width="400"
                                    trigger="hover"
                                    popper-class="shipinfo-pop"
                                    content="shipinfos"
                                    :close-delay="2000">

                                          <el-row :key="shipinfokey">
                                            <el-row>
                                              Length：800 m<br>
                                            </el-row>
                                            <el-row>
                                              Width：305 m<br>
                                            </el-row>
                                            <el-row>
                                              Tonage：50.5 Tons<br>
                                            </el-row>
                                            <el-row>
                                              Draft depth：320.8 m<br>
                                            </el-row>
                                            <el-row>
                                              Tonnage：620.8 Tons<br>
                                            </el-row>

                                            <el-row>
                                              Container load：4000TEU<br>
                                            </el-row>
                                            <el-row>
                                              Fuel type：LNG<br/>
                                            </el-row>
                                            <el-row>
                                              Icearea：4<br/>
                                            </el-row>
                                            <el-row>
                                              Carbon tax：50%<br/>
                                            </el-row>
                                          </el-row>
                                          <el-row>
                                            <div style="width: 300px;height: 200px;">
                                            Current Speed:<speedChart :width="300" :height="300" :shipinfokey.sync="shipinfokey"/>
                                            </div>
                                          </el-row>
                                        <i class="el-icon-info" slot="reference" style="font-size: 18px;margin-left: 10px;"
                                           @pointermove="shipinfokey = new Date().getTime()"></i>
                                  </el-popover>
                            </el-row>
                              <el-row class="input_row select-style">
                                  Rules：<el-select v-model="gh_rule" style="width: 60%;" :popper-append-to-body="false">
                                    <el-option value="1">Shortest path</el-option>
                                    <el-option value="2">Minimum time</el-option>
                                    <el-option value="3">Minimum energy</el-option>
                                    <el-option value="4">Minimum risk</el-option>
                                  </el-select>
                              </el-row>
                              <el-row class="input_row" style="text-align: right;cursor: pointer;">
                                <span class="el-icon-s-unfold" @click="dialogVisableys = !dialogVisableys;">Navigation environment</span>
                              </el-row>
                            </div>
                            <div class="dlg_footer">
                              <slot name="footer">
                                  <el-button @click="dialogVisable = false;dataVisible = false;dataVisibleLegend = false;navPeriodVisible = false;removeLayers();" >Cancel</el-button>
                                  <el-button @click="routeing_replan" >ReRoute</el-button>
                              </slot>
                            </div>
                    </div>
                  </div>

                  <!-- 航线对比 -->
                  <div v-if="dia_type == 4">
                    <div style="height: 520px;" class="viewer_dialog">
                      <el-row class="input_row select-style">
                        Choose Line：
                        <el-select v-model="hx_arr" multiple placeholder="Please select">
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
                <!-- </dv-border-box-13> -->
          </el-dialog>
          <el-dialog title="Navigation environment" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisableys" :show-close="true" width="15%" style="left:-24%;top:17%;" class="ys_dialog">
              <div>
                  <el-tree
                    :data="datatree"
                    :props="props"
                    node-key="id"
                    default-expand-all
                    show-checkbox>
                  </el-tree>

              </div>
          </el-dialog>
          <!-- 航线对比 -->
          <el-dialog title="Routes Comparison" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisableHxdb" :show-close="true" width="15%" style="left:-72%;top:17%;" class="hxdb_dialog">
              <div style="height: auto;overflow-y: auto;min-height: 280px;" class="viewer_dialog">
                <el-row>
                  <el-col :span="2">Start:</el-col>
                  <el-col :span="22">
                    <el-checkbox-group v-model="checkedStarts" >
                      <el-checkbox v-for="(start,index) in compstarts" :label="start" :key="start">{{start}}</el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                    <!--
                  Start:
                     <el-radio-group v-model="comparestart_radio" size="mini" style="z-index: 12; position: relative;">
                      <el-radio-button label="Shanghai">Shanghai</el-radio-button>
                      <el-radio-button label="Dalian">Dalian</el-radio-button>
                    </el-radio-group> -->


                </el-row>
                <el-row class="input_row">
                  <el-col :span="12">
                    Lng：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_longitude1" style="width: 50%;"></el-input>
                  </el-col>
                  <el-col :span="12">
                    Lat：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_latitude1" style="width: 50%;"></el-input>
                    <i class="el-icon-position" @click="getStartPoint">Point</i>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">End:</el-col>
                    <el-col :span="22">
                      <el-checkbox-group v-model="checkedEnds" >
                        <el-checkbox v-for="(end,index) in compends" :label="end" :key="end">{{end}}</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                    <!--
                    End:
                     <el-radio-group v-model="compareend_radio" size="mini" style="z-index: 12; position: relative;">
                      <el-radio-button label="Rotterdam">Rotterdam</el-radio-button>
                      <el-radio-button label="Murmansk">Murmansk</el-radio-button>
                      <el-radio-button label="Sabetta">Sabetta</el-radio-button>
                      <el-radio-button label="Tiksi">Tiksi</el-radio-button>
                      <el-radio-button label="Pevek">Pevek</el-radio-button>
                    </el-radio-group> -->

                </el-row>
                <el-row class="input_row">
                  <el-col :span="12">
                    Lng：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_longitude2" style="width: 50%;"></el-input>
                  </el-col>
                  <el-col :span="12">
                    Lat：<el-input placeholder="please input" prefix-icon="el-icon-position" v-model="hx_latitude2" style="width: 50%;"></el-input>
                    <i class="el-icon-position" @click="getEndPoint">Point</i>
                  </el-col>
                </el-row>
                <div class="dlg_footer">
                  <slot name="footer">
                      <el-button round type="primary" @click="dialogVisableHxdb = false;" >Cancel</el-button>
                      <el-button round type="success" @click="dialogVisableHxview = true;" >Compare</el-button>
                  </slot>
                </div>
              </div>
          </el-dialog>
          <!-- <el-dialog title="List of routes" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisableHxdb" :show-close="true" width="50%" style="left:0%;top:17%;" class="hxdb_dialog">
              <div>
                      <avue-crud :data="data" :option="option" v-model="obj" >
                        <template slot="menu" slot-scope="scope">
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-view"
                            @click="viewhx(scope.row)">View
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-edit"
                            @click="comparehx(scope.row)">Compare
                          </el-button>
                        </template>
                      </avue-crud>
              </div>
          </el-dialog> -->

          <el-dialog title="Route Compare" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisableHxview" :show-close="true" width="45%" style="left:0%;top:17%;" class="hxview_dialog">

              <div>
                <!-- <el-row style="text-align: center;"><span style="font-size: 16px;color: #fff;">Route Name：</span><span style="font-size: 20px;color: #f00;font-weight: bold;">{{hxviewobj.name}}</span></el-row> -->
                   <el-row style="text-align: center;line-height: 50px;">
                     <el-col :span="11" style="font-size: 20px;font-weight: bold;">Shanghai to Rotterdam route</el-col>
                     <el-col :span="2"><img alt="direction" src="../../assets/images/VS.png" :style="'display:inline-block;height: 50px;vertical-align: middle;'+'transform: rotate(-30deg);'" /></el-col>
                     <el-col :span="11" style="font-size: 20x;font-weight: bold;">Suez route</el-col>
                   </el-row>
                   <el-row>
                     <el-col :span="12">
                        <ul class="hbview_detail">
                          <li><el-row><span>Start Point：</span><span>Lng: 122.3554,Lat: 36.2554</span></el-row></li>
                          <li><el-row><span>End Point：</span><span>Lng: 125.2554,Lat: 72.1228</span></el-row></li>
                          <li><el-row><span>Distance：</span><span>1228.5 Sea mail</span><span class="icon-win"></span></el-row></li>
                          <li><el-row><span>Time：</span><span>155.6 hours</span><span class="icon-win"></span></el-row></li>
                          <li><el-row><span>Fuel cost：</span><span>1355 Tons</span></el-row></li>
                          <li><el-row><span>Co2 emission：</span><span>3566.2 gCO2/ton-mile</span></el-row></li>
                          <li><el-row><span>All cost：</span><span>12287.23</span></el-row></li>
                        </ul>
                     </el-col>
                     <el-col :span="12" style="display: flex; justify-content: space-around;border-left: 1px solid #f8f8f8;">
                       <ul class="hbview_detail">
                         <li><el-row><span>Start Point：</span><span>Lng: 122.3554,Lat: 36.2554</span></el-row></li>
                         <li><el-row><span>End Point：</span><span>Lng: 125.2554,Lat: 72.1228</span></el-row></li>
                         <li><el-row><span>Distance：</span><span>1228.5 Sea mail</span></el-row></li>
                         <li><el-row><span>Time：</span><span>155.6 hours</span></el-row></li>
                         <li><el-row><span>Fuel cost：</span><span>1355 Tons</span><span class="icon-win"></span></el-row></li>
                         <li><el-row><span>Co2 emission：</span><span>3566.2 gCO2/ton-mile</span></el-row></li>
                         <li><el-row><span>All cost：</span><span>12287.23</span><span class="icon-win"></span></el-row></li>
                       </ul>
                       <!-- <h4 style="border-left: 1px solid #fff;height: 300px;"></h4>
                       <div style="width: 100%;height: 100%;">
                         <radarChart
                           :id="Math.random()+''"
                           :tips="60"
                           :colorObj="colorData"
                         />
                       </div> -->
                     </el-col>

                   </el-row>
                   <el-row class="comparetable">
                     <!-- <avue-crud :data="comparetableData" :option="comparetableOption" style="width:96%;margin:0px auto;" :key="refreshKey">
                     </avue-crud> -->
                   </el-row>

              </div>
          </el-dialog>

          <!-- 适航云图 -->
          <el-dialog title="Routes Analysis" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisableShfx" :show-close="true" width="10%" style="left:-78%;top:17%;" class="hxdb_dialog">
              <div style="height: 500px;overflow-y: auto;" :key="datekey+'route'">
                <el-row>
                  <h3>Year</h3>
                  <datepanels v-if="selectionsY.length>0" :options.sync="selectionsY" :defaultvalue="valueY" ptype="yyyy" @changeVal="changeVal"></datepanels>
                </el-row>
                <el-row>
                  <!-- <div>年选中值：{{valueY}}</div> -->
                </el-row>
                <el-row>
                  <h3>Month</h3>
                  <datepanels v-if="selectionsM.length>0" :options.sync="selectionsM" :isMultiply="false"  :defaultvalue="valueM" ptype="mm" @changeVal="changeVal"></datepanels>
                </el-row>
                <el-row>
                  <!-- <div>月选中值：{{valueM}}</div> -->
                </el-row>
                <el-row>
                  <h3>Day</h3>
                  <datepanels v-if="selectionsD.length>0" :options.sync="selectionsD" :isMultiply="false"  :defaultvalue="valueD" ptype="dd" @changeVal="changeVal"></datepanels>
                </el-row>
                <el-row>
                  <!-- <div>日选中值：{{valueD}}</div> -->
                </el-row>
              </div>
          </el-dialog>
          <!-- 历史航线 -->
          <el-dialog title="Date Picker" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisableHis" :show-close="true" width="10%" style="left:-78%;top:17%;" class="hxdb_dialog" :key="datekey+'intensity'">
              <div style="height: 500px;overflow-y: auto;" :key="datekey+'intensity'">
                <el-row>
                  <h3>Year</h3>
                  <datepanels v-if="selectionsY.length>0" :options.sync="selectionsY" :defaultvalue="valueY" ptype="yyyy" @changeVal="changeVal"></datepanels>
                </el-row>
                <el-row>
                  <!-- <div>年选中值：{{valueY}}</div> -->
                </el-row>
                <el-row>
                  <h3>Month</h3>
                  <datepanels v-if="selectionsM.length>0" :options.sync="selectionsM" :isMultiply="false"  :defaultvalue="valueM" ptype="mm" @changeVal="changeVal"></datepanels>
                </el-row>
                <el-row>
                  <!-- <div>月选中值：{{valueM}}</div> -->
                </el-row>
                <el-row>
                  <h3>Day</h3>
                  <datepanels v-if="selectionsD.length>0" :options.sync="selectionsD" :isMultiply="false"  :defaultvalue="valueD" ptype="dd" @changeVal="changeVal"></datepanels>
                </el-row>
                <el-row>
                  <!-- <div>日选中值：{{valueD}}</div> -->
                </el-row>
              </div>
          </el-dialog>

          <!-- 通航窗口3-25-30year -->
          <el-dialog title="Navigation window" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
              :visible.sync="dialogVisableCanPass" :show-close="true" width="50%" style="top:17%;" class="canpass_dialog">
              <div>
                  <canPassEcharts></canPassEcharts>
                  <!-- <iframe src="/index_en_v2" width="1366" height="768"></iframe> -->
              </div>
          </el-dialog>

          <div v-if="dataVisibleLegend" class="type-legend" :style="'position: absolute;top:'+(isFullscreen ? '72%':'60%' )+';background: #01005b;border-radius: 5px;left:'+(legshow?'0px':'-6%')+';'">
                <span :class="legshow?'el-icon-caret-left':'el-icon-caret-right'" :style="'position: absolute;top:50%;color: #fff;cursor: pointer;z-index: 9;'+'right:'+(legshow?'0px':'-10px')+';font-size:20px;'" @click="legshow = !legshow;"></span>
            <customLegend :legend-items="myLegendItems" :legendName="legendName" legendtype="concentration"/>
          </div>

          <div v-if="dataVisibleLegendLine" class="reline-legend" :style="'height:100px;width:18vw;position: absolute;top:'+(isFullscreen ? '72%':'77%' )+';background: #01005b;border-radius: 5px;left:'+(legshow?'65%':'-6%')+';'">
                <!-- <span :class="legshow?'el-icon-caret-left':'el-icon-caret-right'" :style="'position: absolute;top:50%;color: #fff;cursor: pointer;z-index: 9;'+'right:'+(legshow?'0px':'-10px')+';font-size:20px;'" @click="legshow = !legshow;"></span> -->
            <el-row class="reline">Route Legend</el-row>
            <el-row class="reline">
              <el-col :span="12">Original <span style="color: #5500ff;font-size: 15px;font-weight: bold;">- - - - - - </span></el-col>
              <el-col :span="12">Sailed   <hr style="width: 40%;border: none;height: 2px;background-color: #ffff00; margin: -10px auto;"/></el-col>
            </el-row>
            <el-row class="reline">
              <el-col :span="12">Unsailed <span style="color: #5500ff;font-size: 15px;font-weight: bold;">- - - - - - </span></el-col>
              <el-col :span="12">Replan   <hr style="width: 40%;border: none;height: 2px;background-color: #ff0000; margin: -10px auto;"/></el-col>
            </el-row>

          </div>

  </fullScreen>
</template>

<script>
import fullScreen from '@/components/full-screen/index';
import autoResize from '@jiaminghi/data-view/lib/mixin/autoResize.js';
import { formatTime } from '@/utils/bigscreen/index.js';
import radarChart from '@/views/components/bigscreen/radarEcharts';
import calendarChart from '@/views/components/bigscreen/calendarEcharts';
import lineChart from '@/views/components/bigscreen/lineEcharts';
import line3DChart from '@/views/components/bigscreen/line3DEcharts';
import speedChart from '@/views/components/bigscreen/speedEcharts';
import {deepClone} from '@/utils/index';
import datepanels from '@/views/components/bigscreen/checkPanel';
import {getLegendRanges} from '@/utils/bigscreen/legendRanges';
import customLegend from '@/views/components/bigscreen/customLegend';
import canPassEcharts from '@/views/components/bigscreen/canPassEcharts';

import {onresize} from '@/utils/bigscreen/detectZoom';

//import curloc_icon from '@/assets/images/dwh.png';
import curloc_icon from '@/assets/images/ship.png';
import start_icon from '@/assets/images/startpoint.png';
import end_icon from '@/assets/images/endpoint.png';
import direction_icon from '@/assets/images/direction.png';
import billboard_icon from '@/assets/images/billboard.png';
import startpin_icon from '@/assets/images/startpin.png';
import endpin_icon from '@/assets/images/endpin.png';
import sailed_icon from '@/assets/images/sailed.png';
import unsailed_icon from '@/assets/images/unsailed.png';
import rerouted_icon from '@/assets/images/rerouted.png';
import {getyyyy_MM_dd,getyyyyMMddPlusDay} from '@/utils/date';
import {CanvasWindy} from '@/utils/bigscreen/windy/canvaswindy';
import {reqData} from '@/utils/bigscreen/common';
import website from '@/const/website';
import {getAttackcoordinates,createAttackArrow} from '@/utils/bigscreen/windy/attackarrow';
export default {
  mixins: [ autoResize ],
  data() {
    return {
      requrl: website.requrl,
      Cesium:null,
      viewer: null,
      resizeMapKey:"",
      bingmapLayer:null,
      hisrouteLayer:null,
      canpassareaLayer:null,
      riskRIOareaLayer:null,
      channelareaLayer:null,
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      pickerOptions: {
        disabledDate:(time)=>{
          let now = Date.now();
          let oneDay = 1000 * 60 * 60 * 24;
          return (
            time.getTime() < now - oneDay || // 不能选择今天之前的日期
            time.getTime() > now + 2 * oneDay - 1 // 不能选择3天之后的日期
          );
        }
      },
      rangepickerOptions: {
        disabledDate:(time)=>{
          let now = Date.now();
          let oneDay = 1000 * 60 * 60 * 24;
          return (
            time.getTime() < now - oneDay || // 不能选择今天之前的日期
            time.getTime() > now + 180 * oneDay - 1 // 不能选择3天之后的日期
          );
        }
      },
      weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
      dataVisible: false,
      showDialogRou: false,
      showDialogEco: false,
      showDialogAcc: false,
      refreshkey:0,
      dialogVisable: false,
      dia_type:0,
      cb_longitude:"",
      cb_latitude:"",
      dia_title:"",

      hx_longitude1:"105.5765",
      hx_latitude1:"79.3319",
      hx_longitude2:"0.2089",
      hx_latitude2:"67.1688",

      cb_longitude1:"",
      cb_latitude1:"",
      cb_longitude2:"",
      cb_latitude2:"",

      props: {
        label: 'label',
        children: 'children'
      },
      dataVisibleLegend: false,
      dataVisibleLegendLine: false,
      dialogVisableys: false,
      dialogVisableHxdb: false,
      dialogVisableHxview: false,
      dialogVisableShfx: false,
      dialogVisableHis: false,
      dialogVisableCanPass: false,
      navPeriodVisible: false,
      datatree: [{
            id: 1,
            label: 'Sea ice params',
            children: [
              {
                id: 11,
                label: 'Sea ice thickness'
              },
              {
                id: 12,
                label: 'Sea ice drift'
              },
              {
                id: 13,
                label: 'Sea ice intensity'
              },
            ]
          }, {
            id: 2,
            label: 'Meteorological params',
            children: [{
              id: 21,
              label: 'Wind speed'
            }, {
              id: 22,
              label: 'Temperature'
            }, {
              id: 24,
              label: 'Visibility'
            }]
          }, {
            id: 3,
            label: 'Fog',
            children: [{
              id: 7,
              label: 'Fog'
            }]
          }, {
            id: 4,
            label: 'Wave height',
            children: [{
              id: 41,
              label: 'Wave height'
            }]
          }, {
            id: 5,
            label: 'Depth of water',
            children: [{
              id: 51,
              label: 'Depth of water'
            }]
          }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [{
          costtime: '1day10hours',
          distance: '521',
          cost: '502'
        },{
          costtime: '1day18hours',
          distance: '553',
          cost: '150'
        },{
          costtime: '2days10hours',
          distance: '1023',
          cost: '5020'
        },{
          costtime: '1day21hours',
          distance: '856',
          cost: '2048'
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
         value: 'line1',
         label: 'Line1'
       }, {
         value: 'Line2',
         label: 'Line2'
       }, {
         value: 'Line3',
         label: 'Line3'
       }, {
         value: 'Line4',
         label: 'Line4'
       }, {
         value: 'Line5',
         label: 'Line5'
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
          "acct_day": "12",
          "decimal_num": 2
         },
         {
          "col_value": 24.09,
          "acct_day": "13",
          "decimal_num": 2
         },
         {
          "col_value": 21.09,
          "acct_day": "14",
          "decimal_num": 2
         },
         {
          "col_value": 23.30,
          "acct_day": "15",
          "decimal_num": 2
         },{
          "col_value": 21.30,
          "acct_day": "16",
          "decimal_num": 2
         },{
          "col_value": 22.30,
          "acct_day": "17",
          "decimal_num": 2
         },{
          "col_value": 25.30,
          "acct_day": "18",
          "decimal_num": 2
         },
         {
          "col_value": 23.30,
          "acct_day": "19",
          "decimal_num": 2
         },{
          "col_value": 21.30,
          "acct_day": "20",
          "decimal_num": 2
         },{
          "col_value": 22.30,
          "acct_day": "21",
          "decimal_num": 2
         }
       ],
       mjddata:[
         {
          "col_value": 28.89,
          "acct_day": "02",
          "decimal_num": 2
         },
         {
          "col_value": 21.09,
          "acct_day": "03",
          "decimal_num": 2
         },
         {
          "col_value": 31.09,
          "acct_day": "04",
          "decimal_num": 2
         },
         {
          "col_value": 23.30,
          "acct_day": "05",
          "decimal_num": 2
         },{
          "col_value": 21.30,
          "acct_day": "06",
          "decimal_num": 2
         },{
          "col_value": 22.30,
          "acct_day": "07",
          "decimal_num": 2
         },{
          "col_value": 25.30,
          "acct_day": "08",
          "decimal_num": 2
         },
         {
          "col_value": 22.30,
          "acct_day": "09",
          "decimal_num": 2
         },{
          "col_value": 25.30,
          "acct_day": "10",
          "decimal_num": 2
         },{
          "col_value": 26.30,
          "acct_day": "11",
          "decimal_num": 2
         }
       ],
       startdate:"",
       beforestartdate:"",
       routeingstartdate:"",
       dateRange:[],
       rangedate:[],
       cboptions:[{label:"General merchant ship",value:"1"},{label:"Ice breaker",value:"2",disabled:true}],
       zxoptions:[{label:"4000TEU",value:"4000"},{label:"10000TEU",value:"10000"},{label:"16000TEU",value:"16000"}],
       rloptions:[{label:"LNG",value:"1"},{label:"HFO",value:"2"},{label:"MDO",value:"3"}],
       bqoptions:[{label:"1",value:"1"},{label:"4",value:"4"},{label:"7",value:"7"}],
       tsoptions:[{label:"0%",value:"0"},{label:"50%",value:"0.5"},{label:"100%",value:"1"}],

       routedships:[{label:"routedship_1",value:"1"},{label:"routedship_2",value:"2"}],
       shipinfokey:null,
       cb_type:"1",
       zx_type:"4000",
       rl_type:"1",
       bq_type:"1",
       ts_type:"0",
       routedship: "1",
       obj:{},
     data: [
       {
         name:'Line one',
         jl:'10500',
         hbmjd:'23.5%',
         hbhd:'15',
         ss:'5000',
         fxz:'0.85',
         nh:'55kw',
         date:'2023-07-22'
       },
       {
         name:'Line two',
         jl:'1090',
         hbmjd:'20.5%',
         hbhd:'22',
         ss:'8000',
         fxz:'0.85',
         nh:'105kw',
         date:'2023-07-28'
       },
       {
         name:'Line three',
         jl:'10500',
         hbmjd:'23.5%',
         hbhd:'15',
         ss:'5000',
         fxz:'0.85',
         nh:'55kw',
         date:'2023-08-02'
       },
       {
         name:'Line five',
         jl:'10500',
         hbmjd:'23.5%',
         hbhd:'15',
         ss:'5000',
         fxz:'0.85',
         nh:'55kw',
         date:'2023-08-06'
       },
       {
         name:'new Line',
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
       "indexLabel": "SN",
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
           label: "Start Date",
           prop: "date",
           type: "date",
           format: "yyyy-MM-dd",
           valueFormat: "yyyy-MM-dd",
         },
          {
           label:'Line name',
           prop:'name'
         },{
           label:'Distance',
           prop:'jl'
         },
         {
           label:'Ice intensity',
           prop:'hbmjd'
         },{
           label:'Ice thickness',
           prop:'hbhd'
         },{
           label:'Depth water',
           prop:'ss'
         },{
           label:'Risk Value',
           prop:'fxz'
         },{
           label:'Energy dissipation',
           prop:'nh'
         }
       ]
     },
     refreshKey: null,
     comparetableOption: {
     	align: 'center',
     	menuAlign: 'center',
     	menuAlign: 'center',
     	emptyBtn: false,
     	index: false,
     	indexLabel: '序号',
     	indexWidth: 60,
     	addBtn: false,
     	viewBtn: false,
     	delBtn: false,
     	menu: false,
     	page: false,
     	tree: true,
      width: '100%',//表格宽度
     	defaultExpandAll: true,
     	header: false,
     	maxHeight: 400,
     	// height: 520,
     	refreshBtn: false,
     	stripe: false,
     	showColumnBtn: false,
     	columnBtn: true, //列显隐属性
     	border: false,
     	rowKey: 'id',
     	rowParentKey: 'parentId',
     	column: [
     	{
     		label: 'SH-RTD-route',
     		children: [{
     			label: 'Distance',
     			prop: 'zb'
     		}, {
     			label: 'Time',
     			prop: 'df',
     		}, {
     			label: 'Fule cost',
     			prop: 'is_sc',
     		}, {
     			label: 'Co2',
     			prop: 'is_sc',
     		}, {
     			label: 'All cost',
     			prop: 'is_sc',
     		}]
     	},
     	{
     		label: 'SYS-route',
     		children: [{
     			label: 'Distance',
     			prop: 'zb'
     		}, {
     			label: 'Time',
     			prop: 'df',
     		}, {
     			label: 'Fule cost',
     			prop: 'is_sc',
     		}, {
     			label: 'Co2',
     			prop: 'is_sc',
     		}, {
     			label: 'All cost',
     			prop: 'is_sc',
     		}]
     	}
     	]

     },
     comparetableData: [{zb:222}],
     objshfx:{},
     datashfx: [
       {
         data_name:'LN20230804',
         ship_type:'1',
         date:'2023-07-22'
       },
       {
         data_name:'LN20230704',
         ship_type:'1',
         date:'2023-07-28'
       },
       {
         data_name:'LN20230808',
         ship_type:'1',
         date:'2023-08-02'
       },
       {
         data_name:'LN20230812',
         ship_type:'1',
         date:'2023-08-06'
       },
       {
         data_name:'LN20230815',
         ship_type:'1',
         date:'2023-08-12'
       },

     ],
     optionshfx:{
       "title": "",
       "titleSize": "h5",
       "exportBtn": true,
       header:false,
       "card": true,
       "page": false,
       "border": true,
       "index": true,
       "indexLabel": "SN",
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
           label: "Start Date",
           prop: "date",
           type: "daterange",
           format: "yyyy-MM-dd",
           valueFormat: "yyyy-MM-dd",
           searchRange:true,
           hide:true,
           search:true,
           startPlaceholder:"Please Select Start",
           endPlaceholder:"Please Select End",
           searchLabelWidth:130,
           searchSpan:24,
         },
          {
           label:'Data name',
           prop:'data_name'
         },{
           label:'Ship type',
           prop:'ship_type',
           search:true,
           hide:true,
           type:'select',
           searchLabelWidth:130,
           searchSpan:18,
           placeholder:"Please Select type",
           dicData:[{label:"General merchant ship",value:"1"},{label:"Ice breaker",value:"2",disabled:true}]
         }
       ]
     },
     objhis:{},
     datahis: [
       {
         route_no:"20230702",
         route_name:'LN20230702'
       },
       {
         route_no:"20230706",
         route_name:'LN20230706'
       },
       {
         route_no:"20230708",
         route_name:'LN20230708'
       },
       {
         route_no:"20230712",
         route_name:'LN20230712'
       },
       {
         route_no:"20230722",
         route_name:'LN20230722'
       },

     ],
     optionhis:{
       "title": "",
       "titleSize": "h5",
       "exportBtn": true,
       header:false,
       "card": true,
       "page": false,
       "border": true,
       "index": true,
       "indexLabel": "SN",
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
           label:'SN',
           prop:'route_no'
         },{
           label:'RouteName',
           prop:'route_name'
         }
       ]
     },
     hxviewobj:{},
     //历史航线
     datekey:"",
     hisdate:"",
     selectionsY: [],
     selectionsM: [],
     selectionsD: [],
     valueY: {},
     valueM: {},
     valueD: {},

     isbig:false,
     divwidth:670,
     divheight:580,
     refreshkey:null,
     tab_radio:"0",
     comparestart_radio:"Shanghai",
     compareend_radio:"Rotterdam",
     legendName:"Risk RIO",
     myLegendItems: [],

     isFullscreen:false,
     legshow:true,
     showTools: false,
     replan_startPoint: null,
     toolsArr:[
       {label:"Risk RIO",icon:"el-icon-s-promotion"},
       {label:"Route Area",icon:"el-icon-s-promotion"},
       {label:"Ice the route",icon:"el-icon-s-promotion"},
       {label:"Temperature prediction",icon:"el-icon-s-promotion"},
       {label:"Navigation view",icon:"el-icon-s-promotion"},
       {label:"Info Panel",icon:"el-icon-s-promotion"},
       {label:"Date Picker",icon:"el-icon-s-promotion"},
       {label:"Navigation calculation process",icon:"el-icon-s-promotion"}
     ],
     activeArr:[],
     toolsType:"",
     //地图控件
     controlleroptions: {
         enableCompass: true,
         enableZoomControl: true,
         // enableZoomControl: {
         //   // 缩放比例
         //    zoomAmount: 2,
         //   // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是经纬度{lng: number, lat: number, height: number}或者 rectangle{west: number,south: number,east: number,north: number}
         //   defaultResetView: {
         //     lng: 105, lat: 29.999999999999993, height: 19059568.497290563, heading: 360, pitch: -90, roll: 0
         //   },
         //   overrideCamera: false
         // },
         enableDistanceLegend: false,
         enableLocationBar: false,
         // enableLocationBar: {
         //   // 获取更精确的高程
         //   gridFileUrl: './statics/SampleData/WW15MGH.DAC'
         //   rangType: 0 // 0 1 2
         // },
         enableCompassOuterRing: true,
         enablePrintView: true,
         // enablePrintView: {
         //   // 是否添加 Credit
         //   showCredit: true,
         //   // 是否自动打印
         //   printAutomatically: false
         // },
         // enableMyLocation: true,
         enableMyLocation: {
           // 使用高德api定位
           amap: {
             key: '42d22e6ed83f077bc28b7864718726de'
           }
         }
      },
      windData: {},
      particleSystemOptions: {
        particlesTextureSize: 128,
        maxParticles: 128 * 128,
        particleHeight: 100.0,
        fadeOpacity: 0.996,
        dropRate: 0.003,
        dropRateBump: 0.01,
        speedFactor: 4.0,
        lineWidth: 4.0
      },
      temperature_show:false,
      windy_show:false,
      seafog_show:false,
      routerio_show:false,
      routearea_show:false,
      floatice_show:false,
      checkedStarts:[],
      checkedEnds:[],
      compstarts:["Shanghai","Dalian"],
      compends:["Rotterdam","Murmansk","Sabetta","Tiksi","Pevek"],
      comp_startpoints:{
        "Shanghai":[121.507794,31.268902],
        "Dalian":[121.623928,38.936692]
      },
      comp_endpoints:{
        "Rotterdam":[4.477732,51.9244201],
        "Murmansk":[68.98412,33.061],
        "Sabetta":[71.27882,72.06001],
        "Tiksi":[71.64757,128.8989],
        "Pevek":[69.68932,170.2583]
      },
      heatMap:null,
      economy:{},
      geoJsonData : {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              'type': 'attack',
              'color': 'blue'
            },
            "geometry": {
              "coordinates": [
                [
                  83.22694848505176,
                  81.102575548938887
                ],
                [
                  75.2883052019069,
                  80.08305373636948
                ]
              ],
              "type": "LineString"
            }
          },{
            "type": "Feature",
            "properties": {
              'type': 'attack',
              'color': 'blue'
            },
            "geometry": {
              "coordinates": [
                [
                  86.22694848505176,
                  81.102575548938887
                ],
                [
                  79.1883052019069,
                  79.18305373636948
                ]
              ],
              "type": "LineString"
            }
          },{
            "type": "Feature",
            "properties": {
              'type': 'attack',
              'color': 'blue'
            },
            "geometry": {
              "coordinates": [
                [
                  75.22694848505176,
                  80.102575548938887
                ],
                [
                  59.1883052019069,
                  77.98305373636948
                ]
              ],
              "type": "LineString"
            }
          },{
            "type": "Feature",
            "properties": {
              'type': 'attack',
              'color': 'blue'
            },
            "geometry": {
              "coordinates": [
                [
                  78.22694848505176,
                  79.102575548938887
                ],
                [
                  56.8883052019069,
                  75.88305373636948
                ]
              ],
              "type": "LineString"
            }
          },{
            "type": "Feature",
            "properties": {
              'type': 'attack',
              'color': 'blue'
            },
            "geometry": {
              "coordinates": [
                [
                  60.32694848505176,
                  77.602575548938887
                ],
                [
                  49.6883052019069,
                  74.58305373636948
                ]
              ],
              "type": "LineString"
            }
          }
        ]
      }
    }
  },
  components: {
    fullScreen,
    radarChart,
    calendarChart,
    lineChart,
    line3DChart,
    datepanels,
    customLegend,
    canPassEcharts,
    speedChart
  },
  created() {
    console.log(this.requrl);
    this.startdate = getyyyy_MM_dd(new Date(),'-');
    this.beforestartdate = getyyyy_MM_dd(new Date(),'-');
    this.routeingstartdate = getyyyy_MM_dd(new Date(),'-');
    //this.dateRange = [this.startdate,this.startdate];
    this.rangedate = getyyyyMMddPlusDay(180,'-');
    this.Cesium = Cesium;
    for(let y = 2012;y <= 2020; y++){
      this.selectionsY.push({name:y,value:y,disabled:false});
    }
    this.valueY = this.selectionsY[0];
    for(let m = 7;m <= 10; m++){
      this.selectionsM.push({name:m<=9?"0"+m:m,value:m,disabled:false});
    }
    this.valueM = this.selectionsM[0];
    this.hisdate = this.valueY.name+"-"+this.valueM.name+"-01";
    //this.$message(this.hisdate)
    this.isFullscreen = onresize();
    let ranges = getLegendRanges('route','forecast');
    let orderKeys = Object.keys(ranges).sort((a, b) => a - b);
    this.myLegendItems = [];
    orderKeys.map((k) => {
      this.myLegendItems.push({title: k, color: ranges[k]})
    });
    // 监听事件
    window.addEventListener('resize',()=>{
       onresize();
       //this.resizeMapKey = new Date().getTime();
    });
  },
  mounted() {
    this.timeFn();
    this.cancelLoading();

      //注册的token有问题
       Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNzdhOTgxZS0zMzMwLTQ4YTAtYjlkNy1kMDRmNzU3ZjI2MjgiLCJpZCI6NjIyMzUsImlhdCI6MTYyNjg1MDU1OH0.ETpPvP99Sze2XW5JByp2vyK1F6R_P9Ojn-W7OE8KeA8';
       /*
       const worldTerrain = Cesium.createWorldTerrain({ requestWaterMask: true, // 添加水面波浪效果
         requestVertexNormals: true // 添加地形光照
       })
       */
      //设置默认视角
       // 初始化Cesium Viewer实例
       this.viewer = new Cesium.Viewer(this.$refs.cesiumContainer, {
         //地形
         // terrainProvider: worldTerrain

         //地形2
         //terrainProvider: new Cesium.CesiumTerrainProvider({ url: Cesium.IonResource.fromAssetId(1) }),
         homeButton: false,
         sceneModePicker: false,
         baseLayerPicker: false, // 影像切换
         animation: false, // 是否显示动画控件
         infoBox: false, // 是否显示点击要素之后显示的信息
         selectionIndicator: false, // 要素选中框
         geocoder: false, // 是否显示地名查找控件
         timeline: false, // 是否显示时间线控件
         fullscreenButton: false,
         shouldAnimate: false,
         navigationHelpButton: false ,// 是否显示帮助信息控件
         // 经纬度投影，经纬度-180~180，-90~90（切片方案的x和y比例是2:1）
         tilingScheme : new Cesium.GeographicTilingScheme(),

         orderIndependentTranslucency: false,
         contextOptions:{
           webgl:{alpha: true}
         }
       });

       this.viewer.imageryLayers.removeAll();
       //this.removeLayers();
       //隐藏logo
       this.viewer.cesiumWidget.creditContainer.style.display = "none";

       //加载天地图
       let token = 'a0e5adf3f1b5ec9d9a57465febe6baad';
       // 服务域名
       let tdtUrl = 'https://t{s}.tianditu.gov.cn/';
       // 服务负载子域
       let subdomains=['0','1','2','3','4','5','6','7'];
       // 叠加影像服务
       let tdtimgMap = new Cesium.UrlTemplateImageryProvider({
           url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
           subdomains: subdomains,
           tilingScheme : new Cesium.WebMercatorTilingScheme(),
           maximumLevel : 18,
           style:'img_c'
       });
      /*
       let tdtimgMap = new Cesium.WebMapTileServiceImageryProvider({
           url: "http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
               "&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
               "&style=default&format=tiles&tk="+ token,
           layer: "tdtCva",
           style: "default",
           format: "tiles",
           tileMatrixSetID: "c",
           subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
           tilingScheme: new Cesium.GeographicTilingScheme(),
           tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
           maximumLevel: 18
       })
      */
       this.viewer.imageryLayers.addImageryProvider(tdtimgMap);

      /*
      let bingMap = new Cesium.BingMapsImageryProvider({
              url: this.url,
              key: this.bmKey,
              mapStyle: Cesium.BingMapsStyle.AERIAL
          });

      this.viewer.imageryLayers.addImageryProvider(bingMap);
      */
       const position = Cesium.Cartesian3.fromDegrees(180.1, 90.1, 13000000) //可以根据需求选择坐标与坐标类型
         this.viewer.camera.setView({
             destination: position,                  // 相机位置
             orientation: {
                 heading: Cesium.Math.toRadians(360), // 水平旋转  -正北方向
                 pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                 roll: 0 // 视口翻滚角度
                 }
         });
       //this.viewer.scene.globe.enableLighting = true
       // // 添加默认图层
       // const imageryProvider = this.$Cesium.createWorldImagery()
       // viewer.imageryLayers.addImageryProvider(imageryProvider)

       // // 设置相机视角
       // viewer.camera.flyTo({
       //   destination: this.$Cesium.Cartesian3.fromDegrees(116.3974, 39.9092, 15000000.0)
       // })
      let _this = this;
       //鼠标经过显示经纬度
        let handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handler.setInputAction(function (movement) {
         //动态经纬度视角高度
        var longitude_show = document.getElementById('longitude_show')
        var latitude_show = document.getElementById('latitude_show')
        var altitude_show = document.getElementById('altitude_show')
        //具体事件的实现
        var ellipsoid = _this.viewer.scene.globe.ellipsoid;
        //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
        var cartesian = _this.viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
        if (cartesian) {
            //将笛卡尔三维坐标转为地图坐标（弧度）
            var cartographic = _this.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
            //将地图坐标（弧度）转为十进制的度数
            var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
            var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
            var alti_String = (_this.viewer.camera.positionCartographic.height / 1000).toFixed(2);
            longitude_show.innerHTML = log_String;
            latitude_show.innerHTML = lat_String;
            //altitude_show.innerHTML = alti_String;
        }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

       // 创建指北针小部件并将其添加到地图
       const options = {
           // 默认视角
           defaultResetView: Cesium.Cartographic.fromDegrees(180.1, 90.1, 13000000),
           //相机方向
           orientation: {pitch: Cesium.Math.toRadians(-45)},
           //相机延时
           // duration = 4, //默认为3s
           // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
           enableCompass: true,
           // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
           enableZoomControls: true,
           // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
           enableDistanceLegend: true,
           // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
           enableCompassOuterRing: true, //修改重置视图的tooltip
           resetTooltip: "Reset",
           // 修改放大按钮的tooltip
           zoomInTooltip: "Zoomin",
           // 修改缩小按钮的tooltip
           zoomOutTooltip: "Zoomout"
       };
      this.viewer.extend(Cesium.viewerCesiumNavigationMixin, options);
      this.viewer.scene.skyBox.show = false;
      this.viewer.scene.backgroundColor = new Cesium.Color(0,0,0,0);
      //禁止旋转
      //this.viewer.scene.screenSpaceCameraController.enableRotate = false;
      //禁止中键旋转视角
      this.viewer.scene.screenSpaceCameraController.enableTilt = false;
      //开启地形检测
      this.viewer.scene.globe.depthTestAgainstTerrain = false; //默认为false
      //this.windy();
      //this.linetrace();
  },
  beforeDestroy () {
    clearInterval(this.timing);
    // 取消监听事件
    window.removeEventListener('resize', ()=>{
       onresize();
    });
  },
  methods: {
    handlerClickLi(index){
      let tselect = 'tools'+index
      if(this.activeArr.indexOf(tselect) > -1){
          let ind = this.activeArr.indexOf(tselect);
          if (ind > -1) {
              this.activeArr.splice(ind, 1);
          }
      }else{
        this.activeArr.push(tselect);
      }

      this.toolsType = tselect;

      if(index == 0 && this.activeArr.indexOf(tselect) > -1){
        this.loadRiskRIO();
        this.dialogVisableHis = true;
        this.dataVisibleLegend = true;
      }else if(index == 1 && this.activeArr.indexOf(tselect) > -1){
        this.loadCanPassage();
        this.dialogVisableHis = true;
        this.dataVisibleLegend = false;
      }else if(index == 6 && this.activeArr.indexOf(tselect) > -1){
        this.dialogVisableHis = true;
      }else{
        if(index == 0 && this.activeArr.indexOf(tselect) == -1){
            this.viewer.imageryLayers.remove(this.riskRIOareaLayer);
            this.dataVisibleLegend = false;
            this.dialogVisableHis = false;
        }
        if(index == 1 && this.activeArr.indexOf(tselect) == -1){
            this.viewer.imageryLayers.remove(this.canpassareaLayer);
            this.dialogVisableHis = false;
        }
        if(index == 6 && this.activeArr.indexOf(tselect) == -1){
            this.dialogVisableHis = false;
        }

      }
      //this.activeName = 'tools'+index;
    },
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

            //加载  bingMap
            /*
            let bingMap = new Cesium.BingMapsImageryProvider({
                    url: this.url,
                    key: this.bmKey,
                    mapStyle: Cesium.BingMapsStyle.AERIAL
                });

            //viewer.imageryLayers.addImageryProvider(bingMap);
            this.bingmapLayer = bingMap;
            */
            //加载天地图
            let token = 'a0e5adf3f1b5ec9d9a57465febe6baad';
            // 服务域名
            let tdtUrl = 'https://t{s}.tianditu.gov.cn/';
            // 服务负载子域
            let subdomains=['0','1','2','3','4','5','6','7'];
            // 叠加影像服务
            let tdtimgMap = new Cesium.UrlTemplateImageryProvider({
                url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
                subdomains: subdomains,
                tilingScheme : new Cesium.WebMercatorTilingScheme(),
                maximumLevel : 18,
                style:'img_c'
            });
            viewer.imageryLayers.addImageryProvider(tdtimgMap);
            /*
            viewer.scene.skyBox.show = false; //去掉天空盒子
            viewer.scene.backgroundColor = new Cesium.Color(0, 0, 0, 0); //设置场景背景色透明，便于显示自定的背景
            viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0); //修改地邱球体背景透明
            viewer.scene.imageryLayers.removeAll();//去除其他图层
            viewer.scene.globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0);
            */

           //设置默认坐标系
           /*
           viewer.mapProjection = new Cesium.GeographicProjection(Cesium.Ellipsoid.WGS84);
           viewer.scene.globe.depthTestAgainstTerrain = false;
           viewer.scene.logarithmicDepthBuffer = false;
           //arctic:NO_ICE_rv_2012-07-01 /geoserver/arctic/wms
           //arctic:concentration_2012-07-01

           // Add a GEOSERVER WMS imagery layer
           /*
           var provider = new Cesium.WebMapServiceImageryProvider({
                 id:"concentration_2012-07-01",
                 url: this.requrl+'/geoserver/arctic/wms',
                 layers: 'arctic:concentration_2012-07-01',
                 parameters: {
                     service : 'WMS',
                     format: 'image/png',
                     transparent: true
                 }
             });
           viewer.imageryLayers.addImageryProvider(provider);//加载geoserver 发布的wms服务
          */

            //鼠标经过显示经纬度
             let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
             handler.setInputAction(function (movement) {
              //动态经纬度视角高度
             var longitude_show = document.getElementById('longitude_show')
             var latitude_show = document.getElementById('latitude_show')
             var altitude_show = document.getElementById('altitude_show')
             //具体事件的实现
             var ellipsoid = viewer.scene.globe.ellipsoid;
             //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
             var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
             if (cartesian) {
                 //将笛卡尔三维坐标转为地图坐标（弧度）
                 var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                 //将地图坐标（弧度）转为十进制的度数
                 var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
                 var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
                 var alti_String = (viewer.camera.positionCartographic.height / 1000).toFixed(2);
                 longitude_show.innerHTML = log_String;
                 latitude_show.innerHTML = lat_String;
                 //altitude_show.innerHTML = alti_String;
             }
             }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          },
          removeLayers(){
            let viewer = this.viewer;
              let layerList = []
              for(let i= 0;i<viewer.imageryLayers.length;i++){
                let layer = viewer.imageryLayers.get(i)
                layerList.push(layer)
              }
              layerList.forEach((item,index) => {
                if(index !== 0){
                  viewer.imageryLayers.remove(item);
                }
              });
              viewer.entities.removeAll();
              viewer.dataSources.removeAll();
              //viewer.camera.flyHome(5);
          },
              cb_hide(type){
                setTimeout(()=>{
                  if(type == 1){
                    this.showDialogRou = false;
                  }else if(type == 2){
                    this.showDialogEco = false;
                  }else{
                    this.showDialogAcc = false;
                  }
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
                        text: 'Ship Location now',
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
                    // 结束时间
                    this.stop = this.Cesium.JulianDate.addSeconds(this.start, 120, new Cesium.JulianDate());
                    let property = this.createProperty(data);
                    this.viewer.trackedEntity = this.viewer.entities.add({
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
                  this.$message.warning("Must keep one...");
                  return;
                }
                this.form.channel_arr.splice(index, 1)
              },
              pin_startpoint(lng,lat,name){
                this.viewer.entities.removeById("hx_start_point");
                let  label = this.getLabel(name);
                let poly = this.viewer.entities.add({  //添加实体
                id:'hx_start_point',
                  position: new this.Cesium.Cartesian3.fromDegrees(lng, lat, 0), //添加实体的位置信息
                  point: {
                      pixelSize: 1,   //设置小点  基本看不见
                      color: new Cesium.Color(0.0, 0.0, 0.0, 0.0)  //颜色设置透明
                  },
                  label: label,
                  billboard: {
                      image: startpin_icon,
                      width: 40,  // 图片宽度,单位px
                      height: 40, // 图片高度，单位px
                      pixelOffset: new Cesium.Cartesian2(0, 10),
                      eyeOffset: new Cesium.Cartesian3(0, -30, 0),//与坐标位置的偏移距离
                      color: Cesium.Color.RED,//颜色
                      scale: 1,   // 缩放比例
                    }
                });
              },
              pin_endpoint(lng,lat,name){
                this.viewer.entities.removeById("hx_end_point");
                let  label = this.getLabel(name);
                let poly = this.viewer.entities.add({  //添加实体
                id:'hx_end_point',
                  position: new this.Cesium.Cartesian3.fromDegrees(lng, lat, 0), //添加实体的位置信息
                  point: {
                      pixelSize: 1,   //设置小点  基本看不见
                      color: new Cesium.Color(0.0, 0.0, 0.0, 0.0)  //颜色设置透明
                  },
                  label: label,
                  billboard: {
                      image: endpin_icon,
                      width: 40,  // 图片宽度,单位px
                      height: 40, // 图片高度，单位px
                      pixelOffset: new Cesium.Cartesian2(0, 10),
                      eyeOffset: new Cesium.Cartesian3(0, -30, 0),//与坐标位置的偏移距离
                      color: Cesium.Color.LIGHTGREEN,//颜色
                      scale: 1,   // 缩放比例
                    }
                });
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

                      _this.hx_longitude1 = lng;
                      _this.hx_latitude1 = lat;



                      //let pick = viewer.scene.pick(movement.position)
                    //这时候就可以用了
                      if (flag <= 1) {
                        flag++; //本次我只需要两个点 所以设了节流阀，放开就可以多次画点
                        let poly = _this.viewer.entities.add({  //添加实体
                        id:'hx_start_point',
                          position: new _this.Cesium.Cartesian3.fromDegrees(lng, lat, 0), //添加实体的位置信息
                          /*
                          point: { //添加点
                            pixelSize: 25, //添加点的大小

                            color: _this.Cesium.Color.fromCssColorString('#ee0000'),
                            // 边框颜色
                            outlineColor: _this.Cesium.Color.fromCssColorString('#fff'),
                            // 边框宽度(像素)
                            outlineWidth: 2
                          },
                          */
                          point: {
                              pixelSize: 1,   //设置小点  基本看不见
                              color: new Cesium.Color(0.0, 0.0, 0.0, 0.0)  //颜色设置透明
                          },
                          billboard: {
                              image: startpin_icon,
                              width: 40,  // 图片宽度,单位px
                              height: 40, // 图片高度，单位px
                              pixelOffset: new Cesium.Cartesian2(0, 10),
                              eyeOffset: new Cesium.Cartesian3(0, -30, 0),//与坐标位置的偏移距离
                              color: Cesium.Color.RED,//颜色
                              scale: 1,   // 缩放比例
                            }
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

                      _this.hx_longitude2 = lng;
                      _this.hx_latitude2 = lat;



                      //let pick = viewer.scene.pick(movement.position)
                    //这时候就可以用了
                      if (flag <= 1) {
                        flag++; //本次我只需要两个点 所以设了节流阀，放开就可以多次画点
                        let poly = _this.viewer.entities.add({  //添加实体
                        id:'hx_end_point',
                          position: new _this.Cesium.Cartesian3.fromDegrees(lng, lat, 0), //添加实体的位置信息
                          /*
                          point: { //添加点
                            pixelSize: 25, //添加点的大小
                            color: _this.Cesium.Color.fromCssColorString('#ff8200'),
                            // 边框颜色
                            outlineColor: _this.Cesium.Color.fromCssColorString('#fff'),
                            // 边框宽度(像素)
                            outlineWidth: 2
                          },
                          */
                         point: {
                             pixelSize: 1,   //设置小点  基本看不见
                             color: new Cesium.Color(0.0, 0.0, 0.0, 0.0)  //颜色设置透明
                         },
                         billboard: {
                             image: endpin_icon,
                             width: 40,  // 图片宽度,单位px
                             height: 40, // 图片高度，单位px
                             pixelOffset: new Cesium.Cartesian2(0, 10),
                             eyeOffset: new Cesium.Cartesian3(0, -30, 0),//与坐标位置的偏移距离
                             color: Cesium.Color.LIGHTGREEN,//颜色
                             scale: 1,   // 缩放比例
                           }
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
              viewfx(row){
                  //this.hxviewobj = row;
                  //this.dialogVisableHxview = true;
              },
              comparehx(row){

              },
              changeVal(val,type){
                  if(type == 'yyyy'){
                    this.valueY = val;
                  }else if(type == 'mm'){
                    this.valueM = val;
                  }else{
                    this.valueD = val;
                  }
                  this.hisdate = this.valueY.name+"-"+this.valueM.name+"-"+this.valueD.name;
                  if(this.toolsType == 'tools0'){//tools0 风险RIO
                    this.loadRiskRIO();
                  }else if(this.toolsType == 'tools1'){//tools1 通航区域
                    this.loadCanPassage();
                  }else{
                    this.loadHistoryRout();
                  }
                  //this.$message.success("当前选择的时间为："+this.valueY.name+"-"+this.valueM.name+"-"+this.valueD.name);
              },
              getDays(valueY,valueM){
                this.selectionsD = [];
                //获取某月的天数
                let days = new Date(valueY, valueM, 0).getDate()
                for(let d = 1;d <= days; d++){
                  this.selectionsD.push({name:d<=9?"0"+d:d,value:d,disabled:false});
                }
                this.valueD = this.selectionsD[0];
              },
              drawPoints(position,type){
                let curlocation = curloc_icon;
                if(type == 'start'){
                  curlocation = start_icon;
                }else if(type == 'end'){
                  curlocation = end_icon;
                }else if(type == 'curloc'){
                  curlocation = curloc_icon;
                }else{
                  curlocation = direction_icon;
                }

                let iconscale = type == 'curloc'?0.15:0.22;
                if(type.indexOf('direction') > -1){
                    iconscale = 0.02;
                }
                  /*绘制起始点*/
                  var x = 1;
                  var flog = true;
                  let _this = this;
                  let direntity = {  //添加实体
                    id:'ship_location'+type,
                    position: position,//new _this.Cesium.Cartesian3.fromDegrees(105.5765, 79.3319, 0), //添加实体的位置信息
                    billboard:{
                        image:curlocation,
                        pixelOffset: new _this.Cesium.Cartesian2(-3, -15),
                        scale: iconscale,
                        show: new _this.Cesium.CallbackProperty(function () {
                          if(type != 'curloc'){
                            return;
                          }
                            if (flog) {
                                x = x - 0.05;
                                if (x <= 0) {
                                    flog = false;
                                }
                            } else {
                                x = x + 0.05;
                                if (x >= 1) {
                                    flog = true;
                                }
                            }
                            return x >= 0.5;
                        },false),
                        distanceDisplayCondition: new _this.Cesium.DistanceDisplayCondition(0, 6.8e10)
                      }
                  };
                  let poly = _this.viewer.entities.add(direntity);
                  return direntity;
                  //this.viewer.trackedEntity = direntity;
              },
              loadHistoryRout(){
                this.dialogVisableHis = true;
                this.dialogVisableShfx = false;
                this.datekey = new Date().getTime();
                let hisd = this.hisdate;
                this.removeLayers();
                var provider = new this.Cesium.WebMapServiceImageryProvider({
                      url: this.requrl+'/geoserver/arctic/wms',
                      layers: 'arctic:NO_ICE_rv_'+hisd,
                      parameters: {
                          service : 'WMS',
                          format: 'image/png',
                          transparent: true
                      }
                  });
                this.hisrouteLayer = this.viewer.imageryLayers.addImageryProvider(provider);
              },

              loadHistoryIntensity(){
                this.dialogVisableShfx = true;
                this.dialogVisableHis = false;
                this.datekey = new Date().getTime();
                let hisd = this.hisdate;

                this.removeLayers();

                var provider = new this.Cesium.WebMapServiceImageryProvider({
                      url: this.requrl+'/geoserver/arctic/wms',
                      layers: 'arctic:concentration_'+hisd,
                      parameters: {
                          service : 'WMS',
                          format: 'image/png',
                          transparent: true
                      }
                  });
                this.hisrouteLayer = this.viewer.imageryLayers.addImageryProvider(provider);
              },
              loadchannelLine(type){


                /*绘制路线*/

                let _this = this;
                let linepoints = [];
                var promise = this.Cesium.GeoJsonDataSource.load(this.requrl+'/geojson/passage/history/NO_ICE_passage_2012-08-15.geojson',
                  {clampToGround: true});
                    promise.then(datasource=>{
                      _this.viewer.dataSources.add(datasource);
                      datasource.entities.values.forEach((enetity,index)=>{
                        //enetity.polyline.material= _this.Cesium.Color.BLUE;
                        enetity.polyline.material = new Cesium.PolylineDashMaterialProperty({
                          dashLength: 35, //短划线长度
                          color: Cesium.Color.BLUE
                        });
                        enetity.polyline.width = 3;
                        // enetity.polygon.height=1000;
                        // enetity.polygon.extrudedHeight=2000;
                      });
                      let poss = datasource.entities.values[0].polyline.positions.getValue();

                      if(type){
                        let routed = [];
                        for(let k=0;k<Math.floor(poss.length/4);k++){
                          routed.push(poss[k])
                        }
                        var polyline = this.viewer.entities.add({
                            polyline: {
                                positions: routed,
                                width: 6,
                                //arcType: this.Cesium.ArcType.NONE,
                                material: new this.Cesium.PolylineArrowMaterialProperty(
                                  this.Cesium.Color.YELLOW
                                )
                                //material: new this.Cesium.PolylineArrowMaterialProperty({color: this.Cesium.Color.RED})
                            }
                        });

                        //已经航行的线
                        let positioned = routed[Math.floor(routed.length/3)];

                        let  labeled = this.getLabel('ship sailed');
                        let pointed = this.viewer.entities.add({   //点
                            id:'positioned',
                            position:positioned,
                            point: {
                                pixelSize: 1,   //设置小点  基本看不见
                                color: new Cesium.Color(0.0, 0.0, 0.0, 0.0)  //颜色设置透明
                            },
                            //label: labeled,
                            billboard: {
                                image: sailed_icon,
                                width: 100,  // 图片宽度,单位px
                                height: 40, // 图片高度，单位px
                                pixelOffset: new Cesium.Cartesian2(0, -30),
                                eyeOffset: new Cesium.Cartesian3(0, -5, 0),//与坐标位置的偏移距离
                                //color: Cesium.Color.RED,//颜色
                                scale: 1.8,   // 缩放比例
                              }
                        });
                        //未航行的线
                        let toposition = poss[Math.floor(poss.length/1.2)]
                        let tolabel = this.getLabel('ship unsailed');
                        let topoint = this.viewer.entities.add({   //点
                            id:'toposition',
                            position:toposition,
                            point: {
                                pixelSize: 1,   //设置小点  基本看不见
                                color: new Cesium.Color(0.0, 0.0, 0.0, 0.0)  //颜色设置透明
                            },
                            //label: tolabel,
                            billboard: {
                                image: unsailed_icon,
                                width: 100,  // 图片宽度,单位px
                                height: 40, // 图片高度，单位px
                                pixelOffset: new Cesium.Cartesian2(0, -30),
                                eyeOffset: new Cesium.Cartesian3(0, -5, 0),//与坐标位置的偏移距离
                                //color: Cesium.Color.RED,//颜色
                                scale: 1.8,   // 缩放比例
                              }
                        });

                        let shipcurrentPoint = poss[Math.floor(poss.length/4)];
                        this.drawPoints(shipcurrentPoint,'curloc');
                        this.replan_startPoint = shipcurrentPoint;
                      }
                      let startpoint = poss[0],endpoint = poss[poss.length-1];
                      this.drawPoints(startpoint,'start');
                      this.drawPoints(endpoint,'end');
                      //方向箭头暂时屏蔽

                      let direction_point = this.getRandomArrayElements(poss,(poss.length+"").length+10);
                      if(direction_point.length > 0){
                        for(let i=0;i<direction_point.length;i++){
                          this.drawPoints(direction_point[i],'enddirection'+i);
                        }
                      }

                      //_this.viewer.zoomTo(datasource)
                    })
              },
              loadCanPassArea(){
                //可通航区域 无填充
                let _this = this;
                var promise = this.Cesium.GeoJsonDataSource.load(this.requrl+'/geojson/buffer/v3_irregular_NO_ICE_passage_buffer_2023-10-11.geojson',
                  {clampToGround: true});
                    promise.then(datasource=>{
                      _this.viewer.dataSources.add(datasource);
                      datasource.entities.values.forEach((enetity,index)=>{
                        enetity.polygon.material = _this.Cesium.Color.BLUE.withAlpha(0);
                        enetity.polygon.outline = true;
                        enetity.polygon.outlineColor = _this.Cesium.Color.LIGHTGREEN.withAlpha(1);
                        enetity.polygon.outlineWidth = 2;
                        enetity.polygon.zIndex=1000;
                        enetity.polygon.height=10000;
                        // enetity.polygon.extrudedHeight=2000;
                      });
                    })
              },
              //通航区域
              loadCanPassage(){
                this.viewer.imageryLayers.remove(this.canpassareaLayer);
                let hisd = this.hisdate;
                //this.removeLayers();
                var provider = new this.Cesium.WebMapServiceImageryProvider({
                      url: this.requrl+'/geoserver/arctic/wms',
                      layers: 'arctic:NO_ICE_passage_buffer_'+hisd,
                      parameters: {
                          service : 'WMS',
                          format: 'image/png',
                          transparent: true
                      }
                  });
                  this.dataVisibleLegend = false;
                  this.dataVisibleLegendLine = false;
                this.canpassareaLayer = this.viewer.imageryLayers.addImageryProvider(provider);
              },
              //前方1330公里区域
              loadChannelArea(){
                this.viewer.imageryLayers.remove(this.channelareaLayer);
                let hisd = this.hisdate;
                //this.removeLayers();
                var provider = new this.Cesium.WebMapServiceImageryProvider({
                      url: this.requrl+'/geoservernew/channel/wms',
                      layers: 'channel:thickness_2014-09-01_Part',
                      parameters: {
                          service : 'WMS',
                          format: 'image/png',
                          transparent: true
                      }
                  });
                this.channelareaLayer = this.viewer.imageryLayers.addImageryProvider(provider);
                /*
                let rect = provider.rectangle;
                let west = 14.03826;
                let south = 72.015;
                let east = 108.6507;
                let north = 87.31572;
                let rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

                this.viewer.camera.flyTo({ destination: rectangle });
                */
               //this.viewer.flyTo(this.channelareaLayer,{duration: 5});
              },
              //通航区域
              loadRiskRIO(){
                this.viewer.imageryLayers.remove(this.riskRIOareaLayer);
                let hisd = this.hisdate;
                //this.removeLayers();
                var provider = new this.Cesium.WebMapServiceImageryProvider({
                      url: this.requrl+'/geoserver/arctic/wms',
                      layers: 'arctic:NO_ICE_rv_'+hisd,
                      parameters: {
                          service : 'WMS',
                          format: 'image/png',
                          transparent: true
                      }
                  });
                  this.dataVisibleLegend = true;
                this.riskRIOareaLayer = this.viewer.imageryLayers.addImageryProvider(provider);
              },
              beforecanpass(){
                this.removeLayers();
                this.dialogVisableCanPass = true;
                this.dialogVisable = false;
                this.dataVisible = false;
                this.navPeriodVisible = false;
                this.dialogVisableys = false;
                this.dialogVisableHxdb = false;
                this.dialogVisableHxview = false;
                this.dataVisibleLegendLine = false;
              },
              beforeroute(){
                this.removeLayers();
                this.dialogVisable = true;
                this.dialogVisableys = true;
                this.dataVisible = false;
                this.navPeriodVisible = true;
                this.dataVisibleLegend = false;
                this.dataVisibleLegendLine = false;
                this.dialogVisableHxdb = false;

                this.dialogVisableCanPass = false;
                this.dialogVisableHxview = false;
                this.dia_type = 1;
                this.dia_title='Strategic stage';
                this.refreshkey=new Date().getTime();
              },
              routebeforeSubmit(){
                let loading = this.loadinging();
                this.dialogVisable = true;
                this.dataVisible = true;
                this.loadchannelLine(false);
                this.loadHistoryRout();
                this.dialogVisableHis = false;
                this.dataVisibleLegend = true;
                this.dataVisibleLegendLine = false;
                let _this = this;
                setTimeout(()=>{
                  loading.close();
                  _this.dialogVisableys = false;
                },2000);

                reqData(
                  this.requrl+'/user_passage',
                  'get',
                  Object.assign(
                    {
                      date:"2023-09-01",
                      start_lat:"78",
                      start_lon:"162",
                      end_lat:"82",
                      end_lon:"129",
                      ship_type:"NO_ICE"
                    }
                  )
                ).then(response => {
                  if (response.status == "OK") {
                    console.log( response.msg);
                    let datasource = response.msg;
                    this.economy = datasource.economy;
                    //_this.viewer.dataSources.add(datasource.passage);
                  }
                })

              },
              routeing(){
                this.removeLayers();
                this.dialogVisable = true;
                this.dialogVisableys = true;
                this.dataVisible = false;
                this.navPeriodVisible = false;
                this.dataVisibleLegend = false;
                this.dataVisibleLegendLine = false;
                this.dialogVisableCanPass = false;
                this.dialogVisableHxview = false;
                this.dialogVisableHxdb = false;
                this.dia_type = 3;
                this.dia_title='Tactical stage';
                this.refreshkey=new Date().getTime();
                this.loadchannelLine(true);
                //this.loadCanPassArea();
              },
              routeing_replan(){
                this.dataVisible = false;
                var entity = this.viewer.entities.getById('newroute');
                if (Cesium.defined(entity)) {
                    this.viewer.entities.remove(entity);
                }
                let loading = this.loadinging();
                this.dataVisible = true;
                let positions = [this.replan_startPoint];
                let replanPoints = this.Cesium.Cartesian3.fromDegreesArray([78.2705,79.8705,87.3254,81.5320,96.7541,81.2672])
                //let replanPoints = this.Cesium.Cartesian3.fromDegreesArray([45.8606,73.5605,78.5024, 157.4422,74.8052])
                positions = positions.concat(replanPoints);
                let line = {flog:true,flog2:true,x:2,x2:2};
                let _this = this;
                let newrouteline = new Cesium.Entity({
                        id:"newroute",
                        name: 'new route',
                        polyline: {
                            positions: positions,//_this.Cesium.Cartesian3.fromDegreesArray([105.5765, 79.3319,150.2626,78.5024, 157.4422,74.8052]),
                            //width: 4,
                            //material: _this.Cesium.Color.RED
                            material: new _this.Cesium.ColorMaterialProperty(new _this.Cesium.CallbackProperty(function () {
                                    if (line.flog2) {
                                        line.x2 = line.x2 - 0.015;
                                        if (line.x2 <= 0.3) {
                                            line.flog2 = false;
                                        }
                                    } else {
                                        line.x2 =
                                            line.x2 + 0.015;
                                        if (line.x2 >= 0.9) {
                                            line.flog2 = true;
                                        }
                                    }
                                    return new _this.Cesium.Color(
                                        255 / 255,
                                        0 / 255,
                                        0 / 255,
                                        line.x2
                                    );
                                }, false)),
                                width: new _this.Cesium.CallbackProperty(function () {
                                    if (line.flog) {
                                        line.x = line.x - 0.1;
                                        if (line.x <= 2) {
                                            line.flog = false;
                                        }
                                    } else {
                                        line.x =
                                            line.x + 0.1;
                                        if (line.x >= 2) {
                                            line.flog = true;
                                        }
                                    }
                                    return line.x;
                                }, false)
                        }

                    });
                  _this.viewer.entities.add(newrouteline);

                    //var west = parseFloat(经度);
                    //var south = parseFloat(纬度);
                    //var east = parseFloat(经度);
                    //var north = parseFloat(纬度);
                    /*
                    this.viewer.flyTo(newrouteline, {
                       duration: 5,
                       offset: new Cesium.HeadingPitchRange(90.0, Cesium.Math.toRadians(-90.0),5500000)
                    });
                    */
                let areaentity = this.viewer.entities.getById('replan_area');
                if (Cesium.defined(areaentity)) {
                    this.viewer.entities.remove(areaentity);
                }
                // 创建一个圆
                /*
                this.viewer.entities.add({
                    id:'replan_area',
                    position: positions[Math.floor(positions.length/2)],
                    ellipse: {
                      height: 1,
                      // 半短轴（画圆：半短轴和半长轴一致即可）
                      semiMinorAxis: 666000.0,
                      // 半长轴
                      semiMajorAxis: 666000.0,
                      // 填充色
                      material: Cesium.Color.RED.withAlpha(0.1),
                      // 是否有边框
                      outline: true,
                      // 边框颜色
                      outlineColor: Cesium.Color.WHITE,
                      // 边框宽度
                      outlineWidth: 4
                    },
                  });
                  */
                  //矩形

                  this.viewer.entities.add({
                    rectangle: {
                      coordinates: Cesium.Rectangle.fromDegrees(
                        49.25,
                        72.0,
                        93.15,
                        83.0,
                      ),
                      height: 1,
                      material: Cesium.Color.RED.withAlpha(0),
                      // 是否有边框
                      outline: true,
                      // 边框颜色
                      outlineColor: Cesium.Color.WHITE,
                      // 边框宽度
                      outlineWidth: 4,

                      stRotation: Cesium.Math.toRadians(45)
                    },
                  });


                //先删除
                var pointentity = this.viewer.entities.getById('reposition');
                if (Cesium.defined(pointentity)) {
                    this.viewer.entities.remove(pointentity);
                }
                //添加标识
                let reposition = positions[Math.floor(positions.length/2)];
                let  labeled = this.getLabel('replan route');
                let pointed = this.viewer.entities.add({   //点
                    id:'reposition',
                    position:reposition,
                    point: {
                        pixelSize: 1,   //设置小点  基本看不见
                        color: new Cesium.Color(0.0, 0.0, 0.0, 0.0)  //颜色设置透明
                    },
                    //label: labeled,
                    billboard: {
                        image: rerouted_icon,
                        width: 100,  // 图片宽度,单位px
                        height: 40, // 图片高度，单位px
                        pixelOffset: new Cesium.Cartesian2(0, -30),
                        eyeOffset: new Cesium.Cartesian3(0, -30, 0),//与坐标位置的偏移距离
                        //color: Cesium.Color.RED,//颜色
                        scale: 1.8,   // 缩放比例
                      }
                });

                _this.loadChannelArea();
                setTimeout(()=>{
                  loading.close();
                  //_this.zoomByBound(1);//1  大  0 小
                  _this.dialogVisableys = false;
                },2000);

                //添加图例
                let ranges = getLegendRanges('reroute','thickness');
                let orderKeys = Object.keys(ranges).sort((a, b) => a - b);
                this.myLegendItems = [];
                orderKeys.map((k) => {
                  this.myLegendItems.push({title: k, color: ranges[k]})
                });
                this.legendName = "Ice thickness";
                this.dataVisibleLegend = true;
                this.dataVisibleLegendLine = true;

                let stp_tmp = deepClone(this.replan_startPoint);
                stp_tmp.z = 12500000;
                this.viewer.camera.flyTo({ destination: stp_tmp });
                //this.drawLineGeojson();
              },
              drawLineGeojson() {
                let geoJsonData = this.geoJsonData;

                for (let index = 0; index < geoJsonData.features.length; index++) {
                  const coordinates = geoJsonData.features[index].geometry.coordinates;
                  const properties = geoJsonData.features[index].properties;
                  let arr = getAttackcoordinates(coordinates[0], coordinates[1], 15)
                  createAttackArrow(arr, properties,this.viewer,index)
                }
              },
              routecompare(){
                this.dialogVisableHxdb = true;
                this.dialogVisable = false;
                this.dialogVisableys = false;
                this.dataVisible = false;
                this.navPeriodVisible = false;
                this.dataVisibleLegend = false;
                this.dataVisibleLegendLine = false;
                this.dialogVisableCanPass = false;

                this.removeLayers();
                //默认选中第一个
                let strname = "Shanghai";
                let str_point = this.comp_startpoints[strname];
                this.hx_longitude1 = str_point[0];
                this.hx_latitude1 = str_point[1];
                this.pin_startpoint(this.hx_longitude1,this.hx_latitude1,strname);
                let endname = "Rotterdam";
                let end_point = this.comp_endpoints[endname];
                this.hx_longitude2 = end_point[0];
                this.hx_latitude2 = end_point[1];
                this.pin_endpoint(this.hx_longitude2,this.hx_latitude2,endname);
                //根据两点获取范围
                let comppoints = [this.hx_longitude1,this.hx_latitude1,this.hx_longitude2,this.hx_latitude2];
                let bounds = this.getExtent(comppoints);
                this.flyToExtent(bounds);
              },
              pickCenter() {
                  let ellipsoid = this.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(
                      this.viewer.canvas.clientWidth / 2,
                      this.viewer.canvas.clientHeight / 2));
                  let curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(ellipsoid);
                  let lon = curPosition.longitude * 180 / Math.PI;
                  let lat = curPosition.latitude * 180 / Math.PI;
                  return {
                      lon: lon,
                      lat: lat
                  };
              },
              zoomByBound(flag){
                  const center = this.pickCenter();
                  var height = this.viewer.camera.positionCartographic.height;
                  const camera = this.viewer.camera;
                  var boundingSph = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(center.lon, center.lat, 1000), height);
                  var moveRate = 0;
                  if(flag){
                      moveRate = 0.5
                  }else{
                      moveRate = 1.5
                  }
                  var zoomParams = {
                      duration: 0.8,
                      offset: new Cesium.HeadingPitchRange(camera.heading, camera.pitch, height * moveRate)
                  }
                  camera.flyToBoundingSphere(boundingSph,zoomParams);
              },
              showheatmap(){
                let bounds = {
                    west: 49.25,
                    east: 93.75,
                    south: 73.15186916,
                    north: 82.40314136
                };

                // init heatmap
                let heatMap = CesiumHeatmap.create(
                    this.viewer, // your cesium viewer
                    bounds, // bounds for heatmap layer
                    {
                        // heatmap.js options go here
                        "gradient": {
                            "0.05": "rgb(0,0,255)",
                            "0.25": "rgb(0 255 127)",
                            "0.45": "rgb(0,255,0)",
                            "0.65": "rgb(255 255 0)",
                            "0.85": "rgb(255 165 0)",
                            "1.00": "rgb(255,0,0)"
                        },
                        //radius: 100, // 热点半径
                        blur: 0.55, //模糊尺寸
                        maxOpacity: 0.85, // 最大不透明度
                        minOpacity: 0.16,  //最小不透明度
                    }
                );

                // random example data
                let data = [{x:51.39276766,y:72.75796864,value:2.299981689},{x:56.77348142,y:71.484957,value:2.026361084},{x:57.5,y:71.15183246,value:1.930047607},{x:58.65482156,y:71.9608492,value:1.928826904},{x:60.19035688,y:72.00843842,value:1.928308105},{x:61.25,y:71.77049232,value:1.848443604},{x:64.57013108,y:73.29334737,value:1.711602783},{x:65.82013108,y:73.29334737,value:1.55135498},{x:67.07013108,y:73.29334737,value:1.355554199},{x:68.32013108,y:73.29334737,value:1.251824951},{x:52.10660596,y:72.91515488,value:1.766412354},{x:55.86928624,y:71.66593786,value:1.637628174},{x:57.5,y:72.09424084,value:1.678094482},{x:58.70241078,y:72.61772226,value:1.707452393},{x:64.57013108,y:74.23575574,value:1.409692383},{x:65.82013108,y:74.23575574,value:1.127832031},{x:67.07013108,y:74.23575574,value:0.763360596},{x:68.32013108,y:74.23575574,value:0.679864502},{x:51.46415149,y:73.75048752,value:1.54140625},{x:52.5,y:73.03664921,value:1.402734375},{x:53.10754553,y:75.3566237,value:1.50612793},{x:56.53553532,y:72.22763247,value:1.860131836},{x:57.5,y:73.03664921,value:1.168572998},{x:59.79696284,y:73.27459532,value:1.287408447},{x:62.5,y:73.03664921,value:1.031671143},{x:67.5,y:73.03664921,value:0.801324463},{x:52.39214128,y:75.29965845,value:1.489434814},{x:52.5,y:73.97905759,value:1.474206543},{x:54.07122724,y:74.76427972,value:1.39095459},{x:58.75,y:73.97905759,value:0.856134033},{x:60,y:73.97905759,value:0.654626465},{x:61.25,y:73.97905759,value:0.776971436},{x:62.5,y:73.97905759,value:0.757531738},{x:67.5,y:73.97905759,value:0.833825684},{x:68.75,y:73.97905759,value:1.103662109},{x:70,y:73.97905759,value:1.633996582},{x:71.25,y:73.97905759,value:2.170831299},{x:72.00031319,y:75.33535036,value:2.475061035},{x:58.83077949,y:77.40548144,value:2.667596436},{x:60.5804663,y:77.88137364,value:2.968438721},{x:75.75031319,y:75.33535036,value:3.295343018},{x:79.21321192,y:76.47749165,value:3.582330322},{x:80.46321192,y:76.47749165,value:3.886834717},{x:81.71321192,y:76.47749165,value:4.303918457},{x:79.46540425,y:76.04918867,value:5.002618408},{x:80.71540425,y:76.04918867,value:5.504083252},{x:81.96540425,y:76.04918867,value:5.794793701},{x:51.86865986,y:74.96905519,value:1.2668396},{x:52.5,y:74.92146597,value:1.138543701},{x:53.75,y:74.92146597,value:0.948449707},{x:55,y:74.92146597,value:0.672143555},{x:63.75,y:74.92146597,value:0.492974854},{x:65,y:74.92146597,value:0.534844971},{x:66.25,y:74.92146597,value:0.638543701},{x:67.5,y:74.92146597,value:0.81862793},{x:68.75,y:74.92146597,value:1.053186035},{x:71.25,y:74.92146597,value:1.57164917},{x:72.00031319,y:76.27775874,value:1.863671875},{x:58.83077949,y:78.34788982,value:2.084283447},{x:60.5804663,y:78.82378202,value:2.319696045},{x:80.71540425,y:76.99159704,value:4.150231934},{x:81.96540425,y:76.99159704,value:4.203424072},{x:51.86865986,y:75.91146357,value:0.776116943},{x:52.5,y:75.86387435,value:0.712701416},{x:54.32107064,y:75.89956626,value:0.558892822},{x:55.53537873,y:76.32786924,value:0.369683838},{x:56.25,y:75.86387435,value:0.158227539},{x:57.5,y:75.86387435,value:0.001916504},{x:71.6656227,y:75.76869591,value:0.890374756},{x:71.25,y:75.86387435,value:1.108789063},{x:72.5,y:75.86387435,value:1.309869385},{x:59.83015312,y:78.40989762,value:1.558496094},{x:75,y:75.86387435,value:1.859094238},{x:80.85817191,y:78.71922755,value:3.313317871},{x:82.10817191,y:78.71922755,value:3.325158691},{x:51.86865986,y:76.85387194,value:0.325616455},{x:52.5,y:76.80628272,value:0.280175781},{x:53.22651858,y:76.71110428,value:0.175073242},{x:55,y:77.16320187,value:0.062097168},{x:56.25,y:76.80628272,value:-0.0121521},{x:57.5,y:76.80628272,value:-0.125067139},{x:57.03678808,y:76.23521208,value:-0.27902832},{x:60.49968681,y:77.28217492,value:-0.393621826},{x:61.60691915,y:78.66226231,value:-0.485113525},{x:63.07107064,y:76.85387194,value:-0.448522949},{x:63.75,y:76.80628272,value:-0.371954346},{x:71.6656227,y:76.71110428,value:0.467858887},{x:71.25,y:76.80628272,value:0.729333496},{x:72.5,y:76.80628272,value:0.943902588},{x:73.75,y:76.80628272,value:1.164239502},{x:75,y:76.80628272,value:1.397821045},{x:80.85817191,y:79.66163593,value:2.51204834},{x:82.10817191,y:79.66163593,value:2.582055664},{x:51.25,y:77.7486911,value:-0.327215576},{x:52.5,y:77.7486911,value:-0.471472168},{x:53.22651858,y:77.65351266,value:-0.572729492},{x:54.67877276,y:78.14130217,value:-0.58661499},{x:55.92877276,y:78.212686,value:-0.629858398},{x:57.07169702,y:78.10561025,value:-0.688696289},{x:63.07107064,y:77.79628032,value:-0.43036499},{x:63.75,y:77.7486911,value:-0.320532227},{x:65,y:77.7486911,value:-0.228308105},{x:66.25,y:77.7486911,value:-0.112493896},{x:67.5,y:77.7486911,value:0.03637085},{x:68.75,y:77.7486911,value:0.167016602},{x:71.6656227,y:77.65351266,value:0.279779053},{x:75,y:77.7486911,value:1.049066162},{x:80.85817191,y:80.60404431,value:1.745050049},{x:82.10817191,y:80.60404431,value:1.831262207},{x:51.25,y:78.69109948,value:-0.718267822},{x:52.5,y:78.69109948,value:-0.842321777},{x:53.75,y:78.69109948,value:-0.980749512},{x:55.4639949,y:78.83386714,value:-1.047796631},{x:56.82107064,y:79.01232671,value:-1.022711182},{x:57.5,y:78.69109948,value:-0.991827393},{x:63.07107064,y:78.7386887,value:-0.462805176},{x:63.75,y:78.69109948,value:-0.349157715},{x:65,y:78.69109948,value:-0.264715576},{x:64.39402042,y:79.04801863,value:-0.184942627},{x:65.64402042,y:79.04801863,value:-0.108374023},{x:68.75,y:78.69109948,value:-0.011297607},{x:73.75,y:78.69109948,value:0.504693604},{x:70.64558636,y:79.11940246,value:0.669793701},{x:71.89558636,y:79.11940246,value:0.775476074},{x:77.5,y:78.69109948,value:0.863519287},{x:78.75,y:78.69109948,value:0.941827393},{x:80,y:78.69109948,value:1.054711914},{x:81.25,y:78.69109948,value:1.163446045},{x:80.85817191,y:81.54645268,value:1.22298584},{x:82.10817191,y:81.54645268,value:1.281884766},{x:50.7741078,y:79.01484799,value:-0.854528809},{x:52.0241078,y:79.01484799,value:-0.842687988},{x:53.2741078,y:79.01484799,value:-0.83572998},{x:55,y:79.63350785,value:-0.833135986},{x:56.25,y:79.63350785,value:-0.807012939},{x:57.5,y:79.63350785,value:-0.739263916},{x:62.5,y:79.63350785,value:-0.557867432},{x:63.75,y:79.63350785,value:-0.504309082},{x:65,y:79.63350785,value:-0.425360107},{x:64.39402042,y:79.990427,value:-0.339910889},{x:65.64402042,y:79.990427,value:-0.254644775},{x:68.75,y:79.63350785,value:-0.163702393},{x:73.75,y:79.63350785,value:0.226037598},{x:70.64558636,y:80.06181083,value:0.287072754},{x:71.89558636,y:80.06181083,value:0.385217285},{x:77.5,y:79.63350785,value:0.471948242},{x:78.17892936,y:79.63350785,value:0.539086914},{x:80,y:79.63350785,value:0.597406006},{x:81.25,y:79.63350785,value:0.650842285},{x:80.85817191,y:82.48886106,value:0.736352539},{x:82.10817191,y:82.48886106,value:0.812646484},{x:56.25,y:80.57591623,value:-0.373510742},{x:57.5,y:80.57591623,value:-0.261022949},{x:62.5,y:80.57591623,value:-0.41751709},{x:63.75,y:80.57591623,value:-0.407110596},{x:65,y:80.57591623,value:-0.424871826},{x:64.39402042,y:80.93283538,value:-0.404089355},{x:65.64402042,y:80.93283538,value:-0.355047607},{x:68.75,y:80.57591623,value:-0.275549316},{x:73.75,y:80.57591623,value:0.025933838},{x:71.35942466,y:80.71868389,value:0.078240967},{x:72.60942466,y:80.71868389,value:0.123406982},{x:77.5,y:80.57591623,value:0.188531494},{x:78.17892936,y:80.57591623,value:0.263970947},{x:80,y:80.57591623,value:0.314416504},{x:81.25,y:80.57591623,value:0.353692627},{x:82.5,y:80.57591623,value:0.385003662},{x:83.75,y:80.57591623,value:0.425805664},{x:56.25,y:81.51832461,value:-0.454443359},{x:58.2138383,y:80.85207553,value:-0.454473877},{x:58.75,y:81.51832461,value:-0.463201904},{x:60,y:81.51832461,value:-0.475500488},{x:61.67830298,y:81.66109227,value:-0.480230713},{x:62.5,y:81.51832461,value:-0.483282471},{x:63.75,y:81.51832461,value:-0.494696045},{x:65,y:81.51832461,value:-0.479711914},{x:66.25,y:81.51832461,value:-0.450842285},{x:67.5,y:81.51832461,value:-0.395025635},{x:68.75,y:81.51832461,value:-0.339483643},{x:70,y:81.51832461,value:-0.279180908},{x:71.25,y:81.51832461,value:-0.228521729},{x:72.5,y:81.51832461,value:-0.160559082},{x:73.75,y:81.51832461,value:-0.085943604},{x:75,y:81.51832461,value:-0.027410889},{x:76.25,y:81.51832461,value:0.019830322},{x:77.5,y:81.51832461,value:0.062310791},{x:78.17892936,y:81.51832461,value:0.110437012},{x:79.35754553,y:80.01926417,value:0.170343018},{x:56.25,y:82.46073298,value:-0.557714844},{x:58.2138383,y:81.7944839,value:-0.533544922},{x:58.75,y:82.46073298,value:-0.509924316},{x:60,y:82.46073298,value:-0.492712402},{x:61.67830298,y:82.60350064,value:-0.480841064},{x:62.5,y:82.46073298,value:-0.477362061},{x:63.94035688,y:81.74689468,value:-0.468023682},{x:66.78459575,y:82.24658149,value:-0.447698975},{x:68.03459575,y:82.24658149,value:-0.414862061},{x:67.28584851,y:81.10444021,value:-0.376379395},{x:68.53584851,y:81.10444021,value:-0.342687988},{x:69.78584851,y:81.10444021,value:-0.310552979},{x:71.03584851,y:81.10444021,value:-0.271673584},{x:71.92892936,y:81.38997553,value:-0.230108643},{x:73.17892936,y:81.38997553,value:-0.177740479},{x:74.42892936,y:81.38997553,value:-0.135168457},{x:76.92892936,y:81.38997553,value:-0.096838379},{x:78.17892936,y:81.38997553,value:-0.077825928},{x:79.35754553,y:80.96167255,value:-0.056616211},{x:58.29633647,y:82.97483838,value:-0.618078613},{x:59.54633647,y:82.97483838,value:-0.613531494},{x:58.75,y:83.40314136,value:-0.606817627},{x:60,y:83.40314136,value:-0.576727295},{x:61.25,y:83.40314136,value:-0.562139893},{x:62.5,y:83.40314136,value:-0.558996582},{x:63.94035688,y:82.68930306,value:-0.566992188},{x:66.78459575,y:83.18898987,value:-0.579412842},{x:68.03459575,y:83.18898987,value:-0.58157959},{x:67.28584851,y:82.04684859,value:-0.569677734},{x:68.53584851,y:82.04684859,value:-0.557104492},{x:69.78584851,y:82.04684859,value:-0.551885986},{x:71.03584851,y:82.04684859,value:-0.551000977},{x:71.92892936,y:82.33238391,value:-0.547338867},{x:73.17892936,y:82.33238391,value:-0.531988525},{x:74.42892936,y:82.33238391,value:-0.489599609},{x:76.92892936,y:82.33238391,value:-0.422155762},{x:78.17892936,y:82.33238391,value:-0.404333496},{x:79.35754553,y:81.90408093,value:-0.397253418},{x:80.60754553,y:81.90408093,value:-0.391333008},{x:81.85754553,y:81.90408093,value:-0.385412598},{x:83.10754553,y:81.90408093,value:-0.355535889}];
                let valueMin = -30;  // 最小热力值
                let valueMax = 50;  // 最大热力值

                // add data to heatmap
                heatMap.setWGS84Data(valueMin, valueMax, data);
                this.heatMap = heatMap;
                /*
                this.viewer.camera.setView({
                    destination: Cesium.Rectangle.fromDegrees(bounds.west, bounds.south, bounds.east, bounds.north)
                });
                */
              },
              hideheatmap(){
                  this.heatMap.show(false);
              },
              windy(){
                //风场start
                let viewer = this.viewer;

                  //风场显示
                  const showWindy = function () {
                    document.getElementById('windycanvas').style.display="";
                  };
                  //风场隐藏
                  const hideWindy = function () {
                    document.getElementById('windycanvas').style.display="none";
                  };
                  //设置地图操作，便于使用风场
                  const initWindy = (windy) => {
                    /**
                    *如果处于全球状态就设置为[]（只要有一个角获取不到坐标就表示全球状态，实时计算）
                    **/
                    var globalExtent = [];

                    //获取当前三维窗口左上、右上、左下、右下坐标
                    var getCesiumExtent = function () {
                      var canvaswidth = 1920,
                        canvasheight = 1080 - 50;

                      var left_top_pt = new Cesium.Cartesian2(0, 0);
                      var left_bottom_pt = new Cesium.Cartesian2(0, canvasheight);
                      var right_top_pt = new Cesium.Cartesian2(canvaswidth, 0);
                      var right_bottom_pt = new Cesium.Cartesian2(canvaswidth, canvasheight);

                      var pick1 = viewer.scene.globe.pick(viewer.camera.getPickRay(left_top_pt), viewer.scene);
                      var pick2 = viewer.scene.globe.pick(viewer.camera.getPickRay(left_bottom_pt), viewer.scene);
                      var pick3 = viewer.scene.globe.pick(viewer.camera.getPickRay(right_top_pt), viewer.scene);
                      var pick4 = viewer.scene.globe.pick(viewer.camera.getPickRay(right_bottom_pt), viewer.scene);
                      if (pick1 && pick2 && pick3 && pick4) {
                        //将三维坐标转成地理坐标---只需计算左下右上的坐标即可
                        var geoPt1 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick2);
                        var geoPt2 = viewer.scene.globe.ellipsoid.cartesianToCartographic(pick3);
                        //地理坐标转换为经纬度坐标
                        var point1 = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
                        var point2 = [geoPt2.longitude / Math.PI * 180, geoPt2.latitude / Math.PI * 180];
                        //此时说明extent需要分为东西半球
                        if (point1[0] > point2[0]) {
                          globalExtent = [point1[0], 180, point1[1], point2[1], -180, point2[0], point1[1], point2[1]];
                        } else {
                          globalExtent = [point1[0], point2[0], point1[1], point2[1]];
                        }
                      } else {
                        globalExtent = [];
                      }
                    };
                    // 开启监听器--无论对当前地球做的任何操作都会监听到
                    let postRender = viewer.scene.postRender.addEventListener(() => {
                      getCesiumExtent();
                    });
                    var refreshTimer = -1;
                    var mouse_down = false;
                    var mouse_move = false;
                    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                    //鼠标滚动、旋转后是否需要重新生成风场---如果需要，打开以下注释--旋转或者移动到北半球的时候计算会有问题
                    handler.setInputAction(function (e) {
                      clearTimeout(refreshTimer);
                      //每次鼠标滚轮旋转后不显示风场
                      // hideWindy();
                      setTimeout(function () {
                        windy.extent = globalExtent;
                        windy.redraw();
                        showWindy();
                      }, 200);
                    }, Cesium.ScreenSpaceEventType.WHEEL);
                    //鼠标左键、右键按下
                    handler.setInputAction(function (e) {
                      mouse_down = true;
                    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
                    handler.setInputAction(function (e) {
                      mouse_down = true;
                    }, Cesium.ScreenSpaceEventType.RIGHT_DOWN);
                    //鼠标移动
                    handler.setInputAction(function (e) {
                      if (mouse_down) {
                        //每次鼠标移动后不显示风场
                        // hideWindy();
                        mouse_move = true;
                      }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                    //鼠标左键、右键抬起
                    handler.setInputAction(function (e) {
                      if (mouse_down && mouse_move) {
                        windy.extent = globalExtent;
                        windy.redraw();
                      }
                      showWindy();
                      mouse_down = false;
                      mouse_move = false;
                    }, Cesium.ScreenSpaceEventType.LEFT_UP);
                    handler.setInputAction(function (e) {
                      if (mouse_down && mouse_move) {
                        windy.extent = globalExtent;
                        windy.redraw();
                      }
                      showWindy();
                      mouse_down = false;
                      mouse_move = false;
                    }, Cesium.ScreenSpaceEventType.RIGHT_UP);

                  }


                  //调整风场canvas大小
                  const resizeCanvas = function (windy) {
                    if (windycanvas == null) {
                      return;
                    }
                    windycanvas.width = 1920;
                    windycanvas.height = 1080;
                    if (windy) {
                      windy._resize(windycanvas.width, windycanvas.height);
                    }
                  };

                  //获取风场数据、生成风场
                  let getwindData = () => {
                    let _this = this;
                    // let Data_Promise = Service(`http://139.9.141.68:11111/weather_data/sn/grid/20220818180000/108.5000/109.0000/33.5000/34.0000`)
                    let Data_Promise = axios(`geojson/windydata.json`)
                    Data_Promise.then((res) => {

                      console.log('风的格点预报：', res.data);

                      //设置canvas
                      var windycanvas = document.createElement('canvas');
                      windycanvas.setAttribute("id", "windycanvas");
                      windycanvas.style.position = 'fixed'
                      windycanvas.style["pointer-events"] = "none";
                      windycanvas.style["z-index"] = 10;
                      windycanvas.style["bottom"] = 0;
                      windycanvas.style["top"] = 0;
                      windycanvas.style["left"] = 0;
                      windycanvas.style["right"] = 0;
                      document.getElementById('cesiumContainer').appendChild(windycanvas);



                      //风场参数设置
                      let params = {
                        viewer: viewer,
                        canvas: windycanvas,
                        canvasWidth: 1920,
                        canvasHeight: 1080,
                        speedRate: 5000,
                        particlesNumber: 5000,
                        maxAge: 120,
                        frameRate: 10,
                        color: '#ffffff',
                        lineWidth: 1,
                      };

                      var windy
                      setTimeout(() => {
                        document.getElementById('windycanvas').style.top = '105px';//_this.$refs.titlerow.offsetHeight+'px';
                        document.getElementById('windycanvas').style.left = '16px';//_this.$refs.titlerow.offsetHeight+'px';
                        windy = new CanvasWindy(res.data, params);
                        resizeCanvas(windy);
                        window.onresize = resizeCanvas;
                        showWindy()
                        //初始化风场设置
                        initWindy(windy)
                        console.log('风场已经执行');
                      }, 2000);
                    })
                  }
                  getwindData();
                //风场end
              },
              getLabel(text){
                //let label = pinBuilder.fromText(text, Cesium.Color.fromCssColorString('#24a4fe').withAlpha(0.6), 200).toDataURL();

                let label = new Cesium.LabelGraphics({
                  text: text,    //描述内容
                  font: '20px "微软雅黑", Arial, Helvetica, sans-serif, Helvetica',
                  fillColor: Cesium.Color.WHITE,//文字的填充颜色
                  outlineColor: Cesium.Color.BLACK,//文字的描边
                  style: Cesium.LabelStyle.FILL_AND_OUTLINE,//设置描边的风格，上面的参数才会起效果
                  outlineWidth: 1.0,
                  scale: 0.7,
                  // 垂直位置
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  // 中心位置
                  pixelOffset: new Cesium.Cartesian2(0, 0),
                  //设置背景颜色透明
                  backgroundColor: Cesium.Color.fromCssColorString('#ff8200').withAlpha(0.4),
                  //打开背景  打开背景 （不会被线段覆盖）
                  showBackground: true,
                });

                return label;
              },
              getRandomFloat(min, max) {
                return (Math.random() * (max - min + 1) + min).toFixed(3);
              },
              getRandomArrayElements(arr, count) {
                if (count >= arr.length) {
                  return arr.slice(); // 返回整个数组的副本
                }

                const result = [];
                const cloneArr = arr.slice(); // 创建数组的副本，避免修改原始数组

                for (let i = 0; i < count; i++) {
                  const randomIndex = Math.floor(Math.random() * (cloneArr.length - i)) + i;
                  [cloneArr[randomIndex], cloneArr[i]] = [cloneArr[i], cloneArr[randomIndex]]; // 交换元素位置
                  result.push(cloneArr[i]);
                }

                return result;
              },
              loadinging(){
                //加载中。。。。
                let loading = this.$loading({
                  lock: true, //lock的修改符--默认是false
                  customClass: 'createLoading', // *这里设置他的class名称,这里最重要
                  text: 'Loading data wait...', //显示在加载图标下方的加载文案
                  spinner: 'el-icon-loading', //el-icon-loading',//自定义加载图标类名
                  background: 'rgba(0, 0, 0, 0.5)', //遮罩层颜色
                  target: document.querySelector('.index') //loadin覆盖的dom元素节点
                });
                return loading;
              },
              /***
               * 根据范围飞行
               * @param {*}  data = [
              				[116.52453466251528, 40.233651754887056, 1],
                              [116.52453466251528, 40.233471232847634, 1],
                              [116.524521776882, 40.233471232847634, 1],
                              [116.524521776882, 40.233651754887056, 1]
                         ]
               */
              getExtent(data) {
                  return new Promise(function (resolve) {
                      var xmin, xmax, ymin, ymax;
                      data.forEach(i => {
                          if (!xmin && !xmax && !ymin && !ymax) {
                              xmin = Number(i[0]);
                              xmax = Number(i[0]);
                              ymin = Number(i[1]);
                              ymax = Number(i[1]);
                          } else {
                              if (xmin > Number(i[0])) {
                                  xmin = Number(i[0]);
                              }
                              if (xmax < Number(i[0])) {
                                  xmax = Number(i[0]);
                              }
                              if (ymin > Number(i[1])) {
                                  ymin = Number(i[1]);
                              }
                              if (ymax < Number(i[1])) {
                                  ymax = Number(i[1]);
                              }
                          }
                      });
                      if (!xmin && !xmax && !ymin && !ymax) {
                          resolve();
                      } else {
                          resolve({
                              xmin: xmin,
                              ymin: ymin,
                              xmax: xmax,
                              ymax: ymax
                          });
                      }
                  });
              },
              /***
               * 根据范围数据构造新的实体飞行
               * @param {*}  data = {
              	xmin: 116.52453466251528,
              	ymin: 40.233651754887056,
              	xmax: 116.52453476251528,
              	ymax: 40.233651764887056
              }
               */
              flyToExtent(data) {
                  let viewer = this.viewer;
                  //构造新的实体，透明度为0
                  let loactionTectEntity = viewer.entities.add({
                      rectangle: {
                          coordinates: Cesium.Rectangle.fromDegrees(
                              data.xmin,
                              data.ymin,
                              data.xmax,
                              data.ymax
                          ),
                          material: Cesium.Color.GREEN.withAlpha(0),
                          height: 1,
                          outline: false,
                      },
                  });
                  let pro = viewer.flyTo(loactionTectEntity, {
                      duration: 3,
                      offset: new Cesium.HeadingPitchRange( Cesium.Math.toRadians(45),  Cesium.Math.toRadians(-35.0),200)
                  });
                  pro.then(() => {
                  	//移除新的实体
                      viewer.entities.remove(loactionTectEntity);
                  });
              },
              getData(data){
                this.beforestartdate = data;
              }
  },
  watch:{
    "valueM":function(nv,ov){
        this.getDays(this.valueY.value,nv.value);
    },
    "routedship":function(nv,ov){
      if(nv != ov){
        this.removeLayers();
        this.dialogVisable = true;
        this.dialogVisableys = false;
        this.dataVisible = false;
        this.navPeriodVisible = false;
        this.refreshkey=new Date().getTime();
        this.loadchannelLine(true);
        this.loadCanPassArea();
      }
    },
    "comparestart_radio":function(nv,ov){
        let str_point = this.comp_startpoints[nv];
        this.hx_longitude1 = str_point[0];
        this.hx_latitude1 = str_point[1];
        this.pin_startpoint(this.hx_longitude1,this.hx_latitude1,nv);
    },
    "compareend_radio":function(nv,ov){
        let end_point = this.comp_endpoints[nv];
        this.hx_longitude2 = end_point[0];
        this.hx_latitude2 = end_point[1];
        this.pin_endpoint(this.hx_longitude2,this.hx_latitude2,nv);
    },
    "temperature_show":function(nv,ov){
      if(!ov){
        this.showheatmap();
      }else{
        this.hideheatmap();
      }
    },
    "windy_show":function(nv,ov){
      if(!ov){
        this.drawLineGeojson();
      }else{
        for (let index = 0; index < this.geoJsonData.features.length; index++) {
          let entity = this.viewer.entities.getById('attackarrow'+index);
          if (Cesium.defined(entity)) {
              this.viewer.entities.remove(entity);
          }
        }
      }
    },
    "routearea_show":function(nv,ov){
      if(!ov){
        this.loadCanPassage();
      }else{
        this.viewer.imageryLayers.remove(this.canpassareaLayer);
      }
    },

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/bigscreen/scss/index.scss';
@import '@/assets/bigscreen/scss/style.scss';
@import '@/assets/bigscreen/scss/topnav.scss';
@import url(../../../public/Cesium-1.73/Build/Cesium/Widgets/widgets.css);
#cesiumContainer{
  position: absolute;
  width: 98.3%;
  height: 100%;
  background-image:url('../../assets/bigscreen/pageBg.png');
  background-size: 100% 100%;
}
#index{
  .title-logo{
    background: url('../../assets/images/left_logo.png') no-repeat;
  }
  .viewer,.body-box{background-image:url('../../assets/bigscreen/pageBg.png');}
  //.viewer,.body-box{background-image:url('../../assets/bigscreen/cesium_bg.png')!important;}

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
    width:230px;
    height:auto;
    transform: translateX(535px);
    z-index: 9999;
    background-color: #0f1325;
    border-radius: 12px;
  }
  .menu_dialog_hxgh{
    position: absolute;
    top: 100px;
    width:230px;
    height:auto;
    transform: translateX(28px);
    z-index: 9999;
    background-color: #0f1325;
    border-radius: 12px;
  }
  .menu_dialog_sh{
    position: absolute;
    top: 100px;
    width:230px;
    height:auto;
    transform: translateX(280px);
    z-index: 9999;
    background-color: #0f1325;
    border-radius: 12px;
  }

  .menu_ul{
    z-index: 100;
    li{
      //padding: 15px 12px 3px 12px;
      font-size: 18px;
      text-align: center;
      line-height: 30px;
      padding: 10px 0px 0px 0px;
      cursor: pointer;
      font-family: Times New Roman, Times, serif;
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
            //background-color: #081c32;
            background-color: transparent;
            color: #FFFFFF;
            //background-image: url('../../assets/images/panel.png');
            background: rgba(0,0,0,0.3) url('../../assets/images/panel1.png') no-repeat;
            background-size: 100%  100%;
          }
      ::v-deep .ys_dialog .el-dialog,
          .el-pager li {
            background-color: transparent;
            color: #FFFFFF;
            //background-image: url('../../assets/images/panel.png');
            background: rgba(0,0,0,0.3) url('../../assets/images/panel1.png') no-repeat;
            background-size: 100%  100%;
          }
          ::v-deep .hxdb_dialog .el-dialog,
          .el-pager li {
            background-color: transparent;
            color: #FFFFFF;
            //background-image: url('../../assets/images/panel.png');
            background: rgba(0,0,0,0.3) url('../../assets/images/panel1.png') no-repeat;
            background-size: 100%  100%;
            border-radius: 5px;
            opacity: 1;
          }
          ::v-deep .hxdb_dialog .el-dialog {
            .input_row:nth-child(n+1){
              padding: 20px;
            }
          }
          ::v-deep .hxview_dialog .el-dialog {
            background-color: transparent;
            color: #FFFFFF;
           //background-image: url('../../assets/images/panel.png');
           background: rgba(0,0,0,0.3) url('../../assets/images/panel1.png') no-repeat;
            background-size: 100%  100%;
            border-radius: 5px;
            opacity: 1;
          }

          ::v-deep .canpass_dialog .el-dialog{
                //background-color: #081c32;
                background-color: transparent;
                color: #FFFFFF;
                //background-image: url('../../assets/images/panel.png');
                background: rgba(0,0,0,0.3) url('../../assets/images/panel1.png') no-repeat;
                background-size: 100%  100%;
                .el-dialog__title{
                    color: #fff !important;
                    font-size: 20px;
                    font-weight: bold;
                    text-shadow: 0 0 black;
                }
                .el-dialog__body{
                  //background-color: rgb(70 94 158 / 60%);
                }
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
          .el-dialog__headerbtn .el-dialog__close{
            font-size: 22px;
            color: #fff;
            font-weight: bold;
          }
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
        //padding: 20px 20px 0px 20px;
      }
      //n 从0 开始
      .input_row:nth-child(n+1){
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
            background-color: transparent!important;
        }
      // 表格样式
          ::v-deep .el-table .cell {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #fff;
            letter-spacing: 0px;
            text-align: center;
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
            background-color: transparent;
            color: #FFFFFF;
          }

          ::v-deep .el-card .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
            background-color: rgba(6, 150, 255, 0.3);
          }

          ::v-deep .el-card .el-table th {
            background-color: rgba(61, 158, 254, 0.18);
            color: #fff;
            font-size: 14px;
            border-color: #214fa1;
            border-bottom: 1px solid rgba(71, 167, 255, 0.5);
            height: 28px;
          }

          ::v-deep .el-card .el-table th div.cell {
            color: #fff;
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
            background-color: transparent;
          }

          ::v-deep .el-table__body tr.hover-row>td.el-table__cell {
            background-color: transparent;
          }

          .hbview_detail{
            //border-left: 1px solid #fff;
            li{
              margin: 40px 0px 40px 40px;
            }
          }

    ::v-deep .el-radio-button__inner{
      background-color: transparent;
      color:#fff
    }
    .el-radio-button__orig-radio:checked{
        color: #FFFFFF;
      }

      #latlng_show {
          width: 345px;
          height: 10px;
          position: fixed;
          top: 10%;
          left: 42%;
          font-size: 15px;
      }

      #tuli_show {
          width: 345px;
          height: 10px;
          position: fixed;
          top: 10%;
          left: 42%;
          font-size: 15px;
      }
      .vc-location-distance{
        display:none!important;
      }
</style>
<style lang="scss">
  .shipinfo-pop{
    background: #081c32;
    border: 1px solid #003091;
    color: #fff;
    border-radius: 8px;
    font-size: 16px;
    .el-popover__title{
      color:#ff8200;
      font-size: 18px;
      font-weight: bold;
    }
    .el-row{
      margin: 10px 3px;
    }
  }

  .tools_ul{
    background: #081c32;
    border-radius: 3px;
    height: 30px;
    line-height: 30px;
    li{
      display: inline;
      padding: 6px;
      color: #fff;
      font-size: 14px;
      border-right: 1px solid #fff;
      cursor: pointer;
    }
    > li:nth-child(n+1){
      //padding-right: 0px;
    }

    .active {
      .li_icon{
        color: #ff8200;
      }
      .li_label{
        color: #2df1ff;
      }
    }
  }

  ::v-deep .fade-enter-active,
  ::v-deep .fade-leave-active {
      transition: all 4s;
  }

  ::v-deep .fade-enter,
  ::v-deep .fade-leave-to {
      opacity: 0;
  }

  ::v-deep .fade-enter-to,
  ::v-deep .fade-leave {
      opacity: 1;
  }
.routeview{
  list-style: none;
  li{
    text-align: left;
    width: 50%;
    display: inline;
    line-height: 20px;
    float: left;
    padding: 10px 20px;
    color: #fff;
  }
}
.reline-legend{
  color: #fff;
}
.viewtitle{
  background-image: -webkit-linear-gradient(top, #dff4ff 60%, #76b2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.compass{
  //position: absolute;
  //left: 0px;
  top: 50%;
}

.navigation-controls{
  position: absolute;
  top: 58%;
}

.routeview{
  .iconview{
    font-size: 18px;
    color: #f00;
    cursor: pointer;
  }
  .iconview_text{
    cursor: pointer;
  }

  .viewicon{
    background-image: url('../../assets/images/icon_show.png');
    background-size: 100% 100%;
    width: 20px;
    display: inline-block;
    height: 20px;
    margin: -5px auto;
    cursor: pointer;
  }
  .unviewicon{
    background-image: url('../../assets/images/icon_hide.png');
    background-size: 110% 110%;
    width: 21px;
    display: inline-block;
    height: 21px;
    margin: -5px auto;
    cursor: pointer;
  }

}

.createLoading {
    .el-loading-spinner {
      top: 50%;
      left: 50%;
      margin-left: -55px;
      background: transparent;
      padding: 20px;
      border-radius: 4px;
      width: auto;
      text-align: center;
      position: absolute;

      i {
        color: #eee;
        font-size: 50px;
      }

      .el-loading-text {
        color: #eee;
      }
    }
  }
  .viewer_dialog{
    .el-checkbox__label{
      color: #fff;
    }
  }


  // 表格样式
  	.el-table .cell {
  		font-family: PingFangSC-Regular;
  		font-size: 12px;
  		color: #fff;
  		letter-spacing: 0px;
  		text-align: center;
  		//line-height: 40px !important;

  		.el-icon-arrow-right:before {
  			color: #1dffe5;
  			font-size: 16px;
  			font-weight: 700;
  		}
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
  		background-color: transparent;
  		color: #FFFFFF;
  	}

  	.el-card .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  		background-color: rgba(6, 150, 255, 0.3);
  	}

  	.el-card .el-table th {
  		background-color: rgba(61, 158, 254, 0.18);
  		color: #fff;
  		font-size: 14px;
  		border-color: #214fa1;
  		border-bottom: 1px solid rgba(71, 167, 255, 0.5);
  		height: 28px;
  	}

  	.el-card .el-table th div.cell {
  		color: #fff;
  	}

  	.el-card .el-table tr,
  	.el-card .el-table td {
  		background-color: transparent;
  		color: #FFFFFF;
  		border-color: #214fa1;
  	}

  	.el-table tr.hover-row {
  		background-color: transparent!important;
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

  	#index {
  		::v-deep .avue-empty__desc {
  			color: #FFFFFF;
  		}
  	}

  	.el-table--scrollable-x .el-table__body-wrapper {
  		overflow-x: hidden;
  	}

  	.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
  		background-color: transparent;
  		color: #FFFFFF;
  	}
    .el-table thead.is-group th.el-table__cell {
        background: transparent;
    }
    ::v-deep .avue-crud--card .el-card {
        border: none!important;
    }


    .comparetable{
      //background-image: linear-gradient(180deg, rgba(11, 56, 255, 0), rgba(26, 105, 255, .41));
    }
    .hbview_detail{
      li{font-size: 17px;}
      .icon-win{
        padding: 20px;
        background: url('../../assets/images/win.png') no-repeat;
        background-size: 100% 100%;
      }

    }

    .line_legend{
      list-style: none;
      li{
        color: #fff;
        margin: 5px;
      }
    }

    .reline{margin: 10px;}

    .newrouteing {
          /*
          text-align: left;
          height: 120px;
          background-color: transparent;
          color: #FFFFFF;
          background: rgba(0,0,0,0.3) url('../../assets/images/panel1.png') no-repeat;
          background-size: 100%  100%;
          */
          .input_row{
            margin: 15px;
          }

          .dv-border-box-11 .border-box-content {
              padding: 62px 9px 10px;
          }
        }
</style>
