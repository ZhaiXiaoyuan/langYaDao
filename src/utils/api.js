/**
 * Created by Designer on 2017/12/21.
 */
import router from '../router'


export default {
  install: function (Vue, options) {


    Vue.http.options.emulateJSON = true;
    Vue.http.interceptors.push((request, next)  =>{

      next((response) => {
        //对于有作登录状态的接口你，未未登录时跳转到登录页
        if(response.status==401){
         /* router.push({name:''});*/
        }
        return response
      });

    });
    /*自定义ajax函数，自带的不好用*/
    Vue.http.ajax = async function (options) {
        if(options.params.apiParams){
            options.params.apiParams=JSON.stringify(options.params.apiParams);
        }
        if(options.type=='formData'){
            options.params=Vue.toFormData(options.params);
        }
      if(options.method.toUpperCase() == 'GET'){
        let res = await Vue.http.get(options.url, {params: options.params});
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }else if(options.method.toUpperCase() == 'POST'){
        let res = await Vue.http.post(options.url, options.params,);
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }
    }

    /**/
    //临时测试
      let basicUrl=Vue.appConfig.domain;
      let basicUrl2=Vue.appConfig.domain2;

    Vue.api={
        //注册
        register:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/addUser',
                params: params
            });
        },
        //登录
        login:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/login',
                params: params
            });
        },
        //发送短信验证码
        sendVerifySms:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/sendVerifySms',
                params: params
            });
        },
        //验证短信验证码
        verifySms:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/verifySms',
                params: params
            });
        },
        //获取游戏列表
        getGameList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/game/getGameList',
                params: params
            });
        },
        //获取微信openId
        getOpenIdInfo:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'//weixin/getOpenIdInfo',
                params: params
            });
        },
        //获取banner列表
        getBannerList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/banner/getBannerList',
                params: params
            });
        },
        //获取用户信息
        getUserInfo:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/getUserInfo',
                params: params
            });
        },
        //获取用户信息
        updateUserInfo:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/updateUserInfo',
                type:'formData',
                params: params
            });
        },
        //获取会员计划
        getVipTypeList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/vipType/getVipTypeList',
                params: params
            });
        },
        //获取收到的礼物列表
        getGiftMessageList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/gift/getGiftMessageList',
                params: params
            });
        },
        //获取礼物列表
        getGiftList:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/gift/getGiftList',
                params: params
            });
        },
        //获取游戏配置信息
        getGameConfigInfo:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl2+'/game1Config/getGameConfigInfo',
                params: params
            });
        },
        //提交充值订单h5
        addRechargeOrder:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/rechargeOrder/addRechargeOrder',
                params: params
            });
        },
        //获取基本配置
        getBaseGlobalVariable:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/admin/getBaseGlobalVariable',
                params: params
            });
        },
        //查询充值订单的状态
        checkRechargeOrderState:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/rechargeOrder/checkRechargeOrderState',
                params: params
            });
        },
        //生成vip支付订单
        addVipOrder:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/vipOrder/addVipOrder',
                params: params
            });
        },
        //查询vip支付订单状态
        checkVipOrderState:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/vipOrder/checkVipOrderState',
                params: params
            });
        },
        //保险箱和余额转换
        transformUserBalance:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/user/transformUserBalance',
                params: params
            });
        },
        //获取vip信息
        getVipTypeInfo:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/vipType/getVipTypeInfo',
                params: params
            });
        },
        //赠送礼物
        addGiftMessage:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/gift/addGiftMessage',
                params: params
            });
        },
        //批量兑换礼物
        exchangeGiftMessageInBatch:function (params) {
            return Vue.http.ajax({
                method: 'post',
                url: basicUrl+'/gift/exchangeGiftMessageInBatch',
                params: params
            });
        },
    }
  },

}
