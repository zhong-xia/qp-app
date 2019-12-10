<template>
    <div class="register-page">
        <navigation-bar :pageName="'注册'" @onLeftClick="onBackClick"/>
        <!-- 内容区 -->
        <div class="register-page-content">
            <!-- 用户名 -->
            <div class="input-container"> 
                <input type="text" v-model="username" placeholder="用户名">
            </div>
            <!-- 密码 -->
            <div class="input-container">
                <input type="password" v-model="password" placeholder="密码">
            </div>
            <!-- 确认密码 -->
            <div class="input-container">
                <input type="password" v-model="confirmPassword" placeholder="确认密码">
            </div>
            <div class="register-page-content-register page-commit" @click="onRegisterClick">
                注册
            </div>
        </div>
    </div>
</template>
<script>
import NavigationBar from '../components/currency/NavigationBar.vue';
import md5 from '../assets/js/md5.min.js';
export default {
    name:'register',
    components:{
        NavigationBar
    },
    data(){
        return{
            username:'',
            password:'',
            confirmPassword:'',
            md5Password:''
        }
    },
    methods:{
        /**
         * 后退事件
         */
        onBackClick:function(){
            this.$router.go(-1);
        },
        /**
         * 注册按钮点击事件
         */
        onRegisterClick:function(){
            // 验证用户输入的合法性
            /**
             * 用户没有输入用户名，或 用户没有输入密码 或 用户输入的确认密码和密码不相同
             */
            if(this.username.length === 0){
                alert('请完善用户名');
                return;
            }
            if(this.password.length === 0){
                alert('密码不能为空');
                return;
            }
            if(this.password != this.confirmPassword){
                alert('密码不匹配');
                return;
            }
            // 与原生交互，保存用户输入的用户名和密码
            // 对用户输入到的密码进行 md5 加密
           this.md5Password = md5(this.password);//返回加密之后的字符串

            // 判断当前的项目是运行在Android 设备 还是iOS 设备
            if(window.androidJSBridge){
                // window 下存在android 注入的对象（androidJSBridge), 则表示当前项目在Android设备中运行
                this.onRegisterToAndroid();
          }else if(window.webkit){
                // window下存在 webkit，表示当前项目在iOS设备中运行
                this.onRegisterToIOS();
            }
        },
        /**
         * 调用Android注册接口
         */
        onRegisterToAndroid:function(){
            // json字符串 Android只能接收基本类型参数
            let userJson = JSON.stringify({
                'username':this.username,
                'password':this.md5Password
            });
            // 调用 Android 注册方法，接收返回
            let result = window.androidJSBridge.register(userJson);
            // 对返回值进行处理
            this.onRegisterCallback(result);
        },
        /**
         * 调用iOS注册接口
         */
        onRegisterToIOS:function(){
            // IOS 可以直接接收对象类型参数
            let userObj = {
                'username': this.username,
                'password': this.md5Password
            };

            /**
             * IOS不能直接返回一个返回值，所有 IOS 操作完成之后会回调对应的回调方法
             * 同时原生调用 JS 的方法只能使调用 绑定到 window 对象中的方法
             * 所以我们需要把 IOS 操作完成之后的回调方法（registerCallback） 绑定到window对象下
             */
            window.registerCallback = this.onRegisterCallback;
            // 调用 ios 注册方法
            window.webkit.messageHandlers.register.postMessage(userObj);
        },
        /**
         * 用来处理 Native 注册接口的返回值
         */
        onRegisterCallback:function(result){
            if(result){
                alert('注册成功');
                this.onBackClick();
            }else{
                alert('注册失败，请重试！');
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/style.scss';
.register-page{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;

    &-content{
        width:100%;
        height:100%;

        &-register{
            margin-top: 40%;
        }
    }

}
</style>