<template>
  <!-- 
  如何在同一个组件中去展示不同的样式：
1.html  表示整个布局的结构，具体的展示样式，将有css决定
2.每种展示样式对应不同的css，也就是对应不同的类名（css)
    1.垂直列表  goods-list
    2.网格布局  goods-grid
    3.瀑布流布局 goods-waterfall
3.实现不同的展示形式，本质上就是实现不同的 css 样式

如果不允许goods单独滑动，那么久不添加 goods-scroll这个类即可
  -->

  <!-- 
  商品排序
  1.排序之后的数据源，用来在HTML中进行展示，即替换掉DataSource
  2.定义排序规则，（可以直接使用GoodsOptions中的数据源的id
  3.定义排序的方法，根据 排序规则来修改对应的排序
  -->

  <!-- 瀑布流布局 -->
  <!-- 创建商品列表的基本HTML 和css ，让rem相对于goods （div)进行排列 -->
  <!-- 生成不同高度的图片，撑起不同高度的item -->
  <!-- 计算item的位置，来达到从上到下，从左到右的一次排列 -->
  <div
    class="goods"
    :class="[layoutClass,{'goods-scroll':isScroll}]"
    :style="{height:goodsViewHeight}"
    ref="goods"
    @scroll="onScrollChange"
  >
    <div
      class="goods-item"
      :class="layoutItemClass"
      ref="goodsItem"
      v-for="(item,index) in sortGoodsData"
      :key="index"
      :style="goodsItemStyles[index]"
      @click="onItemClick(item)"
    >
      <img class="goods-item goods-waterfall-item-img" :src="item.img" :style="imgStyles[index]" />
      <!-- 商品详情 -->
      <div class="goods-item-desc">
        <p
          class="goods-item-desc-name text-line-2"
          :class="{'goods-item-desc-name-hint' : !item.isHave}"
        >
          <!-- 是否直营 -->
          <direct v-if="item.isDirect"></direct>
          <!-- 是否有库存 -->
          <no-have v-if="!item.isHave" />
          {{item.name}}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">￥{{item.price | priceValue}}</p>
          <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Direct from "../home/Direct.vue";
