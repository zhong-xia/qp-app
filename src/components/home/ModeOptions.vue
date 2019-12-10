<template>
  <div class="mode-options">
    <div class="mode-options-item" v-for="(item,index) in dataSource" :key="index" @click="onItemClick(item)">
      <img class="mode-options-item-icon" :src="item.icon" />
      <p class="mode-options-item-title">{{item.title}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataSource: [
        {
          id: "1",
          icon: require("../../assets/img/icon1.jpg"),
          title: "制冷配件"
        },
        {
          id: "2",
          icon: require("../../assets/img/icon2.jpg"),
          title: "汽车配件"
        },
        {
          id: "3",
          icon: require("../../assets/img/icon3.jpg"),
          title: "汽车用品"
        },
        {
          id: "4",
          icon: require("../../assets/img/icon4.jpg"),
          title: "电子配件"
        }
      ]
    };
  },
  methods:{
      onItemClick:function(item){
          this.$router.push({
              name:'goodsList',
              params:{
                routerType:'push'
              }
          })
      }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/style.scss";
.mode-options {
  display: flex;
  background-color: white;
  padding-bottom: px2rem(14);
  margin-top: px2rem(20);
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  &-item {
    width: 40%;
    text-align: center;
    margin-top: px2rem(10);
    &-icon {
      width: px2rem(80);
      height: px2rem(80);
    }
    &-title {
      font-size: $minInfoSize;
      margin-top: px2rem(6);
    }
  }
}
</style>