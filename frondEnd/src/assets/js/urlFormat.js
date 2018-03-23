/**
 * 拼接文章url,形如{path:'xx',params:'yy'}|urlFormat
 */
function urlFormat(obj) {
  let url = obj.path + '/' + obj.params;
  return url;
}
export default urlFormat;
