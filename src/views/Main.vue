<template>
    <div class="main">
        <component :is="currentComponent"></component>
        <tool-bar @onChangeFragment="onChangeFragment" ref="toolBar"/>
    </div>
</template>
<script>
import toolBar from '../components/currency/ToolBar'

export default {
    name:'qp',
  components: {
        'tool-bar': toolBar,
        // 所有的都跑到最底部了
        // 异步组件引入方式，异步组件：只有在需要去展示这个组件的时候，才会把组件进行去渲染
        'home':()=>import('@/components/layout/Home'),
        'shopping':()=>import('@/components/layout/Shopping'),
        'my':()=>import('@/components/layout/My'),
        'sort':()=>import('@/components/layout/Sort')
    },
    data(){
        return{
            currentComponent:'home'
        }
    },
    activated:function(){
        // 在keepAlive 被激活的时候调用指定加载页面组件的方法
        this.pushFragment()
    },
    methods: {
        // 组件切换
        onChangeFragment: function(componentName){
            this.currentComponent = componentName;
            console.log(componentName)
        },
        // 指定加载的页面组件
        pushFragment:function(){
            // 获取到组件加载的下标
            let componentIndex = this.$route.params.componentIndex;
            // 如果没有下标的话，直接让方法return 掉
            if(componentIndex === undefined) return;
            // 通过 toolbar 来切换对应的组件
            this.$refs.toolBar.pushFragment(componentIndex);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/style.scss';
    .main{
        position: relative;
        width: 100%;
        height:100%;
        display:flex;
        flex-direction: column;
    }
</style>