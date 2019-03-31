/**
 * Created by Administrator on 2016/9/28 0028.
 */

/**
 * vue所需要的filter都放在这里
 * 在js里面可以这样直接调用：Vue.filter('getLocalISOString')(new Date())
 * */
import Vue from 'vue'

/*格式化时间*/
Vue.filter('formatDate',function(date,fmt){
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
});

/*格式化金额*/
Vue.filter('moneyFormat',function(str){
    return (str/100).toFixed(2);
});

/*值空时显示字符*/
Vue.filter('empty',function(str){
    return str?str:'-';
});



/*数值格式*/
Vue.filter('numFormat',function(num){
    let result='';
    let unit='W';
    let num1=null;
    let num2=null;
    let abs=Math.abs(num);
    if(abs>=100000){
        num1=Math.floor(num/10000);
      /*  num2=num%10000;*/
        result=num1+unit;
    }else if(abs>=10000){
        unit='K';
        num1=Math.floor(num/1000);
        result=num1+unit;
    }else{
        result=num;
    }
    return result;
});

/*数字转中文*/
Vue.filter('numToCn',function(str){
    let cnArr=['一','二','三','四','五','六'];
    return cnArr[str];
});

/*结果字典*/
Vue.filter('resultDict',function(index,property){
    property=property?property:'resultText';
    let resultArr=[
        {
            outsideName:'子鼠',
            middleName:'神龟',
            insideName:'乾',
            icon:'mouse-icon',
            middleIcon:'turtle',
            resultText:'神龟，子鼠，乾',
            value:1
        },
        {
            outsideName:'丑牛',
            middleName:'神龟',
            insideName:'坤',
            icon:'cow-icon',
            middleIcon:'turtle',
            resultText:'神龟，丑牛，坤',
            value:2
        },
        {
            outsideName:'寅虎',
            middleName:'麒麟',
            insideName:'乾',
            icon:'tiger-icon',
            middleIcon:'kirin',
            resultText:'麒麟，寅虎，乾',
            value:3
        },
        {
            outsideName:'卯兔',
            middleName:'麒麟',
            insideName:'坤',
            icon:'rabbit-icon',
            middleIcon:'kirin',
            resultText:'麒麟，卯兔，坤',
            value:4
        },
        {
            outsideName:'辰龙',
            middleName:'麒麟',
            insideName:'乾',
            icon:'dragon-icon',
            middleIcon:'kirin',
            resultText:'麒麟，辰龙，乾',
            value:5
        },
        {
            outsideName:'巳蛇',
            middleName:'凤凰',
            insideName:'坤',
            icon:'snake-icon',
            middleIcon:'phoenix',
            resultText:'凤凰，巳蛇，坤',
            value:6
        },
        {
            outsideName:'午马',
            middleName:'凤凰',
            insideName:'乾',
            icon:'horse-icon',
            middleIcon:'phoenix',
            resultText:'凤凰，午马，乾',
            value:7
        },
        {
            outsideName:'未羊',
            middleName:'凤凰',
            insideName:'坤',
            icon:'sheep-icon',
            middleIcon:'phoenix',
            resultText:'凤凰，未羊，坤',
            value:8
        },
        {
            outsideName:'申猴',
            middleName:'貔貅',
            insideName:'乾',
            icon:'monkey-icon',
            middleIcon:'pixiu',
            resultText:'貔貅，申猴，乾',
            value:9
        },
        {
            outsideName:'酉鸡',
            middleName:'貔貅',
            insideName:'坤',
            icon:'chicken-icon',
            middleIcon:'pixiu',
            resultText:'貔貅，酉鸡，坤',
            value:10
        },
        {
            outsideName:'戍狗',
            middleName:'貔貅',
            insideName:'乾',
            icon:'dog-icon',
            middleIcon:'pixiu',
            resultText:'貔貅，戍狗，乾',
            value:11
        },
        {
            outsideName:'亥猪',
            middleName:'神龟',
            insideName:'坤',
            icon:'pig-icon',
            middleIcon:'turtle',
            resultText:'神龟，亥猪，坤',
            value:12
        },
    ];
    let result=resultArr[index];
    return property=='all'?result:result[property];
});
