<template>
    <el-dialog class="forget-modal" title="" :visible.sync="options.open" center @close="close()" top="30vh">
        <div class="modal-body" style="padding-top: 0px;border-top: none;">
            <div class="step-1" v-if="step==1">
                <div class="form">
                    <el-form ref="form" :model="form" class="form" label-width="70px">
                        <el-form-item label="手机号：">
                            <el-input v-model="form.phone" class="input-item" placeholder="请输入注册手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码：" class="code-form-item">
                            <el-input v-model="form.code" placeholder="输入验证码"></el-input>
                            <gen-code :phone="form.phone" :options="{ok:(data)=>{phoneCodeData=data;}}"></gen-code>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="handle">
                    <el-button class="handle-btn" type="primary" @click="checkCode()">下一步</el-button>
                </div>
            </div>
            <div class="step-2" v-if="step==2">
                <div class="form">
                    <p class="title">请设置琅琊豆中心密码</p>
                    <div class="pwd-input">
                        <div class="pwd-input-item">
                            <ul class="input-bg"><li v-for="(item) in 6"></li></ul>
                            <input type="password" v-model="form.password" maxlength="6">
                        </div>
                    </div>
                </div>
                <div class="handle">
                    <el-button class="handle-btn" :class="{'cm-disabled':!form.password||form.password.length<6}" type="primary" @click="setStep(3)">下一步</el-button>
                </div>
            </div>
            <div class="step-3" v-if="step==3">
                <div class="form">
                    <p class="title">请再次输入琅琊豆中心密码</p>
                    <div class="pwd-input">
                        <div class="pwd-input-item">
                            <ul class="input-bg"><li v-for="(item) in 6"></li></ul>
                            <input type="password" v-model="form.rePassword" maxlength="6">
                        </div>
                    </div>
                </div>
                <div class="handle">
                    <el-button class="handle-btn" :class="{'cm-disabled':!form.rePassword||form.rePassword.length<6}" type="primary" @click="setStep(4)">下一步</el-button>
                </div>
            </div>
            <div class="step-4" v-if="step==4">
                <i class="icon success-icon"></i>
                <p class="tips">设置保险箱密码成功</p>
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
      }
    },
    data: function () {
      return {
          form:{
              phone:'',
              code:'',
              password:''
          },
          phoneCodeData:null,
          step:1,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
      save:function () {
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
                location:this.userPosition.city,
            }
            Vue.api.updateUserPassword({apiParams:params}).then((resp)=>{
                if(resp.respCode=='2000'){

                }else{
                    Vue.operationFeedback({type:"warn",text:resp.respMsg});
                }
            });
        },
      setStep:function (value) {
            this.step=value;
      },
      close:function () {
        this.options.open=false;
        this.$el.remove();
        this.$destroy();
      },
      checkCode:function () {
          if(!this.form.phone){
              Vue.operationFeedback({type:'warn',text:'请输入注册手机号'});
              return;
          }
          if(!this.form.code){
              Vue.operationFeedback({type:'warn',text:'请输入验证码'});
              return;
          }
          Vue.api.verifySms({apiParams:{bizId:this.phoneCodeData?this.phoneCodeData.bizId:'',phoneNumber:this.form.phone,verifyCode:this.form.code}}).then((resp)=>{
              //临时测试
              if(true||resp.respCode=='2000'){
                  this.setStep(2);
              }else{
                  Vue.operationFeedback({type:'warn',text:resp.respMsg});
              }
          });
      },
    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
