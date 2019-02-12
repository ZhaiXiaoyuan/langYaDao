<template>
    <div id="app" v-cloak>
        <v-header></v-header>
        <div id="page-content">
            <router-view></router-view>
        </div>
      <!--  <v-footer></v-footer>-->
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import "../static/css/main.css";
    @import "less/main";
    [v-cloak] { display: none }
</style>
<script>
    import Vue from 'vue'
    import vHeader from './components/common/Header.vue'
    import vFooter from './components/common/Footer.vue'

    export default {
        components:{
            vHeader,
            vFooter
        },
        data: function(){
            return {

            }
        },
        methods: {
            deviceType:function (options) {
                options={};
                var isMobile=false;
                if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                    options.mobile&&options.mobile();
                    isMobile=true;
                }else{
                    options.pc&&options.pc();
                }
                return isMobile;
            }
        },
        mounted () {
            if(this.deviceType()){
                (function (doc, win) {
                    var docEl = doc.documentElement,
                        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                        recalc = function () {
                            var clientWidth = docEl.clientWidth;
                            var clientHeight = docEl.clientHeight;
                            if (!clientWidth) return;
                            if(clientWidth >= 750 ){
                                clientWidth = 750
                                doc.body.style.width = 750 + 'px'
                            }else{
                                doc.body.style.width = clientWidth + 'px'
                            }
                            doc.body.style.height = clientHeight + 'px'
                            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                            docEl.dataset.percent = 100 * (clientWidth / 750)
                        };
                    recalc();
                    doc.documentElement.classList.add('iosx' + win.devicePixelRatio)
                    if (!doc.addEventListener) return;
                    win.addEventListener(resizeEvt, recalc, false);
                })(document, window);
            }

        },
    }
</script>

