
/*基础配置*/
export default {
    install: function (Vue, options) {
        let isDev=process.env.NODE_ENV=='development';
        Vue.appConfig={
           /* domain:isDev?'http://api.linqi.tech':'',*/
            domain:isDev?'/api':'http://api.linqi.tech',
           /* domain2:isDev?'http://api.linqi.tech:8600':'',*/
            domain2:false&&isDev?'http://192.168.0.100:8600':'http://api.linqi.tech:8600',
            domain3:isDev?'http://api.linqi.tech:8602':'http://api.linqi.tech:8602',
            fileDomain:isDev?'http://api.linqi.tech':'http://api.linqi.tech',
        }
    },
}
