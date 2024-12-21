<template>
  <div id="dv-full-screen-container" :ref="ref">
    <template>
      <slot></slot>
    </template>
  </div>
</template>

<script>
import autoResize from '@/utils/autoResize.js'
import { detectZoom,onresize} from '@/utils/bigscreen/detectZoom';
export default {
  name: 'DvFullScreenContainer',
  mixins: [autoResize],
  data () {
    return {
      ref: 'full-screen-container',
      allWidth: 1920,
      allHeight: 1080
    }
  },
  methods: {
    afterAutoResizeMixinInit () {
      const { initConfig, setAppScale } = this;
      initConfig();
      setAppScale();
    },
    initConfig () {
      const { dom } = this;

      dom.style.width = `${this.allWidth}px`;
      dom.style.height = `${this.allHeight}px`;
    },
    setAppScale () {
      let winzoom = detectZoom();
      let isFullScreen = onresize();
      const { allWidth, allHeight, dom } = this;

      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight+145;
      if(isFullScreen){
        console.log("****winzoom****",winzoom);
        currentHeight = document.body.clientHeight;
      }

      dom.style.transform = `scale(${currentWidth / allWidth}, ${currentHeight / allHeight})`;
      const m = detectZoom();
      console.log("**----***",m);
       //判断屏幕是否为4k
      if (window.screen.width * window.devicePixelRatio >=3840) {
        // switch (m) {
        //   // 4k屏时屏幕缩放比为100%
        //   case 100:
        //     document.body.style.zoom = 100 / 50;
        //     break;
        //     // 4k屏时屏幕缩放比为125%
        //   case 125:
        //     document.body.style.zoom = 100 / 62.5;
        //     break;
        //     // 4k屏时屏幕缩放比为150%
        //   case 150:
        //     document.body.style.zoom = 100 / 75;
        //     break;
        //     // 4k屏时屏幕缩放比为175%
        //   case 175:
        //     document.body.style.zoom = 100 / 87.4715;
        //     break;
        //     // 4k屏时屏幕缩放比为200%
        //   case 200:
        //     document.body.style.zoom = 100 / 100;
        //     break;
        //     // 4k屏时屏幕缩放比为225%
        //   case 225:
        //     document.body.style.zoom = 100 / 112.485;
        //     break;

        //   default:
        //     break;
        // }
        document.body.style.zoom = 100 / (Number(m)/2);
      }else{
        document.body.style.zoom = 100 / Number(m);
      }
    },
    onResize () {
      const { setAppScale } = this;
      setAppScale();
    }
  }
}
</script>

<style lang="scss">
#dv-full-screen-container {
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
