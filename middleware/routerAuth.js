import { signOnStatus } from '~/api/login';
export default ({ route, store, app, redirect }) => {
  // console.log(store.state.userInfo.status);
  // console.log(route.path);
  // console.log(sessionStorage.getItem('loginStatus'));
  signOnStatus().then(r => {
    store.commit('SET_USER_INFO', { userInfo: r.data[0] });
  });
  const loginStatus = parseInt(sessionStorage.getItem('loginStatus'));
  if (loginStatus === 1 && route.path === '/login') {
    return redirect('/');
  } else if (loginStatus !== 1 && route.path !== '/login') {
    return redirect('login');
  }
  // signOnStatus().then(r => {
  //   console.log(r.data[0].status);
  //   if (r.data[0].status !== 1 && route.path !== '/login') {
  //     console.log(store.state.userInfo);
  //     return redirect('/login');
  //   } else if (r.data[0].status === 1 && route.path === '/login') {
  //     return redirect('/');
  //   }
  // }).catch(e => {
  //   console.log(e);
  // });
};
