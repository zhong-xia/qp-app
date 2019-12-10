<template>
    <div class="login-page">
        <navigation-bar :pageName="'登录'" @onLeftClick="onBackClick"/>
        <!-- 内容区 -->
        <div class="login-page-content">
            <div class="input-container">> 
                <input type="text" v-model="username" placeholder="用户名">
            </div>
             <div class="input-container">> 
                <input type="password" v-model="password" placeholder="密码">
            </div>
            <div class="login-page-content-login page-commit" @click="onLoginClick">
                登录
            </div>
            <a  class="login-page-content-register" @click="onToRegisterClick">注册新用户</a>
        </div>
    </div>
    
</template>
<script>
import NavigationBar from '../components/currency/NavigationBar.vue';
import md5 from '../assets/js/md5.min.js';
export default {
    name:'login',
    components:{
        NavigationBar
    },
    data(){
        return{
            username:'',
            password:'',
            // md5 加密的密码
            md5Password:''
        }
    },
    methods:{
        onBackClick:function(){
            this.$router.go(-1);
        },
        // 登录按钮点击事件
        onLoginClick:function(){
            // 验证用户输入的合法性
            /**
             * 如果用户没有输入用户名或密码，那么就直接return方法
             */
            if(this.username.length === 0 || this.password.length === 0){
                alert('用户名或密码未输入');
                return;
            }
            // 与原生交互，验证用户输入的用户名和密码
            // 对用户输入的密码进行md5加密
           this.md5Password =  md5(this.password);
        //    判断当前的项目是运行在Android 设备还是IOS设备
           if(window.androidJSBridge){
               // window 下存在android 注入的对象（androidJSBridge), 则表示当前项目在Android设备中运行
                this.onLoginToAndroid();
           }else if(window.webkit){
               // window下存在 webkit，表示当前项目在iOS设备中运行
                this. onLoginToIOS();
           }

        },
        /**
         * 调用Android登录验证
         */
        onLoginToAndroid:function(){
            // 创建json字符串
            let userJson = JSON.stringify({
                'username':this.username,
                'password':this.md5Password
            });
            // 调用 Android 登录接口
           let result = window.androidJSBridge.login(userJson);
        //    对Android的返回值 进行处理
                this.onLoginCallback(result);
        },
        /**
         * 调用iOS登录验证
         */
        onLoginToIOS:function(){
                // 创建 传输对象
                let userObj = {
                    'username':this.username,
                    'password':this.md5Password
                };
                // 回调方法，一定要在接口调用之前直接创建
                window.loginCallback = this.onLoginClick;

                // 调用IOS登录接口
                window.webkit.messageHandlers.login.postMessage(userObj);
        },
        /**
         * 处理登录接口返回值
         */
        onLoginCallback:function(result){
            switch(result){
                case '-1':
                    alert('系统内部错误');
                    break;
                case '0':
                    // 保存主动登录的用户名到username
                    this.$store.commit('setUsername',this.username);
                    this.onBackClick();
                    break;
                case '1':
                    alert('登录用户不存在');
                    break;
                case '2':
                    alert('用户密码错误');
                    break;
            }
        },
        // 立即注册点击事件
        onToRegisterClick:function(){
            this.$router.push({
                name:'register',
                params:{
                    routerType:'push'
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/style.scss';
.login-page{
    // 页面组件过渡动画，脱离标准文档流
    position:absolute;
    height: 100%;
    width:100%;
    background-color:#fff;

    &-content{
        width: 100%;
        height: 100%;

        &-login{
            margin-top: 40%;
        }
        &-register{
            font-size: $infoSize;
            color:$hintColor;
            margin-top: $marginSize;
            padding:$marginSize;
            float: right;
        }
    }
}
</style>