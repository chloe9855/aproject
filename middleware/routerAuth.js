import { signOnStatus } from '~/api/login';
export default ({ route, store, app, redirect }) => {
  const loginPath = '/login';
  const loginStatus = parseInt(sessionStorage.getItem('loginStatus'));
  const isLogin = route.path.indexOf(loginPath) > -1;
  const isPwdSetting = route.path.indexOf('pwdSetting') > -1;
  store.commit('SET_LOUOUT_COUNTDOWN', { min: 0 });

  if (loginStatus === 1 && (isLogin || isPwdSetting)) {
    return redirect('/');
  } else {
    signOnStatus().then(r => {
      store.commit('SET_USER_INFO', { userInfo: r.data[0] });
      sessionStorage.setItem('loginUser', r.data[0].id);
      sessionStorage.setItem('userAuthority', r.data[0].permit);
      if (isLogin || isPwdSetting) {
        return redirect('/');
      }
    }).catch(e => {
      if (e.response.status === 401) {
        sessionStorage.setItem('loginStatus', 0);
        sessionStorage.setItem('loginUser', '');
        if (!isLogin && !isPwdSetting) {
          return redirect('/login');
        }
      };
    });
  }
};
