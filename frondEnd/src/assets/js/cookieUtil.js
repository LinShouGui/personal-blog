export function setCookie(c_name, c_value, expiry_days = 7) {
  var curDate = new Date();
  curDate.setDate(curDate.getDate() + expiry_days);

  //上线开启
  // var baseUrl = "xx.com";
  // document.cookie = c_name + "=" + escape(c_value) +
  //   ";path=/;domain=" + baseUrl + ";secure" + ((expiry_days == null) ? ";" : //设置domain使相同一二级域名可以互通cookie
  //     ";expires=" + curDate.toUTCString()); //secure只有当前页面是https协议时js才能设置

  //本地打开
  document.cookie = c_name + "=" + escape(c_value) +
    ((expiry_days == null) ? ";" :
      ";expires=" + curDate.toUTCString());
}
export function getCookie(c_name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
export function delCookie(c_name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var c_value = getCookie(c_name);
  if (c_value != null) {
    document.cookie = c_name + "=" + c_value + ";expires=" + exp.toUTCString();
  }
}