import NoHave from "../home/NoHave.vue";
export default {
  components: {
    Direct,
    NoHave
  },
  props: {
    /**
     * 在父元素中指定的展示形式
     * 1:垂直列表
     * 2：网格布局
     * 3：瀑布流布局
     */
    layoutType: {
      type: String,
      default: "1"
    },
    /**
     * 是否允许 goods 单独滑动
     * 默认允许 goods 单独滑动
     */
    isScroll: {
      type: Boolean,
      default: true
    },
    /**
     * 排序规则（依赖 GoodsOptions 数据源的id）
     * 1.默认
     * 1-2：价格由高到低
     * 1-3：销量由高到低
     * 2：有货优先
     * 3：直营优先
     */
    sort:{
      type:String,
      default:'1'
    }
  },
  // 所有vue项目中，都是通过数据驱动视图
  data() {
    return {
      dataSource: [
        {
          id: "0",
          img: require("../../assets/img/good1.jpg"),
          isDirect: false, //当前商品是否为直营
          isHave: true, //是否有库存，即是否缺货
          name: "山东凯马汽车配件原厂正品锐菱小卡东风小霸王V系汽油燃油箱总成",
          price: "185",
          volume: "100" //销量
        },
        {
          id: "1",
          img: require("../../assets/img/good2.jpg"),
          isDirect: false,
          isHave: false,
          name: "福田汽车配件 时代驭菱V1 VQ1柴油版 汽油版驾驶员座椅主副座椅",
          price: "288",
          volume: "10"
        },
        {
          id: "2",
          img: require("../../assets/img/good5.jpg"),
          isDirect: true,
          isHave: true,
          name: "艾镁ADS-4L焊具便携式焊炬氧焊枪小型氧焊机空调冰箱铜管制冷配件",
          price: "338",
          volume: "9"
        },
        {
          id: "3",
          img: require("../../assets/img/good4.jpg"),
          isDirect: true,
          isHave: false,
          name: "汽车收纳箱储物箱车载后备箱整理箱密码轿车尾箱抽屉置物箱盒用品",
          price: "380",
          volume: "350"
        },
        {
          id: "4",
          img: require("../../assets/img/good4.jpg"),
          isDirect: true,
          isHave: false,
          name: "汽车收纳箱储物箱车载后备箱整理箱密码轿车尾箱抽屉置物箱盒用品",
          price: "380",
          volume: "350"
        },
        {
          id: "5",
          img: require("../../assets/img/good4.jpg"),
          isDirect: true,
          isHave: false,
          name: "汽车收纳箱储物箱车载后备箱整理箱密码轿车尾箱抽屉置物箱盒用品",
          price: "380",
          volume: "350"
        },
        {
          id: "6",
          img: require("../../assets/img/good4.jpg"),
          isDirect: true,
          isHave: false,
          name: "汽车收纳箱储物箱车载后备箱整理箱密码轿车尾箱抽屉置物箱盒用品",
          price: "380",
          volume: "350"
        },
        {
          id: "7",
          img: require("../../assets/img/good4.jpg"),
          isDirect: true,
          isHave: false,
          name: "汽车收纳箱储物箱车载后备箱整理箱密码轿车尾箱抽屉置物箱盒用品",
          price: "380",
          volume: "350"
        }
      ],
      // 排序数据
      sortGoodsData:[],
      // 最大高度
      MAX_IMG_HEIGHT: 230,
      // 最小高度
      MIN_IMG_HEIGHT: 178,
      // 图片样式集合
      imgStyles: [],
      // item margin
      ITEM_MARGIN_SIZE: 4,
      // item样式集合
      goodsItemStyles: [],
      // goods组件的高度
      goodsViewHeight: "100%",
      // 不同展示形式下的类名
      // 1.垂直列表的展示形式（默认） -> goods-list & goods-list-item
      layoutClass: "goods-list",
      layoutItemClass: "goods-list-item",
      // 2.网格布局的展示形式  goods-grid & goods-grid-item
      // layoutClass:'goods-grid',
      // layoutItemClass:'goods-grid-item'
      // 滑动距离
      scrollTopValue:0
    };
  },

  created: function() {
    this.initData();
  },
  activated:function(){
    /**
     * 定位页面滑动位置
     */
    this.$refs.goods.scrollTop = this.scrollTopValue;
  },
  methods: {
    initData: function() {
      this.setSortGoodsData();
      this.initLayout();
    },
    // 返回随机的图片高度
    imgHeight: function() {
      // Math.random() ->  0-1  随机数 * （高度区间） + 最低的图片高度
      let result = Math.floor(
        Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) +
          this.MIN_IMG_HEIGHT
      );
      return result;
    },
    //    根据随机的图片高度，生成对应的图片数据
    initImgStyle: function() {
      this.dataSource.forEach(item => {
        // 随机生成的图片高度
        let imgHeight = this.imgHeight() + "px";
        // push 图片高度 到 img到样式集合
        this.imgStyles.push({
          height: imgHeight
        });
      });
    },
    // 商品排序
    setSortGoodsData:function(){
      switch(this.sort){
        // 默认
        case '1':
          // 深拷贝数据源，不改变原数组
          this.sortGoodsData = this.dataSource.slice(0);
          break;
          // 价格由高到低
        case '1-2':
          this.getSortGoodsDataFromKey('price');
          break;
          // 销量由高到低
        case '1-3':
          this.getSortGoodsDataFromKey('volume');
          break;
          // 有货优先
        case '2':
          this.getSortGoodsDataFromKey('isHave');
          break;
          // 直营优先
        case '3':
          this.getSortGoodsDataFromKey('isDirect');
          break;
      }
    },
    /**
     * 根据传入的key进行排序
     */
    getSortGoodsDataFromKey:function(key){
      /**
       * sort可以完成数组的数据排序
       * 当接收的值 为负数的时候，表示goods1 排列在 goods2 前
       * 当接收的值 为正数的时候，表示goods1 排列在goods2 后
       * 当接收的值 为0 的时候，表示排序不变
       */
      this.sortGoodsData.sort((goods1,goods2) =>{
        // 根据传入的key获取对应的value
        let v1 = goods1[key],
            v2 = goods2[key];
            // 对value进行对比
            // boolean类型的值（有货优先和直营优先）
            if(typeof v1 === 'boolean'){
              if(v1){
                return -1;
              }
              if(v2){
                return 1;
              }
              return 0;
            }
            // float类型的值处理（价格、销量）
            if(parseFloat(v1) >= parseFloat(v2)){
              return -1;
            }
            return 1;
      })
    },

    // 瀑布流布局
    // 获取到所有的 item 元素
    // 遍历item元素，得到每一个item的高度，加上一个margin
    // 创建两个变量rightHeightTotal:leftHeightTotal，分别表示左右两侧目前距离顶部的高度
    // 通过对于左右两侧距离顶部的高度，来确定item的放置位置
    // 如果左侧小于等于右侧高度的话，（leftHeightTotal <= rightHeightTotal），那么item应放置在左侧，此时item距离左侧为0，距离顶部应该为当前的leftHeightTotal
    // 否则，item应该放置到右侧，此时item距离右侧为0，距离顶部为当前的rightHeightTotal
    // 保存计算出的item的所有样式，配置到item上
    // item配置完成之后，对比左右两侧最大的高度，最大的高度为goods组件的高度

    initWaterfall: function() {
      // 获取所有的元素
      let $goodsItems = this.$refs.goodsItem;
      if (!$goodsItems) return;
      // 左右两侧距离顶部的高度
      let leftHeightTotal = 0,
        rightHeightTotal = 0;
      // 遍历item元素，得到每一个item的高度，加上一个margin
      $goodsItems.forEach(($el, index) => {
        let goodsItemStyle = {};
        let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE;
        // 对比左右两侧距离顶部的高度
        if (leftHeightTotal > rightHeightTotal) {
          // 右侧
          goodsItemStyle = {
            right: "0px",
            top: rightHeightTotal + "px"
          };
          // console.log(rightHeightTotal);
          rightHeightTotal += elHeight;
        } else {
          goodsItemStyle = {
            left: "0px",
            top: leftHeightTotal + "px"
          };
          // 更新左侧距离顶部的高度
          leftHeightTotal += elHeight;
        }
        this.goodsItemStyles.push(goodsItemStyle);
      });

      // 在不允许 goods 单独滑动的时候,如果允许单独滑动，就不用在对比高度了
      if (!this.isScroll) {
        // 对比左右高度
        this.goodsViewHeight =
          (leftHeightTotal > rightHeightTotal
            ? leftHeightTotal
            : rightHeightTotal) + "px";
      }
    },
    /**
     * 设置布局，为不同的layoutType设定不同的展示形式
     * 1.初始化影响到布局的数据
     *    1.goodsViewHeight -> 垂直布局和网格布局（100%）  瀑布流（实际高度）
     *    2.goodsItemStyles
     *    3.imgStyles
     * 2.为不同的layoutType 设置不同的展示类
     */
    initLayout: function() {
      // 初始化数据
      this.goodsViewHeight = "100%";
      this.goodsItemStyles = [];
      this.imgStyles = [];
      // 为不同的layoutType 设置不同的展示类
      switch (this.layoutType) {
        // 垂直布局
        case "1":
          this.layoutClass = "goods-list";
          this.layoutItemClass = "goods-list-item";
          break;
        // 网格布局
        case "2":
          this.layoutClass = "goods-grid";
          this.layoutItemClass = "goods-grid-item";
          break;
        // 瀑布流
        case "3":
          this.layoutClass = "goods-waterfall";
          this.layoutItemClass = "goods-waterfall-item";
          this.initImgStyle();
          // 调用创建瀑布流的方法（等到 dom 创建完成之后）
          this.$nextTick(() => {
            this.initWaterfall();
          });
          break;
      }
    },
    // 商品点击事件
    onItemClick:function(item){
      // 商品无库存不允许跳转
      if(!item.isHave){
        alert('该商品无库存');
        return;
      }
      this.$router.push({
        name:'goodsDetail',
        params:{
          goods:item,
          routerType:'push'
        }
      })
    },
    /**
     * 监听滑动事件
     */
    onScrollChange: function($event){
      this.scrollTopValue = $event.target.scrollTop;
    }
  },
  watch: {
    /**
     * 监听 layoutType
     */
    layoutType: function() {
      this.initLayout();
    },
    // 监听sort的改变
    sort:function(){
      this.setSortGoodsData();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/style.scss";
.goods {
  background-color: $bgColor;
  &-scroll {
    overflow: hidden;
    overflow-y: auto;
  }

  &-item {
    background-color: #fff;
    padding: $marginSize;
    box-sizing: border-box;

    &-desc {
      width: 100%;

      &-name {
        font-size: px2rem(26);
        line-height: px2rem(26);
        &-hint {
          color: $hintColor;
        }
      }
      &-data {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: $marginSize;

        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
        &-volume {
          font-size: $infoSize;
          color: $hintColor;
        }
      }
    }
  }
}
// 垂直列表
.goods-list {
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;
    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
    }
    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}
// 网格布局
.goods-grid {
  padding: $marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;
    .goods-item-img {
      width: 100%;
    }
  }
}
// 瀑布流
.goods-waterfall {
  position: relative;
  margin: $marginSize;

  &-item {
    // position: absolute;
    display: inline-block;
    vertical-align: top;
    margin-left: px2rem(15);
    margin-right: px2rem(10);
    width: 45%;
    border-radius: $radiusSize;
    // overflow-y: auto;
    // overflow: hidden;
    .goods-item-img {
      width: 100%;
    }
  }
}
.goods-item.goods-waterfall-item-img {
  width: px2rem(130);
  height: px2rem(200);
}
</style>