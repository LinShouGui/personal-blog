/**
 * 集中注册vue指令
 */
import gameUrlFormat from './gameUrlFormat.js'
import urlFormat from './urlFormat.js'
import focusFunc from './focusFunc.js'
import videoUrlFormat from './videoUrlFormat.js'
import videoSpecific from './videoSpecific.js'
export default function (Vue) {
  Vue.filter('gameUrlFormat', gameUrlFormat);
  Vue.filter('urlFormat', urlFormat);
  Vue.filter('videoUrlFormat', videoUrlFormat);
  Vue.filter('videoSpecific', videoSpecific);
  Vue.directive('focus', {
    inserted: focusFunc
  });
}
