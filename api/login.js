import request from '~/service';

export function loginReq (data) {
  return request.post('/aerc/rest/login', data);
}

export function getVerify () {
  return request.get('/AERC/rest/Verify');
}

export function SignOnStatus () {
  return request.post('/AERC/rest/SignOnStatus');
}

export function logout () {
  return request.post('/AERC/rest/Logout');
}
