
//风场显示
const showWindy = function () {
  $('#windycanvas').show();
};
//风场隐藏
const hideWindy = function () {
  $('#windycanvas').hide();
};
//设置地图操作，便于使用风场
const initWindy = (windy) => {
  /**
  *如果处于全球状态就设置为[]（只要有一个角获取不到坐标就表示全球状态，实时计算）
  **/
  var globalExtent = [];

  //获取当前三维窗口左上、右上、左下、右下坐标
  var getCesiumExtent = function () {
    var canvaswidth = window.innerWidth,
      canvasheight = window.innerHeight - 50;

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
      // console.log(point1,point2);
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
    console.log(windy);
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
  windycanvas.width = window.innerWidth;
  windycanvas.height = window.innerHeight;
  console.log(windycanvas.width, windycanvas.height);
  if (windy) {
    windy._resize(windycanvas.width, windycanvas.height);
  }
};

//获取风场数据、生成风场
export const getwindData = () => {
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

    resizeCanvas(windy);
    window.onresize = resizeCanvas;

    //风场参数设置
    let params = {
      viewer: viewer,
      canvas: windycanvas,
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,
      speedRate: 5000,
      particlesNumber: 5000,
      maxAge: 120,
      frameRate: 10,
      color: '#3a92ff',
      lineWidth: 3,
    };

    var windy
    setTimeout(() => {
      windy = new CanvasWindy(res.data, params);
      showWindy()
      //初始化风场设置
      initWindy(windy)
      console.log('风场已经执行');
    }, 2000);
  })
}
