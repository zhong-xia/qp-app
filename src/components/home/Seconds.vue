<template>
    <div class="seconds">
        <div class="seconds-wrap">
            <p class="seconds-wrap-title">秒杀活动</p>
            <!-- 倒计时模块组件 -->
            <count-down :endHours="10"></count-down>
        </div>
        <div class="seconds-content">
            <div class="seconds-content-item" v-for="(item,index) in dataSource" :key="index">
                <img class="seconds-content-item-icon" :src="item.icon">
                <p class="seconds-content-item-price">￥{{item.price | priceValue}}</p>
                <p class="seconds-content-item-old-price">￥{{item.oldPrice | priceValue}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import CountDown from '../home/CountDown.vue';
export default {
    components:{
        CountDown
    },
    data() {
        return{
        dataSource:[
            {
                id:'1',
                icon:require('../../assets/img/miao1.jpg'),
                price:99,
                oldPrice:120
            },  {
                id:'2',
                icon:require('../../assets/img/miao2.jpg'),
                price:50,
                oldPrice:100
            },  {
                id:'3',
                icon:require('../../assets/img/miao3.jpg'),
                price:32.99,
                oldPrice:80.99
            },  {
                id:'4',
                icon:require('../../assets/img/miao4.jpg'),
                price:60,
                oldPrice:140
            },  {
                id:'5',
                icon:require('../../assets/img/miao5.jpg'),
                price:35,
                oldPrice:95
            },{
                id:'6',
                icon:require('../../assets/img/miao3.jpg'),
                price:32,
                oldPrice:80
            },  {
                id:'7',
                icon:require('../../assets/img/miao4.jpg'),
                price:60,
                oldPrice:140
            },  {
                id:'8',
                icon:require('../../assets/img/miao5.jpg'),
                price:35,
                oldPrice:95
            }
        ]
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/css/style.scss';
    .seconds{
        background-color: #fff;
        border-radius: $radiusSize;
        margin:px2rem(10) 0;
        &-wrap{
            display:flex;
            padding:$marginSize;
            &-title{
                font-size: $titleSize;
                display:inline-block;
            }
        }
        &-content{
            padding:$marginSize 0;
            display: flex;
            
            overflow: hidden;
            overflow-x: scroll;
            &-item{
                padding: 0 px2rem(12);
                text-align:center;
                &-icon{
                    width:px2rem(77);
                    height: px2rem(77);
                    // margin-right: px2rem(6);
                }
                &-price{
                    color:$mainColor;
                    font-size: $titleSize;
                }
                &-old-price{
                    color:$hintColor;
                    font-size: $infoSize;
                    margin-top: $marginSize;
                    text-decoration:line-through;
                }
            }
        }
    }
</style>