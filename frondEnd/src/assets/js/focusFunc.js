/**
 * 指令,聚焦于当前绑定指令的元素
 * @param {*} el 
 * @param {*} binding 
 */
function focusFunc(el, binding) {
  el.children[0].focus();
}
export default focusFunc;
