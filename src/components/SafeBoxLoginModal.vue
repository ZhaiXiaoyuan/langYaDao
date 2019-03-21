<template>
    <el-dialog class="safe-box-login-modal" title="" :visible.sync="options.open" center @close="close()" top="30vh">
        <div class="modal-body first" style="padding-top: 0px;border-top: none;">
            <div class="first-content" v-if="type=='first'">

            </div>
            <div class="forget-content" v-if="type=='forget'">

            </div>
            <div class="login-content" v-if="type=='login'">

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
          type:'login',//first、forget、login
      }
    },
    data: function () {
      return {
          form:{},
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
                location:this.userPosition.city,
            }
            let fb=Vue.operationFeedback({text:'登录中...'});
            Vue.api.login({apiParams:params}).then((resp)=>{
                if(resp.respCode=='2000'){
                    let data=JSON.parse(resp.respMsg);
                    console.log('data:',data);
                    //临时测试
                  /*  if(this.form.phone=='18825162417'){
                        data.user.id=1;
                    }else if(this.form.phone=='18825162416'){
                        data.user.id=2;
                    }else if(this.form.phone=='18825162415'){
                        data.user.id=2;
                    }*/
                    //
                    this.$cookie.set('account',JSON.stringify(data.user),7);
                    bus.$emit('refreshAccount');
                    fb.setOptions({type:"complete",text:'登录成功'});
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
    },
    created: function () {

    },
    mounted: function () {
        console.log('tssdf:"');
    }
  };
</script>
