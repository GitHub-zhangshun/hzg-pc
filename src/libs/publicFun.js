// 公共方法
export  function timestampToTimesfs(timestamp){
    if(!timestamp){
        return null
    }
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
    var D = date.getDate()<10?`0${date.getDate()}`: date.getDate();
    var h = date.getHours()>="10"?`${date.getHours()}`:`0${date.getHours()}`;
    var m = date.getMinutes()>="10"?date.getMinutes():`0${date.getMinutes()}`;
    var s = date.getSeconds()>="10"?date.getSeconds():`0${date.getSeconds()}`
    return {Y:Y,M:M,D:D,h:h,m:m,s:s}
}
// 公共方法
export function formatDate (tap, fmt) {
    if(!tap){
        return;
    }
    var date = new Date(tap);
    // console.log(tap)
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};

//检查手机号
export function checkPhone(phone){
    return (/^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/).test(phone)
};

//身份证号验证
export function checkIdcard(idcard){
    return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(idcard)
};

//格式化金额
export function number_format(number, decimals, dec_point, thousands_sep) {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * */
   number = (number + '').replace(/[^0-9+-Ee.]/g, '');
   var n = !isFinite(+number) ? 0 : +number,
       prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
       sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
       dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
       s = '',
       toFixedFix = function (n, prec) {
           var k = Math.pow(10, prec);
           return '' + Math.round(n * k) / k;
       };
   s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
   var re = /(-?\d+)(\d{3})/;
   while (re.test(s[0])) {
       s[0] = s[0].replace(re, "$1" + sep + "$2");
   }

   if ((s[1] || '').length < prec) {
       s[1] = s[1] || '';
       s[1] += new Array(prec - s[1].length + 1).join('0');
   }
   return s.join(dec);
}

// 密码验证
export function checkPwd(pwd){
    return (/^([a-zA-Z0-9!@#$%^&*`:"<>?,./;'`]){6,16}$/).test(pwd)
}
/**
 * 获取字典
 */
export function listByAll(b) {
    return sessionStorage.getItem('dictionaryListByAll') && JSON.parse(sessionStorage.getItem('dictionaryListByAll')).filter(item => { return item.Id == b })[0]
}
/**
 * 获取上一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
export function getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2;
    return t2;
}
// 三方跳转
export function redirectTripartite (val) {
  let body = document.body
  let formDiv = document.createElement('div')
  formDiv.setAttribute('id', 'form')
  body.appendChild(formDiv)
  document.getElementById('form').innerHTML = val
  document.forms['form'].submit()
  setTimeout(() => {
    formDiv.remove()
  }, 1000)
}