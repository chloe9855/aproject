export function logoutCountdown (setMin) {
  // Write your code here
  setTimeout(() => {
    setMin += 1000;
    t.$store.commit('SET_LOUOUT_COUNTDOWN', { min: setMin });
    if (setMin <= 10000) {
      logoutCountdown();
      console.log(setMin);
    } else {
      alert('登出');
    }
  }, 1000);
}
