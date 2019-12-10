<template>
  <div class="sort">
    <navigation-bar :pageName="'分类'" :isShowBack="false"></navigation-bar>
    <div class="searchTop" @click="navigateSearch">
      <img src="../../assets/img/svg-icons/搜索.svg" class="search-icon" />
      <span class="search-hint">请输入搜索内容</span>
      <img src="../../assets/img/svg-icons/相机.svg" class="camera" alt="" />
    </div>

    <!-- <div class="sortContent"> -->
    <!-- 外层盒子 -->
    <div
      style="height:100%;width:330px;margin-top:20px;background-color:#EeEeEe;"
    >
      <!-- 这里的标签名称要和main.js文件中定义的组件名称保持一致 -->
      <happy-scroll color="rgba(0,0,0,0.5)" size="5">
        <!-- 内层盒子——内容区 -->
        <div class="con" style="width:330px;height:2310px;border:1px solid;">
          <div class="lcon" v-for="(item, index) in lconList" :key="index" >
            <span class="item">{{ item }}</span>
          </div>
        </div>
      </happy-scroll>
    </div>
    <!-- 外层盒子 -->
    <div
      style="width: 730px; position: absolute;right: 0;top: 210px;box-sizing: border-box;"
    >
      <!-- 这里的标签名称要和main.js文件中定义的组件名称保持一致 -->
      <happy-scroll color="rgba(0,0,0,0.5)" size="5" style="height:1620px;">
        <!-- 内层盒子——内容区 -->
        <div class="rcon" v-for="(item, index) in conList" :key="index"  >
          <img :src="item.img" alt="" class="img1" />
          <div class="rSort" v-for="(v, i) in item.rsortList" :key="i">
            <p class="title">
              <span class="lTitle">{{ v.lTitle }}</span>
              <span class="rTitle">{{ v.rTitle }}</span>
            </p>
            <div class="bottomContent">
              <div class="bottom1">
                <div class="con1" v-for="(t, f) in v.firstConList" :key="f">
                  <img :src="t.img" alt="" class="img2" />
                  <span class="font">{{ t.font }}</span>
                </div>
              </div>
              <div class="bottom2">
                <div class="con2" v-for="(s, d) in v.secondConList" :key="d">
                  <img class="img2" :src="s.img" alt="" />
                  <span class="font">{{ s.font }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </happy-scroll>
    </div>
  </div>
</template>

<script>
import NavigationBar from "../currency/NavigationBar.vue";
import { HappyScroll } from "vue-happy-scroll";
// 引入css，推荐将css放入main入口中引入一次即可。
import "vue-happy-scroll/docs/happy-scroll.css";

export default {
  data() {
    return {
      isActive:false,
      conList: [
        {
          id:0,
          img:
            "http://img4.imgtn.bdimg.com/it/u=3185377702,3894547774&fm=26&gp=0.jpg",
          rsortList: [
            {
              lTitle: "精致好品",
              rTitle: "热搜索>",
              firstConList: [
                {
                  img:
                    "http://img4.imgtn.bdimg.com/it/u=2165273331,1098443311&fm=26&gp=0.jpg",
                  font: "配件"
                },
                {
                  img:
                    "http://img5.imgtn.bdimg.com/it/u=4028856591,1495168842&fm=26&gp=0.jpg",
                  font: "配件"
                },
                {
                  img:
                    "http://img3.imgtn.bdimg.com/it/u=4079345471,320193026&fm=26&gp=0.jpg",
                  font: "配件"
                }
              ],
              secondConList: [
                {
                  img:
                    "http://img4.imgtn.bdimg.com/it/u=3260145605,1731143097&fm=26&gp=0.jpg",
                  font: "汽车轴承"
                },
                {
                  img:
                    "http://img5.imgtn.bdimg.com/it/u=3539143699,880949894&fm=26&gp=0.jpg",
                  font: "汽车轴承"
                },
                {
                  img:
                    "http://img2.imgtn.bdimg.com/it/u=3899532829,3931315499&fm=26&gp=0.jpg",
                  font: "汽车轴承"
                }
              ]
            },
            {
              lTitle: "精致好品",
              rTitle: "热搜索>",
              firstConList: [
                {
                  img:
                    "http://img4.imgtn.bdimg.com/it/u=2165273331,1098443311&fm=26&gp=0.jpg",
                  font: "配件"
                },
                {
                  img:
                    "http://img5.imgtn.bdimg.com/it/u=4028856591,1495168842&fm=26&gp=0.jpg",
                  font: "配件"
                },
                {
                  img:
                    "http://img3.imgtn.bdimg.com/it/u=4079345471,320193026&fm=26&gp=0.jpg",
                  font: "配件"
                }
              ],
              secondConList: [
                {
                  img:
                    "http://img4.imgtn.bdimg.com/it/u=3260145605,1731143097&fm=26&gp=0.jpg",
                  font: "汽车轴承"
                },
                {
                  img:
                    "http://img5.imgtn.bdimg.com/it/u=3539143699,880949894&fm=26&gp=0.jpg",
                  font: "汽车轴承"
                },
                {
                  img:
                    "http://img2.imgtn.bdimg.com/it/u=3899532829,3931315499&fm=26&gp=0.jpg",
                  font: "汽车轴承"
                }
              ]
            },
          ]
        }
      ],

      lconList: [
        "热销",
        "新品",
        "制动系统",
        "养护美化",
        "行走系统",
        "配件",
        "转向系统",
        "电器",
        "转向系统",
        "电器"
      ]
    };
  },
  components: {
    NavigationBar,
    HappyScroll
  },
  methods: {
    navigateSearch() {
      this.$router.push({
        name: "search",
        params: {
          routerType: "push"
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.sort {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
.searchTop {
  width: 96%;
  border: 1px solid;
  height: 70px;
  margin-left: 2%;
  border-radius: 50px;
  position: relative;
}
.search-icon {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 10px;
  left: 10px;
}
.search-hint {
  position: absolute;
  left: 70px;
  line-height: 65px;
}
.camera {
  position: absolute;
  width: 50px;
  height: 50px;
  right: 30px;
  top: 10px;
}
.con {
  width: 330px;
  height: 1800px;
  border: 1px solid;
}
.lcon {
  width: 330px;
  height: 200px;
  border-bottom: 1px solid #888;
  text-align: center;
}
.item {
  display: inline-block;
  font-size: 50px;
  line-height: 200px;
  font-weight: bold;
}
.rcon {
  width: 730px;
  //  padding: 20px;
}
.img1 {
  width: 700px;
  height: 400px;
}
.rSort {
  width: 700px;
  height: 650px;
  margin-top: 20px;
  position: relative;
  border-bottom: 1px solid #888;
}
.title {
  width: 700px;
  height: 100px;
  display: inline-block;
  position: absolute;
}
.lTitle {
  height: 100px;
  line-height: 100px;
  position: absolute;
}
.rTitle {
  height: 100px;
  position: absolute;
  right: 0;
  line-height: 100px;
}
.bottomContent {
  width: 700px;
  height: 800px;
  position: absolute;
  border: 2px solid #fff;
  top: 100px;
}
.bottom1,
.bottom2 {
  width: 700px;
  height: 270px;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.con1,
.con2 {
  width: 200px;
  height: 270px;
  display: flex;
  flex-direction: column;
}
.img2 {
  width: 200px;
  height: 200px;
}
.font {
  width: 200px;
  display: inline-block;
  text-align: center;
  padding-top: 10px;
}
.happy-scroll-container {
  width: 710px;
  height: 1940px;
}
</style>
