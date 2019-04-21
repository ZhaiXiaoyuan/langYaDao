/**
 * Created by Administrator on 2016/9/27 0027.
 */
/*一般的工具方法*/
import Vue from 'vue'
import router from '../router'
import md5 from 'js-md5'
import bus from '../components/common/bus';

export default {
    install: function (Vue, options) {
        //常用正则
        window.regex={
          illegal :new RegExp("((?=[\x21-\x7e]+)[^A-Za-z0-9])"),
          illegalAlert:'请勿输入非法字符',
          pNum:/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,//正数
          pNumAlert:'请输入大于0的数值，限制2位小数',
          pInt:/^[1-9]*[1-9][0-9]*$/,//正整数
          pIntAlert:'请输入大于0的整数',
          nNum:/^(0|[1-9][0-9]*)$/,//自然数
          nNumAlert:'请输入大于等于0的整数',
          chn:/^[\u4e00-\u9fa5]{0,}$/,
          chnAlert:'请输入纯中文字符串',

          float:/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
          floatAlert:'数值格式有误，请输入小数点前不多于8位、小数点后不多于2位的数值！',

          percent:/^((100(\.00|\.0)?)|((\d|[1-9]\d)(\.\d{1,2})?))$/,
          percentAlert:'百分数格式错误，请输入0~100间数值，可保留两位小数！',

          contact:/^(0\d{2,3}-?\d{7,8})|(1\d{10})$/,
          contactAlert:'请输入正确格式的手机号码或电话号码！',

          phone:/^1\d{10}$/,
          phoneAlert:'请输入正确格式的手机号！',

          mail:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
          mailAlert:'请输入正确格式的邮箱！',

          idCard:/^[a-zA-Z0-9]{1,20}$/,
          idCardAlert:'身份证号码格式错误！',

          shortCode:/^(?![0-9]+$)[0-9A-Za-z]{7,20}$/,
          shortCodeAlert:'域名格式有误，请输入7到20位字母或数字，不可为纯数字！'
        }
        //
      Vue.tools = {
          //临时测试
      /*    basicConfig:{
              basicUrl:false&&process.env.NODE_ENV=='development'?'http://zyu-server.wicp.net:19356/':'http://api.yeahcai.com',
              qrCodeBasicUrl:'http://shopqrcode.yeahcai.com',
              yeCaiBasicUrl:'http://yecai.happycp.com',
              appBaickUrl:'http://happcpapp.yeahcai.com'
          },*/
          basicConfig:{
              imgBasicUrl:Vue.appConfig.fileDomain+'/image/',
          },
        /*生成请求时间戳*/
        genTimestamp:function () {
          return Math.ceil(new Date().getTime()/1000)
        },
        /**
         *
         * @param date
         * @param fmt
         * @returns {*}
         */
        formatDate:function(date,fmt){
          if(typeof date !=Date){
            date=new Date(date);
          }
          var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        },
        sessionInfo:function () {
          let timestamp=this.genTimestamp();
        /*  let userId='07d2cbfa55cf4e6582d67e164405b36b';//临时测试，上线时要检查该字段值*/
          return{
              timeStamp:timestamp,
            /*  userId:userId,*/
          }
        },
        /*获取事件当前元素*/
        getCurEle:function (e) {
          var targetEle=null;
          if(e.currentTarget){
            targetEle=e.currentTarget;
          }else if(event.srcElement){
            targetEle=e.srcElement;
          }
          return targetEle;
        },
        /*阻止事件冒泡*/
        stopPropagation:function(e){
          if(e){
            if(e.cancelBubble){
              e.cancelBubble = true;
            }
            else if(e.stopPropagation){
              e.stopPropagation();
            }
          }
        },
        throttle:function (fn, delay, atleast) {
              var timer = null;
              var previous = null;
              return function() {
                  var now = +new Date();

                  if (!previous) previous = now;
                  if (atleast && now - previous > atleast) {
                      fn();
                      // 重置上一次开始时间为本次结束时间
                      previous = now;
                      clearTimeout(timer);
                  } else {
                      clearTimeout(timer);
                      timer = setTimeout(function() {
                          fn();
                          previous = null;
                      }, delay);
                  }
              }
          },
        getAccountInfo:function () {
            let account=Vue.cookie.get('account');
            if(account){
                return JSON.parse(account);
            }else{
                /*router.push({name:'login'});*/
                return{};
            }
        },
        getSafeAccounInfo:function () {
            let safeAccount=Vue.cookie.get('safeAccount');
            if(safeAccount){
                return JSON.parse(safeAccount);
            }else{
                return{};
            }
        },
        moneyFormat:function (str) {
            return (str/100).toFixed(2);
        },
        toFormData:function (jsObj) {
            let fd = new FormData();
            for (let o in jsObj) {
                fd.append(o, jsObj[o])
            }
            return fd;
        },
        fileToBlob:function (file,callback) {
              if (!file) {
                  return false
              }
              var reader = new FileReader()
              reader.onload = (e) => {
                  let data
                  if (typeof e.target.result === 'object') {
                      // 把Array Buffer转化为blob 如果是base64不需要
                      data = window.URL.createObjectURL(new Blob([e.target.result]))
                  } else {
                      data = e.target.result
                  }
                  //
                  callback&&callback(data);
              }
              // 转化为base64
              // reader.readAsDataURL(file)
              // 转化为blob
              reader.readAsArrayBuffer(file);
          },
        initAudio:function (id) {
              let audio=document.getElementById(id);
          /*  console.log('test:',audio);*/
              function play() {
                  audio.play();
              }
              function pause() {
                  audio.pause();
              }
              function setSpeed(value) {
                  audio.playbackRate=value;
              }
              function setMuted(flag) {
                  audio.muted=!flag
              }
              function setVolume (value) {
                  audio.volume = value;
              }
              return{play,pause,setSpeed,setMuted,setVolume}
        },
        safeLoginCheck:function (path,next) {
            let safeAccount=this.getSafeAccounInfo();
            if(path.indexOf('coin')>-1&&!safeAccount.isLogin){
                Vue.safeLogin({ok:()=>{
                    next();
                }});
            }else{
                next();
            }
        },
        routeCheck:function (to,from,next) {
            let path=to.path;
            let account=this.getAccountInfo();
            if(!account.id){
                Vue.loginModal({open:true,ok:()=>{
                    this.safeLoginCheck(path,next);
                }});
            }else{
                this.safeLoginCheck(path,next);
            }
        },
        clearAccount:function () {
            let account=this.getAccountInfo();
            if(account){
                Vue.cookie.set('account','');
                bus.$emit('refreshAccount');
                Vue.cookie.set('safeAccount','');
                bus.$emit('refreshSafeAccount');
                router.push({path:'/'});
            }
        },
        weixinCheck:function () {
            let version=this.browserVersions();
            if(version.mobile&&version.weixin){
                let randomId=new Date().getTime()+Math.random();
                let account=this.getAccountInfo();
                if(!account.peymentOpenId){
                    localStorage.setItem('randomId',randomId);
                    window.location.href=Vue.appConfig.domain+'/weixin/getWeixinCode?state='+randomId+'&scope=snsapi_base';
                }
            }
        },
        getVoiceFlag:function () {
            let voiceFlag=localStorage.getItem('voiceFlag');
            voiceFlag=voiceFlag=='true'?true:false;
            return voiceFlag;
        },
          /*锚点*/
        goAnchor:function (selector) {
            console.log('test:',document.querySelector(selector).offsetTop);
            document.querySelector("#page-content").scrollTop = document.querySelector(selector).offsetTop;
        },
        blurAdjust:function (e) {
            setTimeout(()=>{
                if(document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA'){
                    return
                }
                let result = 'pc';
                if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
                    result = 'ios'
                }else if(/(Android)/i.test(navigator.userAgent)) {  //判断Android
                    result = 'android'
                }

                if( result = 'ios' ){
                    document.activeElement.scrollIntoViewIfNeeded(true);
                }
            },100);
        },
        browserVersions:function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        },
        speckText:function (str) {
        /*    if(!this.getVoiceFlag()){
                return;
            }*/
           /* if(navigator.onLine){
                var url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=" + encodeURI(str);        // baidu
                var n = new Audio(url);
                n.src = url;
                n.play();
            }else if('speechSynthesis' in window) {
                var msg = new SpeechSynthesisUtterance(str);
                msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google 普通话（中国大陆）'; })[2];
                speechSynthesis.speak(msg);
            }*/
        }
      }

      Object.assign(Vue, Vue.tools);
      Object.assign(Vue.prototype, Vue.tools);
    },
}
