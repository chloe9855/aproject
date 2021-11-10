import { signOnStatus } from '~/api/login';
export default ({ route, store, app, redirect }) => {
  signOnStatus().then(r => {
    store.commit('SET_USER_INFO', { userInfo: r.data[0] });
    console.log(r);
  }).catch(e => {
    console.log(e);
  });
  const loginStatus = parseInt(sessionStorage.getItem('loginStatus'));
  if (loginStatus === 1 && route.path === '/login') {
    return redirect('/');
  } else if (loginStatus !== 1 && route.path !== '/login') {
    return redirect('login');
  }
};
