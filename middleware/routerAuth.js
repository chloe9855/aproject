import { signOnStatus } from '~/api/login';
export default ({ route, store, redirect }) => {
  // alert(store.state.userInfo.status);
  signOnStatus().then(r => {
    console.log(r.data[0].status);
    if (r.data[0].status !== 1 && route.path !== '/login') {
      console.log(store.state.userInfo);
      return redirect('/login');
    } else if (r.data[0].status === 1 && route.path === '/login') {
      return redirect('/');
    }
  });
};
