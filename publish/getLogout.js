import { logout } from '~/api/login';
export function getLogout (t) {
  logout().then((r) => {
    sessionStorage.setItem('loginStatus', 0);
    t.$store.commit('SET_LOUOUT_COUNTDOWN', { min: 0 });
    t.$router.push('/login');
  }).catch((e) => {
    if (e.response.status === 401) {
      sessionStorage.setItem('loginStatus', 0);
      t.$store.commit('SET_LOUOUT_COUNTDOWN', { min: 0 });
      t.$router.push('/login');
    }
  });
}
