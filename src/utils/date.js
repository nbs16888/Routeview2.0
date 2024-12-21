export const calcDate = (date1, date2) => {
  var date3 = date2 - date1

  var days = Math.floor(date3 / (24 * 3600 * 1000))

  var leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))

  var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))

  var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  var seconds = Math.round(date3 / 1000)
  return {
    leave1,
    leave2,
    leave3,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}
export const countDown = (time) => {
  let nowTime = new Date(); //获取当前总毫秒数
  let inputTime = new Date(time); //用户输入的总毫秒数
  let times = (inputTime - nowTime) / 1000; //剩余的总秒数

  if (times < 0) return 0

  //转换为天
  let d = parseInt(times / 60 / 60 / 24);
  //转换为时
  let h = parseInt(times / 60 / 60 % 24);
  //设置成时钟格式 00：00：00 利用三元运算符
  h = h < 10 ? "0" + h : h
  //转换为分
  let m = parseInt(times / 60 % 60);
  m = m < 10 ? "0" + m : m
  //转换成秒
  let s = parseInt(times % 60);
  s = s < 10 ? "0" + s : s

  return {
    d,
    h,
    m,
    s
  };



}

/**
 * 日期格式化
 */
export function dateFormat(date) {
  let format = 'yyyy-MM-dd hh:mm:ss';
  if (date != 'Invalid Date') {
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  }
  return '';
}

export const getyyyyMMddPlusDay = (plusDayNum,type) => {
  var d = new Date();
  d.setDate(d.getDate() + plusDayNum);
  var d_year = d.getFullYear();
  var d_month = d.getMonth() + 1;
  var d_date = d.getDate();
  var str_month = d_month < 10 ? ("0" + d_month) : (d_month + "");
  var str_date = d_date < 10 ? ("0" + d_date) : (d_date + "");
  return d_year + type + str_month + type + str_date;
}

/**
 * 获取指定格式的年月日
 */
export const getyyyyMMdd = (d) => {
  var d_year = d.getFullYear();
  var d_month = d.getMonth() + 1;
  var d_date = d.getDate();
  var str_month = d_month < 10 ? ("0" + d_month) : (d_month + "");
  var str_date = d_date < 10 ? ("0" + d_date) : (d_date + "");
  return d_year + "" + str_month + "" + str_date;
}
export const getyyyy_MM_dd = (d,line) => {
  var d_year = d.getFullYear();
  var d_month = d.getMonth() + 1;
  var d_date = d.getDate();
  var str_month = d_month < 10 ? ("0" + d_month) : (d_month + "");
  var str_date = d_date < 10 ? ("0" + d_date) : (d_date + "");
  return d_year + line + str_month + line + str_date;
}

/**
 * 获取指定格式的年月
 */
export const getyyyyMM = (d) => {
  var d_year = d.getFullYear();
  var d_month = d.getMonth() + 1;
  var str_month = d_month < 10 ? ("0" + d_month) : (d_month + "");
  return d_year + "" + str_month;
}

// date 代表指定的日期，格式：2018-09-27
// day 传-1表始前一天，传1表始后一天
// JS获取指定日期的前一天，后一天
export function getNextDate(date, day) {
  var dtmp = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2)
  var dd = new Date(dtmp);
  dd.setDate(dd.getDate() + day);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return y + "" + m + "" + d;
};
