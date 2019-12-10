<template>
 <!-- 业务逻辑
    1.在商品详情中点击加入购物车，系统会通过 alert 弹出 “添加成功” 的提示，然后页面会跳转到购物车页面
    2.跳转到购物车页面之后，购物车会展示我们添加的商品，此时在默认状态下，商品处于未选中状态，商品数量为 1
    3.在购物车中通过 + - 按钮来增加或减少该商品的购买数量，当商品数量为1 的时候，不可减少
    4.加入购物车时，如果该商品已经存在于购物车中，那么购物车中的该商品数量自动 + 1
    5.购物车中会展示已选的商品总价格和已选商品的总数量，当选中商品或选中商品的数量发生变化的时候，展示的总价格和总数量也会发生对应的变化。
     -->

<!-- 从商品详情页面进入购物车页面
    1.首先进入到 main.vue
    2.通过main.vue跳转到购物车 （可以通过传递自定义标记的方式）
 -->

 <!-- 
     问题：
     当从商品详情进入到购物车之后，在返回到商品详情页面，会发现无论点击哪个商品都会进入到最初点击的那个商品的详情页面，即点击的商品和商品详情不匹配
    原因：
    虚拟任务栈缓存了商品详情页面
    解决方案；
    在跳转到main 之后，通过自定义指令，来初始化虚拟任务栈
 -->
    <div class="shopping">
        <navigation-bar :pageName="'购物车'" :isShowBack="false"></navigation-bar>
       
       <div class="shopping-content">
           <div class="shopping-content-list">
               <!-- 商品 -->
               <div class="shopping-content-list-item" v-for="(item,index) in shoppingDatas" :key="index" > 
                   <!-- check -->
                   <img class="shopping-content-list-item-check" src= '../../assets/img/svg-icons/未选中标记.svg'/>
                   <!-- 图片 -->
                   <img class="shopping-content-list-item-img" :src="item.img" alt="">
                   <!-- 描述 -->
                   <div class="shopping-content-list-item-desc">
                       <!-- 名称 -->
                       <p class="shopping-content-list-item-desc-name text-line-2" >
                           <!-- 直营 -->
                           <direct v-if="item.isDirect"></direct>
                           {{item.name}}
                       </p>
                       <div class="shopping-content-list-item-desc-data">
                           <!-- 价格 -->
                           <p class="shopping-content-list-item-desc-data-price">￥{{item.price | priceValue}}</p>
                            <!-- 商品数量的控制组件 -->
                       </div>
                   </div>
               </div>
           </div>
           <!-- 统计 -->
            <div class="shopping-content-total">
                   <!-- 全选的check -->
                   <div class="shopping-content-total-check">
                       <img src="../../assets/img/svg-icons/购物选中.svg"/>
                       <p>全选</p>
                   </div>
                   <!-- 总价格 -->
                   <div class="shopping-content-total-price">
                       <p class="shopping-content-total-price-total">合计：<span>￥{{totalData.totalPrice | priceValue}}</span></p>
                       <p class="shopping-content-total-price-all">总额：
                           <span>￥{{totalData.totalPrice | priceValue}}</span>
                           &nbsp;&nbsp;
                           立减<span>￥0.00</span>
                       </p>
                   </div>
                   <!-- 结算 -->
                   <div class="shopping-content-total-commit">
                       去结算{{totalData.goodsNumber}}
                   </div>
            </div>  
        </div>
    </div>
</template>
<script>
import NavigationBar from '../currency/NavigationBar.vue';
import Direct from '../home/Direct.vue'
export default {
    components:{
        NavigationBar,
        Direct
    },
    data: function(){
        return {
            // isActive:false,
            // 购物车商品
            // shoppingDatas:this.$store.state.shoppingDatas,
            shoppingDatas:[
                {
                    img:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3646403421,3376537021&fm=26&gp=0.jpg',
                    isDirect:true,
                    name:'可爱猫',
                    price:12
                }, {
                    img:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3646403421,3376537021&fm=26&gp=0.jpg',
                    isDirect:true,
                    name:'可爱猫',
                    price:12
                }
            ],
            // 总计
            totalData: {
                // 是否全选
                isAll:false,
                // 总价格
                totalPrice:0,
                // 总数量
                goodsNumber:0
            }
        }
    },
    mothods:{
        // mouseEnter(){
        //     this.isActive = !isActive
        // }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/style.scss';
    .shopping{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-flow: column;

        &-content{
            background-color: $bgColor;
            border-top: px2rem(1) solid $lineColor;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            // 商品列表
            &-list{
                height: 100%;
                overflow: hidden;
                overflow-y: auto;

                &-item{
                    background-color: #fff;
                    padding: $marginSize;
                    display: flex;
                    border-bottom: px2rem(1) solid $lineColor;

                    &-check{
                        width: $checkSize;
                        height: $checkSize;
                        align-self: center;
                        padding: px2rem(6);
                    }
                    &-img{
                        width:$listGoodsImgSize;
                        height: $listGoodsImgSize;
                    }
                    &-desc{
                        width: 100%;
                        display:flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding:0 $marginSize;
                        &-name{
                            font-size: $infoSize;
                            line-height: px2rem(18);
                        }
                        &-data{
                            width:100%;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-top: $marginSize;

                            &-price{
                                font-size: $titleSize;
                                color:$mainColor;
                                font-weight: 500;
                            }
                        }
                    }
                }
            }
            // 总计
            &-total{
                height:px2rem(56);
                box-sizing: border-box;
                display: flex;
                align-items: center;
                background-color: #fff;
                border-top: px2rem(1) solid $lineColor;
                position: absolute;
                bottom: 90px;
                width: 100%;
                &-check{
                    display: flex;
                    align-items: center;
                    margin: 0 $marginSize;

                    img{
                        width: $checkSize;
                        height: $checkSize;
                        padding: px2rem(6);
                    }
                    p{
                        font-size: $infoSize;
                    }
                }

                &-price{
                    flex-grow: 2;
                    display: flex;
                    flex-direction: column;
                    
                    &-total{
                        font-size: $titleSize;
                        margin-bottom: px2rem(6);

                        span{
                            font-weight: bold;
                        }
                    }

                    &-all{
                        font-size: $minInfoSize;
                        span{
                            font-weight: bold;
                        }
                    }
                }

                &-commit{
                    width: px2rem(120);
                    height: 100%;
                    font-size: $titleSize;
                    background-color: $mainColor;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
</style>
