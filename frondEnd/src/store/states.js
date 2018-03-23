export default {
  token: isLoggedIn() || null,
  message: getUser(),
  search_user: null,
  kai: false,
  song: false,
  jian: getSimple(),
  dangqian: '日间模式',
  current_article: null,
  classify_articles: null,
  messageHandle: null,
  mesCount: getCount() || 0,
  findName: "",
}

function getSimple() {
  var temp = localStorage.getItem('isSimple');
  return temp === 'true' ? true : temp === 'false' ? false : false;
}

function getCount() {
  if (localStorage.getItem('mesCount')) {
    return localStorage.getItem('mesCount');
  }
}

function isLoggedIn() {
  let token = localStorage.getItem('jwt');
  if (token && token !== 'undefined') {
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    if (payload.exp > Date.now() / 1000) {
      return token;
    }
    return false;
  }
}

function getUser() {
  return localStorage.getItem('username');
}
