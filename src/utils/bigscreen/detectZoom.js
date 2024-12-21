/**
 * @description 校正windows页面在系统进行缩放后导致页面被放大的问题，通常放大比例是125%、150%
 * **/


export const detectZoom = () => {
  let ratio = 0
  const screen = window.screen
  const ua = navigator.userAgent.toLowerCase()
  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI
    }
  } else if (
    window.outerWidth !== undefined &&
    window.innerWidth !== undefined
  ) {
    ratio = window.outerWidth / window.innerWidth
  }
  if (ratio) {
    ratio = Math.round(ratio * 100)
  }
  return ratio
}

// 监听是否全屏状态
export const onresize = ()=>{
      let isFullscreen = false;
      // 利用屏幕分辨率和window对象的内高度来判断兼容IE
      let winFlag = window.innerHeight === window.screen.height;
      // 利用window全屏标识来判断 -- IE无效
      let isFull = window.fullScreen || document.webkitIsFullScreen ||
              document.mozFullScreen ||
              document.fullScreen ||
              //谷歌浏览器及Webkit内核浏览器
              document.webkitIsFullScreen ||
              document.webkitRequestFullScreen ||
              document.mozRequestFullScreen ||
              document.msFullscreenEnabled;

      if (isFull === undefined) {
        isFullscreen = winFlag;
      } else {
        isFullscreen = winFlag || isFull;
      }
      console.log(isFullscreen);  // true全屏   false不是全屏
      return isFullscreen;
    }
