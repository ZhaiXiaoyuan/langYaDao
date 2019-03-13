<template>
    <div class="cm-page user-info">
       <div class="info-panel">
           <div class="info-row">
               <span class="label">用户昵称：</span>
               <div class="value">{{form.name}}</div>
           </div>
           <div class="info-row">
               <span class="label">用户&nbsp;&nbsp;&nbsp;ID：</span>
               <span class="value">{{form.id}}</span>
           </div>
           <div class="info-row">
               <span class="label">会员等级：</span>
               <div class="value">
                   <p v-if="form.vipTypeId">会员等级（有效期至2018-12-12）<router-link tag="span" :to="{ path: '/center/vip/vipStore'}"  class="cm-btn to-vip-btn">去续费</router-link></p>
                   <p v-if="!form.vipTypeId">非会员<router-link tag="span" :to="{ path: '/center/vip/vipStore'}" class="cm-btn to-vip-btn">成为会员</router-link></p>
               </div>
           </div>
           <div class="info-row">
               <span class="label">注册手机：</span>
               <div class="value">{{form.phone}}</div>
           </div>
           <div class="info-row">
               <span class="label">绑定微信：</span>
               <div class="value">未绑定<span class="cm-btn link-btn">（去绑定）</span></div>
           </div>
           <div class="info-row">
               <span class="label">个性签名：</span>
               <div class="value" style="width: 100%;">
                   <el-input v-model="form.selfIntroduction" placeholder="输入个性签名" clearable></el-input>
               </div>
           </div>
           <div class="handle-row">
               <el-button class="handle-btn" type="primary" @click="save()">保存</el-button>
           </div>
       </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">

</style>
<script>
    import Vue from 'vue'

    export default {
        components:{

        },
        data: function(){
            return {
                account:{},
                form:{},
            }
        },
        methods: {
            getUserInfo:function () {
                Vue.api.getUserInfo({apiParams:{id:this.account.phone,type:'phone'}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.account={...this.account,...data};
                        this.form={...this.account};
                        console.log('this.account:',this.account);
                    }
                });
            },
            save:function () {
               /* if(!this.form.cover){
                    Vue.operationFeedback({type:'warn',text:'请上传头像'});
                    return;
                }*/
         /*       if(!this.form.selfIntroduction){
                    Vue.operationFeedback({type:'warn',text:'请输入个性签名'});
                    return;
                }*/

                let fb=Vue.operationFeedback({text:'保存中...'});
                let params={...this.form}
                params.phone='';
                Vue.api.updateUserInfo({apiParams:params,coverPicFile:this.form.file?this.form.file:null}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete',text:'保存成功'});
                    }else{
                        fb.setOptions({type:'warn',text:'保存失败，'+resp.respMsg});
                    }
                });
            },
        },
        mounted () {
            //
            this.account=Vue.getAccountInfo();
            //
            this.getUserInfo();
        },
    }
</script>
