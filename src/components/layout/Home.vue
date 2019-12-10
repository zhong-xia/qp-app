<template>
    <div class="home" @scroll="onScrollChange" ref="home">
        <navigation-bar  :isShowBack="false" :navBarStyle="navBarStyle">
            <!-- 左侧插槽 -->
            <template v-slot:nav-left>
                <img :src="navBarCurrentSlotStyle.leftIcon">
            </template>
            <!-- 中间插槽 -->
            <template v-slot:nav-center>
                <search :bgColor="navBarCurrentSlotStyle.search.bgColor" :hintColor="navBarCurrentSlotStyle.search.hintColor" :icon="navBarCurrentSlotStyle.search.icon" />
            </template>
            <!-- 右侧插槽 -->
            <template v-slot:nav-right>
                <img :src="navBarCurrentSlotStyle.rightIcon">
            </template>
        </navigation-bar>
        <div class="home-content">
            <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
            <mode-options></mode-options>
            <seconds></seconds>
            <!-- 让它为瀑布流展示 -->
            <goods :layoutType="'3'" :isScroll="false"/>
        </div>
    </div>
</template>
<script>
import MySwiper from '../home/MySwiper.vue';
import ModeOptions from '../home/ModeOptions.vue';
import Seconds from '../home/Seconds.vue';
import Goods from '../home/Goods.vue';
import NavigationBar from '../currency/NavigationBar.vue';
import Search from '../home/Search.vue'
export default {
    components: {
        MySwiper,
        ModeOptions,
        Seconds,
        Goods,
        NavigationBar,
        Search
    },
    data(){
        return{
            swiperImgs:[
                require('../../assets/img/swiper-1.jpg'),
                require('../../assets/img/swiper-2.jpg'),
                require('../../assets/img/swiper-3.jpg'),
                require('../../assets/img/swiper-4.jpg')
            ],
            swiperHeight:'300px',
            // swiperHeight:this.$store.state.isIphoneX ? '228px' : '184px',
            // navBar 插槽的样式数据，包含页面未开始滑动的时候插槽的样式 和页面滑动到锚定点之后插槽的样式
            navBarSlotStyle:{
                // 默认样式
                normal:{
                    // 左侧插槽
                    leftIcon:require('../../assets/img/svg-icons/更多 (1).svg'),
                    // 中间插槽
                    search:{
                        bgColor:'#fff',
                        hintColor:'#999',
                        icon:require('../../assets/img/svg-icons/搜索框.svg'),
                    },
                    // 右侧插槽
                    rightIcon:require('../../assets/img/svg-icons/更多.svg')
                },
                // 高亮样式，（页面滑动到锚定点之后的样式
                highlight:{
                    // 左侧插槽
                    leftIcon:require('../../assets/img/svg-icons/更多 (1).svg'),
                    // 中间插槽
                    search:{
                        bgColor:'#d7d7d7',
                        hintColor:'#fff',
                        icon:require('../../assets/img/svg-icons/搜索框.svg'),
                    },
                    // 右侧插槽
                    rightIcon:require('../../assets/img/svg-icons/更多.svg')
                },
            },
            navBarCurrentSlotStyle:{},
            // navBar的定制样式
            navBarStyle:{
                position:'fixed',
                backgroundColor:''
            },
            // 记录页面滚动值
            scrollTopValue:-1,
            // 锚点值
            ANCHOR_SCROLL_TOP:160
        }
    },
    created:function(){
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
    },
    /**
     * keepAlive组件被激活的时候调用
     * 去为滑动模块指定滑动距离
    */

    // activated:function(){
    //     this.$refs.home.scrollTop = this.scrollTopValue;
    // },
    // 监听页面
    // 获取到当前页面滚动的距离
    // 计算navBar背景颜色（navBar 背景透明度）
    //      当前滚动的距离 / 锚点值 = navBar背景透明度
    // opacity >= 1 ,当前的滚动距离已经超过锚点值，当前navBar插槽的样式变为 高亮状态
    // 否则的话，opacity < 1,当前navBar插槽的样式为默认状态的样式
    methods:{
        onScrollChange:function($event){
            // 获取到当前页面滚动的距离
            $event.scrollTopValue = $event.target.scrollTop;
            // 计算 navBar 背景颜色（navBar 背景透明度）
           let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
            // 指定 navBar 插槽样式
           this.navBarStyle.backgroundColor = 'rgba(255,255,255, ' + opacity + ')';
        //    指定 navBar 插槽样式
        if(opacity >= 1){
            this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight;
        }else{
            this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
        }
        },

    }
}
</script>
<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 100%;
        font-size: 32px;
        background-color: #eee;
        &-content {
            height: 100%;
            margin-top:9px;
            overflow-y: auto;
        }
    }
</style>