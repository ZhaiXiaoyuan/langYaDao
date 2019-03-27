<template>
    <el-dialog class="forget-modal safe-login-modal" title="" :visible.sync="options.open" center @close="close()" top="30vh">
        <div class="modal-body" style="padding-top: 0px;border-top: none;">
            <div class="step-1" v-if="options.step==1">
                <i class="icon el-icon-warning"></i>
                <div class="tips">
                    <p>检测到您首次进入琅琊豆中心</p>
                    <p>请先设定琅琊豆中心密码</p>
                </div>
                <div class="handle">
                    <el-button class="handle-btn" type="primary"  @click="toSetPwd()">确定</el-button>
                </div>
            </div>
            <div class="step-2" v-if="options.step==2">
                <div class="form">
                    <p class="title">访问琅琊豆中心请输入密码</p>
                    <div class="pwd-input">
                        <div class="pwd-input-item">
                            <ul class="input-bg"><li v-for="(item) in 6"></li></ul>
                            <input type="password" v-model="password" maxlength="6">
                        </div>
                    </div>
                </div>
                <div class="handle">
                    <span class="cm-btn text-btn" @click="toResetPwd()">忘记密码</span>
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
          open:true,
          type:'normal',//normal、safeBox
          step:0,
          ok:null,
      }
    },
    data: function () {
      return {
          account:{},
          password:''
      }
    },
    computed: {},
    watch: {
        password:function (val) {
            if(val.length==6){
                this.login();
            }
        }
    },
    methods: {
      login:function () {
          let params={
              userId:this.account.id,
              safeBoxPassword:this.password
          }
          Vue.api.safeBoxLogin({apiParams:params}).then((resp)=>{
              if(resp.respCode=='2000'){
                  let data=JSON.parse(resp.respMsg);
                  this.$cookie.set('safeAccount',JSON.stringify(data),7);
                  bus.$emit('refreshSafeAccount');
                  //
                  this.options.ok&&this.options.ok();
                  //
                  this.close();
              }else{
                  Vue.operationFeedback({type:"warn",text:resp.respMsg});
              }
          });
        },
      setStep:function (value) {
          this.options.step=value;
      },
      close:function () {
        this.options.open=false;
        this.$el.remove();
        this.$destroy();
      },
      toSetPwd:function () {
          Vue.forget({type:'safeBox',ok:()=>{
              this.account.isFirstLogin=false;
              this.$cookie.set('account',JSON.stringify(this.account),7);
              this.safeLogin({ok:this.options.ok});
          }});
          this.close();
      },
     toResetPwd:function () {
         Vue.forget({type:'safeBox',ok:()=>{
             this.safeLogin({ok:this.options.ok});
         }});
         this.close();
     }
    },
    created: function () {
        //
    },
    mounted: function () {
        //
        this.account=Vue.getAccountInfo();
        if(this.account.isFirstLogin){
            this.options.step=1;
        }else{
            this.options.step=2;
        }
    }
  };
</script>
