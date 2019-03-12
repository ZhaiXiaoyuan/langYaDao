
/*基础配置*/
export default {
    install: function (Vue, options) {
        let isDev=process.env.NODE_ENV=='development';
        Vue.appConfig={
            domain:isDev?'http://1493v261y2.51mypc.cn:47032':'http://api.globalmazu.org:8801',
            fileDomain:isDev?'http://1493v261y2.51mypc.cn:40805':'http://www.globalmazu.org/',
        }
    },
}
