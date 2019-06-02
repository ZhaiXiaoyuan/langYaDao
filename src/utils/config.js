
/*基础配置*/
export default {
    install: function (Vue, options) {
        let isDev=process.env.NODE_ENV=='development';
        //临时测试
        isDev=false;
        Vue.appConfig={
            domain:isDev?'http://api.linqi.tech':'http://www.langyagame.com',
            domain2:isDev?'http://api.linqi.tech:8600':'http://www.langyagame.com:8600',
            domain3:isDev?'http://api.linqi.tech:8602':'http://www.langyagame.com:8602',
            fileDomain:isDev?'http://api.linqi.tech':'http://www.langyagame.com',
        }
    },
}
