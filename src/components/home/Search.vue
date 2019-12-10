<template>
    <div class="search" :style="{backgroundColor:bgColor}" @click="navigateSearch">
        <img :src="icon" class="search-icon">
        <span class="search-hint" :style="{color:hintColor}">请输入搜索内容</span>
    </div>
</template>
<script>
export default {
    props:{
        icon:{
            default: require('../../assets/img/svg-icons/搜索.svg'),
            type:String
        },
        hintColor:{
            default:'#999',
            type:String
        },
        bgColor:{
            default:'#fff',
            type:String
        }
    },
    methods:{
         navigateSearch(){
            this.$router.push({
                name:'search',
                params:{
                    routerType:'push'
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/style.scss';
.search{
    background-color: #fff;
    width: 100%;
    margin: px2rem(6);
    border-radius: px2rem(22);
    display: flex;
    align-items: center;
    &-icon{
        margin-left: $marginSize;
        width: px2rem(16);
    }
    &-hint{
        margin-left: $marginSize;
        font-size: $minInfoSize;
        color:$hintColor;
    }
}
</style>