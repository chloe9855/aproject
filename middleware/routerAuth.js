import { signOnStatus } from '~/api/login';
export default ({ route, store, app, redirect }) => {
  const loginPath = '/login';
  const loginStatus = parseInt(sessionStorage.getItem('loginStatus'));
  const isLogin = route.path.indexOf(loginPath) > -1;
  const isPwdSetting = route.path.indexOf('pwdSetting') > -1;
  store.commit('SET_LOUOUT_COUNTDOWN', { min: 0 });
  // signOnStatus().then(r => {
  //   store.commit('SET_USER_INFO', { userInfo: r.data[0] });
  //   if (isLogin || isPwdSetting) {
  //     return redirect('/');
  //   }
  // }).catch(e => {
  //   sessionStorage.setItem('loginStatus', 0);
  //   return redirect('/login');
  // });
  if (loginStatus === 1 && (isLogin || isPwdSetting)) {
    return redirect('/');
  } else {
    signOnStatus().then(r => {
      store.commit('SET_USER_INFO', { userInfo: r.data[0] });
      if (isLogin || isPwdSetting) {
        return redirect('/');
      }
    }).catch(e => {
      sessionStorage.setItem('loginStatus', 0);
      if (!isLogin && !isPwdSetting) {
        return redirect('/login');
      }
    });
  }
};
