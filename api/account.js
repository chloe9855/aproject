import request from '~/service';

export function getAccount () {
  return request.get('/aerc/rest/Account');
}

export function editAccount () {
  return request.patch('/AERC/rest/Account', data);
}

export function addAccount () {
  return request.post('/AERC/rest/Account', data);
}
