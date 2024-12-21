<template>
  <div class="channel_index" ref="channel_index">
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
                    width="270px"
                    :color="['#5500ff', '#67a1e5']"
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
                        <li  @click="dia_type = 2;dia_title='Port accessibility analysis';refreshkey=new Date().getTime();dialogVisable = true;"><a href="#">Port accessibility analysis</a></li>
                    </ul>
                  </li>
                </ul>

              </div>
              <div class="d-flex aside-width">
                <ul class="top-nav-right">
                  <li>
                    <a href="#">Nowcasting sea ice</a>
                  </li>
                  <li>
                    <a href="#">Navigability assessments</a>
                  </li>
                  <li>
                    <!-- <a href="#">{{ dateYear }}</a> -->
                    <a href="#">2024-06-21</a>
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
              <!-- <cesiumMap></cesiumMap> -->
            </div>

            <!-- 经纬度及视角等 -->
            <div id="latlng_show">
                <div style="width: 170px; height: 30px; float: left;">
                    <font size="3" color="white">Longitude：<span id="longitude_show"></span></font>
                </div>
                <div style="width: 170px; height: 30px; float: left;">
                    <font size="3" color="white">Latitude：<span id="latitude_show"></span></font>
                </div>
                <div style="width: 170px;float: left;">
                  <el-switch
                      v-model="maptype"
                      active-text="map3D"
                      inactive-text="map2D">
                  </el-switch>
                </div>
            </div>

            <div style="position: absolute;height: 15%;width: 33%;margin: 25px 27%;" v-if="sailingInfosVisable">
              <div class="newrouteing">
                <dv-border-box-11 title="Operational planning" style="width: 750px;height: 160px;" backgroundColor="#131f3b">
                  <!-- <el-row style="text-align: center;"><dv-decoration-4 :reverse="true" style="width:650px;height:5px;" /></el-row> -->
                  <el-row class="input_row">
                    <el-col :span="2"><dv-decoration-12 style="width:30px;height:30px;" /></el-col>
                    <el-col :span="11">
                        Date：<el-date-picker style="width: 170px;" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions" v-model="routeingstartdate"></el-date-picker>
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
                    <el-col :span="11">
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
            <!-- <div v-if="dataVisible" :style="'position: absolute;top: 12%;right:1%;height: '+Number(divheight/(isHistory?2:1)+80)+'px; width: '+divwidth+'px;text-align: center;background: rgba(0,0,0,0.3);z-index:9;'"> -->
            <div v-if="dataVisible && (Object.keys(economy).length || isHistory)" :style="'position: absolute;top: 12%;right:1%;height: '+(isHistory?40:60)+'vh; width: '+30+'vw;text-align: center;background: rgba(0,0,0,0.3);z-index:9;'">
              <!-- 航行前视图 -->
              <dv-border-box-10 style="opacity: 1;" v-if="dia_type == 1">
                <el-row class="viewtitle">
                  <h3>Route View
                <span style="padding-left: 95%;display: block;margin-top: -20px;cursor: pointer;" @click="dataVisible = false;">X</span></h3></el-row>
                <el-row v-show="!isHistory">
                  <!-- <div v-show="!Object.keys(economy).length" style="width: 90%;margin: 0 auto;padding: 8px 5px;text-align: left;">
                    Operating Instructions:
                    <ul>
                      <li style="list-style-type: disclosure-closed;">Step 1: Please select Start and End from the Strategic planning panel on the left to mark the starting and ending positions on the map.</li>
                      <li style="list-style-type: disclosure-closed;">Step 2: Proceed to select other optional criteria in the Strategic planning panel.</li>
                      <li style="list-style-type: disclosure-closed;">Lastly, click the submit button to calculate the route and related data.</li>
                    </ul>
                  </div> -->
                  <ul class="routeview" v-show="Object.keys(economy).length">
                    <!--<li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Distance：</span><span>{{filterNull(economy.l)}}</span>Km</li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Elapsed time：</span><span>about {{filterNull(economy.d)}}</span>day(s)</li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Energy consumption：</span><span>{{filterNull(economy.f)}}</span>Ton</li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Annual sailings：</span><span>{{filterNull(economy.n)}}</span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Carbon emissions per：</span><span>{{filterNull(economy.eco2)}}</span>t/TEU</li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Annual benefit：</span><span>{{filterNull(economy.aer)}}</span>gCO₂/dwt-nm</li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Interannual carbon：</span><span>{{filterNull(economy.aeco2)}}</span>t/TEU</li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Cost per voyage：</span><span>{{filterNull(economy.cvc)}}</span>$/TEU</li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Interannual cost：</span><span>{{filterNull(economy.acvc)}}</span>$/TEU</li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Interannual profit：</span><span>{{filterNull(economy.apvp)}}</span>$/TEU</li> -->

                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Speed：</span><span>{{filterNull(economy.speed)}} Knot</span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Distance：</span><span>{{filterNull(economy.sea_mail)}} Nautical mile</span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Time：</span><span>{{filterNull(economy.time)}} Hours</span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Carbon emissions per：</span><span>{{filterNull(economy.eco2)}} tonne/TEU</span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Carbon emissions：</span><span>{{filterNull(economy.total_eco2)}} Tonne</span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Cost per TUE：</span><span>{{filterNull(economy.cvc)}} $/TEU</span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>All cost：</span><span>{{filterNull(economy.price)}} $</span></li>

                    <!--
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Temperature：</span><span  @click="temperature_show = !temperature_show;"><span :class="temperature_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Windy：</span><span  @click="windy_show = !windy_show;"><span :class="windy_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Sea fog：</span><span  @click="seafog_show = !seafog_show;"><span :class="seafog_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Route RIO：</span><span  @click="routerio_show = !routerio_show;loadRiskRIO();"><span :class="routerio_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Route Area：</span><span  @click="routearea_show = !routearea_show;"><span :class="routearea_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                    <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span><span>Floating ice：</span><span  @click="floatice_show = !floatice_show;"><span :class="floatice_show?'viewicon':'unviewicon'"></span><span class="iconview_text">view</span></span></li>
                     -->
                  </ul>
                </el-row>
                <el-row style="height: 20px;line-height: 20px;font-size: 15px;text-align: left;" v-show="!isHistory && Object.keys(economy).length">
                  <span style="padding-left: 20px;">
                    <span class="el-icon-s-promotion" style="color: #ff8200;"></span>Variations in sea ice conditions along the optimal route</span>
                  <!-- <span :style="'cursor: pointer;font-size:18px;padding-left: '+(isbig?'48%':'1%')+';'" :class="isbig?'el-icon-full-screen':'el-icon-rank'" @click="divheight = isbig?600:600;divwidth = isbig?410:800;refreshkey = new Date().getTime();isbig = !isbig"></span> -->
                </el-row>

                <el-row style="width: 90%;margin: 0 auto;padding: 8px 5px;text-align: left;">
                  <el-col :span="4"><span style="line-height: 40px;padding-left: 20px;">Type：</span></el-col>
                  <el-col :span="20" style="text-align: left;">
                    <el-radio-group v-model="tab_radiobefore" size="mini" style="z-index: 12; position: relative; left: 25px; top: 10px;">
                      <el-radio-button label="0">Concentration</el-radio-button>
                      <el-radio-button label="1">Thickness</el-radio-button>
                      <el-radio-button label="2">RIO</el-radio-button>
                    </el-radio-group>
                  </el-col>
                  <span class="el-icon-full-screen" style="cursor: pointer;position:absolute;top:1em;right:1.5em;z-index: 10;background-image: url('../../assets/icons/svg/Zoomin.svg');" @click="zoomBigVisable = true"></span>
                  <line3DChart id="line3DChart" :dataType="tab_radiobefore" :height="35" :width="30" :key="refreshkey3D+'1'" :line3dJson="line3dJson"/>
                </el-row>
              </dv-border-box-10>
            </div>

            <!-- 日历通航时期 -->
            <div v-if="navPeriodVisible" :style="'position: absolute;bottom:3%;right:1%;height:22vh; width:auto;text-align: center;'" ref="calendarRef">
              <dv-border-box-10>
                <el-row style="height: 20px;line-height: 40px;font-size: 15px;text-align: left;">
                  <span style="padding-left: 20px;color: #fff;">Navigation period&nbsp;({{valueY.value}})</span>
                </el-row>
                <calendarChart @getData="getData" :year="valueY.value" />
              </dv-border-box-10>
            </div>
          </div>
        </div>
      </div>

      <!-- new航行中规划 -->
      <div class="ship_infos" :key="refreshkey+'3'" v-if="sailingInfosVisable">
          <div style="height: 51vh;overflow-y: hidden;" class="viewer_dialog">
            <el-row class="input_row" style="text-align:center;">Ship information</el-row>
            <el-row class="input_row" style="text-align: center;margin-top: 0px;"><dv-decoration-10 style="width:400px;height:5px;" /></el-row>
            <el-row :key="shipinfokey"  style="height: 22vh;overflow-y: auto;">
              <el-row class="input_row">Location: <span>E{{getRandomFloat(80,90)}}</span>,<span>N{{getRandomFloat(30,40)}}</span><img alt="direction" src="../../assets/images/compass.png" :style="'display:inline-block;height: 20px;vertical-align: middle;'+'transform: rotate(45deg);'" /></el-row>
              <el-row class="input_row">
                <el-col :span="12">
                  Length：{{shipinfo.Length}}
                </el-col>
                <el-col :span="12">
                  Width：{{shipinfo.Width}}
                </el-col>
              </el-row>
              <el-row class="input_row">
                <el-col :span="12">
                  Tonage：{{shipinfo.Tonage}}
                </el-col>
                <el-col :span="12">
                  Draft depth：{{shipinfo.Draft_depth}}
                </el-col>
              </el-row>
              <el-row class="input_row">
                <el-col :span="12">
                  Tonnage：{{shipinfo.Tonnage}}<br>
                </el-col>
                <el-col :span="12">
                  Container load：{{shipinfo.Container_load}}<br>
                </el-col>
              </el-row>
              <el-row class="input_row">
                <el-col :span="12">
                  Fuel type：{{shipinfo.Fuel_type}}<br/>
                </el-col>
                <el-col :span="12">
                  Icearea：{{shipinfo.Icearea}}<br/>
                </el-col>
              </el-row>
              <el-row class="input_row">
                <el-col :span="12">
                  Carbon tax：50%<br/>
                </el-col>
                <el-col :span="12">
                  Mmsi: {{shipinfo.Mmsi}}
                </el-col>
              </el-row>
              <el-row class="input_row">
                <el-col :span="4">
                  Progress:
                </el-col>
                <el-col :span="20">
                  <el-progress :text-inside="true" :stroke-width="15" :percentage="70" status="success" style="width: 70%;height: 0px;"></el-progress>
                </el-col>
              </el-row>
              <el-row class="input_row">
                <!-- <img src="../../../public/Logo_ico.png" width="65px" />
                <img alt="direction" :src="routedship=='xinnan'?xinnan:cmacgm" :style="'display:inline-block;height: 50px;vertical-align: middle;'+'transform: rotate(0deg);'" /></el-col> -->
              </el-row>
            </el-row>
            <el-row class="input_row">

              <div style="width: 400px;height: 200px;">
              Current Speed:<speedChart :width="400" :height="220" :shipinfokey.sync="shipinfokey" :speed="shipinfo.Current_Speed"/>
              </div>

            </el-row>
        </div>
      </div>
      <!-- new航行中规划视图 -->
      <div class="ship_view" :key="refreshkey+'4'" v-show="sailingInfosVisable">
          <el-row class="input_row" style="text-align:center;"><span style="font-size: 17px;font-weight: bold;">Real-time operational planning for vessels</span></el-row>
          <el-row class="input_row" style="text-align: center;margin-top: 0px;"><dv-decoration-10 style="width:400px;height:5px;" /></el-row>
          <div style="height: 69vh;overflow-y: auto;margin-top: -20px;" class="viewer_dialog">
            <el-row class="input_row">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="Replanning" name="1" id="tab_1">
                    <div style="width: 25vw;height: 58vh;overflow-y: auto;overflow-x: hidden;" class="routeingview">
                      <el-row class="input_row">
                          <!--
                          <el-row class="check_dataview">
                            <div class="data_item">
                              <el-checkbox label="AA">
                                <span>Sea ice concentration</span>
                                <br/>
                                <span>Sea ice thickness</span>
                              </el-checkbox>
                            </div>
                            <div class="data_item">
                              <span @click="iceconcent_show = !iceconcent_show;" :class="iceconcent_show?'viewicon':'unviewicon'"></span><br/>
                              <span @click="icethick_show = !icethick_show;":class="icethick_show?'viewicon':'unviewicon'"></span>
                            </div>
                          </el-row>
                          -->
                          <el-row>
                            <div class="data_item" style="margin-left: -14px;margin-top: -10px;">
                              <el-row>
                                <span><span style="color: #fff;font-weight: normal;">Identification of navigational environments：</span></span>
                              </el-row>
                            </div>
                          </el-row>
                          <el-row class="check_dataview">
                            <div class="data_item">
                              <el-checkbox label="">
                                <span class="no-selectable">Independent floes<span @click="floatice_show = !floatice_show;" :class="floatice_show?'viewicon':'unviewicon'"></span></span>
                              </el-checkbox>
                            </div>
                          </el-row>
                          <el-row class="check_dataview">
                            <div class="data_item">
                              <el-checkbox label="">
                                <span class="no-selectable">Sea fog<span @click="seafog_show = !seafog_show;" :class="seafog_show?'viewicon':'unviewicon'"></span></span>
                              </el-checkbox>
                            </div>
                          </el-row>
                          <el-row class="check_dataview">
                            <div class="data_item">
                              <el-checkbox label="">
                                <span class="no-selectable">
                                  <span>
                                    <span>Vessel icing<span @click="vesselice_show = !vesselice_show;" :class="vesselice_show?'viewicon':'unviewicon'"></span></span>
                                    <!-- <span v-if="vesselice_show" style="color: #ff8200;">(2024011018)</span> -->
                                  </span>
                                  <br/>
                                  <span>
                                    <span class="lvl2item">2 meters Air temperature<span @click="temperature_show1 = !temperature_show1;" :class="temperature_show1?'viewicon':'unviewicon'"></span></span>
                                    <br/>
                                    <span class="lvl2item">Sea surface temperature<span @click="temperature_show = !temperature_show;" :class="temperature_show?'viewicon':'unviewicon'"></span></span>
                                    <br/>
                                    <span class="lvl2item">Wind speed<span @click="windy_show = !windy_show;":class="windy_show?'viewicon':'unviewicon'"></span></span>
                                  </span>
                                </span>
                              </el-checkbox>
                            </div>
                            <!-- <div class="data_item">
                              <span @click="temperature_show = !temperature_show;" :class="temperature_show?'viewicon':'unviewicon'"></span><br/>
                              <span @click="temperature_show = !temperature_show;" :class="temperature_show?'viewicon':'unviewicon'"></span><br/>
                              <span @click="windy_show = !windy_show;":class="windy_show?'viewicon':'unviewicon'"></span>
                            </div> -->
                          </el-row>


                      </el-row>
                      <el-row class="input_row">
                        <!-- <el-button style="padding: 5px 20px!important;" round @click="cancel_replan">Cancel</el-button> -->
                        <el-button style="padding: 5px 20px!important;" type="success" round @click="routeing_replan">Operational planning</el-button>
                      </el-row>

                      <el-row class="input_row  data_desc">
                        <hr />
                        <el-row class="input_row" style="margin-left: 0px;"><span class="el-icon-info" style="color: #ff0000;"></span>Data information</el-row>
                        <printWriter :key="datalogkey"
                          class="printlog"
                          ref="typewriter"
                          :interval="5"
                          cursorStr=""
                          @writeEnd="writeEnd"
                        >
                        <!-- <ul>
                          <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span>① Decompressing data(Air Temperature 2M、Sea Seaface Temperature、UWind-GRAD、VWind-GRAD) <span class="el-icon-success" style="color: #f00;" /></li>
                          <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span>② Data conversion in progress <span class="el-icon-success" style="color: #f00;" /></li>
                          <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span>③ Data synthesis in progress <span class="el-icon-success" style="color: #f00;" /></li>
                          <li><span class="el-icon-s-promotion" style="color: #ff8200;"></span>④ The service is being published <span class="el-icon-success" style="color: #f00;" /></li>
                        </ul> -->
                        <ul v-if="logtype_show">
                          <li v-for="(item1,index1) in logtype_data"><span class="el-icon-s-promotion" :style="'color: #ff8200;'+(index1 == 0?'padding-left: 15px;':'')"></span>
                            <span v-if="index1 == 0">Used data：<span>{{item1.name}}</span></span>
                            <span v-else>Data date：<span :style="'color:#ff8200;font-weight:bold;'">{{item1.name}}</span></span>
                          </li>
                          <li style="padding-bottom: 0px;">
                            <el-row>
                              <span class="el-icon-s-promotion" style="color: #ff8200;"></span>
                                Data extent：<br/>
                                <el-row class="input_row">
                                  <el-col :span="12"><span>A：111.93，80.14</span></el-col>
                                  <el-col :span="12"><span>B：105.01，75.88</span></el-col>
                                </el-row>
                                <el-row class="input_row">
                                  <el-col :span="12"><span>C：86.48，76.37</span></el-col>
                                  <el-col :span="12"><span>D：85.43，80.82</span></el-col>
                                </el-row>
                            </el-row>
                          </li>
                          <li style="padding-top: 0px;"><span class="el-icon-s-promotion" style="color: #ff8200;"></span>
                            Data source: Global Forecast System (GFS)
                          </li>
                        </ul>

                        <div v-else>
                        <el-row class="input_row"><span class="el-icon-s-unfold" style="color: #ff0000;"></span>Data deal & analysis detail log</el-row>
                        <table style="width: 100%;min-width: 10vw;" class="datalog">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>ProcessName</th>
                                    <th>PostDate</th>
                                    <th>CostTime</th>
                                    <!-- <th>Status</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in datalog">
                                    <td>setp:{{index+1}}</td>
                                    <td>{{item.msg}}</td>
                                    <td>{{item.startdate}}</td>
                                    <td>{{item.costtime.toFixed(1)}}</td>
                                    <!-- <td><span class="el-icon-success" style="color: #b6b912;" /></td> -->
                                </tr>
                            </tbody>
                        </table>
                        </div>


                        </printWriter>
                      </el-row>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Results and reports" name="2">
                    <div style="width: 25vw;height: 58vh;overflow-y: auto;overflow-x: hidden;">

                      <el-row>
                        <!-- <ul class="routeingview"> -->
                        <ul class="routeingview">
                          <li><span class="el-icon-message-solid" style="color: #ff0000;"></span>
                          <span>Information for the optimized route</span>
                          <span class="el-icon-download">PDF</span>
                          </li>
                            <li><span class="el-icon-star-off" style="color: #ff8200;"></span><span>Distance：</span><span>{{filterNull(economy.l)}}</span>Km</li>
                            <li><span class="el-icon-star-off" style="color: #ff8200;"></span><span>Required time：</span><span>about {{filterNull(economy.d)}}</span>day(s)</li>
                            <li><span class="el-icon-star-off" style="color: #ff8200;"></span><span>Energy consumption：</span><span>{{filterNull(economy.f)}}</span>Ton</li>
                            <li><span class="el-icon-star-off" style="color: #ff8200;"></span><span>Annual sailings：</span><span>{{filterNull(economy.n)}}</span></li>
                            <li><span class="el-icon-star-off" style="color: #ff8200;"></span><span>Carbon emissions per：</span><span>{{filterNull(economy.eco2)}}</span>t/TEU</li>
                            <li><span class="el-icon-star-off" style="color: #ff8200;"></span><span>Annual benefit：</span><span>{{filterNull(economy.aer)}}</span>gCO₂/dwt-nm</li>
                            <li><span class="el-icon-star-off" style="color: #ff8200;"></span><span>Interannual carbon：</span><span>{{filterNull(economy.aeco2)}}</span>t/TEU</li>
                            <li><span class="el-icon-star-off" style="color: #ff8200;"></span><span>Cost per voyage：</span><span>{{filterNull(economy.cvc)}}</span>$/TEU</li>
                            <li><span class="el-icon-star-off" style="color: #ff8200;"></span><span>Interannual cost：</span><span>{{filterNull(economy.acvc)}}</span>$/TEU</li>
                            <li><span class="el-icon-star-off" style="color: #ff8200;"></span><span>Interannual profit：</span><span>{{filterNull(economy.apvp)}}</span>$/TEU</li>
                        </ul>
                      </el-row>
                      <el-row><hr/></el-row>
                      <el-row style="height: 20px;line-height: 20px;font-size: 15px;text-align: left;">
                        <span class="el-icon-message-solid" style="color: #ff0000;"></span>
                        <span>
                          SIC, SIT and RIO along the optimized route</span>
                        <span :style="'cursor: pointer;font-size:18px;padding-left: '+(isbig?'48%':'1%')+';'" :class="isbig?'el-icon-full-screen':'el-icon-rank'" @click="divheight = isbig?600:600;divwidth = isbig?410:800;refreshkey = new Date().getTime();isbig = !isbig"></span>
                      </el-row>

                      <el-row>
                        <el-col :span="4"><span style="line-height: 40px;padding-left: 20px;">Type：</span></el-col>
                        <el-col :span="20" style="text-align: left;">
                          <el-radio-group v-model="tab_radiobefore" size="mini" style="z-index: 12; position: relative; left: 25px; top: 10px;">
                            <el-radio-button label="0">Concentration</el-radio-button>
                            <el-radio-button label="1">Thickness</el-radio-button>
                            <el-radio-button label="2">RIO</el-radio-button>
                          </el-radio-group>
                        </el-col>
                      </el-row>
                      <el-row style="padding-top:1em;">
                        <line3DChart id="line3DChart" :dataType="tab_radiobefore" :height="35" :width="27" :key="refreshkey3D+'2'" :line3dJson="line3dJson"/>
                      </el-row>
                      <el-row><hr/></el-row>
                      <el-row>
                        <ul class="routeingview">
                          <li><span class="el-icon-message-solid" style="color: #ff0000;"></span><span>Navigational conditions:</span></li>
                          <li><i class="el-icon-star-off" style="color: #ff8200;"></i>(1) The ice coverage < 40%;</li>
                          <li><i class="el-icon-star-off" style="color: #ff8200;"></i>(2) The visibility with sea fog < 1 km;</li>
                          <li><i class="el-icon-star-off" style="color: #ff8200;"></i>(3) Icing rate predictor (PPR) < 53.3;</li>
                        </ul>
                      </el-row>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Digital twin" name="3">
                    <div style="width: 25vw;height: 58vh;overflow-y: auto;overflow-x: hidden;">
                      <el-row class="input_row">
                        <el-button style="padding: 5px 20px!important;" round @click="reloadtwin()">Reload Twinning</el-button>
                        <el-button style="padding: 5px 20px!important;" round @click="showTwin()">View Twinning</el-button>
                      </el-row>
                      <el-row class="input_row">
                        <div style="width: 23vw;height: 52vh;">
                          <iframe :src="twinurl" width="100%" height="100%" name="twiniframe"></iframe>
                        </div>
                      </el-row>
                    </div>
                  </el-tab-pane>
                </el-tabs>
            </el-row>
        </div>
      </div>

      <strategicLeft :dia_title="dia_title" :dia_type="dia_type" :dialogVisable.sync="dialogVisable" v-if="dialogVisable"
        @routebeforeSubmit="routebeforeSubmit"
        @getStartPoint="getStartPoint"
        @getEndPoint="getEndPoint"
        @toggleDatePicker="toggleDatePicker"
        @toggleDataTree="toggleDataTree"
        :hx_longitude1="hx_longitude1"
        :hx_latitude1="hx_latitude1"
        :hx_longitude2="hx_longitude2"
        :hx_latitude2="hx_latitude2"
        :conditions="datatree"
        :treeChecked="conditions_checked"
        :defaultDate="hisdate"
        @changeYear="changeYear"
        @changeCb="changeCb"
        @changeZx="changeZx"
        @changeRl="changeRl"
        @changeBq="changeBq"
        @changeTs="changeTs"
        @emptyLngLat = "emptyLngLat"
        @cancelInitPlan="cancelInitPlan"
        >
      </strategicLeft>
      <div :dialogVisable.sync="dialogVisable" v-if="dialogVisable" class="reline-legend" :style="'height:auto;width:20vw;position: absolute;bottom:'+(isFullscreen ? '0%':'0%' )+';background: #01005b;border-radius: 15px;left:'+(legshow?'calc( 1% )':'calc( 1% )')+';'" :key="legendKey+'1'">
        <el-row  style="text-align: left;padding: 0;">
          <el-col :span="24">Buffer zones where ships can navigate safely<div style="display:inline-block;width:12px;height:12px;background-color: #8D62C8;position: absolute;right: 3px;bottom: 5px;"></div></el-col>
        </el-row>
        <el-row  style="text-align: left;padding: 0;">
          <el-col :span="10">Ice zone<div style="width:12px;height:12px;margin-left:8px;display:inline-block;border:2px solid #FF0000;bottom: 5px;right:3px;"></div></el-col>
          <el-col :span="14">Route path<span style="color: #0000ff;font-weight: bold;float:right;">&mdash;&mdash;</span></el-col>
        </el-row>
      </div>
      <!-- 更多树形条件 -->
      <el-dialog title="Navigation environment" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
        :visible.sync="dialogVisableys" :show-close="true" width="15%" style="left:-24%;top:17%;" class="ys_dialog">
        <div>
          <el-tree
            :data="datatree"
            :props="props"
            node-key="id"
            default-expand-all
            :default-checked-keys="treeDefaultChecked"
            show-checkbox>
          </el-tree>
        </div>
      </el-dialog>
      <!-- 航线对比 -->
      <el-dialog title="Routes Comparison" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
        :visible.sync="dialogVisableHxdb" :show-close="true" width="14%" style="left:-74%;top:17%;" class="hxdb_dialog">
        <div style="height: auto;overflow-y: auto;min-height: 210px;" class="viewer_dialog">
          <el-row>
            <el-col :span="3">From:</el-col>
            <el-col :span="21">
              <el-radio-group v-model="checkedStarts" >
                <el-radio v-for="(start,index) in compstarts" :label="start" :key="start" style="margin-right:.5em;">{{start}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row class="input_row">
            <el-col :span="24">
              Lng：{{comp_startpoints[checkedStarts][0]}},&emsp;Lat: {{comp_startpoints[checkedStarts][1]}}<span class="ico ico_start">aaa</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">To:</el-col>
            <el-col :span="21">
              <el-radio-group v-model="checkedEnds" >
                <el-radio v-for="(end,index) in compends" :label="end" :key="end" style="margin-right:.5em;margin-bottom:12px;">{{end}}</el-radio>
              </el-radio-group>
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
          <el-row class="input_row" style="margin-top:-8px;">
            <el-col :span="24">
              Lng：{{comp_endpoints[checkedEnds][0]}},&emsp;Lat: {{comp_endpoints[checkedEnds][1]}}<span class="ico ico_end">bbb</span>
            </el-col>
          </el-row>
          <el-row style="padding-bottom: 19px;">
            <el-col :span="5">Ship type:</el-col>
            <el-col :span="19">
              <el-radio-group v-model="checkedShipType" >
                <el-radio v-for="(item,index) in comp_shipType" :label="item" :key="item" style="margin-right:.5em;">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row style="padding-bottom: 19px;">
            <el-col :span="5">Scenario:</el-col>
            <el-col :span="19">
              <el-radio-group v-model="checkedScenarioType" >
                <el-radio v-for="(item,index) in comp_scenarioType" :label="item" :key="item" style="margin-right:.5em;margin-bottom:8px;">{{item}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row style="padding-bottom: 19px;">
            <el-col :span="9">Ship Departure Time:</el-col>
            <el-col :span="15">
              <input type="text" readonly v-model="defaultCompareDate" placeholder="Select a day" style="background-color: transparent;border: none;color:#fff;" />
              <i class="el-icon-date" @click="toggleCompareDatePicker" style="cursor: pointer;font-size: 17px;padding-left: 5px;" title="Select a day"></i>
            </el-col>
          </el-row>
          <div class="dlg_footer">
            <slot name="footer">
                <el-button round type="primary" @click="dialogVisableHxdb = false;" >Cancel</el-button>
                <el-button round type="success" @click="dialogVisableHxview = true;" >{{checkedEnds === 'Rotterdam'?'Compare':'Information'}}</el-button>
            </slot>
          </div>
        </div>
      </el-dialog>
      <div :dialogVisable.sync="dialogVisableHxdb" v-if="dialogVisableHxdb" class="reline-legend" :style="'height:auto;width:6vw;position: absolute;bottom:'+(isFullscreen ? '4%':'4%' )+';background: #01005b;border-radius: 15px;left:'+(legshow?'calc( 1% )':'calc( 1% )')+';'" :key="legendKey+'2'">
        <el-row class="reline" style="text-align: left;padding: 3px;">
          <el-col :span="24">NEP<span style="color: #0000ff;font-weight: bold;float:right;">&mdash;&mdash;</span></el-col>
        </el-row>
        <el-row class="reline" style="text-align: left;padding: 3px;" v-show="checkedEnds === 'Rotterdam'">
          <el-col :span="24">SCR<span style="color: #55aa00;font-weight: bold;float:right;">&mdash;&mdash;</span></el-col>
        </el-row>
        <el-row class="reline" style="text-align: left;padding: 3px;">
          <el-col :span="24">Ice zone<div style="width:12px;height:12px;position: absolute; border:2px solid #FF0000;bottom: 5px;right:3px;"></div></el-col></el-col>
        </el-row>
      </div>
      <el-dialog title="Date Picker" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
          :visible.sync="dialogVisableCompare" :show-close="true" width="14%" style="left: calc(-78% + 25% + 25%);top:17%;" class="hxdb_dialog" :key="datekey+'intensity1'">
          <div style="height: 500px;overflow-y: auto;" :key="datekey+'intensity1'">
            <el-row>
              <h3>Year</h3>
              <datepanels v-if="comp_yearType.length>0" :options.sync="comp_yearType" :defaultvalue="checkedYearType" ptype="yyyy" @changeVal="compVal"></datepanels>
            </el-row>
            <el-row>
              <!-- <div>年选中值：{{valueY}}</div> -->
            </el-row>
            <el-row>
              <h3>Month</h3>
              <datepanels v-if="comp_monthType.length>0" :options.sync="comp_monthType" :isMultiply="false" :defaultvalue="checkedMonthType" ptype="mm" @changeVal="compVal"></datepanels>
              <div v-if="!comp_monthType.length" style="text-align: center;padding: 5px 0;">There is no value for the month</div>
            </el-row>
            <el-row>
              <!-- <div>月选中值：{{valueM}}</div> -->
            </el-row>
            <el-row>
              <h3>Day</h3>
              <datepanels v-if="comp_dayType.length>0" :options.sync="comp_dayType" :isMultiply="false" :defaultvalue="checkedDayType" ptype="dd" @changeVal="compVal"></datepanels>
              <div v-if="!comp_dayType.length" style="text-align: center;padding: 5px 0;">There is no value for the day</div>
            </el-row>
            <el-row>
              <!-- <div>日选中值：{{valueD}}</div> -->
            </el-row>
          </div>
      </el-dialog>
      <el-dialog :title="checkedEnds === 'Rotterdam'?'Route Compare':'NEP cost information'" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
          :visible.sync="dialogVisableHxview" :show-close="true" :width="checkedEnds === 'Rotterdam'?'33%':'24%'" style="right:1%;top:17%;" class="hxview_dialog">
          <div>
            <el-row style="text-align: center;">
              <span :style="'font-size: 18px;color: #fff;background-image: linear-gradient(to right,'+ (checkedEnds === 'Rotterdam'?'rgba(135,70,52,.6) 0%, rgba(223,168,10,.8)':'rgba(37,117,252,.6) 0%, rgba(106,17,203,.6)')+' 100%);padding: 0 .5em;border-radius: 8px 8px 0 0;'">From {{checkedStarts}} To {{checkedEnds}}</span>
              <span style="font-size: 20px;color: #f00;font-weight: bold;">{{hxviewobj.name}}</span>
            </el-row>
            <el-row style="text-align: center;line-height: 50px;position: relative;">
              <el-col :span="11" v-if="checkedEnds === 'Rotterdam'" style="font-size: 20px;font-weight: bold;"><i class="icon-champion" v-if="comp_left_num>comp_right_num"></i>SCR&emsp;(<i class="icon-win"></i>×{{comp_left_num}})</el-col>
              <el-col :span="2" v-if="checkedEnds === 'Rotterdam'"><img alt="direction" src="../../assets/images/VS.png" :style="'display:inline-block;height: 50px;vertical-align: middle;'+'transform: rotate(0deg);'" /></el-col>
              <el-col :span="this.checkedEnds === 'Rotterdam'?11:24" style="font-size: 20px;font-weight: bold;" v-if="checkedEnds === 'Rotterdam'"><i class="icon-champion" v-if="comp_left_num<comp_right_num && checkedEnds === 'Rotterdam'"></i>NEP&emsp;(<i class="icon-win"></i>×{{comp_right_num}})</el-col>
            </el-row>
            <el-row>
            <el-col :span="12" v-if="this.checkedEnds === 'Rotterdam'" style="display: flex;justify-content: center;border-right: 1px dashed rgba(248, 248, 248,.3);">
              <ul class="hbview_detail">
                <!-- <li><el-row><span>Start Point：</span><span>Lng: {{comp_startpoints[checkedStarts][0]}},Lat: {{comp_startpoints[checkedStarts][1]}}</span></el-row></li>
                <li><el-row><span>End Point：</span><span>Lng: {{comp_endpoints[checkedEnds][0]}},Lat: {{comp_endpoints[checkedEnds][1]}}</span></el-row></li> -->
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Distance：</span><span :class="comp_left_item.d1<comp_right_item.d1?'icon-win':''">{{comp_left_item.d1}} Nautical mile</span><span></span></el-row></li>
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Speed：</span><span>15 Knot</span><span></span></el-row></li>
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Time：</span><span :class="comp_left_item.d2<comp_right_item.d2?'icon-win':''">{{comp_left_item.d2}} Days</span><span></span></el-row></li>
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Ice count：</span><span :class="comp_left_item.d6<comp_right_item.d6?'icon-win':''">{{comp_left_item.d6}}</span><span></span></el-row></li>
                <!-- <li><el-row><span>Fuel cost：</span><span :class="comp_left_item.d3<comp_right_item.d3?'icon-win':''">{{comp_left_item.d3}} Tons</span><span></span></el-row></li> -->
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Co2 emission：</span><span :class="comp_left_item.d4<comp_right_item.d4?'icon-win':''">{{comp_left_item.d4}} Ton</span><span></span></el-row></li>
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Unit cost：</span><span :class="comp_left_item.d5<comp_right_item.d5?'icon-win':''">{{comp_left_item.d5}} $ per TEU</span><span></span></el-row></li>
                <li v-show="comp_left_item.d1 === comp_item_default.d1"><el-row><span style="color:yellow;"><i class="el-icon-warning-outline"></i>&ensp;There is no data for this day</span></el-row></li>
              </ul>
            </el-col>
            <el-col :span="checkedEnds === 'Rotterdam'?12:24" style="display: flex; justify-content: center;">
              <ul class="hbview_detail">
                <!-- <li><el-row><span>Start Point：</span><span>Lng: {{comp_startpoints[checkedStarts][0]}},Lat: {{comp_startpoints[checkedStarts][1]}}</span></el-row></li>
                <li><el-row><span>End Point：</span><span>Lng: {{comp_endpoints[checkedEnds][0]}},Lat: {{comp_endpoints[checkedEnds][1]}}</span></el-row></li> -->
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Distance：</span><span :class="comp_right_item.d1<comp_left_item.d1?'icon-win':''">{{comp_right_item.d1}} Nautical mile</span><span></span></el-row></li>
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Speed：</span><span>15 Knot</span><span></span></el-row></li>
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Time：</span><span :class="comp_right_item.d2<comp_left_item.d2?'icon-win':''">{{comp_right_item.d2}} Days</span><span></span></el-row></li>
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Ice count：</span><span :class="comp_right_item.d6<comp_left_item.d6?'icon-win':''">{{comp_right_item.d6}}</span><span></span></el-row></li>
                <!-- <li><el-row><span>Fuel cost：</span><span :class="comp_right_item.d3<comp_left_item.d3?'icon-win':''">{{comp_right_item.d3}} Tons</span><span></span></el-row></li> -->
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Co2 emission：</span><span :class="comp_right_item.d4<comp_left_item.d4?'icon-win':''">{{comp_right_item.d4}} Ton</span><span></span></el-row></li>
                <li><el-row><i class="el-icon-caret-right" style="font-size:12px;"></i>&emsp;<span>Unit cost：</span><span :class="comp_right_item.d5<comp_left_item.d5?'icon-win':''">{{comp_right_item.d5}} $ per TEU</span><span></span></el-row></li>
                <li v-show="comp_right_item.d1 === comp_item_default.d1"><el-row><span style="color:yellow;"><i class="el-icon-warning-outline"></i>&ensp;There is no data for this day</span></el-row></li>
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
      <el-dialog title="Date Picker" top="0" left="15%":fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
          :visible.sync="dialogVisableHis" :show-close="true" width="14%" style="left: calc(-78% + 25% + 28%);top:17%;" class="hxdb_dialog" :key="datekey+'intensity'">
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

      <div v-if="false" class="type-legend" :style="'height:80px;position: absolute;bottom:'+(isFullscreen ? '17%':'14%' )+';background: #01005b;border-radius: 15px;left:'+(legshow?'19%':'19%')+';'">
            <!-- <span :class="legshow?'el-icon-caret-left':'el-icon-caret-right'" :style="'position: absolute;top:50%;color: #fff;cursor: pointer;z-index: 9;'+'right:'+(legshow?'0px':'-10px')+';font-size:20px;'" @click="legshow = !legshow;"></span> -->
        <dv-border-box-12>
          <customLegend :legend-items="myLegendItems" :legendName="legendName" legendtype="concentration"/>
        </dv-border-box-12>
      </div>

      <div v-if="dataVisibleLegendLine || dataVisibleLegend" class="reline-legend" :style="'height:auto;width:23vw;position: absolute;bottom:'+(isFullscreen ? '4%':'4%' )+';background: #01005b;border-radius: 15px;left:'+(legshow?'1%':'1%')+';'" :key="legendKey+'1'">

          <div v-if="dataVisibleLegendLine">
            <el-row class="reline" style="margin-top: 0px;text-align: center;padding-top: 5px;"></el-row>
            <el-row class="reline" style="line-height: 3vh;">
              <el-col :span="12"><span>Original route</span><span style="color: #0000ff;font-weight: bold;">&mdash;&mdash;&mdash;&mdash;</span></el-col>
              <!-- <el-col :span="12">Sailed   <hr style="width: 40%;border: none;height: 2px;background-color: #ffff00; margin: -10px auto;"/></el-col> -->
              <el-col :span="12" v-if="replanlineshow"><span>Optimized route</span><span style="color: #ff0000;font-weight: bold;">&mdash;&mdash;&mdash;&mdash;</span></el-col>
              <el-col :span="12" v-else></el-col>
            </el-row>
            <!-- <el-row class="reline" style="padding-bottom: 5px;">
              <el-col :span="12" v-if="replanlineshow">Replan   <hr style="width: 40%;border: none;height: 2px;background-color: #ff0000; margin: -10px auto;"/></el-col>
              <el-col :span="12" v-else></el-col>
            </el-row> -->
          </div>
          <div v-if="dataVisibleLegend">
            <el-row class="reline">
            <customLegend v-if="dataVisibleLegend" :legend-items="myLegendItems" :legendName="legendName" legendtype="concentration"/>
            </el-row>
          </div>


      </div>

      <!-- 沿途冰情 -->
      <el-dialog title="ice onload" top="0" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
        :visible.sync="iceOnloadVisalbe" :show-close="true" width="50%" style="top:17%;right:5%;" class="canpass_dialog">
        <div>
        </div>
      </el-dialog>

      <!-- 放大窗口 -->
      <el-dialog :title="zoomBigName" :fullscreen="false" :close-on-click-modal="false" :close-on-press-escape="false" :modal="false"
          :visible.sync="zoomBigVisable" :show-close="true" style="top:10%;left:calc(100% - 800)/2;padding-top:1em;" class="zoomBig_dialog">
            <line3DChart id="line3DChart" :dataType="tab_radiobefore" :key="refreshkey3D+'2'" :line3dJson="line3dJson" :width="40" :height="60" />
      </el-dialog>
  </div>
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
import {getshipinfos} from '@/utils/bigscreen/shipinfos';
import customLegend from '@/views/components/bigscreen/customLegend';
import canPassEcharts from '@/views/components/bigscreen/canPassEcharts';
import historyRange from '@/utils/bigscreen/history_range.js';
import forecastRange from '@/utils/bigscreen/forecast_range.js';

import strategicLeft from '@/views/components/bigscreen/leftcondition/strategic';
import cesiumMap from '@/views/components/bigscreen/cesiumMap';

import {onresize} from '@/utils/bigscreen/detectZoom';

//import curloc_icon from '@/assets/images/dwh.png';
import curloc_icon from '@/assets/images/ship.png';
//import start_icon from '@/assets/images/startpoint.png';
import start_icon from '@/assets/images/startpoint_green.png';
import end_icon from '@/assets/images/endpoint.png';
import direction_icon from '@/assets/images/direction.png';
import billboard_icon from '@/assets/images/billboard.png';
import startpin_icon from '@/assets/images/startpin.png';
import endpin_icon from '@/assets/images/endpin.png';
import sailed_icon from '@/assets/images/sailed.png';
import unsailed_icon from '@/assets/images/unsailed.png';
import rerouted_icon from '@/assets/images/rerouted.png';
import xinnan from '@/assets/images/xinnan.jpg';
import cmacgm from '@/assets/images/cmacgm.jpg';
import {getyyyy_MM_dd,getyyyyMMddPlusDay} from '@/utils/date';
import {CanvasWindy} from '@/utils/bigscreen/windy/canvaswindy';
import {reqData} from '@/utils/bigscreen/common';
import website from '@/const/website';
import {getAttackcoordinates,createAttackArrow} from '@/utils/bigscreen/windy/attackarrow';
import channelline from '../../../public/geojson/channelline.json';
import {calcRoute} from '@/api/bigscreen/channelcalc';
//import line3dJson from '../../../public/geojson/noice.json';
import drawMixin from "@/utils/bigscreen/drawMixin.js";
import printWriter from '@/views/components/bigscreen/printWriter';
import {comp_le_data,comp_ri_data,comp_yearType_dic,comp_date_his_dic,comp_date_245_dic,comp_date_585_dic,} from "@/utils/bigscreen/economyCompareData";

require('vue-tour/dist/vue-tour.css');
export default {
  //mixins: [drawMixin],
  data() {
    return {
      comp_le_data:comp_le_data,
      comp_ri_data:comp_ri_data,
      maptype: true,
      requrl: website.requrl,
      calcurl: website.calcrouteurl,
      calcurl_new: website.calcrouteurl_new,
      Cesium:null,
      viewer: null,
      loadtext:'Loading data Please wait...',
      resizeMapKey:"",
      bingmapLayer:null,
      hisrouteLayer:null,
      canpassareaLayer:null,
      riskRIOareaLayer:null,
      channelareaLayer:null,
      icethickLayer:null,
      iceconcentLayer:null,
      airtemperautreLayer:null,
      seafogLayer:null,
      floatingiceLayer:null,
      vesseliceLayer:null,
      seaareaLayer:null,
      floaticeData1:null,
      floaticeData2:null,
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      line3dJson:[],
      pickerOptions: {
        disabledDate:(time)=>{
          let now = Date.now();
          let oneDay = 1000 * 60 * 60 * 24;
          //return (
            //time.getTime() < now - oneDay || time.getTime() > now + 2 * oneDay - 1
            // 不能选择今天之前的日期// 不能选择3天之后的日期
          //);
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
      calcingkey:0,
      refreshkey3D:null,
      dialogVisable: false,
      sailingInfosVisable: false,
      sailingViewVisable: true,
      iceOnloadVisalbe:false,
      zoomBigVisable:false,//放大窗口
      replanCycleArea: null,//重新规划航线的范围
      dia_type:0,
      cb_longitude:undefined,
      cb_latitude:undefined,
      dia_title:"",

      hx_longitude1:undefined,
      hx_latitude1:undefined,
      hx_longitude2:undefined,
      hx_latitude2:undefined,

      cb_longitude1:undefined,
      cb_latitude1:undefined,
      cb_longitude2:undefined,
      cb_latitude2:undefined,

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
      replanlineshow: false,
      logtype_show: true,
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
        disabled: true,
        children: [{
          id: 21,
          label: 'Wind speed',
          disabled: true,
        }, {
          id: 22,
          label: 'Temperature',
          disabled: true
        }, {
          id: 24,
          label: 'Visibility',
          disabled: true
        }]
      }, {
        id: 3,
        label: 'Fog',
        disabled: true,
        children: [{
          id: 7,
          label: 'Fog',
          disabled: true
        }]
      }, {
        id: 4,
        label: 'Wave height',
        disabled: true,
        children: [{
          id: 41,
          label: 'Wave height',
          disabled: true
        }]
      }, {
        id: 5,
        label: 'Depth of water',
        children: [{
          id: 51,
          label: 'Depth of water'
        }]
      }],
      treeDefaultChecked: [11,13,51],
      treeDefaultArr: [],
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
       tempdata:[],
       mjddata:[],
       startdate:"",
       beforestartdate:"",
       routeingstartdate:"",
       dateRange:[],
       routedships:[{label:"Xin Nan-Sha",value:"xinnan"},{label:"CMA CGM Marco-Polo",value:"cmacgm"}],
       shipinfokey:null,
       routedship: "",
       shipinfo:{},
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
     selectionsY: [],
     selectionsM: [],
     selectionsD: [],
     valueY: {},
     valueM: {},
     valueD: {},
     valueDFromCal: undefined,
     hisYearArr: Object.keys(historyRange).map(item=>({name:item,value:+item})),
     futureYearArr: Object.keys(forecastRange).sort((a, b) => a - b).filter(item=>item>=new Date().getFullYear()).map(item=>({name:item,value:+item})),

     cb_type:"1",
     zx_type:"4000TEU",
     rl_type:"LNG",
     bq_type:"ICE_1",
     ts_type:"FAX_0",

     isbig:false,
     divwidth:670,
     divheight:475,
     refreshkey:null,
     tab_radio:"0",
     tab_radiobefore:"2",
     comparestart_radio:"Shanghai",
     compareend_radio:"Rotterdam",
     legendName:"RIO",
     myLegendItems: [],

     isFullscreen:false,
     legshow:true,
     legendKey:null,
     showTools: false,
     replan_startPoint: null,
     toolsArr:[
       {label:"RIO",icon:"el-icon-s-promotion"},
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
      temperature_show1:false,
      windy_show:false,
      seafog_show:false,
      routerio_show:false,
      routearea_show:false,
      floatice_show:false,
      iceconcent_show:false,
      icethick_show:false,
      vesselice_show:false,
      replandate: formatTime(new Date(),'yyyy-MM-dd'),
      curdate0:false,
      curdate1:false,
      curdate2:false,
      curdate3:true,
      checkedStarts:"Shanghai",
      checkedEnds:"Pevek",
      compstarts:["Shanghai","Dalian"],
      compends:["Pevek","Tiksi","Sabetta","Murmansk","Rotterdam"],
      comp_startpoints:{
        "Shanghai":[121.50,31.26],
        "Dalian":[121.62,38.93]
      },
      comp_endpoints:{
        "Pevek":[170.25,69.68],
        "Tiksi":[128.89,71.64],
        "Sabetta":[71.27,72.06],
        "Murmansk":[33.06,68.98],
        "Rotterdam":[4.47,51.92],
      },
      checkedShipType: "OW",
      comp_shipType: ["OW","PC6"],
      checkedScenarioType: "Current",
      comp_scenarioType: ["Current","Future-SSP245","Future-SSP585"],
      checkedYearType: {},
      checkedMonthType: {},
      checkedDayType: {},
      comp_monthType: [],
      comp_dayType: [],
      comp_item_default: {d1:'--',d2:'--',d4:'--',d5:'--',d6:'--'},
      dialogVisableCompare: false,
      routerCompareRountesLayer: undefined,
      routerCompareScrRountesLayer: undefined,
      iceZoneLayer: undefined, //冰区图层
      iceZoneLabels: undefined, //冰区编号标签
      iceZoneLabelsCoord: [ //冰区坐标
        [64.3762,73.3001],
        [83.7598,77.9960],
        [119.5668,77.1791],
        [133.2839,75.7171],
        [151.6366,73.8610],
        [168.6063,73.1422],
        [-171.5710,69.5290]
      ],
      heatMap:null,
      economy:{},
      geoJsonData : {},
      activeName: "1",
      checkList:[],
      floatingarr1:[],
      floatingarr2:[],
      channelLine3dData:[],
      channelLine:[],
      routeingPoints:[],
      datalogkey:null,
      datalog: [],
      twinurl:"",
      logtype:0,
      logtype_data:[]
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
    speedChart,

    //条件组件
    strategicLeft,
    cesiumMap,
    printWriter
  },
  created() {
    this.routeingstartdate = getyyyy_MM_dd(new Date(),'-');
    //this.rangedate = getyyyyMMddPlusDay(180,'-');
    this.Cesium = Cesium;
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
    });
  },
  mounted() {
    console.log(this.checkedStarts , this.checkedEnds,this.checkedShipType,this.checkedScenarioType,this.defaultCompareDate);
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
         //tilingScheme : new Cesium.GeographicTilingScheme(),
         mapProjection:new Cesium.GeographicProjection(Cesium.Ellipsoid.WGS84),
         //tilingScheme :new Cesium.WebMercatorTilingScheme(),
         //mapProjection:new Cesium.WebMercatorProjection(),
         useBrowserRecommendedResolution: false, // 是否选择浏览器推荐分辨率

         orderIndependentTranslucency: false,
         contextOptions:{
           webgl:{alpha: true}
         }
       });
       //this.viewer.scene.morphTo2D(1);
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
       // 叠加影像服务 地形：vec_w
       let tdtimgMap = new Cesium.UrlTemplateImageryProvider({
           url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
           subdomains: subdomains,
           //tilingScheme : new Cesium.WebMercatorTilingScheme(),
           //tilingScheme : new Cesium.GeographicTilingScheme(),
           maximumLevel : 18
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
      let layer0 = this.viewer.scene.imageryLayers.get(0);
      layer0.gamma = 0.36;
      /*
      let bingMap = new Cesium.BingMapsImageryProvider({
              url: this.url,
              key: this.bmKey,
              mapStyle: Cesium.BingMapsStyle.AERIAL
          });

      this.viewer.imageryLayers.addImageryProvider(bingMap);
      */
     //指定默认的位置
      this.resetViewer();
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
      //this.viewer.extend(Cesium.viewerCesiumNavigationMixin, options);
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

      //设置 局部地图显示
      /*
      let viewer = this.viewer;
      var coffeeBeltRectangle = Cesium.Rectangle.fromDegrees(0.0,60.0,180.0,85.0);
      viewer.scene.globe.cartographicLimitRectangle = coffeeBeltRectangle;
      */
     //this.loadFloatingIce();
  },
  beforeDestroy () {
    clearInterval(this.timing);
    // 取消监听事件
    window.removeEventListener('resize', ()=>{
       onresize();
       this.adjustForLargeScreen();
    });
    let element = document.getElementById("windycanvas");
    if(element){
      element.parentNode.removeChild(element);
    }
  },
  methods: {
    adjustForLargeScreen() {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const targetWidth = 1920; // 目标宽度
      const targetHeight = 1080; // 目标高度
      const scale = Math.min(screenWidth / targetWidth, screenHeight / targetHeight); // 计算缩放比例
      document.querySelector('body').style.transform = `scale(${scale})`;
      document.querySelector('body').style.transformOrigin = 'top left'; // 设置缩放原点
    },
    resetViewer(){
      let originposition = Cesium.Cartesian3.fromDegrees(180.1, 90.1, 13000000) //可以根据需求选择坐标与坐标类型
        this.viewer.camera.setView({
            destination: originposition,                  // 相机位置
            orientation: {
                heading: Cesium.Math.toRadians(0.0), // 水平旋转  -正北方向
                pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
                roll: 0 // 视口翻滚角度
                }
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
      let label = this.getLabel(name);
      let poly = this.viewer.entities.add({  //添加实体
      id:'hx_start_point',
        position: new this.Cesium.Cartesian3.fromDegrees(lng, lat, 0), //添加实体的位置信息
        point: {
          pixelSize: 1,   //设置小点  基本看不见
          color: new Cesium.Color(0.0, 0.0, 0.0, 0.0)  //颜色设置透明
        },
        label: label,
        billboard: {
          image: start_icon,
          width: 40,  // 图片宽度,单位px
          height: 40, // 图片高度，单位px
          pixelOffset: new Cesium.Cartesian2(0, 10),
          eyeOffset: new Cesium.Cartesian3(0, -30, 0),//与坐标位置的偏移距离
          //color: Cesium.Color.RED,//颜色
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
          image: end_icon,
          width: 40,  // 图片宽度,单位px
          height: 40, // 图片高度，单位px
          pixelOffset: new Cesium.Cartesian2(0, 10),
          eyeOffset: new Cesium.Cartesian3(0, -30, 0),//与坐标位置的偏移距离
          //color: Cesium.Color.LIGHTGREEN,//颜色
          scale: 1,   // 缩放比例
        }
      });
    },
    setCursorStyle(type){
      if(type==="move"){
        document.querySelector("#cesiumContainer").style.cursor= "crosshair";
      }else{
        document.querySelector("#cesiumContainer").style.cursor= "default";
      }
    },
    //解决分辨率问题鼠标偏移
    getCartesian3FromPX(px){
      let scale = 1;
      px.x = px.x / scale;
      px.y = px.y / scale;
      let ray = this.viewer.camera.getPickRay(px);
      if(!ray) return null;
      let cartsian = this.viewer.scene.globe.pick(ray,this.viewer.scene);
      return cartsian;
    },
    getStartPoint(){
      this.setCursorStyle("move");
      this.viewer.entities.removeById("hx_start_point");
      //下面是核心代码
      let flag = 1; //节流阀
      //创建一个屏幕控制实例，获取viewer下scene下所有canvas实例
      let handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
      let _this = this;
      //添加一个setInputAction监听事件，他可以监听点击，移动事件
      handler.setInputAction((movement)=>{
      console.log(movement);
        this.setCursorStyle();
        let ray = _this.viewer.camera.getPickRay(movement.position);
        let cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene);
        let cartographic = _this.Cesium.Cartographic.fromCartesian(cartesian);
        let lng = _this.Cesium.Math.toDegrees(cartographic.longitude);//经度
        let lat = _this.Cesium.Math.toDegrees(cartographic.latitude);// 纬度
        let height = cartographic.height;//高度

        _this.hx_longitude1 = +lng;
        _this.hx_latitude1 = +lat;

        //let pick = viewer.scene.pick(movement.position)
        //这时候就可以用了
        if (flag <= 1) {
          flag++; //本次我只需要两个点 所以设了节流阀，放开就可以多次画点
          let poly = _this.viewer.entities.add({  //添加实体
          id:'hx_start_point',
            position: new _this.Cesium.Cartesian3.fromDegrees(lng, lat, height), //添加实体的位置信息
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
                image: start_icon,
                width: 40,  // 图片宽度,单位px
                height: 40, // 图片高度，单位px
                pixelOffset: new Cesium.Cartesian2(0, 0),
                eyeOffset: new Cesium.Cartesian3(0, 0, 0),//与坐标位置的偏移距离
                //color: Cesium.Color.RED,//颜色
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
      this.setCursorStyle("move");
      this.viewer.entities.removeById("hx_end_point");
      //下面是核心代码
      let flag = 1; //节流阀
      //创建一个屏幕控制实例，获取viewer下scene下所有canvas实例
      let handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
      let _this = this;
      //添加一个setInputAction监听事件，他可以监听点击，移动事件
      handler.setInputAction((movement)=>{
        this.setCursorStyle();
        let ray = _this.viewer.camera.getPickRay(movement.position);
        let cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene);
        let cartographic = _this.Cesium.Cartographic.fromCartesian(cartesian);
        let lng = _this.Cesium.Math.toDegrees(cartographic.longitude);//经度
        let lat = _this.Cesium.Math.toDegrees(cartographic.latitude);// 纬度
        let height = cartographic.height;//高度

        _this.hx_longitude2 = +lng;
        _this.hx_latitude2 = +lat;

        //let pick = viewer.scene.pick(movement.position)
      //这时候就可以用了
        if (flag <= 1) {
          flag++; //本次我只需要两个点 所以设了节流阀，放开就可以多次画点
          let poly = _this.viewer.entities.add({  //添加实体
          id:'hx_end_point',
            position: new _this.Cesium.Cartesian3.fromDegrees(lng, lat, height), //添加实体的位置信息
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
               image: end_icon,
               width: 40,  // 图片宽度,单位px
               height: 40, // 图片高度，单位px
               pixelOffset: new Cesium.Cartesian2(0, 0),
               eyeOffset: new Cesium.Cartesian3(0, 0, 0),//与坐标位置的偏移距离
               //color: Cesium.Color.LIGHTGREEN,//颜色
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
        this.valueDFromCal = undefined;
        this.valueD = val;
        this.dialogVisableHis = false;
        this.dataVisible = true;
      }
      this.initialPlanning();
    },
    compVal(val,type){
      if(type == 'yyyy'){
        this.checkedYearType = val;
      }else if(type == 'mm'){
        this.checkedMonthType = val;
      }else{
        this.valueDFromCal = undefined;
        this.checkedDayType = val;
        this.dialogVisableCompare = false;
      }
      ///this.routeCompSubmit();
    },
    initialPlanning(){
      this.removeLayers();
      //if(this.toolsType == 'tools0'){//tools0 风险RIO
      this.loadRiskRIO();
      //}else if(this.toolsType == 'tools1'){//tools1 通航区域
      this.loadCanPassage();
      //}else{
      if(this.isHistory){
        this.loadHistoryRout();
        this.loadchannelLine(false);
        this.dataVisible = true;
      }else{
        this.routebeforeSubmit(true);
        this.dataVisibleLegend = true;
      }
      this.iceZone();
      this.iceLabel();
      //this.loadCanPassArea();
    },
    getDays(valueY,valueM){
      this.selectionsD = [];
      //获取某月的天数
      let days = new Date(valueY, valueM, 0).getDate();
      const pass_day = this.isHistory?(historyRange[valueY] && historyRange[valueY][valueM]) : (forecastRange[valueY] && forecastRange[valueY][valueM]) || [];
      for(let d = 1;d <= days; d++){
        this.selectionsD.push({name:d<=9?"0"+d:d,value:d,disabled:pass_day.indexOf(d)===-1});
      }
      const index = this.valueDFromCal?this.selectionsD.findIndex((item)=>item.value===this.valueDFromCal.value):this.selectionsD.findIndex((item)=>!item.disabled);
      this.valueD = this.selectionsD[index<0?0:index ?? 0];
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
      //this.dialogVisableHis = true;
      this.dialogVisableShfx = false;
      this.datekey = new Date().getTime();
      let hisd = this.hisdate;
      //this.removeLayers();
      let temp1;
      if(this.cb_type==="1")
        temp1 = 'NO_ICE';
      else if(this.cb_type==="2")
        temp1 = "PC1";
      var provider = new this.Cesium.WebMapServiceImageryProvider({
        url: this.requrl+'/geoserver/arctic/wms',
        layers: `arctic:${temp1}_rv_`+hisd,
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
      this.viewer.dataSources.remove(this.channelLine);
      let linepoints = [];
      let temp1;
      if(this.cb_type==="1")
        temp1 = 'NO_ICE';
      else if(this.cb_type==="2")
        temp1 = "PC1";
      let temp2 = this.isHistory?"history":"forecast";
      let temp3 = this.isHistory?"":"future_";
      let url = `/geojson/passage/${temp2}/${temp1}_${temp3}passage_`;
      if(type){
        url = '/geojson/passage/history/NO_ICE_passage_'+'2020-07-12';
        axios.get(this.requrl+url+'.geojson',
           {params:{}}
         ).then(response=>{
           this.routeingPoints = response.data.features[0].geometry.coordinates[0];
           console.log(this.routeingPoints);
        }).catch(()=>{});
      }
      var promise = this.Cesium.GeoJsonDataSource.load(this.requrl+url+(type?'':this.hisdate)+'.geojson',
        {clampToGround: true});
      promise.then(datasource=>{
        this.channelLine = datasource;
        this.viewer.dataSources.add(datasource);
        datasource.entities.values.forEach((entity,index)=>{
          entity.polyline.material= this.Cesium.Color.BLUE;
          //entity.polyline.material = new Cesium.PolylineDashMaterialProperty({ dashLength: 10, //短划线长度  color: Cesium.Color.BLUE });
          entity.polyline.width = 4;
          // entity.polygon.height=1000;
          // entity.polygon.extrudedHeight=2000;
        });
        let poss = datasource.entities.values[0].polyline.positions.getValue();
        //this.routeingPoints = poss;
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

          let labeled = this.getLabel('ship sailed');
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

          let shipcurrentPoint = new Cesium.Cartesian3.fromDegrees(86.6, 77.6, 0)//poss[Math.floor(poss.length/4)];
          this.drawPoints(shipcurrentPoint,'curloc');
          this.replan_startPoint = shipcurrentPoint;

          let _this = this;
          let promise = this.Cesium.GeoJsonDataSource.load(this.requrl+'/geojsonnew/grid_Polygon_100_wgs84.geojson',{clampToGround: true});
          //let promise = this.Cesium.GeoJsonDataSource.load('geojson/20200705_Point.geojson',{clampToGround: true});
          promise.then(datasource=>{
            _this.floatingarr1 = [];
            _this.floaticeData1 = datasource;
            datasource.entities.values.forEach((entity,index)=>{

              entity.polygon.material = _this.Cesium.Color.GRAY.withAlpha(0);
              entity.polygon.outline = true;
              entity.polygon.outlineColor = _this.Cesium.Color.LIGHTGREEN.withAlpha(1);
              entity.polygon.outlineWidth = 15;
              /*
              entity.polygon.height = 1;
              entity.polygon.zIndex=1000;
              */
              //单独设置线条样式

              var positions = entity.polygon.hierarchy._value.positions;
              entity.polyline = {
                positions: positions,
                width: 2.5,
                material: Cesium.Color.LIGHTGREEN.withAlpha(1),
                clampToGround: true
              }
              _this.viewer.entities.add(entity);

            });
            _this.viewer.dataSources.add(datasource);
            _this.viewer.camera.flyTo({
            		destination: Cesium.Cartesian3.fromDegrees(99.0, 78.0, 2000000), // 设置位置
            		orientation: {
            		  heading: this.Cesium.Math.toRadians(90), // east, default value is 0.0 (north) //东西南北朝向
            		  pitch: this.Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
            		  roll: 0.0 // default value
            		},
            		duration: 5, // 设置飞行持续时间，默认会根据距离来计算
            	});
          });

          this.pointArea();
        }
        let startpoint = poss[0],endpoint = poss[poss.length-1];
        this.drawPoints(startpoint,'start');
        this.drawPoints(endpoint,'end');
        const start = this.GetWGS84FromDKR(startpoint);
        const end = this.GetWGS84FromDKR(endpoint);
        this.hx_longitude1 = +start.x.toFixed(3);
        this.hx_latitude1 = +start.y.toFixed(3);
        this.hx_longitude2 = +end.x.toFixed(3);
        this.hx_latitude2 = +end.y.toFixed(3);
        //方向箭头暂时屏蔽

        let direction_point = this.getRandomArrayElements(poss,(poss.length+"").length+10);
        if(direction_point.length > 0){
          for(let i=0;i<direction_point.length;i++){
            this.drawPoints(direction_point[i],'enddirection'+i);
          }
        }
        if(!type){
          this.routebeforeSubmit(type);
        }
        // this.flyToExtent({
        //   xmin: Math.min(this.hx_longitude1,this.hx_longitude2),
        //   ymin: Math.min(this.hx_latitude1,this.hx_latitude2),
        //   xmax: Math.max(this.hx_longitude1,this.hx_longitude2),
        //   ymax: Math.max(this.hx_latitude1,this.hx_latitude2)
        // });
        //this.viewer.zoomTo(datasource)
      },err=>{
        this.$message.error("There is no data for this day");
      });
    },
    loadCanPassArea(){
      //可通航区域 无填充
      let _this = this;
      var promise = this.Cesium.GeoJsonDataSource.load(this.requrl+'/geojson/buffer/v3_irregular_NO_ICE_passage_buffer_2023-10-11.geojson',
        {clampToGround: true});
      promise.then(datasource=>{
        _this.viewer.dataSources.add(datasource);
        datasource.entities.values.forEach((entity,index)=>{
          entity.polygon.material = _this.Cesium.Color.BLUE.withAlpha(0);
          entity.polygon.outline = true;
          entity.polygon.outlineColor = _this.Cesium.Color.LIGHTGREEN.withAlpha(1);
          entity.polygon.outlineWidth = 2;
          entity.polygon.zIndex=1000;
          entity.polygon.height=10000;
          // entity.polygon.extrudedHeight=2000;
        });
      })
    },
    //通航区域
    loadCanPassage(){
      this.viewer.imageryLayers.remove(this.canpassareaLayer);
      let hisd = this.hisdate;
      if(!this.isHistory) hisd = '2023'+hisd.slice(4);
      //this.removeLayers();
      let temp1;
      if(this.cb_type==="1")
        temp1 = 'NO_ICE';
      else if(this.cb_type==="2")
        temp1 = "PC1";
      let temp2 = this.isHistory?"":"future_";
      var provider = new this.Cesium.WebMapServiceImageryProvider({
        url: this.requrl+'/geoserver/arctic/wms',
        layers: (`arctic:${temp1}_${temp2}passage_buffer_`)+hisd,
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
    loadiceThickArea(){
      let loading = this.loadinging();
      this.viewer.imageryLayers.remove(this.icethickLayer);
      var provider = new this.Cesium.WebMapServiceImageryProvider({
            url: this.requrl+'/geoservernew/channel/wms',
            layers: 'channel:Thickness20240826',
            parameters: {
                service : 'WMS',
                format: 'image/png',
                transparent: true
            }
        });
      this.icethickLayer = this.viewer.imageryLayers.addImageryProvider(provider);
      //添加图例
      this.legendShow('thickness','Ice thickness(m)');
      setTimeout(()=>{loading.close();},2000);
    },
    //海冰厚度
    loadiceConcentArea(){
      let loading = this.loadinging();
      this.viewer.imageryLayers.remove(this.iceconcentLayer);
      var provider = new this.Cesium.WebMapServiceImageryProvider({
            url: this.requrl+'/geoservernew/channel/wms',
            //layers: 'channel:concentration_2021-09-01',
            layers: 'channel:Concentration20240826',
            parameters: {
                service : 'WMS',
                format: 'image/png',
                transparent: true
            }
        });
      this.iceconcentLayer = this.viewer.imageryLayers.addImageryProvider(provider);
      //添加图例
      this.legendShow('concentration','Ice concentartion(%)');
      setTimeout(()=>{loading.close();},2000);
    },
    //空气温度
    loadTemperatureArea(type){
      let loading = this.loadinging();
      this.viewer.imageryLayers.remove(this.airtemperautreLayer);

      //浮冰信息
      let hour = new Date().getHours(),hourtmp = '';
      //hour = hour < 10?'0'+hour:hour;
      if(hour >= 0 && hour <= 5){
        hourtmp = '00';
      }else if(hour > 5 && hour < 12){
        hourtmp = '06';
      }else if(hour >= 12 && hour < 18){
        hourtmp = '12';
      }else{
        hourtmp = '18';
      }

      let _this = this;

      let inx = 0;
      axios.post('http://27.25.141.186:8089/temperature',
         {
            "acctday":"2023-08-10",
            "lng":86.6,
            "lat":77.6,
            "hour":"18",
            "type":""+type
         },{timeout: 60 * 60 * 1000}
       ).then(response=>{
         let resdata = response.data;
         console.log(resdata);
         let servername = resdata[resdata.length-1].data[0].name;
        let provider = new this.Cesium.WebMapServiceImageryProvider({
              url: this.requrl+'/geoservernew/channel/wms',
              layers: 'channel:'+servername,
              parameters: {
                  service : 'WMS',
                  format: 'image/png',
                  transparent: true
              }
          });
        this.airtemperautreLayer = this.viewer.imageryLayers.addImageryProvider(provider);
        this.legendShow('temperature','Air temperature(℃)');
        this.datalog = resdata;
        this.datalogkey = new Date().getTime();
        setTimeout(()=>{
          loading.close();
          _this.printStart();
        },3000);
      }).catch(()=>{
        loading.close();
      });



      /*
      var provider = new this.Cesium.WebMapServiceImageryProvider({
            url: this.requrl+'/geoservernew/channel/wms',
            //layers: 'channel:concentration_2021-09-01',
            layers: 'channel:AT2MTemperature2024011018_1_part',
            parameters: {
                service : 'WMS',
                format: 'image/png',
                transparent: true
            }
        });
      this.airtemperautreLayer = this.viewer.imageryLayers.addImageryProvider(provider);
      this.legendShow('temperature','Air temperature(℃)');
      setTimeout(()=>{loading.close();},2000);
      */

    },
    seafogArea(){
      let _this = this;
      let loading = this.loadinging();
      //浮冰信息
      this.viewer.imageryLayers.remove(this.seafogLayer);
      /*
      let providerice = new this.Cesium.WebMapServiceImageryProvider({
            url: this.requrl+'/geoservernew/channel/wms',
            layers: 'channel:seafog',
            parameters: {
                service : 'WMS',
                format: 'image/png',
                transparent: true
            }
        });
      this.seafogLayer = this.viewer.imageryLayers.addImageryProvider(providerice);
      */
     let dt = new Date();
     let dstr = dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
     this.datalog = [];
     this.datalog = [
       {
           "code": "200",
           "costtime": 0.25,
           "data": [ { "name": "seafogserver" }],
           "msg": "datacrop",
           "startdate": dstr
       }
     ];

      let providerice1 = new this.Cesium.WebMapServiceImageryProvider({
            url: this.requrl+'/geoservernew/channel/wms',
            layers: 'channel:Sea_Fog_20230804_03',
            parameters: {
                service : 'WMS',
                format: 'image/png',
                transparent: true
            }
        });
      this.seafogLayer = this.viewer.imageryLayers.addImageryProvider(providerice1);
      this.legendShow('seafog','Sea fog(Km)');
      let dtt = new Date();
      let dstrt = dtt.getHours()+":"+dtt.getMinutes()+":"+dtt.getSeconds();
      this.datalog.push(
      {
          "code": "200",
          "costtime": 0.85,
          "data": [ { "name": "publishserver" }],
          "msg": "publishserver",
          "startdate": dstrt
      });
     this.datalogkey = new Date().getTime();
      setTimeout(()=>{
        loading.close();
        _this.printStart();
      },2000);
    },
    vesseliceView(){
      let loading = this.loadinging();
      //浮冰信息
      let hour = new Date().getHours(),hourtmp = '';
      //hour = hour < 10?'0'+hour:hour;
      if(hour >= 0 && hour <= 5){
        hourtmp = '00';
      }else if(hour > 5 && hour < 12){
        hourtmp = '06';
      }else if(hour >= 12 && hour < 18){
        hourtmp = '12';
      }else{
        hourtmp = '18';
      }

      let _this = this;
      let inx = 0;

      let steps = ['Data conversion','Data processing','Service publishing'];
      let stpInterval = setInterval(()=>{
        document.querySelector('.createLoading .el-loading-text').innerHTML = '<span style="color:#fff;font-size:20px;">'+steps[inx]+'</span>';
        inx +=1;
        if(inx > 2){
          inx = 0;
        }
      },1500)
      this.viewer.imageryLayers.remove(this.vesseliceLayer);
      //axios.get('http://27.25.141.186:8088/publishtifserver/0/'+hourtmp,
      axios.post('http://27.25.141.186:8089/datacrop/1',
         {
           "acctday":"2023-08-10",
           "lng":86.6,
           "lat":77.6,
           "hour":"18",
           "type":"0"
        },{timeout: 60 * 60 * 1000}
       ).then(response=>{
         let resdata = response.data;
         console.log(resdata);
         this.datalog = resdata;
         this.datalogkey = new Date().getTime();
         let servername = resdata[resdata.length-1].data[0].name;
        let providerice = new this.Cesium.WebMapServiceImageryProvider({
              url: this.requrl+'/geoservernew/channel/wms',
              layers: 'channel:'+servername,
              parameters: {
                  service : 'WMS',
                  format: 'image/png',
                  transparent: true
              }
          });
        this.vesseliceLayer = this.viewer.imageryLayers.addImageryProvider(providerice);
        this.legendShow('vesselice','Vessel Ice(m℃s-1)');
        this.calcingkey = new Date().getTime();
        setTimeout(()=>{
          clearInterval(stpInterval);
          loading.close();
          _this.printStart();
        },3000);
      }).catch(()=>{
        clearInterval(stpInterval);
        loading.close();
      });
    },
    //图例显示控件数据
    legendShow(type,name){
      //添加图例
      let ranges = getLegendRanges('reroute',type);
      let orderKeys = Object.keys(ranges).sort((a, b) => a - b);
      this.myLegendItems = [];
      orderKeys.map((k) => {
        this.myLegendItems.push({title: k, color: ranges[k]})
      });
      this.legendName = name;
      this.dataVisibleLegend = true;
    },
    //通航区域
    loadRiskRIO(){
      this.viewer.imageryLayers.remove(this.riskRIOareaLayer);
      let hisd = this.hisdate;
      //this.removeLayers();
      if(!this.isHistory) hisd = '2023'+hisd.slice(4);
      let temp1;
      if(this.cb_type==="1")
        temp1 = 'NO_ICE';
      else if(this.cb_type==="2")
        temp1 = "PC1";
      let temp2 = this.isHistory?"":"future_";
      var provider = new this.Cesium.WebMapServiceImageryProvider({
        url: this.requrl+'/geoserver/arctic/wms',
        layers: (`arctic:${temp1}_${temp2}rv_`)+hisd,
        parameters: {
          service : 'WMS',
          format: 'image/png',
          transparent: true
        }
      });
      this.dataVisibleLegend = true;

      this.riskRIOareaLayer = this.viewer.imageryLayers.addImageryProvider(provider);
    },
    loadFloatingIce(){
      let loading = this.loadinging();
      let _this = this;
      let dt = new Date();
       let dstr = dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
       this.datalog = [];
       this.datalog = [
       {
           "code": "200",
           "costtime": 0.85,
           "data": [ { "name": "publishserver" }],
           "msg": "publishserver",
           "startdate": dstr
       }];
       /*
      this.viewer.imageryLayers.remove(this.seaareaLayer);
      var provider = new this.Cesium.WebMapServiceImageryProvider({
            url: this.requrl+'/geoservernew/channel/wms',
            //layers: 'channel:concentration_2021-09-01',
            layers: 'channel:20230810_sea_ice',
            parameters: {
                service : 'WMS',
                format: 'image/png',
                transparent: true
            }
        });
      this.seaareaLayer = this.viewer.imageryLayers.addImageryProvider(provider);
      this.viewToLocation();
      */


      let promise = this.Cesium.GeoJsonDataSource.load(this.requrl+'/geojsonnew/Floes_WGS84.geojson',{clampToGround: true});
      //let promise = this.Cesium.GeoJsonDataSource.load('geojson/20200705_Point.geojson',{clampToGround: true});
      promise.then(datasource=>{
        _this.floatingarr1 = [];
        _this.floaticeData1 = datasource;
        datasource.entities.values.forEach((entity,index)=>{
          entity.polygon.material = _this.Cesium.Color.YELLOW.withAlpha(0.5);
          entity.polygon.outline = true;
          entity.polygon.outlineColor = _this.Cesium.Color.WHITE.withAlpha(1);
          entity.polygon.outlineWidth = 2;
          entity.polygon.zIndex=1000;
          //entity.polygon.height=10000;
          //entity.label= _this.getLabel('AAAAAA'+index);

           // 得到每块多边形的坐标集合
          let polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
          // 根据坐标集合构造BoundingSphere获取中心点坐标
          let polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
          // 将中心点拉回到地球表面
          polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
          entity.position = polyCenter;
        });
        _this.viewer.dataSources.add(datasource);
        //_this.viewer.flyTo(datasource.entities.values)
        _this.viewToLocation();
      });



      /*
      //可通航区域 无填充
      let promise = this.Cesium.GeoJsonDataSource.load(this.requrl+'/geojsonnew/20200705.geojson',{clampToGround: true});
      //let promise = this.Cesium.GeoJsonDataSource.load('geojson/20200705_Point.geojson',{clampToGround: true});
      promise.then(datasource=>{
        _this.floatingarr1 = [];
        _this.floaticeData1 = datasource;
        datasource.entities.values.forEach((entity,index)=>{
          entity.polygon.material = _this.Cesium.Color.GRAY.withAlpha(0.5);
          entity.polygon.outline = true;
          entity.polygon.outlineColor = _this.Cesium.Color.LIGHTGREEN.withAlpha(1);
          entity.polygon.outlineWidth = 2;
          entity.polygon.zIndex=1000;
          //entity.polygon.height=10000;
          //entity.label= _this.getLabel('AAAAAA'+index);

           // 得到每块多边形的坐标集合
          let polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
          // 根据坐标集合构造BoundingSphere获取中心点坐标
          let polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
          // 将中心点拉回到地球表面
          polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
          entity.position = polyCenter;
          _this.floatingarr1.push({name:entity.properties.name.getValue(),point:polyCenter});
          _this.floatingarr1.sort(_this.sortname);
          // 注意这里..结束
          entity.label={
              // position:
              text:datasource.name.substr(4,4),
              color : Cesium.Color.fromCssColorString('#fff'),
              font:'normal 32px MicroSoft YaHei',
              showBackground : false,
              scale : 0.5,
              pixelOffset: new Cesium.Cartesian2(0, 0),
              horizontalOrigin : Cesium.HorizontalOrigin.LEFT_CLICK,
              verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
              distanceDisplayCondition : new Cesium.DistanceDisplayCondition(10.0, 100000.0),
              disableDepthTestDistance : 10000.0
          }
        });
        _this.viewer.dataSources.add(datasource);
        _this.viewer.flyTo(datasource.entities.values)
      });

      //可通航区域 无填充

      let promise1 = this.Cesium.GeoJsonDataSource.load(this.requrl+'/geojsonnew/20200706.geojson',{clampToGround: true});
      //let promise  = axios(`geojson/20200705.geojson`);
      promise1.then(datasource=>{
        _this.viewer.dataSources.add(datasource);
        _this.floaticeData2 = datasource;
        _this.floatingarr2 = [];
        //_this.floaticeData = datasource;
        datasource.entities.values.forEach((entity,index)=>{
          entity.polygon.material = _this.Cesium.Color.RED.withAlpha(0.5);
          entity.polygon.outline = true;
          entity.polygon.outlineColor = _this.Cesium.Color.RED.withAlpha(1);
          entity.polygon.outlineWidth = 2;
          entity.polygon.zIndex=1000;
          //entity.polygon.height=10000;

          var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
          var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;//中心点
          polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
          entity.position = polyCenter;
          console.log(entity.properties.name);
          _this.floatingarr2.push({name:entity.properties.name.getValue(),point:polyCenter});
          _this.floatingarr2.sort(_this.sortname);
            // 注意这里..结束
            entity.label={
                // position:
                text:datasource.name.substr(4,4),
                color : Cesium.Color.fromCssColorString('#fff'),
                font:'normal 32px MicroSoft YaHei',
                showBackground : false,
                scale : 0.5,
                pixelOffset: new Cesium.Cartesian2(0, 0),
                horizontalOrigin : Cesium.HorizontalOrigin.LEFT_CLICK,
                verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                distanceDisplayCondition : new Cesium.DistanceDisplayCondition(10.0, 100000.0),
                disableDepthTestDistance : 10000.0
            }
          });

            for(let i=0;i<_this.floatingarr1.length;i++){
              let entity = this.viewer.entities.getById('floatline'+i);
              if (Cesium.defined(entity)) {
                  this.viewer.entities.remove(entity);
              }
              _this.viewer.entities.add({
                    id:"floatline"+i,
                    polyline: {
                        positions: [_this.floatingarr1[i].point,_this.floatingarr2[i].point],
                        width: 6,
                        //arcType: this.Cesium.ArcType.NONE,
                        material: new Cesium.PolylineArrowMaterialProperty(
                          Cesium.Color.YELLOW
                        )
                    }
                });
            }

        _this.viewer.flyTo(datasource.entities.values);
      });
      */
      this.datalogkey = new Date().getTime();
       setTimeout(()=>{
         loading.close();
         _this.printStart();
       },2000);
    },
    sortname(a, b){
        if(a.name > b.name){
            return 1;
        }else if(a.name < b.name){
            return -1;
        }else{
            return 0;
        }
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
      this.dia_type = 1;
      this.dia_title='Strategic stage';
      this.removeLayers();
      this.dialogVisable = true;
      this.dialogVisableys = false;
      this.dataVisible = false;
      this.navPeriodVisible = true;
      this.dataVisibleLegend = false;
      this.dataVisibleLegendLine = false;
      this.dialogVisableHxdb = false;
      this.dialogVisableCompare = false;

      this.dialogVisableCanPass = false;
      this.dialogVisableHxview = false;
      this.sailingInfosVisable = false;
      this.refreshkey=new Date().getTime();

      this.selectionsY = this.hisYearArr;
      this.valueY = this.selectionsY[0];
      this.resetViewer();
    },
    routebeforeSubmit(type){
      if(this.hx_longitude1 === undefined || this.hx_latitude1 === undefined || this.hx_longitude2 === undefined || this.hx_latitude2 === undefined){
        this.$message.error("Please click the starting and finishing points on the map...");
        this.line3dJson = [[0,0,0]];
        this.refreshkey3D = new Date().getTime();
        return;
      }
      let loading = this.loadinging();
      //let url = this.requrl+'/geojson/echart/'+(this.isHistory?'history':'forecast')+'/NO_ICE_'+(this.isHistory?'':'future_')+'passage_'+this.hisdate+'.json';//this.calcurl;
      let url = this.calcurl_new;
      let ship_type;
      if(this.cb_type === "1")
        ship_type = "NO_ICE";
      else if(this.cb_type === "2")
        ship_type = "PC1";
      axios.get(url,
        {params:{
          date:"2023-09-01",
          //date:this.hisdate,
          start_lat:this.hx_latitude1,
          start_lon:this.hx_longitude1,
          end_lat:this.hx_latitude2,
          end_lon:this.hx_longitude2,
          ship_type,
          fuel_type: this.rl_type,
          teu_type: this.zx_type,
          fax_type: this.ts_type,
          ice_count: this.bq_type,
          sum_or_win: (+this.valueM === 11 || +this.valueM === 12) ?'w':'s'
        }}
      ).then(response=>{
        if(response.statusText == 'OK'){
          loading.close();
          let jsondata = response.data.msg;
          if(!this.isHistory)
            this.economy = jsondata.economy || {};

          this.channelLine3dData = undefined;
          this.channelLine3dData = jsondata.echart || [];
          this.fresh3DData();

          this.dialogVisable = true;
          if(type){
            this.dataVisible = false;
          }else{
            this.dataVisible = true;
            this.dataVisibleLegend = true;
            if(!this.isHistory){
              const passage = jsondata.passage;
              this.drawPolyline(passage);
            }
          }
          this.dialogVisableHis = false;
        }else{
          this.$message.warning("The course cannot be calculated under these conditions...");
        }
        setTimeout(()=>{
          loading.close();
          this.dialogVisableys = false;
        },2000);
     }).catch(()=>{loading.close();this.$message.warning("The course cannot be calculated under these conditions...");});
    },
    drawPolyline(data){
      this.viewer.dataSources.remove(this.channelLine);
      const line = {flog:true,flog2:true,x:2,x2:2};
      const promise = this.Cesium.GeoJsonDataSource.load(data,{clampToGround: true});
      promise.then(datasource=>{
        this.channelLine = datasource;
        this.viewer.dataSources.add(datasource);
        datasource.entities.values.forEach((entity,index)=>{
          //entity.polyline.material= this.Cesium.Color.BLUE;
          entity.polyline.material = new Cesium.PolylineDashMaterialProperty({
            dashLength: 10,
            color: Cesium.Color.BLUE
          });
          entity.polyline.width = 3;
        });
      });
    },
    routeing(){
      this.routedship = "xinnan";
      this.removeLayers();
      this.dialogVisableCompare = false;
      this.sailingInfosVisable = true;
      this.dialogVisable = false;
      this.dialogVisableys = false;
      this.dataVisible = false;
      this.navPeriodVisible = false;
      this.dataVisibleLegend = false;
      this.dataVisibleLegendLine = true;
      this.dialogVisableCanPass = false;
      this.dialogVisableHxview = false;
      this.dialogVisableHxdb = false;
      this.replanlineshow = false;
      this.dia_type = 3;
      this.dia_title='Tactical stage';
      this.refreshkey=new Date().getTime();
      this.loadchannelLine(true);
      this.logtype_show = true;
    },
    //ABCD四个点
    pointArea(){
      let parr = [{label:'A',lng:111.935,lat:80.14},{label:'B',lng:105.01,lat:75.88},{label:'C',lng:86.48,lat:76.37},{label:'D',lng:85.43,lat:80.82}];
      for(let i=0;i<parr.length;i++){
        this.viewer.entities.add({
            id: 'point'+parr[i].label, // id属性
            position: Cesium.Cartesian3.fromDegrees(parr[i].lng, parr[i].lat, 1), // 位置
            point: {  // 点
                color: new Cesium.Color.fromCssColorString("#ffff00"), // 点颜色
                pixelSize: 10,  // 点大小
                outlineColor: new Cesium.Color.fromCssColorString("#ffffff"), // 点的外圈线颜色
                outlineWidth: 2,  // 点的外圈线宽度
                disableDepthTestDistance: Number.POSITIVE_INFINITY  // 被遮挡是否可见（也就是将这个Entity在场景中置顶）
            },
            label: {
                 text: parr[i].label,
                 font: '16px sans-serif', // 字体大小
                 style: Cesium.LabelStyle.FILL_AND_OUTLINE, // 字体样式
                 fillColor: new Cesium.Color.fromCssColorString("#ff0000"), // 字体填充色
                 outlineWidth: 1,  // 字体外圈线宽度（同样也有颜色可设置）
                 outlineColor: new Cesium.Color.fromCssColorString("#000000"),
                 verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直位置
                 pixelOffset: new Cesium.Cartesian2(0, -15),  // 中心位置
                 disableDepthTestDistance: Number.POSITIVE_INFINITY
             }
        });
      }
    },
    findClosestValue(arr, target) {
      let closest = arr[0][0];
      let closestDiff = Math.abs(arr[0][0] - target);
      for (let i = 1; i < arr.length; i++) {
        const currentDiff = Math.abs(arr[i][0] - target);
        if (currentDiff < closestDiff) {
          closest = arr[i][0];
          closestDiff = currentDiff;
        }
      }
      return closest;
    },
    routeing_replan(){
      let allps = this.routeingPoints;
      let routeing_startps = [86.6,77.6];//allps[Math.floor(allps.length/4)];
      let calc_distance = 0,end_ps = [];
      let starttmp = routeing_startps;
      let routeing_start = {lng:starttmp[0].toFixed(4),lat:starttmp[1].toFixed(4)};
      console.log("StartPint",routeing_start);
      for(let k=Math.floor(allps.length/2.85);k<allps.length;k++){
        calc_distance += Cesium.Cartesian3.distance(new Cesium.Cartesian3.fromDegrees(allps[k][0],allps[k][1]),new Cesium.Cartesian3.fromDegrees(allps[k+1>allps.length?allps.length:k+1][0],allps[k+1>allps.length?allps.length:k+1][1]));
        if(calc_distance >= 1200000){
          end_ps = allps[k+1>allps.length?allps.length:k+1];
          console.log(k,end_ps,calc_distance);
          break;
        }
      }
      console.log("EndPint",end_ps);
      let routeing_end = {lng:end_ps[0].toFixed(4),lat:end_ps[1].toFixed(4)};
      let line = {flog:true,flog2:true,x:4,x2:4};
      let loading = this.loadinging();
      let _this = this;
      let url = this.calcurl;
       axios.get(url,
         {params:{
             date:"2022-09-01",
             start_lat:routeing_start.lat,
             start_lon:routeing_start.lng,
             end_lat:routeing_end.lat,
             end_lon:routeing_end.lng,
             ship_type:"NO_ICE"
           }}
       ).then(response=>{
         if(response.data.status == 'OK'){
           let jsondata = response.data.msg;
           this.economy = jsondata.economy;
           let passage = jsondata.passage;
           let chline = this.Cesium.GeoJsonDataSource.load(this.requrl+'/geojsonnew/Passage_WGS84.geojson',{clampToGround: true});
           chline.then(datasource=>{
             _this.viewer.dataSources.add(datasource);
             datasource.entities.values.forEach((entity,index)=>{
              entity.polyline.material = new _this.Cesium.ColorMaterialProperty(new _this.Cesium.CallbackProperty(function () {
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
                      }, false));
                  entity.polyline.width = new _this.Cesium.CallbackProperty(function () {
                          if (line.flog) {
                              line.x = line.x - 0.1;
                              if (line.x <= 4) {
                                  line.flog = false;
                              }
                          } else {
                              line.x =
                                  line.x + 0.1;
                              if (line.x >= 4) {
                                  line.flog = true;
                              }
                          }
                          return line.x;
                      }, false);
              //entity.polyline.width = 4;
             });
             //_this.viewer.flyTo(datasource.entities);
            //先删除
            var pointentity = this.viewer.entities.getById('reposition');
            if (Cesium.defined(pointentity)) {
                this.viewer.entities.remove(pointentity);
            }

            //添加标识
            let positions = datasource.entities.values[0].polyline.positions.getValue();
            let reposition = positions[Math.floor(positions.length/2)];
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
           });
           let echartdata = jsondata.echart,concendata = [];
           this.channelLine3dData = echartdata;
           for(let k=0;k<echartdata.length;k++){
             concendata.push([echartdata[k].lon,echartdata[k].lat,echartdata[k].concentration]);
           }
           this.line3dJson = concendata;
           this.refreshkey3D = new Date().getTime();

           let areaentity = this.viewer.entities.getById('replan_area');
            if (Cesium.defined(areaentity)) {
                this.viewer.entities.remove(areaentity);
            }
            // 创建一个圆
            /*
            this.replanCycleArea = new Cesium.Entity({
                id:'replan_area',
                position: Cesium.Cartesian3.fromDegrees(86.6, 77.6,3000000),
                ellipse: {
                  height: 1,
                  // 半短轴（画圆：半短轴和半长轴一致即可）
                  semiMinorAxis: 666000.0,
                  // 半长轴
                  semiMajorAxis: 666000.0,
                  // 填充色
                  material: Cesium.Color.RED.withAlpha(0),
                  // 是否有边框
                  outline: true,
                  // 边框颜色
                  outlineColor: Cesium.Color.WHITE.withAlpha(0),
                  // 边框宽度
                  outlineWidth: 4
                },
              });
            this.viewer.entities.add(this.replanCycleArea);
            */

            this.dataVisibleLegendLine = true;
            this.replanlineshow = true;
            this.viewToLocation();
            this.logtype_show = false;
            let dt = new Date();
            let dstr = dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
            this.datalog = [];
            this.datalog = [
              {
                  "code": "200",
                  "costtime": 0.25,
                  "data": [ { "name": "seafogserver" }],
                  "msg": "AT 2m",
                  "startdate": dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()
              },
              {
                  "code": "200",
                  "costtime": 1.25,
                  "data": [ { "name": "seafogserver" }],
                  "msg": "SST",
                  "startdate": dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()
              },
              {
                  "code": "200",
                  "costtime": 0.18,
                  "data": [ { "name": "seafogserver" }],
                  "msg": "UVWind",
                  "startdate": dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()
              },
              {
                  "code": "200",
                  "costtime": 0.25,
                  "data": [ { "name": "seafogserver" }],
                  "msg": "Vessel ice",
                  "startdate": dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()
              },
              {
                  "code": "200",
                  "costtime": 0.25,
                  "data": [ { "name": "seafogserver" }],
                  "msg": "publish",
                  "startdate": dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()
              }
            ];
            this.datalogkey = new Date().getTime();
            setTimeout(()=>{
              _this.printStart();
              setTimeout(()=>{
                _this.activeName = "2";
              },10000);
            },1000);

         }else{
           _this.$message.warning("The course cannot be calculated under these conditions...");
         }
         setTimeout(()=>{
           loading.close();
           _this.dialogVisableys = false;
         },2000);
      }).catch(()=>{loading.close();});
    },
    routeing_replan1126(){
      let allps = this.routeingPoints;
      let routeing_startps = [86.6,77.6];//allps[Math.floor(allps.length/4)];
      let calc_distance = 0,end_ps = [];
      let starttmp = routeing_startps;
      let routeing_start = {lng:starttmp[0].toFixed(4),lat:starttmp[1].toFixed(4)};
      console.log("StartPint",routeing_start);
      for(let k=Math.floor(allps.length/2.85);k<allps.length;k++){
        calc_distance += Cesium.Cartesian3.distance(new Cesium.Cartesian3.fromDegrees(allps[k][0],allps[k][1]),new Cesium.Cartesian3.fromDegrees(allps[k+1>allps.length?allps.length:k+1][0],allps[k+1>allps.length?allps.length:k+1][1]));
        if(calc_distance >= 1200000){
          end_ps = allps[k+1>allps.length?allps.length:k+1];
          console.log(k,end_ps,calc_distance);
          break;
        }
      }
      console.log("EndPint",end_ps);
      let routeing_end = {lng:end_ps[0].toFixed(4),lat:end_ps[1].toFixed(4)};
      let line = {flog:true,flog2:true,x:4,x2:4};
      let loading = this.loadinging();
      let _this = this;
      let url = this.calcurl;
       axios.get(url,
         {params:{
             date:"2022-09-01",
             start_lat:routeing_start.lat,
             start_lon:routeing_start.lng,
             end_lat:routeing_end.lat,
             end_lon:routeing_end.lng,
             ship_type:"NO_ICE"
           }}
       ).then(response=>{
         if(response.data.status == 'OK'){
           let jsondata = response.data.msg;
           this.economy = jsondata.economy;
           let passage = jsondata.passage;
           let chline = this.Cesium.GeoJsonDataSource.load(passage,{clampToGround: true});
           chline.then(datasource=>{
             _this.viewer.dataSources.add(datasource);
             datasource.entities.values.forEach((entity,index)=>{
              entity.polyline.material = new _this.Cesium.ColorMaterialProperty(new _this.Cesium.CallbackProperty(function () {
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
                      }, false));
                  entity.polyline.width = new _this.Cesium.CallbackProperty(function () {
                          if (line.flog) {
                              line.x = line.x - 0.1;
                              if (line.x <= 4) {
                                  line.flog = false;
                              }
                          } else {
                              line.x =
                                  line.x + 0.1;
                              if (line.x >= 4) {
                                  line.flog = true;
                              }
                          }
                          return line.x;
                      }, false);
              //entity.polyline.width = 4;
             });
             //_this.viewer.flyTo(datasource.entities);
            //先删除
            var pointentity = this.viewer.entities.getById('reposition');
            if (Cesium.defined(pointentity)) {
                this.viewer.entities.remove(pointentity);
            }

            //添加标识
            let positions = datasource.entities.values[0].polyline.positions.getValue();
            let reposition = positions[Math.floor(positions.length/2)];
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
           });
           let echartdata = jsondata.echart,concendata = [];
           this.channelLine3dData = echartdata;
           for(let k=0;k<echartdata.length;k++){
             concendata.push([echartdata[k].lon,echartdata[k].lat,echartdata[k].concentration]);
           }
           this.line3dJson = concendata;
           this.refreshkey3D = new Date().getTime();

           let areaentity = this.viewer.entities.getById('replan_area');
            if (Cesium.defined(areaentity)) {
                this.viewer.entities.remove(areaentity);
            }
            // 创建一个圆

            this.replanCycleArea = new Cesium.Entity({
                id:'replan_area',
                position: Cesium.Cartesian3.fromDegrees(86.6, 77.6,3000000),
                ellipse: {
                  height: 1,
                  // 半短轴（画圆：半短轴和半长轴一致即可）
                  semiMinorAxis: 666000.0,
                  // 半长轴
                  semiMajorAxis: 666000.0,
                  // 填充色
                  material: Cesium.Color.RED.withAlpha(0),
                  // 是否有边框
                  outline: true,
                  // 边框颜色
                  outlineColor: Cesium.Color.WHITE.withAlpha(0),
                  // 边框宽度
                  outlineWidth: 4
                },
              });
            this.viewer.entities.add(this.replanCycleArea);

            this.dataVisibleLegendLine = true;
            this.replanlineshow = true;
            this.viewToLocation();
            this.activeName = "2";

         }else{
           _this.$message.warning("The course cannot be calculated under these conditions...");
         }
         setTimeout(()=>{
           loading.close();
           _this.dialogVisableys = false;
         },2000);
      }).catch(()=>{loading.close();});
    },
    routeing_replan1(){
      this.dataVisible = false;
      var entity = this.viewer.entities.getById('newroute');
      if (Cesium.defined(entity)) {
          this.viewer.entities.remove(entity);
      }
      let loading = this.loadinging();
      this.dataVisible = false;
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
      this.replanCycleArea = new Cesium.Entity({
          id:'replan_area',
          position: Cesium.Cartesian3.fromDegrees(86.6603, 77.608),
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
      this.viewer.entities.add(this.replanCycleArea);
        //矩形
        /*
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
        */

      //先删除
      var pointentity = this.viewer.entities.getById('reposition');
      if (Cesium.defined(pointentity)) {
          this.viewer.entities.remove(pointentity);
      }
      //添加标识
      let reposition = positions[Math.floor(positions.length/2)];
      let labeled = this.getLabel('replan route');
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

      //_this.loadiceThickArea();
      setTimeout(()=>{
        loading.close();
        //_this.zoomByBound(1);//1  大  0 小
        _this.dialogVisableys = false;
      },2000);

      //添加图例
      //this.legendShow('reroute','thickness');

      this.dataVisibleLegendLine = true;
      this.replanlineshow = true;
      /*
      let stp_tmp = deepClone(this.replan_startPoint);
      stp_tmp.z = 12500000;
      this.viewer.camera.flyTo({ destination: stp_tmp });
      */
     this.viewToLocation();
      this.activeName = "2";
    },
    cancel_replan(){
      let position = Cesium.Cartesian3.fromDegrees(180.1, 90.1, 13000000) //可以根据需求选择坐标与坐标类型
      this.viewer.camera.setView({
        destination: position,                  // 相机位置
        orientation: {
          heading: Cesium.Math.toRadians(360), // 水平旋转  -正北方向
          pitch: Cesium.Math.toRadians(-90), // 上下旋转  --俯视朝向
          roll: 0 // 视口翻滚角度
        }
      });
    },
    viewToLocation(){
      this.viewer.flyTo(this.replanCycleArea, {
        duration: 3,
        offset: new Cesium.HeadingPitchRange( Cesium.Math.toRadians(90),  Cesium.Math.toRadians(-90),3000000)
      });
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
    routecompare(){//经济成本对比
      this.dialogVisableCompare = false;
      this.dialogVisableHxdb = true;
      this.dialogVisable = false;
      this.dialogVisableys = false;
      this.dataVisible = false;
      this.navPeriodVisible = false;
      this.dataVisibleLegend = false;
      this.dataVisibleLegendLine = false;
      this.dialogVisableCanPass = false;
      this.sailingInfosVisable = false;
      this.removeLayers();
      this.iceZone();
      this.iceLabel();
      this.routeCompSubmit();
      // this.viewer.camera.setView({
      //   orientation: {
      //     heading : Cesium.Math.toRadians(-90.0), // east, default value is 0.0 (north)
      //     pitch : Cesium.Math.toRadians(-90),    // default value (looking down)
      //     roll : 0.0                             // default value
      //   }
      // });
      let position = Cesium.Cartesian3.fromDegrees(85.4277, 61.1577, 22000000) //可以根据需求选择坐标与坐标类型
      this.viewer.camera.setView({
        destination: position,                  // 相机位置
        orientation: {
          heading: Cesium.Math.toRadians(360), // 水平旋转  -正北方向
          pitch: Cesium.Math.toRadians(-91), // 上下旋转  --俯视朝向
          roll: 0 // 视口翻滚角度
        }
      });
    },
    routeCompSubmit(){
      //默认选中第一个
      let str_point = this.comp_startpoints[this.checkedStarts];
      this.hx_longitude1 = str_point[0];
      this.hx_latitude1 = str_point[1];
      this.pin_startpoint(this.hx_longitude1,this.hx_latitude1,this.checkedStarts);
      let end_point = this.comp_endpoints[this.checkedEnds];
      this.hx_longitude2 = end_point[0];
      this.hx_latitude2 = end_point[1];
      this.pin_endpoint(this.hx_longitude2,this.hx_latitude2,this.checkedEnds);
      this.routerCompareRountesLayer && this.viewer.imageryLayers.remove(this.routerCompareRountesLayer);
      const rountes = new this.Cesium.WebMapServiceImageryProvider({
        url: this.requrl+'/geoservernew/channel/wms',
        layers: `channel:${this.checkedStarts}_${this.checkedEnds}`,
        parameters: {
          service : 'WMS',
          format: 'image/png',
          transparent: true
        }
      });
      this.routerCompareRountesLayer = this.viewer.imageryLayers.addImageryProvider(rountes);

      this.routerCompareScrRountesLayer && this.viewer.imageryLayers.remove(this.routerCompareScrRountesLayer);
      const scr_rountes = new this.Cesium.WebMapServiceImageryProvider({
        url: this.requrl+'/geoservernew/channel/wms',
        layers: `channel:scr_${this.checkedStarts}_${this.checkedEnds}`,
        parameters: {
          service : 'WMS',
          format: 'image/png',
          transparent: true
        }
      });
      this.routerCompareScrRountesLayer = this.viewer.imageryLayers.addImageryProvider(scr_rountes);
    },
    iceZone(){
      this.iceZoneLayer && this.viewer.imageryLayers.remove(this.iceZoneLayer);
      const IceZones = new this.Cesium.WebMapServiceImageryProvider({
        url: this.requrl+'/geoservernew/channel/wms',
        layers: `channel:IceZones`,
        parameters: {
          service : 'WMS',
          format: 'image/png',
          transparent: true
        }
      });
      this.iceZoneLayer = this.viewer.imageryLayers.addImageryProvider(IceZones);
    },
    iceLabel(){
      for(let i = 1,l = this.iceZoneLabelsCoord.length;i<=l;i++){
        const label = new Cesium.LabelGraphics({
          show: true,
          text: `${i}`,
          font: '15px "微软雅黑", Arial, Helvetica, Helvetica,sans-serif',
          fillColor: Cesium.Color.WHITE,
          outlineWidth: 0,
          scale: 1,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          pixelOffset: new Cesium.Cartesian2(0, 0),
          showBackground: true,
        });
        this.viewer.entities.add({
          id:`icelabel${i}`,
          position: new this.Cesium.Cartesian3.fromDegrees(this.iceZoneLabelsCoord[i-1][0], this.iceZoneLabelsCoord[i-1][1], 0), //添加实体的位置信息
          point: {
            pixelSize: 1,
            color: new Cesium.Color(0.0, 0.0, 0.0, 0.0)
          },
          label: label
        });
      }
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

      this.viewer.camera.setView({
          destination: Cesium.Rectangle.fromDegrees(bounds.west, bounds.south, bounds.east, bounds.north)
      });
    },
    hideheatmap(){
        this.heatMap.show(false);
    },
    windy(){
      let loading = this.loadinging();
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
          axios.get('http://27.25.141.186:8088/uploadwinddata')
              .then(response => {

            axios.get('http://210.72.81.169:8080/geojsonnew/Windy_data2024102906.json')
                .then(response => {
                let Data_wind = "";//require('../../../public/geojson/windy2024081400.json');
                // 现在data包含了您的JSON数据，可以进行下一步处理
                Data_wind = response.data;
                console.log('风的格点预报：', Data_wind);
                //限制数据范围
                /*

                Data_wind[0].header.lo1 = 49.25;
                Data_wind[0].header.la1 = 72.0;
                Data_wind[0].header.lo2 = 93.15;
                Data_wind[0].header.la2 = 83.0;
                Data_wind[1].header.lo1 = 49.25;
                Data_wind[1].header.la1 = 72.0;
                Data_wind[1].header.lo2 = 93.15;
                Data_wind[1].header.la2 = 83.0;
                */
                //先删除
                let element = document.getElementById("windycanvas");
                if(element){
                  element.parentNode.removeChild(element);
                }

                //设置canvas
                let windycanvas = document.createElement('canvas');
                windycanvas.setAttribute("id", "windycanvas");
                windycanvas.style.position = 'fixed'
                windycanvas.style["pointer-events"] = "none";
                windycanvas.style["z-index"] = 10;
                windycanvas.style["bottom"] = 0;
                windycanvas.style["top"] = 0;
                windycanvas.style["left"] = 0;
                windycanvas.style["right"] = 0;
                document.getElementById('cesiumContainer').appendChild(windycanvas);

                //let numberPoints = res.data[0].header.numberPoints;

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
                  color:'#e0761a',
                  lineWidth: 1.5,
                };

                var windy
                setTimeout(() => {
                  document.getElementById('windycanvas').style.top = _this.$refs.titlerow.offsetHeight+_this.$refs.menurow.offsetHeight+22+'px';
                  document.getElementById('windycanvas').style.left = '16px';//_this.$refs.titlerow.offsetHeight+'px';
                  windy = new CanvasWindy(Data_wind, params);
                  resizeCanvas(windy);
                  window.onresize = resizeCanvas;
                  showWindy()
                  //初始化风场设置
                  initWindy(windy)
                  console.log('风场已经执行');
                  loading.close();
                }, 2000);
              })
              .catch(error => console.error('Error loading the JSON file:', error));
            })
        }
        getwindData();
      //风场end
    },
    getLabel(text){
      //let label = pinBuilder.fromText(text, Cesium.Color.fromCssColorString('#24a4fe').withAlpha(0.6), 200).toDataURL();
      let label = new Cesium.LabelGraphics({
        show: true,
        text: text,    //描述内容
        font: '15px "微软雅黑", Arial, Helvetica, Helvetica,sans-serif',
        fillColor: Cesium.Color.WHITE,//文字的填充颜色
        //outlineColor: Cesium.Color.BLACK,//文字的描边
        //style: Cesium.LabelStyle.FILL_AND_OUTLINE,//设置描边的风格，上面的参数才会起效果
        outlineWidth: 0,
        scale: 1,
        // 垂直位置
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        // 中心位置
        pixelOffset: new Cesium.Cartesian2(0, 0),
        //设置背景颜色透明
        backgroundColor: Cesium.Color.fromCssColorString('#ff6b08').withAlpha(1),
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
        text: this.loadtext, //显示在加载图标下方的加载文案
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
    getExtent(arr,offset) {
      let long_max=arr[0][0]　　//east
      let long_min=arr[0][0]　　//west
      let lat_max=arr[0][1]　　 //north
      let lat_min=arr[0][1]　　 //south
      for(let i=0;i<arr.length;i++){
        if(arr[i][0]>long_max){
          long_max=arr[i][0]
        }
        if(arr[i][0]<long_min){
          long_min=arr[i][0]
        }
        if(arr[i][1]>lat_max){
          lat_max=arr[i][1]
        }
        if(arr[i][1]<lat_min){
          lat_min=arr[i][1]
        }
      }
      let offset_num = offset?offset:0
      console.log(long_max,long_min,lat_max,lat_min)//121.507794 4.477732 51.9244201 31.268902
      return {ymin:lat_min-offset_num,xmin:long_min-offset_num,ymax:lat_max+offset_num,xmax:long_max+offset_num};
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
        offset: new Cesium.HeadingPitchRange( Cesium.Math.toRadians(45),  Cesium.Math.toRadians(-35.0),200000)
      });
      pro.then(() => {
        //移除新的实体
        viewer.entities.remove(loactionTectEntity);
      });
    },
    getData(data){
      const d = data.split("-");
      this.valueDFromCal = this.isHistory?{name:d[2],value:+d[2],disabled:(historyRange[+d[0]] && historyRange[+d[0]][+d[1]]).indexOf(+d[2])===-1}:{name:d[2],value:+d[2],disabled:(forecastRange[+d[0]] && forecastRange[+d[0]][+d[1]]).indexOf(+d[2])===-1};
      this.valueM = {name:d[1],value:+d[1]};
      //this.dialogVisableHis = false;
    },
    filterNull(val) {
      if (val == null || val == undefined || val == "") {
        return '--';
      } else {
        return val;
      }
    },
    toggleDatePicker(status){
      this.dialogVisableys = !status;
      this.dialogVisableHis = status;
    },
    toggleCompareDatePicker(status){
      this.dialogVisableCompare = !this.dialogVisableCompare;
    },
    toggleDataTree(status){
      this.dialogVisableys = status;
      this.dialogVisableHis = !status;
    },
    searchTree(tree){
      if(Array.isArray(tree))
        tree.forEach(item=>{
          if(item.children){
            item.children.forEach(d=>{
              this.searchTree(d);
            })
          }else{
            if(this.treeDefaultChecked.indexOf(item.id)>-1)
              return this.treeDefaultArr.push(item.label);
          }
        })
      else{
        if(this.treeDefaultChecked.indexOf(tree.id)>-1)
          return this.treeDefaultArr.push(tree.label);
      }
    },
     GetWGS84FromDKR(coor){
        let cartographic = Cesium.Cartographic.fromCartesian(coor);
        let x = Cesium.Math.toDegrees(cartographic.longitude);
        let y = Cesium.Math.toDegrees(cartographic.latitude);
        let wgs84={
         x:x,
         y:y,
        };
        return wgs84;
     },
     changeYear(val){
       this.valueY = val;
     },
     changeCb(val){
       this.cb_type = val;
       if(this.isHistory){
         this.initialPlanning();
       }
     },
     changeZx(val){
       this.zx_type = val;
     },
     changeRl(val){
       this.rl_type = val;
     },
     changeBq(val){
       this.bq_type = val;
     },
     changeTs(val){
       this.ts_type = val;
     },
     fresh3DData(){
       this.line3dJson = undefined;
       this.line3dJson = [];
       if(this.hx_longitude1 === undefined || this.hx_latitude1 === undefined || this.hx_longitude2 === undefined || this.hx_latitude2 === undefined)
         return;
       if(this.tab_radiobefore == "0"){
         this.legendShow('concentration','Ice concentartion(%)');
         for(let k=0;k<this.channelLine3dData.length;k++){
           const temp = this.channelLine3dData[k];
           this.line3dJson.push([temp.lon,temp.lat,temp.concentration]);
         }
       }else if(this.tab_radiobefore == "1"){
         this.legendShow('thickness','Ice thickness(m)');
         for(let k=0;k<this.channelLine3dData.length;k++){
           const temp = this.channelLine3dData[k];
           this.line3dJson.push([temp.lon,temp.lat,temp.thickness]);
         }
       }else if(this.tab_radiobefore == "2"){
         let ranges = getLegendRanges('route','forecast');
         let orderKeys = Object.keys(ranges).sort((a, b) => a - b);
         this.myLegendItems = [];
         orderKeys.map((k) => {
           this.myLegendItems.push({title: k, color: ranges[k]})
         });
         this.legendName = "RIO";
         for(let k=0;k<this.channelLine3dData.length;k++){
           const temp = this.channelLine3dData[k];
           this.line3dJson.push([temp.lon,temp.lat,temp.rv]);
         }
       }
       this.refreshkey3D = new Date().getTime();
     },
     emptyLngLat(){
       this.hx_longitude1 = undefined;
       this.hx_latitude1 = undefined;
       this.hx_longitude2 = undefined;
       this.hx_latitude2 = undefined;
       this.economy = {};
       this.channelLine3dData = undefined;
       this.line3dJson = undefined;
     },
     cancelInitPlan(){
       this.removeLayers();
     },
     curdateup(type){
      if(type == 0){
        this.curdate1 = this.curdate2 = this.curdate3 = false;
      }else if(type == 1){
        this.curdate0 = this.curdate2 = this.curdate3 = false;
      }else if(type == 2){
        this.curdate0 = this.curdate1 = this.curdate3 = false;
      }else{
        this.curdate0 = this.curdate1 = this.curdate2 = false;
      }
    },
    // 开始
    printStart() {
      this.$refs.typewriter.start();
    },
    // 暂停
    pause() {
      this.$refs.typewriter.pause();
    },
    // 继续
    continueWrite() {
      this.$refs.typewriter.continueWrite();
    },
    // 重置
    reset() {
      this.$refs.typewriter.reset();
    },
    // 结束回调
    writeEnd() {
      console.log("end");
    },
    reloadtwin(){
      //this.twinurl = '';
      this.twinurl = 'https://39.104.200.88:9011/search/north/#/?floeice=floes20241126.geojson&windspeed=6.0&winddirection=W&temperature=1.1&seafog=30';
      document.frames('twiniframe').location.reload();
    },
    showTwin(){
      window.open('https://39.104.200.88:9011/search/north/#/?floeice=floes20241126.geojson&windspeed=6.0&winddirection=W&temperature=1.1&seafog=30','_blank');
    }
  },
  watch:{
    "valueY":function(nv,ov){
      //历史年份里没有，就是未来年份
      this.selectionsY = this.isHistory?this.hisYearArr:this.futureYearArr;
      this.selectionsM = [];
      const months = this.isHistory?historyRange[nv.value] && Object.keys(historyRange[nv.value]) : forecastRange[nv.value] && Object.keys(forecastRange[nv.value]) || [7,8,9,10];
      months.forEach(item=>{
        this.selectionsM.push({name:item<=9?"0"+item:item,value:item});
      });
      this.valueM = this.selectionsM[0];
    },
    "valueM":function(nv,ov){
      this.getDays(this.valueY.value,nv.value);
    },
    "valueD":function(nv,ov){
      this.changeVal(nv,'dd');
    },
    "tab_radiobefore":function(nv,ov){
      this.fresh3DData();
    },
    "routedship":function(nv,ov){
      if(nv != ov){
        this.removeLayers();
        this.refreshkey=new Date().getTime();
        this.loadchannelLine(true);
        this.shipinfo = getshipinfos("ship",nv);
        console.log(this.shipinfo);
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
        //this.showheatmap();
        this.logtype_show = true;
        this.logtype = 4;
        this.logtype_data = [{name:" Sea surface temperature"},{name: formatTime(new Date(), 'yyyy-MM-dd')}];
        this.loadTemperatureArea(2);
        this.legendKey = new Date().getTime();
      }else{
        //this.hideheatmap();
        //this.viewToLocation();
        this.viewer.imageryLayers.remove(this.airtemperautreLayer);
        this.viewToLocation();
        this.reset();
        //this.resetViewer();
        this.dataVisibleLegend = false;
        this.legendKey = new Date().getTime();
      }
    },
    "temperature_show1":function(nv,ov){
      if(!ov){
        this.logtype = 3;
        this.logtype_show = true;
        this.logtype_data = [{name:" 2-metre air temperature"},{name: "00:00 AM June 21, 2024"}];
        //this.showheatmap();
        this.loadTemperatureArea(1);
        this.legendKey = new Date().getTime();
      }else{
        //this.hideheatmap();
        //this.viewToLocation();
        this.viewer.imageryLayers.remove(this.airtemperautreLayer);
        this.viewToLocation();
        this.reset();
        //this.resetViewer();
        this.dataVisibleLegend = false;
        this.legendKey = new Date().getTime();
      }
    },
    "windy_show":function(nv,ov){
      if(!ov){
        this.logtype = 5;
        this.logtype_data = [{name:" UWind、VWind composite data"},{name: formatTime(new Date(), 'yyyy-MM-dd')}];
        //this.drawLineGeojson();
        this.windy();
      }else{
        /*
        for (let index = 0; index < this.geoJsonData.features.length; index++) {
          let entity = this.viewer.entities.getById('attackarrow'+index);
          if (Cesium.defined(entity)) {
              this.viewer.entities.remove(entity);
          }
        }
        */
        let element = document.getElementById("windycanvas");
        if(element){
          element.parentNode.removeChild(element);
        }
        this.viewToLocation();
        this.reset();
        //this.resetViewer();
      }
    },
    "routearea_show":function(nv,ov){
      if(!ov){
        this.loadCanPassage();
      }else{
        this.viewer.imageryLayers.remove(this.canpassareaLayer);
        this.viewToLocation();
        this.resetViewer();
      }
    },
    "seafog_show":function(nv,ov){
      if(!ov){
        this.logtype = 1;
        this.logtype_show = true;
        this.logtype_data = [{name:" Sea fog data"},{name: "2:00 AM on June 21, 2024"}];
        this.seafogArea();
      }else{
        this.viewer.imageryLayers.remove(this.seafogLayer);
        this.viewToLocation();
        this.reset();
        //this.resetViewer();
        this.dataVisibleLegend = false;
        this.legendKey = new Date().getTime();
      }
    },
    "icethick_show":function(nv,ov){
      if(!ov){
        this.loadiceThickArea();
        this.legendKey = new Date().getTime();
      }else{
        this.viewer.imageryLayers.remove(this.icethickLayer);
        this.viewToLocation();
        this.resetViewer();
        this.dataVisibleLegend = false;
        this.legendKey = new Date().getTime();
      }
    },
    "iceconcent_show":function(nv,ov){
      if(!ov){
        this.loadiceConcentArea();
        this.legendKey = new Date().getTime();
      }else{
        this.viewer.imageryLayers.remove(this.iceconcentLayer);
        this.viewToLocation();
        this.resetViewer();
        this.dataVisibleLegend = false;
        this.legendKey = new Date().getTime();
      }
    },
    "floatice_show":function(nv,ov){
      if(!ov){
        this.logtype = 0;
        this.logtype_show = true;
        this.logtype_data = [{name:" Independent floes data"},{name: "1:55 AM June 21, 2024"}];
        this.loadFloatingIce();
      }else{
        this.viewer.dataSources.remove(this.floaticeData1);
        /*
        this.viewer.dataSources.remove(this.floaticeData1);
        this.viewer.dataSources.remove(this.floaticeData2);
        for(let i=0;i<this.floatingarr1.length;i++){
          let entity = this.viewer.entities.getById('floatline'+i);
          if (Cesium.defined(entity)) {
              this.viewer.entities.remove(entity);
          }
        }
        */
       this.viewer.imageryLayers.remove(this.seaareaLayer);
        this.viewToLocation();
        this.reset();
        //this.resetViewer();
      }
    },
    "vesselice_show":function(nv,ov){
      if(!ov){
        this.logtype = 2;
        this.logtype_show = true;
        this.logtype_data = [{name:" Air temperature above 2m、Sea surface temperature、UWind、VWind composite data"},{name: "00:00 AM on June 21, 2024"}];
        this.vesseliceView();
        this.legendKey = new Date().getTime();
      }else{
        this.viewer.imageryLayers.remove(this.vesseliceLayer);
        this.dataVisibleLegend = false;
        this.viewToLocation();
        this.reset();
        //this.resetViewer();
        this.legendKey = new Date().getTime();
      }
    },
    "maptype":function(nv,ov){
      let duration = 3;
      if(!nv){
        this.viewer.scene.morphTo2D(duration);
      }else{
        this.viewer.scene.morphTo3D(duration);
      }
    },
    "dialogVisable":function(nv,ov){
      if(nv){
      }else{
        this.dialogVisable = false;
        this.dataVisible = false;
        this.dataVisibleLegend = false;
        this.navPeriodVisible = false;
        this.dialogVisableys = false;
      }
    },
    "checkedStarts":function(nv,ov){
      if(this.checkedScenarioType === "Current")
        this.comp_monthType = Object.keys(comp_date_his_dic[this.checkedYearType.value][this.checkedShipType][nv+this.checkedEnds])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
      else if(this.checkedScenarioType === "Future-SSP245")
        this.comp_monthType = Object.keys(comp_date_245_dic[this.checkedYearType.value][this.checkedShipType][nv+this.checkedEnds])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
      else if(this.checkedScenarioType === "Future-SSP585")
        this.comp_monthType = Object.keys(comp_date_585_dic[this.checkedYearType.value][this.checkedShipType][nv+this.checkedEnds])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
      this.checkedMonthType = this.comp_monthType[0] || {};

      this.routeCompSubmit();
    },
    "checkedEnds":function(nv,ov){
      if(this.checkedScenarioType === "Current")
        this.comp_monthType = Object.keys(comp_date_his_dic[this.checkedYearType.value][this.checkedShipType][this.checkedStarts+nv])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
      else if(this.checkedScenarioType === "Future-SSP245")
        this.comp_monthType = Object.keys(comp_date_245_dic[this.checkedYearType.value][this.checkedShipType][this.checkedStarts+nv])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
      else if(this.checkedScenarioType === "Future-SSP585")
        this.comp_monthType = Object.keys(comp_date_585_dic[this.checkedYearType.value][this.checkedShipType][this.checkedStarts+nv])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
      this.checkedMonthType = this.comp_monthType[0] || {};

      this.routeCompSubmit();
    },
    "checkedShipType":function(nv,ov){
      if(this.checkedScenarioType === "Current")
        this.comp_monthType = Object.keys(comp_date_his_dic[this.checkedYearType.value][nv][this.checkedStarts+this.checkedEnds])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
      else if(this.checkedScenarioType === "Future-SSP245")
        this.comp_monthType = Object.keys(comp_date_245_dic[this.checkedYearType.value][nv][this.checkedStarts+this.checkedEnds])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
      else if(this.checkedScenarioType === "Future-SSP585")
        this.comp_monthType = Object.keys(comp_date_585_dic[this.checkedYearType.value][nv][this.checkedStarts+this.checkedEnds])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
      this.checkedMonthType = this.comp_monthType[0] || {};
    },
    "checkedYearType":{
      handler(nv,ov){
        if(this.checkedScenarioType === "Current")
          this.comp_monthType = Object.keys(comp_date_his_dic[nv.value][this.checkedShipType][this.checkedStarts+this.checkedEnds])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
        else if(this.checkedScenarioType === "Future-SSP245")
          this.comp_monthType = Object.keys(comp_date_245_dic[nv.value][this.checkedShipType][this.checkedStarts+this.checkedEnds])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
        else if(this.checkedScenarioType === "Future-SSP585")
          this.comp_monthType = Object.keys(comp_date_585_dic[nv.value][this.checkedShipType][this.checkedStarts+this.checkedEnds])?.map(item=>({"name":(item<10?'0':'')+item,"value":item})) || [];
        this.checkedMonthType = this.comp_monthType[0] || {};
        this.checkedDayType = {};
      },
    },
    "checkedMonthType":{
      handler(nv,ov){
        if(this.checkedScenarioType === "Current")
          this.comp_dayType = comp_date_his_dic[this.checkedYearType.value][this.checkedShipType][this.checkedStarts+this.checkedEnds][nv.value]?.map((item,index)=>({"name":(item<10?'0':'')+item,"value":item,})) || [];//"disabled":index!==0
        else if(this.checkedScenarioType === "Future-SSP245")
          this.comp_dayType = comp_date_245_dic[this.checkedYearType.value][this.checkedShipType][this.checkedStarts+this.checkedEnds][nv.value]?.map((item,index)=>({"name":(item<10?'0':'')+item,"value":item,})) || [];//"disabled":index!==0
        else if(this.checkedScenarioType === "Future-SSP585")
          this.comp_dayType = comp_date_585_dic[this.checkedYearType.value][this.checkedShipType][this.checkedStarts+this.checkedEnds][nv.value]?.map((item,index)=>({"name":(item<10?'0':'')+item,"value":item,})) || [];//"disabled":index!==0
        this.checkedDayType = this.comp_dayType[0] || {};
      },
    }
  },
  computed: {
    conditions_checked: function(){
      this.searchTree(this.datatree);
      return this.treeDefaultArr;
    },
    hisdate:function(){
      return this.valueY.name+"-"+this.valueM.name+"-"+this.valueD?.name || "-01";
    },
    isHistory:function(){
      return !!historyRange[this.valueY.value];
    },
    zoomBigName:function(){
      return this.tab_radiobefore==="0"?"Concentration":(this.tab_radiobefore==="1"?"Thickness":"RIO");
    },
    comp_left_num:function(){
      if(this.checkedEnds!=="Rotterdam") return 0;
      const left = Object.values(this.comp_left_item);
      const right = Object.values(this.comp_right_item);
      let temp = 0;
      left.forEach((item,index)=>{
        if(item<right[index])temp++;
      })
      return temp;
    },
    comp_right_num:function(){
      if(this.checkedEnds!=="Rotterdam") return 0;
      const left = Object.values(this.comp_left_item);
      const right = Object.values(this.comp_right_item);
      let temp = 0;
      right.forEach((item,index)=>{
        if(item<left[index])temp++;
      })
      return temp;
    },
    comp_left_item:function(){
      return this.comp_le_data[this.checkedStarts+this.checkedEnds] && this.comp_le_data[this.checkedStarts+this.checkedEnds][this.checkedShipType][this.checkedScenarioType][this.defaultCompareDate.replaceAll("-","")] || this.comp_item_default;
    },
    comp_right_item:function(){
      return this.comp_ri_data[this.checkedStarts+this.checkedEnds] && this.comp_ri_data[this.checkedStarts+this.checkedEnds][this.checkedShipType][this.checkedScenarioType][this.defaultCompareDate.replaceAll("-","")] || this.comp_item_default;
    },
    comp_yearType:function(){
      const years = comp_yearType_dic[this.checkedScenarioType];
      this.checkedYearType = years[0];
      return years;
    },
    defaultCompareDate:function(){
      return (this.checkedYearType?.name ?? this.comp_yearType[0].name) + ((this.checkedMonthType.name && ("-"+this.checkedMonthType.name)) ?? '') + ((this.checkedDayType.name && ("-"+this.checkedDayType.name)) ?? "");
    },
  },
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
.channel_index{
  width: 100%;
  height: 100%;
  position: absolute;
}
::v-deep div.v-step {
  background-color: #6a95ef;
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
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAAA+CAYAAADqFbO0AAAY3UlEQVR4Xu1deXBdV3n/fefce9+mzZa8y5v0JG/gBBwSBwo4AZzYllyghMJQMy1tyjJAhqUMTBkIpbRlafmDaSl0hg5boUnZtNhxEhITCC7BTpzNmxbbsR1bkbVLb7n3nPN1zn1SrCpanpbnKMGaubrvvXveWb7vd77zbec8wnT/mAlEPN2vXS3/0qAAvTS6ebWXlgJvbuNSMQh17zU0NCVFZjhxrwJiSsrOjwJbDrG7JIbyjjS6Dl9HQaF6dRUQhaLsS7TeeQWIuhb+eFMSX/+D1lHuZLHzvVi5t4rOvBiYmleAeDEIMB/brGvn+kHCfQfWUuZK9+8qIK40xed5ey8/QDBTXRs+2VSNr72YS8+OFi7ZV0P9BeX/DC2JyfpUUEDsfoaXN6yiZwtKlHlaeX0LbwJhSWM1DoDIFKKb1vIoL8NSyXhuXw1l56KNggGi/lmOmxRuIB/nmjZSy1x09modhadAwQBR+K5fbaEQFJgzQNx6jNe4DhJRHy13byK/EJ19qde56zRvoACfbaqh98zXscwZILZf5IQ3gHVGoutK2NB1LfweMtjfuI4uzVfijtevuhZ+dVMNPTpf+zxngJivA7zar+lR4CUNiN2dXGx68YmmGrpzesOeX6Vt0CqaxeL5oHy/pAExv9h6uTe3nuI1HqPGBDjatI7OT9XP285ybMhHcm81PTlV2UI/f1kDYncr38pxPNS4nFKFJqStv66F68GoEBJPKg2VCHD0xVKwbznKy/ZvQMd0fSAva0DUtfCNGqHTpu1KAGJHC0dGO4h2tHC1lCinAO0zVX63MTtF7diqGd6+JD1gx7GjlV8ngAxpXGyqxbPjeWTr2rgGwJKmavrNdMb+sgbE7uO8XBm4eze+OJFDa3lFU6iUWVz62Qbqmg5jRsrexizbD0OMzYHY9iA7RUksaaocHxBTtbX7OBcHEslAoP3+auobKf+yBsRURLn6/IUUuAqIeYqKW1o56RLeAeD3TdX0yyvVzYICwgZfli3AsqZqeuZKDWiidqyI9IHl96ynE2PL7GrlVzQn6alC9XF3Oy/RjF3N1fSdabXBTDta4c1V4CqftuccELva+fUqg9b9G+mCVbIksEcDD85Esatr52uMQnRvLf0un8FMVmYLs7vsHBY3rXyhGbirjT/IGgf31tKR2bYz0ffrT/Na+NjUWEtNhWpjLuqdW0DkchH2MPDoRDPOzlQehG68bmpT8NbjvM5xsLEpST+bi8G+mHXccpYXRoYQbVg/t+kAG59m7+gcxo7mFhB5UHxHC1cCyO6roc48il+RIvWt/OcGOFTIZSPfgexq47fLEtzXsIgG8vlOXSt/mRjlAw4+PFHKXV0brzIZ+Hs30cWp6nwBIHa282qpsUYBR2fNtDtZ1O1BZSyDi5M5aCwRmqvpp1N19g/huV1mi5JQdxPp8ca7u5U/pYG9o8Fb18rfpV58cCKpu6uF/4wMTjato0emouG4EuLGsxyr6ADlI9Yna2DXSd4gHKxEFL+5Ut7CqQZ8pZ7vbOVbhUBRUxX9z2Rt7nyal7IHne/k29HCr3IM0o3r6PhIvXUneEVTLS5M5JUMHWZJBPl4LWn3SX6DIdwcS+KLE6HyShHxD7Wd7a28+N4kPTcfxk/bTnG02OCV0So8OhYQVjM/TIXbJVQIAth8AyLc3Jikr+06wwuaV1NPIdp5udY5oVJps4aFwTXNtXg4H1Gz8xi/Ujp4R+MP8QXcWZik0hcwIWenr9hXQ+fGY5BVpuaDD2Qq8LzlOC/3BEqba+nYVGUL/XxOrYz6Qxyfrd4xrQHnzNy3CoGjDVUvdDiNrWvYUfaRpmr6l2m1U+DCNl6RPYWKhirqKHBTU1Y/bUDsbOParI+uX84wWDNlj/IsYJlbyE2vYTcs4E7hT+Di4HgOrTy7WrBibz7EpdEyfGIwi68c2ESDc9HQhICw4dMgg679m6h7dEO7Wvm1htExE8/jXHT4ec3aejGB3iuRvzlZv+ta+XYBPNiQpNa5HF++dVnnXSaCM6N9EHVt/AFtcN9MeDQhIHae4huQwpl8nBn5dn6ycvUnuEIJ0Hjml50J92/BwPYnEHMSeL2O4JH9K6l7++O8OBrD+oZaemgu+lCIOnae4msjGZydafh7Jn3a3cbXRarw2EysxmkvGTPpYD7f2dHCizxC9BdJOju2vM05vL8KA1a53d3O6wSh4+drqRd3ssDnweMliFii9Bfj+IHFcyNKJwXzKV6v00iPl3dR18LbCOhsrKGnX1AHsxhR2K3pKW0SzAQKcj40nIsy8wYQkxL8EMc5hoqmjTib737NHS28VRACw0jvq6GjY+vf9hiXYQXUjADDTPWnsU5oLPxFNQ7uaMNrJSM93fT6+hO83tfos4FA27/dJ/ntDbX5eWztVsG0wLnRyS2zAcStx3mzK7F0fE/lbzlWvgj/CoN/D92dlgBt+IRifLuQG1hDnwiwBj4w2hNn/SHlHfDuXTr5UTq723mzNihqTtJvpyKOnZFxifjP19Lp8crWtfF7iHFDYzXusCC0FhSKER9JhXuxfTR1rfynAD6qGTtmyxPr6YSLtyLAqfwkhNW2z2H5bDVty/CJAjC3PM0L3Si+RRpDEOhvTNJHp2JqQZ8Pi/PbnmZvQGB5XxE6ygPUNlXR4wVtdxaVW5C7hNcIhd9NN4fTRk0rFdz8ADGLTo7+an0bf44ZT04Uzq5v5R22fHYID+V1sNYc9WuyarY/zoloAtc2JOnhQjdn95nkG+Ucty/Mwire925GOh9n4nh1XFFA5ENQmy/RsD6/0G8+9eVbxi4BFedQ7GXwXUM4EM/iG5NFaK2L3HHQHiq3k/z9cSuv1IxrAx8PjzXh64/zzUaiyBC6okBLIHBrbC1+fDfNZm8sEzDzYyPnHSBGaBtudsmiazJw1LXwvwmB7zRU06F8GT9RuZ2neKljUGkM3kKE1wG4gF7cMdbzagGrPVxLAfqDOM5a83e8Oq0DzwFKJuqbBWAVYDKt+JpW+GYqimdme4RQXTt/GAabmpL0wXzoYaOggcCSKGGpYfSSg855C4j6U7wVPlrHroVW17AzzYpyu6zYlL3mKvp1PgSwZepa+b1NSfreROXrWvivQPCtQmk8fHZ0cGxEkbTKa4pxZjwNv66N/8juhbDu6FQbNoyXdGOfpduxgjVeaQj3zzRn0upkOA114CZS+Y5/pJw9v4PTuJEZacNoeS6JXhvILCgg7MAz7Xg/GzzWVEMHp9XpO1nU78HbGqvw0xFTc9spLivR2NrwA9xb/x78A4DvG4FlzdV0/3h122in8ZGYyLa3exsSa/Cm5rW0f+T71hMLYJUEOrSLI6MBsauVt8QfxZG73/nC5JUwscjgJjYoJcL91u+w6yRXGYI/tv0QECexJZ+ElYloZpciBbwTwP6ZZnrZ8WMbcIAuA6qggKhv4a0Aakji3okCN9bRxAYrGod3JdnknPIMPuc4+PLZLgyNxCuGGRVpTtKDlki23MGVlLb7IjNDWNq4nk6FUmMzUiMAsjN6+UmUWikTlq9EdkTZqm/hD7HBw8LFxbkKKm1v5ZUOYYlK4NiIiWytlIl0kbo2vkMEuNs4uIMY3xvXeTWtWTT7wtMCxO52fos2KG+uxn/n4yB60zEuJw9qtGi97S6Wg68KZ214IFeYnSVBIxlV9S38BQY+yB62ugbd+ShtSuN1QiLKhAdYo9YQnh3rjLLg9F2c2b8m5wSyf/XHeS17KDEKG/fW0o9mS866s7xC+LihIc90QCspZuJeHq+fVrdJuRCzdVRNCxATEmyUC3aSMrSrFdvtmiUkqpuq6T9ny4DnGdvKOxqTtM8ynQW6jMbCkdR9u+diKIvTY6OBO1p4oyvhGBddIoObEMEDL+UD0mz+imR8QDj47mwk3qwAYVFpJG5nwq+ak3R4UgZbb+cFxCbLrbTLAgEfYeBLea+LzLS7DdU22miZDOCc0wdlykKFbvI+WSlxgisuxTFUkUGVFdnWncxApGldARxQtq/teFu/wN7ZWhRzNZnG1mMBMRUoJv4pBGbadhqR6QzOKnqcRvXe9eObivYUVwR4ZjKG2LOamte8MLvI6hN9WRR3VaNn+WG4003WsYEoIXHBJtvYWEdxKa5vrKJ7nycas9jdhu0NSbpn5DNr9XgRvKMxSd+ekknMtPM0rt+7dnobj6zPA4Tb8zUnw34w0/YnEPe7kZ2OFTIVGKYc44tRYMLMrDFb36zESDtonxSwd7LYtQc3BwkclANYLSVc6562bYQBtU25bYj1LfxGNujVAmJfDT22q5Xf1ZykH9tnVlzrYuhIH2IUg6cySMoiHLLScOdJvkE4uE5r3JVvZvVc0HTY7L2WGDwSdMvjMFV6SQJiNMGsjkAR9IwXZwmDNgCMB+0wuOF76Ny5B69OZPBEVqKiYR0u1rXhCy7wjZ9NkfVs4wSl1eh6XgkcPkXWKqYOoz+QuA0SNaTxoBE4HY+g7e6VlLbPZQQ9UynHcwGCqeoIDzz7IY5MkvM6fwFhT8E1Aa6VjCd9RoUj8BkK8JfTcWvb7XPoB553GQ9LELsRJnMYkekuKeMR3FpS0kcmksB3mNFlcx8A3PVsEidHZ6zb02XI4OB0g07jtWkdUiUaN0YexUPj+UQmAsZwXkn/ZBbivJYQ9e28HT5aLiVwsbgbYmAhzNJBxCfKPrIHhAQO1u4bDkRZxxAL1Caq8cBIfGDkWEDrWhYG7ybCcsX46HjewvoW3qOAX0wVXrZ6kfDxLQiUgfFf5ODxhjX02GjG1LfyzZciOBhpRTCdNX0i5totkekkLo52Kk0lIfJ5PieAmPOzF3OZUBgdsQvFv8AqIdE+yqyi+kMc82PZ5fs3Ra2VsYg4qDLKlN+zMXoPtmyR27993y09Tzx+6Pdfur2n4u23e5fu+maA06f5zb/r2NbxwE8eefIzH0pt/t7+0lT7iUzlG3euOnBTcvgY5mRIv51PHPnHR37wd5+vWLXVW7319bcQOd49WxZYnwVXfuxjcvPtX/prKPPA3s1FT+08lqnpGOo+t7R02ZvB0M211DyWCdue5qLiKG6HwQoFfFMIrG+uwr6ZRifzYfJ0ytC2B09Fs8k15FdCzXRTTl0rf6opSV+ZrGHrRewK4B++jtSNd90VLVl/6/YLDx88+MQX/2IQZWUCWpO9rv3kPy2JLV21SPspfuTT7zsKIUIrp3jDBm/gRHi0QwSuG4Mx0dp3fWCLLC5JmFSqT7gRcewHXzsCdgikXBgZhTCxxMrkskznRV86jly9813bz9z3k/v8vu601cJtZV5xWbTmHe9/f2/b0YfOP9T4WMXmG1b3nHjyvE4NqOiiFUWZzvNhNnN8ZXXZ0i1vuE6n04M6O5Q696t9RyJFRWrZG+ureo4dOVr+ii2L4stWLoLh7FPf+eqvE4tWiKEzLUOQ0kAptfnjf19Zsrqm7Dd/s+c3WLwYyGb1DZ/+esmCqo2v7Tv21K8OvvO19lgfO9aRKySn1V0ijH/WrP5jb61rYzYjk/j/lZsO0ycrayuXVu8ap9BIw/YusGaNhO8LlAUCeiFBSobTxXAlo8szcByG5zFisctmajpN8H3CokXipq/+6KZT/9vYfvrn3zdOUXG5jCcWZnu7BYhLIFAEx/FAJIqWrKxQOtCZ3q5+OMJAQgFCQ5AXliWnVEYiC4qXrFk/0HXhrFaZISFdUbaiZkOqt+OZTLqvHzlHmQOwK51Iwg6Ote87kUTcjsWNJIql6yWGei6eZR0oJ5IoctxIJJvq743ES8syg91dCJSOL1hameq5eB5GIxIvKxPSiaT7LnUWLVy+RmdTQ1J6YrDz7CkhpIA2vlEqU7yocnmQHuzzEgsW9J85fgIGCmQyUCYDUAZapWAoBTYpGD0EjTTAaSjlQ4osVJCFgA+jFbLSwBhCjAlBIGEQia9YX3rN+z97x8G/fffnkOY+OKfTaIX9Da58TtyfbEWwfCPC+vXlUEqEMzFhCEFUQPoOSLjgiIeojkK6CUAUQ8gEhPAgmCAEhSAQQoOcAJ7wISgD11EQLsMhCceNwhFxkIzBEwkhZTmkXAApY3aWG+lEyBFRODICKVw4nhCOcOC5EtIRcCST41rwERxJkMKBCJ8RpMPkCIZw2M5Cqx57IrYQgnRAQbdDXjEDSjFnBQnhSKco4KDHE95CY3RKs0kTs2NgfMHCi8vY2pQeekZCxo1WvmZlmWQiTmSZH6R7iOEFfnYQrEgaKmXlK1bKCGOiQTaTgTYElSUoA1YqbBkqYGJIDlQAP1CJovLVQ53nj0MbFYuXlPuDfZ2J4kUVUKov1d3RFqQGe6B1Bkr70BxAq0wIDMMMZSRYe4vXv+bVKpMZ6j5x+BBYX4RS52H4OWRoEDaPor9fh3wpLTXAsF8uvTEHBDs5lboMinjchBP48OHnJRNhz55VkLE4XJZwXRfkxSBNFELEpevGIURMOE4RC8QFUUS4riMkOSSt41dK4UkBIUm4HsPxDDz72iF2XVe6rgfhhQwnx4t7Tny1EeRb0kE4MSInSkSeIOE4QkoSUgrY6u2Uk0IIQRIC4WuSRCRZSAkpBYdviVhAGJn7JVElGYZAUjIpQWyfkrASkCGIwovAbM+sNLnPqIjB/QwGE0kDGMNMBhQxgjPacMQQ2BA52mifNZjZWBCBDSeUUQGMlloprYlJQ1vVAZo1jAn/w7CSbCCM8QPWyodRzKxAbEgrPyWMhmCOB+nMeR2kn+Vs0McqGAovPxhkrYbID9KsVMaRMqLSWV9nsspAZUjxoDG6XxnTB4VBBDIFR/kYogAipZHJKPi+QSZjUF5u0NHBKCpitLcziosZixYx7r579DJFhC99fxlcHUc8KsEiAkYMDmLSFQkpnTiDEsKVcSFk1JEiQoI8IaUrXSks/8iREkJAOI6dh0SOICFdFpafrutYKUEs44JECQmxgFhUSKYFJETUstchKSzTHLteACRBGH4NaeU+EyQTCYL9HPYuLWcJJGCf2fUsfMb2brka3i0CGLDcDd2x9nNh+Z4TrjkNYnjBptx7K3MtUrR9PfKeAE2WzbnPlLGAYRgGtLEg4PA7NpHA2HL2ss+ef81shYYBa0M8aGAyBhjSZIaMML1Mpk+xOc9Kn9dKP8dG92ljBpi5R2ZNb0ZkBgMnmhHprF6aKIshBTyXfm6IAsXdgWJkA0bGZ9gt2xd7DSKLDS4M5JbtpzsZm44yPv95u1VhRCuY9Ed4CVu2VcATEQgh4SoPMuaBTRQehdIBRFa8R6WwzHUs5ynHAanhRLOICp/gBHBJw41pODAglx3HamxSshNx4JDLUhZD0BohaB2ks9guESSdODliAUuRILsUSemQa5cEKcguC66UcBwJ4ZJdOsguHXapsuJBOoC0kzyUD/Zuta0cTChc04yVB2EymbBQCLE0opPlZgWz1U00jDYgYZhDbQPMhmCMYGJhXw9f9nNYfQJa2WXBQCuG1gZGmfC9CTSU0RwMv1cBs9IMpVKscUYo/bQ25oJQ6hIDvay4WwvVI330ZLLuIBKcRiSi8NRTBt/6lsonojxXyuRIPYSKimLE4w6UkogoCd91EZceyOoKURdCS5BdDlgh4gYAB8iSj0gkg3jc/qyPQuwc48wYhXKkhaqqHB86OwXKyqIoViXwHRcxO+lkFFosgeRlYC4HUAZJcRBFIZwoJBKQogzCKYEjYhDSDXUYIi8EsGU0iXBFseAI5bUUdi3tBkQ/CJmc4EExCAlwqEBbUPggHgSjDxTmRA6AOQs74Y2xiq6ECuIAJWDYgzESWtnFA9AWZhYMJoDhDFhloNmHNkOAGYSPQbBJw2gNre0iE8CKdKPPQVInLgU+fF9jYEDj8OFQ8Mw1U2dTX86CuGzKDL9fI7Dct5/b2cUoKdE4etTOqtwUGmMazaYDYdtbtjjo6pIoKZEozgpkrCVTQvAyEpo8SDcKAw8eXBirl5gI2FolWtrFwq4pub5aRjs9EBiApACBb+B6AppdSFveaupMMMKH4/jQWR+OCNBrFErTl4/w8RcS0mmBWFZAFYXmcFi/vcc1ISWtIsuIpA3SkZyFNTBgkEgYdHaanEJnYVjMOHDA0mvc44FmSbeCfH0EEKMrH21uPi9jx4Bmos5c/m5lpVXRrLkkQptf69zdzkAuEqFFY98P+wPC+9gfmV+wQsaiUeKihCyvXBv1VcCdv2oaAmJhNC+nBDBFV610Mp1n1dq3v69c9w+qVP+zQVlyc1HfiSP9gxdOZxduuD7mVayMdbcc7i8uX+bIeNTpO/5UqvfJ34c/XBbb8CrXrvCVr99RbrJDqn3vD7tKV2+OkD/AxZu3FlmNd+D82fSC2k0Leo4/0et4rry4r6m/ZPMrovHypZFU57M+sln0P9PiL7n+5pKO3/1yYOE1r0kwO9Rz/HAK2Wy4bi+89vr4UFe3yp49GyCT+yw3ZvvznFEAmcufXaZFbqti7jJIpXJ3ewmRu6yv49KlnAp0+Rrtp5jIZzFan7D05P8Dihv2IstrZroAAAAASUVORK5CYII=');
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
            background: rgba(0,0,0,0.6) url('../../assets/images/panel1.png') no-repeat;
            background-size: 100%  100%;
          }
          ::v-deep .ys_dialog .el-dialog{
            background: rgba(0,0,0,0.3);
            .el-pager li {
              background-color: transparent;
              color: #FFFFFF;
              //background-image: url('../../assets/images/panel.png');
              background: rgba(0,0,0,0.6) url('../../assets/images/panel1.png') no-repeat;
              background-size: 100%  100%;
            }
          }
          ::v-deep .hxdb_dialog .el-dialog,
          .el-pager li {
            background-color: transparent;
            color: #FFFFFF;
            //background-image: url('../../assets/images/panel.png');
            background: rgba(0,0,0,0.6) url('../../assets/images/panel1.png') no-repeat;
            background-size: 100%  100%;
            border-radius: 5px;
            opacity: 1;
          }
          ::v-deep .hxdb_dialog .el-dialog {
            .input_row:nth-child(n+1){
              padding: 20px;
            }
            background-color: rgba(0,0,0,.5);
          }
          ::v-deep .hxview_dialog .el-dialog {
            background-color: transparent;
            color: #FFFFFF;
            //background-image: url('../../assets/images/panel.png');
            background: rgba(0,0,0, 0.9) url('../../assets/images/panel1.png') no-repeat;
            background-size: 100%  100%;
            border-radius: 5px;
            opacity: 1;
            float:right;
          }

          ::v-deep .canpass_dialog .el-dialog{
                //background-color: #081c32;
                background-color: transparent;
                color: #FFFFFF;
                //background-image: url('../../assets/images/panel.png');
                background: rgba(0,0,0,0.6) url('../../assets/images/panel1.png') no-repeat;
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
          ::v-deep .zoomBig_dialog .el-dialog{
                //background-color: #081c32;
            background-color: rgba(0,0,0,0.65);
            color: #FFFFFF;
            //background-image: url('../../assets/images/panel.png');
            background-size: 100%  100%;
            border:1px solid #ddd;
            .el-dialog__title{
              color: #fff !important;
              font-size: 20px;
              font-weight: bold;
              text-shadow: 0 0 black;
            }
            .el-dialog__header {
              border-bottom:1px solid #ddd;
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
              padding:5px;
              margin:15px 0;
              background-color: rgba(37,38,43,.4);
              list-style-type: none;
              border-radius: 0 15px 15px 0;
            }
            li:last-child {background-color: transparent;}
          }

    ::v-deep .el-radio-button__inner{
      background-color: transparent;
      color:#fff
    }
    .el-radio-button__orig-radio:checked{
        color: #FFFFFF;
      }

      #latlng_show {
          width: 545px;
          height: 10px;
          position: fixed;
          top: 11%;
          left: 38%;
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

  ::v-deep .el-tabs__item.is-active {
    color: #fbff00;//选中
    opacity: 1;
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
    padding: 10px 10px;
    color: #fff;
  }
}
.routeingview{
  list-style: none;
  li:first-child{
    text-align: left;
    width: 100%;
    display: inline;
    line-height: 20px;
    float: left;
    //padding: 10px 1px;
    color: #fff;
  }
  li:nth-child(n+1){
    text-align: left;
    width: 100%;
    display: inline;
    line-height: 20px;
    float: left;
    padding: 10px 10px;
    color: #fff;
    padding-left: 0px;
  }
  li:nth-child(n+2){
    padding-left:15px;
  }
}
.dataview{
  .el-radio{
    margin-top: 20px !important;
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

.routeview,.routeingview{
  .iconview{
    font-size: 18px;
    color: #f00;
    cursor: pointer;
  }
  .iconview_text{
    cursor: pointer;
  }

  .viewicon{
    background-image: url('../../assets/images/icon_hide.png');
    background-size: 100% 100%;
    width: 20px;
    display: inline-block;
    height: 18px;
    margin: -5px 10px;
    cursor: pointer;
  }
  .unviewicon{
    background-image: url('../../assets/images/icon_show.png');
    background-size: 100% 100%;
    width: 20px;
    display: inline-block;
    height: 18px;
    margin: -5px 10px;
    cursor: pointer;
  }
  .el-radio{
    margin-top: 20px !important;
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
    .el-radio__label{
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
      li {
        font-size: 17px;
        span.icon-win{
          font-weight: bold;
          text-decoration: underline;
        }
        span.icon-win+span{
          background: url('../../assets/images/win1.png') no-repeat left top/contain;
          display: inline-block;
          height: 22px;
          width: 22px;
          margin-left:1em;
          vertical-align: top;
        }
      }
      .el-row::before, .el-row::after {
        display: block;
      }
    }
    i.icon-champion {
      background: url('../../assets/images/number1.png') no-repeat left top/contain;
      display: inline-block;
      height: 50px;
      width: 50px;
      vertical-align: middle;
      position: relative;
      left:-15px;
    }
    i.icon-win{
      background: url('../../assets/images/win1.png') no-repeat left top/contain;
      display: inline-block;
      height: 18px;
      width: 18px;
      vertical-align: middle;
    }
    i.icon-loss{
      background: url('../../assets/images/loss1.png') no-repeat left top/contain;
      display: inline-block;
      height: 18px;
      width: 18px;
      vertical-align: middle;
    }

    .line_legend{
      list-style: none;
      li{
        color: #fff;
        margin: 5px;
      }
    }

    .reline{margin: 3px 10px;}

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
      .ship_infos{
            position: absolute;
            top: 24%;
            left: 20px;
            background-color: transparent;
            color: #FFFFFF;
            background: rgba(0,0,0,0.6) url('../../assets/images/panel1.png') no-repeat;
            background-size: 100%  100%;
            .input_row{
              margin: 15px;
            }
          }
          .ship_view{
            position: absolute;
            top: 18%;
            right: 20px;
            background-color: transparent;
            color: #FFFFFF;
            background: rgba(0,0,0,0.6) url('../../assets/images/panel1.png') no-repeat;
            background-size: 100%  100%;
            .input_row{
              margin: 15px;
            }
          }
           .el-tabs__item{
            color: #fff;
            font-size:17px;
            .is-active{
              color: #fbff00!important;
            }
          }

          .check_dataview{
            display: flex;
            margin: 10px auto;
            .el-radio{
              margin: 0px!important;
            }
            .data_item{
              margin: auto 10px;
              .el-radio{
                display: flex;
                align-items: center;
              }

              .lvl2item{
                padding-left: 10px;
                display: inline-block;
                margin-top: 10px;
              }
              .el-checkbox__input{
                vertical-align: top;
              }
            }
            .el-checkbox__label{
              color: #fff;
            }
          }
  span.ico_start{background: url('../../assets/images/startpoint_green.png') no-repeat left top/contain;color:transparent;}
  span.ico_end {background: url('../../assets/images/endpoint.png') no-repeat left top/contain;color:transparent;}
  .iscurdate{
    font-weight: bold;
    color: #ff8200;
  }


  //选中框和文字没对齐
    .data_item .el-checkbox{
        .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #ffffff;
        }

        .no-selectable {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
    }
    //打印日志 样式
    .printlog{
      .datalog{
        border:0px solid #f0f0f0;
        cellspacing:1;
        cellpadding:0;
        text-align: center;
        td{
          line-height: 3vh;
        }
      }
    }
</style>
