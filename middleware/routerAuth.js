import { signOnStatus } from '~/api/login';
export default ({ route, store, app, redirect }) => {
  const loginPath = '/login';
  signOnStatus().then(r => {
    store.commit('SET_USER_INFO', { userInfo: r.data[0] });
    console.log(r);
  }).catch(e => {
    console.log(e);
    if (route.path !== loginPath && route.path !== '/pwdSetting') {
      return redirect('login');
    }
  });
  const loginStatus = parseInt(sessionStorage.getItem('loginStatus'));
  if (loginStatus === 1 && route.path === loginPath) {
    return redirect('/');
  } else if (loginStatus !== 1 && route.path !== loginPath && route.path !== '/pwdSetting') {
    return redirect('login');
  }
};
