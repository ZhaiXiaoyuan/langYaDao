<template>
    <el-dialog class="register-modal" title="注册成为琅琊岛会员" :visible.sync="options.open" center @close="close()" top="10vh">
        <div class="modal-body">
            <div class="form">
                <div class="input-item">
                    <el-input placeholder="输入昵称" v-model="form.name" clearable></el-input>
                </div>
                <div class="input-item">
                    <el-input placeholder="输入密码" v-model="form.password" type="password" clearable></el-input>
                </div>
                <div class="input-item">
                    <el-input placeholder="重复密码"  v-model="form.rePassword"  type="password" clearable></el-input>
                </div>
                <div class="input-item">
                    <el-input placeholder="输入手机号"  v-model="form.phone" clearable></el-input>
                </div>
                <div class="input-item code-input-item">
                    <el-input placeholder="输入验证码"  v-model="form.code" clearable></el-input>
                    <gen-code></gen-code>
                </div>
                <div class="input-item unit-input-item">
                    <el-input placeholder="个性签名"  v-model="form.selfIntroduction" clearable></el-input>
                    <span class="counter">0/30</span>
                </div>
                <div class="input-item wechat-input-item">
                    <span class="label">绑定微信：</span>
                    <div class="value">
                        <div class="img-box">
                            <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1750833952,2529388352&fm=58&bpow=380&bpoh=380" alt="">
                        </div>
                        <p class="tips">打开微信扫一扫</p>
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
          }
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
          /*if(!this.form.code){
              Vue.operationFeedback({type:'warn',text:'请输入验证码'});
              return;
          }*/
        /*  if(!this.form.selfIntroduction){
              Vue.operationFeedback({type:'warn',text:'请输入个性签名'});
              return;
          }*/
            let params={
                ...this.form,
                wxOpenId:''
            }
            let fb=Vue.operationFeedback({text:'注册中...'});
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
        },
      close:function () {
        this.options.open=false;
        this.$el.remove();
        this.$destroy();
      },
    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
