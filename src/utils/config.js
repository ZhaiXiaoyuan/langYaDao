
/*基础配置*/
export default {
    install: function (Vue, options) {
        let isDev=process.env.NODE_ENV=='development';
        Vue.appConfig={
           /* domain:isDev?'http://api.linqi.tech':'',*/
            domain:isDev?'http://39.108.252.213:8601':'',
        /*    domain2:isDev?'http://zyugoodluck.vicp.cc:15852':'',*/
         /*   domain2:isDev?'/api/':'',*/
            fileDomain:isDev?'http://1493v261y2.51mypc.cn:40805':'',
        }
    },
}
