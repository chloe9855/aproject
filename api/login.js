import request from '~/service';

export function loginReq (data) {
  return request.post('/aerc/rest/login', data);
}

export function getVerify () {
  return request.get('/AERC/rest/Verify');
}
