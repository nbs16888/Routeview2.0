<template>
  <div :style="{ visibility: visibility }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vue-text-dot",
  props: {
    // 间隔时间
    interval: { type: Number, default: 75 },
    // 光标 建议有表格的时候不要使用光标 会导致渲染异常
    cursorStr: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visibility: "hidden", //
      timer: 0, // 定时器
      initialDom: null, // 记录初始dom
      progress: 0, // 当前文本书写进度
      // writeStatus: "NotStart",// 当前书写状态=> NotStart: 未开始；Processing：书写中；Completed 书写完毕
    };
  },
  mounted() {
    // 拷贝初始所有dom 便于重新开始
    this.initialDom = JSON.parse(JSON.stringify(this.$el.innerHTML));
  },
  methods: {
    // 开始 / 重新开始
    start() {
      this.visibility = "visible";
      this.progress = 0;
      this.$el.innerHTML = "";
      clearInterval(this.timer);
      this.write();
      this.$emit("writeStart");
    },
    // 暂停
    pause() {
      clearInterval(this.timer);
      this.$emit("writePause");
    },
    // 继续
    continueWrite() {
      if(!this.progress || this.progress >= this.initialDom.length){
        return
      }
      clearInterval(this.timer);
      this.write();
      this.$emit("writeContinue");
    },
    // 重置
    reset() {
      this.visibility = "hidden";
      this.progress = 0;
      this.$el.innerHTML = "";
      clearInterval(this.timer);
    },
    // 书写
    write() {
      this.timer = setInterval(() => {
        var current = this.initialDom.substr(this.progress, 1);
        // console.log(current);
        // 跳过 标签渲染
        if (current === "<") {
          this.progress = this.initialDom.indexOf(">", this.progress) + 1;
        } else {
          this.progress++;
        }
        // console.log(this.progress & 1, "this.progress");
        // 如果有光标配置 拼接到最新渲染的地方
        if (this.cursorStr) {
          this.$el.innerHTML =
            this.initialDom.substring(0, this.progress) +
            (this.progress < this.initialDom.length && this.progress & 1
              ? this.cursorStr
              : "");
        } else {
          this.$el.innerHTML = this.initialDom.substring(0, this.progress);
        }
        // 文本书写进度 大于需要书写的总长度 判断为渲染完成
        if (this.progress >= this.initialDom.length) {
          clearInterval(this.timer);
          this.$emit("writeEnd"); // 打字完成后的回调方法
        }
      }, this.interval);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
