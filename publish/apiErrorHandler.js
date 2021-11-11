export function forgetPasswordErr (err) {
  let result = '';
  switch (err) {
    case 404:
      result = '無此帳號，請重新輸入';
      break;
  }
  return result;
}
