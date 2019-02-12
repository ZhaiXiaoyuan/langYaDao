/**
 * Created by Administrator on 2016/9/27 0027.
 */
/*一般的工具方法*/
import Vue from 'vue'
import router from '../router'
import md5 from 'js-md5'

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
        window.wordList=[
            '忆宋代。 建隆时。 兴国兆。 可先知。 祯祥现。 见蓍龟。 圣人出。 亦可知。 现麟瑞。 生孔子。',
            '产圣母。 宝光辉。 追古代。 想今兹。 文圣人。 有孔子。 武圣人。 有关羽。 女圣人。 默娘儿。',
            '林家女。 湄州居。 父母善。 祖先慈。 积家善。 庆有余。 生圣母。 出凡姿。 生弥月。 不闻啼。',
            '名默娘。 众称异。 幼读书。 万事知。 能作文。 能作诗。 孝父母。 守伦规。 传圣道。 遇真师。',
            '授真诀。 指灵机。 三教书。 共一理。 上论篇。 一贯之。 华严经。 守三昧。 道德经。 藏妙义。',
            '悟真篇。 参同契。 黄庭经。 为凭据。 如来藏。 极乐地。 回斗柄。 转生机。 玄关窍。 当宝贝。',
            '无缝塔。 收神气。 偃月炉。 真火炊。 朱砂鼎。 烹灵芝。 存心法。 穷性理。 尽性后。 立命基。',
            '三宝足。 一气归。 四大假。 还大虚。 六四卦。 结灵体。 得此法。 上天梯。 出阳神。 亦颇奇。',
            '救世法。 出乡里。 海陆难。 我扶持。 能驱蛟。 能唤雨。 常救急。 常扶危。 降魔法。 振神威。',
            '收二将。 在北西。 二将名。 是何谁。 千里眼。 顺风耳。 辅圣母。 多救济。 民同胞。 物同与。',
            '湄港鱼。 禁纲围。 恩泽大。 物皆知。 祝寿诞。 物知礼。 鱼聚会。 参拜仪。 功满足。 行成期。',
            '通贤女。 人称奇。 廿九岁。 丹熟时。 纯阳体。 法身飞。 早成道。 似颜子。 上帝诏。 不敢违。',
            '登湄峰。 到瑶池。 金童迎。 玉女随。 见王母。 蟠桃会。 登金阙。 拜玉帝。 玉帝封。 天后位。',
            '人爵荣。 天爵贵。 至宣化。 赐厚惠。 立庙宇。 号顺济。 人钦仰。 恭奉祀。 至清帝。 有康熙。',
            '烺南征。 舰近湄。 遇暴风。 舰队危。 烺祈祷。 我扶持。 助战胜。 凯旋归。 烺奏上。 帝欢喜。',
            '御笔写。 称仁慈。 封圣母。 在此时。 想光阴。 似走驹。 劝妇女。 并男儿。 欲学我。 勿延迟。',
            '肯回头。 到岸堤。 圣母经。 勤读之。 口而诵。 心而维。 始终一。 志莫移。 圣仙佛。 任君为。',
            '尊吾教。 听吾辞。 一等人。 忠烈士。 曰成仁。 曰取义。 天日星。 河岳地。 人浩然。 三才气。',
            '忠烈人。 流芳史。 背涅痕。 宋岳飞。 文天祥。 书带词。 吞逆贼。 巡嚼齿。 留嵇血。 勿洗衣。',
            '头可断。 将军志。 骂断舌。 颜烈气。 吞胡羯。 击揖誓。 笏击贼。 头破碎。 出师表。 苏牧羝。',
            '庄公简。 董狐史。 正气歌。 敏裙诗。 ㄨ血书。 绝命词。 躬尽瘁。 不畏死。 擎天柱。 立地维。',
            '鬼神敬。 纲常持。 凛烈气。 万古垂。 求忠臣。 宜孝子。 克孝人。 可枚举。 追历山。 冰求鲤。',
            '蚊饱血。 尝粪奇。 搤虎救。 痛啮指。 卖身葬。 涤溺器。 乳姑勤。 泉跃鲤。 哭生笋。 金赐巨。',
            '葡萄奉。 瓜果随。 七年粟。 掘西篱。 取生鱼。 截竹遗。 远望云。 近彩戏。 先尝药。 远负米。',
            '泣杖悲。 受棰喜。 扇枕勤。 容烹鸡。 弃官寻。 刻木事。 遗绿橘。 顺单衣。 鹿乳奉。 拾椹事。',
            '行佣供。 闻雷泪。 分羹贤。 问膳帝。 古圣贤。 皆孝子。 尊天经。 立地义。 成懿德。 全秉彝。',
            '讲孝道。 说廉士。 握雪心。 怀冰志。 鹤俸清。 食飧似。 怀清洁。 隆勉子。 汉杨震。 畏四知。',
            '范宣坚。 百绢辞。 慎怀廉。 传三世。 饮投钱。 项洁己。 宋太守。 越石窥。 不义财。 稷毋弃。',
            '廉财色。 武美誉。 大清廉。 独伯夷。 世俗人。 争求利。 不贪婪。 古今稀。 廉美德。 当效之。',
            '廉说尽。 讲节义。 劝妇女。 宜先知。 三从训。 四德备。 夫君在。 宜顺义。 夫没后。 守节志。古烈女。 说汝知。',
            '曹令女。 节毁耳。 廖伯妻。 洁断指。 梁寡妇。 烈割鼻。 范慎女。 亦如是。',
            '赵高妻。 涂面秽。 韩玖英。 同此辈。 相登妻。 截发誓。 玄龄妻。 剔目示。 秋胡妻。 却金戏。',
            '贞义者。 刎颈毙。 却宝带。 全忠义。 萦上书。 救父计。 卢孝妇。 冒刃卫。 陈孝妇。 竭力事。',
            '不嫌疾。 由夙缔。 剪皮金。 香字示。 封夫人。 投井逝。 徐饮血。 李断臂。 粉书扇。 叹息意。',
            '鸟鹊篇。 伤心句。 黄鹄歌。 陶婴义。 号礼宗。 不再配。 号贞姜。 约不违。 束发封。 贾直妻。',
            '坠崖卒。 陈仲妻。 愿守墓。 楚贞姬。 席草业。 营生资。 怀清台。 巴妇居。 清风岭。 贞妇祠。',
            '望夫石。 古迹遗。 成竹斑。 崩城悲。 咏柏舟。 节誓辞。 托井水。 志无移。 磨笄山。 孤燕诗。',
            '烈女篇。 事不虚。 今妇女。 能效之。 称菩萨。 称贤儒。 我同伴。 到华胥。 上帝封。 号仙妃。',
            '忠孝廉。 并节义。 诸先哲。 为人师。 圣仙佛。 从此为。 善恶篇。 亦须知。 天眼昭。 日月辉',
            '三台星。 北斗魁。 头上列。 不远离。 有灶神。 有三尸。 别善恶。 录是非。 奏天曹。 褒贬施。',
            '善者昌。 恶者危。 报应法。 如影随。 来祈祷。 多敬礼。 我命将。 暗察窥。 千里眼。 顺风耳。',
            '速查探。 详悉归。 为善事。 我欢喜。 为恶事。 难保汝。 或现报。 或延迟。 十八狱。 放过谁。',
            '劝诸君。 勤学之。 阴骘文。 指南机。 感应篇。 正法规。 讲善事。 说仁理。 两宝典。 必读之。',
            '万恶孽。 首淫痴。 百善行。 孝为先。 速修善。 改前非。 福可得。 祸可移。 降祯祥。 生好儿。',
            '家昌盛。 神助尔。',
            '圣母经。 最灵威。 救众生。 发慈悲。',
            '逢飓风。 舟船危。 念此经。 风自微。多疾病。 身体虚。 念此经。 易疗医。',
            '瘟疫盛。 传染时。 念此经。 疫自离。末劫年。 多险岖。 念此经。 保安居。',
            '久旱魃。 禾枯死。 念此经。 降大雨。妇人孕。 难产时。 念此经。 易生儿。',
            '妖魔崇。 人被迷。 念此经。 崇走移。洪水害。 暴风雨。 念此经。 风雨止。',
            '拜北斗。 延命期。 念此经。 寿期颐。人无子。 来求嗣。 念此经。 产贤儿。',
            '命运凶。 多是非。 念此经。 讼狱离。诸地狱。 血污池。 念此经。 天堂居。',
            '超九祖。 度魅魑。 念此经。 出轮回。消灾害。 保乡里。 念此经。 福自归。',
            '功德大。 难思议。 灵验多。 难尽辞。 布甘露。 施法雨。 真言篇。 同诵之。 至乾隆。 净土寺。',
            '大禅师。 诸贤士。 乩笔术。 诸法备。 显圣迹。 扬名誉。 遗一经。 传万世。',

        ]
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
              basicUrl:false&&process.env.NODE_ENV=='development'?'http://zyu-server.wicp.net:19356/':'http://zyu-server.wicp.net:12412/',
              coverBasicUrl:'http://www.globalmazu.org/mazuFile/',
              qrCodeBasicUrl:'http://shopqrcode.yeahcai.cn',
              yeCaiBasicUrl:'http://yecai.happycp.cn',
              appBaickUrl:'http://happcpapp.yeahcai.cn'
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
                router.push({name:'login'});
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
          }
      }

      Object.assign(Vue, Vue.tools);
      Object.assign(Vue.prototype, Vue.tools);
    },
}
