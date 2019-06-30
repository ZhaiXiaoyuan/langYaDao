<template>
    <el-dialog class="register-modal login-modal" title="" :visible.sync="options.open" center @close="close()" :modal-append-to-body="false">
        <div class="modal-body" style="border-top: none;">
            <i class="icon logo-md-icon"></i>
            <div class="form" v-if="type=='pwdLogin'">
                <div class="input-item">
                    <el-input placeholder="输入手机号" type="text" v-model="form.phone"  @blur="blurAdjust($event)"></el-input>
                </div>
                <div class="input-item">
                    <el-input placeholder="输入密码" v-model="form.password" type="password"  auto-complete="off" @blur="blurAdjust($event)"></el-input>
                </div>
                <el-button class="submit-btn" type="primary" style="margin-top: 30px;" @click="login()">登录</el-button>
                <div class="switch">
                    <span class="cm-btn switch-btn" @click="loginType('wechatLogin')" v-if="type=='pwdLogin'&&(!version.mobile||(version.mobile&&version.weixin))">微信登录</span>
                    <span class="cm-btn switch-btn" @click="toRegister()">账号注册</span>
                    <span class="cm-btn switch-btn" @click="toSetPwd()">忘记密码</span>
                </div>
            </div>
            <div class="form" v-if="type=='wechatLogin'">
                <div class="input-item wechat-input-item" v-if="!version.mobile||(version.mobile&&version.weixin)">
                    <div class="value" v-if="!wetchatInfo.id">
                        <div class="img-box">
                            <qrcode :value="qrCodeDomain+'/weixin/getWeixinCode?state='+randomId+'&scope=snsapi_userinfo&redirectUrl='+redirectUrl" tag="img" :options="{ width: 110 }"></qrcode>
                        </div>
                        <p class="tips">{{version.weixin?'长按识别二维码':'打开微信扫一扫'}}</p>
                    </div>
                    <div class="value" v-if="wetchatInfo.id">
                        <div class="img-box">
                            <img :src="wetchatInfo.headimgurl" alt="">
                        </div>
                        <p class="tips">{{wetchatInfo.nickname}}</p>
                    </div>
                </div>
                <div class="switch">
                    <span class="cm-btn switch-btn" @click="loginType('pwdLogin')" v-if="type=='wechatLogin'">密码登录</span>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
<script>
  import Vue from 'vue'
  import bus from '../components/common/bus';

  export default {
    components: {

    },
    props:{
      options:{
          open:false,
          ok:null,
          cancel:null,
      }
    },
    data: function () {
      return {
          form:{},
          userPosition:{},
          type:'pwdLogin',//pwdLogin,wechatLogin
          qrCodeDomain:Vue.appConfig.domain,
          randomId:null,
          wetchatInfo:{},
          getWetchatInfoInterval:null,
          version:Vue.tools.browserVersions(),
          redirectUrl:encodeURI(window.location.origin+'/scanTips/wechatLogin'),
      }
    },
    computed: {},
    watch: {

    },
    methods: {
      login:function () {
          if(!this.form.phone){
              Vue.operationFeedback({type:'warn',text:'请输入手机号'});
              return;
          }
            if(!this.form.password){
                Vue.operationFeedback({type:'warn',text:'请输入密码'});
                return;
            }
            let params={
                ...this.form,
                location:this.userPosition&&this.userPosition.city?this.userPosition.city:'未知',
            }
            let fb=Vue.operationFeedback({text:'登录中...'});
            Vue.api.login({apiParams:params}).then((resp)=>{
                if(resp.respCode=='2000'){
                    let data=JSON.parse(resp.respMsg);
                    data.user.isFirstLogin=data.isFirstLogin;
                    this.$cookie.set('account',JSON.stringify(data.user),7);
                    bus.$emit('refreshAccount');
                    fb.setOptions({type:"complete",text:'登录成功'});
                    this.options.ok&&this.options.ok();
                    //
                    this.close();
                }else{
                    fb.setOptions({type:"warn",text:resp.respMsg});
                }
            });
        },
      close:function () {
        this.options.open=false;
        this.$el.remove();
        this.$destroy();
      },
      toRegister:function () {
          Vue.registerModal({open:true});
          this.close();
      },
      toSetPwd:function () {
          Vue.forget({});
          this.close();
      },
      loginType:function (value) {
          this.type=value;
          if(this.type=='wechatLogin'){
              this.randomId=new Date().getTime()+Math.random();
              if(!this.version.mobile||(this.version.mobile&&this.version.weixin)){
                  this.getWetchatInfoInterval=setInterval(()=>{
                      this.getwetChatInfo();
                  },3000);
              }
          }else{
              clearInterval(this.getWetchatInfoInterval);
          }
      },
      getwetChatInfo:function () {
          Vue.api.getOpenIdInfo({apiParams:{"state":this.randomId}}).then((resp)=>{
                /*      console.log('resp:',resp);*/
                if(resp.respCode=='2000'){
                    this.wetchatInfo=JSON.parse(resp.respMsg);
                    console.log('this.wetchatInfo:',this.wetchatInfo);
                    clearInterval(this.getWetchatInfoInterval);
                    if(this.type=='wechatLogin'){
                        this.wechatLogin();
                    }
                }else{

                }
            });
      },
      wechatLogin:function () {
          let params={
              wxOpenId:this.wetchatInfo.openId,
              location:this.userPosition&&this.userPosition.city?this.userPosition.city:'未知',
          }
          let fb=Vue.operationFeedback({text:'登录中...'});
          Vue.api.weixinLogin({apiParams:params}).then((resp)=>{
              /*      console.log('resp:',resp);*/
              if(resp.respCode=='2000'){
                  let data=JSON.parse(resp.respMsg);
                  data.user.isFirstLogin=data.isFirstLogin;
                  data.user.wId=this.wetchatInfo.openId;
                  this.$cookie.set('account',JSON.stringify(data.user),7);
                  bus.$emit('refreshAccount');
                  fb.setOptions({type:"complete",text:'登录成功'});
                  //
                  this.options.ok&&this.options.ok();
                  //
                  this.close();
              }else{
                  fb.setOptions({type:"warn",text:resp.respMsg});
              }
          });
      }
    },
    created: function () {

    },
    mounted: function () {
        //
        console.log(this.redirectUrl);
        let that=this;
        //高德地图获取城市信息
        window.onLoad  = function(){
            let mapObj = new AMap.Map('map-container');
            mapObj.plugin('AMap.CitySearch', ()=>{
                let citySearch = new AMap.CitySearch({});
                mapObj.addControl(citySearch);
                citySearch.getLocalCity();
                AMap.event.addListener(citySearch, 'complete', (data)=>{
                    that.userPosition=data;
               /*     console.log('that.userPosition:',that.userPosition);
                    console.log('mapObj：',mapObj);*/

                });//返回定位信息
                AMap.event.addListener(citySearch, 'error', (error)=>{
                    console.log('error:',error);
                });      //返回定位出错信息
            });
        }
        var url = 'https://webapi.amap.com/maps?v=1.4.10&key=b7164700b52c20d7458ee82630a22122&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
        //临时测试
       /* this.loginType('wechatLogin');*/
    },
    beforeDestroy:function () {
        clearInterval(this.getWetchatInfoInterval);
    },
  };
</script>
