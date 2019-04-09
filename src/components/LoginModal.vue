<template>
    <el-dialog class="register-modal login-modal" title="" :visible.sync="options.open" center @close="close()">
        <div class="modal-body" style="padding-top: 0px;border-top: none;">
            <i class="icon logo-md-icon"></i>
            <div class="form">
                <div class="input-item">
                    <el-input placeholder="输入手机号" type="text" v-model="form.phone"></el-input>
                </div>
                <div class="input-item">
                    <el-input placeholder="输入密码" v-model="form.password" type="password"  auto-complete="off"></el-input>
                </div>
                <el-button class="submit-btn" type="primary" style="margin-top: 30px;" @click="login()">登录</el-button>
                <div class="switch">
                    <span class="cm-btn switch-btn" @click="toRegister()">账号注册</span>
                    <span class="cm-btn switch-btn" @click="toSetPwd()">忘记密码</span>
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
      }
    },
    created: function () {

    },
    mounted: function () {
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
    }
  };
</script>
