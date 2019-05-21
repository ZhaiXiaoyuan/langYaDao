
/*基础配置*/
export default {
    install: function (Vue, options) {
        let isDev=process.env.NODE_ENV=='development';
        //临时测试
        isDev=false;
        Vue.appConfig={
            domain:isDev?'http://api.linqi.tech':'http://47.103.75.74',
            domain2:isDev?'http://api.linqi.tech:8600':'http://47.103.75.74:8600',
            domain3:isDev?'http://api.linqi.tech:8602':'http://47.103.75.74:8602',
            fileDomain:isDev?'http://api.linqi.tech':'http://47.103.75.74',
        }
    },
}
