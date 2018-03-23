function gameUrlFormat(obj) {
  let gamePath = obj.path + '/' + obj.params
  return gamePath;
}
export default gameUrlFormat;
