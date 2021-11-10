import { logout } from '~/api/login';
export function getLogout (t) {
  logout().then((r) => {
    t.$store.commit('SET_USER_INFO', { userInfo: {} });
    sessionStorage.setItem('loginStatus', 0);
    t.$cookies.set('ASP.NET_SessionId', '');
    t.$router.push('/login');
  }).catch((e) => {
    console.log(e);
  });
}
