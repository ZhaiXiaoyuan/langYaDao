<template>
    <el-dialog class="register-modal" title="注册成为31ENT会员" :visible.sync="options.open" center @close="close()" top="10vh" :modal-append-to-body="false">
        <div class="modal-body">
            <div class="form">
                <div class="input-item">
                    <el-input placeholder="输入昵称" v-model="form.name"  @blur="blurAdjust($event)"></el-input>
                </div>
                <div class="input-item">
                    <el-input placeholder="输入密码" v-model="form.password" type="password"  auto-complete="off"  @blur="blurAdjust($event)"></el-input>
                </div>
                <div class="input-item">
                    <el-input placeholder="重复密码"  v-model="form.rePassword"  type="password"  auto-complete="off"  @blur="blurAdjust($event)"></el-input>
                </div>
                <div class="input-item">
                    <el-input placeholder="输入手机号"  v-model="form.phone"  @blur="blurAdjust($event)"></el-input>
                </div>
                <div class="input-item code-input-item">
                    <el-input placeholder="输入验证码"  v-model="form.code"  @blur="blurAdjust($event)"></el-input>
                    <gen-code :phone="form.phone" :options="{ok:(data)=>{phoneCodeData=data;}}"></gen-code>
                </div>
                <div class="input-item unit-input-item">
                    <el-input placeholder="个性签名"  v-model="form.selfIntroduction"  @blur="blurAdjust($event)"></el-input>
                    <span class="counter">0/30</span>
                </div>
                <div class="input-item wechat-input-item" v-if="!version.mobile||(version.mobile&&version.weixin)">
                    <span class="label">绑定微信：</span>
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
                <el-button class="submit-btn" type="primary" @click="register()">完成注册</el-button>
            </div>
        </div>
    </el-dialog>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      options:{
          open:false,
      }
    },
    data: function () {
      return {
          form:{
              phone:'',
          },
          phoneCodeData:null,
          qrCodeDomain:Vue.appConfig.domain,
          randomId:new Date().getTime()+Math.random(),
          wetchatInfo:{},
          getWetchatInfoInterval:null,
          version:Vue.tools.browserVersions(),
          redirectUrl:encodeURI(window.location.origin+'/scanTips'),
      }
    },
    computed: {},
    watch: {

    },
    methods: {
      register:function () {
          if(!this.form.name){
                Vue.operationFeedback({type:'warn',text:'请输入用户名'});
                return;
          }
          if(!this.form.password){
              Vue.operationFeedback({type:'warn',text:'请输入密码'});
              return;
          }
          if(this.form.password.length<6){
              Vue.operationFeedback({type:'warn',text:'密码不能少于6位'});
              return;
          }
          if(!this.form.rePassword){
              Vue.operationFeedback({type:'warn',text:'请重复密码'});
              return;
          }
          if(this.form.password!=this.form.rePassword){
              Vue.operationFeedback({type:'warn',text:'两次密码输入不相同'});
              return;
          }
          if(!this.form.phone){
              Vue.operationFeedback({type:'warn',text:'请输入手机号'});
              return;
          }
          if(!this.form.code){
              Vue.operationFeedback({type:'warn',text:'请输入验证码'});
              return;
          }
        /*  if(!this.form.selfIntroduction){
              Vue.operationFeedback({type:'warn',text:'请输入个性签名'});
              return;
          }*/
          let fb=Vue.operationFeedback({text:'注册中...'});
         /* this.phoneCodeData.bizId='whosyourdaddy';*/
          Vue.api.verifySms({apiParams:{bizId:this.phoneCodeData?this.phoneCodeData.bizId:'',phoneNumber:this.form.phone,verifyCode:this.form.code}}).then((resp)=>{
              if(resp.respCode=='2000'){
                  let params={
                      ...this.form,
                      wxOpenId:''
                  }
                  params.selfIntroduction=params.selfIntroduction?params.selfIntroduction:'';
                  Vue.api.register({apiParams:params}).then((resp)=>{
                      if(resp.respCode=='2000'){
                          fb.setOptions({type:"complete",text:'注册成功'});
                          //
                          this.close();
                          //
                          setTimeout(()=>{
                              Vue.loginModal({open:true});
                          },3000)
                      }else{
                          fb.setOptions({type:"warn",text:resp.respMsg});
                      }
                  });
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
      getwetChatInfo:function () {
          Vue.api.getOpenIdInfo({apiParams:{"state":this.randomId}}).then((resp)=>{
        /*      console.log('resp:',resp);*/
              if(resp.respCode=='2000'){
                  this.wetchatInfo=JSON.parse(resp.respMsg);
                  console.log('this.wetchatInfo:',this.wetchatInfo);
                  clearInterval(this.getWetchatInfoInterval);
              }else{

              }
          });
      }
    },
    created: function () {

    },
    mounted: function () {
        if(!this.version.mobile||(this.version.mobile&&this.version.weixin)){
            this.getWetchatInfoInterval=setInterval(()=>{
                this.getwetChatInfo();
            },3000);
        }

    },
    beforeDestroy:function () {
        clearInterval(this.getWetchatInfoInterval);
    },
  };
</script>
