<template>
    <!-- 商品详情 -->
    <div class="goods-detail">
        <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
            <template v-slot:nav-left>
                <div class="goods-detail-nav-left" @click="onBackClick">
                    <img src="../assets/img/svg-icons/返回.svg">
                </div>
            </template>
        </navigation-bar>
        <div class="goods-detail-content">
            <my-swiper :height="SWIPER_IMAGE_HEIGHT+'px'" 
            :swiperImgs="goodsData.swiperImgs"
            :paginationType="'2'">
            </my-swiper>
            <!-- 内容 -->
            <div class="goods-detail-content">
                <div class="goods-detail-content-desc-item">
                   <!-- 商品价格 -->
                    <p class="goods-detail-content-desc-item-price">￥{{goodsData.price | priceValue}}</p>
                   <!-- 商品名称 -->
                    <p class="goods-detail-content-desc-item-name">
                        <!-- 直营 -->
                        <direct v-if="goodsData.isDirect"></direct>
                        {{goodsData.name}}
                    </p>
                </div>
                <div class="goods-detail-content-desc-item">
                    <!-- 已选商品 -->
                    <p class="goods-detail-content-desc-item-select">
                        已选
                        <span class="single-row-text">{{goodsData.name}}</span>
                    </p>
                        <!-- 附加服务 -->
                        <div class="goods-detail-content-desc-item-support">
                            <ul class="goods-detail-content-desc-item-support-list">
                                <li class="goods-detail-content-desc-item-support-list-item"
                                v-for="(item,index) in attachDatas" :key="index">
                                    <img src=""/>
                                    <span>{{item}}</span>
                                </li>
                            </ul>
                        </div>
                        <!-- 商品描述 -->
                        <div class="goods-detail-content-desc-detail">
                            <img v-for="(item,index) in goodsData.detailImgs" :key="index" :src="item"/>
                        </div>
                       
                </div>
            </div>
        </div>
         <!-- 加入购物车  立即购买 -->
                        <div class="goods-detail-buy" >
                            <div class="goods-detail-buy-add" @click="onAddGoodsClick()">
                                加入购物车
                            </div>
                            <div class="goods-detail-buy-now" @click="onBuyClick">
                                立即购买
                            </div>
                        </div>
    </div>
</template>
<script>
import NavigationBar from '../components/currency/NavigationBar.vue';
import MySwiper from '../components/home/MySwiper.vue';
import Direct from '../components/home/Direct.vue'
export default {
    name:'goodsDetail',
    components:{
       NavigationBar,
       MySwiper,
       Direct
    },
    data(){
        return{
            SWIPER_IMAGE_HEIGHT:364,
            navBarStyle:{
                backgroundColor:'',
                position:'fixed'
            },
            goodsData:{},
            // 附加服务
            attachDatas:[
                '可配送海外',
                '京东发货&售后',
                '京准达',
                '211限时达',
                '可自提',
                '不可使用优惠券'
            ]
        }
    },
    methods:{
        onBackClick:function(){
            this.$router.go(-1);
        },
        /**
         * 立即购买
         */
        onBuyClick:function(){
            this.$router.push({
                name:'buy',
                params:{
                    routerType:'push'//跳转动画
                },
                query:{
                    goodsId:this.goods.id
                }
            })
        },
        /**
         * 加入购物车
         */
        onAddGoodsClick:function(){
            // 保存商品到购物车数据中
            // 不能通过 this.$store.addShoppingData()
            this.$store.commit('addShoppingData',this.goods);
            alert('添加成功');
            this.$router.push({
                name:'qp',
                params:{
                    routerType:'push',
                    // 自定义标记，在toolbar中定义tab数据源数据的下标
                    componentIndex:2,
                    // 自定义标记，清空虚拟任务栈
                    clearTask:true
                }
            })
        }
    },
    created:function(){
       this.goodsData = this.$router.params.goods;
    }
}
</script>
<style lang="scss" scoped>
    @import '../assets/css/style.scss';
    .goods-detail{
        position: absolute;
        width:100%;
        height: 100%;
        display: flex;
        flex-flow:column;

        &-nav-left{
            width: 100%;
            display: flex;

            img{
                align-self: center;
            }
        }
        &-content{
            overflow: hidden;
            overflow-y: auto;
            height: 100%;
            &-desc{
                width: 100%;
                background-color: $bgColor;
                box-shadow:0 0 px2rem(16) 0 rgba(0, 0, 0,0.2);
                &-item{
                    background-color: #fff;
                    padding: $marginSize;
                    margin-bottom: $marginSize;
                    // 价格
                    &-price{
                        font-size:px2rem(20);
                        color:$mainColor;
                        font-weight: 500;
                    }
                    // 名称
                    &-name{
                        margin-top: $marginSize;
                        font-size: $titleSize;
                        font-weight: 500;
                        line-height: px2rem(20);
                    }
                    // 已选商品
                    &-select{
                        font-size: $infoSize;
                        color:$hintColor;
                        height: px2rem(44);
                        display: flex;
                        align-items: center;
                        border-bottom:px2rem(1) solid $lineColor;
                        span{
                            color:$textColor;
                            font-size: $titleSize;
                            font-weight: bold;
                            margin-left: px2rem(4);
                        }
                    }
                    // 附加服务
                    &-support{
                        margin-top: $marginSize;
                        flex-wrap: wrap;
                        &-item{
                            display: flex;
                            align-items:center;
                            padding: px2rem(6) 0;
                            margin-right: $marginSize;
                            img{
                                width: px2rem(12);
                                margin-right:px2rem(4);
                            }
                            span{
                                font-size: $minInfoSize;
                                color:$hintColor;
                            }
                        }
                    }
                }
                // 描述
                &-detail{
                    img{
                        width: 100%;
                    }
                }
            }
        }
        &-buy{
            background-color: #fff;
            border-top:px2rem(1) solid $lineColor;
            height: px2rem(46);
            line-height: px2rem(46);
            text-align: right;

            div{
                display: inline-block;
                width: px2rem(100);
                text-align:center;
                font-size: $infoSize;
                color: #fff;
            }
            &-add{
                background-color: $mainColor;
            }
            &-now{
                background-color: darkgoldenrod;
            }
        }
    }
    // 单行文本
    .single-row-text{
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
    }
</style>