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
    let basicUrl=process.env.NODE_ENV=='development'?'http://1493v261y2.51mypc.cn:47032':'http://api.globalmazu.org:8801';
     // let basicUrl=false&&process.env.NODE_ENV=='development'?'http://api.yeahcai.com/yecai':'http://zyu-server.wicp.net:12412';

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

    }
  },

}
