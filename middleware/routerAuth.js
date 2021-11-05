// import { signOnStatus } from '~/api/login';
export default ({ route, store, redirect }) => {
  if (store.state.userInfo.status !== 1 && route.path !== '/login') {
    return redirect('/login');
  } else if (store.state.userInfo.status === 1 && route.path === '/login') {
    return redirect('/');
  }
  // console.log('routerAuth');
  // console.log(route.meta[0].requiresAuth);
  // if (route.meta[0].requiresAuth) {
  //   let authStates = false; // 改為 true 就可以進入了
  //   signOnStatus().then((r) => {
  //     console.log('gogo222');
  //     console.log(r);
  //     authStates = r.status === 1;
  //     if (!authStates) { // 若沒有登入就使用返回登入頁面
  //       console.log('需要驗證2');
  //       return redirect('/login');
  //     }
  //   }).catch((e) => {
  //     console.log('需要驗證1');
  //   });
  // }
};
