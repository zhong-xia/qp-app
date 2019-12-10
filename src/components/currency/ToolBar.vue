<template>
  <!-- 为于整个页面的最底部 -->
  <!-- <div class="tool-bar" :class="{'iphonex-bottom': $store.state.isIphoneX}"> -->
    <div class="tool-bar">
    <!-- tab按钮 ,需要有一个数据源，驱动数据视图-->

    <div class="tool-bar-item" v-for="(item,index) in toolBarData" :key="index" @click="onChangeFragment(item,index)">
      <svgicon name="car-Empty" width="10" height="10"></svgicon>
      <img class="tool-bar-item-img" :src="[index === selectItemIndex ? item.hIcon : item.nIcon]" />
      <p
        class="tool-bar-item-name"
        :class="{'tool-bar-item-name-h' : index === selectItemIndex}"
      >{{item.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toolBarData: [
        {
          nIcon: require("../../assets/img/svg-icons/首页选中.svg"),
          hIcon: require("../../assets/img/svg-icons/首页.svg"),
          name: "首页",
          componentName: "home"
        },
        {
          nIcon: require("../../assets/img/svg-icons/分类选中.svg"),
          hIcon: require("../../assets/img/svg-icons/分类.svg"),
          name: "分类",
          componentName: "sort"
        },
        {
          nIcon: require("../../assets/img/svg-icons/cart_empty.svg"),
          hIcon: require("../../assets/img/svg-icons/购物车.svg"),
          name: "购物车",
          componentName: "shopping"
        },
        {
          nIcon: require("../../assets/img/svg-icons/我的.svg"),
          hIcon: require("../../assets/img/svg-icons/我的选中.svg"),
          name: "我的",
          componentName: "my"
        }
      ],
      selectItemIndex: 0
    }
  },
  methods:{
      onChangeFragment:function(item,index){
          this.selectItemIndex = index;
          this.$emit('onChangeFragment',item.componentName);
      },
      // 指定切换的 tab 页
      pushFragment:function(index){
        // 调用 onChangeFragment 切换对应的 tab
        this.onChangeFragment(this.toolBarData[index],index)
      }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/style.scss";
.tool-bar {
  width: 100%;
  position: absolute;
  bottom:0;
  height: px2rem(46);
  display: flex;
  justify-content: space-around;
  background: #fff;
  box-shadow: 0 0 px2rem(16) 0 rgba(0, 0, 0, 0.2);
  border-top: 1px solid $lineColor;
  z-index:1000;
  &-item {
    text-align: center;
    padding: px2rem(4) px2rem(12);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-img {
      width: px2rem(22);
      height: px2rem(22);
    }
    &-name {
      font-size: $infoSize;
      margin-top: px2rem(4);
      &-h {
        color:red;
      }
    }
  }
}
</style>