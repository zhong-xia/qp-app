<template>
  <!-- 需要一个swiper组件
    swiper 里面的滑动模块  swiperSlide
  分页器配置  插槽slot 配置分页器-->
  <swiper :options="swiperOptions">
    <swiper-slide v-for="(item,index) in swiperImgs" :key="index">
      <img class="swiper-slide-img" :style="{height:height}" :src="item.img" />
    </swiper-slide>
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  props: {
    // 指定slide高度
    height: {
      type: String,
      default: "auto"
    }
    // 数据源
    // swiperImgs:{
    //     type:Array,
    //     required:true,
    //     default:function(){
    //         return [];
    //     }
    // },

    /**传入1 或 2
     * 1.当前分页器为圆点
     * 2.为数字分页器
     */
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperImgs: [
        {
          id: 1,
          img:
            "http://img3.imgtn.bdimg.com/it/u=467425175,1431447724&fm=26&gp=0.jpg"
        },
        {
          id: 2,
          img:
            "http://img2.imgtn.bdimg.com/it/u=2826846062,3172553872&fm=26&gp=0.jpg"
        },
        {
          id: 3,
          img:
            "http://img3.imgtn.bdimg.com/it/u=949647474,3564039667&fm=26&gp=0.jpg"
        }
      ],
      //   swiper配置
      swiperOptions: {
        //   自动滚动
        autoplay: true,
        // swiper 高度 跟随slide高度变化
        autoHeight: true,
        // 分液器设置效果
        pagination: {
          // 分页器对应的 html 元素
          el: ".swiper-pagination",
          // 分页器的样式
          type: "bullets",
            // type:"fraction",
          // 分页器内的元素
          bulletClass: "custom-bullet-class"
        }
      }
    };
  },
//   created: function() {
//     this.initPaginationLayout();
//   },
//   methods: {
//     /**
//      * 根据分页器类型配置对应分页器
//      */
//     initPaginationLayout: function() {
//       switch (this.paginationType) {
//         //圆点分页器
//         case "1":
//           this.swiperOptions.pagination = {
//             // 分页器对应的 html 元素
//             el: ".swiper-pagination",
//             // 分页器的样式
//             type: "bullets",
//             // 分页器内的元素
//             bulletClass: "custom-bullet-class"
//           };
//           break;
//         case "2":
//           this.swiperOptions.pagination = {
//             el: ".swiper-pagination",
//             // 分页器样式为数子
//             type: "fraction"
//           };
//       }
//     }
//   }
};
</script>
     

<style>
/* 圆点样式 */
.swiper-pagination {
  bottom: px2rem(12);
  height:30px;
  border: 1px solid #fff;}
  .custom-bullet-class {
      display: inline-block;
      width:20px;
      height:20px;
      border-radius: 50%;
      margin-left: 10px;
      background: #000;
  }
  .swiper-pagination-bullet-active {
    background: white;
  }

img {
  width: 100%;
}
/* 数字分页器样式 */
/* .swiper-pagination-fraction {
 position: relative;
 width:80px;
 background-color: rgba(0, 0, 0, 0.3);
 border-radius: 20px;
 color: #fff;
 font-size: 20px;
 float: right;
 right: 0px;
 top: -35px;
}
  .swiper-pagination-current {
    line-height:30px;
  } */


</style>
