/**
 * 为video进度条在元素集合中查找相关的元素,并返回
 * @param {*} totalElements 
 * @param {*} targetFlag 
 */
export default function (totalElements, targetFlag) {
  var returnElement;
  totalElements.forEach(element => {
    if (element.getAttribute("name") == targetFlag) {
      returnElement = element;
    }
  })
  return returnElement;
}
