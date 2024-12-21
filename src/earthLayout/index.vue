<template>
  <div class="app-wrapper">
    <!--    <div class="app-wrapper" :style="{ '&#45;&#45;current-color': theme }">-->
    <app-main />
    <!--      <right-panel v-if="showSettings"> </right-panel>-->
  </div>
</template>

<script>
// import RightPanel from "@/components/RightPanel";
import { AppMain } from "./components";
// import { mapState } from "vuex";
// import variables from "@/assets/styles/variables.scss";
export default {
  name: "earthLayout",
  data() {
    return {};
  },
  components: {
    AppMain
    // RightPanel,
    // Sidebar
  },
  computed: {
    // ...mapState({
    //   theme: state => state.settings.theme,
    //   sideTheme: state => state.settings.sideTheme,
    //   sidebar: state => state.app.sidebar,
    //   device: state => state.app.device,
    //   showSettings: state => state.settings.showSettings,
    //   needTagsView: state => state.settings.tagsView,
    //   fixedHeader: state => state.settings.fixedHeader
    // }),
    // variables() {
    //   return variables;
    // }
  },
  methods: {
    // handleClickOutside() {
    //   this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    // }
  }
};
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;

  /*&.mobile.openSidebar {*/
  /*  position: fixed;*/
  /*  top: 0;*/
  /*}*/
}

/*.drawer-bg {*/
/*  background: #000;*/
/*  opacity: 0.3;*/
/*  width: 100%;*/
/*  top: 0;*/
/*  height: 100%;*/
/*  position: absolute;*/
/*  z-index: 999;*/
/*}*/

/*.fixed-header {*/
/*  position: fixed;*/
/*  top: 0;*/
/*  right: 0;*/
/*  z-index: 999;*/
/*  width: 100%;*/
/*  transition: width 0.28s;*/
/*}*/

/*.hideSidebar .fixed-header {*/
/*  width: 100%;*/
/*}*/

/*.mobile .fixed-header {*/
/*  width: 100%;*/
/*}*/
</style>
