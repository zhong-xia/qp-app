<template>
    <div class="goods-list-page">
        <navigation-bar @onLeftClick="onBackClick" :pageName="'商品列表'">
            <!-- 创建插槽 -->
             <template v-slot:nav-right>
                <img :src="layoutType.icon" @click="onChangeLayoutTypeClick">
            </template>
        </navigation-bar>
        <!-- <div class="goods-list-page-content" :class="{'iphonex-bottom': $store.state.isIphoneX}"> -->
        <div class="goods-list-page-content">
            <goods-options @optionsChange="onGoodsOptionsChange"></goods-options>
            <goods :layoutType="layoutType.type" :sort="sortType"></goods>
        </div>
    </div> 
</template>
<script>
import NavigationBar from '../components/currency/NavigationBar.vue';
import GoodsOptions from '../components/goods/GoodsOptions.vue';
import Goods from '../components/home/Goods.vue'
export default {
    name:'goodList',
    components:{
        NavigationBar,
        GoodsOptions,
        Goods
    },
    data:function(){
        return{
            layoutTypeDatas:[
                // 展示不同形式的时候右上角的图标不同
                {
                    // 垂直列表
                    type:'1',
                    icon:require('../assets/img/svg-icons/列表.svg')
                },
                 {
                    // 网格布局
                    type:'2',
                    icon:require('../assets/img/svg-icons/网格.svg')
                },
                 {
                    // 瀑布流
                    type:'3',
                    icon:require('../assets/img/svg-icons/瀑布流.svg')
                }
            ],
            // 当前goods展示形式
            layoutType:{},
            // goods排序规则
            sortType:'1'
        }
    },
    created:function(){
        // 记得给layoutType一个初始值
        this.layoutType = this.layoutTypeDatas[0];
    },
    methods:{
        // 后退按钮的点击事件
        onBackClick:function(){
            this.$router.go(-1);
        },
        onChangeLayoutTypeClick:function(){
            if(this.layoutType.type === '1'){
                this.layoutType = this.layoutTypeDatas[1];
            }else if(this.layoutType.type === '2'){
                this.layoutType = this.layoutTypeDatas[2];
            }else{
                this.layoutType = this.layoutTypeDatas[0];
            }
        },
        /**
         * 当筛选项改变时调用
         */
        onGoodsOptionsChange: function(sortType){
            this.sortType = sortType;
        }
    }
}
</script>
 <style lang="scss" scoped>
    @import '../assets/css/style.scss';
    .goods-list-page{
        position: absolute;
        height:100%;
        width: 100%;
        background-color: $bgColor;
        display:flex;
        flex-direction: column;

        &-content{
            height:100%;
            display:flex;
            flex-direction:column;
        }
    }
</style>
