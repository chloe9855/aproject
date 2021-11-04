import request from '~/service';

export function loginReq (data) {
  return request.post('/aerc/rest/login', data);
}

export function getVerify () {
  return request.post('/AERC/rest/Verify');
}

export function signOnStatus () {
  return request.get('/AERC/rest/SignOnStatus');
}

export function logout () {
  return request.post('/AERC/rest/Logout');
}
