/**
 * 拼接video的url
 */
// var baseUrl = "http://localhost:3009/api/video/";
var baseUrl = "https://api.xx.com/api/video/";
import store from '../../store/states.js'

function videoUrlFormat(str) {
  return baseUrl + (store.message) + "/" + encodeURIComponent(str);
}
export default videoUrlFormat;
