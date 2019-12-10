<template>
    <div class="count-down">
        <span class="count-down-end-time">{{endHours}}:00点场</span>
        <span class="count-down-surplus">{{surplus | filterTime}}</span>
    </div>
</template>
<script>
export default {
    // 传递给组件一个活动开始时间，组件根据时间进行计算
    // 没到活动开始展示倒计时，
    // 如果到了就展示活动正在进行中，
    // 如果过了就展示活动已结束

    props: {
        // 活动开始时间
        endHours: {
            type:Number,
            required:true,
            default:0
        }
    },
    data(){
        return{
            // 活动状态
            surplus:'',
            // 距离活动开始时间的秒数
            diffSeconds:0,
            interval:undefined
        }
    },
    created:function(){
        this.computedSurplusTime();
    }
    ,
    methods: {
        // 计算展示内容
        computedSurplusTime:function(){
            if(this.interval){
                clearInterval(this.interval());
            }
            const date = new Date();//当前时间
            if(date.getHours() > this.endHours){
                this.surplus = '活动已结束';
                return;
            }
            if(date.getHours() === this.endHours){
                this.surplus = '活动进行中';
                return;
            }
            // 活动未开始，
            // 获取当前时间与活动开始时间的秒数差距
            // 根据秒数来转化为对应的   时：分：秒
            // 开始时间 16  当前时间 12  差距是3小时59分59秒，而不是4小时
            const diffHours = this.endHours - date.getHours() - 1;
            // 差距分钟数
            const diffMinutes = 60 - date.getMinutes() - 1;
            // 差距秒数
            const diffSeconds = 60 - date.getSeconds();
            // 转化为对应的秒数  -》  1小时 === 3600秒
            // 距离开始的秒数
            this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds;
            // 当前时间每过1秒，秒数差距就 -1
            this.interval = setInterval(()=>{
                this.diffSeconds -= 1;
            },1000);
       }
    },
    watch:{
        // 当diffSeconds 值发生变化的时候，就会回调当前的方法
        // 根据秒数来转化为对应的  ---  时：分：秒
        diffSeconds: function (newV){
            // 当前的秒数 / 3600 ，向下取整，获取到转化的小时数
            const hours = Math.floor(newV / 3600);
            // 当前的秒数/60 ，向下取整，
            // 获取到所有的分钟数， 3600/60 =60分钟
            // 对60取整，超过小时数的分钟数
            const minutes = Math.floor(newV / 60) % 60;
            // 当前的秒数 % 60 ，获取到超过小时数 分钟数的秒数（秒数）
            const seconds =  newV % 60;
            // 拼装数据
            this.surplus = hours + ':' + minutes + ':' + seconds;
            // 如果当前秒数为0，需要修改展示数据(
            if(newV === 0){
                this.computedSurplusTime();
            }
        },
        // 监听活动时间的变化
        endHours:function(){
            this.computedSurplusTime();
        }
    }
}
</script>
<style lang="scss" scoped>
    @import  '../../assets/css/style.scss';
    .count-down{
        display:inline-block;
        font-size: $infoSize;
        margin-left: $marginSize;
        span{
            display:inline-block;
            padding:px2rem(2) px2rem(4);
        }
        &-end-time{
            background-color:$mainColor;
            border-top-left-radius:px2rem(4);
            border-bottom-left-radius:px2rem(4);
            border:px2rem(1) solid $mainColor;
            color:#fff;
        }
        &-surplus{
            background-color:#fff;
            border-top-right-radius:px2rem(4);
            border-bottom-right-radius:px2rem(4);
            border:px2rem(1) solid $mainColor;
            color:$mainColor;
        }
    }
</style>