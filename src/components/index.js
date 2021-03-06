/**
 * Created by Designer on 2018/1/23.
 */

import Distpicker from './Distpicker';
import OperationFeedback from './OperationFeedback';
import ViewPicModal from './ViewPicModal';
import GenCode from './GenCode';
import CropModal from './CropModal';
import RegisterModal from './RegisterModal.vue';
import LoginModal from './LoginModal.vue';
import ScrollLoad from './ScrollLoad';
import * as socketApi from './socket';
import AlertModal from './AlertModal.vue';
import ForgetModal from './ForgetModal.vue';
import SafeLoginModal from './SafeLoginModal.vue';
import VoiceSwitch from './VoiceSwitch.vue';


/*全局组件注册配置*/
export default {
  install:function(Vue){
    /*标签调度方式*/
    Vue.component('v-distpicker',Distpicker);
    Vue.component('OperationFeedback',OperationFeedback);
    Vue.component('ViewPicModal',ViewPicModal);
    Vue.component('GenCode',GenCode);
    Vue.component('CropModal',CropModal);
    Vue.component('RegisterModal',RegisterModal);
    Vue.component('LoginModal',LoginModal);
    Vue.component('ScrollLoad',ScrollLoad);
    Vue.component('AlertModal',AlertModal);
    Vue.component('ForgetModal',ForgetModal);
    Vue.component('SafeLoginModal',SafeLoginModal);
    Vue.component('VoiceSwitch',VoiceSwitch);


    /*方法调度方式*/
    let OperationFeedbackConstructor = Vue.extend(OperationFeedback);
    let ViewPicModalConstructor = Vue.extend(ViewPicModal);
    let CropModalConstructor=Vue.extend(CropModal);
    let RegisterModalConstructor=Vue.extend(RegisterModal);
    let LoginModalConstructor=Vue.extend(LoginModal);
    let AlertModalConstructor=Vue.extend(AlertModal);
    let ForgetModalConstructor=Vue.extend(ForgetModal);
    let SafeLoginModalConstructor=Vue.extend(SafeLoginModal);
    const functionObject={
        /**
         * 操作提示
         * @param options object
         */
        operationFeedback:function (options) {
            options={...{
                parent:'app',//添加提示框的容器,该容器的position属性值须是'relative'
                parentPosition:'relative',//父元素属性值须是'relative'或者fixed
                tipsPosition:'fixed',//添加提示框的position属性值须是'absolute'或者fixed
                type:'operating',//提示类型，operating:正在处理,complete:处理完成,warn:错误警告,tips:提示
                text:'正在处理',//要提示的文本,
                delayForDelete:3000,//提示框消失延时,
                mask:false//是否显示蒙版
            },...options};
            if(options.parent=='app'){
                options.parentPosition='static';
            }
            //
            let parentEle=document.getElementById(options.parent);
            //
            let instance=new OperationFeedbackConstructor({
                data:{...options}
            });
            instance.$mount();
            parentEle.appendChild(instance.$el);
            //设置参数
            function setOptions(obj) {
                Object.assign(instance,obj);
            }
            return{
                setOptions:setOptions
            }
        },
        /**
         * 查看照片弹窗
         * @param options
         */
        viewPicModal:function (options) {
            options={...{
               index:0,
               imgList:[],
            },...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new ViewPicModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
        },
        /**
         * 图片裁剪弹窗
         * @param options
         */
        cropModal:function (options) {
            options={...{
                img:null,
                size: 1,
                full: false,
                outputType: 'jpeg',
                canMove: true,
                fixedBox: false,
                original: false,
                canMoveBox: true,
                autoCrop: true,
                centerBox: false,
                fixedNumber:[1,1],
                fixed:true,
                ok:null,
            },...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new CropModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
            return {
                close:instance.close
            }
        },
        /**
         * 注册弹窗
         * @param options
         */
        registerModal:function (options) {
            options={...{

            },...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new RegisterModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
        },
        /**
         * 登录弹窗
         * @param options
         */
        loginModal:function (options) {
            options={...{

            },...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new LoginModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
        },
        /**
         * 保险箱登录弹窗
         * @param options
         */
        safeBoxLogin:function (options) {
            options={...{
                open:true,
            },...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new SafeBoxLoginModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
        },
        /**
         * 提示弹窗
         * @param options
         */
        alertModal:function (options) {
            options={...{
                open:true,
                type:'alert',//alert,confirm
                title: '温馨提示', //提示标题
                html: '',   //提示内容
                yes: '确 定',
                no: '取 消',
                ok:null,//确定的回调
                cancel:null,//取消的回调,
            },...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new AlertModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
        },
        /**
         * 重置密码弹窗
         * @param options
         */
        forget:function (options) {
            options={...{
                open:true,
            },...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new ForgetModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
        },
        /**
         * 保险箱登录弹窗
         * @param options
         */
        safeLogin:function (options) {
            options={...{
                open:true,
                type:'normal',//normal、safeBox
                step:0,
                ok:null,
            },...options};
            //
            let parentEle=document.getElementById('app');
            //
            let instance=new SafeLoginModalConstructor({});
            instance.options=options;
            instance.$mount();
            parentEle.appendChild(instance.$el);
        },
        socketApi:socketApi
    }
    /**/
    Object.assign(Vue,functionObject);
    Object.assign(Vue.prototype,functionObject);
  }
};
