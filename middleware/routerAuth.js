import { signOnStatus } from '~/api/login';
export default ({ route, store, app, redirect }) => {
  const loginPath = '/login/';
  const loginStatus = parseInt(sessionStorage.getItem('loginStatus'));
  signOnStatus().then(r => {
    store.commit('SET_USER_INFO', { userInfo: r.data[0] });
    console.log(r);
  }).catch(e => {
    console.log(e.response.status);
    if (e.response.status === '401') {
      sessionStorage.setItem('loginStatus', 0);
      return redirect('/login/');
    }
    if (route.path !== loginPath && route.path !== '/pwdSetting') {
      sessionStorage.setItem('loginStatus', 0);
      return redirect('/login/');
    }
  });
  console.log(route.path !== loginPath);
  console.log(route.path);
  console.log(route.path);
  if (loginStatus === 1 && route.path === loginPath) {
    return redirect('/');
  } else if (loginStatus !== 1 && route.path !== loginPath && route.path !== '/pwdSetting') {
    return redirect('/login/');
  }
};
