import request from '~/service';

export function loginReq (data) {
  return request.post('/aerc/rest/login', data);
}
