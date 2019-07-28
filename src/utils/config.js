
/*基础配置*/
export default {
    install: function (Vue, options) {
        let isDev=process.env.NODE_ENV=='development';
        //临时测试
        isDev=false;
        Vue.appConfig={
            domain:isDev?'http://api.linqi.tech':'https://www.31ent.com',
            domain2:isDev?'http://api.linqi.tech:8600':'https://www.31ent.com:8600',
            domain3:isDev?'http://api.linqi.tech:8602':'https://www.31ent.com:8602',
            game:isDev?'http://api.linqi.tech:8602':'wss://www.31ent.com:8600',
            fileDomain:isDev?'http://api.linqi.tech':'https://www.31ent.com',
        }
    },
}
